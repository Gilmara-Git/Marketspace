import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";
import {
  storageSaveUSerToken,
} from "@src/storage/storageToken";

import { storageGetUserRefreshToken } from '@storage/storageRefreshToken';

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerInterceptorTokenValidation: (signOut: SignOut) => () => void;
};

type requestTypes = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

const api = axios.create({
  baseURL: "http://192.168.1.164:3333",
}) as ApiInstanceProps;

api.registerInterceptorTokenValidation = (signOut) => {
  let waitingRequestsQueue: Array<requestTypes> = [];
  let isTokenRefreshing = false; // starts false because the very first time is not refreshing token yet.

  const interceptTokenValidation = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      // if error response status equals 401 it means it not authorized, a problem  with token
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.invalid" ||
          requestError?.response.data?.message === "token.expired"
          ) {
            // console.log('Erro de token =>,', requestError.response.data.message)
            const refresh_token  = await storageGetUserRefreshToken();
            // console.log('Refreshing refresh token', refresh_token, 'na api')
            // console.log(signOut, 'signOut chegando na aPI')

          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          // if there is refresh_token we push a requisition to a queue to wait while we request a new token and refresh_token
          // But first we get the original requisition config and update the header with the token
          const originalRequestConfig = requestError.response.config;
          // console.log("Original request config", originalRequestConfig);

          if (isTokenRefreshing) {
            // console.log(isTokenRefreshing, 'TOKEN REFRESHING')
            return new Promise((resolve, reject) => {
              waitingRequestsQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    'Authorization': `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isTokenRefreshing = true;

          // then we use the refresh_token to request a new token and new refresh_token

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token,
              });
              console.log("DATA=> from refresh token", data);
              await storageSaveUSerToken(data.token);

             
              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              //update the original request and the next ones
              originalRequestConfig.headers = {
                'authorization': `Bearer ${data.token}`,
              };
              api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

              // process the requests on the waiting list
              waitingRequestsQueue.forEach((request) => {
                request.onSuccess(data.token);
              });

              console.log('tokens sendo atualizado na requisição ')

              resolve(api(originalRequestConfig));


            } catch (error: any) {
              waitingRequestsQueue.forEach((request) => {
                request.onFailure(error);
              });

              reject(error);
              signOut();

            } finally {
              isTokenRefreshing = false;
              waitingRequestsQueue = [];
            }
          });
        }
        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => api.interceptors.response.eject(interceptTokenValidation);
};

export { api };

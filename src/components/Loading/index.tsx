import { Center, Spinner, View} from 'native-base';

type LoadingProps = {
    spinnerColor: string
}

export const Loading =({ spinnerColor}:LoadingProps )=>{
    return (
        <Center
            mt={80}
            justifyContent='center'
            >
            <Spinner color={spinnerColor}/>
        </Center>
           
    )
};
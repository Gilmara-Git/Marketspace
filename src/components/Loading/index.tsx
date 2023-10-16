import { Center, Spinner, View} from 'native-base';


export const Loading =()=>{
    return (
        <Center
            mt={80}
            justifyContent='center'
            >
            <Spinner color='blue.900'/>
        </Center>
           
    )
};
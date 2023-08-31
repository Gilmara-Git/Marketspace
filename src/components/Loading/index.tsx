import { Center, Spinner} from 'native-base';


export const Loading =()=>{
    return (<
        Center flex={1}bg='gray.200'>
            <Spinner color='red.400'/>
        </Center>
    )
};
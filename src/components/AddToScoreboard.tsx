import { Button, HStack, Input } from "@chakra-ui/react";
import { createUser } from "../backend/Firebase";



const AddToScorboard = () => {

    function handleSubmit(event:any) {
        
    }

    return <form onSubmit={handleSubmit}>
        <HStack mt='8'>
            <Input variant='filled' />
            <Button  colorScheme='pink' px='8' type="submit" onClick={(event) => {event.preventDefault()
                 createUser("test@example.com", "test123456789")}}>Add to scoreboard</Button>
        </HStack>
    </form>
}

export default AddToScorboard;
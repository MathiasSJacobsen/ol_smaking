import {
  Button,
  Heading,
  HStack,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { getAuth, User } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { signIn } from "./backend/Firebase";

const SignIn = () => {
  const [eMail, seteMail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(getAuth().currentUser);
  const toast = useToast();

  const errors = {
    eMail: {
      error: false,
      message: "There is something worng with the e-mail",
    },
    password: {
      error: false,
      message: "There is something worng with the password",
    },
  };

  function checkErrors() {
    if (!eMail.includes("@") || !eMail.includes(".")) {
      errors.eMail.error = true;
    }
  }

  function handleSubmit(email: string, password: string) {
    signIn(email, password);
    const auth = getAuth();
    console.log(auth.currentUser);

    setUser(auth.currentUser);
  }

  return (
    <VStack
      p={4}
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
    >
      <Heading
        mb={8}
        fontWeight="bold"
        size="2xl"
        bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
        bgClip="text"
      >
        Sign in
      </Heading>
      <HStack>
        <Input
          variant="filled"
          placeholder="test@example.com"
          value={eMail}
          onChange={(event) => seteMail(event.target.value)}
        />
      </HStack>
      <HStack>
        <Input
          variant="filled"
          placeholder="Passord123"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </HStack>
      <Button
        onClick={(event) => {
          event.preventDefault();
          checkErrors();
          if (errors.eMail.error) {
            toast({
              title: errors.eMail.message,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return; // this needs to be the last check
          }
          handleSubmit(eMail, password);
        }}
      >
        Sign in
      </Button>
      <Button
        onClick={(event) => {
          event.preventDefault();
          console.log(user);
        }}
      >
        check
      </Button>
      {user && <Navigate to={"/scoreboard"} replace={true} />}
    </VStack>
  );
};

export default SignIn;

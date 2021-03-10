import { Container, Heading, Stack } from "@chakra-ui/layout";
import firebase from "firebase";
import React, { FC } from "react";
import { auth } from "../config/firebase";
import { LoginButton } from "./LoginButton";
import { Text } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

export const LoginForm: FC = () => {
  const handleLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Container
      w={["90%", "70%", "60%", "60%"]}
      textAlign="center"
      direction="column"
      justifyContent="center"
      padding={8}
      borderRadius={"12px"}
      centerContent
    >
      <Heading>Login to start talking about your hobbies</Heading>
      <Stack margin={4}>
        <Text>Choose the login option</Text>
        <LoginButton
          providerName="Google"
          providerAction={handleLoginWithGoogle}
          providerIcon={<FaGoogle />}
        />
      </Stack>
    </Container>
  );
};

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Chatroom } from "./components/Chatroom";
import { GreetingsForm } from "./components/GreetingsForm";
import {
  Button,
  Image,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { auth } from "./config/firebase";
import { Container, Flex, Heading, Stack } from "@chakra-ui/layout";
import { CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { LoginForm } from "./components/LoginForm";
import "./app.css";

export type Massage = {
  id: string;
  uid: string;
  text: string;
  photoURL: string;
  createdAt: {
    seconds: number;
  };
  username: string;
};

function App() {
  const [user, loading] = useAuthState(auth);
  const [roomName, setRoomName] = useState<string | null>(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const navColor = useColorModeValue("white", "gray.800");

  const handleSignOut = () => {
    setRoomName(null);
    auth.signOut();
  };

  const handleRoomChange = (roomName: string | null) => {
    setRoomName(roomName);
  };

  return (
    <div className="app">
      <Flex direction="column" height="100vh" justify="space-between">
        <Flex
          as="nav"
          justifyContent="space-between"
          p="4"
          alignItems="center"
          position="fixed"
          width="100%"
          backgroundColor={navColor}
          zIndex={10}
        >
          {user ? (
            <Stack direction="row" alignItems="center">
              <Image
                boxSize={["0", "72px"]}
                borderRadius="12px"
                src={user.photoURL as string}
              />
              <Heading size="lg">{user.displayName}</Heading>
            </Stack>
          ) : (
            <div></div>
          )}
          <Stack direction="row">
            {roomName && (
              <Button onClick={() => handleRoomChange(null)}>
                <CloseIcon boxSize="12px" />
              </Button>
            )}
            {user && <Button onClick={handleSignOut}>Logout</Button>}
            <Button onClick={toggleColorMode}>
              {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
        {roomName && <Spacer />}
        <Container
          maxW={{ base: "auto", xl: "95%" }}
          marginTop={["72px", "92px"]}
        >
          {!loading &&
            (user ? (
              roomName ? (
                <Chatroom roomName={roomName} />
              ) : (
                <GreetingsForm onRoomEnter={handleRoomChange} />
              )
            ) : (
              <LoginForm />
            ))}
        </Container>
      </Flex>
    </div>
  );
}

export default App;

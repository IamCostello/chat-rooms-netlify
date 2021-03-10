import { Button } from "@chakra-ui/button";
import { Container, Heading, Stack } from "@chakra-ui/layout";
import { Input, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";

interface GreetingsFormProps {
  onRoomEnter: (onRoomEnter: string) => void;
}

export const GreetingsForm: FC<GreetingsFormProps> = ({ onRoomEnter }) => {
  const [roomName, setroomName] = useState("");

  return (
    <Container
      as="form"
      maxW={["90%", "60%"]}
      alignItems="center"
      marginTop={[4, 12, 16, 24]}
      centerContent
    >
      <Heading textAlign="center" size="xl">
        What do you want to talk about?
      </Heading>
      <Stack maxW={["80%", "40%"]} spacing={1} marginTop={6}>
        <Text opacity={0.8}>Type 'global' for shared channel</Text>
        <Input
          autoFocus
          value={roomName}
          onChange={(event) => setroomName(event.target.value)}
        />
        <Button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            onRoomEnter(roomName);
          }}
        >
          Enter
        </Button>
      </Stack>
    </Container>
  );
};

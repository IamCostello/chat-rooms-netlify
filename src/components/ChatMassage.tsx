import { Flex, Stack } from "@chakra-ui/layout";
import { Image, Text, Tooltip } from "@chakra-ui/react";
import React, { FC } from "react";
import { auth } from "../config/firebase";

interface ChatMassageProps {
  message: string;
  userId: string;
  photoURL: string;
  createdAt: number;
  prevUserId: string;
  userName: string;
}

export const ChatMassage: FC<ChatMassageProps> = ({
  userId,
  message,
  photoURL,
  createdAt,
  prevUserId,
  userName,
}) => {
  const dateSend = new Date(createdAt * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const isUserMassage = userId === auth.currentUser?.uid;
  const isSameUser = prevUserId === userId;

  return (
    <Flex
      direction="row"
      m={2}
      marginTop={isSameUser ? "2" : "8"}
      justifyContent={isUserMassage ? "flex-end" : "flex-start"}
    >
      {!isUserMassage && !isSameUser && (
        <Tooltip label={dateSend}>
          <Image
            borderRadius="12px"
            boxSize="42px"
            src={photoURL}
            alt="user avatar"
          />
        </Tooltip>
      )}
      <Stack
        maxW="80%"
        paddingStart={2}
        paddingEnd={2}
        spacing={-1}
        alignItems={isUserMassage ? "flex-end" : "flex-start"}
      >
        {!isSameUser && (
          <Text fontSize="xs" opacity={0.3} textAlign="end">
            {userName}
          </Text>
        )}
        <Text
          textAlign={isUserMassage ? "justify" : "left"}
          fontSize="xl"
          marginStart={isSameUser ? "42px" : "0"}
          marginEnd={!isSameUser ? "0" : "42px"}
          wordBreak="break-word"
        >
          {message}
        </Text>
      </Stack>
      {isUserMassage && !isSameUser && (
        <Tooltip label={dateSend}>
          <Image
            borderRadius="12px"
            boxSize="42px"
            src={photoURL}
            alt="user avatar"
          />
        </Tooltip>
      )}
    </Flex>
  );
};

import React, { FC, useRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Massage } from "../App";
import { ChatMassage } from "./ChatMassage";
import firebase from "firebase";
import { SubmitForm } from "./SubmitForm";
import { auth, firestore } from "../config/firebase";
import { Flex, Heading } from "@chakra-ui/layout";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

interface ChatroomProps {
  roomName: string;
}

export const Chatroom: FC<ChatroomProps> = ({ roomName }) => {
  const messagesRef = firestore.collection(roomName);
  const query = messagesRef.orderBy("createdAt", "desc").limit(25);
  const [messages, loading] = useCollectionData<Massage>(query, {
    idField: "id",
  });

  const scrollToBottom = useRef<HTMLInputElement>(null);

  const handleScrollToBottom = () => {
    if (scrollToBottom && scrollToBottom.current) {
      scrollToBottom.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const handleSendMassage = async (message: string) => {
    if (auth.currentUser && message !== "") {
      const { uid, photoURL, displayName } = auth.currentUser;

      await messagesRef.add({
        text: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        username: displayName,
      });
    }

    handleScrollToBottom();
  };

  useEffect(() => {
    handleScrollToBottom();
  }, [loading]);

  let prevUser = "";
  let messageNode;
  if (messages && messages?.length > 0) {
    messageNode = messages?.reverse().map((msg) => {
      const mess = (
        <ChatMassage
          key={msg.id}
          message={msg.text}
          userId={msg.uid}
          photoURL={msg.photoURL}
          createdAt={msg.createdAt?.seconds}
          prevUserId={prevUser}
          userName={msg.username}
        />
      );
      prevUser = msg.uid;
      return mess;
    });
  } else {
    messageNode = (
      <Box centerContent margin={12} textAlign="center">
        <Heading size="lg">
          There doesn't seem to be anyone in this section
        </Heading>
        <Text fontSize="lg" opacity={0.8}>
          Be the first one to start the discussion
        </Text>
      </Box>
    );
  }

  return (
    <Box margin="0 auto" direction="column" maxW={["100%", "auto", "1200px"]}>
      <Flex direction="column">
        {loading ? (
          <Center w="100%" h="100vh">
            <Spinner />
          </Center>
        ) : (
          messages && messageNode
        )}
        <div ref={scrollToBottom}></div>
      </Flex>
      <SubmitForm onSend={handleSendMassage} />
    </Box>
  );
};

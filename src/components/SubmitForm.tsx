import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import React, { FC, useState } from "react";

interface SubmitFormProps {
  onSend: (message: string) => void;
}

export const SubmitForm: FC<SubmitFormProps> = ({ onSend }) => {
  const [formValue, setFormValue] = useState("");

  return (
    <Flex
      as="form"
      direction={["column", "row", "row", "row"]}
      alignContent="end"
      marginX={4}
      marginBottom={4}
    >
      <Input
        value={formValue}
        onChange={(event) => setFormValue(event.target.value)}
        size="sm"
        roundedLeft="lg"
        roundedRight="none"
        autoFocus
      />
      <Button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          onSend(formValue);
          setFormValue("");
        }}
        rightIcon={<ArrowForwardIcon h={4} w={4} />}
        size="sm"
        roundedLeft="none"
        roundedRight="lg"
      >
        Send
      </Button>
    </Flex>
  );
};

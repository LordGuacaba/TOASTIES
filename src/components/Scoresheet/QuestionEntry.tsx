"use client";
import { Buzz } from "@/utilities/types";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import BuzzEntry from "./BuzzEntry";
import BuzzValue from "./BuzzValue";

type QuestionEntryProps = {
  number: number;
  buzzes: Buzz[];
  handleDelete: () => void;
  roster: string[];
  current: boolean;
};

const QuestionEntry = ({
  number,
  buzzes,
  handleDelete,
  roster,
  current,
}: QuestionEntryProps) => {
  const [displayBuzzes, setDisplayBuzzes] = useState(buzzes);
  const [active, setActive] = useState(current);
  const updateBuzzes = () => {
    setDisplayBuzzes([...buzzes]);
  };

  const getBuzzValueProps = (buzz: Buzz) => {
    return {
      buzz,
      onDelete: () => {
        buzzes.splice(buzzes.indexOf(buzz), 1);
        updateBuzzes();
      },
      roster,
    };
  };

  const addBuzz = (buzz: Buzz) => {
    buzzes.push(buzz);
    updateBuzzes();
  };

  return (
    <Stack direction={"row"} spacing={2}>
      <Typography variant="h6" fontWeight={"bold"}>
        {number}
      </Typography>
      <Stack spacing={1}>
        {displayBuzzes.map((buzz, index) => (
          <BuzzValue key={index} {...getBuzzValueProps(buzz)} />
        ))}
        {current || active ? (
          <BuzzEntry
            addBuzz={addBuzz}
            roster={roster}
            onUnfocus={() => setActive(false)}
          />
        ) : (
          <></>
        )}
      </Stack>
      <Stack>
        <Button onClick={() => setActive(true)}>E</Button>
        <Button onClick={handleDelete}>X</Button>
      </Stack>
    </Stack>
  );
};

export default QuestionEntry;

"use client";
import { Question, Scoresheet } from "@/utilities/types";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useState, KeyboardEvent, use } from "react";
import QuestionEntry from "./QuestionEntry";
import { submitPacket } from "@/utilities/toastiesActions";
import { ToastContext } from "@/context/ToastContext";

type ScoresheetProps = {
  room: number;
  writer: string;
  reader: string;
  roster: string[];
};

const genericQuestion = (number: number) => ({
  number,
  buzzes: [],
});

const ScoresheetForm = (props: ScoresheetProps) => {
  const [results, setResults] = useState<Question[]>([genericQuestion(1)]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { toast } = use(ToastContext);

  const addQuestion = () => {
    const question = genericQuestion(results.length + 1);
    setResults([...results, question]);
  };

  const deleteQuestion = (index: number) => {
    const newResults = results.toSpliced(index, 1);
    newResults.forEach((question, ind) => {
      if (ind >= index) {
        question.number--;
      }
    });
    setResults(newResults);
  };

  const handleKeyboardAddQuestion = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      addQuestion();
    }
  };

  const questionEntryProps = (question: Question, index: number) => ({
    question,
    handleDelete: () => deleteQuestion(index),
    roster: props.roster,
    current: question.number === results.length,
  });

  const onSubmitClick = async () => {
    const scoresheet: Scoresheet = {
      toast: toast?.id,
      room: props.room,
      writer: props.writer,
      reader: props.reader === "" ? undefined : props.reader,
      roster: props.roster,
      questions: results,
    };
    setSubmitLoading(true);
    console.log(props.room);
    console.log(props.writer);
    const success = await submitPacket(props.room, props.writer, scoresheet);
    console.log(success);
    setSubmitLoading(false);
  };

  return (
    <Container onKeyDown={handleKeyboardAddQuestion}>
      <Stack spacing={3}>
        <Typography variant="h3" fontWeight={"bold"}>
          Packet writer: {props.writer}
        </Typography>
        <Typography variant="h4">
          Packet reader: {props.reader === "" ? props.writer : props.reader}
        </Typography>
        <Stack spacing={2}>
          {results.map((question, index) => (
            <QuestionEntry
              key={index}
              {...questionEntryProps(question, index)}
            />
          ))}
        </Stack>
        <Button variant="outlined" onClick={addQuestion}>
          Add Question
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={onSubmitClick}
          loading={submitLoading}
        >
          Submit Packet
        </Button>
      </Stack>
    </Container>
  );
};

export default ScoresheetForm;

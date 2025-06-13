'use client'
import { Buzz, Question } from "@/utilities/scoresheetTypes";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import BuzzEntry from "./BuzzEntry";
import BuzzValue from "./BuzzValue";

type QuestionEntryProps = {
    question: Question,
    handleDelete: () => void,
}

const QuestionEntry = ({ question, handleDelete } : QuestionEntryProps) => {
    const [buzzes, setBuzzes] = useState(question.buzzes);
    const updateBuzzes = () => { setBuzzes([...question.buzzes]) }

    const getBuzzValueProps = (buzz: Buzz) => {
        return {
            buzz,
            onDelete: () => {
                question.buzzes.splice(question.buzzes.indexOf(buzz), 1);
                updateBuzzes();
            }
        }
    }

    const addBuzz = (buzz: Buzz) => {
        question.buzzes.push(buzz);
        updateBuzzes();
    }

    return (
        <Stack direction={'row'} spacing={2}>
            <Typography variant="h6" fontWeight={'bold'}>
                {question.number}
            </Typography>
            <Stack spacing={1} >
                {buzzes.map((buzz, index) => (
                    <BuzzValue key={index} {...getBuzzValueProps(buzz)} />
                ))}
                <BuzzEntry addBuzz={addBuzz} />
            </Stack>
            <Button onClick={handleDelete}>X</Button>
        </Stack>
    )
}

export default QuestionEntry;
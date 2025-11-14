'use client'
import { Buzz, Question } from "@/utilities/scoresheetTypes";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import BuzzEntry from "./BuzzEntry";
import BuzzValue from "./BuzzValue";

type QuestionEntryProps = {
    question: Question,
    handleDelete: () => void,
    roster: string[],
    current: boolean,
}

const QuestionEntry = ({ question, handleDelete, roster, current } : QuestionEntryProps) => {
    const [buzzes, setBuzzes] = useState(question.buzzes);
    const [active, setActive] = useState(current);
    const updateBuzzes = () => { setBuzzes([...question.buzzes]) }

    const getBuzzValueProps = (buzz: Buzz) => {
        return {
            buzz,
            onDelete: () => {
                question.buzzes.splice(question.buzzes.indexOf(buzz), 1);
                updateBuzzes();
            },
            roster,
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
                { current || active ? <BuzzEntry addBuzz={addBuzz} roster={roster} onUnfocus={() => setActive(false)} /> : <></>}
            </Stack>
            <Stack>
                <Button onClick={() => setActive(true)}>E</Button>
                <Button onClick={handleDelete}>X</Button>
            </Stack>
        </Stack>
    )
}

export default QuestionEntry;
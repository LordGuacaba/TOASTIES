import { submitPacket } from "@/utilities/actions";
import { Question } from "@/utilities/scoresheetTypes";
import { Button, Container, Stack, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { KeyboardEvent } from "react";
import QuestionEntry from "./QuestionEntry";

type ScoresheetProps = {
    room: number,
    writer: string,
    reader: string,
    roster: string[]
}

const ScoresheetForm = (props: ScoresheetProps) => {
    
    return (
        <Container>
        <Stack>
            <Typography variant="h3" fontWeight={'bold'}>
                Packet writer: {props.writer}
            </Typography>
            <Typography variant="h4">
                Packet reader: {props.reader === '' ? props.writer : props.reader}
            </Typography>
            <Formik
                initialValues={{
                    results: [],
                }}
                onSubmit={ async(values) => {
                    const scoresheet = {
                        reader: props.reader === '' ? undefined : props.reader,
                        roster: props.roster,
                        results: values.results
                    }
                    await submitPacket(props.room, props.writer, scoresheet)
                }}
            >
                {({ values }) => (
                    <Form onKeyDown={(e: KeyboardEvent) => {if (e.key === "Enter") {e.preventDefault()}}}>
                        <FieldArray name='results'>
                            {({ remove, push }) => (
                                <Stack>
                                    {values.results.map((question: Question, index) => (
                                        <QuestionEntry 
                                            key={index} 
                                            question={question} 
                                            handleDelete={() => {
                                                remove(index);
                                                // values.results.forEach((q: Question) => {
                                                //     if (q.number > index+1) {
                                                //         q.number--;
                                                //     }
                                            }}
                                        />
                                    ))}
                                    <Stack direction={'row'} spacing={2}>
                                        <Button 
                                            variant="outlined" 
                                            onClick={() => {push({
                                                number: values.results.length+1,
                                                buzzes: [],
                                            })}}>
                                                Add Question
                                            </Button>
                                    </Stack>
                                </Stack>
                            )}
                        </FieldArray>
                        <Button type="submit" color="secondary" variant="contained">Submit Packet</Button>
                    </Form>
                )}
            </Formik>
        </Stack>
        </Container>
    )
}

export default ScoresheetForm;
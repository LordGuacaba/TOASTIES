'use client'
import { Chip, TextField, Stack, Button, Container } from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { KeyboardEvent } from "react";

type ScoresheetFormProps = {
    setScoresheetValues: (roster: ScoresheetValues) => void,
}

export type ScoresheetValues = {
    writer: string,
    reader: string,
    roster: string[],
}

const ScoresheetStartForm = ({ setScoresheetValues }: ScoresheetFormProps) => {

    const handleNameSubmit = (push: (name: string) => void) => {
        const enterName = document.querySelector("#enterName") as HTMLTextAreaElement;
        if (enterName.value !== '') {
            push(enterName.value);
            enterName.value = '';
        }
    }

    const FormTextField = (props: {label: string}) => (
        <TextField {...props} />
      );

    return (
        <Container maxWidth='xs'>
            <Formik
                initialValues={{
                    writer: '',
                    reader: '',
                    roster: [],
                }}
                onSubmit={(values) => {
                    setScoresheetValues(values);
                }}
            >
            {({ values }) => (
                <Form onKeyDown={(e: KeyboardEvent) => {if (e.key === "Enter") {e.preventDefault()}}}>
                    <Stack spacing={'1.5vh'}>
                        <Field 
                            as={FormTextField}
                            name='writer'
                            label='Enter writer name'
                            type='text'
                            required
                        />
                        <Field
                            as={FormTextField}
                            name='reader'
                            label='Enter reader name (leave blank for no reader)'
                            type='text'
                        />
                        <FieldArray name='roster'>
                            {({ remove, push }) => (
                                <div>
                                    <Stack direction={'row'} spacing={'1vw'}>
                                        <TextField
                                            id='enterName'
                                            label='Enter player names'
                                            onKeyDown={(e: KeyboardEvent) => {if (e.key === "Enter") {handleNameSubmit(push)}}}
                                            fullWidth
                                        />
                                        <Button onClick={() => handleNameSubmit(push)}>
                                            Add
                                        </Button>
                                    </Stack>
                                    {values.roster.map((player, index) => (
                                        <Chip key={index} label={player} onDelete={() => remove(index)}/>
                                    ))}
                                </div>
                            )}
                        </FieldArray>
                        <Button type="submit" color="secondary" variant="contained">
                            Start scoresheet
                        </Button>
                    </Stack>
                </Form>
            )}
            </Formik>
        </Container>
    )
}

export default ScoresheetStartForm;
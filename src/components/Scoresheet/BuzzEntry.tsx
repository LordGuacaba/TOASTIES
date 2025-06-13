'use client'
import { Buzz, Points } from "@/utilities/scoresheetTypes";
import { Button, FormControlLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type BuzzEntryProps = {
    addBuzz: (buzz: Buzz) => void,
}

const BuzzEntry = ( { addBuzz }: BuzzEntryProps) => {
    const [player, setPlayer] = useState('');
    const [points, setPoints] = useState<Points>(10);

    const handlePointsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPoints(parseInt(e.target.value) as Points);
    }

    const handleSubmit = () => {
        const buzz = {
            player,
            points,
        };
        addBuzz(buzz);
        setPlayer('');
        setPoints(10);
    }

    const handleKeyPresses = (e: KeyboardEvent) => {
        switch (e.key) {
            case "Enter":
                handleSubmit();
                break;
            case "Tab":
                e.preventDefault();
                if (points === 15) {
                    setPoints(10);
                } else if (points === 10) {
                    setPoints(-5);
                } else {
                    setPoints(15);
                }
                break;
            default:
                return undefined
        }
    }

    return (
        <Stack 
            direction={'row'} 
            sx={{border: '1.5px solid rgb(135, 70, 0)', borderRadius: 5}}
            onKeyDown={handleKeyPresses}
        >
            <TextField 
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPlayer(e.target.value)} 
                value={player}
            />
            <RadioGroup 
                row 
                id='points-selector' 
                aria-labelledby="points-radio-label" 
                onChange={handlePointsChange}
                value={points}
            >
                <FormControlLabel value={15} control={<Radio />} label="15" />
                <FormControlLabel value={10} control={<Radio />} label="10" />
                <FormControlLabel value={-5} control={<Radio />} label="-5" />
            </RadioGroup>
            <Button onClick={handleSubmit}>Add</Button>
        </Stack>
    )
}

export default BuzzEntry;
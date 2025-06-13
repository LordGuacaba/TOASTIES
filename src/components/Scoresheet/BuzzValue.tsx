'use client'

import { Buzz } from "@/utilities/scoresheetTypes";
import { Button, Divider, Stack, Typography } from "@mui/material";

type BuzzValueProps = {
    buzz: Buzz,
    onDelete: () => void;
}

const BuzzValue = ( {buzz, onDelete}: BuzzValueProps ) => {

    return (
        <Stack direction="row">
            <Typography variant="body1" sx={{padding: "0 1.5vw"}}>
                {buzz.player}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body1" sx={{padding: "0 1.5vw"}}>
                {buzz.points}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Button onClick={onDelete}>X</Button>
        </Stack>
    )
}

export default BuzzValue;
'use client'
import ScoresheetStartForm, { ScoresheetValues } from "@/components/Scoresheet/ScoresheetStartForm";
import { Container } from '@mui/material'
import { useEffect, useState } from "react";
import ScoresheetForm from "@/components/Scoresheet/ScoresheetForm2";

const ScoresPage = ({ params }: {params: Promise<{room: number}>}) => {
    const [scoresheetValues, setScoresheetValues] = useState<ScoresheetValues | null>(null);
    const [room, setRoom] = useState<number | null>(null);

    useEffect(() => {
        const getRoomNumber = async() => {
            const { room } = await(params);
            setRoom(room);
        }
        getRoomNumber()
    }, [params])

    return (
        <Container>
            {scoresheetValues ? 
                <ScoresheetForm room={room ?? 0} {...scoresheetValues}/>
                : <ScoresheetStartForm setScoresheetValues={setScoresheetValues}/>
            }
        </Container>
    )


}

export default ScoresPage;
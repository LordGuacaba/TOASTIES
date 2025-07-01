'use client'
import StatTable from "@/components/Statsheet/StatTable";
import { getStats } from "@/utilities/actions";
import { Statline } from "@/utilities/statsheetTypes";
import { Container, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const StatsPage = ({ params }: {params: Promise<{room: number}>}) => {
    const [room, setRoom] = useState<number>(-1);
    const [currentSheet, setCurrentSheet] = useState("Overall");
    const [sheets, setSheets] = useState<string[]>([]);
    const [statsheets, setStatsheets] = useState<Statline[][]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const getRoomNumber = async() => {
            const { room } = await(params);
            setRoom(room);
        }
        getRoomNumber();
    }, [params]);

    useEffect(() => {
        const getStatsheets = async() => {
            setLoading(true);
            const { writers, statsheets } = await getStats(room);
            setSheets(writers);
            setStatsheets(statsheets);
            if (statsheets.length) {
                setLoading(false);
            }
        }
        getStatsheets();
    }, [room])

    const handleSheetChange = (event: SelectChangeEvent) => {
        setCurrentSheet(event.target.value);
    }

    return (
        <Container maxWidth="xl" sx={{mb: "3vh"}}>
            <Stack direction={"column"}>
                <Typography variant="h2" align="center" sx={{mb: "1vh"}}>
                    Tournament Stats - {room === 0 ? "Combined" : `Room ${room}`}
                </Typography>
                <Select
                    value={currentSheet}
                    onChange={handleSheetChange}
                    sx={{mb: "1vh", maxWidth: "30vw"}}
                >
                    {sheets.map((writer) => (
                        <MenuItem key={writer} value={writer}>{writer}</MenuItem>
                    ))}
                </Select>
                {loading ? 
                    <Skeleton variant="rectangular" height={"60vh"} />
                    : <StatTable stats={statsheets.at(sheets.indexOf(currentSheet))} />
                }
            </Stack>
        </Container>
    )
}

export default StatsPage;
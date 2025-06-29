'use client'
import StatTable from "@/components/Statsheet/StatTable";
import { getStats } from "@/utilities/actions";
import { Statline } from "@/utilities/statsheetTypes";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const StatsPage = ({ params }: {params: Promise<{room: number}>}) => {
    const [room, setRoom] = useState<number>(-1);
    const [currentSheet, setCurrentSheet] = useState("Overall");
    const [sheets, setSheets] = useState<string[]>([]);
    const [statsheets, setStatsheets] = useState<Statline[][]>([]);
    
    useEffect(() => {
        const getRoomNumber = async() => {
            const { room } = await(params);
            setRoom(room);
        }
        getRoomNumber();
    }, [params]);

    useEffect(() => {
        const getStatsheets = async() => {
            const { writers, statsheets } = await getStats(room);
            setSheets(writers);
            setStatsheets(statsheets)
        }
        getStatsheets();
    }, [room])

    const handleSheetChange = (event: SelectChangeEvent) => {
        setCurrentSheet(event.target.value);
    }

    return (
        <Stack direction={"column"}>
            <Select
                value={currentSheet}
                onChange={handleSheetChange}
            >
                {sheets.map((writer) => (
                    <MenuItem key={writer} value={writer}>{writer}</MenuItem>
                ))}
            </Select>
            <StatTable stats={statsheets.at(sheets.indexOf(currentSheet))} />
        </Stack>
    )
}

export default StatsPage;
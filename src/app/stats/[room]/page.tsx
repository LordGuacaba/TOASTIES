'use client'
import StatTable from "@/components/Statsheet/StatTable";
import { getRoomStats } from "@/utilities/actions";
import { Statline } from "@/utilities/statsheetTypes";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const StatsPage = ({ params }: {params: Promise<{room: number}>}) => {
    const [room, setRoom] = useState<number>(0);
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
        const getStats = async() => {
            const { writers, statsheets } = await getRoomStats(room);
            setSheets(writers);
            setStatsheets(statsheets)
        }
        getStats();
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
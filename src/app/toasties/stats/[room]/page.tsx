"use client";
import StatTable from "@/components/Statsheet/StatTable";
import { getStats } from "@/utilities/toastiesActions";
import { Statsheet } from "@/utilities/types";
import {
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const StatsPage = ({ params }: { params: Promise<{ room: number }> }) => {
  const [room, setRoom] = useState<number>(-1);
  const [currentSheet, setCurrentSheet] = useState("Overall");
  const [writers, setWriters] = useState<string[]>([]);
  const [statsheets, setStatsheets] = useState<Statsheet[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRoomNumber = async () => {
      const { room } = await params;
      setRoom(room);
    };
    getRoomNumber();
  }, [params]);

  useEffect(() => {
    const getStatsheets = async () => {
      setLoading(true);
      const statsheets = await getStats(room);
      setWriters(statsheets.map((s) => s.writer));
      setStatsheets(statsheets);
      setLoading(false);
    };
    getStatsheets();
  }, [room]);

  const handleSheetChange = (event: SelectChangeEvent) => {
    setCurrentSheet(event.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: "3vh" }}>
      <Stack direction={"column"}>
        <Typography variant="h2" align="center" sx={{ mb: "1vh" }}>
          Tournament Stats - {room === 0 ? "Combined" : `Room ${room}`}
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" height={"60vh"} />
        ) : (
          <>
            {statsheets.length === 0 ? (
              <p>
                No stats right now! Check back later when scores have been
                entered
              </p>
            ) : (
              <>
                <Select
                  value={currentSheet}
                  onChange={handleSheetChange}
                  sx={{ mb: "1vh", maxWidth: "30vw" }}
                >
                  {writers.map((writer) => (
                    <MenuItem key={writer} value={writer}>
                      {writer}
                    </MenuItem>
                  ))}
                </Select>
                <StatTable
                  stats={statsheets.at(writers.indexOf(currentSheet))?.stats}
                />
              </>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default StatsPage;

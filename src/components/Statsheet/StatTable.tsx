import { points, ppg, Statline } from "@/utilities/statsheetTypes"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

type StatTableProps = {
    stats: Statline[] | undefined,
}

const StatTable = ({ stats }: StatTableProps) => {

    const tableData = stats?.map((statline, index) => ({
        rank: index+1,
        name: statline.name,
        played: statline.played,
        powers: statline.powers,
        gets: statline.gets,
        negs: statline.negs,
        read: statline.read,
        written: statline.written,
        points: points(statline),
        ppg: ppg(statline),
    }));

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "60vw" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Rank</TableCell>
                        <TableCell align="center">Player</TableCell>
                        <TableCell align="center">Played</TableCell>
                        <TableCell align="center">15</TableCell>
                        <TableCell align="center">10</TableCell>
                        <TableCell align="center">-5</TableCell>
                        <TableCell align="center">Written</TableCell>
                        <TableCell align="center">Read</TableCell>
                        <TableCell align="center">Points</TableCell>
                        <TableCell align="center">PPG</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.map((player) => (
                        <TableRow key={player.name}>
                            <TableCell align="center">{player.rank}</TableCell>
                            <TableCell component="th" scope="row" align="center">{player.name}</TableCell>
                            <TableCell align="center">{player.played}</TableCell>
                            <TableCell align="center">{player.powers}</TableCell>
                            <TableCell align="center">{player.gets}</TableCell>
                            <TableCell align="center">{player.negs}</TableCell>
                            <TableCell align="center">{player.written}</TableCell>
                            <TableCell align="center">{player.read}</TableCell>
                            <TableCell align="center">{player.points}</TableCell>
                            <TableCell align="center">{player.ppg}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
    
}

export default StatTable;
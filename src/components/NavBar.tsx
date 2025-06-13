'use client'

import { rooms, addRoom } from "@/utilities/actions";
import { Alert, AppBar, Button, Snackbar, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RoomMenu from "./RoomMenu";
import toast from "../../public/toast.png"
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [roomCount, setRoomCount] = useState<number>(0); 
    const [open, setOpen] = useState(false);

    const handleAddRoom = async() => {
        setLoading(true);
        const newRoom = await addRoom();
        setLoading(false)
        setRoomCount(newRoom)
        setOpen(true)
    }

    const handleSnackbarClose = () => setOpen(false);

    useEffect(() => {
        async function getRooms() {
            const count = await rooms();
            setRoomCount(count)
        } 
        getRooms()
    }, [roomCount])

    return (
        <div>
        <AppBar position="static">
            <Toolbar>
                <Link href="/">
                    <Image src={toast} alt="tasty buttered toast" height="50"/>
                </Link>
                <Link href="/">
                    <Typography variant="h5" sx={{margin: 1, marginLeft: 2}}>
                        TOASTIES
                    </Typography>
                </Link>
                <RoomMenu text="Start packet" roomCount={roomCount}/>
                <RoomMenu text="Stats" roomCount={roomCount} stats/>
                <Button 
                    loading={loading} 
                    variant="contained" 
                    color="secondary"
                    onClick={handleAddRoom}
                    sx={{margin: 1}}
                >
                    Add Room
                </Button>
            </Toolbar>
        </AppBar>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
            onClose={handleSnackbarClose}
        >
            Successfuly added room {roomCount}
        </Alert>
    </Snackbar>
    </div>
    )
}

export default NavBar;
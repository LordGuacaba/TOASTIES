import axios from "axios"
import { Scoresheet } from "./scoresheetTypes";
import { Statsheets } from "./statsheetTypes";

const base_url = "http://localhost:8000";

export async function rooms() {
    const response = await axios.get(`${base_url}/rooms`);
    return response.data["rooms"];
}

export async function addRoom() {
    const response = await axios.post(`${base_url}/addroom`);
    if (response.status === 200) {
        return response.data["new room number"]
    } else {
        return response.data["message"]
    }
    
}

export async function getStats(room: number) {
    if (room === -1) {
        return {
            writers: [],
            statsheets: []
        }
    }
    const response = await axios.get(`${base_url}/stats/${room}`)
        .catch((reason) => {console.log(`an error occured: ${reason}`); return})
    return response?.data as Statsheets;
}

export async function submitPacket(room: number, writer: string, scoresheet: Scoresheet) {
    if (room === 0) {
        return false;
    }
    const response = await axios.post(`${base_url}/submitpacket/${room}?writer=${writer}`, scoresheet)
        .catch((reason) => {console.log(`an error occured: ${reason}`); return})
    return response?.status === 201;
} 
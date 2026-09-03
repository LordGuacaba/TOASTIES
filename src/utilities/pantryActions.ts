import axios from "axios"
import { Statsheet, Toast, Player } from "./types";

const base_url = "http://localhost:8000/pantry"; // Default host for API

export const addPlayer = async (player: Player) => {
    const response = await axios.post(`${base_url}/addplayer`, player)
        .catch((reason) => {console.log(`an error occured: ${reason}`); return})
    return response?.status === 201;
}

export const getPlayers = async (since? : number) => {
    const url = since ? `${base_url}/players?since=${since}` : `${base_url}/players`;
    const response = await axios.get(url)
        .catch((reason) => {console.log(`an error occured: ${reason}`); return})
    return response?.data as Player[];
}

export const getToasts = async () => {
    const response = await axios.get(`${base_url}/toasts`)
        .catch((reason) => {console.log(`an error occured: ${reason}`); return})
    return response?.data as Toast[];
}

export const getStatsByToast = async (toast: string) => {
    const response = await axios.get(`${base_url}/stats/${toast}`)
        .catch((reason) => {console.log(`an error occured: ${reason}`); return})
    return response?.data as Statsheet[];
}

export const getAllStats = async () => {
    const response = await axios.get(`${base_url}/stats`)
        .catch((reason) => {console.log(`an error occured: ${reason}`); return})
    return response?.data as Statsheet[];
}
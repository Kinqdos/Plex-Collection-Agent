import axios from "axios";
import {useEffect, useState} from "react";
import {Storage} from "./Storage";

export const TMDB_URL = "https://api.themoviedb.org/3"

export async function getPlex(url) {
    const result = await axios.get(`${Storage.getPlexURL()}${url}`, { params: { "X-Plex-Token": Storage.getPlexToken()} })
    return result.data.MediaContainer
}

export async function putPlex(url) {
    const result = await axios.put(`${Storage.getPlexURL()}${url}&X-Plex-Token=${Storage.getPlexToken()}`)
    return result.data.MediaContainer
}

export async function getTMDB(url) {
    const result = await axios.get(`${TMDB_URL}${url}`, { params: { "api_key": Storage.getTMDBToken()} })
    return result.data
}

export function getTMDBImage(path, size) {
    if (path == null) return null
    return `https://image.tmdb.org/t/p/${size}${path}`
}

export function getPlexImage(path) {
    return `${Storage.getPlexURL()}/photo/:/transcode?width=300&height=450&url=${path}&X-Plex-Token=${Storage.getPlexToken()}`
}

export function SearchInput({value, onChange, ...rest}) {
    const [searchTerm, setSearchTerm] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => onChange(searchTerm), 300)
        return () => clearTimeout(timeout)
    }, [searchTerm])

    return <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
}

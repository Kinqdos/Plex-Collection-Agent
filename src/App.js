import "./App.scss"
import React, {useEffect, useState} from "react";
import {LibrarySelection} from "./components/LibrarySelection/LibrarySelection";
import {CollectionSelection} from "./components/CollectionSelection/CollectionSelection";
import {NavBar} from "./components/NavBar/NavBar";
import {SetupDialog} from "./components/SetupDialog/SetupDialog";
import {Storage} from "./util/Storage";
import {getPlex, getTMDB} from "./util/Util";
import Swal from "sweetalert2";

export function App() {
    const [library, setLibrary] = useState(null)
    const [language, setLanguage] = useState(null)
    const [showSetup, setShowSetup] = useState(!Storage.hasRequiredData())

    useEffect(async () => {
        if (!showSetup && !(await checkSetup())) {
            setShowSetup(true)
        }
    }, [])

    function update(libKey, lang) {
        setLibrary(libKey)
        setLanguage(lang)
    }

    return (
        <>
            <NavBar openSetup={() => setShowSetup(true)}/>
            {showSetup && <SetupDialog closeable={Storage.hasRequiredData()} close={() => setShowSetup(false)}/>}
            {!showSetup &&
                <div id="main-content">
                    <LibrarySelection selectedLibrary={library} setLibraryAndLang={update}/>
                    {library && <CollectionSelection libKey={library} language={language}/>}
                </div>
            }
        </>
    )
}

export async function checkSetup() {
    //Check if Plex Credentials are correct
    try {
        await getPlex("/library")
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Swal.fire({
                title: "Invalid plex token",
                html: "Your server rejected the token. Please check it and try again",
                icon: "error",
                background: "#2b2b2b",
                confirmButtonText: "Retry",
                heightAuto: false
            })
        } else {
            Swal.fire({
                title: "Can't connect to your plex server.",
                html: "Please check the url as well as your internet connection.",
                icon: "error",
                background: "#2b2b2b",
                confirmButtonText: "Retry",
                heightAuto: false
            })
        }
        return false
    }
    //Check TMDB Token
    try {
        await getTMDB("/configuration")
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Swal.fire({
                title: "Invalid TMDB token",
                html: "TMDB rejected the token. Please check it and try again",
                icon: "error",
                background: "#2b2b2b",
                confirmButtonText: "Retry",
                heightAuto: false
            })
        } else {
            Swal.fire({
                title: "Can't connect to TMDB.",
                html: "Please check your internet connection.",
                icon: "error",
                background: "#2b2b2b",
                confirmButtonText: "Retry",
                heightAuto: false
            })
        }
        return false
    }
    return true
}

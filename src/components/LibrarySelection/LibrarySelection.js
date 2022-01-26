import "./LibrarySelections.scss"
import {useEffect, useState} from "react";
import {getPlex} from "../../util/Util";
import {MovieIcon, MusicIcon, TVShowIcon} from "../../util/SvgIcons";

export function LibrarySelection({selectedLibrary, setLibraryAndLang}) {
    const [libraries, setLibraries] = useState(null)
    useEffect(async () => {
        const result = await getPlex("/library/sections")
        setLibraries(result.Directory.filter(lib => lib.type === "movie" || lib.type === "show" || lib.type === "artist"))
    }, [])

    const uiLibs = libraries?.map(lib => <Library key={lib.key} library={lib} selectedKey={selectedLibrary} onClick={() => setLibraryAndLang(lib.key, lib.language)}/>)
    return (
        <div id="library-selection">
            {uiLibs}
        </div>
    )
}

function Library({library, selectedKey, onClick}) {
    const selected = selectedKey === library.key

    return (
        <span className={`library-button ${selected ? "selected" : ""}`} onClick={onClick}>
            {getLibraryIcon(library.type)}
            <span className="library-title">{library.title}</span>
        </span>
    )
}

function getLibraryIcon(type) {
    switch (type) {
        case "movie":
            return <MovieIcon/>
        case "show":
            return <TVShowIcon/>
        case "artist":
            return <MusicIcon/>
    }
}

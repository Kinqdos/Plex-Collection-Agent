import "./SetupDialog.scss"
import ReactDOM from "react-dom";
import {CloseIcon} from "../../util/SvgIcons";
import {useState} from "react";
import {Storage} from "../../util/Storage";
import {getPlex} from "../../util/Util";
import Swal from "sweetalert2";
import {checkSetup} from "../../App";

export function SetupDialog({closeable, close}) {
    const [token, setToken] = useState(Storage.getPlexToken() ?? "")
    const [tmdbtoken, setTmdbToken] = useState(Storage.getTMDBToken() ?? "")
    const [url, setURL] = useState(Storage.getPlexURL() ?? "")

    async function save(e) {
        e.preventDefault()
        Storage.setPlexToken(token)
        Storage.setPlexURL(url)
        Storage.setTMDBToken(tmdbtoken)
        if (await checkSetup()) {
            close()
        }
    }

    return ReactDOM.createPortal(
        <div className="dialog-wrapper">
            <form className="dialog" onSubmit={e => save(e)}>
                <SetupHeader closeable={closeable} close={close}/>
                <SetupContent token={token} setToken={setToken} url={url} setURL={setURL} tmdbToken={tmdbtoken} setTmdbToken={setTmdbToken}/>
                <SetupFooter closeable={closeable} save={save} close={close}/>
            </form>
        </div>
        , document.body)
}

function SetupHeader({closeable, close}) {

    return (
        <div className="dialog-header">
            <h4>Setup</h4>
            {closeable && <CloseIcon onClick={close}/>}
        </div>
    )
}

function SetupFooter({closeable, close}) {
    return (
        <div id="setup-footer" className="dialog-bar">
            {closeable && <button type="button" className="btn-default" onClick={close}>Cancel</button>}
            <button className="btn-primary">Save</button>
        </div>
    )
}

function SetupContent({token, setToken, url, setURL, tmdbToken, setTmdbToken}) {
    return (
        <div id="setup-content">
            <SetupContentItem name="Plex-Token" value={token} setValue={setToken}/>
            <SetupContentItem name="Plex-Server-URL" value={url} setValue={setURL}/>
            <SetupContentItem name="TMDB-Token" value={tmdbToken} setValue={setTmdbToken}/>
        </div>
    )
}

function SetupContentItem({name, value, setValue}) {
    return (
        <div className="setup-content-item">
            <span>{name}</span>
            <input type="text" value={value} onChange={event => setValue(event.target.value)} required/>
        </div>
    )
}

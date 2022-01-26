import "./NavBar.scss"
import {PlexIcon, SettingsIcon} from "../../util/SvgIcons";

export function NavBar({openSetup}) {
    return (
        <div id="navbar">
            <div>
                <PlexIcon/>
                <h4 id="navbar-caption">-Collection-Agent</h4>
            </div>

            <div>
                <SettingsIcon id="setup-button" onClick={openSetup}/>
            </div>
        </div>
    )
}

const {app, BrowserWindow} = require("electron")
require("dotenv").config()
const devMode = process.env.dev === "true"

async function main() {
    await app.whenReady()

    const window = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        show: false,
        title: "Plex-Collection-Agent by Kinqdos"
    })
    window.setMenuBarVisibility(false)

    if (devMode) {
        window.loadURL("http://localhost:3000").then()
    } window.loadFile("build/index.html").then()

    window.once("ready-to-show", () => {
        window.show()
        if (devMode) window.webContents.openDevTools()
    })
}


main().then()

export class Storage {

    static setApplies(applies) {
        localStorage.setItem("applies", applies.join(","))
    }

    static getApplies() {
        return localStorage.getItem("applies")?.split(",")?.map(it => it === "true") ?? [true, true, true]
    }

    static setTMDBToken(token) {
        return localStorage.setItem("tmdb-token", token)
    }

    static getTMDBToken() {
        return localStorage.getItem("tmdb-token")
    }

    static setPlexToken(token) {
        return localStorage.setItem("token", token)
    }

    static getPlexToken() {
        return localStorage.getItem("token")
    }

    static setPlexURL(url) {
        return localStorage.setItem("url", url)
    }

    static getPlexURL() {
        return localStorage.getItem("url")
    }

    static hasRequiredData() {
        return Storage.getTMDBToken() && Storage.getPlexToken() && Storage.getPlexURL()
    }

}

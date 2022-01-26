import "./TMDBSearch.scss"
import {getTMDB, getTMDBImage, SearchInput} from "../../util/Util";
import ReactDOM from "react-dom";
import {useEffect, useState} from "react";
import {CloseIcon} from "../../util/SvgIcons";
import {ApplyBar} from "./ApplyBar/ApplyBar";
import {Storage} from "../../util/Storage";

export function TMDBSearch({collection, language, onComplete}) {
    const [result, setResult] = useState([])
    const [query, setQuery] = useState(collection)
    const isQueryEmpty = query.replaceAll(" ", "").length === 0

    useEffect(async () => {
        //Clear results if query is empty
        if (isQueryEmpty) {
            setResult([])
            return
        }
        //Fetch and update data
        const res = await getTMDB(`/search/collection?query=${encodeURIComponent(query)}&language=${language}`)
        setResult(res.results)
    }, [query])

    return ReactDOM.createPortal(
        <div className="dialog-wrapper">
            <div className="dialog">
                <SearchHeader collection={collection} onComplete={onComplete}/>
                <SearchResults results={result} isQueryEmpty={isQueryEmpty} onComplete={onComplete}/>
                <SearchFooter query={query} setQuery={setQuery}/>
            </div>
        </div>
        , document.body)
}

function SearchHeader({collection, onComplete}) {
    return (
        <div className="dialog-header">
            <h4>Search in OMDB</h4>
            <span>Collection: {collection}</span>
            <ApplyBar/>
            <CloseIcon onClick={() => onComplete(null)}/>
        </div>
    )
}

function SearchFooter({query, setQuery}) {
    return (
        <div id="search-dialog-footer" className="dialog-bar">
            <span>Search:</span>
            <SearchInput id="search-dialog-input" value={query} onChange={setQuery}/>
        </div>
    )
}

function SearchResults({results, isQueryEmpty, onComplete}) {
    let content
    if (isQueryEmpty) {
        content = <div id="search-result-prompt">Please enter a search query.</div>
    } else if (results.length === 0) {
        content = <div id="search-result-prompt">No collections found.</div>
    } else content = results.map(item => <SearchItem key={item.id} item={item} onClick={() => onComplete(item)}/>)

    return (
        <div id="search-result-wrapper">
            {content}
        </div>
    )
}

function SearchItem({item, onClick}) {
    const posterPath = getTMDBImage(item.poster_path, "w342")

    return (
        <div className="search-item" onClick={onClick}>
            <div className="search-item-header">
                <span className="search-item-title">{item.name}</span>
                <span className="search-item-id">{item.id}</span>
            </div>
            <div className="search-item-content-wrapper">
                <div className="search-item-description">{item.overview}</div>
                <div className="search-item-image">
                    {posterPath && <img src={posterPath}/>}
                </div>
            </div>
        </div>
    )
}

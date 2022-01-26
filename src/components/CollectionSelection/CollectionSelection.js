import "./CollectionSelection.scss"
import {useEffect, useState} from "react";
import {getPlex, getPlexImage, putPlex} from "../../util/Util";
import {TMDBSearch} from "../TMDBSearch/TMDBSearch";
import {Storage} from "../../util/Storage";
import {Poster} from "../../util/Poster/Poster";

export function CollectionSelection({libKey, language}) {
    const [selection, setSelection] = useState(null)
    const [collections, setCollections] = useState(null)

    useEffect(() => {
        getCollections(libKey, setCollections).then()
    }, [libKey])

    function update(item) {
        const collection = selection.ratingKey //Safe because setSelection(null)
        setSelection(null)
        if (item == null) return
        //Update Meta und refresh collection after it
        updateMeta(libKey, collection, item).then(() => getCollections(libKey, setCollections))
    }

    let uiCollections
    if (collections == null) {
        uiCollections = null
    } else if (collections.length === 0) {
        uiCollections = <div id="collection-selection-empty">No collections found in this library.</div>
    } else {
        uiCollections = collections?.map(collection => <Collection key={collection.ratingKey} collection={collection} onClick={() => setSelection(collection)}/>)
    }

    return (
        <div id="collection-selection">
            {uiCollections}
            {selection ? <TMDBSearch collection={selection.title} language={language} onComplete={update}/> : null}
        </div>
    )
}

function Collection({collection, onClick}) {

    return (
        <span className="collection" onClick={onClick}>
            <Poster src={getPlexImage(collection.thumb)}/>
            <span className="collection-title">{collection.title}</span>
            <span className="collection-summary">Summary: {collection.summary.length !== 0 ? "✅" : "❌"}</span>
        </span>
    )
}

async function getCollections(libKey, callback) {
    const result = await getPlex(`/library/sections/${libKey}/all?type=18`)
    callback(result.Metadata ?? [])
}

async function updateMeta(libKey, collectionID, tmdbItem) {
    const applies = Storage.getApplies()
    //If title or summary should be applied
    if (applies[0] || applies[1]) {
        let url = `/library/sections/${libKey}/all?type=18&id=${collectionID}`
        if (applies[0]) url += `&title.value=${tmdbItem.name}`
        if (applies[1]) url += `&summary.value=${tmdbItem.overview}`
        await putPlex(url)
    }
    //If poster should be applied
    //TODO
}

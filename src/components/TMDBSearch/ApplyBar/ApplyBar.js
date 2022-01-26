import "./ApplyBar.scss"
import {useState} from "react";
import {Storage} from "../../../util/Storage";

export function ApplyBar() {
    const [applies, changeApplies] = useState(Storage.getApplies())

    function setApplies(itemidx) {
        const newapplies = applies.map((it, idx) => idx === itemidx ? !it : it) //Flip given index
        Storage.setApplies(newapplies)
        changeApplies(newapplies)
    }

    return (
        <div id="apply-bar">
            <span>Apply to Collection:</span>
            <ApplyItem name="Title" value={applies[0]} onChange={() => setApplies(0)}/>
            <ApplyItem name="Summary" value={applies[1]} onChange={() => setApplies(1)}/>
            {/*<ApplyItem name="Poster" value={applies[2]} onChange={() => setApplies(2)}/>*/}
        </div>
    )
}

function ApplyItem({name, value, onChange}) {
    return (
        <span className="apply-bar-item">
            <input type="checkbox" checked={value} onChange={onChange}/>
            <span>{name}</span>
        </span>
    )
}

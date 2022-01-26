import "./Poster.scss"
import PropTypes from "prop-types";
import {useState} from "react";

export function Poster({src, ...rest}) {
    const [showImage, setShowImage] = useState(false)

    return (
        <div className="poster" {...rest}>
            <img src={src} style={{opacity: showImage ? 1 : 0}} onLoad={() => setShowImage(true)}/>
        </div>
    )
}

Poster.propTypes = {
    src: PropTypes.string.isRequired
}

import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

ReactDOM.render(
    <React.StrictMode>
        {/*<button style={{position: "fixed", top: 0, left: 0, zIndex: 100000}} onClick={() => location.reload()}>R</button>*/}
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

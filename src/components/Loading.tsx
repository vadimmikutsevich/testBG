import React from "react";
import '../styles/loading.css'

const Loading: React.FC = () => {
    return (
        <div className="container">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading
import React, { useState } from "react";
import './Infobar.css';


function Infobar() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleInfobar() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`infobar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleInfobar}>Current Selection</button>
            <div className="infobar-content">
                {/* ... sidebar content */}
            </div>
        </div>
    );
}

export default Infobar;

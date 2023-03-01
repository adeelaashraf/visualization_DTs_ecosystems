import React, { useState } from "react";
import './Infobar.css';


function Infobar(props) {
    const { selectedItems2 } = props;
    const [isOpen, setIsOpen] = useState(false);

    function toggleInfobar() {
        setIsOpen(!isOpen);
    }
    console.log(selectedItems2);
    return (
        <div className={`infobar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleInfobar}>Information Selection</button>
            <div className="infobar-content">
                {/* ... sidebar content */}
            </div>
        </div>
    );
}

export default Infobar;

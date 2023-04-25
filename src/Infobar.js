import React, { useState, useEffect } from "react";
import './Infobar.css';


function Infobar({selectedItems2}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleInfobar() {
        setIsOpen(!isOpen);
    }

    function showCompleteDataset() {
        console.log("dfdf")
    }

    useEffect(() => {
        console.log(selectedItems2);
    }, [selectedItems2]);

    return (
        <div>
            <button className="button2" onClick={toggleInfobar}>Graph Data</button>
            <div className={`infobar ${isOpen ? "open" : "closed"}`}>
                <div className="infobar-content">
                </div>
            </div>
        </div>
    );
}

export default Infobar;

import React, { useState } from "react";
import './Sidebar.css';


function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleSidebar}>Graph Options</button>
            <div className="sidebar-content">
                {/* ... sidebar content */}
            </div>
        </div>
    );
}

export default Sidebar;

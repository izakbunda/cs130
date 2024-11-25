import React from 'react';

import "../css/context-menu.css";

function ContextMenu({ top, left, options }) {
    return (
        <div className="right-click-menu" style={{ top: top, left: left }}>
            {options.map((opt, ind) => (
                <div className='option' onClick={opt.action} key={ind}>
                    {opt.label}
                </div>
            ))}
        </div> 
    )
}

export default ContextMenu;
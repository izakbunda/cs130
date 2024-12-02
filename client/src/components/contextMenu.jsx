import React from 'react'

import '../css/context-menu.css'

function ContextMenu({ top, left, options }) {
  return (
    <div className="right-click-menu" style={{ top: `${top}px`, left: `${left}px` }} role="menu">
      {options.map((opt, ind) => (
        <div className="option" onClick={opt.action} key={ind} role="menuitem">
          {opt.label}
        </div>
      ))}
    </div>
  )
}

export default ContextMenu

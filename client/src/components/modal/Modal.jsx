import React from 'react'
import "./modal.css"

function Modal ({active, setActive, timeline}) {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <p>{timeline}</p>
      </div>
    </div>
  )
}

export default Modal
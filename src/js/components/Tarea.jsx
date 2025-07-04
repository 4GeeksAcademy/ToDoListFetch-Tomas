import React, { useState } from "react";

const Tarea = ({ id, texto, onChange, onEnter, onEliminar }) => {
    const [hover, setHover] = useState(false); // ← Estado para detectar hover

    return (
        <div
            className="border rounded shadow p-3 w-50 bg-white mx-auto d-flex align-items-center position-relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <input
                type="text"
                className="form-control me-2"
                value={texto}
                onChange={(e) => onChange(id, e.target.value)}
                onKeyDown={(e) => onEnter(e, id)}
                autoFocus
                placeholder="Write your task"
            />
            <button
                style={{
                    opacity: hover ? 1 : 0,
                    transition: "opacity 0.2s ease-in-out",
                }}
                className="btn btn-danger btn-sm"
                onClick={() => onEliminar(id)}
            >
                ❌
            </button>
        </div>
    );
};

export default Tarea;

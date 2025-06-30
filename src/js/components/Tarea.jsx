import React from "react";

const Tarea = ({ id, texto, onChange, onEnter, onEliminar }) => {
    return (
        <div className="border shadow p-3 w-50 bg-white mx-auto d-flex align-items-center">
            <input
                type="text"
                className="form-control me-2"
                value={texto}
                onChange={(e) => onChange(id, e.target.value)}
                onKeyDown={(e) => onEnter(e, id)}
                autoFocus
                placeholder="Write your task"
            />
            <button className="btn " onClick={() => onEliminar(id)}>
                ❌
            </button>
        </div>
    );
};

export default Tarea;



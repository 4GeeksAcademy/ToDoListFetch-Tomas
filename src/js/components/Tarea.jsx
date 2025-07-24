
import React, { useState, useRef, useEffect } from "react";

const Tarea = ({ id, texto, onChange, onEnter, onEliminar }) => {
    const [hover, setHover] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const mostrarInputRef = () => {
        console.log(inputRef.current.value);
    }

    return (
        <div
            className="border rounded shadow p-3 w-50 bg-white mx-auto d-flex align-items-center position-relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* <button type="button" className="btn btn-primary" onClick={mostrarInputRef}>Mostrar input ref</button> */}
            <input
                ref={inputRef}
                type="text"
                className="form-control me-2"
                defaultValue={texto}
                onChange={(e) => onChange(id, e.target.value)}
                onKeyDown={(e) => onEnter(e, id, inputRef.current.value)}
                placeholder="Escribe una tarea"
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

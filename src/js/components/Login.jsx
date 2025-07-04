import React, { useState } from "react";
import { useEffect } from "react";

const Login = (onClick) => {

    const [usuario, setUsuario] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [tareas, setTareas] = useState([]);

    // Hago que desaparezcan las alerttas a los 3 segundos
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, success]);


    // Manejo el evento al crear usuario
    const handleCrear = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!usuario.trim()) {
            setError("El usuario es obligatorio.");
            return;
        }

        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/${usuario}`, {
                method: "POST",
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Usuario creado con éxito.");
                console.log("Usuario creado")
                console.log(data)
                setUsuario("");
            } else {
                setError(data.msg || "Error al crear usuario.");
            }
        } catch (err) {
            setError("Error de red o servidor.");
        }
    };

    // Manejo el evento al acceder a los usuarios
    const handleAcceder = async () => {
        setError("");
        setSuccess("");
        setTareas([]);

        if (!usuario.trim()) {
            setError("El usuario es obligatorio para acceder.");
            return;
        }

        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${usuario}`, {
                method: "GET",
            });

            const data = await response.json();

            if (response.ok) {
                setTareas(data);  // Guardamos las tareas en estado
                setSuccess("Tareas obtenidas con éxito.");
                console.log("Tareas:", data);
            } else {
                setError(data.msg || "Error al obtener tareas.");
            }
        } catch (err) {
            setError("Error de red o servidor.");
        }
    };

    return (
        <div className="p-5 rounded-4 shadow-lg bg-white" style={{ minWidth: '300px', maxWidth: '400px' }}>
            <h2 className="text-center mb-4 text-primary fw-bold">Crea tu Usuario</h2>

            <form>
                <div className="mb-3">
                    <label htmlFor="user" className="form-label text-secondary">Usuario</label>
                    <input type="text" className="form-control" id="user" placeholder="Introduce tu usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3" onClick={handleCrear}>Crear</button>
                <button type="submit" className="btn btn-success w-100 mt-3" onClick={handleAcceder}>Acceder</button>
            </form>

            {error && <p className="text-danger text-center mt-3">{error}</p>}
            {success && <p className="text-success text-center mt-3">{success}</p>}

            {/* Aquí mostramos las tareas si hay */}
            {tareas.length > 0 && (
                <div className="mt-4">
                    <h5>Tus Tareas:</h5>
                    <ul className="list-group">
                        {tareas.map((tarea) => (
                            <li key={tarea.id} className="list-group-item">
                                {tarea.label} - {tarea.done ? "Completada" : "Pendiente"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <p className="text-center text-muted mt-4 mb-0">¿Quieres ver todas tus tareas? <a href="#" className="text-decoration-none">Regístrate</a></p>
        </div>
    )

}
export default Login;

import { useEffect, useState } from "react";

const Login = ({ setUsuario}) => {
    const [NombreUsuario, setNombreUsuario] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    // Crear usuario
    const handleCrear = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!NombreUsuario.trim()) {
            setError("El usuario es obligatorio.");
            return;
        }

        try {
            const response = await fetch(
                `https://playground.4geeks.com/todo/users/${NombreUsuario}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify([]),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSuccess("Usuario creado con éxito.");
                setUsuario(NombreUsuario);
                setNombreUsuario("");
            } else {
                setError(data.msg || "Error al crear usuario.");
            }
        } catch (err) {
            setError("Error de red o servidor.");
        }
    };

    const handleAcceder = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!NombreUsuario.trim()) {
            setError("El usuario es obligatorio para acceder.");
            return;
        }

        // Aquí no hacemos fetch, solo asignamos el usuario para que Home controle la lista
        setUsuario(NombreUsuario);
        setSuccess("Usuario cargado.");
        setNombreUsuario("");
    };


    return (
        <div
            className="p-5 rounded-4 shadow-lg bg-white"
            style={{ minWidth: "300px", maxWidth: "400px" }}
        >
            <h2 className="text-center mb-4 text-primary fw-bold">Crea tu Usuario</h2>

            <form>
                <div className="mb-3">
                    <label htmlFor="user" className="form-label text-secondary">
                        Usuario
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="user"
                        placeholder="Introduce tu usuario"
                        value={NombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary w-100 mt-3" onClick={handleCrear}>
                    Crear
                </button>
                <button className="btn btn-success w-100 mt-3" onClick={handleAcceder}>
                    Acceder
                </button>
            </form>

            {error && <p className="text-danger text-center mt-3">{error}</p>}
            {success && <p className="text-success text-center mt-3">{success}</p>}
        </div>
    );
};

export default Login;

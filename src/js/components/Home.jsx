import React, { useEffect, useState } from "react";
import Tarea from "./Tarea";
import Login from "./Login";

const Home = () => {
	const [usuario, setUsuario] = useState(null);
	const [tareas, setTareas] = useState([]);

	// Estilos
	useEffect(() => {
		document.body.style.margin = "0";
		document.body.style.padding = "0";
		document.body.style.backgroundColor = "#fff9c4";
		return () => {
			document.body.style.margin = "";
			document.body.style.padding = "";
			document.body.style.backgroundColor = "";
		};
	}, []);

	// Cargar tareas del usuario al hacer login
	useEffect(() => {
		if (usuario) {
			cargarTareas();
		}
	}, [usuario]);


	const cargarTareas = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${usuario}`, {
				method: "GET"
			});
			if (!response.ok) throw new Error("Error al obtener tareas");
			const data = await response.json();
			setTareas(data.todos);
			if (data.todos.length == 0) {
				agregarTarea("Escribe una tarea");
			}
			console.log(tareas)
		} catch (error) {
			console.error("Error cargando tareas:", error.message);
		}
	};

	const agregarTarea = async (tarea) => {
		try {
			const res = await fetch(`https://playground.4geeks.com/todo/todos/${usuario}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ label: tarea, is_done: false })
			});
			if (res.ok) {
				await cargarTareas(); // refresca tareas desde la API
			}
		} catch (err) {
			console.error("Error al agregar tarea:", err);
		}
	};

	const eliminarTarea = async (id) => {
		try {
			const res = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			});
			if (res.ok) {
				cargarTareas();
			}
		} catch (err) {
			console.error("Error al eliminar tarea:", err);
		}
	};

	const limpiarTareas = async () => {
		if (!tareas.length) return;

		const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar todas las tareas?");
		if (!confirmacion) return;

		try {
			// Elimina todas las tareas en paralelo
			await Promise.all(
				tareas.map((tarea) =>
					fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
						method: "DELETE",
					})
				)
			);

			// Actualiza el estado
			setTareas([]);
			agregarTarea("Escribe una tarea");
		} catch (err) {
			console.error("Error al limpiar tareas:", err);
		}
	};

	// Manejo local (texto de tareas en inputs)
	const manejarCambio = (id, nuevoTexto) => {
		const nuevasTareas = tareas.map((t) =>
			t.id === id ? { ...t, label: nuevoTexto } : t
		);
		setTareas(nuevasTareas);
	};

	const manejarEnter = async (e, id, texto) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const tareaActual = tareas.find((t) => t.id === id);

			if (!tareaActual || !texto.trim()) {
				alert("Escribe una tarea antes de presionar Enter.");
				return;
			}

			// Actualizar tarea existente
			try {
				const resPut = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ label: texto, is_done: false }),
				});
				if (!resPut.ok) throw new Error("Error actualizando tarea");

				//Agregar una nueva tarea vacía
				await agregarTarea("");
			} catch (err) {
				console.error("Error al actualizar o crear tarea:", err);
			}

			//Refrescar tareas desde la API
			await cargarTareas();
		}
	};
	return (
		<div className="container mt-5 p-3">
			<h1 className="text-warning fw-bold text-center display-4 text-decoration-underline mb-4">
				To-Do List
			</h1>

			{/* Login */}
			<div className="d-flex justify-content-center mb-5 mt-3">
				<Login setUsuario={setUsuario} setTareas={setTareas} />
			</div>

			{/* Lista de Tareas */}
			{tareas.map((tarea) => (
				<Tarea
					key={tarea.id}
					id={tarea.id}
					texto={tarea.label}
					onChange={manejarCambio}
					onEnter={manejarEnter}
					onEliminar={() => eliminarTarea(tarea.id)}
				/>
			))}

			<p className="text-center mt-4 fs-4 text-warning-emphasis">
				{tareas.length === 0
					? "No hay Tareas pendientes, Presiona Enter para Añadir una o accede a tu usuario"
					: `${tareas.length} Tarea/s Pendientes`}
			</p>

			{tareas.length > 0 && (
				<button
					onClick={limpiarTareas}
					className="mt-4 fs-5 rounded px-3 btn btn-danger mx-auto d-block"
				>
					Clear
				</button>
			)}
		</div>
	);
};

export default Home;

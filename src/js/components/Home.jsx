import React, { useEffect, useState } from "react";
import Tarea from "./Tarea";

const Home = () => {
	const [tareas, setTareas] = useState([{ id: Date.now(), texto: "" }]);

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

	const manejarCambio = (id, nuevoTexto) => {
		const nuevasTareas = tareas.map((tarea) =>
			tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea
		);
		setTareas(nuevasTareas);
	};

	const manejarEnter = (e, id) => {
		if (e.key === "Enter") {
			e.preventDefault();

			const tareaActual = tareas.find((t) => t.id === id);

			if (!tareaActual.texto.trim()) {
				alert("Debes añadir una tarea antes de presionar Enter.");
				return;
			}

			const index = tareas.findIndex((t) => t.id === id);
			const nuevasTareas = [...tareas];
			nuevasTareas.splice(index + 1, 0, { id: Date.now(), texto: "" });
			setTareas(nuevasTareas);
		}
	};



	const eliminarTarea = (id) => {
		const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
		setTareas(nuevasTareas);
	};

	const reiniciarTareas = () => {
		setTareas([{ id: Date.now(), texto: "" }]);
	};

	return (
		<div className="container mt-5 p-3">
			<h1 className="text-warning fw-bold text-center display-4 text-decoration-underline mb-4">
				To-Do List
			</h1>
			{tareas.map((tarea) => (
				<Tarea
					key={tarea.id}
					id={tarea.id}
					texto={tarea.texto}
					onChange={manejarCambio}
					onEnter={manejarEnter}
					onEliminar={eliminarTarea}
				/>
			))}
			<p className="text-center mt-4 fs-4 text-warning-emphasis">{tareas.length} items left</p>
			<button onClick={reiniciarTareas} className="mt-4 fs-5 rounded px-3 btn btn-primary mx-auto d-block">Clear</button>
		</div>
	);
};

export default Home;

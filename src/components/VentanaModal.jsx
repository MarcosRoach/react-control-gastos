import React, { useState, useEffect } from "react";
import Mensaje from "./Mensaje";

//Imagen para cerrar modal
import IconoCerrar from "../img/cerrar.svg";

const VentanaModal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  editarGasto,
  setEditarGasto,
}) => {
  //ESTADOS
  //Estado ID para gasto a editar
  const [codigo, setCodigo] = useState("");
  //Estado para el nombre del gasto
  const [nombre, setNombre] = useState("");
  //Estado para la cantidad del gasto
  const [cantidad, setCantidad] = useState(0);
  //Estado para la categoria del gasto
  const [categoria, setCategoria] = useState("");
  //Estado para mensaje de error
  const [error, setError] = useState(false);

  //USEEFECT
  useEffect(() => {
    //Si hay un gasto para editar, llenar los campos
    if (Object.keys(editarGasto).length > 0) {
      setCodigo(editarGasto.id);
      setNombre(editarGasto.nombre);
      setCantidad(editarGasto.cantidad);
      setCategoria(editarGasto.categoria);
    }
  }, []);

  //FUNCIONES
  //Funcion para manejar el campo de nombre
  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  //Funcion para manejar el campo de cantidad
  const handleCantidad = (e) => {
    //Validar que sea mayor a 0
    if (e.target.value > 0) {
      setCantidad(parseInt(e.target.value));
    }
  };

  //Funcion para manejar el campo de categoria
  const handleCategoria = (e) => {
    setCategoria(e.target.value);
  };

  //Funcion para agregar nuevo gasto
  const handleNuevoGasto = (e) => {
    e.preventDefault();

    //Validar que los campos no esten vacios
    if (nombre === "" || cantidad === 0 || categoria === "") {
      console.log("Todos los campos son obligatorios");
      setError("Todos los campos son obligatorios");

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (!editarGasto.nombre) {
      //Objeto para guardar el nuevo gasto
      const gasto = {
        nombre,
        cantidad,
        categoria,
      };
      guardarGasto(gasto);
    } else {
      //Objeto para guardar el gasto editado
      editarGasto.nombre = nombre;
      editarGasto.cantidad = cantidad;
      editarGasto.categoria = categoria;

      guardarGasto(editarGasto);
    }

    //Ocultar modal
    ocultarModal();
  };

  //Funcion para ocultar modal
  const ocultarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
      //Limpiar el setEditarGasto
      setEditarGasto({});
    }, 500);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={IconoCerrar} alt="Cerrar Ventana" onClick={ocultarModal} />
      </div>

      <form
        onSubmit={handleNuevoGasto}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        {/* Si editarGasto esta vacion Mostrar nuevo gasto sino Editar Gasto */}
        <legend>
          {!editarGasto.nombre ? "Nuevo Gasto" : "Guardar Cambios"}
        </legend>

        {/* Mostrar mensaje de error si existe */}
        {error && <Mensaje tipo="error">{error} </Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={handleNombre}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto. ej: 300"
            value={cantidad}
            onChange={handleCantidad}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categorias</label>
          <select id="categoria" value={categoria} onChange={handleCategoria}>
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="hogar">Hogar</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="gastosVarios">Gastos Varios</option>
          </select>
        </div>

        <input
          type="submit"
          value={!editarGasto.nombre ? "Añadir Gasto" : "Editar Gasto"}
        />
      </form>
    </div>
  );
};

export default VentanaModal;

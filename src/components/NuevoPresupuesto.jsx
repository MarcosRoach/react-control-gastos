import React, { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setPresupuestoValido,
}) => {
  // State para el mensaje de error
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    // Validar que no sea 0, vacio o negativo ni string
    if (
      presupuesto < 1 ||
      isNaN(presupuesto) ||
      presupuesto === "" ||
      presupuesto === null ||
      presupuesto === undefined ||
      presupuesto === String
    ) {
      setMensaje("El presupuesto es Incorrecto");
      return;
    }

    // SI PASA LA VALIDACION
    // Eliminar el mensaje de error
    setMensaje("");
    // Cambiar el estado de presupuesto valido
    setPresupuestoValido(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>

          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            // Evento para leer el presupuesto Ingresado por el usuario
            onChange={(e) => setPresupuesto(parseInt(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir" onClick={handlePresupuesto} />

        {/* Componenete Mensaje */}
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;

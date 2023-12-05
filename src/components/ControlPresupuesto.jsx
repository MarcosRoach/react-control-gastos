import React, { useEffect, useState } from "react";
//Importar react-circular-progressbar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
//Importar estilos de react-circular-progressbar
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ presupuesto, serPresupuesto, gastos }) => {
  //Estados para el presupuesto
  const [disponible, setDisponible] = useState(presupuesto);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    setGastado(totalGastado);
    setDisponible(presupuesto - totalGastado);
    setTimeout(() => {
      setPorcentaje(((totalGastado * 100) / presupuesto).toFixed(2));
    }, 1500);
  }, [gastos]);

  //Funcion para formatear el presupuesto
  const formatearCantidad = (presupuesto) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(presupuesto);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            // Text size
            textSize: "16px",
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors
            pathColor: "#3B82F6",
            trailColor: "#d6d6d6",
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

ControlPresupuesto.propTypes = {};

export default ControlPresupuesto;

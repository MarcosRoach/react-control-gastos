import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({ gastos, setEditarGasto, setEliminarGasto }) => {
  //Si hay gastos, mostrar listado de gastos sino mensaje de no hay gastos
  return (
    <div className="contenedor listado-gastos">
      {gastos.length > 0 ? (
        <ul>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditarGasto={setEditarGasto}
              setEliminarGasto={setEliminarGasto}
            />
          ))}
        </ul>
      ) : (
        <h2>No hay gastos</h2>
      )}
    </div>
  );
};

export default ListadoGastos;

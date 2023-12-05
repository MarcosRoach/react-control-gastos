import { useEffect, useState } from "react";
import { generateUUID } from "./helpers";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import VentanaModal from "./components/VentanaModal";
import ListadoGastos from "./components/ListadoGastos";

function App() {
  // Estado para el importe del presupuesto
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  // Estado para control de presupuesto valido
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  // Estado para activar modal
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  // Estado para guardar gastos
  const [gastos, setGastos] = useState([]);
  // Estado para editar gastos
  const [editarGasto, setEditarGasto] = useState({});
  // Estado para eliminar gastos
  const [eliminarGasto, setEliminarGasto] = useState({});

  //USEEFECT
  //UseEfect para escuchar cambios en gastos
  useEffect(() => {
    //LLamo a la funcion para editar gasto
    if (Object.keys(editarGasto).length === 0) return;
    handleEditaGasto();
  }, [editarGasto]);

  useEffect(() => {
    eliGasto(eliminarGasto);
    //Si eliminar gasto no esta vacio, llamo a la funcion para eliminar gasto
    if (Object.keys(eliminarGasto).length === 0) {
      eliGasto();
    }
  }, [eliminarGasto]);

  //UseEfect para LocalStorage
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0) {
      setPresupuestoValido(true);
    }
  }, []);

  // FUNCIONES
  // Funcion para agregar nuevo gasto
  const handleNuevoGasto = () => {
    setModal(true);
    //Reseteo el estado de editar gasto
    setEditarGasto({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
  };

  // Funcion para agregar nuevo gasto
  const handleEditaGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
  };

  // Funcion para agregar nuevo gasto
  const guardarGasto = (gasto) => {
    //Si hay ID es porque es un gasto a editar
    if (gasto.id) {
      //Filtro los gastos para que no este el que voy a editar
      const gastosEditados = gastos.filter((g) => g.id !== gasto.id);
      //Agrego el gasto al array de gastos
      setGastos([...gastosEditados, gasto]);
    } else {
      //ID para el gasto
      gasto.id = generateUUID();
      //Fecha del gasto
      gasto.fecha = new Date();
      //Agrego el gasto al array de gastos
      setGastos([...gastos, gasto]);
      setEditarGasto({});
    }
  };

  //Funcion para eliminar el gasto
  const eliGasto = (gasto) => {
    //Filtro los gastos para que no este el que voy a editar
    const gastosFiltrados = gastos.filter((g) => g.id !== gasto.id);
    //Agrego el gasto al array de gastos
    setGastos([...gastosFiltrados]);
  };

  // Funcion para editar gasto
  const editaGasto = (gasto) => {
    console.log("editaGasto", gasto);
    //Filtro los gastos para que no este el que voy a editar
    console.log("gastos", gastos);
    const gastosFiltrados = gastos.filter((g) => g.id !== gasto.id);

    console.log("gastosFiltrados", gastos);
    //Agrego el gasto al array de gastos
    // setGastos([...gastosFiltrados, gasto]);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        presupuestoValido={presupuestoValido}
        setPresupuestoValido={setPresupuestoValido}
        gastos={gastos}
      />
      {/* Si el presupuesto es valido, mostrar boton nuevo gasto */}
      {presupuestoValido && (
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              setEliminarGasto={setEliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {/* Si modal es tru muetro Modal */}
      {modal && (
        <VentanaModal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      )}
    </div>
  );
}

export default App;

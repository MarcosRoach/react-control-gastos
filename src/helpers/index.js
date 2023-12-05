//Funcion para generar UUID
export const generateUUID = () => {
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    // eslint-disable-next-line no-bitwise, no-mixed-operators
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-mixed-operators
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

//Formatear fecha
export const formatearFecha = (date) => {
  const d = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return d.toLocaleDateString("es-ES", options);
};

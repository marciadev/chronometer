import React, { useState, useRef, useEffect  } from "react";
import "./Timer.css";

const Timer = () => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState("Timer");

  const myRef = useRef(null);

  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === "Timer") {
      intervalo = setInterval(() => {
        setSegundos((segundos) => segundos + 1);
      }, 1000);
    }
    if (activo && tipo === "Countdown") {
      intervalo = setInterval(() => {
        setSegundos((segundos) => segundos - 1);
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === "Timer") {
      clearInterval(intervalo);
    }
    if (segundos === 0 && tipo === "Countdown") {
      reset();
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  function toggle() {
    setActivo(!activo);
  }
  function reset() {
    setSegundos(0);
    setActivo(false);
  }
  function cambioTipo() {
    if (tipo === "Timer") setTipo("Countdown");
    if (tipo === "Countdown") setTipo("Timer");
  }

  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value;
    setSegundos(ref);
  }

  return (
    <div className="app">
      <div className="time">{segundos} s</div>
      <div className="row">
        <button
          className={`button button-primary 
      button-primary-${activo ? "active" : "inactive"}`}
          onClick={toggle}
        >
          {activo ? "Pause" : "Start"}
        </button>
        <button className="button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button" onClick={cambioTipo}>
        {tipo}
      </button>
      {tipo === "Countdown" && (
        <input
          type="number"
          ref={myRef}
          onChange={agregaSegundos}
          placeholder="Enter seconds"
          autoComplete="off"
          className="selectors"
        />
      )}
      </div>
  );
};

export default Timer;

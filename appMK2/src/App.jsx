import React, { useState } from 'react';
import TablaResultados from './components/TablaResultados';
import './App.css';

export default function App() {
  // Estado para controlar el modo: true = Modo Pits (Oscuro), false = Modo Pista (Claro)
  const [esModoPits, setEsModoPits] = useState(true);

  const alternarModo = () => {
    setEsModoPits(!esModoPits);
  };

  return (
    <div className={`app-wrapper ${esModoPits ? 'modo-pits' : 'modo-pista'}`}>
      <main className="app-main">
        <header className="f1-header">
          <div className="header-top">
            <h1>F1 Race Tracker 🏎️💨</h1>
            {/* Botón interruptor estilo semáforo / garaje */}
            <button className="theme-toggle-btn" onClick={alternarModo}>
              {esModoPits ? '🟢 Modo Pista (Claro)' : '🌙 Modo Pits (Oscuro)'}
            </button>
          </div>
          <p>Temporada Oficial - Análisis de Resultados</p>
        </header>
        
        {/* Pasamos el modo actual como propiedad a la tabla si lo deseas */}
        <TablaResultados esOscuro={esModoPits} />
      </main>
    </div>
  );
}
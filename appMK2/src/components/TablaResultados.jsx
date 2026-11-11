import React, { useState } from 'react';
import { RESULTADOS_GP_MEXICO } from '../data/gpMexico';
import './TablaResultados.css';

export default function TablaResultados() {
  const [ordenarPor, setOrdenarPor] = useState('posicionFinal');

  const pilotosOrdenados = [...RESULTADOS_GP_MEXICO].sort((a, b) => {
    if (ordenarPor === 'posicionFinal') {
      if (a.posicionFinal === null) return 1;
      if (b.posicionFinal === null) return -1;
      return a.posicionFinal - b.posicionFinal;
    }
    if (ordenarPor === 'posicionSalida') return a.posicionSalida - b.posicionSalida;
    if (ordenarPor === 'puntos') return b.puntos - a.puntos;
    return 0;
  });

  return (
    <div className="f1-tracker-container">
      <h2>Gran Premio de México - Parrilla Completa</h2>
      
      <div className="f1-controls">
        <button onClick={() => setOrdenarPor('posicionFinal')}>Posición Final</button>
        <button onClick={() => setOrdenarPor('posicionSalida')}>Parrilla de Salida</button>
        <button onClick={() => setOrdenarPor('puntos')}>Puntos</button>
      </div>

      <table className="f1-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Piloto</th>
            <th>Escudería</th>
            <th>Salida</th>
            <th>Cambio</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {pilotosOrdenados.map((piloto) => {
            // Si tiene posición calculamos el cambio, si es DNF lo dejamos en 0 o '-')
            const cambio = piloto.posicionFinal !== null ? piloto.posicionSalida - piloto.posicionFinal : 0;
            
            return (
              <tr key={piloto.codigo} className="f1-row">
                <td className="posicion-final">
                  {piloto.posicionFinal !== null ? `P${piloto.posicionFinal}` : <span className="dnf-badge">DNF ❌</span>}
                </td>
                <td className="piloto-info">
                  <strong>{piloto.piloto}</strong> <span className="codigo">({piloto.codigo})</span>
                </td>
                <td>{piloto.escuderia}</td>
                <td>P{piloto.posicionSalida}</td>
                <td>
                  {piloto.posicionFinal !== null ? (
                    <>
                      {cambio > 0 && <span className="ganado">+{cambio} 🟢</span>}
                      {cambio < 0 && <span className="perdido">{cambio} 🔴</span>}
                      {cambio === 0 && <span className="neutro">-</span>}
                    </>
                  ) : (
                    <span className="neutro">Abandono</span>
                  )}
                </td>
                <td><strong>{piloto.puntos} pts</strong></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
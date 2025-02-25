import React, { useState } from 'react';

const CoffeeQualityAnalysis = () => {
  // Datos del estudio (usando las primeras 16 unidades experimentales como muestra)
  const data = {
    V1: [4,5,15,8,6,17,24,45,40,32,96,57,97,55,112,150],
    V2: [5,2,22,1,2,8,4,16,41,55,87,98,123,125,141,190],
    V3: [3,49,50,178,40,170,50,170,50,167,176,180,159,170,173,179],
    V4: [1,1,1,2,2,2,3,3,4,4,4,5,4,5,6,4],
    V5: [2,2,2,4,3,4,5,7,5,7,7,9,12,8,7,8],
    V6: [7,6,14,8,26,20,37,49,78,48,80,37,21,57,102,86],
    V7: [5,6,11,8,24,20,35,49,76,46,131,36,121,65,80,101]
  };

  // Matriz de correlación pre-calculada
  const correlationMatrix = {
    V1: {V1: 1.00, V2: 0.93, V3: 0.59, V4: 0.73, V5: 0.74, V6: 0.76, V7: 0.86},
    V2: {V1: 0.93, V2: 1.00, V3: 0.59, V4: 0.78, V5: 0.76, V6: 0.69, V7: 0.76},
    V3: {V1: 0.59, V2: 0.59, V3: 1.00, V4: 0.63, V5: 0.71, V6: 0.41, V7: 0.49},
    V4: {V1: 0.73, V2: 0.78, V3: 0.63, V4: 1.00, V5: 0.80, V6: 0.79, V7: 0.70},
    V5: {V1: 0.74, V2: 0.76, V3: 0.71, V4: 0.80, V5: 1.00, V6: 0.46, V7: 0.77},
    V6: {V1: 0.76, V2: 0.69, V3: 0.41, V4: 0.79, V5: 0.46, V6: 1.00, V7: 0.72},
    V7: {V1: 0.86, V2: 0.76, V3: 0.49, V4: 0.70, V5: 0.77, V6: 0.72, V7: 1.00}
  };

  // Variables seleccionadas para el gráfico de dispersión
  const [selectedVars, setSelectedVars] = useState({x: 'V1', y: 'V2'});

  // Función para determinar el color según el valor de correlación
  const getCorrelationColor = (value) => {
    if (value === 1) return 'bg-gray-200';
    if (value >= 0.8) return 'bg-green-600 text-white';
    if (value >= 0.6) return 'bg-green-400';
    if (value >= 0.4) return 'bg-green-200';
    if (value >= 0.2) return 'bg-green-100';
    if (value >= 0) return 'bg-gray-100';
    if (value >= -0.2) return 'bg-red-100';
    if (value >= -0.4) return 'bg-red-200';
    if (value >= -0.6) return 'bg-red-400';
    if (value >= -0.8) return 'bg-red-600 text-white';
    return 'bg-red-800 text-white';
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Análisis de Correlación - Calidad de Café</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Matriz de Correlación</h2>
        <p className="mb-2">La matriz muestra el coeficiente de correlación de Pearson entre cada par de variables. Los valores más cercanos a 1 o -1 indican correlaciones fuertes.</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100"></th>
                {Object.keys(correlationMatrix).map(variable => (
                  <th key={variable} className="border p-2 bg-gray-100">{variable}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(correlationMatrix).map(var1 => (
                <tr key={var1}>
                  <th className="border p-2 bg-gray-100">{var1}</th>
                  {Object.keys(correlationMatrix[var1]).map(var2 => (
                    <td 
                      key={`${var1}-${var2}`} 
                      className={`border p-2 text-center ${getCorrelationColor(correlationMatrix[var1][var2])}`}
                      onClick={() => setSelectedVars({x: var1, y: var2})}
                      style={{cursor: 'pointer'}}
                    >
                      {correlationMatrix[var1][var2].toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm italic">Haga clic en una celda para ver el gráfico de dispersión correspondiente.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Correlaciones Fuertes (|r| > 0.8)</h2>
        <ul className="list-disc pl-5">
          <li>V1 - V2: r = 0.93 (muy fuerte positiva)</li>
          <li>V1 - V7: r = 0.86 (fuerte positiva)</li>
          <li>V4 - V5: r = 0.80 (fuerte positiva)</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Gráfico de Dispersión: {selectedVars.x} vs {selectedVars.y}</h2>
        <p className="mb-2">
          Coeficiente de correlación: <strong>{correlationMatrix[selectedVars.x][selectedVars.y].toFixed(2)}</strong>
        </p>
        
        <div className="border p-4 bg-white h-64 relative">
          {/* Eje Y */}
          <div className="absolute left-8 top-0 bottom-0 border-l border-gray-400"></div>
          {/* Eje X */}
          <div className="absolute left-8 right-0 bottom-8 border-b border-gray-400"></div>
          
          {/* Puntos de dispersión */}
          {data[selectedVars.x].map((x, i) => {
            const xMax = Math.max(...data[selectedVars.x]);
            const yMax = Math.max(...data[selectedVars.y]);
            const xPos = (x / xMax * 80) + 10;
            const yPos = 90 - (data[selectedVars.y][i] / yMax * 80);
            
            return (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1 -translate-y-1"
                style={{left: `${xPos}%`, top: `${yPos}%`}}
                title={`(${x}, ${data[selectedVars.y][i]})`}
              ></div>
            );
          })}
          
          {/* Etiquetas */}
          <div className="absolute bottom-2 left-8 right-0 text-center text-sm">{selectedVars.x}</div>
          <div className="absolute left-2 top-0 bottom-8 flex items-center">
            <span className="transform -rotate-90 text-sm">{selectedVars.y}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Interpretación</h2>
        <p>
          El análisis muestra correlaciones positivas fuertes entre varias variables, lo que sugiere relaciones importantes entre los atributos medidos en la calidad del café. Las relaciones más significativas se encuentran entre:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>V1 y V2 (r = 0.93): Esta correlación extremadamente fuerte indica que estas variables están estrechamente relacionadas y podrían estar midiendo aspectos similares de la calidad del café.</li>
          <li>V1 y V7 (r = 0.86): Otra correlación fuerte que sugiere una relación importante entre estas variables.</li>
          <li>V4 y V5 (r = 0.80): Una correlación fuerte que indica relación significativa.</li>
        </ul>
        <p className="mt-2">
          Estas fuertes correlaciones sugieren que podría ser posible reducir el número de variables necesarias para evaluar la calidad del café, ya que algunas variables parecen proporcionar información redundante.
        </p>
      </div>
    </div>
  );
};

export default CoffeeQualityAnalysis;

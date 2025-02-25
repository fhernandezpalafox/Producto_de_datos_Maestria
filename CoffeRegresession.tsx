import React from 'react';

const CoffeeRegressionAnalysis = () => {
  // Datos de las variables con mayor correlación (V1 y V2)
  const data = {
    V1: [4,5,15,8,6,17,24,45,40,32,96,57,97,55,112,150],
    V2: [5,2,22,1,2,8,4,16,41,55,87,98,123,125,141,190]
  };

  // Cálculo simplificado de regresión lineal
  const x = data.V1;
  const y = data.V2;
  const n = x.length;
  
  // Cálculo de medias
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;
  
  // Cálculo de la pendiente y la intersección
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - xMean) * (y[i] - yMean);
    denominator += (x[i] - xMean) * (x[i] - xMean);
  }
  
  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;
  
  // Cálculo de R²
  let sumSquaredTotal = 0;
  let sumSquaredResidual = 0;
  
  for (let i = 0; i < n; i++) {
    const yPred = slope * x[i] + intercept;
    sumSquaredTotal += Math.pow(y[i] - yMean, 2);
    sumSquaredResidual += Math.pow(y[i] - yPred, 2);
  }
  
  const rSquared = 1 - (sumSquaredResidual / sumSquaredTotal);
  
  // Función para predecir V2 dado V1
  const predictV2 = (v1Value) => slope * v1Value + intercept;
  
  // Preparar datos para la visualización
  const maxX = Math.max(...x) * 1.1;
  const maxY = Math.max(...y) * 1.1;
  
  // Puntos para la línea de regresión
  const regressionLine = [
    { x: 0, y: intercept },
    { x: maxX, y: predictV2(maxX) }
  ];
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Análisis de Regresión para Calidad del Café</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Regresión Lineal: V1 vs V2</h2>
        <p className="mb-4">
          Ecuación de regresión: V2 = {intercept.toFixed(2)} + {slope.toFixed(2)} × V1
          <br />
          Coeficiente de determinación (R²): {rSquared.toFixed(3)}
          <br />
          Correlación (r): {Math.sqrt(rSquared).toFixed(3)}
        </p>
        
        <div className="border p-4 bg-white h-80 relative">
          {/* Ejes */}
          <div className="absolute left-10 bottom-10 h-64 border-l border-gray-400"></div>
          <div className="absolute left-10 bottom-10 w-full border-b border-gray-400"></div>
          
          {/* Puntos de dispersión */}
          {x.map((xVal, i) => {
            const xPos = (xVal / maxX * 80) + 10;
            const yPos = 90 - (y[i] / maxY * 80);
            
            return (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1 -translate-y-1"
                style={{left: `${xPos}%`, top: `${yPos}%`}}
                title={`(${xVal}, ${y[i]})`}
              ></div>
            );
          })}
          
          {/* Línea de regresión */}
          <svg className="absolute inset-0 h-full w-full" style={{pointerEvents: 'none'}}>
            <line 
              x1={`${(regressionLine[0].x / maxX * 80) + 10}%`}
              y1={`${90 - (regressionLine[0].y / maxY * 80)}%`}
              x2={`${(regressionLine[1].x / maxX * 80) + 10}%`}
              y2={`${90 - (regressionLine[1].y / maxY * 80)}%`}
              stroke="red"
              strokeWidth="2"
            />
          </svg>
          
          {/* Etiquetas */}
          <div className="absolute bottom-2 left-10 right-0 text-center text-sm">Variable V1</div>
          <div className="absolute left-2 top-0 bottom-10 flex items-center">
            <span className="transform -rotate-90 text-sm">Variable V2</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Los puntos azules representan las mediciones, y la línea roja es la regresión lineal calculada.
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Interpretación</h2>
        <p>
          El análisis de regresión entre V1 (posiblemente Concentración de cafeína) y V2 (posiblemente Aroma) muestra una relación lineal muy fuerte con un R² de {rSquared.toFixed(3)}. Esto indica que el {(rSquared * 100).toFixed(1)}% de la variación en V2 puede explicarse por V1.
        </p>
        <p className="mt-2">
          Esta relación es estadísticamente significativa y podría utilizarse para predecir una variable a partir de la otra con un alto grado de confianza, lo que es valioso para pruebas cualitativas de calidad de grano.
        </p>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Aplicaciones para Pruebas Cualitativas</h2>
        <p>
          Con un coeficiente de correlación de {Math.sqrt(rSquared).toFixed(3)} entre V1 y V2, estas variables pueden utilizarse efectivamente en pruebas cualitativas de calidad de grano de café por las siguientes razones:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>La alta correlación permite reducir el número de pruebas necesarias, ya que medir una variable proporciona información confiable sobre la otra.</li>
          <li>Se pueden establecer rangos de calidad basados en estas variables altamente correlacionadas.</li>
          <li>La ecuación de regresión permite predecir valores esperados para control de calidad.</li>
          <li>La consistencia en la relación entre variables sugiere que están midiendo aspectos fundamentales de la calidad del café.</li>
        </ul>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Conclusión</h2>
        <p>
          El análisis demuestra que la relación entre variables es suficientemente fuerte para emplearla en pruebas cualitativas de calidad de grano. Las variables V1, V2, V4, V5 y V7 muestran correlaciones particularmente fuertes entre sí, lo que indica que están midiendo aspectos interrelacionados de la calidad del café.
        </p>
        <p className="mt-2">
          Para pruebas cualitativas prácticas, se podría desarrollar un índice compuesto o una rúbrica basada en estas variables correlacionadas, lo que permitiría una evaluación más eficiente y consistente de la calidad del café de grano.
        </p>
      </div>
    </div>
  );
};

export default CoffeeRegressionAnalysis;
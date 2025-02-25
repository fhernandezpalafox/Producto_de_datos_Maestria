graph TD
    subgraph "Correlaciones Muy Fuertes (|r| > 0.8)"
        V1V2[V1 - V2: r = 0.93]
        V1V7[V1 - V7: r = 0.86]
        V4V5[V4 - V5: r = 0.80]
    end
    
    subgraph "Correlaciones Fuertes (0.6 < |r| < 0.8)"
        V1V4[V1 - V4: r = 0.73]
        V1V5[V1 - V5: r = 0.74]
        V1V6[V1 - V6: r = 0.76]
        V2V4[V2 - V4: r = 0.78]
        V2V5[V2 - V5: r = 0.76]
        V2V7[V2 - V7: r = 0.76]
        V3V5[V3 - V5: r = 0.71]
        V4V6[V4 - V6: r = 0.79]
        V5V7[V5 - V7: r = 0.77]
        V6V7[V6 - V7: r = 0.72]
    end
    
    subgraph "Correlaciones Moderadas (0.4 < |r| < 0.6)"
        V2V6[V2 - V6: r = 0.69]
        V3V1[V3 - V1: r = 0.59]
        V3V2[V3 - V2: r = 0.59]
        V3V4[V3 - V4: r = 0.63]
        V3V7[V3 - V7: r = 0.49]
        V4V7[V4 - V7: r = 0.70]
        V5V6[V5 - V6: r = 0.46]
        V3V6[V3 - V6: r = 0.41]
    end
    
    classDef muyFuerte fill:#2ecc71,stroke:#27ae60,color:white;
    classDef fuerte fill:#3498db,stroke:#2980b9,color:white;
    classDef moderada fill:#f1c40f,stroke:#f39c12,color:black;
    
    class V1V2,V1V7,V4V5 muyFuerte;
    class V1V4,V1V5,V1V6,V2V4,V2V5,V2V7,V3V5,V4V6,V5V7,V6V7 fuerte;
    class V2V6,V3V1,V3V2,V3V4,V3V7,V4V7,V5V6,V3V6 moderada;
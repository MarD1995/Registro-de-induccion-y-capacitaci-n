import React from 'react';
import { Worker, TrainingRecord } from './types';

interface PrintableFormProps {
  worker: Worker;
  record: TrainingRecord;
}

export const PrintableForm = React.forwardRef<HTMLDivElement, PrintableFormProps>(({ worker, record }, ref) => {
  return (
    <div 
      ref={ref}
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '10mm',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Arial, sans-serif',
        fontSize: '8pt',
        position: 'absolute',
        left: '-10000px', // Hide from view but keep in DOM for html2canvas
        top: 0
      }}
    >
      {/* Upper Header Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <tbody>
          <tr>
            <td style={{ width: '15%', border: '1px solid black', textAlign: 'center', padding: '5px' }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Logo_Aceros_Arequipa.svg" 
                alt="Logo" 
                style={{ height: '30px' }}
                referrerPolicy="no-referrer"
              />
            </td>
            <td style={{ width: '55%', border: '1px solid black', textAlign: 'center', fontWeight: 'bold', fontSize: '10pt', padding: '5px' }}>
              REGISTRO DE INDUCCIÓN, CAPACITACIÓN, ENTRENAMIENTO Y SIMULACROS DE EMERGENCIA
            </td>
            <td style={{ width: '30%', border: '1px solid black', padding: '0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ borderBottom: '1px solid black', padding: '3px', textAlign: 'center', fontSize: '7pt', color: '#004B8D', fontWeight: 'bold' }}>
                      Macroproceso<br/>Gestión Humana
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px', textAlign: 'center', fontSize: '8pt' }}>
                      GHCC02-E001<br/>Versión: 04
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ padding: '3px', borderLeft: '1px solid black', borderRight: '1px solid black', fontSize: '6pt', lineHeight: '1.2' }}>
        La participación y firma en señal de constancia de asistencia es obligatoria para todos los trabajadores. La negativa injustificada a participar y/o a firmar la presente hoja de asistencia, es pasible de aplicación de medidas disciplinarias , de acuerdo con lo previstoen el Reglamento Interno de Trabajo y la legislación laboral vigente.
      </div>

      {/* Section 1: Employer Data */}
      <div style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', border: '1px solid black', padding: '2px' }}>1.- DATOS DEL EMPLEADOR PRINCIPAL:</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px', width: '15%' }}>RAZÓN SOCIAL</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '35%', fontWeight: 'bold' }}>Corporación Aceros Arequipa S.A.</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '15%' }}>N° DE TRABAJADORES</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '15%', textAlign: 'center' }}>1,000 - 1,200</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '10%' }}>RUC</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '10%', fontWeight: 'bold' }}>20370146994</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px' }}>DIRECCIÓN</td>
            <td style={{ border: '1px solid black', padding: '3px', fontSize: '7pt' }}>Carret. Panamericana Sur Km. 240, Paracas, Pisco</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>ACTIVIDAD ECONÓMICA</td>
            <td colSpan={3} style={{ border: '1px solid black', padding: '3px', fontSize: '7pt' }}>Manufactura, elaboración, comercialización, distribución y venta de hierro, acero, otros metales y sus derivados.</td>
          </tr>
        </tbody>
      </table>

      {/* Section 2: Course Data */}
      <div style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', border: '1px solid black', padding: '2px', borderTop: '0' }}>2.- DATOS DEL CURSO:</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px', width: '15%' }}>TEMAS</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '55%', fontWeight: 'bold' }}>{record.topics}</td>
            <td style={{ border: '1px solid black', padding: '1px', width: '30%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr><td colSpan={4} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '7pt' }}>INDICAR TIPO DE APRENDIZAJE:</td></tr>
                  <tr>
                    <td style={{ fontSize: '7pt' }}>INDUCCIÓN</td>
                    <td style={{ border: '1px solid black', width: '15px', textAlign: 'center' }}>{record.type === 'INDUCCIÓN' ? 'X' : ''}</td>
                    <td style={{ fontSize: '7pt' }}>CAPACITACIÓN</td>
                    <td style={{ border: '1px solid black', width: '15px', textAlign: 'center' }}>{record.type === 'CAPACITACIÓN' ? 'X' : ''}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: '7pt' }}>SIMULACRO</td>
                    <td style={{ border: '1px solid black', width: '15px', textAlign: 'center' }}>{record.type === 'SIMULACRO' ? 'X' : ''}</td>
                    <td style={{ fontSize: '7pt' }}>ENTRENAMIENTO</td>
                    <td style={{ border: '1px solid black', width: '15px', textAlign: 'center' }}>{record.type === 'ENTRENAMIENTO' ? 'X' : ''}</td>
                  </tr>
                  <tr>
                     <td colSpan={2} style={{ fontSize: '7pt' }}>OTROS: Detallar</td>
                     <td colSpan={2} style={{ borderBottom: '1px solid black', fontSize: '7pt' }}>{record.type === 'OTROS' ? record.othersDetail : ''}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px' }}>EXPOSITORES</td>
            <td colSpan={2} style={{ border: '1px solid black', padding: '3px' }}>{record.exhibitors}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px' }}>INSTITUCIÓN</td>
            <td colSpan={2} style={{ border: '1px solid black', padding: '3px' }}>{record.institution}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', borderTop: '0' }}>
         <tbody>
            <tr>
               <td style={{ border: '1px solid black', padding: '3px', width: '15%' }}>FECHA</td>
               <td style={{ border: '1px solid black', padding: '3px', width: '20%' }}>{record.date}</td>
               <td style={{ border: '1px solid black', padding: '3px', width: '15%' }}>HORA INICIO</td>
               <td style={{ border: '1px solid black', padding: '3px', width: '20%' }}>{record.startTime}</td>
               <td style={{ border: '1px solid black', padding: '3px', width: '15%' }}>DURACIÓN</td>
               <td style={{ border: '1px solid black', padding: '3px', width: '15%' }}>{record.duration}</td>
            </tr>
         </tbody>
      </table>

      {/* Section 3: Assistant Data */}
      <div style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', border: '1px solid black', padding: '2px', borderTop: '0' }}>3.- DATOS DE LOS ASISTENTES:</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead style={{ backgroundColor: '#f5f5f5' }}>
          <tr>
            <th style={{ border: '1px solid black', padding: '3px', width: '5%' }}>ÍTEM</th>
            <th style={{ border: '1px solid black', padding: '3px', width: '30%' }}>NOMBRE Y APELLIDO</th>
            <th style={{ border: '1px solid black', padding: '3px', width: '15%' }}>DNI</th>
            <th style={{ border: '1px solid black', padding: '3px', width: '20%' }}>GERENCIA / ÁREA</th>
            <th style={{ border: '1px solid black', padding: '3px', width: '15%' }}>FIRMA</th>
            <th style={{ border: '1px solid black', padding: '3px', width: '15%' }}>OBSERVACIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>1</td>
            <td style={{ border: '1px solid black', padding: '5px', fontWeight: 'bold' }}>{worker.name} {worker.lastName}</td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{worker.dni}</td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{worker.area}</td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', fontSize: '6pt', fontStyle: 'italic' }}>FIRMADO DIGITALMENTE</td>
            <td style={{ border: '1px solid black', padding: '5px' }}></td>
          </tr>
          {/* Fill empty rows to look like the original form */}
          {Array.from({ length: 19 }).map((_, i) => (
            <tr key={i}>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{i + 2}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}></td>
              <td style={{ border: '1px solid black', padding: '10px' }}></td>
              <td style={{ border: '1px solid black', padding: '10px' }}></td>
              <td style={{ border: '1px solid black', padding: '10px' }}></td>
              <td style={{ border: '1px solid black', padding: '10px' }}></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 4: Responsible Data */}
      <div style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', border: '1px solid black', padding: '2px', borderTop: '0' }}>4.- DATOS DEL RESPONSABLE DEL REGISTRO:</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px', width: '15%', fontSize: '7pt' }}>NOMBRES Y APELLIDOS:</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '25%', fontWeight: 'bold' }}>MARLON ALEXANDER RUIZ DELGADO</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '10%', fontSize: '7pt' }}>DNI / CE:</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '15%', fontWeight: 'bold' }}>74384798</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '10%', fontSize: '7pt' }}>CÓDIGO:</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '10%', fontWeight: 'bold' }}>10002904</td>
            <td style={{ border: '1px solid black', padding: '3px', width: '15%', fontSize: '7pt' }}>CARGO: ANALISTA DE CAPACITACIÓN</td>
          </tr>
        </tbody>
      </table>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '40px', paddingBottom: '20px', borderLeft: '1px solid black', borderRight: '1px solid black', borderBottom: '1px solid black' }}>
         <div style={{ textAlign: 'center', width: '40%' }}>
            <div style={{ borderBottom: '1px solid black', width: '100%', height: '30px' }}></div>
            <div style={{ fontSize: '7pt', paddingTop: '5px' }}>Responsable del registro</div>
         </div>
         <div style={{ textAlign: 'center', width: '40%' }}>
            <div style={{ borderBottom: '1px solid black', width: '100%', height: '30px' }}></div>
            <div style={{ fontSize: '7pt', paddingTop: '5px' }}>Expositor del curso</div>
         </div>
      </div>

      <div style={{ fontSize: '6pt', marginTop: '5px' }}>
        Fuente: Resolución ministerial RM-050-2013-TR-Formatos-referenciales
      </div>
    </div>
  );
});

PrintableForm.displayName = 'PrintableForm';

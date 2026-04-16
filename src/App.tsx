/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  User, 
  ChevronRight, 
  CheckCircle2, 
  ClipboardList, 
  Calendar, 
  Clock, 
  Users, 
  ArrowLeft,
  Search,
  Check,
  FileDown,
  Loader2
} from 'lucide-react';
import { MOCK_WORKERS, TRAINING_RECORDS } from './constants';
import { Worker, TrainingRecord } from './types';
import { PrintableForm } from './PrintableForm';

export default function App() {
  const [dni, setDni] = useState('');
  const [currentUser, setCurrentUser] = useState<Worker | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<TrainingRecord | null>(null);
  const [view, setView] = useState<'login' | 'selector' | 'form' | 'success'>('login');
  const [error, setError] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_WORKERS.find(w => w.dni === dni);
    if (user) {
      setCurrentUser(user);
      setView('selector');
      setError('');
    } else {
      setError('DNI no encontrado en la base de datos.');
    }
  };

  const handleSelectRecord = (record: TrainingRecord) => {
    setSelectedRecord(record);
    setView('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would save to Firestore
    setView('success');
    
    // Automatically trigger PDF generation
    // Small timeout to ensure success view is rendered and user sees progress if needed
    setTimeout(() => {
      generatePDF();
    }, 500);
  };

  const reset = () => {
    setDni('');
    setCurrentUser(null);
    setSelectedRecord(null);
    setView('login');
    setIsGeneratingPdf(false);
  };

  const generatePDF = async () => {
    if (!pdfRef.current || !currentUser || !selectedRecord) return;
    
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Registro_${currentUser.dni}_${selectedRecord.id}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Hidden printable component */}
      {currentUser && selectedRecord && (
        <PrintableForm 
          ref={pdfRef} 
          worker={currentUser} 
          record={selectedRecord} 
        />
      )}
      <AnimatePresence mode="wait">
        {view === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-[#004B8D] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
                <User className="text-white w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Acceso Trabajador</h1>
              <p className="text-slate-500 text-sm mt-2 text-center">
                Corporación Aceros Arequipa S.A.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  DNI del Trabajador
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ingrese su DNI"
                    maxLength={8}
                    className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004B8D] focus:border-transparent transition-all outline-none font-medium placeholder:text-slate-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search size={20} />
                  </div>
                </div>
                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#004B8D] hover:bg-[#003d73] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 group"
              >
                Ingresar
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        )}

        {view === 'selector' && currentUser && (
          <motion.div
            key="selector"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl"
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className="bg-[#004B8D] p-8 text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold">Bienvenido(a),</h2>
                    <p className="text-blue-100 text-lg font-medium">{currentUser.name} {currentUser.lastName}</p>
                  </div>
                  <button onClick={reset} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ArrowLeft size={24} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-blue-100 text-xs uppercase tracking-wider font-bold mb-1">DNI</p>
                    <p className="font-mono">{currentUser.dni}</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-blue-100 text-xs uppercase tracking-wider font-bold mb-1">Gerencia / Área</p>
                    <p>{currentUser.area}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <ClipboardList className="text-[#004B8D]" />
                  Seleccione el Registro a completar
                </h3>
                
                <div className="grid gap-4">
                  {TRAINING_RECORDS.map((record) => (
                    <button
                      key={record.id}
                      onClick={() => handleSelectRecord(record)}
                      className="flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#004B8D] hover:shadow-lg rounded-2xl transition-all group text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#004B8D] group-hover:bg-[#004B8D] group-hover:text-white transition-colors">
                          <CheckCircle2 size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-[#004B8D] transition-colors">{record.title}</p>
                          <p className="text-sm text-slate-500 font-medium">{record.type} • {record.date}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-[#004B8D] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'form' && currentUser && selectedRecord && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                {/* Header mimicking the PDF style but modernized */}
                <div className="bg-[#004B8D] p-6 text-white flex justify-between items-center border-b border-white/10">
                  <div className="flex items-center gap-4">
                     <div className="bg-white p-2 rounded-lg">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Logo_Aceros_Arequipa.svg" 
                          alt="Aceros Arequipa" 
                          className="h-8"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src = "https://picsum.photos/seed/aceros/100/40";
                          }}
                        />
                     </div>
                     <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-blue-200">Registro de Inducción y Capacitación</h2>
                        <p className="text-xs opacity-70">Versión: 04 • GHCC02-E001</p>
                     </div>
                  </div>
                  <button onClick={() => setView('selector')} className="text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <ArrowLeft size={16} /> Volver
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                  {/* Employer Section */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-4">1. DATOS DEL EMPLEADOR PRINCIPAL</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Razón Social</label>
                        <p className="font-bold text-slate-800">Corporación Aceros Arequipa S.A.</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">RUC</label>
                        <p className="font-mono text-slate-800">20370146994</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Actividad Económica</label>
                        <p className="text-slate-800 text-sm">Manufactura, elaboración, comercialización, distribución y venta de hierro, acero, otros metales y sus derivados.</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Data Section */}
                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xs font-black uppercase text-[#004B8D] tracking-[0.2em]">2. DATOS DEL CURSO</h3>
                      <span className="bg-[#004B8D] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                        {selectedRecord.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-blue-600 uppercase mb-1">Temas</label>
                        <p className="font-bold text-slate-800 text-lg leading-tight">{selectedRecord.topics}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-blue-600 uppercase mb-1 flex items-center gap-1">
                          <Users size={12} /> Expositores
                        </label>
                        <p className="font-medium text-slate-700">{selectedRecord.exhibitors}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-blue-600 uppercase mb-1 flex items-center gap-1">
                          <Calendar size={12} /> Fecha
                        </label>
                        <p className="font-medium text-slate-700">{selectedRecord.date}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-blue-600 uppercase mb-1 flex items-center gap-1">
                          <Clock size={12} /> Hora Inicio / Duración
                        </label>
                        <p className="font-medium text-slate-700">{selectedRecord.startTime} ({selectedRecord.duration})</p>
                      </div>
                    </div>
                  </div>

                  {/* Assistant Data Section */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-4">3. DATOS DEL ASISTENTE (AUTO-COMPLETADO)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre y Apellido</label>
                        <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl font-bold text-slate-800">
                          {currentUser.name} {currentUser.lastName}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">DNI</label>
                        <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl font-bold font-mono text-slate-800">
                          {currentUser.dni}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gerencia / Área</label>
                        <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl font-bold text-slate-800">
                          {currentUser.area}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                     <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="mt-1">
                           <input type="checkbox" required className="w-5 h-5 rounded border-slate-300 text-[#004B8D] focus:ring-[#004B8D]" />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors italic">
                          La participación y firma en señal de constancia de asistencia es obligatoria para todos los trabajadores. La negativa injustificada a participar y/o a firmar la presente hoja de asistencia, es pasible de aplicación de medidas disciplinarias, de acuerdo con lo previsto en el Reglamento Interno de Trabajo y la legislación laboral vigente.
                        </p>
                     </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#004B8D] hover:bg-[#003d73] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <Check size={28} />
                    REGISTRAR ASISTENCIA
                  </button>
                </form>
             </div>
          </motion.div>
        )}

        {view === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-600 w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">¡Registro Exitoso!</h2>
            <p className="text-slate-500 mb-8 font-medium">
              Asistencia registrada correctamente. Su comprobante PDF se descargará automáticamente en unos segundos.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={generatePDF}
                disabled={isGeneratingPdf}
                className="w-full bg-[#004B8D] hover:bg-[#003d73] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <FileDown size={20} />
                )}
                {isGeneratingPdf ? 'Generando PDF...' : 'Descargar Formulario PDF'}
              </button>
              
              <button
                onClick={reset}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-bold transition-all"
              >
                Finalizar y Salir
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <p className="fixed bottom-4 text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">
        Aceros Arequipa S.A. • Gestión Humana
      </p>
    </div>
  );
}

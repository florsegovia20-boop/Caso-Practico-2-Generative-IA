import React, { useState } from 'react';
import { generateStrategy } from './services/geminiService';
import { StrategyData, AppState } from './types';
import { StrategyViewer } from './components/StrategyViewer';
import { RocketIcon, BrainIcon } from './components/Icons';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [strategyData, setStrategyData] = useState<StrategyData | null>(null);
  const [inputDesc, setInputDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDesc.trim()) return;

    setAppState(AppState.LOADING);
    try {
      const data = await generateStrategy(inputDesc);
      setStrategyData(data);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setErrorMsg("Ocurrió un error al generar la estrategia. Por favor, intenta de nuevo.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setStrategyData(null);
    setInputDesc('');
    setAppState(AppState.INPUT);
  };

  if (appState === AppState.RESULT && strategyData) {
    return <StrategyViewer data={strategyData} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        
        {appState === AppState.INPUT && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 transform transition-all">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200">
                <BrainIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">GenAI Consultant</h1>
            <p className="text-center text-slate-500 mb-8">
              Experto virtual en transformación digital para E-commerce.
              Describe tu empresa para generar una estrategia a medida.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Descripción de la Empresa
                </label>
                <textarea
                  className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none h-32 text-slate-700 placeholder:text-slate-400"
                  placeholder="Ej: Retail de moda sostenible con 50 empleados, ventas principalmente en LATAM, problemas con devoluciones..."
                  value={inputDesc}
                  onChange={(e) => setInputDesc(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={!inputDesc.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
              >
                <RocketIcon className="w-5 h-5" />
                Generar Estrategia
              </button>
            </form>
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="text-center animate-fade-in">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <BrainIcon className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Analizando Datos...</h2>
            <p className="text-slate-500">Nuestros agentes de IA están diseñando tu roadmap.</p>
          </div>
        )}

        {appState === AppState.ERROR && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Algo salió mal</h3>
            <p className="text-slate-600 mb-6">{errorMsg}</p>
            <button
              onClick={() => setAppState(AppState.INPUT)}
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
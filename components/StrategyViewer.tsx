import React, { useState } from 'react';
import { StrategyData } from '../types';
import { 
  RocketIcon, 
  ChartIcon, 
  UsersIcon, 
  ShieldIcon, 
  DatabaseIcon, 
  TargetIcon,
  CheckCircleIcon,
  BrainIcon
} from './Icons';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface Props {
  data: StrategyData;
  onReset: () => void;
}

type Tab = 'overview' | 'alignment' | 'data' | 'talent' | 'ethics';

export const StrategyViewer: React.FC<Props> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Resumen Ejecutivo', icon: <RocketIcon className="w-4 h-4" /> },
    { id: 'alignment', label: 'Negocio & Roadmap', icon: <TargetIcon className="w-4 h-4" /> },
    { id: 'data', label: 'Datos & Infra', icon: <DatabaseIcon className="w-4 h-4" /> },
    { id: 'talent', label: 'Talento', icon: <UsersIcon className="w-4 h-4" /> },
    { id: 'ethics', label: 'Ética & Riesgos', icon: <ShieldIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BrainIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">{data.companyName}</h1>
            <p className="text-xs text-slate-500 font-medium">ESTRATEGIA DE TRANSFORMACIÓN GENAI</p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
        >
          Nueva Consulta
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation (Desktop) */}
        <nav className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 py-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all relative
                ${activeTab === tab.id 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              {activeTab === tab.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
              )}
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Mobile Navigation (Top) */}
        <nav className="md:hidden flex overflow-x-auto bg-white border-b border-slate-200 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all
                ${activeTab === tab.id 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-slate-600 border-transparent'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Resumen Ejecutivo</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{data.executiveSummary}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.businessAlignment?.kpis?.map((kpi, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden group hover:border-blue-200 transition-colors">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <ChartIcon className="w-16 h-16 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{kpi.name}</p>
                        <p className="text-3xl font-bold text-slate-900 mt-2">{kpi.target}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-sm">
                        <span className="text-slate-400">Actual: {kpi.current}</span>
                        <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-xs">Objetivo</span>
                      </div>
                    </div>
                  ))}
                </div>

                <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Proyección de Impacto en Ingresos</h3>
                  <div className="h-80 w-full">
                    {data.projectedGrowth && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.projectedGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="month" stroke="#64748b" tick={{fontSize: 12}} />
                          <YAxis stroke="#64748b" tick={{fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                          />
                          <Legend wrapperStyle={{paddingTop: '20px'}} />
                          <Bar dataKey="revenueBaseline" name="Ingresos Base" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={30} />
                          <Bar dataKey="revenueGenAI" name="Con Estrategia GenAI" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'alignment' && (
              <div className="space-y-6 animate-fade-in">
                {/* Challenges & Goals */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <TargetIcon className="w-5 h-5 text-red-500" />
                      Desafíos Actuales
                    </h3>
                    <ul className="space-y-3">
                      {data.businessAlignment?.challenges?.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                      Metas Estratégicas
                    </h3>
                    <ul className="space-y-3">
                      {data.businessAlignment?.goals?.map((g, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Use Cases */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Casos de Uso de Alto Impacto</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {data.businessAlignment?.highImpactUseCases?.map((useCase, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-blue-600 font-bold text-lg">
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">{useCase.title}</h4>
                        <p className="text-sm text-slate-600 mb-4">{useCase.description}</p>
                        <div className="pt-4 border-t border-slate-100">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            Impacto: {useCase.impact}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Roadmap */}
                <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">Roadmap de Implementación</h3>
                  <div className="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200">
                    {data.businessAlignment?.roadmap?.map((phase, idx) => (
                      <div key={idx} className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex items-center order-1 md:w-5/12"></div>
                        <div className="z-10 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full border-4 border-white absolute left-0 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2">
                          <h1 className="mx-auto font-semibold text-xs text-white">{idx + 1}</h1>
                        </div>
                        <div className="order-1 bg-slate-50 border border-slate-200 rounded-lg shadow-sm p-6 ml-12 md:ml-0 md:w-5/12 w-full">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-slate-800 text-lg">{phase.phase}</h3>
                            <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2 py-1 rounded">{phase.duration}</span>
                          </div>
                          <p className="text-sm text-blue-600 font-medium mb-3">{phase.focus}</p>
                          <ul className="space-y-1">
                            {phase.actions.map((action, k) => (
                              <li key={k} className="text-xs text-slate-600 flex items-center gap-2">
                                <span className="w-1 h-1 bg-slate-400 rounded-full" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-8 animate-fade-in">
                {/* Infrastructure Diagram Concept */}
                <div className="bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                  <h3 className="text-xl font-bold mb-6 relative z-10">Arquitectura de Datos GenAI</h3>
                  <div className="grid md:grid-cols-3 gap-6 relative z-10">
                    {data.dataInfrastructure?.infrastructure?.map((infra, idx) => (
                      <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-lg">
                        <DatabaseIcon className="w-8 h-8 text-blue-400 mb-4" />
                        <h4 className="text-lg font-semibold mb-2">{infra.component}</h4>
                        <p className="text-sm text-slate-400">{infra.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Cultura de Datos</h3>
                    <ul className="space-y-4">
                      {data.dataInfrastructure?.culturePlan?.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-sm font-bold">{idx + 1}</div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Aseguramiento de Calidad (Data Quality)</h3>
                    <div className="space-y-4">
                      {data.dataInfrastructure?.qualityMeasures?.map((measure, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700">{measure}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'talent' && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-2 space-y-6">
                    <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <UsersIcon className="w-5 h-5 text-blue-600" />
                        Roles Clave a Incorporar
                      </h3>
                      <div className="grid gap-4">
                        {data.talentCapabilities?.rolesNeeded?.map((role, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                              {role.charAt(0)}
                            </div>
                            <span className="font-medium text-slate-800">{role}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Plan de Capacitación & Reskilling</h3>
                      <div className="space-y-4">
                        {data.talentCapabilities?.trainingProgram?.map((prog, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">{prog.module}</h4>
                              <p className="text-xs text-slate-500 mt-1">Dirigido a: {prog.audience}</p>
                            </div>
                            <button className="mt-3 md:mt-0 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-100">
                              Ver Syllabus
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="col-span-1">
                     <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg text-white p-6 h-full">
                        <h3 className="text-lg font-bold mb-6">Alianzas Estratégicas</h3>
                        <div className="space-y-6">
                          {data.talentCapabilities?.partnerships?.map((partner, idx) => (
                            <div key={idx} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                              <p className="font-medium text-sm leading-relaxed">{partner}</p>
                            </div>
                          ))}
                        </div>
                     </section>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ethics' && (
              <div className="space-y-8 animate-fade-in">
                 <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                    <h3 className="font-bold text-amber-800 flex items-center gap-2">
                      <ShieldIcon className="w-5 h-5" />
                      Marco de Gobernanza
                    </h3>
                    <p className="text-sm text-amber-700 mt-2">{data.ethicsGovernance?.governanceProcess}</p>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Matriz de Riesgos y Mitigación</h3>
                      <div className="space-y-4">
                        {data.ethicsGovernance?.risks?.map((risk, idx) => (
                          <div key={idx} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                             <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-slate-800 text-sm">{risk.risk}</h4>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase
                                  ${risk.impact === 'Alto' ? 'bg-red-100 text-red-700' : 
                                    risk.impact === 'Medio' ? 'bg-orange-100 text-orange-700' : 
                                    'bg-yellow-100 text-yellow-700'}`}>
                                  {risk.impact}
                                </span>
                             </div>
                             <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                               <span className="font-semibold text-slate-700">Mitigación:</span> {risk.mitigation}
                             </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Principios Éticos Fundamentales</h3>
                      <div className="grid gap-3">
                        {data.ethicsGovernance?.principles?.map((principle, idx) => (
                          <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex gap-3 items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                            <span className="text-sm font-medium text-slate-700">{principle}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                 </div>
              </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
};
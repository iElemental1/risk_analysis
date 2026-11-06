"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  Heart, 
  Camera, 
  Calendar, 
  Code,
  Infinity as InfinityIcon,
  ChevronRight
} from 'lucide-react';

import fotoUno from '../public/foto-1.jpg'; // Cambia 'foto1.jpg' por el nombre real
import fotoDos from '../public/foto-2.png'; // Cambia por tu foto 2
// import fotoTres from '../public/viaje.jpg'; // Cambia por tu foto 3

// --- Componente de Confeti (Ligero y sin dependencias externas) ---
const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#4ade80', '#2dd4bf', '#3b82f6', '#f472b6', '#fbbf24'];

    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1
      });
    }

    let animationFrameId;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default function Dashboard() {
  // Estados: 1 = Formulario, 2 = Terminal, 3 = Dashboard, 4 = Éxito
  const [screen, setScreen] = useState(1);
  const [sliders, setSliders] = useState({ horas: 50, compatibilidad: 50, proyeccion: 50 });
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [isHoveringNo, setIsHoveringNo] = useState(false);

  const logs = [
    "> Iniciando análisis de riesgo paramétrico...",
    "> Calculando varianza de felicidad...",
    "> Analizando logs de seguridad de nuestro historial...",
    "> Ejecutando queries para descartar anomalías de riesgo...",
    "> Revisando tablas de mortalidad por amor...",
    "> Compilando modelo predictivo...",
    "> RESOLUCIÓN ALCANZADA. Desplegando dashboard..."
  ];

  // Lógica de la terminal de carga
  useEffect(() => {
    if (screen === 2) {
      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < logs.length) {
          setTerminalLogs(prev => [...prev, logs[currentLog]]);
          currentLog++;
        } else {
          clearInterval(interval);
          setTimeout(() => setScreen(3), 800);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [screen]);

  // Lógica del botón escurridizo
  const handleNoHover = () => {
    setIsHoveringNo(true);
    // Limitar el rango para que no se salga de la pantalla
    const maxX = window.innerWidth - 150; 
    const maxY = window.innerHeight - 60;
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    setNoButtonStyle({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.15s ease-out'
    });
  };

  // --- PANTALLA 1: FORMULARIO ---
  if (screen === 1) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-4 font-mono">
        <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
            <Activity className="text-cyan-400" size={24} />
            <h1 className="text-lg font-bold text-white tracking-wide">
              EVALUACIÓN PRELIMINAR DE RIESGO
            </h1>
          </div>
          
          <div className="p-6 space-y-8">
            <p className="text-sm text-slate-400">
              Por favor, ingresa los parámetros iniciales para calibrar el modelo predictivo conjunto.
            </p>
            
            {/* Sliders */}
            <div className="space-y-6">
              {[
                { id: 'horas', label: 'Horas de plática continuas', value: sliders.horas },
                { id: 'compatibilidad', label: 'Nivel de compatibilidad analizado', value: sliders.compatibilidad },
                { id: 'proyeccion', label: 'Proyección a futuro (%)', value: sliders.proyeccion }
              ].map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-300 font-semibold">{item.label}</span>
                    <span className="text-slate-300">{item.value}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={item.value}
                    onChange={(e) => setSliders({...sliders, [item.id]: e.target.value})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              ))}
            </div>

            <button 
              onClick={() => setScreen(2)}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.5)]"
            >
              <Code size={18} />
              calcular_riesgo_actuarial()
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PANTALLA 2: TERMINAL DE CARGA ---
  if (screen === 2) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-mono">
        <div className="max-w-2xl w-full bg-black border border-slate-800 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="bg-slate-900 p-2 border-b border-slate-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-slate-500">root@sys-eval:~</span>
          </div>
          <div className="p-6 h-64 overflow-y-auto font-mono text-sm text-green-400 space-y-2">
            {terminalLogs.map((log, i) => (
              <div key={i} className="animate-pulse">{log}</div>
            ))}
            <div className="w-2 h-4 bg-green-400 animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  // --- PANTALLA 3 y 4: DASHBOARD CLÍMAX ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans relative overflow-hidden">
      {screen === 4 && <Confetti />}

      {/* OVERLAY DE ÉXITO */}
      {screen === 4 && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border-2 border-green-500 rounded-2xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-in fade-in zoom-in duration-500">
            <Heart className="w-20 h-20 text-red-500 mx-auto animate-bounce mb-4 fill-red-500" />
            <h2 className="text-3xl font-bold text-white mb-2">¡Contrato Inicializado!</h2>
            <p className="text-green-400 font-mono text-sm">
              [Status: 200 OK] ❤️ Transacción de amor aprobada exitosamente.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Terminal className="text-cyan-400" />
              EVALUACIÓN DE RIESGO DE NOVIAZGO
            </h1>
            <p className="text-slate-400 mt-1">Sujetos de prueba: Fer & [Tu Nombre]</p>
          </div>
          <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-full flex items-center gap-2 text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Sistema en Línea
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center shadow-lg">
            <ShieldCheck className="text-cyan-400 w-10 h-10 mb-3" />
            <h3 className="text-slate-400 text-sm font-semibold tracking-wider">RIESGO DE INVERSIÓN</h3>
            <p className="text-4xl font-bold text-white mt-2">0.00%</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center shadow-lg">
            <TrendingUp className="text-green-400 w-10 h-10 mb-3" />
            <h3 className="text-slate-400 text-sm font-semibold tracking-wider">PROBABILIDAD DE ÉXITO</h3>
            <p className="text-4xl font-bold text-white mt-2">99.99%</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent"></div>
            <Heart className="text-pink-500 w-10 h-10 mb-3" />
            <h3 className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Retorno de Inversión</h3>
            <p className="text-4xl font-bold text-white mt-2 flex items-center justify-center gap-2">
              <InfinityIcon className="w-10 h-10 text-pink-400" />
            </p>
          </div>
        </div>

        {/* TIMELINE HISTÓRICO */}
        <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="text-cyan-400" size={20} />
            HISTÓRICO DE MOMENTOS Y PROYECCIONES
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 overflow-x-auto pb-4 hide-scrollbar">
            
            {/* Nodo 1 */}
            <div className="flex flex-col items-center min-w-[200px] flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-700 mb-4 shadow-lg">
                {/* Puedes reemplazar esta URL con la ruta de tu foto real ej: "/foto-1.jpg" */}
                <img src={fotoUno.src} alt="Día 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <p className="font-semibold text-slate-200">De nuestras primeras citas</p>
              <p className="text-xs text-slate-500 font-mono mt-1">(Ajuste del modelo)</p>
            </div>

            {/* Conector */}
            <div className="hidden md:flex flex-1 h-0.5 bg-slate-800 mx-2 flex-col items-center relative">
              <div className="absolute w-full h-full flex justify-center -top-2">
                <ChevronRight className="text-slate-600 w-5 h-5" />
              </div>
            </div>

            {/* Nodo 2 */}
            <div className="flex flex-col items-center min-w-[200px] flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-700 mb-4 shadow-lg">
                {/* Puedes reemplazar esta URL con la ruta de tu foto real */}
                <img src={fotoDos.src} alt="Dia 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <p className="font-semibold text-slate-200">Dateando en el carro</p>
              <p className="text-xs text-slate-500 font-mono mt-1">(Alta correlación de gustos)</p>
            </div>

            {/* Conector */}
            <div className="hidden md:flex flex-1 h-0.5 bg-gradient-to-r from-slate-800 to-green-500/50 mx-2 flex-col items-center relative">
               <div className="absolute w-full h-full flex justify-end -top-2 right-0">
                <ChevronRight className="text-green-500 w-5 h-5" />
              </div>
            </div>

            {/* Nodo 3 - Futuro */}
            <div className="flex flex-col items-center min-w-[220px] flex-shrink-0 mt-6 md:mt-0">
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-green-400 bg-green-400/10 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                <Camera className="text-green-400 w-8 h-8" />
              </div>
              <p className="font-semibold text-green-400">AÑO 2026+ | Próxima Aventura</p>
              <p className="text-xs text-green-500/70 font-mono mt-1 text-center px-4">
                (Por programar y calcular)
              </p>
            </div>
            
          </div>
          <p className="text-center text-sm text-slate-400 mt-6 italic">
            "¿Me ayudas a seguir recopilando datos y llenando este timeline de aventuras?"
          </p>
        </section>

        {/* BLOQUE DE CÓDIGO Y PREGUNTA */}
        <section className="bg-[#1e1e1e] rounded-xl border border-slate-800 overflow-hidden font-mono shadow-2xl relative">
          <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-slate-700/50">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-400 ml-2">proposal.js</span>
          </div>
          <div className="p-6 text-sm md:text-base leading-relaxed overflow-x-auto">
            <span className="text-pink-500">if</span> 
            <span className="text-slate-300"> (riesgo </span> 
            <span className="text-pink-500">===</span> 
            <span className="text-green-400"> 0.00</span>
            <span className="text-slate-300">) {'{'}</span>
            <br />
            <span className="text-slate-300 ml-8">
              <span className="text-pink-500">return</span> 
              <span className="text-yellow-300 font-bold text-lg md:text-xl"> "¿Quieres ser mi novia, Fer?"</span>;
            </span>
            <br />
            <span className="text-slate-300">{'}'}</span>
          </div>

          {/* BOTONES DE DECISIÓN */}
          {screen === 3 && (
            <div className="p-6 pt-0 flex flex-col sm:flex-row items-center justify-center gap-6 mt-4 relative h-24">
              
              <button 
                onClick={() => setScreen(4)}
                className="px-10 py-3 bg-green-500 hover:bg-green-400 text-black font-bold text-lg rounded-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)] relative z-10"
              >
                True (Sí)
              </button>

              <button 
                onMouseEnter={handleNoHover}
                style={isHoveringNo ? noButtonStyle : {}}
                className={`px-10 py-3 bg-red-500/20 text-red-400 border border-red-500/50 font-bold text-lg rounded-lg transition-colors z-20 ${!isHoveringNo ? 'hover:bg-red-500/30' : ''}`}
              >
                False (No)
              </button>

            </div>
          )}
        </section>

      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Clock, Award, Sparkles, BookOpen, Plus } from 'lucide-react';
import { View, Project } from '../types';

interface DashboardProps {
  userName: string;
  dailyGoal: number;
  dailyProgress: number;
  setView: (view: View) => void;
  projects: Project[];
}

export function Dashboard({ userName, dailyGoal, dailyProgress, setView, projects }: DashboardProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const percent = Math.min(Math.round((dailyProgress / dailyGoal) * 100), 100);
  const currentProject = projects.length > 0 ? projects[0] : null;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Bom dia, {userName}! ☀️</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Que tal escrevermos um pouco hoje?</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-light text-slate-600 dark:text-slate-300">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4" /> Meta Diária
            </h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{dailyProgress}</span>
              <span className="text-slate-400 dark:text-slate-500 mb-1">/ {dailyGoal} palavras</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 dark:bg-indigo-400 h-full transition-all duration-1000" 
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-rose-500 p-6 rounded-2xl text-white shadow-sm relative overflow-hidden">
          <h3 className="font-medium flex items-center gap-2 mb-2 opacity-90">
            <Award className="w-4 h-4" /> Ofensiva
          </h3>
          <div className="text-5xl font-bold mb-2">7 Dias</div>
          <p className="text-orange-100 text-sm">Você está pegando fogo!</p>
          <Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-20" />
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          {currentProject ? (
            <>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Projeto Atual
                  </h3>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs px-2 py-1 rounded-full font-medium">
                    {currentProject.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 truncate">
                  {currentProject.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {currentProject.genre}
                </p>
              </div>
              <button 
                onClick={() => setView('editor')} 
                className="mt-4 w-full bg-slate-900 dark:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors cursor-pointer"
              >
                Continuar Escrevendo
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Nenhum projeto</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Comece sua jornada literária agora.</p>
              <button 
                onClick={() => setView('projects')} 
                className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Criar Projeto
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

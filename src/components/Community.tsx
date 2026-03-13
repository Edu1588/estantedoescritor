import React from 'react';
import { User, BookOpen, TrendingUp } from 'lucide-react';

export function Community() {
  const users = [
    { name: 'Maria Silva', bio: 'Escritora de fantasia e RPG.', book: 'O Reino de Vidro', progress: 75, link: 'https://maria.com' },
    { name: 'João Souza', bio: 'Amante de sci-fi e café.', book: 'Andrômeda 5', progress: 30, link: 'https://joao.net' },
    { name: 'Ana Clara', bio: 'Poetisa nas horas vagas.', book: 'Versos Livres', progress: 90, link: 'https://ana.art' },
    { name: 'Carlos Dias', bio: 'Thriller psicológico é comigo.', book: 'Mente Sombria', progress: 15, link: null },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Comunidade</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Conecte-se com outros escritores e acompanhe seus progressos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">{user.name}</h3>
                  {user.link && (
                    <a href={user.link} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                      Ver Bio
                    </a>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 italic">"{user.bio}"</p>

            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                <BookOpen className="w-4 h-4" />
                {user.book}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Progresso</span>
                  <span>{user.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full" 
                    style={{ width: `${user.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

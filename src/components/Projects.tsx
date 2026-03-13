import React, { useRef } from 'react';
import { Plus, MoreVertical, Upload, Image as ImageIcon, FileDown, Book } from 'lucide-react';
import { View, Project } from '../types';

interface ProjectsProps {
  setView: (view: View) => void;
  projects: Project[];
  onUpdateProjectCover: (projectId: string, image: string | null) => void;
  onAddProject: () => void;
}

export function Projects({ setView, projects, onUpdateProjectCover, onAddProject }: ProjectsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeProjectIdRef = useRef<string | null>(null);

  const handleCoverClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    activeProjectIdRef.current = projectId;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeProjectIdRef.current) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProjectCover(activeProjectIdRef.current!, reader.result as string);
        activeProjectIdRef.current = null;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    alert(`Iniciando download: ${type}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto fade-in">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Minha Estante</h1>
        <button 
          onClick={onAddProject}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Projeto
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((p) => (
          <div 
            key={p.id}
            onClick={() => setView('editor')} 
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-72 group"
          >
            <div className={`h-3/5 w-full ${p.coverImage ? p.color : 'bg-gradient-to-br from-violet-600 to-indigo-600'} flex items-center justify-center p-6 relative overflow-hidden`}>
              {p.coverImage ? (
                <img src={p.coverImage} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-white z-10 relative">
                  <Book className="w-12 h-12 mb-3 opacity-90 drop-shadow-md" />
                  <h3 className="font-serif text-xl font-bold text-center drop-shadow-md leading-tight">{p.title}</h3>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-20 gap-3">
                <button 
                  onClick={(e) => handleCoverClick(e, p.id)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-colors border border-white/40"
                >
                  <Upload className="w-3 h-3" /> Alterar Capa
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => handleDownload(e, 'PDF Completo')}
                    className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-colors border border-white/40"
                    title="Baixar PDF"
                  >
                    <FileDown className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => handleDownload(e, 'ePub')}
                    className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-colors border border-white/40"
                    title="Baixar ePub"
                  >
                    <Book className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <span className="absolute top-3 right-3 bg-white/20 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm z-20">
                {p.status}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h4 className="font-medium text-slate-800 dark:text-white truncate" title={p.title}>{p.title}</h4>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 flex justify-between uppercase tracking-wider items-center">
                <span>{p.genre}</span>
                <MoreVertical className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}

        <div 
          onClick={onAddProject}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all cursor-pointer h-72 group"
        >
          <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Novo Livro</span>
        </div>
      </div>
    </div>
  );
}

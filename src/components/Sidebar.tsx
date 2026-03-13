import React from 'react';
import { 
  PenTool, 
  Home, 
  Library, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut,
  User,
  UserSquare
} from 'lucide-react';
import { View, Language } from '../types';
import { useTranslation } from '../utils/i18n';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  focusMode: boolean;
  language: Language;
  onLogout: () => void;
  userName: string;
  userAvatar: string | null;
}

export function Sidebar({ currentView, setView, focusMode, language, onLogout, userName, userAvatar }: SidebarProps) {
  const t = useTranslation(language);
  
  if (focusMode) return null;

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'projects', label: t.projects, icon: Library },
    { id: 'editor', label: t.editor, icon: BookOpen },
    { id: 'characters', label: 'Personagens', icon: UserSquare },
    { id: 'notes', label: 'Notas', icon: PenTool },
    { id: 'community', label: t.community, icon: Users },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 shrink-0">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl">
            <PenTool className="w-6 h-6" />
            <span>Estante do <span className="text-indigo-600 dark:text-indigo-400 font-serif">ESC</span>ritor</span>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden border border-indigo-200 dark:border-indigo-800">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {userName}
              </p>
              <button 
                onClick={() => setView('settings')}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as View)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                  isActive 
                    ? 'text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => setView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
            currentView === 'settings'
              ? 'text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Settings className="w-5 h-5" />
          {t.settings}
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600">
          <LogOut className="w-5 h-5" />
          {t.logout}
        </button>
      </div>
    </aside>
  );
}

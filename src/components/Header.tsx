import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  focusMode: boolean;
  userName?: string;
  userAvatar?: string | null;
  onSearch?: (query: string) => void;
}

export function Header({ focusMode, userName, userAvatar, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (focusMode) return null;

  const initial = userName ? userName.charAt(0).toUpperCase() : 'U';

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 transition-colors duration-300">
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 w-96 transition-colors">
        <Search className="text-slate-400 dark:text-slate-500 w-4 h-4" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Buscar em todos os projetos..." 
          className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full flex items-center justify-center font-bold text-sm overflow-hidden">
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </div>
      </div>
    </header>
  );
}

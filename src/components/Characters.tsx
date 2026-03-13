import React, { useState, useRef } from 'react';
import { Project, Character } from '../types';
import { Plus, User, Trash2, Edit2, X, Image as ImageIcon, Search } from 'lucide-react';

interface CharactersProps {
  projects: Project[];
  characters: Character[];
  onUpdateCharacters: (characters: Character[]) => void;
}

export function Characters({ projects, characters, onUpdateCharacters }: CharactersProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id || null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingChar, setEditingChar] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCharacters = characters.filter(c => c.projectId === selectedProjectId);
  const filteredCharacters = activeCharacters.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenForm = (char?: Character) => {
    if (char) {
      setEditingChar(char);
      setName(char.name);
      setRole(char.role);
      setDescription(char.description);
      setAvatar(char.avatar);
    } else {
      setEditingChar(null);
      setName('');
      setRole('');
      setDescription('');
      setAvatar(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingChar(null);
  };

  const handleSave = () => {
    if (!name.trim() || !selectedProjectId) return;

    if (editingChar) {
      const updated = characters.map(c => 
        c.id === editingChar.id 
          ? { ...c, name, role, description, avatar } 
          : c
      );
      onUpdateCharacters(updated);
    } else {
      const newChar: Character = {
        id: Date.now().toString(),
        projectId: selectedProjectId,
        name,
        role,
        description,
        avatar
      };
      onUpdateCharacters([...characters, newChar]);
    }
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este personagem?')) {
      onUpdateCharacters(characters.filter(c => c.id !== id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 h-full">
        <User className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg">Crie um projeto primeiro para adicionar personagens.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-slate-50 dark:bg-slate-950">
      {/* Sidebar: Projects List */}
      <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Projetos</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium truncate ${
                selectedProjectId === project.id
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {project.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Characters Grid */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Personagens</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {projects.find(p => p.id === selectedProjectId)?.title}
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 flex-1 sm:w-64">
              <Search className="text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar personagem..." 
                className="bg-transparent border-none outline-none ml-2 w-full text-sm text-slate-700 dark:text-slate-200"
              />
            </div>
            <button 
              onClick={() => handleOpenForm()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" /> Novo
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filteredCharacters.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <User className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">Nenhum personagem encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCharacters.map(char => (
                <div key={char.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
                  <div className="h-32 bg-slate-100 dark:bg-slate-700 relative flex items-center justify-center overflow-hidden shrink-0">
                    {char.avatar ? (
                      <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-slate-300 dark:text-slate-500" />
                    )}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenForm(char)}
                        className="p-1.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded backdrop-blur-sm transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(char.id)}
                        className="p-1.5 bg-white/80 dark:bg-slate-800/80 hover:bg-red-50 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded backdrop-blur-sm transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg truncate">{char.name}</h3>
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 truncate">{char.role || 'Sem papel'}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 flex-1">
                      {char.description || 'Nenhuma descrição fornecida.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Form */}
        {isFormOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-full animate-in zoom-in-95">
              <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                  {editingChar ? 'Editar Personagem' : 'Novo Personagem'}
                </h3>
                <button onClick={handleCloseForm} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto space-y-4">
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden">
                      {avatar ? (
                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-xs font-medium"
                    >
                      Alterar
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome *</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: Frodo Bolseiro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Papel / Função</label>
                  <input 
                    type="text" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: Protagonista, Antagonista..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="Aparência, personalidade, motivações..."
                  />
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2 bg-slate-50 dark:bg-slate-800/50">
                <button 
                  onClick={handleCloseForm}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Salvar Personagem
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { User, Link as LinkIcon, Globe, Moon, Sun, AlertCircle } from 'lucide-react';
import { AppState, Theme, Language } from '../types';
import { useTranslation } from '../utils/i18n';

interface SettingsProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

export function Settings({ state, updateState }: SettingsProps) {
  const t = useTranslation(state.language);
  const [bioError, setBioError] = useState(false);

  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleBioChange = (value: string) => {
    updateState({ userBioLink: value });
    setBioError(!validateUrl(value));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto fade-in">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">{t.settings}</h1>

      <div className="space-y-6">
        {/* Perfil */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5" /> {t.profile}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.name}</label>
              <input 
                type="text" 
                value={state.userName}
                onChange={(e) => updateState({ userName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto de Perfil</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-600 shrink-0">
                  {state.userAvatar ? (
                    <img src={state.userAvatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    accept="image/*"
                    id="avatar-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 2 * 1024 * 1024) {
                          alert('A imagem deve ter no máximo 2MB.');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateState({ userAvatar: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label 
                    htmlFor="avatar-upload"
                    className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    Fazer Upload
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Formatos suportados: JPG, PNG, GIF. Tamanho máximo: 2MB.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.bioLink}</label>
              <div className="flex items-center gap-2">
                <LinkIcon className={`w-4 h-4 ${bioError ? 'text-red-500' : 'text-slate-400'}`} />
                <input 
                  type="text" 
                  value={state.userBioLink}
                  onChange={(e) => handleBioChange(e.target.value)}
                  placeholder="https://seusite.com/autor"
                  className={`flex-1 px-3 py-2 border rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 ${
                    bioError 
                      ? 'border-red-300 focus:ring-red-500 dark:border-red-700' 
                      : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
                  }`}
                />
              </div>
              {bioError && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> URL inválida. Certifique-se de incluir http:// ou https://
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.publicProfile}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Aparecer na aba Comunidade</span>
              </div>
              <button 
                onClick={() => updateState({ isBioPublic: !state.isBioPublic })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.isBioPublic ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  state.isBioPublic ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </section>

        {/* Aparência e Idioma */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" /> Preferências
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.theme}</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => updateState({ theme: 'light' })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    state.theme === 'light' 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300' 
                      : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Sun className="w-4 h-4" /> {t.light}
                </button>
                <button 
                  onClick={() => updateState({ theme: 'dark' })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    state.theme === 'dark' 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300' 
                      : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Moon className="w-4 h-4" /> {t.dark}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.language}</label>
              <select 
                value={state.language}
                onChange={(e) => updateState({ language: e.target.value as Language })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="pt">Português (BR)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

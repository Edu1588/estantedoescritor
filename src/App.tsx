import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Editor } from './components/Editor';
import { Settings } from './components/Settings';
import { Community } from './components/Community';
import { Notes } from './components/Notes';
import { Characters } from './components/Characters';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { View, AppState, Chapter, Character } from './types';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState<AppState>({
    view: 'dashboard',
    theme: 'light',
    language: 'pt',
    userName: 'Escritor',
    userBioLink: '',
    userAvatar: null,
    isBioPublic: false,
    dailyGoal: 1000,
    dailyProgress: 0,
    focusMode: false,
    synopsis: '',
    chapters: [],
    activeChapterId: '',
    coverImage: null,
    projects: [],
    characters: []
  });

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load User Data from Firestore
  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "user_data", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<AppState>;
          // Merge loaded data with default state, ensuring arrays are handled correctly
          setState(prev => ({
            ...prev,
            ...data,
            // Ensure we don't overwrite view or focusMode with saved state if we don't want to
            view: 'dashboard', 
            focusMode: false
          }));
        } else {
          // New user: Initialize with empty state (already set in useState)
          // Optionally create a "Welcome" project here if desired
          setState(prev => ({ ...prev, userName: user.displayName || 'Escritor' }));
        }
      } catch (error: any) {
        console.error("Error loading user data:", error);
        if (error.code === 'permission-denied') {
          setPermissionError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  // Auto-save User Data to Firestore (Debounced)
  useEffect(() => {
    if (!user || loading) return;

    const saveUserData = async () => {
      try {
        const docRef = doc(db, "user_data", user.uid);
        // Exclude transient UI state from saving
        const { view, focusMode, ...dataToSave } = state;
        await setDoc(docRef, dataToSave, { merge: true });
        setPermissionError(false); // Clear error on success
      } catch (error: any) {
        console.error("Error saving user data:", error);
        if (error.code === 'permission-denied') {
          setPermissionError(true);
        }
      }
    };

    const timeoutId = setTimeout(saveUserData, 3000); // Save after 3 seconds of inactivity
    return () => clearTimeout(timeoutId);
  }, [state, user, loading]);

  // Theme Management
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  const setView = (view: View) => {
    setState(prev => ({ ...prev, view, focusMode: false }));
  };

  const toggleFocus = () => {
    setState(prev => ({ ...prev, focusMode: !prev.focusMode }));
  };

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const updateChapterContent = useCallback((content: string) => {
    setState(prev => {
      if (prev.activeChapterId === 'synopsis') {
        return { ...prev, synopsis: content };
      }
      return {
        ...prev,
        chapters: prev.chapters.map(ch => 
          ch.id === prev.activeChapterId ? { ...ch, content } : ch
        )
      };
    });
  }, []);

  const addChapter = () => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: `Capítulo ${state.chapters.length + 1}`,
      content: ''
    };
    setState(prev => ({
      ...prev,
      chapters: [...prev.chapters, newChapter],
      activeChapterId: newChapter.id
    }));
  };

  const selectChapter = (id: string | 'synopsis') => {
    setState(prev => ({ ...prev, activeChapterId: id }));
  };

  const reorderChapters = (startIndex: number, endIndex: number) => {
    setState(prev => {
      const result = Array.from(prev.chapters);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, chapters: result };
    });
  };

  const getActiveContent = () => {
    if (state.activeChapterId === 'synopsis') return state.synopsis;
    const chapter = state.chapters.find(ch => ch.id === state.activeChapterId);
    return chapter ? chapter.content : '';
  };

  const getActiveTitle = () => {
    if (state.activeChapterId === 'synopsis') return 'Sinopse';
    const chapter = state.chapters.find(ch => ch.id === state.activeChapterId);
    return chapter ? chapter.title : '';
  };

  const updateCoverImage = (image: string | null) => {
    setState(prev => ({ ...prev, coverImage: image }));
  };

  const updateProjectCover = (projectId: string, image: string | null) => {
    setState(prev => {
      const updatedProjects = prev.projects.map(p => 
        p.id === projectId ? { ...p, coverImage: image } : p
      );
      
      // If updating the active project (assuming ID '1' is active for this demo), update main coverImage too
      const newCoverImage = projectId === '1' ? image : prev.coverImage;
      
      return {
        ...prev,
        projects: updatedProjects,
        coverImage: newCoverImage
      };
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "Novo Livro",
      genre: "Gênero",
      status: "Planejamento",
      color: "bg-indigo-600",
      coverImage: null
    };
    setState(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateCharacters = (characters: Character[]) => {
    setState(prev => ({ ...prev, characters }));
  };

  const handleLoginSuccess = (user: any) => {
    // Handled by onAuthStateChanged
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const filteredProjects = state.projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check for Landing Page route
  if (window.location.pathname === '/lp-estantedoescritor') {
    return <LandingPage />;
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Auth onSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Sidebar 
        currentView={state.view} 
        setView={setView} 
        focusMode={state.focusMode} 
        language={state.language}
        onLogout={handleLogout}
        userName={state.userName}
        userAvatar={state.userAvatar}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        <Header 
          focusMode={state.focusMode} 
          userName={state.userName}
          userAvatar={state.userAvatar}
          onSearch={setSearchQuery}
        />

        {permissionError && (
          <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-4 flex items-center justify-between animate-in slide-in-from-top">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-red-800 dark:text-red-200">Erro de Permissão no Banco de Dados</h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Você precisa configurar as Regras de Segurança do Firestore. Vá ao <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-red-900">Console do Firebase</a> {'>'} Firestore Database {'>'} Regras e cole o código abaixo:
                </p>
                <pre className="mt-2 p-2 bg-red-100 dark:bg-red-950 rounded text-xs font-mono text-red-800 dark:text-red-200 overflow-x-auto select-all">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Dados do Usuário (Projetos, Perfil)
    match /user_data/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Notas Pessoais
    match /notes/{noteId} {
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}`}
                </pre>
              </div>
            </div>
            <button 
              onClick={() => setPermissionError(false)}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        )}

        <div className="flex-1 overflow-auto hide-scroll">
          {state.view === 'dashboard' && (
            <Dashboard 
              userName={state.userName}
              dailyGoal={state.dailyGoal}
              dailyProgress={state.dailyProgress}
              setView={setView}
              projects={filteredProjects}
            />
          )}
          
          {state.view === 'projects' && (
            <Projects 
              setView={setView} 
              projects={filteredProjects}
              onUpdateProjectCover={updateProjectCover}
              onAddProject={addProject}
            />
          )}
          
          {state.view === 'community' && (
            <Community />
          )}

          {state.view === 'characters' && (
            <Characters 
              projects={state.projects} 
              characters={state.characters || []} 
              onUpdateCharacters={updateCharacters} 
            />
          )}

          {state.view === 'settings' && (
            <Settings state={state} updateState={updateState} />
          )}

          {state.view === 'notes' && (
            <Notes userId={user.uid} />
          )}
          
          {state.view === 'editor' && (
            <Editor 
              chapters={state.chapters}
              activeChapterId={state.activeChapterId}
              activeChapterContent={getActiveContent()}
              activeChapterTitle={getActiveTitle()}
              focusMode={state.focusMode}
              toggleFocus={toggleFocus}
              updateContent={updateChapterContent}
              onAddChapter={addChapter}
              onSelectChapter={selectChapter}
              onReorderChapters={reorderChapters}
              language={state.language}
              coverImage={state.coverImage}
              onUpdateCover={updateCoverImage}
            />
          )}
        </div>
      </main>
    </div>
  );
}

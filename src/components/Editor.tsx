import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { 
  AlignLeft, 
  Plus, 
  CheckCircle2, 
  Music, 
  Maximize2, 
  Minimize2, 
  MessageSquare, 
  Save,
  ChevronUp,
  ChevronDown,
  Book,
  FileText,
  List,
  Bold,
  Italic,
  Underline,
  AlignCenter,
  AlignRight,
  AlignJustify,
  FileCheck,
  AlertTriangle,
  Image as ImageIcon,
  Download,
  FileDown,
  Upload
} from 'lucide-react';
import { Chapter, Language } from '../types';
import { useTranslation } from '../utils/i18n';

interface EditorProps {
  chapters: Chapter[];
  activeChapterId: string | 'synopsis';
  activeChapterContent: string;
  activeChapterTitle: string;
  focusMode: boolean;
  toggleFocus: () => void;
  updateContent: (content: string) => void;
  onAddChapter: () => void;
  onSelectChapter: (id: string | 'synopsis') => void;
  onReorderChapters: (startIndex: number, endIndex: number) => void;
  language: Language;
  coverImage: string | null;
  onUpdateCover: (image: string | null) => void;
}

export function Editor({ 
  chapters, 
  activeChapterId, 
  activeChapterContent, 
  activeChapterTitle,
  focusMode, 
  toggleFocus, 
  updateContent,
  onAddChapter,
  onSelectChapter,
  onReorderChapters,
  language,
  coverImage,
  onUpdateCover
}: EditorProps) {
  const t = useTranslation(language);
  const [content, setContent] = useState(activeChapterContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(Date.now());
  const [showRepetitions, setShowRepetitions] = useState(false);
  const [repeatedWords, setRepeatedWords] = useState<string[]>([]);
  const [isAbntMode, setIsAbntMode] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync local content state when active chapter changes
  useEffect(() => {
    setContent(activeChapterContent);
  }, [activeChapterId, activeChapterContent]);

  // Stats
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const readingTime = Math.ceil(words / 250);
  const pages = Math.max(1, Math.ceil(words / 600));

  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  // Auto-save interval (2 minutes)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setIsSaving(true);
      timeoutId = setTimeout(() => {
        updateContent(contentRef.current);
        setLastSaved(Date.now());
        setIsSaving(false);
      }, 500);
    }, 2 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [updateContent]);

  // Debounce save simulation
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      setIsSaving(false);
      setLastSaved(Date.now());
      updateContent(content);
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, updateContent]);

  const containerStyle = focusMode ? 'fixed inset-0 z-50 p-4' : 'flex h-full';
  const editorBoxStyle = focusMode 
    ? 'max-w-4xl mx-auto shadow-2xl h-full rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col bg-white dark:bg-slate-800' 
    : 'flex-1 flex flex-col bg-white dark:bg-slate-800';

  const handleMoveChapter = (e: React.MouseEvent, index: number, direction: 'up' | 'down') => {
    e.stopPropagation();
    if (direction === 'up' && index > 0) {
      onReorderChapters(index, index - 1);
    } else if (direction === 'down' && index < chapters.length - 1) {
      onReorderChapters(index, index + 1);
    }
  };

  const checkRepetitions = () => {
    const wordsArray = content.toLowerCase().match(/\b\w+\b/g);
    if (!wordsArray) return;

    const wordCounts: Record<string, number> = {};
    wordsArray.forEach(word => {
      if (word.length > 3) { // Ignore short words
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    const repeated = Object.entries(wordCounts)
      .filter(([_, count]) => count > 3) // Threshold for repetition
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word);

    setRepeatedWords(repeated);
    setShowRepetitions(!showRepetitions);
  };

  const toggleAbnt = () => {
    setIsAbntMode(!isAbntMode);
  };

  const insertFormat = (format: string) => {
    console.log(`Format: ${format}`);
  };

  const handleDownload = (type: 'pdf-all' | 'pdf-page' | 'epub') => {
    if (type === 'pdf-all' || type === 'pdf-page') {
      const doc = new jsPDF();
      
      // Add Title
      doc.setFontSize(24);
      doc.text(activeChapterTitle, 20, 20);
      
      // Add Content
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(content, 170);
      doc.text(splitText, 20, 40);
      
      doc.save(`${activeChapterTitle}.pdf`);
    } else {
      alert('Download ePub em breve!');
    }
  };

  return (
    <div className={`${containerStyle} bg-slate-50 dark:bg-slate-950 transition-all duration-500`}>
      {!focusMode && (
        <div className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 animate-in slide-in-from-left">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex justify-between items-center">
            <h3 className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <List className="w-4 h-4" /> {t.summary}
            </h3>
          </div>
          
          <div className="p-2 space-y-1 overflow-auto flex-1">
            {/* Project Cover & Menu */}
            <div className="mb-4 px-3">
              <div className="relative group aspect-[2/3] bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm mb-2">
                {coverImage ? (
                  <img src={coverImage} alt="Capa do Livro" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs">Sem Capa</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                <button 
                  onClick={() => handleDownload('pdf-all')}
                  className="flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  title="Baixar PDF Completo"
                >
                  <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">PDF</span>
                </button>
                <button 
                  onClick={() => handleDownload('pdf-page')}
                  className="flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  title="Baixar Página Atual"
                >
                  <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">Pág</span>
                </button>
                <button 
                  onClick={() => handleDownload('epub')}
                  className="flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  title="Baixar ePub"
                >
                  <Book className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">ePub</span>
                </button>
              </div>
            </div>

            <div className="my-2 border-t border-slate-200 dark:border-slate-800"></div>

            {/* Sinopse */}
            <div 
              onClick={() => onSelectChapter('synopsis')}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                activeChapterId === 'synopsis'
                  ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm font-medium text-indigo-700 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Book className="w-4 h-4" />
              {t.synopsis}
            </div>

            {/* Capítulos */}
            <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2">
              <span>{t.chapter}s</span>
              <button 
                onClick={onAddChapter}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                title="Novo Capítulo"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {chapters.map((chapter, index) => {
              const isActive = chapter.id === activeChapterId;
              const chapterWords = chapter.content.trim() ? chapter.content.trim().split(/\s+/).length : 0;
              const chapterPages = Math.max(1, Math.ceil(chapterWords / 600));

              return (
                <div key={chapter.id} className="space-y-1">
                  <div 
                    onClick={() => onSelectChapter(chapter.id)}
                    className={`group flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                      isActive 
                        ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm font-medium text-indigo-700 dark:text-indigo-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="truncate">{chapter.title}</span>
                    </div>
                    
                    <div className={`flex items-center gap-1 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                      <button 
                        onClick={(e) => handleMoveChapter(e, index, 'up')}
                        disabled={index === 0}
                        className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-30"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={(e) => handleMoveChapter(e, index, 'down')}
                        disabled={index === chapters.length - 1}
                        className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-30"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {isActive && (
                    <div className="pl-9 pr-2 space-y-0.5">
                      {Array.from({ length: chapterPages }).map((_, i) => (
                        <div key={i} className="text-xs text-slate-400 flex items-center gap-2 py-1">
                          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                          {t.pages} {i + 1}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={editorBoxStyle}>
        {/* Toolbar */}
        <div className="h-10 border-b border-slate-100 dark:border-slate-700 flex items-center px-4 gap-2 bg-slate-50 dark:bg-slate-800 shrink-0 overflow-x-auto hide-scroll">
          <div className="flex items-center gap-1 pr-2 border-r border-slate-200 dark:border-slate-700">
            <button onClick={() => insertFormat('bold')} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400" title={t.bold}><Bold className="w-4 h-4" /></button>
            <button onClick={() => insertFormat('italic')} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400" title={t.italic}><Italic className="w-4 h-4" /></button>
            <button onClick={() => insertFormat('underline')} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400" title={t.underline}><Underline className="w-4 h-4" /></button>
          </div>
          
          <div className="flex items-center gap-1 pr-2 border-r border-slate-200 dark:border-slate-700">
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400" title={t.alignLeft}><AlignLeft className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400" title={t.alignCenter}><AlignCenter className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400" title={t.alignRight}><AlignRight className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400" title={t.justify}><AlignJustify className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
             <button 
              onClick={toggleAbnt}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                isAbntMode 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <FileCheck className="w-3 h-3" /> {t.abnt}
            </button>
            <button 
              onClick={checkRepetitions}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                showRepetitions 
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <AlertTriangle className="w-3 h-3" /> {t.checkRepetition}
            </button>
          </div>
        </div>

        {/* Repetition Alert */}
        {showRepetitions && repeatedWords.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-800 px-4 py-2 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2 overflow-x-auto">
            <span className="font-bold shrink-0">Repetições:</span>
            {repeatedWords.map((word, i) => (
              <span key={i} className="bg-white dark:bg-amber-900/50 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                {word}
              </span>
            ))}
          </div>
        )}

        <div className="h-14 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-serif font-medium text-slate-800 dark:text-slate-200">{activeChapterTitle}</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 transition-all duration-300">
              {isSaving ? (
                <>
                  <Save className="w-3 h-3 animate-pulse" /> {t.saving}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" /> {t.saved}
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400 transition-colors cursor-pointer">
              <Music className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleFocus} 
              className={`p-2 rounded-md transition-colors cursor-pointer ${
                focusMode ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 lg:px-24 relative">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full h-full resize-none outline-none text-lg leading-relaxed text-slate-800 dark:text-slate-200 bg-transparent placeholder-slate-300 dark:placeholder-slate-600 ${
              isAbntMode ? 'abnt-format' : 'font-serif'
            }`}
            placeholder="Sua história começa aqui..."
          />
        </div>

        <div className="h-10 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center px-6 text-[10px] text-slate-400 justify-between shrink-0">
          <div>{words} {t.words} | {chars} {t.characters} | {pages} {pages === 1 ? t.pages.slice(0, -1) : t.pages}</div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              <MessageSquare className="w-3 h-3" /> Notas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

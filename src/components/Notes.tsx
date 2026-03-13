import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { Note } from '../types';
import { Plus, Trash2, Save, Loader2, FileText, X } from 'lucide-react';

interface NotesProps {
  userId: string;
}

export function Notes({ userId }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setError(null);
    try {
      const q = query(
        collection(db, "notes"),
        where("userId", "==", userId)
      );
      
      const querySnapshot = await getDocs(q);
      const notesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          created_at: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updated_at: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
        };
      }) as Note[];
      
      // Sort in memory to avoid requiring a composite index in Firestore
      notesData.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      
      setNotes(notesData);
    } catch (error: any) {
      console.error('Error fetching notes:', error);
      if (error.code === 'permission-denied') {
        setError('Erro de permissão: Atualize as regras do Firestore no console.');
      } else if (error.code === 'failed-precondition') {
        setError('Erro de índice: Verifique o console do navegador para criar o índice necessário.');
      } else {
        setError('Erro ao carregar notas.');
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreate = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
    setIsEditing(true);
  };

  const handleSelect = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);

    try {
      const noteData = {
        title,
        content,
        updatedAt: new Date(),
      };

      if (selectedNote) {
        const noteRef = doc(db, "notes", selectedNote.id);
        await updateDoc(noteRef, noteData);
      } else {
        await addDoc(collection(db, "notes"), {
          ...noteData,
          userId,
          createdAt: new Date(),
        });
      }

      await fetchNotes();
      setIsEditing(false);
      setSelectedNote(null);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      await deleteDoc(doc(db, "notes", id));
      await fetchNotes();
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex h-full bg-slate-50 dark:bg-slate-950">
      {/* Sidebar List */}
      <div className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Notes</h2>
          <button
            onClick={handleCreate}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400 text-sm font-medium mb-2">{error}</p>
            {error.includes('permissão') && (
              <div className="mt-2">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Copie e cole estas regras no Firebase Console:</p>
                <pre className="p-2 bg-red-100 dark:bg-red-950 rounded text-[10px] font-mono text-red-800 dark:text-red-200 overflow-x-auto select-all whitespace-pre-wrap">
{`match /notes/{noteId} {
  allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
  allow read, update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
}`}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleSelect(note)}
              className={`p-3 rounded-lg cursor-pointer transition-colors group relative ${
                selectedNote?.id === note.id
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate pr-8">
                {note.title || 'Untitled'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">
                {note.content || 'No content'}
              </p>
              <span className="text-xs text-slate-400 mt-2 block">
                {note.updated_at ? new Date(note.updated_at).toLocaleDateString() : 'Just now'}
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(note.id);
                }}
                className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No notes yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-950">
        {(selectedNote || isEditing) ? (
          <>
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="text-xl font-bold bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 w-full mr-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedNote(null);
                    setIsEditing(false);
                  }}
                  className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !title.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </button>
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing..."
              className="flex-1 p-6 resize-none focus:outline-none bg-transparent text-slate-800 dark:text-slate-200 leading-relaxed"
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <FileText className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}

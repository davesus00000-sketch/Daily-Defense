import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Note } from "../types";
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Search,
  X,
  Check,
  Folder,
  Database,
  Notebook,
  NotebookPen,
} from "lucide-react";

const BASE_CATEGORIES = [
  "All",
  "Apologetics",
  "Scripture",
  "Prayer",
  "Science & Faith",
  "Church History",
  "General",
];

export const NotesView: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote, currentUser } = useApp();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Apologetics");

  // Dynamically include any custom categories present in notes
  const categories = React.useMemo(() => {
    const list = [...BASE_CATEGORIES];
    notes.forEach((n) => {
      if (n.category && !list.includes(n.category)) {
        list.push(n.category);
      }
    });
    return list;
  }, [notes]);

  const filtered = notes.filter((n) => {
    const matchSearch =
      search.trim() === "" ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "All" || n.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const openNewNote = () => {
    setEditId(null);
    setTitle("");
    setContent("");
    setCategory("Apologetics");
    setIsEditing(true);
  };

  const openEditNote = (note: Note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editId) {
      updateNote(editId, { title, content, category });
    } else {
      addNote({ title, content, category });
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-12 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ddd6] shadow-sm flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1e3a8a] flex items-center gap-2">
            <NotebookPen className="w-5 h-5 text-[#c9a84c] shrink-0" />
            <span>Note Storage & Journal</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <p className="text-xs text-gray-500">
              {notes.length} saved reflection{notes.length === 1 ? "" : "s"}
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              <Database className="w-2.5 h-2.5 text-emerald-600" />
              <span>Storage Active (Local Device {currentUser ? "+ Firestore Cloud Sync" : ""})</span>
            </span>
          </div>
        </div>

        <button
          onClick={openNewNote}
          className="self-start xs:self-auto flex items-center gap-1.5 px-3.5 py-2 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#f0d080]" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-white border border-gray-300 focus:border-[#1e3a8a] pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm outline-none transition shadow-xs"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? "bg-[#1e3a8a] text-white font-bold"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm space-y-2">
          <Folder className="w-10 h-10 text-gray-400 mx-auto opacity-50" />
          <p className="text-gray-700 font-medium text-sm">No notes found.</p>
          <p className="text-gray-500 text-xs">
            Start saving key Scripture passages, prayers, or write your own apologetics reflections!
          </p>
          <button
            onClick={openNewNote}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold"
          >
            <Plus className="w-4 h-4 text-[#f0d080]" />
            Write First Note
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((note) => (
            <div
              key={note.id}
              className="bg-white border border-[#e2ddd6] hover:border-[#1e3a8a] rounded-2xl p-4 shadow-xs hover:shadow-md transition space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#f0ebe3] text-[#1e3a8a] px-2 py-0.5 rounded">
                    {note.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-base mt-1">
                    {note.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditNote(note)}
                    className="p-1.5 text-gray-400 hover:text-[#1e3a8a] rounded hover:bg-gray-100 transition"
                    title="Edit Note"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 rounded hover:bg-rose-50 transition"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed font-sans">
                {note.content}
              </p>

              <div className="text-[11px] text-gray-400 pt-1 border-t border-gray-100">
                Created {note.createdAt}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-2xl border border-gray-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">
                {editId ? "Edit Note" : "Create New Note"}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Defense of the Real Presence"
                  className="w-full bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white p-2.5 rounded-xl text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white p-2.5 rounded-xl text-sm outline-none"
                >
                  <option value="Apologetics">Apologetics</option>
                  <option value="Scripture">Scripture</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Science & Faith">Science & Faith</option>
                  <option value="Church History">Church History</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Content / Notes
                </label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your reflection, scripture notes, or debate thoughts..."
                  className="w-full bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white p-3 rounded-xl text-sm outline-none resize-none font-sans"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 text-[#f0d080]" />
                <span>Save Note</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

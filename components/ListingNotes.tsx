'use client';

import { useState, useEffect } from 'react';
import { StickyNote, Trash2, ChevronDown } from 'lucide-react';

const STORAGE_KEY = 'sbd_listing_notes';

interface Props {
  listingId: string;
}

function getNotes(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export default function ListingNotes({ listingId }: Props) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const notes = getNotes();
    setNote(notes[listingId] ?? '');
  }, [listingId]);

  const save = () => {
    const notes = getNotes();
    if (note.trim()) {
      notes[listingId] = note.trim();
    } else {
      delete notes[listingId];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clear = () => {
    const notes = getNotes();
    delete notes[listingId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    setNote('');
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const hasNote = note.trim().length > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <StickyNote size={15} className={hasNote ? 'text-amber-500' : 'text-gray-300'} />
          <span className="text-sm font-semibold text-gray-700">Özel Notlarım</span>
          {hasNote && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
              NOT VAR
            </span>
          )}
        </div>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-50 space-y-3">
          <p className="text-xs text-gray-400">
            Bu notlar sadece sizin cihazınızda saklanır ve başkaları tarafından görülmez.
          </p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Bu ilan hakkında özel notlarınızı buraya yazın… (fiyat pazarlığı, görüntüleme tarihi, hatırlatıcılar)"
            rows={4}
            maxLength={1000}
            className="w-full px-3 py-2.5 text-sm bg-[#FFFBEB] border border-amber-100 rounded-xl resize-none focus:outline-none focus:border-amber-300 transition-colors placeholder-gray-300"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-gray-300">{note.length}/1000</span>
            <div className="flex items-center gap-2">
              {hasNote && (
                <button
                  onClick={clear}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 rounded-xl transition-colors"
                >
                  <Trash2 size={12} /> Sil
                </button>
              )}
              <button
                onClick={save}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                  saved
                    ? 'bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20'
                    : 'bg-amber-400 hover:bg-amber-500 text-white'
                }`}
              >
                {saved ? 'Kaydedildi ✓' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

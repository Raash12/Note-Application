import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import NoteCreate from './components/NoteCreate';
import NoteEdit from './components/NoteEdit';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Notes App</h1>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/notes/create" element={<NoteCreate />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/notes/edit/:id" element={<NoteEdit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
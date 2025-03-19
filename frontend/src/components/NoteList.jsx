import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/notes/').then((res) => {
      setNotes(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/notes/${id}`).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  return (
    <div>
      <Link to="/notes/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Create Note
      </Link>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="bg-white p-4 rounded shadow">
            <Link to={`/notes/${note.id}`} className="block text-lg font-semibold">
              {note.title}
            </Link>
            <p className="text-sm text-gray-600">{note.content.substring(0, 100)}...</p>
            <div className="mt-2">
              <Link to={`/notes/edit/${note.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                Edit
              </Link>
              <button onClick={() => handleDelete(note.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
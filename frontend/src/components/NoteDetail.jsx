import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/notes/${id}`).then((res) => {
      setNote(res.data);
    });
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
      <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
        Back to List
      </Link>
    </div>
  );
}

export default NoteDetail;
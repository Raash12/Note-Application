import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        setError("Failed to load the note. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded mx-auto max-w-md">
        <h4 className="font-medium mb-2">Error</h4>
        <p>{error}</p>
        <Link
          to="/"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
        >
          Back to List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{note.title}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
          {note.content}
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded inline-block"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}

export default NoteDetail;
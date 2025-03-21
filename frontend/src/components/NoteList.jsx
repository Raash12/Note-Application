import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Edit2, Trash2, FileText, Plus, List, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Button = ({ asChild, children, className, ...props }) => {
  if (asChild) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: `${child.props.className || ""} ${className}`,
      ...props,
    });
  }
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/notes/");
        setNotes(res.data);
      } catch (err) {
        setError("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/notes/${id}`);
        setNotes(notes.filter((note) => note.id !== id));
      } catch (err) {
        setError("Failed to delete note. Please try again later.");
      }
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse h-10 w-36 bg-gray-300 rounded"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="animate-pulse h-40 w-full bg-gray-300 rounded"></div>
          <div className="animate-pulse h-40 w-full bg-gray-300 rounded"></div>
          <div className="animate-pulse h-40 w-full bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded">
        <h4 className="font-medium mb-1">Error</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-900 flex items-center">
          <List className="mr-2" size={24} /> My Notes
        </h2>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/notes/create" className="flex items-center">
            <Plus className="mr-2" size={16} /> Create Note
          </Link>
        </Button>
      </div>
      <div className="flex items-center mb-4">
        <Search className="mr-2 text-indigo-600" size={20} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-indigo-300 rounded-lg p-1 w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredNotes.length === 0 ? (
            <div className="col-span-full text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No notes found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search.</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-4 transition hover:shadow-lg"
              >
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FileText className="mr-2 text-indigo-600" size={20} />
                    <Link
                      to={`/notes/${note.id}`}
                      className="text-lg font-semibold text-gray-900 hover:underline truncate"
                    >
                      {note.title}
                    </Link>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{note.content}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Link
                    to={`/notes/edit/${note.id}`}
                    className="text-indigo-500 hover:text-indigo-600"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NoteList;
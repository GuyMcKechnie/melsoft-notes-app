import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Note {
    id: string;
    title: string;
    content: string;
    created_at: string;
}

const Dashboard = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const navigate = useNavigate();

    const fetchNotes = useCallback(async () => {
        try {
            const response = await fetch("/api/notes", {
                headers: {
                    "Content-Type": "application/json",
                },
                // Include credentials to send cookies
                credentials: "include",
            });

            if (response.status === 401) {
                navigate("/login");
                return;
            }

            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }, [navigate]);

    useEffect(() => {
        Promise.resolve().then(fetchNotes); // this defer on fetchNotes is to avoid useEffect sync issue
    }, [fetchNotes]);

    const handleCreateNote = async () => {
        if (!title || !content) return;

        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                setTitle("");
                setContent("");
                fetchNotes();
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    const handleUpdateNote = async () => {
        if (!editingNote || !title || !content) return;

        try {
            const response = await fetch(`/api/notes/${editingNote.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                setEditingNote(null);
                setTitle("");
                setContent("");
                fetchNotes();
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    const handleDeleteNote = async (id: string) => {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (response.ok) {
                fetchNotes();
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const startEditing = (note: Note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    const cancelEditing = () => {
        setEditingNote(null);
        setTitle("");
        setContent("");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Notes
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-bold text-gray-700">
                        {editingNote ? "Edit Note" : "Create New Note"}
                    </h2>
                    <input
                        className="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Write your note here..."
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className="flex space-x-2">
                        <button
                            onClick={
                                editingNote
                                    ? handleUpdateNote
                                    : handleCreateNote
                            }
                            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                        >
                            {editingNote ? "Update Note" : "Add Note"}
                        </button>
                        {editingNote && (
                            <button
                                onClick={cancelEditing}
                                className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="rounded-lg bg-white p-6 shadow-md"
                        >
                            <h3 className="mb-2 text-lg font-bold text-gray-800">
                                {note.title}
                            </h3>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {note.content}
                            </p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => startEditing(note)}
                                    className="text-sm text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="text-sm text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

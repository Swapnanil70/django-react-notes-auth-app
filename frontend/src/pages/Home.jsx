import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState(""); 

    // study use effect later
    useEffect(() => {
        getNotes();
    }, []);

    // Ei .then() function ta ki study about it later
    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => setNotes(data))
        .catch((error) => alert(error));
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if(res.status === 204) {
                alert("Note deleted successfully");
            }
            else {
                alert("An error occurred while deleting note. Please try again later.");
            }
            getNotes(); // Update the notes list after deleting a note
            // Un ethical practice, we should use the response from the delete request and remove from list
        })
        .catch((error) => alert(error));
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/create/", {
            content,
            title
        }).then((res) => {
            if(res.status === 201) {
                alert("Note created successfully");
            }
            else {
                alert("An error occurred while creating note. Please try again later.");
            }
            getNotes(); // Update the notes list after creating a note
        }).catch((error) => alert(error));
    }

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create Note</h2>
            {/* When we submit the form it is gonna call the submit note */}
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input 
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />   
                <label htmlFor="content">Content:</label>
                <br />
                <textarea 
                    id="content"
                    name="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
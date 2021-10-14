import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    // const host = 'http://localhost:5000';
    const host = 'https://inotebook05.herokuapp.com';
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NzE5MTMzMDBkZjczYjMzNTJhNmZkIn0sImlhdCI6MTYzMzIwMzcwMH0.o98tACBFuOCXYRGjVdZnFPVm3rbcXoqrQKprBcBU-cw'
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    // ADD a Note
    const addNote = async (title, description, tag) => {
        // TODO: API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NzE5MTMzMDBkZjczYjMzNTJhNmZkIn0sImlhdCI6MTYzMzIwMzcwMH0.o98tACBFuOCXYRGjVdZnFPVm3rbcXoqrQKprBcBU-cw'
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // DELETE a Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NzE5MTMzMDBkZjczYjMzNTJhNmZkIn0sImlhdCI6MTYzMzIwMzcwMH0.o98tACBFuOCXYRGjVdZnFPVm3rbcXoqrQKprBcBU-cw'
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);

        console.log("Deleted note with id :" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NzE5MTMzMDBkZjczYjMzNTJhNmZkIn0sImlhdCI6MTYzMzIwMzcwMH0.o98tACBFuOCXYRGjVdZnFPVm3rbcXoqrQKprBcBU-cw'
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let idx = 0; idx < newNotes.length; idx++) {
            const element = notes[idx];
            if (element._id === id) {
                newNotes[idx].tag = tag;
                newNotes[idx].title = title;
                newNotes[idx].description = description;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
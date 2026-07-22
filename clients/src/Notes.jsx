import React from 'react'
import { useState ,useEffect } from 'react'
import './App.css'
const Notes = () => {
    const [notes, setNotes] = useState([]);
        
        const [title, setTitle] = useState('');
        const [body, setBody] = useState('');
      
        const [editId, setEditId] = useState('');
      
        const [loading, setLoading] = useState(false);
        
        const [error, setError] = useState(null);
        
        useEffect(() => {
          getallnotes();
        }, []);
      
        async function getallnotes() {
          setLoading(true);
          setError(null);
      
          try {
            const token = localStorage.getItem("token");

          const url = 'http://localhost:5000/notes';
          const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',  "auth-token": token },
          });
           
            const data = await response.json();
            setNotes(data);
          } 
            catch (err) {
            setError(err.message || 'Failed to load notes');
            setNotes([]);
          } finally {
            setLoading(false);
          }
        }
      //to add new user
      const CreateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
      
        if (!title || !body) {
          setError('Please fill in both title and body fields.');
          setLoading(false);
          return;
        }
      
        try {
          const token = localStorage.getItem("token");

          const url = 'http://localhost:5000/notes';
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  "auth-token": token, },
            body: JSON.stringify({ title, body }),
          });
          const data = await res.json();
          alert('New note added');
          setTitle('');
          setBody('');
          await getallnotes();
        } 
          catch (err) {
          setError(err.message || 'Failed to create note');
        } 
          finally {
          setLoading(false);
        }
      };
      const UpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
      
        try {
          const url = `http://localhost:5000/notes/${editId}`;
          const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body }),
          });
          const data = await res.json();
          alert('Note updated');
          setTitle('');
          setBody('');
          setEditId('');
          await getallnotes();
        } 
          catch (err) {
          setError(err.message || 'Failed to update note');
        } 
          finally {
          setLoading(false);
        }
      };
      const DeleteNote = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this note?');
        if (!confirmDelete) {
          return; // Exit the function if the user cancels the deletion
        }
      
        setLoading(true);
        setError(null);
      
        try {
          const url = `http://localhost:5000/notes/${id}`;
          const res = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          alert('Note deleted');
          setTitle('');
          setBody('');
          setEditId('');
          await getallnotes();
        } catch (err) {
          setError(err.message || 'Failed to delete note');
        } finally {
          setLoading(false);
        }
      };

        return (
          <div className='container'>
            <h1 className='head'>My Notes</h1>
      
            {loading && <p className='status-message'>Loading...</p>}
            {error && <p className='status-message error'>{error}</p>}
      
            <table className='notes-table'>
              <thead>
                <tr className='user'>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {notes.length > 0 ? (
                  notes.map((note) => (
                    <tr className='user' key={note._id}>
                      <td>{note.title}</td>
                      <td>{note.body}</td>
                      <td>
                        <button className='edit-btn'
                          onClick={() => {
                            setEditId(note._id)
                            setTitle(note.title)
                            setBody(note.body)
                          }}
                        >
                          Edit
                        </button>
                        <button  className = "delete-btn" onClick={() => DeleteNote(note._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  !loading && (
                    <tr>
                      <td colSpan='3'>No notes available.</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <br />
            <div>
              <h1 className='head1'>{editId ? 'Edit Note' : 'Add New Note'}</h1>
              <form style={{ textAlign: 'center' }} onSubmit={editId ? UpdateUser : CreateUser}>
                <input
                  className='newnote'
                  type='text'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder='Enter Title'
                />
                <br />
                <input
                  className='newnote'
                  type='text'
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder='Enter Body'
                />
                <br />
                <button className="newnote" type="submit">
                 {editId ? "Update Note" : "Add Note"}
                </button>
              </form>
            </div>
          </div>
        )
}
export default Notes

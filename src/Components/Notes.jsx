import React, {useContext, useState, useEffect, useRef } from "react";
import {NoteContext} from '../Context/notes/Context'
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom'
import { isExpired } from "react-jwt";

const Notes = (props) => {

    const context = useContext(NoteContext);
    let navigate = useNavigate();
    const {notes, getAllNotes, editNote} = context;  // same as context.notes used downside

    const inputClick = useRef(null);  //ref
    const refClose = useRef(null);  //ref
    
    const [note, setNote] = useState({id: "", mtitle: "" ,mdescription: "", mtag: ""})

    useEffect(() => {
      if(localStorage.getItem('token')) {

        const isMyTokenExpired = isExpired(localStorage.getItem('token'));

        if(isMyTokenExpired) {
          navigate('/login')
        } else {
          getAllNotes();
        }
      } else {
        navigate('/login')
      }
    }, [])

    const updateNote = (currentNote) => {
      inputClick.current.click();  // while using ref we have to use current (refer useref docs)
      //we have to do this as current note is passing title tag and description without m.
      setNote({id: currentNote._id, mtitle: currentNote.title, mdescription: currentNote.description, mtag: currentNote.tag});

    }

    const handleOnClick = (e) => {
      refClose.current.click();
      editNote(note.id, note.mtitle, note.mdescription, note.mtag);
      props.showAlert("Updated successfully", "success");
    }
    const onChange = (e) => {
      // we are setting value of note using target.name(attribute name in input) we are extracting what user has typed
      setNote({...note, [e.target.name]: e.target.value})
    }


  return (
    <>
    <AddNote showAlert={props.showAlert}/>

    <button type="button" className="btn btn-primary d-none" ref={inputClick} data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>

    {/* Form for adding data in modal for updating data */}
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form className="my-3">
          <div className="mb-3">
            <label htmlFor="mtitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="mtitle"
              name="mtitle"
              value={note.mtitle}
              aria-describedby="emailHelp"
              placeholder="Enter a suitable title here"
              autoComplete="off"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mtag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="mtag"
              name="mtag"
              value={note.mtag}
              aria-describedby="emailHelp"
              placeholder="Enter a tag for your note"
              autoComplete="off"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mdescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="mdescription"
              name="mdescription"
              value={note.mdescription}
              placeholder="Describe your note"
              autoComplete="off"
              onChange={onChange}
            />
          </div>
        </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" ref={refClose} data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>

    <div className="row my-3">
    <h1>Your Notes</h1>
    <div className="container mx-2">
      {notes.length===0 && <p>No notes to display</p>}
    </div>
    {notes.map((note)=> {
      return(
        <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>  //update note is passed with current note from NoteItem
      )
    })}
    </div>
    </>
  )
}

export default Notes
import React, {useContext} from "react";
import {NoteContext} from '../Context/notes/Context'
import { useState } from "react";

const addNote = (props) => {

  const context = useContext(NoteContext);
  const { addNote } = context;  // same as context.addNote used downside

  const [note, setNote] = useState({title: "" ,description: "", tag: ""})

  const handleOnClick = (e) => {
    e.preventDefault(); //to prevent refresh of website
    addNote(note);
    props.showAlert("Added successfully", "success")
    setNote({title: "" ,description: "", tag: ""});
  }
  const onChange = (e) => {
    // we are setting value of note using target.name(attribute name in input) we are extracting what user has typed
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
        <div className="container my-3">
        <h1>Add a note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              placeholder="Enter a suitable title here"
              autoComplete="on"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              aria-describedby="emailHelp"
              placeholder="Enter a tag for your note"
              autoComplete="on"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              placeholder="Describe your note"
              autoComplete="on"
              onChange={onChange}
            />
          </div>
          <button type="submit" onClick={handleOnClick} className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default addNote
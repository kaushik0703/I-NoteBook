import React, {useContext} from "react";
import {NoteContext} from '../Context/notes/Context'

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(NoteContext);
  const {deleteNote} = context;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
          <p className="card-text">
            {note.description}
          </p>
          <div className="d-flex justify-content-between">
          <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
          <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully", "success");}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

import { createContext, useState } from "react";

export const NoteContext = createContext();

// or export default noteContext here if single file

//in place of {children} we can write props in between children -> props.children
const NoteState = (props) => {
  const host = "http://localhost:3000";

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial); //or directly put s1 in bracket
    
    // const update = () => {
    //   setTimeout(() => {
    //     setState({
    //       "name": "kartik",
    //       "class": "2b"
    //     })
    //   }, 5000);
    // }

    // Get all Notes
    const getAllNotes = async() => {

      //API call to fetch notes
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        }
        
      });
      const json = await response.json();
      setNotes(json);
      // console.log(json[0].tag);
      // console.log(json);
    }

    // Add a Note
    const addNote = async(newNote) => {
      const {title, description, tag} = newNote;

      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}) //what we are sending to body
      });
      const note = await response.json();
      setNotes(notes.concat(note));

      // // console.log("adding a new note");
      // const note = {
      //   "_id": "648d4f711cc91",
      //   "user": "647ddba61cfc09e05521a408",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2023-06-08T09:20:15.529Z",
      //   "__v": 0
      // };
    }

    // Delete a Note
    const deleteNote = async(id) => {

      //API Call
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        }
      });
      const json = await response.json();
      // console.log(json);

      // console.log("deleting note with id: " + id);
      const newNotes = notes.filter(note=>note._id !== id) //notes.filter((note)=>{return note._id !== id}) another way
      setNotes(newNotes);
    }

    // Update a Note
    const editNote = async (id, title, description, tag) => {
      
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      // console.log(json);

      const newNote = JSON.parse(JSON.stringify(notes)); //parse creates a deep copy(immediate copy)

      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if(element._id === id) {
          newNote[index].title = title;
          newNote[index].description = description;
          newNote[index].tag = tag;
          break;
        }
      }
      setNotes(newNote); //to change the notes array finally
    }

  return (

    //when more than 1 values are there use two curly brackets downside
    //made an object where value of state is state and value of update is update
    // {state, update} == {state: state, update: update}
    <NoteContext.Provider value ={{notes, addNote, deleteNote, editNote, getAllNotes}}> 
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
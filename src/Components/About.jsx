import React, { useContext, useEffect } from 'react'
//as NoteContext is not a default export
import {NoteContext} from '../Context/notes/Context'

const About = () => {
  // const a = useContext(NoteContext);
  //using like component did mount
  // useEffect(() => {
  //   a.update()
  // }, [])

  return (
    <>
    {/* we can't write a.name as from context we are sending json object containing state: state and update: update */}
    {/* <div>This is About {a.state.name}.</div>
    <div>A Student of  {a.state.class}.</div> */}
    </>
  )
}

export default About
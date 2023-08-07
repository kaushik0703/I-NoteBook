import { useState } from "react"; // not default export so (need of destructuring)
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import LoadingBar from "react-top-loading-bar";
import NoteState from "./Context/notes/Context"; //default export (no need of destructuring)
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  const [progress, setProgress] = useState(100);
  const [alert, setAlert] = useState(null)

  //As previously alert was null so we have to get a function to make alert a object
  const showAlert = (message, type)=> {
    setAlert({
      msg : message,
      type : type
    })
    
    //this will setAlert to null after 1 sec
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <LoadingBar color="#f11946" progress={progress} />

          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
          </div>

        </Router>
      </NoteState>
    </>
  );
}

export default App;

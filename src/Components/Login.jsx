import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({email: "", password: ""})

  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
                            //as we have to send email and password through body
    })
    const json = await response.json();
    console.log(json);
    if(json.success) {
      //save auth token and redirect
      localStorage.setItem('token', json.authToken); //now we can use this to login
      props.showAlert("Logged in successfully", "success")
      navigate('/')
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials , [e.target.name]: e.target.value}) //object therefore '{}'used
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className='my-2'> Login to continue to I-Notebook</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" autoComplete='on'/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name='password' autoComplete='on'/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Login
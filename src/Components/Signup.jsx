import React, {useState} from 'react'
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})

  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
                            //as we have to send email and password through body
    })
    const json = await response.json();
    console.log(json);
    if(json.success) {
      //save auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/')
      props.showAlert("Account created successfully", "success")
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials , [e.target.name]: e.target.value}) //object therefore '{}'used
  }

  return (
    <div>
    <section className="vh-100" style={{background: 'white'}}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{borderRadius: 25}}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-2">Create an account to use I-Notebook</p>

                    <form className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="name" name='name' onChange={onChange} className="form-control" />
                          <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="email" name='email' onChange={onChange} className="form-control" />
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="password" name='password' onChange={onChange} className="form-control" minLength={5} required autoComplete='off' />
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="cpassword" name="cpassword" onChange={onChange} className="form-control" minLength={5} required autoComplete='off' />
                          <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Signup</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Signup
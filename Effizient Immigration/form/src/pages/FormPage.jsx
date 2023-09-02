import React, { useState } from "react";
import "./formPage.css";
import axios from "axios";
import "./formPage.css";

const FormPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [textArea, setTextArea] = useState("");

  const handleSubmit = () => {
    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      company: company,
      jobTitle: jobTitle,
      textArea: textArea
    };

    // send post request to backend
    axios.post("http://localhost:8000/register", user).then((resp) => {
      console.log(resp);
      alert("Details Sent To Your Email Successfully",)

      setEmail("");
    setFirstName("")
    setLastName("")
    setCompany("")
    setJobTitle("")
    setTextArea("")
    }).catch((err) => {
      alert("Details Already Sent To The Email",);
      console.log(err)
    })

    

    

  }

  return (

    <form onSubmit={handleSubmit}>
      <div className="form__container">
        <div className="form__heading">
          <h1>Fill up this Form!</h1>
          <p>
            Once you fill up this form, you will get an email with all the
            answers that you enter in these fields.
          </p>
        </div>

        <div className="form__input_fields1">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Your Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          </div>
          

          <div className="form__input_names">
            <div className="form_common">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              placeholder="Your First Name"
              onChange={(event) => setFirstName(event.target.value)}
            />
            </div>
            <div className="form_common">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              placeholder="Your Last Name"
              onChange={(event) => setLastName(event.target.value)}
            />
            </div>
          </div>

          <div className="form__input_names">
            <div className="form_common">
            <label>Company Name</label>
            <input
              type="text"
              value={company}
              placeholder="Your Company Name"
              onChange={(event) => setCompany(event.target.value)}
            />
            </div>

            <div className="form_common">

            <label>Job Title</label>
            <input
              type="text"
              value={jobTitle}
              placeholder="Your Job Title"
              onChange={(event) => setJobTitle(event.target.value)}
            />
            </div>
          </div>

          <div className="form__textArea">
            
            <label>Tell us something about yourself</label><br />
              <textarea
                value={textArea}
                onChange={(event) => setTextArea(event.target.value)}
                placeholder="Your Answer"
              />
              
              
            
          </div>

          <button>Submit</button>
        
      </div>
    </form>
  );
};

export default FormPage;

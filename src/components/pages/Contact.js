import React, { useState } from "react";

// Here we import a helper function that will check if the email is valid
import {
  validateEmail,
  validateContactName,
  validateMessage,
} from "../../utils/helpers";

function Contact() {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === "email") {
      setEmail(inputValue);
    } else if (inputType === "contactName") {
      setContactName(inputValue);
    } else {
      setMessage(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!validateEmail(email)) {
      setErrorMessage("Email or username is invalid");
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
    }
    // Then we check to see if the contact name is not valid. If so, we set an error message regarding the password.
    if (!validateContactName(contactName)) {
      setErrorMessage(`Please enter a valid name`);
      return;
    }

    if (!validateMessage(message)) {
      setErrorMessage(`Please enter a message`);
      return;
    }

    alert(`Hello ${contactName}`);

    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setContactName("");
    setMessage("");
    setEmail("");
  };

  return (
    <div className="contact">
        <h3 className="title">Hello {contactName}</h3>
        <form className="form">
            <input
              value={email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
            />
            <input
              value={contactName}
              name="contactName"
              onChange={handleInputChange}
              type="text"
              placeholder="Name"
            />
            <textarea
              value={message}
              name="message"
              onChange={handleInputChange}
              type="text"
              placeholder="Message"
            >
              {" "}
              {message}{" "}
            </textarea>
            <button type="button" onClick={handleFormSubmit}>
              Submit
            </button>        
            </form>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
    </div>
  );
}

export default Contact;
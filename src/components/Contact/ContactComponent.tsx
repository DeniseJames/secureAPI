import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../../aws-exports';
import { createContact} from '../../graphql/mutations';

Amplify.configure(config);
const client = generateClient();

const ContactComponent: React.FC = () => {
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const setInput = (key: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log('Submitting input:', formState);
  
      const result = await client.graphql({
        query: createContact,
        variables: {
          input: {
            email: formState.email,
            name: formState.name,
            comment: formState.comment,
          },
        },
      });
  
      console.log('Mutation result:', result);
  
      setFormState({ email: '', name: '', comment: '' });
      setSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.errors) {
        error.errors.forEach((err: any) => console.error(err.message));
      }
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      {submitted ? (
        <div className="alert alert-success">Thank you for contacting us!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formState.email}
              onChange={(e) => setInput('email', e.target.value)}
              placeholder="Enter email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formState.name}
              onChange={(e) => setInput('name', e.target.value)}
              placeholder="Enter name"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              rows={3}
              value={formState.comment}
              onChange={(e) => setInput('comment', e.target.value)}
              placeholder="Enter comment"
              className="form-control"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: 'darkblue', color: 'white' }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactComponent;

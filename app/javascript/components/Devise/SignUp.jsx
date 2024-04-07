import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users', { user: formData });
      // Handle success, e.g., redirect or show success message
    } catch (error) {
      // Handle error, e.g., display error message
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formData.email} onChange={handleChange} />
      <input type="password" name="password" value={formData.password} onChange={handleChange} />
      <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;

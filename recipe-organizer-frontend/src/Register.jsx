import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!, $password_confirmation: String!) {
    register(input: {
      name: $name,
      email: $email,
      password: $password,
      password_confirmation: $password_confirmation
    }) {
      id
      name
      email
    }
  }
`;

const RegisterComponent = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [registerMutation] = useMutation(REGISTER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerMutation({
        variables: { name, email, password, passwordConfirmation },
      });

      onRegister(data.register);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterComponent;

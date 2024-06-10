import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
mutation Register(
  $name: String!,
  $email: String!,
  $password: String!,
  $password_confirmation: String!
) {
  register(
    input: {
      name: $name,
      email: $email,
      password: $password,
      password_confirmation: $password_confirmation
    }
  ) {
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
        variables: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation, 
        },
      });

      if (data.register) {
        const { token, user } = data.register;

        console.log('user registered succesfully', user);

        window.location.href = '/login';


        // Handle further actions, such as redirecting to a protected route
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
<div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold m-5 text-blue-500">Recipe Organizer</h1>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
          Confirm Password:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
          />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
          Register
        </button>
      </div>
        <p>Already a user? <b><a href="/login" className='text-blue-500'>Login</a></b> here</p>
    </form>
  </div>
          </>
  );
};

export default RegisterComponent;

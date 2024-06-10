import React from 'react';
import SearchBar from './SearchBar'
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


export const LOGOUT_MUTATION = gql`
mutation Logout {
    logout
  }
`;

const NavBar = ({ onSearch }) => {
    const navigate = useNavigate();
    const userToken = localStorage.getItem('token'); // Get the user's token from local storage
    
    const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
        context: {
            headers: {
                Authorization: userToken ? `Bearer ${userToken}` : '', // Include the bearer token in the header
            },
        },
  });

  
  const handleLogout = async () => {
        try {
            const { data } = await logoutMutation();
            const logoutSuccess = data?.logout;

            if (logoutSuccess) {
                // Perform any additional actions after successful logout, e.g., redirect or update local state
                console.log('Logout successful!');
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                window.location.href="/login";

            } else {
                console.error('Logout failed.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <a
                    className="ml-2 text-4xl font-bold mb-2 text-neutral-800 dark:text-neutral-200"
                    href="/"
                >
                    Recipe Org
                </a>
                <SearchBar onSearch={onSearch} />

                {/* Additional Modifications */}
                <div className="flex items-center">
                    {/* <a
            className="text-sm ml-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-400"
            href="#"
          >
            My Recipes
          </a> */}
            {userToken ?
                    <a
                        className="text-sm ml-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-400"
                        href="/userrecipes"
                    >
                        My Recipe's
                    </a>
                    : "" }
            {userToken ?
                    <a
                        className="text-sm ml-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-400"
                        href="/recipeform"
                    >
                        Add Recipe
                    </a>
                    : "" }
                    {userToken ?
                    <button className="text-sm ml-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-400" onClick={handleLogout}>
                        Sign out
                    </button>
                    : ""
                }
                </div>
                {/* End Additional Modifications */}

            </div>
        </nav>
    );
};

export default NavBar;

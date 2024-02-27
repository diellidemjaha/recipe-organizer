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
                {/* <div className="ml-5 flex w-[30%] items-center justify-between">
          <input
            type="search"
            className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />

          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div> */}



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

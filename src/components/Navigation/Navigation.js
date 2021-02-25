import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  console.log(isSignedIn);
  if (isSignedIn) {
    return (
      <nav className="flex justify-end">
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => {
            onRouteChange('signout');
          }}
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <>
        <nav className="flex justify-end">
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => {
              onRouteChange('home');
            }}
          >
            Sign in
          </p>
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => {
              onRouteChange('register');
            }}
          >
            Register
          </p>
        </nav>
      </>
    );
  }
};

export default Navigation;

'use client'; // Add this directive to make it a client component

import Link from 'next/link';
import React, { useState } from 'react';
import Modal from './Modal'; // Ensure this path is correct based on your file structure

const Navbar = () => {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);

  const openSignUp = () => setSignUpOpen(true);
  const closeSignUp = () => setSignUpOpen(false);

  const openSignIn = () => setSignInOpen(true);
  const closeSignIn = () => setSignInOpen(false);

  return (
    <nav className="border-b h-[8vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl">Collaborative List</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-5">
        <button
          onClick={openSignUp}
          className="text-xl text-green-600 hover:text-green-900 mr-4" // Added margin-right
        >
          SignUp
        </button>
        <button
          onClick={openSignIn}
          className="text-xl text-purple-600 hover:text-purple-900"
        >
          SignIn
        </button>
      </div>

      {isSignUpOpen && <Modal closeModal={closeSignUp} type="signup" />}
      {isSignInOpen && <Modal closeModal={closeSignIn} type="signin" />}
    </nav>
  );
};

export default Navbar;

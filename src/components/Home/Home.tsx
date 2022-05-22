import React from 'react';
import { Link } from "react-router-dom";

export const Home = () => (
      <>
        <nav>
            <Link to="/about">Game rules</Link>
            <p/>
            <Link to="/game">Game</Link>
        </nav>
        <main>
            <h3>Project description</h3>
            <p>
                text
            </p>
        </main>
      </>
);
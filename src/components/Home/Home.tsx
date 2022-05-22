import React from 'react';
import { Link } from "react-router-dom";

export const Home = () => (
      <>
        <nav>
            <Link to="/about">Правила игры</Link>
            <p/>
            <Link to="/game">Игра</Link>
        </nav>
        <main>
            <h3>Описание проекта</h3>
            <p>
                text
            </p>
        </main>
      </>
);
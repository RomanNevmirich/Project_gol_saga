import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, HashRouter } from "react-router-dom";
import { Home } from './components/Home';
import { About } from './components/About';
import { Main } from './components/Main';

export const App = () => (
    <React.StrictMode>
        <HashRouter>
            <div className="App">
                <h2>Проект OTUS: реализация игры Game of Life</h2>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="game" element={<Main />} />
                </Routes>
            </div>
        </HashRouter>
    </React.StrictMode>
);

const rootElement: HTMLElement = document.getElementById('root') ?? document.createElement('');
const root = createRoot(rootElement);

export function render() {
    root.render(<App/>);
}
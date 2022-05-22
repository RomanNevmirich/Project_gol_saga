import React from 'react';
import { Link } from "react-router-dom";

export const About = () => (
    <>
        <nav>
            <Link to="/">Home</Link>
        </nav>
        <main>
            <h3>Правила</h3>
            <p>Место действия игры — размеченная на клетки плоскость, которая может быть безграничной, ограниченной, или замкнутой.</p>
            <p>Каждая клетка на этой поверхности имеет восемь соседей, окружающих её, и может находиться в двух состояниях: быть «живой» (заполненной) или «мёртвой» (пустой).</p>
            <p>
                Распределение живых клеток в начале игры называется первым поколением. Каждое следующее поколение рассчитывается на основе предыдущего по таким правилам:
                в пустой (мёртвой) клетке, с которой соседствуют три живые клетки, зарождается жизнь;
                если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае (если живых соседей меньше двух или больше трёх) клетка умирает («от одиночества» или «от перенаселённости»).
            </p>
            <p>
                Игра прекращается, если
                на поле не останется ни одной «живой» клетки;
                конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
                при очередном шаге ни одна из клеток не меняет своего состояния (предыдущее правило действует на один шаг назад, складывается стабильная конфигурация)
            </p>
            <p>Игрок не принимает активного участия в игре. Он лишь расставляет или генерирует начальную конфигурацию «живых» клеток, которые затем изменяются согласно правилам. Несмотря на простоту правил, в игре может возникать огромное разнообразие форм.</p>
        </main>
</>
);
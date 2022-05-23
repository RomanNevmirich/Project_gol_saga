import React from 'react';
import Link from 'next/link';

const Header = () => (
  <div>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link href="/Main">
          <a>Game</a>
        </Link>
      </li>
    </ul>
  </div>
);

export default Header;
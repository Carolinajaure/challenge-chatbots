import React from 'react';

function Header() {
  return (
    <header>
      <h1>SAKURA SUSHI BAR</h1>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Federo&display=swap');
        header {
          text-align: center;
          background-color: rgb(36, 35, 34); 
          color: #fffef8;
          padding: 1rem;
          height: 60px;
        }
        h1 {
          margin: 0;
          line-height: 60px;
          font-family: 'Federo', sans-serif;
        }
      `}</style>
    </header>
  );
}

export default Header;
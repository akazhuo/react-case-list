import { useState, useRef } from 'react';

import './App.css';

function App() {
  const [scrollTop, setScrollTop] = useState(0);
  const [activeLetter, setActiveLetter] = useState('A');
  const upperCases = Array.from({ length: 26 }).map((_, i) =>
    String.fromCharCode(65 + i)
  );
  const scrollListRef = useRef();
  function clickLetter(letter) {
    setActiveLetter(letter);
    const dom = document.getElementById('block-' + letter);
    setScrollTop(dom.offsetTop);

    scrollListRef.current.scrollTop = dom.offsetTop + 20;
  }

  return (
    <>
      <div className="content-list" ref={scrollListRef}>
        {upperCases.map((upperCase, index) => (
          <div id={'block-' + upperCase} key={'block-' + index}>
            <div className="block_header">{upperCase}</div>
            <div className="block_content"></div>
          </div>
        ))}
      </div>
      <div className="letter-list">
        {upperCases.map((letter, index) => (
          <div
            id={'letter-' + letter}
            className={
              'letter-item ' + (activeLetter === letter ? 'active' : '')
            }
            onClick={() => clickLetter(letter)}
            key={'letter-' + index}
          >
            {letter}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

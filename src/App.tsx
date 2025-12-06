import { useState, useRef, useEffect } from 'react';

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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry.intersectionRatio);
        console.log(entry.target.innerText);
        // if (entry.intersectionRatio === 1) {
        //   console.log(entry.target.innerText);
        // }
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
      });
    },
    {
      root: document.getElementById('content-list'),
      rootMargin: '0px',
      scrollMargin: '0px',
      threshold: [0.25, 0.5, 1],
    }
  );
  document.querySelectorAll('.list-item').forEach((item) => {
    if (item) {
      observer.observe(item);
    }
  });

  return (
    <>
      <div className="content-list" id="content-list" ref={scrollListRef}>
        {upperCases.map((upperCase, index) => (
          <div
            id={'block-' + upperCase}
            className="list-item"
            key={'block-' + index}
          >
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

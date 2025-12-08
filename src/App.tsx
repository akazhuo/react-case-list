import { useState, useRef, useEffect } from 'react';
import BezierEasing from 'bezier-easing';

import './App.css';

function App() {
  const [activeLetter, setActiveLetter] = useState('A');
  // const [isScrolling, setIsScrolling] = useState(false);
  const isScrolling = useRef(false);
  const upperCases = Array.from({ length: 26 }).map((_, i) =>
    String.fromCharCode(65 + i)
  );
  const scrollListRef = useRef();
  const easeInOut = BezierEasing(0.42, 0, 0.58, 1);
  function clickLetter(letter) {
    setActiveLetter(letter);
    isScrolling.current = true;
    const dom = document.getElementById('block-' + letter);
    const startValue = scrollListRef.current.scrollTop;
    const endValue = dom.offsetTop - 20;
    const range = endValue - startValue;
    const scrollPromises = [];

    // 模拟滚动过程：t 从 0 → 1
    for (let i = 0; i <= 100; i++) {
      const t = i / 100; // 当前进度 0.0, 0.1, ..., 1.0
      const progress = easeInOut(t); // 贝塞尔映射后的进度 [0,1]
      const currentValue = startValue + progress * range;
      scrollPromises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            scrollListRef.current.scrollTop = currentValue.toFixed(2);
            console.log('resolve');
            resolve();
          }, 300 * progress);
        })
      );
    }
    console.log('isScrolling:' + isScrolling);
    Promise.all(scrollPromises).then(() => {
      console.log('test');
      isScrolling.current = false;
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!isScrolling.current && entry.intersectionRatio === 1) {
          setActiveLetter(entry.target.innerText);
        }
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
      threshold: 1,
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

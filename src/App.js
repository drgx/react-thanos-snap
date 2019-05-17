import React, { useRef, useState, createRef } from 'react';

import spiderman from './asset/purepng.webp';
import html2canvas from 'html2canvas';
import Chance from 'chance';
import posed from 'react-pose';
const chance = new Chance();

const canvasCount = 30;
const imageDataArray = [];

const Dust = posed.canvas({
  visible: { opacity: 1, transition: '0.5s', filter: `blur(0px)` },
  hidden: {
    opacity: 0,
    y: (props) => props.y,
    x: (props) => props.x,
    rotate: (props) => props.rotate,
    transition: { duration: 2000 },
    filter: `blur(2px)`,
  },
});
const CanvasContainer = posed.div({
  hidden: { delayChildren: 200, staggerChildren: 35, filter: `blur(1px)` },
});

const OriginalElement = posed.img({
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    transition: { duration: 100 },
    filter: `blur(1px)`,
  },
});

function createBlankImageData(imageData) {
  for (let i = 0; i < canvasCount; i++) {
    let arr = new Uint8ClampedArray(imageData.data);
    for (let j = 0; j < arr.length; j++) {
      arr[j] = 0;
    }
    imageDataArray.push(arr);
  }
}

function weightedRandomDistrib(peak) {
  var prob = [],
    seq = [];
  for (let i = 0; i < canvasCount; i++) {
    prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
    seq.push(i);
  }
  return chance.weighted(seq, prob);
}

function handleSnap(imgRef, particleRefs, setState, state) {
  if (state === 'hidden') {
    setState('visible');
    return;
  }
  html2canvas(imgRef.current, { scale: 1 }).then((canvas) => {
    const w = canvas.width;
    const h = canvas.height;
    // targetRef.current.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, w, h);
    var pixelArr = data.data;
    createBlankImageData(data);

    for (let i = 0; i <= pixelArr.length; i += 4) {
      //find the highest probability canvas the pixel should be in
      let p = Math.floor((i / pixelArr.length) * canvasCount);
      let a = imageDataArray[weightedRandomDistrib(p)];
      a[i] = pixelArr[i];
      a[i + 1] = pixelArr[i + 1];
      a[i + 2] = pixelArr[i + 2];
      a[i + 3] = pixelArr[i + 3];
    }

    particleRefs.current.map((ref, idx) => {
      const ctx2 = ref.current.getContext('2d');
      ref.current.width = w;
      ref.current.height = h;
      ctx2.putImageData(new ImageData(imageDataArray[idx], w, h), 0, 0);
    });
  });
  setTimeout(() => {
    setState('hidden');
  }, 1000);
}

function generateBlankCanvas(refs, state, srcRef) {
  const canvases = [];
  console.log(refs);

  for (let a = 0; a < canvasCount; a++) {
    const canvasStyle = {
      position: 'fixed',
      top: 200,
      left: 10,
    };

    canvases.push(
      <Dust
        ref={refs.current[a]}
        key={a}
        style={canvasStyle}
        pose={state}
        x={150}
        y={-150}
        rotate={chance.integer({ min: -20, max: 20 })}
      />
    );
  }
  return canvases;
}

function App() {
  const imgRef = useRef();
  const [state, setState] = useState('visible');
  const particleRefs = useRef([...Array(canvasCount)].map(() => createRef()));

  const canvases = generateBlankCanvas(particleRefs, state, imgRef);

  return (
    <div className="App">
      <OriginalElement
        pose={state}
        src={spiderman}
        width={'250px'}
        ref={imgRef}
        style={{ position: 'fixed', top: 200, left: 10, zIndex: 1 }}
      />
      <button onClick={() => handleSnap(imgRef, particleRefs, setState, state)}> Snap</button>
      <CanvasContainer pose={state}>{canvases}</CanvasContainer>
    </div>
  );
}

export default App;

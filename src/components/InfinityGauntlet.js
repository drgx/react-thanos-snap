import React, { useRef, useState, createRef } from 'react';

import spiderman from './asset/purepng.webp';
import html2canvas from 'html2canvas';

import posed from 'react-pose';
import { weightedRandomDistrib, createBlankImageData, generateBlankCanvas } from '../helper/Util';

const canvasCount = 30;
let imageDataArray = [];

const CanvasContainer = posed.div({
  hidden: { delayChildren: 200, staggerChildren: 35, filter: `blur(1px)` },
});

const OriginalElement = posed.div({
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    transition: { duration: 100 },
    filter: `blur(1px)`,
  },
});

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
    imageDataArray = createBlankImageData(data);

    for (let i = 0; i <= pixelArr.length; i += 4) {
      //find the highest probability canvas the pixel should be in
      let p = Math.floor((i / pixelArr.length) * canvasCount);
      let a = imageDataArray[weightedRandomDistrib(p, canvasCount)];
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

function InfinityGauntlet(props) {
  const wrapperRef = useRef();
  const [state, setState] = useState('visible');
  const particleRefs = useRef([...Array(canvasCount)].map(() => createRef()));
  const canvases = generateBlankCanvas(particleRefs, state, canvasCount);
  if (props.snap) {
    handleSnap(wrapperRef, particleRefs, setState, state);
  }
  return (
    <div style={{ position: 'relative' }}>
      <OriginalElement pose={state} src={spiderman} ref={wrapperRef} style={{ position: 'absolute', zIndex: 1 }}>
        {props.children}
      </OriginalElement>
      <CanvasContainer pose={state}>{canvases}</CanvasContainer>
    </div>
  );
}

export default InfinityGauntlet;

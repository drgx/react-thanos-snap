import React from 'react';
import Chance from 'chance';
import Dust from '../components/Dust';
const chance = new Chance();

export function weightedRandomDistrib(peak, canvasCount) {
  var prob = [],
    seq = [];
  for (let i = 0; i < canvasCount; i++) {
    prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
    seq.push(i);
  }
  return chance.weighted(seq, prob);
}

export function createBlankImageData(imageData, canvasCount) {
  const imageDataArray = [];
  for (let i = 0; i < canvasCount; i++) {
    let arr = new Uint8ClampedArray(imageData.data);
    for (let j = 0; j < arr.length; j++) {
      arr[j] = 0;
    }
    imageDataArray.push(arr);
  }
  return imageDataArray;
}

export function generateBlankCanvas(refs, state, canvasCount) {
  const canvases = [];
  for (let a = 0; a < canvasCount; a++) {
    const canvasStyle = {
      position: 'absolute',
    };

    const dustProps = {
      key: a,
      style: canvasStyle,
      pose: state,
      x: 75,
      y: -75,
      rotate: chance.integer({ min: -20, max: 20 }),
      forwardedRef: refs.current[a],
    };

    canvases.push(<Dust {...dustProps} ref={refs.current[a]} />);
  }
  return canvases;
}

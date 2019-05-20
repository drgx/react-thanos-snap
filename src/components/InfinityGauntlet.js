import React, { useRef, useState, createRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import posed from 'react-pose';
import { weightedRandomDistrib, createBlankImageData, generateBlankCanvas } from '../helper/Util';

const canvasCount = 32;
let imageDataArray = [];

const CanvasContainer = posed.div({
  hidden: {
    delayChildren: 200,
    staggerChildren: 35,
    filter: `blur(1px)`,
  },
  visible: {
    delayChildren: 200,
    staggerChildren: 35,
    filter: `blur(0)`,
  },
});

const OriginalElement = posed.div({
  visible: {
    opacity: 1,
    filter: `blur(0)`,
    transition: {
      // visible staggerChildren * numberofCanvas + dust duration + delayChildren
      // 35*32 + 2000+200
      delay: 3320,
      duration: 50,
    },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 1000 },
    filter: `blur(1px)`,
  },
});

function handleSnap(imgRef, particleRefs, setState, snap, seParticleVisibility, proxy) {
  seParticleVisibility(true);
  if (!snap) {
    setState('visible');
  } else {
    if (imageDataArray.length === 0) {
      html2canvas(imgRef.current, { scale: 1, backgroundColor: null, proxy })
        .then((canvas) => {
          const w = canvas.width;
          const h = canvas.height;

          const ctx = canvas.getContext('2d');
          const data = ctx.getImageData(0, 0, w, h);
          var pixelArr = data.data;
          imageDataArray = createBlankImageData(data, canvasCount);

          for (let i = 0; i <= pixelArr.length; i += 4) {
            //Find the highest probability canvas the pixel should be in
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
        })
        .then(() => {
          setState('hidden');
        });
    } else {
      setState('hidden');
    }
  }
}

InfinityGauntlet.defaultProps = {
  style: {},
  snap: false,
  options: {
    zIndex: 2,
    proxy: null,
  },
};

function InfinityGauntlet(props) {
  const { options, snap, style = {} } = props;
  const wrapperRef = useRef();
  const [state, setState] = useState('visible');
  const [particleVisibility, seParticleVisibility] = useState(true);

  const particleRefs = useRef([...Array(canvasCount)].map(() => createRef()));
  const zIndex = (options && options.zIndex) || 2;
  const canvases = generateBlankCanvas(particleRefs, state, canvasCount, zIndex);

  useEffect(() => {
    handleSnap(wrapperRef, particleRefs, setState, snap, seParticleVisibility, options.proxy);
  }, [snap]);

  return (
    <div style={{ position: 'relative', ...props.style }}>
      <OriginalElement
        pose={state}
        onPoseComplete={() => {
          if (state === 'visible') {
            seParticleVisibility(false);
          }
        }}
        ref={wrapperRef}
        style={{ position: 'absolute', zIndex, width: '100%' }}
      >
        {props.children}
      </OriginalElement>
      <CanvasContainer style={{ display: particleVisibility ? 'block' : 'none' }} key={1} pose={state}>
        {canvases}
      </CanvasContainer>
    </div>
  );
}

export default InfinityGauntlet;

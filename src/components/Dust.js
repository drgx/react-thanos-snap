import React from 'react';
import posed from 'react-pose';

const DustCanvas = posed.canvas({
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

function Dust(props) {
  return <DustCanvas {...props} />;
}

export default Dust;

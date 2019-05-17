import React from 'react';
import posed from 'react-pose';

const DustCanvas = posed.canvas({
  visible: { opacity: 1, transition: { duration: 2000 }, filter: `blur(0px)`, y: 0, x: 0, rotate: 0 },
  hidden: {
    opacity: 0,
    y: (props) => props.y,
    x: (props) => props.x,
    rotate: (props) => props.rotate,
    transition: { duration: 2000 },
    filter: `blur(2px)`,
  },
});

export default function Dust(props) {
  return <DustCanvas {...props} ref={props.forwardedRef} />;
}

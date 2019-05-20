<div align="center">
  <img src="assets/snap-logo.png" width="150px">
  <h1>React Thanos Snap</h1>
  <p >
  Giving you the ability to easily converting your React components into dust with a single snap! <br>Inspired the amazing <a href="https://www.marvel.com/movies/avengers-endgame">Marvel Avenger</a> movies and Google <a href="https://www.google.com/search?q=thanos">Thanos</a> ester egg.</</p>
  <br/>
  <br/>
</div>

# How to use it 📦

Add this package to your react app project

## NPM

`npm install react-thanos-snap`

## Yarn

`yarn add react-thanos-snap`

## Usage ⚙️

Simply wrap your component with the `react-thanos-snap` component. And set the `snap` props!
This packages also have the ability to restoring back your components by changing the `snap` to `false`.

```js
import React, { useState } from 'react';
import InfinityGauntlet from 'react-thanos-snap';

function App(props) {
  const [snap, setSnap] = useState(false);
  return (
    <div>
      <InfinityGauntlet snap={true}>{/** Put your components here **/}</InfinityGauntlet>
      <button onClick={() => setSnap(!snap)}>Snap❗️</button>
    </div>
  );
}
```

# Limitation

- The components will be wrap with the div that have `position: relative;` style on it.
- We use `html2canvas`. This library have the limitation that can not render the image outside the origin because of the content policy restriction from the browser. if you wish to render image outside your origin, please read kindly use [proxy](http://html2canvas.hertzen.com/proxy/);. This component have the `options.proxy` props so you can add the proxy on that props.

# Credit

- The idea of this project also comes from [red stappler tutorial](https://redstapler.co/thanos-snap-effect-javascript-tutorial/). I porting the logic to the react and use some modification on the animation. So super thanks to the [red stapper](https://redstapler.co) for creating the great tutorial!

- The Amazing infinity gauntlet logo image for this repo is owned by [Jamie Ferrato](https://dribbble.com/shots/4595136-Infinity-Gauntlet). I own no rights to the image.

# Contributing

I ❤️ to have your helping on react-thanos-snap project! Feel free to PR's, add issues or give feedback! Enjoy your mighty power 😎

# License

MIT

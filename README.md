# react-use-transition

React hook for managing state transitions.

## Install

```bash
# yarn
yarn add react-use-transition react
# npm
npm install react-use-transition react
```

## Example

```jsx
import React, { useEffect, useState } from "react";
import { useTransition } from "react-use-transition";

const fadeStyle = {
  entering: {
    opacity: 1,
    transition: "opacity 300ms ease-in"
  },

  entered: {
    opacity: 1
  },

  exiting: {
    opacity: 0,
    transition: "opacity 300ms ease-in"
  },

  exited: {
    opacity: 0
  }
};

export default function App() {
  const timeoutDelay = 300;
  const [transitionIn, setTransitionIn] = useState(false);
  const [transitionState, endTransition] = useTransition(
    transitionIn,
    timeoutDelay // default is 500
  );

  useEffect(() => {
    setTransitionIn(true); // trigger transition
  }, []);

  return (
    <h1 style={fadeStyle[transitionState]} onTransitionEnd={endTransition}>
      Hello World!
    </h1>
  );
}
```

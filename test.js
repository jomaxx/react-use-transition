const { createElement, useEffect, useState } = require("react");
const { render, cleanup, act } = require("react-testing-library");
const { useTransition } = require("./");

jest.useFakeTimers();

afterEach(cleanup);

test("entering", () => {
  const spy = jest.fn();

  function Test() {
    const [transitionIn, setTransitionIn] = useState(false);
    const [state] = useTransition(transitionIn);

    useEffect(() => {
      act(() => setTransitionIn(true));
    }, []);

    useEffect(() => {
      spy(state);
    });

    return null;
  }

  render(createElement(Test));
  act(() => jest.runAllTimers(500));
  expect(spy.mock.calls).toEqual([["exited"], ["entering"], ["entered"]]);
});

test("exiting", () => {
  const spy = jest.fn();

  function Test() {
    const [transitionIn, setTransitionIn] = useState(true);
    const [state] = useTransition(transitionIn, 100);

    useEffect(() => {
      act(() => setTransitionIn(false));
    }, []);

    useEffect(() => {
      spy(state);
    });

    return null;
  }

  render(createElement(Test));
  act(() => jest.runAllTimers(100));
  expect(spy.mock.calls).toEqual([["entered"], ["exiting"], ["exited"]]);
});

test("endTransition", () => {
  const spy = jest.fn();

  function Test() {
    const [transitionIn, setTransitionIn] = useState(true);
    const [state, endTransition] = useTransition(transitionIn, 200);

    useEffect(() => {
      act(() => setTransitionIn(false));
      setTimeout(endTransition, 100);
    }, []);

    useEffect(() => {
      spy(state);
    });

    return null;
  }

  render(createElement(Test));
  act(() => jest.runAllTimers(100));
  expect(spy.mock.calls).toEqual([["entered"], ["exiting"], ["exited"]]);
});

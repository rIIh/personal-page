import React, { useEffect, useRef, useState, Fragment } from 'react';
import { lerp } from '../../lib/math-utils';
import $ from 'jquery';
import { useSpring, animated } from 'react-spring';

const useMouseMove = (eventHandler: (event: JQuery.MouseMoveEvent) => void) => {
  var timer: NodeJS.Timeout | null = null;
  var isIntervalSet = false;

  const mouseMoveCallback = (event: JQuery.MouseMoveEvent) => {
    if (isIntervalSet) {
      return;
    }
    timer = setTimeout(() => {
      eventHandler(event);
      timer = null;
      isIntervalSet = false;
    }, 20);
    isIntervalSet = true;
  };

  useEffect(() => {
    $('body').mousemove(mouseMoveCallback);
    return () => {
      $('body').unbind('mousemove', mouseMoveCallback);
      return;
    };
  }, []);
};

const FloatingPoint = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseHandler = ({ x, y }: { x: number; y: number }) => {
    if ({ x, y } === position) {
      return;
    } else {
      setPosition({ x, y });
    }
  };

  useMouseMove((event => update({ x: event.clientX, y: event.clientY })));

  const [outer, setOuter] = useSpring(() => ({
    top: 0,
    left: 0,
    config: { mass: 2, tension: 400, friction: 60 },
  }));
  const [outerOverElement, setOuterOver] = useSpring(() => ({
    width: '32px',
    height: '32px',
    borderSize: '0',
    background: 'white',
    config: { mass: 2, tension: 400, friction: 60 },
  }));
  const [clicked, setClicked] = useSpring(() => ({
    size: 0,
    config: { mass: 2, tension: 550, friction: 60 },
  }));
  const [inner, setInner] = useSpring(() => ({
    top: 0,
    left: 0,
    config: { mass: 2, tension: 550, friction: 60 },
  }));

  const innerDot = useRef<HTMLDivElement>(null);
  let overHoverable = false;

  function update({ x, y }: { x: number; y: number }) {
    overHoverable = !document?.elementsFromPoint(x, y)?.every((element) => !element.matches('.hoverable')) ?? false;
    setOuter({
      left: x,
      top: y,
    });
    setOuterOver({
      width: overHoverable ? '64px' : '32px',
      height: overHoverable ? '64px' : '32px',
      borderSize: overHoverable ? '1' : '0',
      background: overHoverable ? '#00000000' : 'white',
    });
    setInner({
      left: x,
      top: y,
    });
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    const clicked = () => {
      if (!overHoverable) {
        return;
      }
      setClicked({ size: 1 });
      if (timeout) {
        clearInterval(timeout);
      }
      timeout = setTimeout(() => {
        setClicked({ size: 0 });
        timeout = undefined;
      }, 300);
    };
    document.addEventListener('click', clicked);
    return () => document.removeEventListener('click', clicked);
  }, []);

  return <div className="floating_point floating_point--over-hoverable">
    <animated.div className="floating_point__click_dot" style={{
      width: clicked.size.interpolate(size => size * 64 + 'px'),
      height: clicked.size.interpolate(size => size * 64 + 'px'),
      ...outer,
    }}/>
    <animated.div className="floating_point__outer_dot" style={
      {
        border: outerOverElement.borderSize.interpolate(bs => `${bs}px solid white`),
        backgroundColor: outerOverElement.background as string,
        ...outerOverElement,
        ...outer,
      }
    } />
    <animated.div ref={innerDot} className="floating_point__inner_dot" style={{
      ...inner,
    }} />
  </div>;
};

export default FloatingPoint;

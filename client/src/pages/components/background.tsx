import React, { useEffect, useRef } from 'react';
import { AliveDots } from '../../lib/alive-dots';

// let mouseScreenPosition = { x: 0, y: 0 };
// let blurred = false;
// const mouseSpyRadius = 512;

const DotsBackground = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const getCanvas = () => canvas.current;

  let aliveDots: AliveDots | undefined;

  const loop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    aliveDots!.draw(ctx);
    window.requestAnimationFrame(() => loop(canvas, ctx));
  };

  useEffect(() => {
    const canvas = getCanvas()!;
    const context = canvas.getContext('2d')!;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', event => {
      resizeCanvas();
      aliveDots?.resize({ width: window.innerWidth, height: window.innerHeight });
      // updateDots({ width: window.innerWidth, height: window.innerHeight });
    });
    resizeCanvas();

    aliveDots = new AliveDots();
    // updateDots({ width: window.innerWidth, height: window.innerHeight });
    window.requestAnimationFrame(() => loop(canvas, context));
  }, []);

  return (
      <canvas ref={canvas}
              onMouseMove={aliveDots?.mouseMovementHandler ?? undefined}
              onMouseLeave={aliveDots?.onBlurred}
              onMouseEnter={aliveDots?.onFocus}>Canvas Not supported</canvas>
  );
};

export default DotsBackground;

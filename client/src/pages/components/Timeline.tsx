import React, { useEffect, useRef, useState } from 'react';
import { route } from 'next/dist/next-server/server/router';

interface TimelineProps {
  count: number;
  initialIndex: number;
}

const Divider = () => {
  return <div className="timeline__path">

  </div>;
}

const Timeline = ({ count, initialIndex }: TimelineProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [hoverTarget, setHoverTarget] = useState(-1);

  const onSwitch = (index: number) => {
    index = index >= count ? count - 1 : index;
    setCurrentIndex(index);
  };

  const items = [];

  for (let i = 0; i < count; i++) {
    items.push(<div key={i} className="hoverable"><div className="timeline__dot"/></div>);
    if (i !== count - 1) {
      items.push(<div key={i + count} className="timeline__divider"/>);
    }
  }

  return <div className="timeline">
    <div className="timeline__arc timeline__arc--top"/>
    <div className="timeline__path">
      { items }
    </div>
    <div className="timeline__arc timeline__arc--bottom"/>
  </div>;
};

export default Timeline;

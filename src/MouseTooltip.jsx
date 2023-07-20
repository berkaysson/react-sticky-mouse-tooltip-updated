import React, { useState, useEffect } from "react";

const MouseTooltip = ({
  className,
  visible = true,
  offsetX = 0,
  offsetY = 0,
  style,
  children,
}) => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [mouseMoved, setMouseMoved] = useState(false);
  const [listenerActive, setListenerActive] = useState(false);

  const getTooltipPosition = ({ clientX, clientY }) => {
    setXPosition(clientX);
    setYPosition(clientY);
    setMouseMoved(true);
  };

  const addListener = () => {
    window.addEventListener("mousemove", getTooltipPosition);
    setListenerActive(true);
  };

  const removeListener = () => {
    window.removeEventListener("mousemove", getTooltipPosition);
    setListenerActive(false);
  };

  useEffect(() => {
    addListener();
    return () => {
      removeListener();
    };
  }, []);

  useEffect(() => {
    if (!listenerActive && visible) {
      addListener();
    }

    if (listenerActive && !visible) {
      removeListener();
    }
  }, [visible, listenerActive]);

  return (
    <div
      className={className}
      style={{
        display: visible && mouseMoved ? "block" : "none",
        position: "fixed",
        top: yPosition + offsetY,
        left: xPosition + offsetX,
        zIndex:9999,
        pointerEvents:"none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default MouseTooltip;


export default MouseTooltip;

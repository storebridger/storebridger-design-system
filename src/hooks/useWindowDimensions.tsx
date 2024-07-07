import React, { useEffect, useState } from 'react';
import { Screen } from 'constants/Screen';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  const isMobile = React.useMemo(() => {
    return windowDimensions.width <= Screen.SMALL;
  }, [windowDimensions.width]);

  const isMedium = React.useMemo(() => {
    return windowDimensions.width <= Screen.MEDIUM;
  }, [windowDimensions.width]);

  const isXXLarge = React.useMemo(() => {
    return windowDimensions.width <= Screen.XXLARGE;
  }, [windowDimensions.width]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...windowDimensions,
    isMobile,
    isMedium,
    isXXLarge,
  };
};

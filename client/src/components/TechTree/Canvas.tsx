import React from "react";

export const CanvasContext = React.createContext<null | CanvasRenderingContext2D>(
  null
);

const Canvas: React.FC = ({ children }) => {
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);
  const [
    renderingContext,
    setRenderingContext,
  ] = React.useState<null | CanvasRenderingContext2D>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      setRenderingContext(ctx);
    }
  }, []);

  return (
    <CanvasContext.Provider value={renderingContext}>
      <canvas ref={canvasRef} />
      {children}
    </CanvasContext.Provider>
  );
};

export default Canvas;

import React from "react";
import { CanvasContext } from "./Canvas";

const WalkerTree = () => {
  const renderingContext = React.useContext(CanvasContext);
  if (renderingContext !== null) {
    // draw some shit
  }
  return <div>loading...</div>;
};

export default WalkerTree;

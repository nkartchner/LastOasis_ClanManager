import React from "react";
import { Text, Group, Rect } from "react-konva";
import { Rect as IRect } from "konva/types/shapes/Rect";
import { KonvaEventObject } from "konva/types/Node";
import Portal from "./Portal";

export interface Coords {
  x: number;
  y: number;
}
interface Props {
  debug: boolean;
  type: "bone" | "ceramic" | "iron";
}

export const UpgradePlaceholder: React.FC<Coords & Props> = ({
  x,
  y,
  type,
  debug = false,
}) => {
  const rect = React.useRef<IRect>(null);
  const [position, setPosition] = React.useState({ x, y });
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const handleDrag = (e: KonvaEventObject<DragEvent>) => {
    setPosition({ ...e.currentTarget.getPosition() });
  };
  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) {
      setOffset({ ...offset, [e.target.name]: +e.target.value });
    }
  };
  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) {
      const newPos = { ...position, [e.target.name]: +e.target.value };
      setPosition(newPos);

      rect.current?.setPosition(newPos);
    }
  };
  const handleReset = () => {
    setPosition({ x, y });
    setOffset({ x: 0, y: 0 });
    rect.current?.setPosition({ x, y });
  };
  return debug ? (
    <Group x={x} y={y}>
      <Rect
        x={45}
        y={-25}
        ref={rect}
        offset={{ x: offset.x, y: offset.y }}
        onDragMove={handleDrag}
        shadowBlur={5}
        fill={"white"}
        rotation={45}
        height={85}
        width={85}
        draggable
      />
      <Text align="center" text={`${type} Upgrade`} />
      <Text offsetY={45} text={`Position: X:${position.x}, Y:${position.y}`} />
      <Portal>
        <label>Offset X:</label>
        <input
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            width: "200px",
          }}
          name="x"
          value={offset.x}
          onChange={handleOffsetChange}
        />
        <label>Offset Y:</label>
        <input
          style={{
            position: "absolute",
            top: 30,
            left: 10,
            width: "200px",
          }}
          name="y"
          value={offset.y}
          onChange={handleOffsetChange}
        />
        <label>Position X:</label>
        <input
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            width: "200px",
          }}
          name="x"
          value={position.x}
          onChange={handlePositionChange}
        />
        <label>Position Y:</label>
        <input
          style={{
            position: "absolute",
            top: 70,
            left: 10,
            width: "200px",
          }}
          name="y"
          value={position.y}
          onChange={handlePositionChange}
        />
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </Portal>
    </Group>
  ) : (
    <Group x={x} y={y}>
      <Rect
        x={45}
        y={-25}
        ref={rect}
        onDragMove={handleDrag}
        shadowBlur={5}
        fill={"brown"}
        rotation={45}
        height={85}
        width={85}
      />
      <Text offsetY={45} text={"Bone Upgrade"} />
    </Group>
  );
};

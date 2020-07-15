import React from "react";
import { images } from "../../icons/Icons";
import { Stage, Text, Layer, Line, Group, Rect } from "react-konva";
import { Rect as IRect } from "konva/types/shapes/Rect";
import { KonvaEventObject } from "konva/types/Node";
//import Portal from "./Portal";

const LINE_START = 85 / 2;

const UpgradePlaceholder = ({ x, y }: { x: number; y: number }) => {
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
    return (
        <Group x={x} y={y}>
            <Rect
                x={45}
                y={-25}
                ref={rect}
                offset={{ x: offset.x, y: offset.y }}
                onDragMove={handleDrag}
                shadowBlur={5}
                fill={"brown"}
                rotation={45}
                height={85}
                width={85}
                draggable
            />
            <Text align={"center"} text={"Bone Upgrade"} />
            {/*<Text
                offsetY={45}
                text={`Position: X:${position.x}, Y:${position.y}`}
            />*/}
            {/* <Portal>
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
            </Portal> */}
        </Group>
    );
};

const TechTreeKonva = () => {
    const [isDragging, setIsDragging] = React.useState(false);

    return (
        <div id="main-stage" style={{ position: "relative" }}>
            <Stage
                width={window.innerWidth - 300}
                height={window.innerHeight - 128}
                style={{
                    cursor: isDragging ? "grabbing" : "grab",
                }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                draggable
            >
                <Layer>
                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[0, 0, 150, 0]}
                        stroke="white"
                        strokeWidth={4}
                    />
                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[
                            150,
                            0,
                            200,
                            -50,
                            200,
                            -200,
                            250,
                            -250,
                            400,
                            -250,
                        ]}
                        stroke="yellow"
                        strokeWidth={4}
                    />
                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[400, -250, 450, -200]}
                        stroke="red"
                        strokeWidth={4}
                    />
                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[450, -200, 450, 125, 500, 175]}
                        stroke="green"
                        strokeWidth={4}
                    />

                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[500, 175, 575, 175]}
                        stroke="purple"
                        strokeWidth={4}
                    />

                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[450, -50, 500, 0]}
                        stroke="orange"
                        strokeWidth={4}
                    />
                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[500, 0, 550, 50]}
                        stroke="blue"
                        strokeWidth={4}
                    />
                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[500, 0, 575, -75]}
                        stroke="pink"
                        strokeWidth={4}
                    />

                    <Line // going down!
                        x={LINE_START}
                        y={LINE_START}
                        points={[150, 0, 200, 50, 200, 350, 250, 400]}
                        stroke="lightblue"
                        strokeWidth={4}
                    />
                    <Line
                        x={LINE_START}
                        y={LINE_START}
                        points={[200, 250, 250, 300, 525, 300]}
                        stroke="lightblue"
                        strokeWidth={4}
                    />
                    {/* <UpgradePlaceholder x={275} y={290} /> */}
                    <images.BaseWingsIcon x={275} y={290} />
                    <images.BaseWingsIcon x={400} y={290} />
                    <images.BaseWingsIcon x={525} y={290} />
                    {/* Load dingy on this line */}
                    <Group>
                        {images.WalkerIcon}
                        {images.FireflyWalkerIcon}
                        <images.BaseWingsIcon x={275} y={400} />
                        <images.SmallFastWingsIcon x={575} y={165} />
                        {images.DinghyWalkerIcon}
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default TechTreeKonva;

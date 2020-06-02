import React from "react";
import { Stage, Layer, Text, Image, Line, Group } from "react-konva";
import useImage from "use-image";
import * as images from "../../icons";

export const FireflyWalkerIcon = () => {
    const [image] = useImage(images.FireflyWalkerIconTest);
    return <Image image={image} height={85} width={85} x={150} y={0} />;
};

export const WalkerImage = () => {
    const [image] = useImage(images.WalkerIconTest);
    return <Image image={image} height={85} width={85} x={0} y={0} />;
};

const TechTreeKonva = () => {
    const [isDragging, setIsDragging] = React.useState(false);

    return (
        <div>
            <Stage
                width={window.innerWidth - 300}
                height={window.innerHeight - 128}
                style={{
                    cursor: isDragging ? "grabbing" : "unset",
                    backgroundColor: isDragging
                        ? "rgba(255,255,255,0.5)"
                        : "inherit",
                }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                draggable
            >
                <Layer>
                    <Line
                        x={85 / 2}
                        y={85 / 2}
                        points={[0, 0, 150, 0]}
                        stroke="white"
                    />
                    <Line
                        x={85 / 2}
                        y={85 / 2}
                        points={[150, 0, 200, -50, 200, -200]}
                        stroke="white"
                    />
                    <Group>
                        <WalkerImage />
                        <FireflyWalkerIcon />
                    </Group>
                </Layer>
                {/* <Layer draggable>
                    <WalkerImage />
                    <FireflyWalkerIcon />
                </Layer> */}
            </Stage>
        </div>
    );
};

export default TechTreeKonva;

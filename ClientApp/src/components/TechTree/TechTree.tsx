import React from "react";
import { makeStyles } from "@material-ui/core";
import "./techTree.css";
const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        padding: theme.spacing(3),
        top: "64px",
        left: 0,
        right: 0,
        bottom: 0,
    },
    icon: {
        transform: "translateZ(0)",
        "&:hover": {
            transform: "scale(1.1)",
        },
        "&:focus": {
            transform: "scale(1.1)",
        },
        "&:active": {
            transform: "scale(1.1)",
        },

        boxShadow: "0 0 1px rgba(0, 0, 0, 0)",
        backfaceVisibility: "hidden",
        transitionDuration: "0.3s",
        transitionProperty: "transform",
    },
}));
const TechTree: React.FC = () => {
    const classes = useStyles();
    const parentRef = React.useRef<HTMLDivElement | null>(null);
    // const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    // // const [location, setLocation] = React.useState();

    // React.useLayoutEffect(() => {
    //     const canvas: HTMLCanvasElement | null = canvasRef.current;
    //     const parent = parentRef.current;
    //     if (canvas && parent) {
    //         canvas.width = parent.offsetWidth - 48;
    //         canvas.height = parent.offsetHeight - 48;
    //         const ctx = canvas.getContext("2d");
    //         if (ctx) {
    //             ctx.strokeStyle = "white";
    //             ctx.lineWidth = 4;
    //             const h = canvas.height;
    //             const angle = {
    //                 h: 70,
    //                 w: 70,
    //             };
    //             const imgSize = 85;
    //             const imgOffset = imgSize / 2;
    //             let andThenSome = 15;
    //             let currentLineWidth = imgOffset;
    //             let currentLineHeight = Math.round(h / 2);

    //             images.WalkerIcon(ctx, 0, currentLineHeight - imgOffset);

    //             ctx.moveTo(currentLineWidth, currentLineHeight);

    //             currentLineWidth += 100;

    //             images.FireflyWalkerIcon(
    //                 ctx,
    //                 currentLineWidth,
    //                 currentLineHeight - imgOffset
    //             );
    //             currentLineWidth = currentLineWidth + imgOffset + andThenSome;

    //             ctx.lineTo(currentLineWidth, currentLineHeight);

    //             currentLineWidth += angle.w;
    //             currentLineHeight -= angle.h;
    //             ctx.lineTo(currentLineWidth, currentLineHeight);

    //             currentLineHeight -= 190;
    //             ctx.lineTo(currentLineWidth, currentLineHeight);

    //             currentLineWidth += angle.w;
    //             currentLineHeight -= angle.h;
    //             ctx.lineTo(currentLineWidth, currentLineHeight);

    //             ctx.stroke();
    //         }
    //     }
    // }, [canvasRef]);

    // const handleClick = () => {};

    return (
        <div className={classes.root} ref={parentRef}>
            {/* <canvas
                style={{ border: "1px solid red" }}
                ref={canvasRef}
                onClick={handleClick}
            /> */}
        </div>
    );
};

export default TechTree;

import React from "react";
import { Typography } from "@material-ui/core";

interface Props {
    description: string;
}

const About: React.FC<Props> = ({ description }) => {
    return (
        <div>
            <Typography
                style={{ width: "100%", margin: "15px 0" }}
                variant="h4"
                color="textPrimary"
            >
                About Us
            </Typography>

            <Typography variant="body1" color="textPrimary">
                {description}
            </Typography>
        </div>
    );
};

export default About;

import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Stepper = (props) => {
    const { sx, config, data } = props;
    return (
        <Box sx={sx}>
            <Carousel {...config}>
                {data.map((val, i) => (
                    <Box key={'step_' + i}>
                        <img src={val.src} />
                        {val.content}
                    </Box>
                ))}
            </Carousel>
        </Box>
    )
}

export default Stepper;
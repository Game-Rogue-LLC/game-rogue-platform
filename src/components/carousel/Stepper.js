import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Box, Typography } from "@mui/material";

import { Carousel } from "react-responsive-carousel";

const Stepper = (props) => {
  const { sx, config, data } = props;
  return (
    <Box sx={sx}>
      <Carousel {...config} infiniteLoop={false}>
        {data?.length > 0 &&
          data.map((val, i) => (
            <Box key={"step_" + i}>
              <img src={val.src} />
              {val.content}
            </Box>
          ))}
      </Carousel>
    </Box>
  );
};

export default Stepper;

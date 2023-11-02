import { Container, Box } from "@mui/material";

const PageContainer = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        padding: "2em 0",
        // background: "linear-gradient(to top,#f5851f -20%,#000 80%)",
        background: "linear-gradient(to top, #4a2807 -20%, #221204 80%)"
      }}
    >
      <Container maxWidth="xl">{children}</Container>
    </div>
  );
};

export default PageContainer;

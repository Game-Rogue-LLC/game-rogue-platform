import { Container, Box } from "@mui/material";

const PageContainer = ({ children }) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "2em 0",
        background: "linear-gradient(to top,#f5851f -20%,#000 80%)",
      }}
    >
      <Container maxWidth="xl">{children}</Container>
    </div>
  );
};

export default PageContainer;

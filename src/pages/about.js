import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import MemberItem from "@/src/components/item/MemberItem";
import PublicLayout from "@/src/content/PublicLayout";

const members = [
  {
    nickName: "Inst1nct",
    name: "Kyler Bender",
    position: "Chief Executive Officer",
  },
  {
    nickName: "Titane",
    name: "Mack Stanek",
    position: "Chief Operations Officer",
  },
  {
    nickName: "Killuaw",
    name: "Jess Wilson",
    position: "Chief Merchandise Officer",
  },
  {
    nickName: "FaiXaN",
    name: ".",
    position: "Studios Director",
  },
  {
    nickName: "Mingan",
    name: ".",
    position: "Marketing Director",
  },
  {
    nickName: "Yali",
    name: ".",
    position: "Productions Director",
  },
  {
    nickName: "Foran",
    name: ".",
    position: "R6 PC Director",
  },
  {
    nickName: "Toast",
    name: ".",
    position: "R6 PC Assistant Director",
  },
  {
    nickName: "Canadian",
    name: ".",
    position: "R6 Xbox Director",
  },
  {
    nickName: "Chris",
    name: "Christian Bradley",
    position: "Studios Developer",
  },
];

const Page = ({}) => {
  const theme = useTheme();
  return (
    <Container sx={{ py: 8 }}>
      <Box>
        <Typography
          variant="h3"
          color={theme.palette.primary.main}
          fontSize={45}
          textAlign="center"
        >
          WHO WE ARE
        </Typography>
        <Typography
          variant="body1"
          whiteSpace="pre-wrap"
          fontSize={25}
          sx={{ mt: 2 }}
        >
          Game Rogue's conception stems from three life-long friends working in
          a pizza shop.
          <br />
          <br />
          There's two sides of Game Rogue:
          <br />
          1. The platform.
          <br />
          2. The tournaments.
          <br />
          <br />
          Our platform is meant for esports connection and culture.
          <br />
          <br />
          Starting from tournament-hosting, we discovered the pain-points and
          redundancy in esports. We optimized event-hosting by matching AI and
          easy-to-use tools to usher-in the next generation of esports
          event-hosting, team management, and player development.
          <br />
          <br />
          After running several tournaments, Game Rogue shifted it's attention
          to offering tools and layouts for organizers to host events with new
          looks, instant tools to save money and countless hours, and to lose
          the headaches and awfulness of event-hosting.
          <br />
          <br />
          We developed tools for teams to begin or continue their unique
          path-to-pro. Create merchandise and open shops for free with
          drop-shipping APIs to your website or to connect to your Rogue Social
          page.
          <br />
          <br />
          Content creators or amateur players now have the same tools as the
          pros. Review your previous matches, waste no time editing clips or
          creating montages, and join Rogue Social to connect and build your
          esports network.
          <br />
          <br />
          The focus of Game Rogue tournaments is promotion and prestige. Game
          Rogue provides the next generation of esports at low-cost with the
          most exciting features released since esports carnation.
        </Typography>
        <br />
        <Typography
          variant="body1"
          color={theme.palette.primary.main}
          fontSize={25}
        >
          Join the revolution. Join the game. Go Rogue.
          <br />
          <br />
          The story starts here.
        </Typography>
      </Box>

      <Box sx={{ py: 5 }}>
        <Box
          sx={{
            borderBottom: "solid 2px #f5831f",
            py: 3,
          }}
        >
          <Image alt="GR_Logo" src="/static/images/home/gr_letters.png" width={100} height={50} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            color={theme.palette.primary.main}
            textAlign="center"
            sx={{ py: 2 }}
            fontSize={45}
          >
            THE TEAM
          </Typography>
          <Grid container rowSpacing={3} spacing={3}>
            {members.map((val, i) => (
              <MemberItem item={val} key={i} />
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

Page.getLayout = (page) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Page;

import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Accordion as MuiAccordion,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled
} from "@mui/material";
import { useMemo, useState } from "react";

import AccountInfo from "@/src/components/widgets/rogue-social/profile/AccountInfo";
import { ExpandMore } from "@mui/icons-material";
import GamesInterested from "@/src/components/widgets/rogue-social/profile/GamesInterested";
import { LoadingButton } from "@mui/lab";
import PlatformsInterested from "@/src/components/widgets/rogue-social/profile/PlatformsInterested";
import PostList from "@/src/components/widgets/rogue-social/PostList";
import RegionsInterested from "@/src/components/widgets/rogue-social/profile/RegionsInterested";
import axios from "axios";
import { useAuthContext } from "@/src/context/AuthContext";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  fontSize: "16px",
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
}));

const Privacy = ({}) => {
  const { user } = useAuthContext();
  const post = useSelector((state) => state.post);
  const { enqueueSnackbar } = useSnackbar();
  const { player, post: postController } = useTournamentContext();
  const [accountStatus, setAccountStatus] = useState(player.players[user.id]?.accountStatus || 0);
  const [accountSaving, setAccountSaving] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(player.players[user.id]?.onlineStatus || 0);
  const [onlineSaving, setOnlineSaving] = useState(false);

  const onAccountStatusChange = (e, val) => {
    setAccountStatus(val);
  };
  const onSaveAccountStatus = async (e) => {
    setAccountSaving(true);
    const res = await player.update(user.id, { accountStatus: Number(accountStatus) });
    if (res.code === "succeed") {
      enqueueSnackbar("Saved successfully!", { variant: "success" });
    }
    setAccountSaving(false);
  };
  const onOnlineStatusChange = (e, val) => {
    setOnlineStatus(val);
  };
  const onSaveOnlineStatus = async (e) => {
    setOnlineSaving(true);
    // const res = await axios.post("/api/user/update", {
    //   id: user.id,
    //   data: {
    //     onlineStatus: onlineStatus
    //   }
    // });
    const res = await player.update(user.id, { onlineStatus: Number(onlineStatus) });
    if (res.code === "succeed") {
      // alert("succeed");
      enqueueSnackbar("Saved successfully!", { variant: "success" });
    } else {
      console.warn(res.message);
    }
    setOnlineSaving(false);
  };

  const myPosts = useMemo(() => {
    if (post && post.posts) {
      return Object.keys(post.posts)
        .filter((key) => post.posts[key].uid === user.id)
        .map((key) => post.posts[key]);
    }
    return [];
  }, [post.posts]);

  return (
    <Box sx={{ borderRadius: 0 }}>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="my-posts-content"
          id="my-posts-header"
        >
          <Typography variant="h6">My Posts</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <PostList
            posts={myPosts}
            loading={post.status === "loading"}
            sx={{ maxHeight: "100vh" }}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="account-status-content"
          id="account-status-header"
        >
          <Typography variant="h6">Change Account Status</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 3 }}>
          <Typography>Set your account as Private/Public</Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: true }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="account-status-group"
                name="account-status"
                value={accountStatus}
                onChange={onAccountStatusChange}
              >
                <FormControlLabel value={0} control={<Radio />} label="Private" />
                <FormControlLabel value={1} control={<Radio />} label="Public" />
              </RadioGroup>
            </FormControl>
            <Box>
              <LoadingButton
                loading={accountSaving}
                variant="contained"
                sx={{ mt: 1 }}
                onClick={onSaveAccountStatus}
              >
                Save
              </LoadingButton>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="online-status-content"
          id="online-status-header"
        >
          <Typography variant="h6">Change Online Status</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Set online status</Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: true }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="online-status-group"
                name="online-status"
                value={onlineStatus}
                onChange={onOnlineStatusChange}
              >
                <FormControlLabel value={0} control={<Radio color="success" />} label="Online" />
                <FormControlLabel value={1} control={<Radio color="warning" />} label="Idle" />
                <FormControlLabel value={2} control={<Radio color="default" />} label="Offline" />
                <FormControlLabel
                  value={3}
                  control={<Radio color="error" />}
                  label="Do Not Disturb"
                />
              </RadioGroup>
            </FormControl>
            <Box>
              <LoadingButton
                loading={onlineSaving}
                variant="contained"
                sx={{ mt: 1 }}
                onClick={onSaveOnlineStatus}
              >
                Save
              </LoadingButton>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="manage-content-content"
          id="manage-content-header"
        >
          <Typography variant="h6">Manage the Content You See</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GamesInterested uid={user.id} />
          <PlatformsInterested uid={user.id} sx={{ mt: "20px" }} />
          <RegionsInterested uid={user.id} sx={{ mt: "20px" }} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Privacy;

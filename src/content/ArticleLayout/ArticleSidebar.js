import {
  ArrowRight,
  Drafts,
  Edit,
  Groups,
  Home,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PublishedWithChanges,
  Settings,
  ThumbUpAlt
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

import Avatar from "@/src/components/Avatar";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import OrganizationMenu from "@/src/content/OrganizationSidebar/Menu";
import TeamMenu from "@/src/content/OrganizationSidebar/TeamMenu";
import _ from "lodash";
import { isMyArticle } from "../../utils/utils";
import { model } from "@/lib/firestore/collections/articles";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const FireNav = styled(List)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.primary.main
  },
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20
  }
}));

const FirePaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.card.darker,
  borderRadius: 0
}));

export default function ArticleSidebar(props) {
  const theme = useTheme();
  const router = useRouter();
  const { article, player } = useTournamentContext();
  const { user } = useAuthContext();
  const [type, setType] = useState("");
  const [draftOpen, setDraftOpen] = useState(false);
  const [publishedOpen, setPublishedOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [collaborationsOpen, setCollaborationsOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const onArticleTypeChange = (e) => {
    setType(e.target.value);
  };
  const onCreateArticleClick = async () => {
    setCreating(true);
    const res = await article.create({
      ...model,
      uid: user.id,
      title: "New Article",
      text: "",
      createdAt: new Date()
    });

    setCreating(false);
    setCreateDialogOpen(false);
  };
  const onCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };
  const onCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };
  const onToggleDraftOpen = () => {
    setDraftOpen((prev) => !prev);
  };
  const onTogglePublishedOpen = (e) => {
    setPublishedOpen((prev) => !prev);
  };
  const onToggleCollaborationsOpen = (e) => {
    setCollaborationsOpen((prev) => !prev);
  };

  const onArticleClick = (val) => {
    router.push("/article/" + val.id);
  };

  const drafts = useMemo(() => {
    if (article.articles)
      return _.filter(
        article.articles,
        (val) => val.published === false && isMyArticle(val, user.id)
      );
    return [];
  }, [article.articles]);

  const published = useMemo(() => {
    if (article.articles)
      return _.filter(
        article.articles,
        (val) => val.published === true && isMyArticle(val, user.id)
      );
    return [];
  }, [article.articles]);

  const collaborations = useMemo(() => {
    return [];
  }, [article.articles]);

  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "2px 0px 7px #301701ba",
        zIndex: 1,
        position: "relative"
      }}
    >
      {/* Begin Create Article Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={onCreateDialogClose}
        PaperProps={{ sx: { minWidth: "400px" } }}
      >
        <DialogTitle>Article Type</DialogTitle>
        <DialogContent sx={{ paddingBlock: 0 }}>
          <Typography variant="body1">What type of article are you writing?</Typography>
          <Select value={type} onChange={onArticleTypeChange} sx={{ marginTop: 1 }} fullWidth>
            <MenuItem value={0}>Player/Talent/Coach Article</MenuItem>
            <MenuItem value={1}>Team Article</MenuItem>
            <MenuItem value={2}>Organization Article</MenuItem>
            <MenuItem value={3}>Organizer Article</MenuItem>
            <MenuItem value={4}>Event Article</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <LoadingButton loading={creating} variant="contained" onClick={onCreateArticleClick}>
            OK
          </LoadingButton>
          <Button variant="contained" onClick={onCreateDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Create Article Dialog */}
      <Box
        sx={{
          position: "relative",
          width: "300px",
          height: "100%"
        }}
      >
        <FirePaper
          elevation={0}
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            position: "absolute",
            overflowX: "hidden",
            overflowY: "auto"
          }}
        >
          <FireNav component="nav" disablePadding>
            <ListItem
              key={"profile_container"}
              sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                p: 2
              }}
            >
              <Box>
                <Avatar
                  size="large"
                  user={player.players[user.id]}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">{player.players[user.id]?.name}</Typography>
              </Box>
            </ListItem>
            <Divider />
            <ListItem key={"profile_menu_container"} component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }} onClick={onCreateDialogOpen}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText
                  primary={`Create Article`}
                  primaryTypographyProps={{
                    fontWeight: "medium",
                    variant: "h6",
                    textTransform: "uppercase"
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />

            {/* Begin Drafts */}
            <ListItem
              key={"draft_menu_container"}
              component="div"
              sx={{ px: 3, py: 1 }}
              disablePadding
            >
              <ListItemIcon>
                <Drafts />
              </ListItemIcon>
              <ListItemText
                primary="DRAFT"
                primaryTypographyProps={{
                  fontWeight: "medium",
                  variant: "h6",
                  textTransform: "uppercase"
                }}
              />
              <IconButton onClick={onToggleDraftOpen}>
                {(draftOpen === true && <KeyboardArrowUp />) || <KeyboardArrowDown />}
              </IconButton>
            </ListItem>
            {draftOpen &&
              (drafts && drafts.length > 0 ? (
                _.map(drafts, (val, i) => (
                  <ListItemButton key={"article_" + val.id} onClick={() => onArticleClick(val)}>
                    <ListItemText primary={val.title} />
                  </ListItemButton>
                ))
              ) : (
                <Typography textAlign="center" sx={{ pb: 1 }}>
                  No articles
                </Typography>
              ))}
            {/* End Drafts */}

            <Divider />

            {/* Begin Published */}
            <ListItem
              key={"published_menu_container"}
              component="div"
              sx={{ px: 3, py: 1 }}
              disablePadding
            >
              <ListItemIcon>
                <PublishedWithChanges />
              </ListItemIcon>
              <ListItemText
                primary="Published"
                primaryTypographyProps={{
                  fontWeight: "medium",
                  variant: "h6",
                  textTransform: "uppercase"
                }}
              />
              <IconButton onClick={onTogglePublishedOpen}>
                {(publishedOpen === true && <KeyboardArrowUp />) || <KeyboardArrowDown />}
              </IconButton>
            </ListItem>
            {publishedOpen &&
              (published && published.length > 0 ? (
                _.map(published, (val, i) => (
                  <ListItemButton key={"article_" + val.id} onClick={() => onArticleClick(val)}>
                    <ListItemText primary={val.title} />
                  </ListItemButton>
                ))
              ) : (
                <Typography textAlign="center" sx={{ pb: 1 }}>
                  No articles
                </Typography>
              ))}
            {/* End Published */}
            <Divider />
            {/* Begin Collaborations */}
            <ListItem
              key={"collaborations_menu_container"}
              component="div"
              sx={{ px: 3, py: 1 }}
              disablePadding
            >
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText
                primary="Collaborations"
                primaryTypographyProps={{
                  fontWeight: "medium",
                  variant: "h6",
                  textTransform: "uppercase"
                }}
              />
              <IconButton onClick={onToggleCollaborationsOpen}>
                {(collaborationsOpen === true && <KeyboardArrowUp />) || <KeyboardArrowDown />}
              </IconButton>
            </ListItem>
            {collaborationsOpen &&
              (collaborations && collaborations.length > 0 ? (
                _.map(collaborations, (val, i) => (
                  <ListItemButton key={"article_" + val.id}>
                    <ListItemText primary={val.title} />
                  </ListItemButton>
                ))
              ) : (
                <Typography textAlign="center" sx={{ pb: 1 }}>
                  No articles
                </Typography>
              ))}
            {/* End Collaborations */}
            <Divider />
            {/* Begin Endorsement */}
            <ListItem key={"endorsements_menu_container"} component="div" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ThumbUpAlt />
                </ListItemIcon>
                <ListItemText
                  primary="Endorsements"
                  primaryTypographyProps={{
                    fontWeight: "medium",
                    variant: "h6",
                    textTransform: "uppercase"
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* End Endorsement */}
            <Divider />
            {/* Begin Settings */}
            <ListItem key={"settings_menu_container"} component="div" sx={{ p: 0 }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{
                    fontWeight: "medium",
                    variant: "h6",
                    textTransform: "uppercase"
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* End Endorsement */}
          </FireNav>
        </FirePaper>
      </Box>
    </Box>
  );
}

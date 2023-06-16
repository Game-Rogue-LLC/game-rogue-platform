import { Badge, Box, Avatar as MuiAvatar, IconButton, styled, useTheme } from "@mui/material";
import { AddAPhoto, Edit } from "@mui/icons-material";

import { useRouter } from "next/router";
import { useTournamentContext } from "../context/TournamentContext";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""'
    }
  }
}));

const Avatar = ({
  variant,
  user,
  src,
  alt,
  sx,
  size,
  hideStatus,
  status,
  editable,
  onChange,
  ContainerProps,
  ...props
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { player } = useTournamentContext();

  return (
    <Box
      onClick={() => {
        if (editable === true) return;
        else router.push("/user/" + user.id);
      }}
      sx={{
        position: "relative",
        cursor: "pointer",
        ...ContainerProps?.sx
      }}
    >
      {hideStatus === true ? (
        <>
          <MuiAvatar variant={variant} src={src || user?.profilePic} alt={user?.name} {...props} sx={{ ...sx }} />
          {editable === true && (
            <IconButton
              size="large"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                // color: theme.palette.primary.main,
                opacity: 0,
                ":hover": {
                  background: "rgba(0,0,0,.4)",
                  opacity: 1
                }
              }}
              component={"label"}
            >
              <AddAPhoto />
              <input
                type="file"
                accept="image/*"
                name="upload-image"
                id="upload-image"
                hidden
                onChange={onChange}
              />
            </IconButton>
          )}
        </>
      ) : (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent=" "
          variant={size === "large" ? "" : "dot"}
          color={
            user?.onlineStatus === 0
              ? "success"
              : user?.onlineStatus === 1
              ? "warning"
              : user?.onlineStatus === 3
              ? "error"
              : "default"
          }
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor:
                user?.onlineStatus !== 0 && user?.onlineStatus !== 1 && user?.onlineStatus !== 3
                  ? "gray"
                  : ""
            }
          }}
        >
          <MuiAvatar variant={variant} src={src || user?.profilePic} alt={user?.name} {...props} sx={{ ...sx }} />
          {editable === true && (
            <IconButton
              size="large"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                // color: theme.palette.primary.main,
                opacity: 0,
                ":hover": {
                  background: "rgba(0,0,0,.4)",
                  opacity: 1
                }
              }}
              component={"label"}
            >
              <AddAPhoto />
              <input
                type="file"
                accept="image/*"
                name="upload-image"
                id="upload-image"
                hidden
                onChange={onChange}
              />
            </IconButton>
          )}
        </StyledBadge>
      )}
    </Box>
  );
};

export default Avatar;

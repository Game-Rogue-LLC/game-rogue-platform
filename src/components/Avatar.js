import { Badge, Box, Avatar as MuiAvatar, styled } from "@mui/material";

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

const Avatar = ({ variant, user, src, alt, sx, size, hideStatus, status, ...props }) => {
  const router = useRouter();
  const { player } = useTournamentContext();

  if (hideStatus === true) {
    return (
      <Box
        onClick={() => {
          router.push("/user/" + user.id);
        }}
        sx={{
          cursor: "pointer"
        }}
      >
        <MuiAvatar
          variant={variant}
          src={user?.profilePic}
          alt={user?.name}
          sx={{ ...sx }}
          {...props}
        />
      </Box>
    );
  }

  return (
    <Box
      onClick={() => {
        router.push("/user/" + user.id);
      }}
      sx={{
        cursor: "pointer"
      }}
    >
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
        <MuiAvatar
          variant={variant}
          src={user?.profilePic}
          alt={user?.name}
          sx={{ ...sx }}
          {...props}
        />
      </StyledBadge>
    </Box>
  );
};

export default Avatar;

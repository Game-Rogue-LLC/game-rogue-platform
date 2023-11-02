import { ButtonBase, SvgIcon, Typography } from "@mui/material";

export default function TemplateTool({ onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: 66,
        height: 66,
        cursor: "pointer",
        borderRadius: 1,
        flexDirection: "column",
        alignItems: "center",
        ":hover": { backgroundColor: "rgba(255,255,255,.2)" }
      }}
    >
      <SvgIcon>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M14 3.37052C14 2.98462 14.4186 2.74419 14.7519 2.93863L19.7519 5.8553C19.9055 5.9449 20 6.10935 20 6.28719V17.7128C20 17.8906 19.9055 18.0551 19.7519 18.1447L14.7519 21.0614C14.4186 21.2558 14 21.0154 14 20.6295V3.37052Z"
            fill="currentColor"
            fillOpacity="0.9"
          ></path>
          <path opacity="0.75" d="M9.5 3H11V21H9.5V3Z" fill="currentColor" fillOpacity="0.9"></path>
          <path opacity="0.75" d="M5 3L6.5 3V21H5V3Z" fill="currentColor" fillOpacity="0.9"></path>
        </svg>
      </SvgIcon>
      <Typography variant="body2">Template</Typography>
    </ButtonBase>
  );
}

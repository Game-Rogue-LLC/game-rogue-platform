import { ButtonBase, SvgIcon, Typography } from "@mui/material";

export default function CategoryTool({ onClick }) {
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
            opacity="0.75"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.25 4.5H12.75C13.1642 4.5 13.5 4.83579 13.5 5.25V6.03363C13.747 6.01137 13.9972 6 14.25 6C14.5028 6 14.753 6.01137 15 6.03363V5.25C15 4.00736 13.9926 3 12.75 3H5.25C4.00736 3 3 4.00736 3 5.25V12.75C3 13.9926 4.00736 15 5.25 15H6.03363C6.01137 14.753 6 14.5028 6 14.25C6 13.9972 6.01137 13.747 6.03363 13.5H5.25C4.83579 13.5 4.5 13.1642 4.5 12.75V5.25C4.5 4.83579 4.83579 4.5 5.25 4.5Z"
            fill="currentColor"
            fillOpacity="0.9"
          ></path>
          <circle
            cx="14.25"
            cy="14.25"
            r="6"
            stroke="currentColor"
            strokeOpacity="0.9"
            strokeWidth="1.5"
          ></circle>
        </svg>
      </SvgIcon>
      <Typography variant="body2">Category</Typography>
    </ButtonBase>
  );
}

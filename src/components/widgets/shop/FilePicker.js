import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      {file === "" ? (
        <div>
          {/* <p className="my-2 text-center font-semibold text-gray-800 text-sm">
            Select an image :
          </p> */}
          {/* <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{display: 'none'}}
          /> */}
          {/* <label
            className="mx-auto filepicker-label bg-white/70 "
            htmlFor="file-upload"
          >
            Upload Image
          </label> */}
          <Button variant="contained" component="label" sx={{ width: "160px", fontWeight: 600 }}>
            <input
              type="file"
              accept="image/*"
              name="upload-banner"
              id="upload-banner"
              hidden
              onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
            />
            Upload Logo
          </Button>
        </div>
      ) : (
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img className="logo-img" src={file} />
          </Box>
          {/* <p className="mb-2 text-center font-semibold text-gray-800 text-sm">
            Apply as :
          </p> */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            <Button variant="contained" sx={{ fontWeight: 600 }} onClick={() => readFile("logo")}>
              Apply
            </Button>
            <Button variant="contained" sx={{ fontWeight: 600 }} onClick={() => setFile("")}>
              Reset
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default FilePicker;

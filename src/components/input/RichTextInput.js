import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const RichTextInput = ({ content, handleContentChange, sx, className, placeholder }) => {
  return (
    <>
      {ReactQuill && (
        <ReactQuill
          theme="snow"
          value={content}
          placeholder={placeholder ? placeholder : ""}
          onChange={handleContentChange}
          className={className || ""}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
              ["link", "image"],
              ["clean"]
            ]
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image"
          ]}
          style={{ position: "relative", color: "white", ...sx }}
        />
      )}
    </>
  );
};

export default RichTextInput;

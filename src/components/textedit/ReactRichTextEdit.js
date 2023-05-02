import dynamic from "next/dynamic";
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
const ReactQuill = dynamic(() => import('react-quill'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const ReactRichTextEdit = ({ content, handleContentChange, sx }) => {
  return (
    <>
      {ReactQuill && <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        modules={{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
          ],
        }}
        formats={[
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image'
        ]}
        style={sx ? sx : {}}
      />}
    </>
  )
}

export default ReactRichTextEdit;
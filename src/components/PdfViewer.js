import { Viewer, Worker } from "@react-pdf-viewer/core";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const PdfViewer = ({ src }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.js">
      <div style={{ height: "750px" }}>
        <Viewer fileUrl={src} plugins={[defaultLayoutPluginInstance]} />
      </div>
    </Worker>
  );
};

export default PdfViewer;
import PdfViewer from "@/src/components/PdfViewer";

export default function Policies({item}) {
  return (
    <PdfViewer src={item?.privacy} />
  )
}
// import { jsPDF } from "jspdf";
"use client"
import { jsPDF,HTMLOptionImage } from "jspdf";
// import { toPng,toCanvas } from "html-to-image";

// Default export is a4 paper, portrait, using millimeters for units

export default function page() {
  const doc = new jsPDF();
  
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
  return (
    <div>page generate pdf</div>
  )
}

import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import { AlertStyled } from "../theme/alert";


 const converasPdf = async (componentRef) => {
    try {
        const canvas = await html2canvas(componentRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Reports-${new Date().getTime()}.pdf`);
        {<AlertStyled severity="success">Report exported successfully</AlertStyled>}
      } catch (error) {
        console.error('Error exporting component as PDF:', error);
      }
}

export default converasPdf;
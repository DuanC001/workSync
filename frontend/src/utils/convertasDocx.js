import { Document, Packer, Paragraph, Media } from 'docx';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const convertasDocx = async (componentRef) => {
    const doc = new Document();
    const imageBlob = base64ToBlob(imgData, 'image/png');

    const arrayBuffer = await imageBlob.arrayBuffer();
    const image = Media.addImage(doc, arrayBuffer, 200, 200);

    doc.addSection({
        children: [new Paragraph(image)],
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `Report-${new Date().getTime()}.docx`);
    });
};

export default convertasDocx;

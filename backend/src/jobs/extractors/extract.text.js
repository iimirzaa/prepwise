import path from "path";
import mammoth from "mammoth";
import WordExtractor from "word-extractor";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const extractText = async (file) => {

  try {
    if (!file) {
      throw new Error("No file provided");
    }

   

    const extension = path
      .extname(file.originalname || "")
      .toLowerCase();

   

    let text = "";

    if (extension === ".pdf") {
   
      const uint8Array = new Uint8Array(file.buffer);

      const pdf = await pdfjsLib.getDocument({
        data: uint8Array,
      }).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        text +=
          content.items
            .map((item) => item.str)
            .join(" ") + "\n";
      }
    }

    else if (extension === ".docx") {
 

      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      text = result.value;
    }

    else if (extension === ".doc") {
     

      throw new Error(
        "DOC extraction requires temporary file handling"
      );
    }

    else {
      throw new Error(
        `Unsupported file extension: ${extension || "unknown"}`
      );
    }

    return text.trim();

  } catch (error) {
   
    throw error;
  }
};

export default extractText;
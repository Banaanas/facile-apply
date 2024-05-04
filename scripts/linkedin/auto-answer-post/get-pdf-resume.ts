import { readFile } from "fs/promises";
import path from "path";

export const getPdfResume = async () => {
  const resumePath = path.join(
    process.cwd(),
    "private/assets/Cyril - Resume - EN.pdf",
  );

  try {
    const resumeBuffer = await readFile(resumePath);
    return resumeBuffer;
  } catch (error) {
    console.error("Failed to read the resume .pdf file:", error);
    throw error;
  }
};

import fs from "fs";

export const getImageExtensionFromBase64 = (base64String) => {
  // Extract the MIME type from the base64 string
  const mimeType = base64String.match(/^data:image\/([a-zA-Z0-9]+);base64,/)[1];

  // Map the MIME type to the corresponding file extension
  switch (mimeType) {
    case "jpeg":
    case "jpg":
      return "jpg";
    case "png":
      return "png";
    default:
      return null; // Invalid or unsupported image format
  }
};

export const base64ToImage = (base64String, imageName, outputPath) => {
  const imageExtension = getImageExtensionFromBase64(base64String);
  if (!imageExtension) return null;
  // Extract the base64 data
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

  // Create a buffer from the base64 data
  const imageBuffer = Buffer.from(base64Data, "base64");

  // Write the buffer to a file
  try {
    fs.writeFileSync(
      `${outputPath}${imageName}.${imageExtension}`,
      imageBuffer
    );
    return `${imageName}.${imageExtension}`;
  } catch (err) {
    console.log(err, "error in image saving");
    return null;
  }
};

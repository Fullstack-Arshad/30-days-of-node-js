const { extname } = require("path");

function checkFileExtension(filePath, expectedExtension) {
  const actualExtension = extname(filePath).toLowerCase();
  const expectedExtensionLower = expectedExtension.toLowerCase();

  if (actualExtension === expectedExtensionLower) {
    console.log(
      `File has the expected extension:  ${expectedExtension}`
    );
  } else {
    console.log(
      `File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualExtension}`
    );
  }
}

checkFileExtension('test-files/file1.txt', '.txt');
// Expected Output: File has the expected extension: .txt

checkFileExtension('test-files/image.png', '.jpg');
// Expected Output: File does not have the expected extension. Expected: .jpg, Actual: .png

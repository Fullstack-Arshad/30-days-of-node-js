const path = require('path');

function resolvePath(relativePath) {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, relativePath);
  console.log(`Resolved Path: ${absolutePath}`);
}

resolvePath('../project/folder/file.txt');
resolvePath('nonexistent-folder/file.txt');

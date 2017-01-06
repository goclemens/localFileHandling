function getFileName(filePath) {
  return filePath.split('/').pop();
}

export { getFileName };
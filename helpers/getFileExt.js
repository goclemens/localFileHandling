function getFileExt(filePath) {
  return filePath.substr((~-filePath.lastIndexOf(".") >>> 0) + 2); 
}

export { getFileExt };
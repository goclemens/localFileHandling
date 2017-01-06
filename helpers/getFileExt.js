function getFileExt(filePath) {
  return filePath.substr((~-fname.lastIndexOf(".") >>> 0) + 2); 
}

export { getFileExt };
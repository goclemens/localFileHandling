// handle Orthoload files

import { asciiFileLoader } from '../loaders/asciiFileLoader.js';
import { parseEOF } from '../parser/parseEOF.js';

function handleEOF (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){
    var fileData = parseEOF(data);
    cFunc(fileData);
  });  

}

export { handleEOF };
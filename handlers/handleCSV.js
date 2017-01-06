import { asciiFileLoader } from '../loaders/asciiFileLoader.js';
import { parseCSV } from '../parser/parseCSV';

function handleCSV (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){
    var jsObject = parseCSV(data);
    cFunc(jsObject);
  });  

}

export { handleCSV };
import { asciiFileLoader } from '../loaders/asciiFileLoader.js';
import { parseJSON } from '../parser/parseJSON';

function handleJSON (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){
    var jsonObject = parseJSON(data);
    cFunc(jsonObject);
  });  

}

export { handleJSON };
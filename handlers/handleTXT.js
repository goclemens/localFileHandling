import { asciiFileLoader } from '../loaders/asciiFileLoader.js';

function handleTXT (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){
    cFunc(data);
  });  

}

export { handleTXT };
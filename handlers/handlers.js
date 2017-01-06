import { handleTXT as handleTXT } from './handleTXT.js';
import { handleJSON as handleJSON }  from './handleJSON.js';
import { handleCSV as handleCSV }  from './handleCSV.js';

var handlers = {};

handlers.ext =  { "txt"  : "handleTXT",
                  "json" : "handleJSON",
                  "csv" : "handleCSV" 
                };

handlers.handleTXT = handleTXT;
handlers.handleJSON = handleJSON;
handlers.handleCSV = handleCSV;

export { handlers };
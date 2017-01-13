import { handleTXT } from './handleTXT.js';
import { handleJSON }  from './handleJSON.js';
import { handleCSV }  from './handleCSV.js';
import { handleEOF } from './handleEOF.js';

var handlers = {};

handlers.ext =  { "txt"  : "handleTXT",
                  "json" : "handleJSON",
                  "csv" : "handleCSV",
                  "eof" : "handleEOF",
                  "iof" : "handleEOF",
                  "akf" : "handleEOF"
                };

handlers.handleTXT = handleTXT;
handlers.handleJSON = handleJSON;
handlers.handleCSV = handleCSV;
handlers.handleEOF = handleEOF;

export { handlers };
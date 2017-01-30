import { handleTXT } from './handleTXT.js';
import { handleJSON }  from './handleJSON.js';
import { handleCSV }  from './handleCSV.js';
import { handleEOF } from './handleEOF.js';
import { handleAKF } from './handleAKF.js';

var handlers = {};

handlers.ext =  { "txt"  : "handleTXT",
                  "json" : "handleJSON",
                  "csv" : "handleCSV",
                  "eof" : "handleEOF",
                  "iof" : "handleEOF",
                  "akf" : "handleAKF"
                };

handlers.handleTXT = handleTXT;
handlers.handleJSON = handleJSON;
handlers.handleCSV = handleCSV;
handlers.handleEOF = handleEOF;
handlers.handleAKF = handleAKF;

export { handlers };
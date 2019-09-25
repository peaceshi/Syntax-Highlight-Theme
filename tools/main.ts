import file = require("./file")
import JSONC = require("./parser");

const tmFilePath = file.mainPath.rootPath.concat("/templates/*.json");
//const file_0 = fs.readFileSync(mainPath.rootPath.concat("/templates/cpp.tmLanguage.json"), 'utf-8');

file.fetchFiles()
JSONC.parser(tmFilePath);
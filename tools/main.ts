import file = require("./std/file");
import JSONC = require("./parser");

const tmFilePath = file.mainPath.root.concat("/templates/*.json");
//const file_0 = fs.readFileSync(mainPath.rootPath.concat("/templates/cpp.tmLanguage.json"), 'utf-8');

let parser = (tmFilePath: string) => {
	return new Promise(resolve => 
		setTimeout(() => (resolve(), JSONC.parser(tmFilePath)), 1000)).catch(console.error);
}
(async () => {
	console.log('== START ==');
	await file.fetchFiles();
	await parser(tmFilePath).then(() => setTimeout(() => console.log('== END =='), 1000));
})().catch(console.error)



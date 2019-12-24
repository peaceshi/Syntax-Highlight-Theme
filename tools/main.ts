import * as file from "./std/file";
import * as JSONC from "./parser";

const tmFilePath = file.mainPath.root.concat("/templates/*.json");
//const file_0 = fs.readFileSync(mainPath.rootPath.concat("/templates/cpp.tmLanguage.json"), 'utf-8');
const timeOut: number = 1000;

const parser = (tmFilePath: string) => {
	return new Promise(resolve =>
		setTimeout(() => (resolve(), JSONC.parser(tmFilePath)), timeOut)).catch(console.error);
}
(async () => {
	console.log('== START ==');
	await file.fetchFiles();
	await parser(tmFilePath).then(() => setTimeout(() => console.log('== END =='), timeOut));
})().catch(console.error)
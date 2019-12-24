import * as fs from "fs-extra";
import * as path from "path";

const set = new Set<string[]>();

let dataSet = (dataSet: Set<any>) => {
	console.log(dataSet);
	//let array = new Array<any>();
	dataSet.forEach(data => {
		const scopeRootName: string = data[0];
		let scopeLength: number = data.length;
		console.log("rootName:" + scopeRootName, "length:" + scopeLength);
	});
};

const readStream = (fileName: string) => {
	let readStream = fs.createReadStream(fileName, {
		encoding: "utf8",
		autoClose: true
	});
	(async () => {
		for await (const chunk of readStream) {
			chunk.split(",").forEach((element: string) => {
				if (element.includes(".") && !element.includes(".NET")) {
					//console.log(element);
					set.add(element.split("."));
				}
			});
		}
		console.log(set);
		dataSet(set);
	})();
};
readStream(path.normalize(__dirname.concat("/../language_tags/scopes.txt")));

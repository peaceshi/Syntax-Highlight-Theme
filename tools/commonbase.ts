import * as fs from "fs-extra";
import * as file from "./std/file";

const set = new Set<any>();

let dataSet = (dataSet: Set<any>) => {
	console.log(dataSet);
	//let array = new Array<any>();
	dataSet.forEach(data => {
		const scopeRootName: string = data[0];
		let scopeLength: number = data.length;
		console.log("rootName:" + scopeRootName, "length:" + scopeLength);
	});
};

const readStream = (fileName: fs.PathLike) => {
	let readStream = fs.createReadStream(fileName, {
		encoding: "utf8",
		autoClose: true
	});
	(async () => {
		for await (const chunk of readStream) {
			chunk.split(",").forEach((element: string) => {
				if (element.includes(".") && !element.includes(".NET")) {
					let str = element.match(/[a-z-0-9-A-Z-]+(\.[a-z-0-9-A-Z-]+)/);
					//console.log(str[0]);
					if (typeof str !== "string") {
						//console.log(str[0]);
						set.add(str[0]);
					}
				}
			});
		}
		console.log(set);
		dataSet(set);
	})();
};
const scopePath = file.mainPath.root.concat("/language_tags/scopes.txt");
readStream(scopePath);

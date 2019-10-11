/**
 * https://github.com/microsoft/node-jsonc-parser
 */
import jsonc = require("jsonc-parser");
import glob = require("glob");
import fs = require("fs-extra");
import std = require("./file");
import path = require("path");

let set = new Set<string>();
let tempSet = new Set<string>();

let addSet = (value: string) => {
	if (value.indexOf(" ")) {
		value.split(" ").forEach(key => {
			set.add(key);
			tempSet.add(key);
		});
	} else {
		set.add(value);
		tempSet.add(value);
	}
}
async function parse(file: string) {
	const json = jsonc.stripComments(file);
	await JSON.parse(json, (key, value) => {
		if (typeof key == "string") {
			if (key == "name") {
				addSet(value);
			}
		}
	});
}
/**
 * parser
 * @param path the json files path
 */
export let parser = (filePath: string) => {
	glob(filePath, function (err, files) {
		if (!err) {
			files.forEach(async (file) => {
				parse(fs.readFileSync(file, 'utf-8'));
				let basename = path.basename(file, "json");
				std.writeStream(std.mainPath.rootPath.concat("/language_tags/" + basename + "txt"), (Array.from(tempSet).sort()).toString());
				tempSet.clear();
			});
			console.log("scope amount:" + set.size);
			std.writeStream(std.mainPath.rootPath.concat("/language_tags/scopes.txt"), (Array.from(set).sort()).toString())
		} else {
			console.log(err);
		}
	})
}
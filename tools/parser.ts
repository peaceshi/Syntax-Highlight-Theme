/**
 * https://github.com/microsoft/node-jsonc-parser
 */
import jsonc = require("jsonc-parser");
import std = require("./std");

/**
 * parse
 * @param file the json file
 * @param type 0 is theme file, 1 is tmLanguage file.
 */
export
let parser = (file: string, type: number) => {
	let deque = new std.Deque<any>();
	let array = new Array<string>();
	let set = new Set<string>();

	let onlyScope: boolean = false;
	let is_tmLanguage: boolean = false;
	let tmFlag: boolean = false;

	let jsonTree = jsonc.parseTree(file);

	switch (type) {
		case 0:
			onlyScope = false; //must be false
			break;
		case 1:
			is_tmLanguage = true;
			break;
	}
	/**
	 * use ES6 "Set()" to remove duplicates
	 */
	let addSet = (value: string) => {
		if (value.indexOf(" ")) {
			value.split(" ").forEach(key => {
				set.add(key);
			});
		} else {
			set.add(value);
		}
	}
	/**
	* nodeTraversal
	* @param node jsonNode
	* @param insertPosition make sure the json document structure output correctly.
	* 
	* insertPosition = true : push_front;
	* 
	* insertPosition = false : push_back;
	*/
	let nodeTraversal = (node: jsonc.Node, insertPosition: boolean) => {
		if (!(typeof (node) == "undefined")) {
			if (node.type == "string") {
				if (onlyScope || tmFlag) {
					addSet(node.value);
					tmFlag = false;
				}
			}
			else {
				node.children.forEach(node => {
					if (node.value == "scope") {
						onlyScope = true;
					}
					if (node.value == "settings") {
						onlyScope = false;
					}
					if (tmFlag) {
						addSet(node.value);
						tmFlag = false;
					}
					if (is_tmLanguage && node.value == "name") {
						tmFlag = true;
					}
					if (node.type == "object") {
						deque.push_front(node);
						nodeTraversal(deque.pop_front(), true);
					}
					else if (node.type == "array") {
						node.children.reverse().forEach(node => {
							deque.push_front(node);
						});
					}
					else {
						if (insertPosition) {
							deque.push_front(node);
						} else {
							deque.push_back(node);
						}
					}
				}
				);
			}
		}
		while (!deque.empty()) {
			nodeTraversal(deque.pop_front(), false);
		}
	}
	nodeTraversal(jsonTree, false);

	array = Array.from(set).sort();

	return array;
}
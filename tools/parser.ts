/**
 * https://github.com/microsoft/node-jsonc-parser
 */
import jsonc = require("jsonc-parser");
import fs = require("fs");
import path = require("path");
import std = require("./std");
/**
 * "../tools"
 */
const rootPath = path.normalize(__dirname.concat("/.."));
const file = fs.readFileSync(rootPath.concat("/themes/syntax-material-dark-color-theme.json"), 'utf-8');

let jsonTree = jsonc.parseTree(file);

let deque = new std.Deque<any>();

/**
 *  set onlyScope only output Scope
 */
let onlyScope: boolean = false;
/**
 * 
 * @param node jsonNode
 * @param insertPosition make sure the json document structure output correctly.
 */
let nodeTraversal = (node: jsonc.Node, insertPosition: boolean) => {
	if (!(typeof (node) == "undefined")) {
		if (node.type == "string") {
			if (onlyScope) {
				console.log(node.value);
			}
		}
		else {
			node.children.forEach(node => {
				if (node.type == "string") {
					if (!onlyScope) {
					//	console.log(node.value);
					}
				}
				if (node.value == "scope") {
					onlyScope = true;
				}
				if (node.value == "settings") {
					onlyScope = false;
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
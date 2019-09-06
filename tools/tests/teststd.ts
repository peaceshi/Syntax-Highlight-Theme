import std = require("../std");

/**
 * testQueue 
 */
let testQueue = (Queue: std.Queue<any>, funcname: string, wanted: string) => {
	console.log("start testing Queue." + funcname);
	console.log("wanted result: " + wanted);
	if (Queue.empty()) {
		console.log("Queue is empty.");
	}
	while (!Queue.empty()) {
		console.log(Queue.pop());
	}
	console.log("Queue." + funcname + " test end.");
	console.log("");
}
/**
 * testStack
 */
let testStack = (Stack: std.Stack<any>, funcname: string, wanted: string) => {
	console.log("start testing Stack." + funcname);
	console.log("wanted result: " + wanted);
	if (Stack.empty()) {
		console.log("Stack is empty.");
	}
	while (!Stack.empty()) {
		console.log(Stack.pop());
	}
	console.log("Stack." + funcname + " test end.");
	console.log("");
}

let testDeque= (Deque: std.Deque<any>, funcname: string, wanted: string) => {
	console.log("start testing Deque." + funcname);
	console.log("wanted result: " + wanted);
	if (Deque.empty()) {
		console.log("Deque is empty.");
	}
	while (!Deque.empty()) {
		console.log(Deque.pop_front());
	}
	console.log("Deque." + funcname + " test end.");
	console.log("");
}

let test1 = new std.Queue(1, "A", 2, "b", "c", 3);
let test2 = new std.Queue();

test1.clear();
testQueue(test1, "clean", "");

test2.emplace(test2, 6, "f", 7, "g");
testQueue(test2, "emplace", "6f7g");

test1.emplace(test1, 4, "d", "e", 5);

let test4 = new std.Stack();
test4.emplace(test4, 123123, "AS",123, "bc")
testStack(test4, "emplace", "bc 123 AS 123123");

let test5 = new std.Deque();
let test6 = new std.Deque("bc" ,123 ,"AS", "123123");

test5.assign(4,"s");
testDeque(test5,"assign","s s s s");

test6.emplace(2,6,"as");
testDeque(test6,"emplace","bc 123 6 as AS 123123");

test6.emplace(0,"bc" ,123 ,"AS", "123123");
test6.insert(1,"kkk");
testDeque(test6,"insert","bc kkk 123 AS 123123");

test6.emplace_back("bc" ,123 ,"AS", "123123");
test6.erase(2,1);
testDeque(test6,"erase","bc 123 123123");
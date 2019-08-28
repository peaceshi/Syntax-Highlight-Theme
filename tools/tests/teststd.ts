import std = require("../std")

/**
 * initQueue
 */
function initQueue(...elements: Array<any>) {
	console.log("starting init a new Queue");
	let newQueue = new std.Queue<any>();
	elements.forEach((element) => newQueue.push(element));
	console.log("size: " + newQueue.size());
	console.log("front: " + newQueue.front());
	console.log("back: " + newQueue.back());
	console.log("");
	return newQueue;
}
/**
 * testQueue 
 */
let testQueue = (Queue: std.Queue<any>, funcname: string,wanted:string) => {
	console.log("start testing Queue." + funcname);
	console.log("wanted result: " + wanted);
	if(Queue.empty()){
		console.log("Queue is empty.")
	}
	while (!Queue.empty()) {
		console.log(Queue.pop());
	}
	console.log("Queue."+funcname + " test end.");
	console.log("");
}

let test1 = initQueue( 1, "A", 2, "b", "c", 3);
let test2 = initQueue();

test1.clean();
testQueue(test1,"clean","");

test2.emplace(test2, 6, "f", 7, "g");
testQueue(test2,"emplace","6f7g");

test1.emplace(test1,4, "d", "e", 5);


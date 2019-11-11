/**
 *  TypeScript standard library (C++ design)
 * 
 *  Author : PeaceShi
 * 
 *  design by C++, but code not cpp-like.
 */

/**
 * std.Stack()
 * 
 * base Stack implement used Array.
 *
 * design by https://en.cppreference.com/w/cpp/container/stack
 */
export class Stack<T>{
	protected element: T[] = null;
	public constructor() {
		this.element = new Array<T>();
	}
	/**
	 * checks whether the underlying container is empty
	 */
	public empty = () => this.element.length == 0;
	/**
	 * returns the number of element
	 */
	public size = () => this.element.length;
	/**
	 * inserts element at the end
	 */
	public push = (element: any) => this.element.push(element);
	/**
	 * removes the first element
	 * 
	 * make sure it is FILO
	 */
	public pop = () => this.element.pop();
	/**
	 * constructs element in-place at the end
	 */
	public emplace = (Stack: Stack<T>, ...elements: any[]) => elements.forEach((element) => Stack.push(element));
	/**
	 * delete all elements
	 */
	public clean = () => { this.element = [] };
	/**
	 * swaps the contents
	 */
	//public swap = (source: Stack<T>, dist: Stack<T>) => {};
}
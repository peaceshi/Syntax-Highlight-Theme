/**
 *  TypeScript standard library (C++ design)
 * 
 *  Author : PeaceShi
 * 
 *  design by C++, but code not cpp-like.
 */

/**
 * std.deque()
 * 
 * double-ended queue implement used Array.
 *
 * design by https://en.cppreference.com/w/cpp/container/deque
 */
export class Deque<T>{
	protected element: T[] = null;
	public constructor() {
		this.element = new Array<T>();
	}
	/**
	 * assigns values to the container
	 */
	public assign = (counts: number, element: any) => {
		this.element = [];
		for (let index = 0; index < counts; index++) {
			this.element.push(element);
		}
	}
	/**
 	* access specified element, from one
 	*/
	public at = (pos: number) => this.element[pos - 1];
	/**
	 * access the first element
	 */
	public front = () => this.element[0];
	/**
	 * access the last element
	 */
	public back = () => this.element[this.element.length - 1];
	/**
	 * checks whether the underlying container is empty
	 */
	public empty = () => this.element.length == 0;
	/**
	 * returns the number of element
	 */
	public size = () => this.element.length;
	/**
	 * clears the contents
	 */
	public clear = () => { this.element = [] };
	/**
	 * inserts a element, zero-based
	 */
	public insert = (pos: number, element: any) => this.element.splice(pos, 0, element);
	/**
	 * constructs element in-place 
	 */
	public emplace = (pos: number, ...elements: any[]) => {
		let length = this.element.length;
		let front = this.element.slice(0, pos).concat(elements);
		let back = this.element.slice(pos, length);
		this.element = front.concat(back);
	};
	/**
	 * erases elements from pos 
	 */
	public erase = (pos: number, counts?: number) => this.element.splice(pos, counts);
	/**
	 * adds an element to the end
	 */
	public push_back = (element: any) => this.element.push(element);
	/**
	 * constructs an element in-place at the end
	 */
	public emplace_back = (...elements: any[]) => {
		elements.forEach((element) =>this.element.push(element));
	}
	/**
	 * removes the last element
	 */
	public pop_back = () => this.element.pop();
	/**
	 * inserts an element to the beginning
	 */
	public push_front = (element: any) => this.element.unshift(element);
	/**
	 * constructs an element in-place at the beginning
	 */
	public emplace_front = (...elements: any[]) => {
		elements.forEach((element) => this.element.unshift(element))
	}
	/**
	 * removes the first element
	 */
	public pop_front = () => this.element.shift();
}
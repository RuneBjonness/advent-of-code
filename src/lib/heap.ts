type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> implements Iterable<T> {
  data: Array<T> = [];
  readonly compare: Comparator<T>;

  constructor(compareFunc: Comparator<T> = Heap.minComparator) {
    this.compare = compareFunc;
  }

  *[Symbol.iterator](): Iterator<T> {
    while (this.size > 0) {
      yield this.pop() as T;
    }
  }

  static minComparator<N>(a: N, b: N): number {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }

  static maxComparator<N>(a: N, b: N): number {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  }

  static getParentIndex(index: number): number {
    if (index <= 0) {
      return -1;
    }
    return Math.floor((index - 1) / 2);
  }

  static getChildrenIndices(index: number): [number, number] {
    return [2 * index + 1, 2 * index + 2];
  }

  init(array?: Array<T>): void {
    if (array) {
      this.data = [...array];
    }
    for (let i = Heap.getParentIndex(this.size - 1); i >= 0; --i) {
      this.bubbleDown(i);
    }
  }

  get size(): number {
    return this.data.length;
  }

  push(item: T): void {
    this.data.push(item);
    this.bubbleUp(this.size - 1);
  }

  peek(): T | undefined {
    return this.data[0];
  }

  pop(): T | undefined {
    const last = this.data.pop();
    if (this.size > 0 && last !== undefined) {
      return this.replace(last);
    }
    return last;
  }

  replace(item: T): T {
    const root = this.data[0];
    this.data[0] = item;
    this.bubbleDown(0);
    return root;
  }

  clone(): Heap<T> {
    const cloned = new Heap<T>(this.compare);
    cloned.data = [...this.data];
    return cloned;
  }

  top(n = 1): Array<T> {
    if (n >= this.data.length) {
      return [...this.data];
    } else {
      const result: Array<T> = [];
      const tempHeap = this.clone();
      for (let i = 0; i < n; i++) {
        const item = tempHeap.pop() as T;
        result.push(item);
      }
      return result;
    }
  }

  private bubbleUp(index: number): void {
    const value = this.data[index];
    const fromIndex = index;

    while (index > 0) {
      const parentIndex = Heap.getParentIndex(index);
      if (this.compare(value, this.data[parentIndex]) < 0) {
        this.data[index] = this.data[parentIndex];
        index = parentIndex;
      } else {
        break;
      }
    }
    if (index !== fromIndex) {
      this.data[index] = value;
    }
  }

  private bubbleDown(index: number): void {
    const fromIndex = index;
    const value = this.data[index];
    let aIndex = 2 * index + 1;

    while (aIndex < this.size) {
      const bIndex = aIndex + 1;
      const bestIndex =
        bIndex >= this.size ||
        this.compare(this.data[aIndex], this.data[bIndex]) < 0
          ? aIndex
          : bIndex;

      if (this.compare(this.data[bestIndex], value) < 0) {
        this.data[index] = this.data[bestIndex];
        index = bestIndex;
        aIndex = 2 * index + 1;
      } else {
        break;
      }
    }
    if (index !== fromIndex) {
      this.data[index] = value;
    }
  }
}

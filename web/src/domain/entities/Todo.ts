export class Todo {
  constructor(
    readonly description: string,
    readonly done: boolean = false,
    readonly id?: string
  ) {
    if (!id) {
      this.id = Math.random().toString(36).slice(2, 7);
    }
  }
}

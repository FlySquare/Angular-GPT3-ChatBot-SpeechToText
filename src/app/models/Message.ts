export class Message {
  message: string;
  messageAuthor: string;
  date: string;

  prepare(input?:any) {
    Object.assign(this, input);
    return this;
  }
}

import {Answer} from "./Answer";
export class Message {
  message: string;
  messageAuthor: string;
  answer: Answer;
  date: string;

  prepare(input?:any) {
    Object.assign(this, input);
    if (input.answer) this.answer = new Answer().prepare(input.answer);
    return this;
  }
}

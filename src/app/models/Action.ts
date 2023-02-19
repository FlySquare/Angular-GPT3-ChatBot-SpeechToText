export class Action{
  name: string;
  text: string;
  icon: string;
  answer: string;
  aiStop: boolean;
  prepare(input?:any){
    Object.assign(this, input);
    return this;
  }
}

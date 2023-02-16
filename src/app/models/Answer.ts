export class Answer{
  status: boolean;
  time: number;
  content: string;

  prepare(input?:any){
    Object.assign(this, input);
    return this;
  }
}

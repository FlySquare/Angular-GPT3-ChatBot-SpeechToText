export class Answer{
  status: number;
  date: number;
  content: string;
  requestTime: number;
  askedQuery:string;

  prepare(input?:any){
    Object.assign(this, input);
    return this;
  }
}

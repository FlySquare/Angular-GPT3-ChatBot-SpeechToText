import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Answer} from "../models/Answer";
import {Response} from "../models/Response";
import {Action} from "../models/Action";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  aiResponseText = new BehaviorSubject(null);
  public chatActions: Action[] = [
    {
      name: 'cargo',
      aiStop: true,
      text: 'Kargom Nerede?',
      icon: 'fa fa-person',
      answer: 'Kargonuzu sorgulamam için lütfen kargo numaranızı yazınız.'
    }
  ].map((action) => new Action().prepare(action));

  constructor(
    private apiService: ApiService
  ) {}

  updateAiResponseText(text: string) {
    this.aiResponseText.next(text);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getAnswer(query: string, isAvatar = false): Observable<Answer> {
    if (query !== '') {
      return this.apiService.post('getAnswer', {query}).pipe(
        map((response: Response) => {
          let data = new Answer().prepare(response.data);
          if (isAvatar) {
            this.updateAiResponseText(data.content);
          }
          return data;
        })
      );
    } else {
      return new Observable<Answer>();
    }
  }

}

import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Answer} from "../models/Answer";
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  aiResponseText = new BehaviorSubject(null);
  constructor(
    private apiService: ApiService,
  ) {}

  updateAiResponseText(text: string) {
    this.aiResponseText.next(text);
  }

  getAnswer(query: string, isAvatar= false): Observable<Answer> {
    return this.apiService.post('getAnswer',{query}).pipe(
      map((response: Response) =>{
        let data = new Answer().prepare(response.data);
        if (isAvatar) {
          this.updateAiResponseText(data.content);
        }
        return data;
      })
    );
  }

}

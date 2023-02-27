import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Answer} from "../models/Answer";
import {Response} from "../models/Response";
import {MetaApiService} from "./metaApi.service";
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class PythonGlobalService {
  constructor(
    private metaApiService: MetaApiService,
    private globalService: GlobalService,
  ) {
  }

  getAnswer(query: string, isAvatar = false): Observable<Answer> {
    if (query !== '') {
      return this.metaApiService.get('getAnswer?query=' + query).pipe(
        map((response: Response) => {
          let data = new Answer().prepare(response.data);
          if (isAvatar && data.content !== 'undefined') {
            this.globalService.updateAiResponseText(data.content);
          }
          return data;
        })
      );
    }else{
      return new Observable<Answer>();
    }
  }

}

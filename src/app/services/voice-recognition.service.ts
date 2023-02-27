import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  newText = new BehaviorSubject(null);
  canSpeak = new BehaviorSubject(false);

  public text = '';
  tempWords: any;
  transcriptArr: any[] = [];
  confidence_arr: any[] = [];
  isStarted = false;
  isStoppedAutomatically = true;
  constructor() {}

  updateNewText(text: string) {
    this.newText.next(text);
  }
  init() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'tr-TR';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.transcriptArr.push(transcript);
      this.tempWords = transcript;
      console.log(this.transcriptArr);

      this.wordConcat();
      const confidence = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.confidence)
        .join('');
      this.confidence_arr.push(confidence);
    });

    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedAutomatically) {
        this.recognition.stop();
        this.recognition.start();
        this.isStoppedAutomatically = true;
      }
    });
  }

  setCanSpeak(value: boolean) {
    this.canSpeak.next(value);
  }

  start() {
    if (!this.isStarted) {
      this.recognition.start();
      this.isStarted = true;
    }
    return true;
  }
  stop() {
    if (this.isStarted) {
      this.isStoppedAutomatically = false;
      this.recognition.stop();
      this.isStarted = false;
    }
    return false;
  }

  wordConcat() {
    this.text = this.tempWords + '.';
    this.updateNewText(this.text);
    this.tempWords = '';
  }
}

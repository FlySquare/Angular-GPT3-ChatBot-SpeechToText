import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VoiceRecognitionService} from "../../services/voice-recognition.service";
import {GlobalService} from "../../services/global.service";
import {Answer} from "../../models/Answer";
import {Action} from "../../models/Action";
import {Message} from "../../models/Message";
import {PythonGlobalService} from "../../services/pythonGlobal.service";

@Component({
  selector: 'app-avatar-speech',
  templateUrl: './avatar-speech.component.html',
  styleUrls: ['./avatar-speech.component.scss']
})
export class AvatarSpeechComponent implements OnInit, OnDestroy{
  @ViewChild('lastAnswer', {static: true}) lastAnswerElement: ElementRef;
  lastAnswer: string;
  words: string[] = [];
  wordIndex = 0;
  wordSpeed = 200;
  micIsEnabled = false;
  actions: Action[] = [];
  canSpeak = false;
  constructor(
    public service: VoiceRecognitionService,
    private globalService: GlobalService,
    private pythonGlobal: PythonGlobalService
  ) {
    this.service.init();
  }

  ngOnInit() {
    this.service.canSpeak.subscribe((value) => {
      console.log('canSpeak', value);
      this.canSpeak = value;
    });
    this.globalService.aiResponseText.subscribe((value) => {
      if (value) {
        this.lastAnswer = value;
        this.resetTextToAnswer();
        this.textToAnswer();
      }
    });
    this.actions = this.globalService.chatActions;
  }

  resetTextToAnswer() {
    this.words = this.lastAnswer.split(" ");
    this.wordIndex = 0;
    this.lastAnswerElement.nativeElement.innerHTML = "";
  }

  textToAnswer() {
    if (this.wordIndex < this.words.length) {
      this.lastAnswerElement.nativeElement.innerHTML += this.words[this.wordIndex] + " ";
      this.wordIndex++;
      setTimeout(() => this.textToAnswer(), this.wordSpeed);
    }
  }

  ngOnDestroy() {
    this.globalService.updateAiResponseText(null);
  }

  startService() {
    this.globalService.updateAiResponseText(null);
    this.micIsEnabled = this.service.start() === true;
  }

  getAnswer(query:string) {
    this.pythonGlobal.getAnswer(query, true).subscribe((data) => {
      if(data.content === 'undefined'){
        this.globalService.getAnswer(query, true).subscribe((data) => {
          this.service.setCanSpeak(true);
        });
      }else{
        this.service.setCanSpeak(true);
      }
    });
  }

  stopService() {
    this.micIsEnabled = this.service.stop() !== false;
    this.globalService.sleep(300).then(() => {
      this.service.setCanSpeak(false);
      this.getAnswer(this.service.text);
    });
  }
}

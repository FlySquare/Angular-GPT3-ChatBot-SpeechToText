import {Component, OnDestroy, OnInit} from '@angular/core';
import {VoiceRecognitionService} from "../../services/voice-recognition.service";
import {GlobalService} from "../../services/global.service";
import {Answer} from "../../models/Answer";
import {Action} from "../../models/Action";

@Component({
  selector: 'app-avatar-speech',
  templateUrl: './avatar-speech.component.html',
  styleUrls: ['./avatar-speech.component.scss']
})
export class AvatarSpeechComponent implements OnInit, OnDestroy{
  micIsEnabled = false;
  actions: Action[] = [];
  constructor(
    public service: VoiceRecognitionService,
    private globalService: GlobalService
  ) {
    this.service.init();
  }

  ngOnInit() {
    this.actions = this.globalService.chatActions;
  }

  ngOnDestroy() {
    this.globalService.updateAiResponseText(null);
  }

  startService() {
    this.globalService.updateAiResponseText(null);
    this.micIsEnabled = this.service.start() === true;
  }

  stopService() {
    this.micIsEnabled = this.service.stop() !== false;
    this.globalService.getAnswer(this.service.text,true).subscribe();
  }

}

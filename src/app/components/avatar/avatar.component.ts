import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VoiceRecognitionService} from "../../services/voice-recognition.service";
import {GlobalService} from "../../services/global.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  constructor(
    private voiceRecognitionService: VoiceRecognitionService,
    private globalService: GlobalService,
  ) {
  }

  ngOnInit() {
    this.globalService.aiResponseText.subscribe((text: string) => {
      this.createAvatar(text);
    });
  }

  createAvatar(text: string) {
    // @ts-ignore
    SDK.applicationId = environment.applicationId;
    // @ts-ignore
    SDK.body = function() {
      return document.getElementById("img-div")
    }
    // @ts-ignore
    var sdk = new SDKConnection();
    // @ts-ignore
    var web = new WebAvatar();
    web.version = 8.5;
    web.connection = sdk;
    web.avatar = "13974718";
    web.nativeVoiceName = "Microsoft Tolga - Turkish (Turkey)";
    web.nativeVoice = true;
    web.boxLocation = "bottom-left";
    web.width = "330";
    web.createBox();
    const avatar = document.querySelector('#img-div div').shadowRoot;
    const avatarDiv = avatar.getElementById('avatar-avatarbox');
    avatarDiv.style.position = 'unset';
    //@ts-ignore
    avatarDiv.getElementsByClassName('avatar-avatarboxmenu')[0].style.width = 'unset';
    web.addMessage(text, "", "", "");
    web.processMessages();
  }

}


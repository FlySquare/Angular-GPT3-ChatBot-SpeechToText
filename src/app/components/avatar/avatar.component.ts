import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {VoiceRecognitionService} from "../../services/voice-recognition.service";
import {GlobalService} from "../../services/global.service";
import {environment} from "../../../environments/environment";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  loading = true;

  constructor(
    private voiceRecognitionService: VoiceRecognitionService,
    private globalService: GlobalService,
    @Inject(DOCUMENT) private doc: any
  ) {
  }


  ngOnInit() {
    this.setYourScriptTag('vhost', '', '//AC_VHost_Embed(' + environment.q1 + ',800,1000,"",1,0,' + environment.q2 + ',0,1,0,"' + environment.q3 + '",0,1);');
    this.setYourScriptTag('oddcast', 'https://vhss-d.oddcast.com/vhost_embed_functions_v4.php?acc=' + environment.q1 + '&js=0', '');
    this.setYourScriptTag('sitapal', 'assets/scripts/sitepal.js', '');
    let jsInterval = setInterval(() => {
      if (document.getElementById('sitapal') && document.getElementById('oddcast')) {
        //@ts-ignore
        AC_VHost_Embed(environment.q1, 500, 500, "", 1, 0, environment.q2, 0, 1, 0, environment.q3, 0, 0);
        clearInterval(jsInterval);
      }
    }, 100);
    let interval = setInterval(() => {
      let html5Player = document.getElementsByClassName('_html5Player');
      if (html5Player.length > 0) {
        this.loading = false;
        document.getElementsByClassName('img-div')[0].appendChild(html5Player[0]);
        let canvas = document.getElementById('canvasID:0');
        if (canvas) {
          canvas.style.left = "-20px";
          this.voiceRecognitionService.setCanSpeak(true);
          clearInterval(interval);
        }
      }
    }, 100);
    this.globalService.aiResponseText.subscribe((text: string) => {
      this.createAvatar(text);
    });
  }

  createAvatar(text: string) {
    if (document.getElementById('textToSpeak') && text !== '' && text !== null && text !== undefined) {
      //@ts-ignore
      document.getElementById('textToSpeak').value = text;
      let buttonCheck = setInterval(() => {
        let button = document.getElementById('record');
        if (button.getAttribute('disabled') === null) {
          button.click();
          clearInterval(buttonCheck);
        }
      },100);
    }
  }

  private setYourScriptTag(id: string, src: string, content: string) {
    const s = this.doc.createElement('script');
    s.type = 'text/javascript';
    s.id = id;
    if (src !== '') {
      s.src = src;
    } else {
      s.innerHTML = content;
    }
    const head = this.doc.getElementsByTagName('footer')[0];
    head.appendChild(s);
  }

}


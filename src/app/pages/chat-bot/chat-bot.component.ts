import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Message} from "../../models/Message";
import {Action} from "../../models/Action";

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  @ViewChild('textAreaElement') textAreaElement : HTMLTextAreaElement;
  textArea = '';
  actions: Action[] = [];
  askToAi = true;
  isActionActive = false;
  selectedAction: Action;
  messages: Message[] = [];

  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
    this.actions = this.globalService.chatActions;
    this.isActionActive = this.actions.length > 0;
      this.messages.push(new Message().prepare({
      message: 'Selam, nasıl yardımcı olabilirim?',
      messageAuthor: 'ai',
      date: new Date().getHours() + ':' + new Date().getUTCMinutes()
    }));
  }

  setAction(action: Action) {
    this.isActionActive = false;
    this.messages.push(new Message().prepare({
      message: action.text,
      messageAuthor: 'customer',
      date: new Date().getHours() + ':' + new Date().getUTCMinutes()
    }));
    this.sleep(1000).then(r => {
      this.messages.push(new Message().prepare({
        message: action.answer,
        messageAuthor: 'ai',
        date: new Date().getHours() + ':' + new Date().getUTCMinutes()
      }));
      this.askToAi = !action.aiStop;
      if (!action.aiStop){
        this.isActionActive = true;
      }
      this.selectedAction = action;
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  sendMessage() {
    this.messages.push(new Message().prepare({
      message: this.textArea,
      messageAuthor: 'customer',
      date: new Date().getHours() + ':' + new Date().getUTCMinutes()
    }));
    if (this.askToAi) {
      this.getAnswer(this.textArea);
    }else{
      this.sleep(1000).then(r => {
        this.isActionActive = true;
        if (this.selectedAction.name == 'cargo') {
          this.messages.push(new Message().prepare({
            message: 'Kargonuz şuanda yola çıkmıştır. Ortalama 1-3 iş günü içerisinde adresinize teslim edilecektir!',
            messageAuthor: 'ai',
            date: new Date().getHours() + ':' + new Date().getUTCMinutes()
          }));
        }else if (this.selectedAction.name == 'rockCertificate') {
          this.messages.push(new Message().prepare({
            message: 'Tüm ürünlerimiz orjinal olmakla beraber 256Bit SSL sertifikası ile güvenilirliği doğrulanmıştır. Yalnızca güvenilir markalardan sertifikalı ürünler almanız sizin için daha uygun olacaktır.',
            messageAuthor: 'ai',
            date: new Date().getHours() + ':' + new Date().getUTCMinutes()
          }));
        }
      });
      this.askToAi = true;
    }
    this.textArea = '';
  }

  getAnswer(query:string) {
    this.globalService.getAnswer(query).subscribe((data) => {
      this.messages.push(new Message().prepare({
        message: data.content,
        messageAuthor: 'ai',
        date: new Date().getHours() + ':' + new Date().getUTCMinutes()
      }));
      //todo: scroll to bottom
    });
  }

}

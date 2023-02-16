import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Message} from "../../models/Message";

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  @ViewChild('textAreaElement') textAreaElement : HTMLTextAreaElement;
  textArea = '';

  messages: Message[] = [];

  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
    this.messages.push(new Message().prepare({
      message: 'Selam, nasıl yardımcı olabilirim?',
      messageAuthor: 'ai',
      date: new Date().getHours() + ':' + new Date().getUTCMinutes()
    }));

  }


  sendMessage() {
    this.messages.push(new Message().prepare({
      message: this.textArea,
      messageAuthor: 'customer',
      date: new Date().getHours() + ':' + new Date().getUTCMinutes()
    }));
    this.getAnswer(this.textArea);
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

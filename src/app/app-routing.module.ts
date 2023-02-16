import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ChatBotComponent} from "./pages/chat-bot/chat-bot.component";
import {AvatarSpeechComponent} from "./pages/avatar-speech/avatar-speech.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chat-bot', component: ChatBotComponent },
  { path: 'avatar-speech', component: AvatarSpeechComponent },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

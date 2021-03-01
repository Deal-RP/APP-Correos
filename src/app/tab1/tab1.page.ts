import { Component, OnInit } from '@angular/core';
import { UserI, mailI } from '../interface/user-i';
import { SharedDataService } from '../services/shared-data.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  file;
  receptor : string;
  msg : string;
  asunto: string;
  name:string;

  constructor(private _user : SharedDataService,
    private emailComposer : EmailComposer
  ) {}

  get users(): UserI[]{
    return this._user.users;
  }
  set users(value : UserI[]){
    this._user.users = [];
    this._user.users.push(...value);
  }

  get mails(): mailI[]{
    return this._user.enviado;
  }
  set mails(value : mailI[]){
    this._user.enviado = [];
    this._user.enviado.push(...value);
  }

  send(){
    if(!this.msg){
      alert("Correo sin contenido")
      return
    }
    if(!this.receptor){
      alert("Correo sin destinatario")
      return
    }
    let newMsg : mailI = {
      id: this.mails.length,
      receptor: this.receptor,
      asunto: this.asunto,
      msg: this.msg,
      file: this.name
    }
    this.mails.push(newMsg)
    this.sendMail();
    this._user.presentToast("Mensaje enviado");

    this.file = null;
    this.receptor = "";
    this.msg = "";
    this.asunto = "";
    this.name = "";
  }

  sendMail(){
    let email = {
      to: this.receptor,
      attachments: [
        this.file
      ],
      subject: this.asunto,
      body: this.msg,
      isHtml: true
    };
    
    this.emailComposer.open(email);
  }

  upload($event){
    const name : string = $event.target.files[0].name;
    this.name = name.replace("C:\\fakepath" , "");
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.file = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  
}

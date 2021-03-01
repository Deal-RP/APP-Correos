import { Component } from '@angular/core';
import { mailI } from '../interface/user-i';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  constructor(private _user : SharedDataService) {}

  get mails(): mailI[]{
    return this._user.enviado;
  }
  set mails(value : mailI[]){
    this._user.enviado = [];
    this._user.enviado.push(...value);
  }

  delete(mail){
    let cont = 0;
    this.mails.forEach(x => {
      x.id = cont;
      cont++;
    })
    this.mails.splice(mail.id, 1);
    this._user.presentToast("Mensaje eliminado");
  }
}

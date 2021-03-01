import { Component } from '@angular/core';
import { UserI } from '../interface/user-i';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  name : string;
  mail: string;
  
  constructor(private _user : SharedDataService) {}

  get users(): UserI[]{
    return this._user.users;
  }
  set users(value : UserI[]){
    this._user.users = [];
    this._user.users.push(...value);
  }

  create(){
    if(this.mail && this.name){
      if(this.users.findIndex((x : UserI ) => x.mail === this.mail) === -1){
        let newUser : UserI = {
          name: this.name,
          mail: this.mail
        }
        this.users.push(newUser)
      }
      else{
        alert("Ya existe este correo");
      }
    }
    else{
      alert("Faltan datos")
    }
    this._user.presentToast("Usuario creado");
  }

  delete(user){
    this.users.splice(this.users.findIndex(x => x.mail === user.mail), 1);
    this._user.presentToast("Usuario eliminado");
  }
}

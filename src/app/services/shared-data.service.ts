import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserI, mailI } from '../interface/user-i';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(public toastController: ToastController) { }
  users : UserI[] = [{
    name: "Derly",
    mail: "x@gmail.com"
  },
  {
    name: "Alejandro",
    mail: "a@gmail.com"
  },
  ];
  enviado : mailI[] = [];

  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }
}

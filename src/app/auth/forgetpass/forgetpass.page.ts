import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.page.html',
  styleUrls: ['./forgetpass.page.scss'],
})
export class ForgetpassPage implements OnInit {
  email : string ; 
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }
  async toast(message,status)
  {
    const toast =await this.toastr.create({
      message:message,
      position : 'top',
      color: status,
      duration: 2000
    });
    toast.present();
  }// end of toast

  async resetPassword()
  {
   if(this.email)
   {
    const loading= await this.loadingCtrl.create({
      message: 'Sending reset password link..',
      spinner: 'crescent',
      showBackdrop: true
    }
    );
    loading.present();
    this.afAuth.sendPasswordResetEmail(this.email).then(()=> {
      loading.dismiss();
      this.toast('please check your email !','success')

      this.router.navigate(['/login']);
    }).catch((error)=> {
      this.toast(error.message,'danger') ; 
      loading.dismiss();
    })
    }else{
      this.toast('please enter your email address!','danger');
    }
  }// end of reset password


}

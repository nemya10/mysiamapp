import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = ""
  email: string = ""
  password: string = ""
  cpassword: string = ""
  passwordMatch: boolean;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }
  async register() {
    if (this.name && this.email && this.password) {
      const loading = await this.loadingCtrl.create({
        message: 'loading..',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afAuth.createUserWithEmailAndPassword(this.email, this.password).then((data) => {
        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'name': this.name,
          'email': this.email,
          'createAt': Date.now()
        });
        data.user.sendEmailVerification();
      })
      .then(()=>{
        console.log('success');
        loading.dismiss();
      }).catch((error)=>{
        loading.dismiss();
        console.log(error.message);
      })
    }else{
      console.log('please fill the form');
    }

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
 
      checkPassword()
      {
if(this.password == this.cpassword){
  this.passwordMatch = true ;
}else{
  this.passwordMatch = false ;
}

      }



    }


  




  /*   async register() {
      const { username, password, cpassword } = this
      if(password !== cpassword) {
        this.presentAlert("Error","Passwords don't match")
        return console.error("Passwords don't match")
      }
  
      try {
        const res = await this.afAuth.createUserWithEmailAndPassword(username + '@aymen.com', password)
        this.presentAlert("Success", "You are registered!")
  
      } catch(error) {
        console.dir(error)
        this.presentAlert("error", error.message)
  
      }
    } */
  /*   async presentAlert(title: string, content: string) {
      const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']
      })
  
      await alert.present()
    } */


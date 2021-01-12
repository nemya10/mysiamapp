import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { data } from 'jquery';
import { localizedString } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AuthService {
 user$ : Observable<User>;
 user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) 
  {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          if (user) {
              return this.afs.doc(`users/${user.uid}`).valueChanges();
          } else {
              return of(null);
          }
      })
  )
  }// end of constructor
 

  async login(email,pass){
   const loading = await this.loadingCtrl.create({
   message:'authenticating..',
    spinner:'crescent',
   showBackdrop : true
  });
  loading.present();
  this.afAuth.signInWithEmailAndPassword(email,pass).then((data)=>{
    if(!data.user.emailVerified){
      loading.dismiss();
      this.toast('Please verified your email','danger');
      this.logout();
    }else{
      loading.dismiss();
      this.router.navigate(['/home']);
    }
  }
  )
  }// end of login

  logout(){
    this.afAuth.signOut().then(()=>
    {
    this.router.navigate(['/home']);
  });
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
 


  
}

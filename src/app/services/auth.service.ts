import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
//import { data } from 'jquery';
import { localizedString } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AuthService {
  user$: Observable<User>;
  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) {
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


  async login(email, pass) {
    const loading = await this.loadingCtrl.create({
      message: 'En cours....',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    const data = await this.afAuth.signInWithEmailAndPassword(email, pass).then((data) => {
     /*  if (!data.user.emailVerified) {
        loading.dismiss();
        this.toast('Please verified your account', 'danger');
        this.logout();
      } else { */
        loading.dismiss();
        this.toast('Bienvenu chez MySiam', 'success');
        this.router.navigate(['/calendhome']);

     /*  } */
    }).catch((err) => {
      loading.dismiss();
      this.toast(err.message, 'danger');
    })
  }// end of login

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    });
    toast.present();
  }// end of toast
  async register(name,email,password) {
      const loading = await this.loadingCtrl.create({
        message: 'loading..',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afAuth.createUserWithEmailAndPassword(email, password).then((data) => {
        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'name': name,
          'email': email,
          'createAt': Date.now()
        });
        data.user.sendEmailVerification();
        loading.dismiss();
        this.toast('Inscription a été effectué avec succès.', 'success');
        this.router.navigate(['/login']);
      }).then(()=>{
        loading.dismiss();
      }).catch((error)=>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
   

      }



}

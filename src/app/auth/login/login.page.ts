import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string =""
  password: string =""
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastController,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
  }
  register(){
    this.router.navigate(['/register']);
  }// end of register
forgot()
{
  this.router.navigate(['/forgot-pass']);
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
async login(){
  if(this.email && this.password)
  {
const loading= await this.loadingCtrl.create({
  message: 'loging in..',
  spinner: 'crescent',
  showBackdrop: true
}
);
loading.present();

this.auth.login(this.email,this.password).then
(()=>{
  loading.dismiss();
}).catch((error)=> {
loading.dismiss();
this.toast(error.message,'danger');
})
  }else{
    this.toast('Please enter your email and password','danger');
  }
}// end login

/* async login(){
  const { username,password } = this

  try{
const res= await this.afAuth.signInWithEmailAndPassword(username +'@aymen.com',password)
  }catch(err){
console.dir(err)
if(err.code == "auth/user-not-found"){
  console.log("User not found")
}
  }
} */
}

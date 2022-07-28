import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../models/login';


@Component({ 
    selector: 'app-login',
    templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

    /*
    public loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        });
    */
    public loginForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: [''],
        password: ['', Validators.required]
    });

    constructor(public apiauthService: ApiauthService, 
                private router: Router,
                private formBuilder: FormBuilder){
        /*
        if(this.apiauthService.usuarioData){
            this.router.navigate(['/']);
        }
        */
    }

    ngOnInit() {
        /*
        if(this.loginForm.value.email === null)
        {
            this.loginForm.value.email="";
        }
        if(this.loginForm.value.password === null)
        {
            this.loginForm.value.password="";
        }
        */
    }
    login(){
        console.log("formulario del login")
        console.log(this.loginForm.value)
        this.apiauthService.login(this.loginForm.value as Login).subscribe(response =>{
            if(response.success == 1){
                this.router.navigate(['/']);
            }
        });
    }
}

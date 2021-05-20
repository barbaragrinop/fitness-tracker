import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { AuthData } from "./auth.data.model";
import { User } from "./user.model";

@Injectable()

export class AuthService{
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router){}

    registerUser(authData: AuthData){ //registra o usuário e manda ele p outro canto
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }

    login(authData: AuthData){ //faz login
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }

    logout(){ //desloga
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser(){
        return { ...this.user};
    }

    isAuth(){ //retorna se o usuário tá setado ou não
        return this.user != null;
    }    

    private authSuccessfully(){ //retona autentição de sucesso
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
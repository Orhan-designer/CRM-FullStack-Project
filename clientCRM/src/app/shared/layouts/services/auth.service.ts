import { HttpClient } from '@angular/common/http';
import { User } from './../interfaces';
import { Injectable } from "@angular/core";
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token = null;

    constructor(private http: HttpClient) {

    }

    register(user: User): Observable<User> {
        return this.http.post<User>('/api/auth/register', user)
    }

    login(user: User): Observable<any> {
        return this.http.post<{ token: string }>('/api/auth/login', user)
            .pipe(
                tap(
                    ({ token }) => {
                        localStorage.setItem('auth-token', token)
                        this.setToken(token) /* мы заносим значение токена
                        в приватную переменную auth сервиса, и в дальнейшем, мы сможем 
                        этим всем пользоваться */
                    }
                )
            )
    }

    setToken(token: any) {
        this.token = token
    } //этот метод будет изменять приватную переменную

    getToken(): any {
        return this.token
    } //этот метод позволяет получать значение токена, в других классах

    isAuthenticated(): boolean {
        return !!this.token
    } //этот метод будет проверять, есть ли у нас токен или нет

    logout() {
        this.setToken(null)
        localStorage.clear()
    } //метод выхода из системы
}
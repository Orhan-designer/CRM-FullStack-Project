import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/layouts/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription //данная переменная отвечает за утечку памяти, а точнее за её отсутствие

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //Теперь вы можете зайти в систему, используя свои данные
      } else if (params['accessDenied']) {
        //Для начала авторизуйтесь в системе
      }
    }) /* делается это для того что, в дальнейшем, мы будем переходить
    на страницу логина, и у нас будет два варианта некоторых сообщений, которые
    мы будем показывать*/
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable() /* данный метод позволяет нам отключить всю форму, 
    на тот момент, когда у нас идёт некоторый запрос*/
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/overview']),
        this.toastr.success('Вы успешно вошли в систему!')
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }
}

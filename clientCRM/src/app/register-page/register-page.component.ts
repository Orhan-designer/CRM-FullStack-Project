import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/layouts/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.toastr.success('Вы успешно зарегистрировались!')
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }

}

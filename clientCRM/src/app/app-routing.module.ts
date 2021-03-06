import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AuthGuard } from './shared/layouts/classes/auth.guard';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent }
        ]
    },
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
            { path: 'overview', component: OverviewPageComponent },
            { path: 'analytics', component: AnalyticsPageComponent },
            { path: 'history', component: HistoryPageComponent },
            { path: 'order', component: OrderPageComponent },
            { path: 'categories', component: CategoriesPageComponent }
        ]
    }
] //тут мы должны регистрировать определённые роуты

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
}) //Декоратор
export class AppRoutingModule {

}
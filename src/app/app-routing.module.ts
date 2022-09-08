import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './authentication/login/login.component';
import { RecoverPasswordComponent } from './authentication/recover-password/recover-password.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ExpenditureComponent } from './components/expenditure/expenditure.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { LockScreenComponent } from './components/lock-screen/lock-screen.component';
import { ManagementComponent } from './components/management/management.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PropertyDetailsComponent } from './components/property-components/property-details/property-details.component';
import { PropertyComponent } from './components/property/property.component';
import { RequestsComponent } from './components/request/requests/requests.component';
import { ServicesComponent } from './components/services/services.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatementsComponent } from './components/statements/statements.component';
import { TenancyComponent } from './components/tenant-components/tenant-details/tenancy/tenancy.component';
import { UnitComponent } from './components/unit-components/unit/unit.component';
import { AccPreferencesComponent } from './myAccComponents/acc-preferences/acc-preferences.component';
import { EmailComponent } from './myAccComponents/email/email.component';
import { ProfileComponent } from './myAccComponents/profile/profile.component';
import { SecurityComponent } from './myAccComponents/security/security.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: "admin", component: AdminComponent,
    children: [
      { path: "accounts", component: AccountsComponent },
      { path: "expenditures", component: ExpenditureComponent },
      { path: "dashboard", component: ManagementComponent },
      { path: "property", component: PropertyComponent },
      { path: "property:id", component: PropertyDetailsComponent},
      { path: "statements", component: StatementsComponent},
      { path: "units", component: UnitComponent },
      { path: "units/unit/:id", component: UnitComponent},
      { path: "invoices", component: InvoicesComponent},
      { path: "tenancy", component: TenancyComponent },
      { path: "tenancy/tenant/:id", component:TenancyComponent },
      { path: "services", component: ServicesComponent },
      { path: "payments", component: PaymentsComponent },
      { path: "site-settings", component: SettingsComponent },
      { path: "messages", component: MessagesComponent },
      { path: "test", component: TestComponent },
      { path:  "requests", component: RequestsComponent},
      { path: "**", component: ManagementComponent }
      
    ]
  },
  {
    path: "myaccount", component: MyaccountComponent,
    children: [
      { path: "profile", component: ProfileComponent },
      { path: "preferences", component: AccPreferencesComponent},
      { path: "security", component: SecurityComponent },
      { path: "email", component: EmailComponent },
      { path: "**", component: ProfileComponent}
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent},
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "recover-password", component:RecoverPasswordComponent},
  { path: "**", redirectTo: "/login" },
  { path: "locked-out", component: LockScreenComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

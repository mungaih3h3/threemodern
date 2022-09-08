import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagementComponent } from './components/management/management.component';
import { PropertyComponent } from './components/property/property.component';
import { UnitComponent } from './components/unit-components/unit/unit.component';
import { TenancyComponent } from './components/tenant-components/tenant-details/tenancy/tenancy.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { StatementsComponent } from './components/statements/statements.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ExpenditureComponent } from './components/expenditure/expenditure.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { EntryExitRecordsComponent } from './components/entry-exit-records/entry-exit-records.component';
import { NavbarComponent } from './outer-components/navbar/navbar.component';
import { SidebarComponent } from './outer-components/sidebar/sidebar.component';
import { FooterComponent } from './outer-components/footer/footer.component';
import { TopbarComponent } from './outer-components/topbar/topbar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesComponent } from './components/services/services.component';
import { AddTenantFormComponent } from './components/add-tenant-form/add-tenant-form.component';
import { AddServiceFormComponent } from './components/add-service-form/add-service-form.component';
import { AddPropertyOwnerFormComponent } from './components/add-property-owner-form/add-property-owner-form.component';
import { TenantInvoiceFormComponent } from './components/tenant-invoice-form/tenant-invoice-form.component';
import { ToolBarComponent } from './outer-components/tool-bar/tool-bar.component';
import { AddPaymentFormComponent } from './components/add-payment-form/add-payment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBillInvoiceFormComponent } from './components/add-bill-invoice-form/add-bill-invoice-form.component';
import { SearchbarComponent } from './outer-components/searchbar/searchbar.component';
import { RightNavigationDrawerComponent } from './outer-components/right-navigation-drawer/right-navigation-drawer.component';
import { AgmCoreModule } from '@agm/core';
import { AccSidenavComponent } from './outer-components/acc-sidenav/acc-sidenav.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProfileComponent } from './myAccComponents/profile/profile.component';
import { EmailComponent } from './myAccComponents/email/email.component';
import { SecurityComponent } from './myAccComponents/security/security.component';
import { AccPreferencesComponent } from './myAccComponents/acc-preferences/acc-preferences.component';
import { AdminComponent } from './admin/admin.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestComponent } from './test/test.component';
import { NotificationsDrawerComponent } from './outer-components/notifications-drawer/notifications-drawer.component'
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { NgChartsModule } from 'ng2-charts';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LandComponent } from './components/addproperty/land/land.component';
import { OfficeComponent } from './components/addproperty/office/office.component';
import { ShopComponent } from './components/addproperty/shop/shop.component';
import { HouseComponent } from './components/addproperty/house/house.component';
import { MatSelectModule } from '@angular/material/select';
import { ImageGalleryComponent } from './components/property-components/image-gallery/image-gallery.component';
import { PropertyDetailsComponent } from './components/property-components/property-details/property-details.component';
import { RequestsComponent } from './components/request/requests/requests.component';
import { RequestDetailsComponent } from './components/request/request-details/request-details.component';
import { TenantDetailsComponent } from './components/tenant-components/tenant-details/tenant-details.component';
import { MessagesDrawerComponent } from './outer-components/messages-drawer/messages-drawer.component';
import { MyactivitiesComponent } from './components/myactivities/myactivities.component';
import { PropertyManagersComponent } from './components/property-manager-components/property-managers/property-managers.component';
import { HttpClientModule } from '@angular/common/http';
import { PropertyTenantsComponent } from './components/property-components/property-tenants/property-tenants.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AddUnitFormComponent } from './components/unit-components/add-unit-form/add-unit-form.component';
import { UnitDetailsComponent } from './components/unit-components/unit-details/unit-details.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { LockScreenComponent } from './components/lock-screen/lock-screen.component';
import { NotificationSettingsComponent } from './components/settings-components/notification-settings/notification-settings.component';
import { DisplaySettingsComponent } from './components/settings-components/display-settings/display-settings.component';
import { SecurityPrivacySettingsComponent } from './components/settings-components/security-privacy-settings/security-privacy-settings.component';
import { TenantApplicationFormComponent } from './components/tenant-application-form/tenant-application-form.component';
import { RecoverPasswordComponent } from './authentication/recover-password/recover-password.component';
import { ErrorReportComponent } from './components/error-report/error-report.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagementComponent,
    PropertyComponent,
    UnitComponent,
    TenancyComponent,
    InvoicesComponent,
    StatementsComponent,
    PaymentsComponent,
    ExpenditureComponent,
    AccountsComponent,
    EntryExitRecordsComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    TopbarComponent,
    SettingsComponent,
    ServicesComponent,
    AddTenantFormComponent,
    AddServiceFormComponent,
    AddPropertyOwnerFormComponent,
    TenantInvoiceFormComponent,
    ToolBarComponent,
    AddPaymentFormComponent,
    AddBillInvoiceFormComponent,
    SearchbarComponent,
    RightNavigationDrawerComponent,
    AccSidenavComponent,
    MyaccountComponent,
    MessagesComponent,
    ProfileComponent,
    EmailComponent,
    SecurityComponent,
    AccPreferencesComponent,
    AdminComponent,
    FilterPipe,
    TestComponent,
    NotificationsDrawerComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    LandComponent,
    OfficeComponent,
    ShopComponent,
    HouseComponent,
    ImageGalleryComponent,
    PropertyDetailsComponent,
    RequestsComponent,
    RequestDetailsComponent,
    TenantDetailsComponent,
    MessagesDrawerComponent,
    MyactivitiesComponent,
    PropertyManagersComponent,
    PropertyTenantsComponent,
    LoaderComponent,
    AddUnitFormComponent,
    UnitDetailsComponent,
    SplashScreenComponent,
    InvoiceDetailsComponent,
    LockScreenComponent,
    NotificationSettingsComponent,
    DisplaySettingsComponent,
    SecurityPrivacySettingsComponent,
    TenantApplicationFormComponent,
    RecoverPasswordComponent,
    ErrorReportComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DragDropModule, 
    ChartsModule,
    NgChartsModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyClURqnBdMCCMU64femPFaPvKUFa0SjQeA"
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

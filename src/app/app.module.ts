import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import Angular's built-in modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Your other component imports...
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TurfListComponent } from './components/turf-list/turf-list.component';
import { TurfDetailsComponent } from './components/turf-details/turf-details.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import { AdminTurfManagementComponent } from './components/admin-turf-management/admin-turf-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TurfListComponent,
    TurfDetailsComponent,
    MyBookingsComponent,
    AdminDashboardComponent,
    PaymentComponent,
    BookingConfirmationComponent,
    AdminTurfManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,         // <-- Add this for the date pipe and other common features
    FormsModule,          // <-- Add this for ngModel
    ReactiveFormsModule   // <-- This should already be here for formGroup
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  pendingBooking: any;
  isLoading = true;
  razorpayKey: string = '';

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Load Razorpay key first
    this.loadRazorpayKey();
    
    this.bookingService.getPendingBooking().subscribe(booking => {
      this.pendingBooking = booking;
      if (this.pendingBooking && this.razorpayKey) {
        this.isLoading = false;
      }
    });
  }

  loadRazorpayKey() {
    this.http.get<any>('http://localhost:3000/razorpay-key').subscribe({
      next: (response) => {
        this.razorpayKey = response.key;
        if (this.pendingBooking && this.razorpayKey) {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Failed to load Razorpay key:', err);
        alert('Failed to load payment configuration. Please ensure the backend server is running.');
      }
    });
  }

  initiatePayment() {
    if (!this.razorpayKey) {
      alert('Payment configuration not loaded. Please refresh the page.');
      return;
    }

    this.isLoading = true;
    const orderData = {
      amount: this.pendingBooking.price * 100,
      receipt: `receipt_turf_${Date.now()}`
    };

    this.http.post<any>('http://localhost:3000/create-order', orderData).subscribe({
      next: (order) => {
        this.launchRazorpayCheckout(order);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        alert('Payment server could not be reached. Please ensure the backend server is running and your Razorpay keys are correct.');
        console.error('Backend Error:', err);
      }
    });
  }

  launchRazorpayCheckout(order: any) {
    const currentUser = this.authService.currentUserValue;
    const options = {
      key: this.razorpayKey,
      amount: order.amount,
      currency: 'INR',
      name: 'Turf Booker',
      description: `Booking for ${this.pendingBooking.turfName}`,
      image: 'assets/images/logo.png',
      order_id: order.id,
      handler: (response: any) => {
        const bookingId = this.bookingService.confirmPendingBooking();
        this.router.navigate(['/confirmation', bookingId]);
      },
      prefill: {
        name: currentUser.email,
        email: currentUser.email,
        contact: currentUser.phone
      },
      notes: {
        address: 'Turf Booking Inc.'
      },
      theme: {
        color: '#007bff'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { PaymentService, PaymentData } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  pendingBooking$!: Observable<any>;
  isProcessing = false;
  errorMessage = '';
  paymentStatus = '';

  constructor(
    private bookingService: BookingService, 
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.pendingBooking$ = this.bookingService.getPendingBooking();
  }

  async payNow() {
    this.isProcessing = true;
    this.errorMessage = '';
    this.paymentStatus = 'Initializing payment...';

    try {
      // Get the booking data
      let booking: any;
      this.pendingBooking$.subscribe(data => {
        booking = data;
      }).unsubscribe();
      
      if (!booking) {
        throw new Error('No pending booking found');
      }

      // Create payment data
      const paymentData: PaymentData = {
        amount: booking.price,
        orderId: this.paymentService.generateOrderId(),
        turfName: booking.turfName,
        customerName: 'Customer', // In real app, get from user profile
        customerEmail: 'customer@example.com', // In real app, get from user profile
        customerPhone: '9999999999' // In real app, get from user profile
      };

      this.paymentStatus = 'Opening Razorpay checkout...';

      // Create Razorpay order
      const paymentResult = await this.paymentService.createRazorpayOrder(paymentData);

      if (paymentResult.success) {
        this.paymentStatus = 'Verifying payment...';
        
        // Verify payment (in real app, this should be done on backend)
        const isVerified = await this.paymentService.verifyPayment(paymentResult);
        
        if (isVerified) {
          this.paymentStatus = 'Payment successful! Confirming booking...';
          
          // Confirm the booking
          const bookingId = this.bookingService.confirmPendingBooking();
          
          // Navigate to confirmation page
          this.router.navigate(['/confirmation', bookingId]);
        } else {
          throw new Error('Payment verification failed');
        }
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      this.errorMessage = error.error || error.message || 'Payment failed. Please try again.';
      this.paymentStatus = '';
    } finally {
      this.isProcessing = false;
    }
  }

  retryPayment() {
    this.errorMessage = '';
    this.paymentStatus = '';
    this.payNow();
  }
}
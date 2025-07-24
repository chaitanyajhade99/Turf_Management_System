import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  pendingBooking$!: Observable<any>;
  isProcessing = false;

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.pendingBooking$ = this.bookingService.getPendingBooking();
  }

  // Purposed Payment delay
  payNow() {
    this.isProcessing = true;
    setTimeout(() => {
      const bookingId = this.bookingService.confirmPendingBooking();
      this.router.navigate(['/confirmation', bookingId]);
    }, 2000);
  }
}
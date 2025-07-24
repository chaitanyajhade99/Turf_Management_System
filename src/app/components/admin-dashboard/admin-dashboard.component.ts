import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  allBookings$!: Observable<any[]>;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.allBookings$ = this.bookingService.bookings$;
  }
}
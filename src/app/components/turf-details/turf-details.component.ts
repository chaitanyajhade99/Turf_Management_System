import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TurfService } from '../../services/turf.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-turf-details',
  templateUrl: './turf-details.component.html',
  styleUrls: ['./turf-details.component.css']
})
export class TurfDetailsComponent implements OnInit {
  turf: any;
  allSlots = [
    '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', 
    '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00',
    '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00',
    '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-00:00'
  ];
  bookedSlots: Set<string> = new Set();
  
  selectedDate: string = '';
  selectedSlot: string | null = null;
  turfId!: number;
  todaysDate: string;

  constructor(
    private route: ActivatedRoute,
    private turfService: TurfService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {
    const today = new Date();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.todaysDate = `${today.getFullYear()}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.turfId = +this.route.snapshot.paramMap.get('id')!;
    this.turfService.getTurfById(this.turfId).subscribe(data => {
      this.turf = data;
    });
  }

  loadSlots() {
    if (this.selectedDate && this.turfId) {
      const currentlyBooked = this.bookingService.getBookedSlots(this.turfId, this.selectedDate);
      this.bookedSlots = new Set(currentlyBooked);
    }
  }
  
  isSlotBooked(slot: string): boolean {
    return this.bookedSlots.has(slot);
  }

  selectSlot(slot: string) {
    this.selectedSlot = slot;
  }

  proceedToPayment() {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      alert('You must be logged in to book a slot.');
      return;
    }
    
    if (this.selectedSlot && this.selectedDate && this.turf) {
      const pendingBooking = {
        turfId: this.turf.id,
        turfName: this.turf.name,
        price: this.turf.price,
        userId: currentUser.id,
        date: this.selectedDate,
        slot: this.selectedSlot
      };
      
      this.bookingService.setPendingBooking(pendingBooking);
      this.router.navigate(['/payment']);
    }
  }
}
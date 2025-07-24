import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurfService {
  private turfs = new BehaviorSubject<any[]>([
    { 
      id: 1, 
      name: 'City Arena', 
      location: 'Kalyan West', 
      price: 1200, 
      description: 'Premium 5-a-side AstroTurf with brilliant floodlights for night games.', 
      imageUrl: 'assets/images/CityArena.jpg', 
      ratings: [] 
    },
    { 
      id: 2, 
      name: 'Goal Zone', 
      location: 'Thane West', 
      price: 1500, 
      description: 'Spacious, well-maintained ground for 7-a-side football and cricket.', 
      imageUrl: 'assets/images/Goalzone.jpg', 
      ratings: [] 
    },
    { 
      id: 3, 
      name: 'Kick Off', 
      location: 'Dombivli East', 
      price: 1000, 
      description: 'A clean and affordable turf that is perfect for daily practice sessions.', 
      imageUrl: 'assets/images/Kickoff.jpg', 
      ratings: [] 
    }
  ]);
  turfs$ = this.turfs.asObservable();

  constructor() { }

  getTurfs() {
    return this.turfs$;
  }

  getTurfById(id: number) {
    const turf = this.turfs.getValue().find(t => t.id === id);
    return of(turf);
  }

  addRating(turfId: number, rating: { stars: number, comment: string }) {
    const currentTurfs = this.turfs.getValue();
    const turfIndex = currentTurfs.findIndex(t => t.id === turfId);
    if (turfIndex > -1) {
      currentTurfs[turfIndex].ratings.push(rating);
      this.turfs.next([...currentTurfs]);
    }
  }

  getAverageRating(turf: any): number {
    if (!turf.ratings || turf.ratings.length === 0) {
      return 0;
    }
    const totalStars = turf.ratings.reduce((sum: number, r: any) => sum + r.stars, 0);
    return totalStars / turf.ratings.length;
  }
  
  addTurf(turfData: any) {
    const currentTurfs = this.turfs.getValue();
    const newTurf = {
      id: currentTurfs.length > 0 ? Math.max(...currentTurfs.map(t => t.id)) + 1 : 1,
      ...turfData,
      ratings: []
    };
    this.turfs.next([...currentTurfs, newTurf]);
  }

  updateTurf(updatedTurf: any) {
    const currentTurfs = this.turfs.getValue();
    const turfIndex = currentTurfs.findIndex(t => t.id === updatedTurf.id);
    if (turfIndex > -1) {
      currentTurfs[turfIndex] = { ...currentTurfs[turfIndex], ...updatedTurf };
      this.turfs.next([...currentTurfs]);
    }
  }

  deleteTurf(turfId: number) {
    const currentTurfs = this.turfs.getValue().filter(t => t.id !== turfId);
    this.turfs.next(currentTurfs);
  }
}
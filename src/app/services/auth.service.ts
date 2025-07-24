import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    
    const storedUsers = sessionStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const storedCurrentUser = sessionStorage.getItem('currentUser');
    if (storedCurrentUser) {
      this.currentUserSubject.next(JSON.parse(storedCurrentUser));
    }
  }
  
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register(user: any): boolean {
    if (this.users.find(u => u.email === user.email)) {
      return false; // User already exists
    }
    user.id = this.users.length + 1;
    user.role = 'user'; // Assign default role
    this.users.push(user);
    sessionStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  // Admin login details
  login(credentials: any): boolean {

    if (credentials.email === 'admin' && credentials.password === 'admin123') {
      const adminUser = { id: 0, email: 'admin', role: 'admin' };
      this.setCurrentUser(adminUser);
      this.router.navigate(['/admin']);
      return true;
    }

    const user = this.users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      this.setCurrentUser(user);
      this.router.navigate(['/']);
      return true;
    }
    return false; 
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  private setCurrentUser(user: any) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TurfService } from '../../services/turf.service';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-turf-list',
  templateUrl: './turf-list.component.html',
  styleUrls: ['./turf-list.component.css']
})
export class TurfListComponent implements OnInit {
  turfs$!: Observable<any[]>;

  constructor(public turfService: TurfService) { }

  ngOnInit(): void {
    this.turfs$ = this.turfService.getTurfs();
  }
}
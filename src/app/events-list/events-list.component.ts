import { Component, inject } from '@angular/core';
import { EventDataService } from '../services/event-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  eventService = inject(EventDataService)
events:any[]=[];
  ngOnInit(){
  this.getAllEvents()
  }
  getAllEvents(){
    this.eventService.getAllEvents().subscribe((data:any) => {
      this.events = data
    })
  }

  deleteEventById(eventId:string){

    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.getAllEvents()
    })
  }

  markCompleteById(eventId:string){
    const event =this.events.find(event => event.id === eventId)
    event.completion_status = !event.completion_status
    this.eventService.updateEvent(event.id,event).subscribe(() => {
      this.getAllEvents()
    })
  }
  constructor(private router: Router) {}

  editForm(id:string){
    console.log(id)
    this.router.navigate(['form', id]);
  }

  addEvent(){
    this.router.navigate(['form']);
  }
  showFuture() {
    this.eventService.getAllEvents().subscribe((data: any) => {
      const currentDate = new Date();
      this.events = data.filter((event: any) => {
        // const eventDate = new Date(event.date);
        // return eventDate > currentDate;
        return !event.completion_status

      });
    });
  }

  showPast() {
    this.eventService.getAllEvents().subscribe((data: any) => {
      const currentDate = new Date();
      this.events = data.filter((event: any) => {
        // const eventDate = new Date(event.date);
        // return eventDate < currentDate;
        return event.completion_status
      });
    });
  }
}

import { Routes } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventFormComponent } from './event-form/event-form.component';

export const routes: Routes = [
  {path: '', component:EventsListComponent,title: 'event list'},
  {path: 'eventList', component:EventsListComponent,title: 'event list'},
  {path: 'form', component:EventFormComponent,title: 'new event'},
  {path: 'form/:id', component:EventFormComponent, title:'edit event'},
];

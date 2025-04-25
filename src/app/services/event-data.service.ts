import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {
  httpsClient= inject(HttpClient);
  baseURL = 'http://localhost:3000/events';
  constructor() { }
  getAllEvents() {
    return this.httpsClient.get(this.baseURL);
  }
  getEventById(id: string) {
    return this.httpsClient.get(`${this.baseURL}/${id}`);
  }
  addEvent(event: any) {
    return this.httpsClient.post(this.baseURL, event);
  }
  updateEvent(id: string, event: any) {
    return this.httpsClient.put(`${this.baseURL}/${id}`, event);
  }
  deleteEvent(id: string) {
    return this.httpsClient.delete(`${this.baseURL}/${id}`);
  }

}

import { Component, inject } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventDataService } from '../services/event-data.service';


@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  isNew: boolean | null = null;
  id:string = "";
ret:string|null=null
eventService= inject(EventDataService);
constructor(private route: ActivatedRoute,private router: Router) { }
regForm:FormGroup = new FormGroup({
  name: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  location: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  completion_status: new FormControl('false', [Validators.required]),
})
  ngOnInit() {
    this.ret = this.route.snapshot.paramMap.get('id');
    if (this.ret) {
      this.id = this.ret;
      this.eventService.getEventById(this.id).subscribe((event:any) =>{
        console.log(event);
        this.regForm.patchValue({
          name: event.name,
          date: event.date,
          location: event.location,
          description: event.description,
          completion_status: event.completion_status.toString()
        })
      })
      this.isNew=false;
    }else{
      this.isNew=true;
    }
    console.log("is new?",this.isNew);
  }
  addEvent(){
    console.log(this.regForm.valid);
    console.log(this.regForm.value);
if(!this.regForm.valid){
  return ;
}
if(this.isNew){
  const event = this.regForm.value;
  event.completion_status = event.completion_status == "true"? true : false;
  console.log(event);
this.eventService.addEvent(event).subscribe((data:any) =>{
  this.router.navigate(['/eventList']);

});
}else{
  const event = this.regForm.value;
  event.id = this.id;
  event.completion_status = event.completion_status == "true"? true : false;
  console.log(event);
this.eventService.updateEvent(event.id,event).subscribe((data:any) =>{
  this.router.navigate(['/eventList']);

});
}
  }

  fillData() {
    this.regForm.patchValue({
      name: "Test Event",
      date: new Date().toISOString().slice(0, 10),
      location: "Test Location",
      description: "Test Description",
      completion_status: "true",
    });
  }
}

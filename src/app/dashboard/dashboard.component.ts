import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  noteObj:Note;
  noteForm:FormGroup;
  notes:Note[];
  title = new FormControl();
  text = new FormControl();
  constructor(private noteservice:NotesService)
  {
    this.noteObj=new Note();
    this.notes=[];
    
    this.noteForm =  new FormGroup({

      title:this.title,
      text:this.text
    })

  }
  ngOnInit(): void {
  
      this.noteservice.getNotes().subscribe(
        (noteData: Note[]) => {this.notes = noteData,
        console.log(this.notes) },
        (  err: any) => console.log(err)
    )
  }

  addNote()
  {
    this.noteObj = this.noteForm.value;

    if(this.noteForm.valid)
    {

      this.noteservice.addNote(this.noteObj).subscribe(
        (data: any) => {console.log(data)},
        ( err: any) => {console.log(err)}
      )

      console.log(this.noteObj.title);
      console.log(this.noteObj.text);
    }

    this.noteObj = new Note();
  }
}



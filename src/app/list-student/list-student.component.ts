import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  student: Student[];

  constructor(
    private studentService: StudentService,
    public router: Router
    ) { }

  ngOnInit(){
    this.studentService.getStudentList().subscribe(res =>{
      this.student = res.map( e => {
        return {
          id : e.payload.doc.id,
          ...e.payload.doc.data() as{}
        } as Student;
      })
      console.log(this.student);
    });
  }

  removeStudent(student){
    if(confirm("Are you sure to delete "+ student.name)){
      this.studentService.deleteStudent(student);
    }
  }

  onSubmit(student){
    this.router.navigate([`update-student/${student.id}`]);
  }

}

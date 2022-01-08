import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Student, StudentInterface } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentCollection: AngularFirestoreCollection<StudentInterface>;
  constructor(private angularFirestore: AngularFirestore){
    //this.studentCollection = angularFirestore.collection<StudentInterface>('student-collection');
   }

  getStudentDoc(id){
    return this.angularFirestore
    .collection('student-collection')
    .doc(id)
    .valueChanges();
  }
  getStudentList(){
    return this.angularFirestore
    .collection('student-collection')
    .snapshotChanges();
  }
  createStudent(student: Student){
    return new Promise<any>((resolve, reject)=>{
      const id = this.angularFirestore.createId();
      const data = {id, ...student};
      console.log(data);
      this.angularFirestore
      .collection('student-collection')
      .add(data)
      .then(response => {console.log(response)}, error => reject(error));
    });
  }

  deleteStudent(student){
    return this.studentCollection.doc(student.id).delete();
  }

  updateStudent(student: Student, id){
    return this.angularFirestore
    .collection('student-collection')
    .doc(id)
    .update({
      name: student.name,
      email: student.email,
      student_course: student.student_course,
      fees: student.fees
    });
  }

}

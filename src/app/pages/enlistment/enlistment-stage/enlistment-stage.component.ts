import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-enlistment-stage',
  templateUrl: './enlistment-stage.component.html',
  styleUrls: ['./enlistment-stage.component.scss']
})
export class EnlistmentStageComponent implements OnInit {

  dataForm!: FormGroup;
  interviews: any;
  page: number = 1;
  size: number = 5;
  selectedItem: number = 5;
  collectionSize: number = 0;
  loading: boolean = false;
  tests: any;
  search = '';

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private nbDialogService: NbDialogService,
    @Optional() private nbDialogRef: NbDialogRef<EnlistmentStageComponent>,
    private testService: TestService
  ) {

  }

  ngOnInit(): void {
    this.getInterviews();
  }

  create(dialog: any) {
    this.nbDialogRef = this.nbDialogService.open(dialog)
  }

  close() {
    this.nbDialogRef.close()
  }

  // getInterviews() {
  //   this.interviewService.getAllInterviews(this.page, this.size).subscribe({
  //     next: (data) => {
  //       this.interviews = data.interviews
  //         .filter((interview: any) => interview.initialInterview === "yes")
  //         .sort((a: any, b: any) => {
  //           return new Date(b.date).getTime() - new Date(a.date).getTime();
  //         });
  //       this.collectionSize = data.totalPages;
  //     },
  //     error: (err) => {
  //     }
  //   });
  // }

  getInterviews() {
    this.interviewService.allInterviews().subscribe({
      next: (data) => {
        this.interviews = data.tests
          .filter((interview: any) => interview.initialInterview === "yes")
          .sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        this.collectionSize = data.totalPages;
      },
      error: (err) => {
      }
    });
  }


  getTests() {
    this.testService.getAllTests().subscribe({
      next: (data) => {
        this.tests = data;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
      }
    })
  }

  nextPage() {
    this.getInterviews();
  }

  createInterview() {
    this.loading;
    this.interviewService.create(this.dataForm.value).subscribe({
      next: (data) => {
        this.loading = true;
        this.nbDialogRef.close();
        this.getInterviews();
        this.dataForm.reset();
      }
    })
  }

  getList() {
    const searchLower = this.search.toLowerCase();  // Convertir el término de búsqueda a minúsculas
  
    return this.search !== '' ? this.interviews.filter((a: any) => 
      a.cc.toString().toLowerCase().includes(searchLower) ||  // Convertir cc a cadena y a minúsculas
      a.names.toLowerCase().includes(searchLower)  // Convertir names a minúsculas
    ) : this.interviews;
  }
  


}

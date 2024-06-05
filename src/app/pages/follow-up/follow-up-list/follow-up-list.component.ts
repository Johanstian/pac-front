import { Component } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-follow-up-list',
  templateUrl: './follow-up-list.component.html',
  styleUrls: ['./follow-up-list.component.scss']
})
export class FollowUpListComponent {

  retests: any;
  page: number = 1;
  size: number = 10;
  selectedItem: number = 10;
  collectionSize: number = 0;
  loading: boolean = false;
  search: any = '';

  constructor(private testService: TestService) {

  }

  ngOnInit(): void {
    this.getAllArlsByPaging();
  }

  getAllArlsByPaging() {
    this.testService.getAll().subscribe({
      next: (data) => {
        this.retests = data.retests
        this.collectionSize = data.totalPages;
      },
      error: () => {
      }
    })
  }

  nextPage() {
    this.getAllArlsByPaging();
  }

  excel() {
    this.testService.getListForExcel().subscribe(
      (excelBlob: Blob) => {
        const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Listado antiguos.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
    );
  }

  getList() {
    return this.search !== '' ? this.retests.filter((a: any) => a.cc.includes(this.search) || a.names.includes(this.search)) : this.retests
  }

}

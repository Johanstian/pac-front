import { Component, OnInit } from '@angular/core';
import { ArlService } from 'src/app/core/services/arl.service';

@Component({
  selector: 'app-arls',
  templateUrl: './arls.component.html',
  styleUrls: ['./arls.component.scss']
})
export class ArlsComponent implements OnInit {

  arls: any;
  page: number = 1;
  size: number = 10;
  selectedItem: number = 10;
  collectionSize: number = 0;
  loading: boolean = false;

  constructor(private arlService: ArlService) {

  }

  ngOnInit(): void {
    this.getAllArlsByPaging();
  }

  getAllArlsByPaging() {
    this.arlService.getAllArls(this.page, this.size).subscribe({
      next: (data) => {
        this.arls = data.arls;
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
    this.arlService.getExcel().subscribe(
      (excelBlob: Blob) => {
        const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arls.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
    );
  }

}

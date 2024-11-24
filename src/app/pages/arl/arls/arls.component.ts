import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArlService } from 'src/app/core/services/arl.service';
import { ContractService } from 'src/app/core/services/contract.service';

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

  userId = '668960d39e4e37f5bf24c2d4';
  error: string | null = null;

  constructor(
    private arlService: ArlService,
    private contractService: ContractService,
    private httpClient: HttpClient
  ) {

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

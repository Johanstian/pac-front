import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'app-contractors-list',
  templateUrl: './contractors-list.component.html',
  styleUrls: ['./contractors-list.component.scss']
})
export class ContractorsListComponent implements OnInit {

  page: number = 1;
  totalPages!: number;
  limit: number = 5;
  contractors: any;
  cdp: any;
  selectedItem: number = 10;
  search: any = '';

  constructor(
    private contractService: ContractService
  ) {

  }

  ngOnInit(): void {
    this.allContractors();
  }

  getContractors() {
    this.contractService.getContractorsPaginated(this.page, this.limit).subscribe({
      next: (data) => {
        this.contractors = data.contractors;
        this.cdp = data.cdp
        this.totalPages = data.totalPages;
      }
    })
  }

  allContractors() {
    this.contractService.allContractors().subscribe({
      next: (data) => {
        this.contractors = data;
        this.totalPages = data.totalPages;
      }
    })
  }

  nextPage() {
    this.getContractors();
  }

  bySearch() {
    this.contractService.getBySearch(this.search).subscribe({
      next: (data) => {
        this.contractors = data;
      }
    })
  }



}

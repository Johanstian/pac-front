import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ArlService } from 'src/app/core/services/arl.service';
import { CdpService } from 'src/app/core/services/cdp.service';
import { ContractService } from 'src/app/core/services/contract.service';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';

@Component({
  selector: 'app-management-list',
  templateUrl: './management-list.component.html',
  styleUrls: ['./management-list.component.scss']
})
export class ManagementListComponent {

  cdps: any;
  page: number = 1;
  size: number = 10;
  selectedItem: number = 10;
  collectionSize: number = 0;
  loading: boolean = false;

  userId = '668960d39e4e37f5bf24c2d4'; // Replace with actual user ID
  error: string | null = null;








  selectAll: boolean = false;

  constructor(
    private arlService: ArlService,
    private cdpService: CdpService,
    private contractService: ContractService,
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.getAllArlsByPaging();
  }

  getAllArlsByPaging() {
    this.cdpService.getCdpPaginated(this.page, this.size).subscribe({
      next: (data) => {
        this.cdps = data.cdps.map((cdp: any) => ({
          ...cdp,
          selected: false
        }));
        this.collectionSize = data.totalPages;
      },
      error: () => {
        console.error('Error al cargar los ARLs.');
      }
    });
  }

  toggleAllChecks() {
    this.cdps.forEach((cdp: any) => {
      cdp.selected = this.selectAll;
    });
  }

  updateSelectAllState() {
    this.selectAll = this.cdps.every((cdp: any) => cdp.selected);
  }

  loadFile(url: any, callback: any) {
    PizZipUtils.getBinaryContent(url, callback);
  }

  generate(cdp: any) {
    if (cdp) {
      this.loadFile('assets/templates/cdp1.docx',
        (error: Error | null, content: string) => {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });
          doc.render({
            documento: cdp.documento,
            autorizacion: cdp.autorizacion,
            fecha: cdp.fecha,
            concepto: cdp.concepto,
            valor: cdp.valor,
          });

          const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });
          const fileName = `${cdp.autorizacion}.docx`;
          saveAs(out, fileName);
        }
      );
    } else {
      console.log('');
    }
  }

  generateSelected() {
    const selectedContractors = this.cdps.filter((cdp: { selected: any; }) => cdp.selected);
    if (selectedContractors.length > 0) {
      this.loadFile('assets/templates/cdp.docx', (error: any, content: any) => {
        if (error) {
          console.error('Error loading file:', error);
          return;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: false,
          linebreaks: false,
        });
        doc.render({
          cdps: selectedContractors.map((cdp: { documento: any; autorizacion: any; fecha: any; concepto: any; valor: any; }) => ({
            documento: cdp.documento,
            autorizacion: cdp.autorizacion,
            fecha: cdp.fecha,
            concepto: cdp.concepto,
            valor: cdp.valor,
          })),
        });
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        saveAs(out, 'CDP.docx');
      });

      // Desmarcar todos los checkboxes después de generar el archivo
      this.cdps.forEach((cdp: { selected: boolean; }) => (cdp.selected = false));
      this.selectAll = false;
    } else {
      console.log('');
    }
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

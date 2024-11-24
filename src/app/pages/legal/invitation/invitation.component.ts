import { Component, OnInit } from '@angular/core';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { ContractService } from 'src/app/core/services/contract.service';
import expressionParser from 'docxtemplater/expressions.js';
// import * as angularParser from "docxtemplater/expressions";

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  page: number = 1;
  size: number = 10;
  selectedItem: number = 10;
  collectionSize: number = 0;
  contractors: any;
  selectAll: boolean = false;

  constructor(
    private contractService: ContractService
  ) {

  }

  ngOnInit(): void {
    this.getAllAuthorizations()
  }

  loadFile(url: any, callback: any) {
    PizZipUtils.getBinaryContent(url, callback);
  }

  toggleAllChecks() {
    this.contractors.forEach((contractor: any) => {
      contractor.selected = this.selectAll;
    });
  }

  // Update the "select all" checkbox state when individual rows are toggled
  updateSelectAllState() {
    this.selectAll = this.contractors.every((contractor: any) => contractor.selected);
  }

  generate(contractor: any) {
    if (contractor) {
      this.loadFile('assets/templates/inv-4PA-FO-240-004.docx',
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
            invitacion: contractor.invitacion,
            contratista: contractor.contratista,
            fecha: contractor?.cdp?.fecha,
            nombreproyecto: contractor.cdp?.nombreproyecto,
            requisitoexperiencia: contractor.requisitoexperiencia,
            objeto: contractor.cdpInfo?.objeto,
            nombrerubro: contractor.cdpInfo?.nombrerubro,
          });

          const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });
          const fileName = `${contractor.contratista}.docx`;
          saveAs(out, fileName);
        }
      );
    } else {
      console.log('');
    }
  }

  getAllAuthorizations() {
    this.contractService.allContractors().subscribe({
      next: (data) => {
        this.contractors = data
      }
    })
  }

  generateSelected() {
    const selectedContractors = this.contractors.filter((contractor: any) => contractor.selected);

    if (selectedContractors.length > 0) {
      this.loadFile('assets/templates/inv-4PA-FO-240-004.docx', (error: any, content: any) => {
        if (error) {
          console.error('Error loading file:', error);
          return;
        }

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: false,
          linebreaks: false,
          parser: require("docxtemplater/expressions")
        });

        expressionParser.filters['formatCurrency'] = function (value) {
          if (typeof value !== "number") return value;
          return value.toLocaleString("es-CO");
        };

        const data = {
          contractors: selectedContractors.map((contractor: any) => ({
            documento: contractor.documento,
            contratista: contractor.contratista,
            invitacion: contractor.invitacion,
            cdp: contractor.cdp
              ? {
                fecha: contractor.cdp.fecha || "Fecha no disponible",
                valor: parseInt(contractor.cdp.valor, 10) || 0,
                objeto: contractor.cdp.objeto || "No especificado",
                nombrerubro: contractor.cdp.nombrerubro || "No especificado",
              }
              : null,
          })),
        };
        doc.render(data);

        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(out, 'Solicitudes de Autorización.docx');
      });

      this.contractors.forEach((contractor: any) => (contractor.selected = false));
      this.selectAll = false;
    } else {
      console.log('');
    }
  }

  nextPage() {
    this.getAllAuthorizations();
  }



}

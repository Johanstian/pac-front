import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private devUrl = environment.devUrl;
  private proUrl = environment.proUrl;

  constructor(private httpClient: HttpClient) {

  }

  createProduct(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/general/createProduct', request)
  }

  createEvent(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/general/createEvent', request);
  }

  createHome(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/banner/createBanner', request)
  }

  createTechEvent(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/eventos/createEvents', request)
  }




  async createPdf(): Promise<Uint8Array> {
    try {
      const pdfDoc: PDFDocument = await PDFDocument.create();

      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 30;

      page.drawText('Creating PDFs in Angular is awesome!', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });

      return await pdfDoc.save();
    } catch (error) {
      console.error('Error creating PDF:', error);
      throw error;
    }
  }



  async modifyPdf(existingPdfBytes: Uint8Array, data:
    {
      objeto: string,
      cdp: string,
      res: string,
      rubro: string,
      nombrerubro: string,
      value: string,
      letters: string,
      contrato: string,
      proceso: string,
      noconcepto: string,
      fechaconcepto: string,
      cc: number,
      tercero: string,
      tipocontrato: string,
      elaborado: string
    }
  ): Promise<Uint8Array> {
    try {
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const pages = pdfDoc.getPages();
      let firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const fontSize = 10;
      const lineSpacing = 14;

      const textObjeto = `${data.objeto}`;
      const widthObjeto = 540;
      let positionObj = height - 175;
      const wrapTextObj = (text: string, width: number, font: any, fontSize: number) => {
        let line = '';
        let result = '';
        for (let i = 0; i < text.length; i++) {
          const testLine = line + text[i];
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > width) {
            result += line + '\n';
            line = text[i];
          } else {
            line = testLine;
          }
        }
        result += line;
        return result.split('\n')
      };
      const wrappedTextObj = wrapTextObj(textObjeto, widthObjeto, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextObj.length; i++) {
        if (positionObj < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          positionObj = height - 100;
        }
        firstPage.drawText(wrappedTextObj[i], {
          x: 30,
          y: positionObj,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        positionObj -= lineSpacing;
      }

      firstPage.drawText(`${data.cdp}`, {
        x: 35,
        y: height - 271,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      firstPage.drawText(`${data.res}`, {
        x: 80,
        y: height - 271,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      const rubroText = `${data.rubro}`;
      const textWidth = timesRomanFont.widthOfTextAtSize(rubroText, fontSize);
      const maxWidth = 115;
      let startingPosition = height - 271;
      const wrapText = (text: string, width: number, font: any, fontSize: number) => {
        let line = '';
        let result = '';
        for (let i = 0; i < text.length; i++) {
          const testLine = line + text[i];
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > width) {
            result += line + '\n';
            line = text[i];
          } else {
            line = testLine;
          }
        }
        result += line;
        return result.split('\n')
      };
      const wrappedTextLines = wrapText(rubroText, maxWidth, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextLines.length; i++) {
        if (startingPosition < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          startingPosition = height - 100;
        }
        firstPage.drawText(wrappedTextLines[i], {
          x: 120,
          y: startingPosition,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        startingPosition -= lineSpacing;
      }

      const rubroTextnr = `${data.nombrerubro}`;
      const maxWidthnr = 250;
      let startingPositionnr = height - 271;
      const wrapTextnr = (text: string, width: number, font: any, fontSize: number) => {
        let line = '';
        let result = '';

        for (let i = 0; i < text.length; i++) {
          const testLine = line + text[i];
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > width) {
            result += line + '\n';
            line = text[i];
          } else {
            line = testLine;
          }
        }
        result += line;
        return result.split('\n');
      };
      const wrappedTextLinesnr = wrapTextnr(rubroTextnr, maxWidthnr, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextLinesnr.length; i++) {
        if (startingPositionnr < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          startingPositionnr = height - 100;
        }
        firstPage.drawText(wrappedTextLinesnr[i], {
          x: 245,
          y: startingPositionnr,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        startingPositionnr -= lineSpacing;
      }

      firstPage.drawText(`${data.value}`, {
        x: 510,
        y: height - 271,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.value}`, {
        x: 35,
        y: height - 475,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.letters}`, {
        x: 160,
        y: height - 475,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.contrato}`, {
        x: 160,
        y: height - 531,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.proceso}`, {
        x: 160,
        y: height - 545,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.noconcepto}`, {
        x: 160,
        y: height - 559,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.fechaconcepto}`, {
        x: 160,
        y: height - 573,
        size: 9,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.cc}`, {
        x: 372,
        y: height - 531,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.tercero}`, {
        x: 372,
        y: height - 545,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.tipocontrato}`, {
        x: 372,
        y: height - 559,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.elaborado}`, {
        x: 114,
        y: height - 744,
        size: 7,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      return await pdfDoc.save();
    } catch (error) {
      console.error('Error modifying PDF:', error);
      throw error;
    }
  }









  async cdp(existingPdfBytes: Uint8Array, data:
    {
      aut: string,
      fechaaut: string,
      objeto: string,
      res: string,
      rubro: string,
      desrubro: string,
      valor: string,
      valorletras: string,
      codproyecto: string,
      nomproyecto: string,
      documento: string,
      tercero: string,
      mensual: string,
      mensualletras: string,
    }
  ): Promise<Uint8Array> {
    try {
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      let firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const fontSize = 10;
      const lineSpacing = 14;

      const textObjeto = `${data.objeto}`;
      const widthObjeto = 550;
      let positionObj = height - 190;
      const wrapTextObj = (text: string, width: number, font: any, fontSize: number) => {
        let line = '';
        let result = '';
        for (let i = 0; i < text.length; i++) {
          const testLine = line + text[i];
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);
          if (testWidth > width) {
            result += line + '\n';
            line = text[i];
          } else {
            line = testLine;
          }
        }
        result += line;
        return result.split('\n')
      };
      const wrappedTextObj = wrapTextObj(textObjeto, widthObjeto, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextObj.length; i++) {
        if (positionObj < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          positionObj = height - 100;
        }
        firstPage.drawText(wrappedTextObj[i], {
          x: 23,
          y: positionObj,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        positionObj -= lineSpacing;
      }

      firstPage.drawText(`${data.aut}`, {
        x: 110,
        y: height - 148,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.fechaaut}`, {
        x: 510,
        y: height - 148,
        size: 9,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.res}`, {
        x: 23,
        y: height - 290,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      const rubroText = `${data.rubro}`;
      const textWidth = timesRomanFont.widthOfTextAtSize(rubroText, fontSize);
      const maxWidth = 115;
      let startingPosition = height - 290;
      const wrapText = (text: string, width: number, font: any, fontSize: number) => {
        let line = '';
        let result = '';
        for (let i = 0; i < text.length; i++) {
          const testLine = line + text[i];
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);
          if (testWidth > width) {
            result += line + '\n';
            line = text[i];
          } else {
            line = testLine;
          }
        }
        result += line;
        return result.split('\n')
      };
      const wrappedTextLines = wrapText(rubroText, maxWidth, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextLines.length; i++) {
        if (startingPosition < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          startingPosition = height - 100;
        }
        firstPage.drawText(wrappedTextLines[i], {
          x: 68,
          y: startingPosition,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        startingPosition -= lineSpacing;
      }

   

      // const rubroText = `${data.rubro}`;
      // const textWidth = timesRomanFont.widthOfTextAtSize(rubroText, fontSize);
      // const maxWidth = 115;
      // let startingPosition = height - 271;
      // const wrapText = (text: string, width: number, font: any, fontSize: number) => {
      //   let line = '';
      //   let result = '';
      //   for (let i = 0; i < text.length; i++) {
      //     const testLine = line + text[i];
      //     const testWidth = font.widthOfTextAtSize(testLine, fontSize);

      //     if (testWidth > width) {
      //       result += line + '\n';
      //       line = text[i];
      //     } else {
      //       line = testLine;
      //     }
      //   }
      //   result += line;
      //   return result.split('\n')
      // };

      // const wrappedTextLines = wrapText(rubroText, maxWidth, timesRomanFont, fontSize);
      // for (let i = 0; i < wrappedTextLines.length; i++) {
      //   if (startingPosition < 50) {
      //     firstPage = pdfDoc.addPage([width, height]);
      //     startingPosition = height - 100;
      //   }
      //   firstPage.drawText(wrappedTextLines[i], {
      //     x: 120,
      //     y: startingPosition,
      //     size: fontSize,
      //     font: timesRomanFont,
      //     color: rgb(0, 0, 0),
      //   });
      //   startingPosition -= lineSpacing;
      // }


      const rubroTextnr = `${data.desrubro}`;
      const maxWidthnr = 295;
      let startingPositionnr = height - 290;
      const wrapTextnr = (text: string, width: number, font: any, fontSize: number) => {
        let line = '';
        let result = '';

        for (let i = 0; i < text.length; i++) {
          const testLine = line + text[i];
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > width) {
            result += line + '\n';
            line = text[i];
          } else {
            line = testLine;
          }
        }
        result += line;
        return result.split('\n');
      };
      
      const wrappedTextLinesnr = wrapTextnr(rubroTextnr, maxWidthnr, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextLinesnr.length; i++) {
        if (startingPositionnr < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          startingPositionnr = height - 100;
        }
        firstPage.drawText(wrappedTextLinesnr[i], {
          x: 200,
          y: startingPositionnr,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        startingPositionnr -= lineSpacing;
      }

      firstPage.drawText(`${data.valor}`, {
        x: 510,
        y: height - 290,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.valor}`, {
        x: 23,
        y: height - 455,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.valorletras}`, {
        x: 155,
        y: height - 455,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.codproyecto}`, {
        x: 23,
        y: height - 517,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      const rubroTextnp = `${data.nomproyecto}`;
      const maxWidthnp = 470;
      let startingPositionnp = height - 517;
      const wrapTextnp = (text: string, width: number, font: any, fontSize: number) => {
        let line = '';
        let result = '';

        for (let i = 0; i < text.length; i++) {
          const testLine = line + text[i];
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > width) {
            result += line + '\n';
            line = text[i];
          } else {
            line = testLine;
          }
        }
        result += line;
        return result.split('\n');
      };
      
      const wrappedTextLinesnp = wrapTextnp(rubroTextnp, maxWidthnp, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextLinesnr.length; i++) {
        if (startingPositionnp < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          startingPositionnp = height - 100;
        }
        firstPage.drawText(wrappedTextLinesnp[i], {
          x: 110,
          y: startingPositionnp,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        startingPositionnp -= lineSpacing;
      }




      
      // firstPage.drawText(`${data.nomproyecto}`, {
      //   x: 100,
      //   y: height - 515,
      //   size: fontSize,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      // firstPage.drawText(`${data.aut}`, {
      //   x: 35,
      //   y: height - 475,
      //   size: fontSize,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      // firstPage.drawText(`${data.aut}`, {
      //   x: 160,
      //   y: height - 475,
      //   size: fontSize,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      // firstPage.drawText(`${data.aut}`, {
      //   x: 160,
      //   y: height - 531,
      //   size: fontSize,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      

  

      // firstPage.drawText(`${data.aut}`, {
      //   x: 160,
      //   y: height - 573,
      //   size: 9,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      // firstPage.drawText(`${data.aut}`, {
      //   x: 372,
      //   y: height - 531,
      //   size: fontSize,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      // firstPage.drawText(`${data.tercero}`, {
      //   x: 372,
      //   y: height - 545,
      //   size: fontSize,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      // firstPage.drawText(`${data.aut}`, {
      //   x: 372,
      //   y: height - 559,
      //   size: fontSize,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      // firstPage.drawText(`${data.aut}`, {
      //   x: 114,
      //   y: height - 744,
      //   size: 7,
      //   font: timesRomanFont,
      //   color: rgb(0, 0, 0),
      // });

      return await pdfDoc.save();
    } catch (error) {
      console.error('Error modifying PDF:', error);
      throw error;
    }
  }





}
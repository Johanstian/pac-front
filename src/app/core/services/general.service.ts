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

      // const textObjeto = `${data.objeto}`;
      // const widthObjeto = 540;
      // let positionObj = height - 175;
      // const wrapTextObj = (text: string, width: number, font: any, fontSize: number) => {
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
      // const wrappedTextObj = wrapTextObj(textObjeto, widthObjeto, timesRomanFont, fontSize);
      // for (let i = 0; i < wrappedTextObj.length; i++) {
      //   if (positionObj < 50) {
      //     firstPage = pdfDoc.addPage([width, height]);
      //     positionObj = height - 100;
      //   }
      //   firstPage.drawText(wrappedTextObj[i], {
      //     x: 30,
      //     y: positionObj,
      //     size: fontSize,
      //     font: timesRomanFont,
      //     color: rgb(0, 0, 0),
      //   });
      //   positionObj -= lineSpacing;
      // }

      const textObjeto = `${data.objeto}`;
      const widthObjeto = 540; // Maximum width of the text
      let positionObj = height - 175;
      const wrapTextObj = (text: string, maxWidth: number, font: any, fontSize: number) => {
        const words = text.split(' '); // Split the text into words
        let line = '';
        let result = [];

        for (let i = 0; i < words.length; i++) {
          const testLine = line + (line ? ' ' : '') + words[i]; // Add word to line with a space if it's not the first word
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth) {
            result.push(line); // Add current line to result
            line = words[i];   // Start a new line with the current word
          } else {
            line = testLine;   // Continue building the current line
          }
        }

        result.push(line); // Add the last line
        return result;
      };

      // Get wrapped text lines
      const wrappedTextObj = wrapTextObj(textObjeto, widthObjeto, timesRomanFont, fontSize);

      // Loop through wrapped lines and center each line
      for (let i = 0; i < wrappedTextObj.length; i++) {
        if (positionObj < 50) {
          firstPage = pdfDoc.addPage([width, height]); // Create new page if position is too low
          positionObj = height - 100;
        }

        const textWidth = timesRomanFont.widthOfTextAtSize(wrappedTextObj[i], fontSize);
        const centeredX = (width - textWidth) / 2; // Calculate x to center the text

        firstPage.drawText(wrappedTextObj[i], {
          x: centeredX,
          y: positionObj,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        positionObj -= lineSpacing; // Move down to the next line position
      }



















      firstPage.drawText(`${data.cdp}`, {
        x: 35,
        y: height - 296,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      firstPage.drawText(`${data.res}`, {
        x: 80,
        y: height - 296,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      const rubroText = `${data.rubro}`;
      const textWidth = timesRomanFont.widthOfTextAtSize(rubroText, fontSize);
      const maxWidth = 115;
      let startingPosition = height - 296;
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





      // const rubroTextnr = `${data.nombrerubro}`;
      // const maxWidthnr = 250;
      // let startingPositionnr = height - 296;
      // const wrapTextnr = (text: string, width: number, font: any, fontSize: number) => {
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
      //   return result.split('\n');
      // };
      // const wrappedTextLinesnr = wrapTextnr(rubroTextnr, maxWidthnr, timesRomanFont, fontSize);
      // for (let i = 0; i < wrappedTextLinesnr.length; i++) {
      //   if (startingPositionnr < 50) {
      //     firstPage = pdfDoc.addPage([width, height]);
      //     startingPositionnr = height - 100;
      //   }
      //   firstPage.drawText(wrappedTextLinesnr[i], {
      //     x: 245,
      //     y: startingPositionnr,
      //     size: fontSize,
      //     font: timesRomanFont,
      //     color: rgb(0, 0, 0),
      //   });
      //   startingPositionnr -= lineSpacing;
      // }


      const rubroTextnr = `${data.nombrerubro}`;
      const maxWidthnr = 260; // Maximum width of the text
      let positionnr = height - 296;
      const leftMargin = 60;  // The starting X position
      const wrapTextnr = (text: string, maxWidth: number, font: any, fontSize: number) => {
        const words = text.split(' '); // Split the text into words
        let line = '';
        let result = [];

        for (let i = 0; i < words.length; i++) {
          const testLine = line + (line ? ' ' : '') + words[i]; // Add word to line with a space if it's not the first word
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth) {
            result.push(line); // Add current line to result
            line = words[i];   // Start a new line with the current word
          } else {
            line = testLine;   // Continue building the current line
          }
        }

        result.push(line); // Add the last line
        return result;
      };

      // Get wrapped text lines
      const wrappedTextObjnr = wrapTextnr(rubroTextnr, maxWidthnr, timesRomanFont, fontSize);

      // Loop through wrapped lines and center each line
      for (let i = 0; i < wrappedTextObjnr.length; i++) {
        if (positionnr < 50) {
          firstPage = pdfDoc.addPage([width, height]); // Create new page if position is too low
          positionnr = height - 100;
        }

        const textWidth = timesRomanFont.widthOfTextAtSize(wrappedTextObjnr[i], fontSize);
        const centeredX = leftMargin + (width - textWidth) / 2; // Calculate x to center the text

        firstPage.drawText(wrappedTextObjnr[i], {
          x: centeredX,
          y: positionnr,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        positionnr -= lineSpacing; // Move down to the next line position
      }


























      firstPage.drawText(`${data.value}`, {
        x: 510,
        y: height - 296,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.value}`, {
        x: 35,
        y: height - 467,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.letters}`, {
        x: 160,
        y: height - 467,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.contrato}`, {
        x: 160,
        y: height - 523,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.proceso}`, {
        x: 160,
        y: height - 538,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.noconcepto}`, {
        x: 160,
        y: height - 553,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.fechaconcepto}`, {
        x: 160,
        y: height - 565,
        size: 9,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.cc}`, {
        x: 372,
        y: height - 523,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.tercero}`, {
        x: 372,
        y: height - 538,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.tipocontrato}`, {
        x: 372,
        y: height - 553,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(`${data.elaborado}`, {
        x: 114,
        y: height - 736,
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
      const widthObjeto = 550; // Maximum width of the text
      let positionObj = height - 190;
      const wrapTextObj = (text: string, maxWidth: number, font: any, fontSize: number) => {
        const words = text.split(' '); // Split the text into words
        let line = '';
        let result = [];

        for (let i = 0; i < words.length; i++) {
          const testLine = line + (line ? ' ' : '') + words[i]; // Add word to line with a space if it's not the first word
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth) {
            result.push(line); // Add current line to result
            line = words[i];   // Start a new line with the current word
          } else {
            line = testLine;   // Continue building the current line
          }
        }
        result.push(line); // Add the last line
        return result;
      };
      const wrappedTextObj = wrapTextObj(textObjeto, widthObjeto, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextObj.length; i++) {
        if (positionObj < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          positionObj = height - 100;
        }

        const textWidth = timesRomanFont.widthOfTextAtSize(wrappedTextObj[i], fontSize);
        const centeredX = (width - textWidth) / 2;

        firstPage.drawText(wrappedTextObj[i], {
          x: centeredX,
          y: positionObj,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        positionObj -= lineSpacing;
      }
      //AUTORIZACION
      firstPage.drawText(`${data.aut}`, {
        x: 110,
        y: height - 148,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      //FECHA AUTORIZACION
      firstPage.drawText(`${data.fechaaut}`, {
        x: 510,
        y: height - 148,
        size: 9,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      //RES
      firstPage.drawText(`${data.res}`, {
        x: 23,
        y: height - 314,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      //CODIGO RUBRO
      const rubroText = `${data.rubro}`;
      const textWidth = timesRomanFont.widthOfTextAtSize(rubroText, fontSize);
      const maxWidth = 115;
      let startingPosition = height - 314;
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
      //NOMBRE RUBRO O DESCRIPCION
      const rubroTextnr = `${data.desrubro}`;
      const maxWidthnr = 295;
      let startingPositionnr = height - 314;
      const leftMargin = 40;  // The starting X position
      const wrapTextnr = (text: string, maxWidth: number, font: any, fontSize: number) => {
          const words = text.split(' ');
          let line = '';
          let result = [];
  
          for (let i = 0; i < words.length; i++) {
            const testLine = line + (line ? ' ' : '') + words[i];
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);
  
            if (testWidth > maxWidth) {
              result.push(line);
              line = words[i];
            } else {
              line = testLine;
            }
          }
          result.push(line);
          return result;
        };


      const wrappedTextLinesnr = wrapTextnr(rubroTextnr, maxWidthnr, timesRomanFont, fontSize);
      for (let i = 0; i < wrappedTextLinesnr.length; i++) {
        if (startingPositionnr < 50) {
          firstPage = pdfDoc.addPage([width, height]);
          startingPositionnr = height - 100;
        }

        const textWidth = timesRomanFont.widthOfTextAtSize(wrappedTextLinesnr[i], fontSize);
        const centeredX = leftMargin + (width - textWidth) / 2;

        firstPage.drawText(wrappedTextLinesnr[i], {
          x: centeredX,
          y: startingPositionnr,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        startingPositionnr -= lineSpacing;
      }


      
      // const wrappedTextObj = wrapTextObj(textObjeto, widthObjeto, timesRomanFont, fontSize);
      // for (let i = 0; i < wrappedTextObj.length; i++) {
      //   if (positionObj < 50) {
      //     firstPage = pdfDoc.addPage([width, height]);
      //     positionObj = height - 100;
      //   }

      //   const textWidth = timesRomanFont.widthOfTextAtSize(wrappedTextObj[i], fontSize);
      //   const centeredX = (width - textWidth) / 2;

      //   firstPage.drawText(wrappedTextObj[i], {
      //     x: centeredX,
      //     y: positionObj,
      //     size: fontSize,
      //     font: timesRomanFont,
      //     color: rgb(0, 0, 0),
      //   });
      //   positionObj -= lineSpacing;
      // }

















      //VALOR
      firstPage.drawText(`${data.valor}`, {
        x: 510,
        y: height - 314,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      //EL OTRO VALOR
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
      for (let i = 0; i < wrappedTextLinesnp.length; i++) {
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
      return await pdfDoc.save();
    } catch (error) {
      console.error('Error modifying PDF:', error);
      throw error;
    }
  }





}
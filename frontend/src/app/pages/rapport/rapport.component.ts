import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AgenceService } from 'src/app/_services/agence.service';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
  @ViewChild('content' , {static : false}) el !: ElementRef
  token: any;
  agence: any;
  result : any
  fileName= 'ExcelSheet.xlsx';

  constructor(private AgenceSerice : AgenceService) { }

  ngOnInit(): void {
    
    this.token = sessionStorage.getItem('auth-user')
    this.agence = JSON.parse(this.token)
    this.AgenceSerice.getStat(this.agence.agency.nameagency).subscribe((res) => {
      this.result = res;
      });
    
  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('content');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
  }
  makePDf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Rapport vente des tickets', 70, 8);
    doc.setTextColor("red");


    (doc as any).autoTable({
      body: this.result,
      theme: 'grid',

    })

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('Rapport.pdf');
  }

}

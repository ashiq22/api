import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import { AgenceService } from 'src/app/_services/agence.service';
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  @ViewChild('content' , {static : false}) el !: ElementRef

  dataHistoriqueticket: any
  initdata!: any
  token: any;
  agence: any;
   image : any;
   fileName= 'ExcelSheet.xlsx';

  constructor(private serviceAgence: AgenceService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('auth-user')
    this.agence = JSON.parse(this.token)
    this.serviceAgence.getHistoriqueTickets(this.agence.agency.nameagency).subscribe(data => {
      this.dataHistoriqueticket = data;
      this.initdata = data
    })
  }


  search(event: any) {
    let element = event.target.value.toLowerCase()
    if (element == "") {
      this.dataHistoriqueticket = this.initdata
    } else {
      this.dataHistoriqueticket = this.initdata.filter((date: any) => date.dateVoyage.toLowerCase().includes(element))
    }

  }




  makePDf(item: any) {
   
    // var doc = new jsPDF();
    // doc.setFont("courier", "normal");
    // doc.text(JSON.stringify(item.lname), 20, 40);
    // doc.setFont("courier", "normal");
    // doc.text(JSON.stringify(item.nomLigne), 20, 60);
    // doc.setFont("courier", "normal");
    // doc.text(JSON.stringify(item.arretDepart), 20, 80);
    // doc.setFont("courier", "normal");
    // doc.text(JSON.stringify(item.arretArrive), 20, 100);
    // doc.setFont("courier", "normal");
    // doc.text(JSON.stringify(item.dateVoyage), 20, 120);
    // doc.setFont("courier", "normal");
    // doc.text(JSON.stringify(item.prix), 20, 140);
    // doc.setFont("courier", "normal").setFillColor("green");
    // doc.text(JSON.stringify(item.id_ticket), 20, 160);
    // doc.setFont("courier", "normal");
    // doc.text(JSON.stringify(item.nbticket), 20, 180);
    // doc.output('dataurlnewwindow')
  
    // doc.save('historique.pdf');


  }
  public makePDf2(item:any){

    const doc = new jsPDF();

   
    autoTable(doc, {
      body: [
        [
          {
            content: 'MalaBus',
             styles: {
               halign: 'left',
               fontSize: 20,
               textColor: '#ffffff'
             }
           },
           
          {
            content: 'Ticket validé le : ' + item.dateVoyage + " "+ item.heurDepart + 'h',
            styles: {
              halign: 'center',
              fontSize: 10,
              textColor: '#ffffff'
              
            }
          },
          {
            content: item.nameagency,
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#03224C',
      cellWidth: 'auto'      }
    });

  

    autoTable(doc, {
      body: [
        [
          {
            content: 'Reference: ' + " " + '#' + item.id_ticket
            +'\nNuméro ticket :' + " " + item.nbticket,
                        styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Nom : ' +" "+ item.lname +" "+ item.fname
            +'\nLigne : '+" " + item.nomLigne
            +'\nDe : ' +" "+ item.arretDepart
            +'\nArrivée : ' +" "+ item.arretArrive
            +'\nDépart : ' +" "+ item.dateVoyage + " " + item.heurDepart + 'h',
            styles: {
              halign: 'left'
            }
          },
          // {
          //   content: 'Shipping address:'
          //   +'\nJohn Doe'
          //   +'\nShipping Address line 1'
          //   +'\nShipping Address line 2'
          //   +'\nZip code - City'
          //   +'\nCountry',
          //   styles: {
          //     halign: 'left'
          //   }
          // },
          // {
          //   content: 'From:'
          //   +'\nCompany name'
          //   +'\nShipping Address line 1'
          //   +'\nShipping Address line 2'
          //   +'\nZip code - City'
          //   +'\nCountry',
          //   styles: {
          //     halign: 'right'
          //   }
          // }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
       
        [
          {
            content:  'Prix :' + " " +item.prix + 'DT',
            styles: {
              halign:'right',
              fontSize: 15,
              textColor: '#3366ff'
            }
          }
        ],
        [
          {
            content: 'De date: ' + " "+ item.dateVoyage,
            styles: {
              halign:'right'
            }
          }
        ]
      ],
      theme: 'plain'
    });


    autoTable(doc, {
      body: [
        [
          {
            content: 'Termes et conditions',
            styles: {
              halign: 'left',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: '1-Toute vente est difinitives. Le seul cas de remboursement, c’est l’annulation de la part de l’agence',
            styles: {
              halign: 'left'
            }
          }
        ],
          [{
            content: 
            '2-Tout achat en ligne identifé comme frauduleux sera annulé, les tickets ne seront plus valides' ,
            styles: {
              halign: 'left'
            }
          }
        ],
        [{
          content: 
          '3-La revente des billets est strictement interdite.',
                    styles: {
            halign: 'left'
          }
        }
      ],
      [{
        content: 
       '4-Cette ticket est valable pour une seule personne. Si 2 personnes ont la même ticket, les voyageures'+
        'doivent présenter leur CIN pour le contrôleur sinon, le premier voyageur seulement sera servis.'+
        'Tout comportement frauduleux risque d’être poursuit juridiquement.',
        styles: {
          halign: 'left'
        }
      }
    ],
    [{
      content: 
      '5-Tous les donnée dans cette ticket et vos informations personelles sont conservées en toute sécurité.',
      styles: {
        halign: 'left'
      }
    }
  ],
      ],
      theme: "plain"
    });

    autoTable(doc, {
      body: [
        [
          {
            content: '© Copyright TechnoGM 2021',
            styles: {
              halign: 'center',
              fontSize: 10,
              textColor: '#ffffff',
              
            }
          },
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#03224C',
              
      }
    });

    return doc.save("Ticket");

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
  makePDftick() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Rapport vente des tickets', 60, 8);
    doc.setTextColor("red");


    (doc as any).autoTable({
      theme: 'grid',

    })

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('historique.pdf');
  }




  public openPDF(): void {
    let DATA: any = document.getElementById('content');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('hostoriqueTotale.pdf');
    });
  }
}

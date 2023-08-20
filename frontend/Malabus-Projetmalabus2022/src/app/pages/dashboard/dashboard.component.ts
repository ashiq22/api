import { Component, OnInit } from "@angular/core";
import { Chart ,registerables } from 'chart.js';
import { AgenceService } from 'src/app/_services/agence.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  token: any;
  agence: any;
  result: any;
  coinDate: any;
  coinligne : any
  coinNbticket: any;
  chart: any = [];
  constructor(private AgenceSerice : AgenceService) {
    Chart.register(...registerables);
  }

  ngOnInit() {

    this.token = sessionStorage.getItem('auth-user')
    this.agence = JSON.parse(this.token)
    this.AgenceSerice.getStat(this.agence.agency.nameagency).subscribe((res) => {
      this.result = res;
      
      this.coinDate = this.result.map((coins: any) => coins.date_voyage );    
      this.coinligne = this.result.map((coins: any) => coins.ligne );        
      this.coinNbticket = this.result.map((coins: any) => coins.nbticketvondue);
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels:  this.coinligne ,
          datasets: [
            {
              data: this.coinNbticket,
              borderColor: '#3e95cd',
              fill: false,
              label: 'Nombres des tickets',
              backgroundColor: 'rgba(93, 175, 89, 0.1)',
              borderWidth: 3,
            },
          ],
        },
        
      });
    });
  }



}



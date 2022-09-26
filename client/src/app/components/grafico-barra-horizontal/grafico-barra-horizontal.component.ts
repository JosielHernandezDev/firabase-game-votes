import { Component, OnInit } from '@angular/core';
// import { multi } from './data';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnInit {
   results: any[] = [
    {
      "name":"Mario",
      "value":20
    },
    {
      "name":"Packman",
      "value":20
    },
    {
      "name":"COF",
      "value":200
    },
    {
      "name":"COF",
      "value":200
    }
   ];


  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Games';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Votes';
  legendTitle: string = 'Years';

  colorScheme = 'nightLights'//


  interval;

  constructor() {
    /// tiempo real
    this.interval=setInterval(()=>{

      const newResult = [...this.results];

      for(let i in newResult){
        newResult[i].value = Math.round(Math.random()*500);  
      }

      this.results = [...newResult]
    },1500)
  }

 onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    clearInterval(this.interval);
    
  }

}

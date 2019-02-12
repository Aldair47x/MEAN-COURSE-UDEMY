import { Component, OnInit, Input, Output, EventEmitter, Directive} from '@angular/core';


@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {
  @Input() data ;
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';

  public doughnutChartLabels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData1: number[] = [350, 450, 100];
  public doughnutChartType1: string = 'doughnut';

  public doughnutChartLabels2: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData2: number[] = [350, 450, 100];
  public doughnutChartType2: string = 'doughnut';

  public doughnutChartLabels3: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData3: number[] = [350, 450, 100];
  public doughnutChartType3: string = 'doughnut';


  constructor() { }

  ngOnInit() {
    console.log(this.data); 
  }

}

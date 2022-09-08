import { Component, HostListener, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
  contract: any
 
  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 
  }

  reqMaximized: boolean = true
  repMaximized: boolean = true

  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }

  reqMinMax() {
    this.reqMaximized = !this.reqMaximized
  }

  repMinMax() {
    this.repMaximized = !this.repMaximized
  }

  title = 'ng2-charts-demo';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 20, 15, 10, 11, 6, 5, 4 ],
        label: 'Defaulters',
        fill: true,
        tension: 0.5,
        borderColor: '#5874a8',
        backgroundColor: '#5874a8'
      }
    ],

  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels = [ [ 'Three bedrooms'], [ 'Two bedrooms' ], 'One bedroom Requests' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  }];
  
  public pieChartLegend = true;
  public pieChartPlugins = [];


  






}

import { Component, OnInit } from '@angular/core';
import {
  Chart, ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { AnswerService } from 'src/app/services/answer.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

Chart.register(ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle);

@Component({
  selector: 'app-analytic-survey',
  templateUrl: './analytic-survey.component.html',
  styleUrls: ['./analytic-survey.component.css']
})
export class AnalyticSurveyComponent implements OnInit {

  public answerArray: any[] = [];
  public result = 0;
  public satisfactionAverage = 0;
  public satisfactionLevel = "";
  public countAnswerByOptionMS = 0;
  public percentMS = 0;
  public countAnswerByOptionS = 0;
  public percentS = 0;
  public countAnswerByOptionAS = 0;
  public percentAS = 0;
  public countAnswerByOptionI = 0;
  public percentI = 0;
  public countAnswerByOptionMI = 0;
  public percentMI = 0;

  constructor(private customerService: CustomerService, private answerService: AnswerService) {

  }

  async ngOnInit(): Promise<void> {
    await this.getAnswer();
    await this.getAnswerByMS();
    await this.getAnswerByS();
    await this.getAnswerByAS();
    await this.getAnswerByI();
    await this.getAnswerByMI();
    this.createLinearChart();
    this.createDonutChart();
  }

  createLinearChart() {
    const ctx: any = document.getElementById('totalResults');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Muy Satisfecho', 'Satisfecho', 'Algo Satisfecho', 'Insatisfecho', 'Muy Insatisfecho'],
        datasets: [{
          label: "Muy Satisfecho",
          data: [this.countAnswerByOptionMS, this.countAnswerByOptionS, this.countAnswerByOptionAS, this.countAnswerByOptionI, this.countAnswerByOptionMI],
          backgroundColor: [
            'rgba(26, 255, 0, 0.4)',
            'rgba(100, 255, 0, 0.4)',
            'rgba(255, 255, 0, 0.4)',
            'rgba(255, 170, 0, 0.4)',
            'rgba(255, 0, 0, 0.4)'
          ],
          borderColor: [
            'rgba(26, 255, 0, 1)',
            'rgba(100, 255, 0, 1)',
            'rgba(255, 255, 0, 1)',
            'rgba(255, 170, 0, 1)',
            'rgba(255, 0, 0, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });
  }
  createDonutChart() {
    const ctx: any = document.getElementById('donutTotalResult');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Muy satisfecho',
          'Satisfecho',
          'Algo Satisfecho',
          'Instatisfecho',
          'Muy Insatisfecho'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.percentMS, this.percentS, this.percentAS, this.percentI, this.percentMI],
          backgroundColor: [
            'rgb(54, 200, 100)',
            'rgb(54, 200, 140)',
            'rgb(255, 205, 86)',
            'rgb(255, 170, 40)',
            'rgb(255, 99, 100)'
          ],
          hoverOffset: 4
        }]
      }
    });

  }

  getAnswer() {
    return new Promise<void>((resolve, reject) => {

      this.customerService.getCustomer("/answer/").subscribe((res) => {
        this.answerArray = res.answer;

        this.operation();
        resolve()
      });
    });
  }

  operation() {
    for (let i = 0; i < this.answerArray.length; i++) {
      this.result += this.answerArray[i].optionId;

    }
    this.satisfactionAverage = (this.result * 100) / (this.answerArray.length * 5);
    this.satistactionCalc();

  }

  satistactionCalc() {
    if (this.satisfactionAverage <= 20) {
      this.satisfactionLevel = "Muy Insatisfecho"
    }
    if (this.satisfactionAverage > 20 && this.satisfactionAverage <= 40) {
      this.satisfactionLevel = "Insatisfecho"
    }
    if (this.satisfactionAverage > 40 && this.satisfactionAverage <= 60) {
      this.satisfactionLevel = "Algo Satisfecho"
    }
    if (this.satisfactionAverage > 60 && this.satisfactionAverage <= 80) {
      this.satisfactionLevel = "Satisfecho"
    }
    if (this.satisfactionAverage > 80 && this.satisfactionAverage <= 100) {
      this.satisfactionLevel = "Satisfecho"
    }
  }
  getAnswerByS(): any {
    return new Promise<void>((resolve, reject) => {
      this.answerService.getAnswerByOption(4).subscribe((res) => {
        this.countAnswerByOptionS = res.answerByOption.length;
        this.percentS = this.operationByOption(this.countAnswerByOptionS);
        resolve();
      });
    });
  }
  getAnswerByAS(): any {
    return new Promise<void>((resolve, reject) => {
      this.answerService.getAnswerByOption(3).subscribe((res) => {
        this.countAnswerByOptionAS = res.answerByOption.length;
        this.percentAS = this.operationByOption(this.countAnswerByOptionAS);
        resolve();
      });
    });
  }
  getAnswerByI(): any {
    return new Promise<void>((resolve, reject) => {
      this.answerService.getAnswerByOption(2).subscribe((res) => {
        this.countAnswerByOptionI = res.answerByOption.length;
        this.percentI = this.operationByOption(this.countAnswerByOptionI);
        resolve();
      });
    });
  }
  getAnswerByMI(): any {
    return new Promise<void>((resolve, reject) => {
      this.answerService.getAnswerByOption(1).subscribe((res) => {
        this.countAnswerByOptionMI = res.answerByOption.length;
        this.percentMI = this.operationByOption(this.countAnswerByOptionMI);
        resolve();
      });
    });
  }
  getAnswerByMS() {
    return new Promise<void>((resolve, reject) => {
      this.answerService.getAnswerByOption(5).subscribe((res) => {
        this.countAnswerByOptionMS = res.answerByOption.length;
        this.percentMS = this.operationByOption(this.countAnswerByOptionMS);
        resolve();
      });
    });

  }

  operationByOption(countAnsByOp: number): any {
    let percent: any = (countAnsByOp * 100) / this.answerArray.length
    return Math.floor(percent);
    /*
    let diference = percent - parseInt(percent);
 
    if (diference <= 0.6) {
      return Math.floor(percent);
    } else {
      return Math.ceil(percent);
    }*/
  }

  deleteAnswer() {
    Swal.fire({
      title: '¿Esta seguro de reiniciar estadisticas?',
      text: '(Se borraran todas las respuestas existentes)',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.answerService.deleteAllAnswer().subscribe((res) => {
          if (res.message == 'OK') {
            console.log('🤗');
            this.updateCustomerStateFalse();
            this.updateCustomerStateLocalStorage();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Resultados borrados',
              showConfirmButton: false,
              timer: 1000
            });
          } else {
            console.log('😥', res.message.error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error reiniciando estadisticas',
              showConfirmButton: false,
              timer: 1000
            });
          }
        })
      }
    })

  }

  updateCustomerStateFalse() {
    this.customerService.updateCustomerStateFalse().subscribe((res) => {
      if (res.message == 'OK') {
        console.log('🤗');

      } else {
        console.log('😥', res.message.error);
      }
    })
  }
  updateCustomerStateLocalStorage() {
    this.customerService.updateCustomerStateLocalStorage().subscribe((res) => {

      if (res.message == 'OK') {

        localStorage.setItem('authCredential', JSON.stringify(res.resTmp));
      }
    })
  }


}



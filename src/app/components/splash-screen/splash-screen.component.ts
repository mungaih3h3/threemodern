import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  @ViewChild('text', { static: false }) el!: ElementRef
  windowWidth: string ='0';
  constructor() { }
  i = 0;
  txt:string = 'There is no better time than now!';
  speed = 50;
  
  ngOnInit(): void {
    setTimeout(() => {
      console.log("yes")
      this.windowWidth = '-' + window.innerWidth + 'px'
    }, 3000);
   //this.typeWriter()
  }

 

 typeWriter() {

   if (this.i < this.txt?.length) {
    let element= this.el.nativeElement;  
    element.innerHTML += this.txt.charAt(this.i);
    this.i++;
    // setTimeout(this.typeWriter, this.speed);
     console.log(element.innerHTML)
   }
   
   
}




}

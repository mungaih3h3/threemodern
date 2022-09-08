import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input, HostListener} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})

export class PropertyDetailsComponent implements OnInit {
  selector: string = ''
  default:string= '../../assets/images/upload.png'
  imageSrc: string[] = [];
  last!: string;

  @Input() index: any
  @Input() property: any
  changed = false
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
  contract: any
 

  @Output() event = new EventEmitter()
  constructor(private http: HttpClient, private interactionService: InteractionService) { }
  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }

  popViewTenant() {
    alert("the tenant section is clicked")
  }

  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
    }
      
  }

  return() {
    this.selector = 'Property Type'
    this.event.emit(this.selector)
  }

  showTenants() {
    this.selector = 'tenants'
  }
  
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });


  onFileChange(event: Event) {
   
    const target = event.target as HTMLInputElement;
    
    if (target?.files && target?.files.length) {
      const [...files] = target.files;
      this.imageSrc = []
      files.forEach(
        (file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            
            this.imageSrc.push(reader.result as string)
            this.changed = true;
            console.log("image list= "+ this.imageSrc)
            console.log("length=  " + this.imageSrc.length)
            this.last=this.imageSrc[this.imageSrc.length - 1]
            console.log("last "+ this.last)
          }
        }
      )  
    }
  }

  changeImage(val: any) {
    this.last=this.imageSrc[val]
  }
}
  



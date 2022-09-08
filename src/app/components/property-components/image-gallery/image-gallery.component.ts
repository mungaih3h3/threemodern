import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

interface Image{
  path: string;
  description: string;
}

const images: Image[] = [
  {
    path: '../../../../assets/images/gate.jpg', 
    description: 'entrance'
  }, 
  {
    path: '../../../../assets/images/front.jpg', 
    description: 'front'
  },
  {
    path: '../../../../assets/images/garden.jpg', 
    description: 'rear'
  },
  {
    path: '../../../../assets/images/kitchen.jpg', 
    description: 'kitchen'
  },
  {
    path: '../../../../assets/images/bedroom.jpg', 
    description: 'bedroom'
  },
  {
    path: '../../../../assets/images/balcony.jpg', 
    description: 'balcony'
  },

  {
    path: '../../../../assets/images/pool.jpg', 
    description: 'swimming pool'
  },
  {
    path: '../../../../assets/images/washroom.jpg', 
    description: 'bathroom'
  },
]

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  photos=images;

  paused = true;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }


}

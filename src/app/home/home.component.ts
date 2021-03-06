import { Response } from '@angular/http';
import { BannerService } from './../banner.service';
import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public temp = "file:///D://eha-user-deployed//src//assets//img//banners//1.jpg";

  public bannerList = [{}];


  constructor(private bannerservice: BannerService) {
    console.log(`##creating HomeComponent in @constructor`);
   }

  ngOnInit() {
    this.bannerservice.getall().subscribe((response) => {
    
      let res: any = response;
      let d: any = res.data;
      this.bannerList = d;
      console.log(d);
      console.log(`## banner response ${this.bannerList}`)
      console.log(this.bannerList);
      console.log(d[1].categoryDomain.categoryName)
     
    })
    $('.banners-masonry-active').imagesLoaded(function () {

      $('.banners-masonry-active').masonry({
        itemSelector: '.masonry-item',
        columnWidth: 1
      });

    });

    $('.hero-area').slick({
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 8000,
      adaptiveHeight: true,
      dots: false,
      arrows: true,
      fade: true,
      easing: 'ease-in-out',
      speed: 1000,
      prevArrow: '<span class="slider-navigation slider-navigation-prev"><i class="fa fa-angle-left"></i></span>',
      nextArrow: '<span class="slider-navigation slider-navigation-next"><i class="fa fa-angle-right"></i></span>',
    });
  }


}

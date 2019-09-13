import 'slick-carousel'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


$(document).ready(function(){

  $('.autoplay').slick({
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
    {
      breakpoint: 770,
      mobileFirst: true,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      mobileFirst: true,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        slidesToScroll: 1

      }
    }
  ]
    });
});

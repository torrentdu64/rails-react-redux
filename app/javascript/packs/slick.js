import 'slick-carousel'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


$(document).ready(function(){

  $('.autoplay').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
    });
});

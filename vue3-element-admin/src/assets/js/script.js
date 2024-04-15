(function($) {

    "use strict";
                // init Chocolat light box
                var initChocolat = function () {
                  Chocolat(document.querySelectorAll('.image-link'), {
                    imageSize: 'contain',
                    loop: true,
                  })
                }

        document.addEventListener("DOMContentLoaded", function(){
        
          window.addEventListener('scroll', function() {
              
            if (window.scrollY > 50) {
              document.getElementById('primary-header').classList.add('fixed-top');
            } else {
              document.getElementById('primary-header').classList.remove('fixed-top');
              // remove padding top from body
              document.body.style.paddingTop = '0';
            } 
          });
        }); 
        // DOMContentLoaded  end



        $(document).ready(function() {

          initChocolat();
  

          $(".user-items .search-item").click(function(){
              $(".search-box").toggleClass('active');
              $(".search-box .search-input").focus();
            });
            $(".close-button").click(function(){
              $(".search-box").toggleClass('active');
            });  

          var swiper = new Swiper(".testimonial-swiper", {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          }); 


          var swiper = new Swiper(".team-swiper", {
            slidesPerView: 2,
            spaceBetween: 20,
            pagination: {
              el: "#our-team .swiper-pagination",
              clickable: true,
            },
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            },
          });  

          window.addEventListener("load", (event) => {
            //isotope
            $('.isotope-container').isotope({
              // options
              itemSelector: '.item',
              layoutMode: 'masonry'
            });
      
      
      
            // Initialize Isotope
            var $container = $('.isotope-container').isotope({
              // options
              itemSelector: '.item',
              layoutMode: 'masonry'
            });
      
            $(document).ready(function () {
              //active button
              $('.filter-button').click(function () {
                $('.filter-button').removeClass('active');
                $(this).addClass('active');
              });
            });
      
            // Filter items on button click
            $('.filter-button').click(function () {
              var filterValue = $(this).attr('data-filter');
              if (filterValue === '*') {
                // Show all items
                $container.isotope({ filter: '*' });
              } else {
                // Show filtered items
                $container.isotope({ filter: filterValue });
              }
            });
      
          });
      
      


        }); // End of a document      



    })(jQuery);

// Counter Up =========
// jQuery(document).ready(function( $ ) {

// 	$('.counter').counterUp({
// 			time: 1500
// 	});

// });





// Slider =========
$(document).ready(function(){

	$('.heroSlider').owlCarousel({
		    loop:true,
		    nav:false,
		    dots: false,
		    items:1,

		})

	$('.service-slider').owlCarousel({
	    loop:true,
	    margin:30,
	    nav:false,
	    dots: true,
	    dotsEach: 1,
	    responsive: {
             0: {
                 items: 1
             },
             767: {
                 items: 1
             },
             991: {
                 items: 2
             },
             1000: {
                 items: 3
             },
             1199: {
                 items: 3
             },
             1920: {
                 items: 3
            }
        }
	});



	$('.online-class-slider').owlCarousel({
	    loop:true,
	    margin:20,
	    nav:false,
	    dots: true,
	    dotsEach: 1,
	    responsive: {
             0: {
                 items: 1
             },
             767: {
                 items: 1
             },
             991: {
                 items: 1
             },
             1000: {
                 items: 2
             },
             1199: {
                 items: 2
             },
             1920: {
                 items: 2
            }
        }
	});



	$('.testy-slider').owlCarousel({
	    loop:true,
		nav:false,
		dots: true,
		items:1,
	});


    $('.testi-slider2').owlCarousel({
        loop:true,
        nav:true,
        dots: false,
        items:1,
    });





// Mobile menu=================

		$('.menu-toggle').click(function(){
			$(this).toggleClass('active');
			$('.main-menu').slideToggle();
		})






// sticky menu===================
	    var wind = $(window);
	    var sticky = $('#sticky-header');
	    wind.on('scroll', function () {
	        var scroll = wind.scrollTop();
	        if (scroll <100) {
	            sticky.removeClass('sticky-nav');
	        } else {
	            sticky.addClass('sticky-nav');
	        }
	    });


// Venobox
    // $(document).ready(function(){
    //     $('.venobox').venobox(); 
    // });

	
});


// scroll strat============================

		 $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('.go-top').addClass('active');
        if (scrolled < 300) $('.go-top').removeClass('active');
    });

    $('.go-top').on('click', function () {
        $("html, body").animate({
            scrollTop: "0"
        }, 1200);
    });


    


       //Header Search

    if($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function() {
            $('body').addClass('search-active');
        });
        $('.close-search').on('click', function() {
            $('body').removeClass('search-active');
        });
    }





    const labels = document.querySelectorAll(".accordion-item__label");
const tabs = document.querySelectorAll(".accordion-tab");

function toggleShow() {
  const target = this;
  const item = target.classList.contains("accordion-tab")
    ? target
    : target.parentElement;
  const group = item.dataset.actabGroup;
  const id = item.dataset.actabId;

  tabs.forEach(function(tab) {
    if (tab.dataset.actabGroup === group) {
      if (tab.dataset.actabId === id) {
        tab.classList.add("accordion-active");
      } else {
        tab.classList.remove("accordion-active");
      }
    }
  });

  labels.forEach(function(label) {
    const tabItem = label.parentElement;

    if (tabItem.dataset.actabGroup === group) {
      if (tabItem.dataset.actabId === id) {
        tabItem.classList.add("accordion-active");
      } else {
        tabItem.classList.remove("accordion-active");
      }
    }
  });
}

labels.forEach(function(label) {
  label.addEventListener("click", toggleShow);
});

tabs.forEach(function(tab) {
  tab.addEventListener("click", toggleShow);
});







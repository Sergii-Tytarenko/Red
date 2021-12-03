/* Burger 
-----------------------------------------------------------------------------*/
const body = document.querySelector('body'),
      mainHeader = document.querySelector('.main-header'),
      burger = document.querySelector('.burger'),
      burgerNav = document.querySelector('.main-header__nav'),
      burgerNavLink = burgerNav.querySelectorAll(".main-header__link");


/* Burger active
   Show burger nav
-----------------------------------------------------------------------------*/
burger.addEventListener('click', function () {
   if (burger) {
      burger.classList.toggle('active');
   }
   if ( burger.classList.contains('active') ) {
      showBurgerNav ();
   } else {
      closeBurgerNav ();
   }
});


/* Close menu when links is active
-----------------------------------------------------------------------------*/
for (let i = 0; i < burgerNavLink.length; i++) {
   burgerNavLink[i].addEventListener("click", function() {
      if(burgerNav.classList.contains('active')) {
         closeBurgerNav ();
      }
   });
}


/* Functions of burger nav
-----------------------------------------------------------------------------*/
function showBurgerNav () {
   burgerNav.classList.add('active');
   mainHeader.classList.add('active');
   body_lock(0);
}

function closeBurgerNav () {
   burger.classList.remove('active');
   burgerNav.classList.remove('active');
   mainHeader.classList.remove('active');
   body_lock(0);
}


/* Founders slider
---------------------------------------------------------------*/
const foundersSlider = document.querySelector('.founders__body');
let newSwiper;

function mobileSlider() {
	if (window.innerWidth <= 767 && foundersSlider.dataset.mobile == 'false') {
		newSwiper = new Swiper(foundersSlider, {
         slidesPerView: 1,
         spaceBetween: 50,
         wrapperClass: 'founders__list',
         slideClass: 'founders__column',
         pagination: {
            el: '.founders__pagination',
            type: 'bullets',
          },    
		});

		foundersSlider.dataset.mobile = 'true';
	}

	if (window.innerWidth > 767) {
		foundersSlider.dataset.mobile = 'false';
		if (foundersSlider.classList.contains('swiper-container-initialized')) {
         newSwiper.destroy();
		}
	}
}

mobileSlider()

window.addEventListener('resize', () => {
	mobileSlider();
});

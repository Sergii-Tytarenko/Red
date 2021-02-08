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


;
/* WebP
-----------------------------------------------------------------------------*/
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});


/* BodyLock
-----------------------------------------------------------------------------*/
let unlock = true;
function body_lock(delay) {
	let body = document.querySelector("body");
	
    if (body.classList.contains("lock")) {
      body_lock_remove(delay);
    } else {
      body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
	let body = document.querySelector("body");

	if (unlock) {
		let lock_padding = document.querySelectorAll(".lp");

		setTimeout(() => {
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = "0px";
		}
		body.style.paddingRight = "0px";
		body.classList.remove("lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
		unlock = true;
		}, delay);
	}
}

function body_lock_add(delay) {
	let body = document.querySelector("body");

	if (unlock) {
	let lock_padding = document.querySelectorAll(".lp");

	for (let index = 0; index < lock_padding.length; index++) {
		const el = lock_padding[index];
		el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	}
	body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	body.classList.add("lock");

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, delay);
	}
}



/* Smoth scroll
-----------------------------------------------------------------------------*/
const smoothLinks = document.querySelectorAll('.smooth');

if (smoothLinks.length > 0) {
	for (let smoothLink of smoothLinks) {
		smoothLink.addEventListener('click', function (e) {
			e.preventDefault();
			const id = smoothLink.getAttribute('href');
	
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};
}


/* Modal Windows
-----------------------------------------------------------------------------*/
let modalLinks = document.querySelectorAll('.modal-link');
const overlay = document.querySelector('.overlay');

if (modalLinks.length > 0) {
    for (let i = 0; i < modalLinks.length; i++) {
        let modalLink = modalLinks[i];

        modalLink.addEventListener('click', () => {
            let linkTarget = modalLink.dataset.modal;
            let modalWindow = document.querySelector(`${linkTarget}`);

            modalActive(modalWindow);
        });
        
    }
}

function modalActive (target) {
    if (target) {
        modalShow (target);

        let closeBtn = target.querySelector('.modal__close');

        closeBtn.addEventListener('click', () => {
            modalClose (target);
        });

        overlay.addEventListener('click', () => {
            modalClose (target);
        });

        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape') {
                modalClose (target);
            }
        });
    }
}

function modalShow (target) {
	target.classList.add('modal-show');
	overlay.classList.add('modal-show');
	if (burgerNav.classList.contains('active')) {
		closeBurgerNav ();
	} else {
		body_lock(0);
	}
}

function modalClose (target) {
	target.classList.remove('modal-show');
	overlay.classList.remove('modal-show');
	body_lock(0);
}
;
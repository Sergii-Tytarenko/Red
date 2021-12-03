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
const linkNav = document.querySelectorAll('.smooth'),
      V = .1; 
for (let link of linkNav) {
    link.addEventListener('click', function (e) {
        e.preventDefault(); 

        let w = window.pageYOffset,  
            hash = this.href.replace(/[^#]*(.*)/, '$1'),
			start = null,
			block = document.querySelector(hash),
			marginTop = parseInt(getComputedStyle(block).marginTop),
			t = block.getBoundingClientRect().top - marginTop;
        	 
        requestAnimationFrame(step); 
		
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            }
        }
    });
}
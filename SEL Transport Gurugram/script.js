/*=========================================================
                SAFE EXPRESS LOGISTICS
                    SCRIPT.JS
=========================================================*/


/*=========================================================
                SELECT ELEMENTS
=========================================================*/

const header = document.getElementById("header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

const heroImage = document.querySelector(".hero-image");


/*=========================================================
                STICKY NAVBAR
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("sticky");

    }

    else {

        header.classList.remove("sticky");

    }

});


/*=========================================================
                MOBILE MENU
=========================================================*/

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.classList.toggle("open");

    if(menuBtn.classList.contains("open")){

        menuBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';

    }

    else{

        menuBtn.innerHTML='<i class="fa-solid fa-bars"></i>';

    }

});


/*=========================================================
            CLOSE MENU AFTER CLICK
=========================================================*/

navItems.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        menuBtn.classList.remove("open");

        menuBtn.innerHTML='<i class="fa-solid fa-bars"></i>';

    });

});


/*=========================================================
            ACTIVE NAVIGATION
=========================================================*/

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-150;

        if(window.scrollY>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/*=========================================================
                HERO PARALLAX
=========================================================*/

document.addEventListener("mousemove",(e)=>{

    if(window.innerWidth<992) return;

    const x=(window.innerWidth/2-e.clientX)/40;

    const y=(window.innerHeight/2-e.clientY)/40;

    heroImage.style.transform=

    `translate(${x}px,${y}px)`;

});


document.addEventListener("mouseleave",()=>{

    heroImage.style.transform="translate(0,0)";

});


/*=========================================================
                SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            window.scrollTo({

                top:target.offsetTop-80,

                behavior:"smooth"

            });

        }

    });

});


/*=========================================================
            HERO CARD HOVER EFFECT
=========================================================*/

const cards=document.querySelectorAll(".floating-card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px) scale(1.05)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0) scale(1)";

    });

});


/*=========================================================
                COUNTER ANIMATION
=========================================================*/

const counters=document.querySelectorAll(".stat-box h2");

let started=false;

function startCounter(){

    if(started) return;

    const trigger=document.querySelector(".hero-stats");

    if(!trigger) return;

    const top=trigger.getBoundingClientRect().top;

    if(top<window.innerHeight-100){

        started=true;

        counters.forEach(counter=>{

            const txt=counter.innerText;

            const number=parseInt(txt);

            if(isNaN(number)) return;

            let count=0;

            const speed=35;

            const update=()=>{

                if(count<number){

                    count++;

                    counter.innerHTML=count+"+";

                    setTimeout(update,speed);

                }

                else{

                    counter.innerHTML=number+"+";

                }

            }

            update();

        });

    }

}

window.addEventListener("scroll",startCounter);

window.addEventListener("load",startCounter);


/*=========================================================
            SCROLL REVEAL
=========================================================*/

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});


document.querySelectorAll(

".hero-tag,.hero-content h1,.hero-content p,.hero-btns,.hero-stats,.hero-image"

).forEach(el=>{

    observer.observe(el);

});


/*=========================================================
                WINDOW LOAD
=========================================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


/*=========================================================
                LOGISTICS JOURNEY
=========================================================*/

const journey = document.querySelector(".journey");

if(journey){

const truck = document.querySelector(".journey-truck");

const stops = document.querySelectorAll(".stop");

const counters = document.querySelectorAll(".counter");

let current = 0;

let started = false;


/*=========================================================
                COUNTER
=========================================================*/

function startCounter(){

    counters.forEach(counter=>{

        const target = counter.dataset.target;

        if(!target) return;

        let count = 0;

        const speed = target / 50;

        const update = ()=>{

            count += speed;

            if(count < target){

                counter.innerHTML = Math.ceil(count) + "+";

                requestAnimationFrame(update);

            }

            else{

                counter.innerHTML = target + "+";

            }

        }

        update();

    });

}


/*=========================================================
                TRUCK MOVE
=========================================================*/

function moveTruck(){

    // Remove old active
    stops.forEach(stop=>{

        stop.classList.remove("active");

    });

    // Current active
    stops[current].classList.add("active");

    // Active dot
    const dot = stops[current].querySelector(".dot");

    // Road position
    const roadRect = document.querySelector(".road").getBoundingClientRect();

    // Dot position
    const dotRect = dot.getBoundingClientRect();

    // Truck center on active dot
    const truckLeft =
        dotRect.left -
        roadRect.left +
        (dotRect.width / 2) -
        (truck.offsetWidth / 2);

    truck.style.left = truckLeft + "px";

    // Bounce animation
    truck.classList.remove("active");

    setTimeout(()=>{

        truck.classList.add("active");

    },10);

    current++;

    if(current >= stops.length){

        current = 0;

    }

}


/*=========================================================
            START ANIMATION
=========================================================*/

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !started){

            started = true;

            startCounter();

            moveTruck();

          setInterval(moveTruck,3000);

        }

    });

},{
    threshold:.35
});

observer.observe(journey);

}


/*=========================================================
            WHATSAPP QUOTE FORM
=========================================================*/

const quoteForm = document.getElementById("quoteForm");

quoteForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const name=document.getElementById("name").value.trim();

    const email=document.getElementById("email").value.trim();

    const phone=document.getElementById("phone").value.trim();

    const company=document.getElementById("company").value.trim();

    const message=document.getElementById("message").value.trim();

    const whatsappMessage=

`🚚 *Safe Express Logistics - Quote Request*

👤 *Name:* ${name}

🏢 *Company:* ${company}

📞 *Phone:* ${phone}

📧 *Email:* ${email}

📦 *Requirement:*
${message}`;

    const url=`https://wa.me/918698410923?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url,"_blank");

});



/*==================================
        TRUCK CURSOR 😂
==================================*/

const cursor=document.querySelector(".truck-cursor");

const smoke=document.querySelector(".smoke");

let mouseX=0;
let mouseY=0;

let truckX=0;
let truckY=0;

document.addEventListener("mousemove",(e)=>{

mouseX=e.clientX;

mouseY=e.clientY;

});


function animateTruck(){

truckX+=(mouseX-truckX)*0.18;

truckY+=(mouseY-truckY)*0.18;

cursor.style.left=truckX+"px";

cursor.style.top=truckY+"px";

requestAnimationFrame(animateTruck);

}

animateTruck();



/*==================================
        SMOKE PARTICLES 😂

        setInterval(()=>{

const puff=document.createElement("span");

puff.style.left=Math.random()*8+"px";

puff.style.top=Math.random()*8+"px";

smoke.appendChild(puff);

setTimeout(()=>{

puff.remove();

},1300);

},80);

==================================*/


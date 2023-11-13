'use strict'

const mainRightCrcls = document.querySelector(".main__rightCrcls");
const main2Text = document.querySelector(".main2__text");
const main2Cake = document.querySelector(".main2__cake");
const sections = document.querySelectorAll("section");
const images = document.querySelectorAll(".gallery__img");
const lightBox = document.querySelector(".lightbox")
const lightBoxCont = document.querySelector(".lightbox__container");
const activeImg = document.querySelector(".lightbox__item--img");
const closeBtn = document.querySelector(".lightbox__item--close");
const nextBtn = document.querySelector(".lightbox__item--next");
const undoBtn = document.querySelector(".lightbox__item--undo");
const responsiveBtns = document.querySelectorAll(".responsive__icon");
const closeMenuBtns = document.querySelectorAll(".closeMenu");
const responsMenuColors = document.querySelectorAll(".responsive__menu");

const verifyVisibility = (entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            console.log(entry.target.classList.value)
        }
        if (entry.isIntersecting && entry.target.classList.value=="main") {
            for (let i=1; i<6; i++) {
            document.querySelector(`.crcl${i}`).style.animationName = "mainCrclsDown";
            document.querySelector(`.crcl${i}`).style.display = "unset"
        }
        }
        if (entry.isIntersecting && entry.target.classList.value=="main2") {
            main2Text.classList.add("main2__text-toggle") 
            main2Cake.classList.add("main2__cake-toggle")
        }
        if (entry.isIntersecting && entry.target.classList.value=="main3") {
            for(const image of images) {
                image.classList.add("gallery__img-active")
            }
        }
    }  
};

const responBtnColor  = (entries) => {
    for (const entry of entries) {
        if(entry.target.classList.value=="main") {
            for (const responsiveBtn of responsiveBtns) {
                responsiveBtn.style.color = "#FF69B6" 
            }
            for (const responsMenuColor of responsMenuColors) {
                responsMenuColor.style.backgroundColor = "#FF69B6"
            }
        }
        if(entry.target.classList.value=="menu"){
            for (const responsiveBtn of responsiveBtns) {
                responsiveBtn.style.color = "#00B9AF"
            }
            for (const responsMenuColor of responsMenuColors) {
                responsMenuColor.style.backgroundColor = "#00B9AF"
            }
        }
        if(entry.target.classList.value=="about"){
            for (const responsiveBtn of responsiveBtns) {
                responsiveBtn.style.color = "#CD80FF"
            }
            for (const responsMenuColor of responsMenuColors) {
                responsMenuColor.style.backgroundColor = "#CD80FF"
            }
        }
        if(entry.target.classList.value=="contact"){
            for (const responsiveBtn of responsiveBtns) {
                responsiveBtn.style.color = "#00E3A1"
            }
            for (const responsMenuColor of responsMenuColors) {
                responsMenuColor.style.backgroundColor = "#00E3A1"
            }
        }
    }
};

const observer = new IntersectionObserver(verifyVisibility,{
    threshold: 0.5
});

 const responsiveBtnColor = new IntersectionObserver(responBtnColor,{
    threshold: 0
});

for (const section of sections) {
    observer.observe(section)
    responsiveBtnColor.observe(section)
 };

for (const responsiveBtn of responsiveBtns) {
    responsiveBtn.addEventListener("click",()=>{
        for (const responsMenuColor of responsMenuColors){
            responsMenuColor.classList.add("responsive__menu-toggle");
        }
    })
};

for (const closeMenuBtn of closeMenuBtns) {
    closeMenuBtn.addEventListener("click",()=>{
        for (const responsMenuColor of responsMenuColors){
            responsMenuColor.classList.remove("responsive__menu-toggle");
        }      
    })
};

//LightBox Start//
let img = 0;

// Open LightBox //
for (let i = 0; i < images.length; i++) {
    if(images[i]) {
        images[i].addEventListener("click", (e)=>{
        activeImg.src = e.target.src
        lightBox.style.display = "flex";
        img = Array.from(images).indexOf(e.target);
})
}
};

// Close LightBox //
if (closeBtn) {
    closeBtn.addEventListener("click", ()=>{
    lightBox.style.display = "none";
})
};

// Next Parking Img //
if(nextBtn) {
    nextBtn.addEventListener('click',()=>{
    if (img === 7) {
        img = -1;
    }
    activeImg.src = images[img + 1].src;
    img++;
})
};

//Undo Parking Img //
if(undoBtn) {
    undoBtn.addEventListener('click',()=>{
    if (img === 0) {        
        img = 8;
    }
    activeImg.src = images[img - 1].src;
    img --;    
})
};
//LightBox End//



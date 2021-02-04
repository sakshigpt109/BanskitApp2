const button= document.querySelector(".btn--scroll-to");
const section1 = document.querySelector('#section--1');
const sections=document.querySelectorAll('.section');
const links=document.querySelectorAll('.nav__link');
const nav=document.querySelector('.nav');
const gridHeader=document.querySelector('.header');
const btn1=document.querySelector('.btn--show-modal');
const btn2=document.querySelector('.btn--close-modal');
const form=document.querySelector('.modal');
const formClose=document.querySelector('.overlay');
const tabContainer=document.querySelector('.operations__tab-container');
const tabContent=document.querySelectorAll('.operations__content');
const tab=document.querySelectorAll('.operation__tab');
const getImg=document.querySelectorAll('img[data-src]');
const leftBtn=document.querySelector('.slider__btn--left');
const rightBtn=document.querySelector('.slider__btn--right');
const slides=document.querySelectorAll('.slide');

//learn more button
button.addEventListener('click',function(){
    section1.scrollIntoView({ behavior: 'smooth' });  
})
//click on link for sections
links.forEach(function(s){
    s.addEventListener('click',function(e){
        e.preventDefault();
        console.log(e.target);
        const id= this.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
 })
})

//open account button
btn1.addEventListener('click',function(e){
    e.preventDefault();
    form.classList.remove('hidden');
    formClose.classList.remove('hidden');
})
 //close account button
btn2.addEventListener('click',function(e){
    e.preventDefault();
    form.classList.add('hidden');
    formClose.classList.add('hidden');
})

//operation tab container
tabContainer.addEventListener('click',function(e){
    const tabBtn=e.target.closest('.operations__tab');
    tabContent.forEach(s=>s.classList.remove('operations__content--active'));
    tab.forEach(b=>b.classList.remove('operations__tab--active'));
    if(!tabBtn){
      return;

}
document.querySelector(`.operations__content--${tabBtn.dataset.tab}`).classList.add('operations__content--active');
tabBtn.classList.add('operations__tab--active');
})

//nav links hover
const navLinks =document.querySelector('.nav__links');
const mouseIn=function(e){
    if(e.target.classList.contains('.nav__link')){
        
        const a=e.target;
        console.log(a);
        const check=a.closest('.nav').querySelectorAll('.nav__link');
        const logo=a.closest('.nav').querySelector('img');
        check.forEach(s=>{
            if(s!==a){
              s.style.opacity=this;
            }
            
        })
        logo.style.opacity=this;
    }
}


navLinks.addEventListener('mouseover',mouseIn.bind(0.5));
navLinks.addEventListener('mouseOut',mouseIn.bind(1));

//header functionality

const gridHeaderHeight=nav.getBoundingClientRect().height;
console.log(gridHeaderHeight);

const gridNav=function(entries){
    const [x]=entries;
    console.log(entries);
    if(!x.isIntersecting){
        nav.classList.add('sticky')
    }
    else{
    nav.classList.remove('sticky');
    }
}
const headerObserver= new IntersectionObserver(gridNav,{
    root:null,
    threshold:0,
    rootMargin:`${gridHeaderHeight}px`

})
headerObserver.observe(gridHeader);

const displaySection=function(entries,observer){
    const[y]=entries;
    console.log(y);
    
    if(!y.isIntersecting){
        return;
    }
    y.target.classList.remove('section--hidden');
    observer.unobserve(y.target);

}
const sectionObserver=new IntersectionObserver(displaySection,{
    root:null,
    threshold:0,
});
sections.forEach(function(s){
    sectionObserver.observe(s);
    s.classList.remove('section--hidden');
})

//img loading
const loadImg=function(entries,observer){
    const[z]=entries;
    if(!z.isIntersecting){
        return;
    }
    z.target.src=z.target.dataset.src;
    z.target.addEventListener('load',function(){
        z.target.classList.remove('lazy-img');
    })
}
const imgLoading= new IntersectionObserver(loadImg,{
    root:null,
    threshold:0,
    rootMargin:'100px'
})

getImg.forEach(function(s){
    imgLoading.observe(s);
    
})

//slider btns
let currentSlide=0;
let maxLength=slides.length;

const mainSlide=function(s1){
  slides.forEach((s1,i)=>{
 s1.style.transform=`translateX(${100})`;
  })
}

const leftSlide=function(){
    if(currentSlide===0){
        currentSlide=maxLength-1
    }
    else{
        currentSlide--;
    }
    mainSlide(currentSlide);
}

const rightSlide=function(){
    if(currentSlide===maxLength-1){
      currentSlide=0;
    }
    else{
        currentSlide++;
    }
    mainSlide(currentSlide);
}

leftBtn.addEventListener('click',leftSlide);
rightBtn.addEventListener('click',rightSlide);
















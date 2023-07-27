// import { preloadImages } from './utils';
import { gsap } from 'gsap/all';
import { TypeTransition } from './typeTransition';

// preload images then remove loader (loading class) 
// preloadImages('.item__img, .article__img').then(() => document.body.classList.remove('loading'));
setInterval(() => {
  document.body.classList.remove('loading');
}, 2000);

// text transition
const typeT = new TypeTransition(document.querySelector('[data-type-transition]'));

// true if there's an animation running
let isAnimating = false;

// header element
const headerEl = document.querySelector('.header');

// card element
const cardEl = document.querySelector('.card');
const cardWrapEl = document.querySelector('.card-wrap');
const contentWrapEl = document.querySelector('.content-wrap');
const bg = document.querySelector('.bg');

// on click action
cardEl.addEventListener('click', () => openCard());

const openCard = () => {
    if ( isAnimating ) return;

    isAnimating = true;
    
    // gsap timeline
    const openTimeline = gsap.timeline({
        onComplete: () => isAnimating = false
    });
    
    // labels
    openTimeline.addLabel('start', 0)
    // type transition starts a bit after the items animation
    .addLabel('typeTransition', 0.3)
    .addLabel('showContent', 1.8)

    // fade out the card
    .to(cardWrapEl, {
        duration: 0.8,
        ease: 'back.inOut',
        opacity: 0,
        scale: 0.5,
        onComplete: () => {
            gsap.set('body', {overflow: 'scroll'})
            gsap.set(cardWrapEl, {pointerEvents: 'none'})
        }
    }, 'start')

    // fade out the header
    .to(headerEl, {
        duration: 0.8,
        ease: 'power3',
        opacity: 1,
        onComplete: () => gsap.set(headerEl, {pointerEvents: 'none'})
    }, 'start')

    // text transition starts here
    .add(typeT.in().play(), 'typeTransition')

    .to(bg, {
        duration: 0.8,
        ease: 'power3',
        opacity: 1
    }, 'showContent')

    // fade out the content
    .fromTo(contentWrapEl, {
        top: "20vh",
        opacity: 0
    }, {
        duration: 0.8,
        ease: 'power1',
        opacity: 1,
        top: "10vh"
    }, 'showContent')

    // add current class to the item's article and set the pointer events
    .add(() => {
        gsap.set(backCtrl, {pointerEvents: 'auto'})
    }, 'showContent')

    // show the back button
    .to(backCtrl, {
        duration: 0.7,
        ease: 'power3',
        opacity: 1
    }, 'showContent')
}

/**** Back action ****/

// back button
const backCtrl = document.querySelector('.back');


backCtrl.addEventListener('click', () => closeCard());

const closeCard = () => {
    if ( isAnimating ) return;

    isAnimating = true;
    
    // gsap timeline
    const openTimeline = gsap.timeline({
        onComplete: () => isAnimating = false
    });
    
    // labels
    openTimeline.addLabel('start', 0)
    // type transition starts a bit after the items animation
    .addLabel('typeTransition', 0.5)
    .addLabel('showCard', 1.8)
    
    // show the back button
    .to(backCtrl, {
        duration: 0.7,
        ease: 'power1',
        opacity: 0
    }, 'start')

    .fromTo(contentWrapEl, {
        top: "10vh",
        opacity: 1
    }, {
        duration: 0.8,
        ease: 'power1',
        opacity: 0,
        top: "20vh",
    }, 'start')

    // fade in the card
    .to(cardWrapEl, {
        duration: 0.8,
        ease: 'back.inOut',
        opacity: 1,
        scale: 1,
        // y:'-20%',
        onComplete: () => {
            gsap.set('body', {overflow: 'hidden'})
            gsap.set(cardWrapEl, {pointerEvents: 'auto'})
        }
    }, 'showCard')
    // fade out the header
    .to(headerEl, {
        duration: 0.8,
        ease: 'power3',
        opacity: 1,
        onComplete: () => gsap.set(headerEl, {pointerEvents: 'auto'})
    }, 'showCard')

    .to(bg, {
        duration: 0.8,
        ease: 'power3',
        opacity: 0
    }, 'start')
    
    // text transition starts here
    .add(typeT.out().play(), 'typeTransition')    
}
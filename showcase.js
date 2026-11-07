/* Product presentation, authored for ZOZO Lab. No Framer runtime required. */
const showcaseDesigns = [
  { id: 'cheese-cutout', label: 'Cheese Cutout', word: 'CHEESE', tone: 'cheese', color: 'Cheese Yellow', line: 'A little less ordinary.', note: 'Playful openings. Unmistakable yellow. An everyday object with a personality of its own.' },
  { id: 'fluid-metal', label: 'Fluid Metal', word: 'FLUID', tone: 'metal', color: 'Silver / White', line: 'Go with your own flow.', note: 'Organic contours. A metallic finish. A small piece of sculpture, made to go with you.' },
  { id: 'mr-ghost', label: 'Mr. Ghost', word: 'GHOST', tone: 'ghost', color: 'Opal White / Yellow', image: ghostHeroImage, note: 'A little office attitude. A softer side after hours. Meet your desk companion.' }
];
let showcaseUserPlay = false;
let showcaseIndex = 0, showcaseView = 0, showcaseTimer, showcasePlaying = false;

function showcaseHome() {
  return `<section class="showcase" aria-label="Featured designs" aria-roledescription="carousel">
    <div class="showcase-top"><div class="design-tabs" role="tablist" aria-label="Featured designs">${showcaseDesigns.map((d,i)=>`<button id="design-tab-${i}" role="tab" data-design="${i}" aria-controls="design-panel" aria-selected="${i===showcaseIndex}" tabindex="${i===showcaseIndex?0:-1}">${d.label}</button>`).join('')}</div><div class="slide-controls"><button data-showcase="previous" aria-label="Previous design">←</button><span class="slide-count">01 / ${String(showcaseDesigns.length).padStart(2,'0')}</span><button data-showcase="next" aria-label="Next design">→</button></div></div>
    <div id="design-panel" role="tabpanel" aria-labelledby="design-tab-${showcaseIndex}"></div>
  </section>
  <section class="manifesto" aria-label="Everyday objects, individual expression"><p class="capsule-sentence"><span class="sentence-copy">Bring a little </span><span class="media-capsule capsule-life" aria-hidden="true"><img src="assets/editorial/cheese-city-natural-grip-v6.webp" alt="" width="1200" height="400" loading="lazy"></span><span class="sentence-copy"> personality to the everyday, with </span><span class="media-capsule capsule-metal" style="--capsule-delay:150ms" aria-hidden="true"><img src="assets/editorial/stone-liquid-metal-v1.webp" alt="" width="1000" height="333" loading="lazy"></span><span class="sentence-copy"> sculptural forms and </span><span class="media-capsule capsule-cheese" style="--capsule-delay:300ms" aria-hidden="true"><img src="assets/editorial/molten-cheese-v1.webp" alt="" width="1000" height="333" loading="lazy"></span><span class="sentence-copy"> playful details. Make it your own.</span></p></section>
  ${ghostFeature()}<section class="home-section"><div class="section-heading"><h2>THE <span>DAILY</span> EDIT.</h2></div><div class="featured-grid">${products.filter(p=>p.category==='cases'&&!comingSoonIds.has(p.id)).map(homeCard).join('')}</div></section>
  <section class="home-section collection-section"><div class="section-heading"><h2>THREE <span>SIDES</span><br>OF ZOZO.</h2></div><div class="collection-tiles">
    <a class="collection-tile tile-cheese" href="#/shop/cheese"><div class="tile-art">${crop('cutout','Cheese Cutout design')}</div><div class="tile-caption"><div><h3>Cheese.</h3><p>For your playful side.</p></div><span aria-hidden="true">↗</span></div></a>
    <a class="collection-tile tile-metal" href="#/shop/sculptural"><div class="tile-art">${crop('metal','Fluid Metal design')}</div><div class="tile-caption"><div><h3>Sculptural.</h3><p>Objects with a different point of view.</p></div><span aria-hidden="true">↗</span></div></a>
    <a class="collection-tile tile-jelly" href="#/shop/jelly"><div class="tile-art">${crop('cherry','Jelly series preview')}</div><div class="tile-caption"><div><h3>Jelly.</h3><p>A softer side. Coming soon.</p></div><span aria-hidden="true">↗</span></div></a>
  </div><a class="pill-link" href="#/shop">Explore all designs <span>↗</span></a></section>
  <section class="detail-story"><div class="story-heading"><h2>IT’S ALL IN<br>THE <span>DETAILS.</span></h2><p>Not just something you carry.<br>Something that feels like you.</p></div><div class="story-closeup">${crop('cutout','Close-up of Cheese Cutout openings')}<span>01 / Cheese Cutout</span></div><div class="story-notes"><article><span>01</span><div><h3>A familiar shape. A fresh take.</h3><p>The cheese motif, pared back to playful holes and organic curves.</p></div></article><article><span>02</span><div><h3>Color with character.</h3><p>A bright yellow expression, made to stand out in the everyday.</p></div></article><article><span>03</span><div><h3>Every angle has a story.</h3><p>Explore the front, profile and inside of the design.</p></div></article><a class="pill-link dark" href="#/product/cheese-cutout">Explore Cheese Cutout <span>↗</span></a></div></section>
  <section class="home-section upcoming-section"><div class="section-heading"><h2>NEXT <span>UP.</span></h2><p>Four more personalities. Full reveals and release details to come.</p></div><div class="product-grid">${products.filter(p=>comingSoonIds.has(p.id)).map(homeCard).join('')}</div></section>
  <section class="launch-invite"><h2>BE FIRST.<br><span>BE A LITTLE ZOZO.</span></h2><p>Join the waitlist for Cheese Cutout and Fluid Metal.</p>${waitlistCTA()}</section>
  <section class="buying-guide" aria-labelledby="guide-title"><div><h2 id="guide-title">Good to know.</h2><a class="text-link" href="#/about">Meet ZOZO Lab ↗</a></div><div><details><summary>Can I order now?</summary><p>For Mr. Ghost, contact hello@zozo-lab.com for pricing and ordering details. Phone-case online ordering is not open yet. Join the waitlist to receive launch invitations in signup order, in batches. Joining does not reserve a product. Saving a design only keeps it on this device and does not join the waitlist.</p></details><details><summary>Will it fit my phone?</summary><p>Supported phone models and final specifications will be confirmed before ordering opens. Images show design concepts.</p></details><details><summary>Shipping & returns</summary><p>Shipping destinations, delivery times and return terms will be available when ordering opens.</p></details></div></section>`;
}

function renderShowcasePanel() {
  const panel = document.querySelector('#design-panel');
  if (!panel) return;
  const d = showcaseDesigns[showcaseIndex], p = products.find(p=>p.id===d.id);
  const views = ['Front','Side','Inside'];
  document.querySelector('.showcase').dataset.tone = d.tone;
  document.querySelectorAll('[data-design]').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===showcaseIndex));b.tabIndex=i===showcaseIndex?0:-1;});
  panel.setAttribute('aria-labelledby',`design-tab-${showcaseIndex}`);
  const productUrl = `#/product/${p.id}`;
  const image = d.image
    ? `<img class="crop hero-ghost-art" src="${d.image}" alt="Mr. Ghost with a softly glowing shade and yellow shoes">`
    : crop(p.images[showcaseView], p.name + ' — ' + views[showcaseView] + ' view');
  const viewOptions = d.image ? '' : `<div class="view-options" role="group" aria-label="Product view">
    ${views.map((view, index) => `<button data-hero-view="${index}" aria-pressed="${index === showcaseView}" aria-label="${view} view">${view}</button>`).join('')}
  </div>`;
  const action = d.image
    ? `<a class="pill-link dark" href="${productUrl}">Explore Mr. Ghost <span>↗</span></a><small>Contact for pricing</small>`
    : `<a class="pill-link dark" href="${waitlistUrl}" target="_blank" rel="noopener noreferrer">Join the waitlist <span>↗</span></a><small>${money(p.price)} · Design preview</small>`;
  panel.innerHTML = `<div class="product-stage">
    <span class="stage-word" aria-hidden="true">${d.word}</span>
    <a href="${productUrl}" class="stage-product view-${showcaseView}" aria-label="Explore ${p.name}">${image}</a>
  </div>
  <div class="showcase-bottom">
    <div class="showcase-description"><h1><a href="${productUrl}">${p.name}.</a></h1><p>${d.note}</p></div>
    <div class="showcase-views">${viewOptions}<p>${d.color} ${d.image ? '' : `<a href="${productUrl}">Full details ↗</a>`}</p></div>
    <div class="showcase-actions">${action}</div>
  </div>`;
  syncShowcaseControls();
}
function syncShowcaseControls(){
  if(!document.querySelector('.slide-count'))return;
  document.querySelector('.slide-count').textContent=`${String(showcaseIndex+1).padStart(2,'0')} / ${String(showcaseDesigns.length).padStart(2,'0')}`;
  const pause=document.querySelector('[data-showcase="pause"]');
  if(pause){pause.textContent=showcasePlaying?'Ⅱ':'▷';pause.setAttribute('aria-label',`${showcasePlaying?'Pause':'Play'} product slideshow`);}
}
let showcaseRevision=0,showcaseAnimations=[];
function stopShowcase(){clearInterval(showcaseTimer);showcaseRevision++;showcaseAnimations.forEach(a=>a.cancel());showcaseAnimations=[];}
function animateShowcaseElement(el,keyframes,options){
 if(!el)return null;
 const animation=el.animate(keyframes,{easing:'cubic-bezier(.2,.7,.1,1)',fill:'both',...options});
 showcaseAnimations.push(animation);return animation;
}
async function paintShowcase({animate=false,direction=1,viewOnly=false,enter=false}={}){
 const panel=document.querySelector('#design-panel');if(!panel)return;
 const revision=++showcaseRevision;
 showcaseAnimations.forEach(a=>a.cancel());showcaseAnimations=[];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const duration=viewOnly?170:240;
 if(animate&&!reduced&&panel.children.length){
  panel.setAttribute('aria-busy','true');
  const exit=animateShowcaseElement(panel.querySelector('.stage-product .crop'),[{opacity:1,transform:'translateX(0) rotate(0deg) scale(1)'},{opacity:0,transform:'translateX('+(-direction*55)+'px) rotate('+(-direction*6)+'deg) scale(.94)'}],{duration});
  if(!viewOnly){animateShowcaseElement(panel.querySelector('.stage-word'),[{opacity:1,translate:'0 0'},{opacity:0,translate:'0 -20px'}],{duration});animateShowcaseElement(panel.querySelector('.showcase-description'),[{opacity:1,translate:'0 0'},{opacity:0,translate:'0 -8px'}],{duration});}
  await exit?.finished.catch(()=>{});
  if(revision!==showcaseRevision||!panel.isConnected)return;
 }
 renderShowcasePanel();panel.removeAttribute('aria-busy');
 if((animate||enter)&&!reduced){
  const img=panel.querySelector('.stage-product .crop');
  animateShowcaseElement(img,[{opacity:0,transform:'translateX('+(direction*70)+'px) rotate('+(direction*6)+'deg) scale(.94)'},{opacity:1,transform:'translateX(0) rotate(0deg) scale(1)'}],{duration:viewOnly?450:850});
  if(!viewOnly){
   animateShowcaseElement(panel.querySelector('.stage-word'),[{opacity:0,translate:'0 28px',scale:'.97'},{opacity:1,translate:'0 0',scale:'1'}],{duration:850,delay:65});
   for(const [i,el] of [...panel.querySelectorAll('.showcase-description,.showcase-views,.showcase-actions')].entries())animateShowcaseElement(el,[{opacity:0,translate:'0 12px'},{opacity:1,translate:'0 0'}],{duration:600,delay:80+i*65});
  }
 }
}

function initShowcase(){
  stopShowcase();
  if(!document.querySelector('#design-panel'))return;
  for (const design of showcaseDesigns) {
    const product = products.find(item => item.id === design.id);
    const sources = design.image ? [design.image] : product.images.map(key => 'assets/' + art[key][0]);
    for (const source of sources) {
      const image = new Image();
      image.src = source;
    }
  }
  paintShowcase({enter:true});
  scheduleShowcaseRotation();
}
function scheduleShowcaseRotation(){
  clearInterval(showcaseTimer);
  if(!showcasePlaying)return;
  showcaseTimer=setInterval(()=>{
    const hero=document.querySelector('.showcase');
    if(!hero||!showcasePlaying||document.hidden||(!showcaseUserPlay&&(hero.matches(':hover')||hero.contains(document.activeElement)))||drawer.open||hero.getBoundingClientRect().bottom<0)return;
    showcaseIndex=(showcaseIndex+1)%showcaseDesigns.length;showcaseView=0;paintShowcase({animate:true});
  },7000);
}
document.addEventListener('click',async e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.design!==undefined){const next=Number(b.dataset.design);showcasePlaying=false;showcaseUserPlay=false;if(next===showcaseIndex){syncShowcaseControls();return;}const direction=next>showcaseIndex?1:-1;showcaseIndex=next;showcaseView=0;await paintShowcase({animate:true,direction});}
  if(b.dataset.showcase){
    if(b.dataset.showcase==='pause'){showcasePlaying=!showcasePlaying;showcaseUserPlay=showcasePlaying;syncShowcaseControls();scheduleShowcaseRotation();return;}
    else{showcaseIndex=(showcaseIndex+(b.dataset.showcase==='next'?1:-1)+showcaseDesigns.length)%showcaseDesigns.length;showcaseView=0;showcasePlaying=false;showcaseUserPlay=false;}
    await paintShowcase({animate:true,direction:b.dataset.showcase==='previous'?-1:1});
  }
  if(b.dataset.heroView!==undefined){const next=Number(b.dataset.heroView);showcasePlaying=false;showcaseUserPlay=false;if(next===showcaseView){syncShowcaseControls();return;}const direction=next>showcaseView?1:-1;showcaseView=next;await paintShowcase({animate:true,direction,viewOnly:true});document.querySelector(`[data-hero-view="${showcaseView}"]`)?.focus({preventScroll:true});}
  if(b.dataset.galleryView!==undefined){
    const p=products.find(p=>p.id===b.dataset.product),i=Number(b.dataset.galleryView);
    document.querySelector('.gallery-stage').innerHTML=crop(p.images[i],p.name+' — '+['Front','Side','Inside'][i]+' view','fit');
    document.querySelectorAll('[data-gallery-view]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));
    document.querySelector('.gallery-counter').textContent=`0${i+1} / 0${p.images.length}`;
  }
});
document.addEventListener('keydown',e=>{
  if(!e.target.matches('[data-design]'))return;
  let next=showcaseIndex;
  if(e.key==='ArrowRight')next=(next+1)%showcaseDesigns.length;
  else if(e.key==='ArrowLeft')next=(next+showcaseDesigns.length-1)%showcaseDesigns.length;
  else if(e.key==='Home')next=0;else if(e.key==='End')next=showcaseDesigns.length-1;else return;
  e.preventDefault();document.querySelector(`[data-design="${next}"]`).click();document.querySelector(`[data-design="${next}"]`).focus();
});

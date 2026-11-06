/* Local, dependency-free motion layer. Content remains readable without animation. */
const siteMotion = (() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let observer, frame, wheelFrame, wheelTarget = null, lastTime = 0, capsule;
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

  function stopWheel() {
    cancelAnimationFrame(wheelFrame);
    wheelFrame = null;wheelTarget = null;lastTime = 0;
  }
  function tickWheel(time) {
    if(wheelTarget===null)return;
    const max = Math.max(0,document.documentElement.scrollHeight-innerHeight);
    wheelTarget=clamp(wheelTarget,0,max);
    const elapsed=lastTime?Math.min(50,time-lastTime):16.67;
    lastTime=time;
    const next=scrollY+(wheelTarget-scrollY)*(1-Math.exp(-elapsed/70));
    window.scrollTo({top:next,behavior:'instant'});
    if(Math.abs(wheelTarget-scrollY)<.7){window.scrollTo({top:wheelTarget,behavior:'instant'});stopWheel();}
    else wheelFrame=requestAnimationFrame(tickWheel);
  }
  function nestedScroll(target,delta) {
    for(let el=target instanceof Element?target:null;el&&el!==document.body;el=el.parentElement){
      if(el.matches('dialog,input,textarea,select,[contenteditable=true]'))return true;
      const style=getComputedStyle(el);
      if(/auto|scroll/.test(style.overflowY)&&el.scrollHeight>el.clientHeight+2&&((delta>0&&el.scrollTop+el.clientHeight<el.scrollHeight-1)||(delta<0&&el.scrollTop>0)))return true;
    }
    return false;
  }
  window.addEventListener('wheel',e=>{
    if(reduced.matches||!matchMedia('(pointer: fine)').matches||e.ctrlKey||e.metaKey||e.shiftKey||!e.cancelable||Math.abs(e.deltaX)>Math.abs(e.deltaY)||document.querySelector('dialog[open]')||nestedScroll(e.target,e.deltaY))return;
    const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
    if(!delta)return;
    e.preventDefault();wheelTarget=clamp((wheelTarget??scrollY)+clamp(delta,-650,650),0,Math.max(0,document.documentElement.scrollHeight-innerHeight));
    if(!wheelFrame)wheelFrame=requestAnimationFrame(tickWheel);
  },{passive:false});
  window.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' ','Escape'].includes(e.key))stopWheel();});
  window.addEventListener('pointerdown',stopWheel,{passive:true});
  window.addEventListener('touchstart',stopWheel,{passive:true});
  window.addEventListener('blur',stopWheel);

  function updateCapsule() {
    frame=null;
    if(!capsule?.isConnected||reduced.matches)return;
    const r=capsule.getBoundingClientRect();
    if(r.bottom<0||r.top>innerHeight)return;
    const progress=clamp((innerHeight*.86-r.top)/(innerHeight*.55),0,1);
    const words=[...capsule.querySelectorAll('.sentence-word')];
    words.forEach((word,i)=>word.style.setProperty('--word-ink',clamp(progress*1.55-i/words.length,0,1)));
  }
  function requestCapsule(){if(!frame)frame=requestAnimationFrame(updateCapsule);}
  window.addEventListener('scroll',requestCapsule,{passive:true});
  window.addEventListener('resize',requestCapsule,{passive:true});

  function splitHeading(heading) {
    if(heading.dataset.split)return;
    const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    let index=0;
    for(const node of nodes){
      const fragment=document.createDocumentFragment();
      for(const token of node.textContent.split(/(\s+)/)){
        if(!token)continue;
        if(/^\s+$/.test(token)){fragment.append(document.createTextNode(token));continue;}
        const mask=document.createElement('span'),word=document.createElement('span');
        mask.className='motion-word-mask';word.className='motion-word';word.textContent=token;
        word.style.setProperty('--word-delay',`${Math.min(index++,6)*45}ms`);mask.append(word);fragment.append(mask);
      }
      node.replaceWith(fragment);
    }
    heading.dataset.split='true';
  }
  function reveal(el,index=0,kind='rise') {
    el.classList.add('reveal-target');el.dataset.reveal=kind;el.style.setProperty('--reveal-delay',`${index*85}ms`);
    if(reduced.matches){el.classList.add('is-visible');return;}
    const r=el.getBoundingClientRect();
    // Don't hide elements the user has already scrolled past or accessed through a deep link.
    if(r.bottom<0){el.classList.add('is-visible');return;}
    observer.observe(el);
  }
  function refresh() {
    stopWheel();observer?.disconnect();cancelAnimationFrame(frame);frame=null;
    capsule=document.querySelector('.capsule-sentence');
    capsule?.querySelectorAll('.sentence-copy').forEach(copy=>{
      if(copy.querySelector('.sentence-word'))return;
      const text=copy.textContent;copy.textContent='';
      for(const token of text.split(/(\s+)/)){
        if(/^\s+$/.test(token))copy.append(document.createTextNode(token));
        else if(token){const word=document.createElement('span');word.className='sentence-word';word.textContent=token;copy.append(word);}
      }
    });
    observer=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    },{rootMargin:'0px 0px -7% 0px',threshold:.06});
    document.querySelectorAll('.section-heading,.story-heading,.launch-invite').forEach(group=>{
      [...group.children].forEach((el,i)=>{if(el.matches('h2')){splitHeading(el);reveal(el,i,'words');}else reveal(el,i);});
    });
    document.querySelectorAll('.featured-grid,.product-grid,.collection-tiles,.story-notes').forEach(group=>{
      [...group.children].forEach((el,i)=>reveal(el,i%4,el.matches('.collection-tile')?'image':'rise'));
    });
    document.querySelectorAll('.story-closeup,.gallery-stage,.gallery-thumbnails,.listing-top,.about>*,.buying-guide>*,.detail-info>h1,.detail-info>.eyebrow,.detail-info>.product-description').forEach(el=>reveal(el,0,el.matches('.story-closeup,.gallery-stage')?'image':'rise'));
    if(capsule){reveal(capsule,0,'sentence');requestCapsule();}
  }
  reduced.addEventListener('change',()=>{
    stopWheel();document.querySelectorAll('.reveal-target').forEach(el=>el.classList.add('is-visible'));
    if(reduced.matches&&typeof stopShowcase==='function'){
      stopShowcase();showcasePlaying=false;paintShowcase();
    }
    if(capsule)updateCapsule();
  });
  return {refresh,stopWheel,reduced};
})();

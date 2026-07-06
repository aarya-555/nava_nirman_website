/* ---- build the interlocking wall ---- */
(function(){
  const wall = document.getElementById('wall');
  if(!wall) return;
  const rows = 6, perRow = 5;
  let idx = 0;
  for(let r=0;r<rows;r++){
    const course = document.createElement('div');
    course.className = 'course' + (r%2 ? ' odd':'');
    for(let b=0;b<perRow;b++){
      const brick = document.createElement('div');
      brick.className = 'brick';
      brick.style.animationDelay = (0.25 + idx*0.045) + 's';
      course.appendChild(brick); idx++;
    }
    wall.appendChild(course);
  }
  // trigger lay animation when hero is in view
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){ wall.classList.add('play'); }
  else {
    requestAnimationFrame(()=> setTimeout(()=> wall.classList.add('play'), 200));
  }
})();

/* ---- duplicate ribbon for seamless loop ---- */
(function(){
  const t = document.getElementById('ribbon');
  if(t) t.innerHTML += t.innerHTML;
})();

/* ---- header shadow ---- */
const header = document.querySelector('header');
const totop = document.getElementById('totop');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 10);
  totop.classList.toggle('show', y > 600);
}, {passive:true});

/* ---- mobile menu ---- */
const burger = document.getElementById('burger');
const navlinks = document.getElementById('navlinks');
burger.addEventListener('click', ()=>{
  const open = navlinks.classList.toggle('mobile');
  burger.classList.toggle('open', open);
});
navlinks.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
  navlinks.classList.remove('mobile'); burger.classList.remove('open');
}));

/* ---- back to top ---- */
totop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* ---- reveal on scroll ---- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
}, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

/* ---- quote form -> WhatsApp ---- */
document.getElementById('sendBtn').addEventListener('click', ()=>{
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const prod = document.getElementById('f-prod').value;
  const msg  = document.getElementById('f-msg').value.trim();
  const text =
    `Hi Nava Nirman, I'd like a quote.%0A%0A`+
    `Name: ${encodeURIComponent(name||'-')}%0A`+
    `Phone: ${encodeURIComponent(phone||'-')}%0A`+
    `Product: ${encodeURIComponent(prod)}%0A`+
    `Details: ${encodeURIComponent(msg||'-')}`;
  window.open(`https://wa.me/919019620767?text=${text}`, '_blank');
});

/* ---- year ---- */
document.getElementById('yr').textContent = new Date().getFullYear();

/* ===================== */

/* ---- scroll progress bar ---- */
(function(){
  const bar = document.getElementById('progress'); if(!bar) return;
  function upd(){ const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h>0 ? (window.scrollY/h*100) : 0) + '%'; }
  addEventListener('scroll', upd, {passive:true}); addEventListener('resize', upd); upd();
})();

/* ---- scrollspy: highlight active nav link ---- */
(function(){
  const links = [...document.querySelectorAll('.nav-links a')];
  const map = links.map(a=>({a, sec:document.querySelector(a.getAttribute('href'))})).filter(o=>o.sec);
  function spy(){ const y = scrollY + 130; let cur=null;
    map.forEach(o=>{ if(o.sec.offsetTop <= y) cur=o; });
    links.forEach(a=>a.classList.remove('active'));
    if(cur) cur.a.classList.add('active'); }
  addEventListener('scroll', spy, {passive:true}); spy();
})();

/* ---- 3D tilt on the blueprint card ---- */
(function(){
  const card = document.querySelector('.wall-card');
  const hero = document.querySelector('.hero');
  if(!card || !hero) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  let raf;
  hero.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / r.width;
    const dy = (e.clientY - (r.top + r.height/2)) / r.height;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(()=>{
      card.style.transform = `perspective(950px) rotateY(${dx*5}deg) rotateX(${-dy*5}deg)`;
    });
  });
  hero.addEventListener('mouseleave', ()=>{ card.style.transform = 'perspective(950px) rotateY(0deg) rotateX(0deg)'; });
})();

/* ===================== */

/* ---- subtle parallax on showcase background ---- */
(function(){
  const els = [...document.querySelectorAll('[data-parallax]')];
  if(!els.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let tick=false;
  function upd(){ els.forEach(el=>{ const r = el.parentElement.getBoundingClientRect();
    const off = (r.top + r.height/2 - innerHeight/2);
    el.style.transform = 'translateY(' + (off*-0.07) + 'px)'; }); tick=false; }
  addEventListener('scroll', ()=>{ if(!tick){ requestAnimationFrame(upd); tick=true; } }, {passive:true});
  addEventListener('resize', upd); upd();
})();
/* ---- play videos only while visible (performance) ---- */
(function(){
  const vids = [...document.querySelectorAll('video[autoplay]')];
  vids.forEach(v=>{ v.muted = true; });
  if(!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((ents)=>{ ents.forEach(e=>{ const v = e.target;
    if(e.isIntersecting){ const p = v.play(); if(p&&p.catch) p.catch(()=>{}); } else { v.pause(); } }); }, {threshold:.25});
  vids.forEach(v=>io.observe(v));
})();
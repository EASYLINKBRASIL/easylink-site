/* easylink — scripts compartilhados por todas as páginas */
function toggleTheme(){
  var d=document.documentElement,dark=d.getAttribute('data-theme')!=='dark';
  if(dark)d.setAttribute('data-theme','dark');else d.removeAttribute('data-theme');
  try{localStorage.setItem('theme',dark?'dark':'light')}catch(e){}
  syncThemeBtn();
}
function syncThemeBtn(){
  var dark=document.documentElement.getAttribute('data-theme')==='dark',b=document.getElementById('themeBtn');
  if(!b)return;
  b.setAttribute('aria-label',dark?'Ativar modo claro':'Ativar modo escuro');
  b.title=dark?'Modo claro':'Modo escuro';
}
function toggleMenu(){
  var n=document.getElementById('navLinks'),o=n.classList.toggle('open');
  document.getElementById('hamburger').setAttribute('aria-expanded',o);
}
syncThemeBtn();
document.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('navLinks').classList.remove('open')})});
window.addEventListener('scroll',function(){var n=document.getElementById('mainNav');if(n)n.classList.toggle('scrolled',window.scrollY>40)},{passive:true});

/* animação de entrada */
if('IntersectionObserver' in window){
  var obs=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('visible');obs.unobserve(x.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el,i){el.style.transitionDelay=(i%3)*.07+'s';obs.observe(el)});
}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible')})}

/* FAQ: abre um por vez */
document.querySelectorAll('.faq-item').forEach(function(d){d.addEventListener('toggle',function(){if(d.open)document.querySelectorAll('.faq-item').forEach(function(o){if(o!==d)o.open=false})})});

var y=document.getElementById('ftYear');if(y)y.textContent=new Date().getFullYear();

/* cookies */
function ls(k,v){try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch(e){return null}}
if(!ls('cookieConsent')){setTimeout(function(){var c=document.getElementById('cookie-banner');if(c)c.style.display='block'},1500)}
else if(ls('cookieConsent')==='refused'){window['ga-disable-G-64KV5WNS7Q']=true}
function aceitarCookies(){ls('cookieConsent','accepted');document.getElementById('cookie-banner').style.display='none'}
function recusarCookies(){ls('cookieConsent','refused');document.getElementById('cookie-banner').style.display='none';window['ga-disable-G-64KV5WNS7Q']=true}

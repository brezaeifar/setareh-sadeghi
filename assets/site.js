(function(){var m={'#ai':'work/ai-reading-assistant/','#checkout':'work/checkout-pay-later/','#stats':'work/reading-stats/','#wrapup':'work/year-in-reading/','#avatars':'work/literary-avatars/'};if(m[location.hash]&&document.getElementById('work'))location.replace(m[location.hash]);})();
var cb=document.getElementById('copyBtn');
if(cb)cb.addEventListener('click',function(){
  var b=this, t=document.getElementById('email').textContent;
  function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('email'));var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected';}
  try{navigator.clipboard.writeText(t).then(function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1800)},sel);}catch(e){sel();}
});

/* Lightbox: screens are small in the layout, so reviewers can open any of them full size and step through the case. */
(function(){
  if(!window.HTMLDialogElement)return;
  var lb=document.createElement('dialog');lb.className='lb';lb.setAttribute('aria-label','Enlarged screen');
  lb.innerHTML='<figure><img alt=""><figcaption><span class="count"></span><span class="cap"></span></figcaption></figure>'+
    '<button type="button" class="x" aria-label="Close">✕</button><button type="button" class="prev" aria-label="Previous screen">←</button><button type="button" class="next" aria-label="Next screen">→</button>';
  document.body.appendChild(lb);
  var big=lb.querySelector('img'),cap=lb.querySelector('.cap'),cnt=lb.querySelector('.count'),group=[],i=0,opener=null;
  function show(n){i=(n+group.length)%group.length;var im=group[i],fc=im.closest('figure').querySelector('figcaption');
    big.src=im.currentSrc||im.src;big.alt=im.alt;cap.textContent=fc?fc.textContent:im.alt;cnt.textContent=(i+1)+' / '+group.length;
    lb.querySelector('.prev').hidden=lb.querySelector('.next').hidden=group.length<2;}
  function open(im){var sec=im.closest('section,header');group=[].slice.call(sec.querySelectorAll('.zoomable'));opener=im;show(group.indexOf(im));lb.showModal();}
  document.querySelectorAll('.screen img,.wide img,.cast img').forEach(function(im){
    im.classList.add('zoomable');im.tabIndex=0;im.setAttribute('role','button');im.setAttribute('aria-label','Enlarge: '+im.alt);
    im.addEventListener('click',function(){open(im)});
    im.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(im)}});
  });
  lb.querySelector('.x').onclick=function(){lb.close()};
  lb.querySelector('.prev').onclick=function(){show(i-1)};
  lb.querySelector('.next').onclick=function(){show(i+1)};
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='FIGURE')lb.close()});
  lb.addEventListener('keydown',function(e){if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
  lb.addEventListener('close',function(){if(opener)opener.focus()});
})();

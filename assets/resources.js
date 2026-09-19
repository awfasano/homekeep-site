(()=>{const boxes=[...document.querySelectorAll('[data-check]')],out=document.querySelector('#progress'),status=document.querySelector('#storage-note');const key='homekeep-checklist-v1:'+location.pathname;let saved=[];try{saved=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(saved))saved=[]}catch{}boxes.forEach(b=>b.checked=saved.includes(b.id));function update(store){if(out)out.textContent=boxes.filter(b=>b.checked).length+' of '+boxes.length+' checked';if(store){try{localStorage.setItem(key,JSON.stringify(boxes.filter(b=>b.checked).map(b=>b.id)))}catch{if(status)status.textContent='Progress works on this page, but this browser could not save it. Print a copy before leaving.'}}}boxes.forEach(b=>b.addEventListener('change',()=>update(true)));update(false);document.querySelector('[data-clear]')?.addEventListener('click',()=>{boxes.forEach(b=>b.checked=false);update(true)});document.querySelector('[data-print]')?.addEventListener('click',()=>window.print())})();
// Share only the public resource URL; saved checklist progress stays in this browser.
(() => {
  const button = document.querySelector('[data-copy-link]');
  if (!button) return;
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  if (!canonical) return;
  const status = document.querySelector('[data-share-status]');
  const fallback = document.querySelector('[data-share-fallback]');
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(canonical);
      status.textContent = 'Link copied. Share it with a friend or new homeowner.';
      fallback.hidden = true;
    } catch {
      status.textContent = 'Select and copy the link below to share this resource.';
      fallback.hidden = false;
      const input = fallback.querySelector('input');
      input.value = canonical;
      input.focus();
      input.select();
    }
  });
})();

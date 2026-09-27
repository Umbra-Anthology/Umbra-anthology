// ---------- Alternância de abas ----------
const tabLinks = document.querySelectorAll('.tab-link');
const pages = document.querySelectorAll('.page');

function activateTab(target){
  pages.forEach(p => p.classList.toggle('active', p.id === target));
  tabLinks.forEach(l => l.classList.toggle('active', l.dataset.target === target));
  window.scrollTo({ top:0, behavior:'instant' in window ? 'instant' : 'auto' });
  history.replaceState(null, '', '#' + target);
}

tabLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    activateTab(link.dataset.target);
  });
});

// abre direto na aba certa se a URL tiver #trabalhos
if (location.hash === '#trabalhos') activateTab('trabalhos');

// ---------- Voltar ao topo ----------
document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({ top:0, behavior:'smooth' });
});

// ---------- Lightbox ----------
const lightbox = document.getElementById('lightbox');
const lightboxBox = document.getElementById('lightboxBox');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

// Agora a função recebe também o caminho da imagem (imageSrc)
function openLightbox(caption, imageSrc){
  lightboxCaption.textContent = caption || '';
  // Injeta a imagem dentro da div lightboxBox
  if (imageSrc) {
    lightboxBox.innerHTML = `<img src="${imageSrc}" alt="${caption || ''}">`;
  } else {
    lightboxBox.innerHTML = ''; 
  }
  lightbox.classList.add('open');
}

function closeLightbox(){
  lightbox.classList.remove('open');
  // Opcional: limpar o conteúdo ao fechar para não dar "flash" da imagem anterior na próxima abertura
  setTimeout(() => { lightboxBox.innerHTML = ''; }, 300); 
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Galeria da Antologia
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const caption = item.dataset.caption;
    // Busca a tag <img> filha do item clicado para pegar a URL original
    const imgElement = item.querySelector('img');
    const imageSrc = imgElement ? imgElement.src : null;
    
    openLightbox(caption, imageSrc);
  });
});

// Cartazes de Trabalhos
document.querySelectorAll('.project-poster').forEach(poster => {
  poster.addEventListener('click', () => {
    const link = poster.dataset.link;
    if (link && link.trim() !== '') {
      window.open(link, '_blank', 'noopener');
    } else {
      const caption = poster.dataset.caption || '(link ainda não público por causa de circuito de festival)';
      const imgElement = poster.querySelector('img');
      const imageSrc = imgElement ? imgElement.src : null;
      
      openLightbox(caption, imageSrc);
    }
  });
});
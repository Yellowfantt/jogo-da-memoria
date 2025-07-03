class EnhancedHelpController {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 6;
    this.images = [
      "../assets/imagens/help_img/1.png",
      "../assets/imagens/help_img/2.png",
      "../assets/imagens/help_img/3.png",
      "../assets/imagens/help_img/4.png",
      "../assets/imagens/help_img/5.png",
      "../assets/imagens/help_img/6.png"
    ];

    this.init();
    this.createParticles();
  }

  init() {
    this.bindEvents();
    this.createDots();
    this.updateDisplay();
  }

  createParticles() {
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
      }
    }
  }

  bindEvents() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carouselImage = document.getElementById('carousel-image');
    const modalClose = document.getElementById('modal-close');
    const imageModal = document.getElementById('image-modal');

    // Navegação básica
    if (prevBtn) prevBtn.addEventListener('click', () => this.previousSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Modal - clique na imagem para abrir
    if (carouselImage) {
      carouselImage.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Image clicked - opening modal');
        this.openModal();
      });;

    }

    // Modal - fechar com X
    if (modalClose) {
      modalClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Botão fechar clicado'); // Debug
        this.closeModal();
      });
    }

    // Modal - fechar clicando no fundo
    if (imageModal) {
      imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
          console.log('Fundo do modal clicado'); // Debug
          this.closeModal();
        }
      });
    }

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previousSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'Escape':
          e.preventDefault();
          this.closeModal();
          break;
      }
    });

    // Suporte a touch/swipe
    let startX = 0;
    let startY = 0;
    const carousel = document.getElementById('carousel-image');

    if (carousel) {
      carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });

      carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Verificar se é um swipe horizontal (e não vertical)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.previousSlide();
          }
        }
      }, { passive: true });
    }
  }

  createDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    for (let i = 1; i <= this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === this.currentSlide) dot.classList.add('active');

      dot.addEventListener('click', () => this.goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('show');
    }
  }

  hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('show');
    }
  }

  updateDisplay() {
    this.showLoading();

    const img = document.getElementById('carousel-image');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (img) {
      const newSrc = this.images[this.currentSlide - 1];

      // Evento de carregamento da imagem
      const handleImageLoad = () => {
        this.hideLoading();
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageError);
      };

      const handleImageError = () => {
        this.hideLoading();
        console.error('Erro ao carregar imagem:', newSrc);
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageError);
      };

      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageError);
      img.src = newSrc;
    }

    // Atualizar contador
    if (currentSlideEl) currentSlideEl.textContent = this.currentSlide;
    if (totalSlidesEl) totalSlidesEl.textContent = this.totalSlides;

    // Atualizar botões
    if (prevBtn) prevBtn.disabled = this.currentSlide === 1;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides;

    // Atualizar dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index + 1 === this.currentSlide);
    });
  }

  previousSlide() {
    if (this.currentSlide > 1) {
      this.currentSlide--;
      this.updateDisplay();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.currentSlide++;
      this.updateDisplay();
    }
  }

  goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= this.totalSlides && slideNumber !== this.currentSlide) {
      this.currentSlide = slideNumber;
      this.updateDisplay();
    }
  }

  openModal() {
    console.log('[DEBUG] Tentando abrir modal...');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');

    if (!modal || !modalImg) {
      console.error('Elementos do modal não encontrados!');
      return;
    }

    // Forçar recarregamento da imagem
    modalImg.onload = () => {
      console.log('Imagem do modal carregada');
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };

    modalImg.src = this.images[this.currentSlide - 1];
    modalImg.alt = `Imagem ${this.currentSlide} ampliada`;

    // Mostrar modal imediatamente (a imagem carregará em background)
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  closeModal() {
    const modal = document.getElementById('image-modal');

    if (modal) {
      console.log('Fechando modal'); // Debug

      // Remover classe show
      modal.classList.remove('show');

      // Restaurar scroll do body
      document.body.style.overflow = 'auto';

      // Reset da opacidade
      modal.style.opacity = '0';
    }
  }

  // Método para debugging - pode ser removido em produção
  debug() {
    console.log('Estado atual:', {
      currentSlide: this.currentSlide,
      totalSlides: this.totalSlides,
      currentImage: this.images[this.currentSlide - 1]
    });
  }
}

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado - inicializando HelpController');
  new EnhancedHelpController();
});
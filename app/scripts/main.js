$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 50,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    }
  });

  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => {
      loader.style.zIndex = '-99999';
    }, 1000);
  }, 1000);

  $('.input-wrap').click(function (el) {
    $('#phone-input').focus();
  });

  const phoneInput = document.getElementById('phone-input');
  const inputWrap = document.querySelector('.cb-form .input-wrap');

  phoneInput.onfocus = () => {
    inputWrap.classList.add('active');
  }

  phoneInput.onblur = () => {
    inputWrap.classList.remove('active');
  }

  class NavIndicator {
    constructor(options) {
      if (!options.sections || !Array(options.sections)) {
        throw new Error('Required property: "sections", must be array');
      };

      this.activeNavPosition = 0;
      this.sections = options.sections;
      this.nodes = this.getNodes();
      this.nav = options.nav || 'nav';
      this.navNode = document.getElementById(this.nav);
    }

    getActiveNavPosition() { return this.activeNavPosition }

    getNodes() {
      let nodes = [];
      nodes = this.sections.map(el => document.querySelector(el));
      return nodes;
    }

    getSectionsPosition() {
      let positions = [];
      positions = this.nodes.map(el => el.getBoundingClientRect().top);
      return positions;
    }

    checkActiveSection() {
      const sectionsPosition = this.getSectionsPosition();
      this.activeNavPosition = 0;
      sectionsPosition.map((pos, idx) => {
        if (pos <= 1) this.activeNavPosition = idx;
      });
      return this.activeNavPosition;
    }

    markNavActive(section) {
      if (!section) return false;
      const moveTo = section.replace(/#/, 'link-')
      const navLink = this.navNode.querySelector(`.${moveTo}`);

      const list = this.navNode.querySelectorAll('.nav__item');
      list.forEach(el => {
        if (el && el.classList.contains('active'))
          el.classList.remove('active');
      });

      navLink.classList.add('active');
    }
  }

  const sections = ['#header', '#services', '#tarif', '#partners'];
  const nav = document.getElementById('nav');
  const navIndicator = new NavIndicator({ sections });
  let activePosition = navIndicator.checkActiveSection();

  window.onscroll = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;

    const active = navIndicator.checkActiveSection();
    if (active !== activePosition) {
      navIndicator.markNavActive(sections[active]);
      activePosition = active;
    }

    if (scrolled > 200) {
      nav.style.top = '10px';
    } else {
      nav.style.top = '85px';
    }
  }

  $('a[href*="#"]').click(function (el) {
    const page = $('html, body');
    const hash = el.target.parentNode.getAttribute('href');

    page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 400, 'swing', () => {
      if (el.currentTarget.classList.contains('cb-me')) {
        $('#phone-input').focus();
      }
      navIndicator.markNavActive(hash);
    });
    return false;
  });
});

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
  })

  $('a[href*="#"]').click(function (el) {
    const page = $('html, body');
    const hash = el.target.parentNode.getAttribute('href');

    page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 400, 'swing', () => {
      if (el.currentTarget.classList.contains('cb-me')) {
        $('#phone-input').focus();
      }
    });
    return false;
  });

  const phoneInput = document.getElementById('phone-input');
  const inputWrap = document.querySelector('.cb-form .input-wrap');

  phoneInput.onfocus = () => {
    inputWrap.classList.add('active');
  }

  phoneInput.onblur = () => {
    inputWrap.classList.remove('active');
  }

  const sections = ['#header', '#services', '#tarif', '#partners'];

  function getSectonsNode() {
    let nodes = [];
    nodes = sections.map(el => document.querySelector(el));
    return nodes;
  }

  function getSectionsPosition() {
    const nodes = getSectonsNode()
    let positions = [];
    positions = nodes.map(el => el.getBoundingClientRect().top);
    return positions;
  }

  function checkActiveSection() {
    const sectionsPosition = getSectionsPosition();
    let active = 0;
    sectionsPosition.map((pos, idx) => {
      if (pos <= 1 ) active = idx;
    });
    return active
  }

  window.onscroll = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.getElementById('nav');
    const active = checkActiveSection();
    markNavActive(sections[active]);

    if (scrolled > 200) {
      nav.style.top = '10px';
    } else {
      nav.style.top = '85px';
    }
  }

  function markNavActive(section) {
    if (!section) return false;
    const nav = document.getElementById('nav');
    const moveTo = section.replace(/#/, 'link-')
    const navLink = nav.querySelector(`.${moveTo}`);

    // remove class active from all childs
    const list = nav.querySelectorAll('.nav__item');
    list.forEach(el => {
      if (el && el.classList.contains('active'))
        el.classList.remove('active');
    });

    navLink.classList.add('active');
  }
});

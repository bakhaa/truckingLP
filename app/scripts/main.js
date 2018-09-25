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
    }, 2000);
  }, 1000);

  if (window.location.hash) {
    moveTo(window.location.hash);
  }

  $('a[href*="#"]').click(function (el) {
    const page = $('html, body');
    page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 400, 'swing', () => {
      moveTo(window.location.hash);
    });
  });

  window.onscroll = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.getElementById('nav');

    if (scrolled > 200) {
      nav.style.top = '10px';
    } else {
      nav.style.top = '85px';
    }
  }

  function moveTo(section) {
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

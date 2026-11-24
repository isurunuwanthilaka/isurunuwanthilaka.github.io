/* Site behaviour: theme toggle, navigation, reading progress, code copy,
   heading anchors, archive filtering. Progressive — nothing here is required
   to read the content. */
(function () {
  'use strict';

  var root = document.documentElement;
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  // ── Theme toggle ──────────────────────────────────────────────────────────
  var themeToggle = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('theme', next);
      themeToggle.setAttribute('aria-label',
        next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  // Follow the OS again if the viewer never made an explicit choice.
  if (prefersDark.addEventListener) {
    prefersDark.addEventListener('change', function () {
      if (!read('theme')) root.removeAttribute('data-theme');
    });
  }

  // ── Mobile navigation ─────────────────────────────────────────────────────
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ── Sticky header shadow + reading progress + back to top ─────────────────
  var header = document.getElementById('site-header');
  var progress = document.getElementById('progress-bar');
  var toTop = document.getElementById('to-top');
  var article = document.querySelector('.prose');
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || root.scrollTop;

    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);

    if (progress) {
      var height = document.body.scrollHeight - window.innerHeight;
      var ratio = article && height > 0 ? Math.min(y / height, 1) : 0;
      progress.style.transform = 'scaleX(' + ratio + ')';
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Copy-to-clipboard ─────────────────────────────────────────────────────
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(field);
    return Promise.resolve();
  }

  function flash(button, label) {
    var original = button.textContent;
    button.textContent = label;
    button.classList.add('is-copied');
    setTimeout(function () {
      button.textContent = original;
      button.classList.remove('is-copied');
    }, 1600);
  }

  Array.prototype.forEach.call(document.querySelectorAll('.prose pre'), function (pre) {
    if (pre.parentNode.classList.contains('code-block')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    wrapper.appendChild(button);

    button.addEventListener('click', function () {
      copy(pre.innerText).then(function () { flash(button, 'Copied'); });
    });
  });

  var copyLink = document.getElementById('copy-link');
  if (copyLink) {
    copyLink.addEventListener('click', function () {
      copy(copyLink.getAttribute('data-url')).then(function () {
        copyLink.classList.add('is-copied');
        setTimeout(function () { copyLink.classList.remove('is-copied'); }, 1600);
      });
    });
  }

  // ── Heading anchors ───────────────────────────────────────────────────────
  Array.prototype.forEach.call(
    document.querySelectorAll('.prose h2[id], .prose h3[id], .prose h4[id]'),
    function (heading) {
      var anchor = document.createElement('a');
      anchor.className = 'heading-anchor';
      anchor.href = '#' + heading.id;
      anchor.textContent = '#';
      anchor.setAttribute('aria-label', 'Link to this section');
      heading.appendChild(anchor);
    }
  );

  // ── Wide tables get their own scroll container ────────────────────────────
  Array.prototype.forEach.call(document.querySelectorAll('.prose table'), function (table) {
    if (table.parentNode.classList.contains('table-scroll')) return;
    var box = document.createElement('div');
    box.className = 'table-scroll';
    table.parentNode.insertBefore(box, table);
    box.appendChild(table);
  });

  // ── Archive filter ────────────────────────────────────────────────────────
  var searchInput = document.getElementById('archive-search');
  var archive = document.getElementById('archive');
  var empty = document.getElementById('archive-empty');

  if (searchInput && archive) {
    var items = Array.prototype.slice.call(archive.querySelectorAll('.archive-item'));
    var groups = Array.prototype.slice.call(archive.querySelectorAll('[data-year-group]'));

    var filter = function () {
      var query = searchInput.value.trim().toLowerCase();
      var matches = 0;

      items.forEach(function (item) {
        var hit = !query || (item.getAttribute('data-search') || '').indexOf(query) !== -1;
        item.hidden = !hit;
        if (hit) matches++;
      });

      groups.forEach(function (group) {
        group.hidden = !group.querySelector('.archive-item:not([hidden])');
      });

      if (empty) empty.hidden = matches !== 0;
    };

    searchInput.addEventListener('input', filter);
    filter();
  }
})();

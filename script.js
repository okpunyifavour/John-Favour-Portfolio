// Footer year
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Mobile menu
var btn = document.querySelector('.menu-btn');
var nav = document.getElementById('nav');
if (btn && nav) {
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Process steps: hover or focus moves the orange highlight
var steps = document.querySelectorAll('.steps li');
steps.forEach(function (li) {
  li.setAttribute('tabindex', '0');
  var on = function () {
    steps.forEach(function (s) { s.classList.remove('on'); });
    li.classList.add('on');
  };
  li.addEventListener('mouseenter', on);
  li.addEventListener('focus', on);
});

// Project form: validate, then open the visitor's email app with the message filled in
var form = document.getElementById('project-form');
if (form) {
  var msg = form.querySelector('.msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = Object.fromEntries(new FormData(form));
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '');
    if (!d.name.trim() || !emailOk || !d.service || !d.message.trim()) {
      msg.className = 'msg err';
      msg.textContent = 'Please fill in every field with a valid email address.';
      return;
    }
    var subject = encodeURIComponent('New project: ' + d.service);
    var body = encodeURIComponent(d.message + '\n\nFrom: ' + d.name + ' (' + d.email + ')');
    msg.className = 'msg ok';
    msg.textContent = 'Opening your email app to send the message…';
    window.location.href = 'mailto:dunkershighlight@gmail.com?subject=' + subject + '&body=' + body;
  });
}

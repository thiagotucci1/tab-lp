(function () {
  "use strict";

  // TODO: trocar pelo e-mail real da NewMode (também está no HTML das páginas).
  var CONTACT_EMAIL = "contato@newmode.com.br";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  function headerOffset() {
    var bar = document.querySelector(".site-header");
    return (bar ? bar.offsetHeight : 72) + 16;
  }

  // ---------- Scroll suave (Lenis) ----------
  var lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new window.Lenis({ lerp: 0.1 });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
  }

  // Âncoras na mesma página (com Lenis, o scroll nativo não anima)
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href*='#']");
    if (!a || a.pathname !== location.pathname || !a.hash || a.hash === "#") { return; }
    var target = document.querySelector(a.hash);
    if (!target) { return; }
    e.preventDefault();
    if (lenis) { lenis.scrollTo(target, { offset: -headerOffset() }); }
    else { target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }
    history.replaceState(null, "", a.hash);
  });

  // ---------- Menu mobile ----------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var toggleIcon = toggle.querySelector(".icon");
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      if (toggleIcon) { toggleIcon.textContent = open ? "close" : "menu"; }
    };
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) { setOpen(false); } });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  // ---------- Botão interativo (hover com troca de rótulo + seta) ----------
  document.querySelectorAll(".btn-glass, .btn").forEach(function (el) {
    var probe = el.cloneNode(true);
    probe.querySelectorAll(".icon").forEach(function (i) { i.remove(); });
    var label = probe.textContent.replace(/\s+/g, " ").trim();
    if (!label) { return; }
    el.classList.add("ihb");
    el.innerHTML =
      '<span class="ihb-label"></span>' +
      '<span class="ihb-hover" aria-hidden="true"><span></span><span class="icon">arrow_forward</span></span>' +
      '<span class="ihb-dot" aria-hidden="true"></span>';
    el.querySelector(".ihb-label").textContent = label;
    el.querySelector(".ihb-hover span").textContent = label;
  });

  // ---------- Entrada ao rolar (com escalonamento dentro de grades) ----------
  var items = document.querySelectorAll(".reveal");
  var seen = new Map();
  items.forEach(function (el) {
    var parent = el.parentElement;
    if (!parent.classList.contains("grid")) { return; }
    var n = seen.get(parent) || 0;
    el.style.transitionDelay = Math.min(n * 70, 350) + "ms";
    seen.set(parent, n + 1);
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ---------- Contador (KPIs) ----------
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduced && "IntersectionObserver" in window) {
    var fmt = function (el, v) {
      el.textContent = (el.getAttribute("data-prefix") || "") + Math.round(v).toLocaleString("pt-BR") + (el.getAttribute("data-suffix") || "");
    };
    counters.forEach(function (el) { fmt(el, 0); });
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        cio.unobserve(en.target);
        var el = en.target, to = parseFloat(el.getAttribute("data-count")), t0 = null, dur = 1400;
        (function tick(t) {
          if (t0 === null) { t0 = t; }
          var p = Math.min((t - t0) / dur, 1);
          var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; // easeInOut
          fmt(el, to * e);
          if (p < 1) { requestAnimationFrame(tick); }
        })(performance.now());
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // ---------- Marquee: acelera no hover ----------
  document.querySelectorAll(".marquee").forEach(function (m) {
    var track = m.querySelector(".marquee-track");
    if (!track || !track.getAnimations) { return; }
    var rate = function (r) { track.getAnimations().forEach(function (a) { a.updatePlaybackRate(r); }); };
    m.addEventListener("mouseenter", function () { rate(3); });
    m.addEventListener("mouseleave", function () { rate(1); });
  });

  // ---------- Galeria expansível: toque/clique ativa o item ----------
  document.querySelectorAll(".gallery").forEach(function (g) {
    var itemsG = g.querySelectorAll(".gallery-item");
    itemsG.forEach(function (it) {
      it.addEventListener("click", function () {
        itemsG.forEach(function (o) { o.classList.toggle("is-active", o === it && !it.classList.contains("is-active")); });
      });
      it.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); it.click(); }
      });
    });
  });

  // ---------- Ano no rodapé ----------
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---------- Formulário de contato ----------
  var form = document.getElementById("contact-form");
  if (form) {
    var wanted = new URLSearchParams(location.search).get("assunto");
    if (wanted) { form.assunto.value = wanted; }
    document.querySelectorAll("[data-assunto]").forEach(function (a) {
      a.addEventListener("click", function () { form.assunto.value = a.getAttribute("data-assunto"); });
    });

    // Sem backend ainda: abre o cliente de e-mail com a mensagem preenchida.
    // Para usar um serviço (Formspree, Netlify Forms etc.), defina o atributo action do <form>
    // e remova este handler.
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      if (form.getAttribute("action")) { return; }
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var d = new FormData(form);
      var checked = form.querySelector("input[name='assunto']:checked");
      var label = checked ? checked.parentElement.textContent.trim() : "Contato";
      var subject = "[Site NewMode] " + label + " — " + d.get("nome");
      var body = "Nome: " + d.get("nome") + "\nE-mail: " + d.get("email") + "\nAssunto: " + label + "\n\n" + d.get("mensagem");
      location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      if (status) {
        status.textContent = "Abrimos o seu app de e-mail com a mensagem pronta. Se nada abriu, escreva direto para " + CONTACT_EMAIL + ".";
        status.classList.add("is-visible");
      }
    });
  }
})();


/*
  MarkExpo static landing page
  Edit PRODUCT_CONFIG to replace placeholders with your verified product data.
*/
const PRODUCT_CONFIG = {
  name: "MarkExpo RECOVERX",
  price: "[PRICE]",
  packSize: "[PACK SIZE]",
  purchaseUrl: "#purchase"
};

document.documentElement.style.setProperty("--product-name", JSON.stringify(PRODUCT_CONFIG.name));

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const cartCount = document.getElementById("cartCount");
  const addCart = document.getElementById("addCart");
  const toast = document.getElementById("toast");

  // Sticky header
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-q").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Lightweight cart demo
  if (addCart) {
    addCart.addEventListener("click", () => {
      const current = Number.parseInt(cartCount.textContent || "0", 10) || 0;
      const next = current + 1;
      cartCount.textContent = next;
      cartCount.style.display = "inline-flex";
      toast.classList.add("show");
      window.clearTimeout(window.__markExpoToast);
      window.__markExpoToast = window.setTimeout(() => {
        toast.classList.remove("show");
      }, 1800);
    });
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("in-view"));
  }

  // Footer year
  document.getElementById("year").textContent = String(new Date().getFullYear());

  // Prevent placeholder social/policy links from doing an accidental navigation.
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener("click", e => e.preventDefault());
  });
});

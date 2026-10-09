document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================== */

  const header =
    document.getElementById("site-header");

  const navToggle =
    document.querySelector(".nav-toggle");

  const navMenu =
    document.getElementById("primary-menu");

  const navLinks =
    [...document.querySelectorAll(".nav-link")];

  const backToTop =
    document.getElementById("back-to-top");

  const sections =
    [...document.querySelectorAll("main section[id]")];

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightbox-image");

  const lightboxClose =
    document.querySelector(".lightbox-close");

  const menuTabs =
    [...document.querySelectorAll(".menu-tab")];

  const menuItems =
    [...document.querySelectorAll("[data-menu-item]")];

  const form =
    document.getElementById("contact-form");


  /* =========================
     STICKY HEADER
     ACTIVE NAVIGATION
     BACK TO TOP
  ========================== */

  function handleScroll() {

    const y = window.scrollY;

    header.classList.toggle(
      "scrolled",
      y > 20
    );

    backToTop.classList.toggle(
      "visible",
      y > 500
    );


    let current =
      sections[0]?.id || "home";


    sections.forEach(section => {

      if (
        y >=
        section.offsetTop - 160
      ) {
        current = section.id;
      }

    });


    navLinks.forEach(link => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") ===
        `#${current}`
      );

    });

  }


  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );

  handleScroll();


  /* =========================
     MOBILE NAVIGATION
  ========================== */

  navToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navMenu.classList.toggle("open");


      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );


      navToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

    }
  );


  navLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        navMenu.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        navToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      }
    );

  });


  /* =========================
     CLOSE MOBILE MENU
     WHEN CLICKING OUTSIDE
  ========================== */

  document.addEventListener(
    "click",
    event => {

      if (
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {

        navMenu.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =========================
     MENU CATEGORY FILTER
  ========================== */

  menuTabs.forEach(tab => {

    tab.addEventListener(
      "click",
      () => {

        const category =
          tab.dataset.category;


        menuTabs.forEach(item => {

          const active =
            item === tab;

          item.classList.toggle(
            "active",
            active
          );

          item.setAttribute(
            "aria-selected",
            String(active)
          );

        });


        menuItems.forEach(item => {

          item.classList.toggle(
            "hidden",
            item.dataset.category !== category
          );

        });

      }
    );

  });


  /* =========================
     SCROLL REVEAL
  ========================== */

  const revealItems =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              obs.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealItems.forEach(item => {

      observer.observe(item);

    });

  } else {

    revealItems.forEach(item => {

      item.classList.add("visible");

    });

  }


  /* =========================
     GALLERY LIGHTBOX
  ========================== */

  document
    .querySelectorAll("[data-lightbox-src]")
    .forEach(item => {

      item.addEventListener(
        "click",
        () => {

          lightboxImage.src =
            item.dataset.lightboxSrc;

          lightboxImage.alt =
            item.dataset.lightboxAlt || "";


          lightbox.classList.add("open");

          lightbox.setAttribute(
            "aria-hidden",
            "false"
          );

          document.body.classList.add(
            "no-scroll"
          );

          lightboxClose.focus();

        }
      );

    });


  function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "no-scroll"
    );

    lightboxImage.src = "";

  }


  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );


  lightbox.addEventListener(
    "click",
    event => {

      if (
        event.target === lightbox
      ) {
        closeLightbox();
      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains("open")
      ) {

        closeLightbox();

      }

    }
  );


  /* =========================
     BACK TO TOP
  ========================== */

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* =========================
     CONTACT FORM VALIDATION
  ========================== */

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document.getElementById("name");

      const phone =
        document.getElementById("phone");

      const message =
        document.getElementById("message");

      const success =
        document.getElementById("form-success");


      let valid = true;


      /* Clear previous errors */

      document
        .querySelectorAll(".field-error")
        .forEach(error => {

          error.textContent = "";

        });


      success.textContent = "";


      /* Validate name */

      if (
        name.value.trim().length < 2
      ) {

        name.nextElementSibling.textContent =
          "Please enter your name.";

        valid = false;

      }


      /* Validate phone */

      if (
        !/^[0-9+\-\s()]{7,}$/
          .test(phone.value.trim())
      ) {

        phone.nextElementSibling.textContent =
          "Please enter a valid phone number.";

        valid = false;

      }


      /* Validate message */

      if (
        message.value.trim().length < 5
      ) {

        message.nextElementSibling.textContent =
          "Please enter a short message.";

        valid = false;

      }


      /* Success */

      if (valid) {

        success.textContent =
          "Thank you! Your enquiry has been received on this website demo.";

        form.reset();

      }

    }
  );

});
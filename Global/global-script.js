// window.addEventListener("load", function () {})

let smoothScroll = null;
let windowViewPort, drawSVG, init_particles, flkty;

let test_val = 1;
window.addEventListener("load", function () {
  // let params = new URLSearchParams(window.location.search);
  if (window.innerWidth > 991) {
    windowViewPort = "desktop";
  } else if (window.innerWidth <= 991 && window.innerWidth > 767) {
    windowViewPort = "tablet";
  } else {
    windowViewPort = "mobile";
  }
  console.log(windowViewPort, "viewport type from global");
  gsap.registerPlugin(
    ScrollTrigger,
    // ScrollSmoother,
    Flip,
    DrawSVGPlugin,
    SplitText,
    MorphSVGPlugin
  );

  smoothScroll = new Lenis({
    duration: 1.2,
    // duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: "vertical", // vertical, horizontal
    gestureDirection: "vertical", // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false
  });

  // //get scroll value
  // smoothScroll.on(
  //   "scroll",
  //   ({ scroll, limit, velocity, direction, progress }) => {
  //     console.log({ scroll, limit, velocity, direction, progress });
  //   }
  // );

  function raf(time) {
    smoothScroll.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  //Set default duration for gsap
  gsap.defaults({
    duration: 1
  });
  // MorphSVGPlugin.convertToPath(
  //   "circle, rect, ellipse, line, polygon, polyline"
  // );
  setInitialSVGState = (type, name, target) => {
    let paths;
    if (type === undefined) {
      paths = document.querySelectorAll("svg path");
    } else if (target === undefined) {
      if (type === "id") {
        paths = document.querySelectorAll(`#${name} path`);
      } else if (type === "class") {
        paths = document.querySelectorAll(`.${name} path`);
      }
    } else if (target === "path") {
      if (type === "id") {
        paths = document.querySelectorAll(`path#${name}`);
      } else if (type === "class") {
        paths = document.querySelectorAll(`path.${name}`);
      }
    }
    paths.forEach(function (path) {
      let length = path.getTotalLength();
      path.style.transition = path.style.WebkitTransition = "none";
      path.style.strokeDasharray = length + " " + length;
      path.style.strokeDashoffset = length;
    });
  };
  drawSVG = (type, name, speed, selector, reverse) => {
    // Default speed is 2
    if (speed === undefined) {
      speed = 2;
    }

    // Get the path(s) to animate based on the type and name parameters
    var paths;
    if (type === undefined) {
      paths = document.querySelectorAll("svg path");
    } else if (selector === undefined) {
      if (type === "id") {
        paths = document.querySelectorAll(`#${name} path`);
      } else if (type === "class") {
        paths = document.querySelectorAll(`.${name} path`);
      }
    } else if (selector === "path") {
      if (type === "id") {
        paths = document.querySelectorAll(`path#${name}`);
      } else if (type === "class") {
        paths = document.querySelectorAll(`path.${name}`);
      }
    }

    // Animate each path
    paths.forEach(function (path, index) {
      var length = path.getTotalLength();

      // Clear any previous transition
      path.style.transition = path.style.WebkitTransition = "none";

      // Set up the starting positions
      path.style.strokeDasharray = length + " " + length;
      if (reverse) {
        path.style.strokeDashoffset = 0;
      } else {
        path.style.strokeDashoffset = length;
      }

      // Trigger a layout so styles are calculated & the browser
      // picks up the starting position before animating
      path.getBoundingClientRect();

      // Define the transition
      path.style.transition = path.style.WebkitTransition = `stroke-dashoffset ${speed}s ease-in-out`;

      // Animate forwards or backwards
      if (reverse) {
        path.style.strokeDashoffset = length;
      } else {
        path.style.strokeDashoffset = 0;
      }
    });
  };

  setInterval(() => {
    drawSVG("id", "cta-section");
    // drawSVG("class", "cta-bottom", 1.5);
    // drawSVG("class", "cta-bottom", 1.5);
  }, 3500);
  $(".slider1-item").each(function (index) {
    let id = "slider_item_" + index;
    $(this).attr("id", id);
  });
  $(".slider1-item").on("mouseenter", function () {
    let having_svg = $(this).find("svg").length !== 0;
    if (having_svg) {
      let id = $(this).attr("id");
      drawSVG("id", id, 1.5);
    }
  });
  setInitialSVGState("class", "svg-circle-border");
  $(".slider-control-arrow").each(function (index) {
    let id = "slider_arrow_" + index;
    $(this).find(".svg-circle-border").attr("id", id);
  });
  var pauseTimeout;
  $(".slider-control-arrow").on("click", function () {
    flkty.pausePlayer();
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(function () {
      flkty.unpausePlayer();
    }, 1000);
  });
  $(".slider-control-arrow").on("mouseenter", function () {
    let bg = $(this);
    let arrow = $(this).find(".svg-circle-arrow");
    let arrow_circle = $(this).find(".svg-circle-border");
    let having_svg = arrow_circle.length !== 0;
    if (having_svg) {
      let id = arrow_circle.attr("id");
      // drawSVG();
      drawSVG("id", id, 0.75);
    }
  });
  $(".slider-control-arrow").on("mouseleave", function () {
    let bg = $(this);
    let arrow = $(this).find(".svg-circle-arrow");
    let arrow_circle = $(this).find(".svg-circle-border");
    let having_svg = arrow_circle.length !== 0;
    if (having_svg) {
      let id = arrow_circle.attr("id");
      drawSVG("id", id, 0.75, undefined, true);
    }
  });

  $(".cta-bottom").each(function () {
    let tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0
      // paused: true
    });
    tl.to(".cta-bottom-part", {
      x: "-100%",
      duration: 20,
      ease: "none"
    }).to(".cta-bottom-part", {
      x: "-0%",
      duration: 0,
      ease: "none"
    });
  });
  $(`[parallax-effect="true"]`).each(function () {
    let parallax_type = $(this).attr("parallax-type");
    let parallax_start = $(this).attr("parallax-start");
    let parallax_end = $(this).attr("parallax-end");
    let parallax_end_random = Math.random() * (52 - 25) + 25;
    // let parallax_end_random = Math.random() * (45 - 22) + 22;
    // let parallax_end_random = Math.random() * (35 - 22) + 22;
    switch (parallax_type) {
      case "image":
        gsap
          .timeline({
            scrollTrigger: {
              trigger: $(this),
              scrub: true
            },
            defaults: {
              ease: "none"
            }
          })
          .fromTo(
            $(this),
            {
              backgroundPosition: `50% ${
                parallax_start !== undefined ? parallax_start : 100
              }%`
            },
            {
              backgroundPosition: `50% ${
                parallax_end !== undefined ? parallax_end : 0
              }%`
            }
          );
        break;
      default:
        gsap
          .timeline({
            scrollTrigger: {
              trigger: $(this),
              scrub: true
            },
            defaults: {
              ease: "none"
            }
          })
          .fromTo(
            $(this),
            {
              yPercent: `${parallax_start !== undefined ? parallax_start : 38}`
              // yPercent: `${parallax_start !== undefined ? parallax_start : 25}`
            },
            {
              yPercent: `${
                parallax_end !== undefined
                  ? parallax_end
                  : parallax_end_random * -1
              }`
            }
          );
    }
  });

  setTimeout(() => {
    let SplitFeaturedHeading = new SplitText(`[text-animation="true"]`, {
      type: "lines,words, chars",
      linesClass: "magic-line",
      wordsClass: "magic-word",
      charsClass: "magic-character"
    });
  }, 300);

  $(`[text-animation="true"]`).each(function (index) {
    let triggerElement = $(this);
    let delay_duration = $(this).attr("delay-duration");
    if (delay_duration === undefined) {
      delay_duration = 0;
    }
    let span_class = "span." + $(this).attr("span-class");
    console.log(span_class);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none none"
        // scrub: 1
        // once: true
      }
    });
    tl.set($(this), {
      opacity: 1
    }).fromTo(
      $(this).find(".magic-word"),
      {
        // opacity: 0,
        y: "102%"
      },
      {
        delay: delay_duration,
        duration: 0.6,
        // opacity: 1,
        y: "0%",
        ease: "power1.out"
        // stagger: 0.03
      }
    );
  });
  $(`[fade-animation="true"]`).each(function (index) {
    let triggerElement = $(this);
    let delay_duration = $(this).attr("delay-duration");
    if (delay_duration === undefined) {
      delay_duration = 0;
    }

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 85%",
        end: "bottom center",
        toggleActions: "play none none none"
        // scrub: 1
        // once: true
      }
    });
    tl.fromTo(
      triggerElement,
      {
        opacity: 0,
        y: 10
        // scale: 0.92,
      },
      {
        delay: delay_duration,
        y: 0,
        // scale: 1,
        duration: 0.7,
        opacity: 1
      }
    );
  });
  let particle_existing = false;
  init_particles = (particle_number = 80) => {
    particle_existing = true;
    //Particles
    particlesJS(
      // this is the ID your particles container needs to have
      "particle-screen",
      {
        particles: {
          number: {
            value: particle_number,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#caff00"
          },
          shape: {
            type: "image",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src:
                "https://uploads-ssl.webflow.com/62bde5720d5cbfc1dd34dae0/638115443df186126a9d5b52_Star.png",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 9,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 5.5,
            direction: "top",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "repulse"
            },
            onclick: {
              enable: false,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      }
    );
  };

  $(".button.cta-button:not(.contact-page)").on(
    "mouseenter mouseleave",
    function () {
      if (!particle_existing) {
        init_particles();
      }
      $(".particle-section-fixed").toggleClass("is-visible");
      $("body").toggleClass("paticles-active");
      $(this).css("opacity", 1);
    }
  );
});

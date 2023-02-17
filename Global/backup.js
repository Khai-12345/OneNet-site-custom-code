// window.addEventListener("load", function () {})

let smoothScroll = null;
let windowViewPort, drawSVG, init_particles;

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
    SplitText
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

  drawSVG = (type, name, speed) => {
    if (speed === undefined) {
      speed = 2;
    }
    speed.toString();
    var paths;
    if (type === undefined) {
      paths = document.querySelectorAll("svg path");
    } else {
      if (type === "id") {
        paths = document.querySelectorAll(`#${name} svg path`);
      } else if (type === "class") {
        paths = document.querySelectorAll(`.${name} svg path`);
      }
    }

    paths.forEach(function (path, index) {
      var length = path.getTotalLength();
      // Clear any previous transition
      path.style.transition = path.style.WebkitTransition = "none";
      // Set up the starting positions
      path.style.strokeDasharray = length + " " + length;
      path.style.strokeDashoffset = length;
      // Trigger a layout so styles are calculated & the browser
      // picks up the starting position before animating
      path.getBoundingClientRect();
      // Define our transition
      path.style.transition = path.style.WebkitTransition = `stroke-dashoffset ${speed}s ease-in-out`;
      // Go!
      path.style.strokeDashoffset = "0";
    });
  };

  setInterval(() => {
    drawSVG("id", "cta-section");
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
    let parallax_end_random = Math.random() * (45 - 22) + 22;
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
              yPercent: `${parallax_start !== undefined ? parallax_start : 25}`
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

  let SplitFeaturedHeading = new SplitText(`[text-animation="true"]`, {
    type: "lines,words,chars",
    linesClass: "magic-line",
    wordsClass: "magic-word",
    charsClass: "magic-character"
  });

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
        start: "top 85%",
        end: "bottom center",
        toggleActions: "play none none none"
        // scrub: 1
        // once: true
      }
    });
    if ($(this).attr("span-class") === undefined) {
      tl.set($(this), {
        opacity: 1
      }).fromTo(
        $(this).find(".magic-character"),
        {
          opacity: 0,
          y: 20
        },
        {
          delay: delay_duration,
          duration: 1.2,
          opacity: 1,
          y: 0,
          ease: "power1.out",
          stagger: 0.03
        }
      );
    } else {
      tl.set($(this), {
        opacity: 1
      })
        .fromTo(
          $(this).find(".magic-character"),
          {
            opacity: 0,
            y: 20
          },
          {
            delay: delay_duration,
            duration: 1.2,
            opacity: 1,
            y: 0,
            ease: "power1.out",
            stagger: 0.03
          }
        )
        .from(
          span_class,
          {
            color: "#f2f2f2",
            duration: 0.35
          },
          ">-0.5"
        );
    }
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
        scale: 0.92,
        y: 3
      },
      {
        delay: delay_duration,
        y: 0,
        scale: 1,
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

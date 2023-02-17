// window.addEventListener("load", function () {})

window.addEventListener("load", function () {
  console.log(windowViewPort, "viewport type from capabilities");
  flkty = new Flickity(".slider1-list", {
    cellAlign: "left",
    contain: true,
    // freeScroll: true,
    // percentPosition: true,
    pageDots: false,
    wrapAround: true,
    autoPlay: 5000,
    selectedAttraction: 0.01,
    friction: 0.25,
    // lower attraction and lower friction
    // slower transitions
    // easier to flick past cells
    prevNextButtons: false,
    draggable: true
  });
  flkty.on("change", function () {
    console.log("slide changed");
  });
  $("#slider1-next-btn").on("click", function () {
    flkty.next();
    // flkty.stopPlayer();
  });
  $("#slider1-prev-btn").on("click", function () {
    flkty.previous();
    // flkty.stopPlayer();
  });

  $(".capabilities-accordion-content").each(function () {
    let current_item = $(this);
    let content_height = $(this).innerHeight();
    current_item.attr({ height: content_height, state: "closed" });
    gsap.set(current_item, {
      height: 0
    });
  });
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  $(".capabilities-accordion-item").on("click", function () {
    let current_item = $(this).find(".capabilities-accordion-content");
    let state = current_item.attr("state");
    let content_height = current_item.attr("height");
    let space = $(this).find(".capabilities-accordion-space");
    let svg_icon = $(this).find(".accordion-icon");
    if (state === "closed") {
      gsap
        .timeline()
        .to(space, {
          height: "1.5rem",
          duration: 0.5,
          ease: "power1.inOut"
        })
        .to(
          current_item,
          {
            height: content_height,
            duration: 0.75,
            ease: "power1.inOut"
          },
          "<"
        )
        .add(function () {
          svg_icon.css("transform", "rotateZ(-45deg)");
        }, "<");

      current_item.attr("state", "open");
    } else {
      gsap
        .timeline()
        .to(current_item, {
          height: 0,
          duration: 0.5,
          ease: "power1.inOut"
        })
        .to(
          space,
          {
            height: "0rem",
            duration: 0.7,
            ease: "power1.inOut"
          },
          "<"
        )
        .add(function () {
          svg_icon.css("transform", "rotateZ(0deg)");
        }, "<");

      current_item.attr("state", "closed");
    }
  });
  //Animate hero icons
  console.log(windowViewPort);
  if (windowViewPort === "mobile") {
    gsap
      .timeline()
      .to(".capabilities-hero-bg-mobile .svg-icon.capabilities-hero-icon._1", {
        delay: 0.8,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: {
          each: 0.1,
          from: "random"
        }
      })
      .to(
        ".capabilities-hero-bg-mobile .svg-icon.capabilities-hero-icon._2",
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "random"
          }
        },
        ">-1"
      );
  } else {
    gsap
      .timeline()
      .to(".capabilities-hero-bg .svg-icon.capabilities-hero-icon._1", {
        delay: 0.8,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: {
          each: 0.1,
          from: "random"
        }
      })
      .to(
        ".capabilities-hero-bg .svg-icon.capabilities-hero-icon._2",
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "random"
          }
        },
        ">-1"
      );
  }

  const el = document.querySelector(".capabilities-service-header");
  const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
    { threshold: [1] }
  );

  observer.observe(el);

  //Slider cards on hover
  $(".slider1-item").on("mouseenter", function () {
    $(".slider1-item").css("border-color", "rgba(255, 194, 222, 0.3)");
    $(this).css("border-color", "rgba(255, 194, 222, 1)");
  });
  $(".slider1-item").on("mouseleave", function () {
    $(".slider1-item").css("border-color", "rgba(255, 194, 222, 1)");
  });

  // Get the URL query parameters and anchor link
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  let accParam = "";
  const anchor = window.location.hash;

  // Get the 'acc' parameter value
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] == "acc") {
      accParam = pair[1];
      break;
    }
  }

  // Toggle a specific link based on the 'acc' parameter value
  if (accParam) {
    console.log("accParam: ", accParam);
    $(document).ready(function () {
      $(
        `${anchor} .capabilities-accordions-contain .capabilities-accordion-item`
      ).each(function () {
        console.log("made it here");
        var index = $(this).index() + 1;
        if (index == accParam) {
          console.log("matched!");
          $(this).click();
        }
      });
    });
  }
});

window.addEventListener("load", function () {
  flkty = new Flickity(".slider1-list", {
    cellAlign: "left",
    contain: true,
    // freeScroll: true,
    // percentPosition: true,
    pageDots: false,
    wrapAround: true,
    autoPlay: 2000,
    selectedAttraction: 0.01,
    friction: 0.25,
    // friction: 0.15,
    // lower attraction and lower friction
    // slower transitions
    // easier to flick past cells
    prevNextButtons: false,
    draggable: true
  });
  flkty.on("change", function () {
    $(".slider1-item.is-selected").each(function () {
      let original_border_color = $(this).attr("original-border-color");
      // console.log(original_border_color);

      // $("#see-all-capabilities").on("mouseover", function () {
      //   gsap.to("#see-all-capabilities", {
      //     background: original_border_color,
      //     color: "#ffffff",
      //     repeat: -1,
      //     yoyo: true,
      //     ease: "power2.inOut",
      //     duration: 0.5
      //   });
      // });

      // $("#see-all-capabilities").on("mouseout", function () {
      //   gsap.set("#see-all-capabilities", {
      //     background: "initial",
      //     color: original_border_color
      //   });
      // });

      gsap
        .timeline()
        .to(".slider1-container,#see-all-capabilities", {
          borderColor: original_border_color
        })
        .to(
          "#see-all-capabilities",
          {
            color: original_border_color
          },
          "<"
        )
        .to(
          ".absolute-background",
          {
            backgroundColor: original_border_color
          },
          "<"
        );
    });
  });

  $("#slider1-next-btn").on("click", function () {
    flkty.next();
    // flkty.stopPlayer();
  });
  $("#slider1-prev-btn").on("click", function () {
    flkty.previous();
    // flkty.stopPlayer();
  });
  $(".slider1-item").each(function () {
    let current_border_color = $(this).css("border-color");
    $(this).attr("original-border-color", current_border_color);
  });

  //Slider cards on hover
  $(".slider1-item").on("mouseenter", function () {
    // Other items
    $(".slider1-item").each(function () {
      let original_border_color = $(this).attr("original-border-color");
      let new_border_color = convertRGBtoRGBA(original_border_color, 0.3);
      // console.log(border_color);
      $(this).css("border-color", new_border_color);
    });

    ///The item being hovered on
    let original_border_color = $(this).attr("original-border-color");

    $(this).css("border-color", original_border_color);
  });
  $(".slider1-item").on("mouseleave", function () {
    $(".slider1-item").each(function () {
      let original_border_color = $(this).attr("original-border-color");
      $(this).css("border-color", original_border_color);
    });
  });
  gsap
    .timeline()
    .to(".svg-icon.crew-hero-icon1", {
      delay: 1,
      // y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 1.6
    })
    .to(
      ".svg-icon.crew-hero-icon2",
      {
        // y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.4
      },
      ">-0.95"
    );

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
});

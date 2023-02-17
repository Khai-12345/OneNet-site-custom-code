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

  //Animate hero icons
  if (windowViewPort === "mobile") {
    gsap
      .timeline()
      .to(
        ".client-success-hero-bg-mobile .svg-icon.client-success-hero-icon._1",
        {
          delay: 0.85,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          stagger: {
            each: 0.2,
            from: "random"
          }
        }
      )
      .to(
        ".client-success-hero-bg-mobile .svg-icon.client-success-hero-icon._2",
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          stagger: {
            each: 0.15,
            from: "random"
          }
        },
        "<"
      )
      .to(
        ".client-success-hero-bg-mobile .svg-icon.client-success-hero-icon._3",
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: {
            each: 0.25,
            from: "random"
          }
        },
        "<"
      );
  } else {
    gsap
      .timeline()
      .to(".client-success-hero-bg .svg-icon.client-success-hero-icon._1", {
        delay: 0.85,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.1,
        stagger: {
          each: 0.2,
          from: "random"
        }
      })
      .to(
        ".client-success-hero-bg .svg-icon.client-success-hero-icon._2",
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          stagger: {
            each: 0.15,
            from: "random"
          }
        },
        "<"
      )
      .to(
        ".client-success-hero-bg .svg-icon.client-success-hero-icon._3",
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: {
            each: 0.25,
            from: "random"
          }
        },
        "<"
      );
  }

  $(".case-study-cms-wrapper.all .case-study-cms-item-card").each(function () {
    if ($(this).find("[case-study-type='Video']").length === 0) {
      $(this).find(".case-study-card-name.type-video").hide();
    }
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
});

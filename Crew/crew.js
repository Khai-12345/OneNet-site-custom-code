window.addEventListener("load", function () {
  let crew_card_repeat_count = 1;
  let crew_card_row_count = 1;
  let crew_join_misfits_count = 1;
  $(".crew-cms-list .crew-cms-item").each(function () {
    // let item_index = $(this).index();
    if (crew_card_row_count % 2 === 1) {
      switch (crew_card_repeat_count) {
        case 1:
          $(this).find(".crew-cms-img-contain").attr("radius-size", "6.25rem");
          break;
        case 2:
          $(this).find(".crew-cms-img-contain").attr("radius-size", "31.25rem");
          break;
        case 3:
          $(this)
            .find(".crew-cms-img-contain")
            .attr("radius-size", "4.6875rem");
          break;
        case 4:
          $(this).find(".crew-cms-img-contain").attr("radius-size", "0.625rem");
          break;
        default:
      }
    } else {
      switch (crew_card_repeat_count) {
        case 4:
          $(this).find(".crew-cms-img-contain").attr("radius-size", "6.25rem");
          break;
        case 3:
          $(this).find(".crew-cms-img-contain").attr("radius-size", "31.25rem");
          break;
        case 2:
          $(this)
            .find(".crew-cms-img-contain")
            .attr("radius-size", "4.6875rem");
          break;
        case 1:
          $(this).find(".crew-cms-img-contain").attr("radius-size", "0.625rem");
          break;
        default:
      }
    }

    if (crew_card_repeat_count % 4 === 0) {
      crew_card_repeat_count = 0;
      crew_card_row_count++;
    }
    crew_card_repeat_count++;
  });
  $(".crew-join-misfits-cms-list .crew-join-misfits-cms-item").each(
    function () {
      // let item_index = $(this).index();
      switch (crew_join_misfits_count) {
        case 2:
          $(this).find(".svg-icon.crew-join-misfit")
            .html(`<svg width="100%" height="100%" viewBox="0 0 114 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M56.9814 55.6591V0.41748M56.9814 55.6591L78.3437 4.43081M56.9814 55.6591L96.8791 16.4538M56.9814 55.6591L108.902 34.4882M56.9814 55.6591H113.16M56.9814 55.6591L108.902 77.8209M56.9814 55.6591L96.8791 96.3563M56.9814 55.6591L78.3437 108.129M56.9814 55.6591V111.886M56.9814 55.6591L35.5119 108.129M56.9814 55.6591L16.9765 96.3563M56.9814 55.6591L5.70496 77.8209M56.9814 55.6591H0.695312M56.9814 55.6591L5.70496 34.4882M56.9814 55.6591L16.9765 16.4538M56.9814 55.6591L35.5119 4.43081" stroke="#A5D005" stroke-width="2"/>
        </svg>
        `);
          break;
        case 3:
          $(this).find(".svg-icon.crew-join-misfit")
            .html(`<svg width="100%" height="100%" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="53.0469" y="0.41748" width="74.1619" height="74.1619" transform="rotate(45 53.0469 0.41748)" fill="#7000FF"/>
      </svg>
      
        `);
          break;
        case 4:
          $(this).find(".svg-icon.crew-join-misfit")
            .html(`<svg width="100%" height="100%" viewBox="0 0 93 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M92.0492 10.3003C92.0492 4.77745 87.5721 0.300297 82.0492 0.300297L10.9336 0.300293C5.41075 0.300293 0.933597 4.77743 0.933597 10.3003L0.933594 81.4159C0.933594 86.9387 5.41074 91.4159 10.9336 91.4159H82.0492C87.572 91.4159 92.0492 86.9388 92.0492 81.4159V10.3003ZM17.0907 77.9521C52.5402 77.9521 81.2777 49.2146 81.2777 13.7651H78.5848C43.1353 13.7651 14.3979 42.5026 14.3979 77.9521H17.0907Z" fill="#D1AEFF"/>
      </svg>
      
        `);
          break;
        case 5:
          $(this).find(".svg-icon.crew-join-misfit")
            .html(`<svg width="218" height="218" viewBox="0 0 218 218" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_1939_718" fill="white">
            <path d="M108.992 217.981C137.898 217.981 165.62 206.498 186.06 186.059C206.5 165.619 217.982 137.897 217.982 108.991C217.982 80.0845 206.5 52.3623 186.06 31.9226C165.62 11.4829 137.898 8.64098e-07 108.992 -4.76413e-06L108.992 73.4963C118.405 73.4963 127.434 77.2358 134.09 83.8923C140.747 90.5488 144.486 99.577 144.486 108.991C144.486 118.404 140.747 127.432 134.09 134.089C127.434 140.745 118.405 144.485 108.992 144.485L108.992 217.981Z"/>
            </mask>
            <path d="M108.992 217.981C137.898 217.981 165.62 206.498 186.06 186.059C206.5 165.619 217.982 137.897 217.982 108.991C217.982 80.0845 206.5 52.3623 186.06 31.9226C165.62 11.4829 137.898 8.64098e-07 108.992 -4.76413e-06L108.992 73.4963C118.405 73.4963 127.434 77.2358 134.09 83.8923C140.747 90.5488 144.486 99.577 144.486 108.991C144.486 118.404 140.747 127.432 134.09 134.089C127.434 140.745 118.405 144.485 108.992 144.485L108.992 217.981Z" stroke="#CAFF00" stroke-width="192" mask="url(#path-1-inside-1_1939_718)"/>
            <mask id="path-2-inside-2_1939_718" fill="white">
            <path d="M108.991 217.981C80.0845 217.981 52.3623 206.498 31.9226 186.059C11.4829 165.619 8.21001e-06 137.897 4.76413e-06 108.991C1.31826e-06 80.0845 11.4829 52.3623 31.9226 31.9226C52.3623 11.4829 80.0845 8.64098e-07 108.991 -4.76413e-06L108.991 73.4963C99.577 73.4963 90.5488 77.2358 83.8923 83.8923C77.2358 90.5488 73.4963 99.577 73.4963 108.991C73.4963 118.404 77.2358 127.432 83.8923 134.089C90.5488 140.745 99.577 144.485 108.991 144.485L108.991 217.981Z"/>
            </mask>
            <path d="M108.991 217.981C80.0845 217.981 52.3623 206.498 31.9226 186.059C11.4829 165.619 8.21001e-06 137.897 4.76413e-06 108.991C1.31826e-06 80.0845 11.4829 52.3623 31.9226 31.9226C52.3623 11.4829 80.0845 8.64098e-07 108.991 -4.76413e-06L108.991 73.4963C99.577 73.4963 90.5488 77.2358 83.8923 83.8923C77.2358 90.5488 73.4963 99.577 73.4963 108.991C73.4963 118.404 77.2358 127.432 83.8923 134.089C90.5488 140.745 99.577 144.485 108.991 144.485L108.991 217.981Z" stroke="#A5D005" stroke-width="4" mask="url(#path-2-inside-2_1939_718)"/>
            </svg>
        `);
          break;
        default:
      }

      if (crew_join_misfits_count % 5 === 0) {
        crew_join_misfits_count = 0;
      }
      crew_join_misfits_count++;
    }
  );
  let marquee_loop_animation = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    paused: true
  });
  marquee_loop_animation
    .to(".crew-join-misfits-cms-wrapper", {
      xPercent: -100,
      duration: 55,
      ease: "none"
    })
    .to(".crew-join-misfits-cms-wrapper", {
      xPercent: 0,
      duration: 0
    });
  marquee_loop_animation.play();

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

  $(".crew-cms-img-contain").each(function () {
    let triggerElement = $(this);
    let radius_size = $(this).attr("radius-size");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 75%",
        end: "top 25%",
        toggleActions: "play none none reverse"
        // scrub: 3
        // once: true
      }
    });
    tl.to(triggerElement, {
      borderRadius: radius_size,
      ease: "none",
      duration: 2.5
    });
  });

  $(document).on("mousemove", function () {
    $(".cursor_dot").removeClass("hide");
  });
  $(".crew-main-wrapper, .popup")
    .on("mouseenter", function () {
      $(".cursor_dot").addClass("show");
    })
    .on("mouseleave", function () {
      $(".cursor_dot").removeClass("show");
    });
  $(".crew-cms-img-contain")
    .on("mouseenter", function () {
      $(".cursor_dot").addClass("small");
    })
    .on("mouseleave", function () {
      $(".cursor_dot").removeClass("small");
    });
  let popUp_closable = true;
  let popUp_closing_finished = true;
  $(".popup")
    .on("mouseenter", function () {
      $("body").addClass("closeable");
    })
    .on("mouseleave", function () {
      $("body").removeClass("closeable");
    });
  $(".popup_content .rich-text-element, .popup_name-wrap")
    .on("mouseenter", function () {
      $("body").addClass("no-cursor-close");
      popUp_closable = false;
    })
    .on("mouseleave", function () {
      $("body").removeClass("no-cursor-close");
      popUp_closable = true;
    });

  function getDifference(cardImg, popupImg) {
    let cardWidth = cardImg.innerWidth();
    let cardHeight = cardImg.innerHeight();
    let cardRadius = cardImg.attr("radius-size");
    let offsetLeft = cardImg.offset().left - popupImg.offset().left;
    let offsetTop = cardImg.offset().top - popupImg.offset().top;
    // return transformValue
    return [offsetLeft, offsetTop, cardWidth, cardHeight, cardRadius];
  }

  // OPEN POPUP
  $(".crew-cms-item").on("click", function () {
    smoothScroll.stop();

    // get images to animate to & from
    let myIndex = $(this).index();
    console.log(myIndex);
    let cardImg = $(this).find(".crew-cms-img-contain");
    let popupImg = $(".popup_item").eq(myIndex).find(".popup_img");
    let popupItem = $(".popup_item").eq(myIndex);
    popupItem.css({ opacity: 1, pointerEvents: "auto" });
    // set initial display states
    $(".popup_item").removeClass("active");
    $(".popup_item").eq(myIndex).addClass("active");
    $(".popup").css("display", "block");
    cardImg.css("opacity", "0");
    $("body").addClass("no-scroll");
    $("body").addClass("popup-open");

    let transformValue = getDifference(cardImg, popupImg);

    // animations
    gsap
      .timeline()
      .fromTo(
        popupImg,
        {
          x: transformValue[0],
          y: transformValue[1],
          width: transformValue[2],
          height: transformValue[3],
          borderRadius: transformValue[4]
        },
        {
          x: 0,
          y: 0,
          width: "100%",
          height: "100%",
          borderRadius: "0rem",
          duration: 0.75,
          ease: "power1.inOut"
        }
      )
      .to(
        ".popup_bg",
        {
          opacity: 1,
          duration: 0.3
        },
        ">-0.45"
      )
      .to(
        ".popup_content",
        {
          opacity: 1,
          duration: 0.3,
          delay: 0.5,
          ease: "power2.inOut"
        },
        "<"
      );
  });

  // CLOSE POPUP
  $(".popup").on("click", function () {
    if (popUp_closable === true && popUp_closing_finished === true) {
      // get images to animate to & from
      popUp_closing_finished = false;
      let myIndex = $(".popup_item.active").index();
      let popupImg = $(".popup_item.active .popup_img");
      let cardImg = $(".crew-cms-img-contain").eq(myIndex);
      // .find(".full-width-img");
      let popupItem = $(".popup_item").eq(myIndex);
      let transformValue = getDifference(cardImg, popupImg);
      $("body").removeClass("popup-open");
      // $(".crew-cms-item").css("pointer-events", "none");
      function closePopup() {
        cardImg.css("opacity", "1");
        $(".popup").css("display", "none");
        popupImg.removeAttr("style");
        $("body").removeClass("no-scroll");
        // $(".crew-cms-item").css("pointer-events", "none");

        smoothScroll.start();

        popUp_closing_finished = true;
      }

      // animations

      gsap
        .timeline()
        .to(".popup_bg, .popup_content", {
          opacity: 0,
          duration: 0.45
        })
        .fromTo(
          popupImg,
          {
            x: 0,
            y: 0,
            borderRadius: "0rem",
            width: "100%",
            height: "100%"
          },
          {
            x: transformValue[0],
            y: transformValue[1],
            width: transformValue[2],
            height: transformValue[3],
            borderRadius: transformValue[4],
            duration: 0.8
          },
          ">-0.25"
        )
        .to(popupItem, {
          delay: 0.4,
          duration: 0,
          opacity: 0,
          pointerEvents: "none"
        })
        .add(() => closePopup());
    }
  });

  /// Mobile switch images
  let rotate_degree = 0;
  let rotate_degree_2 = 0;
  let crew_profile_img_list = [];
  let color_list = [
    "#caff00",
    "#a4d005",
    "#e5ff80",
    "#7000ff",
    "#431380",
    "#d1aeff",
    "#ffc2de",
    "#ed72ab",
    "#ffe0ef",
    "#f2f2f2"
  ];
  let prev_random_color = rgb2hex(
    $(".talented-misfits-mobile-svg.center").css("color")
  );
  if (windowViewPort === "mobile") {
    $(".popup_visual").each(function () {
      let img_url = $(this).find("img").attr("src");
      crew_profile_img_list.push(img_url);
    });
  } else {
    $(".crew-join-misfits-cms-wrapper._1 .crew-join-misfits-cms-item-img").each(
      function () {
        let img_url = $(this).find("img").attr("src");
        crew_profile_img_list.push(img_url);
      }
    );
  }

  setInterval(() => {
    rotate_degree = rotate_degree * -1 + 180;
    rotate_degree_2 = rotate_degree_2 + 180;
    let random_color_number = getRandomInt(0, color_list.length);
    let random_color = color_list[random_color_number];
    let current_img_src_list = [];
    if (windowViewPort !== "mobile") {
      shuffledNumbers(crew_profile_img_list);
      let img_overlay_side = $(
        ".crew-talent-misfits-img-overlay:nth-child(1)"
      ).attr("side");
      let side_icons = $(".crew-join-misfit");

      gsap.timeline().to(side_icons, {
        rotate: rotate_degree_2
        // color: random_color
      });

      $(".crew-talent-misfits-img-overlay").css(
        "background-color",
        random_color
      );

      if (img_overlay_side === "left") {
        $(".crew-talent-misfits-img-overlay").attr("side", "right");
      } else {
        $(".crew-talent-misfits-img-overlay").attr("side", "left");
      }

      setTimeout(() => {
        $(".crew-join-misfits-cms-item-img img").each(function (index) {
          console.log(crew_profile_img_list[index], "src");
          $(this).attr({
            src: crew_profile_img_list[index],
            srcset: ""
          });
        });
      }, 250);
    } else {
      $(".crew-talent-misfits-mobile-img img").each(function () {
        let current_img_src = $(this).attr("src");
        let random_img_number = getRandomInt(0, crew_profile_img_list.length);
        let new_img_src = crew_profile_img_list[random_img_number];
        let count = 0;
        function check_img() {
          count++;
          if (current_img_src_list.length === 0) {
            current_img_src_list.push(new_img_src);
          } else {
            let valid = true;
            for (let src of current_img_src_list) {
              if (src === new_img_src) {
                valid = false;
                break;
              }
              if (current_img_src === new_img_src) {
                valid = false;
                break;
              }
            }
            if (valid) {
              current_img_src_list.push(new_img_src);
              console.log("img approved", count);
            } else {
              let random_num = getRandomInt(0, crew_profile_img_list.length);
              new_img_src = crew_profile_img_list[random_num];
              console.log("re generate img and check", count);
              check_img();
            }
          }
        }
        check_img();
      });
      console.log(random_color, random_color_number);

      let img_overlay_side = $(
        ".crew-talent-misfits-img-overlay:nth-child(1)"
      ).attr("side");
      let side_icons = $(
        ".crew-talent-misfits-mobile-grid .talented-misfits-mobile-svg:not(.center)"
      );
      let center_icon = $(
        ".crew-talent-misfits-mobile-grid .talented-misfits-mobile-svg.center"
      );
      gsap
        .timeline()
        .to(side_icons, {
          rotate: -1 * rotate_degree
        })
        .to(
          center_icon,
          {
            rotate: rotate_degree,
            color: random_color
          },
          "<"
        );
      $(".crew-talent-misfits-img-overlay").css(
        "background-color",
        random_color
      );

      if (img_overlay_side === "left") {
        $(".crew-talent-misfits-img-overlay").attr("side", "right");
      } else {
        $(".crew-talent-misfits-img-overlay").attr("side", "left");
      }

      setTimeout(() => {
        $(".crew-talent-misfits-mobile-img img").each(function (index) {
          $(this).attr("src", current_img_src_list[index]);
        });
      }, 250);
    }
  }, 2000);
});

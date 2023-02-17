window.addEventListener("load", function () {
  smoothScroll.stop();

  // let loader_svgs = $(".loader_svg");
  // let color_list = ["#CAFF00", "#D1AEFF", "#ED72AB", "#F2F2F2", "#7000FF"];
  // loader_svgs.each(function () {
  //   let total_colors = color_list.length;
  //   let random_val = Math.floor(Math.random() * total_colors);
  //   let random_color = color_list[random_val];
  //   console.log(random_val, random_color);
  //   $(this).css("color", random_color);
  // });

  setTimeout(() => {
    scrollTo("#page-top", {
      offset: 0,
      duration: 0,
      easing: "none",
      immediate: true
    });
  }, 500);
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
  let hero_clone = $(".section.home-hero").clone();
  let header_clone = $(".section.header").clone();

  $(".loader_img.is-middle").append(header_clone);
  $(".loader_img.is-middle").append(hero_clone);
  setTimeout(() => {
    $(".loader").css("opacity", 0);
  }, 3850);
  setTimeout(() => {
    smoothScroll.start();
  }, 4000);
  setTimeout(() => {
    $(".loader_img.is-middle").html("");
  }, 4500);

  //Slider cards on hover
  $(".slider1-item").on("mouseenter", function () {
    $(".slider1-item").css("border-color", "rgba(209, 174, 255, 0.3)");
    $(this).css("border-color", "rgba(209, 174, 255, 1)");
  });
  $(".slider1-item").on("mouseleave", function () {
    $(".slider1-item").css("border-color", "rgba(209, 174, 255, 1)");
  });

  ////Player video

  // $(".reel-video-embed").each(function (index) {
  let thisComponent = $(".reel-video-embed.main");

  // create plyr settings
  let player = new Plyr(thisComponent.find(".plyr_video")[0], {
    controls: ["play", "progress", "current-time", "mute", "fullscreen"],
    resetOnEnd: true
  });

  // custom video cover

  thisComponent.find(".plyr_cover").on("click", function () {
    player.play();
  });
  player.on("ended", (event) => {
    thisComponent.removeClass("hide-cover");
  });

  // pause other playing videos when this one starts playing
  player.on("play", (event) => {
    $(".plyr_component").removeClass("hide-cover");
    thisComponent.addClass("hide-cover");
    let prevPlayingComponent = $(".plyr--playing")
      .closest(".plyr_component")
      .not(thisComponent);
    if (prevPlayingComponent.length > 0) {
      prevPlayingComponent.find(".plyr_pause-trigger")[0].click();
    }
  });
  thisComponent.find(".plyr_pause-trigger").on("click", function () {
    player.pause();
  });

  // exit full screen when video ends
  player.on("ended", (event) => {
    if (player.fullscreen.active) {
      player.fullscreen.exit();
    }
  });
  // set video to contain instead of cover when in full screen mode
  player.on("enterfullscreen", (event) => {
    thisComponent.addClass("contain-video");
  });
  player.on("exitfullscreen", (event) => {
    thisComponent.removeClass("contain-video");
  });
  // });

  ////Custom

  $(".video-list .reel-video-embed").each(function () {
    let case_study_name = $(this).find(".video_name").attr("case-study-name");
    case_study_name = case_study_name.replace(/\s+/g, "-").toLowerCase();
    $(this).attr("id", case_study_name);
  });
  $(".case-study-card-play-button").on("mouseenter", function () {
    // let case_study_type = $(this)
    //   .closest(".case-study-cms-item-card")
    //   .find(".casestudy-type")
    //   .text();
    // console.log("triggerd", case_study_type);
    let main_card = $(this).closest(".case-study-cms-item-card");
    let video_embed = main_card.find(".reel-video-embed");
    let bg_video = video_embed.find("video");
    let button_bg = main_card.find(".case-study-card-play-button");
    let arrow_img = main_card.find(".play-arow");
    let arrow_lottie = main_card.find(".play-arow-lottie");
    gsap
      .timeline()
      .to(video_embed, {
        opacity: 1,
        duration: 0.2
      })
      .to(arrow_img, {
        opacity: 0,
        duration: 0.2
      })
      .fromTo(
        arrow_lottie,
        {
          opacity: 0,
          scale: 0.65
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45
        },
        "<"
      )
      .to(
        button_bg,
        {
          backgroundColor: "transparent",
          duration: 0.2
        },
        "<"
      );
    bg_video.trigger("play");
  });
  $(".case-study-card-play-button").on("mouseleave", function () {
    let main_card = $(this).closest(".case-study-cms-item-card");
    let video_embed = main_card.find(".reel-video-embed");
    let bg_video = video_embed.find("video");
    let button_bg = main_card.find(".case-study-card-play-button");
    let arrow_img = main_card.find(".play-arow");
    let arrow_lottie = main_card.find(".play-arow-lottie");
    gsap
      .timeline()
      .to(video_embed, {
        opacity: 0,
        duration: 0.2
      })

      .to(button_bg, {
        backgroundColor: "#f2f2f2",
        duration: 0.2
      })
      .to(
        arrow_lottie,
        {
          opacity: 0,
          duration: 0.3
        },
        "<"
      )
      .fromTo(
        arrow_img,
        {
          opacity: 0,
          scale: 0.65
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35
        },
        ">"
      );

    bg_video.trigger("pause");
  });
  $(".hero-main-reel-btn").on("click", function () {
    open_video_screen("main");
  });
  $(".video-screen-close").on("click", function () {
    close_video_screen();
  });

  function open_video_screen(input) {
    console.log("opening video popup");
    player.play();
    gsap.fromTo(
      ".pop-up-video-contain",
      {
        pointerEvents: "none",
        opacity: 0,
        xPercent: -100
      },
      {
        pointerEvents: "auto",
        opacity: 1,
        xPercent: 0,
        duration: 0.35,
        ease: "power1.inOut"
      }
    );
    switch (input) {
      case "main":
        $(".reel-video-embed.main").css("display", "block");

        gsap.to(".reel-video-embed.main", {
          delay: 0.5,
          opacity: 1,
          duration: 0.2,
          ease: "power1.inOut"
        });

        break;

      default:
        $(`#${input}`).css("display", "block");
        gsap.to(`#${input}`, {
          delay: 0.5,
          opacity: 1,
          duration: 0.2,
          ease: "power1.inOut"
        });
    }

    smoothScroll.stop();
  }
  function close_video_screen(input) {
    console.log("closing video popup");
    player.pause();
    gsap.to(".pop-up-video-contain", {
      pointerEvents: "none",
      opacity: 0,
      duration: 0.2,
      ease: "power1.inOut"
    });
    smoothScroll.start();

    setTimeout(() => {
      $(".reel-video-embed.main").css("display", "none");
    }, 500);
  }
  let particlesSmallExisting = false;
  const init_particles_small = (particle_number) => {
    particlesSmallExisting = true;
    particlesJS(
      // this is the ID your particles container needs to have
      "particle-screen-small",
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
                "https://uploads-ssl.webflow.com/62bde5720d5cbfc1dd34dae0/63dc1f186796f746f5f03719_star-white.png",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.25,
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

  $(".hero-main-reel-btn").hover(function () {
    if (!particlesSmallExisting) {
      init_particles_small(90);
    }
    // $(".particle-section-fixed-small").css("opacity", "1");
    $(".particle-section-fixed-small").toggleClass("is-visible");
  });
});

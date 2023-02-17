window.addEventListener("load", function () {
  //Style news card
  // $(".regular-news-cms-list").prepend(`<div id="grid-placeholder-div"></div>`);
  $(".regular-news-cms-item,.featured-news-cms-item").each(function () {
    let news_category = $(this).find(".inter-14-medium").text();
    let text_elements = $(this).find("h3,.svg-icon, p");
    if (news_category === "Project launch") {
      $(this).attr("category", "project-launch-news");
      text_elements.css("color", "#E5FF80");
      $(this)
        .find(".regular-news-regular, .featured-news-featured")
        .css("border-color", "#E5FF80");
      $(this).find(".ball").css("background-color", "#E5FF80");
    } else {
      $(this).attr("category", "media-hits-news");
    }
  });
  //////////

  $(".regular-news-regular").on("mouseenter", function () {
    $('[category="project-launch-news"] a').css(
      "border-color",
      "rgba(229, 255, 128, 0.3)"
    );
    $('[category="media-hits-news"] a').css(
      "border-color",
      "rgba(209, 174, 255, 0.3)"
    );
    let type = $(this).closest(".regular-news-cms-item").attr("category");
    if (type === "project-launch-news") {
      $(this).css("border-color", "rgba(229, 255, 128, 1)");
    } else {
      $(this).css("border-color", "rgba(209, 174, 255, 1)");
    }
  });
  $(".regular-news-regular").on("mouseleave", function () {
    $('[category="project-launch-news"] a').css(
      "border-color",
      "rgba(229, 255, 128, 1)"
    );
    $('[category="media-hits-news"] a').css(
      "border-color",
      "rgba(209, 174, 255, 1)"
    );
  });

  //Filter function
  let news_cards = gsap.utils.toArray(".regular-news-cms-item");
  let card_list = $(".regular-news-cms-list");
  let card_list_original_height = $(".regular-news-cms-list").innerHeight();

  $(".news-filter-btn").on("click", function () {
    let btn_clicked_id = $(this).attr("id");
    $(".news-filter-btn").removeClass("is--active");
    $(this).addClass("is--active");
    update_filter(btn_clicked_id);
  });
  let update_filter = (button) => {
    // card_list.css("min-height", `${card_list_original_height}px`);
    const state = Flip.getState(news_cards);
    switch (button) {
      case "filter-btn-all":
        console.log("Showing all posts");
        $(".regular-news-cms-item").css("display", "flex");
        break;
      case "filter-btn-project-launch":
        console.log("Showing project launch news");
        $(`.regular-news-cms-item[category="project-launch-news"]`).css(
          "display",
          "flex"
        );
        $(`.regular-news-cms-item[category="media-hits-news"]`).css(
          "display",
          "none"
        );
        break;
      case "filter-btn-media-hits":
        console.log("Showing media hit news");
        $(`.regular-news-cms-item[category="project-launch-news"]`).css(
          "display",
          "none"
        );
        $(`.regular-news-cms-item[category="media-hits-news"]`).css(
          "display",
          "flex"
        );
        break;
      default:
    }

    Flip.from(state, {
      duration: 0.7,
      scale: true,
      ease: "power1.inOut",
      stagger: 0.08,
      // absolute: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 1 }
        ),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0, duration: 1 }),
      onComplete: () => {
        // card_list.css("min-height", `auto`);
        ScrollTrigger.refresh();
      }
    });
  };
  console.log(180 * getRandomInt(-5, 0), "Random");

  gsap
    .timeline()
    .fromTo(
      `.news-hero-bg.${windowViewPort} .svg-icon.news-hero-icon._1`,
      {
        y: getRandomInt(5, 10),
        rotation: 20 * getRandomInt(-2, 2),
        scale: 0.1 * getRandomInt(4, 6)
      },
      {
        delay: 0.65,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.1,
        stagger: {
          each: 0.15,
          from: "random"
        }
      }
    )
    .fromTo(
      `.news-hero-bg.${windowViewPort} .svg-icon.news-hero-icon._2`,
      {
        y: getRandomInt(5, 10),
        rotation: 20 * getRandomInt(-2, 2),
        scale: 0.1 * getRandomInt(4, 6)
      },
      {
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.9,
        stagger: {
          each: 0.25,
          from: "random"
        }
      },
      "<"
    )
    .fromTo(
      `.news-hero-bg.${windowViewPort} .svg-icon.news-hero-icon._3`,
      {
        y: getRandomInt(5, 10),
        rotation: 20 * getRandomInt(-2, 2),
        scale: 0.1 * getRandomInt(4, 6)
      },
      {
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: {
          each: 0.2,
          from: "random"
        }
      },
      "<"
    );
});

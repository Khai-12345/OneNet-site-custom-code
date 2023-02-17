gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
  duration: 0.75,
  ease: "power2.inOut"
});
// Object to get pricing values
let deviceType;
if (window.innerWidth >= 992) {
  deviceType = "desktop";
} else if (window.innerWidth < 992 && window.innerWidth >= 768) {
  deviceType = "tablet";
} else {
  deviceType = "mobile";
}
console.log(deviceType);
// let se_cms_list_overlay = $(".se-cms-list-overlay");

let pricing_elements = {
  strategy: {
    dwy: parseInt($("#strategy-price .se-dwy").text(), 10),
    dfy: parseInt($("#strategy-price .se-dfy").text(), 10)
  },
  mvp_site: {
    dwy: parseInt($("#mvp-site-price .se-dwy").text(), 10),
    dfy: parseInt($("#mvp-site-price .se-dfy").text(), 10)
  },
  full_marketing_site: {
    dwy: parseInt($("#full-marketing-site-price .se-dwy").text(), 10),
    dfy: parseInt($("#full-marketing-site-price .se-dfy").text(), 10)
  },
  multi_language_marketing_site: {
    dwy: parseInt($("#multi-language-marketing-site-price .se-dwy").text(), 10),
    dfy: parseInt($("#multi-language-marketing-site-price .se-dfy").text(), 10)
  },
  motion_multiplier: {
    level1: parseFloat($("#motion-multiplier-level-1").text(), 10),
    level2: parseFloat($("#motion-multiplier-level-2").text(), 10),
    level3: parseFloat($("#motion-multiplier-level-3").text(), 10),
    level4: parseFloat($("#motion-multiplier-level-4").text(), 10),
    level5: parseFloat($("#motion-multiplier-level-5").text(), 10)
  },
  site_types: [
    "mvp_site",
    "full_marketing_site",
    "multi_language_marketing_site"
  ]
};
// Object used to store states
$(".se-options-animation-container").attr(
  "motion-multiplier-choice",
  pricing_elements.motion_multiplier.level1
);
var state_elements;
let update_state_elements = () => {
  state_elements = {
    hero_choice: $(".se-hero-toggle-contain").attr("choice"),
    // strategy_mode: "dfy",
    site_type: $("#site-options-container").attr("chosen-site"),
    // site_type_mode: "dfy",
    motion_multiplier_value: parseFloat(
      $(".se-options-animation-container").attr("motion-multiplier-choice")
    ),
    // motion_multiplier_value: pricing_elements.motion_multiplier.level1,
    strategy: $("#strategy-card").attr("State"),
    execution: $("#execution-card").attr("State")
  };
};
update_state_elements();

//Version 2
//Update hero toggle UI
$(".se-hero-toggle-contain p").on("click", function () {
  let id = $(this).attr("id");
  if (id === "toggle-dfy") {
    $(".se-hero-toggle-contain").attr("choice", "dfy");

    gsap.to(".se-hero-toggle-contain-bg", {
      xPercent: 0,
      duration: 0.75
    });
  } else {
    $(".se-hero-toggle-contain").attr("choice", "dwy");

    gsap.to(".se-hero-toggle-contain-bg", {
      xPercent: 100,
      duration: 0.75
    });
  }
  update_state_elements();
});
$(".se-big-card").on("click", function () {
  let id = $(this).attr("id");
  // drawSVG(id);
  let state = $(this).attr("State");

  if (state === "unchecked") {
    state = "checked";
    $(this).attr("State", state);
  } else {
    state = "unchecked";
    $(this).attr("State", state);
  }
  update_state_elements();
});

$("#site-options-container .se-options-column.ver-2").on("click", function () {
  let columnID = $(this).attr("id");
  let state = $(this).attr("State");
  // drawSVG(columnID);
  // undo_selected_card();
  if (state === "unchecked") {
    undo_selected_card();
    $(this).attr("State", "checked");
    $(this).addClass("checked");
    if (columnID === "mvp-site-column") {
      $("#site-options-container").attr(
        "chosen-site",
        pricing_elements.site_types[0]
      );
    } else if (columnID === "full-marketing-column") {
      $("#site-options-container").attr(
        "chosen-site",
        pricing_elements.site_types[1]
      );
    } else {
      $("#site-options-container").attr(
        "chosen-site",
        pricing_elements.site_types[2]
      );
    }
  } else {
    $(this).attr("State", "unchecked");
    $(this).removeClass("checked");
  }
  update_state_elements();
});

let undo_selected_card = () => {
  $("#site-options-container .se-options-column.ver-2").each(function () {
    let state = $(this).attr("State");
    if (state === "checked") {
      $(this).click();
      $(this).attr("State", "unchecked");
      $(this).removeClass("checked");
    }
  });
};
$(".se-cms-list.ver-2").each(function () {
  let height = $(this).innerHeight();
  $(this).attr({
    "original-height": height,
    compressed: "true"
  });
  $(this).css("height", "0px");
  $(".se-options-column.ver-2").css("justify-content", "center");
});
$(".se-option-col-expand").on("click", function (e) {
  e.stopPropagation();
  let parent_column = $(this).closest(".se-options-column.ver-2");
  let list = parent_column.find(".se-cms-list");
  let icon = $(this);
  if (list.attr("compressed") === "true") {
    gsap.to(list, {
      height: list.attr("original-height"),
      duration: 0.95
    });
    gsap.to(icon, {
      rotateZ: 180,
      duration: 0.3
    });
    list.attr("compressed", "false");
  } else {
    gsap.to(list, {
      height: 0,
      duration: 0.55
    });
    gsap.to(icon, {
      rotateZ: 0,
      duration: 0.3
    });
    list.attr("compressed", "true");
  }
});
//Version 2

$(".se-animation-dot").on("click", function () {
  $(".se-animation-dot.is--active").removeClass("is--active");
  let index = $(this).index();
  let animation_UI_motion_multiplier = $(".se-options-animation-container");
  $(".se-animation-text").removeClass("is--active");
  switch (index) {
    case 1:
      // $("#se-animation-text-static").addClass("is--active");
      $("#se-animation-text-static").css("color", "rgba(255, 255, 255, 1)");
      $("#se-animation-text-all-animated").css(
        "color",
        "rgba(255, 255, 255, 0.6)"
      );
      if (deviceType !== "desktop") {
        $(".se-mobile-animation-text").css({
          opacity: 0
        });
      }
      $(".se-animation-line .se-line-inside").css("width", "0%");
      $(".se-animation-dot._1").addClass("is--active");
      animation_UI_motion_multiplier.attr(
        "motion-multiplier-choice",
        pricing_elements.motion_multiplier.level1
      );
      break;
    case 2:
      if (deviceType !== "desktop") {
        $(".se-animation-text").css("color", "rgba(255, 255, 255, 0)");
        $(".se-mobile-animation-text").css({
          left: "-4.25rem",
          opacity: 1,
          color: "rgba(255, 255, 255, 1)"
        });
      }
      $(".se-animation-line .se-line-inside").css("width", "24.5%");
      $(".se-animation-dot._1,.se-animation-dot._2").addClass("is--active");
      animation_UI_motion_multiplier.attr(
        "motion-multiplier-choice",
        pricing_elements.motion_multiplier.level2
      );
      break;
    case 3:
      if (deviceType !== "desktop") {
        $(".se-animation-text").css("color", "rgba(255, 255, 255, 0)");
        $(".se-mobile-animation-text").css({
          left: "auto",
          right: "auto",
          opacity: 1,
          color: "rgba(255, 255, 255, 1)"
        });
      }
      $(".se-animation-line .se-line-inside").css("width", "49.5%");
      $(
        ".se-animation-dot._1,.se-animation-dot._2,.se-animation-dot._3"
      ).addClass("is--active");
      animation_UI_motion_multiplier.attr(
        "motion-multiplier-choice",
        pricing_elements.motion_multiplier.level3
      );
      break;
    case 4:
      if (deviceType !== "desktop") {
        $(".se-animation-text").css("color", "rgba(255, 255, 255, 0)");
        $(".se-mobile-animation-text").css({
          right: "-4.75rem",
          opacity: 1,
          color: "rgba(255, 255, 255, 1)"
        });
      }
      $(".se-animation-line .se-line-inside").css("width", "74.5%");
      $(".se-animation-dot:not(._5)").addClass("is--active");
      animation_UI_motion_multiplier.attr(
        "motion-multiplier-choice",
        pricing_elements.motion_multiplier.level4
      );
      break;
    case 5:
      // $("#se-animation-text-all-animated").addClass("is--active");
      $("#se-animation-text-all-animated").css(
        "color",
        "rgba(255, 255, 255, 1)"
      );
      $("#se-animation-text-static").css("color", "rgba(255, 255, 255, 0.6)");
      if (deviceType !== "desktop") {
        $(".se-mobile-animation-text").css({
          opacity: 0
        });
      }
      $(".se-animation-line .se-line-inside").css("width", "100%");
      $(".se-animation-dot").addClass("is--active");
      animation_UI_motion_multiplier.attr(
        "motion-multiplier-choice",
        pricing_elements.motion_multiplier.level5
      );
      break;
    default:
    // code block
  }
});

//Function to update the calculation
function get_estimated_total_price() {
  let execution_price = 0;
  if (
    state_elements.site_type !== "null" &&
    state_elements.execution === "checked"
  ) {
    execution_price =
      pricing_elements[state_elements.site_type][state_elements.hero_choice];
  } else {
    execution_price = 0;
  }

  let strategy_price = 0;
  let motion_multiplier_value = state_elements.motion_multiplier_value;
  let total_price = 0;
  let site_plan;

  if (state_elements.strategy === "checked") {
    if (state_elements.hero_choice === "dwy") {
      strategy_price = Math.round(pricing_elements.strategy.dwy);
    } else if (state_elements.hero_choice === "dfy") {
      strategy_price = Math.round(pricing_elements.strategy.dfy);
    }
  } else {
    strategy_price = 0;
  }
  execution_price = Math.round(execution_price * motion_multiplier_value);
  // if (state_elements.site_type !== null) {
  total_price = Math.round(strategy_price + execution_price);
  // } else {
  //   total_price = 0;
  // }
  switch (state_elements.site_type) {
    case "mvp_site":
      site_plan = "MVP launch site";
      break;
    case "full_marketing_site":
      site_plan = "Full marketing site";
      break;
    case "multi_language_marketing_site":
      site_plan = "Multi-language marketing site";
      break;
    default:
  }
  // console.log(site_type_price, execution_price, motion_multiplier_value);
  return [
    strategy_price,
    execution_price,
    total_price,
    motion_multiplier_value,
    site_plan
  ];
}

let sub_total_price_updating_interval = setInterval(() => {
  console.log(state_elements);
  if ($(".se-options-column.ver-2.checked").length === 0) {
    $("#site-options-container").attr("chosen-site", "null");
    // update_state_elements();
  }
  update_state_elements();
  let [
    strategy_price,
    execution_price,
    sub_total_price,
    motion_multiplier_value,
    site_plan
  ] = get_estimated_total_price();
  if (site_plan === undefined) {
    $("#site-name-container").hide();
  } else {
    $("#site-name-container").show();
  }
  console.log(
    commafy_price(strategy_price),
    commafy_price(execution_price),
    motion_multiplier_value,
    commafy_price(sub_total_price),
    site_plan
  );
  $(".se-strategy-price").text(commafy_price(strategy_price));
  $(".se-execution-price").text(commafy_price(execution_price));
  $(".se-total-price").text(commafy_price(sub_total_price));
  $("#site-type").text(site_plan);
}, 250);

///////Animations

$(
  ".se-hero-div, .se-hero-container,.se-32-medium.top-heading, .se-hero-form-block,.se-container-header, .se-options-main-container,  .se-options-animation-container,  .se-options-final-price-contain,.learn-more-container,.se-24-regular.s-m-t-50  "
).each(function (index) {
  let triggerElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 90%",
      end: "top 80%",
      toggleActions: "play none none none"
    }
  });
  tl.to($(this), {
    opacity: 1,
    duration: 1.15,
    delay: 0.2
  });
});
$(".se-container-header-underline .se-line-inside").each(function (index) {
  let triggerElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 90%",
      end: "top 80%",
      toggleActions: "play none none none"
    }
  });
  tl.to($(this), {
    opacity: 1,
    width: "100%",
    duration: 1,
    ease: "circ.out"
  });
});
$(".se-options-animation-container").each(function (index) {
  let triggerElement = $(this);
  let line = $(this).find(".se-animation-line");
  let dot1 = $(this).find(".se-animation-dot._1");
  let dot2 = $(this).find(".se-animation-dot._2");
  let dot3 = $(this).find(".se-animation-dot._3");
  let dot4 = $(this).find(".se-animation-dot._4");
  let dot5 = $(this).find(".se-animation-dot._5");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 90%",
      end: "top 80%",
      toggleActions: "play none none none"
    }
  });
  setTimeout(() => {
    tl.to(dot1, {
      opacity: 1,
      duration: 0.7
    })
      .to(
        line,
        {
          width: "24.5%",
          duration: 0.7
        },
        ">-0.35"
      )
      .to(
        dot2,
        {
          opacity: 1,
          duration: 0.7
        },
        ">-0.35"
      )
      .to(
        line,
        {
          width: "49.5%",
          duration: 0.7
        },
        ">-0.35"
      )
      .to(
        dot3,
        {
          opacity: 1,
          duration: 0.7
        },
        ">-0.35"
      )
      .to(
        line,
        {
          width: "74.5%",
          duration: 0.7
        },
        ">-0.35"
      )
      .to(
        dot4,
        {
          opacity: 1,
          duration: 0.7
        },
        ">-0.35"
      )
      .to(
        line,
        {
          width: "100%",
          duration: 0.7
        },
        ">-0.35"
      )
      .to(
        dot5,
        {
          opacity: 1,
          duration: 0.7
        },
        ">-0.35"
      )
      .to(
        "#se-animation-text-all-animated",
        {
          opacity: 1
        },
        ">-0.35"
      );
  }, 700);
});
$(".learn-more-container").each(function (index) {
  let triggerElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 90%",
      end: "top 80%",
      toggleActions: "play none none none"
    }
  });
  setTimeout(() => {
    tl.from(".se-learnmore-grid-item", {
      y: "2rem",
      opacity: 0,
      stagger: { each: 0.7, from: "start" },
      // ease: "power2.inOut",
      duration: 0.85,
      ease: "circ.out"
    });
  }, 1500);
});
$(".se-options-column").each(function (index) {
  let triggerElement = $(this);
  let row = $(this).find(".se-options-row:not(.footer)");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 90%",
      end: "top 80%",
      toggleActions: "play none none none"
    }
  });
  setTimeout(() => {
    tl.to(row, {
      x: "0rem",
      opacity: 1,
      stagger: { each: 0.45, from: "start" },
      // ease: "power2.inOut",
      duration: 0.9,
      ease: "circ.out"
    });
  }, 900);
});
$(".se-big-card").each(function (index) {
  let triggerElement = $(this);
  // let line_top = $(this).find(`.se-options-border._1[card-border="true"]`);
  // let line_right = $(this).find(`.se-options-border._2[card-border="true"]`);
  // let line_left = $(this).find(`.se-options-border._4[card-border="true"]`);
  // let line_bottom = $(this).find(`.se-options-border._3[card-border="true"]`);
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 90%",
      end: "top 80%",
      toggleActions: "play none none none"
    }
  });
  tl.to(triggerElement, {
    opacity: 1
  });
  // setTimeout(() => {
  //   tl.to(line_top, {
  //     width: "100%",
  //     opacity: 1,
  //     duration: 0.9,
  //     ease: "circ.out"
  //   })
  //     .to(line_left, {
  //       height: "100%",
  //       duration: 0.9,
  //       ease: "circ.out"
  //     })
  //     .to(
  //       line_right,
  //       {
  //         height: "100%",
  //         duration: 0.9,
  //         ease: "circ.out"
  //       },
  //       "<"
  //     )
  //     .to(line_bottom, {
  //       width: "100%",
  //       duration: 0.9,
  //       ease: "circ.out"
  //     });
  // }, 900);
});
$(".se-options-row.footer").each(function (index) {
  let triggerElement = $(this);
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 70%",
      end: "top 60%",
      toggleActions: "play none none none"
    }
  });
  // setTimeout(() => {
  tl.to(triggerElement, {
    x: "0rem",
    opacity: 1,
    duration: 0.9,
    ease: "circ.out"
  });
  // }, 2200);
});

$(".se-options-row.header").each(function (index) {
  let triggerElement = $(this);
  let elementId = $(this).attr("id");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 90%",
      end: "top 80%",
      once: true,
      onEnter: () => {
        if (window.innerWidth > 992) {
          setTimeout(() => {
            drawSVG(elementId);
          }, 550);
        } else {
          drawSVG(elementId);
        }
      }
    }
  });
});
$("#execution-section").each(function (index) {
  let triggerElement = $(this);
  let icon = $(".se-section-connector-plus-icon");
  let animatedBackground = $(this).find(".se-main-gray-bg");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 95%",
      end: "top 90%",
      toggleActions: "play none none none"
    }
  });
  tl.to(icon, {
    scale: 1,
    borderColor: "white"
  })
    .to(icon, {
      rotate: "90deg",
      duration: 0.6
    })
    .to(
      animatedBackground,
      {
        height: "100%",
        ease: "power2.inOut",
        duration: 1.5
      },
      ">-0.3"
    );
});
function commafy_price(num) {
  var str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}

function drawSVG(id) {
  var paths;
  if (id === undefined) {
    paths = document.querySelectorAll("svg path");
  } else {
    paths = document.querySelectorAll(`#${id} .se-illustration svg path`);
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
    path.style.transition = path.style.WebkitTransition =
      "stroke-dashoffset 2s ease-in-out";
    // Go!
    path.style.strokeDashoffset = "0";
  });
}

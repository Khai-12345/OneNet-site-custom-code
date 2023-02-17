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
let se_cms_list_overlay = $(".se-cms-list-overlay");
let adjust_columns_height = () => {
  let strategy_shortest_col = 100000;
  let execution_shortest_col = 100000;
  $("#strategy-section .se-cms-list").each(function () {
    let columnHeight = $(this).innerHeight();
    $(this).attr("original-height", columnHeight);
    if (columnHeight <= strategy_shortest_col) {
      strategy_shortest_col = columnHeight;
      $("#strategy-section .shortest-column").removeClass("shortest-column");
      $(this).addClass("shortest-column");
    }
    // console.log("strategy-section", columnHeight);
  });
  $("#execution-section .se-cms-list").each(function () {
    let columnHeight = $(this).innerHeight();
    $(this).attr("original-height", columnHeight);
    if (columnHeight <= execution_shortest_col) {
      execution_shortest_col = columnHeight;
      $("#execution-section .shortest-column").removeClass("shortest-column");
      $(this).addClass("shortest-column");
    }
    // console.log("execution-section", columnHeight);
  });
  console.log(strategy_shortest_col, execution_shortest_col);
  $("#strategy-section .se-cms-list").css(
    "max-height",
    `${strategy_shortest_col}px`
  );
  $("#strategy-section .se-cms-list").attr(
    "compressed-height",
    strategy_shortest_col
  );
  $("#execution-section .se-cms-list").css(
    "max-height",
    `${execution_shortest_col}px`
  );
  $("#execution-section .se-cms-list").attr(
    "compressed-height",
    execution_shortest_col
  );
  se_cms_list_overlay
    .clone()
    .appendTo($("#strategy-section .se-cms-list:not(.shortest-column)"));
  se_cms_list_overlay
    .addClass("gray")
    .clone()
    .appendTo($("#execution-section .se-cms-list:not(.shortest-column)"));
  $(".se-cms-list:not(.shortest-column)").addClass("compressed");
  $(".se-cms-list.compressed .se-cms-list-overlay").on("click", function () {
    let current_cms_list = $(this).closest(".se-cms-list");
    let currentArrow = $(this).find(".se-arrow-down-svg");
    let original_Height = current_cms_list.attr("original-height");
    let current_Height = current_cms_list.innerHeight();
    let compress_Height = current_cms_list.attr("compressed-height");
    console.log(original_Height, current_Height, compress_Height);
    if (current_Height != original_Height) {
      // current_cms_list.css("max-height", `${original_Height}px`);
      gsap
        .timeline()
        .to(current_cms_list, {
          maxHeight: original_Height,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to(
          currentArrow,
          {
            rotation: 180,
            duration: 0.35,
            ease: "power1.inOut"
          },
          "<"
        );
    } else {
      // current_cms_list.css("max-height", `${compress_Height}px`);
      gsap
        .timeline()
        .to(current_cms_list, {
          maxHeight: compress_Height,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to(
          currentArrow,
          {
            rotation: 0,
            duration: 0.35,
            ease: "power1.inOut"
          },
          "<"
        );
    }
  });
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
};
if (deviceType === "desktop") {
  adjust_columns_height();
}
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
let state_elements = {
  dropdown_val: $(".se-hero-select").val(),
  strategy_mode: "dfy",
  site_type: null,
  site_type_mode: "dfy",
  motion_multiplier_value: pricing_elements.motion_multiplier.level1
};

$(".se-form-arrow-contain").on("click", function () {
  $("select #field").click();
});

// Update the hero select option
$(".se-hero-select").on("change", function () {
  state_elements.dropdown_val = $(this).val();
  console.log("New states: ", state_elements);
  update_interface();
});
//When user select a site option
$("#execution-section .se-options-row.footer").on("click", function () {
  $("#execution-section .se-options-row.footer").removeClass("selected");
  $(this).addClass("selected");
  let buttonID = $(this).attr("id");
  console.log(buttonID);
  if (buttonID === "mvp-site-select-button") {
    state_elements.site_type = pricing_elements.site_types[0];
  } else if (buttonID === "full-marketing-select-button") {
    state_elements.site_type = pricing_elements.site_types[1];
  } else {
    state_elements.site_type = pricing_elements.site_types[2];
  }
});

//When user changes mode
$(".se-mode-link").on("click", function () {
  $(this)
    .closest(".se-mode-container")
    .find(".se-mode-link")
    .removeClass("is--active");
  $(this).addClass("is--active");
  let buttonID = $(this).attr("id");
  switch (buttonID) {
    case "strategy-mode-dfy":
      state_elements.strategy_mode = "dfy";
      changingTitleColor(buttonID);
      break;
    case "strategy-mode-dwy":
      state_elements.strategy_mode = "dwy";
      changingTitleColor(buttonID);
      break;
    case "execution-mode-dfy":
      state_elements.site_type_mode = "dfy";
      changingTitleColor(buttonID);
      break;
    case "execution-mode-dwy":
      state_elements.site_type_mode = "dwy";
      changingTitleColor(buttonID);
      break;
    default:
    // code block
  }
});

$(".se-animation-dot").on("click", function () {
  $(".se-animation-dot.is--active").removeClass("is--active");
  let index = $(this).index();
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
      state_elements.motion_multiplier_value =
        pricing_elements.motion_multiplier.level1;
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
      state_elements.motion_multiplier_value =
        pricing_elements.motion_multiplier.level2;
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
      state_elements.motion_multiplier_value =
        pricing_elements.motion_multiplier.level3;
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
      state_elements.motion_multiplier_value =
        pricing_elements.motion_multiplier.level4;
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
      state_elements.motion_multiplier_value =
        pricing_elements.motion_multiplier.level5;
      break;
    default:
    // code block
  }
});
//Function to update the UI
function update_interface() {
  //Check the hero dropdown and update the sections
  if (state_elements.dropdown_val === "new-site") {
    $("#strategy-section").css("display", "block");

    $(".se-section-connector").css("display", "flex");
    $(".se-options-final-price-row:not(.final)").css("display", "flex");
    $(".se-options-final-price-row.final").removeClass("no-padding-top");
    $(".se-main-black-bg").css("height", "16rem");
  } else if (state_elements.dropdown_val === "site-improvement") {
    $("#strategy-section").css("display", "none");
    $(".se-section-connector").css("display", "none");
    $(".se-options-final-price-row:not(.final)").css("display", "none");
    $(".se-options-final-price-row.final").addClass("no-padding-top");
    $(".se-main-black-bg").css("height", "11rem");
  }

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

//Function to update the calculation
function get_estimated_total_price() {
  let execution_price = 0;
  if (state_elements.site_type !== null) {
    execution_price =
      pricing_elements[state_elements.site_type][state_elements.site_type_mode];
  }

  let strategy_price = 0;
  let motion_multiplier_value = state_elements.motion_multiplier_value;
  let total_price = 0;
  if (state_elements.dropdown_val === "new-site") {
    if (state_elements.strategy_mode === "dwy") {
      strategy_price = Math.round(pricing_elements.strategy.dwy);
    } else if (state_elements.strategy_mode === "dfy") {
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

  // console.log(site_type_price, execution_price, motion_multiplier_value);
  return [
    strategy_price,
    execution_price,
    total_price,
    motion_multiplier_value
  ];
}

let sub_total_price_updating_interval = setInterval(() => {
  let [
    strategy_price,
    execution_price,
    sub_total_price,
    motion_multiplier_value
  ] = get_estimated_total_price();
  console.log(
    commafy_price(strategy_price),
    commafy_price(execution_price),
    motion_multiplier_value,
    commafy_price(sub_total_price)
  );

  $(".se-strategy-price").text(commafy_price(strategy_price));
  $(".se-execution-price").text(commafy_price(execution_price));
  $(".se-total-price").text(commafy_price(sub_total_price));
}, 250);

///////Animations

$(
  ".se-hero-container h3,.se-hero-container, .se-hero-form-block,.se-container-header, .se-options-main-container,  .se-options-animation-container,  .se-options-final-price-contain,.learn-more-container,.se-24-regular.s-m-t-50  "
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
// $(".se-cms-list-overlay").each(function (index) {
//   let triggerElement = $(this);
//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: triggerElement,
//       start: "top 90%",
//       end: "top 80%",
//       toggleActions: "play none none none"
//     }
//   });
//   setTimeout(() => {
//     tl.to(triggerElement, {
//       opacity: 1,
//       duration: 0.6,
//       ease: "circ.out"
//     });
//   }, 2200);
// });
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
    paths = document.querySelectorAll(`#${id} svg path`);
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

function changingTitleColor(id) {
  switch (id) {
    case "strategy-mode-dfy":
      $("#strategy-section .se-options-row.header").addClass("white-bg");
      break;
    case "strategy-mode-dwy":
      $("#strategy-section .se-options-row.header").removeClass("white-bg");
      break;
    case "execution-mode-dfy":
      $("#execution-section .se-options-row.header").addClass("white-bg");
      break;
    case "execution-mode-dwy":
      $("#execution-section .se-options-row.header").removeClass("white-bg");
      break;
    default:
    // code block
  }
  drawSVG();
}

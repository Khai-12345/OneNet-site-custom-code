gsap.registerPlugin(ScrollTrigger);

$(".pricing_tab_content").css("opacity", 1);
setTimeout(() => {
  gsap.timeline().to($(".pricing_menu_single_item.updated-version"), {
    opacity: 1,
    duration: 1,
    ease: "power2.inOut"
  });
}, 800);
if (window.innerWidth >= 992) {
  $(".pricing_tab_content").each(function (index) {
    let triggerElement = $(this);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 65%",
        end: "bottom bottom",
        toggleActions: "play none none none"
        // once: true
      }
    });
    tl.from(
      $(this).find(".pricing_tab_row"),
      {
        y: "3.5rem",
        opacity: 0,
        stagger: { each: 0.35, from: "start" },
        ease: "power2.inOut",
        duration: 1.25
        // duration: 1
      },
      0
    );
  });
}

$(document).ready(function () {
  $("html, body").animate(
    {
      scrollTop: $(".pricing_header").offset().top
    },
    0
  );

  // mobile swipes //
  function detectswipe(el, func) {
    s_d = new Object();
    s_d.sX = 0;
    s_d.sY = 0;
    s_d.eX = 0;
    s_d.eY = 0;
    var min_x = 60;
    var max_x = 40;
    var min_y = 40;
    var max_y = 50;
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener(
      "touchstart",
      function (e) {
        var t = e.touches[0];
        s_d.sX = t.screenX;
        s_d.sY = t.screenY;
      },
      false
    );
    ele.addEventListener(
      "touchmove",
      function (e) {
        // e.preventDefault();
        var t = e.touches[0];
        s_d.eX = t.screenX;
        s_d.eY = t.screenY;
      },
      false
    );
    ele.addEventListener(
      "touchend",
      function (e) {
        //horizontal detection
        if (
          (s_d.eX - min_x > s_d.sX || s_d.eX + min_x < s_d.sX) &&
          s_d.eY < s_d.sY + max_y &&
          s_d.sY > s_d.eY - max_y
        ) {
          if (s_d.eX > s_d.sX) direc = "right";
          else direc = "left";
        }
        //vertical detection
        if (
          (s_d.eY - min_y > s_d.sY || s_d.eY + min_y < s_d.sY) &&
          s_d.eX < s_d.sX + max_x &&
          s_d.sX > s_d.eX - max_x
        ) {
          if (s_d.eY > s_d.sY) direc = "down";
          else direc = "up";
        }

        if (direc != "") {
          if (typeof func == "function") func(el, direc);
        }
        direc = "";
      },
      false
    );
  }

  function swipe1(el, d) {
    if (d != "" && d == "right") {
      // swiped right
      console.log("#1 swiped right");
      handleClick1("prev");
    } else if (d != "" && d == "left") {
      // swiped left
      console.log("#1 swiped left");
      handleClick1("next");
    }
  }
  function swipe2(el, d) {
    if (d != "" && d == "right") {
      // swiped right
      console.log("#2 swiped right");
      handleClick2("prev");
    } else if (d != "" && d == "left") {
      // swiped left
      console.log("#2 swiped left");
      handleClick2("next");
    }
  }
  detectswipe("swipeme", swipe1);
  detectswipe("swipeme2", swipe2);

  let pricingSlide1Index = 1;
  let pricingSlide2Index = 1;

  const handleClick1 = function (btn) {
    if (window.innerWidth < 480) {
      if (btn === "prev" && pricingSlide1Index > 1) {
        pricingSlide1Index -= 1;
        if (pricingSlide1Index === 1) {
          $(".pricing_prev_button").addClass("faded");
          $("#swipeme").removeClass("move_1");
        } else if (pricingSlide1Index === 2) {
          $(".pricing_next_button").removeClass("faded");
          $("#swipeme").removeClass("move_12");
        }
      }
      if (btn === "next" && pricingSlide1Index < 3) {
        pricingSlide1Index += 1;
        if (pricingSlide1Index === 2) {
          $(".pricing_prev_button").removeClass("faded");
          $("#swipeme").addClass("move_1");
        } else if (pricingSlide1Index === 3) {
          $(".pricing_next_button").addClass("faded");
          $("#swipeme").addClass("move_12");
        }
      }
    } else {
      if (btn === "prev" && pricingSlide1Index > 1) {
        pricingSlide1Index -= 1;
        $(".pricing_prev_button").addClass("faded");
        $(".pricing_next_button").removeClass("faded");
        $("#swipeme").removeClass("move_1");
      }
      if (btn === "next" && pricingSlide1Index < 2) {
        pricingSlide1Index += 1;

        $(".pricing_prev_button").removeClass("faded");
        $(".pricing_next_button").addClass("faded");
        $("#swipeme").addClass("move_1");
      }
    }
  };
  const handleClick2 = function (btn) {
    if (btn === "prev" && pricingSlide2Index > 1) {
      pricingSlide2Index -= 1;
      $(".pricing_prev_button_2").addClass("faded");
      $(".pricing_next_button_2").removeClass("faded");
      $("#swipeme2").removeClass("move_2");
    }
    if (btn === "next" && pricingSlide2Index < 2) {
      pricingSlide2Index += 1;
      $(".pricing_prev_button_2").removeClass("faded");
      $(".pricing_next_button_2").addClass("faded");
      $("#swipeme2").addClass("move_2");
    }
  };

  $(".pricing_prev_button").on("click", () => handleClick1("prev"));
  $(".pricing_next_button").on("click", () => handleClick1("next"));
  $(".pricing_prev_button_2").on("click", () => handleClick2("prev"));
  $(".pricing_next_button_2").on("click", () => handleClick2("next"));
});

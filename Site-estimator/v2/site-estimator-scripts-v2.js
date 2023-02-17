window.addEventListener("load", function () {
  setTimeout(() => {
    drawSVG("class", "site-estimator-illustration-svg");
  }, 200);
  let price_values = {
    execution: {
      mvp_site: Number($("#se-mvp-site-price p").text()),
      full_marketing_site: Number($("#se-full-marketing-site-price p").text()),
      multi_language_site: Number($("#se-multi-language-site-price p").text())
    },
    strategy: Number($("#se-strategy-price p").text()),
    motion_multiplier_values: {
      leverl_1: Number($("#se-motion-multiplier-level-1").text()),
      leverl_2: Number($("#se-motion-multiplier-level-2").text()),
      leverl_3: Number($("#se-motion-multiplier-level-3").text()),
      leverl_4: Number($("#se-motion-multiplier-level-4").text()),
      leverl_5: Number($("#se-motion-multiplier-level-5").text())
    }
  };
  console.log(price_values);

  let current_selection_states = {
    strategy: true,
    execution: "",
    motion_multiplier: price_values.motion_multiplier_values.leverl_1
  };

  function update_ui() {
    // console.log(current_selection_states);
    let strategy_sum_text = $(".site-estimator-sum-strategy");
    let execution_sum_text = $(".site-estimator-sum-execution");
    let animation_sum_text = $(".site-estimator-sum-animation");
    let total_sum_text = $(".site-estimator-sum-total");

    if (current_selection_states.execution === "") return;

    ////////////////////
    let strategy_sum, execution_sum, animation_sum, total_sum;
    strategy_sum = price_values.strategy;
    switch (current_selection_states.execution) {
      case "mvp_site":
        execution_sum = price_values.execution.mvp_site;
        break;
      case "full_marketing_site":
        execution_sum = price_values.execution.full_marketing_site;
        break;
      case "multi_language_site":
        execution_sum = price_values.execution.multi_language_site;
        break;
      default:
    }
    animation_sum = current_selection_states.motion_multiplier;

    total_sum = strategy_sum + execution_sum * animation_sum;
    // console.log(
    //   typeof strategy_sum,
    //   typeof execution_sum,
    //   typeof animation_sum,
    //   typeof total_sum
    // );
    // console.log(strategy_sum, execution_sum, animation_sum, total_sum);
    strategy_sum_text.text(strategy_sum.toLocaleString());
    execution_sum_text.text(execution_sum.toLocaleString());
    animation_sum_text.text(animation_sum);
    total_sum_text.text(total_sum.toLocaleString());
  }

  $(".site-estimator-item-cms").each(function () {
    let current_height = $(this).css("height");
    $(this).css("height", "0px");
    $(this).attr({
      expanded_height: current_height,
      is_collapsed: true
    });
  });
  $(".site-estimator-btn:not(.locked)").on("click", function () {
    let is_selected = $(this).hasClass("is-selected");
    let chosen_site_category = $(this).attr("site-category-name");
    if (is_selected) return;
    $(".site-estimator-btn:not(.locked)").removeClass("is-selected");
    $(this).addClass("is-selected");
    current_selection_states.execution = chosen_site_category;
    update_ui();
  });
  $(".animation-indicator-point").on("click", function () {
    let order = $(this).attr("order");
    let indicator_line = $(this)
      .closest(".animation-indicator-bar")
      .find(".animation-indicator-line");
    let target_point;
    let active_point_list = [];
    switch (order) {
      case "1":
        // console.log("Case 1");
        target_point = "0%";
        active_point_list = [1];
        current_selection_states.motion_multiplier =
          price_values.motion_multiplier_values.leverl_1;
        break;
      case "2":
        // console.log("Case 2");
        target_point = "25%";
        active_point_list = [1, 2];
        current_selection_states.motion_multiplier =
          price_values.motion_multiplier_values.leverl_2;
        break;
      case "3":
        // console.log("Case 3");
        target_point = "50%";
        active_point_list = [1, 2, 3];
        current_selection_states.motion_multiplier =
          price_values.motion_multiplier_values.leverl_3;
        break;
      case "4":
        // console.log("Case 4");
        target_point = "75%";
        active_point_list = [1, 2, 3, 4];
        current_selection_states.motion_multiplier =
          price_values.motion_multiplier_values.leverl_4;
        break;
      case "5":
        // console.log("Case 4");
        target_point = "100%";
        active_point_list = [1, 2, 3, 4, 5];
        current_selection_states.motion_multiplier =
          price_values.motion_multiplier_values.leverl_5;
        break;
      default:
    }
    update_ui();
    for (let i of [1, 2, 3, 4, 5]) {
      if (!active_point_list.includes(i)) {
        $(`.animation-indicator-point._${i}`).attr("is-active", false);
      }
    }
    let timeout_val = 0;
    for (let active_point of active_point_list) {
      setTimeout(() => {
        $(`.animation-indicator-point._${active_point}`).attr(
          "is-active",
          true
        );
      }, timeout_val);
      timeout_val += 50;
    }
    gsap.to(indicator_line, {
      width: target_point,
      duration: 0.45
    });
  });
  $(".site-estimator-item-container").on("click", function () {
    let cms_component = $(this).find(".site-estimator-item-cms");
    let cms_component_list = $(this).find(".site-estimator-item-cms-list");
    let arrow_svg = $(this).find(".site-estimator-arrow");
    let state = cms_component.attr("is_collapsed");
    // console.log(state);
    if (state === "true") {
      let expanded_height = cms_component.attr("expanded_height");
      // console.log(expanded_height);
      gsap
        .timeline()
        .to(cms_component, {
          height: expanded_height,
          duration: 0.45
        })
        .to(
          arrow_svg,
          {
            rotateZ: 180,
            duration: 0.45
          },
          "<"
        )
        .to(cms_component_list, {
          opacity: 1,
          duration: 0.45
        });

      cms_component.attr({
        is_collapsed: false
      });
    } else {
      gsap
        .timeline()
        .to(cms_component_list, {
          opacity: 0,
          duration: 0.45
        })
        .to(
          arrow_svg,
          {
            rotateZ: 0,
            duration: 0.45
          },
          "<"
        )
        .to(cms_component, {
          height: "0px",
          duration: 0.45
        });

      cms_component.attr({
        is_collapsed: true
      });
    }
  });

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
});

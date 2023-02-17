gsap.registerPlugin(ScrollTrigger);
$(".pricing_tab_content").css("opacity", 1);
if (window.innerWidth >= 992) {
  $(".pricing_tab_content").each(function (index) {
    let triggerElement = $(this);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 55%",
        end: "bottom bottom",
        toggleActions: "play none none none"
        // once: true
      }
    });
    tl.from(
      $(this).find(".pricing_tab_pane_col"),
      {
        y: "3.5rem",
        opacity: 0,
        stagger: { each: 0.35, from: "start" },
        ease: "power2.inOut",
        duration: 1.2
        // duration: 1
      },
      0
    );
  });

  $(".pricing_total_price,.recent-examples-wrapper").each(function (index) {
    let triggerElement = $(this);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none none"
        // once: true
      }
    });
    tl.from(
      $(this),
      {
        y: "3.5rem",
        opacity: 0,
        ease: "power2.inOut",
        duration: 1.25
        // duration: 1
      },
      0
    );
  });
}

$(".pricing-radio-label-max").on("mousedown", function () {
  let min_cost = $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".pricing_cost_min")
    .text();
  $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".min_value")
    .attr("add-value", min_cost);
  let max_cost = $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".pricing_cost_max")
    .text();
  $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".max_value")
    .attr("add-value", max_cost);
});

$(".pricing-radio-label-max").on("mousedown", function () {
  let min_cost_2 = $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".pricing_cost_min")
    .text();
  $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".min_value")
    .attr("add-value", min_cost_2);
  let max_cost_2 = $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".pricing_cost_max")
    .text();
  $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".max_value")
    .attr("add-value", max_cost_2);
});

$(".pricing-radio-label-max").on("mousedown", function () {
  let min_cost_3 = $(this)
    .closest(".pricing_tab_pane_row")
    .find(".pricing_cost_min")
    .text();
  $(this)
    .closest(".pricing_tab_pane_row")
    .find(".min_value")
    .attr("add-value", min_cost_3);
  let max_cost_3 = $(this)
    .closest(".pricing_tab_pane_row")
    .find(".pricing_cost_max")
    .text();
  $(this)
    .closest(".pricing_tab_pane_row")
    .find(".max_value")
    .attr("add-value", max_cost_3);
});

$(".pricing_label_group").on("click", function () {
  $(".pricing_tab_pane_row").removeClass("chosen");
  $(".pricing_tab_pane_row").find(".check_icon").removeClass("chosen");
  $(this).closest(".pricing_tab_pane_row").addClass("chosen");
  $(this)
    .closest(".pricing_tab_pane_row")
    .find(".check_icon")
    .addClass("chosen");
  $(this).closest(".pricing_tab_pane_row").find(".pricing-radio-label").click();
});

$(".pricing_label_group_1").on("click", function () {
  $(".pricing_tab_pane_row_1").removeClass("chosen");
  $(".pricing_tab_pane_row_1").find(".check_icon").removeClass("chosen");
  $(this).closest(".pricing_tab_pane_row_1").addClass("chosen");
  $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".check_icon")
    .addClass("chosen");
  $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".pricing-radio-label")
    .click();
});

$(".pricing_label_group_2").on("click", function () {
  $(".pricing_tab_pane_row_2").removeClass("chosen");
  $(".pricing_tab_pane_row_2").find(".check_icon").removeClass("chosen");
  $(this).closest(".pricing_tab_pane_row_2").addClass("chosen");
  $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".check_icon")
    .addClass("chosen");
  $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".pricing-radio-label")
    .click();
});

// on each radio button click
$(".pricing-radio-label").click(function () {
  // declare sum variable
  let sum;
  // if this radio button is in the branding group
  if ($(this).prev().is('[name="Branding"]')) {
    // the sum is equal to the radio button's value
    // plus the selected development group radio button
    // if no radio button is selected in the development group
    // default to 0
    sum =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Development"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Animation"]:checked').attr("add-value")) || 0);
  } else if ($(this).prev().is('[name="Development"]')) {
    // if this radio button is in the development group
    // the sum is equal to the radio button's value
    // plus the selected branding group radio button
    // if no radio button is selected in the branding group
    // default to 0
    sum =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Branding"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Animation"]:checked').attr("add-value")) || 0);
  } else {
    // if this radio button is in the development group
    // the sum is equal to the radio button's value
    // plus the selected branding group radio button
    // if no radio button is selected in the branding group
    // default to 0
    sum =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Branding"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Development"]:checked').attr("add-value")) || 0);
  }

  // format sum e.g. 3500 to 3,500
  const formattedSum = new Intl.NumberFormat().format(sum);
  // display the sum
  // NB: use sum directly if not interested in formatting
  $(".pricing-added-value").text(formattedSum);
  // add the radio button's value to the hidden input field
  $(".pricing-send-value").val(formattedSum);
});

$(".pricing-radio-label-max").click(function () {
  let sum_max;
  // if this radio button is in the branding group
  if ($(this).prev().is('[name="Branding-max"]')) {
    // the sum is equal to the radio button's value
    // plus the selected development group radio button
    // if no radio button is selected in the development group
    // default to 0
    sum_max =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Development-max"]:checked').attr("add-value")) ||
        0) +
      (Number($('input[name="Animation-max"]:checked').attr("add-value")) || 0);
  } else if ($(this).prev().is('[name="Development-max"]')) {
    // if this radio button is in the development group
    // the sum is equal to the radio button's value
    // plus the selected branding group radio button
    // if no radio button is selected in the branding group
    // default to 0
    sum_max =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Branding-max"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Animation-max"]:checked').attr("add-value")) || 0);
  } else {
    // if this radio button is in the development group
    // the sum is equal to the radio button's value
    // plus the selected branding group radio button
    // if no radio button is selected in the branding group
    // default to 0
    sum_max =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Branding-max"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Development-max"]:checked').attr("add-value")) ||
        0);
  }

  // format sum e.g. 3500 to 3,500
  const formattedSumMax = new Intl.NumberFormat().format(sum_max);

  // display the sum
  // NB: use sum directly if not interested in formatting
  $(".pricing-added-value-max").text(formattedSumMax);
  // add the radio button's value to the hidden input field
});

if ($(window).width() >= 992) {
  //prechecked the radio buttons
  $(".prechecked").click();
} else {
  $(".prechecked-mobile").click();
}

// add commas to prices (but still allow functionality)
$("[data-price='true']").each(function () {
  let num = Number($(this).text()) / 1000;
  let newEl = $(`<span>${num}</span><span class="zeros">000</span>`);
  $(this).html(newEl);
});

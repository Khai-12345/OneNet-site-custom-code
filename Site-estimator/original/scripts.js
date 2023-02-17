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
      console.log("swiped right");
      $(".pricing_prev_button > img").click();
    } else if (d != "" && d == "left") {
      // swiped left
      console.log("swiped left");
      $(".pricing_next_button > img").click();
    }
  }
  function swipe2(el, d) {
    if (d != "" && d == "right") {
      // swiped right
      console.log("swiped right");
      $(".pricing_prev_button_2 > img").click();
    } else if (d != "" && d == "left") {
      // swiped left
      console.log("swiped left");
      $(".pricing_next_button_2 > img").click();
    }
  }
  detectswipe("swipeme", swipe1);
  detectswipe("swipeme2", swipe2);

  const handleClick = function (t) {
    console.log("t: ", t);
    const className = t.parent().attr("class");
    const num = className.split("").pop() == "2" ? "2" : "1";
    const dir = className.split("_")[1] == "next" ? "next" : "prev";
    if (dir == "prev") {
      t.parent().addClass("faded");
      t.parent()
        .closest(".pricing_tab_pane_grid")
        .find(".pricing_tab_pane_col")
        .removeClass(`move_${num}`);
      t.parent()
        .closest(".pricing_tab_pane_grid")
        .find(`.pricing_next_button${num == "1" ? "" : "_2"}`)
        .removeClass("faded");
    } else {
      t.parent().addClass("faded");
      t.parent()
        .closest(".pricing_tab_pane_grid")
        .find(".pricing_tab_pane_col")
        .addClass(`move_${num}`);
      t.parent()
        .closest(".pricing_tab_pane_grid")
        .find(`.pricing_prev_button${num == "1" ? "" : "_2"}`)
        .removeClass("faded");
    }
  };

  $(
    ".pricing_next_button, .pricing_next_button_2, .pricing_prev_button, .pricing_prev_button_2"
  ).on("click", (e) => handleClick($(e.target)));
});

$(".pricing-radio-label-max").on("mousedown", function () {
  let min_cost = $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".pricing_cost_min")
    .text();
  min_cost = parseInt(min_cost.replace(/,/g, ""));
  $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".min_value")
    .attr("add-value", min_cost);
  let max_cost = $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".pricing_cost_max")
    .text();
  max_cost = parseInt(max_cost.replace(/,/g, ""));
  $(this)
    .closest(".pricing_tab_pane_row_1")
    .find(".max_value")
    .attr("add-value", max_cost);
});
$(".pricing-radio-label-max").on("mousedown", function () {
  let min_cost_strategy = $(this)
    .closest(".pricing_tab_pane_row_strategy")
    .find(".pricing_cost_min")
    .text();
  min_cost_strategy = parseInt(min_cost_strategy.replace(/,/g, ""));
  $(this)
    .closest(".pricing_tab_pane_row_strategy")
    .find(".min_value")
    .attr("add-value", min_cost_strategy);
  let max_cost_strategy = $(this)
    .closest(".pricing_tab_pane_row_strategy")
    .find(".pricing_cost_max")
    .text();
  max_cost_strategy = parseInt(max_cost_strategy.replace(/,/g, ""));
  $(this)
    .closest(".pricing_tab_pane_row_strategy")
    .find(".max_value")
    .attr("add-value", max_cost_strategy);
  console.log(min_cost_strategy, max_cost_strategy);
});

$(".pricing-radio-label-max").on("mousedown", function () {
  let min_cost_2 = $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".pricing_cost_min")
    .text();
  min_cost_2 = parseInt(min_cost_2.replace(/,/g, ""));
  $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".min_value")
    .attr("add-value", min_cost_2);
  let max_cost_2 = $(this)
    .closest(".pricing_tab_pane_row_2")
    .find(".pricing_cost_max")
    .text();
  max_cost_2 = parseInt(max_cost_2.replace(/,/g, ""));
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
  min_cost_3 = parseInt(min_cost_3.replace(/,/g, ""));
  $(this)
    .closest(".pricing_tab_pane_row")
    .find(".min_value")
    .attr("add-value", min_cost_3);
  let max_cost_3 = $(this)
    .closest(".pricing_tab_pane_row")
    .find(".pricing_cost_max")
    .text();
  max_cost_3 = parseInt(max_cost_3.replace(/,/g, ""));
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
$(".pricing_label_group_strategy").on("click", function () {
  $(".pricing_tab_pane_row_strategy").removeClass("chosen");
  $(".pricing_tab_pane_row_strategy").find(".check_icon").removeClass("chosen");
  $(this).closest(".pricing_tab_pane_row_strategy").addClass("chosen");
  $(this)
    .closest(".pricing_tab_pane_row_strategy")
    .find(".check_icon")
    .addClass("chosen");
  $(this)
    .closest(".pricing_tab_pane_row_strategy")
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
      (Number($('input[name="Strategy"]:checked').attr("add-value")) || 0) +
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
      (Number($('input[name="Strategy"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Animation"]:checked').attr("add-value")) || 0);
  } else if ($(this).prev().is('[name="Animation"]')) {
    // if this radio button is in the development group
    // the sum is equal to the radio button's value
    // plus the selected branding group radio button
    // if no radio button is selected in the branding group
    // default to 0
    sum =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Branding"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Strategy"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Development"]:checked').attr("add-value")) || 0);
  } else if ($(this).prev().is('[name="Strategy"]')) {
    // if this radio button is in the development group
    // the sum is equal to the radio button's value
    // plus the selected branding group radio button
    // if no radio button is selected in the branding group
    // default to 0
    sum =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Branding"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Animation"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Development"]:checked').attr("add-value")) || 0);
    console.log("Min working");
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
      (Number($('input[name="Strategy-max"]:checked').attr("add-value")) || 0) +
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
      (Number($('input[name="Strategy-max"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Animation-max"]:checked').attr("add-value")) || 0);
  } else if ($(this).prev().is('[name="Animation-max"]')) {
    // if this radio button is in the development group
    // the sum is equal to the radio button's value
    // plus the selected branding group radio button
    // if no radio button is selected in the branding group
    // default to 0
    sum_max =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Branding-max"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Strategy-max"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Development-max"]:checked').attr("add-value")) ||
        0);
  } else if ($(this).prev().is('[name="Strategy-max"]')) {
    // if this radio button is in the development group
    // the sum is equal to the radio button's value
    // plus the selected branding group radio button
    // if no radio button is selected in the branding group
    // default to 0
    sum_max =
      Number($(this).prev().attr("add-value")) +
      (Number($('input[name="Branding-max"]:checked').attr("add-value")) || 0) +
      (Number($('input[name="Animation-max"]:checked').attr("add-value")) ||
        0) +
      (Number($('input[name="Development-max"]:checked').attr("add-value")) ||
        0);

    console.log("Max working");
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
  // let num = Number($(this).text()) / 1000;
  // let newEl = $(`<span>${num}</span><span class="zeros">000</span>`);
  // $(this).html(newEl);
  const formattedNum = new Intl.NumberFormat().format(Number($(this).text()));
  $(this).text(formattedNum);
});

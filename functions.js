/////////Custom dropdown
$(".case-study-filter-btns-contain .button").on("click", function () {
  let option_value = $(this).attr("filter-target");
  $("#case-study-section").attr("current-selected-option", option_value);
});

$(".custom-dropdown-header").on("click", function () {
  toggleDropdown();
});

$(".custom-dropdown-option").on("click", function (e) {
  toggleDropdown();
  let chosen_item_title = $(this).find("p").text();
  let option_value = $(this).attr("filter-target");
  $("#case-study-section").attr("current-selected-option", option_value);
  $(".custom-dropdown-header p").text(chosen_item_title);
});
function toggleDropdown() {
  let is_open = $(".custom-dropdown").attr("is-open");
  if (is_open === "true") {
    $(".custom-dropdown").attr("is-open", "false");
  } else {
    $(".custom-dropdown").attr("is-open", "true");
  }
}
/////Get random values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Convert color from rgb to hex format
function rgb2hex(rgb) {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgb && rgb.length === 4
    ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : "";
}

///Shuffle list items
function shuffledNumbers(list) {
  list.sort(function () {
    return Math.random() - 0.5;
  });
}

// Convert RGB to RGBA
function convertRGBtoRGBA(rgb, alpha) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// let textarea = document.querySelector("#Message");
// textarea.addEventListener("input", autoResize, false);

// function autoResize() {
//   this.style.height = "auto";
//   let new_height = this.scrollHeight + "px";
//   this.style.height = new_height;

//   $(".text-area-wrapper").css("height", new_height);
// }

window.addEventListener("load", function () {
  $(".particle-section-fixed").toggleClass("is-visible");
  init_particles(15);

  $("#fauxSubmitBtn").click(function (e) {
    e.preventDefault();
    $("#submitBtn").click();
  });
});
let text_area_original_height = $("#Message").css("height");
$("#Message").on("input", function () {
  this.style.height = "auto";
  let is_empty = $(this).val() === "";
  let new_height = this.scrollHeight + "px";
  this.style.height = new_height;

  if (is_empty) {
    new_height = text_area_original_height + "px";
    console.log("original height", text_area_original_height);
    $(".text-area-wrapper").css("height", text_area_original_height);
  } else {
    $(".text-area-wrapper").css("height", new_height);
  }
});
window.addEventListener("load", function () {
  $(".contact-form-field-wrapper").each(function () {
    let triggerElement = $(this);
    let inner_line = triggerElement.find(".contact-form-field-line");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 70%",
        end: "bottom center",
        toggleActions: "play none none none"

        // scrub: 1
        // once: true
      }
    });
    tl.to(inner_line, {
      opacity: 1,
      width: "100%"
    });
  });
  // let animation_fired = false;
  setInterval(() => {
    $(".contact-form-field-wrapper").each(function () {
      let input_field = $(this).find(".contact-form-field");
      let input_field_content = input_field.val();
      let magic_character = $(this).find(".magic-character");
      let inner_line = $(this).find(".contact-form-field-line-inner");
      let touched = $(this).attr("touched");

      if (input_field.is(":focus")) {
        // $(this).val("The document has focus.");
        gsap
          .timeline({
            onComplete: () => {
              $(this).attr("touched", "true");
            }
          })
          .to(magic_character, {
            y: -15,
            duration: 0.3,
            opacity: 0,
            stagger: 0.03
          })
          .to(inner_line, {
            opacity: 1,
            width: "100%"
          });
        console.log("Focused");
      } else if (
        !input_field.is(":focus") &&
        input_field_content === ""
        // animation_fired === false
      ) {
        // $(this).val("The document does NOT have focus.");
        console.log("Not focused");
        if (touched === "true") {
          // animation_fired = true;
          gsap
            .timeline({
              onComplete: () => {
                $(this).attr("touched", "false");
              }
            })
            .to(magic_character, {
              duration: 0.5,
              y: 0,
              opacity: 1,
              stagger: 0.03
            })
            .to(inner_line, {
              opacity: 0,
              width: "15%",
              duration: 0.7
            });
        }
      }
    });
  }, 100);
});

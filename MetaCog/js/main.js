//View Manager for preview pane transitions
var currentIndex = 0,
    items = $('.container div:has(img)'),
    itemAmt = items.length,
    images = [];

$(".sliderImg").each(function(){
	images.push({
		id:"#"+$(this).attr("id"),
		el: $(this)
	});
});

// Add an event to trigger when a image is displayed:
$("#img2").on("imageShow", function(event){
  console.log("Showing image 2");
});

// This var will hold a reference to the current view
var currentView;

$(".sliderImg").detach();

// Define some transitions
  var offLeft = {left: "-100%"};
  var onHorizontal = {left: 0};
  var offRight = {left: "100%"};
  // var offDown = {top: "100%"};
  // var offUp = {top: "-100%"};
  // var onVertical = {top: 0};

  // These combinations create transitions in four directions
  // Slide right: offRight, offLeft, onHorizontal
  // Slide left: offLeft, offRight, onHorizontal
  // Slide down: offDown, offUp, onVertical
  // Slide up: offUp, offDown, onVertical

// Some helper functions to create transitions in four directions
function pushRight(newView) {
  showView(newView, offRight, offLeft, onHorizontal)
}

function pushLeft(newView) {
  showView(newView, offLeft, offRight, onHorizontal)
}

// function pushDown(newView) {
//   showView(newView, offDown, offUp, onVertical);
// }
//
// function pushUp(newView) {
//   showView(newView, offUp, offDown, onVertical);
// }

function showView(newView, exit, start, enter) {
    $(".prevBtn").prop("disabled", true);
    $(".nextBtn").prop("disabled", true);
  // Hide Current View
  if (currentView) {
    currentView.animate(exit, 400, function() {
      $(this).detach();
    });
  }
  // Show New View
  currentView = newView;
  console.log(currentView);
  $(".container").append(newView);
  newView.css(start).animate(enter, 400, function() {
      $(this).trigger("imageShow");
      $(".prevBtn").prop("disabled", false);
      $(".nextBtn").prop("disabled", false);
  });

}

function findImageWithId(id) {
  for (var i in images) {
    if (images[i].id === id) {
      return images[i];
    }
  }
}

$(".container").on("click", ".prevBtn", function(event){

  event.preventDefault();
  console.log("Container > .prevBtn clicked.");
  currentIndex -= 1;
  if (currentIndex < 0) {
      currentIndex = itemAmt - 1;
  }
  pushRight(findImageWithId("#" + items[currentIndex].id).el);
});


// Set up nav links
$(".container").on("click", ".nextBtn", function(event){
  console.log("Container > .nextBtn clicked.");
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
      currentIndex = 0;
  }
  event.preventDefault();
  pushLeft(findImageWithId("#" + items[currentIndex].id).el);
});

//Button position adjustment.
function btnOffset() {
    var slideBtnOffset = ((+(currentView.css("height").slice(0, -2)))/2 + 25) + "px";
    console.log(slideBtnOffset)
    $(".slideBtn").css("top", slideBtnOffset);
    console.log($(".slideBtn").css("top"));
}

// Show the first image

pushLeft(images[0].el);
btnOffset();
$(window).resize(function() {
    btnOffset();
});


// Scrolling activity. Smooth scroll from navigation.
function scrollTo(element) {
    $('html, body').animate({
        scrollTop: $("#" + element).offset().top
    }, 1500);
  }

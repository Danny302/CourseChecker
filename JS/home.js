var term = "0";
var major = "0";
var array;

$('#semester').on('change', function() {
  term = this.value;
})

$('#home_arrow').click(function() {
  major = $('#college_major').find(":selected").val();

  if (term == "0") {
    window.alert("ERROR: Must select a semester!");
    return;
  }
  if (major == "0") {
    window.alert("ERROR: Must select a major!");
    return;
  }

  if (major == "CS") {
    var element = document.getElementById("cs_flow");
    if (element.style.display == "none")
      element.style.display = "block";
  }

  $('html, body').animate({
    scrollTop: $("#cs_flow").offset().top
  }, 1500);
});

window.onload = function start() {
  update();
}

function update() {
  window.setInterval(function() {
    if (term != "0") {
      if (term == "fall") {
        $.get('http://localhost:8080/fall.txt', function(data) {
          var result = data.slice(1, -1);
          array = JSON.parse("[" + result + "]");
        });
      }
      else if (term == "spring") {
        $.get('http://localhost:8080/spring.txt', function(data) {
          var result = data.slice(1, -1);
          array = JSON.parse("[" + result + "]");
        });
      }
      else if (term == "summer") {
        $.get('http://localhost:8080/summer.txt', function(data) {
          var result = data.slice(1, -1);
          array = JSON.parse("[" + result + "]");
        });
      }

      var i = 0;
      while (i < 54) {
        var id = array[i][0];
        var state = array[i][1];
        update_color(id, state);
        i = i + 1;
      }
    }
  }, 5000); //5 seconds
}

function update_color(id, state) {
  if (state == "1") {
    $('.'+id).css({fill: "limegreen"});
    $('.'+id).css({stroke: "limegreen"});
  }
  else {
    $('.'+id).css({fill: "red"});
    $('.'+id).css({stroke: "red"});
  }
}

$(function(){    //document ready

  var output, temp, evaluated, error
  output = temp = ""
  evaluated = error = false
  var $outputScreen = $("#outputScreen")
  var $resultScreen = $("#resultScreen")

  function clickedSign() {
    $button = $(this)
    $button.addClass("clicked")
    setTimeout(function(){$button.removeClass("clicked");}, 100);
  }
  function clear() { output = temp = "" }
  function addBracket(){
    var open = temp.lastIndexOf("(")
    var close = temp.lastIndexOf(")")
    var chosenBracket

    if(open>close){
        chosenBracket = ")"
    }else if(close>open){
        chosenBracket = "("
    }else if(open===close){   //else if no bracket exists yet
        chosenBracket = "("
    };

    output = output + chosenBracket;
    temp = temp + chosenBracket;
  };

  // special callbacks to execute right after evaluated
  $(".buttons").on( "click", function(){
      if (error){
        $resultScreen.text( "" )
        error = false
      };
    })

  $(".numbers, #dot, #bracket").on( "click", function(){
      if (evaluated){
        clear()
        $resultScreen.text( "" )
        evaluated = false
      }
    })

  $(".basic-operators").on( "click", function(){
      if (evaluated){
        output = temp = $resultScreen.text()
        $resultScreen.text( "" )
        evaluated = false
      }
    })

  $("#backspace").on( "click", function(){
      if (evaluated){
        $resultScreen.text( "" )
        evaluated = false
      }
    })

  // main callbacks to execute when a button is pressed
  $(".numbers, #dot").on( "click", function(){
    output = output + ($(this).text());
    temp = temp + ($(this).text());
  });

  $("#add").on( "click", function(){
    output = output + ($(this).text());
    temp = temp + "+";
  });
  $("#substract").on( "click", function(){
    output = output + ($(this).text());
    temp = temp + "-";
  });
  $("#divide").on( "click", function(){
    output = output + ($(this).text());
    temp = temp + "/";
  });
  $("#multiply").on( "click", function(){
    output = output + ($(this).text());
    temp = temp + "*";
  });

  $("#bracket").on( "click", addBracket );

  $("#clear").on( "click", clear );
  $("#backspace").on( "click", function(){
    output = output.slice(0,-1)
    temp = temp.slice(0,-1)
  });

  $("#option").on( "click", function() {
    alert("This option button can be used to switch the calculator layout to scientific calculator")
  });
  
  $("#equal").on( "click", function() {
    try {
      $resultScreen.text( eval(temp) )
      evaluated = true
    }
    catch(err) {
      if (err instanceof SyntaxError || TypeError) {
        $resultScreen.text( "Syntax Error" )
        error = true
      }
    }
  });

  $(".buttons")
    .on( "click", clickedSign )
    .on( "click", function(){
      $outputScreen.text(output)
      //alert to debug temp
      //alert(temp)
    })

});
var thisButton,
    thisSubmenuItem,
    pieMenu = $('.radialnav'),
    menuItems  = $('.menu li'),
    submenuItems = $('.submenu'),
    submenuId = '';

function openMenu (thisButton) {
  if(!thisButton.hasClass('active'))
    thisButton.addClass('active');
  else
    $('.radialnav, .submenu').removeClass('active');
}

var toggleTab = function(x) {
  document.getElementById("tab_1").style.display = "none"
  document.getElementById("tab_2").style.display = "none"
  document.getElementById("tab_3").style.display = "none"
  document.getElementById("tab_4").style.display = "none"
}

/* On click of the ellipsis */
$('.ellipsis').click(function (event) {
  event.preventDefault();
  
  openMenu($('.radialnav'));
});

menuItems.find('a').each(function (index) {
  thisMenuItem = $(this);
  
  thisMenuItem.hover(function () {
    // Hover over
    submenuId = menuItems.eq(index).attr('data-submenu');
    $('.submenu[data-submenuId="'+submenuId+'"]').addClass('active');
  }, function () {
    // Hover out
    // submenuItem.removeClass('active');
  });
});

$("ul li").click(function(e) {

  // make sure we cannot click the slider
  if ($(this).hasClass('slider')) {
    return;
  }

  /* Add the slider movement */

  // what tab was pressed
  var whatTab = $(this).index();

  // Work out how far the slider needs to go
  var howFar = 25 * whatTab;

  $(".slider").css({
    left: howFar + "%"
  });

  /* Add the ripple */

  // Remove olds ones
  $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight = $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple'></span>");

  // Make it round!
  if (buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;

  // Add the ripples CSS and start the animation
  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
});

(function() {

  // detect if IE : from http://stackoverflow.com/a/16657946    
  var ie = (function(){
    var undef,rv = -1; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
      // IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rvNum = ua.indexOf('rv:');
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return ((rv > -1) ? rv : undef);
  }());


  // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179          
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = [32, 37, 38, 39, 40], wheelIter = 0;

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
    e.preventDefault();
    e.returnValue = false;  
  }

  function keydown(e) {
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }

  function touchmove(e) {
    preventDefault(e);
  }

  function wheel(e) {
    // for IE 
    //if( ie ) {
      //preventDefault(e);
    //}
  }

  function disable_scroll() {
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
    document.body.ontouchmove = touchmove;
  }

  function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;  
  }

  var docElem = window.document.documentElement,
    scrollVal,
    isRevealed, 
    noscroll, 
    isAnimating,
    container = document.getElementById( 'container' ),
    trigger = container.querySelector( 'button.trigger' );

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }
  
  function scrollPage() {
    scrollVal = scrollY();
    
    if( noscroll && !ie ) {
      if( scrollVal < 0 ) return false;
      // keep it that way
      window.scrollTo( 0, 0 );
    }

    if( classie.has( container, 'notrans' ) ) {
      classie.remove( container, 'notrans' );
      return false;
    }

    if( isAnimating ) {
      return false;
    }
    
    if( scrollVal <= 0 && isRevealed ) {
      toggle(0);
    }
    else if( scrollVal > 0 && !isRevealed ){
      toggle(1);
    }
  }

  function toggle( reveal ) {
    isAnimating = true;
    
    if( reveal ) {
      classie.add( container, 'modify' );
    }
    else {
      noscroll = true;
      disable_scroll();
      classie.remove( container, 'modify' );
    }

    // simulating the end of the transition:
    setTimeout( function() {
      isRevealed = !isRevealed;
      isAnimating = false;
      if( reveal ) {
        noscroll = false;
        enable_scroll();
      }
    }, 600 );
  }

  // refreshing the page...
  var pageScroll = scrollY();
  noscroll = pageScroll === 0;
  
  disable_scroll();
  
  if( pageScroll ) {
    isRevealed = true;
    classie.add( container, 'notrans' );
    classie.add( container, 'modify' );
  }
  
  window.addEventListener( 'scroll', scrollPage );
  trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
})();
ngModal
=======

A jQuery Modal Box plugin inspired by leanModal that puts animation under developer control + extras

Features
--------
* animate overlay and modal any way you want using jQuery's animation effects
* free of css markup, except for preset overlay if you dont want to specify in stylesheet or use $.css()
* scrollable
* draggable
* close modal by clicking overlay or escape key
* possible to nest modals, however overlay works on z-index so you have to set yourself
* every param is changeable expect hardcoded presets
* hardcoded presets allow similar usage to leanModal

How To Use - read source if confused
----------

Example 1 - the simplest usage.

```
<style>
  #modal_box {
    padding:20px;
    display:none;
    background:#FFF;
    border-radius:5px;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    box-shadow:0px 0px 4px rgba(0,0,0,0.7);
    -webkit-box-shadow:0 0 4px rgba(0,0,0,0.7);
    -moz-box-shadow:0 0px 4px rgba(0,0,0,0.7);
  }
</style>

<script>
  $("#modal_trigger").ngModal( { 'close_button': '.modal_close' } );
</script>
```


Example 2 - The below example shows how to use callback functions in passed params to use jQuery functions for animation.
* you have a hidden modal box with an id of 'modal_box'. Must be an id.
* you have an element with .class|#id that will trigger modal box to show, will use a class of 'modal_trigger'.
  it needs to contain a 'rel' attribute that contains the #id of the modal box that this trigger opens, eg:
    ```<div id="modal_trigger" rel="#modal_box">Open Modal</div>```
* you have an element to close modal box, will use a class of 'modal_close'

```
<style>
  #modal_box {
    padding:20px;
    display:none;
    background:#FFF;
    border-radius:5px;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    box-shadow:0px 0px 4px rgba(0,0,0,0.7);
    -webkit-box-shadow:0 0 4px rgba(0,0,0,0.7);
    -moz-box-shadow:0 0px 4px rgba(0,0,0,0.7);
  }
</style>

<script>
var options = {
  'close_button': '.modal_close',
  'draggable':true, // default, doesnt need to be passed
  'scrollable': true, // default, doesnt need to be passed
  'overlay_preset_css': true, // we will use hardcode css properties this time
  'animate_open': function( modal_id ) // animate modal into view, be sure to 'unhide' element first before animation
  {
    $( modal_id )
      .css({
        'display': 'block',
        'position': 'fixed',
        'opacity': 0,
        'z-index': 11000,
        'left': '50%',
        'top': ($( window ).height() / 2) + 'px'
      })
      .animate({
        'width': '300px',
        'height': '400px',
        'top': '-=' + (400 / 2) + 'px',
        'left': '-=' + (300 / 2) + 'px',
        'opacity': 1
      }, 750, function()
      {
        // function to run when animation has completely finished
      });
  },
  'animate_close': function( modal_id ) // animate modal close
  {
    $( modal_id ).animate({
      'width': '50px',
      'height': '50px',
      'top': '+=' + (400 / 2) + 'px',
      'left': '+=' + (300 / 2) + 'px',
      'opacity': 0
    }, 1000);
  }
};
$("#modal_trigger").ngModal( options );
</script>
```

Below are the available options

```
var options = {
'modal_fadein': 400, // fadeTo duration when no animation passed
'modal_fadeout': 750, // fadeOut duration if no animation passed
'modal_attr': 'rel', // what attribute holds modal box id
'scrollable': false, // disable mousewheel only, arrow keys and scrollbar still functional
'draggable': true,
'close_button': '', // any valid jquery selector value
'esc_key_close': true, // if escape key closes modal box
'animate_open': null,  // callback function to animate from animate_init to animate_open. if not passed a preset fade is used. modal_id passed as param
'animate_close': null, // callback function to animate from animate_open to animate_close. if not passed a preset fade is used. modal_id passed as param
'overlay_enabled': true,
'overlay_id': 'ngModal_overlay',
'overlay_close_on_click': true,
'overlay_opacity': 0.6,
'overlay_fadein': 350, // fadeTo duration when no animation passed
'overlay_fadeout': 750, // fadeOut duration when no animation passed
'overlay_preset_css': null, // pass true to use hardcoded css properties, or an object of css properties. otherwise you must use a stylesheet
'overlay_animate_open': null, // callback function to animate overlay into view. if not passed a preset fade is used. overlay_id passed as param
'overlay_animate_close': null // callback function to animate overlay out of view. if not passed a preset fade is used. overlay_id passed as param
}
```

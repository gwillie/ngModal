/*******************************************************************************
 * ngModal - a lightweight jQuery plugin for modal box with overlay inspired by leanModal
 * @version 0.1
 * @author gwillie
 * @requires jQuery > v1.0. Change jQuery version for new animate() params
 * license: GPLv2
 * 
 ******************************************************************************/

(function ($)
{
  $.fn.extend({
    ngModal: function ( options )
    {
      var preset_css_overlay = {
        'position': 'fixed',
        'background': '#000',
        'z-index': 99,
        'top': '0px',
        'left': '0px',
        'height':'100%',
        'width':'100%',
        'display': 'none'
      };
      var defaults = {
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
      };

      var $document = $( document ), $body = $( 'body' );
      var o = $.extend( defaults, options );

      if( !document.getElementById( o.overlay_id ))
        $body.append('<div id="' + o.overlay_id + '"></div>');
      
      var $overlay = $( '#' + o.overlay_id );
      var modal_id = $(this).attr( o.modal_attr );
      var $modal = $( modal_id );

      if( o.overlay_preset_css === true ){
        // apply hardcoded styles to overlay
        $overlay.css( preset_css_overlay );
      } else if( o.overlay_preset_css !== null ) {
        // apply passed overlay style
        $overlay.css( o.overlay_preset_css );
      }

      function disable_mouse_scroll( e )
      {
        return false;
      }

      function esc_keyup_close_modal( e )
      {
        if ( e.keyCode === 27 )
          close_modal( e.data.modal_id );
      }

      function close_modal( modal_id )
      {
        if( o.overlay_enabled ){
          if( typeof o.overlay_animate_close === 'function' ){
            // use param passed animation
            o.overlay_animate_close( '#' + o.overlay_id );
          } else {
            $overlay.fadeOut( o.overlay_fadeout );
          }
        }

        if( typeof o.animate_close === 'function' ){
          // use param passed animation
          o.animate_close( modal_id );
        } else {
          $( modal_id ).fadeOut( o.modal_fadeout );
        }
        
        if( o.esc_key_close )
          $document.off( 'keyup', esc_keyup_close_modal );

        if( !o.scrollable )
          $body.off( 'DOMMouseScroll mousewheel scroll', disable_mouse_scroll );
      }

      /***********************************************************************
       * 
       * apply ngModal
       * 
       **********************************************************************/
      return this.each( function()
      {
        $(this).click(function (e)
        {
          // modal box close on esc keyup
          if( o.esc_key_close )
            $document.bind( 'keyup', { modal_id: modal_id }, esc_keyup_close_modal );

          // modal box close button
          if( o.close_button !== '' )
            $( o.close_button ).one( 'click', function()
            {
              close_modal( modal_id );
            });

          // if overlay enabled animate into view
          if( o.overlay_enabled ) {
            if( typeof o.overlay_animate_open === 'function' ){
              // use param passed animation
              o.overlay_animate_open( '#' + o.overlay_id );
            } else {
              $overlay.fadeTo( o.overlay_fadein, o.overlay_opacity );
            }
            // close modal box on overlay click
            if( o.overlay_close_on_click ) {
              $overlay.one( 'click', function()
              {
                close_modal( modal_id );
              });
            }
          }

          // animate modal box into view
          if( typeof o.animate_open === 'function' ){
            // use param passed animation
            o.animate_open( modal_id );
          } else {
            $modal
              .css({
                'display': 'block',
                'position': 'fixed',
                'opacity': 0,
                'z-index': 10000,
                'left': '50%',
                'top': '50%'
              })
              .fadeTo( o.modal_fadein, 1 );
          }
          
          if( o.draggable )
            $modal.draggable();

          if( !o.scrollable )
            $body.on( 'DOMMouseScroll mousewheel scroll', disable_mouse_scroll );
          
          e.preventDefault();
        });
      });
    }
  });
})(jQuery);

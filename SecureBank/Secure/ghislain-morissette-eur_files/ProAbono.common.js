/*------------------------------------------------------*/
/*--------- URL STUFF ----------------------------------*/
/*------------------------------------------------------*/
function urlGetParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", 'i'),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function sanitize(input) {
    return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '\'');
}

/*------------------------------------------------------*/
/*--------- NOTIFICATION -------------------------------*/
/*------------------------------------------------------*/

function notify(message, title) {

    var modal = '<div class="modal-veil"><div class="modal"><div class="modal-title"><span class="modal-close">&times;</span>';
    if(title)
        modal += '<h2>' + title + '</h2>';
    modal += '</div><div class="modal-body">' + message + '</div><div class="modal-footer"></div></div></div>';

    var $modal = $(modal);
    $modal.prependTo(document.body);

    $('.modal-veil, .modal-close').on('click', function () {
        $modal.remove();
    });
    $('.modal').on('click', function (event) {
        event.stopPropagation();
    });
}

/*------------------------------------------------------*/
/*--------- ERROR HANDLING -----------------------------*/
/*------------------------------------------------------*/
var errorResponse = function ($form, target, xhr, message, title) {
  // if no message
  if (message === null) {
    // if json
    if (xhr
        && xhr.getResponseHeader("Content-Type").indexOf('application/json') === 0) {
      try {
        // get contained message (if any)
        var data = xhr.responseJSON;
        if (data)
          message = data.Message
      }
      catch (e) {
        console.log(e);
      }
    }
  }
  // popup a message
  notify(message || "An error occured", title);
  $(target).html(message || "An error occured");
};

/*------------------------------------------------------*/
/*--------- TOOLS - EXPANDER ---------------------------*/
/*------------------------------------------------------*/
(function ($) {

    $.fn.expander = function (options) {

        var settings = $.extend({
            next: null,
            scroll: false
        }, options);

        return this.each(function () {

            var $element = $(this);
            $element.on('click', function (event) {
                event.preventDefault();
                $element.attr('disabled', 'disabled');

                var next = $(settings.next || $element.attr('ajax-next'));
                if (next.is(":visible")) {
                    next.slideUp();
                    $element.removeClass('opened');
                }
                else {
                    next.slideDown();
                    $element.addClass('opened');

                    if (settings.scroll) {
                        $('html,body').animate({
                            scrollTop: next.offset().top
                        }, 1000);
                    }
                }
                $element.removeAttr('disabled');
                return false;
            });
        });
    };
})(jQuery);

/*------------------------------------------------------*/
/*--------- TOOLS - PREVENT NAVIGATION -----------------*/
/*------------------------------------------------------*/
function askForConfirmation() {
    return "the page is busy, are you sure you want to do this ?";
}
function preventNavigation(enable) {
    if (enable)
        $(window).on('beforeunload', askForConfirmation);
    else
        $(window).off('beforeunload', askForConfirmation)
}

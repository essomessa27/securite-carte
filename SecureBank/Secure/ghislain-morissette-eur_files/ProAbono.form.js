(function ($) {
    /*------------------------------------------------------*/
    /*--------- SELECT COUNTRY -----------------------------*/
    /*------------------------------------------------------*/
    $.fn.fillWithCountries = function (countryFallback, countryCode, regionCode) {
        return this.each(function () {
            var element = $(this);

            element.on('change', function () {
                $('select.ajax-region').fillWithRegions(element.val(), regionCode);
            });

            $.ajax
            ({
                url: element.attr('ultra-url-load'),
                dataType: 'json',
                success: function (data, status, xhr) {

                  if ((xhr.status >= 200)
                      && (xhr.status < 300)) {

                    var options = '';
                    $.each(data, function () {
                      options += '<option value="' + this.CodeIsoAlpha2 + '">' + this.Name + '</option>';
                    });
                    element.append(options);

                    // if we have a given country
                    if (countryCode
                        && (countryCode !== '')) {
                      element.val(countryCode).change();
                      element.find('option[value=""]').remove();
                    }
                    // if no given country
                    else {
                      // if we have a fallback country
                      if (countryFallback
                          && (countryFallback !== '')) {
                        element.val(countryFallback).change();
                        element.find('option[value=""]').remove();
                      }
                      // get country
                      $.getJSON('/Tools/Country', function (data) {
                        if (data && data.Country) {
                          element.val(data.Country).change();
                          element.find('option[value=""]').remove();
                        }
                      });
                    }
                  }
                },
                error: function (xhr, type, message) {
                    console.log(type);
                    if (message) console.log(message);
                    else console.log(xhr);
                }
            });
        });
    };

    /*------------------------------------------------------*/
    /*--------- SELECT REGION -----------------------------*/
    /*------------------------------------------------------*/
    $.fn.fillWithRegions = function (countryCode, regionCode) {
      return this.each(function () {
        var $element = $(this);

        // get the country code
        $element.parent().find('input[name="IdCountry"]').val(countryCode);
        // get the related label
        var $label = $('label[for=' + $element.attr('id') + ']');
        $.ajax
        ({
          url: $element.attr('ultra-url-load'),
          dataType: 'json',
          data: { country: countryCode },
          success: function (data, status, xhr) {
            // if none
            if (xhr.status === 204) {
              $label.hide();
              $element.hide();
            }
            else if ((xhr.status >= 200)
                && (xhr.status < 300)) {
              $label.show();
              $element.show();
              $.each(data, function () {
                $element.append($("<option />").val(this.CodeIso).text(this.Name + '  (' + this.CodeIso + ')'));
              });

              if (regionCode)
                $element.val(regionCode);
              else
                $element.val('');
            }
          },
          error: function (xhr, type, message) {
            console.log(type);
            if (message) console.log(message);
            else console.log(xhr);
          }
        });
      });
    };

    /*------------------------------------------------------*/
    /*--------- FORM AJAX -----------------------------------*/
    /*------------------------------------------------------ */
    $.fn.formPostAjax = function (options) {
      var enable = function ($form) {
        $form.find('input, select').removeAttr('readonly');
        $form.find('button').removeAttr('disabled');
      };
      var disable = function ($form) {
        $form.find('input, select').attr('readonly', 'readonly');
        $form.find('button').attr('disabled', 'disabled');
      };
      var onGatherData = function ($form) {
        return $form.serialize();
      };
      var onPostSuccess = function ($form, data, ui) {
        // if redirection
        if (data && data.UrlRedirection)
          window.location.href = data.UrlRedirection;
          // if anything else
        else {
          ui.removeClass('ajax-saving');
          ui.addClass('ajax-saving-ok');
          setTimeout(function () {
            ui.removeClass('ajax-saving-ok');
          }, 2000);
        }
        return true;
      };
      var tryToHighlight = function ($form, target) {
        // if it has a target
        if (target) {
          // get the target input
          var $target = $form.find('input[name="' + target + '"]');
          // highlight it instead of displaying a message
          $target.addClass('ajax-saving-nok');
        }
      };
      var onPostError = function ($form, target, xhr, type, messageDefault) {
        // if json
        if (xhr.getResponseHeader("Content-Type").indexOf('application/json') === 0) {
          try {
            var data = xhr.responseJSON;
            if (data) {
              var message = '';
              if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                  var item = data[i];
                  // if it has a message
                  if (item.Message) {
                    if (message.length === 0)
                      message = '<ul>';
                    message += '<li>' + sanitize(item.Message) + '</li>';
                  }
                  tryToHighlight($form, item.Target);
                }
                if (message.length > 0)
                  message += '</ul>';
              }
                // if it's not an array, get a message anyway
              else {
                message = (data.Message || data);
                tryToHighlight($form, data.Target);
              }

              if (message.length > 0)
                settings.onServerError($form, target, xhr, message, (data.Title || ''));
            }
          }
          catch (e) {
            settings.onServerError($form, target, xhr, e);
          }
        }
          // if no json
        else
          settings.onServerError($form, target, xhr, (messageDefault || type || 'unspecified'));
      };

      var settings = $.extend({
        onError: onPostError,
        onServerError: errorResponse,
        onSuccess: onPostSuccess,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        focusOn: null,
        dataType: 'json',
        gatherData: onGatherData,
        targetError: null
      }, options);

      var processing = false;

      return this.each(function () {
        var $form = $(this);

        $form.on('submit', function (event) {

          // prevent default behavior (form submit, etc.)
          event.preventDefault();

          // ensure single processing
          if (!processing) {
            processing = true;

            var allOk = true;
            // check inputs
            $inputs = $form.find('input.required').each(function () {
              $input = $(this);
              var value = $input.val();
              if (!value
                  || (value.trim().length === 0)) {
                allOk = false;
                $input.addClass('ajax-saving-nok');
              }
              else {
                $input.removeClass('ajax-saving-nok');
              }
            });

            // if all ok
            if (allOk) {

              // disable the form
              disable($form);
              // get all buttons
              var $buttons = $form.find('button, .button');
              // get clicked button
              var $clicked = $form.find('button.submit');
              if ($clicked.length !== 1)
                $clicked = $form.find(':focus');
              
              $clicked.removeClass('ajax-saving-ok');
              $clicked.addClass("ajax-saving");
              $buttons.attr('disabled', 'disabled');
              // remove the class 'ajax-saving-nok' from all inputs (just in case)
              $form.find('input').removeClass('ajax-saving-nok');

              // prevent navigation temporarily
              preventNavigation(true);

              $.ajax({
                url: settings.url || $form.attr('action'),
                type: settings.method || $form.attr('method'),
                contentType: settings.contentType,
                dataType: settings.dataType,
                data: settings.gatherData($form),
                beforeSend: function (xhr) { xhr.setRequestHeader('X-Partial-View', 'True') },
                success: function (data, status, xhr) {
                  // re-allow navigation
                  preventNavigation(false);
                  // if succeeded
                  if ((xhr.status >= 200)
                      && (xhr.status < 300)) {
                    // set the focus
                    if (settings.focusOn !== null) {
                      var offset = $(settings.focusOn).offset();
                      if (offset) {
                        $('html,body').animate({
                          scrollTop: offset.top
                        }, 1000);
                      }
                    }
                    // process
                    processing = settings.onSuccess($form, data, $clicked);
                  }
                    // if 302
                  else if (xhr.status === 302) {
                    // if we have a redirection
                    var urlRedirect = xhr.getResponseHeader("Location");
                    if (urlRedirect)
                      window.location.href = urlRedirect;
                  }
                    // if failed
                  else {
                    $clicked.removeClass('ajax-saving');
                    $buttons.removeAttr('disabled');
                    settings.onError($form, $clicked, xhr, 'failure');
                    enable($form);
                    processing = false;
                  }
                },
                error: function (xhr, type, delta, gamma) {
                  // re-allow navigation
                  preventNavigation(false);
                  $clicked.removeClass('ajax-saving');
                  $buttons.removeAttr('disabled');
                  settings.onError($form, settings.targetError, xhr, type);
                  enable($form);
                  processing = false;
                }
              });
            }
              // if a required field is missing
            else
              processing = false;
          }
          return false;
        });
      });
    };

    /*------------------------------------------------------*/
    /*--------- AJAX PARTIAL VIEW --------------------------*/
    /*------------------------------------------------------*/

    $.fn.partialViewAjax = function (options) {

        var onServerError = function ($element, target, xhr) {
            $element.replaceWith('<h2>[...]</h2>');
        };
        var onPostSuccess = function ($element, data) {
            var $replacement = $(data);
            $element.replaceWith($replacement);
            initElements($replacement);
        };

        var settings = $.extend({
            onError: onServerError,
            onSuccess: onPostSuccess
        }, options);

        return this.each(function () {

            var $element = $(this);

            // if any url
            var url = $element.attr('ultra-url-load');
            if (url) {
                // ajax call
                $.ajax
                ({
                    dataType: 'html',
                    url: url,
                    beforeSend: function (xhr) { xhr.setRequestHeader('X-Partial-View', 'True') },
                    success: function (data, status, xhr) {
                        settings.onSuccess($element, data);
                    },
                    error: function (xhr, type) {
                        settings.onError($element, $element, xhr);
                    }
                });
            }
        });
    };

    /*------------------------------------------------------*/
    /*--------- TEXT BOX NO SUBMIT --------------------*/
    /*------------------------------------------------------*/

    $.fn.enterNoSubmit = function (options) {

        var settings = $.extend({
            next: null
        }, options);

        return this.each(function () {

            nextInput = function ($element) {
                if (settings.next === null) {
                    if ($element) {
                        var next = $element.next();
                        if (next.length > 0) {
                            if (!next.is('input')) {
                                next = next.find('input').first();
                            }
                        }
                        else {
                            next = nextInput($element.parent());
                        }
                    }
                }
                else
                    next = $(settings.next);
                return next;
            };

            var element = $(this);
            element.on('keydown', function (event) {
                if (event.which === 13) {
                    var next = nextInput(element);
                    if (next) {
                        next.focus();
                    }

                    event.preventDefault();
                }
            });
        });
    };

    /*------------------------------------------------------*/
    /*--------- UPDOWN ------------------------------------ */
    /*------------------------------------------------------*/

    $.fn.updown = function (options) {

        var onClick = function (event, $input) {
            $input.trigger('change');
        };

        var settings = $.extend({
            onClick: onClick
        }, options);


        var closestUp = function (val, data) {
            if (data) {
                var values = data.values;
                // find the closest in the array
                var i = 0;
                while ((i < values.length)
                        && (values[i] <= val)) {
                    i++;
                }

                // if found
                if (i < values.length)
                    // update
                    return values[i];
                    // if not found
                else if (data.maxIncr)
                    return (val + data.maxIncr);
                else
                    return values[values.length - 1];
            }
        };

        var closestDown = function (val, data) {
            if (data) {
                var values = data.values;
                // find the higher in the array
                var i = (values.length - 1);
                // if higher that the highest
                if (val > values[i]) {
                    if (data.maxIncr) {
                        if ((val - data.maxIncr) > values[0])
                            return (val - data.maxIncr);
                        else
                            return values[0]
                    }
                    else if (i > 0)
                        return values[i - 1];
                    else
                        return values[0]
                }
                else {
                    while ((i >= 0)
                                && (values[i] >= val)) {
                        i--;
                    }

                    // if found
                    if (i >= 0)
                        // update
                        return values[i];
                        // if not found
                    else if (val <= data.min)
                        return data.min;
                    else
                        return data.min;
                }
            }
        };

        return this.each(function () {

            var $element = $(this);

            // initialize
            var $input = $element.find('.updown-input');
            $input.attr('prev', $input.val());

            $input.on('blur', function (event) {
                event.preventDefault();
                var $input = $(this);
                var before = $input.attr('prev');
                var after = parseInt($input.val());
                // if changed
                if (after !== before) {
                    $input.val(after);
                    if (settings.onClick)
                        settings.onClick(event, $input);
                }
                return null;
            });

            $element.find('button.updown-button-plus').on('click', function (event) {
                event.preventDefault();
                var $input = $($(this).attr('for'));
                var data = window["data_updown_" + $input.attr('id')];
                var before = parseInt($input.val());
                var after = closestUp(before, data);
                // if changed
                if (after !== before) {
                    $input.attr('prev', after);
                    $input.val(after);
                    if (settings.onClick)
                        settings.onClick(event, $input);
                }
                return null;
            });

            $element.find('button.updown-button-minus').on('click', function (event) {
                event.preventDefault();
                var $input = $($(this).attr('for'));
                var data = window["data_updown_" + $input.attr('id')];
                var before = parseInt($input.val());
                var after = closestDown(before, data);
                // if changed
                if (after !== before) {
                    $input.attr('prev', after);
                    $input.val(after);
                    if (settings.onClick)
                        settings.onClick(event, $input);
                }
                return null;
            });
        });
    };
    
    /*------------------------------------------------------*/
    /*--------- FORM-POST-PERMISSION ---------------------- */
    /*------------------------------------------------------*/

    $.fn.formPostPermission = function (options) {
        var settings = $.extend({
            // feedback errors container (element selector)
            targetError: '#form-permission-error',
            // error default redirection (relative url)
            urlFailure: '/error/generic',

            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',

        }, options);
        
        return this.each(function () {

          var $element = $(this);
          $element.formPostAjax({

            contentType: settings.contentType,
            dataType: settings.dataType,
            targetError: settings.targetError,

            onSuccess: function ($form, data) {
              if (data) {
                if (data.UrlRedirection)
                  window.location.href = data.UrlRedirection;
                else {
                  $container = $form.parent();
                  $container.slideUp({
                    complete: function () {
                      $container.empty();
                      $container.html(data);
                      $container.slideDown();
                      initElements($container);
                    }
                  });
                }
              }
              return false;
            },
            onServerError: function ($form, target, xhr, message, title) {
              // if restricted
              var data = xhr.responseJSON;
              if (data && data.Code == 'Error.Customer.IsGreyListed')
                // clear the form
                $('form.form-post-permission').remove();

              errorResponse($form, target, xhr, message, title);
            }
          });

        });
    };


    /*------------------------------------------------------*/
    /*--------- GET-AND-APPEND --------------------*/
    /*------------------------------------------------------*/

    $.fn.getAndAppend = function (url, refreshButton) {

        return this.each(function () {

          if (url) {
                var $element = $(this);
                // ajax call
                $.ajax
                ({
                    dataType: 'html',
                    url: url,
                    beforeSend: function (xhr) { xhr.setRequestHeader('X-Partial-View', 'True'); },
                    success: function (data, status, xhr) {
                        $element.slideUp({
                            complete: function () {
                                $element.empty();
                                if (refreshButton)
                                    $element.append(templateButtonRefresh);
                                $element.append(data);
                                $element.slideDown();
                                initElements($element);
                            }
                        });
                    },
                    error: function (xhr, type, message) {
                        $element.append('<h3>' + message + '</h3>');
                        console.log(type);
                    }
                });
            }
        });
    };
    $.fn.postAndAppend = function (url, refreshButton) {

        return this.each(function () {

            if (url) {
                var $element = $(this);
                // ajax call
                $.ajax
                ({
                    dataType: 'html',
                    method: 'post',
                    url: url,
                    beforeSend: function (xhr) { xhr.setRequestHeader('X-Partial-View', 'True'); },
                    success: function (data, status, xhr) {
                        $element.slideUp({
                            complete: function () {
                                $element.empty();
                                if (refreshButton)
                                    $element.append(templateButtonRefresh);
                                $element.append(data);
                                $element.slideDown();
                                initElements($element);
                            }
                        });
                    },
                    error: function (xhr, type, message) {
                        $element.append('<h3>' + message + '</h3>');
                        console.log(type);
                    }
                });
            }
        });
    };

    $.fn.appendSlide = function ($data) {

      return this.each(function () {

        $element = $(this);
        $element.append($data);
        initElements($element);

        $('html,body').animate({
          scrollTop: $data.offset().top
        }, 1000);
      });
    };

    $.fn.magicLabel = function () {

      // check if given element has data and update the label accordingly
      var checkIfData = function ($element, $label) {
        if ($element.val())
          $label.removeClass('no-data');
        else
          $label.addClass('no-data');
      };

      // initialize
      return this.each(function () {
        var $label = $(this);
        var $element = $('#' + $label.attr('for'));
        // if any
        if ($element) {
          // if text
          if ($element.is('input[type=text]')) {
            checkIfData($element, $label);
            $element.on('change', function () {
              checkIfData($element, $label);
            });
          }
          $element.on('focus', function () {
            $label.addClass('focused');
          });
          $element.on('blur', function () {
            $label.removeClass('focused');
          });
        }
      });
    };

    $.fn.checkForCompany = function () {
      
      // initialize
      return this.each(function () {
        var $form = $(this);
        var $tax = $form.find('[name="TaxInformation"]');
        $tax.on('change', function (e) {
          var $company = $form.find('[name="Company"]');
          if (e.target.value !== '')
            $company.addClass('required');
          else
            $company.removeClass('required');
        });
      });
    };

})(jQuery);

/*-------------------------------------------------*/
/*--------- FORM INIT -----------------------------*/
/*-------------------------------------------------*/

var initElements = function ($target) {
  if ($target) {
    $target.find('label[for]').magicLabel();
    $target.find('.form-address').checkForCompany();
  }
  else {
    $('label[for]').magicLabel();
    $('.form-address').checkForCompany();
  }
};

$(document).ready(function () {
  initElements();
});

function loadScript(url, callback) {

    var script = document.createElement( "script" );
    script.type = "text/javascript";
    if(script.readyState) {  //IE
        script.onreadystatechange = function() {
            if ( script.readyState === "loaded" || script.readyState === "complete" ) {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function() {
            callback();
        };
    }

    script.src = url;
    $( "head" )[0].appendChild( script );
}
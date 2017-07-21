webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	module.exports = __webpack_require__(12);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
	 * Bootstrap v3.3.7 (http://getbootstrap.com)
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under the MIT license
	 */
	
	if (typeof jQuery === 'undefined') {
	  throw new Error('Bootstrap\'s JavaScript requires jQuery')
	}
	
	+function ($) {
	  'use strict';
	  var version = $.fn.jquery.split(' ')[0].split('.')
	  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
	    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
	  }
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: transition.js v3.3.7
	 * http://getbootstrap.com/javascript/#transitions
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	  // ============================================================
	
	  function transitionEnd() {
	    var el = document.createElement('bootstrap')
	
	    var transEndEventNames = {
	      WebkitTransition : 'webkitTransitionEnd',
	      MozTransition    : 'transitionend',
	      OTransition      : 'oTransitionEnd otransitionend',
	      transition       : 'transitionend'
	    }
	
	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return { end: transEndEventNames[name] }
	      }
	    }
	
	    return false // explicit for ie8 (  ._.)
	  }
	
	  // http://blog.alexmaccaw.com/css-transitions
	  $.fn.emulateTransitionEnd = function (duration) {
	    var called = false
	    var $el = this
	    $(this).one('bsTransitionEnd', function () { called = true })
	    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
	    setTimeout(callback, duration)
	    return this
	  }
	
	  $(function () {
	    $.support.transition = transitionEnd()
	
	    if (!$.support.transition) return
	
	    $.event.special.bsTransitionEnd = {
	      bindType: $.support.transition.end,
	      delegateType: $.support.transition.end,
	      handle: function (e) {
	        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
	      }
	    }
	  })
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: alert.js v3.3.7
	 * http://getbootstrap.com/javascript/#alerts
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // ALERT CLASS DEFINITION
	  // ======================
	
	  var dismiss = '[data-dismiss="alert"]'
	  var Alert   = function (el) {
	    $(el).on('click', dismiss, this.close)
	  }
	
	  Alert.VERSION = '3.3.7'
	
	  Alert.TRANSITION_DURATION = 150
	
	  Alert.prototype.close = function (e) {
	    var $this    = $(this)
	    var selector = $this.attr('data-target')
	
	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }
	
	    var $parent = $(selector === '#' ? [] : selector)
	
	    if (e) e.preventDefault()
	
	    if (!$parent.length) {
	      $parent = $this.closest('.alert')
	    }
	
	    $parent.trigger(e = $.Event('close.bs.alert'))
	
	    if (e.isDefaultPrevented()) return
	
	    $parent.removeClass('in')
	
	    function removeElement() {
	      // detach from parent, fire event then clean up data
	      $parent.detach().trigger('closed.bs.alert').remove()
	    }
	
	    $.support.transition && $parent.hasClass('fade') ?
	      $parent
	        .one('bsTransitionEnd', removeElement)
	        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
	      removeElement()
	  }
	
	
	  // ALERT PLUGIN DEFINITION
	  // =======================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.alert')
	
	      if (!data) $this.data('bs.alert', (data = new Alert(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }
	
	  var old = $.fn.alert
	
	  $.fn.alert             = Plugin
	  $.fn.alert.Constructor = Alert
	
	
	  // ALERT NO CONFLICT
	  // =================
	
	  $.fn.alert.noConflict = function () {
	    $.fn.alert = old
	    return this
	  }
	
	
	  // ALERT DATA-API
	  // ==============
	
	  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: button.js v3.3.7
	 * http://getbootstrap.com/javascript/#buttons
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // BUTTON PUBLIC CLASS DEFINITION
	  // ==============================
	
	  var Button = function (element, options) {
	    this.$element  = $(element)
	    this.options   = $.extend({}, Button.DEFAULTS, options)
	    this.isLoading = false
	  }
	
	  Button.VERSION  = '3.3.7'
	
	  Button.DEFAULTS = {
	    loadingText: 'loading...'
	  }
	
	  Button.prototype.setState = function (state) {
	    var d    = 'disabled'
	    var $el  = this.$element
	    var val  = $el.is('input') ? 'val' : 'html'
	    var data = $el.data()
	
	    state += 'Text'
	
	    if (data.resetText == null) $el.data('resetText', $el[val]())
	
	    // push to event loop to allow forms to submit
	    setTimeout($.proxy(function () {
	      $el[val](data[state] == null ? this.options[state] : data[state])
	
	      if (state == 'loadingText') {
	        this.isLoading = true
	        $el.addClass(d).attr(d, d).prop(d, true)
	      } else if (this.isLoading) {
	        this.isLoading = false
	        $el.removeClass(d).removeAttr(d).prop(d, false)
	      }
	    }, this), 0)
	  }
	
	  Button.prototype.toggle = function () {
	    var changed = true
	    var $parent = this.$element.closest('[data-toggle="buttons"]')
	
	    if ($parent.length) {
	      var $input = this.$element.find('input')
	      if ($input.prop('type') == 'radio') {
	        if ($input.prop('checked')) changed = false
	        $parent.find('.active').removeClass('active')
	        this.$element.addClass('active')
	      } else if ($input.prop('type') == 'checkbox') {
	        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
	        this.$element.toggleClass('active')
	      }
	      $input.prop('checked', this.$element.hasClass('active'))
	      if (changed) $input.trigger('change')
	    } else {
	      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
	      this.$element.toggleClass('active')
	    }
	  }
	
	
	  // BUTTON PLUGIN DEFINITION
	  // ========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.button')
	      var options = typeof option == 'object' && option
	
	      if (!data) $this.data('bs.button', (data = new Button(this, options)))
	
	      if (option == 'toggle') data.toggle()
	      else if (option) data.setState(option)
	    })
	  }
	
	  var old = $.fn.button
	
	  $.fn.button             = Plugin
	  $.fn.button.Constructor = Button
	
	
	  // BUTTON NO CONFLICT
	  // ==================
	
	  $.fn.button.noConflict = function () {
	    $.fn.button = old
	    return this
	  }
	
	
	  // BUTTON DATA-API
	  // ===============
	
	  $(document)
	    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      var $btn = $(e.target).closest('.btn')
	      Plugin.call($btn, 'toggle')
	      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
	        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
	        e.preventDefault()
	        // The target component still receive the focus
	        if ($btn.is('input,button')) $btn.trigger('focus')
	        else $btn.find('input:visible,button:visible').first().trigger('focus')
	      }
	    })
	    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
	    })
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: carousel.js v3.3.7
	 * http://getbootstrap.com/javascript/#carousel
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // CAROUSEL CLASS DEFINITION
	  // =========================
	
	  var Carousel = function (element, options) {
	    this.$element    = $(element)
	    this.$indicators = this.$element.find('.carousel-indicators')
	    this.options     = options
	    this.paused      = null
	    this.sliding     = null
	    this.interval    = null
	    this.$active     = null
	    this.$items      = null
	
	    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))
	
	    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
	      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
	      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
	  }
	
	  Carousel.VERSION  = '3.3.7'
	
	  Carousel.TRANSITION_DURATION = 600
	
	  Carousel.DEFAULTS = {
	    interval: 5000,
	    pause: 'hover',
	    wrap: true,
	    keyboard: true
	  }
	
	  Carousel.prototype.keydown = function (e) {
	    if (/input|textarea/i.test(e.target.tagName)) return
	    switch (e.which) {
	      case 37: this.prev(); break
	      case 39: this.next(); break
	      default: return
	    }
	
	    e.preventDefault()
	  }
	
	  Carousel.prototype.cycle = function (e) {
	    e || (this.paused = false)
	
	    this.interval && clearInterval(this.interval)
	
	    this.options.interval
	      && !this.paused
	      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
	
	    return this
	  }
	
	  Carousel.prototype.getItemIndex = function (item) {
	    this.$items = item.parent().children('.item')
	    return this.$items.index(item || this.$active)
	  }
	
	  Carousel.prototype.getItemForDirection = function (direction, active) {
	    var activeIndex = this.getItemIndex(active)
	    var willWrap = (direction == 'prev' && activeIndex === 0)
	                || (direction == 'next' && activeIndex == (this.$items.length - 1))
	    if (willWrap && !this.options.wrap) return active
	    var delta = direction == 'prev' ? -1 : 1
	    var itemIndex = (activeIndex + delta) % this.$items.length
	    return this.$items.eq(itemIndex)
	  }
	
	  Carousel.prototype.to = function (pos) {
	    var that        = this
	    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))
	
	    if (pos > (this.$items.length - 1) || pos < 0) return
	
	    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
	    if (activeIndex == pos) return this.pause().cycle()
	
	    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
	  }
	
	  Carousel.prototype.pause = function (e) {
	    e || (this.paused = true)
	
	    if (this.$element.find('.next, .prev').length && $.support.transition) {
	      this.$element.trigger($.support.transition.end)
	      this.cycle(true)
	    }
	
	    this.interval = clearInterval(this.interval)
	
	    return this
	  }
	
	  Carousel.prototype.next = function () {
	    if (this.sliding) return
	    return this.slide('next')
	  }
	
	  Carousel.prototype.prev = function () {
	    if (this.sliding) return
	    return this.slide('prev')
	  }
	
	  Carousel.prototype.slide = function (type, next) {
	    var $active   = this.$element.find('.item.active')
	    var $next     = next || this.getItemForDirection(type, $active)
	    var isCycling = this.interval
	    var direction = type == 'next' ? 'left' : 'right'
	    var that      = this
	
	    if ($next.hasClass('active')) return (this.sliding = false)
	
	    var relatedTarget = $next[0]
	    var slideEvent = $.Event('slide.bs.carousel', {
	      relatedTarget: relatedTarget,
	      direction: direction
	    })
	    this.$element.trigger(slideEvent)
	    if (slideEvent.isDefaultPrevented()) return
	
	    this.sliding = true
	
	    isCycling && this.pause()
	
	    if (this.$indicators.length) {
	      this.$indicators.find('.active').removeClass('active')
	      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
	      $nextIndicator && $nextIndicator.addClass('active')
	    }
	
	    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
	    if ($.support.transition && this.$element.hasClass('slide')) {
	      $next.addClass(type)
	      $next[0].offsetWidth // force reflow
	      $active.addClass(direction)
	      $next.addClass(direction)
	      $active
	        .one('bsTransitionEnd', function () {
	          $next.removeClass([type, direction].join(' ')).addClass('active')
	          $active.removeClass(['active', direction].join(' '))
	          that.sliding = false
	          setTimeout(function () {
	            that.$element.trigger(slidEvent)
	          }, 0)
	        })
	        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
	    } else {
	      $active.removeClass('active')
	      $next.addClass('active')
	      this.sliding = false
	      this.$element.trigger(slidEvent)
	    }
	
	    isCycling && this.cycle()
	
	    return this
	  }
	
	
	  // CAROUSEL PLUGIN DEFINITION
	  // ==========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.carousel')
	      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
	      var action  = typeof option == 'string' ? option : options.slide
	
	      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
	      if (typeof option == 'number') data.to(option)
	      else if (action) data[action]()
	      else if (options.interval) data.pause().cycle()
	    })
	  }
	
	  var old = $.fn.carousel
	
	  $.fn.carousel             = Plugin
	  $.fn.carousel.Constructor = Carousel
	
	
	  // CAROUSEL NO CONFLICT
	  // ====================
	
	  $.fn.carousel.noConflict = function () {
	    $.fn.carousel = old
	    return this
	  }
	
	
	  // CAROUSEL DATA-API
	  // =================
	
	  var clickHandler = function (e) {
	    var href
	    var $this   = $(this)
	    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
	    if (!$target.hasClass('carousel')) return
	    var options = $.extend({}, $target.data(), $this.data())
	    var slideIndex = $this.attr('data-slide-to')
	    if (slideIndex) options.interval = false
	
	    Plugin.call($target, options)
	
	    if (slideIndex) {
	      $target.data('bs.carousel').to(slideIndex)
	    }
	
	    e.preventDefault()
	  }
	
	  $(document)
	    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
	    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)
	
	  $(window).on('load', function () {
	    $('[data-ride="carousel"]').each(function () {
	      var $carousel = $(this)
	      Plugin.call($carousel, $carousel.data())
	    })
	  })
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: collapse.js v3.3.7
	 * http://getbootstrap.com/javascript/#collapse
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	/* jshint latedef: false */
	
	+function ($) {
	  'use strict';
	
	  // COLLAPSE PUBLIC CLASS DEFINITION
	  // ================================
	
	  var Collapse = function (element, options) {
	    this.$element      = $(element)
	    this.options       = $.extend({}, Collapse.DEFAULTS, options)
	    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
	                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
	    this.transitioning = null
	
	    if (this.options.parent) {
	      this.$parent = this.getParent()
	    } else {
	      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
	    }
	
	    if (this.options.toggle) this.toggle()
	  }
	
	  Collapse.VERSION  = '3.3.7'
	
	  Collapse.TRANSITION_DURATION = 350
	
	  Collapse.DEFAULTS = {
	    toggle: true
	  }
	
	  Collapse.prototype.dimension = function () {
	    var hasWidth = this.$element.hasClass('width')
	    return hasWidth ? 'width' : 'height'
	  }
	
	  Collapse.prototype.show = function () {
	    if (this.transitioning || this.$element.hasClass('in')) return
	
	    var activesData
	    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')
	
	    if (actives && actives.length) {
	      activesData = actives.data('bs.collapse')
	      if (activesData && activesData.transitioning) return
	    }
	
	    var startEvent = $.Event('show.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return
	
	    if (actives && actives.length) {
	      Plugin.call(actives, 'hide')
	      activesData || actives.data('bs.collapse', null)
	    }
	
	    var dimension = this.dimension()
	
	    this.$element
	      .removeClass('collapse')
	      .addClass('collapsing')[dimension](0)
	      .attr('aria-expanded', true)
	
	    this.$trigger
	      .removeClass('collapsed')
	      .attr('aria-expanded', true)
	
	    this.transitioning = 1
	
	    var complete = function () {
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse in')[dimension]('')
	      this.transitioning = 0
	      this.$element
	        .trigger('shown.bs.collapse')
	    }
	
	    if (!$.support.transition) return complete.call(this)
	
	    var scrollSize = $.camelCase(['scroll', dimension].join('-'))
	
	    this.$element
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
	  }
	
	  Collapse.prototype.hide = function () {
	    if (this.transitioning || !this.$element.hasClass('in')) return
	
	    var startEvent = $.Event('hide.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return
	
	    var dimension = this.dimension()
	
	    this.$element[dimension](this.$element[dimension]())[0].offsetHeight
	
	    this.$element
	      .addClass('collapsing')
	      .removeClass('collapse in')
	      .attr('aria-expanded', false)
	
	    this.$trigger
	      .addClass('collapsed')
	      .attr('aria-expanded', false)
	
	    this.transitioning = 1
	
	    var complete = function () {
	      this.transitioning = 0
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse')
	        .trigger('hidden.bs.collapse')
	    }
	
	    if (!$.support.transition) return complete.call(this)
	
	    this.$element
	      [dimension](0)
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
	  }
	
	  Collapse.prototype.toggle = function () {
	    this[this.$element.hasClass('in') ? 'hide' : 'show']()
	  }
	
	  Collapse.prototype.getParent = function () {
	    return $(this.options.parent)
	      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
	      .each($.proxy(function (i, element) {
	        var $element = $(element)
	        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
	      }, this))
	      .end()
	  }
	
	  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
	    var isOpen = $element.hasClass('in')
	
	    $element.attr('aria-expanded', isOpen)
	    $trigger
	      .toggleClass('collapsed', !isOpen)
	      .attr('aria-expanded', isOpen)
	  }
	
	  function getTargetFromTrigger($trigger) {
	    var href
	    var target = $trigger.attr('data-target')
	      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
	
	    return $(target)
	  }
	
	
	  // COLLAPSE PLUGIN DEFINITION
	  // ==========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.collapse')
	      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)
	
	      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
	      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.collapse
	
	  $.fn.collapse             = Plugin
	  $.fn.collapse.Constructor = Collapse
	
	
	  // COLLAPSE NO CONFLICT
	  // ====================
	
	  $.fn.collapse.noConflict = function () {
	    $.fn.collapse = old
	    return this
	  }
	
	
	  // COLLAPSE DATA-API
	  // =================
	
	  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
	    var $this   = $(this)
	
	    if (!$this.attr('data-target')) e.preventDefault()
	
	    var $target = getTargetFromTrigger($this)
	    var data    = $target.data('bs.collapse')
	    var option  = data ? 'toggle' : $this.data()
	
	    Plugin.call($target, option)
	  })
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: dropdown.js v3.3.7
	 * http://getbootstrap.com/javascript/#dropdowns
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // DROPDOWN CLASS DEFINITION
	  // =========================
	
	  var backdrop = '.dropdown-backdrop'
	  var toggle   = '[data-toggle="dropdown"]'
	  var Dropdown = function (element) {
	    $(element).on('click.bs.dropdown', this.toggle)
	  }
	
	  Dropdown.VERSION = '3.3.7'
	
	  function getParent($this) {
	    var selector = $this.attr('data-target')
	
	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }
	
	    var $parent = selector && $(selector)
	
	    return $parent && $parent.length ? $parent : $this.parent()
	  }
	
	  function clearMenus(e) {
	    if (e && e.which === 3) return
	    $(backdrop).remove()
	    $(toggle).each(function () {
	      var $this         = $(this)
	      var $parent       = getParent($this)
	      var relatedTarget = { relatedTarget: this }
	
	      if (!$parent.hasClass('open')) return
	
	      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return
	
	      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
	
	      if (e.isDefaultPrevented()) return
	
	      $this.attr('aria-expanded', 'false')
	      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
	    })
	  }
	
	  Dropdown.prototype.toggle = function (e) {
	    var $this = $(this)
	
	    if ($this.is('.disabled, :disabled')) return
	
	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')
	
	    clearMenus()
	
	    if (!isActive) {
	      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
	        // if mobile we use a backdrop because click events don't delegate
	        $(document.createElement('div'))
	          .addClass('dropdown-backdrop')
	          .insertAfter($(this))
	          .on('click', clearMenus)
	      }
	
	      var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
	
	      if (e.isDefaultPrevented()) return
	
	      $this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')
	
	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))
	    }
	
	    return false
	  }
	
	  Dropdown.prototype.keydown = function (e) {
	    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return
	
	    var $this = $(this)
	
	    e.preventDefault()
	    e.stopPropagation()
	
	    if ($this.is('.disabled, :disabled')) return
	
	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')
	
	    if (!isActive && e.which != 27 || isActive && e.which == 27) {
	      if (e.which == 27) $parent.find(toggle).trigger('focus')
	      return $this.trigger('click')
	    }
	
	    var desc = ' li:not(.disabled):visible a'
	    var $items = $parent.find('.dropdown-menu' + desc)
	
	    if (!$items.length) return
	
	    var index = $items.index(e.target)
	
	    if (e.which == 38 && index > 0)                 index--         // up
	    if (e.which == 40 && index < $items.length - 1) index++         // down
	    if (!~index)                                    index = 0
	
	    $items.eq(index).trigger('focus')
	  }
	
	
	  // DROPDOWN PLUGIN DEFINITION
	  // ==========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.dropdown')
	
	      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }
	
	  var old = $.fn.dropdown
	
	  $.fn.dropdown             = Plugin
	  $.fn.dropdown.Constructor = Dropdown
	
	
	  // DROPDOWN NO CONFLICT
	  // ====================
	
	  $.fn.dropdown.noConflict = function () {
	    $.fn.dropdown = old
	    return this
	  }
	
	
	  // APPLY TO STANDARD DROPDOWN ELEMENTS
	  // ===================================
	
	  $(document)
	    .on('click.bs.dropdown.data-api', clearMenus)
	    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
	    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
	    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
	    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: modal.js v3.3.7
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // MODAL CLASS DEFINITION
	  // ======================
	
	  var Modal = function (element, options) {
	    this.options             = options
	    this.$body               = $(document.body)
	    this.$element            = $(element)
	    this.$dialog             = this.$element.find('.modal-dialog')
	    this.$backdrop           = null
	    this.isShown             = null
	    this.originalBodyPad     = null
	    this.scrollbarWidth      = 0
	    this.ignoreBackdropClick = false
	
	    if (this.options.remote) {
	      this.$element
	        .find('.modal-content')
	        .load(this.options.remote, $.proxy(function () {
	          this.$element.trigger('loaded.bs.modal')
	        }, this))
	    }
	  }
	
	  Modal.VERSION  = '3.3.7'
	
	  Modal.TRANSITION_DURATION = 300
	  Modal.BACKDROP_TRANSITION_DURATION = 150
	
	  Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true
	  }
	
	  Modal.prototype.toggle = function (_relatedTarget) {
	    return this.isShown ? this.hide() : this.show(_relatedTarget)
	  }
	
	  Modal.prototype.show = function (_relatedTarget) {
	    var that = this
	    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
	
	    this.$element.trigger(e)
	
	    if (this.isShown || e.isDefaultPrevented()) return
	
	    this.isShown = true
	
	    this.checkScrollbar()
	    this.setScrollbar()
	    this.$body.addClass('modal-open')
	
	    this.escape()
	    this.resize()
	
	    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
	
	    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
	      })
	    })
	
	    this.backdrop(function () {
	      var transition = $.support.transition && that.$element.hasClass('fade')
	
	      if (!that.$element.parent().length) {
	        that.$element.appendTo(that.$body) // don't move modals dom position
	      }
	
	      that.$element
	        .show()
	        .scrollTop(0)
	
	      that.adjustDialog()
	
	      if (transition) {
	        that.$element[0].offsetWidth // force reflow
	      }
	
	      that.$element.addClass('in')
	
	      that.enforceFocus()
	
	      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
	
	      transition ?
	        that.$dialog // wait for modal to slide in
	          .one('bsTransitionEnd', function () {
	            that.$element.trigger('focus').trigger(e)
	          })
	          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	        that.$element.trigger('focus').trigger(e)
	    })
	  }
	
	  Modal.prototype.hide = function (e) {
	    if (e) e.preventDefault()
	
	    e = $.Event('hide.bs.modal')
	
	    this.$element.trigger(e)
	
	    if (!this.isShown || e.isDefaultPrevented()) return
	
	    this.isShown = false
	
	    this.escape()
	    this.resize()
	
	    $(document).off('focusin.bs.modal')
	
	    this.$element
	      .removeClass('in')
	      .off('click.dismiss.bs.modal')
	      .off('mouseup.dismiss.bs.modal')
	
	    this.$dialog.off('mousedown.dismiss.bs.modal')
	
	    $.support.transition && this.$element.hasClass('fade') ?
	      this.$element
	        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
	        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	      this.hideModal()
	  }
	
	  Modal.prototype.enforceFocus = function () {
	    $(document)
	      .off('focusin.bs.modal') // guard against infinite focus loop
	      .on('focusin.bs.modal', $.proxy(function (e) {
	        if (document !== e.target &&
	            this.$element[0] !== e.target &&
	            !this.$element.has(e.target).length) {
	          this.$element.trigger('focus')
	        }
	      }, this))
	  }
	
	  Modal.prototype.escape = function () {
	    if (this.isShown && this.options.keyboard) {
	      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	        e.which == 27 && this.hide()
	      }, this))
	    } else if (!this.isShown) {
	      this.$element.off('keydown.dismiss.bs.modal')
	    }
	  }
	
	  Modal.prototype.resize = function () {
	    if (this.isShown) {
	      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
	    } else {
	      $(window).off('resize.bs.modal')
	    }
	  }
	
	  Modal.prototype.hideModal = function () {
	    var that = this
	    this.$element.hide()
	    this.backdrop(function () {
	      that.$body.removeClass('modal-open')
	      that.resetAdjustments()
	      that.resetScrollbar()
	      that.$element.trigger('hidden.bs.modal')
	    })
	  }
	
	  Modal.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove()
	    this.$backdrop = null
	  }
	
	  Modal.prototype.backdrop = function (callback) {
	    var that = this
	    var animate = this.$element.hasClass('fade') ? 'fade' : ''
	
	    if (this.isShown && this.options.backdrop) {
	      var doAnimate = $.support.transition && animate
	
	      this.$backdrop = $(document.createElement('div'))
	        .addClass('modal-backdrop ' + animate)
	        .appendTo(this.$body)
	
	      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	        if (this.ignoreBackdropClick) {
	          this.ignoreBackdropClick = false
	          return
	        }
	        if (e.target !== e.currentTarget) return
	        this.options.backdrop == 'static'
	          ? this.$element[0].focus()
	          : this.hide()
	      }, this))
	
	      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow
	
	      this.$backdrop.addClass('in')
	
	      if (!callback) return
	
	      doAnimate ?
	        this.$backdrop
	          .one('bsTransitionEnd', callback)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callback()
	
	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass('in')
	
	      var callbackRemove = function () {
	        that.removeBackdrop()
	        callback && callback()
	      }
	      $.support.transition && this.$element.hasClass('fade') ?
	        this.$backdrop
	          .one('bsTransitionEnd', callbackRemove)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callbackRemove()
	
	    } else if (callback) {
	      callback()
	    }
	  }
	
	  // these following methods are used to handle overflowing modals
	
	  Modal.prototype.handleUpdate = function () {
	    this.adjustDialog()
	  }
	
	  Modal.prototype.adjustDialog = function () {
	    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight
	
	    this.$element.css({
	      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	    })
	  }
	
	  Modal.prototype.resetAdjustments = function () {
	    this.$element.css({
	      paddingLeft: '',
	      paddingRight: ''
	    })
	  }
	
	  Modal.prototype.checkScrollbar = function () {
	    var fullWindowWidth = window.innerWidth
	    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
	      var documentElementRect = document.documentElement.getBoundingClientRect()
	      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	    }
	    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
	    this.scrollbarWidth = this.measureScrollbar()
	  }
	
	  Modal.prototype.setScrollbar = function () {
	    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
	    this.originalBodyPad = document.body.style.paddingRight || ''
	    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	  }
	
	  Modal.prototype.resetScrollbar = function () {
	    this.$body.css('padding-right', this.originalBodyPad)
	  }
	
	  Modal.prototype.measureScrollbar = function () { // thx walsh
	    var scrollDiv = document.createElement('div')
	    scrollDiv.className = 'modal-scrollbar-measure'
	    this.$body.append(scrollDiv)
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	    this.$body[0].removeChild(scrollDiv)
	    return scrollbarWidth
	  }
	
	
	  // MODAL PLUGIN DEFINITION
	  // =======================
	
	  function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.modal')
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
	
	      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
	      if (typeof option == 'string') data[option](_relatedTarget)
	      else if (options.show) data.show(_relatedTarget)
	    })
	  }
	
	  var old = $.fn.modal
	
	  $.fn.modal             = Plugin
	  $.fn.modal.Constructor = Modal
	
	
	  // MODAL NO CONFLICT
	  // =================
	
	  $.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	  }
	
	
	  // MODAL DATA-API
	  // ==============
	
	  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	    var $this   = $(this)
	    var href    = $this.attr('href')
	    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
	    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
	
	    if ($this.is('a')) e.preventDefault()
	
	    $target.one('show.bs.modal', function (showEvent) {
	      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
	      $target.one('hidden.bs.modal', function () {
	        $this.is(':visible') && $this.trigger('focus')
	      })
	    })
	    Plugin.call($target, option, this)
	  })
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: tooltip.js v3.3.7
	 * http://getbootstrap.com/javascript/#tooltip
	 * Inspired by the original jQuery.tipsy by Jason Frame
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // TOOLTIP PUBLIC CLASS DEFINITION
	  // ===============================
	
	  var Tooltip = function (element, options) {
	    this.type       = null
	    this.options    = null
	    this.enabled    = null
	    this.timeout    = null
	    this.hoverState = null
	    this.$element   = null
	    this.inState    = null
	
	    this.init('tooltip', element, options)
	  }
	
	  Tooltip.VERSION  = '3.3.7'
	
	  Tooltip.TRANSITION_DURATION = 150
	
	  Tooltip.DEFAULTS = {
	    animation: true,
	    placement: 'top',
	    selector: false,
	    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    container: false,
	    viewport: {
	      selector: 'body',
	      padding: 0
	    }
	  }
	
	  Tooltip.prototype.init = function (type, element, options) {
	    this.enabled   = true
	    this.type      = type
	    this.$element  = $(element)
	    this.options   = this.getOptions(options)
	    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
	    this.inState   = { click: false, hover: false, focus: false }
	
	    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
	      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
	    }
	
	    var triggers = this.options.trigger.split(' ')
	
	    for (var i = triggers.length; i--;) {
	      var trigger = triggers[i]
	
	      if (trigger == 'click') {
	        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
	      } else if (trigger != 'manual') {
	        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
	        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
	
	        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
	        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
	      }
	    }
	
	    this.options.selector ?
	      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
	      this.fixTitle()
	  }
	
	  Tooltip.prototype.getDefaults = function () {
	    return Tooltip.DEFAULTS
	  }
	
	  Tooltip.prototype.getOptions = function (options) {
	    options = $.extend({}, this.getDefaults(), this.$element.data(), options)
	
	    if (options.delay && typeof options.delay == 'number') {
	      options.delay = {
	        show: options.delay,
	        hide: options.delay
	      }
	    }
	
	    return options
	  }
	
	  Tooltip.prototype.getDelegateOptions = function () {
	    var options  = {}
	    var defaults = this.getDefaults()
	
	    this._options && $.each(this._options, function (key, value) {
	      if (defaults[key] != value) options[key] = value
	    })
	
	    return options
	  }
	
	  Tooltip.prototype.enter = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)
	
	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }
	
	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
	    }
	
	    if (self.tip().hasClass('in') || self.hoverState == 'in') {
	      self.hoverState = 'in'
	      return
	    }
	
	    clearTimeout(self.timeout)
	
	    self.hoverState = 'in'
	
	    if (!self.options.delay || !self.options.delay.show) return self.show()
	
	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'in') self.show()
	    }, self.options.delay.show)
	  }
	
	  Tooltip.prototype.isInStateTrue = function () {
	    for (var key in this.inState) {
	      if (this.inState[key]) return true
	    }
	
	    return false
	  }
	
	  Tooltip.prototype.leave = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)
	
	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }
	
	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
	    }
	
	    if (self.isInStateTrue()) return
	
	    clearTimeout(self.timeout)
	
	    self.hoverState = 'out'
	
	    if (!self.options.delay || !self.options.delay.hide) return self.hide()
	
	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide()
	    }, self.options.delay.hide)
	  }
	
	  Tooltip.prototype.show = function () {
	    var e = $.Event('show.bs.' + this.type)
	
	    if (this.hasContent() && this.enabled) {
	      this.$element.trigger(e)
	
	      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
	      if (e.isDefaultPrevented() || !inDom) return
	      var that = this
	
	      var $tip = this.tip()
	
	      var tipId = this.getUID(this.type)
	
	      this.setContent()
	      $tip.attr('id', tipId)
	      this.$element.attr('aria-describedby', tipId)
	
	      if (this.options.animation) $tip.addClass('fade')
	
	      var placement = typeof this.options.placement == 'function' ?
	        this.options.placement.call(this, $tip[0], this.$element[0]) :
	        this.options.placement
	
	      var autoToken = /\s?auto?\s?/i
	      var autoPlace = autoToken.test(placement)
	      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'
	
	      $tip
	        .detach()
	        .css({ top: 0, left: 0, display: 'block' })
	        .addClass(placement)
	        .data('bs.' + this.type, this)
	
	      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
	      this.$element.trigger('inserted.bs.' + this.type)
	
	      var pos          = this.getPosition()
	      var actualWidth  = $tip[0].offsetWidth
	      var actualHeight = $tip[0].offsetHeight
	
	      if (autoPlace) {
	        var orgPlacement = placement
	        var viewportDim = this.getPosition(this.$viewport)
	
	        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
	                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
	                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
	                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
	                    placement
	
	        $tip
	          .removeClass(orgPlacement)
	          .addClass(placement)
	      }
	
	      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
	
	      this.applyPlacement(calculatedOffset, placement)
	
	      var complete = function () {
	        var prevHoverState = that.hoverState
	        that.$element.trigger('shown.bs.' + that.type)
	        that.hoverState = null
	
	        if (prevHoverState == 'out') that.leave(that)
	      }
	
	      $.support.transition && this.$tip.hasClass('fade') ?
	        $tip
	          .one('bsTransitionEnd', complete)
	          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	        complete()
	    }
	  }
	
	  Tooltip.prototype.applyPlacement = function (offset, placement) {
	    var $tip   = this.tip()
	    var width  = $tip[0].offsetWidth
	    var height = $tip[0].offsetHeight
	
	    // manually read margins because getBoundingClientRect includes difference
	    var marginTop = parseInt($tip.css('margin-top'), 10)
	    var marginLeft = parseInt($tip.css('margin-left'), 10)
	
	    // we must check for NaN for ie 8/9
	    if (isNaN(marginTop))  marginTop  = 0
	    if (isNaN(marginLeft)) marginLeft = 0
	
	    offset.top  += marginTop
	    offset.left += marginLeft
	
	    // $.fn.offset doesn't round pixel values
	    // so we use setOffset directly with our own function B-0
	    $.offset.setOffset($tip[0], $.extend({
	      using: function (props) {
	        $tip.css({
	          top: Math.round(props.top),
	          left: Math.round(props.left)
	        })
	      }
	    }, offset), 0)
	
	    $tip.addClass('in')
	
	    // check to see if placing tip in new offset caused the tip to resize itself
	    var actualWidth  = $tip[0].offsetWidth
	    var actualHeight = $tip[0].offsetHeight
	
	    if (placement == 'top' && actualHeight != height) {
	      offset.top = offset.top + height - actualHeight
	    }
	
	    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)
	
	    if (delta.left) offset.left += delta.left
	    else offset.top += delta.top
	
	    var isVertical          = /top|bottom/.test(placement)
	    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
	    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
	
	    $tip.offset(offset)
	    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	  }
	
	  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
	    this.arrow()
	      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
	      .css(isVertical ? 'top' : 'left', '')
	  }
	
	  Tooltip.prototype.setContent = function () {
	    var $tip  = this.tip()
	    var title = this.getTitle()
	
	    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
	    $tip.removeClass('fade in top bottom left right')
	  }
	
	  Tooltip.prototype.hide = function (callback) {
	    var that = this
	    var $tip = $(this.$tip)
	    var e    = $.Event('hide.bs.' + this.type)
	
	    function complete() {
	      if (that.hoverState != 'in') $tip.detach()
	      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
	        that.$element
	          .removeAttr('aria-describedby')
	          .trigger('hidden.bs.' + that.type)
	      }
	      callback && callback()
	    }
	
	    this.$element.trigger(e)
	
	    if (e.isDefaultPrevented()) return
	
	    $tip.removeClass('in')
	
	    $.support.transition && $tip.hasClass('fade') ?
	      $tip
	        .one('bsTransitionEnd', complete)
	        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	      complete()
	
	    this.hoverState = null
	
	    return this
	  }
	
	  Tooltip.prototype.fixTitle = function () {
	    var $e = this.$element
	    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
	      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
	    }
	  }
	
	  Tooltip.prototype.hasContent = function () {
	    return this.getTitle()
	  }
	
	  Tooltip.prototype.getPosition = function ($element) {
	    $element   = $element || this.$element
	
	    var el     = $element[0]
	    var isBody = el.tagName == 'BODY'
	
	    var elRect    = el.getBoundingClientRect()
	    if (elRect.width == null) {
	      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
	    }
	    var isSvg = window.SVGElement && el instanceof window.SVGElement
	    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
	    // See https://github.com/twbs/bootstrap/issues/20280
	    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
	    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
	    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null
	
	    return $.extend({}, elRect, scroll, outerDims, elOffset)
	  }
	
	  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
	    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
	        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }
	
	  }
	
	  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
	    var delta = { top: 0, left: 0 }
	    if (!this.$viewport) return delta
	
	    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
	    var viewportDimensions = this.getPosition(this.$viewport)
	
	    if (/right|left/.test(placement)) {
	      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
	      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
	      if (topEdgeOffset < viewportDimensions.top) { // top overflow
	        delta.top = viewportDimensions.top - topEdgeOffset
	      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
	        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
	      }
	    } else {
	      var leftEdgeOffset  = pos.left - viewportPadding
	      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
	      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
	        delta.left = viewportDimensions.left - leftEdgeOffset
	      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
	        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
	      }
	    }
	
	    return delta
	  }
	
	  Tooltip.prototype.getTitle = function () {
	    var title
	    var $e = this.$element
	    var o  = this.options
	
	    title = $e.attr('data-original-title')
	      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)
	
	    return title
	  }
	
	  Tooltip.prototype.getUID = function (prefix) {
	    do prefix += ~~(Math.random() * 1000000)
	    while (document.getElementById(prefix))
	    return prefix
	  }
	
	  Tooltip.prototype.tip = function () {
	    if (!this.$tip) {
	      this.$tip = $(this.options.template)
	      if (this.$tip.length != 1) {
	        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
	      }
	    }
	    return this.$tip
	  }
	
	  Tooltip.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	  }
	
	  Tooltip.prototype.enable = function () {
	    this.enabled = true
	  }
	
	  Tooltip.prototype.disable = function () {
	    this.enabled = false
	  }
	
	  Tooltip.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled
	  }
	
	  Tooltip.prototype.toggle = function (e) {
	    var self = this
	    if (e) {
	      self = $(e.currentTarget).data('bs.' + this.type)
	      if (!self) {
	        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
	        $(e.currentTarget).data('bs.' + this.type, self)
	      }
	    }
	
	    if (e) {
	      self.inState.click = !self.inState.click
	      if (self.isInStateTrue()) self.enter(self)
	      else self.leave(self)
	    } else {
	      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
	    }
	  }
	
	  Tooltip.prototype.destroy = function () {
	    var that = this
	    clearTimeout(this.timeout)
	    this.hide(function () {
	      that.$element.off('.' + that.type).removeData('bs.' + that.type)
	      if (that.$tip) {
	        that.$tip.detach()
	      }
	      that.$tip = null
	      that.$arrow = null
	      that.$viewport = null
	      that.$element = null
	    })
	  }
	
	
	  // TOOLTIP PLUGIN DEFINITION
	  // =========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.tooltip')
	      var options = typeof option == 'object' && option
	
	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.tooltip
	
	  $.fn.tooltip             = Plugin
	  $.fn.tooltip.Constructor = Tooltip
	
	
	  // TOOLTIP NO CONFLICT
	  // ===================
	
	  $.fn.tooltip.noConflict = function () {
	    $.fn.tooltip = old
	    return this
	  }
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: popover.js v3.3.7
	 * http://getbootstrap.com/javascript/#popovers
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // POPOVER PUBLIC CLASS DEFINITION
	  // ===============================
	
	  var Popover = function (element, options) {
	    this.init('popover', element, options)
	  }
	
	  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')
	
	  Popover.VERSION  = '3.3.7'
	
	  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	  })
	
	
	  // NOTE: POPOVER EXTENDS tooltip.js
	  // ================================
	
	  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)
	
	  Popover.prototype.constructor = Popover
	
	  Popover.prototype.getDefaults = function () {
	    return Popover.DEFAULTS
	  }
	
	  Popover.prototype.setContent = function () {
	    var $tip    = this.tip()
	    var title   = this.getTitle()
	    var content = this.getContent()
	
	    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
	    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
	      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
	    ](content)
	
	    $tip.removeClass('fade top bottom left right in')
	
	    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
	    // this manually by checking the contents.
	    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	  }
	
	  Popover.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent()
	  }
	
	  Popover.prototype.getContent = function () {
	    var $e = this.$element
	    var o  = this.options
	
	    return $e.attr('data-content')
	      || (typeof o.content == 'function' ?
	            o.content.call($e[0]) :
	            o.content)
	  }
	
	  Popover.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	  }
	
	
	  // POPOVER PLUGIN DEFINITION
	  // =========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.popover')
	      var options = typeof option == 'object' && option
	
	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.popover
	
	  $.fn.popover             = Plugin
	  $.fn.popover.Constructor = Popover
	
	
	  // POPOVER NO CONFLICT
	  // ===================
	
	  $.fn.popover.noConflict = function () {
	    $.fn.popover = old
	    return this
	  }
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: scrollspy.js v3.3.7
	 * http://getbootstrap.com/javascript/#scrollspy
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // SCROLLSPY CLASS DEFINITION
	  // ==========================
	
	  function ScrollSpy(element, options) {
	    this.$body          = $(document.body)
	    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
	    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
	    this.selector       = (this.options.target || '') + ' .nav li > a'
	    this.offsets        = []
	    this.targets        = []
	    this.activeTarget   = null
	    this.scrollHeight   = 0
	
	    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
	    this.refresh()
	    this.process()
	  }
	
	  ScrollSpy.VERSION  = '3.3.7'
	
	  ScrollSpy.DEFAULTS = {
	    offset: 10
	  }
	
	  ScrollSpy.prototype.getScrollHeight = function () {
	    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	  }
	
	  ScrollSpy.prototype.refresh = function () {
	    var that          = this
	    var offsetMethod  = 'offset'
	    var offsetBase    = 0
	
	    this.offsets      = []
	    this.targets      = []
	    this.scrollHeight = this.getScrollHeight()
	
	    if (!$.isWindow(this.$scrollElement[0])) {
	      offsetMethod = 'position'
	      offsetBase   = this.$scrollElement.scrollTop()
	    }
	
	    this.$body
	      .find(this.selector)
	      .map(function () {
	        var $el   = $(this)
	        var href  = $el.data('target') || $el.attr('href')
	        var $href = /^#./.test(href) && $(href)
	
	        return ($href
	          && $href.length
	          && $href.is(':visible')
	          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
	      })
	      .sort(function (a, b) { return a[0] - b[0] })
	      .each(function () {
	        that.offsets.push(this[0])
	        that.targets.push(this[1])
	      })
	  }
	
	  ScrollSpy.prototype.process = function () {
	    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
	    var scrollHeight = this.getScrollHeight()
	    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
	    var offsets      = this.offsets
	    var targets      = this.targets
	    var activeTarget = this.activeTarget
	    var i
	
	    if (this.scrollHeight != scrollHeight) {
	      this.refresh()
	    }
	
	    if (scrollTop >= maxScroll) {
	      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
	    }
	
	    if (activeTarget && scrollTop < offsets[0]) {
	      this.activeTarget = null
	      return this.clear()
	    }
	
	    for (i = offsets.length; i--;) {
	      activeTarget != targets[i]
	        && scrollTop >= offsets[i]
	        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
	        && this.activate(targets[i])
	    }
	  }
	
	  ScrollSpy.prototype.activate = function (target) {
	    this.activeTarget = target
	
	    this.clear()
	
	    var selector = this.selector +
	      '[data-target="' + target + '"],' +
	      this.selector + '[href="' + target + '"]'
	
	    var active = $(selector)
	      .parents('li')
	      .addClass('active')
	
	    if (active.parent('.dropdown-menu').length) {
	      active = active
	        .closest('li.dropdown')
	        .addClass('active')
	    }
	
	    active.trigger('activate.bs.scrollspy')
	  }
	
	  ScrollSpy.prototype.clear = function () {
	    $(this.selector)
	      .parentsUntil(this.options.target, '.active')
	      .removeClass('active')
	  }
	
	
	  // SCROLLSPY PLUGIN DEFINITION
	  // ===========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.scrollspy')
	      var options = typeof option == 'object' && option
	
	      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.scrollspy
	
	  $.fn.scrollspy             = Plugin
	  $.fn.scrollspy.Constructor = ScrollSpy
	
	
	  // SCROLLSPY NO CONFLICT
	  // =====================
	
	  $.fn.scrollspy.noConflict = function () {
	    $.fn.scrollspy = old
	    return this
	  }
	
	
	  // SCROLLSPY DATA-API
	  // ==================
	
	  $(window).on('load.bs.scrollspy.data-api', function () {
	    $('[data-spy="scroll"]').each(function () {
	      var $spy = $(this)
	      Plugin.call($spy, $spy.data())
	    })
	  })
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: tab.js v3.3.7
	 * http://getbootstrap.com/javascript/#tabs
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // TAB CLASS DEFINITION
	  // ====================
	
	  var Tab = function (element) {
	    // jscs:disable requireDollarBeforejQueryAssignment
	    this.element = $(element)
	    // jscs:enable requireDollarBeforejQueryAssignment
	  }
	
	  Tab.VERSION = '3.3.7'
	
	  Tab.TRANSITION_DURATION = 150
	
	  Tab.prototype.show = function () {
	    var $this    = this.element
	    var $ul      = $this.closest('ul:not(.dropdown-menu)')
	    var selector = $this.data('target')
	
	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }
	
	    if ($this.parent('li').hasClass('active')) return
	
	    var $previous = $ul.find('.active:last a')
	    var hideEvent = $.Event('hide.bs.tab', {
	      relatedTarget: $this[0]
	    })
	    var showEvent = $.Event('show.bs.tab', {
	      relatedTarget: $previous[0]
	    })
	
	    $previous.trigger(hideEvent)
	    $this.trigger(showEvent)
	
	    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return
	
	    var $target = $(selector)
	
	    this.activate($this.closest('li'), $ul)
	    this.activate($target, $target.parent(), function () {
	      $previous.trigger({
	        type: 'hidden.bs.tab',
	        relatedTarget: $this[0]
	      })
	      $this.trigger({
	        type: 'shown.bs.tab',
	        relatedTarget: $previous[0]
	      })
	    })
	  }
	
	  Tab.prototype.activate = function (element, container, callback) {
	    var $active    = container.find('> .active')
	    var transition = callback
	      && $.support.transition
	      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)
	
	    function next() {
	      $active
	        .removeClass('active')
	        .find('> .dropdown-menu > .active')
	          .removeClass('active')
	        .end()
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', false)
	
	      element
	        .addClass('active')
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', true)
	
	      if (transition) {
	        element[0].offsetWidth // reflow for transition
	        element.addClass('in')
	      } else {
	        element.removeClass('fade')
	      }
	
	      if (element.parent('.dropdown-menu').length) {
	        element
	          .closest('li.dropdown')
	            .addClass('active')
	          .end()
	          .find('[data-toggle="tab"]')
	            .attr('aria-expanded', true)
	      }
	
	      callback && callback()
	    }
	
	    $active.length && transition ?
	      $active
	        .one('bsTransitionEnd', next)
	        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
	      next()
	
	    $active.removeClass('in')
	  }
	
	
	  // TAB PLUGIN DEFINITION
	  // =====================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.tab')
	
	      if (!data) $this.data('bs.tab', (data = new Tab(this)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.tab
	
	  $.fn.tab             = Plugin
	  $.fn.tab.Constructor = Tab
	
	
	  // TAB NO CONFLICT
	  // ===============
	
	  $.fn.tab.noConflict = function () {
	    $.fn.tab = old
	    return this
	  }
	
	
	  // TAB DATA-API
	  // ============
	
	  var clickHandler = function (e) {
	    e.preventDefault()
	    Plugin.call($(this), 'show')
	  }
	
	  $(document)
	    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
	    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)
	
	}(jQuery);
	
	/* ========================================================================
	 * Bootstrap: affix.js v3.3.7
	 * http://getbootstrap.com/javascript/#affix
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // AFFIX CLASS DEFINITION
	  // ======================
	
	  var Affix = function (element, options) {
	    this.options = $.extend({}, Affix.DEFAULTS, options)
	
	    this.$target = $(this.options.target)
	      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
	      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))
	
	    this.$element     = $(element)
	    this.affixed      = null
	    this.unpin        = null
	    this.pinnedOffset = null
	
	    this.checkPosition()
	  }
	
	  Affix.VERSION  = '3.3.7'
	
	  Affix.RESET    = 'affix affix-top affix-bottom'
	
	  Affix.DEFAULTS = {
	    offset: 0,
	    target: window
	  }
	
	  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
	    var scrollTop    = this.$target.scrollTop()
	    var position     = this.$element.offset()
	    var targetHeight = this.$target.height()
	
	    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false
	
	    if (this.affixed == 'bottom') {
	      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
	      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
	    }
	
	    var initializing   = this.affixed == null
	    var colliderTop    = initializing ? scrollTop : position.top
	    var colliderHeight = initializing ? targetHeight : height
	
	    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
	    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'
	
	    return false
	  }
	
	  Affix.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset
	    this.$element.removeClass(Affix.RESET).addClass('affix')
	    var scrollTop = this.$target.scrollTop()
	    var position  = this.$element.offset()
	    return (this.pinnedOffset = position.top - scrollTop)
	  }
	
	  Affix.prototype.checkPositionWithEventLoop = function () {
	    setTimeout($.proxy(this.checkPosition, this), 1)
	  }
	
	  Affix.prototype.checkPosition = function () {
	    if (!this.$element.is(':visible')) return
	
	    var height       = this.$element.height()
	    var offset       = this.options.offset
	    var offsetTop    = offset.top
	    var offsetBottom = offset.bottom
	    var scrollHeight = Math.max($(document).height(), $(document.body).height())
	
	    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
	    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
	    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)
	
	    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)
	
	    if (this.affixed != affix) {
	      if (this.unpin != null) this.$element.css('top', '')
	
	      var affixType = 'affix' + (affix ? '-' + affix : '')
	      var e         = $.Event(affixType + '.bs.affix')
	
	      this.$element.trigger(e)
	
	      if (e.isDefaultPrevented()) return
	
	      this.affixed = affix
	      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null
	
	      this.$element
	        .removeClass(Affix.RESET)
	        .addClass(affixType)
	        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
	    }
	
	    if (affix == 'bottom') {
	      this.$element.offset({
	        top: scrollHeight - height - offsetBottom
	      })
	    }
	  }
	
	
	  // AFFIX PLUGIN DEFINITION
	  // =======================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.affix')
	      var options = typeof option == 'object' && option
	
	      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.affix
	
	  $.fn.affix             = Plugin
	  $.fn.affix.Constructor = Affix
	
	
	  // AFFIX NO CONFLICT
	  // =================
	
	  $.fn.affix.noConflict = function () {
	    $.fn.affix = old
	    return this
	  }
	
	
	  // AFFIX DATA-API
	  // ==============
	
	  $(window).on('load', function () {
	    $('[data-spy="affix"]').each(function () {
	      var $spy = $(this)
	      var data = $spy.data()
	
	      data.offset = data.offset || {}
	
	      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
	      if (data.offsetTop    != null) data.offset.top    = data.offsetTop
	
	      Plugin.call($spy, data)
	    })
	  })
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	     _ _      _       _
	 ___| (_) ___| | __  (_)___
	/ __| | |/ __| |/ /  | / __|
	\__ \ | | (__|   < _ | \__ \
	|___/_|_|\___|_|\_(_)/ |___/
	                   |__/
	
	 Version: 1.6.0
	  Author: Ken Wheeler
	 Website: http://kenwheeler.github.io
	    Docs: http://kenwheeler.github.io/slick
	    Repo: http://github.com/kenwheeler/slick
	  Issues: http://github.com/kenwheeler/slick/issues
	
	 */
	/* global window, document, define, jQuery, setInterval, clearInterval */
	(function(factory) {
	    'use strict';
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== 'undefined') {
	        module.exports = factory(require('jquery'));
	    } else {
	        factory(jQuery);
	    }
	
	}(function($) {
	    'use strict';
	    var Slick = window.Slick || {};
	
	    Slick = (function() {
	
	        var instanceUid = 0;
	
	        function Slick(element, settings) {
	
	            var _ = this, dataSettings;
	
	            _.defaults = {
	                accessibility: true,
	                adaptiveHeight: false,
	                appendArrows: $(element),
	                appendDots: $(element),
	                arrows: true,
	                asNavFor: null,
	                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
	                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
	                autoplay: false,
	                autoplaySpeed: 3000,
	                centerMode: false,
	                centerPadding: '50px',
	                cssEase: 'ease',
	                customPaging: function(slider, i) {
	                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
	                },
	                dots: false,
	                dotsClass: 'slick-dots',
	                draggable: true,
	                easing: 'linear',
	                edgeFriction: 0.35,
	                fade: false,
	                focusOnSelect: false,
	                infinite: true,
	                initialSlide: 0,
	                lazyLoad: 'ondemand',
	                mobileFirst: false,
	                pauseOnHover: true,
	                pauseOnFocus: true,
	                pauseOnDotsHover: false,
	                respondTo: 'window',
	                responsive: null,
	                rows: 1,
	                rtl: false,
	                slide: '',
	                slidesPerRow: 1,
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                speed: 500,
	                swipe: true,
	                swipeToSlide: false,
	                touchMove: true,
	                touchThreshold: 5,
	                useCSS: true,
	                useTransform: true,
	                variableWidth: false,
	                vertical: false,
	                verticalSwiping: false,
	                waitForAnimate: true,
	                zIndex: 1000
	            };
	
	            _.initials = {
	                animating: false,
	                dragging: false,
	                autoPlayTimer: null,
	                currentDirection: 0,
	                currentLeft: null,
	                currentSlide: 0,
	                direction: 1,
	                $dots: null,
	                listWidth: null,
	                listHeight: null,
	                loadIndex: 0,
	                $nextArrow: null,
	                $prevArrow: null,
	                slideCount: null,
	                slideWidth: null,
	                $slideTrack: null,
	                $slides: null,
	                sliding: false,
	                slideOffset: 0,
	                swipeLeft: null,
	                $list: null,
	                touchObject: {},
	                transformsEnabled: false,
	                unslicked: false
	            };
	
	            $.extend(_, _.initials);
	
	            _.activeBreakpoint = null;
	            _.animType = null;
	            _.animProp = null;
	            _.breakpoints = [];
	            _.breakpointSettings = [];
	            _.cssTransitions = false;
	            _.focussed = false;
	            _.interrupted = false;
	            _.hidden = 'hidden';
	            _.paused = true;
	            _.positionProp = null;
	            _.respondTo = null;
	            _.rowCount = 1;
	            _.shouldClick = true;
	            _.$slider = $(element);
	            _.$slidesCache = null;
	            _.transformType = null;
	            _.transitionType = null;
	            _.visibilityChange = 'visibilitychange';
	            _.windowWidth = 0;
	            _.windowTimer = null;
	
	            dataSettings = $(element).data('slick') || {};
	
	            _.options = $.extend({}, _.defaults, settings, dataSettings);
	
	            _.currentSlide = _.options.initialSlide;
	
	            _.originalSettings = _.options;
	
	            if (typeof document.mozHidden !== 'undefined') {
	                _.hidden = 'mozHidden';
	                _.visibilityChange = 'mozvisibilitychange';
	            } else if (typeof document.webkitHidden !== 'undefined') {
	                _.hidden = 'webkitHidden';
	                _.visibilityChange = 'webkitvisibilitychange';
	            }
	
	            _.autoPlay = $.proxy(_.autoPlay, _);
	            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
	            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
	            _.changeSlide = $.proxy(_.changeSlide, _);
	            _.clickHandler = $.proxy(_.clickHandler, _);
	            _.selectHandler = $.proxy(_.selectHandler, _);
	            _.setPosition = $.proxy(_.setPosition, _);
	            _.swipeHandler = $.proxy(_.swipeHandler, _);
	            _.dragHandler = $.proxy(_.dragHandler, _);
	            _.keyHandler = $.proxy(_.keyHandler, _);
	
	            _.instanceUid = instanceUid++;
	
	            // A simple way to check for HTML strings
	            // Strict HTML recognition (must start with <)
	            // Extracted from jQuery v1.11 source
	            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
	
	
	            _.registerBreakpoints();
	            _.init(true);
	
	        }
	
	        return Slick;
	
	    }());
	
	    Slick.prototype.activateADA = function() {
	        var _ = this;
	
	        _.$slideTrack.find('.slick-active').attr({
	            'aria-hidden': 'false'
	        }).find('a, input, button, select').attr({
	            'tabindex': '0'
	        });
	
	    };
	
	    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {
	
	        var _ = this;
	
	        if (typeof(index) === 'boolean') {
	            addBefore = index;
	            index = null;
	        } else if (index < 0 || (index >= _.slideCount)) {
	            return false;
	        }
	
	        _.unload();
	
	        if (typeof(index) === 'number') {
	            if (index === 0 && _.$slides.length === 0) {
	                $(markup).appendTo(_.$slideTrack);
	            } else if (addBefore) {
	                $(markup).insertBefore(_.$slides.eq(index));
	            } else {
	                $(markup).insertAfter(_.$slides.eq(index));
	            }
	        } else {
	            if (addBefore === true) {
	                $(markup).prependTo(_.$slideTrack);
	            } else {
	                $(markup).appendTo(_.$slideTrack);
	            }
	        }
	
	        _.$slides = _.$slideTrack.children(this.options.slide);
	
	        _.$slideTrack.children(this.options.slide).detach();
	
	        _.$slideTrack.append(_.$slides);
	
	        _.$slides.each(function(index, element) {
	            $(element).attr('data-slick-index', index);
	        });
	
	        _.$slidesCache = _.$slides;
	
	        _.reinit();
	
	    };
	
	    Slick.prototype.animateHeight = function() {
	        var _ = this;
	        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
	            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
	            _.$list.animate({
	                height: targetHeight
	            }, _.options.speed);
	        }
	    };
	
	    Slick.prototype.animateSlide = function(targetLeft, callback) {
	
	        var animProps = {},
	            _ = this;
	
	        _.animateHeight();
	
	        if (_.options.rtl === true && _.options.vertical === false) {
	            targetLeft = -targetLeft;
	        }
	        if (_.transformsEnabled === false) {
	            if (_.options.vertical === false) {
	                _.$slideTrack.animate({
	                    left: targetLeft
	                }, _.options.speed, _.options.easing, callback);
	            } else {
	                _.$slideTrack.animate({
	                    top: targetLeft
	                }, _.options.speed, _.options.easing, callback);
	            }
	
	        } else {
	
	            if (_.cssTransitions === false) {
	                if (_.options.rtl === true) {
	                    _.currentLeft = -(_.currentLeft);
	                }
	                $({
	                    animStart: _.currentLeft
	                }).animate({
	                    animStart: targetLeft
	                }, {
	                    duration: _.options.speed,
	                    easing: _.options.easing,
	                    step: function(now) {
	                        now = Math.ceil(now);
	                        if (_.options.vertical === false) {
	                            animProps[_.animType] = 'translate(' +
	                                now + 'px, 0px)';
	                            _.$slideTrack.css(animProps);
	                        } else {
	                            animProps[_.animType] = 'translate(0px,' +
	                                now + 'px)';
	                            _.$slideTrack.css(animProps);
	                        }
	                    },
	                    complete: function() {
	                        if (callback) {
	                            callback.call();
	                        }
	                    }
	                });
	
	            } else {
	
	                _.applyTransition();
	                targetLeft = Math.ceil(targetLeft);
	
	                if (_.options.vertical === false) {
	                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
	                } else {
	                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
	                }
	                _.$slideTrack.css(animProps);
	
	                if (callback) {
	                    setTimeout(function() {
	
	                        _.disableTransition();
	
	                        callback.call();
	                    }, _.options.speed);
	                }
	
	            }
	
	        }
	
	    };
	
	    Slick.prototype.getNavTarget = function() {
	
	        var _ = this,
	            asNavFor = _.options.asNavFor;
	
	        if ( asNavFor && asNavFor !== null ) {
	            asNavFor = $(asNavFor).not(_.$slider);
	        }
	
	        return asNavFor;
	
	    };
	
	    Slick.prototype.asNavFor = function(index) {
	
	        var _ = this,
	            asNavFor = _.getNavTarget();
	
	        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
	            asNavFor.each(function() {
	                var target = $(this).slick('getSlick');
	                if(!target.unslicked) {
	                    target.slideHandler(index, true);
	                }
	            });
	        }
	
	    };
	
	    Slick.prototype.applyTransition = function(slide) {
	
	        var _ = this,
	            transition = {};
	
	        if (_.options.fade === false) {
	            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
	        } else {
	            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
	        }
	
	        if (_.options.fade === false) {
	            _.$slideTrack.css(transition);
	        } else {
	            _.$slides.eq(slide).css(transition);
	        }
	
	    };
	
	    Slick.prototype.autoPlay = function() {
	
	        var _ = this;
	
	        _.autoPlayClear();
	
	        if ( _.slideCount > _.options.slidesToShow ) {
	            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
	        }
	
	    };
	
	    Slick.prototype.autoPlayClear = function() {
	
	        var _ = this;
	
	        if (_.autoPlayTimer) {
	            clearInterval(_.autoPlayTimer);
	        }
	
	    };
	
	    Slick.prototype.autoPlayIterator = function() {
	
	        var _ = this,
	            slideTo = _.currentSlide + _.options.slidesToScroll;
	
	        if ( !_.paused && !_.interrupted && !_.focussed ) {
	
	            if ( _.options.infinite === false ) {
	
	                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
	                    _.direction = 0;
	                }
	
	                else if ( _.direction === 0 ) {
	
	                    slideTo = _.currentSlide - _.options.slidesToScroll;
	
	                    if ( _.currentSlide - 1 === 0 ) {
	                        _.direction = 1;
	                    }
	
	                }
	
	            }
	
	            _.slideHandler( slideTo );
	
	        }
	
	    };
	
	    Slick.prototype.buildArrows = function() {
	
	        var _ = this;
	
	        if (_.options.arrows === true ) {
	
	            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
	            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');
	
	            if( _.slideCount > _.options.slidesToShow ) {
	
	                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
	                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
	
	                if (_.htmlExpr.test(_.options.prevArrow)) {
	                    _.$prevArrow.prependTo(_.options.appendArrows);
	                }
	
	                if (_.htmlExpr.test(_.options.nextArrow)) {
	                    _.$nextArrow.appendTo(_.options.appendArrows);
	                }
	
	                if (_.options.infinite !== true) {
	                    _.$prevArrow
	                        .addClass('slick-disabled')
	                        .attr('aria-disabled', 'true');
	                }
	
	            } else {
	
	                _.$prevArrow.add( _.$nextArrow )
	
	                    .addClass('slick-hidden')
	                    .attr({
	                        'aria-disabled': 'true',
	                        'tabindex': '-1'
	                    });
	
	            }
	
	        }
	
	    };
	
	    Slick.prototype.buildDots = function() {
	
	        var _ = this,
	            i, dot;
	
	        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
	
	            _.$slider.addClass('slick-dotted');
	
	            dot = $('<ul />').addClass(_.options.dotsClass);
	
	            for (i = 0; i <= _.getDotCount(); i += 1) {
	                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
	            }
	
	            _.$dots = dot.appendTo(_.options.appendDots);
	
	            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');
	
	        }
	
	    };
	
	    Slick.prototype.buildOut = function() {
	
	        var _ = this;
	
	        _.$slides =
	            _.$slider
	                .children( _.options.slide + ':not(.slick-cloned)')
	                .addClass('slick-slide');
	
	        _.slideCount = _.$slides.length;
	
	        _.$slides.each(function(index, element) {
	            $(element)
	                .attr('data-slick-index', index)
	                .data('originalStyling', $(element).attr('style') || '');
	        });
	
	        _.$slider.addClass('slick-slider');
	
	        _.$slideTrack = (_.slideCount === 0) ?
	            $('<div class="slick-track"/>').appendTo(_.$slider) :
	            _.$slides.wrapAll('<div class="slick-track"/>').parent();
	
	        _.$list = _.$slideTrack.wrap(
	            '<div aria-live="polite" class="slick-list"/>').parent();
	        _.$slideTrack.css('opacity', 0);
	
	        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
	            _.options.slidesToScroll = 1;
	        }
	
	        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');
	
	        _.setupInfinite();
	
	        _.buildArrows();
	
	        _.buildDots();
	
	        _.updateDots();
	
	
	        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
	
	        if (_.options.draggable === true) {
	            _.$list.addClass('draggable');
	        }
	
	    };
	
	    Slick.prototype.buildRows = function() {
	
	        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;
	
	        newSlides = document.createDocumentFragment();
	        originalSlides = _.$slider.children();
	
	        if(_.options.rows > 1) {
	
	            slidesPerSection = _.options.slidesPerRow * _.options.rows;
	            numOfSlides = Math.ceil(
	                originalSlides.length / slidesPerSection
	            );
	
	            for(a = 0; a < numOfSlides; a++){
	                var slide = document.createElement('div');
	                for(b = 0; b < _.options.rows; b++) {
	                    var row = document.createElement('div');
	                    for(c = 0; c < _.options.slidesPerRow; c++) {
	                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
	                        if (originalSlides.get(target)) {
	                            row.appendChild(originalSlides.get(target));
	                        }
	                    }
	                    slide.appendChild(row);
	                }
	                newSlides.appendChild(slide);
	            }
	
	            _.$slider.empty().append(newSlides);
	            _.$slider.children().children().children()
	                .css({
	                    'width':(100 / _.options.slidesPerRow) + '%',
	                    'display': 'inline-block'
	                });
	
	        }
	
	    };
	
	    Slick.prototype.checkResponsive = function(initial, forceUpdate) {
	
	        var _ = this,
	            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
	        var sliderWidth = _.$slider.width();
	        var windowWidth = window.innerWidth || $(window).width();
	
	        if (_.respondTo === 'window') {
	            respondToWidth = windowWidth;
	        } else if (_.respondTo === 'slider') {
	            respondToWidth = sliderWidth;
	        } else if (_.respondTo === 'min') {
	            respondToWidth = Math.min(windowWidth, sliderWidth);
	        }
	
	        if ( _.options.responsive &&
	            _.options.responsive.length &&
	            _.options.responsive !== null) {
	
	            targetBreakpoint = null;
	
	            for (breakpoint in _.breakpoints) {
	                if (_.breakpoints.hasOwnProperty(breakpoint)) {
	                    if (_.originalSettings.mobileFirst === false) {
	                        if (respondToWidth < _.breakpoints[breakpoint]) {
	                            targetBreakpoint = _.breakpoints[breakpoint];
	                        }
	                    } else {
	                        if (respondToWidth > _.breakpoints[breakpoint]) {
	                            targetBreakpoint = _.breakpoints[breakpoint];
	                        }
	                    }
	                }
	            }
	
	            if (targetBreakpoint !== null) {
	                if (_.activeBreakpoint !== null) {
	                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
	                        _.activeBreakpoint =
	                            targetBreakpoint;
	                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
	                            _.unslick(targetBreakpoint);
	                        } else {
	                            _.options = $.extend({}, _.originalSettings,
	                                _.breakpointSettings[
	                                    targetBreakpoint]);
	                            if (initial === true) {
	                                _.currentSlide = _.options.initialSlide;
	                            }
	                            _.refresh(initial);
	                        }
	                        triggerBreakpoint = targetBreakpoint;
	                    }
	                } else {
	                    _.activeBreakpoint = targetBreakpoint;
	                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
	                        _.unslick(targetBreakpoint);
	                    } else {
	                        _.options = $.extend({}, _.originalSettings,
	                            _.breakpointSettings[
	                                targetBreakpoint]);
	                        if (initial === true) {
	                            _.currentSlide = _.options.initialSlide;
	                        }
	                        _.refresh(initial);
	                    }
	                    triggerBreakpoint = targetBreakpoint;
	                }
	            } else {
	                if (_.activeBreakpoint !== null) {
	                    _.activeBreakpoint = null;
	                    _.options = _.originalSettings;
	                    if (initial === true) {
	                        _.currentSlide = _.options.initialSlide;
	                    }
	                    _.refresh(initial);
	                    triggerBreakpoint = targetBreakpoint;
	                }
	            }
	
	            // only trigger breakpoints during an actual break. not on initialize.
	            if( !initial && triggerBreakpoint !== false ) {
	                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
	            }
	        }
	
	    };
	
	    Slick.prototype.changeSlide = function(event, dontAnimate) {
	
	        var _ = this,
	            $target = $(event.currentTarget),
	            indexOffset, slideOffset, unevenOffset;
	
	        // If target is a link, prevent default action.
	        if($target.is('a')) {
	            event.preventDefault();
	        }
	
	        // If target is not the <li> element (ie: a child), find the <li>.
	        if(!$target.is('li')) {
	            $target = $target.closest('li');
	        }
	
	        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
	        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
	
	        switch (event.data.message) {
	
	            case 'previous':
	                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
	                if (_.slideCount > _.options.slidesToShow) {
	                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
	                }
	                break;
	
	            case 'next':
	                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
	                if (_.slideCount > _.options.slidesToShow) {
	                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
	                }
	                break;
	
	            case 'index':
	                var index = event.data.index === 0 ? 0 :
	                    event.data.index || $target.index() * _.options.slidesToScroll;
	
	                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
	                $target.children().trigger('focus');
	                break;
	
	            default:
	                return;
	        }
	
	    };
	
	    Slick.prototype.checkNavigable = function(index) {
	
	        var _ = this,
	            navigables, prevNavigable;
	
	        navigables = _.getNavigableIndexes();
	        prevNavigable = 0;
	        if (index > navigables[navigables.length - 1]) {
	            index = navigables[navigables.length - 1];
	        } else {
	            for (var n in navigables) {
	                if (index < navigables[n]) {
	                    index = prevNavigable;
	                    break;
	                }
	                prevNavigable = navigables[n];
	            }
	        }
	
	        return index;
	    };
	
	    Slick.prototype.cleanUpEvents = function() {
	
	        var _ = this;
	
	        if (_.options.dots && _.$dots !== null) {
	
	            $('li', _.$dots)
	                .off('click.slick', _.changeSlide)
	                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
	                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));
	
	        }
	
	        _.$slider.off('focus.slick blur.slick');
	
	        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
	            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
	            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
	        }
	
	        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
	        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
	        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
	        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);
	
	        _.$list.off('click.slick', _.clickHandler);
	
	        $(document).off(_.visibilityChange, _.visibility);
	
	        _.cleanUpSlideEvents();
	
	        if (_.options.accessibility === true) {
	            _.$list.off('keydown.slick', _.keyHandler);
	        }
	
	        if (_.options.focusOnSelect === true) {
	            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
	        }
	
	        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
	
	        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
	
	        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
	
	        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
	        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
	
	    };
	
	    Slick.prototype.cleanUpSlideEvents = function() {
	
	        var _ = this;
	
	        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
	        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
	
	    };
	
	    Slick.prototype.cleanUpRows = function() {
	
	        var _ = this, originalSlides;
	
	        if(_.options.rows > 1) {
	            originalSlides = _.$slides.children().children();
	            originalSlides.removeAttr('style');
	            _.$slider.empty().append(originalSlides);
	        }
	
	    };
	
	    Slick.prototype.clickHandler = function(event) {
	
	        var _ = this;
	
	        if (_.shouldClick === false) {
	            event.stopImmediatePropagation();
	            event.stopPropagation();
	            event.preventDefault();
	        }
	
	    };
	
	    Slick.prototype.destroy = function(refresh) {
	
	        var _ = this;
	
	        _.autoPlayClear();
	
	        _.touchObject = {};
	
	        _.cleanUpEvents();
	
	        $('.slick-cloned', _.$slider).detach();
	
	        if (_.$dots) {
	            _.$dots.remove();
	        }
	
	
	        if ( _.$prevArrow && _.$prevArrow.length ) {
	
	            _.$prevArrow
	                .removeClass('slick-disabled slick-arrow slick-hidden')
	                .removeAttr('aria-hidden aria-disabled tabindex')
	                .css('display','');
	
	            if ( _.htmlExpr.test( _.options.prevArrow )) {
	                _.$prevArrow.remove();
	            }
	        }
	
	        if ( _.$nextArrow && _.$nextArrow.length ) {
	
	            _.$nextArrow
	                .removeClass('slick-disabled slick-arrow slick-hidden')
	                .removeAttr('aria-hidden aria-disabled tabindex')
	                .css('display','');
	
	            if ( _.htmlExpr.test( _.options.nextArrow )) {
	                _.$nextArrow.remove();
	            }
	
	        }
	
	
	        if (_.$slides) {
	
	            _.$slides
	                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
	                .removeAttr('aria-hidden')
	                .removeAttr('data-slick-index')
	                .each(function(){
	                    $(this).attr('style', $(this).data('originalStyling'));
	                });
	
	            _.$slideTrack.children(this.options.slide).detach();
	
	            _.$slideTrack.detach();
	
	            _.$list.detach();
	
	            _.$slider.append(_.$slides);
	        }
	
	        _.cleanUpRows();
	
	        _.$slider.removeClass('slick-slider');
	        _.$slider.removeClass('slick-initialized');
	        _.$slider.removeClass('slick-dotted');
	
	        _.unslicked = true;
	
	        if(!refresh) {
	            _.$slider.trigger('destroy', [_]);
	        }
	
	    };
	
	    Slick.prototype.disableTransition = function(slide) {
	
	        var _ = this,
	            transition = {};
	
	        transition[_.transitionType] = '';
	
	        if (_.options.fade === false) {
	            _.$slideTrack.css(transition);
	        } else {
	            _.$slides.eq(slide).css(transition);
	        }
	
	    };
	
	    Slick.prototype.fadeSlide = function(slideIndex, callback) {
	
	        var _ = this;
	
	        if (_.cssTransitions === false) {
	
	            _.$slides.eq(slideIndex).css({
	                zIndex: _.options.zIndex
	            });
	
	            _.$slides.eq(slideIndex).animate({
	                opacity: 1
	            }, _.options.speed, _.options.easing, callback);
	
	        } else {
	
	            _.applyTransition(slideIndex);
	
	            _.$slides.eq(slideIndex).css({
	                opacity: 1,
	                zIndex: _.options.zIndex
	            });
	
	            if (callback) {
	                setTimeout(function() {
	
	                    _.disableTransition(slideIndex);
	
	                    callback.call();
	                }, _.options.speed);
	            }
	
	        }
	
	    };
	
	    Slick.prototype.fadeSlideOut = function(slideIndex) {
	
	        var _ = this;
	
	        if (_.cssTransitions === false) {
	
	            _.$slides.eq(slideIndex).animate({
	                opacity: 0,
	                zIndex: _.options.zIndex - 2
	            }, _.options.speed, _.options.easing);
	
	        } else {
	
	            _.applyTransition(slideIndex);
	
	            _.$slides.eq(slideIndex).css({
	                opacity: 0,
	                zIndex: _.options.zIndex - 2
	            });
	
	        }
	
	    };
	
	    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {
	
	        var _ = this;
	
	        if (filter !== null) {
	
	            _.$slidesCache = _.$slides;
	
	            _.unload();
	
	            _.$slideTrack.children(this.options.slide).detach();
	
	            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
	
	            _.reinit();
	
	        }
	
	    };
	
	    Slick.prototype.focusHandler = function() {
	
	        var _ = this;
	
	        _.$slider
	            .off('focus.slick blur.slick')
	            .on('focus.slick blur.slick',
	                '*:not(.slick-arrow)', function(event) {
	
	            event.stopImmediatePropagation();
	            var $sf = $(this);
	
	            setTimeout(function() {
	
	                if( _.options.pauseOnFocus ) {
	                    _.focussed = $sf.is(':focus');
	                    _.autoPlay();
	                }
	
	            }, 0);
	
	        });
	    };
	
	    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {
	
	        var _ = this;
	        return _.currentSlide;
	
	    };
	
	    Slick.prototype.getDotCount = function() {
	
	        var _ = this;
	
	        var breakPoint = 0;
	        var counter = 0;
	        var pagerQty = 0;
	
	        if (_.options.infinite === true) {
	            while (breakPoint < _.slideCount) {
	                ++pagerQty;
	                breakPoint = counter + _.options.slidesToScroll;
	                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
	            }
	        } else if (_.options.centerMode === true) {
	            pagerQty = _.slideCount;
	        } else if(!_.options.asNavFor) {
	            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
	        }else {
	            while (breakPoint < _.slideCount) {
	                ++pagerQty;
	                breakPoint = counter + _.options.slidesToScroll;
	                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
	            }
	        }
	
	        return pagerQty - 1;
	
	    };
	
	    Slick.prototype.getLeft = function(slideIndex) {
	
	        var _ = this,
	            targetLeft,
	            verticalHeight,
	            verticalOffset = 0,
	            targetSlide;
	
	        _.slideOffset = 0;
	        verticalHeight = _.$slides.first().outerHeight(true);
	
	        if (_.options.infinite === true) {
	            if (_.slideCount > _.options.slidesToShow) {
	                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
	                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
	            }
	            if (_.slideCount % _.options.slidesToScroll !== 0) {
	                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
	                    if (slideIndex > _.slideCount) {
	                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
	                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
	                    } else {
	                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
	                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
	                    }
	                }
	            }
	        } else {
	            if (slideIndex + _.options.slidesToShow > _.slideCount) {
	                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
	                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
	            }
	        }
	
	        if (_.slideCount <= _.options.slidesToShow) {
	            _.slideOffset = 0;
	            verticalOffset = 0;
	        }
	
	        if (_.options.centerMode === true && _.options.infinite === true) {
	            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
	        } else if (_.options.centerMode === true) {
	            _.slideOffset = 0;
	            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
	        }
	
	        if (_.options.vertical === false) {
	            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
	        } else {
	            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
	        }
	
	        if (_.options.variableWidth === true) {
	
	            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
	                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
	            } else {
	                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
	            }
	
	            if (_.options.rtl === true) {
	                if (targetSlide[0]) {
	                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
	                } else {
	                    targetLeft =  0;
	                }
	            } else {
	                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
	            }
	
	            if (_.options.centerMode === true) {
	                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
	                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
	                } else {
	                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
	                }
	
	                if (_.options.rtl === true) {
	                    if (targetSlide[0]) {
	                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
	                    } else {
	                        targetLeft =  0;
	                    }
	                } else {
	                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
	                }
	
	                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
	            }
	        }
	
	        return targetLeft;
	
	    };
	
	    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {
	
	        var _ = this;
	
	        return _.options[option];
	
	    };
	
	    Slick.prototype.getNavigableIndexes = function() {
	
	        var _ = this,
	            breakPoint = 0,
	            counter = 0,
	            indexes = [],
	            max;
	
	        if (_.options.infinite === false) {
	            max = _.slideCount;
	        } else {
	            breakPoint = _.options.slidesToScroll * -1;
	            counter = _.options.slidesToScroll * -1;
	            max = _.slideCount * 2;
	        }
	
	        while (breakPoint < max) {
	            indexes.push(breakPoint);
	            breakPoint = counter + _.options.slidesToScroll;
	            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
	        }
	
	        return indexes;
	
	    };
	
	    Slick.prototype.getSlick = function() {
	
	        return this;
	
	    };
	
	    Slick.prototype.getSlideCount = function() {
	
	        var _ = this,
	            slidesTraversed, swipedSlide, centerOffset;
	
	        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
	
	        if (_.options.swipeToSlide === true) {
	            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
	                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
	                    swipedSlide = slide;
	                    return false;
	                }
	            });
	
	            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
	
	            return slidesTraversed;
	
	        } else {
	            return _.options.slidesToScroll;
	        }
	
	    };
	
	    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {
	
	        var _ = this;
	
	        _.changeSlide({
	            data: {
	                message: 'index',
	                index: parseInt(slide)
	            }
	        }, dontAnimate);
	
	    };
	
	    Slick.prototype.init = function(creation) {
	
	        var _ = this;
	
	        if (!$(_.$slider).hasClass('slick-initialized')) {
	
	            $(_.$slider).addClass('slick-initialized');
	
	            _.buildRows();
	            _.buildOut();
	            _.setProps();
	            _.startLoad();
	            _.loadSlider();
	            _.initializeEvents();
	            _.updateArrows();
	            _.updateDots();
	            _.checkResponsive(true);
	            _.focusHandler();
	
	        }
	
	        if (creation) {
	            _.$slider.trigger('init', [_]);
	        }
	
	        if (_.options.accessibility === true) {
	            _.initADA();
	        }
	
	        if ( _.options.autoplay ) {
	
	            _.paused = false;
	            _.autoPlay();
	
	        }
	
	    };
	
	    Slick.prototype.initADA = function() {
	        var _ = this;
	        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
	            'aria-hidden': 'true',
	            'tabindex': '-1'
	        }).find('a, input, button, select').attr({
	            'tabindex': '-1'
	        });
	
	        _.$slideTrack.attr('role', 'listbox');
	
	        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
	            $(this).attr({
	                'role': 'option',
	                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
	            });
	        });
	
	        if (_.$dots !== null) {
	            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
	                $(this).attr({
	                    'role': 'presentation',
	                    'aria-selected': 'false',
	                    'aria-controls': 'navigation' + _.instanceUid + i + '',
	                    'id': 'slick-slide' + _.instanceUid + i + ''
	                });
	            })
	                .first().attr('aria-selected', 'true').end()
	                .find('button').attr('role', 'button').end()
	                .closest('div').attr('role', 'toolbar');
	        }
	        _.activateADA();
	
	    };
	
	    Slick.prototype.initArrowEvents = function() {
	
	        var _ = this;
	
	        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
	            _.$prevArrow
	               .off('click.slick')
	               .on('click.slick', {
	                    message: 'previous'
	               }, _.changeSlide);
	            _.$nextArrow
	               .off('click.slick')
	               .on('click.slick', {
	                    message: 'next'
	               }, _.changeSlide);
	        }
	
	    };
	
	    Slick.prototype.initDotEvents = function() {
	
	        var _ = this;
	
	        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
	            $('li', _.$dots).on('click.slick', {
	                message: 'index'
	            }, _.changeSlide);
	        }
	
	        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {
	
	            $('li', _.$dots)
	                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
	                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));
	
	        }
	
	    };
	
	    Slick.prototype.initSlideEvents = function() {
	
	        var _ = this;
	
	        if ( _.options.pauseOnHover ) {
	
	            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
	            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
	
	        }
	
	    };
	
	    Slick.prototype.initializeEvents = function() {
	
	        var _ = this;
	
	        _.initArrowEvents();
	
	        _.initDotEvents();
	        _.initSlideEvents();
	
	        _.$list.on('touchstart.slick mousedown.slick', {
	            action: 'start'
	        }, _.swipeHandler);
	        _.$list.on('touchmove.slick mousemove.slick', {
	            action: 'move'
	        }, _.swipeHandler);
	        _.$list.on('touchend.slick mouseup.slick', {
	            action: 'end'
	        }, _.swipeHandler);
	        _.$list.on('touchcancel.slick mouseleave.slick', {
	            action: 'end'
	        }, _.swipeHandler);
	
	        _.$list.on('click.slick', _.clickHandler);
	
	        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
	
	        if (_.options.accessibility === true) {
	            _.$list.on('keydown.slick', _.keyHandler);
	        }
	
	        if (_.options.focusOnSelect === true) {
	            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
	        }
	
	        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
	
	        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
	
	        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
	
	        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
	        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);
	
	    };
	
	    Slick.prototype.initUI = function() {
	
	        var _ = this;
	
	        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
	
	            _.$prevArrow.show();
	            _.$nextArrow.show();
	
	        }
	
	        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
	
	            _.$dots.show();
	
	        }
	
	    };
	
	    Slick.prototype.keyHandler = function(event) {
	
	        var _ = this;
	         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
	        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
	            if (event.keyCode === 37 && _.options.accessibility === true) {
	                _.changeSlide({
	                    data: {
	                        message: _.options.rtl === true ? 'next' :  'previous'
	                    }
	                });
	            } else if (event.keyCode === 39 && _.options.accessibility === true) {
	                _.changeSlide({
	                    data: {
	                        message: _.options.rtl === true ? 'previous' : 'next'
	                    }
	                });
	            }
	        }
	
	    };
	
	    Slick.prototype.lazyLoad = function() {
	
	        var _ = this,
	            loadRange, cloneRange, rangeStart, rangeEnd;
	
	        function loadImages(imagesScope) {
	
	            $('img[data-lazy]', imagesScope).each(function() {
	
	                var image = $(this),
	                    imageSource = $(this).attr('data-lazy'),
	                    imageToLoad = document.createElement('img');
	
	                imageToLoad.onload = function() {
	
	                    image
	                        .animate({ opacity: 0 }, 100, function() {
	                            image
	                                .attr('src', imageSource)
	                                .animate({ opacity: 1 }, 200, function() {
	                                    image
	                                        .removeAttr('data-lazy')
	                                        .removeClass('slick-loading');
	                                });
	                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
	                        });
	
	                };
	
	                imageToLoad.onerror = function() {
	
	                    image
	                        .removeAttr( 'data-lazy' )
	                        .removeClass( 'slick-loading' )
	                        .addClass( 'slick-lazyload-error' );
	
	                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
	
	                };
	
	                imageToLoad.src = imageSource;
	
	            });
	
	        }
	
	        if (_.options.centerMode === true) {
	            if (_.options.infinite === true) {
	                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
	                rangeEnd = rangeStart + _.options.slidesToShow + 2;
	            } else {
	                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
	                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
	            }
	        } else {
	            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
	            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
	            if (_.options.fade === true) {
	                if (rangeStart > 0) rangeStart--;
	                if (rangeEnd <= _.slideCount) rangeEnd++;
	            }
	        }
	
	        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
	        loadImages(loadRange);
	
	        if (_.slideCount <= _.options.slidesToShow) {
	            cloneRange = _.$slider.find('.slick-slide');
	            loadImages(cloneRange);
	        } else
	        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
	            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
	            loadImages(cloneRange);
	        } else if (_.currentSlide === 0) {
	            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
	            loadImages(cloneRange);
	        }
	
	    };
	
	    Slick.prototype.loadSlider = function() {
	
	        var _ = this;
	
	        _.setPosition();
	
	        _.$slideTrack.css({
	            opacity: 1
	        });
	
	        _.$slider.removeClass('slick-loading');
	
	        _.initUI();
	
	        if (_.options.lazyLoad === 'progressive') {
	            _.progressiveLazyLoad();
	        }
	
	    };
	
	    Slick.prototype.next = Slick.prototype.slickNext = function() {
	
	        var _ = this;
	
	        _.changeSlide({
	            data: {
	                message: 'next'
	            }
	        });
	
	    };
	
	    Slick.prototype.orientationChange = function() {
	
	        var _ = this;
	
	        _.checkResponsive();
	        _.setPosition();
	
	    };
	
	    Slick.prototype.pause = Slick.prototype.slickPause = function() {
	
	        var _ = this;
	
	        _.autoPlayClear();
	        _.paused = true;
	
	    };
	
	    Slick.prototype.play = Slick.prototype.slickPlay = function() {
	
	        var _ = this;
	
	        _.autoPlay();
	        _.options.autoplay = true;
	        _.paused = false;
	        _.focussed = false;
	        _.interrupted = false;
	
	    };
	
	    Slick.prototype.postSlide = function(index) {
	
	        var _ = this;
	
	        if( !_.unslicked ) {
	
	            _.$slider.trigger('afterChange', [_, index]);
	
	            _.animating = false;
	
	            _.setPosition();
	
	            _.swipeLeft = null;
	
	            if ( _.options.autoplay ) {
	                _.autoPlay();
	            }
	
	            if (_.options.accessibility === true) {
	                _.initADA();
	            }
	
	        }
	
	    };
	
	    Slick.prototype.prev = Slick.prototype.slickPrev = function() {
	
	        var _ = this;
	
	        _.changeSlide({
	            data: {
	                message: 'previous'
	            }
	        });
	
	    };
	
	    Slick.prototype.preventDefault = function(event) {
	
	        event.preventDefault();
	
	    };
	
	    Slick.prototype.progressiveLazyLoad = function( tryCount ) {
	
	        tryCount = tryCount || 1;
	
	        var _ = this,
	            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
	            image,
	            imageSource,
	            imageToLoad;
	
	        if ( $imgsToLoad.length ) {
	
	            image = $imgsToLoad.first();
	            imageSource = image.attr('data-lazy');
	            imageToLoad = document.createElement('img');
	
	            imageToLoad.onload = function() {
	
	                image
	                    .attr( 'src', imageSource )
	                    .removeAttr('data-lazy')
	                    .removeClass('slick-loading');
	
	                if ( _.options.adaptiveHeight === true ) {
	                    _.setPosition();
	                }
	
	                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
	                _.progressiveLazyLoad();
	
	            };
	
	            imageToLoad.onerror = function() {
	
	                if ( tryCount < 3 ) {
	
	                    /**
	                     * try to load the image 3 times,
	                     * leave a slight delay so we don't get
	                     * servers blocking the request.
	                     */
	                    setTimeout( function() {
	                        _.progressiveLazyLoad( tryCount + 1 );
	                    }, 500 );
	
	                } else {
	
	                    image
	                        .removeAttr( 'data-lazy' )
	                        .removeClass( 'slick-loading' )
	                        .addClass( 'slick-lazyload-error' );
	
	                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
	
	                    _.progressiveLazyLoad();
	
	                }
	
	            };
	
	            imageToLoad.src = imageSource;
	
	        } else {
	
	            _.$slider.trigger('allImagesLoaded', [ _ ]);
	
	        }
	
	    };
	
	    Slick.prototype.refresh = function( initializing ) {
	
	        var _ = this, currentSlide, lastVisibleIndex;
	
	        lastVisibleIndex = _.slideCount - _.options.slidesToShow;
	
	        // in non-infinite sliders, we don't want to go past the
	        // last visible index.
	        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
	            _.currentSlide = lastVisibleIndex;
	        }
	
	        // if less slides than to show, go to start.
	        if ( _.slideCount <= _.options.slidesToShow ) {
	            _.currentSlide = 0;
	
	        }
	
	        currentSlide = _.currentSlide;
	
	        _.destroy(true);
	
	        $.extend(_, _.initials, { currentSlide: currentSlide });
	
	        _.init();
	
	        if( !initializing ) {
	
	            _.changeSlide({
	                data: {
	                    message: 'index',
	                    index: currentSlide
	                }
	            }, false);
	
	        }
	
	    };
	
	    Slick.prototype.registerBreakpoints = function() {
	
	        var _ = this, breakpoint, currentBreakpoint, l,
	            responsiveSettings = _.options.responsive || null;
	
	        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {
	
	            _.respondTo = _.options.respondTo || 'window';
	
	            for ( breakpoint in responsiveSettings ) {
	
	                l = _.breakpoints.length-1;
	                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
	
	                if (responsiveSettings.hasOwnProperty(breakpoint)) {
	
	                    // loop through the breakpoints and cut out any existing
	                    // ones with the same breakpoint number, we don't want dupes.
	                    while( l >= 0 ) {
	                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
	                            _.breakpoints.splice(l,1);
	                        }
	                        l--;
	                    }
	
	                    _.breakpoints.push(currentBreakpoint);
	                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
	
	                }
	
	            }
	
	            _.breakpoints.sort(function(a, b) {
	                return ( _.options.mobileFirst ) ? a-b : b-a;
	            });
	
	        }
	
	    };
	
	    Slick.prototype.reinit = function() {
	
	        var _ = this;
	
	        _.$slides =
	            _.$slideTrack
	                .children(_.options.slide)
	                .addClass('slick-slide');
	
	        _.slideCount = _.$slides.length;
	
	        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
	            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
	        }
	
	        if (_.slideCount <= _.options.slidesToShow) {
	            _.currentSlide = 0;
	        }
	
	        _.registerBreakpoints();
	
	        _.setProps();
	        _.setupInfinite();
	        _.buildArrows();
	        _.updateArrows();
	        _.initArrowEvents();
	        _.buildDots();
	        _.updateDots();
	        _.initDotEvents();
	        _.cleanUpSlideEvents();
	        _.initSlideEvents();
	
	        _.checkResponsive(false, true);
	
	        if (_.options.focusOnSelect === true) {
	            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
	        }
	
	        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
	
	        _.setPosition();
	        _.focusHandler();
	
	        _.paused = !_.options.autoplay;
	        _.autoPlay();
	
	        _.$slider.trigger('reInit', [_]);
	
	    };
	
	    Slick.prototype.resize = function() {
	
	        var _ = this;
	
	        if ($(window).width() !== _.windowWidth) {
	            clearTimeout(_.windowDelay);
	            _.windowDelay = window.setTimeout(function() {
	                _.windowWidth = $(window).width();
	                _.checkResponsive();
	                if( !_.unslicked ) { _.setPosition(); }
	            }, 50);
	        }
	    };
	
	    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {
	
	        var _ = this;
	
	        if (typeof(index) === 'boolean') {
	            removeBefore = index;
	            index = removeBefore === true ? 0 : _.slideCount - 1;
	        } else {
	            index = removeBefore === true ? --index : index;
	        }
	
	        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
	            return false;
	        }
	
	        _.unload();
	
	        if (removeAll === true) {
	            _.$slideTrack.children().remove();
	        } else {
	            _.$slideTrack.children(this.options.slide).eq(index).remove();
	        }
	
	        _.$slides = _.$slideTrack.children(this.options.slide);
	
	        _.$slideTrack.children(this.options.slide).detach();
	
	        _.$slideTrack.append(_.$slides);
	
	        _.$slidesCache = _.$slides;
	
	        _.reinit();
	
	    };
	
	    Slick.prototype.setCSS = function(position) {
	
	        var _ = this,
	            positionProps = {},
	            x, y;
	
	        if (_.options.rtl === true) {
	            position = -position;
	        }
	        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
	        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
	
	        positionProps[_.positionProp] = position;
	
	        if (_.transformsEnabled === false) {
	            _.$slideTrack.css(positionProps);
	        } else {
	            positionProps = {};
	            if (_.cssTransitions === false) {
	                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
	                _.$slideTrack.css(positionProps);
	            } else {
	                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
	                _.$slideTrack.css(positionProps);
	            }
	        }
	
	    };
	
	    Slick.prototype.setDimensions = function() {
	
	        var _ = this;
	
	        if (_.options.vertical === false) {
	            if (_.options.centerMode === true) {
	                _.$list.css({
	                    padding: ('0px ' + _.options.centerPadding)
	                });
	            }
	        } else {
	            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
	            if (_.options.centerMode === true) {
	                _.$list.css({
	                    padding: (_.options.centerPadding + ' 0px')
	                });
	            }
	        }
	
	        _.listWidth = _.$list.width();
	        _.listHeight = _.$list.height();
	
	
	        if (_.options.vertical === false && _.options.variableWidth === false) {
	            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
	            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));
	
	        } else if (_.options.variableWidth === true) {
	            _.$slideTrack.width(5000 * _.slideCount);
	        } else {
	            _.slideWidth = Math.ceil(_.listWidth);
	            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
	        }
	
	        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
	        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
	
	    };
	
	    Slick.prototype.setFade = function() {
	
	        var _ = this,
	            targetLeft;
	
	        _.$slides.each(function(index, element) {
	            targetLeft = (_.slideWidth * index) * -1;
	            if (_.options.rtl === true) {
	                $(element).css({
	                    position: 'relative',
	                    right: targetLeft,
	                    top: 0,
	                    zIndex: _.options.zIndex - 2,
	                    opacity: 0
	                });
	            } else {
	                $(element).css({
	                    position: 'relative',
	                    left: targetLeft,
	                    top: 0,
	                    zIndex: _.options.zIndex - 2,
	                    opacity: 0
	                });
	            }
	        });
	
	        _.$slides.eq(_.currentSlide).css({
	            zIndex: _.options.zIndex - 1,
	            opacity: 1
	        });
	
	    };
	
	    Slick.prototype.setHeight = function() {
	
	        var _ = this;
	
	        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
	            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
	            _.$list.css('height', targetHeight);
	        }
	
	    };
	
	    Slick.prototype.setOption =
	    Slick.prototype.slickSetOption = function() {
	
	        /**
	         * accepts arguments in format of:
	         *
	         *  - for changing a single option's value:
	         *     .slick("setOption", option, value, refresh )
	         *
	         *  - for changing a set of responsive options:
	         *     .slick("setOption", 'responsive', [{}, ...], refresh )
	         *
	         *  - for updating multiple values at once (not responsive)
	         *     .slick("setOption", { 'option': value, ... }, refresh )
	         */
	
	        var _ = this, l, item, option, value, refresh = false, type;
	
	        if( $.type( arguments[0] ) === 'object' ) {
	
	            option =  arguments[0];
	            refresh = arguments[1];
	            type = 'multiple';
	
	        } else if ( $.type( arguments[0] ) === 'string' ) {
	
	            option =  arguments[0];
	            value = arguments[1];
	            refresh = arguments[2];
	
	            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {
	
	                type = 'responsive';
	
	            } else if ( typeof arguments[1] !== 'undefined' ) {
	
	                type = 'single';
	
	            }
	
	        }
	
	        if ( type === 'single' ) {
	
	            _.options[option] = value;
	
	
	        } else if ( type === 'multiple' ) {
	
	            $.each( option , function( opt, val ) {
	
	                _.options[opt] = val;
	
	            });
	
	
	        } else if ( type === 'responsive' ) {
	
	            for ( item in value ) {
	
	                if( $.type( _.options.responsive ) !== 'array' ) {
	
	                    _.options.responsive = [ value[item] ];
	
	                } else {
	
	                    l = _.options.responsive.length-1;
	
	                    // loop through the responsive object and splice out duplicates.
	                    while( l >= 0 ) {
	
	                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
	
	                            _.options.responsive.splice(l,1);
	
	                        }
	
	                        l--;
	
	                    }
	
	                    _.options.responsive.push( value[item] );
	
	                }
	
	            }
	
	        }
	
	        if ( refresh ) {
	
	            _.unload();
	            _.reinit();
	
	        }
	
	    };
	
	    Slick.prototype.setPosition = function() {
	
	        var _ = this;
	
	        _.setDimensions();
	
	        _.setHeight();
	
	        if (_.options.fade === false) {
	            _.setCSS(_.getLeft(_.currentSlide));
	        } else {
	            _.setFade();
	        }
	
	        _.$slider.trigger('setPosition', [_]);
	
	    };
	
	    Slick.prototype.setProps = function() {
	
	        var _ = this,
	            bodyStyle = document.body.style;
	
	        _.positionProp = _.options.vertical === true ? 'top' : 'left';
	
	        if (_.positionProp === 'top') {
	            _.$slider.addClass('slick-vertical');
	        } else {
	            _.$slider.removeClass('slick-vertical');
	        }
	
	        if (bodyStyle.WebkitTransition !== undefined ||
	            bodyStyle.MozTransition !== undefined ||
	            bodyStyle.msTransition !== undefined) {
	            if (_.options.useCSS === true) {
	                _.cssTransitions = true;
	            }
	        }
	
	        if ( _.options.fade ) {
	            if ( typeof _.options.zIndex === 'number' ) {
	                if( _.options.zIndex < 3 ) {
	                    _.options.zIndex = 3;
	                }
	            } else {
	                _.options.zIndex = _.defaults.zIndex;
	            }
	        }
	
	        if (bodyStyle.OTransform !== undefined) {
	            _.animType = 'OTransform';
	            _.transformType = '-o-transform';
	            _.transitionType = 'OTransition';
	            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
	        }
	        if (bodyStyle.MozTransform !== undefined) {
	            _.animType = 'MozTransform';
	            _.transformType = '-moz-transform';
	            _.transitionType = 'MozTransition';
	            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
	        }
	        if (bodyStyle.webkitTransform !== undefined) {
	            _.animType = 'webkitTransform';
	            _.transformType = '-webkit-transform';
	            _.transitionType = 'webkitTransition';
	            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
	        }
	        if (bodyStyle.msTransform !== undefined) {
	            _.animType = 'msTransform';
	            _.transformType = '-ms-transform';
	            _.transitionType = 'msTransition';
	            if (bodyStyle.msTransform === undefined) _.animType = false;
	        }
	        if (bodyStyle.transform !== undefined && _.animType !== false) {
	            _.animType = 'transform';
	            _.transformType = 'transform';
	            _.transitionType = 'transition';
	        }
	        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
	    };
	
	
	    Slick.prototype.setSlideClasses = function(index) {
	
	        var _ = this,
	            centerOffset, allSlides, indexOffset, remainder;
	
	        allSlides = _.$slider
	            .find('.slick-slide')
	            .removeClass('slick-active slick-center slick-current')
	            .attr('aria-hidden', 'true');
	
	        _.$slides
	            .eq(index)
	            .addClass('slick-current');
	
	        if (_.options.centerMode === true) {
	
	            centerOffset = Math.floor(_.options.slidesToShow / 2);
	
	            if (_.options.infinite === true) {
	
	                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
	
	                    _.$slides
	                        .slice(index - centerOffset, index + centerOffset + 1)
	                        .addClass('slick-active')
	                        .attr('aria-hidden', 'false');
	
	                } else {
	
	                    indexOffset = _.options.slidesToShow + index;
	                    allSlides
	                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
	                        .addClass('slick-active')
	                        .attr('aria-hidden', 'false');
	
	                }
	
	                if (index === 0) {
	
	                    allSlides
	                        .eq(allSlides.length - 1 - _.options.slidesToShow)
	                        .addClass('slick-center');
	
	                } else if (index === _.slideCount - 1) {
	
	                    allSlides
	                        .eq(_.options.slidesToShow)
	                        .addClass('slick-center');
	
	                }
	
	            }
	
	            _.$slides
	                .eq(index)
	                .addClass('slick-center');
	
	        } else {
	
	            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {
	
	                _.$slides
	                    .slice(index, index + _.options.slidesToShow)
	                    .addClass('slick-active')
	                    .attr('aria-hidden', 'false');
	
	            } else if (allSlides.length <= _.options.slidesToShow) {
	
	                allSlides
	                    .addClass('slick-active')
	                    .attr('aria-hidden', 'false');
	
	            } else {
	
	                remainder = _.slideCount % _.options.slidesToShow;
	                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
	
	                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
	
	                    allSlides
	                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
	                        .addClass('slick-active')
	                        .attr('aria-hidden', 'false');
	
	                } else {
	
	                    allSlides
	                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
	                        .addClass('slick-active')
	                        .attr('aria-hidden', 'false');
	
	                }
	
	            }
	
	        }
	
	        if (_.options.lazyLoad === 'ondemand') {
	            _.lazyLoad();
	        }
	
	    };
	
	    Slick.prototype.setupInfinite = function() {
	
	        var _ = this,
	            i, slideIndex, infiniteCount;
	
	        if (_.options.fade === true) {
	            _.options.centerMode = false;
	        }
	
	        if (_.options.infinite === true && _.options.fade === false) {
	
	            slideIndex = null;
	
	            if (_.slideCount > _.options.slidesToShow) {
	
	                if (_.options.centerMode === true) {
	                    infiniteCount = _.options.slidesToShow + 1;
	                } else {
	                    infiniteCount = _.options.slidesToShow;
	                }
	
	                for (i = _.slideCount; i > (_.slideCount -
	                        infiniteCount); i -= 1) {
	                    slideIndex = i - 1;
	                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
	                        .attr('data-slick-index', slideIndex - _.slideCount)
	                        .prependTo(_.$slideTrack).addClass('slick-cloned');
	                }
	                for (i = 0; i < infiniteCount; i += 1) {
	                    slideIndex = i;
	                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
	                        .attr('data-slick-index', slideIndex + _.slideCount)
	                        .appendTo(_.$slideTrack).addClass('slick-cloned');
	                }
	                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
	                    $(this).attr('id', '');
	                });
	
	            }
	
	        }
	
	    };
	
	    Slick.prototype.interrupt = function( toggle ) {
	
	        var _ = this;
	
	        if( !toggle ) {
	            _.autoPlay();
	        }
	        _.interrupted = toggle;
	
	    };
	
	    Slick.prototype.selectHandler = function(event) {
	
	        var _ = this;
	
	        var targetElement =
	            $(event.target).is('.slick-slide') ?
	                $(event.target) :
	                $(event.target).parents('.slick-slide');
	
	        var index = parseInt(targetElement.attr('data-slick-index'));
	
	        if (!index) index = 0;
	
	        if (_.slideCount <= _.options.slidesToShow) {
	
	            _.setSlideClasses(index);
	            _.asNavFor(index);
	            return;
	
	        }
	
	        _.slideHandler(index);
	
	    };
	
	    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {
	
	        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
	            _ = this, navTarget;
	
	        sync = sync || false;
	
	        if (_.animating === true && _.options.waitForAnimate === true) {
	            return;
	        }
	
	        if (_.options.fade === true && _.currentSlide === index) {
	            return;
	        }
	
	        if (_.slideCount <= _.options.slidesToShow) {
	            return;
	        }
	
	        if (sync === false) {
	            _.asNavFor(index);
	        }
	
	        targetSlide = index;
	        targetLeft = _.getLeft(targetSlide);
	        slideLeft = _.getLeft(_.currentSlide);
	
	        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
	
	        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
	            if (_.options.fade === false) {
	                targetSlide = _.currentSlide;
	                if (dontAnimate !== true) {
	                    _.animateSlide(slideLeft, function() {
	                        _.postSlide(targetSlide);
	                    });
	                } else {
	                    _.postSlide(targetSlide);
	                }
	            }
	            return;
	        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
	            if (_.options.fade === false) {
	                targetSlide = _.currentSlide;
	                if (dontAnimate !== true) {
	                    _.animateSlide(slideLeft, function() {
	                        _.postSlide(targetSlide);
	                    });
	                } else {
	                    _.postSlide(targetSlide);
	                }
	            }
	            return;
	        }
	
	        if ( _.options.autoplay ) {
	            clearInterval(_.autoPlayTimer);
	        }
	
	        if (targetSlide < 0) {
	            if (_.slideCount % _.options.slidesToScroll !== 0) {
	                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
	            } else {
	                animSlide = _.slideCount + targetSlide;
	            }
	        } else if (targetSlide >= _.slideCount) {
	            if (_.slideCount % _.options.slidesToScroll !== 0) {
	                animSlide = 0;
	            } else {
	                animSlide = targetSlide - _.slideCount;
	            }
	        } else {
	            animSlide = targetSlide;
	        }
	
	        _.animating = true;
	
	        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);
	
	        oldSlide = _.currentSlide;
	        _.currentSlide = animSlide;
	
	        _.setSlideClasses(_.currentSlide);
	
	        if ( _.options.asNavFor ) {
	
	            navTarget = _.getNavTarget();
	            navTarget = navTarget.slick('getSlick');
	
	            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
	                navTarget.setSlideClasses(_.currentSlide);
	            }
	
	        }
	
	        _.updateDots();
	        _.updateArrows();
	
	        if (_.options.fade === true) {
	            if (dontAnimate !== true) {
	
	                _.fadeSlideOut(oldSlide);
	
	                _.fadeSlide(animSlide, function() {
	                    _.postSlide(animSlide);
	                });
	
	            } else {
	                _.postSlide(animSlide);
	            }
	            _.animateHeight();
	            return;
	        }
	
	        if (dontAnimate !== true) {
	            _.animateSlide(targetLeft, function() {
	                _.postSlide(animSlide);
	            });
	        } else {
	            _.postSlide(animSlide);
	        }
	
	    };
	
	    Slick.prototype.startLoad = function() {
	
	        var _ = this;
	
	        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
	
	            _.$prevArrow.hide();
	            _.$nextArrow.hide();
	
	        }
	
	        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
	
	            _.$dots.hide();
	
	        }
	
	        _.$slider.addClass('slick-loading');
	
	    };
	
	    Slick.prototype.swipeDirection = function() {
	
	        var xDist, yDist, r, swipeAngle, _ = this;
	
	        xDist = _.touchObject.startX - _.touchObject.curX;
	        yDist = _.touchObject.startY - _.touchObject.curY;
	        r = Math.atan2(yDist, xDist);
	
	        swipeAngle = Math.round(r * 180 / Math.PI);
	        if (swipeAngle < 0) {
	            swipeAngle = 360 - Math.abs(swipeAngle);
	        }
	
	        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
	            return (_.options.rtl === false ? 'left' : 'right');
	        }
	        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
	            return (_.options.rtl === false ? 'left' : 'right');
	        }
	        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
	            return (_.options.rtl === false ? 'right' : 'left');
	        }
	        if (_.options.verticalSwiping === true) {
	            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
	                return 'down';
	            } else {
	                return 'up';
	            }
	        }
	
	        return 'vertical';
	
	    };
	
	    Slick.prototype.swipeEnd = function(event) {
	
	        var _ = this,
	            slideCount,
	            direction;
	
	        _.dragging = false;
	        _.interrupted = false;
	        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;
	
	        if ( _.touchObject.curX === undefined ) {
	            return false;
	        }
	
	        if ( _.touchObject.edgeHit === true ) {
	            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
	        }
	
	        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {
	
	            direction = _.swipeDirection();
	
	            switch ( direction ) {
	
	                case 'left':
	                case 'down':
	
	                    slideCount =
	                        _.options.swipeToSlide ?
	                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
	                            _.currentSlide + _.getSlideCount();
	
	                    _.currentDirection = 0;
	
	                    break;
	
	                case 'right':
	                case 'up':
	
	                    slideCount =
	                        _.options.swipeToSlide ?
	                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
	                            _.currentSlide - _.getSlideCount();
	
	                    _.currentDirection = 1;
	
	                    break;
	
	                default:
	
	
	            }
	
	            if( direction != 'vertical' ) {
	
	                _.slideHandler( slideCount );
	                _.touchObject = {};
	                _.$slider.trigger('swipe', [_, direction ]);
	
	            }
	
	        } else {
	
	            if ( _.touchObject.startX !== _.touchObject.curX ) {
	
	                _.slideHandler( _.currentSlide );
	                _.touchObject = {};
	
	            }
	
	        }
	
	    };
	
	    Slick.prototype.swipeHandler = function(event) {
	
	        var _ = this;
	
	        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
	            return;
	        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
	            return;
	        }
	
	        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
	            event.originalEvent.touches.length : 1;
	
	        _.touchObject.minSwipe = _.listWidth / _.options
	            .touchThreshold;
	
	        if (_.options.verticalSwiping === true) {
	            _.touchObject.minSwipe = _.listHeight / _.options
	                .touchThreshold;
	        }
	
	        switch (event.data.action) {
	
	            case 'start':
	                _.swipeStart(event);
	                break;
	
	            case 'move':
	                _.swipeMove(event);
	                break;
	
	            case 'end':
	                _.swipeEnd(event);
	                break;
	
	        }
	
	    };
	
	    Slick.prototype.swipeMove = function(event) {
	
	        var _ = this,
	            edgeWasHit = false,
	            curLeft, swipeDirection, swipeLength, positionOffset, touches;
	
	        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
	
	        if (!_.dragging || touches && touches.length !== 1) {
	            return false;
	        }
	
	        curLeft = _.getLeft(_.currentSlide);
	
	        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
	        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
	
	        _.touchObject.swipeLength = Math.round(Math.sqrt(
	            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
	
	        if (_.options.verticalSwiping === true) {
	            _.touchObject.swipeLength = Math.round(Math.sqrt(
	                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
	        }
	
	        swipeDirection = _.swipeDirection();
	
	        if (swipeDirection === 'vertical') {
	            return;
	        }
	
	        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
	            event.preventDefault();
	        }
	
	        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
	        if (_.options.verticalSwiping === true) {
	            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
	        }
	
	
	        swipeLength = _.touchObject.swipeLength;
	
	        _.touchObject.edgeHit = false;
	
	        if (_.options.infinite === false) {
	            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
	                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
	                _.touchObject.edgeHit = true;
	            }
	        }
	
	        if (_.options.vertical === false) {
	            _.swipeLeft = curLeft + swipeLength * positionOffset;
	        } else {
	            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
	        }
	        if (_.options.verticalSwiping === true) {
	            _.swipeLeft = curLeft + swipeLength * positionOffset;
	        }
	
	        if (_.options.fade === true || _.options.touchMove === false) {
	            return false;
	        }
	
	        if (_.animating === true) {
	            _.swipeLeft = null;
	            return false;
	        }
	
	        _.setCSS(_.swipeLeft);
	
	    };
	
	    Slick.prototype.swipeStart = function(event) {
	
	        var _ = this,
	            touches;
	
	        _.interrupted = true;
	
	        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
	            _.touchObject = {};
	            return false;
	        }
	
	        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
	            touches = event.originalEvent.touches[0];
	        }
	
	        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
	        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
	
	        _.dragging = true;
	
	    };
	
	    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {
	
	        var _ = this;
	
	        if (_.$slidesCache !== null) {
	
	            _.unload();
	
	            _.$slideTrack.children(this.options.slide).detach();
	
	            _.$slidesCache.appendTo(_.$slideTrack);
	
	            _.reinit();
	
	        }
	
	    };
	
	    Slick.prototype.unload = function() {
	
	        var _ = this;
	
	        $('.slick-cloned', _.$slider).remove();
	
	        if (_.$dots) {
	            _.$dots.remove();
	        }
	
	        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
	            _.$prevArrow.remove();
	        }
	
	        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
	            _.$nextArrow.remove();
	        }
	
	        _.$slides
	            .removeClass('slick-slide slick-active slick-visible slick-current')
	            .attr('aria-hidden', 'true')
	            .css('width', '');
	
	    };
	
	    Slick.prototype.unslick = function(fromBreakpoint) {
	
	        var _ = this;
	        _.$slider.trigger('unslick', [_, fromBreakpoint]);
	        _.destroy();
	
	    };
	
	    Slick.prototype.updateArrows = function() {
	
	        var _ = this,
	            centerOffset;
	
	        centerOffset = Math.floor(_.options.slidesToShow / 2);
	
	        if ( _.options.arrows === true &&
	            _.slideCount > _.options.slidesToShow &&
	            !_.options.infinite ) {
	
	            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
	            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
	
	            if (_.currentSlide === 0) {
	
	                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
	                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
	
	            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
	
	                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
	                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
	
	            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
	
	                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
	                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
	
	            }
	
	        }
	
	    };
	
	    Slick.prototype.updateDots = function() {
	
	        var _ = this;
	
	        if (_.$dots !== null) {
	
	            _.$dots
	                .find('li')
	                .removeClass('slick-active')
	                .attr('aria-hidden', 'true');
	
	            _.$dots
	                .find('li')
	                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
	                .addClass('slick-active')
	                .attr('aria-hidden', 'false');
	
	        }
	
	    };
	
	    Slick.prototype.visibility = function() {
	
	        var _ = this;
	
	        if ( _.options.autoplay ) {
	
	            if ( document[_.hidden] ) {
	
	                _.interrupted = true;
	
	            } else {
	
	                _.interrupted = false;
	
	            }
	
	        }
	
	    };
	
	    $.fn.slick = function() {
	        var _ = this,
	            opt = arguments[0],
	            args = Array.prototype.slice.call(arguments, 1),
	            l = _.length,
	            i,
	            ret;
	        for (i = 0; i < l; i++) {
	            if (typeof opt == 'object' || typeof opt == 'undefined')
	                _[i].slick = new Slick(_[i], opt);
	            else
	                ret = _[i].slick[opt].apply(_[i].slick, args);
	            if (typeof ret != 'undefined') return ret;
	        }
	        return _;
	    };
	
	}));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! picturefill - v3.0.2 - 2016-02-12
	 * https://scottjehl.github.io/picturefill/
	 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
	 */
	/*! Gecko-Picture - v1.0
	 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
	 * Firefox's early picture implementation (prior to FF41) is static and does
	 * not react to viewport changes. This tiny module fixes this.
	 */
	(function(window) {
		/*jshint eqnull:true */
		var ua = navigator.userAgent;
	
		if ( window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45) ) {
			addEventListener("resize", (function() {
				var timer;
	
				var dummySrc = document.createElement("source");
	
				var fixRespimg = function(img) {
					var source, sizes;
					var picture = img.parentNode;
	
					if (picture.nodeName.toUpperCase() === "PICTURE") {
						source = dummySrc.cloneNode();
	
						picture.insertBefore(source, picture.firstElementChild);
						setTimeout(function() {
							picture.removeChild(source);
						});
					} else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
						img._pfLastSize = img.offsetWidth;
						sizes = img.sizes;
						img.sizes += ",100vw";
						setTimeout(function() {
							img.sizes = sizes;
						});
					}
				};
	
				var findPictureImgs = function() {
					var i;
					var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
					for (i = 0; i < imgs.length; i++) {
						fixRespimg(imgs[i]);
					}
				};
				var onResize = function() {
					clearTimeout(timer);
					timer = setTimeout(findPictureImgs, 99);
				};
				var mq = window.matchMedia && matchMedia("(orientation: landscape)");
				var init = function() {
					onResize();
	
					if (mq && mq.addListener) {
						mq.addListener(onResize);
					}
				};
	
				dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
	
				if (/^[c|i]|d$/.test(document.readyState || "")) {
					init();
				} else {
					document.addEventListener("DOMContentLoaded", init);
				}
	
				return onResize;
			})());
		}
	})(window);
	
	/*! Picturefill - v3.0.2
	 * http://scottjehl.github.io/picturefill
	 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
	 *  License: MIT
	 */
	
	(function( window, document, undefined ) {
		// Enable strict mode
		"use strict";
	
		// HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)
		document.createElement( "picture" );
	
		var warn, eminpx, alwaysCheckWDescriptor, evalId;
		// local object for method references and testing exposure
		var pf = {};
		var isSupportTestReady = false;
		var noop = function() {};
		var image = document.createElement( "img" );
		var getImgAttr = image.getAttribute;
		var setImgAttr = image.setAttribute;
		var removeImgAttr = image.removeAttribute;
		var docElem = document.documentElement;
		var types = {};
		var cfg = {
			//resource selection:
			algorithm: ""
		};
		var srcAttr = "data-pfsrc";
		var srcsetAttr = srcAttr + "set";
		// ua sniffing is done for undetectable img loading features,
		// to do some non crucial perf optimizations
		var ua = navigator.userAgent;
		var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35 );
		var curSrcProp = "currentSrc";
		var regWDesc = /\s+\+?\d+(e\d+)?w/;
		var regSize = /(\([^)]+\))?\s*(.+)/;
		var setOptions = window.picturefillCFG;
		/**
		 * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
		 */
		// baseStyle also used by getEmValue (i.e.: width: 1em is important)
		var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
		var fsCss = "font-size:100%!important;";
		var isVwDirty = true;
	
		var cssCache = {};
		var sizeLengthCache = {};
		var DPR = window.devicePixelRatio;
		var units = {
			px: 1,
			"in": 96
		};
		var anchor = document.createElement( "a" );
		/**
		 * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
		 * @type {boolean}
		 */
		var alreadyRun = false;
	
		// Reusable, non-"g" Regexes
	
		// (Don't use \s, to avoid matching non-breaking space.)
		var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
		    regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
		    regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
		    regexTrailingCommas = /[,]+$/,
		    regexNonNegativeInteger = /^\d+$/,
	
		    // ( Positive or negative or unsigned integers or decimals, without or without exponents.
		    // Must include at least one digit.
		    // According to spec tests any decimal point must be followed by a digit.
		    // No leading plus sign is allowed.)
		    // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
		    regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
	
		var on = function(obj, evt, fn, capture) {
			if ( obj.addEventListener ) {
				obj.addEventListener(evt, fn, capture || false);
			} else if ( obj.attachEvent ) {
				obj.attachEvent( "on" + evt, fn);
			}
		};
	
		/**
		 * simple memoize function:
		 */
	
		var memoize = function(fn) {
			var cache = {};
			return function(input) {
				if ( !(input in cache) ) {
					cache[ input ] = fn(input);
				}
				return cache[ input ];
			};
		};
	
		// UTILITY FUNCTIONS
	
		// Manual is faster than RegEx
		// http://jsperf.com/whitespace-character/5
		function isSpace(c) {
			return (c === "\u0020" || // space
			        c === "\u0009" || // horizontal tab
			        c === "\u000A" || // new line
			        c === "\u000C" || // form feed
			        c === "\u000D");  // carriage return
		}
	
		/**
		 * gets a mediaquery and returns a boolean or gets a css length and returns a number
		 * @param css mediaqueries or css length
		 * @returns {boolean|number}
		 *
		 * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
		 */
		var evalCSS = (function() {
	
			var regLength = /^([\d\.]+)(em|vw|px)$/;
			var replace = function() {
				var args = arguments, index = 0, string = args[0];
				while (++index in args) {
					string = string.replace(args[index], args[++index]);
				}
				return string;
			};
	
			var buildStr = memoize(function(css) {
	
				return "return " + replace((css || "").toLowerCase(),
					// interpret `and`
					/\band\b/g, "&&",
	
					// interpret `,`
					/,/g, "||",
	
					// interpret `min-` as >=
					/min-([a-z-\s]+):/g, "e.$1>=",
	
					// interpret `max-` as <=
					/max-([a-z-\s]+):/g, "e.$1<=",
	
					//calc value
					/calc([^)]+)/g, "($1)",
	
					// interpret css values
					/(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
					//make eval less evil
					/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
				) + ";";
			});
	
			return function(css, length) {
				var parsedLength;
				if (!(css in cssCache)) {
					cssCache[css] = false;
					if (length && (parsedLength = css.match( regLength ))) {
						cssCache[css] = parsedLength[ 1 ] * units[parsedLength[ 2 ]];
					} else {
						/*jshint evil:true */
						try{
							cssCache[css] = new Function("e", buildStr(css))(units);
						} catch(e) {}
						/*jshint evil:false */
					}
				}
				return cssCache[css];
			};
		})();
	
		var setResolution = function( candidate, sizesattr ) {
			if ( candidate.w ) { // h = means height: || descriptor.type === 'h' do not handle yet...
				candidate.cWidth = pf.calcListLength( sizesattr || "100vw" );
				candidate.res = candidate.w / candidate.cWidth ;
			} else {
				candidate.res = candidate.d;
			}
			return candidate;
		};
	
		/**
		 *
		 * @param opt
		 */
		var picturefill = function( opt ) {
	
			if (!isSupportTestReady) {return;}
	
			var elements, i, plen;
	
			var options = opt || {};
	
			if ( options.elements && options.elements.nodeType === 1 ) {
				if ( options.elements.nodeName.toUpperCase() === "IMG" ) {
					options.elements =  [ options.elements ];
				} else {
					options.context = options.elements;
					options.elements =  null;
				}
			}
	
			elements = options.elements || pf.qsa( (options.context || document), ( options.reevaluate || options.reselect ) ? pf.sel : pf.selShort );
	
			if ( (plen = elements.length) ) {
	
				pf.setupRun( options );
				alreadyRun = true;
	
				// Loop through all elements
				for ( i = 0; i < plen; i++ ) {
					pf.fillImg(elements[ i ], options);
				}
	
				pf.teardownRun( options );
			}
		};
	
		/**
		 * outputs a warning for the developer
		 * @param {message}
		 * @type {Function}
		 */
		warn = ( window.console && console.warn ) ?
			function( message ) {
				console.warn( message );
			} :
			noop
		;
	
		if ( !(curSrcProp in image) ) {
			curSrcProp = "src";
		}
	
		// Add support for standard mime types.
		types[ "image/jpeg" ] = true;
		types[ "image/gif" ] = true;
		types[ "image/png" ] = true;
	
		function detectTypeSupport( type, typeUri ) {
			// based on Modernizr's lossless img-webp test
			// note: asynchronous
			var image = new window.Image();
			image.onerror = function() {
				types[ type ] = false;
				picturefill();
			};
			image.onload = function() {
				types[ type ] = image.width === 1;
				picturefill();
			};
			image.src = typeUri;
			return "pending";
		}
	
		// test svg support
		types[ "image/svg+xml" ] = document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#Image", "1.1" );
	
		/**
		 * updates the internal vW property with the current viewport width in px
		 */
		function updateMetrics() {
	
			isVwDirty = false;
			DPR = window.devicePixelRatio;
			cssCache = {};
			sizeLengthCache = {};
	
			pf.DPR = DPR || 1;
	
			units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
			units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);
	
			units.vw = units.width / 100;
			units.vh = units.height / 100;
	
			evalId = [ units.height, units.width, DPR ].join("-");
	
			units.em = pf.getEmValue();
			units.rem = units.em;
		}
	
		function chooseLowRes( lowerValue, higherValue, dprValue, isCached ) {
			var bonusFactor, tooMuch, bonus, meanDensity;
	
			//experimental
			if (cfg.algorithm === "saveData" ){
				if ( lowerValue > 2.7 ) {
					meanDensity = dprValue + 1;
				} else {
					tooMuch = higherValue - dprValue;
					bonusFactor = Math.pow(lowerValue - 0.6, 1.5);
	
					bonus = tooMuch * bonusFactor;
	
					if (isCached) {
						bonus += 0.1 * bonusFactor;
					}
	
					meanDensity = lowerValue + bonus;
				}
			} else {
				meanDensity = (dprValue > 1) ?
					Math.sqrt(lowerValue * higherValue) :
					lowerValue;
			}
	
			return meanDensity > dprValue;
		}
	
		function applyBestCandidate( img ) {
			var srcSetCandidates;
			var matchingSet = pf.getSet( img );
			var evaluated = false;
			if ( matchingSet !== "pending" ) {
				evaluated = evalId;
				if ( matchingSet ) {
					srcSetCandidates = pf.setRes( matchingSet );
					pf.applySetCandidate( srcSetCandidates, img );
				}
			}
			img[ pf.ns ].evaled = evaluated;
		}
	
		function ascendingSort( a, b ) {
			return a.res - b.res;
		}
	
		function setSrcToCur( img, src, set ) {
			var candidate;
			if ( !set && src ) {
				set = img[ pf.ns ].sets;
				set = set && set[set.length - 1];
			}
	
			candidate = getCandidateForSrc(src, set);
	
			if ( candidate ) {
				src = pf.makeUrl(src);
				img[ pf.ns ].curSrc = src;
				img[ pf.ns ].curCan = candidate;
	
				if ( !candidate.res ) {
					setResolution( candidate, candidate.set.sizes );
				}
			}
			return candidate;
		}
	
		function getCandidateForSrc( src, set ) {
			var i, candidate, candidates;
			if ( src && set ) {
				candidates = pf.parseSet( set );
				src = pf.makeUrl(src);
				for ( i = 0; i < candidates.length; i++ ) {
					if ( src === pf.makeUrl(candidates[ i ].url) ) {
						candidate = candidates[ i ];
						break;
					}
				}
			}
			return candidate;
		}
	
		function getAllSourceElements( picture, candidates ) {
			var i, len, source, srcset;
	
			// SPEC mismatch intended for size and perf:
			// actually only source elements preceding the img should be used
			// also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector
			var sources = picture.getElementsByTagName( "source" );
	
			for ( i = 0, len = sources.length; i < len; i++ ) {
				source = sources[ i ];
				source[ pf.ns ] = true;
				srcset = source.getAttribute( "srcset" );
	
				// if source does not have a srcset attribute, skip
				if ( srcset ) {
					candidates.push( {
						srcset: srcset,
						media: source.getAttribute( "media" ),
						type: source.getAttribute( "type" ),
						sizes: source.getAttribute( "sizes" )
					} );
				}
			}
		}
	
		/**
		 * Srcset Parser
		 * By Alex Bell |  MIT License
		 *
		 * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]
		 *
		 * Based super duper closely on the reference algorithm at:
		 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
		 */
	
		// 1. Let input be the value passed to this algorithm.
		// (TO-DO : Explain what "set" argument is here. Maybe choose a more
		// descriptive & more searchable name.  Since passing the "set" in really has
		// nothing to do with parsing proper, I would prefer this assignment eventually
		// go in an external fn.)
		function parseSrcset(input, set) {
	
			function collectCharacters(regEx) {
				var chars,
				    match = regEx.exec(input.substring(pos));
				if (match) {
					chars = match[ 0 ];
					pos += chars.length;
					return chars;
				}
			}
	
			var inputLength = input.length,
			    url,
			    descriptors,
			    currentDescriptor,
			    state,
			    c,
	
			    // 2. Let position be a pointer into input, initially pointing at the start
			    //    of the string.
			    pos = 0,
	
			    // 3. Let candidates be an initially empty source set.
			    candidates = [];
	
			/**
			* Adds descriptor properties to a candidate, pushes to the candidates array
			* @return undefined
			*/
			// (Declared outside of the while loop so that it's only created once.
			// (This fn is defined before it is used, in order to pass JSHINT.
			// Unfortunately this breaks the sequencing of the spec comments. :/ )
			function parseDescriptors() {
	
				// 9. Descriptor parser: Let error be no.
				var pError = false,
	
				// 10. Let width be absent.
				// 11. Let density be absent.
				// 12. Let future-compat-h be absent. (We're implementing it now as h)
				    w, d, h, i,
				    candidate = {},
				    desc, lastChar, value, intVal, floatVal;
	
				// 13. For each descriptor in descriptors, run the appropriate set of steps
				// from the following list:
				for (i = 0 ; i < descriptors.length; i++) {
					desc = descriptors[ i ];
	
					lastChar = desc[ desc.length - 1 ];
					value = desc.substring(0, desc.length - 1);
					intVal = parseInt(value, 10);
					floatVal = parseFloat(value);
	
					// If the descriptor consists of a valid non-negative integer followed by
					// a U+0077 LATIN SMALL LETTER W character
					if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {
	
						// If width and density are not both absent, then let error be yes.
						if (w || d) {pError = true;}
	
						// Apply the rules for parsing non-negative integers to the descriptor.
						// If the result is zero, let error be yes.
						// Otherwise, let width be the result.
						if (intVal === 0) {pError = true;} else {w = intVal;}
	
					// If the descriptor consists of a valid floating-point number followed by
					// a U+0078 LATIN SMALL LETTER X character
					} else if (regexFloatingPoint.test(value) && (lastChar === "x")) {
	
						// If width, density and future-compat-h are not all absent, then let error
						// be yes.
						if (w || d || h) {pError = true;}
	
						// Apply the rules for parsing floating-point number values to the descriptor.
						// If the result is less than zero, let error be yes. Otherwise, let density
						// be the result.
						if (floatVal < 0) {pError = true;} else {d = floatVal;}
	
					// If the descriptor consists of a valid non-negative integer followed by
					// a U+0068 LATIN SMALL LETTER H character
					} else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {
	
						// If height and density are not both absent, then let error be yes.
						if (h || d) {pError = true;}
	
						// Apply the rules for parsing non-negative integers to the descriptor.
						// If the result is zero, let error be yes. Otherwise, let future-compat-h
						// be the result.
						if (intVal === 0) {pError = true;} else {h = intVal;}
	
					// Anything else, Let error be yes.
					} else {pError = true;}
				} // (close step 13 for loop)
	
				// 15. If error is still no, then append a new image source to candidates whose
				// URL is url, associated with a width width if not absent and a pixel
				// density density if not absent. Otherwise, there is a parse error.
				if (!pError) {
					candidate.url = url;
	
					if (w) { candidate.w = w;}
					if (d) { candidate.d = d;}
					if (h) { candidate.h = h;}
					if (!h && !d && !w) {candidate.d = 1;}
					if (candidate.d === 1) {set.has1x = true;}
					candidate.set = set;
	
					candidates.push(candidate);
				}
			} // (close parseDescriptors fn)
	
			/**
			* Tokenizes descriptor properties prior to parsing
			* Returns undefined.
			* (Again, this fn is defined before it is used, in order to pass JSHINT.
			* Unfortunately this breaks the logical sequencing of the spec comments. :/ )
			*/
			function tokenize() {
	
				// 8.1. Descriptor tokeniser: Skip whitespace
				collectCharacters(regexLeadingSpaces);
	
				// 8.2. Let current descriptor be the empty string.
				currentDescriptor = "";
	
				// 8.3. Let state be in descriptor.
				state = "in descriptor";
	
				while (true) {
	
					// 8.4. Let c be the character at position.
					c = input.charAt(pos);
	
					//  Do the following depending on the value of state.
					//  For the purpose of this step, "EOF" is a special character representing
					//  that position is past the end of input.
	
					// In descriptor
					if (state === "in descriptor") {
						// Do the following, depending on the value of c:
	
					  // Space character
					  // If current descriptor is not empty, append current descriptor to
					  // descriptors and let current descriptor be the empty string.
					  // Set state to after descriptor.
						if (isSpace(c)) {
							if (currentDescriptor) {
								descriptors.push(currentDescriptor);
								currentDescriptor = "";
								state = "after descriptor";
							}
	
						// U+002C COMMA (,)
						// Advance position to the next character in input. If current descriptor
						// is not empty, append current descriptor to descriptors. Jump to the step
						// labeled descriptor parser.
						} else if (c === ",") {
							pos += 1;
							if (currentDescriptor) {
								descriptors.push(currentDescriptor);
							}
							parseDescriptors();
							return;
	
						// U+0028 LEFT PARENTHESIS (()
						// Append c to current descriptor. Set state to in parens.
						} else if (c === "\u0028") {
							currentDescriptor = currentDescriptor + c;
							state = "in parens";
	
						// EOF
						// If current descriptor is not empty, append current descriptor to
						// descriptors. Jump to the step labeled descriptor parser.
						} else if (c === "") {
							if (currentDescriptor) {
								descriptors.push(currentDescriptor);
							}
							parseDescriptors();
							return;
	
						// Anything else
						// Append c to current descriptor.
						} else {
							currentDescriptor = currentDescriptor + c;
						}
					// (end "in descriptor"
	
					// In parens
					} else if (state === "in parens") {
	
						// U+0029 RIGHT PARENTHESIS ())
						// Append c to current descriptor. Set state to in descriptor.
						if (c === ")") {
							currentDescriptor = currentDescriptor + c;
							state = "in descriptor";
	
						// EOF
						// Append current descriptor to descriptors. Jump to the step labeled
						// descriptor parser.
						} else if (c === "") {
							descriptors.push(currentDescriptor);
							parseDescriptors();
							return;
	
						// Anything else
						// Append c to current descriptor.
						} else {
							currentDescriptor = currentDescriptor + c;
						}
	
					// After descriptor
					} else if (state === "after descriptor") {
	
						// Do the following, depending on the value of c:
						// Space character: Stay in this state.
						if (isSpace(c)) {
	
						// EOF: Jump to the step labeled descriptor parser.
						} else if (c === "") {
							parseDescriptors();
							return;
	
						// Anything else
						// Set state to in descriptor. Set position to the previous character in input.
						} else {
							state = "in descriptor";
							pos -= 1;
	
						}
					}
	
					// Advance position to the next character in input.
					pos += 1;
	
				// Repeat this step.
				} // (close while true loop)
			}
	
			// 4. Splitting loop: Collect a sequence of characters that are space
			//    characters or U+002C COMMA characters. If any U+002C COMMA characters
			//    were collected, that is a parse error.
			while (true) {
				collectCharacters(regexLeadingCommasOrSpaces);
	
				// 5. If position is past the end of input, return candidates and abort these steps.
				if (pos >= inputLength) {
					return candidates; // (we're done, this is the sole return path)
				}
	
				// 6. Collect a sequence of characters that are not space characters,
				//    and let that be url.
				url = collectCharacters(regexLeadingNotSpaces);
	
				// 7. Let descriptors be a new empty list.
				descriptors = [];
	
				// 8. If url ends with a U+002C COMMA character (,), follow these substeps:
				//		(1). Remove all trailing U+002C COMMA characters from url. If this removed
				//         more than one character, that is a parse error.
				if (url.slice(-1) === ",") {
					url = url.replace(regexTrailingCommas, "");
					// (Jump ahead to step 9 to skip tokenization and just push the candidate).
					parseDescriptors();
	
				//	Otherwise, follow these substeps:
				} else {
					tokenize();
				} // (close else of step 8)
	
			// 16. Return to the step labeled splitting loop.
			} // (Close of big while loop.)
		}
	
		/*
		 * Sizes Parser
		 *
		 * By Alex Bell |  MIT License
		 *
		 * Non-strict but accurate and lightweight JS Parser for the string value <img sizes="here">
		 *
		 * Reference algorithm at:
		 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute
		 *
		 * Most comments are copied in directly from the spec
		 * (except for comments in parens).
		 *
		 * Grammar is:
		 * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>
		 * <source-size> = <media-condition> <source-size-value>
		 * <source-size-value> = <length>
		 * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes
		 *
		 * E.g. "(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw"
		 * or "(min-width: 30em), calc(30vw - 15px)" or just "30vw"
		 *
		 * Returns the first valid <css-length> with a media condition that evaluates to true,
		 * or "100vw" if all valid media conditions evaluate to false.
		 *
		 */
	
		function parseSizes(strValue) {
	
			// (Percentage CSS lengths are not allowed in this case, to avoid confusion:
			// https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list
			// CSS allows a single optional plus or minus sign:
			// http://www.w3.org/TR/CSS2/syndata.html#numbers
			// CSS is ASCII case-insensitive:
			// http://www.w3.org/TR/CSS2/syndata.html#characters )
			// Spec allows exponential notation for <number> type:
			// http://dev.w3.org/csswg/css-values/#numbers
			var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;
	
			// (This is a quick and lenient test. Because of optional unlimited-depth internal
			// grouping parens and strict spacing rules, this could get very complicated.)
			var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
	
			var i;
			var unparsedSizesList;
			var unparsedSizesListLength;
			var unparsedSize;
			var lastComponentValue;
			var size;
	
			// UTILITY FUNCTIONS
	
			//  (Toy CSS parser. The goals here are:
			//  1) expansive test coverage without the weight of a full CSS parser.
			//  2) Avoiding regex wherever convenient.
			//  Quick tests: http://jsfiddle.net/gtntL4gr/3/
			//  Returns an array of arrays.)
			function parseComponentValues(str) {
				var chrctr;
				var component = "";
				var componentArray = [];
				var listArray = [];
				var parenDepth = 0;
				var pos = 0;
				var inComment = false;
	
				function pushComponent() {
					if (component) {
						componentArray.push(component);
						component = "";
					}
				}
	
				function pushComponentArray() {
					if (componentArray[0]) {
						listArray.push(componentArray);
						componentArray = [];
					}
				}
	
				// (Loop forwards from the beginning of the string.)
				while (true) {
					chrctr = str.charAt(pos);
	
					if (chrctr === "") { // ( End of string reached.)
						pushComponent();
						pushComponentArray();
						return listArray;
					} else if (inComment) {
						if ((chrctr === "*") && (str[pos + 1] === "/")) { // (At end of a comment.)
							inComment = false;
							pos += 2;
							pushComponent();
							continue;
						} else {
							pos += 1; // (Skip all characters inside comments.)
							continue;
						}
					} else if (isSpace(chrctr)) {
						// (If previous character in loop was also a space, or if
						// at the beginning of the string, do not add space char to
						// component.)
						if ( (str.charAt(pos - 1) && isSpace( str.charAt(pos - 1) ) ) || !component ) {
							pos += 1;
							continue;
						} else if (parenDepth === 0) {
							pushComponent();
							pos +=1;
							continue;
						} else {
							// (Replace any space character with a plain space for legibility.)
							chrctr = " ";
						}
					} else if (chrctr === "(") {
						parenDepth += 1;
					} else if (chrctr === ")") {
						parenDepth -= 1;
					} else if (chrctr === ",") {
						pushComponent();
						pushComponentArray();
						pos += 1;
						continue;
					} else if ( (chrctr === "/") && (str.charAt(pos + 1) === "*") ) {
						inComment = true;
						pos += 2;
						continue;
					}
	
					component = component + chrctr;
					pos += 1;
				}
			}
	
			function isValidNonNegativeSourceSizeValue(s) {
				if (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) {return true;}
				if (regexCssCalc.test(s)) {return true;}
				// ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:
				// "-0 is equivalent to 0 and is not a negative number." which means that
				// unitless zero and unitless negative zero must be accepted as special cases.)
				if ((s === "0") || (s === "-0") || (s === "+0")) {return true;}
				return false;
			}
	
			// When asked to parse a sizes attribute from an element, parse a
			// comma-separated list of component values from the value of the element's
			// sizes attribute (or the empty string, if the attribute is absent), and let
			// unparsed sizes list be the result.
			// http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values
	
			unparsedSizesList = parseComponentValues(strValue);
			unparsedSizesListLength = unparsedSizesList.length;
	
			// For each unparsed size in unparsed sizes list:
			for (i = 0; i < unparsedSizesListLength; i++) {
				unparsedSize = unparsedSizesList[i];
	
				// 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.
				// ( parseComponentValues() already omits spaces outside of parens. )
	
				// If unparsed size is now empty, that is a parse error; continue to the next
				// iteration of this algorithm.
				// ( parseComponentValues() won't push an empty array. )
	
				// 2. If the last component value in unparsed size is a valid non-negative
				// <source-size-value>, let size be its value and remove the component value
				// from unparsed size. Any CSS function other than the calc() function is
				// invalid. Otherwise, there is a parse error; continue to the next iteration
				// of this algorithm.
				// http://dev.w3.org/csswg/css-syntax/#parse-component-value
				lastComponentValue = unparsedSize[unparsedSize.length - 1];
	
				if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
					size = lastComponentValue;
					unparsedSize.pop();
				} else {
					continue;
				}
	
				// 3. Remove all consecutive <whitespace-token>s from the end of unparsed
				// size. If unparsed size is now empty, return size and exit this algorithm.
				// If this was not the last item in unparsed sizes list, that is a parse error.
				if (unparsedSize.length === 0) {
					return size;
				}
	
				// 4. Parse the remaining component values in unparsed size as a
				// <media-condition>. If it does not parse correctly, or it does parse
				// correctly but the <media-condition> evaluates to false, continue to the
				// next iteration of this algorithm.
				// (Parsing all possible compound media conditions in JS is heavy, complicated,
				// and the payoff is unclear. Is there ever an situation where the
				// media condition parses incorrectly but still somehow evaluates to true?
				// Can we just rely on the browser/polyfill to do it?)
				unparsedSize = unparsedSize.join(" ");
				if (!(pf.matchesMedia( unparsedSize ) ) ) {
					continue;
				}
	
				// 5. Return size and exit this algorithm.
				return size;
			}
	
			// If the above algorithm exhausts unparsed sizes list without returning a
			// size value, return 100vw.
			return "100vw";
		}
	
		// namespace
		pf.ns = ("pf" + new Date().getTime()).substr(0, 9);
	
		// srcset support test
		pf.supSrcset = "srcset" in image;
		pf.supSizes = "sizes" in image;
		pf.supPicture = !!window.HTMLPictureElement;
	
		// UC browser does claim to support srcset and picture, but not sizes,
		// this extended test reveals the browser does support nothing
		if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
			(function(image2) {
				image.srcset = "data:,a";
				image2.src = "data:,a";
				pf.supSrcset = image.complete === image2.complete;
				pf.supPicture = pf.supSrcset && pf.supPicture;
			})(document.createElement("img"));
		}
	
		// Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute
		if (pf.supSrcset && !pf.supSizes) {
	
			(function() {
				var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
				var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
				var img = document.createElement("img");
				var test = function() {
					var width = img.width;
	
					if (width === 2) {
						pf.supSizes = true;
					}
	
					alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;
	
					isSupportTestReady = true;
					// force async
					setTimeout(picturefill);
				};
	
				img.onload = test;
				img.onerror = test;
				img.setAttribute("sizes", "9px");
	
				img.srcset = width1 + " 1w," + width2 + " 9w";
				img.src = width1;
			})();
	
		} else {
			isSupportTestReady = true;
		}
	
		// using pf.qsa instead of dom traversing does scale much better,
		// especially on sites mixing responsive and non-responsive images
		pf.selShort = "picture>img,img[srcset]";
		pf.sel = pf.selShort;
		pf.cfg = cfg;
	
		/**
		 * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
		 */
		pf.DPR = (DPR  || 1 );
		pf.u = units;
	
		// container of supported mime types that one might need to qualify before using
		pf.types =  types;
	
		pf.setSize = noop;
	
		/**
		 * Gets a string and returns the absolute URL
		 * @param src
		 * @returns {String} absolute URL
		 */
	
		pf.makeUrl = memoize(function(src) {
			anchor.href = src;
			return anchor.href;
		});
	
		/**
		 * Gets a DOM element or document and a selctor and returns the found matches
		 * Can be extended with jQuery/Sizzle for IE7 support
		 * @param context
		 * @param sel
		 * @returns {NodeList|Array}
		 */
		pf.qsa = function(context, sel) {
			return ( "querySelector" in context ) ? context.querySelectorAll(sel) : [];
		};
	
		/**
		 * Shortcut method for matchMedia ( for easy overriding in tests )
		 * wether native or pf.mMQ is used will be decided lazy on first call
		 * @returns {boolean}
		 */
		pf.matchesMedia = function() {
			if ( window.matchMedia && (matchMedia( "(min-width: 0.1em)" ) || {}).matches ) {
				pf.matchesMedia = function( media ) {
					return !media || ( matchMedia( media ).matches );
				};
			} else {
				pf.matchesMedia = pf.mMQ;
			}
	
			return pf.matchesMedia.apply( this, arguments );
		};
	
		/**
		 * A simplified matchMedia implementation for IE8 and IE9
		 * handles only min-width/max-width with px or em values
		 * @param media
		 * @returns {boolean}
		 */
		pf.mMQ = function( media ) {
			return media ? evalCSS(media) : true;
		};
	
		/**
		 * Returns the calculated length in css pixel from the given sourceSizeValue
		 * http://dev.w3.org/csswg/css-values-3/#length-value
		 * intended Spec mismatches:
		 * * Does not check for invalid use of CSS functions
		 * * Does handle a computed length of 0 the same as a negative and therefore invalid value
		 * @param sourceSizeValue
		 * @returns {Number}
		 */
		pf.calcLength = function( sourceSizeValue ) {
	
			var value = evalCSS(sourceSizeValue, true) || false;
			if (value < 0) {
				value = false;
			}
	
			return value;
		};
	
		/**
		 * Takes a type string and checks if its supported
		 */
	
		pf.supportsType = function( type ) {
			return ( type ) ? types[ type ] : true;
		};
	
		/**
		 * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
		 * @param sourceSizeStr
		 * @returns {*}
		 */
		pf.parseSize = memoize(function( sourceSizeStr ) {
			var match = ( sourceSizeStr || "" ).match(regSize);
			return {
				media: match && match[1],
				length: match && match[2]
			};
		});
	
		pf.parseSet = function( set ) {
			if ( !set.cands ) {
				set.cands = parseSrcset(set.srcset, set);
			}
			return set.cands;
		};
	
		/**
		 * returns 1em in css px for html/body default size
		 * function taken from respondjs
		 * @returns {*|number}
		 */
		pf.getEmValue = function() {
			var body;
			if ( !eminpx && (body = document.body) ) {
				var div = document.createElement( "div" ),
					originalHTMLCSS = docElem.style.cssText,
					originalBodyCSS = body.style.cssText;
	
				div.style.cssText = baseStyle;
	
				// 1em in a media query is the value of the default font size of the browser
				// reset docElem and body to ensure the correct value is returned
				docElem.style.cssText = fsCss;
				body.style.cssText = fsCss;
	
				body.appendChild( div );
				eminpx = div.offsetWidth;
				body.removeChild( div );
	
				//also update eminpx before returning
				eminpx = parseFloat( eminpx, 10 );
	
				// restore the original values
				docElem.style.cssText = originalHTMLCSS;
				body.style.cssText = originalBodyCSS;
	
			}
			return eminpx || 16;
		};
	
		/**
		 * Takes a string of sizes and returns the width in pixels as a number
		 */
		pf.calcListLength = function( sourceSizeListStr ) {
			// Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
			//
			//                           or (min-width:30em) calc(30% - 15px)
			if ( !(sourceSizeListStr in sizeLengthCache) || cfg.uT ) {
				var winningLength = pf.calcLength( parseSizes( sourceSizeListStr ) );
	
				sizeLengthCache[ sourceSizeListStr ] = !winningLength ? units.width : winningLength;
			}
	
			return sizeLengthCache[ sourceSizeListStr ];
		};
	
		/**
		 * Takes a candidate object with a srcset property in the form of url/
		 * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
		 *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
		 *     "images/pic-small.png"
		 * Get an array of image candidates in the form of
		 *      {url: "/foo/bar.png", resolution: 1}
		 * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
		 * If sizes is specified, res is calculated
		 */
		pf.setRes = function( set ) {
			var candidates;
			if ( set ) {
	
				candidates = pf.parseSet( set );
	
				for ( var i = 0, len = candidates.length; i < len; i++ ) {
					setResolution( candidates[ i ], set.sizes );
				}
			}
			return candidates;
		};
	
		pf.setRes.res = setResolution;
	
		pf.applySetCandidate = function( candidates, img ) {
			if ( !candidates.length ) {return;}
			var candidate,
				i,
				j,
				length,
				bestCandidate,
				curSrc,
				curCan,
				candidateSrc,
				abortCurSrc;
	
			var imageData = img[ pf.ns ];
			var dpr = pf.DPR;
	
			curSrc = imageData.curSrc || img[curSrcProp];
	
			curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);
	
			// if we have a current source, we might either become lazy or give this source some advantage
			if ( curCan && curCan.set === candidates[ 0 ].set ) {
	
				// if browser can abort image request and the image has a higher pixel density than needed
				// and this image isn't downloaded yet, we skip next part and try to save bandwidth
				abortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);
	
				if ( !abortCurSrc ) {
					curCan.cached = true;
	
					// if current candidate is "best", "better" or "okay",
					// set it to bestCandidate
					if ( curCan.res >= dpr ) {
						bestCandidate = curCan;
					}
				}
			}
	
			if ( !bestCandidate ) {
	
				candidates.sort( ascendingSort );
	
				length = candidates.length;
				bestCandidate = candidates[ length - 1 ];
	
				for ( i = 0; i < length; i++ ) {
					candidate = candidates[ i ];
					if ( candidate.res >= dpr ) {
						j = i - 1;
	
						// we have found the perfect candidate,
						// but let's improve this a little bit with some assumptions ;-)
						if (candidates[ j ] &&
							(abortCurSrc || curSrc !== pf.makeUrl( candidate.url )) &&
							chooseLowRes(candidates[ j ].res, candidate.res, dpr, candidates[ j ].cached)) {
	
							bestCandidate = candidates[ j ];
	
						} else {
							bestCandidate = candidate;
						}
						break;
					}
				}
			}
	
			if ( bestCandidate ) {
	
				candidateSrc = pf.makeUrl( bestCandidate.url );
	
				imageData.curSrc = candidateSrc;
				imageData.curCan = bestCandidate;
	
				if ( candidateSrc !== curSrc ) {
					pf.setSrc( img, bestCandidate );
				}
				pf.setSize( img );
			}
		};
	
		pf.setSrc = function( img, bestCandidate ) {
			var origWidth;
			img.src = bestCandidate.url;
	
			// although this is a specific Safari issue, we don't want to take too much different code paths
			if ( bestCandidate.set.type === "image/svg+xml" ) {
				origWidth = img.style.width;
				img.style.width = (img.offsetWidth + 1) + "px";
	
				// next line only should trigger a repaint
				// if... is only done to trick dead code removal
				if ( img.offsetWidth + 1 ) {
					img.style.width = origWidth;
				}
			}
		};
	
		pf.getSet = function( img ) {
			var i, set, supportsType;
			var match = false;
			var sets = img [ pf.ns ].sets;
	
			for ( i = 0; i < sets.length && !match; i++ ) {
				set = sets[i];
	
				if ( !set.srcset || !pf.matchesMedia( set.media ) || !(supportsType = pf.supportsType( set.type )) ) {
					continue;
				}
	
				if ( supportsType === "pending" ) {
					set = supportsType;
				}
	
				match = set;
				break;
			}
	
			return match;
		};
	
		pf.parseSets = function( element, parent, options ) {
			var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;
	
			var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
			var imageData = element[ pf.ns ];
	
			if ( imageData.src === undefined || options.src ) {
				imageData.src = getImgAttr.call( element, "src" );
				if ( imageData.src ) {
					setImgAttr.call( element, srcAttr, imageData.src );
				} else {
					removeImgAttr.call( element, srcAttr );
				}
			}
	
			if ( imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset ) {
				srcsetAttribute = getImgAttr.call( element, "srcset" );
				imageData.srcset = srcsetAttribute;
				srcsetParsed = true;
			}
	
			imageData.sets = [];
	
			if ( hasPicture ) {
				imageData.pic = true;
				getAllSourceElements( parent, imageData.sets );
			}
	
			if ( imageData.srcset ) {
				imageSet = {
					srcset: imageData.srcset,
					sizes: getImgAttr.call( element, "sizes" )
				};
	
				imageData.sets.push( imageSet );
	
				isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || "");
	
				// add normal src as candidate, if source has no w descriptor
				if ( !isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x ) {
					imageSet.srcset += ", " + imageData.src;
					imageSet.cands.push({
						url: imageData.src,
						d: 1,
						set: imageSet
					});
				}
	
			} else if ( imageData.src ) {
				imageData.sets.push( {
					srcset: imageData.src,
					sizes: null
				} );
			}
	
			imageData.curCan = null;
			imageData.curSrc = undefined;
	
			// if img has picture or the srcset was removed or has a srcset and does not support srcset at all
			// or has a w descriptor (and does not support sizes) set support to false to evaluate
			imageData.supported = !( hasPicture || ( imageSet && !pf.supSrcset ) || (isWDescripor && !pf.supSizes) );
	
			if ( srcsetParsed && pf.supSrcset && !imageData.supported ) {
				if ( srcsetAttribute ) {
					setImgAttr.call( element, srcsetAttr, srcsetAttribute );
					element.srcset = "";
				} else {
					removeImgAttr.call( element, srcsetAttr );
				}
			}
	
			if (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) ||  element.src !== pf.makeUrl(imageData.src))) {
				if (imageData.src === null) {
					element.removeAttribute("src");
				} else {
					element.src = imageData.src;
				}
			}
	
			imageData.parsed = true;
		};
	
		pf.fillImg = function(element, options) {
			var imageData;
			var extreme = options.reselect || options.reevaluate;
	
			// expando for caching data on the img
			if ( !element[ pf.ns ] ) {
				element[ pf.ns ] = {};
			}
	
			imageData = element[ pf.ns ];
	
			// if the element has already been evaluated, skip it
			// unless `options.reevaluate` is set to true ( this, for example,
			// is set to true when running `picturefill` on `resize` ).
			if ( !extreme && imageData.evaled === evalId ) {
				return;
			}
	
			if ( !imageData.parsed || options.reevaluate ) {
				pf.parseSets( element, element.parentNode, options );
			}
	
			if ( !imageData.supported ) {
				applyBestCandidate( element );
			} else {
				imageData.evaled = evalId;
			}
		};
	
		pf.setupRun = function() {
			if ( !alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio) ) {
				updateMetrics();
			}
		};
	
		// If picture is supported, well, that's awesome.
		if ( pf.supPicture ) {
			picturefill = noop;
			pf.fillImg = noop;
		} else {
	
			 // Set up picture polyfill by polling the document
			(function() {
				var isDomReady;
				var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;
	
				var run = function() {
					var readyState = document.readyState || "";
	
					timerId = setTimeout(run, readyState === "loading" ? 200 :  999);
					if ( document.body ) {
						pf.fillImgs();
						isDomReady = isDomReady || regReady.test(readyState);
						if ( isDomReady ) {
							clearTimeout( timerId );
						}
	
					}
				};
	
				var timerId = setTimeout(run, document.body ? 9 : 99);
	
				// Also attach picturefill on resize and readystatechange
				// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
				var debounce = function(func, wait) {
					var timeout, timestamp;
					var later = function() {
						var last = (new Date()) - timestamp;
	
						if (last < wait) {
							timeout = setTimeout(later, wait - last);
						} else {
							timeout = null;
							func();
						}
					};
	
					return function() {
						timestamp = new Date();
	
						if (!timeout) {
							timeout = setTimeout(later, wait);
						}
					};
				};
				var lastClientWidth = docElem.clientHeight;
				var onResize = function() {
					isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
					lastClientWidth = docElem.clientHeight;
					if ( isVwDirty ) {
						pf.fillImgs();
					}
				};
	
				on( window, "resize", debounce(onResize, 99 ) );
				on( document, "readystatechange", run );
			})();
		}
	
		pf.picturefill = picturefill;
		//use this internally for easy monkey patching/performance testing
		pf.fillImgs = picturefill;
		pf.teardownRun = noop;
	
		/* expose methods for testing */
		picturefill._ = pf;
	
		window.picturefillCFG = {
			pf: pf,
			push: function(args) {
				var name = args.shift();
				if (typeof pf[name] === "function") {
					pf[name].apply(pf, args);
				} else {
					cfg[name] = args[0];
					if (alreadyRun) {
						pf.fillImgs( { reselect: true } );
					}
				}
			}
		};
	
		while (setOptions && setOptions.length) {
			window.picturefillCFG.push(setOptions.shift());
		}
	
		/* expose picturefill */
		window.picturefill = picturefill;
	
		/* expose picturefill */
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// CommonJS, just export
			module.exports = picturefill;
		} else if ( true ) {
			// AMD support
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return picturefill; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
	
		// IE8 evals this sync, so it must be the last thing we do
		if ( !pf.supPicture ) {
			types[ "image/webp" ] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==" );
		}
	
	} )( window, document );


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Validation Plugin v1.15.1
	 *
	 * http://jqueryvalidation.org/
	 *
	 * Copyright (c) 2016 Jörn Zaefferer
	 * Released under the MIT license
	 */
	(function( factory ) {
		if ( true ) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module === "object" && module.exports) {
			module.exports = factory( require( "jquery" ) );
		} else {
			factory( jQuery );
		}
	}(function( $ ) {
	
	$.extend( $.fn, {
	
		// http://jqueryvalidation.org/validate/
		validate: function( options ) {
	
			// If nothing is selected, return nothing; can't chain anyway
			if ( !this.length ) {
				if ( options && options.debug && window.console ) {
					console.warn( "Nothing selected, can't validate, returning nothing." );
				}
				return;
			}
	
			// Check if a validator for this form was already created
			var validator = $.data( this[ 0 ], "validator" );
			if ( validator ) {
				return validator;
			}
	
			// Add novalidate tag if HTML5.
			this.attr( "novalidate", "novalidate" );
	
			validator = new $.validator( options, this[ 0 ] );
			$.data( this[ 0 ], "validator", validator );
	
			if ( validator.settings.onsubmit ) {
	
				this.on( "click.validate", ":submit", function( event ) {
					if ( validator.settings.submitHandler ) {
						validator.submitButton = event.target;
					}
	
					// Allow suppressing validation by adding a cancel class to the submit button
					if ( $( this ).hasClass( "cancel" ) ) {
						validator.cancelSubmit = true;
					}
	
					// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
					if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
						validator.cancelSubmit = true;
					}
				} );
	
				// Validate the form on submit
				this.on( "submit.validate", function( event ) {
					if ( validator.settings.debug ) {
	
						// Prevent form submit to be able to see console output
						event.preventDefault();
					}
					function handle() {
						var hidden, result;
						if ( validator.settings.submitHandler ) {
							if ( validator.submitButton ) {
	
								// Insert a hidden input as a replacement for the missing submit button
								hidden = $( "<input type='hidden'/>" )
									.attr( "name", validator.submitButton.name )
									.val( $( validator.submitButton ).val() )
									.appendTo( validator.currentForm );
							}
							result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
							if ( validator.submitButton ) {
	
								// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
								hidden.remove();
							}
							if ( result !== undefined ) {
								return result;
							}
							return false;
						}
						return true;
					}
	
					// Prevent submit for invalid forms or custom submit handlers
					if ( validator.cancelSubmit ) {
						validator.cancelSubmit = false;
						return handle();
					}
					if ( validator.form() ) {
						if ( validator.pendingRequest ) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					} else {
						validator.focusInvalid();
						return false;
					}
				} );
			}
	
			return validator;
		},
	
		// http://jqueryvalidation.org/valid/
		valid: function() {
			var valid, validator, errorList;
	
			if ( $( this[ 0 ] ).is( "form" ) ) {
				valid = this.validate().form();
			} else {
				errorList = [];
				valid = true;
				validator = $( this[ 0 ].form ).validate();
				this.each( function() {
					valid = validator.element( this ) && valid;
					if ( !valid ) {
						errorList = errorList.concat( validator.errorList );
					}
				} );
				validator.errorList = errorList;
			}
			return valid;
		},
	
		// http://jqueryvalidation.org/rules/
		rules: function( command, argument ) {
			var element = this[ 0 ],
				settings, staticRules, existingRules, data, param, filtered;
	
			// If nothing is selected, return empty object; can't chain anyway
			if ( element == null || element.form == null ) {
				return;
			}
	
			if ( command ) {
				settings = $.data( element.form, "validator" ).settings;
				staticRules = settings.rules;
				existingRules = $.validator.staticRules( element );
				switch ( command ) {
				case "add":
					$.extend( existingRules, $.validator.normalizeRule( argument ) );
	
					// Remove messages from rules, but allow them to be set separately
					delete existingRules.messages;
					staticRules[ element.name ] = existingRules;
					if ( argument.messages ) {
						settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
					}
					break;
				case "remove":
					if ( !argument ) {
						delete staticRules[ element.name ];
						return existingRules;
					}
					filtered = {};
					$.each( argument.split( /\s/ ), function( index, method ) {
						filtered[ method ] = existingRules[ method ];
						delete existingRules[ method ];
						if ( method === "required" ) {
							$( element ).removeAttr( "aria-required" );
						}
					} );
					return filtered;
				}
			}
	
			data = $.validator.normalizeRules(
			$.extend(
				{},
				$.validator.classRules( element ),
				$.validator.attributeRules( element ),
				$.validator.dataRules( element ),
				$.validator.staticRules( element )
			), element );
	
			// Make sure required is at front
			if ( data.required ) {
				param = data.required;
				delete data.required;
				data = $.extend( { required: param }, data );
				$( element ).attr( "aria-required", "true" );
			}
	
			// Make sure remote is at back
			if ( data.remote ) {
				param = data.remote;
				delete data.remote;
				data = $.extend( data, { remote: param } );
			}
	
			return data;
		}
	} );
	
	// Custom selectors
	$.extend( $.expr[ ":" ], {
	
		// http://jqueryvalidation.org/blank-selector/
		blank: function( a ) {
			return !$.trim( "" + $( a ).val() );
		},
	
		// http://jqueryvalidation.org/filled-selector/
		filled: function( a ) {
			var val = $( a ).val();
			return val !== null && !!$.trim( "" + val );
		},
	
		// http://jqueryvalidation.org/unchecked-selector/
		unchecked: function( a ) {
			return !$( a ).prop( "checked" );
		}
	} );
	
	// Constructor for validator
	$.validator = function( options, form ) {
		this.settings = $.extend( true, {}, $.validator.defaults, options );
		this.currentForm = form;
		this.init();
	};
	
	// http://jqueryvalidation.org/jQuery.validator.format/
	$.validator.format = function( source, params ) {
		if ( arguments.length === 1 ) {
			return function() {
				var args = $.makeArray( arguments );
				args.unshift( source );
				return $.validator.format.apply( this, args );
			};
		}
		if ( params === undefined ) {
			return source;
		}
		if ( arguments.length > 2 && params.constructor !== Array  ) {
			params = $.makeArray( arguments ).slice( 1 );
		}
		if ( params.constructor !== Array ) {
			params = [ params ];
		}
		$.each( params, function( i, n ) {
			source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
				return n;
			} );
		} );
		return source;
	};
	
	$.extend( $.validator, {
	
		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			pendingClass: "pending",
			validClass: "valid",
			errorElement: "label",
			focusCleanup: false,
			focusInvalid: true,
			errorContainer: $( [] ),
			errorLabelContainer: $( [] ),
			onsubmit: true,
			ignore: ":hidden",
			ignoreTitle: false,
			onfocusin: function( element ) {
				this.lastActive = element;
	
				// Hide error label and remove error class on focus if enabled
				if ( this.settings.focusCleanup ) {
					if ( this.settings.unhighlight ) {
						this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
					}
					this.hideThese( this.errorsFor( element ) );
				}
			},
			onfocusout: function( element ) {
				if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
					this.element( element );
				}
			},
			onkeyup: function( element, event ) {
	
				// Avoid revalidate the field when pressing one of the following keys
				// Shift       => 16
				// Ctrl        => 17
				// Alt         => 18
				// Caps lock   => 20
				// End         => 35
				// Home        => 36
				// Left arrow  => 37
				// Up arrow    => 38
				// Right arrow => 39
				// Down arrow  => 40
				// Insert      => 45
				// Num lock    => 144
				// AltGr key   => 225
				var excludedKeys = [
					16, 17, 18, 20, 35, 36, 37,
					38, 39, 40, 45, 144, 225
				];
	
				if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
					return;
				} else if ( element.name in this.submitted || element.name in this.invalid ) {
					this.element( element );
				}
			},
			onclick: function( element ) {
	
				// Click on selects, radiobuttons and checkboxes
				if ( element.name in this.submitted ) {
					this.element( element );
	
				// Or option elements, check parent select in that case
				} else if ( element.parentNode.name in this.submitted ) {
					this.element( element.parentNode );
				}
			},
			highlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
				} else {
					$( element ).addClass( errorClass ).removeClass( validClass );
				}
			},
			unhighlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
				} else {
					$( element ).removeClass( errorClass ).addClass( validClass );
				}
			}
		},
	
		// http://jqueryvalidation.org/jQuery.validator.setDefaults/
		setDefaults: function( settings ) {
			$.extend( $.validator.defaults, settings );
		},
	
		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date (ISO).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			equalTo: "Please enter the same value again.",
			maxlength: $.validator.format( "Please enter no more than {0} characters." ),
			minlength: $.validator.format( "Please enter at least {0} characters." ),
			rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
			range: $.validator.format( "Please enter a value between {0} and {1}." ),
			max: $.validator.format( "Please enter a value less than or equal to {0}." ),
			min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
			step: $.validator.format( "Please enter a multiple of {0}." )
		},
	
		autoCreateRanges: false,
	
		prototype: {
	
			init: function() {
				this.labelContainer = $( this.settings.errorLabelContainer );
				this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
				this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();
	
				var groups = ( this.groups = {} ),
					rules;
				$.each( this.settings.groups, function( key, value ) {
					if ( typeof value === "string" ) {
						value = value.split( /\s/ );
					}
					$.each( value, function( index, name ) {
						groups[ name ] = key;
					} );
				} );
				rules = this.settings.rules;
				$.each( rules, function( key, value ) {
					rules[ key ] = $.validator.normalizeRule( value );
				} );
	
				function delegate( event ) {
	
					// Set form expando on contenteditable
					if ( !this.form && this.hasAttribute( "contenteditable" ) ) {
						this.form = $( this ).closest( "form" )[ 0 ];
					}
	
					var validator = $.data( this.form, "validator" ),
						eventType = "on" + event.type.replace( /^validate/, "" ),
						settings = validator.settings;
					if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
						settings[ eventType ].call( validator, this, event );
					}
				}
	
				$( this.currentForm )
					.on( "focusin.validate focusout.validate keyup.validate",
						":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
						"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
						"[type='radio'], [type='checkbox'], [contenteditable]", delegate )
	
					// Support: Chrome, oldIE
					// "select" is provided as event.target when clicking a option
					.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );
	
				if ( this.settings.invalidHandler ) {
					$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
				}
	
				// Add aria-required to any Static/Data/Class required fields before first validation
				// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
				$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
			},
	
			// http://jqueryvalidation.org/Validator.form/
			form: function() {
				this.checkForm();
				$.extend( this.submitted, this.errorMap );
				this.invalid = $.extend( {}, this.errorMap );
				if ( !this.valid() ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				}
				this.showErrors();
				return this.valid();
			},
	
			checkForm: function() {
				this.prepareForm();
				for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
					this.check( elements[ i ] );
				}
				return this.valid();
			},
	
			// http://jqueryvalidation.org/Validator.element/
			element: function( element ) {
				var cleanElement = this.clean( element ),
					checkElement = this.validationTargetFor( cleanElement ),
					v = this,
					result = true,
					rs, group;
	
				if ( checkElement === undefined ) {
					delete this.invalid[ cleanElement.name ];
				} else {
					this.prepareElement( checkElement );
					this.currentElements = $( checkElement );
	
					// If this element is grouped, then validate all group elements already
					// containing a value
					group = this.groups[ checkElement.name ];
					if ( group ) {
						$.each( this.groups, function( name, testgroup ) {
							if ( testgroup === group && name !== checkElement.name ) {
								cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
								if ( cleanElement && cleanElement.name in v.invalid ) {
									v.currentElements.push( cleanElement );
									result = v.check( cleanElement ) && result;
								}
							}
						} );
					}
	
					rs = this.check( checkElement ) !== false;
					result = result && rs;
					if ( rs ) {
						this.invalid[ checkElement.name ] = false;
					} else {
						this.invalid[ checkElement.name ] = true;
					}
	
					if ( !this.numberOfInvalids() ) {
	
						// Hide error containers on last error
						this.toHide = this.toHide.add( this.containers );
					}
					this.showErrors();
	
					// Add aria-invalid status for screen readers
					$( element ).attr( "aria-invalid", !rs );
				}
	
				return result;
			},
	
			// http://jqueryvalidation.org/Validator.showErrors/
			showErrors: function( errors ) {
				if ( errors ) {
					var validator = this;
	
					// Add items to error list and map
					$.extend( this.errorMap, errors );
					this.errorList = $.map( this.errorMap, function( message, name ) {
						return {
							message: message,
							element: validator.findByName( name )[ 0 ]
						};
					} );
	
					// Remove items from success list
					this.successList = $.grep( this.successList, function( element ) {
						return !( element.name in errors );
					} );
				}
				if ( this.settings.showErrors ) {
					this.settings.showErrors.call( this, this.errorMap, this.errorList );
				} else {
					this.defaultShowErrors();
				}
			},
	
			// http://jqueryvalidation.org/Validator.resetForm/
			resetForm: function() {
				if ( $.fn.resetForm ) {
					$( this.currentForm ).resetForm();
				}
				this.invalid = {};
				this.submitted = {};
				this.prepareForm();
				this.hideErrors();
				var elements = this.elements()
					.removeData( "previousValue" )
					.removeAttr( "aria-invalid" );
	
				this.resetElements( elements );
			},
	
			resetElements: function( elements ) {
				var i;
	
				if ( this.settings.unhighlight ) {
					for ( i = 0; elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ],
							this.settings.errorClass, "" );
						this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
					}
				} else {
					elements
						.removeClass( this.settings.errorClass )
						.removeClass( this.settings.validClass );
				}
			},
	
			numberOfInvalids: function() {
				return this.objectLength( this.invalid );
			},
	
			objectLength: function( obj ) {
				/* jshint unused: false */
				var count = 0,
					i;
				for ( i in obj ) {
					if ( obj[ i ] ) {
						count++;
					}
				}
				return count;
			},
	
			hideErrors: function() {
				this.hideThese( this.toHide );
			},
	
			hideThese: function( errors ) {
				errors.not( this.containers ).text( "" );
				this.addWrapper( errors ).hide();
			},
	
			valid: function() {
				return this.size() === 0;
			},
	
			size: function() {
				return this.errorList.length;
			},
	
			focusInvalid: function() {
				if ( this.settings.focusInvalid ) {
					try {
						$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
						.filter( ":visible" )
						.focus()
	
						// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
						.trigger( "focusin" );
					} catch ( e ) {
	
						// Ignore IE throwing errors when focusing hidden elements
					}
				}
			},
	
			findLastActive: function() {
				var lastActive = this.lastActive;
				return lastActive && $.grep( this.errorList, function( n ) {
					return n.element.name === lastActive.name;
				} ).length === 1 && lastActive;
			},
	
			elements: function() {
				var validator = this,
					rulesCache = {};
	
				// Select all valid inputs inside the form (no submit or reset buttons)
				return $( this.currentForm )
				.find( "input, select, textarea, [contenteditable]" )
				.not( ":submit, :reset, :image, :disabled" )
				.not( this.settings.ignore )
				.filter( function() {
					var name = this.name || $( this ).attr( "name" ); // For contenteditable
					if ( !name && validator.settings.debug && window.console ) {
						console.error( "%o has no name assigned", this );
					}
	
					// Set form expando on contenteditable
					if ( this.hasAttribute( "contenteditable" ) ) {
						this.form = $( this ).closest( "form" )[ 0 ];
					}
	
					// Select only the first element for each name, and only those with rules specified
					if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
						return false;
					}
	
					rulesCache[ name ] = true;
					return true;
				} );
			},
	
			clean: function( selector ) {
				return $( selector )[ 0 ];
			},
	
			errors: function() {
				var errorClass = this.settings.errorClass.split( " " ).join( "." );
				return $( this.settings.errorElement + "." + errorClass, this.errorContext );
			},
	
			resetInternals: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $( [] );
				this.toHide = $( [] );
			},
	
			reset: function() {
				this.resetInternals();
				this.currentElements = $( [] );
			},
	
			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add( this.containers );
			},
	
			prepareElement: function( element ) {
				this.reset();
				this.toHide = this.errorsFor( element );
			},
	
			elementValue: function( element ) {
				var $element = $( element ),
					type = element.type,
					val, idx;
	
				if ( type === "radio" || type === "checkbox" ) {
					return this.findByName( element.name ).filter( ":checked" ).val();
				} else if ( type === "number" && typeof element.validity !== "undefined" ) {
					return element.validity.badInput ? "NaN" : $element.val();
				}
	
				if ( element.hasAttribute( "contenteditable" ) ) {
					val = $element.text();
				} else {
					val = $element.val();
				}
	
				if ( type === "file" ) {
	
					// Modern browser (chrome & safari)
					if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
						return val.substr( 12 );
					}
	
					// Legacy browsers
					// Unix-based path
					idx = val.lastIndexOf( "/" );
					if ( idx >= 0 ) {
						return val.substr( idx + 1 );
					}
	
					// Windows-based path
					idx = val.lastIndexOf( "\\" );
					if ( idx >= 0 ) {
						return val.substr( idx + 1 );
					}
	
					// Just the file name
					return val;
				}
	
				if ( typeof val === "string" ) {
					return val.replace( /\r/g, "" );
				}
				return val;
			},
	
			check: function( element ) {
				element = this.validationTargetFor( this.clean( element ) );
	
				var rules = $( element ).rules(),
					rulesCount = $.map( rules, function( n, i ) {
						return i;
					} ).length,
					dependencyMismatch = false,
					val = this.elementValue( element ),
					result, method, rule;
	
				// If a normalizer is defined for this element, then
				// call it to retreive the changed value instead
				// of using the real one.
				// Note that `this` in the normalizer is `element`.
				if ( typeof rules.normalizer === "function" ) {
					val = rules.normalizer.call( element, val );
	
					if ( typeof val !== "string" ) {
						throw new TypeError( "The normalizer should return a string value." );
					}
	
					// Delete the normalizer from rules to avoid treating
					// it as a pre-defined method.
					delete rules.normalizer;
				}
	
				for ( method in rules ) {
					rule = { method: method, parameters: rules[ method ] };
					try {
						result = $.validator.methods[ method ].call( this, val, element, rule.parameters );
	
						// If a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if ( result === "dependency-mismatch" && rulesCount === 1 ) {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;
	
						if ( result === "pending" ) {
							this.toHide = this.toHide.not( this.errorsFor( element ) );
							return;
						}
	
						if ( !result ) {
							this.formatAndAdd( element, rule );
							return false;
						}
					} catch ( e ) {
						if ( this.settings.debug && window.console ) {
							console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
						}
						if ( e instanceof TypeError ) {
							e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
						}
	
						throw e;
					}
				}
				if ( dependencyMismatch ) {
					return;
				}
				if ( this.objectLength( rules ) ) {
					this.successList.push( element );
				}
				return true;
			},
	
			// Return the custom message for the given element and validation method
			// specified in the element's HTML5 data attribute
			// return the generic message if present and no method specific message is present
			customDataMessage: function( element, method ) {
				return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
					method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
			},
	
			// Return the custom message for the given element name and validation method
			customMessage: function( name, method ) {
				var m = this.settings.messages[ name ];
				return m && ( m.constructor === String ? m : m[ method ] );
			},
	
			// Return the first defined argument, allowing empty strings
			findDefined: function() {
				for ( var i = 0; i < arguments.length; i++ ) {
					if ( arguments[ i ] !== undefined ) {
						return arguments[ i ];
					}
				}
				return undefined;
			},
	
			// The second parameter 'rule' used to be a string, and extended to an object literal
			// of the following form:
			// rule = {
			//     method: "method name",
			//     parameters: "the given method parameters"
			// }
			//
			// The old behavior still supported, kept to maintain backward compatibility with
			// old code, and will be removed in the next major release.
			defaultMessage: function( element, rule ) {
				if ( typeof rule === "string" ) {
					rule = { method: rule };
				}
	
				var message = this.findDefined(
						this.customMessage( element.name, rule.method ),
						this.customDataMessage( element, rule.method ),
	
						// 'title' is never undefined, so handle empty string as undefined
						!this.settings.ignoreTitle && element.title || undefined,
						$.validator.messages[ rule.method ],
						"<strong>Warning: No message defined for " + element.name + "</strong>"
					),
					theregex = /\$?\{(\d+)\}/g;
				if ( typeof message === "function" ) {
					message = message.call( this, rule.parameters, element );
				} else if ( theregex.test( message ) ) {
					message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
				}
	
				return message;
			},
	
			formatAndAdd: function( element, rule ) {
				var message = this.defaultMessage( element, rule );
	
				this.errorList.push( {
					message: message,
					element: element,
					method: rule.method
				} );
	
				this.errorMap[ element.name ] = message;
				this.submitted[ element.name ] = message;
			},
	
			addWrapper: function( toToggle ) {
				if ( this.settings.wrapper ) {
					toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
				}
				return toToggle;
			},
	
			defaultShowErrors: function() {
				var i, elements, error;
				for ( i = 0; this.errorList[ i ]; i++ ) {
					error = this.errorList[ i ];
					if ( this.settings.highlight ) {
						this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
					}
					this.showLabel( error.element, error.message );
				}
				if ( this.errorList.length ) {
					this.toShow = this.toShow.add( this.containers );
				}
				if ( this.settings.success ) {
					for ( i = 0; this.successList[ i ]; i++ ) {
						this.showLabel( this.successList[ i ] );
					}
				}
				if ( this.settings.unhighlight ) {
					for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
					}
				}
				this.toHide = this.toHide.not( this.toShow );
				this.hideErrors();
				this.addWrapper( this.toShow ).show();
			},
	
			validElements: function() {
				return this.currentElements.not( this.invalidElements() );
			},
	
			invalidElements: function() {
				return $( this.errorList ).map( function() {
					return this.element;
				} );
			},
	
			showLabel: function( element, message ) {
				var place, group, errorID, v,
					error = this.errorsFor( element ),
					elementID = this.idOrName( element ),
					describedBy = $( element ).attr( "aria-describedby" );
	
				if ( error.length ) {
	
					// Refresh error/success class
					error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
	
					// Replace message on existing label
					error.html( message );
				} else {
	
					// Create error element
					error = $( "<" + this.settings.errorElement + ">" )
						.attr( "id", elementID + "-error" )
						.addClass( this.settings.errorClass )
						.html( message || "" );
	
					// Maintain reference to the element to be placed into the DOM
					place = error;
					if ( this.settings.wrapper ) {
	
						// Make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
					}
					if ( this.labelContainer.length ) {
						this.labelContainer.append( place );
					} else if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement.call( this, place, $( element ) );
					} else {
						place.insertAfter( element );
					}
	
					// Link error back to the element
					if ( error.is( "label" ) ) {
	
						// If the error is a label, then associate using 'for'
						error.attr( "for", elementID );
	
						// If the element is not a child of an associated label, then it's necessary
						// to explicitly apply aria-describedby
					} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
						errorID = error.attr( "id" );
	
						// Respect existing non-error aria-describedby
						if ( !describedBy ) {
							describedBy = errorID;
						} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {
	
							// Add to end of list if not already present
							describedBy += " " + errorID;
						}
						$( element ).attr( "aria-describedby", describedBy );
	
						// If this element is grouped, then assign to all elements in the same group
						group = this.groups[ element.name ];
						if ( group ) {
							v = this;
							$.each( v.groups, function( name, testgroup ) {
								if ( testgroup === group ) {
									$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
										.attr( "aria-describedby", error.attr( "id" ) );
								}
							} );
						}
					}
				}
				if ( !message && this.settings.success ) {
					error.text( "" );
					if ( typeof this.settings.success === "string" ) {
						error.addClass( this.settings.success );
					} else {
						this.settings.success( error, element );
					}
				}
				this.toShow = this.toShow.add( error );
			},
	
			errorsFor: function( element ) {
				var name = this.escapeCssMeta( this.idOrName( element ) ),
					describer = $( element ).attr( "aria-describedby" ),
					selector = "label[for='" + name + "'], label[for='" + name + "'] *";
	
				// 'aria-describedby' should directly reference the error element
				if ( describer ) {
					selector = selector + ", #" + this.escapeCssMeta( describer )
						.replace( /\s+/g, ", #" );
				}
	
				return this
					.errors()
					.filter( selector );
			},
	
			// See https://api.jquery.com/category/selectors/, for CSS
			// meta-characters that should be escaped in order to be used with JQuery
			// as a literal part of a name/id or any selector.
			escapeCssMeta: function( string ) {
				return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
			},
	
			idOrName: function( element ) {
				return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
			},
	
			validationTargetFor: function( element ) {
	
				// If radio/checkbox, validate first element in group instead
				if ( this.checkable( element ) ) {
					element = this.findByName( element.name );
				}
	
				// Always apply ignore filter
				return $( element ).not( this.settings.ignore )[ 0 ];
			},
	
			checkable: function( element ) {
				return ( /radio|checkbox/i ).test( element.type );
			},
	
			findByName: function( name ) {
				return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
			},
	
			getLength: function( value, element ) {
				switch ( element.nodeName.toLowerCase() ) {
				case "select":
					return $( "option:selected", element ).length;
				case "input":
					if ( this.checkable( element ) ) {
						return this.findByName( element.name ).filter( ":checked" ).length;
					}
				}
				return value.length;
			},
	
			depend: function( param, element ) {
				return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
			},
	
			dependTypes: {
				"boolean": function( param ) {
					return param;
				},
				"string": function( param, element ) {
					return !!$( param, element.form ).length;
				},
				"function": function( param, element ) {
					return param( element );
				}
			},
	
			optional: function( element ) {
				var val = this.elementValue( element );
				return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
			},
	
			startRequest: function( element ) {
				if ( !this.pending[ element.name ] ) {
					this.pendingRequest++;
					$( element ).addClass( this.settings.pendingClass );
					this.pending[ element.name ] = true;
				}
			},
	
			stopRequest: function( element, valid ) {
				this.pendingRequest--;
	
				// Sometimes synchronization fails, make sure pendingRequest is never < 0
				if ( this.pendingRequest < 0 ) {
					this.pendingRequest = 0;
				}
				delete this.pending[ element.name ];
				$( element ).removeClass( this.settings.pendingClass );
				if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
					$( this.currentForm ).submit();
					this.formSubmitted = false;
				} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
					this.formSubmitted = false;
				}
			},
	
			previousValue: function( element, method ) {
				method = typeof method === "string" && method || "remote";
	
				return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
					old: null,
					valid: true,
					message: this.defaultMessage( element, { method: method } )
				} );
			},
	
			// Cleans up all forms and elements, removes validator-specific events
			destroy: function() {
				this.resetForm();
	
				$( this.currentForm )
					.off( ".validate" )
					.removeData( "validator" )
					.find( ".validate-equalTo-blur" )
						.off( ".validate-equalTo" )
						.removeClass( "validate-equalTo-blur" );
			}
	
		},
	
		classRuleSettings: {
			required: { required: true },
			email: { email: true },
			url: { url: true },
			date: { date: true },
			dateISO: { dateISO: true },
			number: { number: true },
			digits: { digits: true },
			creditcard: { creditcard: true }
		},
	
		addClassRules: function( className, rules ) {
			if ( className.constructor === String ) {
				this.classRuleSettings[ className ] = rules;
			} else {
				$.extend( this.classRuleSettings, className );
			}
		},
	
		classRules: function( element ) {
			var rules = {},
				classes = $( element ).attr( "class" );
	
			if ( classes ) {
				$.each( classes.split( " " ), function() {
					if ( this in $.validator.classRuleSettings ) {
						$.extend( rules, $.validator.classRuleSettings[ this ] );
					}
				} );
			}
			return rules;
		},
	
		normalizeAttributeRule: function( rules, type, method, value ) {
	
			// Convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number( value );
	
				// Support Opera Mini, which returns NaN for undefined minlength
				if ( isNaN( value ) ) {
					value = undefined;
				}
			}
	
			if ( value || value === 0 ) {
				rules[ method ] = value;
			} else if ( type === method && type !== "range" ) {
	
				// Exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[ method ] = true;
			}
		},
	
		attributeRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;
	
			for ( method in $.validator.methods ) {
	
				// Support for <input required> in both html5 and older browsers
				if ( method === "required" ) {
					value = element.getAttribute( method );
	
					// Some browsers return an empty string for the required attribute
					// and non-HTML5 browsers might have required="" markup
					if ( value === "" ) {
						value = true;
					}
	
					// Force non-HTML5 browsers to return bool
					value = !!value;
				} else {
					value = $element.attr( method );
				}
	
				this.normalizeAttributeRule( rules, type, method, value );
			}
	
			// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
			if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
				delete rules.maxlength;
			}
	
			return rules;
		},
	
		dataRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;
	
			for ( method in $.validator.methods ) {
				value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
				this.normalizeAttributeRule( rules, type, method, value );
			}
			return rules;
		},
	
		staticRules: function( element ) {
			var rules = {},
				validator = $.data( element.form, "validator" );
	
			if ( validator.settings.rules ) {
				rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
			}
			return rules;
		},
	
		normalizeRules: function( rules, element ) {
	
			// Handle dependency check
			$.each( rules, function( prop, val ) {
	
				// Ignore rule when param is explicitly false, eg. required:false
				if ( val === false ) {
					delete rules[ prop ];
					return;
				}
				if ( val.param || val.depends ) {
					var keepRule = true;
					switch ( typeof val.depends ) {
					case "string":
						keepRule = !!$( val.depends, element.form ).length;
						break;
					case "function":
						keepRule = val.depends.call( element, element );
						break;
					}
					if ( keepRule ) {
						rules[ prop ] = val.param !== undefined ? val.param : true;
					} else {
						$.data( element.form, "validator" ).resetElements( $( element ) );
						delete rules[ prop ];
					}
				}
			} );
	
			// Evaluate parameters
			$.each( rules, function( rule, parameter ) {
				rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
			} );
	
			// Clean number parameters
			$.each( [ "minlength", "maxlength" ], function() {
				if ( rules[ this ] ) {
					rules[ this ] = Number( rules[ this ] );
				}
			} );
			$.each( [ "rangelength", "range" ], function() {
				var parts;
				if ( rules[ this ] ) {
					if ( $.isArray( rules[ this ] ) ) {
						rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
					} else if ( typeof rules[ this ] === "string" ) {
						parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
						rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
					}
				}
			} );
	
			if ( $.validator.autoCreateRanges ) {
	
				// Auto-create ranges
				if ( rules.min != null && rules.max != null ) {
					rules.range = [ rules.min, rules.max ];
					delete rules.min;
					delete rules.max;
				}
				if ( rules.minlength != null && rules.maxlength != null ) {
					rules.rangelength = [ rules.minlength, rules.maxlength ];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}
	
			return rules;
		},
	
		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule: function( data ) {
			if ( typeof data === "string" ) {
				var transformed = {};
				$.each( data.split( /\s/ ), function() {
					transformed[ this ] = true;
				} );
				data = transformed;
			}
			return data;
		},
	
		// http://jqueryvalidation.org/jQuery.validator.addMethod/
		addMethod: function( name, method, message ) {
			$.validator.methods[ name ] = method;
			$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
			if ( method.length < 3 ) {
				$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
			}
		},
	
		// http://jqueryvalidation.org/jQuery.validator.methods/
		methods: {
	
			// http://jqueryvalidation.org/required-method/
			required: function( value, element, param ) {
	
				// Check if dependency is met
				if ( !this.depend( param, element ) ) {
					return "dependency-mismatch";
				}
				if ( element.nodeName.toLowerCase() === "select" ) {
	
					// Could be an array for select-multiple or a string, both are fine this way
					var val = $( element ).val();
					return val && val.length > 0;
				}
				if ( this.checkable( element ) ) {
					return this.getLength( value, element ) > 0;
				}
				return value.length > 0;
			},
	
			// http://jqueryvalidation.org/email-method/
			email: function( value, element ) {
	
				// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
				// Retrieved 2014-01-14
				// If you have a problem with this implementation, report a bug against the above spec
				// Or use custom methods to implement your own email validation
				return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
			},
	
			// http://jqueryvalidation.org/url-method/
			url: function( value, element ) {
	
				// Copyright (c) 2010-2013 Diego Perini, MIT licensed
				// https://gist.github.com/dperini/729294
				// see also https://mathiasbynens.be/demo/url-regex
				// modified to allow protocol-relative URLs
				return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
			},
	
			// http://jqueryvalidation.org/date-method/
			date: function( value, element ) {
				return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
			},
	
			// http://jqueryvalidation.org/dateISO-method/
			dateISO: function( value, element ) {
				return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
			},
	
			// http://jqueryvalidation.org/number-method/
			number: function( value, element ) {
				return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
			},
	
			// http://jqueryvalidation.org/digits-method/
			digits: function( value, element ) {
				return this.optional( element ) || /^\d+$/.test( value );
			},
	
			// http://jqueryvalidation.org/minlength-method/
			minlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length >= param;
			},
	
			// http://jqueryvalidation.org/maxlength-method/
			maxlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length <= param;
			},
	
			// http://jqueryvalidation.org/rangelength-method/
			rangelength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
			},
	
			// http://jqueryvalidation.org/min-method/
			min: function( value, element, param ) {
				return this.optional( element ) || value >= param;
			},
	
			// http://jqueryvalidation.org/max-method/
			max: function( value, element, param ) {
				return this.optional( element ) || value <= param;
			},
	
			// http://jqueryvalidation.org/range-method/
			range: function( value, element, param ) {
				return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
			},
	
			// http://jqueryvalidation.org/step-method/
			step: function( value, element, param ) {
				var type = $( element ).attr( "type" ),
					errorMessage = "Step attribute on input type " + type + " is not supported.",
					supportedTypes = [ "text", "number", "range" ],
					re = new RegExp( "\\b" + type + "\\b" ),
					notSupported = type && !re.test( supportedTypes.join() ),
					decimalPlaces = function( num ) {
						var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
						if ( !match ) {
							return 0;
						}
	
						// Number of digits right of decimal point.
						return match[ 1 ] ? match[ 1 ].length : 0;
					},
					toInt = function( num ) {
						return Math.round( num * Math.pow( 10, decimals ) );
					},
					valid = true,
					decimals;
	
				// Works only for text, number and range input types
				// TODO find a way to support input types date, datetime, datetime-local, month, time and week
				if ( notSupported ) {
					throw new Error( errorMessage );
				}
	
				decimals = decimalPlaces( param );
	
				// Value can't have too many decimals
				if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
					valid = false;
				}
	
				return this.optional( element ) || valid;
			},
	
			// http://jqueryvalidation.org/equalTo-method/
			equalTo: function( value, element, param ) {
	
				// Bind to the blur event of the target in order to revalidate whenever the target field is updated
				var target = $( param );
				if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
					target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
						$( element ).valid();
					} );
				}
				return value === target.val();
			},
	
			// http://jqueryvalidation.org/remote-method/
			remote: function( value, element, param, method ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}
	
				method = typeof method === "string" && method || "remote";
	
				var previous = this.previousValue( element, method ),
					validator, data, optionDataString;
	
				if ( !this.settings.messages[ element.name ] ) {
					this.settings.messages[ element.name ] = {};
				}
				previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
				this.settings.messages[ element.name ][ method ] = previous.message;
	
				param = typeof param === "string" && { url: param } || param;
				optionDataString = $.param( $.extend( { data: value }, param.data ) );
				if ( previous.old === optionDataString ) {
					return previous.valid;
				}
	
				previous.old = optionDataString;
				validator = this;
				this.startRequest( element );
				data = {};
				data[ element.name ] = value;
				$.ajax( $.extend( true, {
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					context: validator.currentForm,
					success: function( response ) {
						var valid = response === true || response === "true",
							errors, message, submitted;
	
						validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
						if ( valid ) {
							submitted = validator.formSubmitted;
							validator.resetInternals();
							validator.toHide = validator.errorsFor( element );
							validator.formSubmitted = submitted;
							validator.successList.push( element );
							validator.invalid[ element.name ] = false;
							validator.showErrors();
						} else {
							errors = {};
							message = response || validator.defaultMessage( element, { method: method, parameters: value } );
							errors[ element.name ] = previous.message = message;
							validator.invalid[ element.name ] = true;
							validator.showErrors( errors );
						}
						previous.valid = valid;
						validator.stopRequest( element, valid );
					}
				}, param ) );
				return "pending";
			}
		}
	
	} );
	
	// Ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
	
	var pendingRequests = {},
		ajax;
	
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter( function( settings, _, xhr ) {
			var port = settings.port;
			if ( settings.mode === "abort" ) {
				if ( pendingRequests[ port ] ) {
					pendingRequests[ port ].abort();
				}
				pendingRequests[ port ] = xhr;
			}
		} );
	} else {
	
		// Proxy ajax
		ajax = $.ajax;
		$.ajax = function( settings ) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if ( mode === "abort" ) {
				if ( pendingRequests[ port ] ) {
					pendingRequests[ port ].abort();
				}
				pendingRequests[ port ] = ajax.apply( this, arguments );
				return pendingRequests[ port ];
			}
			return ajax.apply( this, arguments );
		};
	}
	
	}));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
	** Unobtrusive validation support library for jQuery and jQuery Validate
	** Copyright (C) Microsoft Corporation. All rights reserved.
	*/
	
	/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: false */
	/*global document: false, jQuery: false */
	
	(function ($) {
	    var $jQval = $.validator,
	        adapters,
	        data_validation = "unobtrusiveValidation";
	
	    function setValidationValues(options, ruleName, value) {
	        options.rules[ruleName] = value;
	        if (options.message) {
	            options.messages[ruleName] = options.message;
	        }
	    }
	
	    function splitAndTrim(value) {
	        return value.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g);
	    }
	
	    function escapeAttributeValue(value) {
	        // As mentioned on http://api.jquery.com/category/selectors/
	        return value.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
	    }
	
	    function getModelPrefix(fieldName) {
	        return fieldName.substr(0, fieldName.lastIndexOf(".") + 1);
	    }
	
	    function appendModelPrefix(value, prefix) {
	        if (value.indexOf("*.") === 0) {
	            value = value.replace("*.", prefix);
	        }
	        return value;
	    }
	
	    function onError(error, inputElement) {  // 'this' is the form element
	        var container = $(this).find("[data-valmsg-for='" + escapeAttributeValue(inputElement[0].name) + "']"),
	            replaceAttrValue = container.attr("data-valmsg-replace"),
	            replace = replaceAttrValue ? $.parseJSON(replaceAttrValue) !== false : null;
	
	        container.removeClass("field-validation-valid").addClass("field-validation-error");
	        error.data("unobtrusiveContainer", container);
	
	        if (replace) {
	            container.empty();
	            error.removeClass("input-validation-error").appendTo(container);
	        }
	        else {
	            error.hide();
	        }
	    }
	
	    function onErrors(event, validator) {  // 'this' is the form element
	        var container = $(this).find("[data-valmsg-summary=true]"),
	            list = container.find("ul");
	
	        if (list && list.length && validator.errorList.length) {
	            list.empty();
	            container.addClass("validation-summary-errors").removeClass("validation-summary-valid");
	
	            $.each(validator.errorList, function () {
	                $("<li />").html(this.message).appendTo(list);
	            });
	        }
	    }
	
	    function onSuccess(error) {  // 'this' is the form element
	        var container = error.data("unobtrusiveContainer");
	
	        if (container) {
	            var replaceAttrValue = container.attr("data-valmsg-replace"),
	                replace = replaceAttrValue ? $.parseJSON(replaceAttrValue) : null;
	
	            container.addClass("field-validation-valid").removeClass("field-validation-error");
	            error.removeData("unobtrusiveContainer");
	
	            if (replace) {
	                container.empty();
	            }
	        }
	    }
	
	    function onReset(event) {  // 'this' is the form element
	        var $form = $(this),
	            key = '__jquery_unobtrusive_validation_form_reset';
	        if ($form.data(key)) {
	            return;
	        }
	        // Set a flag that indicates we're currently resetting the form.
	        $form.data(key, true);
	        try {
	            $form.data("validator").resetForm();
	        } finally {
	            $form.removeData(key);
	        }
	
	        $form.find(".validation-summary-errors")
	            .addClass("validation-summary-valid")
	            .removeClass("validation-summary-errors");
	        $form.find(".field-validation-error")
	            .addClass("field-validation-valid")
	            .removeClass("field-validation-error")
	            .removeData("unobtrusiveContainer")
	            .find(">*")  // If we were using valmsg-replace, get the underlying error
	                .removeData("unobtrusiveContainer");
	    }
	
	    function validationInfo(form) {
	        var $form = $(form),
	            result = $form.data(data_validation),
	            onResetProxy = $.proxy(onReset, form),
	            defaultOptions = $jQval.unobtrusive.options || {},
	            execInContext = function (name, args) {
	                var func = defaultOptions[name];
	                func && $.isFunction(func) && func.apply(form, args);
	            }
	
	        if (!result) {
	            result = {
	                options: {  // options structure passed to jQuery Validate's validate() method
	                    errorClass: defaultOptions.errorClass || "input-validation-error",
	                    errorElement: defaultOptions.errorElement || "span",
	                    errorPlacement: function () {
	                        onError.apply(form, arguments);
	                        execInContext("errorPlacement", arguments);
	                    },
	                    invalidHandler: function () {
	                        onErrors.apply(form, arguments);
	                        execInContext("invalidHandler", arguments);
	                    },
	                    messages: {},
	                    rules: {},
	                    success: function () {
	                        onSuccess.apply(form, arguments);
	                        execInContext("success", arguments);
	                    }
	                },
	                attachValidation: function () {
	                    $form
	                        .off("reset." + data_validation, onResetProxy)
	                        .on("reset." + data_validation, onResetProxy)
	                        .validate(this.options);
	                },
	                validate: function () {  // a validation function that is called by unobtrusive Ajax
	                    $form.validate();
	                    return $form.valid();
	                }
	            };
	            $form.data(data_validation, result);
	        }
	
	        return result;
	    }
	
	    $jQval.unobtrusive = {
	        adapters: [],
	
	        parseElement: function (element, skipAttach) {
	            /// <summary>
	            /// Parses a single HTML element for unobtrusive validation attributes.
	            /// </summary>
	            /// <param name="element" domElement="true">The HTML element to be parsed.</param>
	            /// <param name="skipAttach" type="Boolean">[Optional] true to skip attaching the
	            /// validation to the form. If parsing just this single element, you should specify true.
	            /// If parsing several elements, you should specify false, and manually attach the validation
	            /// to the form when you are finished. The default is false.</param>
	            var $element = $(element),
	                form = $element.parents("form")[0],
	                valInfo, rules, messages;
	
	            if (!form) {  // Cannot do client-side validation without a form
	                return;
	            }
	
	            valInfo = validationInfo(form);
	            valInfo.options.rules[element.name] = rules = {};
	            valInfo.options.messages[element.name] = messages = {};
	
	            $.each(this.adapters, function () {
	                var prefix = "data-val-" + this.name,
	                    message = $element.attr(prefix),
	                    paramValues = {};
	
	                if (message !== undefined) {  // Compare against undefined, because an empty message is legal (and falsy)
	                    prefix += "-";
	
	                    $.each(this.params, function () {
	                        paramValues[this] = $element.attr(prefix + this);
	                    });
	
	                    this.adapt({
	                        element: element,
	                        form: form,
	                        message: message,
	                        params: paramValues,
	                        rules: rules,
	                        messages: messages
	                    });
	                }
	            });
	
	            $.extend(rules, { "__dummy__": true });
	
	            if (!skipAttach) {
	                valInfo.attachValidation();
	            }
	        },
	
	        parse: function (selector) {
	            /// <summary>
	            /// Parses all the HTML elements in the specified selector. It looks for input elements decorated
	            /// with the [data-val=true] attribute value and enables validation according to the data-val-*
	            /// attribute values.
	            /// </summary>
	            /// <param name="selector" type="String">Any valid jQuery selector.</param>
	
	            // $forms includes all forms in selector's DOM hierarchy (parent, children and self) that have at least one
	            // element with data-val=true
	            var $selector = $(selector),
	                $forms = $selector.parents()
	                                  .addBack()
	                                  .filter("form")
	                                  .add($selector.find("form"))
	                                  .has("[data-val=true]");
	
	            $selector.find("[data-val=true]").each(function () {
	                $jQval.unobtrusive.parseElement(this, true);
	            });
	
	            $forms.each(function () {
	                var info = validationInfo(this);
	                if (info) {
	                    info.attachValidation();
	                }
	            });
	        }
	    };
	
	    adapters = $jQval.unobtrusive.adapters;
	
	    adapters.add = function (adapterName, params, fn) {
	        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation.</summary>
	        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
	        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
	        /// <param name="params" type="Array" optional="true">[Optional] An array of parameter names (strings) that will
	        /// be extracted from the data-val-nnnn-mmmm HTML attributes (where nnnn is the adapter name, and
	        /// mmmm is the parameter name).</param>
	        /// <param name="fn" type="Function">The function to call, which adapts the values from the HTML
	        /// attributes into jQuery Validate rules and/or messages.</param>
	        /// <returns type="jQuery.validator.unobtrusive.adapters" />
	        if (!fn) {  // Called with no params, just a function
	            fn = params;
	            params = [];
	        }
	        this.push({ name: adapterName, params: params, adapt: fn });
	        return this;
	    };
	
	    adapters.addBool = function (adapterName, ruleName) {
	        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
	        /// the jQuery Validate validation rule has no parameter values.</summary>
	        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
	        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
	        /// <param name="ruleName" type="String" optional="true">[Optional] The name of the jQuery Validate rule. If not provided, the value
	        /// of adapterName will be used instead.</param>
	        /// <returns type="jQuery.validator.unobtrusive.adapters" />
	        return this.add(adapterName, function (options) {
	            setValidationValues(options, ruleName || adapterName, true);
	        });
	    };
	
	    adapters.addMinMax = function (adapterName, minRuleName, maxRuleName, minMaxRuleName, minAttribute, maxAttribute) {
	        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
	        /// the jQuery Validate validation has three potential rules (one for min-only, one for max-only, and
	        /// one for min-and-max). The HTML parameters are expected to be named -min and -max.</summary>
	        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
	        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
	        /// <param name="minRuleName" type="String">The name of the jQuery Validate rule to be used when you only
	        /// have a minimum value.</param>
	        /// <param name="maxRuleName" type="String">The name of the jQuery Validate rule to be used when you only
	        /// have a maximum value.</param>
	        /// <param name="minMaxRuleName" type="String">The name of the jQuery Validate rule to be used when you
	        /// have both a minimum and maximum value.</param>
	        /// <param name="minAttribute" type="String" optional="true">[Optional] The name of the HTML attribute that
	        /// contains the minimum value. The default is "min".</param>
	        /// <param name="maxAttribute" type="String" optional="true">[Optional] The name of the HTML attribute that
	        /// contains the maximum value. The default is "max".</param>
	        /// <returns type="jQuery.validator.unobtrusive.adapters" />
	        return this.add(adapterName, [minAttribute || "min", maxAttribute || "max"], function (options) {
	            var min = options.params.min,
	                max = options.params.max;
	
	            if (min && max) {
	                setValidationValues(options, minMaxRuleName, [min, max]);
	            }
	            else if (min) {
	                setValidationValues(options, minRuleName, min);
	            }
	            else if (max) {
	                setValidationValues(options, maxRuleName, max);
	            }
	        });
	    };
	
	    adapters.addSingleVal = function (adapterName, attribute, ruleName) {
	        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
	        /// the jQuery Validate validation rule has a single value.</summary>
	        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
	        /// in the data-val-nnnn HTML attribute(where nnnn is the adapter name).</param>
	        /// <param name="attribute" type="String">[Optional] The name of the HTML attribute that contains the value.
	        /// The default is "val".</param>
	        /// <param name="ruleName" type="String" optional="true">[Optional] The name of the jQuery Validate rule. If not provided, the value
	        /// of adapterName will be used instead.</param>
	        /// <returns type="jQuery.validator.unobtrusive.adapters" />
	        return this.add(adapterName, [attribute || "val"], function (options) {
	            setValidationValues(options, ruleName || adapterName, options.params[attribute]);
	        });
	    };
	
	    $jQval.addMethod("__dummy__", function (value, element, params) {
	        return true;
	    });
	
	    $jQval.addMethod("regex", function (value, element, params) {
	        var match;
	        if (this.optional(element)) {
	            return true;
	        }
	
	        match = new RegExp(params).exec(value);
	        return (match && (match.index === 0) && (match[0].length === value.length));
	    });
	
	    $jQval.addMethod("nonalphamin", function (value, element, nonalphamin) {
	        var match;
	        if (nonalphamin) {
	            match = value.match(/\W/g);
	            match = match && match.length >= nonalphamin;
	        }
	        return match;
	    });
	
	    if ($jQval.methods.extension) {
	        adapters.addSingleVal("accept", "mimtype");
	        adapters.addSingleVal("extension", "extension");
	    } else {
	        // for backward compatibility, when the 'extension' validation method does not exist, such as with versions
	        // of JQuery Validation plugin prior to 1.10, we should use the 'accept' method for
	        // validating the extension, and ignore mime-type validations as they are not supported.
	        adapters.addSingleVal("extension", "extension", "accept");
	    }
	
	    adapters.addSingleVal("regex", "pattern");
	    adapters.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
	    adapters.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
	    adapters.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
	    adapters.add("equalto", ["other"], function (options) {
	        var prefix = getModelPrefix(options.element.name),
	            other = options.params.other,
	            fullOtherName = appendModelPrefix(other, prefix),
	            element = $(options.form).find(":input").filter("[name='" + escapeAttributeValue(fullOtherName) + "']")[0];
	
	        setValidationValues(options, "equalTo", element);
	    });
	    adapters.add("required", function (options) {
	        // jQuery Validate equates "required" with "mandatory" for checkbox elements
	        if (options.element.tagName.toUpperCase() !== "INPUT" || options.element.type.toUpperCase() !== "CHECKBOX") {
	            setValidationValues(options, "required", true);
	        }
	    });
	    adapters.add("remote", ["url", "type", "additionalfields"], function (options) {
	        var value = {
	            url: options.params.url,
	            type: options.params.type || "GET",
	            data: {}
	        },
	            prefix = getModelPrefix(options.element.name);
	
	        $.each(splitAndTrim(options.params.additionalfields || options.element.name), function (i, fieldName) {
	            var paramName = appendModelPrefix(fieldName, prefix);
	            value.data[paramName] = function () {
	                var field = $(options.form).find(":input").filter("[name='" + escapeAttributeValue(paramName) + "']");
	                // For checkboxes and radio buttons, only pick up values from checked fields.
	                if (field.is(":checkbox")) {
	                    return field.filter(":checked").val() || field.filter(":hidden").val() || '';
	                }
	                else if (field.is(":radio")) {
	                    return field.filter(":checked").val() || '';
	                }
	                return field.val();
	            };
	        });
	
	        setValidationValues(options, "remote", value);
	    });
	    adapters.add("password", ["min", "nonalphamin", "regex"], function (options) {
	        if (options.params.min) {
	            setValidationValues(options, "minlength", options.params.min);
	        }
	        if (options.params.nonalphamin) {
	            setValidationValues(options, "nonalphamin", options.params.nonalphamin);
	        }
	        if (options.params.regex) {
	            setValidationValues(options, "regex", options.params.regex);
	        }
	    });
	
	    $(function () {
	        $jQval.unobtrusive.parse(document);
	    });
	}(jQuery));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* 
	 * Microsoft grants you the right to use these script files for the sole
	 * purpose of either: (i) interacting through your browser with the Microsoft
	 * website or online service, subject to the applicable licensing or use
	 * terms; or (ii) using the files as included with a Microsoft product subject
	 * to that product's license terms. Microsoft reserves all other rights to the
	 * files not expressly granted by Microsoft, whether by implication, estoppel
	 * or otherwise. Insofar as a script file is dual licensed under GPL,
	 * Microsoft neither took the code under GPL nor distributes it thereunder but
	 * under the terms set out in this paragraph. All notices and licenses
	 * below are for informational purposes only.
	/*!
	** Unobtrusive Ajax support library for jQuery
	** Copyright (C) Microsoft Corporation. All rights reserved.
	*/
	
	/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: false */
	/*global window: false, jQuery: false */
	
	(function ($) {
	    var data_click = "unobtrusiveAjaxClick",
	        data_target = "unobtrusiveAjaxClickTarget",
	        data_validation = "unobtrusiveValidation";
	
	    function getFunction(code, argNames) {
	        var fn = window, parts = (code || "").split(".");
	        while (fn && parts.length) {
	            fn = fn[parts.shift()];
	        }
	        if (typeof (fn) === "function") {
	            return fn;
	        }
	        argNames.push(code);
	        return Function.constructor.apply(null, argNames);
	    }
	
	    function isMethodProxySafe(method) {
	        return method === "GET" || method === "POST";
	    }
	
	    function asyncOnBeforeSend(xhr, method) {
	        if (!isMethodProxySafe(method)) {
	            xhr.setRequestHeader("X-HTTP-Method-Override", method);
	        }
	    }
	
	    function asyncOnSuccess(element, data, contentType) {
	        var mode;
	
	        if (contentType.indexOf("application/x-javascript") !== -1) {  // jQuery already executes JavaScript for us
	            return;
	        }
	
	        mode = (element.getAttribute("data-ajax-mode") || "").toUpperCase();
	        $(element.getAttribute("data-ajax-update")).each(function (i, update) {
	            var top;
	
	            switch (mode) {
	            case "BEFORE":
	                top = update.firstChild;
	                $("<div />").html(data).contents().each(function () {
	                    update.insertBefore(this, top);
	                });
	                break;
	            case "AFTER":
	                $("<div />").html(data).contents().each(function () {
	                    update.appendChild(this);
	                });
	                break;
	            case "REPLACE-WITH":
	                $(update).replaceWith(data);
	                break;
	            default:
	                $(update).html(data);
	                break;
	            }
	        });
	    }
	
	    function asyncRequest(element, options) {
	        var confirm, loading, method, duration;
	
	        confirm = element.getAttribute("data-ajax-confirm");
	        if (confirm && !window.confirm(confirm)) {
	            return;
	        }
	
	        loading = $(element.getAttribute("data-ajax-loading"));
	        duration = parseInt(element.getAttribute("data-ajax-loading-duration"), 10) || 0;
	
	        $.extend(options, {
	            type: element.getAttribute("data-ajax-method") || undefined,
	            url: element.getAttribute("data-ajax-url") || undefined,
	            cache: (element.getAttribute("data-ajax-cache") || "").toLowerCase() === "true",
	            beforeSend: function (xhr) {
	                var result;
	                asyncOnBeforeSend(xhr, method);
	                result = getFunction(element.getAttribute("data-ajax-begin"), ["xhr"]).apply(element, arguments);
	                if (result !== false) {
	                    loading.show(duration);
	                }
	                return result;
	            },
	            complete: function () {
	                loading.hide(duration);
	                getFunction(element.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(element, arguments);
	            },
	            success: function (data, status, xhr) {
	                asyncOnSuccess(element, data, xhr.getResponseHeader("Content-Type") || "text/html");
	                getFunction(element.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(element, arguments);
	            },
	            error: function () {
	                getFunction(element.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(element, arguments);
	            }
	        });
	
	        options.data.push({ name: "X-Requested-With", value: "XMLHttpRequest" });
	
	        method = options.type.toUpperCase();
	        if (!isMethodProxySafe(method)) {
	            options.type = "POST";
	            options.data.push({ name: "X-HTTP-Method-Override", value: method });
	        }
	
	        $.ajax(options);
	    }
	
	    function validate(form) {
	        var validationInfo = $(form).data(data_validation);
	        return !validationInfo || !validationInfo.validate || validationInfo.validate();
	    }
	
	    $(document).on("click", "a[data-ajax=true]", function (evt) {
	        evt.preventDefault();
	        asyncRequest(this, {
	            url: this.href,
	            type: "GET",
	            data: []
	        });
	    });
	
	    $(document).on("click", "form[data-ajax=true] input[type=image]", function (evt) {
	        var name = evt.target.name,
	            target = $(evt.target),
	            form = $(target.parents("form")[0]),
	            offset = target.offset();
	
	        form.data(data_click, [
	            { name: name + ".x", value: Math.round(evt.pageX - offset.left) },
	            { name: name + ".y", value: Math.round(evt.pageY - offset.top) }
	        ]);
	
	        setTimeout(function () {
	            form.removeData(data_click);
	        }, 0);
	    });
	
	    $(document).on("click", "form[data-ajax=true] :submit", function (evt) {
	        var name = evt.currentTarget.name,
	            target = $(evt.target),
	            form = $(target.parents("form")[0]);
	
	        form.data(data_click, name ? [{ name: name, value: evt.currentTarget.value }] : []);
	        form.data(data_target, target);
	
	        setTimeout(function () {
	            form.removeData(data_click);
	            form.removeData(data_target);
	        }, 0);
	    });
	
	    $(document).on("submit", "form[data-ajax=true]", function (evt) {
	        var clickInfo = $(this).data(data_click) || [],
	            clickTarget = $(this).data(data_target),
	            isCancel = clickTarget && clickTarget.hasClass("cancel");
	        evt.preventDefault();
	        if (!isCancel && !validate(this)) {
	            return;
	        }
	        asyncRequest(this, {
	            url: this.action,
	            type: this.method || "GET",
	            data: clickInfo.concat($(this).serializeArray())
	        });
	    });
	}(jQuery));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	/*!
	 * fancyBox - jQuery Plugin
	 * version: 2.1.5 (Fri, 14 Jun 2013)
	 * requires jQuery v1.6 or later
	 *
	 * Examples at http://fancyapps.com/fancybox/
	 * License: www.fancyapps.com/fancybox/#license
	 *
	 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
	 *
	 */
	
	module.exports = function(jQuery) {
	    "use strict";
	
	    var H = jQuery("html"),
	        W = jQuery(window),
	        D = jQuery(document),
	        F = jQuery.fancybox = function() {
	            F.open.apply(this, arguments);
	        },
	        IE = navigator.userAgent.match(/msie/i),
	        didUpdate = null,
	        isTouch = document.createTouch !== undefined,
	
	        isQuery = function(obj) {
	            return obj && obj.hasOwnProperty && obj instanceof jQuery;
	        },
	        isString = function(str) {
	            return str && jQuery.type(str) === "string";
	        },
	        isPercentage = function(str) {
	            return isString(str) && str.indexOf('%') > 0;
	        },
	        isScrollable = function(el) {
	            return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
	        },
	        getScalar = function(orig, dim) {
	            var value = parseInt(orig, 10) || 0;
	
	            if (dim && isPercentage(orig)) {
	                value = F.getViewport()[dim] / 100 * value;
	            }
	
	            return Math.ceil(value);
	        },
	        getValue = function(value, dim) {
	            return getScalar(value, dim) + 'px';
	        };
	
	    jQuery.extend(F, {
	        // The current version of fancyBox
	        version: '2.1.5',
	
	        defaults: {
	            padding: 15,
	            margin: 20,
	
	            width: 800,
	            height: 600,
	            minWidth: 100,
	            minHeight: 100,
	            maxWidth: 9999,
	            maxHeight: 9999,
	            pixelRatio: 1, // Set to 2 for retina display support
	
	            autoSize: true,
	            autoHeight: false,
	            autoWidth: false,
	
	            autoResize: true,
	            autoCenter: !isTouch,
	            fitToView: true,
	            aspectRatio: false,
	            topRatio: 0.5,
	            leftRatio: 0.5,
	
	            scrolling: 'auto', // 'auto', 'yes' or 'no'
	            wrapCSS: '',
	
	            arrows: true,
	            closeBtn: true,
	            closeClick: false,
	            nextClick: false,
	            mouseWheel: true,
	            autoPlay: false,
	            playSpeed: 3000,
	            preload: 3,
	            modal: false,
	            loop: true,
	
	            ajax: {
	                dataType: 'html',
	                headers: {
	                    'X-fancyBox': true
	                }
	            },
	            iframe: {
	                scrolling: 'auto',
	                preload: true
	            },
	            swf: {
	                wmode: 'transparent',
	                allowfullscreen: 'true',
	                allowscriptaccess: 'always'
	            },
	
	            keys: {
	                next: {
	                    13: 'left', // enter
	                    34: 'up', // page down
	                    39: 'left', // right arrow
	                    40: 'up' // down arrow
	                },
	                prev: {
	                    8: 'right', // backspace
	                    33: 'down', // page up
	                    37: 'right', // left arrow
	                    38: 'down' // up arrow
	                },
	                close: [27], // escape key
	                play: [32], // space - start/stop slideshow
	                toggle: [70] // letter "f" - toggle fullscreen
	            },
	
	            direction: {
	                next: 'left',
	                prev: 'right'
	            },
	
	            scrollOutside: true,
	
	            // Override some properties
	            index: 0,
	            type: null,
	            href: null,
	            content: null,
	            title: null,
	
	            // HTML templates
	            tpl: {
	                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
	                image: '<img class="fancybox-image" src="{href}" alt="" />',
	                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
	                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
	                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
	                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
	                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
	                loading: '<div id="fancybox-loading"><div></div></div>'
	            },
	
	            // Properties for each animation type
	            // Opening fancyBox
	            openEffect: 'fade', // 'elastic', 'fade' or 'none'
	            openSpeed: 250,
	            openEasing: 'swing',
	            openOpacity: true,
	            openMethod: 'zoomIn',
	
	            // Closing fancyBox
	            closeEffect: 'fade', // 'elastic', 'fade' or 'none'
	            closeSpeed: 250,
	            closeEasing: 'swing',
	            closeOpacity: true,
	            closeMethod: 'zoomOut',
	
	            // Changing next gallery item
	            nextEffect: 'elastic', // 'elastic', 'fade' or 'none'
	            nextSpeed: 250,
	            nextEasing: 'swing',
	            nextMethod: 'changeIn',
	
	            // Changing previous gallery item
	            prevEffect: 'elastic', // 'elastic', 'fade' or 'none'
	            prevSpeed: 250,
	            prevEasing: 'swing',
	            prevMethod: 'changeOut',
	
	            // Enable default helpers
	            helpers: {
	                overlay: true,
	                title: true
	            },
	
	            // Callbacks
	            onCancel: jQuery.noop, // If canceling
	            beforeLoad: jQuery.noop, // Before loading
	            afterLoad: jQuery.noop, // After loading
	            beforeShow: jQuery.noop, // Before changing in current item
	            afterShow: jQuery.noop, // After opening
	            beforeChange: jQuery.noop, // Before changing gallery item
	            beforeClose: jQuery.noop, // Before closing
	            afterClose: jQuery.noop // After closing
	        },
	
	        //Current state
	        group: {}, // Selected group
	        opts: {}, // Group options
	        previous: null, // Previous element
	        coming: null, // Element being loaded
	        current: null, // Currently loaded element
	        isActive: false, // Is activated
	        isOpen: false, // Is currently open
	        isOpened: false, // Have been fully opened at least once
	
	        wrap: null,
	        skin: null,
	        outer: null,
	        inner: null,
	
	        player: {
	            timer: null,
	            isActive: false
	        },
	
	        // Loaders
	        ajaxLoad: null,
	        imgPreload: null,
	
	        // Some collections
	        transitions: {},
	        helpers: {},
	
	        /*
	         *	Static methods
	         */
	
	        open: function(group, opts) {
	            if (!group) {
	                return;
	            }
	
	            if (!jQuery.isPlainObject(opts)) {
	                opts = {};
	            }
	
	            // Close if already active
	            if (false === F.close(true)) {
	                return;
	            }
	
	            // Normalize group
	            if (!jQuery.isArray(group)) {
	                group = isQuery(group) ? jQuery(group).get() : [group];
	            }
	
	            // Recheck if the type of each element is `object` and set content type (image, ajax, etc)
	            jQuery.each(group, function(i, element) {
	                var obj = {},
	                    href,
	                    title,
	                    content,
	                    type,
	                    rez,
	                    hrefParts,
	                    selector;
	
	                if (jQuery.type(element) === "object") {
	                    // Check if is DOM element
	                    if (element.nodeType) {
	                        element = jQuery(element);
	                    }
	
	                    if (isQuery(element)) {
	                        obj = {
	                            href: element.data('fancybox-href') || element.attr('href'),
	                            title: jQuery('<div/>').text(element.data('fancybox-title') || element.attr('title') || '').html(),
	                            isDom: true,
	                            element: element
	                        };
	
	                        if (jQuery.metadata) {
	                            jQuery.extend(true, obj, element.metadata());
	                        }
	
	                    } else {
	                        obj = element;
	                    }
	                }
	
	                href = opts.href || obj.href || (isString(element) ? element : null);
	                title = opts.title !== undefined ? opts.title : obj.title || '';
	
	                content = opts.content || obj.content;
	                type = content ? 'html' : (opts.type || obj.type);
	
	                if (!type && obj.isDom) {
	                    type = element.data('fancybox-type');
	
	                    if (!type) {
	                        rez = element.prop('class').match(/fancybox\.(\w+)/);
	                        type = rez ? rez[1] : null;
	                    }
	                }
	
	                if (isString(href)) {
	                    // Try to guess the content type
	                    if (!type) {
	                        if (F.isImage(href)) {
	                            type = 'image';
	
	                        } else if (F.isSWF(href)) {
	                            type = 'swf';
	
	                        } else if (href.charAt(0) === '#') {
	                            type = 'inline';
	
	                        } else if (isString(element)) {
	                            type = 'html';
	                            content = element;
	                        }
	                    }
	
	                    // Split url into two pieces with source url and content selector, e.g,
	                    // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
	                    if (type === 'ajax') {
	                        hrefParts = href.split(/\s+/, 2);
	                        href = hrefParts.shift();
	                        selector = hrefParts.shift();
	                    }
	                }
	
	                if (!content) {
	                    if (type === 'inline') {
	                        if (href) {
	                            content = jQuery(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href); //strip for ie7
	
	                        } else if (obj.isDom) {
	                            content = element;
	                        }
	
	                    } else if (type === 'html') {
	                        content = href;
	
	                    } else if (!type && !href && obj.isDom) {
	                        type = 'inline';
	                        content = element;
	                    }
	                }
	
	                jQuery.extend(obj, {
	                    href: href,
	                    type: type,
	                    content: content,
	                    title: title,
	                    selector: selector
	                });
	
	                group[i] = obj;
	            });
	
	            // Extend the defaults
	            F.opts = jQuery.extend(true, {}, F.defaults, opts);
	
	            // All options are merged recursive except keys
	            if (opts.keys !== undefined) {
	                F.opts.keys = opts.keys ? jQuery.extend({}, F.defaults.keys, opts.keys) : false;
	            }
	
	            F.group = group;
	
	            return F._start(F.opts.index);
	        },
	
	        // Cancel image loading or abort ajax request
	        cancel: function() {
	            var coming = F.coming;
	
	            if (coming && false === F.trigger('onCancel')) {
	                return;
	            }
	
	            F.hideLoading();
	
	            if (!coming) {
	                return;
	            }
	
	            if (F.ajaxLoad) {
	                F.ajaxLoad.abort();
	            }
	
	            F.ajaxLoad = null;
	
	            if (F.imgPreload) {
	                F.imgPreload.onload = F.imgPreload.onerror = null;
	            }
	
	            if (coming.wrap) {
	                coming.wrap.stop(true, true).trigger('onReset').remove();
	            }
	
	            F.coming = null;
	
	            // If the first item has been canceled, then clear everything
	            if (!F.current) {
	                F._afterZoomOut(coming);
	            }
	        },
	
	        // Start closing animation if is open; remove immediately if opening/closing
	        close: function(event) {
	            F.cancel();
	
	            if (false === F.trigger('beforeClose')) {
	                return;
	            }
	
	            F.unbindEvents();
	
	            if (!F.isActive) {
	                return;
	            }
	
	            if (!F.isOpen || event === true) {
	                jQuery('.fancybox-wrap').stop(true).trigger('onReset').remove();
	
	                F._afterZoomOut();
	
	            } else {
	                F.isOpen = F.isOpened = false;
	                F.isClosing = true;
	
	                jQuery('.fancybox-item, .fancybox-nav').remove();
	
	                F.wrap.stop(true, true).removeClass('fancybox-opened');
	
	                F.transitions[F.current.closeMethod]();
	            }
	        },
	
	        // Manage slideshow:
	        //   jQuery.fancybox.play(); - toggle slideshow
	        //   jQuery.fancybox.play( true ); - start
	        //   jQuery.fancybox.play( false ); - stop
	        play: function(action) {
	            var clear = function() {
	                    clearTimeout(F.player.timer);
	                },
	                set = function() {
	                    clear();
	
	                    if (F.current && F.player.isActive) {
	                        F.player.timer = setTimeout(F.next, F.current.playSpeed);
	                    }
	                },
	                stop = function() {
	                    clear();
	
	                    D.unbind('.player');
	
	                    F.player.isActive = false;
	
	                    F.trigger('onPlayEnd');
	                },
	                start = function() {
	                    if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
	                        F.player.isActive = true;
	
	                        D.bind({
	                            'onCancel.player beforeClose.player': stop,
	                            'onUpdate.player': set,
	                            'beforeLoad.player': clear
	                        });
	
	                        set();
	
	                        F.trigger('onPlayStart');
	                    }
	                };
	
	            if (action === true || (!F.player.isActive && action !== false)) {
	                start();
	            } else {
	                stop();
	            }
	        },
	
	        // Navigate to next gallery item
	        next: function(direction) {
	            var current = F.current;
	
	            if (current) {
	                if (!isString(direction)) {
	                    direction = current.direction.next;
	                }
	
	                F.jumpto(current.index + 1, direction, 'next');
	            }
	        },
	
	        // Navigate to previous gallery item
	        prev: function(direction) {
	            var current = F.current;
	
	            if (current) {
	                if (!isString(direction)) {
	                    direction = current.direction.prev;
	                }
	
	                F.jumpto(current.index - 1, direction, 'prev');
	            }
	        },
	
	        // Navigate to gallery item by index
	        jumpto: function(index, direction, router) {
	            var current = F.current;
	
	            if (!current) {
	                return;
	            }
	
	            index = getScalar(index);
	
	            F.direction = direction || current.direction[(index >= current.index ? 'next' : 'prev')];
	            F.router = router || 'jumpto';
	
	            if (current.loop) {
	                if (index < 0) {
	                    index = current.group.length + (index % current.group.length);
	                }
	
	                index = index % current.group.length;
	            }
	
	            if (current.group[index] !== undefined) {
	                F.cancel();
	
	                F._start(index);
	            }
	        },
	
	        // Center inside viewport and toggle position type to fixed or absolute if needed
	        reposition: function(e, onlyAbsolute) {
	            var current = F.current,
	                wrap = current ? current.wrap : null,
	                pos;
	
	            if (wrap) {
	                pos = F._getPosition(onlyAbsolute);
	
	                if (e && e.type === 'scroll') {
	                    delete pos.position;
	
	                    wrap.stop(true, true).animate(pos, 200);
	
	                } else {
	                    wrap.css(pos);
	
	                    current.pos = jQuery.extend({}, current.dim, pos);
	                }
	            }
	        },
	
	        update: function(e) {
	            var type = (e && e.originalEvent && e.originalEvent.type),
	                anyway = !type || type === 'orientationchange';
	
	            if (anyway) {
	                clearTimeout(didUpdate);
	
	                didUpdate = null;
	            }
	
	            if (!F.isOpen || didUpdate) {
	                return;
	            }
	
	            didUpdate = setTimeout(function() {
	                var current = F.current;
	
	                if (!current || F.isClosing) {
	                    return;
	                }
	
	                F.wrap.removeClass('fancybox-tmp');
	
	                if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
	                    F._setDimension();
	                }
	
	                if (!(type === 'scroll' && current.canShrink)) {
	                    F.reposition(e);
	                }
	
	                F.trigger('onUpdate');
	
	                didUpdate = null;
	
	            }, (anyway && !isTouch ? 0 : 300));
	        },
	
	        // Shrink content to fit inside viewport or restore if resized
	        toggle: function(action) {
	            if (F.isOpen) {
	                F.current.fitToView = jQuery.type(action) === "boolean" ? action : !F.current.fitToView;
	
	                // Help browser to restore document dimensions
	                if (isTouch) {
	                    F.wrap.removeAttr('style').addClass('fancybox-tmp');
	
	                    F.trigger('onUpdate');
	                }
	
	                F.update();
	            }
	        },
	
	        hideLoading: function() {
	            D.unbind('.loading');
	
	            jQuery('#fancybox-loading').remove();
	        },
	
	        showLoading: function() {
	            var el, viewport;
	
	            F.hideLoading();
	
	            el = jQuery(F.opts.tpl.loading).click(F.cancel).appendTo('body');
	
	            // If user will press the escape-button, the request will be canceled
	            D.bind('keydown.loading', function(e) {
	                if ((e.which || e.keyCode) === 27) {
	                    e.preventDefault();
	
	                    F.cancel();
	                }
	            });
	
	            if (!F.defaults.fixed) {
	                viewport = F.getViewport();
	
	                el.css({
	                    position: 'absolute',
	                    top: (viewport.h * 0.5) + viewport.y,
	                    left: (viewport.w * 0.5) + viewport.x
	                });
	            }
	
	            F.trigger('onLoading');
	        },
	
	        getViewport: function() {
	            var locked = (F.current && F.current.locked) || false,
	                rez = {
	                    x: W.scrollLeft(),
	                    y: W.scrollTop()
	                };
	
	            if (locked && locked.length) {
	                rez.w = locked[0].clientWidth;
	                rez.h = locked[0].clientHeight;
	
	            } else {
	                // See http://bugs.jquery.com/ticket/6724
	                rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
	                rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
	            }
	
	            return rez;
	        },
	
	        // Unbind the keyboard / clicking actions
	        unbindEvents: function() {
	            if (F.wrap && isQuery(F.wrap)) {
	                F.wrap.unbind('.fb');
	            }
	
	            D.unbind('.fb');
	            W.unbind('.fb');
	        },
	
	        bindEvents: function() {
	            var current = F.current,
	                keys;
	
	            if (!current) {
	                return;
	            }
	
	            // Changing document height on iOS devices triggers a 'resize' event,
	            // that can change document height... repeating infinitely
	            W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
	
	            keys = current.keys;
	
	            if (keys) {
	                D.bind('keydown.fb', function(e) {
	                    var code = e.which || e.keyCode,
	                        target = e.target || e.srcElement;
	
	                    // Skip esc key if loading, because showLoading will cancel preloading
	                    if (code === 27 && F.coming) {
	                        return false;
	                    }
	
	                    // Ignore key combinations and key events within form elements
	                    if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || jQuery(target).is('[contenteditable]')))) {
	                        jQuery.each(keys, function(i, val) {
	                            if (current.group.length > 1 && val[code] !== undefined) {
	                                F[i](val[code]);
	
	                                e.preventDefault();
	                                return false;
	                            }
	
	                            if (jQuery.inArray(code, val) > -1) {
	                                F[i]();
	
	                                e.preventDefault();
	                                return false;
	                            }
	                        });
	                    }
	                });
	            }
	
	            if (jQuery.fn.mousewheel && current.mouseWheel) {
	                F.wrap.bind('mousewheel.fb', function(e, delta, deltaX, deltaY) {
	                    var target = e.target || null,
	                        parent = jQuery(target),
	                        canScroll = false;
	
	                    while (parent.length) {
	                        if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
	                            break;
	                        }
	
	                        canScroll = isScrollable(parent[0]);
	                        parent = jQuery(parent).parent();
	                    }
	
	                    if (delta !== 0 && !canScroll) {
	                        if (F.group.length > 1 && !current.canShrink) {
	                            if (deltaY > 0 || deltaX > 0) {
	                                F.prev(deltaY > 0 ? 'down' : 'left');
	
	                            } else if (deltaY < 0 || deltaX < 0) {
	                                F.next(deltaY < 0 ? 'up' : 'right');
	                            }
	
	                            e.preventDefault();
	                        }
	                    }
	                });
	            }
	        },
	
	        trigger: function(event, o) {
	            var ret, obj = o || F.coming || F.current;
	
	            if (obj) {
	                if (jQuery.isFunction(obj[event])) {
	                    ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
	                }
	
	                if (ret === false) {
	                    return false;
	                }
	
	                if (obj.helpers) {
	                    jQuery.each(obj.helpers, function(helper, opts) {
	                        if (opts && F.helpers[helper] && jQuery.isFunction(F.helpers[helper][event])) {
	                            F.helpers[helper][event](jQuery.extend(true, {}, F.helpers[helper].defaults, opts), obj);
	                        }
	                    });
	                }
	            }
	
	            D.trigger(event);
	        },
	
	        isImage: function(str) {
	            return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
	        },
	
	        isSWF: function(str) {
	            return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
	        },
	
	        _start: function(index) {
	            var coming = {},
	                obj,
	                href,
	                type,
	                margin,
	                padding;
	
	            index = getScalar(index);
	            obj = F.group[index] || null;
	
	            if (!obj) {
	                return false;
	            }
	
	            coming = jQuery.extend(true, {}, F.opts, obj);
	
	            // Convert margin and padding properties to array - top, right, bottom, left
	            margin = coming.margin;
	            padding = coming.padding;
	
	            if (jQuery.type(margin) === 'number') {
	                coming.margin = [margin, margin, margin, margin];
	            }
	
	            if (jQuery.type(padding) === 'number') {
	                coming.padding = [padding, padding, padding, padding];
	            }
	
	            // 'modal' propery is just a shortcut
	            if (coming.modal) {
	                jQuery.extend(true, coming, {
	                    closeBtn: false,
	                    closeClick: false,
	                    nextClick: false,
	                    arrows: false,
	                    mouseWheel: false,
	                    keys: null,
	                    helpers: {
	                        overlay: {
	                            closeClick: false
	                        }
	                    }
	                });
	            }
	
	            // 'autoSize' property is a shortcut, too
	            if (coming.autoSize) {
	                coming.autoWidth = coming.autoHeight = true;
	            }
	
	            if (coming.width === 'auto') {
	                coming.autoWidth = true;
	            }
	
	            if (coming.height === 'auto') {
	                coming.autoHeight = true;
	            }
	
	            /*
	             * Add reference to the group, so it`s possible to access from callbacks, example:
	             * afterLoad : function() {
	             *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
	             * }
	             */
	
	            coming.group = F.group;
	            coming.index = index;
	
	            // Give a chance for callback or helpers to update coming item (type, title, etc)
	            F.coming = coming;
	
	            if (false === F.trigger('beforeLoad')) {
	                F.coming = null;
	
	                return;
	            }
	
	            type = coming.type;
	            href = coming.href;
	
	            if (!type) {
	                F.coming = null;
	
	                //If we can not determine content type then drop silently or display next/prev item if looping through gallery
	                if (F.current && F.router && F.router !== 'jumpto') {
	                    F.current.index = index;
	
	                    return F[F.router](F.direction);
	                }
	
	                return false;
	            }
	
	            F.isActive = true;
	
	            if (type === 'image' || type === 'swf') {
	                coming.autoHeight = coming.autoWidth = false;
	                coming.scrolling = 'visible';
	            }
	
	            if (type === 'image') {
	                coming.aspectRatio = true;
	            }
	
	            if (type === 'iframe' && isTouch) {
	                coming.scrolling = 'scroll';
	            }
	
	            // Build the neccessary markup
	            coming.wrap = jQuery(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent || 'body');
	
	            jQuery.extend(coming, {
	                skin: jQuery('.fancybox-skin', coming.wrap),
	                outer: jQuery('.fancybox-outer', coming.wrap),
	                inner: jQuery('.fancybox-inner', coming.wrap)
	            });
	
	            jQuery.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
	                coming.skin.css('padding' + v, getValue(coming.padding[i]));
	            });
	
	            F.trigger('onReady');
	
	            // Check before try to load; 'inline' and 'html' types need content, others - href
	            if (type === 'inline' || type === 'html') {
	                if (!coming.content || !coming.content.length) {
	                    return F._error('content');
	                }
	
	            } else if (!href) {
	                return F._error('href');
	            }
	
	            if (type === 'image') {
	                F._loadImage();
	
	            } else if (type === 'ajax') {
	                F._loadAjax();
	
	            } else if (type === 'iframe') {
	                F._loadIframe();
	
	            } else {
	                F._afterLoad();
	            }
	        },
	
	        _error: function(type) {
	            jQuery.extend(F.coming, {
	                type: 'html',
	                autoWidth: true,
	                autoHeight: true,
	                minWidth: 0,
	                minHeight: 0,
	                scrolling: 'no',
	                hasError: type,
	                content: F.coming.tpl.error
	            });
	
	            F._afterLoad();
	        },
	
	        _loadImage: function() {
	            // Reset preload image so it is later possible to check "complete" property
	            var img = F.imgPreload = new Image();
	
	            img.onload = function() {
	                this.onload = this.onerror = null;
	
	                F.coming.width = this.width / F.opts.pixelRatio;
	                F.coming.height = this.height / F.opts.pixelRatio;
	
	                F._afterLoad();
	            };
	
	            img.onerror = function() {
	                this.onload = this.onerror = null;
	
	                F._error('image');
	            };
	
	            img.src = F.coming.href;
	
	            if (img.complete !== true) {
	                F.showLoading();
	            }
	        },
	
	        _loadAjax: function() {
	            var coming = F.coming;
	
	            F.showLoading();
	
	            F.ajaxLoad = jQuery.ajax(jQuery.extend({}, coming.ajax, {
	                url: coming.href,
	                error: function(jqXHR, textStatus) {
	                    if (F.coming && textStatus !== 'abort') {
	                        F._error('ajax', jqXHR);
	
	                    } else {
	                        F.hideLoading();
	                    }
	                },
	                success: function(data, textStatus) {
	                    if (textStatus === 'success') {
	                        coming.content = data;
	
	                        F._afterLoad();
	                    }
	                }
	            }));
	        },
	
	        _loadIframe: function() {
	            var coming = F.coming,
	                iframe = jQuery(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
	                .attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
	                .attr('src', coming.href);
	
	            // This helps IE
	            jQuery(coming.wrap).bind('onReset', function() {
	                try {
	                    jQuery(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
	                } catch (e) {}
	            });
	
	            if (coming.iframe.preload) {
	                F.showLoading();
	
	                iframe.one('load', function() {
	                    jQuery(this).data('ready', 1);
	
	                    // iOS will lose scrolling if we resize
	                    if (!isTouch) {
	                        jQuery(this).bind('load.fb', F.update);
	                    }
	
	                    // Without this trick:
	                    //   - iframe won't scroll on iOS devices
	                    //   - IE7 sometimes displays empty iframe
	                    jQuery(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
	
	                    F._afterLoad();
	                });
	            }
	
	            coming.content = iframe.appendTo(coming.inner);
	
	            if (!coming.iframe.preload) {
	                F._afterLoad();
	            }
	        },
	
	        _preloadImages: function() {
	            var group = F.group,
	                current = F.current,
	                len = group.length,
	                cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
	                item,
	                i;
	
	            for (i = 1; i <= cnt; i += 1) {
	                item = group[(current.index + i) % len];
	
	                if (item.type === 'image' && item.href) {
	                    new Image().src = item.href;
	                }
	            }
	        },
	
	        _afterLoad: function() {
	            var coming = F.coming,
	                previous = F.current,
	                placeholder = 'fancybox-placeholder',
	                current,
	                content,
	                type,
	                scrolling,
	                href,
	                embed;
	
	            F.hideLoading();
	
	            if (!coming || F.isActive === false) {
	                return;
	            }
	
	            if (false === F.trigger('afterLoad', coming, previous)) {
	                coming.wrap.stop(true).trigger('onReset').remove();
	
	                F.coming = null;
	
	                return;
	            }
	
	            if (previous) {
	                F.trigger('beforeChange', previous);
	
	                previous.wrap.stop(true).removeClass('fancybox-opened')
	                    .find('.fancybox-item, .fancybox-nav')
	                    .remove();
	            }
	
	            F.unbindEvents();
	
	            current = coming;
	            content = coming.content;
	            type = coming.type;
	            scrolling = coming.scrolling;
	
	            jQuery.extend(F, {
	                wrap: current.wrap,
	                skin: current.skin,
	                outer: current.outer,
	                inner: current.inner,
	                current: current,
	                previous: previous
	            });
	
	            href = current.href;
	
	            switch (type) {
	                case 'inline':
	                case 'ajax':
	                case 'html':
	                    if (current.selector) {
	                        content = jQuery('<div>').html(content).find(current.selector);
	
	                    } else if (isQuery(content)) {
	                        if (!content.data(placeholder)) {
	                            content.data(placeholder, jQuery('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
	                        }
	
	                        content = content.show().detach();
	
	                        current.wrap.bind('onReset', function() {
	                            if (jQuery(this).find(content).length) {
	                                content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
	                            }
	                        });
	                    }
	                    break;
	
	                case 'image':
	                    content = current.tpl.image.replace(/\{href\}/g, href);
	                    break;
	
	                case 'swf':
	                    content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
	                    embed = '';
	
	                    jQuery.each(current.swf, function(name, val) {
	                        content += '<param name="' + name + '" value="' + val + '"></param>';
	                        embed += ' ' + name + '="' + val + '"';
	                    });
	
	                    content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
	                    break;
	            }
	
	            if (!(isQuery(content) && content.parent().is(current.inner))) {
	                current.inner.append(content);
	            }
	
	            // Give a chance for helpers or callbacks to update elements
	            F.trigger('beforeShow');
	
	            // Set scrolling before calculating dimensions
	            current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));
	
	            // Set initial dimensions and start position
	            F._setDimension();
	
	            F.reposition();
	
	            F.isOpen = false;
	            F.coming = null;
	
	            F.bindEvents();
	
	            if (!F.isOpened) {
	                jQuery('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();
	
	            } else if (previous.prevMethod) {
	                F.transitions[previous.prevMethod]();
	            }
	
	            F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();
	
	            F._preloadImages();
	        },
	
	        _setDimension: function() {
	            var viewport = F.getViewport(),
	                steps = 0,
	                canShrink = false,
	                canExpand = false,
	                wrap = F.wrap,
	                skin = F.skin,
	                inner = F.inner,
	                current = F.current,
	                width = current.width,
	                height = current.height,
	                minWidth = current.minWidth,
	                minHeight = current.minHeight,
	                maxWidth = current.maxWidth,
	                maxHeight = current.maxHeight,
	                scrolling = current.scrolling,
	                scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
	                margin = current.margin,
	                wMargin = getScalar(margin[1] + margin[3]),
	                hMargin = getScalar(margin[0] + margin[2]),
	                wPadding,
	                hPadding,
	                wSpace,
	                hSpace,
	                origWidth,
	                origHeight,
	                origMaxWidth,
	                origMaxHeight,
	                ratio,
	                width_,
	                height_,
	                maxWidth_,
	                maxHeight_,
	                iframe,
	                body;
	
	            // Reset dimensions so we could re-check actual size
	            wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
	
	            wPadding = getScalar(skin.outerWidth(true) - skin.width());
	            hPadding = getScalar(skin.outerHeight(true) - skin.height());
	
	            // Any space between content and viewport (margin, padding, border, title)
	            wSpace = wMargin + wPadding;
	            hSpace = hMargin + hPadding;
	
	            origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
	            origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;
	
	            if (current.type === 'iframe') {
	                iframe = current.content;
	
	                if (current.autoHeight && iframe.data('ready') === 1) {
	                    try {
	                        if (iframe[0].contentWindow.document.location) {
	                            inner.width(origWidth).height(9999);
	
	                            body = iframe.contents().find('body');
	
	                            if (scrollOut) {
	                                body.css('overflow-x', 'hidden');
	                            }
	
	                            origHeight = body.outerHeight(true);
	                        }
	
	                    } catch (e) {}
	                }
	
	            } else if (current.autoWidth || current.autoHeight) {
	                inner.addClass('fancybox-tmp');
	
	                // Set width or height in case we need to calculate only one dimension
	                if (!current.autoWidth) {
	                    inner.width(origWidth);
	                }
	
	                if (!current.autoHeight) {
	                    inner.height(origHeight);
	                }
	
	                if (current.autoWidth) {
	                    origWidth = inner.width();
	                }
	
	                if (current.autoHeight) {
	                    origHeight = inner.height();
	                }
	
	                inner.removeClass('fancybox-tmp');
	            }
	
	            width = getScalar(origWidth);
	            height = getScalar(origHeight);
	
	            ratio = origWidth / origHeight;
	
	            // Calculations for the content
	            minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
	            maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
	
	            minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
	            maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);
	
	            // These will be used to determine if wrap can fit in the viewport
	            origMaxWidth = maxWidth;
	            origMaxHeight = maxHeight;
	
	            if (current.fitToView) {
	                maxWidth = Math.min(viewport.w - wSpace, maxWidth);
	                maxHeight = Math.min(viewport.h - hSpace, maxHeight);
	            }
	
	            maxWidth_ = viewport.w - wMargin;
	            maxHeight_ = viewport.h - hMargin;
	
	            if (current.aspectRatio) {
	                if (width > maxWidth) {
	                    width = maxWidth;
	                    height = getScalar(width / ratio);
	                }
	
	                if (height > maxHeight) {
	                    height = maxHeight;
	                    width = getScalar(height * ratio);
	                }
	
	                if (width < minWidth) {
	                    width = minWidth;
	                    height = getScalar(width / ratio);
	                }
	
	                if (height < minHeight) {
	                    height = minHeight;
	                    width = getScalar(height * ratio);
	                }
	
	            } else {
	                width = Math.max(minWidth, Math.min(width, maxWidth));
	
	                if (current.autoHeight && current.type !== 'iframe') {
	                    inner.width(width);
	
	                    height = inner.height();
	                }
	
	                height = Math.max(minHeight, Math.min(height, maxHeight));
	            }
	
	            // Try to fit inside viewport (including the title)
	            if (current.fitToView) {
	                inner.width(width).height(height);
	
	                wrap.width(width + wPadding);
	
	                // Real wrap dimensions
	                width_ = wrap.width();
	                height_ = wrap.height();
	
	                if (current.aspectRatio) {
	                    while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
	                        if (steps++ > 19) {
	                            break;
	                        }
	
	                        height = Math.max(minHeight, Math.min(maxHeight, height - 10));
	                        width = getScalar(height * ratio);
	
	                        if (width < minWidth) {
	                            width = minWidth;
	                            height = getScalar(width / ratio);
	                        }
	
	                        if (width > maxWidth) {
	                            width = maxWidth;
	                            height = getScalar(width / ratio);
	                        }
	
	                        inner.width(width).height(height);
	
	                        wrap.width(width + wPadding);
	
	                        width_ = wrap.width();
	                        height_ = wrap.height();
	                    }
	
	                } else {
	                    width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
	                    height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
	                }
	            }
	
	            if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
	                width += scrollOut;
	            }
	
	            inner.width(width).height(height);
	
	            wrap.width(width + wPadding);
	
	            width_ = wrap.width();
	            height_ = wrap.height();
	
	            canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
	            canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));
	
	            jQuery.extend(current, {
	                dim: {
	                    width: getValue(width_),
	                    height: getValue(height_)
	                },
	                origWidth: origWidth,
	                origHeight: origHeight,
	                canShrink: canShrink,
	                canExpand: canExpand,
	                wPadding: wPadding,
	                hPadding: hPadding,
	                wrapSpace: height_ - skin.outerHeight(true),
	                skinSpace: skin.height() - height
	            });
	
	            if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
	                inner.height('auto');
	            }
	        },
	
	        _getPosition: function(onlyAbsolute) {
	            var current = F.current,
	                viewport = F.getViewport(),
	                margin = current.margin,
	                width = F.wrap.width() + margin[1] + margin[3],
	                height = F.wrap.height() + margin[0] + margin[2],
	                rez = {
	                    position: 'absolute',
	                    top: margin[0],
	                    left: margin[3]
	                };
	
	            if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
	                rez.position = 'fixed';
	
	            } else if (!current.locked) {
	                rez.top += viewport.y;
	                rez.left += viewport.x;
	            }
	
	            rez.top = getValue(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio)));
	            rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width) * current.leftRatio)));
	
	            return rez;
	        },
	
	        _afterZoomIn: function() {
	            var current = F.current;
	
	            if (!current) {
	                return;
	            }
	
	            F.isOpen = F.isOpened = true;
	
	            F.wrap.css('overflow', 'visible').addClass('fancybox-opened').hide().show(0);
	
	            F.update();
	
	            // Assign a click event
	            if (current.closeClick || (current.nextClick && F.group.length > 1)) {
	                F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
	                    if (!jQuery(e.target).is('a') && !jQuery(e.target).parent().is('a')) {
	                        e.preventDefault();
	
	                        F[current.closeClick ? 'close' : 'next']();
	                    }
	                });
	            }
	
	            // Create a close button
	            if (current.closeBtn) {
	                jQuery(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
	                    e.preventDefault();
	
	                    F.close();
	                });
	            }
	
	            // Create navigation arrows
	            if (current.arrows && F.group.length > 1) {
	                if (current.loop || current.index > 0) {
	                    jQuery(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
	                }
	
	                if (current.loop || current.index < F.group.length - 1) {
	                    jQuery(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
	                }
	            }
	
	            F.trigger('afterShow');
	
	            // Stop the slideshow if this is the last item
	            if (!current.loop && current.index === current.group.length - 1) {
	
	                F.play(false);
	
	            } else if (F.opts.autoPlay && !F.player.isActive) {
	                F.opts.autoPlay = false;
	
	                F.play(true);
	            }
	        },
	
	        _afterZoomOut: function(obj) {
	            obj = obj || F.current;
	
	            jQuery('.fancybox-wrap').trigger('onReset').remove();
	
	            jQuery.extend(F, {
	                group: {},
	                opts: {},
	                router: false,
	                current: null,
	                isActive: false,
	                isOpened: false,
	                isOpen: false,
	                isClosing: false,
	                wrap: null,
	                skin: null,
	                outer: null,
	                inner: null
	            });
	
	            F.trigger('afterClose', obj);
	        }
	    });
	
	    /*
	     *	Default transitions
	     */
	
	    F.transitions = {
	        getOrigPosition: function() {
	            var current = F.current,
	                element = current.element,
	                orig = current.orig,
	                pos = {},
	                width = 50,
	                height = 50,
	                hPadding = current.hPadding,
	                wPadding = current.wPadding,
	                viewport = F.getViewport();
	
	            if (!orig && current.isDom && element.is(':visible')) {
	                orig = element.find('img:first');
	
	                if (!orig.length) {
	                    orig = element;
	                }
	            }
	
	            if (isQuery(orig)) {
	                pos = orig.offset();
	
	                if (orig.is('img')) {
	                    width = orig.outerWidth();
	                    height = orig.outerHeight();
	                }
	
	            } else {
	                pos.top = viewport.y + (viewport.h - height) * current.topRatio;
	                pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
	            }
	
	            if (F.wrap.css('position') === 'fixed' || current.locked) {
	                pos.top -= viewport.y;
	                pos.left -= viewport.x;
	            }
	
	            pos = {
	                top: getValue(pos.top - hPadding * current.topRatio),
	                left: getValue(pos.left - wPadding * current.leftRatio),
	                width: getValue(width + wPadding),
	                height: getValue(height + hPadding)
	            };
	
	            return pos;
	        },
	
	        step: function(now, fx) {
	            var ratio,
	                padding,
	                value,
	                prop = fx.prop,
	                current = F.current,
	                wrapSpace = current.wrapSpace,
	                skinSpace = current.skinSpace;
	
	            if (prop === 'width' || prop === 'height') {
	                ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
	
	                if (F.isClosing) {
	                    ratio = 1 - ratio;
	                }
	
	                padding = prop === 'width' ? current.wPadding : current.hPadding;
	                value = now - padding;
	
	                F.skin[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio)));
	                F.inner[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio) - (skinSpace * ratio)));
	            }
	        },
	
	        zoomIn: function() {
	            var current = F.current,
	                startPos = current.pos,
	                effect = current.openEffect,
	                elastic = effect === 'elastic',
	                endPos = jQuery.extend({
	                    opacity: 1
	                }, startPos);
	
	            // Remove "position" property that breaks older IE
	            delete endPos.position;
	
	            if (elastic) {
	                startPos = this.getOrigPosition();
	
	                if (current.openOpacity) {
	                    startPos.opacity = 0.1;
	                }
	
	            } else if (effect === 'fade') {
	                startPos.opacity = 0.1;
	            }
	
	            F.wrap.css(startPos).animate(endPos, {
	                duration: effect === 'none' ? 0 : current.openSpeed,
	                easing: current.openEasing,
	                step: elastic ? this.step : null,
	                complete: F._afterZoomIn
	            });
	        },
	
	        zoomOut: function() {
	            var current = F.current,
	                effect = current.closeEffect,
	                elastic = effect === 'elastic',
	                endPos = {
	                    opacity: 0.1
	                };
	
	            if (elastic) {
	                endPos = this.getOrigPosition();
	
	                if (current.closeOpacity) {
	                    endPos.opacity = 0.1;
	                }
	            }
	
	            F.wrap.animate(endPos, {
	                duration: effect === 'none' ? 0 : current.closeSpeed,
	                easing: current.closeEasing,
	                step: elastic ? this.step : null,
	                complete: F._afterZoomOut
	            });
	        },
	
	        changeIn: function() {
	            var current = F.current,
	                effect = current.nextEffect,
	                startPos = current.pos,
	                endPos = {
	                    opacity: 1
	                },
	                direction = F.direction,
	                distance = 200,
	                field;
	
	            startPos.opacity = 0.1;
	
	            if (effect === 'elastic') {
	                field = direction === 'down' || direction === 'up' ? 'top' : 'left';
	
	                if (direction === 'down' || direction === 'right') {
	                    startPos[field] = getValue(getScalar(startPos[field]) - distance);
	                    endPos[field] = '+=' + distance + 'px';
	
	                } else {
	                    startPos[field] = getValue(getScalar(startPos[field]) + distance);
	                    endPos[field] = '-=' + distance + 'px';
	                }
	            }
	
	            // Workaround for http://bugs.jquery.com/ticket/12273
	            if (effect === 'none') {
	                F._afterZoomIn();
	
	            } else {
	                F.wrap.css(startPos).animate(endPos, {
	                    duration: current.nextSpeed,
	                    easing: current.nextEasing,
	                    complete: F._afterZoomIn
	                });
	            }
	        },
	
	        changeOut: function() {
	            var previous = F.previous,
	                effect = previous.prevEffect,
	                endPos = {
	                    opacity: 0.1
	                },
	                direction = F.direction,
	                distance = 200;
	
	            if (effect === 'elastic') {
	                endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
	            }
	
	            previous.wrap.animate(endPos, {
	                duration: effect === 'none' ? 0 : previous.prevSpeed,
	                easing: previous.prevEasing,
	                complete: function() {
	                    jQuery(this).trigger('onReset').remove();
	                }
	            });
	        }
	    };
	
	    /*
	     *	Overlay helper
	     */
	
	    F.helpers.overlay = {
	        defaults: {
	            closeClick: true, // if true, fancyBox will be closed when user clicks on the overlay
	            speedOut: 200, // duration of fadeOut animation
	            showEarly: true, // indicates if should be opened immediately or wait until the content is ready
	            css: {}, // custom CSS properties
	            locked: !isTouch, // if true, the content will be locked into overlay
	            fixed: true // if false, the overlay CSS position property will not be set to "fixed"
	        },
	
	        overlay: null, // current handle
	        fixed: false, // indicates if the overlay has position "fixed"
	        el: jQuery('html'), // element that contains "the lock"
	
	        // Public methods
	        create: function(opts) {
	            var parent;
	
	            opts = jQuery.extend({}, this.defaults, opts);
	
	            if (this.overlay) {
	                this.close();
	            }
	
	            parent = F.coming ? F.coming.parent : opts.parent;
	
	            this.overlay = jQuery('<div class="fancybox-overlay"></div>').appendTo(parent && parent.length ? parent : 'body');
	            this.fixed = false;
	
	            if (opts.fixed && F.defaults.fixed) {
	                this.overlay.addClass('fancybox-overlay-fixed');
	
	                this.fixed = true;
	            }
	        },
	
	        open: function(opts) {
	            var that = this;
	
	            opts = jQuery.extend({}, this.defaults, opts);
	
	            if (this.overlay) {
	                this.overlay.unbind('.overlay').width('auto').height('auto');
	
	            } else {
	                this.create(opts);
	            }
	
	            if (!this.fixed) {
	                W.bind('resize.overlay', jQuery.proxy(this.update, this));
	
	                this.update();
	            }
	
	            if (opts.closeClick) {
	                this.overlay.bind('click.overlay', function(e) {
	                    if (jQuery(e.target).hasClass('fancybox-overlay')) {
	                        if (F.isActive) {
	                            F.close();
	                        } else {
	                            that.close();
	                        }
	
	                        return false;
	                    }
	                });
	            }
	
	            this.overlay.css(opts.css).show();
	        },
	
	        close: function() {
	            W.unbind('resize.overlay');
	
	            if (this.el.hasClass('fancybox-lock')) {
	                jQuery('.fancybox-margin').removeClass('fancybox-margin');
	
	                this.el.removeClass('fancybox-lock');
	
	                W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
	            }
	
	            jQuery('.fancybox-overlay').remove().hide();
	
	            jQuery.extend(this, {
	                overlay: null,
	                fixed: false
	            });
	        },
	
	        // Private, callbacks
	
	        update: function() {
	            var width = '100%', offsetWidth;
	
	            // Reset width/height so it will not mess
	            this.overlay.width(width).height('100%');
	
	            // jQuery does not return reliable result for IE
	            if (IE) {
	                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
	
	                if (D.width() > offsetWidth) {
	                    width = D.width();
	                }
	
	            } else if (D.width() > W.width()) {
	                width = D.width();
	            }
	
	            this.overlay.width(width).height(D.height());
	        },
	
	        // This is where we can manipulate DOM, because later it would cause iframes to reload
	        onReady: function(opts, obj) {
	            var overlay = this.overlay;
	
	            jQuery('.fancybox-overlay').stop(true, true);
	
	            if (!overlay) {
	                this.create(opts);
	            }
	
	            if (opts.locked && this.fixed && obj.fixed) {
	                obj.locked = this.overlay.append(obj.wrap);
	                obj.fixed = false;
	            }
	
	            if (opts.showEarly === true) {
	                this.beforeShow.apply(this, arguments);
	            }
	        },
	
	        beforeShow: function(opts, obj) {
	            if (obj.locked && !this.el.hasClass('fancybox-lock')) {
	                if (this.fixPosition !== false) {
	                    jQuery('*').filter(function() {
	                        return (jQuery(this).css('position') === 'fixed' && !jQuery(this).hasClass("fancybox-overlay") && !jQuery(this).hasClass("fancybox-wrap"));
	                    }).addClass('fancybox-margin');
	                }
	
	                this.el.addClass('fancybox-margin');
	
	                this.scrollV = W.scrollTop();
	                this.scrollH = W.scrollLeft();
	
	                this.el.addClass('fancybox-lock');
	
	                W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
	            }
	
	            this.open(opts);
	        },
	
	        onUpdate: function() {
	            if (!this.fixed) {
	                this.update();
	            }
	        },
	
	        afterClose: function(opts) {
	            // Remove overlay if exists and fancyBox is not opening
	            // (e.g., it is not being open using afterClose callback)
	            if (this.overlay && !F.coming) {
	                this.overlay.fadeOut(opts.speedOut, jQuery.proxy(this.close, this));
	            }
	        }
	    };
	
	    /*
	     *	Title helper
	     */
	
	    F.helpers.title = {
	        defaults: {
	            type: 'float', // 'float', 'inside', 'outside' or 'over',
	            position: 'bottom' // 'top' or 'bottom'
	        },
	
	        beforeShow: function(opts) {
	            var current = F.current,
	                text = current.title,
	                type = opts.type,
	                title,
	                target;
	
	            if (jQuery.isFunction(text)) {
	                text = text.call(current.element, current);
	            }
	
	            if (!isString(text) || jQuery.trim(text) === '') {
	                return;
	            }
	
	            title = jQuery('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');
	
	            switch (type) {
	                case 'inside':
	                    target = F.skin;
	                    break;
	
	                case 'outside':
	                    target = F.wrap;
	                    break;
	
	                case 'over':
	                    target = F.inner;
	                    break;
	
	                default: // 'float'
	                    target = F.skin;
	
	                    title.appendTo('body');
	
	                    if (IE) {
	                        title.width(title.width());
	                    }
	
	                    title.wrapInner('<span class="child"></span>');
	
	                    //Increase bottom margin so this title will also fit into viewport
	                    F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
	                    break;
	            }
	
	            title[(opts.position === 'top' ? 'prependTo' : 'appendTo')](target);
	        }
	    };
	
	    // jQuery plugin initialization
	    jQuery.fn.fancybox = function(options) {
	        var index,
	            that = jQuery(this),
	            selector = this.selector || '',
	            run = function(e) {
	                var what = jQuery(this).blur(), idx = index, relType, relVal;
	
	                if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
	                    relType = options.groupAttr || 'data-fancybox-group';
	                    relVal = what.attr(relType);
	
	                    if (!relVal) {
	                        relType = 'rel';
	                        relVal = what.get(0)[relType];
	                    }
	
	                    if (relVal && relVal !== '' && relVal !== 'nofollow') {
	                        what = selector.length ? jQuery(selector) : that;
	                        what = what.filter('[' + relType + '="' + relVal + '"]');
	                        idx = what.index(this);
	                    }
	
	                    options.index = idx;
	
	                    // Stop an event from bubbling if everything is fine
	                    if (F.open(what, options) !== false) {
	                        e.preventDefault();
	                    }
	                }
	            };
	
	        options = options || {};
	        index = options.index || 0;
	
	        if (!selector || options.live === false) {
	            that.unbind('click.fb-start').bind('click.fb-start', run);
	
	        } else {
	            D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
	        }
	
	        this.filter('[data-fancybox-start=1]').trigger('click');
	
	        return this;
	    };
	
	    // Tests that need a body at doc ready
	    D.ready(function() {
	        var w1, w2;
	
	        if (jQuery.scrollbarWidth === undefined) {
	            // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
	            jQuery.scrollbarWidth = function() {
	                var parent = jQuery('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
	                    child = parent.children(),
	                    width = child.innerWidth() - child.height(99).innerWidth();
	
	                parent.remove();
	
	                return width;
	            };
	        }
	
	        if (jQuery.support.fixedPosition === undefined) {
	            jQuery.support.fixedPosition = (function() {
	                var elem = jQuery('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
	                    fixed = (elem[0].offsetTop === 20 || elem[0].offsetTop === 15);
	
	                elem.remove();
	
	                return fixed;
	            }());
	        }
	
	        jQuery.extend(F.defaults, {
	            scrollbarWidth: jQuery.scrollbarWidth(),
	            fixed: jQuery.support.fixedPosition,
	            parent: jQuery('body')
	        });
	
	        //Get real width of page scroll-bar
	        w1 = jQuery(window).width();
	
	        H.addClass('fancybox-lock-test');
	
	        w2 = jQuery(window).width();
	
	        H.removeClass('fancybox-lock-test');
	
	        jQuery("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	    });
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * imagesLoaded v4.1.1
	 * JavaScript is all like "You images are done yet or what?"
	 * MIT License
	 */
	
	( function( window, factory ) { 'use strict';
	  // universal module definition
	
	  /*global define: false, module: false, require: false */
	
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(13)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( EvEmitter ) {
	      return factory( window, EvEmitter );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('ev-emitter')
	    );
	  } else {
	    // browser global
	    window.imagesLoaded = factory(
	      window,
	      window.EvEmitter
	    );
	  }
	
	})( window,
	
	// --------------------------  factory -------------------------- //
	
	function factory( window, EvEmitter ) {
	
	'use strict';
	
	var $ = window.jQuery;
	var console = window.console;
	
	// -------------------------- helpers -------------------------- //
	
	// extend objects
	function extend( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	}
	
	// turn element or nodeList into an array
	function makeArray( obj ) {
	  var ary = [];
	  if ( Array.isArray( obj ) ) {
	    // use object if already an array
	    ary = obj;
	  } else if ( typeof obj.length == 'number' ) {
	    // convert nodeList to array
	    for ( var i=0; i < obj.length; i++ ) {
	      ary.push( obj[i] );
	    }
	  } else {
	    // array of single index
	    ary.push( obj );
	  }
	  return ary;
	}
	
	// -------------------------- imagesLoaded -------------------------- //
	
	/**
	 * @param {Array, Element, NodeList, String} elem
	 * @param {Object or Function} options - if function, use as callback
	 * @param {Function} onAlways - callback function
	 */
	function ImagesLoaded( elem, options, onAlways ) {
	  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
	  if ( !( this instanceof ImagesLoaded ) ) {
	    return new ImagesLoaded( elem, options, onAlways );
	  }
	  // use elem as selector string
	  if ( typeof elem == 'string' ) {
	    elem = document.querySelectorAll( elem );
	  }
	
	  this.elements = makeArray( elem );
	  this.options = extend( {}, this.options );
	
	  if ( typeof options == 'function' ) {
	    onAlways = options;
	  } else {
	    extend( this.options, options );
	  }
	
	  if ( onAlways ) {
	    this.on( 'always', onAlways );
	  }
	
	  this.getImages();
	
	  if ( $ ) {
	    // add jQuery Deferred object
	    this.jqDeferred = new $.Deferred();
	  }
	
	  // HACK check async to allow time to bind listeners
	  setTimeout( function() {
	    this.check();
	  }.bind( this ));
	}
	
	ImagesLoaded.prototype = Object.create( EvEmitter.prototype );
	
	ImagesLoaded.prototype.options = {};
	
	ImagesLoaded.prototype.getImages = function() {
	  this.images = [];
	
	  // filter & find items if we have an item selector
	  this.elements.forEach( this.addElementImages, this );
	};
	
	/**
	 * @param {Node} element
	 */
	ImagesLoaded.prototype.addElementImages = function( elem ) {
	  // filter siblings
	  if ( elem.nodeName == 'IMG' ) {
	    this.addImage( elem );
	  }
	  // get background image on element
	  if ( this.options.background === true ) {
	    this.addElementBackgroundImages( elem );
	  }
	
	  // find children
	  // no non-element nodes, #143
	  var nodeType = elem.nodeType;
	  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
	    return;
	  }
	  var childImgs = elem.querySelectorAll('img');
	  // concat childElems to filterFound array
	  for ( var i=0; i < childImgs.length; i++ ) {
	    var img = childImgs[i];
	    this.addImage( img );
	  }
	
	  // get child background images
	  if ( typeof this.options.background == 'string' ) {
	    var children = elem.querySelectorAll( this.options.background );
	    for ( i=0; i < children.length; i++ ) {
	      var child = children[i];
	      this.addElementBackgroundImages( child );
	    }
	  }
	};
	
	var elementNodeTypes = {
	  1: true,
	  9: true,
	  11: true
	};
	
	ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
	  var style = getComputedStyle( elem );
	  if ( !style ) {
	    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
	    return;
	  }
	  // get url inside url("...")
	  var reURL = /url\((['"])?(.*?)\1\)/gi;
	  var matches = reURL.exec( style.backgroundImage );
	  while ( matches !== null ) {
	    var url = matches && matches[2];
	    if ( url ) {
	      this.addBackground( url, elem );
	    }
	    matches = reURL.exec( style.backgroundImage );
	  }
	};
	
	/**
	 * @param {Image} img
	 */
	ImagesLoaded.prototype.addImage = function( img ) {
	  var loadingImage = new LoadingImage( img );
	  this.images.push( loadingImage );
	};
	
	ImagesLoaded.prototype.addBackground = function( url, elem ) {
	  var background = new Background( url, elem );
	  this.images.push( background );
	};
	
	ImagesLoaded.prototype.check = function() {
	  var _this = this;
	  this.progressedCount = 0;
	  this.hasAnyBroken = false;
	  // complete if no images
	  if ( !this.images.length ) {
	    this.complete();
	    return;
	  }
	
	  function onProgress( image, elem, message ) {
	    // HACK - Chrome triggers event before object properties have changed. #83
	    setTimeout( function() {
	      _this.progress( image, elem, message );
	    });
	  }
	
	  this.images.forEach( function( loadingImage ) {
	    loadingImage.once( 'progress', onProgress );
	    loadingImage.check();
	  });
	};
	
	ImagesLoaded.prototype.progress = function( image, elem, message ) {
	  this.progressedCount++;
	  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
	  // progress event
	  this.emitEvent( 'progress', [ this, image, elem ] );
	  if ( this.jqDeferred && this.jqDeferred.notify ) {
	    this.jqDeferred.notify( this, image );
	  }
	  // check if completed
	  if ( this.progressedCount == this.images.length ) {
	    this.complete();
	  }
	
	  if ( this.options.debug && console ) {
	    console.log( 'progress: ' + message, image, elem );
	  }
	};
	
	ImagesLoaded.prototype.complete = function() {
	  var eventName = this.hasAnyBroken ? 'fail' : 'done';
	  this.isComplete = true;
	  this.emitEvent( eventName, [ this ] );
	  this.emitEvent( 'always', [ this ] );
	  if ( this.jqDeferred ) {
	    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
	    this.jqDeferred[ jqMethod ]( this );
	  }
	};
	
	// --------------------------  -------------------------- //
	
	function LoadingImage( img ) {
	  this.img = img;
	}
	
	LoadingImage.prototype = Object.create( EvEmitter.prototype );
	
	LoadingImage.prototype.check = function() {
	  // If complete is true and browser supports natural sizes,
	  // try to check for image status manually.
	  var isComplete = this.getIsImageComplete();
	  if ( isComplete ) {
	    // report based on naturalWidth
	    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
	    return;
	  }
	
	  // If none of the checks above matched, simulate loading on detached element.
	  this.proxyImage = new Image();
	  this.proxyImage.addEventListener( 'load', this );
	  this.proxyImage.addEventListener( 'error', this );
	  // bind to image as well for Firefox. #191
	  this.img.addEventListener( 'load', this );
	  this.img.addEventListener( 'error', this );
	  this.proxyImage.src = this.img.src;
	};
	
	LoadingImage.prototype.getIsImageComplete = function() {
	  return this.img.complete && this.img.naturalWidth !== undefined;
	};
	
	LoadingImage.prototype.confirm = function( isLoaded, message ) {
	  this.isLoaded = isLoaded;
	  this.emitEvent( 'progress', [ this, this.img, message ] );
	};
	
	// ----- events ----- //
	
	// trigger specified handler for event type
	LoadingImage.prototype.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};
	
	LoadingImage.prototype.onload = function() {
	  this.confirm( true, 'onload' );
	  this.unbindEvents();
	};
	
	LoadingImage.prototype.onerror = function() {
	  this.confirm( false, 'onerror' );
	  this.unbindEvents();
	};
	
	LoadingImage.prototype.unbindEvents = function() {
	  this.proxyImage.removeEventListener( 'load', this );
	  this.proxyImage.removeEventListener( 'error', this );
	  this.img.removeEventListener( 'load', this );
	  this.img.removeEventListener( 'error', this );
	};
	
	// -------------------------- Background -------------------------- //
	
	function Background( url, element ) {
	  this.url = url;
	  this.element = element;
	  this.img = new Image();
	}
	
	// inherit LoadingImage prototype
	Background.prototype = Object.create( LoadingImage.prototype );
	
	Background.prototype.check = function() {
	  this.img.addEventListener( 'load', this );
	  this.img.addEventListener( 'error', this );
	  this.img.src = this.url;
	  // check if image is already complete
	  var isComplete = this.getIsImageComplete();
	  if ( isComplete ) {
	    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
	    this.unbindEvents();
	  }
	};
	
	Background.prototype.unbindEvents = function() {
	  this.img.removeEventListener( 'load', this );
	  this.img.removeEventListener( 'error', this );
	};
	
	Background.prototype.confirm = function( isLoaded, message ) {
	  this.isLoaded = isLoaded;
	  this.emitEvent( 'progress', [ this, this.element, message ] );
	};
	
	// -------------------------- jQuery -------------------------- //
	
	ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
	  jQuery = jQuery || window.jQuery;
	  if ( !jQuery ) {
	    return;
	  }
	  // set local variable
	  $ = jQuery;
	  // $().imagesLoaded()
	  $.fn.imagesLoaded = function( options, callback ) {
	    var instance = new ImagesLoaded( this, options, callback );
	    return instance.jqDeferred.promise( $(this) );
	  };
	};
	// try making plugin
	ImagesLoaded.makeJQueryPlugin();
	
	// --------------------------  -------------------------- //
	
	return ImagesLoaded;
	
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * EvEmitter v1.0.3
	 * Lil' event emitter
	 * MIT License
	 */
	
	/* jshint unused: true, undef: true, strict: true */
	
	( function( global, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module, window */
	  if ( true ) {
	    // AMD - RequireJS
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.EvEmitter = factory();
	  }
	
	}( typeof window != 'undefined' ? window : this, function() {
	
	"use strict";
	
	function EvEmitter() {}
	
	var proto = EvEmitter.prototype;
	
	proto.on = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // set events hash
	  var events = this._events = this._events || {};
	  // set listeners array
	  var listeners = events[ eventName ] = events[ eventName ] || [];
	  // only add once
	  if ( listeners.indexOf( listener ) == -1 ) {
	    listeners.push( listener );
	  }
	
	  return this;
	};
	
	proto.once = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // add event
	  this.on( eventName, listener );
	  // set once flag
	  // set onceEvents hash
	  var onceEvents = this._onceEvents = this._onceEvents || {};
	  // set onceListeners object
	  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
	  // set flag
	  onceListeners[ listener ] = true;
	
	  return this;
	};
	
	proto.off = function( eventName, listener ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var index = listeners.indexOf( listener );
	  if ( index != -1 ) {
	    listeners.splice( index, 1 );
	  }
	
	  return this;
	};
	
	proto.emitEvent = function( eventName, args ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var i = 0;
	  var listener = listeners[i];
	  args = args || [];
	  // once stuff
	  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];
	
	  while ( listener ) {
	    var isOnce = onceListeners && onceListeners[ listener ];
	    if ( isOnce ) {
	      // remove listener
	      // remove before trigger to prevent recursion
	      this.off( eventName, listener );
	      // unset once flag
	      delete onceListeners[ listener ];
	    }
	    // trigger listener
	    listener.apply( this, args );
	    // get next listener
	    i += isOnce ? 0 : 1;
	    listener = listeners[i];
	  }
	
	  return this;
	};
	
	return EvEmitter;
	
	}));


/***/ }
]);
//# sourceMappingURL=vendorSupport.js.map
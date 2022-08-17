var ui = ui || {};
ui.page = ui.page || {};
ui.page.common = function () {
  this.init();
};
ui.page.common.prototype = {
  init: function () {
    this._assignElements();
    this._attachEventHandlers();

    this._ready();
  },
  _assignElements: function () {
    this.welDoc = $(document.body);
    this.welWin = $(window);
    this.welDoc.on(
      "click",
      'a[href="#"]',
      $.proxy(this._onClickEventPrevent, this)
    );
    this.welDoc.on(
      "click",
      "._toggleTranslateMenu",
      $.proxy(this._toggleTranslatebox, this)
    );
    this.welDoc.on(
      "click",
      "._openMobileGnbMenu",
      $.proxy(this._openMobileGnbMenu, this)
    );
    this.welDoc.on(
      "click",
      ".gnb li a",
      $.proxy(this._closeMobileGnbMenu, this)
    );
    this.welDoc.on(
      "click",
      "._closeMobileGnbMenu",
      $.proxy(this._closeMobileGnbMenu, this)
    );
  },
  _onScrollEvent: function (e) {
    const self = this;
    $(window).scroll(function (e) {
      self._handleHeaderTransform();
    });
  },
  _handleHeaderTransform: function () {
    let nScrollTop = $("body").scrollTop();
    console.log(nScrollTop);
    if (nScrollTop > 20) {
      $(".header").addClass("active");
    } else {
      $(".header").removeClass("active");
    }
  },
  _onClickEventPrevent: function (event) {
    event.preventDefault();
  },
  _attachEventHandlers: function () {
    this.welDoc.on(
      "click",
      'a[href="#"]',
      $.proxy(this._onClickEventPrevent, this)
    );
  },
  _toggleTranslatebox: function (e) {
    const target = $(e.currentTarget);
    target.parent(".translate").toggleClass("show");
    console.log(target);
  },
  _openMobileGnbMenu: function () {
    $(".gnb").addClass("show");
  },
  _closeMobileGnbMenu: function () {
    $(".gnb").removeClass("show");
  },

  _ready: function () {
    this._onScrollEvent();
  },
};
var uiCommon = new ui.page.common();

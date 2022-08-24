var ui = ui || {};
ui.page = ui.page || {};
ui.page.common = function () {
  this.init();
};
ui.page.common.prototype = {
  init: function () {
    this._initCustomElements();
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
  _openMobileGnbMenu: function () {
    $(".gnb").addClass("show");
  },
  _closeMobileGnbMenu: function () {
    $(".gnb").removeClass("show");
  },

  _ready: function () {
    this._onScrollEvent();
  },

  _createCustomAppbar: function () {
    class Appbar extends HTMLElement {
      render() {
        this.innerHTML = `<header class="header">
        <div class="inner-contents">
          <h1 class="logo">
            <a href="/">EZTECHFIN</a>
          </h1>
          <div class="header-menu">
            <button class="btn m-gnb-menu _openMobileGnbMenu">
              <img src="/static/img/ico_menu.svg" alt="" />
            </button>
            <nav class="gnb">
              <ul id="menu">
                <li class="current">
                  <a href="/">Company</a>
                </li>
                <li>
                  <a href="/html/service.html">Service</a>
                </li>
                <li>
                  <a href="/html/recruit.html">Recruit</a>
                </li>
                <li>
                  <a href="/html/contact.html">Contact</a>
                </li>
              </ul>
              <button class="btn btn-close _closeMobileGnbMenu">
                <img src="/static/img/ico_close.svg" alt="" />
              </button>
            </nav>
          </div>
        </div>
      </header>`;
      }

      connectedCallback() {
        if (!this.rendered) {
          this.render();

          this.rendered = true;
        }
      }
    }

    customElements.define("app-bar", Appbar);
  },
  _checkCurrentGnbMenu: function () {
    const elMenu = $(".gnb li");
    const loc = location.pathname;

    elMenu.each(function (index) {
      const sMenuText = $(this).children().text().toLowerCase();
      if (loc.includes(sMenuText)) {
        elMenu.eq(index).addClass("current").siblings().removeClass("current");
      }
    });
  },
  _createCustomFooter: function () {
    class Footer extends HTMLElement {
      render() {
        this.innerHTML = `<footer class="footer">
        <div class="inner-contents">
          <img class="logo" src="/static/img/img_logo_white.png" alt="">
          <div>
            <ul>
              <li>서울 마포구 월드컵북로56길 12, 10층 1호</li>
              <li><em>고객센터</em><a href="tel:070-7841-1330">070-7841-1330</a> <a href="mailto:cs@eztechfin.co.kr">cs@eztechfin.co.kr</a></li>
              <li><p class="copy">© 2022 (주)이지테크핀., All rights reserved.</p></li>
            </ul>
          </div>
          <div>
            <ul>
              <li><em>대표이사</em>조성현</li>
              <li><em>사업자등록번호</em>315-87-01407 </li>
              <li><em>통신판매업신고번호</em>제2022-서울마포-1771</li>
            </ul>
          </div>
        </div>
      </footer>`;
      }

      connectedCallback() {
        if (!this.rendered) {
          this.render();
          this.rendered = true;
        }
      }
    }

    customElements.define("default-footer", Footer);
  },

  _initCustomElements: function () {
    this._createCustomAppbar();
    this._createCustomFooter();
    this._checkCurrentGnbMenu();
  },
};
var uiCommon = new ui.page.common();

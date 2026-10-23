/* =========================================================
   全局导航脚本：圆点高亮 / 上一页下一页 / 键盘翻页
   ========================================================= */

(function () {
  var order = ['index', 'what', 'why', 'measures', 'case'];
  var files = {
    index: 'index.html',
    what: 'what.html',
    why: 'why.html',
    measures: 'measures.html',
    case: 'case.html'
  };

  var page = document.body.getAttribute('data-page') || 'index';

  /* 当前页圆点高亮 */
  var items = document.querySelectorAll('.dot-nav__item');
  for (var i = 0; i < items.length; i++) {
    if (items[i].getAttribute('data-target') === page) {
      items[i].classList.add('is-active');
      items[i].setAttribute('aria-current', 'page');
    }
  }

  /* 上一页 / 下一页 */
  var index = order.indexOf(page);
  if (index < 0) index = 0;

  var prev = files[order[(index - 1 + order.length) % order.length]];
  var next = files[order[(index + 1) % order.length]];

  var prevLink = document.querySelector('.arrow--prev');
  var nextLink = document.querySelector('.arrow--next');

  if (prevLink) prevLink.setAttribute('href', prev);
  if (nextLink) nextLink.setAttribute('href', next);

  /* 键盘左右方向键翻页 */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

    if (e.key === 'ArrowLeft') {
      window.location.href = prev;
    } else if (e.key === 'ArrowRight') {
      window.location.href = next;
    }
  });

  /* 应对措施：悬停展开预览，点击固定 / 收起 */
  var accItems = document.querySelectorAll('.acc__item');

  function setOpen(item, open) {
    item.classList.toggle('is-open', open);
    var toggle = item.querySelector('.acc__toggle');
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  for (var k = 0; k < accItems.length; k++) {
    (function (item) {
      var toggle = item.querySelector('.acc__toggle');

      item.addEventListener('mouseenter', function () {
        setOpen(item, true);
      });

      item.addEventListener('mouseleave', function () {
        if (!item.classList.contains('is-pinned')) setOpen(item, false);
      });

      if (toggle) {
        toggle.addEventListener('click', function () {
          if (item.classList.contains('is-pinned')) {
            item.classList.remove('is-pinned');
            setOpen(item, false);
          } else {
            item.classList.add('is-pinned');
            setOpen(item, true);
          }
        });
      }
    })(accItems[k]);
  }
})();

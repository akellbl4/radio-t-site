import Turbolinks from 'turbolinks';
import debug from './debug';

const events = [
  'turbolinks:click',
  'turbolinks:before-visit',
  'turbolinks:visit',
  'turbolinks:request-start',
  'turbolinks:request-end',
  'turbolinks:before-cache',
  'turbolinks:before-render',
  'turbolinks:render',
  'turbolinks:load',
];
events.forEach((eventName) => document.addEventListener(eventName, (e) => debug('turbolinks', e)));

Turbolinks.start();

document.addEventListener('theme:change', function () {
  Turbolinks.clearCache();
});

// open external links in new tab
document.addEventListener('turbolinks:load', () => {
  [].forEach.call(document.links, (link) => {
    if (link.hostname !== window.location.hostname) {
      link.rel = link.rel.length ? `${link.rel} noopener` : 'noopener';
      link.target = '_blank';
    }
  });
});

// Prevent issuing requests to same-page anchors
// https://github.com/turbolinks/turbolinks/issues/75#issuecomment-445325162
// document.addEventListener('turbolinks:click', function (event) {
//   const anchorElement = event.target;
//   const isSamePageAnchor = (
//     anchorElement.hash &&
//     anchorElement.origin === window.location.origin &&
//     anchorElement.pathname === window.location.pathname
//   );
//
//   if (isSamePageAnchor) {
//     console.log(anchorElement.hash);
//     Turbolinks.controller.pushHistoryWithLocationAndRestorationIdentifier(
//       event.data.url,
//       Turbolinks.uuid(),
//     );
//     event.preventDefault();
//   }
// });

// to disable page 'preview' from cache?
// document.addEventListener("turbolinks:before-visit", function() {
//   Turbolinks.clearCache();
// })

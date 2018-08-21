export const OpenShade = ((bodyCls) => {
  let scrollTop;
    return {
      afterOpen: function () {
          scrollTop = document.scrollingElement.scrollTop;
          document.body.classList.add(bodyCls);
          document.body.style.top = -scrollTop + 'px';
      },
      beforeClose: function () {
          document.body.classList.remove(bodyCls);
          // scrollTop lost after set position:fixed, restore it back.
          document.scrollingElement.scrollTop = scrollTop;
      }
    };
})('dialog-open');
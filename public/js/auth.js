(() => {
  if (!document.cookie || document.cookie.indexOf("authorization=") === -1) {
    location.replace(
      "/login?referer=" +
        encodeURIComponent(location.pathname + location.search)
    );
  }
})();

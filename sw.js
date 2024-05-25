window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported');
      const result = await navigator.serviceWorker
        // scope是自定义sw的作用域范围为根目录，默认作用域为当前sw.js所在目录的页面
        .register("./src/sw/sw.ts")
      if (result.installing) {
        console.log('installing Service worker');
      } else if (result.waiting) {
        console.log('Service worker installed');
      } else if (result.active) {
        console.log('Service worker active');
      }

    } else {
      console.log('Service Worker is not supported');
    }
  });

(() => {
    const app = {
      init() {
        console.log('tst')
        this.cacheElements();
        this.registerListeners();
      },
      cacheElements() {
        this.toTop = document.querySelector('.to-top');
      },

  
      registerListeners() {
        this.toTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        })
      }



    }
    app.init();
  })();


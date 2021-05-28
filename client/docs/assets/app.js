
(() => {
    const app = {
      init() {
        console.log('tst')
        this.cacheElements();
        this.registerListeners();
        this.basketPopUp();
      },
      cacheElements() {
        this.toTop = document.querySelector('.to-top');
        this.$basket = document.querySelector('.basket__icon')
        this.$popUp = document.querySelector('.basket__popup')
        this.$close = document.querySelector('.basket__close')
      },

  
      registerListeners() {
        this.toTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        })
      },

      basketPopUp (){
        console.log('test')
        this.$basket.addEventListener("click",(evt)=> {
          this.$popUp.classList.add('open')
        }),
      
      
        this.$close.addEventListener("click", (evt) => {
        this.$popUp.classList.remove('open');
        
      
      })
    }
  

    }
    app.init();
  })();


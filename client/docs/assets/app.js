
(() => {
    const app = {
      init() {
        console.log('tst')
        this.cacheElements();
        this.registerListeners();
        this.basketPopUp();
        this.hamburgerMenu();
      },
      cacheElements() {
        this.toTop = document.querySelector('.to-top');
        this.$basket = document.querySelector('.basket__icon')
        this.$popUp = document.querySelector('.basket__popup')
        this.$close = document.querySelector('.basket__close')
        this.$hamburger= document.querySelector('.nav__hamburger')
        this.$navList= document.querySelector('.nav__list')
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
    },

    hamburgerMenu() {
      console.log("it should work");
      this.$hamburger.addEventListener("click", (evt) => {
        this.$navList.classList.toggle("open");
      });
    },

    }
    app.init();
  })();


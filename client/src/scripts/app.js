
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
        this.$continue = document.querySelector('.basket__continue')
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
     
        this.$basket.addEventListener("click",()=> {
          this.$popUp.classList.add('open')
        }),
        
        this.$close.addEventListener("click", () => {
        this.$popUp.classList.remove('open');

        })
        this.$continue.addEventListener("click", () => {
          this.$popUp.classList.remove('open');
        
      
      })
    },

    hamburgerMenu() {
      this.$hamburger.addEventListener("click", (evt) => {
        this.$navList.classList.toggle("open");
      });
    },

    }
    app.init();
  })();


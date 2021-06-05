

(() => {
    const app = {
      init() {
        this.cacheElements();
        this.registerListeners();
        this.basketPopUp();
        this.hamburgerMenu();
        this.webshopApi = new web();
        this.printProducts();
      },
      cacheElements() {
        this.toTop = document.querySelector('.to-top');
        this.$basket = document.querySelector('.basket__icon')
        this.$popUp = document.querySelector('.basket__popup')
        this.$close = document.querySelector('.basket__close')
        this.$continue = document.querySelector('.basket__continue')
        this.$hamburger= document.querySelector('.nav__hamburger')
        this.$navList= document.querySelector('.nav__list')
        this.$kids = document.querySelector('.row__products')
        this.$discount = document.querySelector('.row__discount')
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


    async printProducts(){
      this.products = await this.webshopApi.getProducts();
      let slicedProducts =[]
      if(!!this.products){
          slicedProducts = this.products.slice(1,7)
      }
      
      this.$kids.innerHTML = slicedProducts.map((product)=>{
         
          return `
          <li class = 'productList' >
            <a href = '/pages/detailpage' >
              <img src="https://images.unsplash.com/photo-1622893795218-c3936a516616?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
              <p>${product.name}</p> 
              <p>${product.description}</p> 
            </a>
          </li>`
      }).join("");
      
     


  },

    }
    app.init();
  })();




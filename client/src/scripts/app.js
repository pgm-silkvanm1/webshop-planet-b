

(() => {
    const app = {
      init() {
        this.cacheElements();
        this.registerListeners();
        this.basketPopUp();
        this.hamburgerMenu();
        this.webshopApi = new web();
        this.printHomepage();
        this.print();
      },
      cacheElements() {
        this.toTop = document.querySelector('.to-top');
        this.$basket = document.querySelector('.basket__icon')
        this.$popUp = document.querySelector('.basket__popup')
        this.$close = document.querySelector('.basket__close')
        this.$continue = document.querySelector('.basket__continue')
        this.$hamburger= document.querySelector('.nav__hamburger')
        this.$navList= document.querySelector('.nav__list')
        this.$products = document.querySelectorAll('.row__products')
        this.$discount = document.querySelector('.row__discount')
        this.$productList = document.querySelector('.product__container')

        
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


    async printHomepage(){
      this.products = await this.webshopApi.getProducts();
      let slicedProducts =[]
      if(!!this.products){
          slicedProducts = this.products.slice(1,7)
      }

      this.$products.forEach(element => {
        element.innerHTML = slicedProducts.map((product)=>{
         
          return `
          <li>
            <a href = '/pages/detailpage' >
              <img src="https://images.unsplash.com/photo-1622893795218-c3936a516616?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
              
              <div class="product__main">
                <p class = "product__main__name">${product.name}</p> 
                <p class = "product__main__price">€${product.price}</p> 
              </div>

        
            </a>
          </li>`
      }).join("");
        
        
      });
      
  },

  async print(){
    this.productlist = await this.webshopApi.getKidsProducts();
    console.log(this.productlist)
    this.$productList.innerHTML = this.productlist.map(element => {
       
        return `
        <li>
          <a href = '/pages/detailpage' >
          <div class="image__container">
            <img src="https://images.unsplash.com/photo-1622893795218-c3936a516616?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
          </div>
            
            <div class="product__main">
              <p class = "product__main__name">${element.name}</p> 
              <p class = "product__main__price">€${element.price}</p> 
            </div>

      
          </a>
        </li>`
    
      
      
    }).join('');
    
},


   


    }
    app.init();
  })();




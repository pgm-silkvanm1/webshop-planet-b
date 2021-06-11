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
      this.toTop = document.querySelector(".to-top");
      this.$basket = document.querySelector(".basket__icon");
      this.$popUp = document.querySelector(".basket__popup");
      this.$close = document.querySelector(".basket__close");
      this.$continue = document.querySelector(".basket__continue");
      this.$hamburger = document.querySelector(".nav__hamburger");
      this.$navList = document.querySelector(".nav__list");
      this.$products = document.querySelectorAll(".row__products");
      this.$discount = document.querySelector(".row__discount");
      this.$productList = document.querySelector(".product__container");
      this.$navLink = document.querySelectorAll("nav .nav__list li a");
    },

    registerListeners() {
      this.toTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });

      if (this.$productList !== null) {
        this.$productList.addEventListener("click", (ev) => {
          const basket =
            ev.target.dataset.id ||
            ev.target.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.dataset.id;
          console.log(basket);
        });
      }
    },

    basketPopUp() {
      this.$basket.addEventListener("click", () => {
        this.$popUp.classList.add("open");
      }),
        this.$close.addEventListener("click", () => {
          this.$popUp.classList.remove("open");
        });
      this.$continue.addEventListener("click", () => {
        this.$popUp.classList.remove("open");
      });
    },

    hamburgerMenu() {
      this.$hamburger.addEventListener("click", (evt) => {
        this.$navList.classList.toggle("open");
      });
    },

    async printHomepage() {
        

      this.$navLink.forEach((link)=>{
        
        console.log(link.getAttribute('href'))

      })


      this.products = await this.webshopApi.getProducts();
      let slicedProducts = [];
      if (!!this.products) {
        slicedProducts = this.products.slice(1, 7);
      }

      this.$products.forEach((element) => {
        element.innerHTML = slicedProducts
          .map((product) => {
            return `
          <li>
            <a href = '/pages/detailpage' >
              <img src="${product.image}" loading="lazy" />
              
              <div class="product__main">
                <p class = "product__main__name">${product.name}</p> 
                <p class = "product__main__price">€${product.price}</p> 
              </div>
            </a>
          </li>`;
          })
          .join("");
      });
    },

<<<<<<< HEAD
    async print() {
      this.productlist = await this.webshopApi.getKidsProducts();
      console.log(this.productlist);
      if (this.$productList !== null) {
        this.$productList.innerHTML = this.productlist
          .map((element) => {
            return `
         <li>
           <div data-id="${element.id}">
             <svg xmlns="http://www.w3.org/2000/svg" width="37.048" height="33" viewBox="0 0 37.048 33">
             <path id="shopping-basket" d="M34.97,38.325H31.226l-5.211-9.842A1.088,1.088,0,0,0,24.092,29.5l4.672,8.824H8.278L12.95,29.5a1.088,1.088,0,0,0-1.923-1.018L5.816,38.325H2.078A2.081,2.081,0,0,0,0,40.4v2.417a2.081,2.081,0,0,0,1.935,2.073L5.585,60.07a1.088,1.088,0,0,0,1.058.834H30.4a1.088,1.088,0,0,0,1.058-.833l3.659-15.177a2.081,2.081,0,0,0,1.934-2.073V40.4A2.081,2.081,0,0,0,34.97,38.325ZM2.176,40.5h32.7v2.222H2.176Zm29.295,10.22H26.707l.727-5.823h5.441ZM19.614,58.728V52.9h4.628l-.728,5.83Zm-6.077,0-.729-5.83h4.629v5.83ZM4.175,44.9H9.616l.728,5.823H5.575Zm7.634,0h5.629v5.823h-4.9Zm7.8,5.823V44.9h5.627l-.727,5.823ZM6.1,52.9h4.517l.729,5.83H7.5Zm23.442,5.83H25.707l.728-5.83h4.511Z" transform="translate(0 -27.904)" fill="#6c7b64"/>
             </svg>
           </div>
           <a href = '/pages/detailpage' >
    
             <img src="${element.image}" loading="lazy"/>
             
             <div class="product__main">
               <p class = "product__main__name">${element.name}</p> 
               <p class = "product__main__price">€${element.price}</p> 
             </div>
    
       
           </a>
         </li>`;
          })
          .join("");
      }
    },
  };
  app.init();
})();
=======
      this.$productList.innerHTML = this.productlist.map(element => {
        
        return `
        <li>
          <div data-id="${element.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="37.048" height="33" viewBox="0 0 37.048 33">
            <path id="shopping-basket" d="M34.97,38.325H31.226l-5.211-9.842A1.088,1.088,0,0,0,24.092,29.5l4.672,8.824H8.278L12.95,29.5a1.088,1.088,0,0,0-1.923-1.018L5.816,38.325H2.078A2.081,2.081,0,0,0,0,40.4v2.417a2.081,2.081,0,0,0,1.935,2.073L5.585,60.07a1.088,1.088,0,0,0,1.058.834H30.4a1.088,1.088,0,0,0,1.058-.833l3.659-15.177a2.081,2.081,0,0,0,1.934-2.073V40.4A2.081,2.081,0,0,0,34.97,38.325ZM2.176,40.5h32.7v2.222H2.176Zm29.295,10.22H26.707l.727-5.823h5.441ZM19.614,58.728V52.9h4.628l-.728,5.83Zm-6.077,0-.729-5.83h4.629v5.83ZM4.175,44.9H9.616l.728,5.823H5.575Zm7.634,0h5.629v5.823h-4.9Zm7.8,5.823V44.9h5.627l-.727,5.823ZM6.1,52.9h4.517l.729,5.83H7.5Zm23.442,5.83H25.707l.728-5.83h4.511Z" transform="translate(0 -27.904)" fill="#6c7b64"/>
            </svg>
          </div>
          <a href = '/pages/detailpage' >
    
            <img src="https://images.unsplash.com/photo-1622893795218-c3936a516616?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
             
            <div class="product__main">
              <p class = "product__main__name">${element.name}</p> 
              <p class = "product__main__price">€${element.price}</p> 
            </div>
          </a>
        </li>`
     
      }).join('');
    }
  },


   


}
    app.init();
  })();



>>>>>>> e5adab85c14ba66bb04b656a07ea647edf728d56

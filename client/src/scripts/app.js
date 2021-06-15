(() => {
  const app = {
    init() {
      this.productlist = null;
      this.cacheElements();
      this.registerListeners();
      this.basketPopUp();
      this.hamburgerMenu();
      this.webshopApi = new web();
      this.printHomepage();
      this.printProduct();
      this.searchBar();
      this.printCategories();

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
      this.$detailContainer = document.querySelector(".container__detail");
      this.$detailReviews = document.querySelector(".reviews");
      this.$searchBar = document.getElementById("searchbar");
      this.$searchList = document.querySelector(".searchlist__item");

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
            <a href = '/pages/detailpage?id=${product.id}' >
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



    async printProduct() {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const id = params.get("id");
      this.productDetail = await this.webshopApi.getProductsById(id);
  
      const product = this.productDetail;
     
      if(this.$detailContainer !== null){
        this.$detailContainer.innerHTML = `
              
            <div class="detail--photos">
              <img class="small-photo" src="https://images.unsplash.com/photo-1533562530973-424ab36f1448?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80">
              <img class="small-photo" src="https://images.unsplash.com/photo-1533562530973-424ab36f1448?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80">
              <img class="small-photo" src="https://images.unsplash.com/photo-1533562530973-424ab36f1448?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80">
              <img class="small-photo" src="https://images.unsplash.com/photo-1533562530973-424ab36f1448?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80">
              <img class="small-photo" src="https://images.unsplash.com/photo-1533562530973-424ab36f1448?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80">
          </div>
            <div class="detail__product">
              <h1>${product.name}</h1>
              <img class="big-photo" src="${product.image}" alt="Elate Beauty Palet">
              <div class="ingredients">
                  <h3>
                      Ingredients
                  </h3>
                  <p>
                      sodium cocoate* , sodium sunflowerate , sodium sodium hempseedate , sodium cocoa butterate* , sodium castorate , glycerine , nettle tea (aqua) , rosmarinum officinalis , litsea cubeba (may chang) , bentonite clay , mica (natural color CI77019, CI77891, CI77288) , urtica dioica extract* , limonene** , citral** , citronellol** , geraniol**
                  </p>
                  <p>
                      * organically grown
                      <br>
                      ** natural essential oils
                  </p>
              </div>
            </div>
          <div class="description">
          <p>
              ${product.description}
          </p> 
          
  
              <div class="CTA">
                  <button class="CTA__button detail__button">Add to basket</button>
                  <svg class="heart" viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
              </div>
              <div class="container__delivery">
                  <div class="delivery">
                      <svg viewBox="0 -46 417.81333 417" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>
                      <p>Shipped within 2 days</p>
                  </div>
                  <div class="delivery">
                      <svg viewBox="0 -46 417.81333 417" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>
                      <p>Bike delivery</p>
                  </div>
                  <div class="delivery">
                      <svg viewBox="0 -46 417.81333 417" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>
                      <p>Easy & secure payment</p>
                  </div>
              </div>
          </div>
        </div>
        `
  
        this.users = await this.webshopApi.getUsers();  
        const reviews = this.productDetail.ProductReviews;
        console.log(reviews)
        this.$detailReviews.innerHTML = reviews.map((event)=> {
          const reviewUser = this.users.find (user => user.id === event.userId)
          console.log(reviewUser)
  
  
          return `
          <div class="reviews--text">
          <h4>${reviewUser.profile.firstName}</h4>
          <h5>${event.createdAt }</h5>
          <p>${event.description}</p>
          </div>
         
          `
        }).join('');
      }
    

    },

    async printCategories(){
      const categoryName = window.location;
      this.categories = await this.webshopApi.getCategories();
      const categoryPath = categoryName.pathname.replaceAll('/', '')

      const pageCategory = this.categories.find (category => category.name === categoryPath)
      // console.log(pageCategory.id)
      
      

      this.category = await this.webshopApi.getCategoriesById(pageCategory.id);
      console.log(this.category)

      if(this.$productList !== null){
        this.$productList.innerHTML = this.category
          .map((element) => {
            return `
            <li>
              <div data-id="${element.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="37.048" height="33" viewBox="0 0 37.048 33">
                <path id="shopping-basket" d="M34.97,38.325H31.226l-5.211-9.842A1.088,1.088,0,0,0,24.092,29.5l4.672,8.824H8.278L12.95,29.5a1.088,1.088,0,0,0-1.923-1.018L5.816,38.325H2.078A2.081,2.081,0,0,0,0,40.4v2.417a2.081,2.081,0,0,0,1.935,2.073L5.585,60.07a1.088,1.088,0,0,0,1.058.834H30.4a1.088,1.088,0,0,0,1.058-.833l3.659-15.177a2.081,2.081,0,0,0,1.934-2.073V40.4A2.081,2.081,0,0,0,34.97,38.325ZM2.176,40.5h32.7v2.222H2.176Zm29.295,10.22H26.707l.727-5.823h5.441ZM19.614,58.728V52.9h4.628l-.728,5.83Zm-6.077,0-.729-5.83h4.629v5.83ZM4.175,44.9H9.616l.728,5.823H5.575Zm7.634,0h5.629v5.823h-4.9Zm7.8,5.823V44.9h5.627l-.727,5.823ZM6.1,52.9h4.517l.729,5.83H7.5Zm23.442,5.83H25.707l.728-5.83h4.511Z" transform="translate(0 -27.904)" fill="#6c7b64"/>
                </svg>
              </div>
              <a href = '/pages/detailpage?id=${element.id}' >
        
                <img src="${element.image}" loading="lazy" />
                 
                <div class="product__main">
                  <p class = "product__main__name">${element.name}</p> 
                  <p class = "product__main__price">€${element.price}</p> 
                </div>
              </a>
            </li>`;
          }).join("");
      }

    
      

    },

    async searchBar () {
      const products = await this.webshopApi.getProducts();

      this.$searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filteredProducts = products.filter(fetchedproduct => {
          return (
            fetchedproduct.name.toLowerCase().includes(searchString) 
          );
        });
        this.$searchList.innerHTML += filteredProducts.map(product => {
          return `<li>
          <a href = '/pages/detailpage?id=${product.id}' >
              <img src="${product.image}" loading="lazy" />
              
              <div class="product__main">
                <p class = "product__main__name">${product.name}</p> 
                <p class = "product__main__price">€${product.price}</p> 
              </div>
            </a>
          </li>`;
        }).join("");

      });
    }
}
  app.init();
})();

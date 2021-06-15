const WEBSHOP_BASE_PATH = 'http://localhost:8080/api';

let products = [];

function web() {
  this.getProducts = async () => {   
    try{
      const response = await fetch (`${WEBSHOP_BASE_PATH}/products`);
      const data = await response.json();
      return data;
    } catch(error){
      console.log('an error',error)

    }
  };

  this.getCategories = async () => {   
    try{
      const response = await fetch (`${WEBSHOP_BASE_PATH}/categories`);
      const data = await response.json();
      return data;
      
    } catch(error){
      console.log('an error',error)

    }
  };

  this.getCategoriesById= async (id) => {   
    try{
      const response = await fetch (`${WEBSHOP_BASE_PATH}/products/category/${id}`);
      const data = await response.json();
      return data;
      
    } catch(error){
      console.log('an error',error)

    }
  };




  this.getProductsById = async (id) => {   
    
    try{
      const response = await fetch (`${WEBSHOP_BASE_PATH}/products/${id}`);
      const data = await response.json();
      return data;
      
    } catch(error){
      console.log('an error',error)

    }
  };

  this.getUsers = async () => {   
    
    try{
      const response = await fetch (`${WEBSHOP_BASE_PATH}/users`);
      const data = await response.json();
      return data;
      
    } catch(error){
      console.log('an error',error)

    }
  };


}


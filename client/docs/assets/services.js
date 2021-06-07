const WEBSHOP_BASE_PATH = 'http://localhost:8080/api';

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

  this.getKidsProducts = async () => {   
    try{
      const response = await fetch (`${WEBSHOP_BASE_PATH}/products`);
      const data = await response.json();
      return data;
      
    } catch(error){
      console.log('an error',error)

    }
  };


//   this.getProducts = async () => {   
//     try{
//       const response = await fetch (`${WEBSHOP_BASE_PATH}/products`);
//       const data = await response.json();
//       return data;
      
//     } catch(error){
//       console.log('an error',error)

//     }
//   };


}


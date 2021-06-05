import 'babel-polyfill';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';


export default {
  up: async (queryInterface, Sequelize) => {
    let products = [];
    let productCategories= [];
    let amount = 100;
    const date = new Date;
    
    while(amount--){
      const productId = uuidv4();
      products.push({
        id: productId,
        name: faker.commerce.productName(),
        synopsis: faker.lorem.paragraph(),
        description:faker.commerce.productDescription(),
        price:faker.commerce.price(),
        stock: Math.floor(Math.random() * 1000),
        createdAt: date,
        updatedAt: date
      });
      
        const randomCategory = Math.floor(6 + Math.random()*16);
        productCategories.push({
          ProductId: productId,
          CategoryId: randomCategory,
          createdAt: date,
          updatedAt: date
        })
    }
  
    await queryInterface.bulkInsert('Products', products, {});
    await queryInterface.bulkInsert('ProductHasCategories', productCategories, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

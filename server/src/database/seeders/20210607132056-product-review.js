import 'babel-polyfill';
import faker from 'faker';
import database from '..';

database.connect();

const createProductReviews= async () => {
  const products = await database.Product.findAll();
  
  products.forEach( product => {
    const review = {
      description: faker.lorem.paragraph(),
      rating: Math.floor(Math.random() * 5)  
    };

    product.createProductReview( review, { through: { selfGranted: false } })
  });
};

const linkUsersToReview = async () => {
  const reviews = await database.ProductReview.findAll();
  const users = await database.User.findAll();

  reviews.forEach( review => {
    const user= users[Math.floor(Math.random() * users.length - 1)];

    review.setUser( user , { through: { selfGranted: false } })
  });
};


export default {
  up: async (queryInterface, Sequelize) => {
    await createProductReviews();
    await linkUsersToReview();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(database.ProductReview.tableName, null, {});

  }
};

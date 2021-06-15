import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class ProductReview extends Model {
		static associate(models) {
			this.belongsTo(models.Product, {
				foreignKey: 'productId',
				as: 'productReviews',
			});

			this.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user',
			});
		}
	}

	ProductReview.init(
		{
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			rating: {
				type: DataTypes.NUMBER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'ProductReview',
		},
	);

	return ProductReview;
};

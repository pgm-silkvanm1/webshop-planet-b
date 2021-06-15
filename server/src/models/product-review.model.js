import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class ProductReview extends Model {
		static associate(models) {
			this.belongsTo(models.Product, {
				foreignKey: 'productId',
			});

			this.belongsTo(models.User, {
				foreignKey: 'userId',
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
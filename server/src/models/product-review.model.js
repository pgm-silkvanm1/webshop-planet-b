import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class ProductReview extends Model {
		static associate(models) {
			this.hasMany(models.Product);
		}
	}

	ProductReview.init(
		{	
			userId: {
				type: DataTypes.STRING,
				allowNull: false
			},
			description: {
				type: DataTypes.STRING,
                allowNull: false
			},
            rating: {
				type: DataTypes.NUMBER,
                allowNull: false
			},
		},
		{
			sequelize,
			modelName: 'ProductReview',
		},
	);

	return ProductReview;
};
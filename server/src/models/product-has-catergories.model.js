import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class ProductHasCategory extends Model {
		static associate(models) {
			this.hasMany(models.Product);
		}
	}

	ProductHasCategory.init(
		{	
			productId: {
				type: DataTypes.STRING,
				allowNull: false
			},
			categoryId: {
				type: DataTypes.STRING,
                allowNull: false
			},
		},
		{
			sequelize,
			modelName: 'ProductHasCategory',
		},
	);

	return ProductHasCategory;
};
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Category extends Model {
		static associate(models) {
			this.belongsToMany(
				models.Product,
				{ 
					through: 'ProductHasCategories',
					as: 'products',
					foreignKey: 'categoryId',
					unique: false,
				 });
		};
	};

	Category.init(
		{	
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			parentId: {
				type: DataTypes.INTEGER
			},
		},
		{
			sequelize,
			modelName: 'Category',
		},
	);

	return Category;
};

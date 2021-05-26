import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Category extends Model {
		static associate(models) {
			this.hasMany(models.Product);
		}
	}

	Category.init(
		{	
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			parentId: {
				type: DataTypes.STRING
			},
		},
		{
			sequelize,
			modelName: 'Category',
		},
	);

	return Category;
};

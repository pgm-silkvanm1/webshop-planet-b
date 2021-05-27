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
				unique: true,
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

import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Product extends Model {
		static associate(models) {
			
		}
	}

	Product.init(
		{
			name: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            synopsis: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            description: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            price: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            stock: {
                type: DataTypes.NUMBER, 
                allowNull: false,
                defaultValue: 0
            }
		},
		{
			sequelize,
			modelName: 'Product',
		},
	);

	return Product;
};
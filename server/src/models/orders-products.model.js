import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class OrderProduct extends Model {
		static associate(models) {

		}
	}

	OrderProduct.init(
		{	
			productId: {
				type: DataTypes.STRING,
				allowNull: false
			},
			orderId: {
				type: DataTypes.STRING,
                allowNull: false
			},
		},
		{
			sequelize,
			modelName: 'OrderProduct',
		},
	);

	return OrderProduct;
};
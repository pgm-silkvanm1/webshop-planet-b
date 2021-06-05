import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Order extends Model {
		static associate(models) {
				
		}
	}

	Order.init(
		{	
			userId: {
				type: DataTypes.STRING,
				allowNull: false
			},
			orderStatus: {
				type: DataTypes.STRING,
                allowNull: false
			},
            totalPrice: {
				type: DataTypes.NUMBER,
                allowNull: false
			},
            paymentStatus: {
				type: DataTypes.STRING,
                allowNull: false
			},
            paymentType: {
				type: DataTypes.STRING,
                allowNull: false
			},
		},
		{
			sequelize,
			modelName: 'Order',
		},
	);

	return Order;
};
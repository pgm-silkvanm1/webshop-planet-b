import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Order extends Model {
		static associate(models) {
			this.belongsToMany(models.Product, { 
				through: 'OrderHasProducts',
				as: 'products',
				foreignKey: 'orderId'
		 	});

			 this.belongsToMany(models.User, {
				 through: 'UserHasOrders',
				 as: 'user',
				 foreignKey: 'orderId'
			 })

				
		}
	}

	Order.init(
		{	
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
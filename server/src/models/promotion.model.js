import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Promotion extends Model {
		static associate(models) {
			this.hasMany(models.Product);
		}
	}

	Promotion.init(
		{	
			productId: {
				type: DataTypes.STRING,
				allowNull: false
			},
			description: {
				type: DataTypes.STRING,
                allowNull: false
			},
            voucher: {
				type: DataTypes.UUID,
                allowNull: false
			},
            from: {
				type: DataTypes.NUMBER,
                allowNull: false
			},
            to: {
				type: DataTypes.NUMBER,
                allowNull: false
			},
		},
		{
			sequelize,
			modelName: 'Promotion',
		},
	);

	return Promotion;
};
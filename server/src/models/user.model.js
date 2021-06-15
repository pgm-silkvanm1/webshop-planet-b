import { Model, DataTypes } from 'sequelize';
import hashPassword from '../utils/hashPassword';

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
			this.hasOne(models.Profile, {
				foreignKey: 'userId',
				as: 'profile',
			});

			this.belongsToMany(models.Order, {
				through: 'UserHasOrders',
				as: 'orders',
				foreignKey: 'userId',
			});

			this.hasMany(models.ProductReview, {
				foreignKey: 'userId',
				as: 'reviews',
			});
		}
	}

	User.init(
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUIDV4,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				set(value) {
					const hash = hashPassword(value);
					this.setDataValue('password', hash);
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			admin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
		},
	);

	return User;
};

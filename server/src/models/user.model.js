import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
		}
	}

	User.init(
		{
			userUuid: {
				type: DataTypes.UUID, 
				defaultValue: DataTypes.UUIDV4
			},
			password: {
				type: DataTypes.STRING, 
				allowNull: false
			},
      		email: {
				  type: DataTypes.STRING, 
				  allowNull: false
				},
			admin : {
				type: DataTypes.BOOLEAN, 
				allowNull: false
			},
		},
		{
			sequelize,
			modelName: 'User',
		},
	);

	return User;
};

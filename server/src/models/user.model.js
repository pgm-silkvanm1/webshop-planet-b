import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
			this.hasOne(models.Profile, {
				foreignKey: 'userId',
				as: 'profile'
			});
		};
	};

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
				allowNull: false
			},
      		email: {
				  type: DataTypes.STRING, 
				  allowNull: false,
				  unique: true
				},
			admin : {
				type: DataTypes.BOOLEAN,
				defaultValue: false, 
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

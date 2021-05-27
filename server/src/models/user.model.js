import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
		};
		toJSON(){
			return { ...this.get(), id: undefined };
		};
	};

	User.init(
		{
			uuid: {
				type: DataTypes.UUID, 
				defaultValue: DataTypes.UUIDV4,
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

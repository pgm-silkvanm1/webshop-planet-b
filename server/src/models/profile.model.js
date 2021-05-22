import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Profile extends Model {
		static associate(models) {
		}
	}

	Profile.init(
		{
            userId: {
				type: DataTypes.STRING, 
				allowNull: false
			},
            firstName: {
				type: DataTypes.STRING, 
				allowNull: false
			},
            lastName: {
				type: DataTypes.STRING, 
				allowNull: false
			},
            street: {
				type: DataTypes.STRING, 
				allowNull: false
			},
            zipcode: {
				type: DataTypes.NUMBER, 
				allowNull: false
			},
            city: {
				type: DataTypes.STRING, 
				allowNull: false
			},
            country: {
				type: DataTypes.STRING, 
				allowNull: false
			},
            dayOfBirth: {
				type: DataTypes.NUMBER, 
				allowNull: false
			},
            phoneNumber: {
				type: DataTypes.STRING, 
				allowNull: false
			},

		},
		{
			sequelize,
			modelName: 'Profile',
		},
	);

	return Profile;
};
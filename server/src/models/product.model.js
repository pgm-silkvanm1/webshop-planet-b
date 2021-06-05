import { Model, DataTypes } from 'sequelize';


export default (sequelize) => {
	class Product extends Model {
		static associate(models) {
            this.belongsToMany(
                models.Category, 
                {
                    through: 'ProductHasCategories',
                    as: 'categories',
                    foreignKey: 'productId',
                    unique: false, 
                });

            this.hasMany(models.Promotion);
			
		}
	}

	Product.init(
		{
            id: {
                primaryKey: true,
                type:DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique: true,
            },
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
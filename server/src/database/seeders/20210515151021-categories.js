import 'babel-polyfill';
import database from '..';

database.connect();

const date = new Date();	
const categories = [
	{
		id: 1,
		name: 'storage',
		createdAt: date,
		parentId: null,
		updatedAt: date,
	},
	{
		id: 2,
		name: 'cleaning',
		createdAt: date,
		parentId: null,
		updatedAt: date,
	},
	{
		id: 3,
		name: 'men',
		createdAt: date,
		parentId: null,
		updatedAt: date,
	},
	{
		id: 4,
		name: 'women',
		createdAt: date,
		parentId: null,
		updatedAt: date,
	},
	{
		id: 5,
		name: 'kids',
		createdAt: date,
		parentId: null,
		updatedAt: date,
	},
	{
		id: 6,
		name: 'kitchen',
		createdAt: date,
		parentId: 1,
		updatedAt: date,
	},
	{
		id: 7,
		name: 'clothes',
		createdAt: date,
		parentId: 1,
		updatedAt: date,
	},
	{
		id: 8,
		name: 'office & desk',
		createdAt: date,
		parentId: 1,
		updatedAt: date,
	},
	{
		id: 9,
		name: 'all-purpose',
		createdAt: date,
		parentId: 2,
		updatedAt: date,
	},
	{
		id: 10,
		name: 'bathroom',
		createdAt: date,
		parentId: 2,
		updatedAt: date,
	},
	{
		id: 11,
		name: 'floor',
		createdAt: date,
		parentId: 2,
		updatedAt: date,
	},
	{
		id: 12,
		name: 'shaving',
		createdAt: date,
		parentId: 3,
		updatedAt: date,
	},
	{
		id: 13,
		name: 'hair',
		createdAt: date,
		parentId: 3,
		updatedAt: date,
	},			
	{
		id: 14,
		name: 'dental',
		createdAt: date,
		parentId: 3,
		updatedAt: date,
	},			
	{
		id: 15,
		name: 'make-up',
		createdAt: date,
		parentId: 4,
		updatedAt: date,
	},
	{
		id: 16,
		name: 'skin',
		createdAt: date,
		parentId: 4,
		updatedAt: date,
	},
	{
		id: 17,
		name: 'hair',
		createdAt: date,
		parentId: 4,
		updatedAt: date,
	},
	{
		id: 18,
		name: 'maternity',
		createdAt: date,
		parentId: 4,
		updatedAt: date,
	},
	{
		id: 19,
		name: 'intimacy',
		createdAt: date,
		parentId: 4,
		updatedAt: date,
	},
	{
		id: 20,
		name: 'food & drinks',
		createdAt: date,
		parentId: 5,
		updatedAt: date,
	},
	{
		id: 21,
		name: 'clothing',
		createdAt: date,
		parentId: 5,
		updatedAt: date,
	},
	{
		id: 22,
		name: 'diapers',
		createdAt: date,
		parentId: 5,
		updatedAt: date,
	},
];



export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(database.Category.tableName, categories, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(database.Category.tableName, null, {});
	},
};

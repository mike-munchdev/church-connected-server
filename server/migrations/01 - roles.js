'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable(
			'roles',
			{
				id: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					primaryKey: true,
					autoIncrement: true
				},
				name: {
					type: Sequelize.STRING(255),
					allowNull: false,
					defaultValue: ''
				},
				active: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					defaultValue: true
				},
				slug: {
					type: Sequelize.STRING(255),
					allowNull: false,
					unique: true
				},
				order: {
					type: Sequelize.INTEGER(11),
					allowNull: false
				}
			},
			{
				tableName: 'roles',
				timestamps: false
			}
		);
	},

	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('roles');
	}
};

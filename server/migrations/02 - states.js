'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable(
			'states',
			{
				abbreviation: {
					type: Sequelize.STRING(2),
					allowNull: false,
					primaryKey: true
				},
				stateName: {
					type: Sequelize.STRING(255),
					allowNull: false
				}
			},
			{
				tableName: 'states',
				timestamps: false
			}
		);
	},

	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('states');
	}
};

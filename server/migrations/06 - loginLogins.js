'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable(
			'loginLogins',
			{
				id: {
					type: Sequelize.BIGINT,
					allowNull: false,
					primaryKey: true,
					autoIncrement: true
				},
				loginTime: {
					type: Sequelize.DATE,
					allowNull: false
				},
				ipAddress: {
					type: Sequelize.STRING(255),
					allowNull: false,
					defaultValue: ''
				},
				source: {
					type: Sequelize.STRING(255),
					allowNull: false,
					defaultValue: ''
				},
				loginId: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					references: {
						model: 'logins',
						key: 'id'
					}
				}
			},
			{
				tableName: 'loginLogins',
				timestamps: false
			}
		);
	},

	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('loginLogins');
	}
};

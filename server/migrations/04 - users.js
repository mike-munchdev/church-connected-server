'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface
			.createTable(
				'users',
				{
					id: {
						type: Sequelize.INTEGER(11),
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					firstName: {
						type: Sequelize.STRING(255),
						allowNull: false
					},
					lastName: {
						type: Sequelize.STRING(255),
						allowNull: false
					},
					active: {
						type: Sequelize.BOOLEAN,
						allowNull: false,
						defaultValue: false
					},
					loginId: {
						type: Sequelize.INTEGER(11),
						allowNull: false,
						references: {
							model: 'logins',
							key: 'id'
						}
					},
					// Timestamps
					createdAt: Sequelize.DATE,
					updatedAt: Sequelize.DATE
				},
				{
					tableName: 'users',
					timestamps: true
				}
			)
			.then(() =>
				queryInterface.addIndex('users', ['firstName'], {
					Name: 'idxUsersFirstName',
					method: 'BTREE'
				})
			)
			.then(() =>
				queryInterface.addIndex('users', ['lastName'], {
					Name: 'idxUsersLastName',
					method: 'BTREE'
				})
			);
	},

	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('users');
	}
};

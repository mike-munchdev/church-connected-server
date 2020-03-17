'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface
			.createTable(
				'logins',
				{
					id: {
						type: Sequelize.INTEGER(11),
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					email: {
						type: Sequelize.STRING(255),
						allowNull: false,
						unique: true
					},
					password: {
						type: Sequelize.TEXT,
						allowNull: true
					},
					active: {
						type: Sequelize.BOOLEAN,
						allowNull: false,
						defaultValue: false
					},
					tokenVersion: {
						type: Sequelize.INTEGER(11),
						allowNull: false,
						defaultValue: 0
					},
					googleId: {
						type: Sequelize.STRING(255),
						allowNull: true,
						unique: true
					},
					facebookId: {
						type: Sequelize.STRING(255),
						allowNull: true,
						unique: true
					},
					stripeId: {
						type: Sequelize.STRING(255),
						allowNull: true,
						unique: true
					},
					// Timestamps
					createdAt: Sequelize.DATE,
					updatedAt: Sequelize.DATE
				},
				{
					tableName: 'logins',
					timestamps: true
				}
			)
			.then(() =>
				queryInterface.addIndex('logins', ['email'], {
					Name: 'idxUsersEmail',
					method: 'BTREE'
				})
			);
	},

	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('logins');
	}
};

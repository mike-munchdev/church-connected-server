'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface
			.createTable(
				'userRoles',
				{
					id: {
						type: Sequelize.INTEGER(11),
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					userId: {
						type: Sequelize.INTEGER(11),
						allowNull: false,
						references: {
							model: 'users',
							key: 'id'
						}
					},
					roleId: {
						type: Sequelize.INTEGER(11),
						allowNull: false,
						references: {
							model: 'roles',
							key: 'id'
						}
					},
					isPrimary: {
						type: Sequelize.BOOLEAN,
						allowNull: true
					}
				},
				{
					tableName: 'userRoles',
					timestamps: false
				}
			)
			.then(() =>
				queryInterface.addIndex('userRoles', ['userId'], {
					name: 'idxUserRolesUserId',
					method: 'BTREE'
				})
			)
			.then(() =>
				queryInterface.addIndex('userRoles', ['roleId'], {
					name: 'idxUserRolesRoleId',
					method: 'BTREE'
				})
			);
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('userRoles');
	}
};

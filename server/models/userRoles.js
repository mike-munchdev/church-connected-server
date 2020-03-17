/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userRoles', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		'userId': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		'roleId': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'roles',
				key: 'id'
			}
		},
		'isPrimary': {
			type: DataTypes.INTEGER(1),
			allowNull: true
		}
	}, {
		tableName: 'userRoles',
		timestamps: false
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		'firstName': {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		'lastName': {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		'active': {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		'loginId': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'logins',
				key: 'id'
			}
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'users',
		timestamps: false
	});
};

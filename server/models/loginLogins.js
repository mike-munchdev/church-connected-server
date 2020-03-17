/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('loginLogins', {
		'id': {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		'loginTime': {
			type: DataTypes.DATE,
			allowNull: false
		},
		'ipAddress': {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		'source': {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		'loginId': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'logins',
				key: 'id'
			}
		}
	}, {
		tableName: 'loginLogins',
		timestamps: false
	});
};

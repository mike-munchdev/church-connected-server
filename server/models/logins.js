/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('logins', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		'email': {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		'password': {
			type: DataTypes.TEXT,
			allowNull: true
		},
		'active': {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		'tokenVersion': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		'googleId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			unique: true
		},
		'facebookId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			unique: true
		},
		'stripeId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			unique: true
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
		tableName: 'logins',
		timestamps: false
	});
};

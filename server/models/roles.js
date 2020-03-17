/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('roles', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		'active': {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1'
		},
		'slug': {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		'order': {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'roles',
		timestamps: false
	});
};

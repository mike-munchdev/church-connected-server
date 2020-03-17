/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('states', {
		'abbreviation': {
			type: DataTypes.STRING(2),
			allowNull: false,
			primaryKey: true
		},
		'stateName': {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'states',
		timestamps: false
	});
};

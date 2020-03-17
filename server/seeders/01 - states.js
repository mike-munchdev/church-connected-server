'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'states',
			[
				{
					stateName: 'Alabama',
					abbreviation: 'AL'
				},
				{
					stateName: 'Alaska',
					abbreviation: 'AK'
				},
				{
					stateName: 'American Samoa',
					abbreviation: 'AS'
				},
				{
					stateName: 'Arizona',
					abbreviation: 'AZ'
				},
				{
					stateName: 'Arkansas',
					abbreviation: 'AR'
				},
				{
					stateName: 'California',
					abbreviation: 'CA'
				},
				{
					stateName: 'Colorado',
					abbreviation: 'CO'
				},
				{
					stateName: 'Connecticut',
					abbreviation: 'CT'
				},
				{
					stateName: 'Delaware',
					abbreviation: 'DE'
				},
				{
					stateName: 'District Of Columbia',
					abbreviation: 'DC'
				},
				{
					stateName: 'Federated States Of Micronesia',
					abbreviation: 'FM'
				},
				{
					stateName: 'Florida',
					abbreviation: 'FL'
				},
				{
					stateName: 'Georgia',
					abbreviation: 'GA'
				},
				{
					stateName: 'Guam',
					abbreviation: 'GU'
				},
				{
					stateName: 'Hawaii',
					abbreviation: 'HI'
				},
				{
					stateName: 'Idaho',
					abbreviation: 'ID'
				},
				{
					stateName: 'Illinois',
					abbreviation: 'IL'
				},
				{
					stateName: 'Indiana',
					abbreviation: 'IN'
				},
				{
					stateName: 'Iowa',
					abbreviation: 'IA'
				},
				{
					stateName: 'Kansas',
					abbreviation: 'KS'
				},
				{
					stateName: 'Kentucky',
					abbreviation: 'KY'
				},
				{
					stateName: 'Louisiana',
					abbreviation: 'LA'
				},
				{
					stateName: 'Maine',
					abbreviation: 'ME'
				},
				{
					stateName: 'Marshall Islands',
					abbreviation: 'MH'
				},
				{
					stateName: 'Maryland',
					abbreviation: 'MD'
				},
				{
					stateName: 'Massachusetts',
					abbreviation: 'MA'
				},
				{
					stateName: 'Michigan',
					abbreviation: 'MI'
				},
				{
					stateName: 'Minnesota',
					abbreviation: 'MN'
				},
				{
					stateName: 'Mississippi',
					abbreviation: 'MS'
				},
				{
					stateName: 'Missouri',
					abbreviation: 'MO'
				},
				{
					stateName: 'Montana',
					abbreviation: 'MT'
				},
				{
					stateName: 'Nebraska',
					abbreviation: 'NE'
				},
				{
					stateName: 'Nevada',
					abbreviation: 'NV'
				},
				{
					stateName: 'New Hampshire',
					abbreviation: 'NH'
				},
				{
					stateName: 'New Jersey',
					abbreviation: 'NJ'
				},
				{
					stateName: 'New Mexico',
					abbreviation: 'NM'
				},
				{
					stateName: 'New York',
					abbreviation: 'NY'
				},
				{
					stateName: 'North Carolina',
					abbreviation: 'NC'
				},
				{
					stateName: 'North Dakota',
					abbreviation: 'ND'
				},
				{
					stateName: 'Northern Mariana Islands',
					abbreviation: 'MP'
				},
				{
					stateName: 'Ohio',
					abbreviation: 'OH'
				},
				{
					stateName: 'Oklahoma',
					abbreviation: 'OK'
				},
				{
					stateName: 'Oregon',
					abbreviation: 'OR'
				},
				{
					stateName: 'Palau',
					abbreviation: 'PW'
				},
				{
					stateName: 'Pennsylvania',
					abbreviation: 'PA'
				},
				{
					stateName: 'Puerto Rico',
					abbreviation: 'PR'
				},
				{
					stateName: 'Rhode Island',
					abbreviation: 'RI'
				},
				{
					stateName: 'South Carolina',
					abbreviation: 'SC'
				},
				{
					stateName: 'South Dakota',
					abbreviation: 'SD'
				},
				{
					stateName: 'Tennessee',
					abbreviation: 'TN'
				},
				{
					stateName: 'Texas',
					abbreviation: 'TX'
				},
				{
					stateName: 'Utah',
					abbreviation: 'UT'
				},
				{
					stateName: 'Vermont',
					abbreviation: 'VT'
				},
				{
					stateName: 'Virgin Islands',
					abbreviation: 'VI'
				},
				{
					stateName: 'Virginia',
					abbreviation: 'VA'
				},
				{
					stateName: 'Washington',
					abbreviation: 'WA'
				},
				{
					stateName: 'West Virginia',
					abbreviation: 'WV'
				},
				{
					stateName: 'Wisconsin',
					abbreviation: 'WI'
				},
				{
					stateName: 'Wyoming',
					abbreviation: 'WY'
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('states', null);
	}
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'Super Administrator',
          slug: 'super-admin',
          active: true,
          order: 1
        },
        {
          name: 'Administrator',
          slug: 'admin',
          active: true,
          order: 2
        },
        {
          name: 'Content Creator',
          slug: 'content-creator',
          active: true,
          order: 3
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null);
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        type: Sequelize.NUMBER,
        allowNull: false,
        references: { model: 'Clubs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      home_team_goals: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      away_team: {
        type: Sequelize.NUMBER,
        allowNull: false,
        references: { model: 'Clubs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      away_team_goals: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("courses", "question_1", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("courses", "question_2", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("courses", "question_3", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("courses", "answer_1", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("courses", "answer_2", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("courses", "answer_3", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};

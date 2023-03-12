'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "todos",
      [
        {
          task: "Task 1",
          description: "description of task 1, its nullable",
          isFinished: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          task: "Task 2",
          description: "description of task 2, its nullable",
          isFinished: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          task: "Task 3",
          description: "",
          isFinished: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  }
};

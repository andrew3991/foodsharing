
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 1,
          email: 'example1@mail.com',
          password: '$2b$10$BnaLpqymDO6N9oTToeZ6z.n5Sy.bNK8fM.TBaIRT8Qw00ESS2BNp.', // encrypted - use: '123456'
          firstname: 'Anna',
          lastname: 'Müller'
        },
        {
          id: 2,
          email: 'example2@mail.com',
          password: '$2b$10$rei41jUwF769dzf8rf2A/ur41257ve7Og5v7FVMmyiCC1LSUjmNhm', // encrypted - use: 'abcdef'
          firstname: 'Thomas',
          lastname: 'Hoffmann'
        },
        {
          id: 3,
          email: 'example3@mail.com',
          password: '$2b$10$2Uy6N5Dsl73Oy24qBqCxKe4zhkFoFA8J/U7QDCYvBLWuGueQwHTcC', // encrypted - use: '1a2b3c4'
          firstname: 'Andrea',
          lastname: 'Hubert'
        }
      ]);
    });
};

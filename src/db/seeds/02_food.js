// https://www.youtube.com/watch?v=EGLi3QQv8bI&list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw&index=4

exports.seed = function(knex) {
  return knex('food').del()
    .then(function () {
      return knex('food').insert([
        {
          id: 1,
          title: 'Banane',
          description: 'Von 4 Bananen schon 1 gegessen, sehr guter Zustand, nicht zu reif.',
          user_id: 1,
          category: 'Obst',
          city: 'Augsburg',
          zipcode: 86150,
          street: 'Bahnhofstraße',
          streetnumber: 4,
        },
        {
          id: 2,
          title: 'Wiener Würstchen',
          description: 'Vor 3 Tagen bei Rewe gekauft, sehr guter Zustand.',
          user_id: 2,
          category: 'Fleischprodukte',
          city: 'Mering',
          zipcode: 86415,
          street: 'Meringerstraße',
          streetnumber: 9,
        },
        {
          id: 3,
          title: 'Emmentaler',
          description: 'Mindesthaltbarkeit vor ca. 1 Woche abgelaufen, ungeöffnet',
          user_id: 2,
          category: 'Milchprodukte',
          city: 'Friedberg',
          zipcode: 86316,
          street: 'Friedbergerstraße',
          streetnumber: 29,
        }
      ]);
    });
};

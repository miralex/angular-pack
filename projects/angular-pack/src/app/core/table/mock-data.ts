export const mockData = () => {
  const data = [];

  for (let i = 0; i < 1000; i++) {
    data.push({
      id: Math.round(Math.random() * 1000),
      name: ['Paul', 'Olivia', 'Adam ', 'Jessica', 'Brian', 'Charles'][i % 5],
      email: 'test@mail.com',
      amount: Math.round(Math.random() * 1000) + '.00',
      currency: ['UAH', 'USD', 'EUR'][i % 3],
      date: ['21/03/2019', '15/05/2019', '04/06/2019', '25/04/2019'][i % 4],
      status: ['Pending', 'Completed', 'Unconfirmed', 'Failed', 'In queue'][i % 5]
    });
  }

  return data;
};

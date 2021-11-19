function age(date_of_birth, date_of_death) {
  const date1 = new Date(date_of_birth);
  const date2 = new Date(date_of_death);

//   const date1 = new Date("06/30/2019");
//   const date2 = new Date("07/30/2019");
  const diff_time = date2.getTime() - date1.getTime();

  const calculated_age = diff_time / (1000 * 3600 * 24);

  return calculated_age;
}
module.exports ={age} ;


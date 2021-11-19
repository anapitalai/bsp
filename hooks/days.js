function number_of_days(death_date, notification_date) {
  // const date1 = new Date("06/30/2019");
  // const date2 = new Date("07/30/2019");
  const date1 = new Date(death_date);
  const date2 = new Date(notification_date);
  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Difference_In_Days;
}


function total_claim(loan_bal, funeral_benefit) {
  const float1 = parseFloat(loan_bal);
  const float2 = parseFloat(funeral_benefit);
  const final = float1 + float2;
  return final;
}

module.exports = { number_of_days, total_claim};

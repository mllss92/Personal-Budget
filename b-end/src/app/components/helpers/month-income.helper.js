module.exports = getMonthIncome = async (user, reqMonth) => {
  const incomeList = user.income.list;
  const month = incomeList.find(el => el.month === reqMonth);
  if (!month) {
    user.income.list.push({ month: reqMonth, value: [0] });
    await user.save();
    return [0]
  }
  return month.value;
}
module.exports = (user, reqMonth) => {
  if (user.spends.length > 0) {
    return user.spends.map(spend => {
      const month = spend.list.find(el => el.month === reqMonth);
      return month ? month.value : 0
    }).reduce((accumulator, value) => {
      return accumulator += value;
    })
  }
  return 0
}
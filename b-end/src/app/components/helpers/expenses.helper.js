module.exports = (user, month) => {
  if (user.spends.length > 0) {
    return user.spends.map(spend => {
      return spend.list.find(el => el.month === month).value
    }).reduce((accumulator, value) => {
      return accumulator += value;
    })
  }
  return 0
}
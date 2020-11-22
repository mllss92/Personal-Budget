module.exports = async (user, reqMonth) => {
  if (user.spends.length > 0) {
    const isExist = user.spends[0].list.find(el => el.month === reqMonth);
    if (!isExist) {
      user.spends.forEach(spend => {
        spend.list.push({ month: reqMonth, value: 0 })
      });
      await user.save();
    }
    return user.spends.map(spend => {
      return {
        name: spend.name,
        image: spend.image,
        value: spend.list.find(el => el.month === reqMonth).value,
        _id: spend._id
      }
    });
  }
  return []
}
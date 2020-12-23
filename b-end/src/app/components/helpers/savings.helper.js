module.exports = async (user, month) => {
  if (month) {
    const isExist = user.savings[0].list.find(el => el.month === month);
    if (!isExist) {
      user.savings.forEach(saving => {
        saving.list.push({ month: month, value: 0 });
      });
      await user.save();
    }
  }
  return user.savings.map(sav => {
    return {
      name: sav.name,
      image: sav.image,
      value: sav.value,
      _id: sav._id
    }
  })
}
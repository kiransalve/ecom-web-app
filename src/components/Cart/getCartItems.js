export const fetchCartItem = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_FirebaseURL}cart${email}.json`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  const cartArray = [];
  for (const key in data) {
    cartArray.push({ uid: key, ...data[key] });
  }
  //   console.log(cartArray);
  return cartArray;
};

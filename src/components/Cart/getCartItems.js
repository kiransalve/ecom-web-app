export const fetchCartItem = async (email) => {
  const firebaseURL = "https://ecom-a3388-default-rtdb.firebaseio.com/";
  const response = await fetch(`${firebaseURL}cart${email}.json`, {
    method: "GET",
  });
  const data = await response.json();
  const cartArray = [];
  for (const key in data) {
    cartArray.push({ uid: key, ...data[key] });
  }
  //   console.log(cartArray);
  return cartArray;
};

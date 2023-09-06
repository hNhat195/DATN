const cartUtil = {
  getCart: () => {
    return JSON.parse(localStorage.getItem("cart"));
  },

  getEssentialProductData: (product) => {
    return {
      _id: product._id,
      name: product.name,
      fabricType: product.fabricType,
      color: product.color,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    };
  },

  addProductToCart: (product) => {
    product = cartUtil.getEssentialProductData(product);
    let cart = cartUtil.getCart();
    if (cart) {
      const index = cart.findIndex((item) => item._id === product._id);
      if (index === -1) {
        cart.push(product);
      } else {
        cart[index].quantity += product.quantity;
      }
    } else {
      cart = [product];
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    return cart;
  },

  removeProductFromCart: (productId) => {
    const cart = cartUtil.getCart();
    if (cart) {
      const index = cart.findIndex((item) => item._id === productId);
      if (index !== -1) {
        cart.splice(index, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },

  updateProductQuantity: (productId, undate_value) => {
    const cart = cartUtil.getCart();
    if (cart) {
      const index = cart.findIndex((item) => item._id === productId);
      if (index !== -1) {
        cart[index].quantity = cart[index].quantity + undate_value;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },
};

export default cartUtil;

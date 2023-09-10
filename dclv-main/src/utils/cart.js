const cartUtil = {
  setCart: (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },

  getCart: () => {
    return JSON.parse(localStorage.getItem("cart"));
  },

  clearCart: () => {
    localStorage.setItem("cart", JSON.stringify([]));
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

  addProductToCart: (product, rawQuantity) => {
    const quantity = Number.parseInt(rawQuantity);

    product = cartUtil.getEssentialProductData({
      ...product,
      quantity: quantity,
    });

    let cart = cartUtil.getCart();
    if (cart) {
      const index = cart.findIndex((item) => item._id === product._id);
      if (index === -1) {
        cart.push(product);
      } else {
        cart[index].quantity += quantity;
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

  updateProductQuantity: (productId, rawQuantity) => {
    const quantity = Number.parseInt(rawQuantity);
    const cart = cartUtil.getCart();
    if (cart) {
      const index = cart.findIndex((item) => item._id === productId);
      if (index !== -1) {
        cart[index].quantity = quantity;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },
};

export default cartUtil;

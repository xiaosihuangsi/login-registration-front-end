<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <el-button type="primary" @click="handleClick" size="large">Shopping App Login Page</el-button>
    </p>
    <h3>Shopping App Features</h3>
    <div class="features">
      <el-button type="success" @click="viewProducts" size="large" icon="el-icon-goods">View Products</el-button>
      <el-button type="info" @click="viewCart" size="large" icon="el-icon-shopping-cart-full">View Cart</el-button>
      <el-button type="warning" @click="checkout" size="large" icon="el-icon-sell">Checkout</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    handleClick() {
      this.$router.push({ path: "/login" });
    },
    viewProducts() {
      this.$router.push({ path: "/products" });
    },
    viewCart() {
      this.$router.push({ path: "/cart" });
    },
    checkout() {
      this.$router.push({ path: "/checkout" });
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}
.features {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
}
</style>

<template>
  <div v-show="show" class="toast-item">
    <div>{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default() {
          return "";
        },
      },
      show: {
        type: Boolean,
        default: false,
      },
    }
  };
</script>

<style scoped>
  .toast-item {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99;
  }
</style>
<template>
    <div class='logo-container'>
      <img src='@/assets/UpwardorLogo.png' alt='Logo'>
    </div>
  </template>
  
  <script lang='ts'>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Logo',
  });
  </script>
  
  <style scoped>
  .logo-container {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
  }
  
  .logo-container img {
    width: 100px;
    height: auto;
    border-radius: 50%;
  }
  </style>
  
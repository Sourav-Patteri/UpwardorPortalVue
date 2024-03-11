<template>
  <div class='app'>
    Upwardor Portal
    <DoorForm />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import DoorForm from '@/components/DoorForm.vue';

export default defineComponent({
 name: 'App',
 components: {DoorForm}
});
</script>

<style scoped>
</style>


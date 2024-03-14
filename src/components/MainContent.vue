<template>
  <div>
    <div class='header'>
      <img src='@/assets/UpwardorLogo.png' alt='Upwardor Logo' width='140' />

      <h2 class='page-title'>{{ title }}</h2>
    </div>

    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang='ts'>
export interface Props {
  title: string
}

const props = defineProps<Props>();
</script>

<style scoped lang='scss'>
.header {
  display: flex;
  align-items: flex-end;
  gap: 40px;
  margin: 40px 32px;

  .page-title {
    font-size: 30px;
    font-weight: 400;
    padding: 0;
    margin: 0;
    margin-bottom: 12px;
  }
}
</style>

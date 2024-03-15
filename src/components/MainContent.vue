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

defineProps<Props>();
</script>

<style scoped lang='scss'>
.header {
  display: flex;
  align-items: flex-end;
  gap: 40px;
  margin: 0;
  padding: 40px 32px;
  background-color: #FFFFF3;
  box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.75);

  .page-title {
    font-size: 30px;
    font-weight: 400;
    padding: 0;
    margin: 0;
    margin-bottom: 12px;
  }
}

main {
  padding: 24px 24px;
}
</style>

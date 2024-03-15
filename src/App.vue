<template>
  <div class='app'>
    <main-content title='Upwardor Portal'> <!-- FIXME: Maybe a different title for the page? -->
      <portal-view></portal-view>
    </main-content>
  </div>
</template>

<script setup lang='ts'>
import MainContent from '@/components/MainContent.vue';
import PortalView from '@/views/PortalView.vue';
</script>

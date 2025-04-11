<script setup lang="ts" name="LADataScript">
import { onMounted } from 'vue';

const namespace = "LAData";

onMounted(() => {
  const script = document.createElement('script');
  script.id = 'LA-DATA-WIDGET';
  script.src = 'https://v6-widget.51.la/v6/3IdmiCNCA52rjASE/quote.js?theme=#1690FF,#333333,#999999,#333333,#FFFFFF,#1690FF,14&f=14&display=0,0,0,1,0,1,1,1';
  script.crossOrigin = 'anonymous';
  script.charset = 'UTF-8';
  document.body.appendChild(script);
});
</script>

<template>
  <!-- 此组件不渲染任何内容 -->
</template>


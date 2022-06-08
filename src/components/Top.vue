<template>
  <div>this is the header page</div>
  <div>from parent home:{{ title }}</div>
  <button @click="$emit('changeTitle','surprise')">click</button>
</template>
<script setup>
defineProps(["title"]);
</script>
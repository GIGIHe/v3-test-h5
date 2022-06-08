<template>
  <div>this is the content page</div>
  <div>from parent home:{{ content }}</div>
  <slot></slot>
</template>
<script>
export default {
  props: ["content"],
  setup(props) {},
};
</script>
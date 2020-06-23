<template>
  <div class="slidebar">
    Slide bar va aqui
    <div class="d-flex flex-column bd-highlight mb-3">
      <div class="p-2 bd-highlight">Flex item 1</div>
      <div class="p-2 bd-highlight">Flex item 2</div>
      <div class="p-2 bd-highlight">Flex item 3</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromocionSlide"
};
</script>

<style scoped>
.slidebar {
  min-height: 400px;
  max-width: 90%;
  border: 1px green solid;
  margin: 20px auto;
}
</style>

<template>
  <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
    <div class="carousel-inner">
      <div class="carousel-item active" id="1">
        <img src="../../public/1.svg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item" >
        <img src="../../public/4.svg" class="d-block w-100" alt="..." id="2">
      </div>
      <div class="carousel-item" >
        <img src="../../public/5.svg" class="d-block w-100" alt="..." id="3">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#2" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#3" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ImageSlider",
};
</script>

<style scoped>
</style>

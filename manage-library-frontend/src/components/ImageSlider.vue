<template>
  <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/images/1.svg" class="d-block w-100" alt="1">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/2.svg" class="d-block w-100" alt="2">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/3.svg" class="d-block w-100" alt="3">
      </div>
    </div>
    <!-- Nút điều khiển "Previous" -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <!-- Nút điều khiển "Next" -->
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
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

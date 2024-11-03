<template>
  <div class="slider">
    <b-carousel
      controls
      indicators
      background="#ababab"
      :interval="3000"
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide
        v-for="(slide, index) in slides"
        :key="index"
        :img-src="slide.src"
        :interval="slide.interval"
      >
        <template #caption>
          <h3>{{ slide.label }}</h3>
          <p>{{ slide.description }}</p>
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "ImageSlider",
  data() {
    return {
      slides: [
        {
          src: "https://www.pexels.com/vi-vn/anh/tr-em-ng-i-tren-d-ng-c-xanh-1094072/",
          label: "Author",
          description: "Đọc sách  là một trong những cách tốt nhất để mở rộng kiến thức và hiểu biết của bạn.",

          interval: 1000
        },
        {
          src: "https://www.pexels.com/vi-vn/anh/sach-k-gi-y-th-vi-n-26443189/",
          label: "Thomas Carlyle",
          description: "Tất cả những gì con người làm, nghĩ hoặc trở thành: được bảo tồn một cách kỳ diệu trên những trang sách",
          interval: 500
        },
        {
          src: "https://www.pexels.com/vi-vn/anh/29170762/",
          label: "Rene Descartes",
          description: "Đọc được sách hay cũng giống như được trò chuyện với các bộ vĩ đại nhất của những thế kỷ đã trôi qua.",
          interval: 3000
        }
      ]
    };
  }
};
</script>

<style scoped>
.slider {
  max-width: 1050px;
  margin: auto;
}
.slider{
    width: 100%;
    height: auto;
}

img{
    width: auto;
    height: 500px;
}

/* Mobile View */
@media screen and (max-width:768px){
    img{
        height: 250px;
    }
}
</style>

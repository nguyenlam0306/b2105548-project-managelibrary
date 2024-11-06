<template>
  <div id="home">
    <ImageSlider />
    <WelcomeBox />
    <Stats />
    <RecentAddedBooks />
    <PopularBooks />
    <ReservedBooks />
    <News />
    <PhotoGallery />
    <Footer />
  </div>
</template>

<script>
import ImageSlider from '../components/ImageSlider.vue';
import WelcomeBox from '../components/WelcomeBox.vue';
import Stats from '../components/Stats.vue';
import RecentAddedBooks from '../components/RecentAddedBooks.vue';
import PopularBooks from '../components/PopularBooks.vue';
import ReservedBooks from '../components/ReservedBooks.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    ImageSlider,
    WelcomeBox,
    Stats,
    RecentAddedBooks,
    PopularBooks,
    ReservedBooks,  
    Footer
  }
};
</script>

<style scoped>
/* Thêm CSS nếu cần */
</style>

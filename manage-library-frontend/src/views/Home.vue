<template>
  <div id="home">
    <ImageSlider />
    <WelcomeBox />
    <About />
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
import About from '../components/About.vue';
import Stats from '../components/Stats.vue';
import RecentAddedBooks from '../components/RecentAddedBooks.vue';
import PopularBooks from '../components/PopularBooks.vue';
import ReservedBooks from '../components/ReservedBooks.vue';
import News from '../components/News.vue';
import PhotoGallery from '../components/PhotoGallery.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    ImageSlider,
    WelcomeBox,
    About,
    Stats,
    RecentAddedBooks,
    PopularBooks,
    ReservedBooks,
    News,
    PhotoGallery,
    Footer
  }
};
</script>

<style scoped>
/* Thêm CSS nếu cần */
</style>

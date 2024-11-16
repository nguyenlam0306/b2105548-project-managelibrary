<template>
  <div id="home">
    <ImageSlider />
    <WelcomeBox />
    <Stats />
    <RecentAddedBooks />
    <PopularBooks />   
    <Footer />
  </div>
</template>

<script>
import ImageSlider from '../components/ImageSlider.vue';
import WelcomeBox from '../components/WelcomeBox.vue';
import Stats from '../components/Stats.vue';
import RecentAddedBooks from '../components/RecentAddedBooks.vue';
import PopularBooks from '../components/PopularBooks.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    ImageSlider,
    WelcomeBox,
    Stats,
    RecentAddedBooks,
    PopularBooks, 
    Footer
  }
};
</script>

<style scoped>

</style>

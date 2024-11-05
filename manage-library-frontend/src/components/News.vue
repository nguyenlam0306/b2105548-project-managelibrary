<template>
  <div class="news-container">
    <h1 class="news-title">Updates for You</h1>
    <div class="news-data">
      <div class="news-empty"></div>
      <div>
        <h1 class="news-subtitle">Competitions</h1>
        <div>
          <div v-for="(competition, index) in competitions" :key="index" class="news-competition-event">
            <p>{{ competition.title }}</p>
            <p>{{ competition.description }}</p>
          </div>
        </div>
      </div>
      <div class="news-empty"></div>
      <div>
        <h1 class="news-subtitle">Online Quiz</h1>
        <div>
          <div v-for="(quiz, index) in quizzes" :key="index" class="news-quiz-event">
            <p>{{ quiz.title }}</p>
            <p>{{ quiz.description }}</p>
          </div>
        </div>
      </div>
      <div class="news-empty"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      competitions: [
        { title: "Competion-1", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { title: "Competion-2", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { title: "Competion-3", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { title: "Competion-4", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { title: "Competion-5", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
      ],
      quizzes: [
        { title: "Quiz-1", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { title: "Quiz-2", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { title: "Quiz-3", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { title: "Quiz-4", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { title: "Quiz-5", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
      ],
    };
  },
};
</script>

<style scoped>
.news-container{
    width: 100%;
    height: auto;
    background-color: rgb(247,235,215);
    display: flex;
    flex-direction: column;
}

.news-data{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.news-title{
    position: relative;
    color: #0E2431;
    margin-top: 10px;
    margin-bottom: 50px;
    text-align: center;
    font-size: 32px;
    padding-top: 15px;
}

.news-subtitle{
    font-size: 25px;
    text-align: center;
}

.news-competition-event{
    border:2px solid brown;
    border-radius: 5px;
    text-align: left;
    width: 100%;
    padding: 10px;
    margin-bottom: 15px!important;
}

.news-quiz-event{
    border:2px solid brown;
    border-radius: 5px;
    text-align: left;
    width: 100%;
    padding: 10px;
    margin-bottom: 15px!important;
}

.news-empty{
    width: 25px;
}

@media screen and (max-width:768px) {
    .news-data{
        flex-direction: column;
    }    
}
</style>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <router-link to="/" class="home-link">Go Back Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: #333;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

.not-found h1 {
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  color: #ff6b6b;
}

.not-found p {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.home-link {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.home-link:hover {
  background-color: #ff5252;
}
</style>

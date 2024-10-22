<template>
  <div class="aboutMe">
    <img id="avater" :src="cover" alt="">
    <div class="container">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cover: this.$store.getters.aboutMe.cover,
      description: this.$store.getters.aboutMe.description
    }
  }
}
</script>

<style scoped>
.aboutMe {
    /* display: flex; */
    position: relative;
    background-color: var(--infocard-bg-color);
    border-radius: 15px;
}

#avater {
  position: absolute;
  left: 3vw;
  top: 13vh;
  width: 10vw;
  border-radius: 10px;
}

.container {
  position: absolute;
  top: 20vh;
  right: 5vw;
  width: 20vw;
  color: var(--font-color);
  line-height: 25px;
}
 
</style>
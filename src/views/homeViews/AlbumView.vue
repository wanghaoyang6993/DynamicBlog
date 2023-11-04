<template>
  <div class="albumCard">
    <KeepAlive>
      <router-view/>
    </KeepAlive>
  </div>
</template>

<script>


export default {
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  
}
</script>

<style scoped>
.albumCard {
  border-radius: 15px;
  background-color: var(--infocard-bg-color);
}

</style>
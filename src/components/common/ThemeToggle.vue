<template>
  <div class="toggle" @click="switchTheme">
      <div class="wire"></div>
      <div class="circle"></div>
    </div>
</template>

<script>
import { setTheme, changeTheme } from '@/utils/switchTheme';


export default {
    methods: {
        switchTheme() {
            changeTheme()
            setTheme()
        }
    },
    mounted() {
        setTheme()
    }
}
</script>

<style>

.toggle {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 0;
    right: 28.5%;
    height: 10%;
    width: 15px;
    cursor: pointer;
    z-index: 999;
    transition: .3s;
  }

  .toggle .wire{
    background-color: orange;
    width: 1px;
    height: 100%;
  }

  .toggle .circle {
    height: 15px;
    width: 15px;
    background-color: white;
    border: solid 1px orange;
    border-radius: 50%;
  }

  .toggle:active {
    height: 11%;
  }

</style>
<template>
  <div class="container">
    <div id="controls" class="controls-wrapper">

    </div>
    <div id="setup" class="setup-wrapper">
      <div class="get-started">
        <button @click="start">Start</button>
      </div>
      <div class="app-name">
        <input type="text">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods: {
    start(){
      var setup = document.getElementById("setup");
      var controls = document.getElementById("controls");
      console.log(setup.children);
      controls.style.display = 'block';
      controls.style.animation = 'fading 2s infinite';
    }
  }
}
</script>

<style scoped>
@keyframes fading {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

.container{
  height: calc(100vh - 80px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.setup-wrapper{
  border-radius: 15px;
  box-shadow: 2px 3px 8px lightgrey;
  width: 70%;
  height: 75%;
}
.controls-wrapper{
  display: block;
  border-radius: 15px;
  box-shadow: 2px 3px 8px lightgray;
  width: 25%;
  height: 75%;
}

</style>

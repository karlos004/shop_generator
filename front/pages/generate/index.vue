<template>
  <div class="container">
    <div id="controls" class="controls-wrapper">
      <div id="myProgress">
        <div id="myBar">10%</div>
      </div>
    </div>
    <div id="setup" class="setup-wrapper">
      <div class="setup-item get-started">
        <button @click="start">Start</button>
      </div>
      <div class="setup-item app-name">
        <input type="text">
      </div>
      <div class="setup-item shop-logo">
        <input type="text">
      </div>
      <div class="setup-item template">
        <input type="text">
      </div>
      <div class="setup-item categories">
        <input type="text">
      </div>
      <div class="setup-item products">
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
    move_bar(){
      var elem = document.getElementById("myBar");
      var width = 100;
      elem.style.width = width + "%";
      elem.innerHTML = width + "%";
    },
    start(){
      var setup = document.getElementById("setup");
      var controls = document.getElementById("controls");
      console.log(setup.children);
      controls.style.display = 'block';
      setup.children[0].style.display = 'none';
      setup.children[1].style.display = 'block';
      this.move_bar();
    }
  }
}
</script>

<style scoped>

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
  display: none;
  border-radius: 15px;
  box-shadow: 2px 3px 8px lightgray;
  width: 25%;
  height: 75%;
}

.app-name{
  display: none;
}

.setup-item{
  width: 100%;
  height: 100%;
}

#myProgress{
  margin: 10px;
}

#myBar {
  border-radius: 5px;
  width: 10%;
  height: 30px;
  background-color: #4CAF50;
  text-align: center;
  line-height: 30px;
  color: white;
}

</style>

<template>
  <div class="about">
        <PanelProup />
        <Chart />
        <Map />
  </div>
</template>

<script>
import PanelProup from './panelProup'
import Chart from './chart'
import Map from './map'
export default {
  data(){
    return {
      
    }
  },
  components:{
    PanelProup,
    Chart,
    Map
  }
}
</script>

<style>
  
</style>
<template>
  <div id="bg">
    <div id="modal">
      <h1>Modal</h1>
      <h3>You've logined</h3>
    </div>
  </div>
  </template>
  <script>
    export default {
      name: 'ModalCompo',
      props: {
      },
      data(){
        return{
        }
      }
    }
</script>
<style lang='scss' scoped>
#bg{
  width:100%;
  height: 720px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #999, $alpha: 0.5);
}
#modal{
  border: 1px solid red;
  width: 50%;
  height: 300px;
  text-align: center;
  background-color: $NAVY;


}
</style>
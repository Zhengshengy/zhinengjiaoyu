<template>
    <div class="collecstion">
        <div class="demo-avatar">
            <Avatar icon="ios-person" style="width:85px;height: 85px;border-radius: 50%; margin-left: 15px" />
            <Avatar icon="ios-person" style="width:85px;height: 85px;border-radius: 50%;margin-left: 195px" />
            <Avatar icon="ios-person" style="width:85px;height: 85px;border-radius: 50%;margin-left: 180px" />
            <Avatar style="background-color: #87d068;width:85px;height: 85px;border-radius: 50%;margin-left: 185px;" icon="ios-person" />
        </div>
        <Steps :current="4" style="margin-top: 25px">
            <Step title="基本信息" ></Step>
            <Step title="所授科目"></Step>
            <Step title="资质认证"></Step>
            <Step title="设置收款"></Step>
        </Steps>
    </div>
</template>
<script>

</script>
<style scoped>
    .collecstion{
  width: 80%;
  max-width: 1080px;
  margin: 20px auto 0;
  height: 100%;
}
.demo-avatar Avatar{
  width:85px;
  height: 85px;
  margin-right: 200px;
}
</style>
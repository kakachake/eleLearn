<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-10 17:03:48
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 11:38:53
 -->
<template>
  <div class="hklo">
    <div>
      <KButton nativeType="button">默认按钮</KButton>
      <KButton type="primary" nativeType="button">主要按钮</KButton>
      <KButton type="success" nativeType="button">成功按钮</KButton>
      <KButton type="info" nativeType="button">信息按钮</KButton>
      <KButton type="warning" nativeType="button">警告按钮</KButton>
      <KButton type="danger" nativeType="button">危险按钮</KButton>
    </div>
    <div>
      <KButton  nativeType="button"  plain>朴素按钮</KButton>
      <KButton type="primary" nativeType="button" plain>主要按钮</KButton>
      <KButton type="success" nativeType="button" plain>成功按钮</KButton>
      <KButton type="info" nativeType="button" plain>信息按钮</KButton>
      <KButton type="warning" nativeType="button" plain>警告按钮</KButton>
      <KButton type="danger" nativeType="button" plain>危险按钮</KButton>
    </div>
    <div>
      <KButton :loading="true" nativeType="button"  plain  disabled>禁用状态</KButton>
      <KButton type="primary" nativeType="button" plain disabled>主要按钮</KButton>
      <KButton type="success" nativeType="button" plain disabled>成功按钮</KButton>
      <KButton type="info" nativeType="button" plain disabled>信息按钮</KButton>
      <KButton type="warning" nativeType="button" plain disabled>警告按钮</KButton>
      <KButton type="danger" nativeType="button" plain disabled>危险按钮</KButton>
    </div>
    <div>
      <KButton :loading="true" nativeType="button"  plain  round>禁用状态</KButton>
      <KButton type="primary" nativeType="button" plain round>主要按钮</KButton>
      <KButton type="success" nativeType="button" plain round>成功按钮</KButton>
      <KButton type="info" nativeType="button" plain round>信息按钮</KButton>
      <KButton type="warning" nativeType="button" plain round>警告按钮</KButton>
      <KButton type="danger" nativeType="button" plain round>危险按钮</KButton>
    </div>
    <div>
      <KButton nativeType="button"  icon="k-icon-search" plain  circle></KButton>
      <KButton type="primary" nativeType="button" icon="k-icon-edit" plain circle></KButton>
      <KButton type="success" nativeType="button" icon="k-icon-check" plain circle></KButton>
      <KButton type="info" nativeType="button" icon="k-icon-message"  plain circle></KButton>
      <KButton type="warning" nativeType="button" icon="k-icon-star-off"  plain circle></KButton>
      <KButton type="danger" nativeType="button" icon="k-icon-message" plain circle></KButton>
    </div>
    <div>
      <k-button>默认按钮</k-button>
      <k-button size="medium">中等按钮</k-button>
      <k-button size="small">小型按钮</k-button>
      <k-button size="mini">超小按钮</k-button>
    </div>
    <KButtonGroup>
      <KButton type="primary" nativeType="button">主要按钮</KButton>
      <KButton type="success" nativeType="button">成功按钮</KButton>
    </KButtonGroup>
    <div>
      <KButton type="primary" nativeType="button" long>长按钮</KButton>
    </div>
    <div>
      <k-link href="https://github.com/kakachake" target="_blank">默认链接</k-link>
      <k-link type="primary">主要链接</k-link>
      <k-link type="success">成功链接</k-link>
      <k-link type="warning">警告链接</k-link>
      <k-link type="danger">危险链接</k-link>
      <k-link type="info">信息链接</k-link>
    </div>
    <div>禁用状态
      <k-link disabled>默认链接</k-link>
      <k-link type="primary" disabled>主要链接</k-link>
      <k-link type="success" disabled>成功链接</k-link>
      <k-link type="warning" disabled>警告链接</k-link>
      <k-link type="danger" disabled>危险链接</k-link>
      <k-link type="info" disabled>信息链接</k-link>
    </div>
    <div>
      <k-link icon="k-icon-edit">编辑</k-link>
      <k-link>查看<i class="k-icon-view k-icon--right"></i> </k-link>
    </div>
    <div>
      <k-date-picker v-model="value" format="" @input="input"></k-date-picker>
    </div>
    <div>
      <backTop :rate="4"></backTop>
    </div>
    <div>
      <KButton type="primary" nativeType="button" @click="OpenMess()">打开message</KButton>
    </div>
    <div>
      <kRadio v-model= "label" label="1" >选项一</kRadio>
      <kRadio v-model= "label" label="2" >选项二</kRadio>
    </div>
    <div>
      <kRadioGroup v-model= "label">
        <kRadio  label="1" >选项一</kRadio>
        <kRadio  label="2" >选项二</kRadio>
      </kRadioGroup>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
// import KButton from 'pack/button/src/KButton'
// import KButtonGroup from 'pack/button/src/KButton-group'

export default {
  data(){
    return {
      value :'',
      label: '1'
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    handelClick(e){
      console.log(e);
      
    },
    input(e){
      console.log('input=>>>>',e);
      
    },
    OpenMess(){
      let message = this.$kMessage.loading({
        message: '请稍等……',
        duration: false,
        site:'top',
        onClose:()=>{
          this.$kMessage.success({
            message: '操作成功！',
            showClose: true,
            duration: 3000,
            site:'center',
          })
        }
      })
      console.log(message);
      setTimeout(()=>{
        this.$kMessage.closeAll()
      },1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hklo{
  min-height: 20000px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div{
  margin-top: 10px;
}
.top-enter-active{
    transition: .5s ease;
    animation: myTopVis .5s;
}

.top-leave-active{
    transition: .5s ease;
    animation: myTopUnvis .5s;
}

@keyframes myTopVis
{
    0%   {transform: scale(0)}
    50%  {transform: scale(1.2)}
    100% {transform: scale(1)}
}

@keyframes myTopUnvis
{
    0%   {transform: scale(1)}
    50%  {transform: scale(1.2)}
    100% {transform: scale(0)}
}
</style>

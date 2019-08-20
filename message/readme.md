# kmessage

一个基于element message的修改版，主要是样式的变化及位置的变化，用于个人学习使用

# Usage

```
npm i kmessage --save-dev
```

```javascript
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
    message.close() //删除某个
	this.$kMessage.closeAll() //删除全部
},1000)
```



# options

主要参数与官网一致

下面是新增参数

参数|说明|类型|可选值|默认值
-|-|-|-|-|
site|位置|string|top/center|top|


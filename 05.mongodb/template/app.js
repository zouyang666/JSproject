//引入模板引擎
const template=require('art-template');
//引入路径操作
const path=require('path');


const views=path.join(__dirname,'views',"index.art")

const html=template(views,{
    name: '张山',
    age: 18
});



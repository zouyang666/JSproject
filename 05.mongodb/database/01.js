const mongoose=require('mongoose');
//1.连接数据库，不需要创建数据库，会自动创建
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('数据库连接成功'))
    .catch((err)=>console.log(err,'数据库连接失败'))


/*
    2.创建集合
        2.1设定集合规则
        2.2创建集合并应用规则
  */
const  courseSchema=new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});
const Course=mongoose.model('Course',courseSchema)//courses
/* 
    3.创建文档 
        第一种方法
            3.1创建集合实例
            3.2调用实例对象下的save方法将数据保存到数据库中
                const course=new Course({
                    name: 'shangcahn',
                    author: 'sdj',
                    isPublished: true
                });
                course.save()
        第二种方法如下


*/
// Course.create({name: 'javascript',author: '张山',isPublished:true},(err,result)=>{
//     console.log(err)
//     console.log(result)
// })
/* 
    4.查询文档
        4.1根据条件查找文档（条件为空时则查找所有文档） 返回的是数组
            Course.find().then(result=>console.log(result));
            根据id查询
                Course.find({_id: '5e94102634320c5fb8572801'}).then(result=>console.log(result));
            findOne()没有数据时返回集合中第一条文档
            根据age大于20小于50查询
                find({age: {$gt:20,$lt: 50}}).then()    
            匹配包含,查询爱好这个数组里包含敲代码的文档
                find({hobbies: {$in: ['敲代码']}}).then()
            选择查询的字段
                find().select('name author').then()
            对查询出来的数据进行升序排序
                find().sort('age').then()
            对查询出来的数据进行降序排序
                find().sort('-age').then()
            skip()跳过多少条数据  limit()限制查询数量
        

*/
Course.findOne({_id: '5e94102634320c5fb8572801'}).then(result=>console.log(result));
/* 
    5.删除文档
        5.1删除单个文档
            Course.findOneAndDelete({}).then()  如果查询条件匹配多个文档，那么将会删除第一个匹配的文档
        5.2删除多个文档
            Course.deleteMany({}).then()
*/
/* 
    6.更新文档
        更新单个文档
            Course.updateOne({查询条件},{要修改的值}).then()
        更新多个文档
            Course.updateMany({查询条件},{要更改的值}).then()
    7.mongoose验证
        在创建集合规则时，可以设置当前字段的验证规则，验证失败就输入插入失败
            required:true  必传字段
            minlength: 2,  最短长度
            maxlength: 5，  最大长度
            trim: true    去除空格
            min: 18  最小值
            max: 28  最大值 
            default: 默认值
            enum: ['',''] 必须传入其中设置的值
            validate: {
                validator: v=>{
                    返回布尔值
                    true  验证成功
                    false 验证失败
                    v就是要验证的值
                },
                自定义错误信息
                message: ''
            }
                new mongoose.Schema({
                    title:{type: String,
                            required: [true,'请传入文章标题'],
                            minlength: 2,  最短长度
                            maxlength: 5，  最大长度
                            trim: true    去除空格
                        }
                });
    8.获取错误信息
            .catch(error=>{
                //获取错误信息对象
                const err=error.errors;
                //循环错误信息对象
                for(var attr in err){
                    //将错误信息打印到控制台中
                    console.log(err[attr]['message']);
                }
            })
    9.集合关联
        不同集合的数据之间是有关系的
            1.使用id对集合进行关联
            2.使用populate方法进行关联集合查询
                
*/
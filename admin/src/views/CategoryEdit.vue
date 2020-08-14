<template>
    <div>
        <h1>{{id? '编辑分类':'新建分类'}}</h1>
<el-form lable-width='120px' @submit.native.prevent='save'>
    <el-form-item lable='名称'>
        <el-input v-model="model.name"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type='primary' native-type='subimt' >
保存
        </el-button> 
    </el-form-item>



</el-form>

    </div>
</template>

<script>
export default {
    props:{
        id:{

        }
    },
    data() {
        return {
            model:{
                name:''
            }
        }
    },
    methods: {
        // 把异步的回调函数的写法写成类似于同步的写法
        async save(){
            console.log(this.$http);
       const res= await  this.$http.post('categories',this.model)
       this.$router.push('/categories/list')
        this.$message(
            {
                type:'success',
                message:'保存成功'
            }
        )
        },
       async fetch(){
const res =await this.$http.get(`categories/${this.id}`);this.model=res.data;
        }
    },
    created() {
        // 如果有id则执行
        this.id&&this.fetch();
        
    },
}
</script>
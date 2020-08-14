<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
        <el-table-column prop="_id" label="ID" width='260'>
        </el-table-column>
          <el-table-column prop="name" label="分类名称" >
        </el-table-column>
         <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
      </template>
    </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
  items:[]
    }
  },
  methods: {
    async fetch(){
// await的意思就是等待。它后面可以跟一个表达式。如果是值(如字符串、数字、普通对象等等)的话，返回值就是本身的值。
// 不过最常用的是后面跟一个promise对象。await会等待这个promise的状态由pending转为fulfilled或者rejected。在此期间它会阻塞，延迟执行await语句后面的语句。
// 如果promise对象的结果是resolve，它会将resolve的值，作为await表达式的运算结果。
     this.$http.get('categories').then(res=>{
        console.log(res);
      this.items=res.data
      });
     
    }
  },
  created() {
    this.fetch()
  },
}
</script>
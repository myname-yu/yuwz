<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据 -->
      <el-table-column prop="_id" label="ID" width="260"></el-table-column>
      <el-table-column prop="categories[0]" label="所属分类"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" sizsdcsdc="s mall" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      // await的意思就是等待。它后面可以跟一个表达式。如果是值(如字符串、数字、普通对象等等)的话，返回值就是本身的值。
      // 不过最常用的是后面跟一个promise对象。await会等待这个promise的状态由pending转为fulfilled或者rejected。在此期间它会阻塞，延迟执行await语句后面的语句。
      // 如果promise对象的结果是resolve，它会将resolve的值，作为await表达式的运算结果。
      const res = await this.$http.get("rest/articles");
      // console.log(res);
      this.items = res.data;
      console.log(res.data);
    },
    // 列表删除功能
    async remove(row) {
      // console.log(row);
      // console.log(row.name, row._id);
      this.$confirm(`是否确定要删除文章“${row.title}”?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/articles/${row._id}`);
        console.log(res);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
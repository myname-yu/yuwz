<template>
  <div>
    <h1>{{id? '编辑分类':'新建分类'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <!-- key决定了vue的性能，label决定了option显示的内容 value决定了点击时候真正存储的内容 -->
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="subimt">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      parents: [],
    };
  },
  methods: {
    // 把异步的回调函数的写法写成类似于同步的写法
    async save() {
      // console.log(this.$http);
      let res;
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },
    async fatchParents() {
      const res = await this.$http.get(`categories`);
      this.parents = res.data;
    },
  },
  created() {
    // 如果有id则执行
    this.fatchParents();
    this.id && this.fetch();
  },
};
</script>
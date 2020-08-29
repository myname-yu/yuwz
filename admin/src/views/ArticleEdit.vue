<template>
  <div>
    <h1>{{id? '编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <!-- 富文本编辑器 vue-editor-->
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="subimt">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 这里以解构的方法写
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },

  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //  先定义一个表单数据，用来提交数据
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      // 插入一个元素
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      // 重置上传器
      resetUploader();
      // npm示例源码
      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData,
      // })
      //   .then((result) => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    // 把异步的回调函数的写法写成类似于同步的写法
    async save() {
      // console.log(this.$http);
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fatchCategories() {
      const res = await this.$http.get(`rest/categories`);

      this.categories = res.data;
    },
  },
  created() {
    // 如果有id则执行
    this.fatchCategories();
    this.id && this.fetch();
  },
};
</script>
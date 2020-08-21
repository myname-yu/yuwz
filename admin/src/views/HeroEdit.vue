<template>
  <div>
    <h1>{{id? '编辑':'新建'}}英雄</h1>
    <!-- 英雄信息 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <!-- action修改成动态绑定 这里必须用完整地址，因为它的底层用的是自带的ajax请求 -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+`/upload`"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 英雄类型 -->
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 英雄特性 -->
      <el-form-item label="难度">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
      </el-form-item>
      <el-form-item label="技能">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
      </el-form-item>
      <el-form-item label="生存">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
      </el-form-item>
      <!-- 顺风出装 -->
      <el-form-item label="顺风出装">
        <el-select v-model="model.itemsTail" multiple>
          <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 逆风出装 -->
      <el-form-item label="逆风出装">
        <el-select v-model="model.itemsHead" multiple>
          <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 使用技巧 -->
      <el-form-item label="使用技巧">
        <el-input v-model="model.usageTips" type="textarea"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="subimt">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      categories: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
        },
      },
    };
  },
  methods: {
    afterUpload(res) {
      //因为一开始，在model对象中没有写icon属性，所以用传统的对象赋值方式
      // 不一定能赋值成功，因此， 这里用了vue的显式赋值
      // this.$set(this.model, "avatar", res.url);
      console.log(res);
      this.model.avatar = res.url;
      // console.log(res.url);
    },

    // 把异步的回调函数的写法写成类似于同步的写法
    async save() {
      // console.log(this.$http);
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.model = res.data;
      // 下面代码相当于先把this.model添加到一个空对象中，然后再把res.data插入到该对象中
      // 这样可以达到，当this.model中本来就有属性时，不会覆盖原属性
      // 即当this.model中有res.data的属性时，this.model 中的同名属性会被覆盖掉，否则保存下来
      // 得到的是一个this.data+res.data的对象
      this.model = Object.assign({}, this.model, res.data);
      // console.log("***********");
      console.log(res.data);
      // console.log(this.model);
      // console.log("***********");
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      // console.log(res);
      this.categories = res.data;
      // console.log(`列表数据start`);
      // console.log(this.categories);
      // console.log(`列表数据end`);
    },
    // 获取装备出装
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      console.log(res);
      this.items = res.data;
    },
  },
  created() {
    // 如果有id则执行
    this.fetchCategories();
    this.fetchItems();
    this.id && this.fetch();
  },
};
</script>

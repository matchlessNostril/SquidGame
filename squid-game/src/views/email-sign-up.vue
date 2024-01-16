<template>
  <div class="flexCenter columnFlex">
    <h1><b>E</b>mail <b>R</b>egi<b>s</b>ter</h1>
    <form @submit.prevent="signUp" class="flexCenter columnFlex mt-8">
      <v-text-field
        dark
        color="#fe4063"
        name="Name"
        label="Name"
        type="text"
        v-model="name"
        required
      ></v-text-field>
      <v-text-field
        dark
        color="#fe4063"
        name="Email"
        label="Email"
        type="email"
        v-model="email"
        required
      ></v-text-field>
      <v-text-field
        dark
        color="#fe4063"
        name="Password"
        label="Password"
        type="password"
        v-model="password"
        required
      ></v-text-field>
      <!-- 비밀번호 확인이 맞는지 검사하도록 rules 속성 적용 -->
      <v-text-field
        dark
        color="#fe4063"
        name="ConfirmPassword"
        label="Confirm Password"
        type="password"
        v-model="confirmPassword"
        required
        :rules="[comparePassword]"
      ></v-text-field>
      <button type="submit" class="mt-5 btn squidRed">
        <v-icon class="mr-2">mdi-login</v-icon>Sign Up
      </button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    // 비밀번호와 비밀번호 확인 값이 일치하는지 검사
    comparePassword() {
      if (this.password == this.confirmPassword) return true;
      else return "비밀번호가 일치하지 않습니다!";
    },
  },
  methods: {
    signUp() {
      if (this.comparePassword == true) {
        this.$store.dispatch("signUp", {
          pEmail: this.email,
          pPassword: this.password,
          pName: this.name,
        });
      }
    },
  },
};
</script>
<style src="../assets/css/button.css"></style>
<style scoped src="../assets/css/form.css"></style>

<template>
  <div class="flexCenter columnFlex">
    <h1><b>E</b>mail <b>L</b>og<b>i</b>n</h1>
    <!-- prevent : form의 기본 동작인 submit 후 새로 고침 방지 -->
    <form @submit.prevent="signIn" class="flexCenter columnFlex">
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
        label="PassWord"
        type="password"
        v-model="password"
        required
      ></v-text-field>
      <button type="submit" class="mt-5 btn squidRed">
        <v-icon class="mr-2" color="white">mdi-login</v-icon>Sign In
      </button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("signIn", {
        pEmail: this.email,
        pPassword: this.password,
      });
    },
  },
};
</script>
<style src="../assets/css/button.css"></style>
<style scoped src="../assets/css/form.css"></style>

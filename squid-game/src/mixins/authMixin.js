export const getUserAuthStatus = {
  computed: {
    getUserAuthStatus() {
      return this.$store.getters.getUserAuthStatus;
    },
  },
};

export const getUserInfo = {
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
};

export const logout = {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};

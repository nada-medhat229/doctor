<template>
  <Navbar />
  <div class="container">
    <div class="d-flex justify-content-between">
      <router-link :to="{ name: 'AddNewRest' }">
        <button type="button" class="btn btn-primary">Add new doctor</button>
      </router-link>
      <router-link :to="{ name: 'DeleteAll' }">
        <button type="button" class="btn btn-danger">Delete All</button>
      </router-link>
    </div>

    <UserRest :allRest="listoflocation"></UserRest>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Navbar from "@/components/Navbar/Navbar.vue";
import UserRest from "@/components/AddNewRest/UserRest.vue";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Doctor",
  components: {
    Navbar,
    UserRest,
  },
  data() {
    return {
      userName: "",
      listoflocation: [],
      userId: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-data");
    if (!user) {
      this.redirectTo({ val: "Login" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    let result = await axios.get(
      `http://localhost:3000/Doctors?userId=${this.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      this.listoflocation = result.data;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
<style lang=""></style>

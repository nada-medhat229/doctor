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
    let result = await axios.get(`https://dummyjson.com/users`);
    if (result.status == 200 && result.data.users.length > 0) {
      this.listoflocation = result.data.users;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
<style lang=""></style>

<template>
  <Navbar />
  <div class="container">
    <div class="d-flex justify-content-between">
      <router-link :to="{ name: 'AddNewPatient' }">
        <button type="button" class="btn btn-primary">Add new Patient</button>
      </router-link>
    </div>

    <PatientRest :allRest="listoflocation"></PatientRest>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Navbar from "@/components/Navbar/Navbar.vue";
import PatientRest from "@/components/patient/PatientRest.vue";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Patients",
  components: {
    Navbar,
    PatientRest,
  },
  data() {
    return {
      userName: "",
      listoflocation: [],
      userId: "",
    };
  },
  async mounted() {
    let result = await axios.get(`https://jsonplaceholder.typicode.com/users`);
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

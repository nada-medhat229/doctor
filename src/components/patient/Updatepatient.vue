<template lang="">
  <div class="container">
    <Navbar />

    <div class="w-75 m-auto mt-5">
      <h4 class="text-center pb-3">Update patient</h4>
      <form action="" @click.prevent>
        <div class="row align-items-center">
          <div class="col-auto d-block w-100 mx-auto">
            <input
              type="text"
              class="form-control"
              placeholder="enter your name"
              v-model="state.name"
            />
            <span class="error" v-if="v$.name.$error">{{
              v$.name.$errors[0].$message
            }}</span>
          </div>
        </div>
        <br />
        <div class="row align-items-center">
          <div class="col-auto w-100 d-block mx-auto">
            <input
              type="tel"
              class="form-control"
              name="phone"
              placeholder="enter your phone"
              v-model="state.phone"
            />
            <span class="error" v-if="v$.phone.$error">{{
              v$.phone.$errors[0].$message
            }}</span>
          </div>
        </div>
        <br />

        <div class="row">
          <div
            class="col-auto d-block mx-auto alert alert-success w-75 mt-3"
            v-if="successmessage.length > 0"
          >
            {{ successmessage }}
          </div>
          <div
            class="col-auto d-block mx-auto alert alert-danger w-75 mt-3"
            v-if="errormessage.length > 0"
          >
            {{ errormessage }}
          </div>
        </div>

        <button type="button" @click="updatedoctors()" class="btn btn-success">
          Update Now
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import Navbar from "@/components/Navbar/Navbar.vue";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Updatepatient",
  components: {
    Navbar,
  },
  setup() {
    const state = reactive({
      name: "",
      phone: "",
    });
    const rules = computed(() => {
      return {
        name: { required },
        phone: { required },
      };
    });
    const v$ = useVuelidate(rules, state);
    return {
      v$,
      state,
    };
  },
  data() {
    return {
      resetId: "",
      errormessage: "",
      successmessage: "",
      doctorsData: [],
    };
  },
  mounted() {
    this.resetId = this.$route.params.resetId;
    this.cancurruntuserAcces();
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async cancurruntuserAcces() {
      let result = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${this.resetId}`
      );

      if (result.status == 200) {
        this.doctorsData = result.data;
        this.state.name = this.doctorsData.name;
        this.state.phone = this.doctorsData.phone;
      }
    },
    async updatedoctors() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.successmessage = "Good Job";
        let results = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${this.resetId}`
        );
        console.log(results);
        if (results.status == 200) {
          this.errormessage = "";
          this.successmessage = "Updated doctors";
          setTimeout(() => {
            this.redirectTo({ val: "Patients" });
          }, 2000);
        } else {
          this.successmessage = "";
          this.errormessage = "Faild";
        }
      } else {
        this.successmessage = "";
        this.errormessage = "Check Your Data All Feild Must Be Complete";
      }
    },
  },
};
</script>
<style scoped lang="scss">
input {
  margin-bottom: 5px;
}
.error {
  color: red;
}
</style>

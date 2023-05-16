<template>
  <div class="AddNewRest">
    <div class="container">
      <Navbar />

      <div class="w-75 m-auto mt-5">
        <h4 class="text-center pb-3">Add New Doctor</h4>
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

          <button type="button" @click="addlocation()" class="btn btn-primary">
            Save changes
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import Navbar from "@/components/Navbar/Navbar.vue";
import { required } from "@vuelidate/validators";
// import axios from "axios";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
export default {
  name: "AddNewRest",
  components: {
    Navbar,
  },
  setup() {
    const state = reactive({
      name: "",
      phone: "",
      address: "",
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
      userId: "",
      errormessage: "",
      successmessage: "",
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    // async addlocation() {
    //   this.v$.$validate();
    //   if (!this.v$.$error) {
    //     this.successmessage = "Good Job";

    //     let result = await axios.post("https://dummyjson.com/users/add", {
    //       name: this.state.name,
    //       phone: this.state.phone,
    //       userId: this.userId,
    //     });
    //     if (result.status == 200) {
    //       this.errormessage = "";
    //       this.successmessage = "Thanks For You";
    //       setTimeout(() => {
    //         this.redirectTo({ val: "Doctor" });
    //       }, 2000);
    //     } else {
    //       this.successmessage = "";
    //       this.errormessage = "CHeck Your Data";
    //     }
    //   } else {
    //     this.successmessage = "";
    //     this.errormessage = "Check Your Data All Feild Must Be Complete";
    //   }
    // },
    async addlocation() {
      fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: this.state.name,
          phone: this.state.phone,
        }),
      })
        .then((res) => res.json())
        .then(
          setTimeout(() => {
            this.redirectTo({ val: "Doctor" });
          }, 2000)
        );
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

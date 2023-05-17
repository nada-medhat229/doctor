<template lang="">
  <div class="container">
    <Navbar />
    <form action="" @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto w-100 d-block mx-auto">
          <h1>Delete All doctors</h1>
          <hr />
          <p class="text-danger">Are You Sure Delete All doctors</p>
          <hr />
          <button
            type="button"
            @click="deletealldoctors()"
            class="btn btn-danger"
          >
            Delete All
          </button>
        </div>
        <div class="row g-3 align-items-center">
          <div
            class="alert alert-warning mt-5"
            role="alert"
            v-if="successmessage.length > 0"
          >
            {{ successmessage }}
          </div>
          <div
            class="alert alert-warning mt-5"
            role="alert"
            v-if="errormessage.length > 0"
          >
            {{ errormessage }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "DeleteAll",
  components: {
    Navbar,
  },
  data() {
    return {
      userId: "",
      errormessage: "",
      successmessage: "",
      allrest: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-data");
    if (!user) {
      this.redirectTo({ val: "Login" });
    } else {
      let result = await axios.get(
        `http://localhost:3000/Doctor?userid=${this.userId}`
      );
      for (let i = 0; i < result.data.users.length; i++) {
        this.allrest.push(result.data[i].id);
      }
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async deletealldoctors() {
      let allresult = [];
      for (let i = 0; i < this.allrest.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/Doctor?userid=${this.allrest[i]}`
        );
        if (result.status == 200) {
          allresult.push(true);
        } else {
          allresult.push(false);
        }
      }

      if (allresult.includes(true)) {
        this.successmessage = "All doctors Deleted";
        this.errormessage = "";
        setTimeout(() => {
          this.redirectTo({ val: "Doctor" });
        }, 2000);
      } else {
        this.successmessage = "";
        this.errormessage = "Try Agin , Some Problem";
      }
    },
  },
};
</script>
<style lang=""></style>

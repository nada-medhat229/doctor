import { createRouter, createWebHistory } from "vue-router";
import Doctor from "../components/Home/Doctor.vue";
import Patients from "../components/Home/Patients.vue";
import LoginView from "../views/LoginView.vue";
import AddNewRest from "../components/AddNewRest/AddNewRest.vue";
import AddNewPatient from "../components/patient/AddNewPatient.vue";
import Loading from "../components/AddNewRest/Loading.vue";
import DeleteAll from "../components/AddNewRest/DeleteAll.vue";
import UpdateRest from "../components/AddNewRest/UpdateRest.vue";
import Updatepatient from "../components/patient/Updatepatient.vue";
import ErrorPage from "../views/ErrorPageView.vue";
const routes = [
  {
    path: "/",
    name: "Doctor",
    component: Doctor,
  },
  {
    path: "/Patients",
    name: "Patients",
    component: Patients,
  },
  {
    path: "/addNew",
    name: "AddNewPatient",
    component: AddNewPatient,
  },
  {
    path: "/Updatepatient/:resetId",
    name: "Updatepatient",
    component: Updatepatient,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/addnewrest",
    name: "AddNewRest",
    component: AddNewRest,
  },
  {
    path: "/updateRest/:resetId",
    name: "UpdateRest",
    component: UpdateRest,
  },
  {
    path: "/delete-aLL",
    name: "DeleteAll",
    component: DeleteAll,
  },
  {
    path: "/loadDelete",
    name: "Loading",
    component: Loading,
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  // document.title = to.name;
  // document.title = to.params.PageTitle;
  if (to.params.PageTitle !== undefined) {
    document.title = `${to.name}|${to.params.PageTitle}|${process.env.VUE_APP_TITLE}`;
  } else {
    if (to.name == null) {
      document.title = `'UNKnown Page'|${process.env.VUE_APP_TITLE}`;
    } else {
      document.title = `${to.name}|${process.env.VUE_APP_TITLE}`;
    }
    // document.title = to.params.PageTitle;
  }
  next();
});
export default router;

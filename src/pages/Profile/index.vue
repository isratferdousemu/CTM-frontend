<template>
  <div id="application_view">
    <v-row class="mx-5 my-5">
      <v-col cols="12">
        <!-- login OTP -->
        <v-dialog persistent v-model="otpDialog" width="350">
          <v-card style="justify-content: center; text-align: center">
            <v-card-title class="font-weight-bold justify-center">
              OTP
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>You will get a verification code to your registered number.</p>
              <ValidationObserver
                ref="form"
                class="w-100"
                lazy-validation
                v-slot="{ invalid }"
              >
                <ValidationProvider
                  name="OTP"
                  vid="otp"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-otp-input
                    v-model="form.otp"
                    :error="errors[0] ? true : false"
                    :error-messages="errors[0]"
                    @finish="updatePassword"
                  ></v-otp-input>
                </ValidationProvider>
              </ValidationObserver>
              <p>Remaining time: {{ remainingTime }} sec</p>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- login OTP -->

        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form @submit.prevent="submitApplication()">
            <v-card class="pa-5 px-10 mb-4">
              <v-row>
                <!-- Personal Information title -->
                <v-col cols="12" >
                  <v-card-title style="background-color: #2b4978; color: white">
                    {{ $t("container.profile.personal_info") }}
                  </v-card-title>
                </v-col>
              </v-row>

              <!-- Information part -->
              <v-row>
                <v-col cols="12" sm="6">
                  <v-card>
                    <v-card-text>
                      <div class="pa-2 mb-4">
                        <!-- Information content -->
                        <!-- Name -->
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label style="font-weight: bold">
                              {{ $t("container.profile.name_en") }}
                            </label>
                          </v-col>
                          <v-col cols="8" lg="8">
                            :<span style="20px">{{ data.full_name }}</span>
                          </v-col>
                        </v-row>
                        <!-- Username -->
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label style="font-weight: bold">
                              {{ $t("container.profile.username") }}
                            </label>
                          </v-col>
                          <v-col cols="8" lg="8">
                            :<span style="20px">{{
                              data.username ?? "---"
                            }}</span>
                          </v-col>
                        </v-row>
                        <!-- Email -->
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label style="font-weight: bold">
                              {{ $t("container.profile.email") }}
                            </label>
                          </v-col>
                          <v-col cols="8" lg="8">
                            :<span style="20px">{{ data?.email }}</span>
                          </v-col>
                        </v-row>
                        <!-- Phone -->
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label style="font-weight: bold">
                              {{ $t("container.profile.phone" ?? "---") }}
                            </label>
                          </v-col>
                          <v-col cols="8" lg="8">
                            :<span style="20px">{{
                              data.mobile ?? "---"
                            }}</span>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <!-- End Information part -->

                <!-- Image part -->
                <v-col cols="12" sm="6">
                  <v-img
                    :src="data.photo_url"
                    style="width: 200px; height: 200px; border: 1px solid #ccc"
                    class="mb-5"
                  ></v-img>
                  <span>
                    <v-file-input
                      v-model="image"
                      accept="image/jpeg,image/jpg"
                      :label="$t('container.profile.upload_type')"
                    ></v-file-input>
                    <v-btn @click="uploadImage" color="primary"
                      ><label>{{
                        $t("container.profile.upload")
                      }}</label></v-btn
                    >
                  </span>
                </v-col>
                <!-- End Image part -->
              </v-row>

              <!-- Change Password part -->
              <v-card class="mt-5">
                <v-card-title style="background-color: #2b4978; color: white">
                  {{ $t("container.profile.change_pass") }}
                </v-card-title>
                <v-card-text class="mt-5">
                  <v-form ref="passwordForm" @submit.prevent="optSend">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="password"
                          :label="$t('container.profile.new_pass')"
                          type="password"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="retypePassword"
                          :label="$t('container.profile.retype_pass')"
                          type="password"
                          persistent-hint
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-btn type="submit" color="primary"
                          ><label>{{
                            $t("container.profile.update_pass")
                          }}</label></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
              <!-- End Change Password part -->
            </v-card>
          </form>
        </ValidationObserver>
      </v-col>
    </v-row>
    <FooterBar />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FooterBar from "@/components/Common/FooterBar.vue";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import axios from "axios";
import { required } from "vee-validate/dist/rules";
import Form from "vform";

export default {
  title: "CTM -  Profile",
  data() {
    return {
      data: {},
      form: {
        otp: "",
      },
      form: new Form({
        password: "",
        retypePassword: "",
      }),
      password: null,
      retypePassword: null,
      errors: [],
      otpDialog: false,
      remainingTime: 60,
      image: null,
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
    userId() {
      return this.userData ? this.userData.id : null;
    },
  },

  methods: {
    navigateTolist() {
      this.$router.push("/dashboard");
    },

    startCountdown() {
      this.intervalId = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          clearInterval(this.intervalId);
          this.otpDialog = false;
          this.remainingTime = 60;
        }
      }, 1000); // Update every second (1000 milliseconds)
    },

    async getUserById() {
      try {
        this.$axios
          .get(`/admin/user/get-user/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data) {
              this.data = res.data.data;
            } else {
              this.$toast.error("Something went wrong");
            }
          })
          .catch((err) => {
            console.log("🚀 ~ getUserById ~ err:", err);
            // if (err.response?.data?.errors) {
            //   this.$refs.form.setErrors(err.response.data.errors);
            // }
            // console.log(err.response);
            // this.$toast.error(err?.response?.data?.message);
          });
      } catch (e) {
        console.log(e);
      }
    },

    // photo upload method
    async uploadImage() {
      try {
        const formData = new FormData();
        formData.append("image", this.image);

        const response = await axios.post(
          "/admin/user/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        );

        // handle the response accordingly
        if (response?.data?.success) {
          this.$toast.success(this.language === "bn" ? "ছবি সফলভাবে আপলোড করা হয়েছে৷" : "Image uploaded successfully");
          this.image = null;
          this.getUserById();
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        this.$toast.error("Error uploading image. Please try again later.");
      }
    },

    optSend: async function () {
      if (this.password == null || this.password.length < 6) {
        this.$toast.warning("Password must be at least 6 characters long");
        return;
      }
      if (this.password !== this.retypePassword) {
        this.$toast.error("Passwords do not match");
        return;
      }
      this.loading = true;
      this.$axios
        .post("admin/user/update-pass-otp", this.data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((result) => {
          this.loading = false;
          if (result.data.success == true) {
            this.$toast.success(result.data.message);
            this.otpDialog = true;
            this.startCountdown();
          } else {
            this.$refs.form.setErrors(result.data.errors);
          }
        })
        .catch((err) => {
          this.otpDialog = false;
          this.$toast.error(err.response.data.message);
        });
    },

    async updatePassword() {
      if (this.password == null || this.password.length < 6) {
        this.$toast.warning("Password must be at least 6 characters long");
        return;
      }
      if (this.password !== this.retypePassword) {
        this.$toast.error("Passwords do not match");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        };
        const response = await axios.post(
          "/admin/user/password-update",
          {
            password: this.password,
            userId: this.data.id,
            otp: this.form.otp,
          },
          config
        );

        if (response.data.success) {
          this.$refs.passwordForm.reset();
          this.otpDialog = false;
          this.$toast.success(this.language === "bn" ? "পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে" : "Password updated successfully");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        this.otpDialog = false;
        this.$toast.error(error.response.data.message);
      }
    },
  },

  mounted() {
    this.getUserById();
  },

  // created() {
  //   getUserById()
  // },
  components: {
    ValidationProvider,
    ValidationObserver,
    FooterBar,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.personal-info-card {
  width: 100%;
}

.basic-info-card {
  width: 80%;
}
</style>

<template>
  <div class="login-register">
    <div class="contain">
      <div class="login-box" :class="{ active: isLogin }">
        <div class="login-contain" v-if="isLogin">
          <h1>Login</h1>
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            class="login-form"
          >
            <el-form-item label="Email" prop="email">
              <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
                onfocus="this.removeAttribute('readonly');"
                onblur="this.readOnly = 'readonly'"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="text">Forgot Password?</el-button>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button
                style="width: 40%"
                type="primary"
                @click="submitForm('loginForm')"
                >Login</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="login-contain" v-else>
          <h1>Create Your Account</h1>
          <el-form
            :model="registerForm"
            status-icon
            :rules="rules"
            ref="registerForm"
            label-width="130px"
            class="login-form"
          >
            <el-form-item label="Email" prop="email">
              <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                autocomplete="off"
                onfocus="this.removeAttribute('readonly');"
                onblur="this.readOnly = 'readonly'"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="checkPass">
              <el-input
                type="password"
                v-model="registerForm.checkPass"
                autocomplete="off"
                onfocus="this.removeAttribute('readonly');"
                onblur="this.readOnly = 'readonly'"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button
                style="width: 40%"
                type="primary"
                @click="registerSubmitForm('registerForm')"
                >Register</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">New to Our Shop?</div>
          <p class="scontent">Create an account to start shopping</p>
          <el-button style="width: 60%" @click="changeType" round
            >Register</el-button
          >
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">Already a Member?</div>
          <p class="scontent">Log in to access your account</p>
          <el-button style="width: 60%" @click="changeType" round
            >Login</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-register",
  components: {},
  data() {
    // Email validation
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Email cannot be empty"));
      }
      // Add your email validation logic here if needed
      callback();
    };
    // Password validation
    var validatePass = (rule, value, callback) => {
      console.log("Password validation", value);
      if (value === "") {
        callback(new Error("Please enter a password"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    // Confirm password validation
    var validatePass2 = (rule, value, callback) => {
      console.log("Confirm password ", value);
      if (value === "") {
        callback(new Error("Please re-enter the password"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("Passwords do not match!"));
      } else {
        callback();
      }
    };
    // Data storage
    return {
      isLogin: true,
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        email: "",
        password: "",
        checkPass: "",
      },
      rules: {
        email: [
          { required: true, validator: validateEmail, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeType() {
      this.isLogin = !this.isLogin;
      this.loginForm.email = "";
      this.loginForm.password = "";
      this.registerForm.email = "";
      this.registerForm.password = "";
      this.registerForm.checkPass = "";
      this.$refs.loginForm.resetFields();
      this.$refs.registerForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "Login successful",
            type: "success",
          });
          this.$router.push({ path: "/" });
        } else {
          this.$message.error("Email or password cannot be empty");
          return false;
        }
      });
    },
    // Register
    registerSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log("valid", valid);
        if (valid) {
          this.$message({
            message: "Registration successful",
            type: "success",
          });
          this.$router.push({ path: "/" });
        } else {
          this.$message.error("Email or password cannot be empty");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login-register {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("~@/assets/images/shoplogin.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  .contain {
    width: 60%;
    height: 50%;
    min-height: 460px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
    .login-box {
      width: 60%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 40%;
      transform: translateX(0%);
      transition: all 1s;
      .login-contain {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .login-form {
          width: 90%;
          padding-right: 30px;
          .el-form-item__label {
            padding-left: 20px; /* Adjust this value to move the labels to the right */
            white-space: nowrap; /* Prevent the labels from wrapping to the next line */
          }
          .el-form-item__error {
            padding-left: 50px; /* Further align error message with input box */
          }
          .el-input {
            width: 80%; /* Adjust this value to reduce the width of the input fields */
          }
        }
      }
    }
    .login-box.active {
      left: 0;
      transition: all 0.5s;
    }
    .small-box {
      width: 35%; /* Adjust the width to reduce the section */
      height: 100%;
      background: linear-gradient(135deg, #ff8c00, #e65100); /* Darker orange gradient */
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(0%);
      transition: all 1s;
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      color: #fff;
      .small-contain {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .el-button {
          background-color: #ffeb3b !important; /* Light yellow button color */
          border-color: #ffeb3b !important;
          color: #000 !important;
          &:hover {
            background-color: #fdd835 !important; /* Slightly darker yellow on hover */
            border-color: #fdd835 !important;
          }
        }
      }
    }
    .small-box.active {
      left: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
      transform: translateX(-100%);
      transition: all 1s;
    }

  }
}
</style>

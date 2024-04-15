<script setup lang="ts">
import { ref, reactive } from 'vue'
import { type UserForm } from '@/api/user/types'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Icons from '../components/Icons.vue'
import { registerApi, loginApi } from '@/api/user/index'
import { useUserStore } from '@/stores/user'
// import { Toast } from 'bootstrap'

const userStore = useUserStore()

const isLogin = ref(true)

const dialog = reactive({
  visible: true,
  title: '登录'
})

const user = reactive<UserForm>({
  username: '',
  password: ''
})

function changeToRegist() {
  isLogin.value = !isLogin.value
  if (isLogin.value) {
    dialog.title = '登录'
  } else {
    dialog.title = '注册'
  }
}

/**
 * 登录或者注册方法
 */
function handleSubmit() {
  console.log('进入该方法')

  if (isLogin.value == true) {
    // 登录方法
    userStore.login(user)
    dialog.visible = false
  } else {
    // 注册方法
    registerApi(user)
      .then((response) => {
        changeToRegist()
        user.password = ''
        user.username = ''
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="..." />
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">Hello, world! This is a toast message.</div>
  </div>
  <Icons />

  <Header />

  <section id="intro" class="position-relative overflow-hidden">
    <div class="banner">
      <img src="@/assets/images/banner-image.jpg" alt="banner" class="img-fluid" />
      <div class="container">
        <div class="banner-content position-absolute padding-large">
          <span
            class="sub-heading bg-light py-2 px-4 mb-4 border-radius-30 text-uppercase d-inline-block text-cadet-blue fw-medium"
          >
            <svg class="heart primary-color me-2" width="20" height="20">
              <use xlink:href="#heart" /></svg
            >享受您的生活
          </span>
          <h1 class="display-3 fw-bold text-dark">我们关心您的健康</h1>
          <p class="mt-3 mb-4">
            Vitae aliquam vestibulum elit adipiscing massa diam in dignissim. Risus tellus libero
            elementum aliquam etiam. Lectus adipiscing est auctor mi quisque nunc non viverra est.
          </p>
          <a href="contact.html" class="btn btn-medium btn-primary btn-pill text-uppercase"
            >联系我们</a
          >
        </div>
      </div>
    </div>
  </section>

  <section id="about-us" class="padding-large">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="counter-info text-center">
            <div
              class="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center"
            >
              <span class="counter-prefix">+</span>
              <h5 class="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">5120</h5>
            </div>
            <p class="counter-description">治愈患者</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="counter-info text-center">
            <div
              class="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center"
            >
              <span class="counter-prefix">+</span>
              <h5 class="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">26</h5>
            </div>
            <p class="counter-description">下属科室</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="counter-info text-center">
            <div
              class="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center"
            >
              <span class="counter-prefix">+</span>
              <h5 class="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">53</h5>
            </div>
            <p class="counter-description">专业医生</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="counter-info text-center">
            <div
              class="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center"
            >
              <span class="counter-prefix">+</span>
              <h5 class="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">10</h5>
            </div>
            <p class="counter-description">工作经验</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="our-services">
    <div class="container">
      <div class="row">
        <div
          class="display-header text-light d-flex flex-wrap justify-content-between padding-medium"
        >
          <div class="col-lg-5 col-md-6 col-sm-12">
            <h2 class="text-light">为您提供最佳的治疗方案</h2>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <p class="text-light">
              Vitae aliquam vestibulum elit adipiscing massa diam in dignissim. Risus tellus libero
              elementum aliquam etiam. Lectus adipiscing est auctor mi quisque nunc non viverra est.
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 pb-3">
          <div class="icon-box p-4 bg-light border-radius-10 text-center">
            <div class="icon-box-icon">
              <svg class="home-thermometer mt-3 primary-color-500" width="50" height="50">
                <use xlink:href="#home-thermometer" />
              </svg>
            </div>
            <div class="icon-box-content">
              <h3 class="card-title py-2">全科医生</h3>
              <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 pb-3">
          <div class="icon-box p-4 bg-light border-radius-10 text-center">
            <div class="icon-box-icon">
              <svg class="pregnant-woman mt-3 primary-color-500" width="50" height="50">
                <use xlink:href="#pregnant-woman" />
              </svg>
            </div>
            <div class="icon-box-content">
              <h3 class="card-title py-2">妊娠支持</h3>
              <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 pb-3">
          <div class="icon-box p-4 bg-light border-radius-10 text-center">
            <div class="icon-box-icon">
              <svg class="nutrition mt-3 primary-color-500" width="50" height="50">
                <use xlink:href="#nutrition" />
              </svg>
            </div>
            <div class="icon-box-content">
              <h3 class="card-title py-2">营养支持</h3>
              <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 pb-3">
          <div class="icon-box p-4 bg-light border-radius-10 text-center">
            <div class="icon-box-icon">
              <svg class="local-pharmacy mt-3 primary-color-500" width="50" height="50">
                <use xlink:href="#local-pharmacy" />
              </svg>
            </div>
            <div class="icon-box-content">
              <h3 class="card-title py-2">药学保健</h3>
              <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="book-appointment" class="padding-large mb-0">
    <div class="container">
      <div class="row">
        <div class="display-header">
          <h2 class="display-5 fw-bold text-dark">医生预约</h2>
        </div>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                专科
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <p>
                  <a>多发性硬化专科门诊</a>
                </p>
                <p><a>运动障碍病专科门诊</a></p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                中医科
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <p>
                  <a>中医内科</a>
                </p>
                <p><a>中医外科</a></p>
                <p>
                  <a>中医儿科</a>
                </p>
                <p>
                  <a>理疗科</a>
                </p>
              </div>
            </div>
          </div>
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the third item's accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It's also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </div>
    <a href="#" class="btn btn-medium btn-primary btn-pill mt-3 text-uppercase">AI科室咨询</a>
  </section>

  <section id="faqs" class="padding-large">
    <div class="container">
      <div class="row">
        <div class="display-header mb-5">
          <h2 class="display-5 fw-bold text-center text-dark">科室判断</h2>
        </div>
      </div>
    </div>
  </section>

  <Footer />

  <div class="modal" tabindex="-1" id="exampleModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ dialog.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">用户名</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="staticEmail" v-model="user.username" />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">密码</label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                v-model="user.password"
              />
            </div>
          </div>
          <p>
            <button v-if="isLogin" type="button" class="btn btn-link" @click="changeToRegist">
              还没有账号？立即注册
            </button>
            <button v-else type="button" class="btn btn-link" @click="changeToRegist">
              去登陆
            </button>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="handleSubmit">
            {{ dialog.title }}
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#our-services {
  background-image: url('@/assets/images/services-bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-position: top;
}
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { RouterLink, RouterView } from 'vue-router'
const userStore = useUserStore()
</script>
<template>
  <header id="header">
    <nav class="header-top pt-4 pb-5">
      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-5 col-md-4 col-sm-6">
            <a class="navbar-brand" href="index.html">
              <img src="@/assets/images/main-logo.png" class="logo" />
            </a>
          </div>
          <div class="col-lg-4 col-md-4 d-md-block d-sm-none">
            <ul class="contact-list d-flex justify-content-lg-end flex-wrap list-unstyled m-0">
              <li class="pe-5 pe-lg-0 pe-xxl-5 pb-3 pb-lg-0">
                <svg class="location primary-color" width="24" height="24">
                  <use xlink:href="#location"></use></svg
                >123 Arling, Miola, NY
              </li>
              <li class="ps-xl-3">
                <svg class="phone primary-color" width="24" height="24">
                  <use xlink:href="#phone"></use></svg
                >(+487) 384 9452
              </li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="btn-book text-end">
              <a
                href="booking.html"
                class="btn btn-medium btn-outline-primary btn-pill text-uppercase"
                >立即预约</a
              >
            </div>
          </div>
        </div>
      </div>
    </nav>

    <nav
      id="primary-header"
      nav
      class="navbar navbar-expand-lg shadow-none"
      aria-label="navbar"
      height="30"
    >
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-primary"
          aria-controls="navbar-primary"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg class="navbar-icon mt-3 primary-color-500 bg-light" width="50" height="50">
            <use xlink:href="#navbar-icon"></use>
          </svg>
        </button>
        <div
          class="header-bottom collapse navbar-collapse bg-light border-radius-10 py-2"
          id="navbar-primary"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="navsButton">
            <li class="nav-item ps-4 pe-4 border-right">
              <a
                class="nav-link text-dark active p-0 mt-3 mt-lg-0"
                aria-current="page"
                href="#intro"
                >主页</a
              >
            </li>
            <li class="nav-item ps-4 pe-4 border-right">
              <a class="nav-link text-dark p-0" href="#about-us">关于我们</a>
            </li>
            <li class="nav-item ps-4 pe-4 border-right">
              <a class="nav-link text-dark p-0" href="#our-services">服务</a>
            </li>
            <li class="nav-item ps-4 pe-4 border-right">
              <RouterLink class="nav-link text-dark p-0" to="/departments">医生预约</RouterLink>
            </li>
            <li class="nav-item ps-4 pe-4 border-right">
              <RouterLink class="nav-link text-dark p-0" to="/department/recommendation"
                >科室判断</RouterLink
              >
            </li>
            <li class="nav-item ps-4 pe-4 border-right">
              <RouterLink class="nav-link text-dark p-0" to="/person/info">信息管理</RouterLink>
            </li>
            <li class="nav-item ps-4 pe-3 dropdown border-right">
              <a
                id="dropdownMenu"
                class="nav-link text-dark p-0 dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
                >更多 <iconify-icon icon="iconamoon:arrow-down-2-fill"></iconify-icon>
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                <li class="py-1">
                  <!-- <a href="about.html" class="dropdown-item text-uppercase">登录 </a> -->
                  <button
                    @click="openDialog"
                    class="dropdown-item text-uppercase"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <span v-if="!userStore.user.username">登录</span>
                    <span v-else>{{ userStore.user.username }}</span>
                  </button>
                </li>
                <li class="py-1">
                  <a href="blog.html" class="dropdown-item text-uppercase">信息管理</a>
                </li>
              </ul>
            </li>
          </ul>
          <form class="search-form mb-3 mb-lg-0" role="search">
            <svg class="search primary-color position-absolute" width="18" height="18">
              <use xlink:href="#search"></use>
            </svg>
            <input
              class="form-control border-0 ps-4 position-relative"
              type="search"
              placeholder="搜索.."
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

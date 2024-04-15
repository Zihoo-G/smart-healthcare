<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Icons from '../components/Icons.vue'
import { getDepartmentTree } from '@/api/department/index'
import { type Department } from '@/api/department/types'
const departmentTreeData = ref<Department[]>([])
function getDepartmentTreeData() {
  getDepartmentTree().then((response) => {
    console.log(response)
    departmentTreeData.value = response.data
  })
}

onMounted(() => {
  getDepartmentTreeData()
})
</script>
<template>
  <Icons />
  <Header />

  <section id="intro" style="background-color: #e8f0f1">
    <div class="container">
      <div class="banner-content padding-large">
        <h1 class="display-3 fw-bold text-dark">科室详情</h1>
        <span class="item"><a href="index.html" class="">主页</a></span> &nbsp;
        <span class="">/</span> &nbsp;
        <span class="item">科室详情</span>
      </div>
    </div>
  </section>

  <div class="post-wrap py-5 no-padding-bottom">
    <div class="container">
      <div class="row flex-md-row-reverse g-5 mt-4">
        <main class="post-grid col-md-9">
          <div class="row">
            <RouterView />
            <!-- <article class="post-item">
              <h2 class="display-5 fw-bold pb-5 text-dark">Laboratory Analysis</h2>

              <p>
                Velit, praesent pharetra malesuada id pulvinar amet. Consequat potenti mollis massa
                iaculis et, dolor, eget lectus. Aliquam pellentesque molestie felis fames sed eget
                non euismod eget. Et eget ullamcorper urna, elit ac diam tellus viverra lacus.
              </p>
              <p>
                Id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus.
                Aliquam pellentesque molestie felis fames sed eget non euismod eget. Et eget
                ullamcorper urna, elit ac diam tellus viverra lacus.
              </p>
              <div class="hero-image mt-5">
                <img src="@/assets/images/blog-large1.jpg" alt="single-post" class="img-fluid" />
              </div>
              <div class="post-content py-5">
                <div class="post-description">
                  <blockquote>
                    “Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet
                    dolor curabitur non aliquet orci urna volutpat. Id aliquam neque, ut vivamus sit
                    imperdiet enim, lacus, vel.
                  </blockquote>

                  <h2 class="my-5">Investigation and Treatments</h2>
                  <div class="row">
                    <div class="col-md-6">
                      <table class="table mb-5">
                        <thead>
                          <tr>
                            <th scope="col">Investigation</th>
                            <th scope="col">Costs</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td scope="row">Colonoscopy</td>
                            <td class="text-primary">$250</td>
                          </tr>
                          <tr>
                            <td scope="row">Gastroscopy</td>
                            <td class="text-primary">$236</td>
                          </tr>
                          <tr>
                            <td scope="row">Allergy testing</td>
                            <td class="text-primary">$150</td>
                          </tr>
                          <tr>
                            <td scope="row">CT scan</td>
                            <td class="text-primary">$565</td>
                          </tr>
                          <tr>
                            <td scope="row">Cardiac CT scan</td>
                            <td class="text-primary">$300</td>
                          </tr>
                          <tr>
                            <td scope="row">Paratryroid scan</td>
                            <td class="text-primary">$180</td>
                          </tr>
                          <tr>
                            <td scope="row">Captopril renogram</td>
                            <td class="text-primary">$320</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-6">
                      <table class="table mb-5">
                        <thead>
                          <tr>
                            <th scope="col">Treatments</th>
                            <th scope="col">Costs</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td scope="row">Bronchoscopy</td>
                            <td class="text-primary">$150-300</td>
                          </tr>
                          <tr>
                            <td scope="row">Cardiac ablation</td>
                            <td class="text-primary">$250-400</td>
                          </tr>
                          <tr>
                            <td scope="row">Sport injuries</td>
                            <td class="text-primary">$150</td>
                          </tr>
                          <tr>
                            <td scope="row">Women’s health</td>
                            <td class="text-primary">$565</td>
                          </tr>
                          <tr>
                            <td scope="row">Orthotics</td>
                            <td class="text-primary">$300</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <p>
                    Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus
                    fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum
                    adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc
                    integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat
                    libero dolor. Porta ut diam lobortis eget leo, lectus.
                  </p>

                  <h2 class="my-5">Our Doctors</h2>

                  <div class="row my-4">
                    <div class="col-md-6">
                      <img
                        src="@/assets/images/team-item1.jpg"
                        alt="post-image"
                        class="img-fluid align-left"
                      />
                      <h5 class="mt-3">Velit, praesent pharetra malesuada</h5>
                    </div>
                    <div class="col-md-6">
                      <img
                        src="@/assets/images/team-item.jpg"
                        alt="post-image"
                        class="img-fluid align-right"
                      />
                      <h5 class="mt-3">Velit, praesent pharetra malesuada</h5>
                    </div>
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur facilisis
                    vivamus massa magna. Blandit mauris libero condimentum commodo morbi consectetur
                    sociis convallis sit. Magna diam amet justo sed vel dolor et volutpat integer.
                    Iaculis sit sapien hac odio elementum egestas neque. Adipiscing purus euismod
                    orci sem amet, et. Turpis erat ornare nisi laoreet est euismod.
                  </p>

                  <div class="my-5">
                    <h2 class="mb-5">Our Best Services</h2>
                    <ul class="inner-list list-unstyled">
                      <li>
                        <span class="price-tick">✓</span> Blandit mauris libero condimentum commodo
                        sociis convallis sit.
                      </li>
                      <li>
                        <span class="price-tick">✓</span> Magna diam amet justo sed vel dolor et
                        volutpat integer.
                      </li>
                      <li>
                        <span class="price-tick">✓</span> Laculis sit sapien hac odio elementum
                        egestas neque.
                      </li>
                      <li>
                        <span class="price-tick">✓</span> Blandit mauris libero condimentum commodo
                        sociis convallis sit.
                      </li>
                      <li>
                        <span class="price-tick">✓</span> Magna diam amet justo sed vel dolor et
                        volutpat integer.
                      </li>
                      <li>
                        <span class="price-tick">✓</span> Laculis sit sapien hac odio elementum
                        egestas neque.
                      </li>
                    </ul>
                  </div>

                  <p>
                    Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus
                    fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum
                    adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc
                    integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat
                    libero dolor. Porta ut diam lobortis eget leo, lectus.
                  </p>
                </div>
              </div>
            </article> -->
          </div>
        </main>
        <!-- <main>
          <RouterView />
        </main> -->

        <aside class="col-md-3">
          <div class="post-sidebar">
            <div class="widget sidebar-categories border p-3 mb-5">
              <h4 class="widget-title text-uppercase border-bottom pb-3 mb-3">科室信息</h4>
              <div v-for="(departments, index) in departmentTreeData" ::key="index">
                <h6>{{ departments.name }}</h6>
                <ul class="list-unstyled">
                  <li
                    v-for="(department, idx) in departments.children"
                    :key="idx"
                    class="my-2 d-flex align-items-center"
                  >
                    <iconify-icon icon="ri:arrow-right-s-line"></iconify-icon>
                    <RouterLink
                      :to="{
                        name: 'DepartmentInfo',
                        params: {
                          id: department.id
                        }
                      }"
                      class="item-anchor text-uppercase ps-2"
                    >
                      {{ department.name }}</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <section id="brand-collection" class="padding-large pt-0 overflow-hidden">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col pb-3">
          <img src="@/assets/images/betael.png" alt="brand" class="top-image" />
          <img src="@/assets/images/betael1.png" alt="brand" class="bottom-image" />
        </div>
        <div class="col pb-3">
          <img src="@/assets/images/healer.png" alt="brand" class="top-image" />
          <img src="@/assets/images/healer1.png" alt="brand" class="bottom-image" />
        </div>
        <div class="col pb-3">
          <img src="@/assets/images/lifetrace.png" alt="brand" class="top-image" />
          <img src="@/assets/images/lifetrace1.png" alt="brand" class="bottom-image" />
        </div>
        <div class="col pb-3">
          <img src="@/assets/images/medcare.png" alt="brand" class="top-image" />
          <img src="@/assets/images/medcare1.png" alt="brand" class="bottom-image" />
        </div>
        <div class="col">
          <img src="@/assets/images/soven.png" alt="brand" class="top-image" />
          <img src="@/assets/images/soven1.png" alt="brand" class="bottom-image" />
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>
<style scoped></style>

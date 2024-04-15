import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/user",
    component: () => import("@/layout/user/index.vue"),
  },
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/drug",
    component: Layout,
    name: "/drug",
    meta: {
      title: "药品进销存",
      icon: "system",
      hidden: false,
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/drug/index.vue"),
        name: "Drug",
        meta: {
          title: "药品管理",
          icon: "user",
          hidden: false,
          keepAlive: true,
        },
      },
      {
        path: "manufacturer",
        component: () => import("@/views/drug/manufacturer/index.vue"),
        name: "Manufacturer",
        meta: {
          title: "供应商管理",
          icon: "role",
          hidden: false,
          keepAlive: true,
        },
      },
      {
        path: "storage",
        component: () => import("@/views/drug/storage/index.vue"),
        name: "Storage",
        meta: {
          title: "药品进货管理",
          icon: "role",
          hidden: false,
          keepAlive: true,
        },
      },
      {
        path: "purchase",
        component: () => import("@/views/drug/purchase/index.vue"),
        name: "Purchase",
        meta: {
          title: "药品购买",
          icon: "role",
          hidden: false,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/hospital",
    component: Layout,
    name: "/hospital",
    meta: {
      title: "医院管理",
      icon: "system",
      hidden: false,
    },
    children: [
      {
        path: "department",
        component: () => import("@/views/hospital/department/index.vue"),
        name: "Department",
        meta: {
          title: "科室管理",
          icon: "user",
          hidden: false,
          keepAlive: true,
        },
      },
      {
        path: "doctor",
        component: () => import("@/views/hospital/doctor/index.vue"),
        name: "Doctor",
        meta: {
          title: "医生管理",
          icon: "role",
          hidden: false,
          keepAlive: true,
        },
      },
      {
        path: "schedule",
        component: () => import("@/views/hospital/schedule/index.vue"),
        name: "Schedule",
        meta: {
          title: "排班管理",
          icon: "role",
          hidden: false,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/check",
    component: Layout,
    name: "/check",
    mata: {
      title: "检查管理",
      icon: "system",
      hidden: false,
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/check/index.vue"),
        meta: {
          title: "检查信息",
          icon: "role",
          hidden: false,
          keepAlive: true,
        },
      },
    ],
  },

  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        // https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        meta: {
          title: "dashboard",
          icon: "homepage",
          affix: true,
          keepAlive: true,
          alwaysShow: false,
        },
      },
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { hidden: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { hidden: true },
      },
    ],
  },

  // 外部链接
  // {
  //   path: "/external-link",
  //   component: Layout,
  //   children: [ {
  //       component: () => import("@/views/external-link/index.vue"),
  //       path: "https://www.cnblogs.com/haoxianrui/",
  //       meta: { title: "外部链接", icon: "link" },
  //     },
  //   ],
  // },
  // 多级嵌套路由
  /* {
         path: '/nested',
         component: Layout,
         redirect: '/nested/level1/level2',
         name: 'Nested',
         meta: {title: '多级菜单', icon: 'nested'},
         children: [
             {
                 path: 'level1',
                 component: () => import('@/views/nested/level1/index.vue'),
                 name: 'Level1',
                 meta: {title: '菜单一级'},
                 redirect: '/nested/level1/level2',
                 children: [
                     {
                         path: 'level2',
                         component: () => import('@/views/nested/level1/level2/index.vue'),
                         name: 'Level2',
                         meta: {title: '菜单二级'},
                         redirect: '/nested/level1/level2/level3',
                         children: [
                             {
                                 path: 'level3-1',
                                 component: () => import('@/views/nested/level1/level2/level3/index1.vue'),
                                 name: 'Level3-1',
                                 meta: {title: '菜单三级-1'}
                             },
                             {
                                 path: 'level3-2',
                                 component: () => import('@/views/nested/level1/level2/level3/index2.vue'),
                                 name: 'Level3-2',
                                 meta: {title: '菜单三级-2'}
                             }
                         ]
                     }
                 ]
             },
         ]
     }*/
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;

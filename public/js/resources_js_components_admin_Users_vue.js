"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_Users_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Users.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Users.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _layouts_Pagination_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layouts/Pagination.vue */ "./resources/js/components/layouts/Pagination.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "users",
  components: {
    Pagination: _layouts_Pagination_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      current_page: 1,
      last_page: 1,
      users: [],
      max: 1000
    };
  },
  methods: {
    updateUser: function updateUser(index) {
      var _this = this;

      var user = this.users[index];
      this.setLoading(true);
      axios.put("/api/admin/users/" + user.id, {
        admin: user.admin,
        active: user.active,
        max_check_lists_count: user.max_check_lists_count
      }).then(function (res) {
        _this.setLoading(false);

        console.log(res.data);

        _this.setMessage(res.data.message, res.data.error); // console.log(this.$ref)

      });
    },
    checkListMax: function checkListMax(index) {
      if (this.users[index].max_check_lists_count > this.max) {
        this.users[index].max_check_lists_count = this.max;
      }

      if (this.users[index].max_check_lists_count < this.users[index].current_check_lists_count) {
        this.users[index].max_check_lists_count = this.users[index].current_check_lists_count;
      }
    },
    setMessage: function setMessage(message, error) {
      this.$emit("set-message", message, error);
    },
    setLoading: function setLoading(is_loading) {
      this.$emit("set-loading", is_loading);
    },
    getUsers: function getUsers() {
      var _this2 = this;

      this.setLoading(true);
      axios.get("/api/admin/users?page=" + this.current_page).then(function (res) {
        _this2.setLoading(false);

        console.log(res.data);
        _this2.users = res.data.data;
        _this2.last_page = res.data.last_page;
        _this2.current_page = res.data.current_page; // console.log(this.$ref)

        _this2.$refs.pagination_ref.setPagination(_this2.current_page, _this2.last_page); // this.actions = res.data
        // this.setLoading(false)

      }); //             axios.post("/admin").then((res) => {
      //     // console.log(res);
      //     // this.user = res.data
      // 	// this.setLoading(false)
      // });
    },
    setCurrentPage: function setCurrentPage(current_page) {
      if (current_page === this.current_page) {
        return false;
      }

      if (current_page < 1) {
        this.current_page = 1;
      }

      if (current_page > this.last_page) {
        this.current_page = this.page_count;
      }

      this.current_page = current_page;
      this.getUsers();
    }
  },
  mounted: function mounted() {
    this.getUsers();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/Pagination.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/Pagination.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "pagination",
  // props: ['last_page', 'current_page'],
  data: function data() {
    return {
      pages: [1],
      current_page: 1,
      last_page: 1
    };
  },
  methods: {
    setCurrentPage: function setCurrentPage(current_page) {
      if (current_page === 0) {
        return false;
      }

      if (current_page > this.last_page) {
        current_page = this.last_page;
      }

      this.current_page = current_page;
      this.$emit("set-page", current_page);
    },
    setPagination: function setPagination(current_page, last_page) {
      this.current_page = current_page;
      this.last_page = last_page;
      console.log("pp");
      this.pages = [];

      if (this.last_page <= 10) {
        for (var i = 1; i <= this.last_page; i++) {
          this.pages.push(i);
        }

        return false;
      }

      this.pages.push(1);

      if (current_page - 1 <= 2) {
        for (var _i = 2; _i <= this.current_page + 1; _i++) {
          this.pages.push(_i);
        }

        this.pages.push(0);
        this.pages.push(last_page);
        return false;
      }

      if (current_page + 1 >= last_page - 1) {
        this.pages.push(0);

        for (var _i2 = current_page - 1; _i2 <= this.last_page; _i2++) {
          this.pages.push(_i2);
        } // this.pages.push(last_page)


        return false;
      }

      this.pages.push(0);

      for (var _i3 = current_page - 1; _i3 <= this.current_page + 1; _i3++) {
        this.pages.push(_i3);
      }

      this.pages.push(0);
      this.pages.push(last_page);
      return false;
    }
  },
  updated: function updated() {
    console.log("u");
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "d-flex flex-column"
  }, [_vm._l(_vm.users, function (user, index) {
    return _c("div", {
      key: user.id,
      staticClass: "d-flex border rounded-3 p-2 justify-content-between align-items-baseline",
      staticStyle: {
        gap: "25px"
      },
      attrs: {
        index: index
      }
    }, [_c("span", [_vm._v(_vm._s(user.name))]), _vm._v(" "), _c("span", {
      staticClass: "text-secondary"
    }, [_vm._v(_vm._s(user.email))]), _vm._v(" "), _c("div", {
      staticClass: "input-group mb-3"
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: user.current_check_lists_count,
        expression: "user.current_check_lists_count"
      }],
      staticClass: "form-control",
      staticStyle: {
        width: "30px"
      },
      attrs: {
        type: "number",
        readonly: ""
      },
      domProps: {
        value: user.current_check_lists_count
      },
      on: {
        input: function input($event) {
          if ($event.target.composing) return;

          _vm.$set(user, "current_check_lists_count", $event.target.value);
        }
      }
    }), _vm._v(" "), _c("span", {
      staticClass: "input-group-text"
    }, [_vm._v("/")]), _vm._v(" "), _c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: user.max_check_lists_count,
        expression: "user.max_check_lists_count"
      }],
      staticClass: "form-control",
      staticStyle: {
        width: "30px"
      },
      attrs: {
        type: "number",
        max: _vm.max,
        min: user.current_check_lists_count
      },
      domProps: {
        value: user.max_check_lists_count
      },
      on: {
        input: [function ($event) {
          if ($event.target.composing) return;

          _vm.$set(user, "max_check_lists_count", $event.target.value);
        }, function ($event) {
          return _vm.checkListMax(index);
        }],
        change: function change($event) {
          return _vm.updateUser(index);
        }
      }
    })]), _vm._v(" "), _c("div", {
      staticClass: "form-check form-switch"
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: user.active,
        expression: "user.active"
      }],
      staticClass: "form-check-input",
      attrs: {
        type: "checkbox",
        role: "switch"
      },
      domProps: {
        checked: Array.isArray(user.active) ? _vm._i(user.active, null) > -1 : user.active
      },
      on: {
        change: [function ($event) {
          var $$a = user.active,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;

          if (Array.isArray($$a)) {
            var $$v = null,
                $$i = _vm._i($$a, $$v);

            if ($$el.checked) {
              $$i < 0 && _vm.$set(user, "active", $$a.concat([$$v]));
            } else {
              $$i > -1 && _vm.$set(user, "active", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.$set(user, "active", $$c);
          }
        }, function ($event) {
          return _vm.updateUser(index);
        }]
      }
    }), _vm._v(" "), _c("label", {
      staticClass: "form-check-label"
    }, [_vm._v(" Активен ")])]), _vm._v(" "), _c("div", {
      staticClass: "form-check form-switch"
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: user.admin,
        expression: "user.admin"
      }],
      staticClass: "form-check-input",
      attrs: {
        type: "checkbox",
        role: "switch"
      },
      domProps: {
        checked: Array.isArray(user.admin) ? _vm._i(user.admin, null) > -1 : user.admin
      },
      on: {
        change: [function ($event) {
          var $$a = user.admin,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;

          if (Array.isArray($$a)) {
            var $$v = null,
                $$i = _vm._i($$a, $$v);

            if ($$el.checked) {
              $$i < 0 && _vm.$set(user, "admin", $$a.concat([$$v]));
            } else {
              $$i > -1 && _vm.$set(user, "admin", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.$set(user, "admin", $$c);
          }
        }, function ($event) {
          return _vm.updateUser(index);
        }]
      }
    }), _vm._v(" "), _c("label", {
      staticClass: "form-check-label"
    }, [_vm._v(" Администратор ")])])]);
  }), _vm._v(" "), _c("pagination", {
    ref: "pagination_ref",
    staticClass: "mt-3",
    attrs: {
      current_page: _vm.current_page,
      last_page: _vm.last_page
    },
    on: {
      "set-page": _vm.setCurrentPage
    }
  })], 2);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/Pagination.vue?vue&type=template&id=da570eea&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/Pagination.vue?vue&type=template&id=da570eea& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("nav", [_c("ul", {
    staticClass: "pagination"
  }, [_c("li", {
    staticClass: "page-item",
    on: {
      click: function click($event) {
        return _vm.setCurrentPage(--_vm.current_page ? _vm.current_page : 1);
      }
    }
  }, [_vm._m(0)]), _vm._v(" "), _vm._l(_vm.pages, function (page, index) {
    return _c("li", {
      key: index,
      staticClass: "page-item",
      "class": {
        active: _vm.current_page === page
      },
      on: {
        click: function click($event) {
          return _vm.setCurrentPage(page);
        }
      }
    }, [_c("a", {
      staticClass: "page-link",
      attrs: {
        href: "#"
      }
    }, [_vm._v(_vm._s(page ? page : "..."))])]);
  }), _vm._v(" "), _c("li", {
    staticClass: "page-item",
    on: {
      click: function click($event) {
        return _vm.setCurrentPage(++_vm.current_page < _vm.last_page ? _vm.current_page : _vm.last_page);
      }
    }
  }, [_vm._m(1)])], 2)]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("a", {
    staticClass: "page-link",
    attrs: {
      href: "#",
      "aria-label": "Previous"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("«")])]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("a", {
    staticClass: "page-link",
    attrs: {
      href: "#",
      "aria-label": "Next"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("»")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/admin/Users.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/admin/Users.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_vue_vue_type_template_id_fa2043a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue?vue&type=template&id=fa2043a6& */ "./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&");
/* harmony import */ var _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Users.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Users_vue_vue_type_template_id_fa2043a6___WEBPACK_IMPORTED_MODULE_0__.render,
  _Users_vue_vue_type_template_id_fa2043a6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Users.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/layouts/Pagination.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/layouts/Pagination.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Pagination_vue_vue_type_template_id_da570eea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination.vue?vue&type=template&id=da570eea& */ "./resources/js/components/layouts/Pagination.vue?vue&type=template&id=da570eea&");
/* harmony import */ var _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.vue?vue&type=script&lang=js& */ "./resources/js/components/layouts/Pagination.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pagination_vue_vue_type_template_id_da570eea___WEBPACK_IMPORTED_MODULE_0__.render,
  _Pagination_vue_vue_type_template_id_da570eea___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/layouts/Pagination.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Users.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/admin/Users.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Users.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Users.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/layouts/Pagination.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/layouts/Pagination.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Pagination.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/Pagination.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_fa2043a6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_fa2043a6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_fa2043a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Users.vue?vue&type=template&id=fa2043a6& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&");


/***/ }),

/***/ "./resources/js/components/layouts/Pagination.vue?vue&type=template&id=da570eea&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/layouts/Pagination.vue?vue&type=template&id=da570eea& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_da570eea___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_da570eea___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_da570eea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Pagination.vue?vue&type=template&id=da570eea& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/Pagination.vue?vue&type=template&id=da570eea&");


/***/ })

}]);
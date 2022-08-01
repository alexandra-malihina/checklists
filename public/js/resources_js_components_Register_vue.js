"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Register_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Register.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Register.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Login",
  data: function data() {
    return {
      name: "",
      password_confirmation: "",
      email: "",
      password: "",
      errors: {
        email: 1,
        name: 1,
        password: 1,
        password_confirmation: 1
      }
    };
  },
  methods: {
    checkEmailInput: function checkEmailInput() {
      this.email = this.email.trimLeft();
      this.errors.email = 0;

      if (this.email.length === 0) {
        this.errors.email = 1;
      }
    },
    checkNameInput: function checkNameInput() {
      this.name = this.name.trimLeft();
      this.errors.name = 0;

      if (this.name.length === 0) {
        this.errors.name = 1;
      }
    },
    checkPasswordInput: function checkPasswordInput() {
      this.password = this.password.trimLeft();
      this.password_confirmation = this.password_confirmation.trimLeft();
      this.errors.password = 0;
      this.errors.password_confirmation = 0;

      if (this.password.length === 0) {
        this.errors.password = 1;
      }

      if (this.password_confirmation.length === 0) {
        this.errors.password_confirmation = 1;
      }

      if (this.password_confirmation !== this.password) {
        this.errors.password_confirmation = 1;
      }
    },
    register: function register() {
      var _this = this;

      axios.get("/sanctum/csrf-cookie").then(function (response) {
        // Login...
        axios.post("/register", {
          email: _this.email,
          name: _this.name,
          password_confirmation: _this.password_confirmation,
          password: _this.password
        }).then(function (r) {
          localStorage.setItem("x_xsrf_token", r.config.headers["X-XSRF-TOKEN"]);

          _this.$router.push({
            name: "checklists"
          });
        })["catch"](function (e) {
          var data = e.response.data;
          console.log(data);
          var message = '';

          if (data.errors.email) {
            _this.errors.email = 1;
            message += data.errors.email + ' ';
          }

          if (data.errors.password) {
            _this.errors.password = 1;
            _this.errors.password_confirmation = 1;
            message += data.errors.password;
          }

          _this.$emit('set-message', message, true);
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Register.vue?vue&type=template&id=97358ae4&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Register.vue?vue&type=template&id=97358ae4& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "bg-white mx-auto my-5 border p-5 col-12 col-md-6 col-lg-4 rounded"
  }, [_c("label", [_vm._v("Имя")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.name,
      expression: "name"
    }],
    staticClass: "form-control mb-3",
    "class": {
      "is-invalid": _vm.errors.name
    },
    attrs: {
      type: "text",
      name: "name",
      id: "name"
    },
    domProps: {
      value: _vm.name
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.name = $event.target.value;
      }, _vm.checkNameInput]
    }
  }), _vm._v(" "), _c("label", [_vm._v("Email")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.email,
      expression: "email"
    }],
    staticClass: "form-control mb-3",
    "class": {
      "is-invalid": _vm.errors.email
    },
    attrs: {
      type: "email",
      name: "email",
      id: "email"
    },
    domProps: {
      value: _vm.email
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.email = $event.target.value;
      }, _vm.checkEmailInput]
    }
  }), _vm._v(" "), _c("label", [_vm._v("Пароль")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.password,
      expression: "password"
    }],
    staticClass: "form-control mb-3",
    "class": {
      "is-invalid": _vm.errors.password
    },
    attrs: {
      type: "password",
      name: "password",
      id: "password"
    },
    domProps: {
      value: _vm.password
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.password = $event.target.value;
      }, _vm.checkPasswordInput]
    }
  }), _vm._v(" "), _c("label", [_vm._v("Повторите пароль")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.password_confirmation,
      expression: "password_confirmation"
    }],
    staticClass: "form-control mb-3",
    "class": {
      "is-invalid": _vm.errors.password_confirmation
    },
    attrs: {
      type: "password",
      name: "password_confirmation",
      id: "password_confirmation"
    },
    domProps: {
      value: _vm.password_confirmation
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.password_confirmation = $event.target.value;
      }, _vm.checkPasswordInput]
    }
  }), _vm._v(" "), _c("input", {
    staticClass: "btn btn-primary mb-3",
    "class": {
      disabled: _vm.errors.name || _vm.errors.email || _vm.errors.password || _vm.errors.password_confirmation
    },
    attrs: {
      type: "submit",
      value: "Зарегистрироваться"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.register.apply(null, arguments);
      }
    }
  }), _vm._v(" "), _c("p", [_vm._v("\n            Есть учетная запись?\n            "), _c("router-link", {
    attrs: {
      to: {
        name: "user.login"
      }
    }
  }, [_vm._v("Войти")])], 1)]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/Register.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/Register.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Register_vue_vue_type_template_id_97358ae4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=97358ae4& */ "./resources/js/components/Register.vue?vue&type=template&id=97358ae4&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./resources/js/components/Register.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_97358ae4___WEBPACK_IMPORTED_MODULE_0__.render,
  _Register_vue_vue_type_template_id_97358ae4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Register.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Register.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/Register.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Register.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Register.vue?vue&type=template&id=97358ae4&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/Register.vue?vue&type=template&id=97358ae4& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_97358ae4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_97358ae4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_97358ae4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Register.vue?vue&type=template&id=97358ae4& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Register.vue?vue&type=template&id=97358ae4&");


/***/ })

}]);
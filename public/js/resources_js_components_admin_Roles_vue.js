"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_Roles_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Roles.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Roles.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _layouts_Pagination_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layouts/Pagination.vue */ "./resources/js/components/layouts/Pagination.vue");
/* harmony import */ var _layouts_admin_ActionsInputs_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layouts/admin/ActionsInputs.vue */ "./resources/js/components/layouts/admin/ActionsInputs.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "roles",
  components: {
    Pagination: _layouts_Pagination_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    ActionsInputs: _layouts_admin_ActionsInputs_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: ['user_actions'],
  data: function data() {
    return {
      users: [],
      actions: [],
      entities: [],
      last_page: 1,
      current_page: 1,
      action_inputs_struct: [],
      can_edit_roles: false
    };
  },
  methods: {
    setShowUserActions: function setShowUserActions(index, value) {
      this.$set(this.users[index], "show_actions", value);
    },
    setMessage: function setMessage(message, error) {
      this.$emit("set-message", message, error);
    },
    setLoading: function setLoading(is_loading) {
      this.$emit("set-loading", is_loading);
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
    },
    getUsers: function getUsers() {
      var _this = this;

      this.setLoading(true);
      axios.get("/api/admin/roles?page=" + this.current_page).then(function (res) {
        _this.setLoading(false);

        _this.users = res.data.data;
        _this.last_page = res.data.last_page;
        _this.current_page = res.data.current_page;
        _this.can_edit_roles = res.data.can_edit_roles;

        _this.$refs.pagination_ref.setPagination(_this.current_page, _this.last_page);
      });
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.setLoading(true);
    axios.get("/api/admin/roles/actions").then(function (res) {
      _this2.setLoading(false);

      console.log(res.data);
      _this2.actions = res.data.actions;
      _this2.entities = res.data.entities;

      _this2.getUsers(); // this.actions = res.data
      // this.setLoading(false)

    });
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ActionsInputs',
  props: ['actions', 'entities', 'user', 'disabled'],
  data: function data() {
    return {};
  },
  methods: {
    setMessage: function setMessage(message, error) {
      this.$emit("set-message", message, error);
    },
    setLoading: function setLoading(is_loading) {
      this.$emit("set-loading", is_loading);
    },
    updateUserAction: function updateUserAction(user_id, action_id, entity_id, active) {
      var _this = this;

      this.setLoading(true);
      axios.put("/api/admin/roles/" + user_id, {
        action: action_id,
        entity: entity_id,
        active: active
      }).then(function (res) {
        _this.setLoading(false);

        console.log(res.data);

        _this.setMessage(res.data.message, res.data.error); // console.log(this.$ref)

      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Roles.vue?vue&type=template&id=fa8b073c&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Roles.vue?vue&type=template&id=fa8b073c& ***!
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
      staticClass: "d-flex flex-column border rounded-3 p-2 align-items-baseline",
      staticStyle: {
        gap: "25px"
      },
      attrs: {
        index: index
      }
    }, [_c("div", {
      staticClass: "d-flex p-2 justify-content-between w-100 align-items-baseline"
    }, [_c("span", [_vm._v("#" + _vm._s(user.id) + " " + _vm._s(user.name))]), _vm._v(" "), !user.show_actions ? _c("div", {
      staticClass: "btn btn-outline-info",
      on: {
        click: function click($event) {
          return _vm.setShowUserActions(index, true);
        }
      }
    }, [_vm._v("\n                    Просмотреть права\n                ")]) : _c("div", {
      staticClass: "btn btn-outline-info active",
      on: {
        click: function click($event) {
          return _vm.setShowUserActions(index, false);
        }
      }
    }, [_vm._v("\n                    Скрыть права\n                ")])]), _vm._v(" "), _c("actions-inputs", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: user.show_actions,
        expression: "user.show_actions"
      }],
      attrs: {
        actions: _vm.actions,
        entities: _vm.entities,
        user: user,
        disabled: !_vm.can_edit_roles
      },
      on: {
        "set-loading": _vm.setLoading,
        "set-message": _vm.setMessage
      }
    })], 1);
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=template&id=62a026e5&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=template&id=62a026e5& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "container"
  }, _vm._l(_vm.entities, function (entity, i) {
    return _c("div", {
      key: entity.id,
      staticClass: "row mb-4",
      attrs: {
        index: i
      }
    }, [_c("h4", [_vm._v(" " + _vm._s(entity.name))]), _vm._v(" "), _c("div", {
      staticClass: "row"
    }, _vm._l(_vm.actions, function (action, index) {
      return _c("div", {
        key: action.id,
        staticClass: "form-check form-switch col col-auto",
        attrs: {
          index: index
        }
      }, [_c("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.user.actions[action.code][entity.code],
          expression: "user.actions[action.code][entity.code]"
        }],
        staticClass: "form-check-input",
        attrs: {
          type: "checkbox",
          role: "switch",
          disabled: _vm.disabled
        },
        domProps: {
          checked: Array.isArray(_vm.user.actions[action.code][entity.code]) ? _vm._i(_vm.user.actions[action.code][entity.code], null) > -1 : _vm.user.actions[action.code][entity.code]
        },
        on: {
          change: [function ($event) {
            var $$a = _vm.user.actions[action.code][entity.code],
                $$el = $event.target,
                $$c = $$el.checked ? true : false;

            if (Array.isArray($$a)) {
              var $$v = null,
                  $$i = _vm._i($$a, $$v);

              if ($$el.checked) {
                $$i < 0 && _vm.$set(_vm.user.actions[action.code], entity.code, $$a.concat([$$v]));
              } else {
                $$i > -1 && _vm.$set(_vm.user.actions[action.code], entity.code, $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
              }
            } else {
              _vm.$set(_vm.user.actions[action.code], entity.code, $$c);
            }
          }, function ($event) {
            return _vm.updateUserAction(_vm.user.id, action.id, entity.id, _vm.user.actions[action.code][entity.code]);
          }]
        }
      }), _vm._v(" "), _c("label", {
        staticClass: "form-check-label me-3"
      }, [_vm._v(" " + _vm._s(action.name) + " ")])]);
    }), 0)]);
  }), 0);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/admin/Roles.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/admin/Roles.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Roles_vue_vue_type_template_id_fa8b073c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Roles.vue?vue&type=template&id=fa8b073c& */ "./resources/js/components/admin/Roles.vue?vue&type=template&id=fa8b073c&");
/* harmony import */ var _Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Roles.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Roles.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Roles_vue_vue_type_template_id_fa8b073c___WEBPACK_IMPORTED_MODULE_0__.render,
  _Roles_vue_vue_type_template_id_fa8b073c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Roles.vue"
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

/***/ "./resources/js/components/layouts/admin/ActionsInputs.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/layouts/admin/ActionsInputs.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActionsInputs_vue_vue_type_template_id_62a026e5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionsInputs.vue?vue&type=template&id=62a026e5& */ "./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=template&id=62a026e5&");
/* harmony import */ var _ActionsInputs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionsInputs.vue?vue&type=script&lang=js& */ "./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActionsInputs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActionsInputs_vue_vue_type_template_id_62a026e5___WEBPACK_IMPORTED_MODULE_0__.render,
  _ActionsInputs_vue_vue_type_template_id_62a026e5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/layouts/admin/ActionsInputs.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Roles.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/admin/Roles.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Roles.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Roles.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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

/***/ "./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionsInputs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionsInputs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionsInputs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Roles.vue?vue&type=template&id=fa8b073c&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/admin/Roles.vue?vue&type=template&id=fa8b073c& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_fa8b073c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_fa8b073c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_fa8b073c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Roles.vue?vue&type=template&id=fa8b073c& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/Roles.vue?vue&type=template&id=fa8b073c&");


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


/***/ }),

/***/ "./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=template&id=62a026e5&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=template&id=62a026e5& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionsInputs_vue_vue_type_template_id_62a026e5___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionsInputs_vue_vue_type_template_id_62a026e5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionsInputs_vue_vue_type_template_id_62a026e5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionsInputs.vue?vue&type=template&id=62a026e5& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/layouts/admin/ActionsInputs.vue?vue&type=template&id=62a026e5&");


/***/ })

}]);
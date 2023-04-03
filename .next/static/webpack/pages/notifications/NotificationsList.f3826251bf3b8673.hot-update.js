"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/notifications/NotificationsList",{

/***/ "./pages/notifications/NotificationsList.tsx":
/*!***************************************************!*\
  !*** ./pages/notifications/NotificationsList.tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Avatar */ \"./node_modules/@mui/material/Avatar/index.js\");\n/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/List */ \"./node_modules/@mui/material/List/index.js\");\n/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/ListItem */ \"./node_modules/@mui/material/ListItem/index.js\");\n/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Divider */ \"./node_modules/@mui/material/Divider/index.js\");\n/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/ListItemText */ \"./node_modules/@mui/material/ListItemText/index.js\");\n/* harmony import */ var _mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/ListItemAvatar */ \"./node_modules/@mui/material/ListItemAvatar/index.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../firebase */ \"./firebase.ts\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_app */ \"./pages/_app.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\nconst NotificationsList = ()=>{\n    _s();\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [notifications, setNotifications] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const { currentUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_app__WEBPACK_IMPORTED_MODULE_5__.AuthContext);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const handleGetNotifications = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{\n        if (currentUser) {\n            return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.onSnapshot)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"notifications\"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)(\"userId\", \"==\", currentUser?.uid)), (querySnapshot)=>{\n                const notifications = querySnapshot.docs.map((x)=>({\n                        ...x.data()\n                    }));\n                setNotifications(notifications);\n                setLoading(false);\n            });\n        }\n    }, [\n        currentUser\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        handleGetNotifications();\n    }, [\n        handleGetNotifications\n    ]);\n    const handleIsChecked = async (notification)=>{\n        try {\n            // @ts-ignore\n            const res = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"notifications\", notification?.id), {\n                isChecked: true\n            });\n            if (res) {\n                router.push(notification.linkUrl);\n            }\n        } catch (err) {\n            console.log(err);\n        }\n        setLoading(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: !loading ? notifications?.length > 0 ? notifications?.map((notification)=>{\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Grid, {\n                container: true,\n                sx: {\n                    justifyContent: \"center\"\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_List__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Badge, {\n                            variant: \"dot\",\n                            color: \"primary\",\n                            invisible: notification?.isChecked,\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                onClick: ()=>{\n                                    handleIsChecked(notification);\n                                },\n                                style: {\n                                    textDecoration: \"none\",\n                                    color: \"inherit\"\n                                },\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    style: {\n                                        flexGrow: 1,\n                                        minWidth: 340,\n                                        maxWidth: 340\n                                    },\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                        alignItems: \"flex-start\",\n                                        style: {\n                                            padding: 0\n                                        },\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                                    alt: \"avatar\",\n                                                    src: notification.imageUrl\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                                                    lineNumber: 92,\n                                                    columnNumber: 29\n                                                }, undefined)\n                                            }, void 0, false, {\n                                                fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                                                lineNumber: 91,\n                                                columnNumber: 27\n                                            }, undefined),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n                                                primary: notification.content,\n                                                secondary: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    style: {\n                                                        marginTop: \"0.5rem\"\n                                                    },\n                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                                                        component: \"span\",\n                                                        variant: \"body2\",\n                                                        color: \"textSecondary\",\n                                                        children: notification?.content.length > 30 ? notification.content.substr(0, 30) + \"...\" : notification.content\n                                                    }, void 0, false, void 0, void 0)\n                                                }, void 0, false, void 0, void 0)\n                                            }, void 0, false, {\n                                                fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                                                lineNumber: 94,\n                                                columnNumber: 27\n                                            }, undefined)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                                        lineNumber: 87,\n                                        columnNumber: 25\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                                    lineNumber: 80,\n                                    columnNumber: 23\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                                lineNumber: 71,\n                                columnNumber: 21\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                            lineNumber: 66,\n                            columnNumber: 19\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n                            component: \"li\"\n                        }, void 0, false, {\n                            fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                            lineNumber: 114,\n                            columnNumber: 19\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                    lineNumber: 65,\n                    columnNumber: 17\n                }, undefined)\n            }, notification?.id, false, {\n                fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                lineNumber: 64,\n                columnNumber: 15\n            }, undefined);\n        }) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Grid, {\n            container: true,\n            sx: {\n                mt: 5,\n                justifyContent: \"center\"\n            },\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                component: \"h1\",\n                variant: \"body1\",\n                color: \"textSecondary\",\n                children: \"No notifications for now.\"\n            }, void 0, false, {\n                fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n                lineNumber: 121,\n                columnNumber: 13\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/Users/yanoryosuke/projects/gotore_project/pages/notifications/NotificationsList.tsx\",\n            lineNumber: 120,\n            columnNumber: 11\n        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)\n    }, void 0, false);\n};\n_s(NotificationsList, \"tpe5lkxeTWevY9Dru4DXVCjoSK8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = NotificationsList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (NotificationsList);\nvar _c;\n$RefreshReg$(_c, \"NotificationsList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9ub3RpZmljYXRpb25zL05vdGlmaWNhdGlvbnNMaXN0LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTRFO0FBQ3BDO0FBQ2dCO0FBQ2Q7QUFDSjtBQUNRO0FBQ0Y7QUFDVTtBQUNJO0FBQ2dDO0FBQ3ZEO0FBRUc7QUFFdEMsTUFBTXVCLG9CQUFvQixJQUFNOztJQUM5QixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR3RCLCtDQUFRQSxDQUFDLElBQUk7SUFDM0MsTUFBTSxDQUFDdUIsZUFBZUMsaUJBQWlCLEdBQUd4QiwrQ0FBUUE7SUFDbEQsTUFBTSxFQUFFeUIsWUFBVyxFQUFFLEdBQUczQixpREFBVUEsQ0FBQ3FCLDZDQUFXQTtJQUM5QyxNQUFNTyxTQUFTeEIsc0RBQVNBO0lBRXhCLE1BQU15Qix5QkFBeUIxQixrREFBV0EsQ0FBQyxVQUFZO1FBQ3JELElBQUl3QixhQUFhO1lBQ2YsT0FBT1gsOERBQVVBLENBQ2pCRCx5REFBS0EsQ0FDREQsOERBQVVBLENBQUNNLHlDQUFFQSxFQUFFLGtCQUNmSCx5REFBS0EsQ0FBQyxVQUFVLE1BQU1VLGFBQWFHLE9BRXZDLENBQUNDLGdCQUF1QjtnQkFDcEIsTUFBTU4sZ0JBQWdCTSxjQUFjQyxJQUFJLENBQUNDLEdBQUcsQ0FBQyxDQUFDQyxJQUFZO3dCQUN0RCxHQUFHQSxFQUFFQyxJQUFJLEVBQUU7b0JBQ2Y7Z0JBQ0FULGlCQUFpQkQ7Z0JBQ2pCRCxXQUFXLEtBQUs7WUFDbEI7UUFFSixDQUFDO0lBQ0gsR0FBRztRQUFDRztLQUFZO0lBRWhCMUIsZ0RBQVNBLENBQUMsSUFBTTtRQUNkNEI7SUFDRixHQUFHO1FBQUNBO0tBQXVCO0lBRTNCLE1BQU1PLGtCQUFrQixPQUFPQyxlQUErQjtRQUM1RCxJQUFJO1lBQ0YsYUFBYTtZQUNiLE1BQU1DLE1BQVcsTUFBTW5CLDZEQUFTQSxDQUFDRCx1REFBR0EsQ0FBQ0UseUNBQUVBLEVBQUUsaUJBQWlCaUIsY0FBY0UsS0FBSztnQkFDM0VDLFdBQVcsSUFBSTtZQUNqQjtZQUNBLElBQUlGLEtBQUs7Z0JBQ1BWLE9BQU9hLElBQUksQ0FBQ0osYUFBYUssT0FBTztZQUNsQyxDQUFDO1FBQ0gsRUFBRSxPQUFPQyxLQUFLO1lBQ1pDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDZDtRQUNBbkIsV0FBVyxLQUFLO0lBQ2xCO0lBRUEscUJBQ0U7a0JBQ0csQ0FBQ0QsVUFDQUUsZUFBZXFCLFNBQVUsSUFDdkJyQixlQUFlUSxJQUFJLENBQUNJLGVBQWlCO1lBQ25DLHFCQUNFLDhEQUFDL0IsK0NBQUlBO2dCQUFDeUMsU0FBUztnQkFBd0JDLElBQUk7b0JBQUVDLGdCQUFnQjtnQkFBUzswQkFDcEUsNEVBQUN4QywwREFBSUE7O3NDQUNILDhEQUFDSixnREFBS0E7NEJBQ0o2QyxTQUFROzRCQUNSQyxPQUFNOzRCQUNOQyxXQUFXZixjQUFjRztzQ0FFekIsNEVBQUNhO2dDQUNDQyxTQUFTLElBQU07b0NBQ2JsQixnQkFBZ0JDO2dDQUNsQjtnQ0FDQWtCLE9BQU87b0NBQ0xDLGdCQUFnQjtvQ0FDaEJMLE9BQU87Z0NBQ1Q7MENBRUEsNEVBQUNFO29DQUNDRSxPQUFPO3dDQUNMRSxVQUFVO3dDQUNWQyxVQUFVO3dDQUNWQyxVQUFVO29DQUNaOzhDQUVBLDRFQUFDakQsOERBQVFBO3dDQUNQa0QsWUFBVzt3Q0FDWEwsT0FBTzs0Q0FBRU0sU0FBUzt3Q0FBRTs7MERBRXBCLDhEQUFDaEQsb0VBQWNBOzBEQUNiLDRFQUFDTCw2REFBTUE7b0RBQUNzRCxLQUFJO29EQUFTQyxLQUFLMUIsYUFBYTJCLFFBQVE7Ozs7Ozs7Ozs7OzBEQUVqRCw4REFBQ3BELG1FQUFZQTtnREFDWHFELFNBQVM1QixhQUFhNkIsT0FBTztnREFDN0JDLHlCQUNFLDhEQUFDZDtvREFBSUUsT0FBTzt3REFBRWEsV0FBVztvREFBUzs4REFDaEMsNEVBQUM3RCxxREFBVUE7d0RBQ1Q4RCxXQUFVO3dEQUNWbkIsU0FBUTt3REFDUkMsT0FBTTtrRUFFTGQsY0FBYzZCLFFBQVFwQixNQUFNLEdBQUcsS0FDNUJULGFBQWE2QixPQUFPLENBQUNJLE1BQU0sQ0FBQyxHQUFHLE1BQU0sUUFDckNqQyxhQUFhNkIsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBU3hDLDhEQUFDdkQsOERBQU9BOzRCQUFDMEQsV0FBVTs7Ozs7Ozs7Ozs7O2VBbERGaEMsY0FBY0U7Ozs7O1FBc0R2QyxtQkFFQSw4REFBQ2pDLCtDQUFJQTtZQUFDeUMsU0FBUztZQUFDQyxJQUFJO2dCQUFFdUIsSUFBSTtnQkFBR3RCLGdCQUFnQjtZQUFTO3NCQUNwRCw0RUFBQzFDLHFEQUFVQTtnQkFBQzhELFdBQVU7Z0JBQUtuQixTQUFRO2dCQUFRQyxPQUFNOzBCQUFnQjs7Ozs7Ozs7OztxQkFJcEUsaUJBRUQsNklBQ0Q7O0FBR1A7R0FwSE03Qjs7UUFJV2xCLGtEQUFTQTs7O0tBSnBCa0I7QUFzSE4sK0RBQWVBLGlCQUFpQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9ub3RpZmljYXRpb25zL05vdGlmaWNhdGlvbnNMaXN0LnRzeD9iN2FkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyBCYWRnZSwgR3JpZCwgVHlwb2dyYXBoeSB9IGZyb20gXCJAbXVpL21hdGVyaWFsXCI7XG5pbXBvcnQgQXZhdGFyIGZyb20gXCJAbXVpL21hdGVyaWFsL0F2YXRhclwiO1xuaW1wb3J0IExpc3QgZnJvbSBcIkBtdWkvbWF0ZXJpYWwvTGlzdFwiO1xuaW1wb3J0IExpc3RJdGVtIGZyb20gXCJAbXVpL21hdGVyaWFsL0xpc3RJdGVtXCI7XG5pbXBvcnQgRGl2aWRlciBmcm9tIFwiQG11aS9tYXRlcmlhbC9EaXZpZGVyXCI7XG5pbXBvcnQgTGlzdEl0ZW1UZXh0IGZyb20gXCJAbXVpL21hdGVyaWFsL0xpc3RJdGVtVGV4dFwiO1xuaW1wb3J0IExpc3RJdGVtQXZhdGFyIGZyb20gXCJAbXVpL21hdGVyaWFsL0xpc3RJdGVtQXZhdGFyXCI7XG5pbXBvcnQgeyBjb2xsZWN0aW9uLCBxdWVyeSwgb25TbmFwc2hvdCwgd2hlcmUsIGRvYywgdXBkYXRlRG9jIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vZmlyZWJhc2UnXG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tIFwiLi4vLi4vdHlwZXMvbXktbW9kdWxlXCI7XG5pbXBvcnQgeyBBdXRoQ29udGV4dCB9IGZyb20gXCIuLi9fYXBwXCI7XG5cbmNvbnN0IE5vdGlmaWNhdGlvbnNMaXN0ID0gKCkgPT4ge1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW25vdGlmaWNhdGlvbnMsIHNldE5vdGlmaWNhdGlvbnNdID0gdXNlU3RhdGU8Tm90aWZpY2F0aW9uPigpO1xuICBjb25zdCB7IGN1cnJlbnRVc2VyIH0gPSB1c2VDb250ZXh0KEF1dGhDb250ZXh0KVxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCBoYW5kbGVHZXROb3RpZmljYXRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgcmV0dXJuIG9uU25hcHNob3QoXG4gICAgICBxdWVyeShcbiAgICAgICAgICBjb2xsZWN0aW9uKGRiLCAnbm90aWZpY2F0aW9ucycpLFxuICAgICAgICAgIHdoZXJlKFwidXNlcklkXCIsIFwiPT1cIiwgY3VycmVudFVzZXI/LnVpZCksXG4gICAgICAgICAgKSxcbiAgICAgIChxdWVyeVNuYXBzaG90OiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBub3RpZmljYXRpb25zID0gcXVlcnlTbmFwc2hvdC5kb2NzLm1hcCgoeDogYW55KSA9PiAoe1xuICAgICAgICAgICAgICAuLi54LmRhdGEoKSxcbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgc2V0Tm90aWZpY2F0aW9ucyhub3RpZmljYXRpb25zKTtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH0sIFtjdXJyZW50VXNlcl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaGFuZGxlR2V0Tm90aWZpY2F0aW9ucygpO1xuICB9LCBbaGFuZGxlR2V0Tm90aWZpY2F0aW9uc10pO1xuXG4gIGNvbnN0IGhhbmRsZUlzQ2hlY2tlZCA9IGFzeW5jIChub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHVwZGF0ZURvYyhkb2MoZGIsIFwibm90aWZpY2F0aW9uc1wiLCBub3RpZmljYXRpb24/LmlkKSwge1xuICAgICAgICBpc0NoZWNrZWQ6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgcm91dGVyLnB1c2gobm90aWZpY2F0aW9uLmxpbmtVcmwpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgeyFsb2FkaW5nID8gKFxuICAgICAgICBub3RpZmljYXRpb25zPy5sZW5ndGghID4gMCA/IChcbiAgICAgICAgICBub3RpZmljYXRpb25zPy5tYXAoKG5vdGlmaWNhdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPEdyaWQgY29udGFpbmVyIGtleT17bm90aWZpY2F0aW9uPy5pZH0gc3g9e3sganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIgfX0+XG4gICAgICAgICAgICAgICAgPExpc3Q+XG4gICAgICAgICAgICAgICAgICA8QmFkZ2VcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD0nZG90J1xuICAgICAgICAgICAgICAgICAgICBjb2xvcj0ncHJpbWFyeSdcbiAgICAgICAgICAgICAgICAgICAgaW52aXNpYmxlPXtub3RpZmljYXRpb24/LmlzQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUlzQ2hlY2tlZChub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmhlcml0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhHcm93OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogMzQwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogMzQwLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtcz0nZmxleC1zdGFydCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1BdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEF2YXRhciBhbHQ9J2F2YXRhcicgc3JjPXtub3RpZmljYXRpb24uaW1hZ2VVcmx9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1BdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtub3RpZmljYXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnk9e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMC41cmVtXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50PSdzcGFuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9J2JvZHkyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPSd0ZXh0U2Vjb25kYXJ5J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25vdGlmaWNhdGlvbj8uY29udGVudC5sZW5ndGggPiAzMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBub3RpZmljYXRpb24uY29udGVudC5zdWJzdHIoMCwgMzApICsgXCIuLi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBub3RpZmljYXRpb24uY29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L0JhZGdlPlxuICAgICAgICAgICAgICAgICAgPERpdmlkZXIgY29tcG9uZW50PSdsaScgLz5cbiAgICAgICAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8R3JpZCBjb250YWluZXIgc3g9e3sgbXQ6IDUsIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgY29tcG9uZW50PSdoMScgdmFyaWFudD0nYm9keTEnIGNvbG9yPSd0ZXh0U2Vjb25kYXJ5Jz5cbiAgICAgICAgICAgICAgTm8gbm90aWZpY2F0aW9ucyBmb3Igbm93LlxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgKVxuICAgICAgKSA6IChcbiAgICAgICAgPD48Lz5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25zTGlzdDtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwidXNlUm91dGVyIiwiQmFkZ2UiLCJHcmlkIiwiVHlwb2dyYXBoeSIsIkF2YXRhciIsIkxpc3QiLCJMaXN0SXRlbSIsIkRpdmlkZXIiLCJMaXN0SXRlbVRleHQiLCJMaXN0SXRlbUF2YXRhciIsImNvbGxlY3Rpb24iLCJxdWVyeSIsIm9uU25hcHNob3QiLCJ3aGVyZSIsImRvYyIsInVwZGF0ZURvYyIsImRiIiwiQXV0aENvbnRleHQiLCJOb3RpZmljYXRpb25zTGlzdCIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwibm90aWZpY2F0aW9ucyIsInNldE5vdGlmaWNhdGlvbnMiLCJjdXJyZW50VXNlciIsInJvdXRlciIsImhhbmRsZUdldE5vdGlmaWNhdGlvbnMiLCJ1aWQiLCJxdWVyeVNuYXBzaG90IiwiZG9jcyIsIm1hcCIsIngiLCJkYXRhIiwiaGFuZGxlSXNDaGVja2VkIiwibm90aWZpY2F0aW9uIiwicmVzIiwiaWQiLCJpc0NoZWNrZWQiLCJwdXNoIiwibGlua1VybCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJjb250YWluZXIiLCJzeCIsImp1c3RpZnlDb250ZW50IiwidmFyaWFudCIsImNvbG9yIiwiaW52aXNpYmxlIiwiZGl2Iiwib25DbGljayIsInN0eWxlIiwidGV4dERlY29yYXRpb24iLCJmbGV4R3JvdyIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJhbGlnbkl0ZW1zIiwicGFkZGluZyIsImFsdCIsInNyYyIsImltYWdlVXJsIiwicHJpbWFyeSIsImNvbnRlbnQiLCJzZWNvbmRhcnkiLCJtYXJnaW5Ub3AiLCJjb21wb25lbnQiLCJzdWJzdHIiLCJtdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/notifications/NotificationsList.tsx\n"));

/***/ })

});
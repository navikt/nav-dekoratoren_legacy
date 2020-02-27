(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
    [0],
    {
        /***/ './src/mocks/innloggingsstatus-mock.ts':
            /*!*********************************************!*\
  !*** ./src/mocks/innloggingsstatus-mock.ts ***!
  \*********************************************/
            /*! exports provided: default */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
                'use strict';
                __webpack_require__.r(__webpack_exports__);
                /* Mock innlogget: */ /* harmony default export */ __webpack_exports__[
                    'default'
                ] = {
                    authenticated: true,
                    name: 'OLE NORMANN',
                    securityLevel: '4',
                };

                /***/
            },

        /***/ './src/mocks/setup-mock.ts':
            /*!*********************************!*\
  !*** ./src/mocks/setup-mock.ts ***!
  \*********************************/
            /*! exports provided: setUpMock */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
                'use strict';
                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    'setUpMock',
                    function() {
                        return setUpMock;
                    }
                );
                /* harmony import */ var C_Users_H152609_OneDrive_NAV_dev_nav_dekoratoren_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! ./node_modules/@babel/runtime/regenerator */ './node_modules/@babel/runtime/regenerator/index.js'
                );
                /* harmony import */ var C_Users_H152609_OneDrive_NAV_dev_nav_dekoratoren_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                    C_Users_H152609_OneDrive_NAV_dev_nav_dekoratoren_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__
                );
                /* harmony import */ var C_Users_H152609_OneDrive_NAV_dev_nav_dekoratoren_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                    /*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ './node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js'
                );
                /* harmony import */ var _innloggingsstatus_mock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                    /*! ./innloggingsstatus-mock */ './src/mocks/innloggingsstatus-mock.ts'
                );
                /* harmony import */ var _varselinnboks_mock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                    /*! ./varselinnboks-mock */ './src/mocks/varselinnboks-mock.ts'
                );
                /* harmony import */ var yet_another_fetch_mock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
                    /*! yet-another-fetch-mock */ './node_modules/yet-another-fetch-mock/dist/yet-another-fetch-mock.es5.js'
                );
                /* harmony import */ var _utils_Environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
                    /*! ../utils/Environment */ './src/utils/Environment.ts'
                );
                var setUpMock = /*#__PURE__*/ (function() {
                    var _ref = Object(
                        C_Users_H152609_OneDrive_NAV_dev_nav_dekoratoren_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[
                            'default'
                        ]
                    )(
                        /*#__PURE__*/ C_Users_H152609_OneDrive_NAV_dev_nav_dekoratoren_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(
                            function _callee() {
                                var loggingMiddleware, fetchMock;
                                return C_Users_H152609_OneDrive_NAV_dev_nav_dekoratoren_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(
                                    function _callee$(_context) {
                                        while (1) {
                                            switch (
                                                (_context.prev = _context.next)
                                            ) {
                                                case 0:
                                                    loggingMiddleware = function loggingMiddleware(
                                                        request,
                                                        response
                                                    ) {
                                                        // console.log(request, response);
                                                        return response;
                                                    };
                                                    fetchMock = yet_another_fetch_mock__WEBPACK_IMPORTED_MODULE_4__[
                                                        'default'
                                                    ].configure({
                                                        enableFallback: true, // default: true
                                                        ignoreMiddlewareIfFallback: true, // Edge er tullete
                                                        middleware: yet_another_fetch_mock__WEBPACK_IMPORTED_MODULE_4__[
                                                            'MiddlewareUtils'
                                                        ].combine(
                                                            yet_another_fetch_mock__WEBPACK_IMPORTED_MODULE_4__[
                                                                'MiddlewareUtils'
                                                            ].delayMiddleware(
                                                                0
                                                            ),
                                                            yet_another_fetch_mock__WEBPACK_IMPORTED_MODULE_4__[
                                                                'MiddlewareUtils'
                                                            ].failurerateMiddleware(
                                                                0.0
                                                            ),
                                                            loggingMiddleware
                                                        ),
                                                    });
                                                    console.log(
                                                        'Mock data enabled'
                                                    );
                                                    fetchMock.get(
                                                        _utils_Environment__WEBPACK_IMPORTED_MODULE_5__[
                                                            'default'
                                                        ].innloggingslinjenUrl,
                                                        _innloggingsstatus_mock__WEBPACK_IMPORTED_MODULE_2__[
                                                            'default'
                                                        ]
                                                    );
                                                    fetchMock.get(
                                                        ''.concat(
                                                            _utils_Environment__WEBPACK_IMPORTED_MODULE_5__[
                                                                'default'
                                                            ].varselinnboksUrl,
                                                            '/varsler(.*)'
                                                        ),
                                                        _varselinnboks_mock__WEBPACK_IMPORTED_MODULE_3__[
                                                            'default'
                                                        ]
                                                    );
                                                    fetchMock.post(
                                                        ''.concat(
                                                            _utils_Environment__WEBPACK_IMPORTED_MODULE_5__[
                                                                'default'
                                                            ].varselinnboksUrl,
                                                            '/rest/varsel/erles/33475442'
                                                        ),
                                                        function(_ref2) {
                                                            var body =
                                                                _ref2.body;
                                                            return body;
                                                        }
                                                    );
                                                case 6:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    },
                                    _callee
                                );
                            }
                        )
                    );
                    return function setUpMock() {
                        return _ref.apply(this, arguments);
                    };
                })();

                /***/
            },

        /***/ './src/mocks/varselinnboks-mock.ts':
            /*!*****************************************!*\
  !*** ./src/mocks/varselinnboks-mock.ts ***!
  \*****************************************/
            /*! exports provided: default */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
                'use strict';
                __webpack_require__.r(__webpack_exports__);
                /* harmony default export */ __webpack_exports__['default'] = {
                    uleste: 2,
                    antall: 13,
                    nyesteId: 33475442,
                    varsler:
                        '<div class="panel nav-varsler">\n    ' +
                        '       <ul class="varsel-liste ustilet">\n        ' +
                        '           <li class="varsel-container">\n            ' +
                        '               <section class="varsel">\n                ' +
                        '                   <span class="varsel-ikon hide-text alarm">alarm-ikon</span>\n                ' +
                        '                   <div class="varsel-innhold">\n                    ' +
                        '                       <p class="typo-normal-liten varsel-dato">12. juni 2019 kl 10:47</p>\n                    ' +
                        '                       <p class="typo-infotekst">Ny melding i din aktivitetsplan</p>\n                    ' +
                        '                       <a class="varsel-lenke typo-normal-liten" href="https://tjenester.nav.no/aktivitetsplan/">' +
                        '                           Gå til meldingen</a>\n                ' +
                        '                   </div>\n            ' +
                        '               </section>\n        ' +
                        '           </li>\n        ' +
                        '           <li class="varsel-container">\n            ' +
                        '               <section class="varsel">\n                ' +
                        '                   <span class="varsel-ikon hide-text boble">snakkeboble-ikon</span>\n                ' +
                        '                   <div class="varsel-innhold">\n                    ' +
                        '                       <p class="typo-normal-liten varsel-dato">20. mars 2019 kl 14:30</p>\n                    ' +
                        '                       <p class="typo-infotekst">Du har fått et spørsmål fra NAV</p>\n                    ' +
                        '                       <a class="varsel-lenke typo-normal-liten" href="https://tjenester.nav.no/mininnboks/traad/1000MU9LJ">' +
                        '                           Se meldingen</a>\n                ' +
                        '                   </div>\n            ' +
                        '               </section>\n        ' +
                        '           </li>\n        ' +
                        '           <li class="varsel-container">\n            ' +
                        '               <section class="varsel">\n                ' +
                        '                   <span class="varsel-ikon hide-text digisyfo">plaster-ikon</span>\n                ' +
                        '                   <div class="varsel-innhold">\n                    ' +
                        '                       <p class="typo-normal-liten varsel-dato">20. mars 2019 kl 10:22</p>\n                    ' +
                        '                       <p class="typo-infotekst">Du har fått et spørsmål fra NAV</p>\n                    ' +
                        '                       <a class="varsel-lenke typo-normal-liten" href="https://tjenester.nav.no/mininnboks/traad/1000MU9LJ">' +
                        '                           Se meldingen</a>\n                ' +
                        '                   </div>\n            ' +
                        '               </section>\n        ' +
                        '           </li>\n        ' +
                        '           <li class="varsel-container">\n            ' +
                        '               <section class="varsel">\n                ' +
                        '                   <span class="varsel-ikon hide-text dokument">dokument-ikon</span>\n                ' +
                        '                   <div class="varsel-innhold">\n                    ' +
                        '                       <p class="typo-normal-liten varsel-dato">15. januar 2019 kl 07:22</p>\n                    ' +
                        '                       <p class="typo-infotekst">Vi minner om at du har fått årsoppgave fra NAV over dine utbetalinger og trekk i 2018' +
                        '                       </p>\n                    ' +
                        '                       <a class="varsel-lenke typo-normal-liten" ' +
                        '                          href="https://tjenester.nav.no/innloggingsinfo/type/dokument/varselid/ad207f2f-c21d-4dc4-817a-b47dd75613d2">' +
                        '                          Gå til dokumentet</a>\n                ' +
                        '                   </div>\n            ' +
                        '               </section>\n        ' +
                        '           </li>\n        ' +
                        '           <li class="varsel-container">\n            ' +
                        '               <section class="varsel">\n                ' +
                        '               <span class="varsel-ikon hide-text kalender">kalender-ikon</span>\n                ' +
                        '               <div class="varsel-innhold">\n                    ' +
                        '                   <p class="typo-normal-liten varsel-dato">08. januar 2019 kl 22:55</p>\n                    ' +
                        '                   <p class="typo-infotekst">Du har fått årsoppgave fra NAV over dine utbetalinger og trekk i 2018' +
                        '                       </p>\n                    ' +
                        '                   <a class="varsel-lenke typo-normal-liten" ' +
                        '                           href="https://tjenester.nav.no/innloggingsinfo/type/dokument/varselid/ad207f2f-c21d-4dc4-817a-b47dd75613d2">' +
                        '                           Gå til dokumentet</a>\n                ' +
                        '               </div>\n            ' +
                        '               </section>\n        ' +
                        '           </li>\n    ' +
                        '       </ul>\n' +
                        '    </div>',
                };

                /***/
            },
    },
]);
//# sourceMappingURL=0.js.map

(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
    [1],
    {
        /***/ './node_modules/yet-another-fetch-mock/dist/yet-another-fetch-mock.es5.js':
            /*!********************************************************************************!*\
  !*** ./node_modules/yet-another-fetch-mock/dist/yet-another-fetch-mock.es5.js ***!
  \********************************************************************************/
            /*! exports provided: default, MatcherUtils, ResponseUtils, MiddlewareUtils, SpyMiddleware */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
                'use strict';
                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    'MatcherUtils',
                    function() {
                        return MatcherUtils;
                    }
                );
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    'ResponseUtils',
                    function() {
                        return ResponseUtils;
                    }
                );
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    'MiddlewareUtils',
                    function() {
                        return MiddlewareUtils;
                    }
                );
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    'SpyMiddleware',
                    function() {
                        return SpyMiddleware;
                    }
                );
                /*
object-assign
(c) Sindre Sorhus
@license MIT
*/

                /* eslint-disable no-unused-vars */
                var getOwnPropertySymbols = Object.getOwnPropertySymbols;
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                var propIsEnumerable = Object.prototype.propertyIsEnumerable;

                function toObject(val) {
                    if (val === null || val === undefined) {
                        throw new TypeError(
                            'Object.assign cannot be called with null or undefined'
                        );
                    }

                    return Object(val);
                }

                function shouldUseNative() {
                    try {
                        if (!Object.assign) {
                            return false;
                        } // Detect buggy property enumeration order in older V8 versions.
                        // https://bugs.chromium.org/p/v8/issues/detail?id=4118

                        var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

                        test1[5] = 'de';

                        if (Object.getOwnPropertyNames(test1)[0] === '5') {
                            return false;
                        } // https://bugs.chromium.org/p/v8/issues/detail?id=3056

                        var test2 = {};

                        for (var i = 0; i < 10; i++) {
                            test2['_' + String.fromCharCode(i)] = i;
                        }

                        var order2 = Object.getOwnPropertyNames(test2).map(
                            function(n) {
                                return test2[n];
                            }
                        );

                        if (order2.join('') !== '0123456789') {
                            return false;
                        } // https://bugs.chromium.org/p/v8/issues/detail?id=3056

                        var test3 = {};
                        'abcdefghijklmnopqrst'
                            .split('')
                            .forEach(function(letter) {
                                test3[letter] = letter;
                            });

                        if (
                            Object.keys(Object.assign({}, test3)).join('') !==
                            'abcdefghijklmnopqrst'
                        ) {
                            return false;
                        }

                        return true;
                    } catch (err) {
                        // We don't expect any of the above to throw, but better to be safe.
                        return false;
                    }
                }

                var objectAssign = shouldUseNative()
                    ? Object.assign
                    : function(target, source) {
                          var from;
                          var to = toObject(target);
                          var symbols;

                          for (var s = 1; s < arguments.length; s++) {
                              from = Object(arguments[s]);

                              for (var key in from) {
                                  if (hasOwnProperty.call(from, key)) {
                                      to[key] = from[key];
                                  }
                              }

                              if (getOwnPropertySymbols) {
                                  symbols = getOwnPropertySymbols(from);

                                  for (var i = 0; i < symbols.length; i++) {
                                      if (
                                          propIsEnumerable.call(
                                              from,
                                              symbols[i]
                                          )
                                      ) {
                                          to[symbols[i]] = from[symbols[i]];
                                      }
                                  }
                              }
                          }

                          return to;
                      };
                var token = '%[a-f0-9]{2}';
                var singleMatcher = new RegExp(token, 'gi');
                var multiMatcher = new RegExp('(' + token + ')+', 'gi');

                function decodeComponents(components, split) {
                    try {
                        // Try to decode the entire string first
                        return decodeURIComponent(components.join(''));
                    } catch (err) {
                        // Do nothing
                    }

                    if (components.length === 1) {
                        return components;
                    }

                    split = split || 1; // Split the array in 2 parts

                    var left = components.slice(0, split);
                    var right = components.slice(split);
                    return Array.prototype.concat.call(
                        [],
                        decodeComponents(left),
                        decodeComponents(right)
                    );
                }

                function decode(input) {
                    try {
                        return decodeURIComponent(input);
                    } catch (err) {
                        var tokens = input.match(singleMatcher);

                        for (var i = 1; i < tokens.length; i++) {
                            input = decodeComponents(tokens, i).join('');
                            tokens = input.match(singleMatcher);
                        }

                        return input;
                    }
                }

                function customDecodeURIComponent(input) {
                    // Keep track of all the replacements and prefill the map with the `BOM`
                    var replaceMap = {
                        '%FE%FF': '\uFFFD\uFFFD',
                        '%FF%FE': '\uFFFD\uFFFD',
                    };
                    var match = multiMatcher.exec(input);

                    while (match) {
                        try {
                            // Decode as big chunks as possible
                            replaceMap[match[0]] = decodeURIComponent(match[0]);
                        } catch (err) {
                            var result = decode(match[0]);

                            if (result !== match[0]) {
                                replaceMap[match[0]] = result;
                            }
                        }

                        match = multiMatcher.exec(input);
                    } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else

                    replaceMap['%C2'] = '\uFFFD';
                    var entries = Object.keys(replaceMap);

                    for (var i = 0; i < entries.length; i++) {
                        // Replace all decoded components
                        var key = entries[i];
                        input = input.replace(
                            new RegExp(key, 'g'),
                            replaceMap[key]
                        );
                    }

                    return input;
                }

                var decodeUriComponent = function decodeUriComponent(
                    encodedURI
                ) {
                    if (typeof encodedURI !== 'string') {
                        throw new TypeError(
                            'Expected `encodedURI` to be of type `string`, got `' +
                                typeof encodedURI +
                                '`'
                        );
                    }

                    try {
                        encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

                        return decodeURIComponent(encodedURI);
                    } catch (err) {
                        // Fallback to a more advanced decoder
                        return customDecodeURIComponent(encodedURI);
                    }
                };

                function parserForArrayFormat(opts) {
                    var result;

                    switch (opts.arrayFormat) {
                        case 'index':
                            return function(key, value, accumulator) {
                                result = /\[(\d*)\]$/.exec(key);
                                key = key.replace(/\[\d*\]$/, '');

                                if (!result) {
                                    accumulator[key] = value;
                                    return;
                                }

                                if (accumulator[key] === undefined) {
                                    accumulator[key] = {};
                                }

                                accumulator[key][result[1]] = value;
                            };

                        case 'bracket':
                            return function(key, value, accumulator) {
                                result = /(\[\])$/.exec(key);
                                key = key.replace(/\[\]$/, '');

                                if (!result) {
                                    accumulator[key] = value;
                                    return;
                                } else if (accumulator[key] === undefined) {
                                    accumulator[key] = [value];
                                    return;
                                }

                                accumulator[key] = [].concat(
                                    accumulator[key],
                                    value
                                );
                            };

                        default:
                            return function(key, value, accumulator) {
                                if (accumulator[key] === undefined) {
                                    accumulator[key] = value;
                                    return;
                                }

                                accumulator[key] = [].concat(
                                    accumulator[key],
                                    value
                                );
                            };
                    }
                }

                function keysSorter(input) {
                    if (Array.isArray(input)) {
                        return input.sort();
                    } else if (typeof input === 'object') {
                        return keysSorter(Object.keys(input))
                            .sort(function(a, b) {
                                return Number(a) - Number(b);
                            })
                            .map(function(key) {
                                return input[key];
                            });
                    }

                    return input;
                }

                function extract(str) {
                    var queryStart = str.indexOf('?');

                    if (queryStart === -1) {
                        return '';
                    }

                    return str.slice(queryStart + 1);
                }

                function parse(str, opts) {
                    opts = objectAssign(
                        {
                            arrayFormat: 'none',
                        },
                        opts
                    );
                    var formatter = parserForArrayFormat(opts); // Create an object with no prototype
                    // https://github.com/sindresorhus/query-string/issues/47

                    var ret = Object.create(null);

                    if (typeof str !== 'string') {
                        return ret;
                    }

                    str = str.trim().replace(/^[?#&]/, '');

                    if (!str) {
                        return ret;
                    }

                    str.split('&').forEach(function(param) {
                        var parts = param.replace(/\+/g, ' ').split('='); // Firefox (pre 40) decodes `%3D` to `=`
                        // https://github.com/sindresorhus/query-string/pull/37

                        var key = parts.shift();
                        var val =
                            parts.length > 0 ? parts.join('=') : undefined; // missing `=` should be `null`:
                        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

                        val =
                            val === undefined ? null : decodeUriComponent(val);
                        formatter(decodeUriComponent(key), val, ret);
                    });
                    return Object.keys(ret)
                        .sort()
                        .reduce(function(result, key) {
                            var val = ret[key];

                            if (
                                Boolean(val) &&
                                typeof val === 'object' &&
                                !Array.isArray(val)
                            ) {
                                // Sort object keys, not values
                                result[key] = keysSorter(val);
                            } else {
                                result[key] = val;
                            }

                            return result;
                        }, Object.create(null));
                }

                var extract_1 = extract;
                var parse_1 = parse;

                function testPromise(data) {
                    return Promise.resolve(data) == data; // tslint:disable-line
                }

                function execHandler(handler, args) {
                    if (typeof handler === 'function') {
                        var result = handler(args);
                        var isPromise = testPromise(result);

                        if (isPromise) {
                            return result;
                        } else {
                            return Promise.resolve({
                                body: result,
                            });
                        }
                    } else {
                        return ResponseUtils.jsonPromise(handler);
                    }
                }

                function unwrap(args) {
                    return function(handler) {
                        if (typeof handler === 'function') {
                            var result = handler(args);
                            var isPromise = testPromise(result);

                            if (isPromise) {
                                return result;
                            }

                            return Promise.resolve({
                                body: result,
                            });
                        } else {
                            return ResponseUtils.jsonPromise(handler);
                        }
                    };
                }

                function merge(into, data) {
                    return {
                        body: into.body || data.body,
                        status: into.status || data.status,
                        statusText: into.statusText || data.statusText,
                        headers: Object.assign({}, data.headers, into.headers),
                    };
                }

                var ResponseUtils =
                    /** @class */
                    (function() {
                        function ResponseUtils() {}

                        ResponseUtils.json = function(json) {
                            return function() {
                                return ResponseUtils.jsonPromise(json);
                            };
                        };

                        ResponseUtils.jsonPromise = function(json) {
                            var response = {
                                body: JSON.stringify(json),
                            };
                            return Promise.resolve(response);
                        };

                        ResponseUtils.delayed = function(delay, handler) {
                            return function(args) {
                                return new Promise(function(resolve) {
                                    setTimeout(function() {
                                        return resolve(
                                            execHandler(handler, args)
                                        );
                                    }, delay);
                                });
                            };
                        };

                        ResponseUtils.statusCode = function(status) {
                            return function(args) {
                                var response = {
                                    status: status,
                                };
                                return Promise.resolve(response);
                            };
                        };

                        ResponseUtils.statusText = function(statusText) {
                            return function(args) {
                                var response = {
                                    statusText: statusText,
                                };
                                return Promise.resolve(response);
                            };
                        };

                        ResponseUtils.headers = function(headers) {
                            return function(args) {
                                var response = {
                                    headers: headers,
                                };
                                return Promise.resolve(response);
                            };
                        };

                        ResponseUtils.combine = function() {
                            var handlers = [];

                            for (var _i = 0; _i < arguments.length; _i++) {
                                handlers[_i] = arguments[_i];
                            }

                            return function(args) {
                                return Promise.all(
                                    handlers.map(unwrap(args))
                                ).then(function(data) {
                                    return data.reduce(merge, {});
                                });
                            };
                        };

                        return ResponseUtils;
                    })();

                var pathToRegex = __webpack_require__(
                    /*! path-to-regexp */ './node_modules/yet-another-fetch-mock/node_modules/path-to-regexp/index.js'
                );

                function findRequestUrl(input, init) {
                    if (typeof input === 'string') {
                        return input;
                    } else {
                        return input.url;
                    }
                }

                function findRequestMethod(input, init) {
                    if (typeof input === 'string') {
                        return (init && init.method) || 'GET';
                    } else {
                        return input.method;
                    }
                }

                function findPathParams(requestUrl, matcherUrl) {
                    if (!matcherUrl) {
                        return {};
                    }

                    var urlWithoutQueryParams = requestUrl.split('?')[0];
                    var keys = [];
                    var matcherRegex = pathToRegex(matcherUrl, keys);
                    var match = matcherRegex.exec(urlWithoutQueryParams);
                    var sources = keys.map(function(key, index) {
                        var _a;

                        return (
                            (_a = {}),
                            (_a[key.name] = match && match[index + 1]),
                            _a
                        );
                    });
                    return Object.assign.apply(Object, [{}].concat(sources));
                }

                function findQueryParams(input, init) {
                    return parse_1(extract_1(findRequestUrl(input, init)));
                }

                function findBody(input, init) {
                    if (!init) {
                        return undefined;
                    }

                    try {
                        return JSON.parse(init.body);
                    } catch (e) {
                        return init.body;
                    }
                }

                function toMockHandlerFunction(handler) {
                    if (typeof handler === 'function') {
                        return function(args) {
                            return new Promise(function(resolve, reject) {
                                var result = handler(args);
                                var isPromise = testPromise(result);

                                if (isPromise) {
                                    resolve(result);
                                } else {
                                    var response = {
                                        body: JSON.stringify(result),
                                    };
                                    resolve(response);
                                }
                            });
                        };
                    } else {
                        return ResponseUtils.json(handler);
                    }
                }

                var pathToRegex$1 = __webpack_require__(
                    /*! path-to-regexp */ './node_modules/yet-another-fetch-mock/node_modules/path-to-regexp/index.js'
                );

                var heuristics = [/\?\w=\w/, /\&\w=\w/, /\?\w$/, /\&\w$/];

                function containsQueryParams(matcherUrl) {
                    if (matcherUrl.includes('?')) {
                        return heuristics.some(function(heuristic) {
                            return heuristic.test(matcherUrl);
                        });
                    }

                    return false;
                }

                function httpMethodHelper(matcherUrl, httpMethod) {
                    if (typeof matcherUrl === 'string') {
                        return MatcherUtils.combine(
                            MatcherUtils.method(httpMethod),
                            MatcherUtils.url(matcherUrl)
                        );
                    } else {
                        throw new Error(
                            'Unknown type of matcherUrl: ' + typeof matcherUrl
                        );
                    }
                }

                var MatcherUtils =
                    /** @class */
                    (function() {
                        function MatcherUtils() {}

                        MatcherUtils.combine = function() {
                            var matchers = [];

                            for (var _i = 0; _i < arguments.length; _i++) {
                                matchers[_i] = arguments[_i];
                            }

                            return {
                                test: function test(input, init) {
                                    return matchers.reduce(function(
                                        status,
                                        matcher
                                    ) {
                                        return (
                                            status && matcher.test(input, init)
                                        );
                                    },
                                    Boolean(true));
                                },
                                matcherUrl: matchers
                                    .map(function(matcher) {
                                        return matcher.matcherUrl;
                                    })
                                    .find(function(url) {
                                        return !!url;
                                    }),
                            };
                        };

                        MatcherUtils.method = function(httpMethod) {
                            return {
                                test: function test(input, init) {
                                    return (
                                        httpMethod ===
                                        findRequestMethod(
                                            input,
                                            init
                                        ).toUpperCase()
                                    );
                                },
                            };
                        };

                        MatcherUtils.url = function(matcherUrl) {
                            if (containsQueryParams(matcherUrl)) {
                                console.warn(
                                    (
                                        "\nMatching url '" +
                                        matcherUrl +
                                        "' seems to contain queryparameters.\nThis is unfortunatly not supported due to a limitation in the matching library.\n\nIf the mock-response is dependent on the queryparameter you must use the following;\n\nmock.get('/path-without-queryparam', ({ queryParams }) => {\n  if (queryParams.paramName === 'paramValue') {\n    return mockDataGivenParam;\n  }\n  return mockDataWithoutParam;\n});\n      "
                                    ).trim()
                                );
                            }

                            return {
                                test: function test(input, init) {
                                    if (matcherUrl === '*') {
                                        return true;
                                    }

                                    var url = findRequestUrl(input, init);
                                    var urlWithoutQueryParams = url.split(
                                        '?'
                                    )[0];
                                    var keys = [];
                                    var matcherRegex = pathToRegex$1(
                                        matcherUrl,
                                        keys
                                    );
                                    var match = matcherRegex.exec(
                                        urlWithoutQueryParams
                                    );
                                    return !!match;
                                },
                                matcherUrl: matcherUrl,
                            };
                        };

                        MatcherUtils.get = function(matcherUrl) {
                            return httpMethodHelper(matcherUrl, 'GET');
                        };

                        MatcherUtils.post = function(matcherUrl) {
                            return httpMethodHelper(matcherUrl, 'POST');
                        };

                        MatcherUtils.put = function(matcherUrl) {
                            return httpMethodHelper(matcherUrl, 'PUT');
                        };

                        MatcherUtils.del = function(matcherUrl) {
                            return httpMethodHelper(matcherUrl, 'DELETE');
                        };

                        return MatcherUtils;
                    })();

                var defaultFailure = {
                    status: 500,
                    statusText: 'Internal server error',
                };

                var MiddlewareUtils =
                    /** @class */
                    (function() {
                        function MiddlewareUtils() {}

                        MiddlewareUtils.combine = function() {
                            var middlewares = [];

                            for (var _i = 0; _i < arguments.length; _i++) {
                                middlewares[_i] = arguments[_i];
                            }

                            return function(request, response) {
                                return middlewares.reduce(function(
                                    currentResponse,
                                    middleware
                                ) {
                                    return currentResponse.then(function(resp) {
                                        return middleware(request, resp);
                                    });
                                },
                                Promise.resolve(response));
                            };
                        };

                        MiddlewareUtils.delayMiddleware = function(delayMs) {
                            return function(request, response) {
                                return new Promise(function(resolve) {
                                    setTimeout(function() {
                                        return resolve(response);
                                    }, delayMs);
                                });
                            };
                        };

                        MiddlewareUtils.failurerateMiddleware = function(
                            probabilityOfFailure,
                            failure
                        ) {
                            if (failure === void 0) {
                                failure = defaultFailure;
                            }

                            return function(request, response) {
                                return new Promise(function(resolve) {
                                    var rnd = Math.random();

                                    if (rnd < probabilityOfFailure) {
                                        resolve(failure);
                                    } else {
                                        resolve(response);
                                    }
                                });
                            };
                        };

                        MiddlewareUtils.loggingMiddleware = function() {
                            return function(request, response) {
                                // tslint:disable
                                console.groupCollapsed(
                                    request.method + ' ' + request.url
                                );
                                console.groupCollapsed('config');
                                console.log('queryParams', request.queryParams);
                                console.log('pathParams', request.pathParams);
                                console.log('body', request.body);

                                if (request.init) {
                                    console.log('header', request.init.headers);
                                }

                                console.groupEnd();

                                try {
                                    console.log(
                                        'response',
                                        JSON.parse(response.body)
                                    );
                                } catch (e) {
                                    console.log('response', response);
                                }

                                console.groupEnd(); // tslint:enable

                                return response;
                            };
                        };

                        return MiddlewareUtils;
                    })();

                var allMatcher = {
                    test: function test(input, init) {
                        return true;
                    },
                };

                var SpyMiddleware =
                    /** @class */
                    (function() {
                        function SpyMiddleware() {
                            this.middleware = this.middleware.bind(this);
                            this.entries = [];
                        }

                        SpyMiddleware.prototype.middleware = function(
                            request,
                            response
                        ) {
                            var entry = {
                                request: request,
                                response: response,
                            };
                            this.entries.unshift(entry);
                            return response;
                        };

                        SpyMiddleware.prototype.reset = function() {
                            this.entries = [];
                        };

                        SpyMiddleware.prototype.calls = function(matcher) {
                            if (matcher === void 0) {
                                matcher = allMatcher;
                            }

                            return this.entries.filter(function(entry) {
                                return matcher.test(
                                    entry.request.input,
                                    entry.request.init
                                );
                            });
                        };

                        SpyMiddleware.prototype.lastCall = function(matcher) {
                            if (matcher === void 0) {
                                matcher = allMatcher;
                            }

                            return this.entries.find(function(entry) {
                                return matcher.test(
                                    entry.request.input,
                                    entry.request.init
                                );
                            });
                        };

                        SpyMiddleware.prototype.called = function(matcher) {
                            if (matcher === void 0) {
                                matcher = allMatcher;
                            }

                            return this.lastCall(matcher) !== undefined;
                        };

                        SpyMiddleware.prototype.lastUrl = function(matcher) {
                            if (matcher === void 0) {
                                matcher = allMatcher;
                            }

                            var lastCalled = this.lastCall(matcher);
                            return lastCalled
                                ? lastCalled.request.input
                                : undefined;
                        };

                        SpyMiddleware.prototype.lastOptions = function(
                            matcher
                        ) {
                            if (matcher === void 0) {
                                matcher = allMatcher;
                            }

                            var lastCalled = this.lastCall(matcher);
                            return lastCalled
                                ? lastCalled.request.init
                                : undefined;
                        };

                        SpyMiddleware.prototype.size = function() {
                            return this.entries.length;
                        };

                        return SpyMiddleware;
                    })();

                var defaultConfiguration = {
                    enableFallback: true,
                    ignoreMiddlewareIfFallback: false,
                    middleware: function middleware(request, response) {
                        return response;
                    },
                };

                var FetchMock =
                    /** @class */
                    (function() {
                        function FetchMock(scope, configuration) {
                            this.scope = scope;
                            this.configuration = Object.assign(
                                {},
                                defaultConfiguration,
                                configuration
                            );
                            this.realFetch = scope.fetch;
                            this.routes = [];
                            this.scope.fetch = this.fetchproxy.bind(this);
                        }

                        FetchMock.configure = function(configuration) {
                            if (configuration === void 0) {
                                configuration = defaultConfiguration;
                            }

                            return new FetchMock(window, configuration);
                        };

                        FetchMock.prototype.restore = function() {
                            this.scope.fetch = this.realFetch;
                        };

                        FetchMock.prototype.get = function(url, handler) {
                            this.mock(MatcherUtils.get(url), handler);
                        };

                        FetchMock.prototype.post = function(url, handler) {
                            this.mock(MatcherUtils.post(url), handler);
                        };

                        FetchMock.prototype.delete = function(url, handler) {
                            this.mock(MatcherUtils.del(url), handler);
                        };

                        FetchMock.prototype.put = function(url, handler) {
                            this.mock(MatcherUtils.put(url), handler);
                        };

                        FetchMock.prototype.mock = function(matcher, handler) {
                            this.routes.push({
                                matcher: matcher,
                                handler: toMockHandlerFunction(handler),
                            });
                        };

                        FetchMock.prototype.reset = function() {
                            this.routes = [];
                        };

                        FetchMock.prototype.fetchproxy = function(input, init) {
                            var _this = this;

                            var matchingRoute = this.findMatchingRoute(
                                input,
                                init
                            );
                            var url = findRequestUrl(input, init);
                            var method = findRequestMethod(input, init);
                            var queryParams = findQueryParams(url);
                            var body = findBody(input, init);
                            var pathParams = {};
                            var response;

                            if (typeof matchingRoute === 'undefined') {
                                if (this.configuration.enableFallback) {
                                    console.warn(
                                        'Did not find any matching route for: ' +
                                            method.toUpperCase() +
                                            ' ' +
                                            url +
                                            '. Defaulting to the real fetch-implementation.'
                                    );
                                    response = this.realFetch.call(
                                        this.scope,
                                        input,
                                        init
                                    );

                                    if (
                                        this.configuration
                                            .ignoreMiddlewareIfFallback
                                    ) {
                                        return response;
                                    }
                                } else {
                                    throw new Error(
                                        'Did not find any matching route for: ' +
                                            method.toUpperCase() +
                                            ' ' +
                                            url +
                                            '.'
                                    );
                                }
                            } else {
                                pathParams = findPathParams(
                                    url,
                                    matchingRoute.matcher.matcherUrl
                                );
                                response = matchingRoute.handler({
                                    input: input,
                                    init: init,
                                    url: url,
                                    method: method,
                                    pathParams: pathParams,
                                    queryParams: queryParams,
                                    body: body,
                                });
                            }

                            return response
                                .then(function(resp) {
                                    return _this.configuration.middleware(
                                        {
                                            input: input,
                                            init: init,
                                            url: url,
                                            method: method,
                                            queryParams: queryParams,
                                            pathParams: pathParams,
                                            body: body,
                                        },
                                        resp
                                    );
                                })
                                .then(function(_a) {
                                    var body = _a.body,
                                        _b = _a.status,
                                        status = _b === void 0 ? 200 : _b,
                                        _c = _a.statusText,
                                        statusText = _c === void 0 ? 'OK' : _c,
                                        _d = _a.headers,
                                        headers = _d === void 0 ? {} : _d;
                                    return new Response(body, {
                                        status: status,
                                        statusText: statusText,
                                        headers: headers,
                                    });
                                });
                        };

                        FetchMock.prototype.findMatchingRoute = function(
                            input,
                            init
                        ) {
                            return this.routes.find(function(route) {
                                return route.matcher.test(input, init);
                            });
                        };

                        return FetchMock;
                    })();

                /* harmony default export */ __webpack_exports__[
                    'default'
                ] = FetchMock;

                /***/
            },

        /***/ './node_modules/yet-another-fetch-mock/node_modules/path-to-regexp/index.js':
            /*!**********************************************************************************!*\
  !*** ./node_modules/yet-another-fetch-mock/node_modules/path-to-regexp/index.js ***!
  \**********************************************************************************/
            /*! no static exports found */
            /***/ function(module, exports) {
                /**
                 * Expose `pathToRegexp`.
                 */
                module.exports = pathToRegexp;
                module.exports.parse = parse;
                module.exports.compile = compile;
                module.exports.tokensToFunction = tokensToFunction;
                module.exports.tokensToRegExp = tokensToRegExp;
                /**
                 * Default configs.
                 */

                var DEFAULT_DELIMITER = '/';
                var DEFAULT_DELIMITERS = './';
                /**
                 * The main path matching regexp utility.
                 *
                 * @type {RegExp}
                 */

                var PATH_REGEXP = new RegExp(
                    [
                        // Match escaped characters that would otherwise appear in future matches.
                        // This allows the user to escape special characters that won't transform.
                        '(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
                        // and optional suffixes. Matches appear as:
                        //
                        // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
                        // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
                        '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?',
                    ].join('|'),
                    'g'
                );
                /**
                 * Parse a string for the raw tokens.
                 *
                 * @param  {string}  str
                 * @param  {Object=} options
                 * @return {!Array}
                 */

                function parse(str, options) {
                    var tokens = [];
                    var key = 0;
                    var index = 0;
                    var path = '';
                    var defaultDelimiter =
                        (options && options.delimiter) || DEFAULT_DELIMITER;
                    var delimiters =
                        (options && options.delimiters) || DEFAULT_DELIMITERS;
                    var pathEscaped = false;
                    var res;

                    while ((res = PATH_REGEXP.exec(str)) !== null) {
                        var m = res[0];
                        var escaped = res[1];
                        var offset = res.index;
                        path += str.slice(index, offset);
                        index = offset + m.length; // Ignore already escaped sequences.

                        if (escaped) {
                            path += escaped[1];
                            pathEscaped = true;
                            continue;
                        }

                        var prev = '';
                        var next = str[index];
                        var name = res[2];
                        var capture = res[3];
                        var group = res[4];
                        var modifier = res[5];

                        if (!pathEscaped && path.length) {
                            var k = path.length - 1;

                            if (delimiters.indexOf(path[k]) > -1) {
                                prev = path[k];
                                path = path.slice(0, k);
                            }
                        } // Push the current path onto the tokens.

                        if (path) {
                            tokens.push(path);
                            path = '';
                            pathEscaped = false;
                        }

                        var partial =
                            prev !== '' && next !== undefined && next !== prev;
                        var repeat = modifier === '+' || modifier === '*';
                        var optional = modifier === '?' || modifier === '*';
                        var delimiter = prev || defaultDelimiter;
                        var pattern = capture || group;
                        tokens.push({
                            name: name || key++,
                            prefix: prev,
                            delimiter: delimiter,
                            optional: optional,
                            repeat: repeat,
                            partial: partial,
                            pattern: pattern
                                ? escapeGroup(pattern)
                                : '[^' + escapeString(delimiter) + ']+?',
                        });
                    } // Push any remaining characters.

                    if (path || index < str.length) {
                        tokens.push(path + str.substr(index));
                    }

                    return tokens;
                }
                /**
                 * Compile a string to a template function for the path.
                 *
                 * @param  {string}             str
                 * @param  {Object=}            options
                 * @return {!function(Object=, Object=)}
                 */

                function compile(str, options) {
                    return tokensToFunction(parse(str, options));
                }
                /**
                 * Expose a method for transforming tokens into the path function.
                 */

                function tokensToFunction(tokens) {
                    // Compile all the tokens into regexps.
                    var matches = new Array(tokens.length); // Compile all the patterns before compilation.

                    for (var i = 0; i < tokens.length; i++) {
                        if (typeof tokens[i] === 'object') {
                            matches[i] = new RegExp(
                                '^(?:' + tokens[i].pattern + ')$'
                            );
                        }
                    }

                    return function(data, options) {
                        var path = '';
                        var encode =
                            (options && options.encode) || encodeURIComponent;

                        for (var i = 0; i < tokens.length; i++) {
                            var token = tokens[i];

                            if (typeof token === 'string') {
                                path += token;
                                continue;
                            }

                            var value = data ? data[token.name] : undefined;
                            var segment;

                            if (Array.isArray(value)) {
                                if (!token.repeat) {
                                    throw new TypeError(
                                        'Expected "' +
                                            token.name +
                                            '" to not repeat, but got array'
                                    );
                                }

                                if (value.length === 0) {
                                    if (token.optional) continue;
                                    throw new TypeError(
                                        'Expected "' +
                                            token.name +
                                            '" to not be empty'
                                    );
                                }

                                for (var j = 0; j < value.length; j++) {
                                    segment = encode(value[j], token);

                                    if (!matches[i].test(segment)) {
                                        throw new TypeError(
                                            'Expected all "' +
                                                token.name +
                                                '" to match "' +
                                                token.pattern +
                                                '"'
                                        );
                                    }

                                    path +=
                                        (j === 0
                                            ? token.prefix
                                            : token.delimiter) + segment;
                                }

                                continue;
                            }

                            if (
                                typeof value === 'string' ||
                                typeof value === 'number' ||
                                typeof value === 'boolean'
                            ) {
                                segment = encode(String(value), token);

                                if (!matches[i].test(segment)) {
                                    throw new TypeError(
                                        'Expected "' +
                                            token.name +
                                            '" to match "' +
                                            token.pattern +
                                            '", but got "' +
                                            segment +
                                            '"'
                                    );
                                }

                                path += token.prefix + segment;
                                continue;
                            }

                            if (token.optional) {
                                // Prepend partial segment prefixes.
                                if (token.partial) path += token.prefix;
                                continue;
                            }

                            throw new TypeError(
                                'Expected "' +
                                    token.name +
                                    '" to be ' +
                                    (token.repeat ? 'an array' : 'a string')
                            );
                        }

                        return path;
                    };
                }
                /**
                 * Escape a regular expression string.
                 *
                 * @param  {string} str
                 * @return {string}
                 */

                function escapeString(str) {
                    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
                }
                /**
                 * Escape the capturing group by escaping special characters and meaning.
                 *
                 * @param  {string} group
                 * @return {string}
                 */

                function escapeGroup(group) {
                    return group.replace(/([=!:$/()])/g, '\\$1');
                }
                /**
                 * Get the flags for a regexp from the options.
                 *
                 * @param  {Object} options
                 * @return {string}
                 */

                function flags(options) {
                    return options && options.sensitive ? '' : 'i';
                }
                /**
                 * Pull out keys from a regexp.
                 *
                 * @param  {!RegExp} path
                 * @param  {Array=}  keys
                 * @return {!RegExp}
                 */

                function regexpToRegexp(path, keys) {
                    if (!keys) return path; // Use a negative lookahead to match only capturing groups.

                    var groups = path.source.match(/\((?!\?)/g);

                    if (groups) {
                        for (var i = 0; i < groups.length; i++) {
                            keys.push({
                                name: i,
                                prefix: null,
                                delimiter: null,
                                optional: false,
                                repeat: false,
                                partial: false,
                                pattern: null,
                            });
                        }
                    }

                    return path;
                }
                /**
                 * Transform an array into a regexp.
                 *
                 * @param  {!Array}  path
                 * @param  {Array=}  keys
                 * @param  {Object=} options
                 * @return {!RegExp}
                 */

                function arrayToRegexp(path, keys, options) {
                    var parts = [];

                    for (var i = 0; i < path.length; i++) {
                        parts.push(pathToRegexp(path[i], keys, options).source);
                    }

                    return new RegExp(
                        '(?:' + parts.join('|') + ')',
                        flags(options)
                    );
                }
                /**
                 * Create a path regexp from string input.
                 *
                 * @param  {string}  path
                 * @param  {Array=}  keys
                 * @param  {Object=} options
                 * @return {!RegExp}
                 */

                function stringToRegexp(path, keys, options) {
                    return tokensToRegExp(parse(path, options), keys, options);
                }
                /**
                 * Expose a function for taking tokens and returning a RegExp.
                 *
                 * @param  {!Array}  tokens
                 * @param  {Array=}  keys
                 * @param  {Object=} options
                 * @return {!RegExp}
                 */

                function tokensToRegExp(tokens, keys, options) {
                    options = options || {};
                    var strict = options.strict;
                    var start = options.start !== false;
                    var end = options.end !== false;
                    var delimiter = escapeString(
                        options.delimiter || DEFAULT_DELIMITER
                    );
                    var delimiters = options.delimiters || DEFAULT_DELIMITERS;
                    var endsWith = []
                        .concat(options.endsWith || [])
                        .map(escapeString)
                        .concat('$')
                        .join('|');
                    var route = start ? '^' : '';
                    var isEndDelimited = tokens.length === 0; // Iterate over the tokens and create our regexp string.

                    for (var i = 0; i < tokens.length; i++) {
                        var token = tokens[i];

                        if (typeof token === 'string') {
                            route += escapeString(token);
                            isEndDelimited =
                                i === tokens.length - 1 &&
                                delimiters.indexOf(token[token.length - 1]) >
                                    -1;
                        } else {
                            var capture = token.repeat
                                ? '(?:' +
                                  token.pattern +
                                  ')(?:' +
                                  escapeString(token.delimiter) +
                                  '(?:' +
                                  token.pattern +
                                  '))*'
                                : token.pattern;
                            if (keys) keys.push(token);

                            if (token.optional) {
                                if (token.partial) {
                                    route +=
                                        escapeString(token.prefix) +
                                        '(' +
                                        capture +
                                        ')?';
                                } else {
                                    route +=
                                        '(?:' +
                                        escapeString(token.prefix) +
                                        '(' +
                                        capture +
                                        '))?';
                                }
                            } else {
                                route +=
                                    escapeString(token.prefix) +
                                    '(' +
                                    capture +
                                    ')';
                            }
                        }
                    }

                    if (end) {
                        if (!strict) route += '(?:' + delimiter + ')?';
                        route +=
                            endsWith === '$' ? '$' : '(?=' + endsWith + ')';
                    } else {
                        if (!strict)
                            route +=
                                '(?:' + delimiter + '(?=' + endsWith + '))?';
                        if (!isEndDelimited)
                            route += '(?=' + delimiter + '|' + endsWith + ')';
                    }

                    return new RegExp(route, flags(options));
                }
                /**
                 * Normalize the given path string, returning a regular expression.
                 *
                 * An empty array can be passed in for the keys, which will hold the
                 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
                 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
                 *
                 * @param  {(string|RegExp|Array)} path
                 * @param  {Array=}                keys
                 * @param  {Object=}               options
                 * @return {!RegExp}
                 */

                function pathToRegexp(path, keys, options) {
                    if (path instanceof RegExp) {
                        return regexpToRegexp(path, keys);
                    }

                    if (Array.isArray(path)) {
                        return arrayToRegexp(
                            /** @type {!Array} */
                            path,
                            keys,
                            options
                        );
                    }

                    return stringToRegexp(
                        /** @type {string} */
                        path,
                        keys,
                        options
                    );
                }

                /***/
            },
    },
]);
//# sourceMappingURL=1.js.map

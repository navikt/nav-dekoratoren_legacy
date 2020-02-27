(window.webpackJsonp = window.webpackJsonp || []).push([
    [2],
    {
        503: function(n, e, a) {
            'use strict';
            a.r(e);
            var s = a(54),
                l = a.n(s),
                t = a(83),
                i = {
                    authenticated: !0,
                    name: 'OLE NORMANN',
                    securityLevel: '4',
                },
                r = {
                    uleste: 2,
                    antall: 13,
                    nyesteId: 33475442,
                    varsler:
                        '<div class="panel nav-varsler">\n           <ul class="varsel-liste ustilet">\n                   <li class="varsel-container">\n                           <section class="varsel">\n                                   <span class="varsel-ikon hide-text alarm">alarm-ikon</span>\n                                   <div class="varsel-innhold">\n                                           <p class="typo-normal-liten varsel-dato">12. juni 2019 kl 10:47</p>\n                                           <p class="typo-infotekst">Ny melding i din aktivitetsplan</p>\n                                           <a class="varsel-lenke typo-normal-liten" href="https://tjenester.nav.no/aktivitetsplan/">                           Gå til meldingen</a>\n                                   </div>\n                           </section>\n                   </li>\n                   <li class="varsel-container">\n                           <section class="varsel">\n                                   <span class="varsel-ikon hide-text boble">snakkeboble-ikon</span>\n                                   <div class="varsel-innhold">\n                                           <p class="typo-normal-liten varsel-dato">20. mars 2019 kl 14:30</p>\n                                           <p class="typo-infotekst">Du har fått et spørsmål fra NAV</p>\n                                           <a class="varsel-lenke typo-normal-liten" href="https://tjenester.nav.no/mininnboks/traad/1000MU9LJ">                           Se meldingen</a>\n                                   </div>\n                           </section>\n                   </li>\n                   <li class="varsel-container">\n                           <section class="varsel">\n                                   <span class="varsel-ikon hide-text digisyfo">plaster-ikon</span>\n                                   <div class="varsel-innhold">\n                                           <p class="typo-normal-liten varsel-dato">20. mars 2019 kl 10:22</p>\n                                           <p class="typo-infotekst">Du har fått et spørsmål fra NAV</p>\n                                           <a class="varsel-lenke typo-normal-liten" href="https://tjenester.nav.no/mininnboks/traad/1000MU9LJ">                           Se meldingen</a>\n                                   </div>\n                           </section>\n                   </li>\n                   <li class="varsel-container">\n                           <section class="varsel">\n                                   <span class="varsel-ikon hide-text dokument">dokument-ikon</span>\n                                   <div class="varsel-innhold">\n                                           <p class="typo-normal-liten varsel-dato">15. januar 2019 kl 07:22</p>\n                                           <p class="typo-infotekst">Vi minner om at du har fått årsoppgave fra NAV over dine utbetalinger og trekk i 2018                       </p>\n                                           <a class="varsel-lenke typo-normal-liten"                           href="https://tjenester.nav.no/innloggingsinfo/type/dokument/varselid/ad207f2f-c21d-4dc4-817a-b47dd75613d2">                          Gå til dokumentet</a>\n                                   </div>\n                           </section>\n                   </li>\n                   <li class="varsel-container">\n                           <section class="varsel">\n                               <span class="varsel-ikon hide-text kalender">kalender-ikon</span>\n                               <div class="varsel-innhold">\n                                       <p class="typo-normal-liten varsel-dato">08. januar 2019 kl 22:55</p>\n                                       <p class="typo-infotekst">Du har fått årsoppgave fra NAV over dine utbetalinger og trekk i 2018                       </p>\n                                       <a class="varsel-lenke typo-normal-liten"                            href="https://tjenester.nav.no/innloggingsinfo/type/dokument/varselid/ad207f2f-c21d-4dc4-817a-b47dd75613d2">                           Gå til dokumentet</a>\n                               </div>\n                           </section>\n                   </li>\n           </ul>\n    </div>',
                },
                o = a(502),
                c = a(5);
            a.d(e, 'setUpMock', function() {
                return d;
            });
            var d = (function() {
                var n = Object(t.a)(
                    l.a.mark(function n() {
                        var e, a;
                        return l.a.wrap(function(n) {
                            for (;;)
                                switch ((n.prev = n.next)) {
                                    case 0:
                                        (e = function(n, e) {
                                            return e;
                                        }),
                                            (a = o.b.configure({
                                                enableFallback: !0,
                                                ignoreMiddlewareIfFallback: !0,
                                                middleware: o.a.combine(
                                                    o.a.delayMiddleware(0),
                                                    o.a.failurerateMiddleware(
                                                        0
                                                    ),
                                                    e
                                                ),
                                            })),
                                            console.log('Mock data enabled'),
                                            a.get(c.a.innloggingslinjenUrl, i),
                                            a.get(
                                                ''.concat(
                                                    c.a.varselinnboksUrl,
                                                    '/varsler(.*)'
                                                ),
                                                r
                                            ),
                                            a.post(
                                                ''.concat(
                                                    c.a.varselinnboksUrl,
                                                    '/rest/varsel/erles/33475442'
                                                ),
                                                function(n) {
                                                    return n.body;
                                                }
                                            );
                                    case 6:
                                    case 'end':
                                        return n.stop();
                                }
                        }, n);
                    })
                );
                return function() {
                    return n.apply(this, arguments);
                };
            })();
        },
    },
]);
//# sourceMappingURL=2.js.map

if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,r,n)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return i;case"module":return c;default:return e(s)}}))).then((e=>{const s=n(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/156.4f3a583219c3aebaefea.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/240-f288a5611532841a9172.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/242-9d90f5b9390b3a5bcf0d.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/2b7b2d2a-9979693a33054d10d3ae.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/344-4305607a8efd9206535c.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/35fc8c20.75ede19bca745b6dbb3e.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/453-f2eee9af197b345c1df1.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/476-507ab38e18fd7e48818a.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/499-90a8ecd9afdc1661717d.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/523-23f1a02c272e8d1e974f.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/591-340b9c6aaa22b03713fe.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/594-83031af7bdf664fbaeed.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/667-63be578d84028d0182a8.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/744-dc31c38262bf8ab5974f.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/752-cd8e61eea6bfbfec7ad4.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/75fc9c18-84e7ab66c7989b7a8b6f.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/939-c3121a6c5aa12996374b.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/framework-3af989d3dbeb77832f99.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/main-e708eca5cc3ea6329c5c.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/_app-5eb291f051547ddcf489.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/_error-ea939aab753d9e9db3bd.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/announcement-fdc3654d0adf761c8f29.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/employee-f917df0e05b4a218ed83.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/employee/%5Bid%5D-843c2ba4826bfd743613.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/employee/%5Bid%5D/edit-2111b366800d1435ab54.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/employee/add-243a13f61f04f7596f8b.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/feedbacks-42d7833acdbabf184da7.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/index-3e60a5c83152ce6dfb55.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/login-26bed6d4cbb4029dfbe6.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/me-0e532ba34be8746fbeca.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/print-ac2cd88348521d1e25d9.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/print-card-35e2e8f281c3ab2ed7f2.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/print-card/%5Bid%5D-482f80824af2ebd6249a.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/print/%5Bid%5D-2c247d6826dcc15ce5ff.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/report-b11eabd48d05a58057e3.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/setting-39778d65480519ed4bd6.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/pages/settings-ccca2ca5e61af36c9c00.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/chunks/webpack-38e1fe0f414c4d2b3892.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/1c51de0a1ca503254717.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/1d013461e45e73546f32.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/1d64bacb9fbece226626.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/442ef2e24d131b312e68.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/4e7a25806996dfee7fbc.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/7ccdd68e532534a06ff9.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/9b12b5797a1eabe6b36d.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/c2bdc7c8be99b82b2f07.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/css/ccbc5f5566439b1cbee4.css",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/i25vwoCIrKouGLWOOjEwR/_buildManifest.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/i25vwoCIrKouGLWOOjEwR/_ssgManifest.js",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/_next/static/image/public/hello.8356a20f43382dc1bab2f4926970571f.png",revision:"i25vwoCIrKouGLWOOjEwR"},{url:"/addUser.png",revision:"fcd5c496041dd4cc3ed14b868236f9bb"},{url:"/announcement.png",revision:"daa655bdf8f0a1ffd342c9bd7c2cd716"},{url:"/attachment.png",revision:"a91be5f859c52a269d8769f88a90af03"},{url:"/card/frontcard.jpg",revision:"55caaeb8022e0fa3dc86b555e540360f"},{url:"/card/logo.png",revision:"fe9463dfc71b63c76eed4e65f30b2f19"},{url:"/card/nation.png",revision:"a4759c89629374e9231bc0e032b63fcb"},{url:"/card/qrcode.png",revision:"dec30774e10b1c744968a5e314bcd2c4"},{url:"/card/user.png",revision:"d39f7489e15b114663d54785a9146f6a"},{url:"/education.png",revision:"833b9117b58091bfe0380968ac98ca98"},{url:"/family.png",revision:"3d2af2eb2ecd6676da8cf217add89d7d"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/follow.png",revision:"fcd5c496041dd4cc3ed14b868236f9bb"},{url:"/fonts/tacteng.ttf",revision:"f40cb87f7112b9805bfcd049489ae2f3"},{url:"/hello.png",revision:"0b3c17e2c96824ce6b2fead76da14c63"},{url:"/home.png",revision:"b81631f8b34674e5d1df884d2589a2dd"},{url:"/home/typer.png",revision:"8c16c61b2150174e2347c156fed281fc"},{url:"/icon-192x192.png",revision:"0abd6d90222fad682e08cff840ba4e0b"},{url:"/icon-256x256.png",revision:"5b8e7c656dd9526c18563e72f7c7cc1a"},{url:"/icon-384x384.png",revision:"b0ce018c8802668593fc021a72de9a20"},{url:"/icon-512x512.png",revision:"93ea4cd4226744a95eeddbc321522c8c"},{url:"/js/auth.js",revision:"9412bda246406f7b7c386585c77f7205"},{url:"/logo.png",revision:"fe9463dfc71b63c76eed4e65f30b2f19"},{url:"/manifest.json",revision:"ce9ffd47cc5e3c6454c9fda8c7fb04f8"},{url:"/noImg.jpg",revision:"4ce3799c2579cd734989cb6a3f9d0baf"},{url:"/pdftest.pdf",revision:"255ac69fa887b3aeff35e0679e76adc3"},{url:"/penalty.png",revision:"c31496ba03e1db902c674c8f20fa2023"},{url:"/praise.png",revision:"d0d552b6150fa5f8818398523ad81d6b"},{url:"/printer.png",revision:"ad409be74beda1896e46562f4809e362"},{url:"/rank.png",revision:"2f3a8d7954fbf71c4be4c8cc95e5a538"},{url:"/setting.png",revision:"05c7eb549ee123bebbdabf3b91dc2dc7"},{url:"/sider/login.png",revision:"bda0fd60ea079bd4d4cbe69b8c66d0ed"},{url:"/sider/logout.png",revision:"3b704aed559f5e98d2174d240cae343d"},{url:"/status.png",revision:"153ec495dfc4649e55d0093d60323ebf"},{url:"/team.png",revision:"f1d7f9c998d5fe1e24313c33c0305233"},{url:"/uploads/img-profile/60526a89fad4f524788e5fb4.jpg",revision:"078509b9eff48cf2907b380ad11c22d9"},{url:"/user.png",revision:"47305402a5e102588c9946a65939438a"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"},{url:"/work.png",revision:"64d926da8f0bfe8ba6fb2efdd0d54ed4"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));

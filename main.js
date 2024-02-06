(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{A:()=>H});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"4fb1401a-9b46-4a10-9f7d-58bd05780dd6","Content-Type":"application/json"}},r=document.querySelector("#card-template").content;function n(e,t,n,o,c,a){var u=r.cloneNode(!0),i=u.querySelector(".card__delete-button"),s=u.querySelector(".card"),l=u.querySelector(".card__like-button"),d=u.querySelector(".card__image"),p=u.querySelector(".card__like-number"),f=e.likes.some((function(e){return e._id===a}));return u.querySelector(".card__title").textContent=e.name,u.querySelector(".card__image").src=e.link,u.querySelector(".card__image").alt=e.name,f?l.classList.add("card__like-button_is-active"):l.classList.remove("card__like-button_is-active"),p.textContent=e.likes.length,s.dataset.cardId=e._id,e.owner._id===a?(i.id=e._id,i.addEventListener("click",(function(){return c(s)}))):i.remove(),l.addEventListener("click",(function(){return n(s)})),d.addEventListener("click",(function(){return o(e)})),u}function o(e){var r,n=document.querySelector('[data-card-id="'+e+'"]');(r=e,fetch("".concat(t.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){n.remove()})).catch((function(e){return console.error("Не удалось удалить карту ".concat(e))}))}function c(e){var r,n=e.querySelector(".card__like-button"),o=e.querySelector(".card__like-number");n.classList.contains("card__like-button_is-active")?(r=e.dataset.cardId,fetch("".concat(t.baseUrl,"/cards/").concat(r,"/likes"),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){n.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.error("Не удалось удалить лайк ".concat(e))})):function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e.dataset.cardId).then((function(e){n.classList.toggle("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.error("Не удалось добавить лайк ".concat(e))}))}function a(e){e.classList.add("popup_is-opened"),e.addEventListener("click",s),document.addEventListener("keydown",i)}function u(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",s),document.removeEventListener("keydown",i)}function i(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function s(e){var t=document.querySelector(".popup_is-opened");(e.currentTarget===e.target||e.target.classList.contains("popup__close"))&&u(t)}var l=function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(H.inputErrorClass),r.classList.remove(H.errorClass),r.textContent=""},d=function(e,t){p(e)?t.classList.add(H.inactiveButtonClass):t.classList.remove(H.inactiveButtonClass)},p=function(e){return e.some((function(e){return!e.validity.valid}))},f=function(e){var t=Array.from(e.querySelectorAll(H.inputSelector)),r=e.querySelector(H.submitButtonSelector);t.forEach((function(t){l(e,t)})),d(t,r)};function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var m=document.querySelector(".places__list"),v=document.querySelector(".profile__image"),y=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),S=null;Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,r,o=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,s=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],u=o[1];S=a._id,v.style.backgroundImage="url("+a.avatar+")",y.textContent=a.name,h.textContent=a.about,u.forEach((function(e){m.append(n(e,0,c,q,N,S))}))})).catch((function(e){return console.error("Ошибка получения данных по карточкам и профилю",e)}));var b=document.querySelector(".popup_type_image");function q(e){b.querySelector(".popup__caption").textContent=e.name,b.querySelector(".popup__image").src=e.link,b.querySelector(".popup__image").alt=e.name,a(b)}var k=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_edit");k.addEventListener("click",(function(){var e=document.querySelector(".popup__input_type_name"),t=document.querySelector(".popup__input_type_description");e.value=document.querySelector(".profile__title").textContent,t.value=document.querySelector(".profile__description").textContent,f(x),a(g)}));var L=document.querySelector(".profile__avatar-button"),E=document.querySelector(".popup_type_avatar");function C(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";e.textContent=t?n:r}function j(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var n=t.submitter,o=n.textContent;C(n,!0,o,r),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){C(n,!1,o)}))}L.addEventListener("click",(function(){f(w),a(E)}));var x=document.forms["edit-profile"],A=x.querySelector(".popup__input_type_name"),P=x.querySelector(".popup__input_type_description");x.addEventListener("submit",(function(e){j((function(){return(e=A.value,r=P.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:e,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){y.textContent=e.name,h.textContent=e.about,u(g)}));var e,r}),e)}));var w=document.forms["edit-avatar"],I=w.querySelector(".popup__input_type_avatar");w.addEventListener("submit",(function(e){j((function(){return(e=I.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){v.style.backgroundImage="url("+e.avatar+")",u(E)}));var e}),e)}));var O=document.querySelector(".profile__add-button"),U=document.querySelector(".popup_type_new-card");O.addEventListener("click",(function(){f(T),a(U)}));var T=document.forms["new-place"],B=T.querySelector(".popup__input_type_card-name"),D=T.querySelector(".popup__input_type_url");T.addEventListener("submit",(function(e){j((function(){return(e=B.value,r=D.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:e,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){m.prepend(n(e,0,c,q,N,S)),T.reset(),u(U)}));var e,r}),e)}));var M=document.querySelector(".popup_type_delete-card");function N(e){M.querySelector(".popup__button").dataset.cardId=e.dataset.cardId,a(M)}var J=document.forms["delete-place"];J.addEventListener("submit",(function(){o(J.querySelector(".popup__button").dataset.cardId),u(M)}));var H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};Array.from(document.querySelectorAll(H.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(H.inputSelector)),r=e.querySelector(H.submitButtonSelector);d(t,r),t.forEach((function(n){n.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t):function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add(H.inputErrorClass),n.textContent=r,n.classList.add(H.errorClass)}(e,t,t.validationMessage)})(e,n),d(t,r)}))}))}(e)}))})();
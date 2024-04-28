(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",d="year",u="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:a,d:o,D:u,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",y={};y[$]=m;var g=function(t){return t instanceof D},b=function t(e,n,i){var s;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;y[a]=e,s=a}return!i&&s&&($=s),s||!i&&$},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},w=_;w.l=b,w.i=g,w.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function m(t){this.$L=b(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===h)},v.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return M(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<M(t)},v.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!w.u(e)||e,h=w.p(t),f=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},p=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(h){case d:return c?f(1,0):f(31,11);case l:return c?f(1,v):f(0,v+1);case a:var y=this.$locale().weekStart||0,g=(m<y?m+7:m)-y;return f(c?_-g:_+(6-g),v);case o:case u:return p($+"Hours",0);case r:return p($+"Minutes",1);case s:return p($+"Seconds",2);case i:return p($+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,c=w.p(t),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[u]=h+"Date",a[l]=h+"Month",a[d]=h+"FullYear",a[r]=h+"Hours",a[s]=h+"Minutes",a[i]=h+"Seconds",a[n]=h+"Milliseconds",a)[c],p=c===o?this.$D+(e-this.$W):e;if(c===l||c===d){var m=this.clone().set(u,1);m.$d[f](p),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[w.p(t)]()},v.add=function(n,c){var u,h=this;n=Number(n);var f=w.p(c),p=function(t){var e=M(h);return w.w(e.date(e.date()+Math.round(t*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===o)return p(1);if(f===a)return p(7);var m=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[f]||1,v=this.$d.getTime()+n*m;return w.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return w.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:w.s(a+1,2,"0"),MMM:d(n.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:u(1),hh:u(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:w.s(o,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,u,h){var f,p=w.p(u),m=M(n),v=(m.utcOffset()-this.utcOffset())*t,_=this-m,$=w.m(this,m);return $=(f={},f[d]=$/12,f[l]=$,f[c]=$/3,f[a]=(_-v)/6048e5,f[o]=(_-v)/864e5,f[r]=_/e,f[s]=_/t,f[i]=_/1e3,f)[p]||_,h?$:w.a($)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return y[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),S=D.prototype;return M.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",d],["$D",u]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,D,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=y[$],M.Ls=y,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:a,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},u=function(t){return t instanceof $},h=function(t,e,n){return new $(t,n,e.$l)},f=function(t){return e.p(t)+"s"},p=function(t){return t<0},m=function(t){return p(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},_=function(t,e){return t?p(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},$=function(){function p(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*d[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(c);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*d[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/a),t%=a,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/s),t%=s,this.$d.minutes=m(t/i),t%=i,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=_(n,"D"),s=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=_(o,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||a.negative,c=s.format||r.format||a.format?"T":"",d=(l?"-":"")+"P"+t.format+e.format+i.format+c+s.format+r.format+a.format;return"P"===d||"-P"===d?"P0D":d},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(i[t])}))},v.as=function(t){return this.$ms/d[f(t)]},v.get=function(t){var e=this.$ms,n=f(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/d[n]):this.$d[n],0===e?0:e},v.add=function(t,e,n){var i;return i=e?t*d[f(e)]:u(t)?t.$ms:h(t,this).$ms,h(this.$ms+i*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return h(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return h(t,{$l:n},e)},s.isDuration=u;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,e){return u(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return u(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class i{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<li class="trip-events__item"></li>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const o=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],a="HH:mm",l="DD/MM/YY HH:mm";var c=n(484),d=n.n(c),u=n(646),h=n.n(u);function f(t){return Math.floor(Math.random()*t)}d().extend(h());const p=(t,e)=>new Date(t.getTime()+Math.random()*(e.getTime()-t.getTime()));function m(){const t=()=>Math.floor(65536*Math.random()).toString(16).padStart(4,"0");return`${t()}-${t()}-${t()}-${t()}-${t()}${t()}`}function v(t,e){return t?d()(t).format(e):""}class _{constructor({point:t,offers:e,destinations:n}){this.point=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const i=t||{id:"",basePrice:"",dateFrom:"",dateTo:"",destination:"",isFavourite:!1,offers:[],type:o[0]},{id:s,dateFrom:r,dateTo:a,basePrice:c,type:d}=i,u=n.find((t=>t.id===i.destination)),{name:h}=u||{};return`<form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-${s}">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${d}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle visually-hidden" id="event-type-toggle-${s}" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              ${o.map((t=>function(t,e,n){return`<div class="event__type-item">\n        <input id="event-type-${t}-${n}"\n          class="event__type-input visually-hidden"\n          type="radio"\n          name="event-type"\n          value="${t}"\n          ${t===e&&"checked"}>\n        <label class="event__type-label\n          event__type-label--${t}"\n          for="event-type-${t}-${n}">${t}</label>\n      </div>`}(t,d,s))).join("")}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-${s}">\n            ${d}\n          </label>\n          <input class="event__input  event__input--destination"\n            id="event-destination-${s}"\n            type="text"\n            name="event-destination"\n            value="${h||""}"\n            list="destination-list-${s}">\n          <datalist id="destination-list-${s}">\n            ${n.map((t=>`<option value="${t.name}"></option>`)).join("")}\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-${s}">From</label>\n          <input class="event__input event__input--time"\n            id="event-start-time-${s}"\n            type="text"\n            name="event-start-time"\n            value="${v(r,l)}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-${s}">To</label>\n          <input class="event__input  event__input--time"\n            id="event-end-time-${s}"\n            type="text"\n            name="event-end-time"\n            value="${v(a,l)}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-${s}">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price"\n            id="event-price-${s}"\n            type="text"\n            name="event-price"\n            value="${c}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Cancel</button>\n      </header>\n      <section class="event__details">\n\n        ${function(t,e,n){const i=t.find((t=>t.type===e)).offers;return i.length?`<section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n        ${i.map((t=>function(t,e){const{id:n,title:i,price:s}=t,r=t=>t.toLowerCase().split(" ").join("-"),o=e.find((t=>t===n))?"checked":"";return`<div class="event__offer-selector">\n      <input class="event__offer-checkbox visually-hidden"\n        id="event-offer-${r(i)}-${n}"\n        type="checkbox"\n        name="event-offer-${r(i)}"\n        ${o}>\n      <label class="event__offer-label" for="event-offer-${r(i)}-${n}">\n        <span class="event__offer-title">${i}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${s}</span>\n      </label>\n    </div>`}(t,n))).join("")}\n      </div>\n    </section>`:""}(e,d,i.offers)}\n        ${f=u,f?`<section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${f.description}</p>\n\n      ${p=f.pictures,p.length?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${p.map((t=>`<img class="event__photo" src="${t.src}" alt="${t.description}">`)).join("")}\n        </div>\n      </div>`:""}\n    </section>`:""}\n\n      </section>\n    </form>`;var f,p}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class ${constructor({point:t,offers:e,destinations:n}){this.point=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const{dateFrom:i,dateTo:s,basePrice:r,isFavorite:o,type:l}=t,c=e.find((e=>e.type===t.type)).offers.filter((e=>t.offers.includes(e.id))),u=n.find((e=>e.id===t.destination)),{name:h}=u;return`<div class="event">\n      <time class="event__date" datetime="${v(i,"YYYY-MM-DD")}">${v(i,"MMM DD")}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${l}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${l} ${h}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${i}">${v(i,a)}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${s}">${v(s,a)}</time>\n        </p>\n        <p class="event__duration">${function(t,e){const n=d()(e).diff(t,"minute");let i;return i=n<60?"mm[M]":n<1440?"HH[H] mm[M]":"DD[D] HH[H] mm[M]",d()(d().duration({minutes:n}).$ms).format(i)}(i,s)}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${r}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${c.map((t=>function(t){const{title:e,price:n}=t;return`<li class="event__offer">\n        <span class="event__offer-title">${e}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${n}</span>\n      </li>`}(t))).join("")}\n      </ul>\n      <button class="event__favorite-btn ${o&&"event__favorite-btn--active"}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const y=[{id:"1",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Chamonix parliament building"}]},{id:"2",description:"Geneva is a city located in Switzerland, known for its beautiful Lake Geneva and stunning mountain views. It is a popular destination for tourists and business travelers alike, with a rich history, stunning architecture, and a vibrant cultural scene. ",name:"Geneva",pictures:[{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Geneva parliament building"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Lake Geneva"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"St. Pierre Cathedral"}]},{id:"3",description:"Amsterdam is the capital and largest city in the European country of the Netherlands. Amsterdam is famous for its canals and dikes.",name:"Amsterdam",pictures:[{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Amsterdam canals and dikes"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Amsterdam buildings"}]},{id:"4",description:"Milan, the fashion and design capital of Italy, is a vibrant city that effortlessly combines its storied past with a cutting-edge, contemporary vibe. From the iconic Duomo and the elegant Galleria Vittorio Emanuele II to the city's thriving culinary scene and world-renowned shopping districts, Milan offers a unique blend of art, architecture, and modern sophistication that captivates visitors from around the globe.",name:"Milan",pictures:[{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Duomo di Milano"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Castello Sforzesco"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Galleria Vittorio Emanuele II"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"The Fashion District - Quadrilatero della Moda"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Brera Art Gallery"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Teatro alla Scala"}]},{id:"5",description:"London, the majestic capital of the United Kingdom, is a city steeped in rich history, cultural heritage, and modern attractions. Visitors can immerse themselves in the grandeur of royal palaces, explore world-renowned museums, stroll through picturesque parks, and indulge in the city's diverse culinary scene. As a dynamic metropolis that seamlessly blends centuries-old traditions with an innovative spirit, London stands as one of the most captivating tourist destinations in Europe.",name:"London",pictures:[{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Buckingham Palace"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Tower Bridge"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"The British Museum"},{src:`https://loremflickr.com/248/152?random=${f(50)}`,description:"Big Ben and the Houses of Parliament"}]}],g=[{type:"taxi",offers:[{id:"11",title:"Upgrade to a business class",price:f(100)},{id:"12",title:"Child seat",price:f(100)},{id:"13",title:"Extra stops",price:f(100)},{id:"14",title:"Luggage assistance",price:f(100)}]},{type:"bus",offers:[{id:"21",title:"Wi-Fi",price:f(100)},{id:"22",title:"Extra baggage",price:f(100)},{id:"23",title:"Complimentary snacks and drinks",price:f(100)}]},{type:"train",offers:[{id:"31",title:"Wi-Fi",price:f(100)},{id:"32",title:"Complimentary snacks and drinks",price:f(100)},{id:"33",title:"Priority boarding",price:f(100)},{id:"34",title:"Meal service",price:f(100)},{id:"35",title:"In-seat power outlet",price:f(100)}]},{type:"ship",offers:[{id:"41",title:"Meal service",price:f(100)},{id:"42",title:"Spa Access",price:f(100)}]},{type:"drive",offers:[]},{type:"flight",offers:[{id:"51",title:"Meal service",price:f(100)},{id:"52",title:"Extra legroom",price:f(100)},{id:"53",title:"Priority boarding",price:f(100)},{id:"54",title:"Extra baggage",price:f(100)}]},{type:"check-in",offers:[{id:"61",title:"Early check-in",price:f(100)},{id:"62",title:"Late check-out",price:f(100)},{id:"63",title:"Room upgrade",price:f(100)},{id:"64",title:"Breakfast included",price:f(100)},{id:"65",title:"Ocean view",price:f(100)}]},{type:"sightseeing",offers:[{id:"71",title:"Guided Tour",price:f(100)},{id:"72",title:"Audio Guide",price:f(100)}]},{type:"restaurant",offers:[{id:"81",title:"Chef's Tasting Menu",price:f(100)}]}],b=t=>{const e=g.find((e=>e.type===t)).offers.map((t=>t.id));return function(t,e){const n=[...t];if(0===t.length||e>t.length)return[];for(let t=n.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[n[t],n[e]]=[n[e],n[t]]}return n.slice(0,e)}(e,f(e.length))},M=()=>{const t=(e=o)[Math.floor(Math.random()*e.length)];var e;return{id:m(),basePrice:f(500),dateFrom:p(new Date(2024,4,1),new Date(2024,4,5)),dateTo:p(new Date(2024,4,5),new Date(2024,4,15)),destination:y[f(y.length)].id,isFavorite:!f(2),offers:b(t),type:t}},w=document.querySelector(".trip-controls__filters"),D=document.querySelector(".trip-events"),S=new class{constructor(){this.points=[],this.offers=[],this.destinations=[]}init(){this.points=Array.from({length:4},M),this.offers=g,this.destinations=y}getPoints(){return this.points}getOffers(){return this.offers}getDestinations(){return this.destinations}},k=new class{pointsListComponent=new s;pointEditFormComponent=new r;constructor({pointsListContainer:t,pointModel:e}){this.pointsListContainer=t,this.pointModel=e}init(){this.points=[...this.pointModel.getPoints()],this.offers=[...this.pointModel.getOffers()],this.destinations=[...this.pointModel.getDestinations()],e(new i,this.pointsListContainer),e(this.pointsListComponent,this.pointsListContainer),e(this.pointEditFormComponent,this.pointsListComponent.getElement()),e(new _({point:this.points[0],offers:this.offers,destinations:this.destinations}),this.pointEditFormComponent.getElement());for(let t=1;t<this.points.length;t++){const n=new r;e(n,this.pointsListComponent.getElement()),e(new $({point:this.points[t],offers:this.offers,destinations:this.destinations}),n.getElement())}}}({pointsListContainer:D,pointModel:S});e(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},w),S.init(),k.init()})()})();
//# sourceMappingURL=bundle.013ee01e33bd0acc14d4.js.map
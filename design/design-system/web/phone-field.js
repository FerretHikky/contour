/* Generated Contour PhoneField. Do not edit. */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// design/design-system/adapters/react/src/PhoneField.tsx
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";

// node_modules/.pnpm/country-flag-icons@1.6.20/node_modules/country-flag-icons/react/1x1/index.js
var x1_exports = {};
__export(x1_exports, {
  AC: () => AC,
  AD: () => AD,
  AE: () => AE,
  AF: () => AF,
  AG: () => AG,
  AI: () => AI,
  AL: () => AL,
  AM: () => AM,
  AO: () => AO,
  AQ: () => AQ,
  AR: () => AR,
  AS: () => AS,
  AT: () => AT,
  AU: () => AU,
  AW: () => AW,
  AX: () => AX,
  AZ: () => AZ,
  BA: () => BA,
  BB: () => BB,
  BD: () => BD,
  BE: () => BE,
  BF: () => BF,
  BG: () => BG,
  BH: () => BH,
  BI: () => BI,
  BJ: () => BJ,
  BL: () => BL,
  BM: () => BM,
  BN: () => BN,
  BO: () => BO,
  BQ: () => BQ,
  BQ_BO: () => BQ_BO,
  BQ_SA: () => BQ_SA,
  BQ_SE: () => BQ_SE,
  BR: () => BR,
  BS: () => BS,
  BT: () => BT,
  BV: () => BV,
  BW: () => BW,
  BY: () => BY,
  BZ: () => BZ,
  CA: () => CA,
  CC: () => CC,
  CD: () => CD,
  CF: () => CF,
  CG: () => CG,
  CH: () => CH,
  CI: () => CI,
  CK: () => CK,
  CL: () => CL,
  CM: () => CM,
  CN: () => CN,
  CO: () => CO,
  CR: () => CR,
  CU: () => CU,
  CV: () => CV,
  CW: () => CW,
  CX: () => CX,
  CY: () => CY,
  CZ: () => CZ,
  DE: () => DE,
  DJ: () => DJ,
  DK: () => DK,
  DM: () => DM,
  DO: () => DO,
  DZ: () => DZ,
  EC: () => EC,
  EE: () => EE,
  EG: () => EG,
  EH: () => EH,
  ER: () => ER,
  ES: () => ES,
  ES_CT: () => ES_CT,
  ET: () => ET,
  EU: () => EU,
  FI: () => FI,
  FJ: () => FJ,
  FK: () => FK,
  FM: () => FM,
  FO: () => FO,
  FR: () => FR,
  GA: () => GA,
  GB: () => GB,
  GB_ENG: () => GB_ENG,
  GB_NIR: () => GB_NIR,
  GB_SCT: () => GB_SCT,
  GB_WLS: () => GB_WLS,
  GD: () => GD,
  GE: () => GE,
  GF: () => GF,
  GG: () => GG,
  GH: () => GH,
  GI: () => GI,
  GL: () => GL,
  GM: () => GM,
  GN: () => GN,
  GP: () => GP,
  GQ: () => GQ,
  GR: () => GR,
  GS: () => GS,
  GT: () => GT,
  GU: () => GU,
  GW: () => GW,
  GY: () => GY,
  HK: () => HK,
  HM: () => HM,
  HN: () => HN,
  HR: () => HR,
  HT: () => HT,
  HU: () => HU,
  IC: () => IC,
  ID: () => ID,
  IE: () => IE,
  IL: () => IL,
  IM: () => IM,
  IN: () => IN,
  IO: () => IO,
  IQ: () => IQ,
  IR: () => IR,
  IS: () => IS,
  IT: () => IT,
  JE: () => JE,
  JM: () => JM,
  JO: () => JO,
  JP: () => JP,
  KE: () => KE,
  KG: () => KG,
  KH: () => KH,
  KI: () => KI,
  KM: () => KM,
  KN: () => KN,
  KP: () => KP,
  KR: () => KR,
  KW: () => KW,
  KY: () => KY,
  KZ: () => KZ,
  LA: () => LA,
  LB: () => LB,
  LC: () => LC,
  LI: () => LI,
  LK: () => LK,
  LR: () => LR,
  LS: () => LS,
  LT: () => LT,
  LU: () => LU,
  LV: () => LV,
  LY: () => LY,
  MA: () => MA,
  MC: () => MC,
  MD: () => MD,
  ME: () => ME,
  MF: () => MF,
  MG: () => MG,
  MH: () => MH,
  MK: () => MK,
  ML: () => ML,
  MM: () => MM,
  MN: () => MN,
  MO: () => MO,
  MP: () => MP,
  MQ: () => MQ,
  MR: () => MR,
  MS: () => MS,
  MT: () => MT,
  MU: () => MU,
  MV: () => MV,
  MW: () => MW,
  MX: () => MX,
  MY: () => MY,
  MZ: () => MZ,
  NA: () => NA,
  NC: () => NC,
  NE: () => NE,
  NF: () => NF,
  NG: () => NG,
  NI: () => NI,
  NL: () => NL,
  NO: () => NO,
  NP: () => NP,
  NR: () => NR,
  NU: () => NU,
  NZ: () => NZ,
  OM: () => OM,
  PA: () => PA,
  PE: () => PE,
  PF: () => PF,
  PG: () => PG,
  PH: () => PH,
  PK: () => PK,
  PL: () => PL,
  PM: () => PM,
  PN: () => PN,
  PR: () => PR,
  PS: () => PS,
  PT: () => PT,
  PW: () => PW,
  PY: () => PY,
  QA: () => QA,
  RE: () => RE,
  RO: () => RO,
  RS: () => RS,
  RU: () => RU,
  RW: () => RW,
  SA: () => SA,
  SB: () => SB,
  SC: () => SC,
  SD: () => SD,
  SE: () => SE,
  SG: () => SG,
  SH: () => SH,
  SI: () => SI,
  SJ: () => SJ,
  SK: () => SK,
  SL: () => SL,
  SM: () => SM,
  SN: () => SN,
  SO: () => SO,
  SR: () => SR,
  SS: () => SS,
  ST: () => ST,
  SV: () => SV,
  SX: () => SX,
  SY: () => SY,
  SZ: () => SZ,
  TA: () => TA,
  TC: () => TC,
  TD: () => TD,
  TF: () => TF,
  TG: () => TG,
  TH: () => TH,
  TJ: () => TJ,
  TK: () => TK,
  TL: () => TL,
  TM: () => TM,
  TN: () => TN,
  TO: () => TO,
  TR: () => TR,
  TT: () => TT,
  TV: () => TV,
  TW: () => TW,
  TZ: () => TZ,
  UA: () => UA,
  UG: () => UG,
  UM: () => UM,
  US: () => US,
  UY: () => UY,
  UZ: () => UZ,
  VA: () => VA,
  VC: () => VC,
  VE: () => VE,
  VG: () => VG,
  VI: () => VI,
  VN: () => VN,
  VU: () => VU,
  WF: () => WF,
  WS: () => WS,
  XA: () => XA,
  XC: () => XC,
  XK: () => XK,
  XO: () => XO,
  YE: () => YE,
  YT: () => YT,
  ZA: () => ZA,
  ZM: () => ZM,
  ZW: () => ZW,
  default: () => x1_default
});

// node_modules/.pnpm/country-flag-icons@1.6.20/node_modules/country-flag-icons/modules/react/1x1/index.js
import React from "react";
var _excluded = ["title"];
var _excluded2 = ["title"];
var _excluded3 = ["title"];
var _excluded4 = ["title"];
var _excluded5 = ["title"];
var _excluded6 = ["title"];
var _excluded7 = ["title"];
var _excluded8 = ["title"];
var _excluded9 = ["title"];
var _excluded10 = ["title"];
var _excluded11 = ["title"];
var _excluded12 = ["title"];
var _excluded13 = ["title"];
var _excluded14 = ["title"];
var _excluded15 = ["title"];
var _excluded16 = ["title"];
var _excluded17 = ["title"];
var _excluded18 = ["title"];
var _excluded19 = ["title"];
var _excluded20 = ["title"];
var _excluded21 = ["title"];
var _excluded22 = ["title"];
var _excluded23 = ["title"];
var _excluded24 = ["title"];
var _excluded25 = ["title"];
var _excluded26 = ["title"];
var _excluded27 = ["title"];
var _excluded28 = ["title"];
var _excluded29 = ["title"];
var _excluded30 = ["title"];
var _excluded31 = ["title"];
var _excluded32 = ["title"];
var _excluded33 = ["title"];
var _excluded34 = ["title"];
var _excluded35 = ["title"];
var _excluded36 = ["title"];
var _excluded37 = ["title"];
var _excluded38 = ["title"];
var _excluded39 = ["title"];
var _excluded40 = ["title"];
var _excluded41 = ["title"];
var _excluded42 = ["title"];
var _excluded43 = ["title"];
var _excluded44 = ["title"];
var _excluded45 = ["title"];
var _excluded46 = ["title"];
var _excluded47 = ["title"];
var _excluded48 = ["title"];
var _excluded49 = ["title"];
var _excluded50 = ["title"];
var _excluded51 = ["title"];
var _excluded52 = ["title"];
var _excluded53 = ["title"];
var _excluded54 = ["title"];
var _excluded55 = ["title"];
var _excluded56 = ["title"];
var _excluded57 = ["title"];
var _excluded58 = ["title"];
var _excluded59 = ["title"];
var _excluded60 = ["title"];
var _excluded61 = ["title"];
var _excluded62 = ["title"];
var _excluded63 = ["title"];
var _excluded64 = ["title"];
var _excluded65 = ["title"];
var _excluded66 = ["title"];
var _excluded67 = ["title"];
var _excluded68 = ["title"];
var _excluded69 = ["title"];
var _excluded70 = ["title"];
var _excluded71 = ["title"];
var _excluded72 = ["title"];
var _excluded73 = ["title"];
var _excluded74 = ["title"];
var _excluded75 = ["title"];
var _excluded76 = ["title"];
var _excluded77 = ["title"];
var _excluded78 = ["title"];
var _excluded79 = ["title"];
var _excluded80 = ["title"];
var _excluded81 = ["title"];
var _excluded82 = ["title"];
var _excluded83 = ["title"];
var _excluded84 = ["title"];
var _excluded85 = ["title"];
var _excluded86 = ["title"];
var _excluded87 = ["title"];
var _excluded88 = ["title"];
var _excluded89 = ["title"];
var _excluded90 = ["title"];
var _excluded91 = ["title"];
var _excluded92 = ["title"];
var _excluded93 = ["title"];
var _excluded94 = ["title"];
var _excluded95 = ["title"];
var _excluded96 = ["title"];
var _excluded97 = ["title"];
var _excluded98 = ["title"];
var _excluded99 = ["title"];
var _excluded100 = ["title"];
var _excluded101 = ["title"];
var _excluded102 = ["title"];
var _excluded103 = ["title"];
var _excluded104 = ["title"];
var _excluded105 = ["title"];
var _excluded106 = ["title"];
var _excluded107 = ["title"];
var _excluded108 = ["title"];
var _excluded109 = ["title"];
var _excluded110 = ["title"];
var _excluded111 = ["title"];
var _excluded112 = ["title"];
var _excluded113 = ["title"];
var _excluded114 = ["title"];
var _excluded115 = ["title"];
var _excluded116 = ["title"];
var _excluded117 = ["title"];
var _excluded118 = ["title"];
var _excluded119 = ["title"];
var _excluded120 = ["title"];
var _excluded121 = ["title"];
var _excluded122 = ["title"];
var _excluded123 = ["title"];
var _excluded124 = ["title"];
var _excluded125 = ["title"];
var _excluded126 = ["title"];
var _excluded127 = ["title"];
var _excluded128 = ["title"];
var _excluded129 = ["title"];
var _excluded130 = ["title"];
var _excluded131 = ["title"];
var _excluded132 = ["title"];
var _excluded133 = ["title"];
var _excluded134 = ["title"];
var _excluded135 = ["title"];
var _excluded136 = ["title"];
var _excluded137 = ["title"];
var _excluded138 = ["title"];
var _excluded139 = ["title"];
var _excluded140 = ["title"];
var _excluded141 = ["title"];
var _excluded142 = ["title"];
var _excluded143 = ["title"];
var _excluded144 = ["title"];
var _excluded145 = ["title"];
var _excluded146 = ["title"];
var _excluded147 = ["title"];
var _excluded148 = ["title"];
var _excluded149 = ["title"];
var _excluded150 = ["title"];
var _excluded151 = ["title"];
var _excluded152 = ["title"];
var _excluded153 = ["title"];
var _excluded154 = ["title"];
var _excluded155 = ["title"];
var _excluded156 = ["title"];
var _excluded157 = ["title"];
var _excluded158 = ["title"];
var _excluded159 = ["title"];
var _excluded160 = ["title"];
var _excluded161 = ["title"];
var _excluded162 = ["title"];
var _excluded163 = ["title"];
var _excluded164 = ["title"];
var _excluded165 = ["title"];
var _excluded166 = ["title"];
var _excluded167 = ["title"];
var _excluded168 = ["title"];
var _excluded169 = ["title"];
var _excluded170 = ["title"];
var _excluded171 = ["title"];
var _excluded172 = ["title"];
var _excluded173 = ["title"];
var _excluded174 = ["title"];
var _excluded175 = ["title"];
var _excluded176 = ["title"];
var _excluded177 = ["title"];
var _excluded178 = ["title"];
var _excluded179 = ["title"];
var _excluded180 = ["title"];
var _excluded181 = ["title"];
var _excluded182 = ["title"];
var _excluded183 = ["title"];
var _excluded184 = ["title"];
var _excluded185 = ["title"];
var _excluded186 = ["title"];
var _excluded187 = ["title"];
var _excluded188 = ["title"];
var _excluded189 = ["title"];
var _excluded190 = ["title"];
var _excluded191 = ["title"];
var _excluded192 = ["title"];
var _excluded193 = ["title"];
var _excluded194 = ["title"];
var _excluded195 = ["title"];
var _excluded196 = ["title"];
var _excluded197 = ["title"];
var _excluded198 = ["title"];
var _excluded199 = ["title"];
var _excluded200 = ["title"];
var _excluded201 = ["title"];
var _excluded202 = ["title"];
var _excluded203 = ["title"];
var _excluded204 = ["title"];
var _excluded205 = ["title"];
var _excluded206 = ["title"];
var _excluded207 = ["title"];
var _excluded208 = ["title"];
var _excluded209 = ["title"];
var _excluded210 = ["title"];
var _excluded211 = ["title"];
var _excluded212 = ["title"];
var _excluded213 = ["title"];
var _excluded214 = ["title"];
var _excluded215 = ["title"];
var _excluded216 = ["title"];
var _excluded217 = ["title"];
var _excluded218 = ["title"];
var _excluded219 = ["title"];
var _excluded220 = ["title"];
var _excluded221 = ["title"];
var _excluded222 = ["title"];
var _excluded223 = ["title"];
var _excluded224 = ["title"];
var _excluded225 = ["title"];
var _excluded226 = ["title"];
var _excluded227 = ["title"];
var _excluded228 = ["title"];
var _excluded229 = ["title"];
var _excluded230 = ["title"];
var _excluded231 = ["title"];
var _excluded232 = ["title"];
var _excluded233 = ["title"];
var _excluded234 = ["title"];
var _excluded235 = ["title"];
var _excluded236 = ["title"];
var _excluded237 = ["title"];
var _excluded238 = ["title"];
var _excluded239 = ["title"];
var _excluded240 = ["title"];
var _excluded241 = ["title"];
var _excluded242 = ["title"];
var _excluded243 = ["title"];
var _excluded244 = ["title"];
var _excluded245 = ["title"];
var _excluded246 = ["title"];
var _excluded247 = ["title"];
var _excluded248 = ["title"];
var _excluded249 = ["title"];
var _excluded250 = ["title"];
var _excluded251 = ["title"];
var _excluded252 = ["title"];
var _excluded253 = ["title"];
var _excluded254 = ["title"];
var _excluded255 = ["title"];
var _excluded256 = ["title"];
var _excluded257 = ["title"];
var _excluded258 = ["title"];
var _excluded259 = ["title"];
var _excluded260 = ["title"];
var _excluded261 = ["title"];
var _excluded262 = ["title"];
var _excluded263 = ["title"];
var _excluded264 = ["title"];
var _excluded265 = ["title"];
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var AC = function AC2(_ref) {
  var title = _ref.title, rest = _objectWithoutProperties(_ref, _excluded);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M440.1 181.1c-.1 39.2-6.4 81.4-57.4 101.5-51.1-20.1-57.3-62.3-57.4-101.5h114.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1B81B6",
    d: "M439.6 197.7c-2.8 34.9-12.4 67.4-57 85-44.4-17.6-54.5-51.2-56.9-84.9"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M437.8 214.1c-3.2 24.3-16.7 53.5-55.1 68.6-38.4-15.1-50.5-42.5-55.1-68.4"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1B81B6",
    d: "M434.2 230.3c-5.7 17.7-19.3 39.4-51.3 52.8-32-12.6-45.2-33.8-51.4-53"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M426.7 246.9c-6.5 11.3-17.7 25.4-44 35.9-27.5-11.5-37.4-25.3-44-36.1"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1B81B6",
    d: "M412.4 265.1c-8.1 7.2-12 11.2-29.6 17.9-20.1-7.9-22.6-11.6-29.2-17.5"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#288549",
    d: "M383.3 231.6c-.2-.2-27.9 35.7-27.9 35.7-1.8-1.3-10-9.5-13.3-15l41.3-50.1 40.2 49.7c-3.9 6.5-11.4 13.6-13.2 15M382.6 85.3l-26.5 45h53z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M275.9 223.6c3.6-26.7 13.5-47.3 22.1-46.2s12.6 23.7 9 50.4-13.5 47.3-22.1 46.2c-8.6-1.2-12.6-23.7-9-50.4zm191.2-45.9c8.6-1.2 18.5 19.5 22.1 46.2s-.4 49.2-9 50.4-18.5-19.6-22.2-46.3c-3.6-26.6.5-49.2 9.1-50.3z",
    fill: "#F0955D"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M296.4 162c2.4-6 7.4-9.7 11-8.2 3.7 1.5 4.7 7.5 2.3 13.5s-7.4 9.7-11 8.2c-3.6-1.5-4.7-7.5-2.3-13.5zm-8 109.2c.9-6.2 3.1-11.1 4.9-10.8s2.5 5.5 1.6 11.8c-.9 6.2-3.1 11.1-4.9 10.8s-2.5-5.5-1.6-11.8zm10.6-12.8c1.8-.1 3.6 4.7 3.9 10.8s-.9 11.1-2.7 11.2c-1.8.1-3.6-4.7-3.9-10.8-.3-6.1.9-11.1 2.7-11.2zm10.5-70c2.1-.8 6.1 4.2 8.8 11.2 2.8 7 3.3 13.4 1.2 14.2-2.1.8-6.1-4.2-8.8-11.2-2.8-7-3.3-13.4-1.2-14.2zm6.5-14.1c7-2.8 13.4-3.3 14.2-1.2.8 2.1-4.2 6.1-11.2 8.8-7 2.8-13.4 3.3-14.2 1.2-.9-2.1 4.2-6 11.2-8.8zm141.6-20.2c3.7-1.5 8.6 2.2 11 8.2 2.4 6 1.4 12.1-2.3 13.5-3.7 1.5-8.6-2.2-11-8.2-2.4-6-1.3-12.1 2.3-13.5zm14.2 106.5c1.8-.3 4 4.6 4.9 10.8.9 6.2.2 11.5-1.6 11.8-1.8.3-4-4.6-4.9-10.8-1-6.3-.2-11.5 1.6-11.8zm-9.6 8.8c.3-6.1 2.1-10.9 3.9-10.8 1.8.1 3 5.1 2.7 11.2-.3 6.1-2.1 10.9-3.9 10.8-1.8-.1-3-5.1-2.7-11.2zm-15.5-69.7c2.8-7 6.7-12.1 8.8-11.2 2.1.8 1.6 7.2-1.2 14.2-2.8 7-6.7 12.1-8.8 11.2s-1.6-7.2 1.2-14.2zm-11.8-26.5c.8-2.1 7.2-1.6 14.2 1.2 7 2.8 12.1 6.7 11.2 8.8-.8 2.1-7.2 1.6-14.2-1.2-7-2.7-12.1-6.7-11.2-8.8z",
    fill: "#EADFD5"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#B0C6CC",
    d: "M373.3 130.3 356.1 155l17.8 26.1H396l4.7-25.4-5.4-25.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var AD = function AD2(_ref2) {
  var title = _ref2.title, rest = _objectWithoutProperties(_ref2, _excluded2);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#fedd00",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#10069f",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#d50032",
    d: "M342 0h171v342H342z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M198.9 113.6H256v64.8h-57.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M267.6 113.6v64.7m16.6-64.7v64.7m16.6-64.7v64.7",
    stroke: "#D80027",
    strokeWidth: 7
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M247.4 178.4v64.7m-13.3-64.7v64.7m-13.3-64.6v53.9m-13.7-53.9v47.1",
    stroke: "#D80027",
    strokeWidth: 5
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m199.9 146 27.6-32.4 28.5 32.3-28.1 32.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#BC8B00",
    d: "M182.2 95.9v92.2c0 34.3 27.3 54.2 48.6 64.5-.8 1.4 25.1 8.3 25.1 8.3s25.9-6.9 25.1-8.3c21.4-10.3 48.6-30.1 48.6-64.5V95.9H182.2zm129.9 92.2c0 16.9-10 29.4-32.8 43.9-8.6 5.5-17.5 9-23.3 11-5.8-2-14.7-5.5-23.3-11-22.8-14.5-32.8-28-32.8-43.9v-74.5h112.2v74.5z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M264.4 188.9h29.5v8.6h-29.5zm0 17.6h29.5v8.6h-29.5z"
  }));
};
var AE = function AE2(_ref3) {
  var title = _ref3.title, rest = _objectWithoutProperties(_ref3, _excluded3);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "51.3 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00843d",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#c8102e",
    d: "M0 0h171v342H0z"
  }));
};
var AF = function AF2(_ref4) {
  var title = _ref4.title, rest = _objectWithoutProperties(_ref4, _excluded4);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D32011",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#007A36",
    d: "M342 0h171v342H342z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M256.5 131.3c-17.5 0-31.8 14.3-31.8 31.8v47.7h63.6v-47.7c0-17.7-14.3-31.8-31.8-31.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M256.5 93c-43.1 0-78 34.9-78 78s34.9 77.9 78 77.9 78-34.9 78-78-34.9-77.9-78-77.9zm0 142.4c-35.6 0-64.5-28.9-64.5-64.5s28.9-64.5 64.5-64.5 64.5 29 64.5 64.6c0 35.6-28.9 64.4-64.5 64.4z"
  }));
};
var AG = function AG2(_ref5) {
  var title = _ref5.title, rest = _objectWithoutProperties(_ref5, _excluded5);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0072c6",
    d: "M88.8 136.5c-2.2 12.9-3.4 26.2-3.4 39.8 0 13.6 1.2 27 3.4 39.8L256 228.3l167.2-12.1c2.2-12.9 3.4-26.2 3.4-39.8s-1.2-27-3.4-39.8"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M423.2 219H88.8c15.8 69.8 84.7 122.3 167.2 122.3S407.4 288.8 423.2 219z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M365.9 136.5H146.1l44.9-21.1-23.9-43.5 48.8 9.4L222 32l34 36.2L290 32l6.1 49.3 48.8-9.4-23.9 43.5z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#ce1126"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 342 0 0v342z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M513 342V0L256 342z"
  })));
};
var AI = function AI2(_ref6) {
  var title = _ref6.title, rest = _objectWithoutProperties(_ref6, _excluded6);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M454.8 265.38c7.94-10.93 13.24-24.27 13.24-40.42V104.89a59.754 59.754 0 0 1-36.02 12.01c-19.64 0-37.07-9.43-48.03-24.01-10.95 14.58-28.39 24.01-48.03 24.01-13.52 0-25.99-4.47-36.02-12v120.06c0 16.16 5.3 29.5 13.24 40.42H454.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#9cf",
    d: "M310.23 260.98C332.65 296.96 384 309 384 309s51.35-12.04 73.77-48.02H310.23z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#f90"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M396.66 172.21c.32 1.42 8.72 10.17 17.56 20.15 1.39 1.57-8.74 12.63-6.91 12.59 4.75-.12 19.27-17.26 19.34 6.65.05 15.94-30 27.51-30 27.51h17.47l.65 14.96s4.97-13.34 7.59-16.57c8.1-9.97 20.18-30.07 34.59-27.1 14.41 2.97-13.66-13.92-13.66-13.92s-5.2-15.19-16.63-16.97c-10.06-1.57-14.29-2.51-26.64-7.3-1.68-.65-3.88-2.32-3.36 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M359.69 198.69c1.07-.99 4.46-12.63 8.69-25.28.67-1.99 15.31 1.27 14.35-.3-2.47-4.06-24.58-8.08-3.9-20.08 13.79-8 38.82 12.27 38.82 12.27l-8.72-15.14 12.64-8.03s-14.05 2.35-18.14 1.69c-12.68-2.04-36.13-2.48-40.75-16.45-4.62-13.97-5.25 18.79-5.25 18.79s-10.56 12.08-6.4 22.88c3.66 9.5 4.96 13.64 6.97 26.73.29 1.79-.06 4.53 1.69 2.92z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M395.67 219.87c-1.39-.43-13.16 2.49-26.22 5.18-2.06.42-6.59-13.88-7.47-12.26-2.27 4.17 5.36 25.31-15.41 13.45-13.84-7.91-8.89-39.73-8.89-39.73l-8.71 15.14-13.29-6.9s9.09 10.96 10.57 14.84c4.6 11.99 16 32.49 6.24 43.49-9.76 11.01 18.88-4.9 18.88-4.9s15.76 3.07 23-5.96c6.38-7.94 9.3-11.14 19.61-19.45 1.43-1.12 3.97-2.19 1.69-2.9z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var AL = function AL2(_ref7) {
  var title = _ref7.title, rest = _objectWithoutProperties(_ref7, _excluded7);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "15 0 60 60"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ED2024",
    d: "M0 0h90v60H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#212121",
    d: "M32.5 12.2v16l7.1 2.5-5 4.9 2.4 3 5.3-5.5 1.2 2.3-3 4.9 3.6 5.6-1.8 2.6 2.8 3.6 2.7-3.7-1.5-2.6 3-5.8-2.7-4.6 1.2-2.3 5.2 5.5 2.5-2.9-5.2-5.1 7.2-2.6V12.2l-5.2 1.9-.1 3.8-3.3.3v-2.6l1.7-2.3 5.6-2.2-2.3-.4 1.4-1.2.9.4-.8-1.4L54 9l-1-1.1L47.5 9l1.4 1.1-3.8 4.9-3.8-4.8 1.3-1.1-5-1.2L36.2 9l-1.5-.4-.8 1.4.9-.6 1.6 1.1-2.3.5 5.5 2 1.6 2.3v2.9l-3.3-.3v-3.6z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M26.2 25h6.4v2.5h-6.4zm0-4.1h6.4v2.7h-6.4zm0-4.2h6.4v2.6h-6.4zm0-4h6.4v2.5h-6.4zM57.4 25h6.4v2.5h-6.4zm0-4.1h6.4v2.7h-6.4zm0-4.2h6.4v2.6h-6.4zm0-4h6.4v2.5h-6.4zM53.4 36.1h6.4V38h-6.4zm-23.2 0h6.4V38h-6.4z",
    fill: "#212121"
  }));
};
var AM = function AM2(_ref8) {
  var title = _ref8.title, rest = _objectWithoutProperties(_ref8, _excluded8);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF9811",
    d: "M0 228h513v114H0z"
  }));
};
var AO = function AO2(_ref9) {
  var title = _ref9.title, rest = _objectWithoutProperties(_ref9, _excluded9);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "100.89 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 171h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFDA44"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "m332.7 135.6 17.5-8.6-7.4-19-18.7 6.2zm-45.6-56 5.5-18.8-19.1-7.2-8 18zm29.4 23.2 12.2-15.3-14.9-13.9-14.2 13.6zm19.4 68.9 19.5-.8v-21.3l-22.9.2zm-12.6 38.1 18.8 5.5 7.3-19-18-8zm-29 32.4 14.9 12.7 14.4-14.4-13.1-14.7zm-47-147.7 9.8 19.9 21.9 3.3-15.9 15.5 3.6 21.9-19.6-10.4-19.7 10.2 3.8-21.9-15.8-15.5 22-3.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m250.8 61.3-2.7 18.3c43.1 3.2 77 39.2 77 83.1 0 46-37.3 82.9-83.4 83.4-29.2.3-51.3-14.8-67-33.7l-13.9 12.3c15 19 40.8 39.9 80.9 39.9 56.3 0 101.9-45.6 101.9-101.9.1-53.2-40.7-96.9-92.8-101.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#000",
    d: "m291.9 223.4-11.8 14s51.9 38.9 53.6 40.4c1.7 1.5 5.2 2 9.1-2.7 3.7-4.5 2.8-8.1.9-9.7-2-1.5-51.8-42-51.8-42z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M206.1 157.2c-7.7 10.3-7.5 23.1 2.8 30.9 0 0 135.2 101.5 136.9 103 1.7 1.5 5.2 2 9.1-2.7 3.7-4.5 2.8-8.1.9-9.7-1.9-1.5-149.7-121.5-149.7-121.5zm47.7 99.1 7.3 18.2 19.5-6-4.8-19.1zm-40.4-3.7-2 19.5 20.1 3.6 4.5-19.1zm-35.7-21.2L167.4 248l16.4 12.1 12.5-15.2z"
  })));
};
var AQ = function AQ2(_ref10) {
  var title = _ref10.title, rest = _objectWithoutProperties(_ref10, _excluded10);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "124 0 496 496"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#3A7DCE",
    d: "M0 0h744v496H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fff",
    d: "m120 125 90 63 54-14 23-81 61-36 92 14 105 55 6 90 34 12v92l-65 115-78 24-72-17 18-30-8-32-10 9-162-25-49-85 20-46-49-62z"
  }));
};
var AR = function AR2(_ref11) {
  var title = _ref11.title, rest = _objectWithoutProperties(_ref11, _excluded11);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h512v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 0h512v114H0zm0 228h512v114H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFDA44",
    stroke: "#d6ab00",
    strokeWidth: 5,
    cx: 256.5,
    cy: 171,
    r: 40
  }));
};
var AS = function AS2(_ref12) {
  var title = _ref12.title, rest = _objectWithoutProperties(_ref12, _excluded12);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "171 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#10338c",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M513 33 95.3 171 513 310.76V342L0 171 513 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 287.18v24.58L81.72 171 513 30v24.16"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A2001D",
    d: "m476.98 140.21-21.89 10.68-3.18-15.32 31.19-29.77s-9.42-40.65-13.75-44.98l-112.32 55.82-6.84 36.76-31.9 28.59-.4 34.2 34.29-22.76 67.23-2.66-1.51 38.11h22.23l11.9-44.64 31.55-24.61-6.6-19.42z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#EFC100",
    stroke: "#231F20",
    strokeMiterlimit: 10,
    d: "m317.89 238.41-22.24-11.11 22.24-11.11h144.46v22.22z"
  }));
};
var AT = function AT2(_ref13) {
  var title = _ref13.title, rest = _objectWithoutProperties(_ref13, _excluded13);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v114H0zm0 228h513v114H0z"
  }));
};
var AU = function AU2(_ref14) {
  var title = _ref14.title, rest = _objectWithoutProperties(_ref14, _excluded14);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#00008b",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m188 212.6 11 22.9 24.7-5.7-11 22.8 19.9 15.8-24.8 5.6.1 25.4-19.9-15.9-19.8 15.9.1-25.4-24.8-5.6 19.9-15.8-11.1-22.8 24.8 5.7zm197.9 28.5 5.2 10.9 11.8-2.7-5.3 10.9 9.5 7.5-11.8 2.6v12.2l-9.4-7.6-9.5 7.6.1-12.2-11.8-2.6 9.5-7.5-5.3-10.9 11.8 2.7zm-48.6-116 5.2 10.9 11.8-2.7-5.3 10.9 9.5 7.5-11.8 2.7v12.1l-9.4-7.6-9.5 7.6.1-12.1-11.9-2.7 9.5-7.5-5.3-10.9L332 136zm48.6-66.2 5.2 10.9 11.8-2.7-5.3 10.9 9.5 7.5-11.8 2.7v12.1l-9.4-7.6-9.5 7.6.1-12.1-11.8-2.7 9.5-7.5-5.3-10.9 11.8 2.7zm42.5 49.7 5.2 10.9 11.8-2.7-5.3 10.9 9.5 7.5-11.8 2.6V150l-9.4-7.6-9.5 7.6v-12.2l-11.8-2.6 9.5-7.5-5.3-10.9 11.8 2.7zM398 166.5l4.1 12.7h13.3l-10.8 7.8 4.2 12.7-10.8-7.9-10.8 7.9 4.1-12.7-10.7-7.8h13.3z",
    fill: "#FFF"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00008b",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "red"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var AW = function AW2(_ref15) {
  var title = _ref15.title, rest = _objectWithoutProperties(_ref15, _excluded15);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 242 242"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 0h363v242H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M57 96.9 14.7 78.2 57 59.6l18.6-42.2 18.6 42.2 42.3 18.6-42.3 18.7-18.6 42.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f30028",
    d: "m75.6 40.6 11.5 26.1 26.1 11.5-26.1 11.5-11.5 26.1-11.5-26.1L38 78.2l26.1-11.5z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 152.2h363v15.7H0zm0 31.4h363v15.7H0z",
    fill: "#FFDA44"
  }));
};
var AX = function AX2(_ref16) {
  var title = _ref16.title, rest = _objectWithoutProperties(_ref16, _excluded16);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "39.33 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M513 210.9H202.2V342h-79.8V210.9H0v-79.8h122.4V0h79.8v131.1H513v61.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M513 149.7v42.6H183.7V342H141V192.3H0v-42.6h141V0h42.7v149.7z"
  }));
};
var AZ = function AZ2(_ref17) {
  var title = _ref17.title, rest = _objectWithoutProperties(_ref17, _excluded17);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ef3340",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00b5e2",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#509e2f",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M265.6 212.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6c7.2 0 13.9 1.8 19.8 5-9.2-9-21.9-14.6-35.8-14.6-28.3 0-51.2 22.9-51.2 51.2s22.9 51.2 51.2 51.2c13.9 0 26.6-5.6 35.8-14.6-5.9 3.2-12.6 5-19.8 5z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m297.6 142.2 5.5 15.5 14.9-7.1-7.1 14.9 15.5 5.5-15.5 5.5 7.1 14.9-14.9-7.1-5.5 15.5-5.5-15.5-14.9 7.1 7.1-14.9-15.5-5.5 15.5-5.5-7.1-14.9 14.9 7.1z"
  })));
};
var BA = function BA2(_ref18) {
  var title = _ref18.title, rest = _objectWithoutProperties(_ref18, _excluded18);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#10338C",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F6C500",
    d: "M99.9 0h342v342"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M19.9 21.1 40.3 6.2 60.9 21 54 0H26.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M92.3 25.5 84.4 1.3l-7.8 24.2H51.3l20.5 14.8-7.8 24 20.4-14.8L105 64.3l-7.9-24 20.5-14.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m136.3 69.2-7.8-24-7.8 24H95.5l20.4 14.9-7.8 24 20.4-14.8 20.6 14.8-7.8-24 20.4-14.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m179.4 112.3-7.8-24.1-7.8 24.1h-25.3l20.5 14.9-7.8 24 20.4-14.8 20.6 14.8-7.9-24 20.5-15z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m222.5 155.3-7.8-24-7.8 24h-25.4l20.6 15-7.8 24 20.4-14.9 20.4 14.9-7.8-24 20.6-15z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m265.6 198.4-7.8-24-7.8 24h-25.4l20.6 14.9-7.8 24.1 20.4-14.9 20.4 14.9-7.8-24.2 20.5-14.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m308.7 241.5-7.9-24-7.8 24h-25.3l20.5 14.8-7.9 24.2 20.6-14.9 20.4 14.8-7.8-24.1 20.5-14.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m351.7 284.6-7.8-24.2-7.8 24.2h-25.3l20.4 14.8-7.8 24.1 20.5-14.9 20.5 14.9-7.8-24.1 20.4-14.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m387 303.5-7.9 24.1-25.3.1 19.8 14.3h26.6l19.9-14.4h-25.3z"
  })));
};
var BB = function BB2(_ref19) {
  var title = _ref19.title, rest = _objectWithoutProperties(_ref19, _excluded19);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffc726",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h171v342H0zm342 0h171v342H342z",
    fill: "#00267f"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m325.74 101.02-31.97 12.4c-.68 1.35-5.79 7.54-8.18 53.06h-17.05v-60.42L256 78.68l-12.54 27v60.8H226.4c-2.39-45.53-7.8-52.48-8.47-53.84l-31.68-11.63c.15.31 15.4 31.34 15.4 78.01v12.54h41.81v71.07h25.08v-71.07h41.81v-12.54c0-24.13 4.17-44.02 7.68-56.46 3.82-13.57 7.7-21.49 7.74-21.57l-.03.03z"
  }));
};
var BD = function BD2(_ref20) {
  var title = _ref20.title, rest = _objectWithoutProperties(_ref20, _excluded20);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "49.59 85.333 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#2d6e41",
    d: "M0 85.331h513v342H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#F40B32",
    cx: 218.902,
    cy: 256.5,
    r: 115
  }));
};
var BE = function BE2(_ref21) {
  var title = _ref21.title, rest = _objectWithoutProperties(_ref21, _excluded21);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#fdda25",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ef3340",
    d: "M342 0h171v342H342z"
  }));
};
var BF = function BF2(_ref22) {
  var title = _ref22.title, rest = _objectWithoutProperties(_ref22, _excluded22);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#3d944f",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ef2b2d",
    d: "M0 0h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m256 102.6 16.9 52h54.7l-44.2 32.2 16.8 52-44.2-32.1-44.2 32.1 16.8-52-44.2-32.2h54.7z"
  }));
};
var BG = function BG2(_ref23) {
  var title = _ref23.title, rest = _objectWithoutProperties(_ref23, _excluded23);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#00966e",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#d62612",
    d: "M0 228h513v114H0z"
  }));
};
var BH = function BH2(_ref24) {
  var title = _ref24.title, rest = _objectWithoutProperties(_ref24, _excluded24);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "61.56 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m222.8 34.3-85.2 34.2 85.2 34.1-85.2 34.1 85.2 34.1-85.2 34.1 85.2 34.1-85.2 34.1 85.2 34.1-85.2 34.8H0V0h137.6z"
  }));
};
var BI = function BI2(_ref25) {
  var title = _ref25.title, rest = _objectWithoutProperties(_ref25, _excluded25);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M215.9 170.7 0 314.6V26.8zM513 26.8v287.8L297.1 170.7z",
    fill: "#47a644"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M513 26.8 296.1 170.7 513 314.6V342h-41.1L256 197.4 40.1 342H0v-27.4l215.9-143.9L0 26.8V0h40.1L256 143.9 471.9 0H513z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 26.8 297.1 170.7 513 314.6V342h-40L256 197.4 39 342H0v-27.4l215.9-143.9L0 26.8V0h40.1L256 143.9 471.9 0H513z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 251.6,
    cy: 170.7,
    r: 100.2
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m251.4 103.6 7.4 12.9h14.8l-7.4 12.8 7.4 12.8h-14.8l-7.4 12.9-7.4-12.9h-14.8l7.4-12.8-7.4-12.8H244zm38.8 66.7 7.4 12.9h14.8L305 196l7.4 12.8h-14.8l-7.4 12.9-7.4-12.9h-14.9l7.4-12.8-7.4-12.8h14.9zm-77.2 0 7.4 12.9h14.9l-7.4 12.8 7.4 12.8h-14.9l-7.4 12.9-7.4-12.9h-14.8l7.4-12.8-7.4-12.8h14.8z",
    fill: "#D80027",
    stroke: "#47a644",
    strokeWidth: 3
  }));
};
var BJ = function BJ2(_ref26) {
  var title = _ref26.title, rest = _objectWithoutProperties(_ref26, _excluded26);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "58.14 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#008751",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fcd116",
    d: "M197 0h316v171H197z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#e8112d",
    d: "M197 171h316v171H197z"
  }));
};
var BL = function BL2(_ref27) {
  var title = _ref27.title, rest = _objectWithoutProperties(_ref27, _excluded27);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M157.3 199.8s-9 43.9-19.3 40.4c-10.6-3.5-17.5-18.8-17.5-18.8L106 242.6s38.2 8.5 41 5.5c1.2-1.1 8.2-15.1 10.3-26.1v-22.2zm-56.1 60.5s-2.5 20.2-1.1 22.7c1.2 2.3 39.5 11.3 39.5 11.3s-25 16.5-29.7 20.5l-18.1-29.9-.7-24.6h10.1zm11.3-165.7s39.7 41.6 40.4 45.5c.7 3.7-4.2 3.2-4.2 3.2s-44.8-37.5-49.9-41.1c-5.4-3.5 13.7-7.6 13.7-7.6zm246.7 106.7s9 42.4 19.2 38.9c10.6-3.5 17.5-18.8 17.5-18.8l14.5 21.2s-37 8.5-39.8 5.5c-1.2-1.1-9.3-13.8-11.5-24.7l.1-22.1zm56 59s2.5 20.2 1.1 22.7c-1.2 2.3-39.5 11.3-39.5 11.3s25 16.5 29.7 20.5l18.1-29.9.7-24.6h-10.1zM403.9 94.6s-39.6 41.6-40.4 45.5c-.7 3.7 4.2 3.2 4.2 3.2s44.8-37.5 49.9-41.1c5.2-3.5-13.7-7.6-13.7-7.6z",
    fill: "#E6BC00"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M99.4 104.7s17-.7 16.6-11.5c-.4-10.6-11.2-14.9-19.1-12.4-8 2.3-23 13.4-13.6 35.1 9.4 21.4 23.4 29.4 26.2 47.8 0 0-5.5 9.9-19.1.4-16.9-11.8-6.2-38.2-10.4-45-4.2-7.1-41-38.9-41-38.9s-30.2 39.4-18 74.9c17 49.2 51.7 32 64.6 36.8 0 0-42.1 62-49.6 67.1 0 0 24.1 8.3 47.8-18.8 0 0 5.8 9.7 7.1 20.2h10.3c4.8-26.2 51.5-64.3 49.9-82.3-1.8-21.3-49.2-49.5-51.7-73.4zM365.1 178c-1.6 18.1 45.1 56.1 49.9 82.3h10.3c1.2-10.4 7.1-20.2 7.1-20.2 23.7 27.1 47.8 18.8 47.8 18.8-7.4-5.1-49.6-67.1-49.6-67.1 12.9-4.8 47.7 12.4 64.6-36.8 12.2-35.6-18-74.9-18-74.9s-36.7 31.8-41 38.9c-4.2 6.7 6.5 33.2-10.4 45-13.7 9.5-19.1-.4-19.1-.4 2.8-18.4 16.8-26.4 26.2-47.8 9.4-21.6-5.7-32.8-13.6-35.1-8-2.5-18.8 1.8-19.1 12.4-.4 10.8 16.6 11.5 16.6 11.5-2.5 24-49.9 52.2-51.7 73.4z",
    fill: "#ADADAD"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#125ECC",
    d: "M157.3 87.1h201.8v145.5c0 16.1-9.7 21.4-21.9 31.8l-45.9 39.4c-18.2 15.6-47.9 15.6-66.1 0l-46-39.4c-12.1-10.4-21.9-15.7-21.9-31.8V87.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFE600",
    d: "M200.6 147.7c-8 0-14.4-6.4-14.4-14.4s6.4-14.4 14.4-14.4 14.4 6.4 14.4 14.4-6.5 14.4-14.4 14.4zm57.6-3c-8 0-14.4-6.4-14.4-14.4s6.4-14.4 14.4-14.4 14.4 6.4 14.4 14.4-6.4 14.4-14.4 14.4zm57.7 3c-8 0-14.4-6.4-14.4-14.4s6.5-14.4 14.4-14.4 14.4 6.4 14.4 14.4-6.5 14.4-14.4 14.4zM215 274.4c-8 0-14.4-6.5-14.4-14.4 0-8 6.4-14.4 14.4-14.4s14.4 6.4 14.4 14.4-6.5 14.4-14.4 14.4zm43.2 14.5c-8 0-14.4-6.5-14.4-14.4s6.4-14.4 14.4-14.4 14.4 6.5 14.4 14.4-6.4 14.4-14.4 14.4zm43.2-14.5c-8 0-14.4-6.5-14.4-14.4 0-8 6.5-14.4 14.4-14.4s14.4 6.4 14.4 14.4c.1 8-6.4 14.4-14.4 14.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D60537",
    d: "M157.3 175.4h201.8V233H157.3v-57.6z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#EACE00",
    d: "M142.9 43.8s57.6-14.4 115.3-14.4 115.3 14.4 115.3 14.4l-14.4 57.7s-50.5-14.4-100.9-14.4-100.9 14.4-100.9 14.4l-14.4-57.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#7A6920",
    d: "M258.2 72.7c-8 0-14.4-6.4-14.4-14.4s6.4-14.4 14.4-14.4 14.4 6.5 14.4 14.4-6.4 14.4-14.4 14.4zm57.7 5c-8 0-14.4-6.4-14.4-14.4s6.5-14.4 14.4-14.4 14.4 6.5 14.4 14.4-6.5 14.4-14.4 14.4zm-115.3 0c-8 0-14.4-6.4-14.4-14.4s6.4-14.4 14.4-14.4S215 55.3 215 63.2s-6.5 14.5-14.4 14.5z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 258.2,
    cy: 204.2,
    r: 16.9
  }));
};
var BM = function BM2(_ref28) {
  var title = _ref28.title, rest = _objectWithoutProperties(_ref28, _excluded28);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "116.28 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#c8102e",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 2,
    d: "M303.9 94.94v99.69c0 59.81 79.75 99.69 79.75 99.69s79.75-39.88 79.75-99.69V94.94H303.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#2F8F22",
    d: "M436.37 254.44H330.93c23.13 25.08 52.72 39.88 52.72 39.88s29.59-14.8 52.72-39.88z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#65B5D2",
    cx: 383.65,
    cy: 214.56,
    r: 39.88
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#c8102e",
    cx: 343.77,
    cy: 194.63,
    r: 19.94
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#c8102e",
    cx: 423.52,
    cy: 194.63,
    r: 19.94
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#c8102e",
    cx: 383.65,
    cy: 154.75,
    r: 19.94
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#c8102e"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var BN = function BN2(_ref29) {
  var title = _ref29.title, rest = _objectWithoutProperties(_ref29, _excluded29);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "94.05 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m0 193.74 513 127.19V214.26L0 97.08z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 234.26v-86.67L0 20.41v86.67"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027",
    stroke: "#231F20",
    strokeWidth: 3,
    strokeMiterlimit: 10
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M306.4 134.01a50.28 50.28 0 0 1 6.07 24.02c0 21.55-13.51 39.94-32.52 47.19v-59.51c5.7-1.19 10-6.37 10-12.59 6.9 0 12.5-5.75 12.5-12.85h-.42c6.9 0 12.91-5.75 12.91-12.85h-34.99V76.58l-14.99-27.71-15 27.71v30.84h-34.99c0 7.1 6.01 12.85 12.91 12.85h-.42c0 7.1 5.6 12.85 12.5 12.85 0 6.22 4.29 11.4 9.99 12.59v61.37c-22.09-5.39-38.48-25.3-38.48-49.05 0-8.7 2.2-16.88 6.07-24.02-10.96 11.21-17.72 26.53-17.72 43.44 0 34.32 27.82 62.15 62.15 62.15s62.15-27.83 62.15-62.15c0-16.91-6.77-32.24-17.72-43.44z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M198.46 226.81s20.69 27.71 66.5 27.71 66.5-27.71 66.5-27.71l13.47 28.37s-21.03 27.71-79.97 27.71-79.97-27.71-79.97-27.71l13.47-28.37zm-69.22-93.63h20.88l24.93 27.26v73.45h-26.28v-68.37zm270.76 0h-20.88l-24.93 27.26v73.45h26.27v-68.37z"
  })));
};
var BO = function BO2(_ref30) {
  var title = _ref30.title, rest = _objectWithoutProperties(_ref30, _excluded30);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#d52b1e",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f9e300",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#007934",
    d: "M0 228h513v114H0z"
  }));
};
var BQ_BO = function BQ_BO2(_ref31) {
  var title = _ref31.title, rest = _objectWithoutProperties(_ref31, _excluded31);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012a87",
    d: "M0 342h513V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f9d90f",
    d: "M250.4 0H0v166.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#dc171d",
    d: "m140.4 118.3 12.2 21.2h24.5l-12.3 21.1 12.3 21.2h-24.5L140.4 203l-12.2-21.2h-24.5l12.3-21.2-12.3-21.1h24.5z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 9,
    strokeMiterlimit: 10,
    cx: 140.4,
    cy: 160.6,
    r: 57.7
  }));
};
var BQ_SA = function BQ_SA2(_ref32) {
  var title = _ref32.title, rest = _objectWithoutProperties(_ref32, _excluded32);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#DC171D",
    d: "M512 342H0V.7h512V342z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012A87",
    d: "M512 342H0V171.3h512V342z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M256 342 0 171.3 256 .7l256 170.7L256 342z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F9D90F",
    d: "m199.2 249.5 21.7-66.8-56.8-41.2h70.5L256 74.7l21.7 66.8h70.2l-56.8 41.2 21.7 66.8-56.8-41.3z"
  }));
};
var BQ_SE = function BQ_SE2(_ref33) {
  var title = _ref33.title, rest = _objectWithoutProperties(_ref33, _excluded33);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "150 0 600 600"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h900v600H0z",
    fill: "#dc171d"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M450 168.787 215.691 300 450 431.213 684.309 300z",
    fill: "#fff"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M281.477 336.852V376h69.961l290.727-52.4V376h-93.668z",
    fill: "#dc171f"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M188 288H20V20h418v128zm524 0h168V20H462v128zm-524 24H20v268h418V452zm524 0h168v268H462V452z",
    fill: "#012a87"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m450 199.5 8.068 24.827h26.105l-21.12 15.346 8.067 24.827L450 249.157 428.88 264.5l8.066-24.827-21.119-15.345 26.105-.001z",
    fill: "#f9d90f"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M281.477 336.852c2.712-8.848 8.614-12.77 16.594-10.995 4.94-18.73 27.739-22.07 36.786-12.857l22.273 22.37c4.837 2.251 12.207 3.095 17.326 3.095 6.33.1 5.621 3.005 10.91 3.106 14.096.27 51.143.458 57.857 0 2.75-.187 64.134-67.857 64.134-67.857 5.12-6.31 18.453-8.333 25.714-3.214 6.786 6.429 13.929 7.143 18.929 2.857 4.405-6.547 14.392-7.309 20.714-3.571l69.45 53.815L548.497 376H351.438l-69.96-39.148z",
    fill: "#008830"
  }));
};
var BQ = function BQ2(_ref34) {
  var title = _ref34.title, rest = _objectWithoutProperties(_ref34, _excluded34);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "15.39 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012a87",
    d: "M0 342h513V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f9d90f",
    d: "M250.4 0H0v166.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#dc171d",
    d: "m140.4 118.3 12.2 21.2h24.5l-12.3 21.1 12.3 21.2h-24.5L140.4 203l-12.2-21.2h-24.5l12.3-21.2-12.3-21.1h24.5z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 9,
    strokeMiterlimit: 10,
    cx: 140.4,
    cy: 160.6,
    r: 57.7
  }));
};
var BR = function BR2(_ref35) {
  var title = _ref35.title, rest = _objectWithoutProperties(_ref35, _excluded35);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#009b3a",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fedf00",
    d: "m256.5 19.3 204.9 151.4L256.5 322 50.6 170.7z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 256.5,
    cy: 171,
    r: 80.4
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#002776",
    d: "M215.9 165.7c-13.9 0-27.4 2.1-40.1 6 .6 43.9 36.3 79.3 80.3 79.3 27.2 0 51.3-13.6 65.8-34.3-24.9-31-63.2-51-106-51zm119 20.3c.9-5 1.5-10.1 1.5-15.4 0-44.4-36-80.4-80.4-80.4-33.1 0-61.5 20.1-73.9 48.6 10.9-2.2 22.1-3.4 33.6-3.4 46.8.1 89 19.5 119.2 50.6z"
  }));
};
var BS = function BS2(_ref36) {
  var title = _ref36.title, rest = _objectWithoutProperties(_ref36, _excluded36);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffc72c",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0zm0 228h513v114H0z",
    fill: "#00778b"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M256 171 0 342V0z"
  }));
};
var BT = function BT2(_ref37) {
  var title = _ref37.title, rest = _objectWithoutProperties(_ref37, _excluded37);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF7415",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M513 0H0v342"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: "#FFF",
    strokeWidth: 42,
    strokeMiterlimit: 10,
    d: "M128.7 255.5s35 54 67.3 32.4c56.9-37.9-68.9-108.6-2.9-152.6 58.3-38.8 76.6 103.5 137.6 62.8 59-39.3-64.7-111.4-9.2-148.4 33.4-22.2 67.1 32.6 67.1 32.6"
  }));
};
var BV = function BV2(_ref38) {
  var title = _ref38.title, rest = _objectWithoutProperties(_ref38, _excluded38);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "56.43 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#EF2B2D",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    className: "prefix__st1",
    d: "M139.9 0h93.3v342h-93.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    className: "prefix__st1",
    d: "M0 119h513v104.1H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#002868",
    d: "M163.2 0h46.6v342h-46.6z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#002868",
    d: "M0 145h513v52H0z"
  }));
};
var BW = function BW2(_ref39) {
  var title = _ref39.title, rest = _objectWithoutProperties(_ref39, _excluded39);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 238h513v104H0zM0 0h513v104H0z",
    fill: "#6da9d2"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 125.5h513v89.656H0z"
  }));
};
var BY = function BY2(_ref40) {
  var title = _ref40.title, rest = _objectWithoutProperties(_ref40, _excluded40);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.42 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#007C30",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#CE1720",
    d: "M0 230h513V0H0"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M100 230V0H0v342h513-413z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M28 159.6 8.6 128.2 28 97.4l19.3 30.8zm44.6 0-19.3-31.4 19.3-30.8L92 128.2zM28 241.2 8.6 209.8 28 179l19.3 30.8zm44.6 0-19.3-31.4L72.6 179 92 209.8z",
    fill: "#CE1720"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m28 73.8-16.1-26L28 22.2l16 25.6zm44.6 0-16-26 16-25.6 16.1 25.6zM28 318l-16.1-26.1L28 266.3l16 25.6zm44.6 0-16-26.1 16-25.6 16.1 25.6z",
    fill: "none",
    stroke: "#CE1720",
    strokeWidth: 7
  }));
};
var BZ = function BZ2(_ref41) {
  var title = _ref41.title, rest = _objectWithoutProperties(_ref41, _excluded41);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "94.05 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#003e87",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 260.9,
    cy: 170.9,
    r: 118.9
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "none",
    stroke: "#6DA544",
    strokeWidth: 18,
    strokeMiterlimit: 10,
    cx: 261.9,
    cy: 173.1,
    r: 94.5
  }), /* @__PURE__ */ React.createElement("g", {
    stroke: "#000"
  }, /* @__PURE__ */ React.createElement("path", {
    fill: "#003e87",
    d: "m261.9 151.5-50.6 23.4v20c0 11.8 6.1 22.8 16.2 28.9L262 239l34.5-15.2c10-6.2 16.2-17.1 16.2-28.9v-20l-50.8-23.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M211.3 128.1h101.3v46.7H211.3z"
  })), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v35H0zm0 306h513v35H0z",
    fill: "#ce1127"
  }));
};
var CA = function CA2(_ref42) {
  var title = _ref42.title, rest = _objectWithoutProperties(_ref42, _excluded42);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h142v342H0zm371 0h142v342H371zm-64.5 206 50.4-25.2-25.2-12.6V143l-50.4 25.2 25.2-50.4h-25.2L256.1 80l-25.2 37.8h-25.2l25.2 50.4-50.4-25.2v25.2l-25.2 12.6 50.4 25.2-12.6 25.2h50.4V269h25.2v-37.8h50.4z",
    fill: "red"
  }));
};
var CC = function CC2(_ref43) {
  var title = _ref43.title, rest = _objectWithoutProperties(_ref43, _excluded43);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "152.19 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "green",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m422.7 252.4 6.2 12.8 13.8-3.2-6.2 12.8 11.2 8.8-13.9 3.2V301l-11.1-8.9-11.1 8.9v-14.2l-13.8-3.2 11.1-8.8-6.2-12.8 13.9 3.2zm-46.6-136.3 6.2 12.9 13.8-3.2-6.2 12.8 11.2 8.8-13.9 3.1v14.3l-11.1-8.9-11.1 8.9.1-14.3-13.9-3.1 11.1-8.8-6.2-12.8L370 129zm37-77.8 6.2 12.8 13.8-3.2-6.2 12.8 11.2 8.9-13.9 3.1v14.2L413.1 78 402 86.9l.1-14.2-13.9-3.1 11.1-8.9-6.2-12.8 13.9 3.2zm51.8 58.4 6.2 12.8 13.9-3.2-6.3 12.8 11.2 8.9-13.9 3.1.1 14.2-11.2-8.9-11.1 8.9.1-14.2L440 128l11.2-8.9-6.3-12.8 13.9 3.2zm-28 68.1 4.9 14.8h15.6l-12.6 9.2 4.8 14.9-12.7-9.2-12.6 9.2 4.8-14.9-12.6-9.2h15.6zM306.8 254.7c-49.2 0-89.1-39.9-89.1-89.1s39.9-89.1 89.1-89.1c15.3 0 29.8 3.9 42.4 10.7C329.4 67.9 302.3 56 272.5 56c-60.5 0-109.6 49.1-109.6 109.6S212 275.3 272.5 275.3c29.8 0 56.9-11.9 76.6-31.3-12.6 6.8-27 10.7-42.3 10.7zM140.4 59.5C129.7 41 109.7 28.6 86.8 28.6S44 41 33.3 59.5h107.1zm.2.4-53.8 53.8-53.7-53.8C28 68.9 25 79.3 25 90.5c0 34.2 27.7 61.9 61.9 61.9s61.9-27.7 61.9-61.9c-.1-11.2-3.1-21.6-8.2-30.6z",
    fill: "#FFDA44"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A2001D",
    d: "M71.4 98.2v52.2c4.9 1.3 10.1 1.9 15.5 1.9s10.5-.7 15.5-1.9V98.2h-31z"
  }));
};
var CD = function CD2(_ref44) {
  var title = _ref44.title, rest = _objectWithoutProperties(_ref44, _excluded44);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M513 66.9V0H411.7L0 274.4V342h100.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M513 0v40.1L60.2 342H0v-40.8L451.8 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m93.6 31.2 16.3 50.4H163l-42.9 31.2 16.4 50.5-42.9-31.2-43 31.2L67 112.8 24.1 81.6h53.1z"
  }));
};
var CF = function CF2(_ref45) {
  var title = _ref45.title, rest = _objectWithoutProperties(_ref45, _excluded45);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "17.1 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#d21034",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 171h211.5v85.3H0zm300.5 0H512v85.3H300.5z",
    fill: "#3a9927"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#003082",
    d: "M0 0v85.3h211.5V0h89v85.3H513V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M300.5 85.3H512v85.3H300.5zM0 85.3h211.5v85.3H0z",
    fill: "#FFF"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M300.5 342h-89v-86H0v86h513v-86H300.5zM105.7 8.6l8.6 26.2h27.5L119.5 51l8.6 26.2L105.7 61 83.4 77.2 91.9 51 69.6 34.8h27.6z",
    fill: "#ffce00"
  }));
};
var CG = function CG2(_ref46) {
  var title = _ref46.title, rest = _objectWithoutProperties(_ref46, _excluded46);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "150 0 600 600"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#009739",
    d: "M0 0h900v600H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 600 600 0h300v600z",
    fill: "#ffd100"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M900 0v600H300z",
    fill: "#dc241f"
  }));
};
var CH = function CH2(_ref47) {
  var title = _ref47.title, rest = _objectWithoutProperties(_ref47, _excluded47);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "128 0 512 512"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "red",
    d: "M0 0h768v512H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M336 96h96v112h112v96H432v112h-96V304H224v-96h112V96z"
  }));
};
var CI = function CI2(_ref48) {
  var title = _ref48.title, rest = _objectWithoutProperties(_ref48, _excluded48);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#009e60",
    d: "M342 0h171v342H342z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f77f00",
    d: "M0 0h171v342H0z"
  }));
};
var CK = function CK2(_ref49) {
  var title = _ref49.title, rest = _objectWithoutProperties(_ref49, _excluded49);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m384 71.4 5.3 16.2h17.1l-13.9 10.1 5.3 16.2-13.8-10-13.8 10 5.3-16.2-13.9-10.1h17.1zm-70.2 29.1 15.2 7.7 12.1-12.1-2.7 16.9 15.3 7.8-16.9 2.6-2.7 16.9-7.8-15.2-16.8 2.7 12.1-12.1zm-29.1 70.2 16.3-5.3v-17.1l10 13.8 16.3-5.3-10.1 13.9 10.1 13.8-16.3-5.3-10 13.8v-17.1zm29.1 70.2 7.7-15.3-12-12 16.8 2.6 7.8-15.2 2.7 16.9 16.9 2.7-15.3 7.7 2.7 16.9-12.1-12.1zM384 270l-5.3-16.3h-17.1l13.9-10-5.3-16.3 13.8 10 13.8-10-5.3 16.3 13.9 10h-17.1zm70.2-29.1-15.2-7.8-12.1 12.1 2.7-16.9-15.3-7.7 16.9-2.7 2.7-16.9 7.8 15.2 16.8-2.6-12.1 12zm29.1-70.2-16.3 5.2V193l-10-13.8-16.3 5.3 10.1-13.8-10.1-13.9 16.3 5.3 10-13.8v17.1zm-29.1-70.2-7.7 15.2 12 12.1-16.8-2.7-7.8 15.2-2.7-16.9-16.9-2.6 15.3-7.8-2.7-16.9 12.1 12.1z",
    fill: "#FFF"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var CL = function CL2(_ref50) {
  var title = _ref50.title, rest = _objectWithoutProperties(_ref50, _excluded50);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M196 0h317v171H196z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0037A1",
    d: "M0 0h196v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M98 24.5 113.1 71H162l-39.6 28.7 15.2 46.5L98 117.5l-39.6 28.7 15.2-46.5L34 71h48.9z"
  }));
};
var CM = function CM2(_ref51) {
  var title = _ref51.title, rest = _objectWithoutProperties(_ref51, _excluded51);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ce1126",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#007a5e",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M342 0h171v342H342zm-86 102.2 17.2 53H329L283.9 188l17.2 53-45.1-32.7-45.1 32.7 17.2-53-45.1-32.8h55.8z",
    fill: "#fcd116"
  }));
};
var CN = function CN2(_ref52) {
  var title = _ref52.title, rest = _objectWithoutProperties(_ref52, _excluded52);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "75.24 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m226.8 239.2-9.7-15.6-17.9 4.4 11.9-14.1-9.7-15.6 17.1 6.9 11.8-14.1-1.3 18.4 17.1 6.9-17.9 4.4zM290.6 82l-10.1 15.4 11.6 14.3-17.7-4.8-10.1 15.5-1-18.4-17.7-4.8 17.2-6.6-1-18.4 11.6 14.3zm-54.4-56.6-2 18.3 16.8 7.6-18 3.8-2 18.3-9.2-16-17.9 3.8 12.3-13.7-9.2-15.9 16.8 7.5zm56.6 136.4-14.9 10.9 5.8 17.5-14.9-10.8-14.9 11 5.6-17.6-14.9-10.7 18.4-.1 5.6-17.6 5.8 17.5zM115 46.3l17.3 53.5h56.2l-45.4 32.9 17.3 53.5-45.4-33-45.5 33 17.4-53.5-45.5-32.9h56.3z",
    fill: "#FFDA44"
  }));
};
var CO = function CO2(_ref53) {
  var title = _ref53.title, rest = _objectWithoutProperties(_ref53, _excluded53);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 256.5h513V342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 171h513v85.5H0z"
  }));
};
var CR = function CR2(_ref54) {
  var title = _ref54.title, rest = _objectWithoutProperties(_ref54, _excluded54);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 285h513v57H0zM0 0h513v57H0z"
  }));
};
var CU = function CU2(_ref55) {
  var title = _ref55.title, rest = _objectWithoutProperties(_ref55, _excluded55);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF9811",
    d: "M0-40.8v422.9-211.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v68.3H0zm0 136.5h513v68.3H0zm0 136.6h513v68.3H0z",
    fill: "#0052B4"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M256 170.7 0 342V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m86.5 111.4 12.7 39.2h41.3l-33.4 24.2 12.8 39.3-33.4-24.2-33.4 24.2 12.8-39.3-33.4-24.2h41.2z"
  }));
};
var CV = function CV2(_ref56) {
  var title = _ref56.title, rest = _objectWithoutProperties(_ref56, _excluded56);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "17.1 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#003893",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#cf2027",
    d: "M0 182.2h513v41.4H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 140.8h513v41.4H0zm0 82.8h513V265H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m150.4 70 6.9 21.1h22.2l-18 13.1 6.9 21.1-18-13.1-17.9 13.1 6.8-21.1-17.9-13.1h22.2zm0 209.7 6.9 21.1h22.2l-18 13 6.9 21.2-18-13.1-17.9 13.1 6.8-21.2-17.9-13h22.2zm-97.6-70.9 6.9 21.1h22.2l-18 13 6.9 21.2-18-13.1-17.9 13.1 6.8-21.2-17.9-13H46zM90.1 91l6.9 21.1h22.2l-18 13 6.9 21.2-18-13.1-17.9 13.1 6.8-21.2-18-13h22.3zm-66.3 71H46l6.8-21.1 6.9 21.1h22.2l-18 13.1 6.9 21.1-18-13-17.9 13 6.8-21.1zm48.4 148.9 6.8-21.1-18-13h22.3l6.8-21.2 6.9 21.2h22.2l-18 13 6.9 21.1-18-13zM248 208.8l-6.9 21.1h-22.2l18 13-6.9 21.2 18-13.1 18 13.1-6.9-21.2 18-13h-22.2zM210.7 91l-6.8 21.1h-22.2l17.9 13-6.8 21.2 17.9-13.1 18 13.1-6.9-21.2 18-13h-22.2zm66.4 71h-22.2l-6.9-21.1-6.9 21.1h-22.2l18 13.1-6.9 21.1 18-13 18 13-6.9-21.1zm-48.4 148.9-6.9-21.1 18-13h-22.2l-6.9-21.2-6.8 21.2h-22.2l17.9 13-6.8 21.1 17.9-13z",
    fill: "#f7d116",
    stroke: "#000"
  }));
};
var CW = function CW2(_ref57) {
  var title = _ref57.title, rest = _objectWithoutProperties(_ref57, _excluded57);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "11.97 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#002b7f",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f9e814",
    d: "M0 233.5h513v51H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m168.7 86.5 12.9 39.8h41.8l-33.8 24.5 12.9 39.7-33.8-24.5-33.8 24.5 12.9-39.7-33.8-24.5h41.8zm-83.3-54 7.8 23.9h25L97.9 71.1l7.8 23.8-20.3-14.7-20.3 14.7 7.8-23.8-20.3-14.7h25.1z",
    fill: "#FFF"
  }));
};
var CX = function CX2(_ref58) {
  var title = _ref58.title, rest = _objectWithoutProperties(_ref58, _excluded58);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "99.18 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0021ad",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1c8a42",
    d: "M0 0h513v342"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m77.6 272 5.7 11.9 12.8-3-5.7 11.9 10.3 8.1-12.8 2.9V317l-10.3-8.3-10.2 8.3v-13.2l-12.8-2.9 10.3-8.1-5.8-11.9 12.9 3zm-37.1-98.9 5.7 11.9 12.8-3-5.7 11.8 10.3 8.2-12.9 2.9.1 13.2-10.3-8.3-10.3 8.3.1-13.2-12.9-2.9 10.4-8.2L22 182l12.8 3zm37.1-80.9 5.7 11.8 12.8-2.9-5.7 11.8 10.3 8.2-12.8 2.9v13.1l-10.3-8.2-10.2 8.2V124l-12.8-2.9 10.3-8.2-5.8-11.8L72 104zm46.1 62.9 5.7 11.9 12.8-3-5.7 11.9 10.3 8.1-12.8 2.9v13.2l-10.3-8.2-10.2 8.2v-13.2l-12.8-2.9 10.3-8.1-5.7-11.9 12.8 3zm-32.9 54 4.4 13.7h14.5L98 231.3l4.5 13.7-11.7-8.4-11.7 8.4 4.5-13.7-11.7-8.5h14.4z",
    fill: "#FFF"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#ffc639",
    cx: 267.1,
    cy: 170.7,
    r: 74.5
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1c8a42",
    d: "M267.1 220.3h24.8s10.8-19 0-37.2l24.8-24.8-12.4-24.8h-12.4s-6.2 18.6-31 18.6-31-18.6-31-18.6h-12.4l12.4 24.8-12.4 24.8 12.4 12.4s12.4-24.8 37.2-12.4c0 0 10.5 15.5 0 37.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffc639",
    d: "M464.4 92.2c.6-2.9-.2-17.6-.2-20.7 0-21.3-13.9-39.4-33.2-45.7 5.9 12 9.2 25.4 9.2 39.7 0 4.8-.4 9.5-1.1 14.1-2.9-4.7-6.6-8.9-11.2-12.6-17.1-13.6-40.6-14-57.9-2.5 13.4 2.9 26.3 8.9 37.7 18 9 7.1 16.2 16.8 21.7 26.1 0 0-17.8 10.9-31 15.1s-42.3 7.9-42.3 7.9c72 12 132-36 132-36-6.5-13.4-15.8-4-23.7-3.4z"
  }));
};
var CY = function CY2(_ref59) {
  var title = _ref59.title, rest = _objectWithoutProperties(_ref59, _excluded59);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#DB7D00",
    d: "M141.7 154.7s.2 67.1 74.7 65.3l4.5 13.9h8.9s-7.4-41.1 60.1-41.5c0 0 0-27.6 27.6-27.6H359s-66-51.8 58.9-118l1.8-13.1s-129.9 71-198.9 57.2c0 0 10.7 42.5-10.8 42.5-10.8 0-9.7-8.1-32.3-8.1-18.7 0-17.3 19.7-26.3 19.5-8.9-.2-18.8-12.3-19.6-10.2-.7 2.1 9.9 20.1 9.9 20.1z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#006651"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M237.2 308.1c6.9-5 13-6.6 22.4-8.3s19.4-4.4 24.6-5.8-17.7 6.6-23.5 8.3c-5.8 1.6-23.5 5.8-23.5 5.8zm37.9-14.7c-1.9-11.9 2.8-24.3 13.5-29.3 2.5 8.6-5.2 23.2-13.5 29.3zm18.2-6.2c-5.8-9.8 4-22.6 11.1-28.8 3.3 6-2.5 23.7-11.1 28.8zm16.9-7.6c-6.2-8.4 1.1-23.2 8.8-29 3.1 8.2.1 23.2-8.8 29zm16.9-10.6c-5.6-8-1.7-20.4 6.3-28.4 5.8 6.6.9 21-6.3 28.4zm13.5-10.7c-4.7-7.5 1.1-25.4 8.6-30.4 3.3 6.6.8 25.4-8.6 30.4zm10.8-2.8c-1.4-10.8 17.4-22.7 25.2-22.4-.9 8.9-8.9 18.6-25.2 22.4zm-10.5 12.2c8.8-9.1 26-9.1 32.1-7.2-1.7 5.3-21.9 16.9-32.1 7.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M328.7 276.8c12.4-3.3 20.5-6.1 27.9 1.7-5.2 6.6-25.4 4.7-27.9-1.7zm-17.7 8c11.9-6.4 26.3 3 28.5 8.6-13.3 5.5-28.7-7.2-28.5-8.6zm-16.3 9.2c10.8-4.1 23.2 1.4 28.2 7.5-5.8 2.7-21 5.7-28.2-7.5zm-14.9 4.7c12.4-1.4 24.4 8 27 13.4-15.9 1.5-22-3.2-27-13.4zm-4 9.4c-6.9-5-13-6.6-22.4-8.3-9.4-1.7-19.4-4.4-24.6-5.8-5.3-1.4 17.7 6.6 23.5 8.3 5.8 1.6 23.5 5.8 23.5 5.8zm-37.9-14.7c1.9-11.9-2.8-24.3-13.5-29.3-2.5 8.6 5.2 23.2 13.5 29.3zm-18.2-6.2c5.8-9.8-4-22.6-11.1-28.8-3.3 6 2.5 23.7 11.1 28.8zm-16.9-7.6c6.2-8.4-1.1-23.2-8.8-29-3.1 8.2-.1 23.2 8.8 29zM185.9 269c5.6-8 1.7-20.4-6.3-28.4-5.8 6.6-.9 21 6.3 28.4zm-13.5-10.7c4.7-7.5-1.1-25.4-8.6-30.4-3.3 6.6-.8 25.4 8.6 30.4zm-10.8-2.8c1.4-10.8-17.4-22.7-25.2-22.4.9 8.9 8.9 18.6 25.2 22.4zm10.5 12.2c-8.8-9.1-26-9.1-32.1-7.2 1.7 5.3 21.9 16.9 32.1 7.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M184.3 276.8c-12.4-3.3-20.5-6.1-27.9 1.7 5.2 6.6 25.4 4.7 27.9-1.7zm17.7 8c-11.9-6.4-26.3 3-28.5 8.6 13.3 5.5 28.7-7.2 28.5-8.6zm16.3 9.2c-10.8-4.1-23.2 1.4-28.2 7.5 5.8 2.7 21 5.7 28.2-7.5zm14.9 4.7c-12.4-1.4-24.4 8-27 13.4 15.9 1.5 22-3.2 27-13.4z"
  })));
};
var CZ = function CZ2(_ref60) {
  var title = _ref60.title, rest = _objectWithoutProperties(_ref60, _excluded60);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5.13 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#11457e",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#d7141a",
    d: "M513 171v171H0l256.5-171z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 0v171H256.5L0 0z"
  }));
};
var DE = function DE2(_ref61) {
  var title = _ref61.title, rest = _objectWithoutProperties(_ref61, _excluded61);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 228h513v114H0z"
  }));
};
var DJ = function DJ2(_ref62) {
  var title = _ref62.title, rest = _objectWithoutProperties(_ref62, _excluded62);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "13.68 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#12ad2b",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6ab2e7",
    d: "M513 0v166.7L0 170.8V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M256 170.7 0 342V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#d7141a",
    d: "m89.8 92.5 17 52.4H162l-44.6 32.5 17 52.4-44.6-32.4-44.6 32.4 17-52.4-44.6-32.5h55.2z"
  }));
};
var DK = function DK2(_ref63) {
  var title = _ref63.title, rest = _objectWithoutProperties(_ref63, _excluded63);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "23.94 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#c60c30",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M190 0h-60v140H0v60h130v142h60V200h323v-60H190z"
  }));
};
var DM = function DM2(_ref64) {
  var title = _ref64.title, rest = _objectWithoutProperties(_ref64, _excluded64);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#496E2D",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 110.7v120h513v-120z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 110.7h513v40H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 190.7h513v40H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M196 0h120v342H196z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M196 0h40v342h-40z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M274.7 0h40v342h-40z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#D80027",
    cx: 256,
    cy: 170.7,
    r: 123.1
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m256 58.6 4.6 14.2h15l-12.1 8.9 4.6 14.2-12.1-8.8-12.1 8.8 4.6-14.2-12.1-8.9h15zM190.1 80l12.2 8.8 12.1-8.8-4.6 14.3 12.1 8.8h-15l-4.6 14.2-4.7-14.2h-15l12.1-8.8zm-40.7 56h15l4.6-14.2 4.7 14.2h15l-12.2 8.8 4.7 14.3-12.2-8.8-12.1 8.8 4.6-14.3zm0 69.3 12.1-8.8-4.6-14.3L169 191l12.2-8.8-4.7 14.3 12.2 8.8h-15l-4.7 14.3-4.6-14.3zm40.7 56.1 4.6-14.3-12.1-8.8h15l4.7-14.3 4.6 14.3h15l-12.1 8.8 4.6 14.3-12.1-8.9zm65.9 21.4-4.6-14.3h-15l12.1-8.8-4.6-14.3 12.1 8.8 12.1-8.8-4.6 14.3 12.1 8.8h-15zm65.9-21.4-12.2-8.9-12.1 8.9 4.6-14.3-12.1-8.8h15l4.6-14.3 4.7 14.3h15l-12.1 8.8zm40.7-56.1h-15l-4.6 14.3-4.7-14.3h-15l12.2-8.8-4.7-14.3L343 191l12.1-8.8-4.6 14.3zm0-69.3-12.1 8.8 4.6 14.3-12.1-8.8-12.2 8.8 4.7-14.3-12.2-8.8h15l4.7-14.2 4.6 14.2zm-40.7-56-4.6 14.3 12.1 8.8h-15l-4.7 14.2-4.6-14.2h-15l12.1-8.8-4.6-14.3 12.1 8.8zM279.3 168.7c-11-21.1-14.5-25.1-14.5-25.1s.4-9.7.4-15.6c0-8.8-7.4-15.8-16.5-15.8-8.6 0-15.7 2.9-16.5 11-4.2.9-8.6 4.1-8.6 10.7 0 4.8 1 7.3 5.2 9.3 2.1-4.6 4.3-4.8 9.3-6.4.8.6 1.7 3 2.6 3.4l.3 1s-13.3 6.6-13.3 30.9c0 29.5 22 45.4 22 45.4l-1.8.3-1.9 7.1h22v-7.2l11 17.5c.3-.3 10.2-47.6.3-66.5z",
    fill: "#496E2D"
  }));
};
var DO = function DO2(_ref65) {
  var title = _ref65.title, rest = _objectWithoutProperties(_ref65, _excluded65);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 216h211v126H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h211v126H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M302 0h211v126H302z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M302 216h211v126H302z"
  }), /* @__PURE__ */ React.createElement("g", {
    stroke: "#FFF",
    strokeWidth: 5,
    strokeMiterlimit: 10
  }, /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M256 130h-49.9v49.4s19.5 6 49.9 6V130z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M206.1 179.4v6c0 27.5 22.3 49.9 49.9 49.9v-49.9c-30.4 0-49.9-6-49.9-6z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M256 235.3c27.5 0 49.9-22.3 49.9-49.9v-6s-19.5 6-49.9 6v49.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M256 130v55.4c30.4 0 49.9-6 49.9-6V130H256z"
  })));
};
var DZ = function DZ2(_ref66) {
  var title = _ref66.title, rest = _objectWithoutProperties(_ref66, _excluded66);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "88.92 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#41662E",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M256.5 0H513v342H256.5z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "m341.5 105.3-29.4 40.4-47.5-15.4 29.4 40.4-29.4 40.4 47.5-15.4 29.4 40.4v-50l47.5-15.5-47.5-15.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M309.9 276.7c-58.5 0-106-47.5-106-106s47.5-106 106-106c18.3 0 35.4 4.6 50.4 12.7-23.5-23-55.7-37.2-91.2-37.2-72 0-130.4 58.4-130.4 130.4S197.1 301 269.1 301c35.5 0 67.7-14.2 91.2-37.2-14.9 8.2-32.1 12.9-50.4 12.9z"
  })));
};
var EC = function EC2(_ref67) {
  var title = _ref67.title, rest = _objectWithoutProperties(_ref67, _excluded67);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 170.7h513V256H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 256h513v85.3H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFDA44",
    cx: 256,
    cy: 171,
    r: 60
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#4C1F00",
    d: "M369.2 79.9s-27.2-13.8-33.9-16c-6.7-2.2-49.1-13.2-49.1-7 0 10.3-13.5 12-15.5 12s-2-5.3-14.8-5.3-13.7 4.8-15.8 4.8c-2.2 0-14.5-1-14.5-11.5 0-5.2-42.9 4-49.1 7-6.1 3.1-33.9 16-33.9 16s45.8 2.7 53.9 6.2 43.8 16.5 43.8 16.5l-2.8 13.3h37.8l-3.8-13.3s35.1-12.7 43.8-16.5 53.9-6.2 53.9-6.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#57BA17",
    d: "M217.7 171.7c0 21.1 17.2 38.3 38.3 38.3 21.1 0 38.3-17.2 38.3-38.3v-11.5h-76.5v11.5z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M256 110.5c-21.1 0-38.3 17.2-38.3 38.3v11.5h76.5v-11.5c.1-21.1-17.1-38.3-38.2-38.3z"
  }));
};
var EE = function EE2(_ref68) {
  var title = _ref68.title, rest = _objectWithoutProperties(_ref68, _excluded68);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#111",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#368FD8",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 228h513v114H0z"
  }));
};
var EG = function EG2(_ref69) {
  var title = _ref69.title, rest = _objectWithoutProperties(_ref69, _excluded69);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#C09300",
    d: "M220.3 204.4s0-58.4 4.5-64.7c3.1-4.3 16.8 5.2 22.7 4.5 0 0 4.2-7.5 4.5-12 .3-4.6-1.1-7.6-4.9-6.2 0 0-1.2-2.1.5-3.3 1.6-1.2 5.6.1 5.6.1s-.5-1 1.6-.9c2.9.2 7.2 1.4 7.4 5.6.2 3.1.3 7.7.4 8.7.7 6.8 2.7 8.7 2.7 8.7s18.4-9.2 22-5.2c3.3 3.8 4.5 64.7 4.5 64.7l-18.1-16.8 12.1 29.5s-14.4 2.4-28.9 2.4c-14.5 0-31.1-4.2-31.1-4.2l13.8-28.2-19.3 17.3z"
  }));
};
var EH = function EH2(_ref70) {
  var title = _ref70.title, rest = _objectWithoutProperties(_ref70, _excluded70);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#428823",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256 171 0 342V0zm53.1 0c0-22.9 13.1-42.1 34.6-46.8-3.3-.7-6.7-1.1-10.3-1.1-26.4 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9c3.5 0 7-.4 10.3-1.1-21.5-5.1-34.6-24.2-34.6-46.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m365 129.2 10.3 31.7h33.3l-27 19.6 10.3 31.7-26.9-19.6-27 19.6 10.3-31.7-27-19.6h33.4z"
  })));
};
var ER = function ER2(_ref71) {
  var title = _ref71.title, rest = _objectWithoutProperties(_ref71, _excluded71);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "22.23 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#56AF35",
    d: "M0 0h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "m0 342 513-171L0 0v342z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#ffc945"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M134.7 231.5c33.6 0 60.8-27.2 60.8-60.8s-27.2-60.8-60.8-60.8-60.8 27.2-60.8 60.8 27.2 60.8 60.8 60.8zm0 24.3c-47 0-85.2-38.1-85.2-85.2s38.1-85.2 85.2-85.2 85.2 38.1 85.2 85.2-38.2 85.2-85.2 85.2z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 119.5,
    cy: 148.3,
    r: 17.5
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 148.9,
    cy: 158.5,
    r: 17.5
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 134.7,
    cy: 135.2,
    r: 17.5
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 119.5,
    cy: 172.7,
    r: 17.5
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 149.9,
    cy: 182.8,
    r: 17.5
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 122.5,
    cy: 198,
    r: 17.5
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 145.9,
    cy: 205.2,
    r: 17.5
  })));
};
var ES_CT = function ES_CT2(_ref72) {
  var title = _ref72.title, rest = _objectWithoutProperties(_ref72, _excluded72);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "135 0 540 540"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FCDD09",
    d: "M0 0h810v540H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    stroke: "#DA121A",
    strokeWidth: 60,
    d: "M0 90h810m0 120H0m0 120h810m0 120H0"
  }));
};
var ES = function ES2(_ref73) {
  var title = _ref73.title, rest = _objectWithoutProperties(_ref73, _excluded73);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.75 0 15 15"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h22.5v15H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D03433",
    d: "M0 0h22.5v4H0V0zm0 11h22.5v4H0v-4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FBCA46",
    d: "M0 4h22.5v7H0V4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M7.8 7h1v.5h-1V7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A41517",
    d: "M7.2 8.5c0 .3.3.5.6.5s.6-.2.6-.5L8.5 7H7.1l.1 1.5zM6.6 7c0-.3.2-.5.4-.5h1.5c.3 0 .5.2.5.4V7l-.1 1.5c-.1.6-.5 1-1.1 1-.6 0-1-.4-1.1-1L6.6 7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A41517",
    d: "M6.8 7.5h2V8h-.5l-.5 1-.5-1h-.5v-.5zM5.3 6h1v3.5h-1V6zm4 0h1v3.5h-1V6zm-2.5-.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v.2c0 .2-.1.3-.3.3H7c-.1 0-.2-.1-.2-.2v-.3z"
  }));
};
var ET = function ET2(_ref74) {
  var title = _ref74.title, rest = _objectWithoutProperties(_ref74, _excluded74);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.75 0 15 15"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#20AA46",
    d: "M0 0h22.5v5H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#E92F3B",
    d: "M0 10h22.5v5H0v-5z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FADF50",
    d: "M0 5h22.5v5H0V5z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#205CCA",
    cx: 11.3,
    cy: 7.5,
    r: 5.2
  }), /* @__PURE__ */ React.createElement("g", {
    stroke: "#FFDB3D",
    fill: "none"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "m11.3 8.8-2.1 1.5.8-2.4-2-1.5h2.5l.8-2.3.8 2.3h2.6l-2.1 1.5.8 2.4-2.1-1.5zm-1-2.4h1.9M9.9 7.8l1.3 1m.8-2.6.7 1.8M10 7.9l.6-1.8M11 9l1.6-1.1",
    strokeWidth: 0.5
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m8.7 3.9 1.1 1.6m4-1.7-1 1.6m-1.5 4.7V12M8.9 8.3 7.1 9m8.4 0-1.8-.7",
    strokeWidth: 0.25
  })));
};
var EU = function EU2(_ref75) {
  var title = _ref75.title, rest = _objectWithoutProperties(_ref75, _excluded75);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 408 408"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#039",
    d: "M0 0h408v408H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FC0",
    d: "m203.963 45.231 5.089 15.653h16.542l-13.322 9.68 5.015 15.67-13.323-9.68-13.323 9.68 5.089-15.662-13.322-9.68h16.468l5.087-15.661zm-68 18.134 5.089 15.653h16.542l-13.323 9.68 5.016 15.67-13.324-9.68-13.323 9.68 5.089-15.662-13.323-9.681h16.468l5.089-15.66zm-49.867 49.866 5.089 15.653h16.542l-13.323 9.68 5.016 15.67-13.324-9.68-13.323 9.68 5.089-15.662-13.323-9.68h16.468l5.089-15.661zM67.963 181.23l5.089 15.654h16.542l-13.323 9.682 5.016 15.67-13.324-9.682-13.323 9.682 5.089-15.664-13.323-9.679h16.468l5.089-15.663zm18.133 68.001 5.089 15.654h16.542l-13.323 9.68 5.016 15.67-13.324-9.68-13.323 9.68 5.089-15.662-13.323-9.68h16.468l5.089-15.662zm49.867 49.867 5.089 15.654h16.542l-13.323 9.68 5.016 15.67-13.324-9.679-13.323 9.679 5.089-15.661-13.323-9.681h16.468l5.089-15.662zm136-235.733 5.089 15.653h16.542l-13.322 9.68 5.015 15.67-13.323-9.68-13.324 9.68 5.09-15.662-13.322-9.681h16.468l5.087-15.66zm49.867 49.866 5.088 15.653h16.543l-13.323 9.68 5.015 15.67-13.322-9.68-13.324 9.68 5.09-15.662-13.323-9.68h16.468l5.088-15.661zm18.133 68 5.089 15.653h16.542l-13.322 9.682 5.015 15.67-13.323-9.682-13.323 9.682 5.089-15.664-13.322-9.679h16.468l5.087-15.662zm-18.133 68 5.088 15.654h16.543l-13.323 9.68 5.016 15.67-13.323-9.68-13.324 9.68 5.09-15.662-13.323-9.68h16.469l5.087-15.662zm-117.867 68 5.089 15.654h16.542l-13.322 9.68 5.015 15.67-13.323-9.68-13.323 9.68 5.089-15.662-13.322-9.68h16.468l5.087-15.662zm68-18.133 5.089 15.654h16.542l-13.322 9.68 5.016 15.67-13.324-9.68-13.322 9.68 5.088-15.662-13.322-9.68h16.469l5.086-15.662z"
  }));
};
var FI = function FI2(_ref76) {
  var title = _ref76.title, rest = _objectWithoutProperties(_ref76, _excluded76);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "37.62 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#2E52B2",
    d: "M513 129.3V212H203.7v130H121V212H0v-82.7h121V0h82.7v129.3z"
  }));
};
var FJ = function FJ2(_ref77) {
  var title = _ref77.title, rest = _objectWithoutProperties(_ref77, _excluded77);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#62B5E5",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F3F3F3",
    d: "M307.1 127.1v92c0 61.6 80.5 80.5 80.5 80.5s80.4-19 80.4-80.6v-92l-80.5-23-80.4 23.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#c8102e",
    d: "M468 132.8V98.3H307.1v34.5h69v69h-69v23h69V296c6.9 2.5 11.5 3.5 11.5 3.5s4.6-1.1 11.5-3.5v-71.2h69v-23h-69v-69H468z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var FK = function FK2(_ref78) {
  var title = _ref78.title, rest = _objectWithoutProperties(_ref78, _excluded78);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#2a7fff",
    d: "M311.2 190.2v-90c0-8.5 6.5-15.3 15-15.3h120.5c8.3 0 15 6.8 15 15.3v90c0 75.2-75.2 105.3-75.2 105.3s-75.3-30.1-75.3-105.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M311.2 190.2v-90c0-8.5 6.5-15.3 15-15.3h120.5c8.3 0 15 6.8 15 15.3v90c0 75.2-75.2 105.3-75.2 105.3s-75.3-30.1-75.3-105.3zm79.6 86.3c7.9-4.5 15.9-10 23.2-16.7 20.5-18.5 32.6-41.4 32.6-69.7v-90c0-.3-120.4-.3-120.4-.3v90.3c0 28.3 12.1 51.2 32.6 69.7 8.3 7.5 17.6 13.9 27.6 19 1.4-.6 2.8-1.4 4.4-2.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#3e6d1e",
    d: "M346.1 189.4c-2.6-7.9 1.7-14.3 10.1-14.3h60.5c8.2 0 12.8 6.3 10.1 14.3l-5.5 16.5c-2.6 7.9-8.9 9.2-15.8 4 0 0 2.6-4.8-19.1-4.8s-19.1 4.8-19.1 4.8c-6.1 5.7-13.1 4-15.8-4 .1.1-5.4-16.5-5.4-16.5z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#e5e5e5",
    d: "M356.4 175.1c8.1 1.6 17.8-15 30.1-15 13.1 0 21.8 17.1 30.1 15 7.4-1.8 15-22.2 15-30.1 0-16.6-20.2-30.1-45.1-30.1s-45.1 13.5-45.1 30.1c-.1 8.5 6.6 28.5 15 30.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M355 266.7c6.2.4 12.5-1.8 17.2-6.5l9-9c2.9-2.9 7.5-2.9 10.4 0l9 9c4.7 4.7 11 6.9 17.1 6.5 5.3-.3 32.5-33.5 25.7-32.6-4.6.6-9.1 2.8-12.7 6.3l-.1.1-9 9c-2.9 2.9-7.5 2.9-10.4 0l-9-9c-8.7-8.8-22.9-8.8-31.7-.1l-.1.1-9 9c-2.9 2.9-7.5 2.9-10.4 0l-9-9c-3.5-3.5-7.8-5.6-12.3-6.3-6.7-1.1 20.1 32.2 25.3 32.5zM321.1 206c2.9-2.9 7.5-2.9 10.4 0l9 9c8.8 8.7 22.9 8.7 31.7 0l9-9c2.9-2.9 7.5-2.9 10.4 0l9 9c8.8 8.7 22.9 8.7 31.7 0l9-9c2.9-2.9 7.5-2.9 10.4 0 0 0 5.5-14.8 2.5-15.9-7.9-2.9-17.2-1.2-23.5 5.2l-.1.1-9 9c-2.9 2.9-7.5 2.9-10.4 0l-9-9c-8.7-8.8-22.9-8.8-31.7-.1l-.1.1-9 9c-2.9 2.9-7.5 2.9-10.4 0l-9-9c-6.2-6.2-15.1-8-22.8-5.5-3.1 1.1 1.9 16.1 1.9 16.1z"
  }));
};
var FM = function FM2(_ref79) {
  var title = _ref79.title, rest = _objectWithoutProperties(_ref79, _excluded79);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m256 37.9 10.1 31.2H299l-26.6 19.3 10.2 31.2-26.6-19.3-26.6 19.3 10.2-31.2L213 69.1h32.9zM123.2 170.7l31.2-10.2v-32.8l19.3 26.6 31.2-10.2-19.3 26.6 19.3 26.5-31.2-10.1-19.3 26.5v-32.8zM256 303.5l-10.1-31.2H213l26.6-19.3-10.2-31.3L256 241l26.6-19.3-10.2 31.3 26.6 19.3h-32.9zm132.8-132.8-31.2 10.1v32.8l-19.3-26.5-31.2 10.1 19.3-26.5-19.3-26.6 31.2 10.2 19.3-26.6v32.8z",
    fill: "#FFF"
  }));
};
var FO = function FO2(_ref80) {
  var title = _ref80.title, rest = _objectWithoutProperties(_ref80, _excluded80);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "37.62 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0F61A5",
    d: "M513 214.5H206.2V342h-87.8V214.5H0v-87.7h118.4V0h87.8v126.8H513V192z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#E50E3D",
    d: "M513 149.3V192H183.7v150H141V192H0v-42.7h141V0h42.7v149.3z"
  }));
};
var FR = function FR2(_ref81) {
  var title = _ref81.title, rest = _objectWithoutProperties(_ref81, _excluded81);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00318A",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M342 0h171v342H342z"
  }));
};
var GA = function GA2(_ref82) {
  var title = _ref82.title, rest = _objectWithoutProperties(_ref82, _excluded82);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 228h513v114H0z"
  }));
};
var GB_ENG = function GB_ENG2(_ref83) {
  var title = _ref83.title, rest = _objectWithoutProperties(_ref83, _excluded83);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 136h513v70H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M221.5 0h70v342h-70z"
  }));
};
var GB_NIR = function GB_NIR2(_ref84) {
  var title = _ref84.title, rest = _objectWithoutProperties(_ref84, _excluded84);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 136h513v70H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M221.5 0h70v342h-70z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    stroke: "#231F20",
    strokeMiterlimit: 10,
    d: "m256.5 87.8-24 41.4h-48.8l24.7 42.1-24.7 42.1h48.8l24 42.1 24-42.1h48.8l-24.7-42.1 24.7-42.1h-48.8l-24-41.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M258.6 130.6c-3.3 0-3.3 3.3-3.3 3.3V160h-2v-22s0-4-3.3-4c-4 0-4 4-4 4v23.4l-2 .7v-16.7s0-4-3.3-4c-4 0-4 4-4 4V174c0 6.7 3.3 13.4 8 17.4v14h24V194c6-3.3 10.7-9.4 12-16.7 0-4 1.3-7.3 2.7-10.7l2.7-9.4s.7-3.3-2.7-4.7-4.7 2-4.7 2l-5.3 12.7h-2v-31.4s0-3.3-3.3-3.3c-4 0-4 3.3-4 3.3v24h-1.3v-26.1c-.2.2-.2-3.1-4.2-3.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    stroke: "#231F20",
    strokeMiterlimit: 10,
    d: "M249.2 25.7V33h-7.3v14.7h7.3v14c-4-4-9.4-6-14.7-6-12.2-.1-22.1 9.6-22.3 21.8-.1 6.1 2.4 12 6.9 16.3v13.4h74.8V93.8c4-4.7 6.7-10 6.7-16-.2-12.2-10.3-21.9-22.4-21.6-5.3.1-10.4 2.1-14.3 5.6v-14h7.3V33.1h-7.3v-7.3l-14.7-.1z"
  }));
};
var GB_SCT = function GB_SCT2(_ref85) {
  var title = _ref85.title, rest = _objectWithoutProperties(_ref85, _excluded85);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#005EB8",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 302.1V342h59.9l196.6-131.1L453.1 342H513v-39.9L316.4 171 513 39.9V0h-59.9L256.5 131.1 59.9 0H0v39.9L196.7 171z"
  }));
};
var GB_WLS = function GB_WLS2(_ref86) {
  var title = _ref86.title, rest = _objectWithoutProperties(_ref86, _excluded86);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#529E3C",
    d: "M0 171h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D11C1C",
    d: "m201 259.8 28.2-4.8-21.8-10.3 14.9-8.4s25.2 21.2 25.2 14.4c0-7.3 23.7-4.1 22.7-14.4-1.3-14.1-26.2-1-30.6-18.7-2.5-9.9-10.3-8.6-10.3-8.6l-25.1 8.6-12.5 18.7-6.2-18.7s-14.6 11.9-19.5 18.7c-5.2 7.3-10.7 23.5-10.7 23.5l25.6 10.7-37.3-6.6-27.2 6.6-16.7 4.6 7.3-7.7-15-7.6 15-9-7.3-6.1 32.3 6.1s11.8-1.2 16.3-6.1c5.6-6.2 10.1-27.1 10.1-27.1l-14.8-8.6-11.6 21s-8-19.9-15.6-31c-5.7-8.3-24.3-27.3-24.3-27.3l-24 12.6 13.4-26.7s10.6-9.3 3.9-18.8c-6.8-9.5-12.4-30.9-12.4-30.9s14.1 24.4 19.2 22.5c7.2-2.7-9-25 0-28.9 6.5-2.9 7.6 25.5 7.6 25.5l7.3-13.9v17.3s-4.3 20.7 3 33c7.2 12.3 28.7 20.9 28.7 20.9s-5.6-12.3 0-36c3.8-16 17.2-43.4 23.6-52.1 3.3-4.6-26.7 17-26.7 17v-17l-28.6-2.9-7.3 8.3-18.3-30L104 83.1h34.6l-6.7-8.3H104s5.9-12.1 34.6-12.1l13.6-9.2s18.6.5 29 .9c9.3.4 26.1-11.5 26.1-11.5l4.7 11.5-11 17.3 11.1 11.4-4.7 7 8.1 11.5H201l11.1 17.9-11.1-6.3 6.4 17.3-6.4 17.8 28.2-9.5s0-25.6 10.3-37.2C271.1 69.2 322.6 43 322.6 43s-2.7 23.5 4.9 25.4c11.1 2.7 59.4-19.4 59.4-19.4s-29 31.3-23.1 34.1c3.2 1.5 8.5 7 8.5 7s-25.1 20.5-29.3 29.3c-4.2 8.8 6.1 19.4 6.1 19.4s-21.7 0-32.5 9.5c32.5 0 59.1 15.4 74.8 4 10.5-7.6-37.7-2.9-31.4-21.9 2.4-7.1 8.5-15.2 22.6-17.3s19.1 6.3 19.1 6.3l7.6-11.5h-22.4l40.6-39.6 5.3 51.1-13.7-11.4-6.2 19.2c14.6 44.6-52.8 54.1-52.8 54.1l41.6 27.8-14.8 4.2-4.2 41.7 19.1 15.5-25-6.6-49.2 11.2 9.8-15.3-20.6 4.1 13.7-13.1-13.7-6.1 17.6-4.9 22.1 15.2s11-14.2 12.2-21.7c1.3-7.8-4.8-24.2-4.8-24.2s-32.6-.7-44.1-3.5-18.2-11.9-18.2-11.9l-13.1 15.4s45.5 17.1 34.1 24.2c-2.6 1.7-15.7-3.2-15.7-3.2s-22.4 26.2-36.8 29.7c-6.5 1.6 18.3 10.7 18.3 10.7s-21.2-3.4-32-6.6c-11.3-3.4-44.4 6.6-44.4 6.6l-11-10.7zM383.9 138c3.1 0 5.7-2.6 5.7-5.7s-2.6-5.7-5.7-5.7-5.7 2.6-5.7 5.7 2.5 5.7 5.7 5.7z"
  }));
};
var GB = function GB2(_ref87) {
  var title = _ref87.title, rest = _objectWithoutProperties(_ref87, _excluded87);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v341.3H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M311.7 230 513 341.3v-31.5L369.3 230h-57.6zM200.3 111.3 0 0v31.5l143.7 79.8h56.6z"
  })), /* @__PURE__ */ React.createElement("path", {
    d: "M393.8 230 513 295.7V230H393.8zm-82.1 0L513 341.3v-31.5L369.3 230h-57.6zm146.9 111.3-147-81.7v81.7h147zM90.3 230 0 280.2V230h90.3zm110 14.2v97.2H25.5l174.8-97.2zm-82.1-132.9L0 45.6v65.7h118.2zm82.1 0L0 0v31.5l143.7 79.8h56.6zM53.4 0l147 81.7V0h-147zm368.3 111.3L513 61.1v50.2h-91.3zm-110-14.2V0h174.9L311.7 97.1z",
    fill: "#012169"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#c8102e"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M288 0h-64v138.7H0v64h224v138.7h64V202.7h224v-64H288V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M311.7 230 513 341.3v-31.5L369.3 230h-57.6zm-168 0L0 309.9v31.5L200.3 230h-56.6zm56.6-118.7L0 0v31.5l143.7 79.8h56.6zm168 0L513 31.5V0L311.7 111.3h56.6z"
  })));
};
var GD = function GD2(_ref88) {
  var title = _ref88.title, rest = _objectWithoutProperties(_ref88, _excluded88);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "75.24 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#c60a0a",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#3E8446",
    d: "m256.5 170.7-212 126.1V44.5z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m256.5 170.7 211 126.1h-423zm211-126.2-211 126.2-212-126.2z",
    fill: "#FFDA44"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#3E8446",
    d: "M467.5 44.5v252.3l-211-126.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m256.5 10.4 2.8 10.2H270l-8.6 6.3 3.3 10.2-8.2-6.3-9.2 6.3 3.3-10.2-8.6-6.3h10.7zm-86.4 0 3.3 10.2h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm171.8 0 3.3 10.2H356l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm-85.4 293.8 2.8 10.2H270l-8.6 6.3 3.3 10.2-8.2-6.3-9.2 6.3 3.3-10.2-8.6-6.3h10.7zm-86.4 0 3.3 10.2h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm171.8 0 3.3 10.2H356l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.7z",
    fill: "#FFDA44"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#c60a0a",
    cx: 244.5,
    cy: 170.7,
    r: 76.2
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m244.5 110.1 13.6 41.8h44l-35.6 25.8 13.6 41.8-35.6-25.8-35.5 25.8 13.6-41.8-35.6-25.8h44zm-136.8 57.7c4.4 6.9 2.3 16.1-4.6 20.5s-16.1 2.3-20.5-4.6c-7.9-12.5-3.3-33-3.3-33s20.4 4.6 28.4 17.1z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#A2001D",
    cx: 99.1,
    cy: 182.1,
    r: 7.4
  }));
};
var GE = function GE2(_ref89) {
  var title = _ref89.title, rest = _objectWithoutProperties(_ref89, _excluded89);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.975 0 15 15"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#fff",
    d: "M0 0h22.5v15H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#eb000e",
    d: "M9.8 6H0v3h9.8v6h3V9h9.8V6h-9.8V0h-3v6z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#eb000e",
    d: "m17.3 2.7-.2-1.2h1l-.2 1.2 1.2-.2v1l-1.2-.2.2 1.2h-1l.2-1.2-1.2.2v-1l1.2.2zm-12.7 0-.2-1.2h1l-.2 1.2 1.2-.2v1l-1.2-.2.2 1.2h-1l.2-1.2-1.2.2v-1l1.2.2zm0 9-.2-1.2h1l-.2 1.2 1.2-.2v1l-1.2-.2.2 1.2h-1l.2-1.2-1.2.2v-1l1.2.2zm12.7 0-.2-1.2h1l-.2 1.2 1.2-.2v1l-1.2-.2.2 1.2h-1l.2-1.2-1.2.2v-1l1.2.2z"
  }));
};
var GF = function GF2(_ref90) {
  var title = _ref90.title, rest = _objectWithoutProperties(_ref90, _excluded90);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "15 0 60 60"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FDEB01",
    d: "m0 0 90 60H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#58A846",
    d: "M90 0v60L0 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ED3D24",
    d: "m50.7 33.3 9.3-6.7H48.5L45 15.7l-3.5 10.9H30l9.3 6.7-3.6 11 9.3-6.7 9.3 6.7z"
  }));
};
var GG = function GG2(_ref91) {
  var title = _ref91.title, rest = _objectWithoutProperties(_ref91, _excluded91);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M308 0H204v118.7H0v104h204V342h104V222.7h205v-104H308z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m368.6 188 26 17.3V136l-26 17.3h-95.3V58.1l17.3-26h-69.2l17.3 26v95.2h-95.3l-26-17.3v69.3l26-17.3h95.3v95.2l-17.3 26h69.2l-17.3-26V188z"
  }));
};
var GH = function GH2(_ref92) {
  var title = _ref92.title, rest = _objectWithoutProperties(_ref92, _excluded92);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#496E2D",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m255.9 113.8 14.1 43.4 40.4 3.2-37 26.9 19.5 40.3-37-26.9-37 26.9 14.1-43.5-36.9-26.9h45.7z"
  }));
};
var GI = function GI2(_ref93) {
  var title = _ref93.title, rest = _objectWithoutProperties(_ref93, _excluded93);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 230h513v112H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    stroke: "#000",
    strokeMiterlimit: 10,
    d: "M363.1 131.8V99.1H374V77.3h-21.9v10.9h-21.8V77.3h-21.8v21.8h10.9v32.7h-21.8V55.5h10.9V33.7h-21.8v10.9h-10.9V33.7H254v10.9h-10.9V33.7h-21.8v21.8h10.9v76.3h-21.8V99.1h10.9V77.3h-21.8v10.9h-21.8V77.3h-21.8v21.8h10.9v32.7H145V219h239.9v-87.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    stroke: "#000",
    strokeMiterlimit: 10,
    d: "m264.9 235.5-24.2 18.2 19.1 14.3v31.3h-23.2v9h23v7.9h-23v9.3H270V268l19.1-14.3-24.2-18.2zm0 25.3-10.1-7.1 10.1-7.1 10.1 7.1-10.1 7.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M239.6 209.7v-27.9s.1-22.3 25-22.3c24.8 0 25.7 22 25.7 22v28.2h-50.7zm-69.1 0v-24.3s.1-18.7 19.6-18.7 20.2 18.4 20.2 18.4v24.5h-39.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M169.1 209.7v-24.3s.1-18.7 19.6-18.7 20.2 18.4 20.2 18.4v24.5h-39.8zm151.8 0v-24.3s.1-18.7 19.6-18.7 20.2 18.4 20.2 18.4v24.5h-39.8zm8.4-77.7v-15.7s.1-12.1 11.3-12.1c11.3 0 11.7 11.9 11.7 11.9V132h-23zm-78.8 0v-23.7s.1-18.3 14.3-18.3c14.2 0 14.7 18 14.7 18v24h-29zm-73 0v-15.7s.1-12.1 11.3-12.1 11.7 11.9 11.7 11.9V132h-23z"
  }));
};
var GL = function GL2(_ref94) {
  var title = _ref94.title, rest = _objectWithoutProperties(_ref94, _excluded94);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "90.63 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 0v171H0V0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 185.8,
    cy: 171.2,
    r: 117.8
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M68 171c0-65.1 52.8-117.8 117.8-117.8 65.1 0 117.8 52.8 117.8 117.8"
  }));
};
var GM = function GM2(_ref95) {
  var title = _ref95.title, rest = _objectWithoutProperties(_ref95, _excluded95);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#cf0d19",
    d: "M0 0h513v100H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 121h513v100H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1a7e25",
    d: "M0 242h513v100H0z"
  }));
};
var GN = function GN2(_ref96) {
  var title = _ref96.title, rest = _objectWithoutProperties(_ref96, _excluded96);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h512v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M342 0h171v342H342z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h171v342H0z"
  }));
};
var GP = function GP2(_ref97) {
  var title = _ref97.title, rest = _objectWithoutProperties(_ref97, _excluded97);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00318A",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M342 0h171v342H342z"
  }));
};
var GQ = function GQ2(_ref98) {
  var title = _ref98.title, rest = _objectWithoutProperties(_ref98, _excluded98);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "34.2 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 0h513v113.8H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 227.6h513V342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0070C8",
    d: "M126 171 0 342V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeMiterlimit: 10,
    d: "M233.8 139.4v40.4c0 35.6 35.6 35.6 35.6 35.6s35.6 0 35.6-35.6v-40.4h-71.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#786145",
    d: "M264.5 179.8h9.8l4 25.8h-17.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M287.2 162c0-9.8-8-14.8-17.8-14.8s-17.8 5-17.8 14.8c-4.9 0-8.9 4-8.9 8.9s4 8.9 8.9 8.9h35.6c4.9 0 8.9-4 8.9-8.9s-4-8.9-8.9-8.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m230.7 120 1.9 3.3h3.8l-1.9 3.3 1.9 3.2h-3.8l-1.9 3.3-1.9-3.3H225l1.9-3.2-1.9-3.3h3.8zm15.3 0 1.9 3.3h3.7l-1.9 3.3 1.9 3.2h-3.7l-1.9 3.3-1.9-3.3h-3.8l1.9-3.2-1.9-3.3h3.8zm15.3 0 1.9 3.3h3.7l-1.9 3.3 1.9 3.2h-3.7l-1.9 3.3-1.9-3.3h-3.8l1.9-3.2-1.9-3.3h3.8zm15.8 0 1.9 3.3h3.8l-1.9 3.3 1.9 3.2H279l-1.9 3.3-1.9-3.3h-3.7l1.8-3.2-1.8-3.3h3.7zm16 0 1.9 3.3h3.8l-1.9 3.3 1.9 3.2H295l-1.9 3.3-1.9-3.3h-3.7l1.8-3.2-1.8-3.3h3.7zm15 0 1.9 3.3h3.7l-1.9 3.3 1.9 3.2H310l-1.9 3.3-1.9-3.3h-3.8l1.9-3.2-1.9-3.3h3.8z",
    fill: "#FFDA00",
    stroke: "#000",
    strokeMiterlimit: 10
  }));
};
var GR = function GR2(_ref99) {
  var title = _ref99.title, rest = _objectWithoutProperties(_ref99, _excluded99);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.42 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#0d5eaf"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v38H0zm0 76h513v38H0zm0 76h513v38H0zm0 76h513v38H0zm0 76h513v38H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h190v190H0z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M0 76h190v38H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M76 0h38v190H76z"
  })));
};
var GS = function GS2(_ref100) {
  var title = _ref100.title, rest = _objectWithoutProperties(_ref100, _excluded100);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#FFF",
    cx: 443.4,
    cy: 233.6,
    rx: 29,
    ry: 43.5
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#FFCE00",
    cx: 406.9,
    cy: 317.7,
    rx: 22,
    ry: 9.3
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#FFCE00",
    cx: 364,
    cy: 317.7,
    rx: 22,
    ry: 9.3
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#39B200",
    d: "m342 190.1 43.4 86.9 43.5-86.9z"
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#9B9B9B",
    cx: 327.5,
    cy: 233.6,
    rx: 29,
    ry: 43.5
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#757575",
    d: "m371 175.6-14.5 14.5h57.9l-14.5-14.5 14.5-43.5s-13-29-29-29-29 29-29 29l14.6 43.5z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#C6B56F",
    cx: 385.4,
    cy: 67,
    r: 29
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#923f00",
    cx: 386,
    cy: 88.7,
    r: 29
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 443.4,
    cy: 117.7,
    r: 29
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#0049FF",
    cx: 342.2,
    cy: 146.7,
    r: 29
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#0041F9",
    cx: 429.8,
    cy: 146.7,
    r: 29
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#F7D71E",
    cx: 386,
    cy: 233.6,
    r: 29
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#CEC851",
    cx: 457.9,
    cy: 190.1,
    r: 29
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 385.4,
    cy: 289.5,
    r: 29
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#7C0B29",
    d: "m371 135.7 14.5-3.5 14.5 3.5c0 7.5-14.5 11-14.5 11s-14.5-3.5-14.5-11z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 327.5,
    cy: 117.4,
    r: 29
  }));
};
var GT = function GT2(_ref101) {
  var title = _ref101.title, rest = _objectWithoutProperties(_ref101, _excluded101);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h171v342H0zm342 0h171v342H342z",
    fill: "#338AF3"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#DCC26D",
    cx: 256,
    cy: 155.8,
    r: 25.5
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#628A40",
    d: "M194.2 155.9c0 22.1 11.8 42.5 30.8 53.5 5.9 3.4 13.5 1.4 16.9-4.5 3.4-5.9 1.4-13.5-4.5-16.9-11.5-6.6-18.5-18.9-18.5-32.1 0-6.8-5.5-12.4-12.4-12.4s-12.3 5.5-12.3 12.4zm95.1 52.1c17.8-11.4 28.6-31 28.5-52.1 0-6.8-5.5-12.4-12.4-12.4-6.8 0-12.4 5.5-12.4 12.4 0 12.7-6.5 24.5-17.1 31.3-5.8 3.6-7.7 11.2-4.1 17 3.6 5.8 11.2 7.7 17 4.1.2-.1.3-.2.5-.3z"
  }));
};
var GU = function GU2(_ref102) {
  var title = _ref102.title, rest = _objectWithoutProperties(_ref102, _excluded102);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M11.1 11.1h489.7v319.1H11.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#7DBEF1",
    d: "M256 285.3s76.4-51.3 76.4-114.6S256 56 256 56s-76.4 51.3-76.4 114.6S256 285.3 256 285.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1C8AE6",
    d: "M179.8 180.7h152.6l-29.3 64.9h-95.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF042",
    d: "M192.3 205.9s40.5 38.2 51 38.2c12.4 0 12.6-18.4 25.5-25.5 20.2-11.1 51-12.7 51-12.7L297 248.7l-41 36.6-46.8-39.7-16.9-39.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#259C7B",
    d: "m256 157.5-22.5 15.6 7.9-26.2-21.8-16.5 27.4-.5 9-25.9 9 25.9 27.4.5-21.8 16.6 7.9 26.2-22.5-15.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#8E5715",
    d: "M249.7 144.6c-.9 9.2-1.5 18.4-1.7 27.6-.3 11.9.3 20.7 2 26 2.2 6.6 7.2 12.9 14.2 18.9 5.3 4.6 10.6 8.1 14.2 10.1 3.1 1.7 7 .6 8.7-2.4 1.7-3.1.6-7-2.4-8.7-4.3-2.5-8.4-5.4-12.2-8.7-5.4-4.6-9.1-9.2-10.4-13.3-1.1-3.4-1.6-11.3-1.4-21.7.2-8.9.8-17.8 1.7-26.6.4-3.5-2.2-6.6-5.7-7-3.6-.3-6.7 2.3-7 5.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m217.8 170.7 25.5 38.2h-25.5v-38.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: "#D80027",
    strokeWidth: 12,
    strokeMiterlimit: 10,
    d: "M256 285.3s76.4-51.3 76.4-114.6S256 56 256 56s-76.4 51.3-76.4 114.6S256 285.3 256 285.3z"
  }));
};
var GW = function GW2(_ref103) {
  var title = _ref103.title, rest = _objectWithoutProperties(_ref103, _excluded103);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "18.81 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 0h512v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h512v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h182v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m98.3 109.8 15.1 46.5h48.9L122.8 185l15.1 46.5-39.6-28.7-39.5 28.7L73.9 185l-39.6-28.7h48.9z"
  }));
};
var GY = function GY2(_ref104) {
  var title = _ref104.title, rest = _objectWithoutProperties(_ref104, _excluded104);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "27 0 600 600"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#009E49",
    d: "M0 0h900v600H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m0 0 947 300L0 600V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFD00D",
    d: "M0 26.1 870 300 0 573.9V26.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#2D2D2D",
    d: "m0 0 450 300L0 600V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D3132F",
    d: "m0 35 397.5 265L0 565V35z"
  }));
};
var HK = function HK2(_ref105) {
  var title = _ref105.title, rest = _objectWithoutProperties(_ref105, _excluded105);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.5 0 14 14"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h21v14H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#EE1C25",
    d: "M0 0h21v14H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M12 6.7c-.8-.5-1 .4-1 0 0-.8.9-1.5 2-1.5s2 .7 2 1.5c-.9 0-1 .5-1.5.5-.6 0-.7 0-1.5-.5zm1.2-.2c.1 0 .2-.1.2-.2s0-.3-.2-.3-.2.1-.2.2.1.3.2.3zm-1.8 2c.2-.9-.7-.8-.3-.9.8-.3 1.7.4 2 1.4.3 1.1 0 2.1-.8 2.4-.3-.9-.8-.8-.9-1.3-.1-.6-.2-.7 0-1.6zm.6 1.1c0 .1.2.2.3.2.1 0 .2-.2.2-.3s-.2-.2-.3-.2c-.2 0-.2.2-.2.3zM9.6 8.5c.9-.1.6-.9.8-.6.5.7.2 1.7-.7 2.4-.9.6-2 .6-2.5 0 .8-.6.6-1 .9-1.3.4-.4.5-.5 1.5-.5zm-.9.9c-.1 0-.2.2-.1.3s.3.2.4.1.1-.3 0-.4-.2-.1-.3 0zM9 6.7c.3.9 1 .3.8.6-.5.7-1.6.7-2.5 0-.9-.6-1.2-1.7-.7-2.4.8.6 1.1.2 1.5.5.4.4.5.4.9 1.3zm-1.1-.6c-.1-.1-.3 0-.4.1s-.1.3 0 .4c.1.1.3 0 .3-.1.2-.1.2-.3.1-.4zm2.6-.5c-.7.6.1 1.1-.3 1-.8-.3-1.2-1.4-.8-2.4.3-1 1.3-1.7 2-1.4-.3.9.2 1.1 0 1.6-.1.5-.2.6-.9 1.2zm.2-1.2c0-.1 0-.3-.1-.3s-.3 0-.3.1 0 .3.2.3c0 .1.1 0 .2-.1z"
  }));
};
var HM = function HM2(_ref106) {
  var title = _ref106.title, rest = _objectWithoutProperties(_ref106, _excluded106);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })), /* @__PURE__ */ React.createElement("path", {
    d: "m189.2 212.6 11 22.9 24.7-5.7-11.1 22.8 19.9 15.8L209 274v25.4l-19.8-15.9-19.8 15.9.1-25.4-24.8-5.6 19.9-15.8-11.1-22.8 24.8 5.7zm197.9 28.5 5.2 10.9 11.8-2.7-5.3 10.9 9.5 7.5-11.8 2.6v12.2l-9.4-7.6-9.5 7.6.1-12.2-11.9-2.6 9.5-7.5-5.3-10.9 11.9 2.7zm-48.6-116 5.2 10.9 11.8-2.7-5.3 10.9 9.5 7.5-11.8 2.7v12.1l-9.4-7.6-9.5 7.6v-12.1l-11.8-2.7 9.5-7.5-5.3-10.9 11.8 2.7zm48.6-66.2 5.2 10.9 11.8-2.7-5.3 10.9 9.5 7.5-11.8 2.7v12.1l-9.4-7.6-9.5 7.6.1-12.1-11.9-2.7 9.5-7.5-5.3-10.9 11.9 2.7zm42.4 49.7 5.3 10.9 11.8-2.7-5.3 10.9 9.5 7.5-11.8 2.6V150l-9.5-7.6-9.4 7.6v-12.2l-11.8-2.6 9.5-7.5-5.3-10.9 11.8 2.7zm-30.3 57.9 4.1 12.7h13.3l-10.8 7.8 4.1 12.6-10.7-7.8-10.8 7.8 4.1-12.6-10.7-7.8h13.3z",
    fill: "#FFF"
  }));
};
var HN = function HN2(_ref107) {
  var title = _ref107.title, rest = _objectWithoutProperties(_ref107, _excluded107);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0zm0 228h513v114H0zm203.5-110.1 6.7 16.6 17.6 1-14 10.9 4.7 17.7-15-9.9-15 9.9 4.7-17.7-14-10.9 17.6-1zm105 0 6.7 16.6 17.6 1-14 10.9 4.7 17.7-15-9.9-15 9.9 4.7-17.7-14-10.9 17.6-1zM256 147.6l6.7 16.6 17.6 1-14 10.9 4.7 17.7-15-9.9-15 9.9 4.7-17.7-14-10.9 17.6-1zm-52.5 29.7 6.7 16.6 17.6 1-14 10.9 4.7 17.6-15-9.9-15 9.9 4.7-17.6-14-10.9 17.6-1zm105 0 6.7 16.6 17.6 1-14 10.9 4.7 17.6-15-9.9-15 9.9 4.7-17.6-14-10.9 17.6-1z",
    fill: "#338AF3"
  }));
};
var HR = function HR2(_ref108) {
  var title = _ref108.title, rest = _objectWithoutProperties(_ref108, _excluded108);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M309.3 113.2v-44l17.5-14.4 17.7 14.4v44zm-105.6 0v-44l-17.3-14.4-17.9 14.4v44zm35.2 0v-44l17.6-14.4 17.6 14.4v44z",
    fill: "#338AF3"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M309.3 113.2h-35.2v-44l17.5-14.4 17.7 14.4zm-70.4 0h-35.2v-44l17.5-14.4 17.7 14.4z",
    fill: "#0052B4"
  }), /* @__PURE__ */ React.createElement("path", {
    stroke: "#D80027",
    fill: "#FFF",
    d: "M168.5 113.2v101.9c0 24.3 14.4 46.2 35.4 59.4 21.3 13.4 42.1 14.7 52.6 14.7s31.4-1.7 52.6-14.8c21-13 35.4-35.1 35.4-59.3V113.2h-176z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M168.5 113.2h35.2v35.2h-35.2zm70.4 0h35.2v35.2h-35.2zm70.4 0h35.2v35.2h-35.2zm-105.6 35.2h35.2v35.2h-35.2zm70.4 0h35.2v35.2h-35.2zm-105.6 35.2h35.2v35.2h-35.2zm35.2 35.2h35.2V254h-35.2zm35.2-35.2h35.2v35.2h-35.2zm70.4 0h35.2v35.2h-35.2zm-35.2 35.2h35.2V254h-35.2zm35.2 55.5c8.6-5.4 16.2-12.3 22-20.3h-22v20.3zM181.7 254c5.8 8 13.3 14.9 22 20.4V254h-22zm57.2 0v33.7c7.2 1.2 13.3 1.5 17.6 1.5 4.3 0 10.4-.3 17.6-1.6V254h-35.2z",
    fill: "#D80027"
  }));
};
var HT = function HT2(_ref109) {
  var title = _ref109.title, rest = _objectWithoutProperties(_ref109, _excluded109);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#00209f",
    d: "M0 0h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#d21034",
    d: "M0 171h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m381.4 251.5-110.7-13.8-110.8 13.8V85.4h221.5z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#00209f",
    cx: 270.7,
    cy: 182.3,
    r: 55.4
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#d21034",
    cx: 270.7,
    cy: 182.3,
    r: 27.7
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#016a16",
    d: "M229.1 100h83.1l-41.5 54.6z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f1b517",
    d: "M265.5 140.8h10v83h-10z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#016a16",
    d: "M314.9 215.5h-88.5l-66.5 36h221.5z"
  }));
};
var HU = function HU2(_ref110) {
  var title = _ref110.title, rest = _objectWithoutProperties(_ref110, _excluded110);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 228h513v114H0z"
  }));
};
var IC = function IC2(_ref111) {
  var title = _ref111.title, rest = _objectWithoutProperties(_ref111, _excluded111);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "50 0 200 200"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#fc0",
    d: "M0 0h300v200H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0768a9",
    d: "M0 0h200v200H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fff",
    d: "M0 0h100v200H0z"
  }));
};
var ID = function ID2(_ref112) {
  var title = _ref112.title, rest = _objectWithoutProperties(_ref112, _excluded112);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#E00",
    d: "M0 0h513v171H0z"
  }));
};
var IE = function IE2(_ref113) {
  var title = _ref113.title, rest = _objectWithoutProperties(_ref113, _excluded113);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF9811",
    d: "M342 0h171v342H342z"
  }));
};
var IL = function IL2(_ref114) {
  var title = _ref114.title, rest = _objectWithoutProperties(_ref114, _excluded114);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M340.6 122.4h-56.1l-28-48.6-28 48.6h-56.1l28 48.6-28 48.6h56.1l28 48.6 28-48.6h56.1l-28-48.6 28-48.6zM293.2 171 276 204.2h-38.9L219.8 171l17.2-33.2h38.9l17.3 33.2zm-36.7-71.8 11.9 23.3h-23.9l12-23.3zm-58.3 38.6h23.9l-10.8 21-13.1-21zm0 66.4 13-22.1 11.9 22.1h-24.9zm58.3 37.5-11.9-22.1h23.9l-12 22.1zm59.4-37.5h-25l11.9-22.1 13.1 22.1zm-26.1-66.4h26.1l-13 22.1-13.1-22.1zM0 21.3h512V64H0zm0 256h512V320H0z",
    fill: "#2E52B2"
  }));
};
var IM = function IM2(_ref115) {
  var title = _ref115.title, rest = _objectWithoutProperties(_ref115, _excluded115);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#E52D42",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M393.3 68.2h-45.8l-33.8 80.2-34.4-22.9s-24.7-59.1-34.4-68.2c-9.7-9.7-18.7-.6-48.9 7.8-29.6 8.4-30.8 18.7-42.2 18.7-4.8 0-19.9-17.5-27.7-22.3-12.1-7.8-16.9-4.2-13.9 7.2 1.2 4.8 10.9 10.9 16.9 19.9 7.8 11.5 12.7 25.9 12.7 25.9s10.9-10.3 16.9-12.1c9-2.4 19.3 1.8 31.4 0 15.1-2.4 31.4-10.9 31.4-10.9l4.2 43.4s-54.3 50.7-49.5 70.6 56.1 44.6 68.2 62.7c12.1 17.5-7.2 24.1-7.2 32.6s-1.8 19.9 7.2 16.3c9-3.6 10.3-18.1 18.7-31.4 6-9 10.3-13.9 11.5-17.5 1.8-9-23.5-32-37.4-48.9-6.6-7.8-19.9-18.7-19.9-18.7l39.2-29.6s67.6 27.7 82.6 18.7c15.1-9 19.3-98.3 19.3-98.3l47-11.5-12.1-11.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F8DD4E",
    d: "M279.3 262.4c-6 0-11.5-4.8-11.5-11.5s4.8-11.5 11.5-11.5c6 0 11.5 4.8 11.5 11.5s-5.5 11.5-11.5 11.5zm45.8-182.8c-6 0-11.5-4.8-11.5-11.5s4.8-11.5 11.5-11.5c6 0 11.5 4.8 11.5 11.5s-5.5 11.5-11.5 11.5zm0 91.1c-6 0-11.5-4.8-11.5-11.5 0-6 4.8-11.5 11.5-11.5 6 0 11.5 4.8 11.5 11.5-.6 6.7-5.5 11.5-11.5 11.5zm-136.9 45.8c-6 0-11.5-4.8-11.5-11.5 0-6 4.8-11.5 11.5-11.5 6.6 0 11.5 4.8 11.5 11.5s-5.5 11.5-11.5 11.5zm45.2-136.9c-6 0-11.5-4.8-11.5-11.5s4.8-11.5 11.5-11.5c6 0 11.5 4.8 11.5 11.5s-4.8 11.5-11.5 11.5zm22.9 91.1c-6 0-11.5-10.3-11.5-22.9s4.8-22.9 11.5-22.9c6 0 11.5 10.3 11.5 22.9s-4.8 22.9-11.5 22.9zm-114-45.2c-6 0-11.5-4.8-11.5-11.5 0-6.6 4.8-11.5 11.5-11.5 6.6 0 11.5 4.8 11.5 11.5 0 6.6-4.8 11.5-11.5 11.5z"
  }));
};
var IN = function IN2(_ref116) {
  var title = _ref116.title, rest = _objectWithoutProperties(_ref116, _excluded116);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ff6820",
    d: "M0 0h513v114H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 114h513v114H0V114z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#046a38",
    d: "M0 228h513v114H0V228z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: "#07038d",
    strokeWidth: 4,
    d: "M256.5 136.8c18.9 0 34.2 15.3 34.2 34.2s-15.3 34.2-34.2 34.2-34.2-15.3-34.2-34.2 15.3-34.2 34.2-34.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m265.3 138.2-17.6 65.7m17.6-65.7-17.6 65.7m25.8-62.3-34 58.9m41-53.5-48 48m53.4-41L227 188m62.3-25.8-65.7 17.6m66.9-8.8h-68m66.8 8.8-65.7-17.6m62.3 25.8L227 154m53.5 41-48-48m41 53.4-34-58.9m25.8 62.3-17.6-65.7m8.8 66.9v-68m-8.8 66.8 17.6-65.7m-25.8 62.3 34-58.9m-41 53.5 48.1-48.1M227.1 188l58.9-34m-62.3 25.8 65.7-17.6m-66.9 8.8h68m-66.8-8.8 65.7 17.6M227.1 154l58.9 34m-53.5-41 48.1 48.1m-41.1-53.5 34 58.9m-25.8-62.3 17.6 65.7",
    stroke: "#07038d",
    strokeWidth: 2
  }));
};
var IO = function IO2(_ref117) {
  var title = _ref117.title, rest = _objectWithoutProperties(_ref117, _excluded117);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0-.3h513V342H0V-.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M462.9 198.1c-4 0-14-5-21-9-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-16 9-20 9s-14-5-20-9c-11-6-22-12-32.1-12-9 0-20 6-31.1 12-7 4-16 9-20 9s-13-5-20-9c-11-6-22-12-31.1-12-10 0-21 6-32.1 12-6 4-16 9-20 9s-13-5-20-9c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-17 9-21 9s-13-5-20-9c-10-6-20-12-30.1-12v22l19 10c11 6 21 12 31.1 12s21-6 32.1-12c6-4 16-10 20-10s13 6 20 10c11 6 21 12 31.1 12s20-6 31.1-12c7-4 17-10 21-10s13 6 20 10c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-10 20-10s14 6 21 10c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-10 20-10s14 6 20 10c11 6 22 12 32.1 12s20-6 31.1-12l19-10v-22c-10 0-20 6-30.1 12-7 4-16 9-20 9zM0 31.7l19 10c11 6 21 12 31.1 12s21-6 32.1-12c6-4 16-10 20-10s13 6 20 10c11 6 21 12 31.1 12s20-6 31.1-12c7-4 17-10 21-10s13 6 20 10c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-10 20-10s14 6 21 10c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-10 20-10s14 6 20 10c11 6 22 12 32.1 12s20-6 31.1-12l19-10v-22c-10 1-20 6-30.1 12-7 4-16 9-20 9s-14-5-21-9c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-16 9-20 9s-14-5-20-9c-11-6-22-12-32.1-12s-20 6-31.1 12c-7 4-16 9-20 9s-13-5-20-9c-11-6-22-12-31.1-12s-21 6-32.1 12c-6 4-16 9-20 9s-13-5-20-9c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-17 9-21 9s-13-5-20-9c-10-6-20-11-30.1-12v22zm462.9 55.2c-4 0-14-5-21-9-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-16 9-20 9s-14-5-20-9c-11-6-22-12-32.1-12-9 0-20 6-31.1 12-7 4-16 9-20 9s-13-5-20-9c-11-6-22-12-31.1-12-10 0-21 6-32.1 12-6 4-16 9-20 9s-13-5-20-9c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-17 9-21 9s-13-5-20-9c-10-6-20-12-30.1-12v22l19 9c11 6 21 12 31.1 12s21-6 32.1-12c6-4 16-9 20-9s13 5 20 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 17-9 21-9s13 5 20 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-9 20-9s14 5 21 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-9 20-9s14 5 20 9c11 6 22 12 32.1 12s20-6 31.1-12l19-9v-22c-10 0-20 6-30.1 12-7 3.9-16 9-20 9zm50.1 34c-10 1-20 6-30.1 12-7 4-16 10-20 10s-14-6-21-10c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-16 10-20 10s-14-6-20-10c-11-6-22-12-32.1-12s-20 6-31.1 12c-7 4-16 10-20 10s-13-6-20-10c-11-6-22-12-31.1-12s-21 6-32.1 12c-6 4-16 10-20 10s-13-6-20-10c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-17 10-21 10s-13-6-20-10c-10-6-20-11-30.1-12v23c4 1 13 5 19 9 11 6 21 12 31.1 12s21-6 32.1-12c6-4 16-9 20-9s13 5 20 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 17-9 21-9s13 5 20 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-9 20-9s14 5 21 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-9 20-9s14 5 20 9c11 6 22 12 32.1 12s20-6 31.1-12c6-4 15-8 19-9v-23zm-50.1 133.3c-4 0-14-5-21-9-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-16 9-20 9s-14-5-20-9c-11-6-22-12-32.1-12-9 0-20 6-31.1 12-7 4-16 9-20 9s-13-5-20-9c-11-6-22-12-31.1-12-10 0-21 6-32.1 12-6 4-16 9-20 9s-13-5-20-9c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-17 9-21 9s-13-5-20-9c-10-6-20-12-30.1-12v22l19 9c11 6 21 12 31.1 12s21-6 32.1-12c6-4 16-9 20-9s13 5 20 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 17-9 21-9s13 5 20 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-9 20-9s14 5 21 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-9 20-9s14 5 20 9c11 6 22 12 32.1 12s20-6 31.1-12l19-9v-22c-10 0-20 6-30.1 12-7 4-16 9-20 9zm50.1 34c-10 1-20 6-30.1 12-7 4-16 10-20 10s-14-6-21-10c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-16 10-20 10s-14-6-20-10c-11-6-22-12-32.1-12s-20 6-31.1 12c-7 4-16 10-20 10s-13-6-20-10c-11-6-22-12-31.1-12s-21 6-32.1 12c-6 4-16 10-20 10s-13-6-20-10c-11-6-21-12-31.1-12s-20 6-31.1 12c-7 4-17 10-21 10s-13-6-20-10c-10-6-20-11-30.1-12v23c4 0 13 5 19 9 11 6 21 12 31.1 12s21-6 32.1-12c6-4 16-9 20-9s13 5 20 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 17-9 21-9s13 5 20 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-9 20-9s14 5 21 9c11 6 21 12 31.1 12s20-6 31.1-12c7-4 16-9 20-9s14 5 20 9c11 6 22 12 32.1 12s20-6 31.1-12c6-4 15-9 19-9v-23z"
  }), /* @__PURE__ */ React.createElement("g", {
    strokeWidth: 2,
    strokeMiterlimit: 10
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M389.8 119.9H408v78.8h-18.3l.1-78.8zm0 117.8H408v75.1h-18.3l.1-75.1z",
    fill: "#a24300",
    stroke: "#000"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#006d00",
    stroke: "#004100",
    d: "M462.8 91.5h-29.1l25.7-25.7c4.5-4.4 4.5-11.4 0-15.8l-3.4-3.4c-4.4-4.4-11.4-4.4-15.8 0l-25.9 25.9V37.4c0-6.2-5.1-11.3-11.3-11.3h-4.7c-6.2 0-11.3 5.1-11.3 11.3v31.7l-23.5-23.8c-4.7-4.7-12.2-4.7-16.9 0l-3.6 3.6c-4.7 4.7-4.7 12.4 0 17.2l25 25.4h-30.6c-6 0-10.9 4.9-10.9 10.9v4.6c0 6 4.9 10.9 10.9 10.9H369l-20.7 20.7c-4.4 4.4-4.4 11.4 0 15.8l3.4 3.4c4.4 4.4 11.4 4.4 15.8 0l19.6-19.6V167c0 6.1 5.1 11.1 11.3 11.3h4.7c6.2 0 11.3-5.1 11.3-11.3v-28.3l22.2 22.6c4.7 4.7 12.4 4.7 17.1 0l3.6-3.6c4.7-4.7 4.7-12.4 0-17.2L435.2 118h27.6c5.9 0 10.7-4.9 10.9-10.9v-4.6c0-6.1-4.9-11-10.9-11z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fed100",
    stroke: "#525625",
    d: "M439.2 249.1h-79.8s-.9-13.4-6-21.8c-6.2-10.4-13.9-28.1-1.4-36.7 15.9-10.9 33.7.8 48.2.8 11.8.1 26.9-14 45-.8 12.2 8.9 3.9 28.2-1.3 36.7-7 11.5-4.7 21.8-4.7 21.8z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var IQ = function IQ2(_ref118) {
  var title = _ref118.title, rest = _objectWithoutProperties(_ref118, _excluded118);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#CE1126",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M219.2 160.7h-29.3c1.5-5.7 6.6-9.9 12.8-9.9v-19.9c-18.3 0-33.1 14.9-33.1 33.1v16.5h49.6c1.8 0 3.3 1.5 3.3 3.3v6.6h-66.2v19.9h86.1v-26.5c0-12.7-10.4-23.1-23.2-23.1zm49.6 29.8v-59.6H249v79.5h33.1v-19.9zm66.2 0v-59.6h-19.8v59.6h-6.6v-19.8h-19.9v39.7h59.6v-19.9z",
    fill: "#547C31"
  }));
};
var IR = function IR2(_ref119) {
  var title = _ref119.title, rest = _objectWithoutProperties(_ref119, _excluded119);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h512v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 227.9h513v114H0zm278.8-93.1c.1 2 8.7 26.2 4.4 39.4-6.6 20.3-15.8 21.8-19.8 24.5V134l-6.9-4.2-6.9 4.2v64.7c-4-2.7-12.4-2.4-19.8-24.5-4.3-12.7 5.7-37.3 5.8-39.2 0 0-9.5 8.1-15.8 24-5.9 14.8 1.9 49.6 29.5 54.8 2.3.4 4.7 5.6 7.2 5.6 2.1 0 4.1-5.2 6-5.5 28.4-4.6 35-41.7 29.9-55.6-5.4-14.6-13.6-23.5-13.6-23.5z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M44.6 98.9h22.3v24.4H44.6zM0 98.9h22.3v24.4H0zm89.2 0h22.3v24.4H89.2zm44.6 0h22.3v24.4h-22.3zm44.6 0h22.3v24.4h-22.3zm44.6 0h22.3v24.4H223zm44.7 0H290v24.4h-22.3zm44.6 0h22.3v24.4h-22.3zm44.6 0h22.3v24.4h-22.3zm44.6 0h22.3v24.4h-22.3zm44.6 0h22.3v24.4h-22.3zm44.6 0H513v24.4h-22.3zm-446.1 118h22.3v25.5H44.6zm-44.6 0h22.3v25.5H0zm89.2 0h22.3v25.5H89.2zm44.6 0h22.3v25.5h-22.3zm44.6 0h22.3v25.5h-22.3zm44.6 0h22.3v25.5H223zm44.7 0H290v25.5h-22.3zm44.6 0h22.3v25.5h-22.3zm44.6 0h22.3v25.5h-22.3zm44.6 0h22.3v25.5h-22.3zm44.6 0h22.3v25.5h-22.3zm44.6 0H513v25.5h-22.3z",
    fill: "#FFF",
    opacity: 0.5
  }));
};
var IS = function IS2(_ref120) {
  var title = _ref120.title, rest = _objectWithoutProperties(_ref120, _excluded120);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "32.49 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 210.6H202.2v130.7h-79.8V210.6H0v-79.8h122.4V0h79.8v130.8H513v18.5l-1 42.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M513 149.3V192H183.7v149.3H141V192H0v-42.7h141V0h42.7v149.3z"
  }));
};
var IT = function IT2(_ref121) {
  var title = _ref121.title, rest = _objectWithoutProperties(_ref121, _excluded121);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#F4F5F0",
    d: "M342 0H0v341.3h512V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#008C45",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#CD212A",
    d: "M342 0h171v342H342z"
  }));
};
var JE = function JE2(_ref122) {
  var title = _ref122.title, rest = _objectWithoutProperties(_ref122, _excluded122);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M301.8 171 513 30.2V0h-45.3L256.5 140.8 45.3 0H0v30.2L211.2 171 0 311.8V342h45.3l211.2-140.8L467.7 342H513v-30.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m233.7 44.6 22.3 5.6 22.3-5.6 4-20.9-14.9 6.5L256 14.8l-11.4 15.4-14.9-6.5z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M233.7 44.6s-4 12.9-4 29.9c0 27.9 26.3 41.3 26.3 41.3s26.3-15.5 26.3-41.3c0-15.4-4-29.9-4-29.9s-8.1-5-22.3-5-22.3 5-22.3 5z"
  }));
};
var JM = function JM2(_ref123) {
  var title = _ref123.title, rest = _objectWithoutProperties(_ref123, _excluded123);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M215.9 171 0 314.6V26.8zM513 26.8v287.8L296.1 171z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M513 26.8 296.1 171 513 314.6V342h-41.1L256 197.4 40.1 342H0v-27.4L215.9 171 0 26.8V0h40.1L256 143.9 471.9 0H513z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M513 26.8 296.1 171 513 314.6V342h-41.1L256 197.4 40.1 342H0v-27.4L215.9 171 0 26.8V0h40.1L256 143.9 471.9 0H513z"
  }));
};
var JO = function JO2(_ref124) {
  var title = _ref124.title, rest = _objectWithoutProperties(_ref124, _excluded124);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M256.5 170.7 0 341.3V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m77.9 139.5 7.9 16.4 17.8-4.1-8 16.5 14.3 11.3-17.8 4 .1 18.3-14.3-11.5-14.2 11.5v-18.3l-17.8-4 14.3-11.3-7.9-16.5 17.7 4.1z"
  }));
};
var JP = function JP2(_ref125) {
  var title = _ref125.title, rest = _objectWithoutProperties(_ref125, _excluded125);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h512v342H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#D80027",
    cx: 256.5,
    cy: 171,
    r: 96
  }));
};
var KE = function KE2(_ref126) {
  var title = _ref126.title, rest = _objectWithoutProperties(_ref126, _excluded126);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h512v90.579H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#496E2D",
    d: "M0 251h513v91H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A2001D",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "m323.3 54.5-25.6-11.8L256 137l-41.7-94.3-25.6 11.8 51.8 116.2-51.8 116.2 25.6 11.8 41.7-94.4 41.7 94.4 25.6-11.8-51.8-116.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M273.4 65.6c-9.9-10.8-17.4-17-17.4-17s-7.5 6.2-17.4 17v210.1c9.9 10.8 17.4 17 17.4 17s7.5-6.2 17.4-17V65.6z"
  })), /* @__PURE__ */ React.createElement("path", {
    d: "M209 105.9v129.5c10.5 18.5 23.3 33.7 32.9 43.8V62.1c-9.6 10.1-22.4 25.3-32.9 43.8zm94 0c-10.5-18.5-23.3-33.7-32.9-43.8v217.2c9.6-10.1 22.4-25.3 32.9-43.8V105.9z",
    fill: "#A2001D"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M303 105.9v129.5c10.6-18.8 18.8-41 18.8-64.8s-8.2-45.9-18.8-64.7zm-94 0v129.5c-10.6-18.8-18.8-41-18.8-64.8s8.2-45.9 18.8-64.7z"
  }));
};
var KG = function KG2(_ref127) {
  var title = _ref127.title, rest = _objectWithoutProperties(_ref127, _excluded127);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 256,
    cy: 171,
    r: 171
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M382.4 170.7 330.8 195l27.5 50-56.1-10.7-7.1 56.6-39.1-41.7-39.1 41.7-7.1-56.6-56.1 10.7 27.5-50-51.6-24.3 51.6-24.3-27.5-50.1 56.1 10.8 7.1-56.7L256 92.1l39.1-41.7 7.1 56.7 56.1-10.8-27.5 50.1z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#D80027",
    cx: 257.4,
    cy: 170.7,
    r: 71.6
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M214.2 170.7c-2.1 0-4.1.1-6.2.3.1 12 4.4 22.9 11.6 31.5 3.8-10.3 9.5-19.6 16.7-27.7-6.9-2.7-14.3-4.1-22.1-4.1zm26.6 46.5c5.2 1.9 10.8 2.9 16.6 2.9 5.8 0 11.4-1 16.6-2.9-2.8-11.1-8.7-21-16.6-28.8-7.9 7.8-13.8 17.7-16.6 28.8zm59.4-71.2c-8.5-14.8-24.5-24.7-42.8-24.7-18.3 0-34.2 9.9-42.8 24.7 15.6.1 30.2 4.3 42.8 11.6 12.6-7.3 27.2-11.6 42.8-11.6zm-21.7 28.8c7.2 8 12.9 17.4 16.7 27.7 7.2-8.5 11.5-19.5 11.6-31.5-2-.2-4.1-.3-6.2-.3-7.7 0-15.2 1.4-22.1 4.1z",
    fill: "#FFDA44"
  }));
};
var KH = function KH2(_ref128) {
  var title = _ref128.title, rest = _objectWithoutProperties(_ref128, _excluded128);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0zm0 228h513v114H0z",
    fill: "#0052B4"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M303.5 196.6v-17.8h-11.9v-23.7l-11.9-11.9-11.8 11.9v-23.8L256 119.5l-11.9 11.8v23.8l-11.8-11.9-11.9 11.9v23.7h-11.9v17.8h-11.9v17.8h118.8v-17.8z"
  }));
};
var KI = function KI2(_ref129) {
  var title = _ref129.title, rest = _objectWithoutProperties(_ref129, _excluded129);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "75 0 300 300"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#CE1126",
    d: "M0 0h450v300H0V0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FCD116"
  }, /* @__PURE__ */ React.createElement("circle", {
    cx: 227.6,
    cy: 161.2,
    r: 56.2
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m254.1 73.4-23.7 26 28.6 6.5zm-51.5.2-4.8 33.1 28.5-8zm94.3 26.7-34.7 8.5 20.1 23.7zm-138.3-1.8 15.5 32.7 20.2-22.7zm159 45.3-34.4-9.9 5.6 29.5zm-182-2.6 31.9 19.8 5.2-27.7z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#003F87",
    d: "M0 175h450v125H0V175z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 267c15 0 30 13 45 13s30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13v-21c-15 0-30 13-45 13s-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13v21zm0-43c15 0 30 13 45 13s30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13v-21c-15 0-30 13-45 13s-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13v21zm0-43c15 0 30 13 45 13s30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13 30 13 45 13 30-13 45-13v-21c-15 0-30 13-45 13s-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13-30 13-45 13-30-13-45-13v21z"
  }), /* @__PURE__ */ React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    fill: "#FCD116",
    d: "m183.2 48.3-1.1-5.3 22.4-3.7s-30.1-7.1-40-10.7c-14.3-5.1-16.3-12.1-16.3-12.1s44.7 11 64.8 11c4.3 0 12.8 10.7 12.8 10.7s14.8-14.9 21.9-15.4c32.1-2.3 66.6-6.4 66.6-6.4s-10 6.7-16 8.5c-16.2 4.9-50.6 11.7-50.6 11.7l-4.8 7.5H277l-14.4 4.3 7.4 6.9s-7.8-4.1-18.1-2.1c-7.1 1.3-15.4 6-22.9 8-18.7 4.8-29.9-12.8-29.9-12.8l-15.9-.1z"
  }));
};
var KM = function KM2(_ref130) {
  var title = _ref130.title, rest = _objectWithoutProperties(_ref130, _excluded130);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5.13 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v85.5H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.5h513V171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 171h513v85.5H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M256.5 171 0 342V0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M68.6 170.7c0-24.9 17.5-45.6 40.8-50.7-3.6-.8-7.3-1.2-11.1-1.2-28.7 0-51.9 23.3-51.9 51.9s23.3 51.9 51.9 51.9c3.8 0 7.5-.4 11.1-1.2-23.3-5.1-40.8-25.9-40.8-50.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m108.9 126.1 2.7 8.5h9l-7.3 5.3 2.8 8.5-7.2-5.2-7.3 5.2 2.8-8.5-7.2-5.3h8.9zm0 22.3 2.7 8.5h9l-7.3 5.3 2.8 8.5-7.2-5.3-7.3 5.3 2.8-8.5-7.2-5.3h8.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m108.9 170.7 2.7 8.5h9l-7.3 5.2 2.8 8.5-7.2-5.2-7.3 5.2 2.8-8.5-7.2-5.2h8.9zm0 22.2 2.7 8.5h9l-7.3 5.3 2.8 8.5-7.2-5.3-7.3 5.3 2.8-8.5-7.2-5.3h8.9z"
  })));
};
var KN = function KN2(_ref131) {
  var title = _ref131.title, rest = _objectWithoutProperties(_ref131, _excluded131);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M512 0H0v342"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M307.7 0 0 194.5V342h206.9L513 148.5V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M513 0H385.2L0 249.4V341l126.2 1L513 91.6z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m141.1 187 31.2 24 32.3-22.2-13.1 37 31.1 23.9-39.2-1.1-13.2 37-11.1-37.6-39.2-1.1 32.3-22.2zM310.6 70.8l31.2 23.9 32.3-22.2-13.1 37 31.1 23.9-39.2-1.1-13.2 37-11.1-37.6-39.2-1.1 32.4-22.2z",
    fill: "#FFF"
  }));
};
var KP = function KP2(_ref132) {
  var title = _ref132.title, rest = _objectWithoutProperties(_ref132, _excluded132);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "71.82 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#91DC5A",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v57.188H0zm0 284.1h513v57.177H0z",
    fill: "#0052B4"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 79.9h513v181.582H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 190.33,
    cy: 171,
    r: 65.668
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "m190.3 105 14.8 45.3h47.7l-38.6 28.1 14.8 45.5-38.7-28.2-38.6 28.1 14.8-45.4-38.6-28.1h47.7z"
  }));
};
var KR = function KR2(_ref133) {
  var title = _ref133.title, rest = _objectWithoutProperties(_ref133, _excluded133);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h342v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m236.6 225.7 16.5-16.5 11 11-16.5 16.5-11-11zm-27.5 27.6 16.5-16.5 11 11-16.5 16.5-11-11zm60.6 5.5 16.5-16.5 11 11-16.5 16.5-11-11zm-27.6 27.6 16.5-16.5 11 11-16.5 16.5-11-11zm11-44.1 16.5-16.5 11 11-16.5 16.5-11-11zm-27.5 27.6 16.5-16.5 11 11-16.5 16.5-11-11zm.1-198.4 11-11 44.1 44.1-11 11-44.1-44.1zM209.1 88l11-11 16.5 16.5-11 11L209.1 88zm27.5 27.5 11-11 16.5 16.5-11 11-16.5-16.5zm5.5-60.6 11-11 16.5 16.5-11 11-16.5-16.5zm27.5 27.7 11-11 16.5 16.5-11 11-16.5-16.5zM43.8 253.4l11-11 44.1 44.1-11 11-44.1-44.1zm44 11 11-11 16.5 16.5-11 11-16.5-16.5zm-27.5-27.7 11-11 16.5 16.5-11 11-16.5-16.5zm16.5-16.5 11-11 44.1 44.1-11 11-44.1-44.1zM43.8 88l44.1-44 11 11-44.1 44-11-11zm16.5 16.5 44.1-44.1 11 11-44.1 44.1-11-11zm16.5 16.6L120.9 77l11 11-44.1 44.1-11-11z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#D80027",
    cx: 170.3,
    cy: 170.7,
    r: 62.3
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M232.2 178.3c-9.6-25.4-44.3-25-61.8 1.3-17.6 26.3-43.8 16.9-61.6.7 4.6 29.9 30.4 52.7 61.6 52.7 31.8 0 58-23.9 61.8-54.7z"
  }));
};
var KW = function KW2(_ref134) {
  var title = _ref134.title, rest = _objectWithoutProperties(_ref134, _excluded134);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M167 227.6 0 341.3V0l167 113.8z"
  }));
};
var KY = function KY2(_ref135) {
  var title = _ref135.title, rest = _objectWithoutProperties(_ref135, _excluded135);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "117.99 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    stroke: "#fff"
  }, /* @__PURE__ */ React.createElement("circle", {
    fill: "#059334",
    cx: 384,
    cy: 96.5,
    r: 29.7
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#c8102e",
    d: "M332.1 89H436v44.5H332.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fcea83",
    d: "M332.1 200.3V230h15.6c9.4 9.2 22.2 14.8 36.3 14.8 14.1 0 27-5.7 36.3-14.8h15.6v-29.7H332.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#004b9e",
    d: "M332.1 126.1v44.5c0 39.8 51.9 51.9 51.9 51.9s51.9-12.2 51.9-51.9v-44.5H332.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M384 149.9c-13 0-13 11.9-26 11.9s-13-11.9-26-11.9v20.8c13 0 13 11.9 26 11.9s13-11.9 26-11.9 13 11.9 26 11.9 13-11.9 26-11.9v-20.8c-13 0-13 11.9-26 11.9s-13-11.9-26-11.9zm0-41.6c-13 0-13 11.9-26 11.9s-13-11.9-26-11.9v20.8c13 0 13 11.9 26 11.9s13-11.9 26-11.9 13 11.9 26 11.9 13-11.9 26-11.9v-20.8c-13 0-13 11.9-26 11.9s-13-11.9-26-11.9z",
    fill: "#F3F3F3"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var KZ = function KZ2(_ref136) {
  var title = _ref136.title, rest = _objectWithoutProperties(_ref136, _excluded136);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#36B6CC",
    d: "M0 0h513v342H0V0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFD400",
    cx: 256.5,
    cy: 170.9,
    r: 68.4
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFD400",
    d: "m256.5 251.5-27.9 41.7-7.1-49.7-43.2 25.5 15.2-47.8-50 4.2 34.4-36.5-46.9-18 46.8-18-34.4-36.5 50 4.2-15.2-47.8 43.2 25.4 7.1-49.7 27.9 41.7 27.9-41.7 7.1 49.7 43.2-25.4-15.2 47.8 50-4.2-34.3 36.6 46.8 17.9-46.8 18 34.4 36.5-50-4.2 15.2 47.8-43.2-25.4-7.1 49.7c0-.1-27.9-41.8-27.9-41.8zm0-.8c44.1 0 79.9-35.8 79.9-79.9S300.6 91 256.5 91s-79.9 35.8-79.9 79.9 35.8 79.8 79.9 79.8zM22.8 28.3c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H28.5c-3.1 0-5.7-2.5-5.7-5.6V28.3zm0 45.7c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H28.5c-3.1 0-5.7-2.5-5.7-5.6V74zm0 45.6c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H28.5c-3.1 0-5.7-2.5-5.7-5.6v-11.4zm0 45.6c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H28.5c-3.1 0-5.7-2.5-5.7-5.6v-11.4zm0 45.7c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H28.5c-3.1 0-5.7-2.5-5.7-5.6v-11.4zm0 45.6c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H28.5c-3.1 0-5.7-2.5-5.7-5.6v-11.4zm0 45.6c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H28.5c-3.1 0-5.7-2.5-5.7-5.6v-11.4zm22.8-22.8c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H51.3c-3.1 0-5.7-2.5-5.7-5.6v-11.4zm0-45.6c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7V245c.1 3.1-2.4 5.7-5.6 5.7H51.3c-3.1 0-5.7-2.5-5.7-5.6v-11.4zm0-45.7c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H51.3c-3.1 0-5.7-2.5-5.7-5.6V188zm0-45.6c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H51.3c-3.1 0-5.7-2.5-5.7-5.6v-11.4zm0-45.6c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H51.3c-3.1 0-5.7-2.5-5.7-5.6V96.8zm0-45.6c0-3.2 2.4-5.7 5.7-5.7h11.3c3.2 0 5.7 2.4 5.7 5.7v11.3c.1 3.1-2.4 5.7-5.6 5.7H51.3c-3.1 0-5.7-2.5-5.7-5.6V51.2z"
  }));
};
var LA = function LA2(_ref137) {
  var title = _ref137.title, rest = _objectWithoutProperties(_ref137, _excluded137);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 .1h513v90.7H0zm0 251.2h513V342H0z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 256.5,
    cy: 171,
    r: 65.9
  }));
};
var LB = function LB2(_ref138) {
  var title = _ref138.title, rest = _objectWithoutProperties(_ref138, _excluded138);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 .2h513v90.7H0zm.5 251.1H513V342H.5z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M290.3 193.5 256 130.7l-34.3 62.8h25.7v17.2h17.2v-17.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#14AF5A",
    d: "M241.3 213.1c4.4-4.4 4.4-11.6-.1-16l4.7 4.7c-5.2-4.7-12.2-6.6-19.1-5.3l-23.5 5.9c-6.1 1.5-6.8-.4-1.8-4.2l27.1-20.3c5.1-3.8 4.2-6.9-2.3-6.9h-11c-6.4 0-7-2.3-1.5-5.1l25.3-12.7c5.6-2.8 5.1-5.1-1.5-5.1h-11c-6.4 0-7.4-3.1-2.3-6.9l27.1-20.3c5.6-3.8 12.9-3.8 18.5 0l27.1 20.3c5.1 3.8 4.2 6.9-2.3 6.9h-11c-6.4 0-7 2.3-1.5 5.1l25.3 12.7c5.6 2.8 5.1 5.1-1.5 5.1h-11c-6.4 0-7.4 3.1-2.3 6.9l27.1 20.3c5.1 3.8 4.4 5.7-1.8 4.2l-23.5-5.9c-6.8-1.3-13.9.6-19.1 5.3l4.7-4.7c-4.4 4.4-4.5 11.5-.1 16l6.8 6.8c4.4 4.4 3.1 8-3.3 8h-45.8c-6.2 0-7.7-3.6-3.3-8 .1.1 6.9-6.8 6.9-6.8z"
  }));
};
var LC = function LC2(_ref139) {
  var title = _ref139.title, rest = _objectWithoutProperties(_ref139, _excluded139);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#55B2FF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F3F3F3",
    d: "M148.5 298.1h216l-108-254.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#333",
    d: "m186 272.7 70.5-160.3L327 272.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M148.5 298.1h216l-108-101.7z"
  }));
};
var LI = function LI2(_ref140) {
  var title = _ref140.title, rest = _objectWithoutProperties(_ref140, _excluded140);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "51.3 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M149.3 98.1c0-14-11.3-25.3-25.3-25.3-6.5 0-12.4 2.4-16.9 6.4V64.4h8.4V47.5h-8.4v-8.4H90.3v8.4h-8.4v16.9h8.4v14.9c-4.5-4-10.4-6.4-16.9-6.4-14 0-25.3 11.3-25.3 25.3 0 7.5 3.3 14.2 8.4 18.8v14.9h84.3V117c5.3-4.7 8.5-11.5 8.5-18.9z"
  }));
};
var LK = function LK2(_ref141) {
  var title = _ref141.title, rest = _objectWithoutProperties(_ref141, _excluded141);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "42.75 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A2001D",
    d: "M222.6 22.3h267.1v296.8H222.6z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M22.3 22.3h200.3v296.8H22.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M200.3 0h22.3v342h-22.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M22.3 22.3h89v296.8h-89z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF9811",
    d: "M111.3 22.3h89v296.8h-89z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M368.2 156.8c-1.4-2 0-37.9 0-37.9.9-7.4.1-8.4 1-11.4.9-2.9 5.4-11.6 5.4-11.6s-6-2.3-10.3-.6c-4.3 1.7-24.7-7.5-31.2 3.4-4.4 7-23.6 16.2-24.6 14-1-2.2-5.9-5-6.9-2.9s-.7 13.9 0 16c.8 2.6 9.8 2 12.3 3.1 3.7 1.8 12.2 8.2 11.9 10.7-.3 2.5-22.5-6-24.2-4.5-1.4 1.2-1.9 13.2-.4 15 1.8 2.1 23.4 5.6 25 7.5 1.6 1.9-13.1 7.4-12.3 25 .7 14.7 8 17.4 8 17.4s-2.4 3.6-7.8 3.1c-6.2-.6-27.4-17.7-27.4-17.7s-3.5-109 3.6-121.4c4.9-8.5-22.7 10.1-22.7 50.8V151c0 6.6-1.4 22.4 2.6 34 0 0-.4 46.9 1.5 49.6s12.7 2.2 14.8 0 0-30 0-30c7.7.2 18.3 17.5 32.5 16.4 20.6-1.6 28.7-9.9 34.3-5 8.1 7.1 5.5 23.2.4 31.5-2.2 3.5-14.3 4.7-15.7 7.6-1.4 2.9.5 5.4.5 5.4h29.7s1.4-20.5 2.7-26.1c1.3-5.7-.6-10.7 5.9-10.4 23.5 1.1 39.8-15.3 45.5-8 3.2 4.1 5.6 29.9 3.3 33.3-2.2 3.4-13.8 2.8-15.2 6.7-1.4 4 .8 4.4.8 4.4h29.7s-.4-21.2 2.5-27.7 4.9-10.4 9.3-17.2c4.4-6.8 11.3-15.7 11.3-36.2 0-14.2-8.1-22.8-8.1-22.8H417c-14.1.2-47.4 2.3-48.8.3zm-136-124.5c10.7-10.6 20.2-2.7 22.2 2.1 1.9 4.8 2.1 8.2 2.8 13.6.9 6.9 4.9 14 4.9 14s-7.1-3.8-14.7-4.2c-4.7-.3-9-.6-13.6-2.5-5.7-2.3-11.7-12.9-1.6-23zm248.4-.1c10.7 10.6 2.8 20.2-2 22.2s-8.2 2.1-13.6 2.8c-6.9.9-14 5-14 5s3.7-7.1 4.2-14.7c.3-4.7.6-9.1 2.4-13.6 2.2-5.7 12.8-11.8 23-1.7zm.1 276.9c-10.7 10.6-20.2 2.6-22.2-2.2-1.9-4.8-2.1-8.2-2.7-13.6-.8-6.9-4.9-14.1-4.9-14.1s7 3.8 14.7 4.3c4.7.3 9 .6 13.6 2.5 5.7 2.4 11.7 13.1 1.5 23.1zm-248.2-.1c-10.6-10.7-2.7-20.2 2.1-22.2 4.8-1.9 8.2-2.1 13.6-2.8 6.9-.9 14-4.9 14-4.9s-3.8 7.1-4.2 14.7c-.3 4.7-.6 9-2.5 13.6-2.3 5.7-12.9 11.8-23 1.6z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: "#FFDA44",
    strokeWidth: 6,
    strokeMiterlimit: 10,
    d: "M446.9 162.4s7.5-2.6 8.4-16.1c.6-8.6-19.8-16-39-11.5-19.7 4.6-34-3.1-34-14.6 0-22.9 29.7-16.2 38.9-11.3 9.1 4.9 29.7 23.5 35.1 9.4"
  }));
};
var LR = function LR2(_ref142) {
  var title = _ref142.title, rest = _objectWithoutProperties(_ref142, _excluded142);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5.13 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v31.1H0zm0 62.2h513v31.1H0zm0 62.3h513v31.1H0zm0 62.3h513v31.1H0zm0 62.5h513v31.1H0zm0 61.6h513V342H0z",
    fill: "#bf0a30"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#002868",
    d: "M0 0h155.6v155.6H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m77.8 30.2 10.7 32.9h34.6l-28 20.4 10.7 32.9-28-20.3-28 20.3 10.7-32.9-28-20.4h34.6z"
  }));
};
var LS = function LS2(_ref143) {
  var title = _ref143.title, rest = _objectWithoutProperties(_ref143, _excluded143);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 227.6h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m245.2 171 7.7-23.1c2-5.9 5.1-6 7.1 0l7.7 23.1 19.4 29.1c1.7 2.6 1.3 6.3-1.2 8 0 0-6.9 8-29.5 8s-29.5-8-29.5-8c-2.4-2-2.9-5.4-1.2-8l19.5-29.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 171c-12.5 0-22.6-10.1-22.6-22.6 0-12.5 10.1-22.6 22.6-22.6s22.6 10.1 22.6 22.6c0 12.5-10.2 22.6-22.6 22.6zm0 0c6.2 0 11.3-16.3 11.3-22.6 0-6.2-5.1-11.3-11.3-11.3-6.2 0-11.3 5.1-11.3 11.3 0 6.3 5 22.6 11.3 22.6z"
  }));
};
var LT = function LT2(_ref144) {
  var title = _ref144.title, rest = _objectWithoutProperties(_ref144, _excluded144);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 228h513v114H0z"
  }));
};
var LU = function LU2(_ref145) {
  var title = _ref145.title, rest = _objectWithoutProperties(_ref145, _excluded145);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 228h513v114H0z"
  }));
};
var LV = function LV2(_ref146) {
  var title = _ref146.title, rest = _objectWithoutProperties(_ref146, _excluded146);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    className: "prefix__st1",
    d: "M0 0h513v127.6H0zm0 214.4h513V342H0z",
    fill: "#A2001D"
  }));
};
var LY = function LY2(_ref147) {
  var title = _ref147.title, rest = _objectWithoutProperties(_ref147, _excluded147);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#496E2D",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "m281.4 150.7 9 12.3 14.5-4.7-9 12.4 9 12.3-14.5-4.7-9 12.3v-15.2l-14.5-4.7 14.5-4.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M257 201.5c-17 0-30.9-13.8-30.9-30.9s13.8-30.9 30.9-30.9c5.3 0 10.3 1.3 14.7 3.7-6.9-6.7-16.2-10.8-26.6-10.8-21 0-38 17-38 38s17 38 38 38c10.3 0 19.7-4.1 26.6-10.8-4.4 2.4-9.4 3.7-14.7 3.7z"
  })));
};
var MA = function MA2(_ref148) {
  var title = _ref148.title, rest = _objectWithoutProperties(_ref148, _excluded148);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#d12a46",
    d: "M0 .3V342h513V.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#316525",
    d: "M359.8 148.9h-73.3l-22.7-69.7-22.7 69.7h-73.3l59.3 43.1-22.7 69.7 59.3-43.1 59.3 43.1-22.5-69.7 59.3-43.1zm-116.1 37.7 7.7-23.6h24.8l7.7 23.6-20.1 14.6-20.1-14.6zm27.9-37.7H256l7.8-24 7.8 24zm24.3 29-4.8-14.9h25.3l-20.5 14.9zM236.6 163l-4.8 14.9-20.5-14.9h25.3zm-5.3 61.8 7.8-24 12.6 9.2-20.4 14.8zm44.5-14.9 12.6-9.2 7.8 24-20.4-14.8z"
  }));
};
var MC = function MC2(_ref149) {
  var title = _ref149.title, rest = _objectWithoutProperties(_ref149, _excluded149);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 171h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ce1126",
    d: "M0 0h513v171H0z"
  }));
};
var MD = function MD2(_ref150) {
  var title = _ref150.title, rest = _objectWithoutProperties(_ref150, _excluded150);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M342 0h171v342H342z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#AF7F59",
    stroke: "#231F20",
    strokeWidth: 3,
    strokeMiterlimit: 10,
    d: "m240.4 105.7 9.7 11.6-7.5 17.4-26.1-24.3-12.7 13.2v106.1l24.6-36 20.6 12.4-18 27.8 25.2 15.8 26.5-15.8-19.7-27.8 22.3-12.4 23.9 33.8v-106l-12.4-12-26.8 24.7-6.5-16.5 3.5-12.3-11.7-7.5z"
  }));
};
var ME = function ME2(_ref151) {
  var title = _ref151.title, rest = _objectWithoutProperties(_ref151, _excluded151);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffc000",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#e30000",
    d: "M20 20h473v302H20z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffc000",
    d: "M248.5 112.9c4.4 4.4 11.6 4.4 16 0l-4.7 4.7 22.7-22.7c4.9-4.5 12.1-5.6 18.2-2.8l2.1 1c5.7 2.9 6.7 8.7 2.3 13.1l4.7-4.7-22.8 22.8c-4.5 4.9-5.6 12.1-2.8 18.2l1 2.1c2.9 5.7 5.1 15.4 5.1 21.6v-11.3c0 6.2 4.4 9.1 10.2 6.2l2.1-1c5.7-2.9 6.7-8.7 2.3-13.1l4.7 4.7c-4.4-4.4-4.4-11.6 0-16l-4.7 4.7c5.2-5.5 9.6-11.6 13.1-18.2l1-2.1c2.9-5.7 6.3-15.1 7.9-21.2l5.8-23.3c1.5-6 5.9-6.8 9.6-1.8l20.2 26.9c3.8 5.1 6.9 14 6.9 20.6v22.4c0 6.3-2.2 15.8-5.1 21.7l-1 2.1c-3.5 6.6-7.9 12.7-13.1 18.2l-6.8 6.8c-5.4 5.2-11.5 9.6-18.2 13.1l-2.1 1c-5.7 2.9-15.5 5.1-21.6 5.1-6.2 0-6.9 2.2-1.1 5.1l2.1 1c5.7 2.9 13.8 8.7 18.2 13.1l-4.7-4.7c4.4 4.4 11.6 4.4 16 0l-4.7 4.7c4.4-4.4 11.6-4.4 16 0L339 226c4.6 4.9 5.7 12.1 2.9 18.2l-1 2.1c-2.9 5.7-10.4 10.2-16.4 10.2-7.5-.3-14.8-2-21.6-5.1l-2.1-1c-6.5-3.6-11.8-8.9-15.4-15.4l-1-2.1c-2.9-5.7-8.7-6.7-13.1-2.3l4.7-4.7c-4.4 4.7-5.2 11.8-1.8 17.3l10.3 15.4c3.4 5.1 2 12.1-3.1 15.5L266 284.4c-5.7 3.4-12.8 3.4-18.6 0L232 274.1c-5.1-3.4-6.5-10.3-3.1-15.5l10.3-15.4c3.4-5.5 2.6-12.6-1.8-17.3l4.7 4.7c-4.4-4.4-10.2-3.6-13.1 2.3l-1 2.1c-2.9 5.7-9.5 12.4-15.4 15.4l-2.1 1c-5.7 2.9-15.5 5.1-21.6 5.1-6.9-.3-13.1-4.2-16.4-10.2l-1-2.1c-2.8-6.1-1.6-13.3 2.9-18.2l-4.7 4.7c4.4-4.4 11.6-4.4 16 0L181 226c4.4 4.4 11.6 4.4 16 0l-4.7 4.7c5.5-5.2 11.6-9.6 18.2-13.1l2.1-1c5.7-2.9 5-5.1-1.1-5.1-7.5-.3-14.8-2-21.6-5.1l-2.1-1c-6.6-3.5-12.7-7.9-18.2-13.1l-6.8-6.8c-5.2-5.4-9.6-11.5-13.1-18.2l-1-2.1c-3.1-6.8-4.9-14.2-5.1-21.7V121c0-6.3 3.1-15.6 6.9-20.6l20.2-26.9c3.8-5.1 8.1-4.3 9.6 1.8l5.8 23.3c2 7.3 4.6 14.4 7.9 21.2l1 2.1c2.9 5.7 8.7 13.8 13.1 18.2l-4.7-4.7c4.4 4.4 4.4 11.6 0 16l4.7-4.7c-4.4 4.4-3.6 10.2 2.3 13.1l2.1 1c5.7 2.9 10.2 0 10.2-6.2v11.3c0-6.2 2.2-15.7 5.1-21.6l1-2.1c2.8-6.1 1.7-13.2-2.8-18.2l-22.7-22.7 4.7 4.7c-4.4-4.4-3.6-10.2 2.3-13.1l2.1-1c6.1-2.8 13.2-1.7 18.2 2.8l22.7 22.7-4.8-4.5zm-18-40.7c-4.4-4.4-3.2-9.5 2.8-11.5l12.4-4.2c3-1 6.9-7.5 10.8-7.5 3.9 0 7.8 6.5 10.8 7.5l12.4 4.2c6 2 7.2 7.1 2.8 11.5l-6.8 6.8c-5.3 4.7-12.1 7.5-19.2 7.9-6.2 0-14.8-3.5-19.2-7.9l-6.8-6.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0371ba",
    d: "M275 201.3h-37c-4.9 0-8.8-3.9-8.8-8.8v-34.2c0-4.9 3.9-8.8 8.8-8.8h37c4.9 0 8.8 3.9 8.8 8.8v34.2c0 4.8-3.9 8.8-8.8 8.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#39B54A",
    d: "m230.8 212.8 24.4 17.9c.8.6 1.8.6 2.6 0l24.4-17.9c2.1-1.6 1.2-5.4-1.3-5.4h-48.8c-2.5 0-3.4 3.9-1.3 5.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffc000",
    d: "M262.8 186.5h-12.5c-3.3 0-5.9-2.6-5.9-5.9V170c0-3.3 2.6-5.9 5.9-5.9h12.5c3.3 0 5.9 2.6 5.9 5.9v10.6c-.1 3.3-2.7 5.9-5.9 5.9z"
  }));
};
var MF = function MF2(_ref152) {
  var title = _ref152.title, rest = _objectWithoutProperties(_ref152, _excluded152);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "18 0 72 72"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h108v72H0z",
    fill: "#003787"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h108L60 48v24H48V48z",
    fill: "#fff"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 54,
    cy: 30,
    r: 8,
    fill: "#f9d90f"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M44 30h20L54 48z",
    fill: "#fff"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M54 48 38 33h32z",
    fill: "#cf142b"
  }));
};
var MG = function MG2(_ref153) {
  var title = _ref153.title, rest = _objectWithoutProperties(_ref153, _excluded153);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "64.98 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#f9423a",
    d: "M0 0h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00843d",
    d: "M0 171h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h171v342H0z"
  }));
};
var MH = function MH2(_ref154) {
  var title = _ref154.title, rest = _objectWithoutProperties(_ref154, _excluded154);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#1E509C",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 176.1V81.3L0 342l513-165.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F18D36",
    d: "M513 0v81.3L0 342 513 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m126.7 99.3-7.8-54.1-7.7 54.1-20.8-23.7 10.7 31.6-31.5-10.7 23.6 20.8-54.1 7.7 54.1 7.7-23.6 20.8 31.5-10.7-10.7 31.6 20.8-23.7 7.7 54.1 7.8-54.1 20.7 23.7-10.6-31.6 31.5 10.7-23.6-20.8 54-7.7-54-7.7 23.6-20.8-31.5 10.7 10.6-31.6z"
  }));
};
var MK = function MK2(_ref155) {
  var title = _ref155.title, rest = _objectWithoutProperties(_ref155, _excluded155);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M384.6 342 256.5 167.3 283.4 342zM133.8 0l122.7 167.3L230.8 0zm95.8 342 26.9-174.7L128.4 342zM0 0v127.8l256.5 39.5L28.4 0zm0 342h18.2l238.3-174.7L0 206.7zm256.5-174.7L513 127.8V0h-28.4zM282.2 0l-25.7 167.3L379.2 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M513 342V206.7l-256.5-39.4L494.8 342z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 256.5,
    cy: 171,
    r: 59.5
  })), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFDA44",
    cx: 256.5,
    cy: 171,
    r: 44.5
  }));
};
var ML = function ML2(_ref156) {
  var title = _ref156.title, rest = _objectWithoutProperties(_ref156, _excluded156);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#14b53a",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fcd116",
    d: "M171 0h171v342H171z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ce1126",
    d: "M342 0h171v342H342z"
  }));
};
var MM = function MM2(_ref157) {
  var title = _ref157.title, rest = _objectWithoutProperties(_ref157, _excluded157);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#fecb00",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#34b233",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ea2839",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M384.8 142.2h-98L256.5 49l-30.3 93.2h-98l79.3 57.6-30.3 93.2 79.3-56.9 79.3 56.9-30.3-93.2 79.3-57.6z"
  }));
};
var MN = function MN2(_ref158) {
  var title = _ref158.title, rest = _objectWithoutProperties(_ref158, _excluded158);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "22.23 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0066b2",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M342 0h171v342H342zM0 0h171v342H0z",
    fill: "#da2031"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#ffd300"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M108.3 166.3h14.8v74.2h-14.8zm-59.4 0h14.8v74.2H48.9z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 86,
    cy: 203.4,
    r: 14.8
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M71.2 225.7h29.7v14.8H71.2zm0-59.4h29.7v14.8H71.2z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 86,
    cy: 144,
    r: 14.8
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M76.3 123.9h19.5L86 108.3z"
  })));
};
var MO = function MO2(_ref159) {
  var title = _ref159.title, rest = _objectWithoutProperties(_ref159, _excluded159);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0F7562",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M286.2 168.5c-4.2 0-8.2.8-11.9 2.2 2-4.5 3.4-9.5 3.4-14.9 0-21.2-21.2-37.1-21.2-37.1s-21.2 15.9-21.2 37.1c0 5.4 1.4 10.4 3.4 14.9-3.7-1.3-7.7-2.2-11.9-2.2-25.6 0-37.1 11.2-37.1 11.2s15.9 31.2 37.1 31.2c12.4 0 23-7.3 29.7-13.3 6.6 6 17.3 13.3 29.7 13.3 21.2 0 37.1-31.2 37.1-31.2s-10.8-11.2-37.1-11.2zm-29.7-96.8 4.4 13.5h14.2l-11.5 8.3L268 107l-11.5-8.3L245 107l4.4-13.5-11.5-8.3h14.2zm-53.9 23.6 8.4 7.6 9.9-5.7-4.7 10.4 8.5 7.6-11.3-1.2-4.6 10.3-2.4-11.1-11.3-1.1 9.9-5.7zm-39.4 39.5 11.1 2.3 5.6-9.8 1.2 11.3 11.1 2.3-10.4 4.6 1.2 11.3-7.6-8.4-10.3 4.6 5.6-9.8zm147.2-39.5-8.4 7.6-9.9-5.7 4.7 10.4-8.5 7.6 11.3-1.2 4.6 10.3 2.4-11.1 11.3-1.1-9.9-5.7zm39.4 39.5-11.1 2.3-5.6-9.8-1.2 11.3-11.1 2.3 10.4 4.6-1.2 11.3 7.6-8.4 10.3 4.6-5.6-9.8z",
    fill: "#FFDA44"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 270.3c16.8 0 32.4-5.6 44.8-15.1h-89.6c12.4 9.4 28 15.1 44.8 15.1zm-68-44.6c2.4 5.4 5.3 10.4 8.9 15.1H238c13.9 0 18.5-7 18.5-7s5.3 7 18.6 7h40.6c3.5-4.6 6.5-9.7 8.9-15.1h-49.5c-15.5 0-18.6-10-18.6-10s-5.3 10-18.5 10h-49.5z",
    fill: "#FFF"
  }));
};
var MP = function MP2(_ref160) {
  var title = _ref160.title, rest = _objectWithoutProperties(_ref160, _excluded160);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "125 0 500 500"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0071BC",
    d: "M0 0h750v500H0V0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF",
    stroke: "#000",
    strokeWidth: 1.9
  }, /* @__PURE__ */ React.createElement("circle", {
    cx: 375,
    cy: 245,
    r: 225,
    fill: "#fff"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 375,
    cy: 245,
    r: 165,
    fill: "#0071BC"
  })), /* @__PURE__ */ React.createElement("g", {
    stroke: "#000"
  }, /* @__PURE__ */ React.createElement("path", {
    fill: "#8C8A8C",
    strokeWidth: 1.9,
    d: "M444.7 450c.7 11-7.8 20-18.8 20H323.6c-11 0-19.5-9-19-20l16.7-325c.6-11 10-20 21-20h61.4c11 0 20.5 9 21.2 20l19.8 325z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    strokeWidth: 2,
    strokeLinejoin: "round",
    d: "m373 114 30 93h97l-78 56 29 92-78-56-78 57 30-93-79-57h97l30-92z"
  })));
};
var MQ = function MQ2(_ref161) {
  var title = _ref161.title, rest = _objectWithoutProperties(_ref161, _excluded161);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    viewBox: "150 0 600 600",
    xmlns: "http://www.w3.org/2000/svg"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#231f1e",
    d: "M0 0h900v600H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00a650",
    d: "M0 0h900v300H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ef1923",
    d: "m0 0 450 300L0 600z"
  }));
};
var MR = function MR2(_ref162) {
  var title = _ref162.title, rest = _objectWithoutProperties(_ref162, _excluded162);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#00a95c",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#d01c1f",
    d: "M0 0h513v46H0zm0 296h513v46H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "gold",
    d: "M256 213.9c-46 0-84.3-32.3-93.8-75.4-1.4 6.6-2.2 13.5-2.2 20.6 0 53 43 96 96 96s96-43 96-96c0-7.1-.8-13.9-2.2-20.6-9.5 43.1-47.8 75.4-93.8 75.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "gold",
    d: "m256 87 8.9 27.5h29l-23.4 17 8.9 27.5-23.4-17-23.4 17 8.9-27.5-23.4-17h29z"
  }));
};
var MS = function MS2(_ref163) {
  var title = _ref163.title, rest = _objectWithoutProperties(_ref163, _excluded163);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "121.41 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00A2B8",
    stroke: "#FFF",
    strokeWidth: 3,
    d: "M318.2 106.7v106.5c0 51.9 67.8 67.8 67.8 67.8s67.8-15.9 67.8-67.8V106.7H318.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A35023",
    d: "M319.7 212.7c0 50.8 66.3 66.3 66.3 66.3s66.3-15.6 66.3-66.3H319.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#510",
    d: "M415.1 155.1h-19.4v-19.4h-19.4v19.4H357v19.4h19.3v58.1h19.4v-58.1h19.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var MT = function MT2(_ref164) {
  var title = _ref164.title, rest = _objectWithoutProperties(_ref164, _excluded164);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#cf142b",
    d: "M256 0h256.5v342H256z"
  }), /* @__PURE__ */ React.createElement("path", {
    stroke: "#cf142b",
    strokeWidth: 10,
    d: "M101.2 68.2V33H66v35.2H30.8v35.2H66v35.2h35.2v-35.2h35.2V68.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fff",
    stroke: "#acacac",
    strokeWidth: 5,
    d: "M101.2 68.2V33H66v35.2H30.8v35.2H66v35.2h35.2v-35.2h35.2V68.2z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 85,
    cy: 85,
    r: 26,
    fill: "none",
    stroke: "#acacac",
    strokeWidth: 5
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 85,
    cy: 85,
    r: 18,
    fill: "#dedede",
    stroke: "#acacac",
    strokeWidth: 5
  }));
};
var MU = function MU2(_ref165) {
  var title = _ref165.title, rest = _objectWithoutProperties(_ref165, _excluded165);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#d01c1f",
    d: "M0 0h513v85.5H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#2d3359",
    d: "M0 85.5h513V171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f7b718",
    d: "M0 171h513v85.5H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#008658",
    d: "M0 256.5h513V342H0z"
  }));
};
var MV = function MV2(_ref166) {
  var title = _ref166.title, rest = _objectWithoutProperties(_ref166, _excluded166);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "120 0 480 480"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#007E3A",
    stroke: "#D21034",
    strokeWidth: 120,
    d: "M60 60h600v360H60z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 390,
    cy: 240,
    r: 80
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#007E3A",
    cx: 420,
    cy: 240,
    r: 80
  }));
};
var MW = function MW2(_ref167) {
  var title = _ref167.title, rest = _objectWithoutProperties(_ref167, _excluded167);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ce1126",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#339e35",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#ce1126",
    cx: 256.5,
    cy: 125,
    r: 95
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 100h513v14H0z"
  }));
};
var MX = function MX2(_ref168) {
  var title = _ref168.title, rest = _objectWithoutProperties(_ref168, _excluded168);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#dc2339",
    d: "M342 0H0v341.3h513V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#11865d",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M171 0h171v342H171z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#8C9157",
    d: "M195.8 171.2c0 21.6 11.5 41.7 30.3 52.5 5.8 3.4 13.2 1.4 16.6-4.4 3.4-5.8 1.4-13.2-4.4-16.6-11.3-6.5-18.2-18.5-18.2-31.5 0-6.7-5.4-12.1-12.1-12.1-6.7 0-12.2 5.4-12.2 12.1zm93.4 51.1c17.5-11.1 28-30.4 28-51.1 0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1c0 12.4-6.3 24-16.8 30.7-5.7 3.5-7.5 10.9-4.1 16.7s10.9 7.5 16.7 4.1c0-.2.2-.3.4-.4z"
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#C59262",
    cx: 256.5,
    cy: 159.1,
    rx: 24.3,
    ry: 36.4
  }));
};
var MY = function MY2(_ref169) {
  var title = _ref169.title, rest = _objectWithoutProperties(_ref169, _excluded169);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v24.4H0zm0 48.9h513v24.4H0zm0 48.8h513v24.4H0zm0 48.9h513V171H0zm0 48.8h513v24.4H0zm0 48.9h513v24.4H0zm0 48.8h513v24.4H0z",
    fill: "#c00"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#006",
    d: "M0 0h256.5v195.4H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M153.3 42.1C122.6 30.7 88.5 46.3 77.1 77s4.2 64.8 34.9 76.2c13.3 5 28 5 41.4 0-30.7 24.5-75.4 19.6-100-11.1s-19.6-75.4 11.1-100c26-20.7 62.9-20.7 88.8 0zm26.7 75-20.6 23.3 5.4-30.6-31-1.6 27.3-14.9L143 68l28.6 12 8.4-29.9 8.4 29.9L217 68l-18 25.4 27.3 14.9-31 1.6 5.4 30.6-20.7-23.4z",
    fill: "#fc0"
  }));
};
var MZ = function MZ2(_ref170) {
  var title = _ref170.title, rest = _objectWithoutProperties(_ref170, _excluded170);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#006d66",
    d: "M0 0h513v104H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 119h513v104H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f4d900",
    d: "M0 238h513v104H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#cb0f31",
    d: "M256 171 0 342V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f4d900",
    d: "m83.5 109.8 15.1 46.5h48.9L107.9 185l15.1 46.5-39.5-28.7-39.6 28.7L59 185l-39.5-28.7h48.9z"
  }));
};
var NA = function NA2(_ref171) {
  var title = _ref171.title, rest = _objectWithoutProperties(_ref171, _excluded171);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "32.49 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#009a44",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#002f6c",
    d: "M0 342V0h513"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 67V0H412.5L0 275v67h100.5z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#c8102e",
    d: "M513 0v40.2L60.3 342H0v-40.2L452.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffcd00",
    d: "m188.1 104.1-22.8 10.7 12.2 22.1-24.8-4.8-3.1 25-17.3-18.4-17.2 18.4-3.1-25-24.8 4.8 12.2-22.1-22.8-10.7 22.8-10.7-12.2-22.1L112 76l3.1-25 17.2 18.4L149.6 51l3.1 25 24.8-4.7-12.2 22.1z"
  }));
};
var NC = function NC2(_ref172) {
  var title = _ref172.title, rest = _objectWithoutProperties(_ref172, _excluded172);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "20.52 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#009543",
    d: "M0 234.8h513V342H0V234.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ED4135",
    d: "M0 105.8h513v129.3H0V105.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0035AD",
    d: "M0 0h513v106.8H0V0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FAE600",
    stroke: "#000",
    strokeWidth: 5.3,
    cx: 192.4,
    cy: 171,
    r: 126.1
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m246.8 284.1-25.5 9.6-28.9 3.4-30.3-1.9-28.8-12.4s22.9-23.5 32.6-26.9c6.9-2.4 18-3 18-3V97.8l-.2-52.9h13.5l-.4 54.1v153.7s12.3 1 17.7 3.3c9 3.8 32.3 28.1 32.3 28.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m168.3 80.8 39.5-19.7 5.1 10.3-39.5 19.7-5.1-10.3z"
  }), /* @__PURE__ */ React.createElement("ellipse", {
    cx: 190.6,
    cy: 224.8,
    rx: 13.5,
    ry: 21.2
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 190.3,
    cy: 114.9,
    r: 16.8
  }), /* @__PURE__ */ React.createElement("ellipse", {
    cx: 191.1,
    cy: 169.2,
    rx: 16,
    ry: 9.7
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M171.4 146.7h37.7v8h-37.7zm0 36h37.7v8h-37.7z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 10,
    strokeMiterlimit: 10
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M163.4 112.2s.8 26.8 27.3 26.8 26.5-26.8 26.5-26.8"
  }), /* @__PURE__ */ React.createElement("path", {
    className: "prefix__st4",
    d: "M163.4 224.8s1.9-26.6 27.3-26.6 26.5 26.6 26.5 26.6"
  })));
};
var NE = function NE2(_ref173) {
  var title = _ref173.title, rest = _objectWithoutProperties(_ref173, _excluded173);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#e05206",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0db02b",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#e05206",
    cx: 256.5,
    cy: 171,
    r: 32
  }));
};
var NF = function NF2(_ref174) {
  var title = _ref174.title, rest = _objectWithoutProperties(_ref174, _excluded174);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h171v342H0zm342 0h171v342H342zm-38 227L256 75l-48 152h41v40h14v-40z",
    fill: "#007934"
  }));
};
var NG = function NG2(_ref175) {
  var title = _ref175.title, rest = _objectWithoutProperties(_ref175, _excluded175);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h171v342H0zm342 0h171v342H342z",
    fill: "#008751"
  }));
};
var NI = function NI2(_ref176) {
  var title = _ref176.title, rest = _objectWithoutProperties(_ref176, _excluded176);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0zm0 228h513v114H0z",
    fill: "#0067c6"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "none",
    stroke: "#FFDA44",
    strokeWidth: 5,
    cx: 256.5,
    cy: 171,
    r: 50
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0a47a5",
    d: "M285.7 176.7h-58.4l-9.8 16.9h78z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6fd8f3",
    d: "m256.5 126.1-29.2 50.6h58.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#97c924",
    d: "M221.7 186.4h69.6l-8-13.9h-53.6z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "red",
    cx: 256.5,
    cy: 161,
    r: 5
  }));
};
var NL = function NL2(_ref177) {
  var title = _ref177.title, rest = _objectWithoutProperties(_ref177, _excluded177);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#cd1f2a",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1d4185",
    d: "M0 228h513v114H0z"
  }));
};
var NO = function NO2(_ref178) {
  var title = _ref178.title, rest = _objectWithoutProperties(_ref178, _excluded178);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "37.62 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ba0c2f",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 211H202.6v131h-79.9V211H0v-80h122.7V0h79.9v131H513v61.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00205b",
    d: "M513 149.6v42.8H184V342h-42.7V192.4H0v-42.8h141.3V0H184v149.6z"
  }));
};
var NP = function NP2(_ref179) {
  var title = _ref179.title, rest = _objectWithoutProperties(_ref179, _excluded179);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 342V-.2L281.1 175H87.8l184 167z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M243.4 164.8 9.2 19.3v313.5h235.2l-184.1-168z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m62.4 204.1 7.9 16.2 14.9-10.1-1.3 18 18-1.3-10.1 14.9 16.2 7.9-16.2 7.8 10.1 15-18-1.3 1.3 17.9L70.3 279l-7.9 16.2-7.8-16.2-14.9 10.1 1.3-17.9-18 1.3 10.1-15-16.2-7.8 16.2-7.9L23 226.9l18 1.3-1.3-18 14.9 10.1zm-5.3-103.7 5.3 7.7 5.4-7.7 2 9.1 7.9-5-1.7 9.2 9.3-1.7-5.1 7.9 9.2 2-7.8 5.4 7.8 5.3-9.2 2 5.1 7.9-9.3-1.7 1.7 9.3-7.9-5.1-2 9.2-5.4-7.7-5.3 7.7-2-9.2-7.9 5.1 1.7-9.3-9.3 1.7 5.1-7.9-9.2-2 7.7-5.3-7.7-5.4 9.2-2-5.1-7.9 9.3 1.7-1.7-9.2 7.9 5z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M18.5 108.7s4.8 27.7 44 27.7 44-27.7 44-27.7c0 9.4-6 46.5-44 46.5s-44-38.2-44-46.5z"
  }));
};
var NR = function NR2(_ref180) {
  var title = _ref180.title, rest = _objectWithoutProperties(_ref180, _excluded180);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "44.46 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffc72c",
    d: "M0 155h513v32H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m164.2 189 7.9 27.7 20.7-20-7 27.9 28-7-20.1 20.7 27.8 7.9-27.8 7.9 20.1 20.7-28-7 7 28-20.7-20.1-7.9 27.8-7.9-27.8-20.7 20.1 7-28-27.9 7 20-20.7-27.7-7.9 27.7-7.9-20-20.7 27.9 7-7-27.9 20.7 20z"
  }));
};
var NU = function NU2(_ref181) {
  var title = _ref181.title, rest = _objectWithoutProperties(_ref181, _excluded181);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#fedd00",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })), /* @__PURE__ */ React.createElement("circle", {
    fill: "#012169",
    cx: 126.8,
    cy: 85.7,
    r: 29.9
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m128.3 128.6 3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm-.1-115.4 3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm76.4 58.1 3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7H201zm-151.8.1 3.6 10.9h11.4l-9.3 6.8 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.8-9.3-6.8h11.5zm74-15.6 6.7 20.7h21.8l-17.7 12.8 6.8 20.6-17.6-12.7-17.7 12.7 6.8-20.6-17.6-12.8H120z",
    fill: "#fedd00"
  }));
};
var NZ = function NZ2(_ref182) {
  var title = _ref182.title, rest = _objectWithoutProperties(_ref182, _excluded182);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "114.57 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m448.9 107.7 4.2 13.1h13.8l-11.1 8.1L460 142l-11.1-8.1-11.1 8.1 4.2-13.1-11.1-8.1h13.7zm-64.2 145.9 5.1 15.6h16.4l-13.2 9.7 5 15.6-13.3-9.7-13.2 9.7 5-15.6-13.3-9.7h16.5zm.1-210.2 4.7 14.6h15.3l-12.4 8.9 4.7 14.6-12.3-9-12.4 9 4.7-14.6-12.3-8.9H380zm-64.2 86 4.7 14.5h15.3l-12.3 9 4.7 14.5-12.4-8.9-12.3 8.9 4.7-14.5-12.4-9h15.3z",
    fill: "#D80027",
    stroke: "#FFF",
    strokeWidth: 2,
    strokeMiterlimit: 10
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var OM = function OM2(_ref183) {
  var title = _ref183.title, rest = _objectWithoutProperties(_ref183, _excluded183);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "44.46 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M138 0h377v114H138z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#4A7C3A",
    d: "M138 230h377v114H138z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "none",
    stroke: "#FFF",
    strokeWidth: 10,
    strokeMiterlimit: 2
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M40.3 35.2s37.1 48 50.8 54.5c13.7 6.5 17.1 5.7 17.1 5.7"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M100 35.2S62.9 80.6 53.3 87.6c-9.6 7-18.7 7.8-18.7 7.8m17.1-30.1h37.9M70.7 35.2v30.1"
  })));
};
var PA = function PA2(_ref184) {
  var title = _ref184.title, rest = _objectWithoutProperties(_ref184, _excluded184);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#da121a",
    d: "M256.5 0H513v171H256.5z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#072357",
    d: "M0 171h256.5v171H0zM128 37.9l11.8 36.4h38.3l-31 22.4 11.9 36.4-31-22.5-31 22.5 11.9-36.4-31-22.4h38.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#da121a",
    d: "m384 208.9 11.8 36.4h38.3l-31 22.4 11.9 36.4-31-22.5-31 22.5 11.9-36.4-31-22.4h38.3z"
  }));
};
var PE = function PE2(_ref185) {
  var title = _ref185.title, rest = _objectWithoutProperties(_ref185, _excluded185);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h171v342H0zm342 0h171v342H342z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00A854",
    d: "M224.3 119c4.3 7.6-17.1 71.9-6.5 87.8s21.9 22.4 38.2 22.4c16.3 0 30.7-6.8 39.6-24.7s-14.2-76.3-6.8-85.4c7.4-9.1 29.3 8.5 35.5 35.2 6.2 26.7-8.4 60.2-20.7 70-12.3 9.7-20.3 9.7-47.6 9.7s-32.4-1.4-45-10.7c-12.5-9.4-28.9-35.8-22.7-67.3 6.2-31.7 31.7-44.6 36-37z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D91023",
    stroke: "#E7CA00",
    strokeWidth: 2,
    d: "M272.6 218.9H240c-7.5 0-13.6-6.1-13.6-13.6v-45c0-7.5 6.1-13.6 13.6-13.6h32.6c7.5 0 13.6 6.1 13.6 13.6v45c.1 7.5-6 13.6-13.6 13.6z"
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#E7CA00",
    cx: 256.4,
    cy: 200.9,
    rx: 25,
    ry: 13.2
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M256.4 147.6v35.1h28.9c0-38.3 3.9-35.1-28.9-35.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#007EA8",
    d: "M256.4 147.6v35.1h-28.9c0-37.9-3.7-35.1 28.9-35.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#947245",
    d: "M270.1 158.1h1.6v21.5h-1.6z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#D18219",
    stroke: "#FFF",
    cx: 241.8,
    cy: 165.2,
    r: 8.1
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "none",
    stroke: "#00A854",
    strokeWidth: 6,
    cx: 256.4,
    cy: 122.2,
    rx: 20.5,
    ry: 16.5
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "none",
    stroke: "#E7CA00",
    strokeWidth: 3,
    cx: 256.4,
    cy: 122.2,
    rx: 20.5,
    ry: 16.5
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#E7CA00",
    cx: 270.9,
    cy: 163.1,
    r: 8.9
  }));
};
var PF = function PF2(_ref186) {
  var title = _ref186.title, rest = _objectWithoutProperties(_ref186, _excluded186);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v85H0zm0 257h513v85H0z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1481DB",
    d: "M329.5 171c0 40.3-32.7 73-73 73s-73-32.7-73-73"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFAB50",
    d: "M256.5 98c-40.3 0-73 32.7-73 73h146c0-40.3-32.7-73-73-73z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M181.9 169.3h150.5v4.5H181.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M222.4 162.9h66.5v10.9h-66.5z"
  })), /* @__PURE__ */ React.createElement("path", {
    d: "M212.8 131.1H223s-1.6 55.5.1 57.4c11.9 13.5 25.3 0 25.3 0s-2.7 18.9-17.8 18.9-17.8-18.7-17.8-18.7v-57.6zm85.6 0h-10.2s1.6 55.5-.1 57.4c-11.9 13.5-25.3 0-25.3 0s2.7 18.9 17.8 18.9c15.1 0 17.8-18.7 17.8-18.7v-57.6zM242.6 156l25.9 6.9v-36.4s-14-3.8-14-16.8 14-9.6 14-9.6-25.9-4.6-25.9 8.1V156z",
    fill: "#D80027",
    stroke: "#630810",
    strokeWidth: 2
  }));
};
var PG = function PG2(_ref187) {
  var title = _ref187.title, rest = _objectWithoutProperties(_ref187, _excluded187);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#C8102E",
    d: "M0 0h513v342"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m153.7 225 2.7 8.5h9l-7.2 5.2 2.7 8.6-7.2-5.3-7.3 5.3 2.8-8.6-7.3-5.2h9zm-25.3-120 5.2 16h16.8l-13.6 9.9 5.2 16-13.6-9.9-13.6 9.9 5.2-16-13.6-9.9h16.8zm0 160.3 5.2 16h16.8l-13.6 9.9 5.2 16-13.6-9.9-13.6 9.9 5.2-16-13.6-9.9h16.8zm50.7-96.1 5.2 16h16.8l-13.6 9.9 5.2 16-13.6-9.9-13.6 9.9 5.2-16-13.6-9.9h16.8zm-107.3 4.1 5.2 16h16.8l-13.6 9.9 5.2 15.9-13.6-9.8-13.6 9.8 5.2-15.9-13.6-9.9h16.8z",
    fill: "#FFF"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFCD00"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M288 79.9s33 13.8 30 19.7c-2.9 5.9-17.4-7.1-30-3.5-12.7 3.5-28.6 32.4-28.6 32.4s18.6 2.7 34.2 1.5c15.6-1.2 19.7-7.4 19.7-7.4s.7 15.3 12.7 24.3c18.2 13.6 56.2 22.3 56.2 22.3s.6-6.5-2.7-20.7-8-21.4-8-21.4 55.7 38.3 51.2 59.3-30.1 19.6-30.1 19.6 28.4 12.5 37.4-13.5c12.4-35.6-42.4-65.2-42.4-65.2s6.5 3.1 17.1 4.6 20.3-.3 20.3-.3-13.8-43.6-29.2-52.1c-15.3-8.5-37.1-.9-37.1-.9s9.1-5.9 10-15.9c.9-10-3.5-24.1-3.5-24.1-50.1 21.2-21.2 41.2-33 49.2-2 1.4-9.5-9.9-18.8-8.2-11.5 1.8-25.4.3-25.4.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M404.7 131.8s15.3 17.7 8.2 35.9c-7.1 18.3-37.7 13.5-37.7 13.5s24.7 13.9 40.6-5.3-2.4-43.6-2.4-43.6l-8.7-.5z"
  })));
};
var PH = function PH2(_ref188) {
  var title = _ref188.title, rest = _objectWithoutProperties(_ref188, _excluded188);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0038A8",
    d: "M513 0v171H256.5L0 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#CE1126",
    d: "M513 171v171H0l256.5-171z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FCD116"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "m22.1 33.8 8.5 11.9 13.8-4.5-8.6 11.7 8.5 11.8-13.8-4.6-8.6 11.7V57.2L8.2 52.7 22 48.4zm0 236.4 8.5 11.8 13.8-4.4-8.6 11.7 8.5 11.8-13.8-4.6-8.6 11.7v-14.6l-13.7-4.5 13.8-4.3zM210.5 152l-8.5 11.8-13.8-4.4 8.6 11.7-8.4 11.8 13.7-4.6 8.6 11.7v-14.6l13.7-4.5-13.8-4.3z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 95,
    cy: 171,
    r: 32
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m95 171 11.2 56.5-3.4 3.4-3.7 3.5-4.2 4.2-4.2-4.2-3.7-3.5-3.4-3.4L95 171zm0 0-11.2-56.5 3.4-3.4 3.7-3.5 4.2-4.2 4.2 4.2 3.7 3.5 3.4 3.4L95 171zm0 0 56.5-11.2 3.4 3.4 3.5 3.7 4.2 4.2-4.2 4.2-3.5 3.7-3.4 3.4L95 171zm0 0-56.5 11.2-3.4-3.4-3.5-3.7-4.2-4.2 4.2-4.2 3.5-3.7 3.4-3.4L95 171zm0 0 32-47.9h4.8l5.1.2h5.9v5.9l.2 5.1v4.8L95 171zm0 0-32 47.9h-4.8l-5.1-.2h-5.9v-5.9l-.2-5.1v-4.8L95 171zm0 0 47.9 32v4.8l-.2 5.1v5.9h-5.9l-5.1.2h-4.8L95 171zm0 0-47.9-32v-4.8l.2-5.1v-5.9h5.9l5.1-.2h4.8L95 171z"
  })));
};
var PK = function PK2(_ref189) {
  var title = _ref189.title, rest = _objectWithoutProperties(_ref189, _excluded189);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "240 0 600 600"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h900v600H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#01411C",
    d: "M225 0h675v600H225z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M562.5 120c99.4 0 180 80.6 180 180s-80.6 180-180 180-180-80.6-180-180 80.6-180 180-180z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#01411C",
    d: "M498.9 135.8c68.1-60.5 172.4-54.4 232.9 13.7s54.4 172.4-13.7 232.9-172.4 54.4-232.9-13.7-54.4-172.4 13.7-232.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m628.1 165.3 75.8 85.3-111.5-24.4L697 180.4l-57.7 98.5-11.2-113.6z"
  }));
};
var PL = function PL2(_ref190) {
  var title = _ref190.title, rest = _objectWithoutProperties(_ref190, _excluded190);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#dc143c",
    d: "M0 171h513v171H0z"
  }));
};
var PM = function PM2(_ref191) {
  var title = _ref191.title, rest = _objectWithoutProperties(_ref191, _excluded191);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00318A",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M342 0h171v342H342z"
  }));
};
var PN = function PN2(_ref192) {
  var title = _ref192.title, rest = _objectWithoutProperties(_ref192, _excluded192);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "114.57 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    stroke: "#000"
  }, /* @__PURE__ */ React.createElement("path", {
    fill: "#96877d",
    d: "m400.7 134.5-16.7 5.6-16.7-5.6-5.6-13.9 5.6-13.9h33.4l-5.6 13.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#006ec7",
    d: "M345 134.5v61.2c0 29.8 39 39 39 39s39-9.1 39-39v-61.2h-78z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#337321",
    d: "M348.6 210.2c9.6 18.4 35.4 24.5 35.4 24.5s25.9-6.1 35.4-24.5l-35.4-59-35.4 59z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f7e017",
    d: "m423 195.1-39-60.6-39 60.6v.6c0 5.5 1.3 10.3 3.5 14.5l35.4-55.1 35.4 55.1c2.2-4.2 3.5-9 3.5-14.5v-.6z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#f7e017",
    d: "M375 189.5h18.3l.1 5.5h-5.8v25.2l12.3-6.1 3 5-18.9 9.7-18.4-9.8 2.9-5.1 12.6 6.3V195H375z"
  }));
};
var PR = function PR2(_ref193) {
  var title = _ref193.title, rest = _objectWithoutProperties(_ref193, _excluded193);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5.13 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v68.4H0zm0 136.8h513v68.4H0zm0 136.8h513V342H0z",
    fill: "#E00"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#04F",
    d: "M256.5 171 0 342V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m84 110.1 15.1 46.5H148l-39.6 28.8 15.1 46.5L84 203.1l-39.6 28.8 15.1-46.5L20 156.6h48.9z"
  }));
};
var PS = function PS2(_ref194) {
  var title = _ref194.title, rest = _objectWithoutProperties(_ref194, _excluded194);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5.13 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#007A3D",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#CE1126",
    d: "M256.5 171 0 342V0z"
  }));
};
var PT = function PT2(_ref195) {
  var title = _ref195.title, rest = _objectWithoutProperties(_ref195, _excluded195);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "30.78 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "red",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#060",
    d: "M197 0v342H0V0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FF0",
    cx: 197.1,
    cy: 171,
    r: 64
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "red",
    d: "M161.1 139v40c0 19.9 16.1 36 36 36s36-16.1 36-36v-40h-72z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M197.1 191c-6.6 0-12-5.4-12-12v-16h24v16c0 6.6-5.3 12-12 12z"
  }));
};
var PW = function PW2(_ref196) {
  var title = _ref196.title, rest = _objectWithoutProperties(_ref196, _excluded196);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "49.59 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#09f",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#ff0",
    cx: 220,
    cy: 171,
    r: 74
  }));
};
var PY = function PY2(_ref197) {
  var title = _ref197.title, rest = _objectWithoutProperties(_ref197, _excluded197);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D52B1E",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0038A8",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#009B3A",
    d: "m279.7 148-8.7 8.7c3.7 3.7 6 8.8 6 14.5 0 11.3-9.2 20.5-20.5 20.5s-20.5-9.2-20.5-20.5c0-5.7 2.3-10.8 6-14.5l-8.7-8.7c-5.9 5.9-9.6 14.1-9.6 23.2 0 18.1 14.7 32.8 32.8 32.8s32.8-14.7 32.8-32.8c0-9.1-3.7-17.3-9.6-23.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FEDF00",
    stroke: "#000",
    d: "m256.5 157.2 3.2 9.9h10.5l-8.5 6.2 3.2 9.9-8.4-6.2-8.4 6.2 3.2-9.9-8.5-6.2h10.5z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 2,
    cx: 256.5,
    cy: 171,
    r: 45
  }));
};
var QA = function QA2(_ref198) {
  var title = _ref198.title, rest = _objectWithoutProperties(_ref198, _excluded198);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#8a1538",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0v342h150.3l37.7-19.6-37.7-18.9 37.7-19-37.7-18.9 37.7-19-37.7-19 37.7-18.9-37.7-19 37.7-19-37.7-18.9 37.7-19-37.7-18.9 37.7-19-37.7-19L188 57l-37.7-19L188 19.1 150.3 0z"
  }));
};
var RE = function RE2(_ref199) {
  var title = _ref199.title, rest = _objectWithoutProperties(_ref199, _excluded199);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00318A",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M342 0h171v342H342z"
  }));
};
var RO = function RO2(_ref200) {
  var title = _ref200.title, rest = _objectWithoutProperties(_ref200, _excluded200);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#002b7f",
    d: "M0 0h171v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fcd116",
    d: "M171 0h171v342H171z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ce1126",
    d: "M342 0h171v342H342z"
  }));
};
var RS = function RS2(_ref201) {
  var title = _ref201.title, rest = _objectWithoutProperties(_ref201, _excluded201);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "61.56 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#c6363c",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0c4076",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#c6363c",
    d: "M120 96.8v85.1c0 48.4 63.3 63.3 63.3 63.3s63.3-14.8 63.3-63.3V96.8H120z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M146.1 111.6h74.2V82l-14.8 7.4-22.3-22.3L161 89.4 146.1 82zm85.6 82.2-48.3-48.2-48.2 48.2 15.7 15.7 32.5-32.5 32.5 32.5z",
    fill: "#edb92e"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M231.7 148.7h-22.5c1.3-2.2 2-4.7 2-7.4 0-8.2-6.6-14.8-14.8-14.8-5.7 0-10.6 3.2-13.1 7.8-2.5-4.7-7.4-7.8-13.1-7.8-8.2 0-14.8 6.6-14.8 14.8 0 2.7.7 5.2 2 7.4h-22.1c0 8.2 7.1 14.8 15.3 14.8h-.6c0 8.2 6.6 14.8 14.8 14.8 0 7.3 5.2 13.3 12.1 14.6l-11.7 26.4c5.6 2.3 11.7 3.5 18.1 3.5s12.5-1.3 18.1-3.5L189.9 193c6.9-1.3 12.1-7.3 12.1-14.6 8.2 0 14.8-6.6 14.8-14.8h-.5c8.2 0 15.4-6.7 15.4-14.9z"
  }));
};
var RU = function RU2(_ref202) {
  var title = _ref202.title, rest = _objectWithoutProperties(_ref202, _excluded202);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0039a6",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#d52b1e",
    d: "M0 228h513v114H0z"
  }));
};
var RW = function RW2(_ref203) {
  var title = _ref203.title, rest = _objectWithoutProperties(_ref203, _excluded203);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#00A5E0",
    d: "M0 0h513v171H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F9D202",
    d: "M0 171h513v85.5H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1E5F3D",
    d: "M0 256.5h513V342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F9D202",
    d: "m420.6 36.1 2.3 35.9 11.6-34.1-7 35.3 19.9-29.9-15.8 32.2 27-23.7-23.7 27L467.1 63l-29.9 19.9 35.3-7-34.1 11.6 35.9 2.3-35.9 2.3 34.1 11.6-35.3-7 29.9 19.9-32.2-15.8 23.7 27-27-23.7 15.8 32.2-19.9-29.9 7 35.3-11.6-34.1-2.3 35.9-2.3-35.9-11.6 34.1 7-35.3-19.9 29.9 15.8-32.2-27 23.7 23.7-27-32.2 15.8L404 96.7l-35.3 7 34.1-11.6-35.9-2.3 35.9-2.3-34.1-11.6 35.3 7L374.1 63l32.2 15.8-23.7-27 27 23.7-15.8-32.2 19.9 29.9-7-35.3L418.3 72z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#F9D202",
    stroke: "#00A5E0",
    strokeWidth: 2,
    cx: 420.6,
    cy: 89.8,
    r: 15.9
  }));
};
var SA = function SA2(_ref204) {
  var title = _ref204.title, rest = _objectWithoutProperties(_ref204, _excluded204);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v342H0z",
    fill: "#fff"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#00512e"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M0 0v342h513V0zm218 76q1 2-2 5-3 2-1 4 3 4 0 6-2 1-5-1-6-6 0-14 6-4 8 0m-102 2 1 6q0 4-2 4-5 1-5-6l2-4zm39 1 1 2q-1 4-5 4-5 0-6-4c0-4 7-6 10-2m47 2q3 4 2 9c-1 2-22 19-24 19q-3 0-4-4l6-6 6-5v-3c-5-10 7-18 14-10m35-3q3 1 0 7-2 8-6 6c-3-1-3 14 0 19q2 4 7-1c2-3 2-5 2-15 0-12 0-13 2-13q5-2 5 13 1 11 3 13 3 6 6 3 3-2-1-12-3-12 1-16h9q2-2 9 1l6 2 1-2q4-4 6-1l3 17c3 16 3 16 7 24l15 30q1 6-4 5l-8-14-6-12 1 20c1 21 1 23-4 23q-4 2-4-15l-1-27-1-16-9-13c-8-12-8-13-11-13q-6-1-2 6l2 7q0 4 3 2 6-2 6 3-1 4-8 5l-5 2-5 2q-6 0-10-3-2-3-5 1-5 5-12 2-5-1-7-10l-1-3-1 3q-3 7-9 8-7 0-9-11-3-10 2-10 4-1 5 7l2 6q1 0 4-7 6-17 13-12h1c-1-1 2-10 4-11zm-97 10 2 16 1 9h4q5 2 6-1c2-1 2-2-1-11l-3-12 3-1 11 5V82q4-2 6 1l3 23 1 20h2q5 0 5 5 1 6 3 0 3-9 8-2 1 3 2 0 3-7 4-6c5 0 6 7 1 13q-3 3-7 3l-6 1q-5 4-10 0l-2-2v5c0 21-16 42-33 42q-21-1-23-21 0-5 2-6 4-1 6 6 1 12 12 13 14 2 24-15 6-11 1-5-12 18-28 11-7-5-9-17-2-6 1-7 5-3 6 6 1 12 10 12 7 0 13-8 5-8-1-7-11-1-8-12 8-11 17-5l3 2-1-12-4-22q-3 1 0 7c2 6 2 6 0 10l-5 5q-3 3-7 1h-5l-1 16c-1 19-1 20-4 21-4 1-4-2-4-19l1-15-3 1q-3 1-6-2c-2-2-2-2-3-14l-1-12q-2-1-2 10l-1 13q-3 6-8 4c-3-2-4-4-7-15q-4-15 2-14 4-1 5 8l1 5 1-6q0-13 9-12l6 2c2 3 2 4 2 14l1 11 2-1 1-8-2-16q-3-12 2-11 3-1 5 7m163-3q4 10 1 13-4 3-7-7-3-11 2-10zm12-3 3 7q2 6 1 8v16l2 27c2 22 2 21 6 21h3l-1-5-2-23-3-33c-2-16-1-19 3-19 3 0 8 14 6 16v24c5 47 5 48 0 47q-3-2-1 4l2 6q2 1 5-9 7-18 10-16 3 0 7 5 4 7 7 7 4-1 1-33l-1-21-10-12-9-15q0-5 8-1 5 2 6 6l2 6q3 4 1-4 0-10 3-10c4 0 9 10 7 13l-1 8q1 8 4 12l3 3-2-15c-2-16-2-19 1-20q3 0 5 4l4 5h2q6-4 8 9 0 8-4 8-3 0-4-6 1-8-3-5c-1 2-1 3 1 19l2 17 5 7c6 10 12 21 11 22q-2 3-5 2l-5-8-5-8 1 8c0 11 0 11-3 11q-5 3-5-7l-1-16c0-8-1-10-4-15l-4-5v19c1 21 0 25-5 28q-6 5-13-3l-4-5-4 9q-6 14-11 15-9-1-11-16-1-8-5-1c-3 5-12 13-19 17q-8 4-8-2-1-2 6-6c9-5 17-14 17-18l-5-78q2-4 5-1m89 5 4 6q1 1-2 3l-2 2 4 24q4 25 4 35c0 10 0 11-3 17q-7 13-19 14-8 0-7-2-2-4 7-6 15-2 14-23a708 708 0 0 0-8-75c3-2 3-1 8 5m-211 19 1 4q0 3 2 2 5 0 5 4c0 4-9 6-13 2-4-5 0-17 5-12m108 1h2l4-1q4 2 0 7-7 6-11-1v-5q3-2 5 0m55 2q3 4-1 6-2 0-1 5t-1 6q-1 2-10-6-8-7-6-9 3-4 7 0l2 2 2-3q5-3 8-1m-131 13c3 2 6 14 6 17q-1 6 6 1l10-4q5-1 7-4 4-9 10-12 10 0 11 9 0 7-16 13l-2 1 13 1c16 0 16 0 13 9q-2 7-4 7l-10 2q-19 3-17 9 1 2 4 3 6 3 3 7l-7 1q-13-2-21-10l-3-3-2 3q-7 10-19 13-10 2-15-10l-5 2q-18 10-19 8l-2-3c0-2 1-2 15-11l9-6q1-3 5-4c3 1 10-5 12-9q3-6-1-15l-2-8q1-5 6-6c3 0 8 5 8 7q-1 4-4 3v1l1 10c1 9-1 13-10 21l-7 6 2 3q5 9 15-2 10-8 10-23 0-10-6-24v-4q3-4 6 1m17 2q2 3 4 0 11-3 5 5c-4 5-12 5-15-1v-4zm118 5 1 2q1 2-7 8c-8 6-9 7-11 5q-5-4 6-10c8-6 8-6 11-5m-229 3q3 2-10 10-12 8-13 3-5-3 9-10 13-8 14-3m229 10c3 2 4 9 3 11q-3 3-6 1c-2-2-3-11-1-13q1-2 4 1m-172 7q3 3 2 7 1 5-3 5-3 1-3-3l-2-4q-3-3-1-6 4-2 7 1m-79 9 1 8q0 9 3 6 4-1 4 3-1 7-7 7-7-1-7-14-1-9 2-10zm168 12q0 4 3 2t4 3q-2 6-8 8l-4-2q-3-3-4-2-4 0-5-4l5-6q7-6 7-4 3 1 2 5m102 3q4 4 1 9-7 7-7-4t6-5m-42 73c0 2 1 2 12 2q24-1 22 11 0 7-6 10c-4 1-31 2-34 0q-2-1-2-6v-4h-82l-74-1c-16 0-28-10-28-10h92c91 0 92-1 92-2q-1-3 4-5c5-2 4 4 4 5"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m195 86 1 1 1-1-1-1q-2 0-1 1m84 5q-2 2 1 5l3 3-1-4-1-5zm-125 45q-3 3-1 4 5-1 6-4zm110-7q-4 5 0 3 6-4 2-4zm-31 30q0 6 4 8l5 4q3 2 2-3 0-3 4-7 4-3 2-4l-13-3h-5zm104 101q-1 3 13 2c11 0 13 0 14-2l-13-1z"
  })));
};
var SB = function SB2(_ref205) {
  var title = _ref205.title, rest = _objectWithoutProperties(_ref205, _excluded205);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "27.36 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#205831",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#004EB4",
    d: "M0 342V0h513"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F4CA15",
    d: "M0 328v14h28L513 14V0h-28z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M47.2 11.5 54 32.6h22.3l-18 13.2 6.9 21.1-18-13.1-18 13.1L36 45.8 18 32.6h22.3zm113.6 0 6.9 21.1H190l-18 13.2 6.8 21.1-18-13.1-18 13.1 6.9-21.1-18-13.2H154zM47.2 122.3l6.8 21.1h22.3l-18 13.2 6.9 21.1-18-13-18 13 6.8-21.1-18-13.2h22.3zm113.6 0 6.9 21.1H190l-18 13.2 6.8 21.1-18-13-18 13 6.9-21.1-18-13.2H154zM104 66.9l6.8 21.2h22.3l-18 13 6.9 21.2-18-13.1-18 13.1 6.8-21.2-18-13h22.3z",
    fill: "#FFF"
  }));
};
var SC = function SC2(_ref206) {
  var title = _ref206.title, rest = _objectWithoutProperties(_ref206, _excluded206);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "87.21 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F6CA3F",
    d: "M185.9 0 0 342 368.2 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#007631",
    d: "M513 224.5 0 342h513z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#CB262E",
    d: "M513 0H358.2L0 342l513-224.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#002E69",
    d: "M0 0v342L185.9 0z"
  }));
};
var SD = function SD2(_ref207) {
  var title = _ref207.title, rest = _objectWithoutProperties(_ref207, _excluded207);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.42 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#cb0f32",
    d: "M0 0h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 114h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 228h513v114H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#006e28",
    d: "m0 0 200 171L0 342z"
  }));
};
var SE = function SE2(_ref208) {
  var title = _ref208.title, rest = _objectWithoutProperties(_ref208, _excluded208);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "30.78 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#004F8E",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F6C500",
    d: "M192.4.3h-64.2v138.8H0v64.1h128.2V342h64.2V203.2H513v-64.1H192.4z"
  }));
};
var SG = function SG2(_ref209) {
  var title = _ref209.title, rest = _objectWithoutProperties(_ref209, _excluded209);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 600 600"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h900v600H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ED2939",
    d: "M0 0h900v300H0V0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M129.7 150c0-48.8 29-90.9 70.6-109.9-3.4-.3-6.8-.5-10.2-.5-61 0-110.4 49.4-110.4 110.4s49.4 110.4 110.4 110.4c3.4 0 6.9-.2 10.2-.5-41.7-19-70.6-61.1-70.6-109.9zm131.2-59.9 16.9-12.3H257l-6.5-19.9-6.5 19.9h-20.8l16.9 12.3-6.5 19.8 16.9-12.3 16.9 12.3zm37.3 114.5 16.9-12.2h-20.9l-6.5-19.9-6.4 19.9h-20.9l16.9 12.2-6.5 19.9 16.9-12.3 16.9 12.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m200.7 133.8 16.9-12.3h-20.9l-6.4-19.8-6.5 19.8h-20.9l16.9 12.3-6.4 19.9 16.9-12.3 16.9 12.3zm137.4-12.3h-20.9l-6.5-19.8-6.4 19.8h-20.9l16.9 12.3-6.5 19.9 16.9-12.3 16.9 12.3-6.4-19.9zm-114.4 83.1 16.9-12.2h-20.9l-6.4-19.9-6.5 19.9h-20.9l16.9 12.2-6.4 19.9 16.9-12.3 16.9 12.3z"
  })));
};
var SH = function SH2(_ref210) {
  var title = _ref210.title, rest = _objectWithoutProperties(_ref210, _excluded210);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "112.86 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#5f7dbd",
    d: "M449 139.7c-.1 44.4-7.2 92.1-65 114.9-57.8-22.8-64.9-70.5-65-114.9h130z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#f2d049",
    d: "M449 139.7c0-16.7-.9-32.9-.5-47.1C426.9 83 398.4 81 383.9 81s-42.9 2-64.6 11.6c.4 14.2-.5 30.4-.5 47.1H449z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#b38c79",
    d: "m369.5 204.5.3 10.3-12.8.2 4.9 13.2h-17.3c-18-20.2-23.4-42.4-24.9-68.1l9.1-9.7 8.3 14.3 10.8-12.8 7 7.8.8 15.7 13.8 29.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#5c5568",
    d: "m436.6 192.5-8.6 18.3h-47l-29.2-19.5 25.7 10.5h25.1l3.7-6.5 7.2.2 2-3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var SI = function SI2(_ref211) {
  var title = _ref211.title, rest = _objectWithoutProperties(_ref211, _excluded211);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "40 0 160 160"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF0D0B",
    d: "M0 0h240v160H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0E55BD",
    d: "M0 0h240v106.7H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h240v53.3H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0E55BD",
    d: "M99.5 30.8c-12.4-5.5-26.4-5.5-38.8 0-2.2 28.7 4.4 44.8 19.3 48.7 14.9-3.9 21.5-20 19.5-48.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m82 37.1-1.5.1-.5-1.3-.5 1.3-1.5-.1.8 1.2-.8 1.2 1.5-.2.5 1.2.5-1.2 1.5.2-.8-1.2zm-5.5-7.4-1.4.2-.6-1.4-.6 1.4-1.4-.2.8 1.2-.8 1.2 1.4-.1.6 1.3.6-1.3 1.4.1-.8-1.2zm11 0-1.4.2-.6-1.4-.6 1.4-1.4-.2.8 1.2-.8 1.2 1.4-.1.6 1.3.6-1.3 1.4.1-.8-1.2z",
    fill: "#FF0"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m87.9 48.7-3.1 4.1-4.7-9.3-4.7 9.3-3.1-4.1-7.9 10.4c0 .5.1.9.3 1.5 2.1 7.6 8 13.7 15.5 16.3 7.5-2.5 13.3-8.7 15.5-16.3.1-.4.3-.9.3-1.5l-8.1-10.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0E55BD",
    d: "M64.5 60.5c.8 2.8 3.7 4.4 6.4 3.6.4-.1.8-.3 1.2-.5 1.6-.9 3.6-.9 5.2 0s3.6.9 5.2 0 3.6-.9 5.2 0c2.5 1.5 5.7.5 7.1-1.9.3-.4.4-.8.5-1.2l.3.1v3.9c-.9 0-1.9.3-2.7.7-1.6.9-3.6.9-5.2 0s-3.6-.9-5.2 0-3.6.9-5.2 0-3.6-.9-5.2 0-3.6.9-5.2 0c-.8-.4-1.7-.7-2.7-.7v-3.9"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0E55BD",
    d: "M64.5 63.6c.8 2.8 3.7 4.4 6.4 3.6.4-.1.8-.3 1.2-.5 1.6-.9 3.6-.9 5.2 0s3.6.9 5.2 0 3.6-.9 5.2 0c2.5 1.5 5.7.5 7.1-1.9.3-.4.4-.8.5-1.2l.3.1v3.9c-.9 0-1.9.3-2.7.7-1.6.9-3.6.9-5.2 0s-3.6-.9-5.2 0-3.6.9-5.2 0-3.6-.9-5.2 0-3.6.9-5.2 0c-.8-.4-1.7-.7-2.7-.7v-3.9"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF0D0B",
    d: "m99.5 30.8-1.6 24.8c-.7 10.5-7.8 19.7-17.9 22.9-10.1-3.2-17.2-12.3-17.9-22.9l-1.6-24.8c-.5.3-.9.4-1.5.7l1.5 24.1C61.3 66.9 69.1 76.7 80 80c10.9-3.3 18.7-13.1 19.3-24.4l1.5-24.1c-.4-.3-.9-.6-1.3-.7z"
  }));
};
var SJ = function SJ2(_ref212) {
  var title = _ref212.title, rest = _objectWithoutProperties(_ref212, _excluded212);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "41.04 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#ba0c2f",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M513 211H202.6v131h-79.9V211H0v-80h122.7V0h79.9v131H513v61.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00205b",
    d: "M513 149.6v42.8H184V342h-42.7V192.4H0v-42.8h141.3V0H184v149.6z"
  }));
};
var SK = function SK2(_ref213) {
  var title = _ref213.title, rest = _objectWithoutProperties(_ref213, _excluded213);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "66.56 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 196.641h512v118.717H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 315.359h512v111.304H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M129.468 181.799v85.136c0 48.429 63.267 63.267 63.267 63.267S256 315.362 256 266.935v-85.136H129.468z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M146.126 184.294v81.941c0 5.472 1.215 10.64 3.623 15.485h85.97c2.408-4.844 3.623-10.012 3.623-15.485v-81.941h-93.216z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M221.301 241.427h-21.425v-14.283h14.284v-14.283h-14.284v-14.284h-14.283v14.284h-14.282v14.283h14.282v14.283h-21.426v14.284h21.426v14.283h14.283v-14.283h21.425z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M169.232 301.658c9.204 5.783 18.66 9.143 23.502 10.636 4.842-1.494 14.298-4.852 23.502-10.636 9.282-5.833 15.79-12.506 19.484-19.939a24.878 24.878 0 0 0-14.418-4.583c-1.956 0-3.856.232-5.682.657-3.871-8.796-12.658-14.94-22.884-14.94-10.227 0-19.013 6.144-22.884 14.94a25.048 25.048 0 0 0-5.682-.657 24.88 24.88 0 0 0-14.418 4.583c3.691 7.433 10.198 14.106 19.48 19.939z"
  }));
};
var SL = function SL2(_ref214) {
  var title = _ref214.title, rest = _objectWithoutProperties(_ref214, _excluded214);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 85.337h512v113.775H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 312.888h512v113.775H0z"
  }));
};
var SM = function SM2(_ref215) {
  var title = _ref215.title, rest = _objectWithoutProperties(_ref215, _excluded215);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 85.34h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M512 85.334v166.69L0 256.175V85.334z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M323.744 203.099 256 270.843l-67.744-67.744a81.156 81.156 0 0 0-13.879 45.483v22.261c0 35.744 23.097 66.193 55.148 77.213-4.277 8.385-3.556 18.848 2.712 26.671l24.258-19.439 24.258 19.439c6.342-7.915 7.011-18.534 2.564-26.968 31.614-11.261 54.308-41.485 54.308-76.916v-22.261a81.174 81.174 0 0 0-13.881-45.483z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M256 330.206c-32.732 0-59.362-26.63-59.362-59.362v-22.261c0-32.733 26.63-59.363 59.362-59.363s59.362 26.63 59.362 59.362v22.261c0 32.733-26.63 59.363-59.362 59.363z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M293.101 270.843v-22.261c0-20.458-16.643-37.101-37.101-37.101s-37.101 16.643-37.101 37.101v22.261L256 278.264l37.101-7.421z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M218.899 270.843c0 20.458 16.643 37.101 37.101 37.101s37.101-16.643 37.101-37.101h-74.202z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M300.522 189.22c0-12.295-9.966-22.261-22.261-22.261a22.173 22.173 0 0 0-14.84 5.672v-13.093h7.421v-14.84h-7.421v-7.421h-14.84v7.421h-7.421v14.84h7.421v13.093a22.177 22.177 0 0 0-14.841-5.672c-12.295 0-22.261 9.966-22.261 22.261 0 6.591 2.867 12.512 7.421 16.589v13.093h74.203v-13.093c4.552-4.077 7.419-9.997 7.419-16.589z"
  }));
};
var SN = function SN2(_ref216) {
  var title = _ref216.title, rest = _objectWithoutProperties(_ref216, _excluded216);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 85.331h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M330.207 85.331H512v341.337H330.207z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 85.331h181.793v341.337H0zm255.999 111.301 14.733 45.347h47.685l-38.576 28.029 14.734 45.348-38.576-28.026-38.577 28.026 14.737-45.348-38.576-28.029h47.681z",
    fill: "#496E2D"
  }));
};
var SO = function SO2(_ref217) {
  var title = _ref217.title, rest = _objectWithoutProperties(_ref217, _excluded217);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 85.331h512v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m256 157.273 22.663 69.748H352l-59.332 43.106 22.664 69.749L256 296.769l-59.332 43.107 22.664-69.749L160 227.021h73.337z"
  }));
};
var SR = function SR2(_ref218) {
  var title = _ref218.title, rest = _objectWithoutProperties(_ref218, _excluded218);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.331h512v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A2001D",
    d: "M0 196.636h512v118.728H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 352.462h512v74.207H0zM0 85.331h512v74.207H0z",
    fill: "#6DA544"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m256.742 218.003 9.43 29.021h30.518L272 264.963l9.431 29.023-24.689-17.937-24.689 17.937 9.431-29.023-24.69-17.939h30.518z"
  }));
};
var SS = function SS2(_ref219) {
  var title = _ref219.title, rest = _objectWithoutProperties(_ref219, _excluded219);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5.12 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#496E2D",
    d: "M0 322.783h512v103.88H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 85.337h512v104.515H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#A2001D",
    d: "M0 210.877h512v89.656H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M256 256.006 0 426.668V85.331z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m73.178 209.188 20.831 29.067 34.084-10.83-21.207 28.795 20.83 29.069-33.939-11.271-21.208 28.794.234-35.762-33.94-11.273 34.083-10.83z"
  }));
};
var ST = function ST2(_ref220) {
  var title = _ref220.title, rest = _objectWithoutProperties(_ref220, _excluded220);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 85.337h512v113.775H0zm0 227.551h512v113.775H0z",
    fill: "#6DA544"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M256 256.006 0 426.668V85.331z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m302.049 226.318 7.368 22.674h23.842l-19.288 14.016 7.366 22.674-19.288-14.015-19.287 14.015 7.366-22.674-19.288-14.016h23.842zm74.203 0 7.367 22.674h23.842l-19.288 14.016 7.367 22.674-19.288-14.015-19.288 14.015 7.367-22.674-19.288-14.016h23.842z"
  }));
};
var SV = function SV2(_ref221) {
  var title = _ref221.title, rest = _objectWithoutProperties(_ref221, _excluded221);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 85.337h512v113.775H0zm0 227.551h512v113.775H0z",
    fill: "#0052B4"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M228.582 261.936 256 214.447l27.418 47.489z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M291.616 277.616 256 295.425l-35.616-17.809v-23.744h71.232z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m289.579 216.485-12.592 12.592c5.37 5.372 8.693 12.791 8.693 20.988 0 16.392-13.289 29.68-29.68 29.68-16.392 0-29.68-13.289-29.68-29.68 0-8.195 3.322-15.616 8.693-20.988l-12.592-12.592c-8.594 8.594-13.91 20.466-13.91 33.579 0 26.228 21.261 47.489 47.489 47.489s47.489-21.261 47.489-47.489c0-13.114-5.316-24.987-13.91-33.579z"
  }));
};
var SX = function SX2(_ref222) {
  var title = _ref222.title, rest = _objectWithoutProperties(_ref222, _excluded222);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.413 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M512 85.331v166.69L0 256.173V85.331z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M256 256.006 0 426.668V85.331z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFDA44"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M59.621 256a59.546 59.546 0 0 0-.193 4.57c0 32.821 26.607 59.429 59.429 59.429s59.429-26.607 59.429-59.429c0-1.539-.078-3.061-.193-4.57H59.621z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 118.862,
    cy: 210.287,
    r: 18.286
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M77.715 205.714v59.429c0 31.494 41.144 41.143 41.144 41.143s41.144-9.649 41.144-41.143v-59.429H77.715z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M118.877 287.148c-7.632-2.746-22.876-9.767-22.876-22.006v-41.144h45.715v41.144c-.001 12.28-15.244 19.283-22.839 22.006z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#F3F3F3",
    d: "M128.001 246.856v-9.142l-9.144-4.571-9.142 4.571v9.142l-4.571 4.573v18.285h27.428v-18.285z"
  }));
};
var SY = function SY2(_ref223) {
  var title = _ref223.title, rest = _objectWithoutProperties(_ref223, _excluded223);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "150 0 600 600"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h900v600H0z",
    fill: "#0f0f0f"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h900v400H0z",
    fill: "#fff"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h900v200H0z",
    fill: "#047a3f"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m176.26 375 48.738-150 48.738 150-127.6-92.705h157.72M626.256 375l48.738-150 48.738 150-127.6-92.705h157.72M401.252 375l48.738-150 48.738 150-127.6-92.705h157.72",
    fill: "#ce1126"
  }));
};
var SZ = function SZ2(_ref224) {
  var title = _ref224.title, rest = _objectWithoutProperties(_ref224, _excluded224);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "150 0 600 600"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#2B5DEA",
    d: "M0 0h900v600H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDF29",
    d: "M0 100h900v400H0V100z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D70000",
    d: "M0 150h900v300H0V150z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M450 171.4v257.2c114.3 0 171.4-85.7 214.3-128.6-42.9-42.9-100-128.6-214.3-128.6z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M450 171.4c-100 0-171.4 85.7-214.3 128.6C278.6 342.9 350 428.6 450 428.6V171.4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M346.3 254.3h21v91.3h-21zm51.9 0h21v91.3h-21z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M477.8 254.3h21v91.3h-21zm51.9 0h21v91.3h-21z"
  }));
};
var TA = function TA2(_ref225) {
  var title = _ref225.title, rest = _objectWithoutProperties(_ref225, _excluded225);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "100.89 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#1799f8",
    d: "M448.9 169.5c0 9.6-.3 29.6-1.4 39.2-4.1 34.9-23.5 68.8-62.1 85.9-45.3-17.9-60.8-51-64.9-85.9-1.1-9.6-1.5-19.4-1.5-29l.3-47.1h129.2l.4 36.9z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M447.5 208.7c-.2 1.6-.4 3.3-.6 4.9-4.8 33.1-22.9 65.4-61.5 81-43.2-17-59.4-47.9-64.2-81-.2-1.6-.4-3.2-.6-4.9"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1799f8",
    d: "m385.4 251.7-22.9-43h45.8z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m385.4 165.8-22.9 42.9h45.8z"
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#dcb072",
    cx: 474.8,
    cy: 236.8,
    rx: 16.8,
    ry: 43.3
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#dcb072",
    cx: 295.3,
    cy: 236.8,
    rx: 16.8,
    ry: 43.3
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m385.4 31.5-33.4 44h68.5zM315.5 280s33.8 29.5 69.9 29.5 67.1-29.5 67.1-29.5l8.5 14.6S439.2 326 385.4 326 307 294.6 307 294.6l8.5-14.6z"
  }), /* @__PURE__ */ React.createElement("ellipse", {
    fill: "#A5A5A5",
    cx: 386.3,
    cy: 104.3,
    rx: 34.3,
    ry: 23.3
  }));
};
var TC = function TC2(_ref226) {
  var title = _ref226.title, rest = _objectWithoutProperties(_ref226, _excluded226);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "114.57 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    stroke: "#fff",
    strokeWidth: 4,
    d: "M332.1 106.7v78.2c0 38.1 51.9 49.8 51.9 49.8s51.9-11.7 51.9-49.8v-78.2H332.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#fcad56",
    d: "M376.6 135.1c0 7.9-6.6 28.4-14.8 28.4S347 142.9 347 135.1c0-7.9 14.8-14.2 14.8-14.2s14.8 6.4 14.8 14.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#9e540a",
    d: "M416 150.6c2.4-5.6 4.3-13.8 4.3-17.9 0-6.5-8.9-11.9-8.9-11.9s-8.9 5.3-8.9 11.9c0 4.1 1.9 12.3 4.3 17.9l-5.1 11.1c3 1.2 6.3 1.8 9.8 1.8 3.5 0 6.8-.7 9.8-1.8l-5.3-11.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#009e49",
    d: "M372.9 184.9s-7.4 14.2-7.4 28.4h37.1c0-14.2-7.4-28.4-7.4-28.4l-11.1-7.1-11.2 7.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ce1126",
    d: "M395.1 184.9v-3.6c0-5.9-5-10.7-11.1-10.7s-11.1 4.8-11.1 10.7v3.6h22.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var TD = function TD2(_ref227) {
  var title = _ref227.title, rest = _objectWithoutProperties(_ref227, _excluded227);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 85.331h512v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 85.331h170.663v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M341.337 85.331H512v341.337H341.337z"
  }));
};
var TF = function TF2(_ref228) {
  var title = _ref228.title, rest = _objectWithoutProperties(_ref228, _excluded228);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.75 0 15 15"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h21v15H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0A388A",
    d: "M0 0h22.5v15H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h11.3v7.5H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M7.1 0h3.6v7H7.1V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0A388A",
    d: "M0 0h3.6v7H0V0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M3.6 0h3.6v7H3.6V0zm10.9 6h5L19 7h-1.5v.5h1l-.5 1h-.5V10h-1V7H15l-.5-1zm4 2.5 1 1.5h-2l1-1.5zm-3 0 1 1.5h-2l1-1.5zm1.5 3L16 10h2l-1 1.5zM20 8c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm-6 0c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm1 4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm4 0c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm-2 1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z"
  }));
};
var TG = function TG2(_ref229) {
  var title = _ref229.title, rest = _objectWithoutProperties(_ref229, _excluded229);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 85.337h512V153.6H0zM0 358.4h512v68.263H0zm0-136.537h512v68.263H0z",
    fill: "#496E2D"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.337h204.054v204.054H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m102.026 133.938 13.26 40.812h42.916l-34.718 25.226 13.26 40.814-34.718-25.224-34.719 25.224 13.263-40.814-34.718-25.226h42.913z"
  }));
};
var TH = function TH2(_ref230) {
  var title = _ref230.title, rest = _objectWithoutProperties(_ref230, _excluded230);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.334h512V426.66H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 194.056h512v123.882H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 85.334h512v54.522H0zm0 286.809h512v54.522H0z",
    fill: "#D80027"
  }));
};
var TJ = function TJ2(_ref231) {
  var title = _ref231.title, rest = _objectWithoutProperties(_ref231, _excluded231);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.337h512v113.775H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 312.888h512v113.775H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M226.318 300.522h59.364v-25.23l-11.873 5.937L256 263.421l-17.809 17.808-11.873-5.937zm-33.963-29.682 2.763 8.504h8.94l-7.233 5.255 2.763 8.502-7.233-5.255-7.234 5.255 2.763-8.502-7.233-5.255h8.94zm8.566-29.68 2.763 8.502h8.94l-7.233 5.255 2.763 8.504-7.233-5.256-7.234 5.256 2.763-8.504-7.233-5.255h8.94zm24.488-22.261 2.763 8.502h8.94l-7.233 5.255 2.763 8.504-7.233-5.256-7.234 5.256 2.763-8.504-7.233-5.255h8.94zm94.236 51.941-2.763 8.504h-8.94l7.233 5.255-2.763 8.502 7.233-5.255 7.234 5.255-2.763-8.502 7.233-5.255h-8.94zm-8.566-29.68-2.763 8.502h-8.94l7.233 5.255-2.763 8.504 7.233-5.256 7.234 5.256-2.763-8.504 7.233-5.255h-8.94zm-24.488-22.261-2.763 8.502h-8.94l7.233 5.255-2.763 8.504 7.233-5.256 7.234 5.256-2.763-8.504 7.233-5.255h-8.94zM256 207.767l2.763 8.503h8.941l-7.234 5.256 2.763 8.502-7.233-5.254-7.233 5.254 2.763-8.502-7.234-5.256h8.941z",
    fill: "#FFDA44"
  }));
};
var TK = function TK2(_ref232) {
  var title = _ref232.title, rest = _objectWithoutProperties(_ref232, _excluded232);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "18.773 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m210.715 174.377 3.684 11.338h11.919l-9.643 7.006 3.684 11.337-9.644-7.007-9.644 7.007 3.684-11.337-9.645-7.006h11.921zm-93.899 107.594 4.605 14.172h14.9l-12.055 8.757 4.606 14.173-12.056-8.76-12.055 8.76 4.604-14.173-12.054-8.757h14.899zm27.88-162.292 4.604 14.172h14.901l-12.056 8.758 4.606 14.171-12.055-8.759-12.056 8.759 4.606-14.171-12.055-8.758h14.9zm-75.157 55.652 4.604 14.172h14.9l-12.055 8.758 4.606 14.171-12.055-8.758-12.056 8.758 4.606-14.171-12.055-8.758h14.9z",
    fill: "#FFF"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M483.386 354.503H117.801s109.234-88.562 310.593-220.938c.001 0-88.443 128.935 54.992 220.938zm-365.585 11.586c-11.177 0-11.195 17.37 0 17.37h365.585c11.177 0 11.195-17.37 0-17.37H117.801z",
    fill: "#FFDA44"
  }));
};
var TL = function TL2(_ref233) {
  var title = _ref233.title, rest = _objectWithoutProperties(_ref233, _excluded233);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M256 256 0 90.691v44.242L155.826 256 0 377.067v44.242z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 90.691v330.618L189.217 256z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m44.184 213.36 24.912 23.577 30.121-16.41-14.723 30.98 24.911 23.575-34.012-4.43L60.67 301.63l-6.296-33.716-34.012-4.43 30.119-16.408z"
  }));
};
var TM = function TM2(_ref234) {
  var title = _ref234.title, rest = _objectWithoutProperties(_ref234, _excluded234);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "81.92 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#496E2D",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M357.208 183.679c8.397-23.404-1.036-48.858-21.281-61.536a52.131 52.131 0 0 1 10.884 2.621c27.002 9.688 41.038 39.428 31.35 66.431s-39.428 41.038-66.431 31.35a52.182 52.182 0 0 1-10.069-4.895c23.686 3.084 47.15-10.566 55.547-33.971zm-46.571-67.95-7.297 9.427-11.22-4.026 6.712 9.852-7.296 9.427 11.443-3.338 6.712 9.852.361-11.914 11.444-3.339-11.221-4.025z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m330.338 146.448-7.296 9.427-11.221-4.026 6.712 9.852-7.296 9.427 11.443-3.339 6.712 9.853.36-11.915 11.445-3.34-11.221-4.024zM275.9 126.916l-7.296 9.427-11.219-4.024 6.711 9.851-7.296 9.426 11.443-3.338 6.712 9.852.361-11.915 11.444-3.337-11.221-4.027zm-.799 35.189-7.296 9.427-11.221-4.026 6.712 9.852-7.296 9.427 11.444-3.338 6.711 9.852.362-11.915 11.443-3.338-11.22-4.026zm33.484 12.013-7.296 9.427-11.22-4.026 6.712 9.853-7.297 9.426 11.444-3.338 6.712 9.852.36-11.915 11.443-3.338-11.219-4.025z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M83.478 85.337h89.043v341.326H83.478z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m117.458 175.191-14.908-11.105v-15.705l14.908-11.105h21.084l14.908 11.105v15.705l-14.908 11.105z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M128 137.276h-10.542l-14.908 11.105v7.678H128zm0 37.915h10.542l14.908-11.105v-8.012H128z",
    fill: "#FF9811"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m117.458 374.725-14.908-11.106v-15.704l14.908-11.105h21.084l14.908 11.105v15.704l-14.908 11.106z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M128 336.81h-10.542l-14.908 11.105v7.678H128zm0 37.915h10.542l14.908-11.106v-8.011H128z",
    fill: "#FF9811"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m117.458 274.957-14.908-11.105v-15.703l14.908-11.106h21.084l14.908 11.106v15.703l-14.908 11.105zm36.513 24.434h-6.493v-6.493h-11.411l-8.068-8.068-8.067 8.068h-11.41v6.493h-6.493v12.986h6.493v6.492h11.41l8.068 8.069 8.068-8.069h11.41v-6.492h6.493zm0-99.768h-6.493v-6.492h-11.411l-8.068-8.069-8.067 8.069h-11.41v6.492h-6.493v12.986h6.493v6.492h11.41l8.068 8.07 8.068-8.07h11.41v-6.492h6.493z",
    fill: "#496E2D"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M120.576 248.576h14.84v14.84h-14.84z"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 128,
    cy: 206.113,
    r: 7.421
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 128,
    cy: 305.887,
    r: 7.421
  })));
};
var TN = function TN2(_ref235) {
  var title = _ref235.title, rest = _objectWithoutProperties(_ref235, _excluded235);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.331h512v341.337H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 256,
    cy: 255.994,
    r: 96
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "m267.826 219.291 16.47 22.695 26.673-8.649-16.496 22.676 16.468 22.695-26.664-8.681-16.495 22.676.017-28.04-26.664-8.682 26.674-8.648z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M277.818 312.724c-31.33 0-56.727-25.397-56.727-56.727s25.397-56.727 56.727-56.727c9.769 0 18.96 2.47 26.985 6.819-12.589-12.31-29.804-19.909-48.803-19.909-38.558 0-69.818 31.259-69.818 69.818s31.26 69.818 69.818 69.818c18.999 0 36.215-7.599 48.803-19.909-8.026 4.347-17.216 6.817-26.985 6.817z"
  })));
};
var TO = function TO2(_ref236) {
  var title = _ref236.title, rest = _objectWithoutProperties(_ref236, _excluded236);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "11.947 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.331h512v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.331h256v170.663H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M141.357 157.303V130.59h-26.714v26.713H87.93v26.713h26.713v26.713h26.714v-26.713h26.713v-26.713z"
  }));
};
var TR = function TR2(_ref237) {
  var title = _ref237.title, rest = _objectWithoutProperties(_ref237, _excluded237);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "76.95 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#E30A17",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M259.7 118.6c-13.1-9.5-29-14.6-45.3-14.5-40.8 0-73.8 30.8-73.8 68.9s33.1 68.9 73.8 68.9c17.1 0 32.9-5.4 45.3-14.5-30 38.6-85.7 45.6-124.3 15.5s-45.6-85.7-15.5-124.3 85.7-45.6 124.3-15.5c5.8 4.5 11 9.8 15.5 15.5zm39.9 65.8-18.1 21.9 1.2-28.4-26.4-10.4 27.3-7.6 1.8-28.3 15.6 23.7 27.5-7.1-17.5 22 15.3 23.9-26.7-9.7z"
  }));
};
var TT = function TT2(_ref238) {
  var title = _ref238.title, rest = _objectWithoutProperties(_ref238, _excluded238);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m6.066 85.337 207.961 212.636 131.584 128.69h160.323L297.973 214.027 166.389 85.337z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M43.364 85.337 384.69 426.663h83.946L127.31 85.337z"
  }));
};
var TV = function TV2(_ref239) {
  var title = _ref239.title, rest = _objectWithoutProperties(_ref239, _excluded239);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#00B2EE",
    d: "M0 171h256.5V0H513v342H0V171z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m196.8 274.1 16.8 51.6-43.9-31.9H224l-43.9 31.9 16.7-51.6zm205.8-80.3 16.8 51.6-43.9-31.9h54.3l-43.9 31.9 16.7-51.6zm60.7-44.7 16.8 51.6-43.9-31.9h54.3l-43.9 31.9 16.7-51.6zm0-127.8L480.1 73l-44-32h54.3l-43.9 32 16.8-51.7zm-53 53.7 16.8 51.6-43.9-31.9h54.3l-43.9 31.9L410.3 75zm-77.4 32 16.8 51.6-43.9-31.9H360l-43.9 31.9 16.8-51.6zM350 245.4l16.8 51.6-43.9-31.9h54.3L333.3 297l16.7-51.6zm-71.8-56.2 16.8 51.6-44-31.8h54.3l-43.9 31.9 16.8-51.7zm0 75.3 16.8 51.6-44-31.9h54.3l-43.9 31.9 16.8-51.6z",
    fill: "#FFDA44"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var TW = function TW2(_ref240) {
  var title = _ref240.title, rest = _objectWithoutProperties(_ref240, _excluded240);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "6.827 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 85.337h256V256H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M186.435 170.669 162.558 181.9l12.714 23.125-25.927-4.961-3.286 26.192L128 206.993l-18.06 19.263-3.285-26.192-25.927 4.96 12.714-23.125-23.877-11.23 23.877-11.231-12.714-23.125 25.927 4.96 3.286-26.192L128 134.344l18.06-19.263 3.285 26.192 25.928-4.96-12.715 23.125z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#0052B4",
    cx: 128,
    cy: 170.674,
    r: 29.006
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M128 190.06c-10.692 0-19.391-8.7-19.391-19.391 0-10.692 8.7-19.391 19.391-19.391 10.692 0 19.391 8.7 19.391 19.391 0 10.691-8.699 19.391-19.391 19.391z"
  }));
};
var TZ = function TZ2(_ref241) {
  var title = _ref241.title, rest = _objectWithoutProperties(_ref241, _excluded241);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M0 426.663V85.337h512"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M512 152.222V85.337H411.67L0 359.778v66.885h100.33z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M512 85.337v40.125L60.193 426.663H0v-40.125L451.807 85.337z"
  }));
};
var UA = function UA2(_ref242) {
  var title = _ref242.title, rest = _objectWithoutProperties(_ref242, _excluded242);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 85.337h512V256H0z"
  }));
};
var UG = function UG2(_ref243) {
  var title = _ref243.title, rest = _objectWithoutProperties(_ref243, _excluded243);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.35 0 341.3 341.3"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#232323",
    d: "M0 0h512v341.3H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 56.9h512v56.9H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D32300",
    d: "M0 113.8h512v56.9H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 227.6h512v56.9H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D32300",
    d: "M0 284.4h512v56.9H0z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 256,
    cy: 170.7,
    r: 80.7
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M234.5 127.5c.9-1.4-19.6-2-19.6-2 1.7-2.5 18.4-10.5 18.4-10.5s-.9-6 2.7-9.8l-4.5-9.8s7-3.4 18.4-3.4 19.9 7 21 13.1l-6.4 3.4c-.1 4.7 1.7 11.6-4.3 17.3-5.9 5.7-8.3 6.9-8.5 18.8 0 3.9 2.3 8.2 8.8 11.7 17.4 9.3 38.6 28.2 44.6 33.9 6.1 5.7 5.1 19.2 2.6 25.2s-12.1 14.3-14.3 13.6c-2.2-.6 1.2-9.2-3.5-11.6 0 0-8.9-7.6-16.8.6s-.2 25.2 3.9 28c4.1 2.8 1.7 5-1.9 5H247c-3.8 0-5.4-2.3-1.9-5 7.6-3.8 12.4-15.3 7.4-20.3-4.9-4.9-18.3 1.5-21.5 6.3-2.8 2.8-8.8 3.6-12.9-1.4s-4.1-10.4-1.1-12.5c7-4.8 0 0 .1-.1 0 0 11.9-8.6 29.9-9 3.9 0 4.8-2.2 2.2-4.8 0 0-30.9-27.4-28.1-44.2 3-18.3 20-26.3 13.4-32.5-1.3-1.8 0 0 0 0z"
  }));
};
var UM = function UM2(_ref244) {
  var title = _ref244.title, rest = _objectWithoutProperties(_ref244, _excluded244);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.7h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513V342H0z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#2E52B2",
    d: "M0 0h256.5v184.1H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zm56.3 0-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zm56.5 0-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zm56.2 0-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zm-56.2 0-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zm112.5 0-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zm56.5 0-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zm-169-50.6-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zm56.2 0-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zm56.3 0-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zm56.5 0-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z",
    fill: "#FFF"
  }));
};
var US = function US2(_ref245) {
  var title = _ref245.title, rest = _objectWithoutProperties(_ref245, _excluded245);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "59.85 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.7h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513V342H0z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#2E52B2",
    d: "M0 0h256.5v184.1H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zm56.3 0-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zm56.5 0-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zm56.2 0-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zm-56.2 0-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zm112.5 0-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zm56.5 0-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zm-169-50.6-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zm56.2 0-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zm56.3 0-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zm56.5 0-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z",
    fill: "#FFF"
  }));
};
var UY = function UY2(_ref246) {
  var title = _ref246.title, rest = _objectWithoutProperties(_ref246, _excluded246);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "10.26 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 38h513v38H0zm0 76h513v38H0zm0 76h513v38H0zm0 76h513v38H0z",
    fill: "#0038a8"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h256.5v190H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FED443",
    d: "m128.3 138.7-15.1 22.6-3.8-26.9L86 148.2l8.2-25.9-27.2 2.2 18.6-19.8L60.3 95l25.4-9.7L67 65.5l27.1 2.3-8.2-25.9 23.4 13.8 3.9-26.9 15.1 22.6 15.1-22.6 3.8 26.9 23.4-13.8-8.2 25.9 27.1-2.2-18.6 19.8 25.4 9.7-25.4 9.7 18.6 19.8-27.1-2.2 8.2 25.9-23.4-13.8-3.9 26.9-15-22.7zm0-.5c23.9.9 44-17.6 44.9-41.5.9-23.9-17.6-44-41.5-44.9h-3.4c-23.9.8-42.6 20.8-41.8 44.6.6 22.8 19 41.1 41.8 41.8zm0-10.6c-18.8 0-34-15.2-34-34s15.2-34 34-34 34 15.2 34 34-15.3 34-34 34z"
  }));
};
var UZ = function UZ2(_ref247) {
  var title = _ref247.title, rest = _objectWithoutProperties(_ref247, _excluded247);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#3081f7",
    d: "M0 0h513v108H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ee162e",
    d: "M0 108h513v9H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 117h513v108H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ee162e",
    d: "M0 225h513v9H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#308738",
    d: "M0 233h513v108H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M53.5 54c0-23.1 16.4-35 34.3-38.9-2.7-.6-5.6-.9-8.5-.9-22 0-39.8 17.8-39.8 39.8s17.8 39.8 39.8 39.8c2.9 0 5.8-.3 8.5-.9C69.9 89 53.5 77.1 53.5 54zm57.9 21.3 1.8 5.9h6.2l-5 3.6 1.9 5.8-4.9-3.6-5 3.6 1.9-5.8-4.9-3.6h6.1zm27.8 0 1.9 5.9h6.1l-5 3.6 1.9 5.8-4.9-3.6-5 3.6 1.9-5.8-4.9-3.6h6.1zm27.8 0 1.9 5.9h6.1l-4.9 3.6 1.9 5.8-5-3.6-4.9 3.6 1.9-5.8-5-3.6h6.1zm27.9 0 1.9 5.9h6.1l-5 3.6 1.9 5.8-4.9-3.6-5 3.6 1.9-5.8-4.9-3.6h6.1zm27.8 0 1.9 5.9h6.1l-4.9 3.6 1.9 5.8-5-3.6-4.9 3.6 1.9-5.8-5-3.6h6.1zm-83.5-28.9 1.9 5.8h6.1l-5 3.6 1.9 5.8-4.9-3.6-5 3.6 1.9-5.8-4.9-3.6h6.1zm27.8 0 1.9 5.8h6.1l-4.9 3.6 1.9 5.8-5-3.6-4.9 3.6 1.9-5.8-5-3.6h6.1zm27.9 0 1.9 5.8h6.1l-5 3.6 1.9 5.8-4.9-3.6-5 3.6 1.9-5.8-4.9-3.6h6.1zm27.8 0 1.9 5.8h6.1l-4.9 3.6 1.9 5.8-5-3.6-4.9 3.6 1.9-5.8-5-3.6h6.1zm-55.7-29 1.9 5.8h6.1l-4.9 3.6 1.9 5.9-5-3.6-4.9 3.6 1.9-5.9-5-3.6h6.1zm27.9 0 1.9 5.8h6.1l-5 3.6 1.9 5.9-4.9-3.6-5 3.6 1.9-5.9-4.9-3.6h6.1zm27.8 0 1.9 5.8h6.1l-4.9 3.6 1.9 5.9-5-3.6-4.9 3.6 1.9-5.9-5-3.6h6.1z",
    fill: "#FFF"
  }));
};
var VA = function VA2(_ref248) {
  var title = _ref248.title, rest = _objectWithoutProperties(_ref248, _excluded248);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 85.331h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M256 85.331h256v341.337H256z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ACABB1",
    d: "m321.353 233.837 32.073 42.43c-5.053 7.651-5.026 17.961.817 25.692 7.414 9.807 21.374 11.748 31.182 4.335 9.807-7.414 11.748-21.374 4.334-31.182-5.843-7.731-15.756-10.568-24.495-7.795l-49.988-66.129-11.838 8.949-17.759 13.424 17.899 23.677 17.775-13.401zm46.175 48.78a7.421 7.421 0 1 1 8.95 11.84 7.421 7.421 0 0 1-8.95-11.84z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m376.367 247.24 17.899-23.677-17.759-13.424-11.838-8.949-49.988 66.129c-8.74-2.775-18.651.063-24.495 7.795-7.414 9.808-5.473 23.768 4.334 31.182 9.808 7.414 23.768 5.473 31.182-4.335 5.845-7.731 5.871-18.041.817-25.692l32.073-42.43 17.775 13.401zm-62.504 45.771a7.42 7.42 0 1 1-11.84-8.95 7.42 7.42 0 0 1 11.84 8.95z"
  }));
};
var VC = function VC2(_ref249) {
  var title = _ref249.title, rest = _objectWithoutProperties(_ref249, _excluded249);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "M0 85.331h512v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#338AF3",
    d: "M0 85.331h170.663v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M341.337 85.331H512v341.337H341.337zM214.261 283.82l-33.393-50.086 33.392-50.087 33.392 50.087zm83.478 0-33.391-50.086 33.391-50.087 33.393 50.087zM256 350.603l-33.391-50.087L256 250.429l33.391 50.087z",
    fill: "#6DA544"
  }));
};
var VE = function VE2(_ref250) {
  var title = _ref250.title, rest = _objectWithoutProperties(_ref250, _excluded250);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.75 0 15 15"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFCE00",
    d: "M0 0h22.5v5H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#203899",
    d: "M0 5h22.5v5H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D82B2B",
    d: "M0 10h22.5v5H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m12.13 5.38.14.46.45.14-.39.27.01.48-.38-.29-.45.15.15-.44-.28-.38h.47zm-1.77 0 .27.39h.47l-.28.38.15.45-.45-.16-.38.28.01-.47-.39-.28.45-.13zm3.44.56-.01.48.39.27-.46.14-.14.45-.27-.38h-.48l.29-.38-.15-.45.45.16zm-5.11.02.4.27.44-.18-.13.46.3.36-.47.02-.26.4-.16-.44-.46-.12.37-.3zm6.55 1.17-.2.44.25.4-.47-.05-.31.36-.1-.46-.43-.18.41-.24.03-.47.35.31zm.19 1.12.21.43.47.07-.34.33.08.46-.42-.22-.42.22.08-.46-.34-.33.47-.07zM7 8.2l.21.43.47.06-.34.33.08.47L7 9.27l-.42.22.08-.47-.34-.33.47-.06zm.31-1.15.45.14.38-.29v.48l.39.26-.45.15-.13.46-.28-.38-.47.01.27-.38z"
  }));
};
var VG = function VG2(_ref251) {
  var title = _ref251.title, rest = _objectWithoutProperties(_ref251, _excluded251);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "112.86 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffc72c",
    d: "m384.8 174.7-46.2 46.2c8.7 16.7 26.1 28.1 46.2 28.1s37.6-11.4 46.2-28.1l-46.2-46.2z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#006129",
    stroke: "#fff",
    strokeWidth: 3,
    d: "M332.7 93v81.8c0 39.8 52 52 52 52s52-12.2 52-52V93h-104z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M373.6 130.1h22.3v59.5h-22.3z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#9c4c00",
    cx: 384.8,
    cy: 130.1,
    r: 11.2
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M347.6 107.8h14.9v14.9h-14.9zm0 33.5h14.9v14.9h-14.9zm0 33.4h14.9v14.9h-14.9zm59.5-66.9H422v14.9h-14.9zm0 33.5H422v14.9h-14.9zm0 33.4H422v14.9h-14.9z",
    fill: "#ffc72c"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#012169",
    d: "M0 0h256.5v171H0z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFF"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M256.5 0v30.6l-45.3 25.2h45.3v59.4h-59.2l59.2 32.9V171h-26.7l-73.7-40.9V171h-55.7v-48.7L12.8 171H0v-30.6l45.3-25.2H0V55.8h59.2L0 22.9V0h26.7l73.7 40.9V0h55.7v48.7L243.7 0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-55.7-59.4L0 0v15.8l72 40z"
  })), /* @__PURE__ */ React.createElement("g", {
    fill: "#D80027"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M144.3 0h-32.1v69.5H0v32h112.2V171h32.1v-69.5h112.2v-32H144.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M156.1 115.2 256.5 171v-15.8l-72-40zm-84.1 0-72 40V171l100.4-55.8zm28.4-59.4L0 0v15.8l72 40zm84.1 0 72-40V0L156.1 55.8z"
  })));
};
var VI = function VI2(_ref252) {
  var title = _ref252.title, rest = _objectWithoutProperties(_ref252, _excluded252);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.35 0 341.3 341.3"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h512v341.3H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1583C4",
    d: "m397.7 166.3-51 97.7c-1.1 2-.3 4.5 1.8 5.6 2 1.1 4.5.3 5.6-1.8l51-97.7c1-2.1.1-4.6-2-5.5-2-.9-4.3-.2-5.4 1.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1583C4",
    d: "m404.9 188-57.8 75.4c-1.3 1.9-.8 4.5 1.1 5.8 1.7 1.2 4.1.9 5.5-.7l57.8-75.4c1.4-1.8 1.1-4.4-.8-5.8-1.8-1.5-4.4-1.1-5.8.7z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1583C4",
    d: "m379 181.3-32.5 83.1c-.8 2.1.2 4.6 2.4 5.4 2.1.8 4.6-.2 5.4-2.4l32.5-83.1c.7-2.2-.4-4.5-2.6-5.3-2.1-.6-4.3.4-5.2 2.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#409347",
    d: "M122.1 171.9c.4 1.7 1.2 4.7 2.2 8.5 1.7 6.4 3.6 12.8 5.6 18.7 2.3 6.9 14.7 31.4 20.2 39.1 6.9 9.7 14.1 19.3 21.5 28.6 1.6 1.9 4.5 2.1 6.4.5 1.8-1.6 2.1-4.3.7-6.2-7.3-9.2-14.4-18.6-21.2-28.2-4.2-5.8-17.2-31.1-19-36.7-2.9-8.7-5.4-17.6-7.6-26.5-.5-2.4-2.9-4-5.3-3.5s-4 2.9-3.5 5.3c-.1.2 0 .3 0 .4z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFD836",
    stroke: "#231F20",
    strokeMiterlimit: 10
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M297.1 114.9S279.5 42.8 261 42.8c-6.9 0-11.9-.6-15.4 6.4-.9 1.7-20.7-1.6-19.1 20.8.5 6.9 1.1-9.8 14.9-3.4 6.3 3-16.4 48.2-16.4 48.2h72.1z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m466.1 48.4-90.9 22c-75.3 18.3-42.1 44.4-42.1 44.4l-72.1 12-72.1-12s33.2-26.1-42.1-44.4l-90.9-22C43.1 45.3 38.1 51.8 45.3 63c0 0 106.6 104 126.8 112 20.2 8.1 40.8 0 40.8 0s-14.9 8.7-24 24c-9.2 15.3-4.6 34.7-38.9 40.2-5.5 6.6-5 14 2.9 19.9 7.9 5.8 72.1-48.1 72.1-48.1s-24 24.4-24 36.1c0 5.1 44.1 53.8 60.1 53.8s60.1-48.7 60.1-53.8c0-11.7-24-36.1-24-36.1s64.2 53.9 72.1 48.1 11.4-19.3 2.8-19.9c-28-1.8-29.7-24.9-38.9-40.2-9.2-15.3-24-24-24-24s20.6 8.1 40.8 0S476.7 63 476.7 63c7.2-11.2 2.3-17.7-10.6-14.6z"
  })), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    stroke: "#231F20",
    strokeMiterlimit: 10,
    d: "M201.3 111.8v80.3c0 45.7 59.7 59.7 59.7 59.7s59.7-14 59.7-59.7v-80.3H201.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M225.2 137.7V235c8.2 6 17 10.2 23.9 12.9V137.7h-23.9zm71.6 0V235c-8.2 6-17 10.2-23.9 12.9V137.7h23.9z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M201.3 111.8h119.4v37.9H201.3z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#1583C4",
    d: "m60.1 210.5-21.9-58.1H15.7l31.8 80.8h25.2l31.5-80.8H81.7zm391.4-58.6h18.9v81.7h-18.9z"
  }));
};
var VN = function VN2(_ref253) {
  var title = _ref253.title, rest = _objectWithoutProperties(_ref253, _excluded253);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M196.641 85.337H0v341.326h512V85.337z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m256 157.279 22.663 69.747H352l-59.332 43.106 22.664 69.749L256 296.774l-59.332 43.107 22.664-69.749L160 227.026h73.337z"
  }));
};
var VU = function VU2(_ref254) {
  var title = _ref254.title, rest = _objectWithoutProperties(_ref254, _excluded254);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#6DA544",
    d: "M512 256v170.663H0L215.185 256z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M512 85.337V256H215.185L0 85.337z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M221.001 239.304 26.868 85.337H8.956l208.168 165.098H512v-11.131zM8.956 426.663h17.912l194.133-153.967H512v-11.131H217.124zM0 92.44v14.206L188.317 256 0 405.354v14.205L206.229 256z"
  }), /* @__PURE__ */ React.createElement("g", {
    fill: "#FFDA44"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M8.956 85.337H0v7.103L206.229 256 0 419.559v7.104h8.956l208.168-165.098H512v-11.13H217.124z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M63.718 292.382v-14.295c14.265 0 25.87-11.606 25.87-25.869 0-10.092-8.211-18.303-18.304-18.303-6.875 0-12.469 5.593-12.469 12.469 0 4.397 3.577 7.974 7.974 7.974a4.514 4.514 0 0 0 4.508-4.508h14.295c0 10.368-8.435 18.804-18.802 18.804-12.279-.002-22.269-9.993-22.269-22.271 0-14.758 12.006-26.764 26.764-26.764 17.975 0 32.599 14.623 32.599 32.599 0 22.145-18.018 40.164-40.166 40.164z"
  })));
};
var WF = function WF2(_ref255) {
  var title = _ref255.title, rest = _objectWithoutProperties(_ref255, _excluded255);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "9 0 100 100"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80B30",
    d: "M0 0h150v100H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#00318A",
    d: "M0 0h20v44.33H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M20 0h20v44.33H20z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    stroke: "#FFF",
    strokeWidth: 3,
    d: "M0 44.33h62.75V0"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M108.08 43.29 87.96 23.17h40.25l-20.13 20.12zm-6.7 6.71L81.25 29.88v40.25L101.38 50zm6.7 6.71L87.96 76.83h40.25l-20.13-20.12zm6.71-6.71 20.13-20.13v40.25L114.79 50z"
  }));
};
var WS = function WS2(_ref256) {
  var title = _ref256.title, rest = _objectWithoutProperties(_ref256, _excluded256);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "15.36 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.331h512v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 85.331h256v170.663H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m165.483 181.79 2.764 8.504h8.939l-7.232 5.254 2.763 8.503-7.234-5.255-7.233 5.255 2.763-8.503-7.233-5.254h8.94zm-44.904-66.783 4.606 14.173h14.9l-12.055 8.757 4.605 14.171-12.056-8.758-12.054 8.758 4.605-14.171-12.056-8.757h14.901zm44.522 14.841 4.606 14.172h14.9l-12.055 8.757 4.604 14.173-12.055-8.76-12.054 8.76 4.604-14.173-12.055-8.757h14.9zm-35.192 59.363 4.606 14.172h14.9l-12.055 8.758 4.604 14.171-12.055-8.759-12.054 8.759 4.604-14.171-12.055-8.758h14.9zm-39.01-37.103 4.605 14.173h14.9l-12.055 8.757 4.604 14.173-12.054-8.76-12.055 8.76 4.604-14.173-12.055-8.757h14.9z",
    fill: "#FFF"
  }));
};
var XA = function XA2(_ref257) {
  var title = _ref257.title, rest = _objectWithoutProperties(_ref257, _excluded257);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.5 0 342 342"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h513v342H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h513v48.8H0zm0 97.5h513v48.8H0zM0 195h513v48.8H0zm0 97.6h513v48.8H0z",
    fill: "#6DA544"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 0h256.5v146.3H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "m116.9 114.4-7.5-14.8V69.9L128 59l18.6 10.9v22.3l7.4-7.4 4.2 3-4.2 11.8-14.9 14.8z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 82,
    cy: 82.8,
    r: 5.4
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 90.8,
    cy: 61.7,
    r: 5.4
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 106.6,
    cy: 46.2,
    r: 5.4
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 128,
    cy: 40.8,
    r: 5.4
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 149.4,
    cy: 46.2,
    r: 5.4
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 165.2,
    cy: 61.7,
    r: 5.4
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FFF",
    cx: 174,
    cy: 82.8,
    r: 5.4
  }));
};
var XC = function XC2(_ref258) {
  var title = _ref258.title, rest = _objectWithoutProperties(_ref258, _excluded258);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "150 0 600 600"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 0h900v600H0z",
    fill: "#fff"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#e30a17",
    cx: 300,
    cy: 300,
    r: 150
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: 337.5,
    cy: 300,
    r: 120,
    fill: "#fff"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#e30a17",
    d: "M0 60h900v60H0zm0 420h900v60H0zm417.5-180 135.676-44.084-83.852 115.413V228.671l83.852 115.413z"
  }));
};
var XK = function XK2(_ref259) {
  var title = _ref259.title, rest = _objectWithoutProperties(_ref259, _excluded259);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.335 0 341.33 341.33"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#0052B4",
    d: "M0 0h512v341.34H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m220.72 42.63 7.95 16.11 17.77 2.58-12.86 12.54 3.04 17.7-15.9-8.36-15.9 8.36 3.03-17.7-12.86-12.54 17.78-2.58zm70.56-.06 7.95 16.1 17.78 2.59-12.86 12.53 3.03 17.71-15.9-8.36-15.9 8.36 3.04-17.71-12.86-12.53 17.77-2.59zm62.08 11.36 7.95 16.11 17.77 2.58-12.86 12.54 3.04 17.7-15.9-8.35-15.9 8.35 3.04-17.7-12.87-12.54 17.78-2.58zm63.01 18.3 7.95 16.11 17.77 2.59-12.86 12.53 3.04 17.71-15.9-8.36-15.9 8.36 3.03-17.71-12.86-12.53 17.78-2.59zm-257.73-18.3 7.95 16.11 17.78 2.58-12.87 12.54 3.04 17.7-15.9-8.35-15.9 8.35 3.04-17.7-12.86-12.54 17.77-2.58zm-63.01 18.3 7.95 16.11 17.78 2.59-12.86 12.53 3.03 17.71-15.9-8.36-15.9 8.36 3.04-17.71-12.86-12.53 17.77-2.59z",
    fill: "#FFF"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m217.53 259.33-27.22-13.61-27.22-54.43h27.22l27.22-27.22 13.61-27.22 27.22-13.61 13.61 13.61 27.22 13.61v13.61l13.61 13.61 40.83 27.22L340 245.73l-40.83 40.83-13.61-27.22-40.83 27.22v27.22l-13.61-13.61-13.59-40.84z"
  }));
};
var XO = function XO2(_ref260) {
  var title = _ref260.title, rest = _objectWithoutProperties(_ref260, _excluded260);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "75 0 300 300"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h450v300H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "red",
    d: "M0 100h450v200H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDF00",
    d: "M0 200h450v100H0z"
  }));
};
var YE = function YE2(_ref261) {
  var title = _ref261.title, rest = _objectWithoutProperties(_ref261, _excluded261);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "85.333 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M0 85.337h512v113.775H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 312.888h512v113.775H0z"
  }));
};
var YT = function YT2(_ref262) {
  var title = _ref262.title, rest = _objectWithoutProperties(_ref262, _excluded262);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "15 0 60 60"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h90v60H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    stroke: "#7f7f7f",
    strokeWidth: 0.25,
    fill: "#ABABAB",
    d: "M75.6 39.6c-1.1.7 0 1.8-.6 1.9-.6.1-1.5-1.4-.2-2.5 1.6-1.5 5.8 0 5.9 4.3 0 2.2-.9 6.8-7.2 6.8-7.6 0-11.4-5.7-11.4-11.4 0-4.8 3.7-13.5 6.5-14.6 3.1-1.2 6.7-3.5 6.8-5 0-.5-1.4-.1-3.3.9-3.1 1.7-6.6 2.5-6.6 1.4s2.9-3.1 4-4.6c1.2-1.6.9-5.5 3-5.5 7.6 0 9.9 7.7 7 11.7-1.9 2.6 4.3 1 4.3 1s0 5.3-3.2 7.3c-3 1.8-4.8 3.9-4.8 3.9s.2-4.6-.5-3.9c-.6.7-11.1 4.5-10.3 12 .3 3 4.5 5.4 8.5 5.2s5.7-2.4 5.8-4.9c.1-3.9-3-4.4-3.7-4zm-64.9 4c.1 2.5 1.8 4.7 5.8 4.9s8.2-2.2 8.5-5.2c.8-7.5-9.7-11.3-10.3-12-.7-.7-.5 3.9-.5 3.9s-1.8-2.1-4.8-3.9c-3.2-2-3.2-7.3-3.2-7.3s6.2 1.6 4.3-1c-2.9-4-.6-11.7 7-11.7 2.1 0 1.8 3.9 3 5.5 1.1 1.5 4 3.5 4 4.6s-3.5.3-6.6-1.4c-1.9-1-3.3-1.4-3.3-.9.1 1.5 3.7 3.8 6.8 5 2.8 1.1 6.5 9.8 6.5 14.6 0 5.7-3.8 11.4-11.4 11.4-6.3 0-7.2-4.6-7.2-6.8.1-4.3 4.3-5.8 5.9-4.3 1.2 1.1.4 2.7-.2 2.5-.6-.1.6-1.2-.6-1.9-.6-.4-3.7.1-3.7 4z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#DE393A",
    d: "M31 28.8v14c0 1.9 2.1 1.6 2.1 1.6h9.3c1.2 0 2.6 2.3 2.6 2.3s1.4-2.3 2.5-2.3h9.6s2 .2 2-1.8V28.7H31z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#3951A3",
    d: "M31 13.1h28v15.7H31z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M50.1 16.5c-.4 2.4-2.5 4.2-5.1 4.2-2.5 0-4.6-1.8-5.1-4.2-.5.9-.8 1.9-.8 3 0 3.3 2.6 5.9 5.9 5.9 3.3 0 5.9-2.6 5.9-5.9 0-1.1-.3-2.1-.8-3z"
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FEE05F",
    cx: 39.1,
    cy: 36.5,
    r: 3
  }), /* @__PURE__ */ React.createElement("circle", {
    fill: "#FEE05F",
    cx: 50.9,
    cy: 36.5,
    r: 3
  }));
};
var ZA = function ZA2(_ref263) {
  var title = _ref263.title, rest = _objectWithoutProperties(_ref263, _excluded263);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "35.84 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M0 85.337h512v341.326H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M114.024 256.001 0 141.926v228.17z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#ffb915",
    d: "M161.192 256 0 94.7v47.226l114.024 114.075L0 370.096v47.138z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#007847",
    d: "M509.833 289.391c.058-.44.804-.878 2.167-1.318v-65.464H222.602L85.33 85.337H0V94.7L161.192 256 0 417.234v9.429h85.33l137.272-137.272h287.231z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#000c8a",
    d: "M503.181 322.783H236.433l-103.881 103.88H512v-103.88z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#e1392d",
    d: "M503.181 189.217H512V85.337H132.552l103.881 103.88z"
  }));
};
var ZM = function ZM2(_ref264) {
  var title = _ref264.title, rest = _objectWithoutProperties(_ref264, _excluded264);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "170.667 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: "#496E2D",
    d: "M0 85.331h512v341.337H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF9811",
    d: "M490.668 195.476h-48c0-8.836-7.164-16-16-16s-16 7.164-16 16h-48c0 8.836 7.697 16 16.533 16h-.533c0 8.836 7.162 16 16 16 0 8.836 7.162 16 16 16h32c8.836 0 16-7.164 16-16 8.836 0 16-7.164 16-16h-.533c8.837 0 16.533-7.164 16.533-16z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "M341.337 255.994h56.888v170.663h-56.888z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FF9811",
    d: "M455.112 255.994H512v170.663h-56.888z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M398.225 255.994h56.888v170.663h-56.888z"
  }));
};
var ZW = function ZW2(_ref265) {
  var title = _ref265.title, rest = _objectWithoutProperties(_ref265, _excluded265);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "13.653 85.333 341.333 341.333"
  }, rest), title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    d: "M0 85.333h512V426.67H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 134.196h512v48.868H0zm0 195.472h512v48.868H0z",
    fill: "#FFDA44"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#057f44",
    d: "M0 85.333h512v48.868H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M0 183.069h512v48.868H0zm0 97.737h512v48.868H0z",
    fill: "#D80027"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#057f44",
    d: "M0 378.542h512v48.128H0z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFF",
    d: "M276.992 255.996 106.329 426.659H0V85.333h106.329z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M256 255.996 85.334 426.662h20.987l170.667-170.666L106.321 85.33H85.334z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#D80027",
    d: "m102.465 202.57 13.259 40.812h42.917l-34.718 25.226 13.26 40.814-34.718-25.224-34.72 25.224 13.262-40.814-34.718-25.226h42.915z"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "#FFDA44",
    d: "m138.94 259.335-34.559-12.243s-2.553-23.955-2.708-24.766c-1.173-6.18-6.603-10.851-13.123-10.851-7.376 0-13.357 5.98-13.357 13.357 0 1.223.178 2.402.486 3.528l-9.689 9.755h17.229c0 17.882-13.344 17.882-13.344 35.691l7.402 17.809h44.522l7.422-17.809h-.004a17.782 17.782 0 0 0 1.381-5.231c6.397-2.589 8.342-9.24 8.342-9.24z"
  }));
};
var x1_default = {
  AC,
  AD,
  AE,
  AF,
  AG,
  AI,
  AL,
  AM,
  AO,
  AQ,
  AR,
  AS,
  AT,
  AU,
  AW,
  AX,
  AZ,
  BA,
  BB,
  BD,
  BE,
  BF,
  BG,
  BH,
  BI,
  BJ,
  BL,
  BM,
  BN,
  BO,
  BQ_BO,
  BQ_SA,
  BQ_SE,
  BQ,
  BR,
  BS,
  BT,
  BV,
  BW,
  BY,
  BZ,
  CA,
  CC,
  CD,
  CF,
  CG,
  CH,
  CI,
  CK,
  CL,
  CM,
  CN,
  CO,
  CR,
  CU,
  CV,
  CW,
  CX,
  CY,
  CZ,
  DE,
  DJ,
  DK,
  DM,
  DO,
  DZ,
  EC,
  EE,
  EG,
  EH,
  ER,
  ES_CT,
  ES,
  ET,
  EU,
  FI,
  FJ,
  FK,
  FM,
  FO,
  FR,
  GA,
  GB_ENG,
  GB_NIR,
  GB_SCT,
  GB_WLS,
  GB,
  GD,
  GE,
  GF,
  GG,
  GH,
  GI,
  GL,
  GM,
  GN,
  GP,
  GQ,
  GR,
  GS,
  GT,
  GU,
  GW,
  GY,
  HK,
  HM,
  HN,
  HR,
  HT,
  HU,
  IC,
  ID,
  IE,
  IL,
  IM,
  IN,
  IO,
  IQ,
  IR,
  IS,
  IT,
  JE,
  JM,
  JO,
  JP,
  KE,
  KG,
  KH,
  KI,
  KM,
  KN,
  KP,
  KR,
  KW,
  KY,
  KZ,
  LA,
  LB,
  LC,
  LI,
  LK,
  LR,
  LS,
  LT,
  LU,
  LV,
  LY,
  MA,
  MC,
  MD,
  ME,
  MF,
  MG,
  MH,
  MK,
  ML,
  MM,
  MN,
  MO,
  MP,
  MQ,
  MR,
  MS,
  MT,
  MU,
  MV,
  MW,
  MX,
  MY,
  MZ,
  NA,
  NC,
  NE,
  NF,
  NG,
  NI,
  NL,
  NO,
  NP,
  NR,
  NU,
  NZ,
  OM,
  PA,
  PE,
  PF,
  PG,
  PH,
  PK,
  PL,
  PM,
  PN,
  PR,
  PS,
  PT,
  PW,
  PY,
  QA,
  RE,
  RO,
  RS,
  RU,
  RW,
  SA,
  SB,
  SC,
  SD,
  SE,
  SG,
  SH,
  SI,
  SJ,
  SK,
  SL,
  SM,
  SN,
  SO,
  SR,
  SS,
  ST,
  SV,
  SX,
  SY,
  SZ,
  TA,
  TC,
  TD,
  TF,
  TG,
  TH,
  TJ,
  TK,
  TL,
  TM,
  TN,
  TO,
  TR,
  TT,
  TV,
  TW,
  TZ,
  UA,
  UG,
  UM,
  US,
  UY,
  UZ,
  VA,
  VC,
  VE,
  VG,
  VI,
  VN,
  VU,
  WF,
  WS,
  XA,
  XC,
  XK,
  XO,
  YE,
  YT,
  ZA,
  ZM,
  ZW
};

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/metadata.min.json.js
var metadata_min_json_default = { "version": 4, "country_calling_codes": { "1": ["US", "AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "7": ["RU", "KZ"], "20": ["EG"], "27": ["ZA"], "30": ["GR"], "31": ["NL"], "32": ["BE"], "33": ["FR"], "34": ["ES"], "36": ["HU"], "39": ["IT", "VA"], "40": ["RO"], "41": ["CH"], "43": ["AT"], "44": ["GB", "GG", "IM", "JE"], "45": ["DK"], "46": ["SE"], "47": ["NO", "SJ"], "48": ["PL"], "49": ["DE"], "51": ["PE"], "52": ["MX"], "53": ["CU"], "54": ["AR"], "55": ["BR"], "56": ["CL"], "57": ["CO"], "58": ["VE"], "60": ["MY"], "61": ["AU", "CC", "CX"], "62": ["ID"], "63": ["PH"], "64": ["NZ"], "65": ["SG"], "66": ["TH"], "81": ["JP"], "82": ["KR"], "84": ["VN"], "86": ["CN"], "90": ["TR"], "91": ["IN"], "92": ["PK"], "93": ["AF"], "94": ["LK"], "95": ["MM"], "98": ["IR"], "211": ["SS"], "212": ["MA", "EH"], "213": ["DZ"], "216": ["TN"], "218": ["LY"], "220": ["GM"], "221": ["SN"], "222": ["MR"], "223": ["ML"], "224": ["GN"], "225": ["CI"], "226": ["BF"], "227": ["NE"], "228": ["TG"], "229": ["BJ"], "230": ["MU"], "231": ["LR"], "232": ["SL"], "233": ["GH"], "234": ["NG"], "235": ["TD"], "236": ["CF"], "237": ["CM"], "238": ["CV"], "239": ["ST"], "240": ["GQ"], "241": ["GA"], "242": ["CG"], "243": ["CD"], "244": ["AO"], "245": ["GW"], "246": ["IO"], "247": ["AC"], "248": ["SC"], "249": ["SD"], "250": ["RW"], "251": ["ET"], "252": ["SO"], "253": ["DJ"], "254": ["KE"], "255": ["TZ"], "256": ["UG"], "257": ["BI"], "258": ["MZ"], "260": ["ZM"], "261": ["MG"], "262": ["RE", "YT"], "263": ["ZW"], "264": ["NA"], "265": ["MW"], "266": ["LS"], "267": ["BW"], "268": ["SZ"], "269": ["KM"], "290": ["SH", "TA"], "291": ["ER"], "297": ["AW"], "298": ["FO"], "299": ["GL"], "350": ["GI"], "351": ["PT"], "352": ["LU"], "353": ["IE"], "354": ["IS"], "355": ["AL"], "356": ["MT"], "357": ["CY"], "358": ["FI", "AX"], "359": ["BG"], "370": ["LT"], "371": ["LV"], "372": ["EE"], "373": ["MD"], "374": ["AM"], "375": ["BY"], "376": ["AD"], "377": ["MC"], "378": ["SM"], "380": ["UA"], "381": ["RS"], "382": ["ME"], "383": ["XK"], "385": ["HR"], "386": ["SI"], "387": ["BA"], "389": ["MK"], "420": ["CZ"], "421": ["SK"], "423": ["LI"], "500": ["FK"], "501": ["BZ"], "502": ["GT"], "503": ["SV"], "504": ["HN"], "505": ["NI"], "506": ["CR"], "507": ["PA"], "508": ["PM"], "509": ["HT"], "590": ["GP", "BL", "MF"], "591": ["BO"], "592": ["GY"], "593": ["EC"], "594": ["GF"], "595": ["PY"], "596": ["MQ"], "597": ["SR"], "598": ["UY"], "599": ["CW", "BQ"], "670": ["TL"], "672": ["NF"], "673": ["BN"], "674": ["NR"], "675": ["PG"], "676": ["TO"], "677": ["SB"], "678": ["VU"], "679": ["FJ"], "680": ["PW"], "681": ["WF"], "682": ["CK"], "683": ["NU"], "685": ["WS"], "686": ["KI"], "687": ["NC"], "688": ["TV"], "689": ["PF"], "690": ["TK"], "691": ["FM"], "692": ["MH"], "850": ["KP"], "852": ["HK"], "853": ["MO"], "855": ["KH"], "856": ["LA"], "880": ["BD"], "886": ["TW"], "960": ["MV"], "961": ["LB"], "962": ["JO"], "963": ["SY"], "964": ["IQ"], "965": ["KW"], "966": ["SA"], "967": ["YE"], "968": ["OM"], "970": ["PS"], "971": ["AE"], "972": ["IL"], "973": ["BH"], "974": ["QA"], "975": ["BT"], "976": ["MN"], "977": ["NP"], "992": ["TJ"], "993": ["TM"], "994": ["AZ"], "995": ["GE"], "996": ["KG"], "998": ["UZ"] }, "countries": { "AC": ["247", "00", "(?:[01589]\\d|[2-467])\\d{4}", [5, 6]], "AD": ["376", "00", "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", [6, 8, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["1"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]]], "AE": ["971", "00", "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"], ["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]], "0"], "AF": ["93", "00", "[2-7]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], "0"], "AG": ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([457]\\d{6})$|1", "268$1", 0, "268"], "AI": ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2457]\\d{6})$|1", "264$1", 0, "264"], "AL": ["355", "00", "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", [6, 7, 8, 9], [["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]], "0"], "AM": ["374", "00", "(?:[1-489]\\d|55|60|77)\\d{6}", [8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"], ["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]], "0"], "AO": ["244", "00", "[29]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]]], "AR": ["54", "00", "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}", [10, 11], [["(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1], ["(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"]], "0", 0, "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1"], "AS": ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "([267]\\d{6})$|1", "684$1", 0, "684"], "AT": ["43", "00", "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], ["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], ["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:48|5[0-3579]|[6-9])|7(?:20|32|8)|[89]", "(?:31|4)6|51|6(?:485|5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], ["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], "0"], "AU": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}", [5, 6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]], "0", 0, "(183[12])|0", 0, 0, 0, [["(?:(?:241|349)0\\d\\d|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4])|[34]\\d\\d)|91(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79]))))\\d{3}|(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|3(?:[0-3589]\\d|4[0-578]|6[1-9]|7[0-35-9])|7(?:[013-57-9]\\d|2[0-8])|8(?:55|6[0-8]|[78]\\d|9[02-9]))\\d{6}", [9]], ["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, ["163\\d{2,6}", [5, 6, 7, 8, 9]], ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], "AW": ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]]], "AX": ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", [5, 6, 7, 8, 9, 10, 11, 12], 0, "0", 0, 0, 0, 0, "18", 0, "00"], "AZ": ["994", "00", "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], "0"], "BA": ["387", "00", "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], "0"], "BB": ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "246$1", 0, "246"], "BD": ["880", "00", "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"], ["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|2[23]"], "0$1"], ["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]], "0"], "BE": ["32", "00", "4\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], "0"], "BF": ["226", "00", "[024-7]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[024-7]"]]]], "BG": ["359", "00", "00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", [6, 7, 8, 9, 12], [["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], ["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], "0"], "BH": ["973", "00", "[136-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[02-4679]"]]]], "BI": ["257", "00", "(?:[267]\\d|31)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]]], "BJ": ["229", "00", "(?:01\\d|8)\\d{7}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["0"]]]], "BL": ["590", "00", "7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [["(?:59(?:0(?:2[7-9]|3[3-7]|5[12]|87)|87\\d)|80[6-9]\\d\\d)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], ["8[129]\\d{7}"], 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], "BM": ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "441$1", 0, "441"], "BN": ["673", "00", "[2-578]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]]], "BO": ["591", "00(?:1\\d)?", "(?:[2-7]\\d\\d|8001)\\d{5}", [8, 9], [["(\\d)(\\d{7})", "$1 $2", ["[23]|4[46]|50"]], ["(\\d{8})", "$1", ["[5-7]"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, "0(1\\d)?"], "BQ": ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]"], "BR": ["55", "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "[1-467]\\d{9,10}|55[0-46-9]\\d{8}|[34]\\d{7}|55\\d{7,8}|(?:5[0-46-9]|[89]\\d)\\d{7,9}", [8, 9, 10, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37|86)", "300|4(?:0(?:0|20)|370|864)"]], ["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)"], ["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"]], "0", 0, "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2"], "BS": ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([3-8]\\d{6})$|1", "242$1", 0, "242"], "BT": ["975", "00", "[178]\\d{7}|[2-8]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-6]|7[246]|8[2-4]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|[78]"]]]], "BW": ["267", "00", "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["90"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-9]"]], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]]]], "BY": ["375", "810", "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"], ["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"], ["(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]], "8", 0, "0|80?", 0, 0, 0, 0, "8~10"], "BZ": ["501", "00", "(?:0800\\d|[2-8])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], ["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]]], "CA": ["1", "011", "[2-9]\\d{9}|3\\d{6}", [7, 10], 0, "1", 0, 0, 0, 0, 0, [["(?:2(?:04|[23]6|[48]9|5[07]|[67]3)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}", [10]], ["", [10]], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", [10]], ["900[2-9]\\d{6}", [10]], ["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:2[125-9]|3[23]|44|66|77|88)|6(?:22|33))[2-9]\\d{6}", [10]], 0, ["310\\d{4}", [7]], 0, ["600[2-9]\\d{6}", [10]]]], "CC": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [["8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", [9]], ["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], "CD": ["243", "00", "(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["5"], "0$1"]], "0"], "CF": ["236", "00", "8776\\d{4}|(?:[27]\\d|61)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[26-8]"]]]], "CG": ["242", "00", "222\\d{6}|(?:0\\d|80)\\d{7}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]]], "CH": ["41", "00", "8\\d{11}|[2-9]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]], "0"], "CI": ["225", "00", "[02]\\d{9}", [10], [["(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]]]], "CK": ["682", "00", "[2-578]\\d{4}", [5], [["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]]], "CL": ["56", "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", [9, 10, 11], [["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["60|809"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9(?:10|[2-9])"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-8]|[1-9])"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]]], "CM": ["237", "00", "[26]\\d{8}|88\\d{6,7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]]]], "CN": ["86", "00|1(?:[12]\\d|79)\\d\\d00", "(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]", "(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"], "0$1"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", 1], ["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1]], "0", 0, "(1(?:[12]\\d|79)\\d\\d)|0", 0, 0, 0, 0, "00"], "CO": ["57", "00(?:4(?:[14]4|56)|[579])", "(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["46"]], ["(\\d{3})(\\d{7})", "$1 $2", ["6|90"], "($1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3[0-357]|9[14]"]], ["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"]], "0", 0, "0([3579]|4(?:[14]4|56))?"], "CR": ["506", "00", "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", [8, 10], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]]], 0, 0, "(19(?:0[0-2468]|1[09]|20|66|77|99))"], "CU": ["53", "119", "(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}", [6, 7, 8, 10], [["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"], ["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["[56]"], "0$1"], ["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]], "0"], "CV": ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]]], "CW": ["599", "00", "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], 0, 0, 0, 0, 0, "[69]"], "CX": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", [9]], ["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], "CY": ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]]], "CZ": ["420", "00", "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", [9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]]], "DE": ["49", "00", "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], ["(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"], ["(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"], ["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"], ["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"], ["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"], ["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], ["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["15[03568]", "15(?:[0568]|3[13])"], "0$1"], ["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"], ["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"], ["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]], "0"], "DJ": ["253", "00", "(?:2\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]]], "DK": ["45", "00", "[2-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]]], "DM": ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "767$1", 0, "767"], "DO": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8001|8[024]9"], "DZ": ["213", "00", "(?:[1-4]|[5-79]\\d|80)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]], "0"], "EC": ["593", "00", "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", [8, 9, 10, 11], [["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], "0"], "EE": ["372", "00", "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]], ["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]], "EG": ["20", "00", "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", [8, 9, 10], [["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], ["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{8})", "$1 $2", ["1"], "0$1"]], "0"], "EH": ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, 0, [["528[89]\\d{5}"], ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[016-8]\\d|2[0-8]|3[01]|5[0-5]))\\d{6}"], ["80[0-7]\\d{6}"], ["89\\d{7}"], 0, 0, 0, 0, ["(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}"]]], "ER": ["291", "00", "[178]\\d{6}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], "0"], "ES": ["34", "00", "(?:400|[5-9]\\d\\d)\\d{6}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[4-9]"]]]], "ET": ["251", "00", "(?:11|[2-57-9]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-57-9]"], "0$1"]], "0"], "FI": ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{5})", "$1", ["20[2-59]"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]0|[68])0|70[07-9]"], "0$1"], ["(\\d{2})(\\d{4,8})", "$1 $2", ["[14]|2[09]|50|7[135]"], "0$1"], ["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"], ["(\\d)(\\d{4,9})", "$1 $2", ["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"]], "0", 0, 0, 0, 0, "1[03-79]|[2-9]", 0, "00"], "FJ": ["679", "0(?:0|52)", "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "FK": ["500", "00", "[2-7]\\d{4}", [5]], "FM": ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]]], "FO": ["298", "00", "[2-9]\\d{5}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-9]"]]], 0, 0, "(10(?:01|[12]0|88))"], "FR": ["33", "00", "[1-9]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], "0"], "GA": ["241", "00", "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", [7, 8], [["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"]], 0, 0, "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})", "$1"], "GB": ["44", "00", "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", [7, 9, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]], "0", 0, "0|180020", 0, 0, 0, [["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0-5])|4(?:(?:[0-5]\\d|70)\\d|69[7-9])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|5[01]))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-3]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", [9, 10]], ["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]], ["56\\d{8}", [10]]], 0, " x"], "GD": ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "473$1", 0, "473"], "GE": ["995", "00", "(?:[3-57]\\d\\d|800)\\d{6}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]], "0"], "GF": ["594", "00", "(?:694\\d|7093)\\d{5}|(?:59|[89]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]|80[6-9]|9[47]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[89]"], "0$1"]], "0"], "GG": ["44", "00", "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", [7, 9, 10], 0, "0", 0, "([25-9]\\d{5})$|0|180020", "1481$1", 0, 0, [["1481[25-9]\\d{5}", [10]], ["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]], ["56\\d{8}", [10]]]], "GH": ["233", "00", "[235]\\d{8}|800\\d{5,6}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2358]"], "0$1"]], "0"], "GI": ["350", "00", "(?:[25]\\d|60)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["2"]]]], "GL": ["299", "00", "(?:19|[2-689]\\d|70)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]]], "GM": ["220", "00", "[48]\\d{8}|[2-9]\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|4(?:[0-35]|4[16-9])"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]"]]]], "GN": ["224", "00", "722\\d{6}|(?:3|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]]], "GP": ["590", "00", "7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-79]|80[6-9]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [["(?:59(?:0(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)|87\\d)|80[6-9]\\d\\d)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], ["8[129]\\d{7}"], 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], "GQ": ["240", "00", "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], ["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]]], "GR": ["30", "00", "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}", [10, 11, 12], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], ["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]], ["(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]]]], "GT": ["502", "00", "80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-8]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]], "GU": ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "671$1", 0, "671"], "GW": ["245", "00", "[49]\\d{8}|4\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["40"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]]], "GY": ["592", "001", "(?:[2-8]\\d{3}|9008)\\d{3}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]], "HK": ["852", "00(?:30|5[09]|[126-9]?)", "8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}", [5, 6, 7, 8, 9, 11], [["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "HN": ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]]], "HR": ["385", "00", "[2-69]\\d{8}|80\\d{5,7}|[1-79]\\d{7}|6\\d{6}", [7, 8, 9], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["6[01]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6|7[245]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-57]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], "0"], "HT": ["509", "00", "[2-589]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-589]"]]]], "HU": ["36", "00", "[235-7]\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"]], "06"], "ID": ["62", "00[89]", "00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}", [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], ["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], ["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], ["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], ["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], ["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], ["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]], "0"], "IE": ["353", "00", "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], ["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"], ["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], "IL": ["972", "0(?:0|1(?:05|[2-9]))", "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", [7, 8, 9, 10, 11, 12], [["(\\d{4})(\\d{3})", "$1-$2", ["125"]], ["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]], ["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]], ["(\\d{4})(\\d{6})", "$1-$2", ["159"]], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], ["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]], "0"], "IM": ["44", "00", "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([25-8]\\d{5})$|0|180020", "1624$1", 0, "74576|(?:16|7[56])24"], "IN": ["91", "00", "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", [8, 9, 10, 11, 12, 13], [["(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], 0, 1], ["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-6]|80[2-46]", "11|2[02]|33|4[04]|79[1-6]|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9]))|80(?:[2-4]|6[0-589])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31)|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:3171|5[15][2-6]|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|8(?:16|2[014]|3[126]|6[136]|7[78]|83)(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", 1], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|3[129]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7(?:[23569]|8[0-57-9])|8[1-6])|7(?:1(?:[013-8]|9[6-9])|3(?:17|2[0-49]|9[2-57])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|8(?:28[235-7]|3))|73179|807(?:1|9[1-3])|(?:1552|6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578])\\d|7(?:[23569]\\d|8[0-57-9])|8(?:[14-6]\\d|2[0-79]))|7(?:1(?:[013-8]\\d|9[6-9])|3(?:2[0-49]|9[2-57])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", 1], ["(\\d{5})(\\d{5})", "$1 $2", ["16|[6-9]"], "0$1", 1], ["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["18[06]", "18[06]0"], 0, 1], ["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1]], "0"], "IO": ["246", "00", "3\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["3"]]]], "IQ": ["964", "00", "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"], "IR": ["98", "00", "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", [4, 5, 6, 7, 10], [["(\\d{4,5})", "$1", ["96"], "0$1"], ["(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]], "0"], "IS": ["354", "00|1(?:0(?:01|[12]0)|100)", "(?:38\\d|[4-9])\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "IT": ["39", "00", "0\\d{5,11}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?", [6, 7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], ["(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]], ["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], ["(\\d{4})(\\d{4})", "$1 $2", ["894"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]|43"]], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]], ["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[03]"]]], 0, 0, 0, 0, 0, 0, [["0(?:669[0-79]\\d{1,6}|831\\d{2,8})|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[2356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"], ["3[2-9]\\d{7,8}|(?:31|43)\\d{8}", [9, 10]], ["80(?:0\\d{3}|3)\\d{3}", [6, 9]], ["(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", [6, 8, 9, 10]], ["1(?:78\\d|99)\\d{6}", [9, 10]], ["3[2-8]\\d{9,10}", [11, 12]], 0, 0, ["55\\d{8}", [10]], ["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]]]], "JE": ["44", "00", "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([0-24-8]\\d{5})$|0|180020", "1534$1", 0, 0, [["1534[0-24-8]\\d{5}"], ["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}"], ["80(?:07(?:35|81)|8901)\\d{4}"], ["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"], ["701511\\d{4}"], 0, ["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}"], ["56\\d{8}"]]], "JM": ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876"], "JO": ["962", "00", "(?:(?:[2689]|7\\d)\\d|32|427|53)\\d{6}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[47]"], "0$1"]], "0"], "JP": ["81", "010", "00[1-9]\\d{6,14}|[25-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], ["(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]", "3|4(?:2(?:0|9[02-69])|7(?:0[019]|1))|6[1-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[25-9]"], "0$1"]], "0", 0, "(000[2569]\\d{4,6})$|(?:(?:003768)0?)|0", "$1"], "KE": ["254", "000", "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", [7, 8, 9, 10], [["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0"], "KG": ["996", "00", "8\\d{9}|[235-9]\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"], ["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], "KH": ["855", "00[14-9]", "1\\d{9}|[1-9]\\d{7,8}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], "KI": ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0"], "KM": ["269", "00", "[3478]\\d{6}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]]], "KN": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "869$1", 0, "869"], "KP": ["850", "00|99", "85\\d{6}|(?:19\\d|[2-7])\\d{7}", [8, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]], "0"], "KR": ["82", "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", [5, 6, 8, 9, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"], ["(\\d{4})(\\d{4})", "$1-$2", ["1"]], ["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[36]0|8"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"]], "0", 0, "0(8(?:[1-46-8]|5\\d\\d))?"], "KW": ["965", "00", "18\\d{5}|(?:[2569]\\d|41)\\d{6}", [7, 8], [["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], ["(\\d{3})(\\d{5})", "$1 $2", ["[245]"]]]], "KY": ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "345$1", 0, "345"], "KZ": ["7", "810", "8\\d{13}|[78]\\d{9}", [10, 14], 0, "8", 0, 0, 0, 0, "7", 0, "8~10"], "LA": ["856", "00", "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["3"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0"], "LB": ["961", "00", "[27-9]\\d{7}|[13-9]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-6]|9[04-9])|8[02-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]]], "0"], "LC": ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "([2-8]\\d{6})$|1", "758$1", 0, "758"], "LI": ["423", "00", "[68]\\d{8}|(?:[2378]\\d|90)\\d{5}", [7, 9], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], "0", 0, "(1001)|0"], "LK": ["94", "00", "[1-9]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]], "0"], "LR": ["231", "00", "(?:[2457]\\d|33|88)\\d{7}|(?:2\\d|[4-6])\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["4[67]|[56]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-578]"], "0$1"]], "0"], "LS": ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]]], "LT": ["370", "00", "(?:[3469]\\d|52|[78]0)\\d{6}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(0-$1)", 1], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0 $1", 1], ["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(0-$1)", 1], ["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(0-$1)", 1]], "0", 0, "[08]"], "LU": ["352", "00", "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", [4, 5, 6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["20"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["20"]]], 0, 0, "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"], "LV": ["371", "00", "(?:[268]\\d|78|90)\\d{6}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2679]|8[01]"]]]], "LY": ["218", "00", "[2-9]\\d{8}", [9], [["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], "0"], "MA": ["212", "00", "[5-8]\\d{8}", [9], [["(\\d{4})(\\d{5})", "$1-$2", ["892"], "0$1"], ["(\\d{2})(\\d{7})", "$1-$2", ["8(?:0[0-7]|9)"], "0$1"], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[5-8]"], "0$1"]], "0", 0, 0, 0, 0, "[5-8]"], "MC": ["377", "00", "(?:[3489]|[67]\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[67]"], "0$1"]], "0"], "MD": ["373", "00", "(?:[235-7]\\d|[89]0)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]], "0"], "ME": ["382", "00", "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]], "0"], "MF": ["590", "00", "7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [["(?:59(?:0(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)|87\\d)|80[6-9]\\d\\d)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], ["8[129]\\d{7}"], 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], "MG": ["261", "00", "[23]\\d{8}", [9], [["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, "([24-9]\\d{6})$|0", "20$1"], "MH": ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], "1"], "MK": ["389", "00", "[2-578]\\d{7}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2|34[47]|4(?:[37]7|5[47]|64)"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], "0"], "ML": ["223", "00", "[24-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]]], "MM": ["95", "00", "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", [6, 7, 8, 9, 10], [["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["4(?:[2-46]|5[3-5])|5|6(?:[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-5]|(?:60|86)[23]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|452|678|86", "[12]|452|6788|86"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"], ["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"], ["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]], "0"], "MN": ["976", "001", "[12]\\d{7,9}|[5-9]\\d{7}", [8, 9, 10], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["11|2[16]"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[5-9]"]], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]], "0"], "MO": ["853", "00", "0800\\d{3}|(?:28|[68]\\d)\\d{6}", [7, 8], [["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]]], "MP": ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "670$1", 0, "670"], "MQ": ["596", "00", "7091\\d{5}|(?:[56]9|[89]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-79]|8(?:0[6-9]|[36])"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], "MR": ["222", "00", "(?:[2-4]\\d\\d|800)\\d{5}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]]], "MS": ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "([34]\\d{6})$|1", "664$1", 0, "664"], "MT": ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]]], "MU": ["230", "0(?:0|[24-7]0|3[03])", "(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[57]"]], ["(\\d{5})(\\d{5})", "$1 $2", ["8"]]], 0, 0, 0, 0, 0, 0, 0, "020"], "MV": ["960", "0(?:0|19)", "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", [7, 10], [["(\\d{3})(\\d{4})", "$1-$2", ["[34679]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "MW": ["265", "00", "(?:[1289]\\d|31|77)\\d{7}|1\\d{6}", [7, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-37-9]"], "0$1"]], "0"], "MX": ["52", "0[09]", "[2-9]\\d{9}", [10], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "MY": ["60", "00", "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1(?:[367]|80)"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]], "0"], "MZ": ["258", "00", "(?:2|8\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]], "NA": ["264", "00", "[68]\\d{7,8}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"], "NC": ["687", "00", "(?:050|[2-57-9]\\d\\d)\\d{3}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]]], "NE": ["227", "00", "[027-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[0467]"]]]], "NF": ["672", "00", "[13]\\d{5}", [6], [["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]], ["(\\d)(\\d{5})", "$1 $2", ["[13]"]]], 0, 0, "([0-258]\\d{4})$", "3$1"], "NG": ["234", "009", "(?:20|9\\d)\\d{8}|[78]\\d{9,13}", [10, 11, 12, 13, 14], [["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["20[129]"], "0$1"], ["(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]], "0"], "NI": ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]]], "NL": ["31", "00", "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}", [5, 6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], ["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"], ["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]], "0"], "NO": ["47", "00", "(?:0|[2-9]\\d{3})\\d{4}", [5, 8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]"]]], 0, 0, 0, 0, 0, "[02-689]|7[0-8]"], "NP": ["977", "00", "(?:1\\d|9)\\d{9}|[1-9]\\d{7}", [8, 10, 11], [["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], ["(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"], "0$1"], ["(\\d{3})(\\d{7})", "$1-$2", ["9"]]], "0"], "NR": ["674", "00", "(?:222|444|(?:55|8\\d)\\d|666|777|999)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[24-9]"]]]], "NU": ["683", "00", "(?:[4-7]|888\\d)\\d{3}", [4, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["8"]]]], "NZ": ["64", "0(?:0|161)", "[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-79]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|8|90", "50(?:[0367]|88)|8|90"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[589]"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "00"], "OM": ["968", "00", "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}", [7, 8, 9], [["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], ["(\\d{2})(\\d{6})", "$1 $2", ["2"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]]], "PA": ["507", "00", "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}", [7, 8, 10, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], ["(\\d{4})(\\d{4})", "$1-$2", ["[68]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]]], "PE": ["51", "00|19(?:1[124]|77|90)00", "(?:[14-8]|9\\d)\\d{7}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, 0, "00", " Anexo "], "PF": ["689", "00", "4\\d{5}(?:\\d{2})?|8\\d{7,8}", [6, 8, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]]], "PG": ["675", "00|140[1-3]", "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85[02-46-9]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "PH": ["63", "00", "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}", [6, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"], ["(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], ["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], "0"], "PK": ["92", "00", "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["1"]], ["(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"], ["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], ["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]], "0"], "PL": ["48", "00", "(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{5})", "$1", ["19"]], ["(\\d{3})(\\d{3})", "$1 $2", ["11|20|64"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["30|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "30|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]]]], "PM": ["508", "00", "[78]\\d{8}|[2-9]\\d{5}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], "PR": ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939"], "PS": ["970", "00", "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], "PT": ["351", "00", "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]]]], "PW": ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]], "PY": ["595", "00", "[36-8]\\d{5,8}|4\\d{6,8}|59\\d{6}|9\\d{5,10}|(?:2\\d|5[0-8])\\d{6,7}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["3[289]|4[246-8]|61|7[1-3]|8[1-36]"], "(0$1)"], ["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]], ["(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-7])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]], "0"], "QA": ["974", "00", "800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}", [7, 8, 9, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["2[136]|8"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[3-7]"]]]], "RE": ["262", "00", "709\\d{6}|(?:26|[689]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[26-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["2631[0-6]\\d{4}|26(?:2\\d|30|88)\\d{5}"], ["(?:69(?:2\\d\\d|3(?:[06][0-6]|1[0-3]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))|7092[0-3])\\d{4}"], ["80\\d{7}"], ["89[1-37-9]\\d{6}"], 0, 0, 0, 0, ["9(?:399[0-3]|479[0-6]|76(?:2[278]|3[0-37]))\\d{4}"], ["8(?:1[019]|2[0156]|84|90)\\d{6}"]]], "RO": ["40", "00", "(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}", [6, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], ["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[236-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, " int "], "RS": ["381", "00", "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", [6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"], ["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]], "0"], "RU": ["7", "810", "8\\d{13}|[347-9]\\d{9}", [10, 14], [["(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", 1], ["(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", 1], ["(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]], "8", 0, 0, 0, 0, "[3489]", 0, "8~10"], "RW": ["250", "00", "(?:06|[27]\\d\\d|[89]00)\\d{6}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"]], "0"], "SA": ["966", "00", "(?:[15]\\d|800|92)\\d{7}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["9"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], "0"], "SB": ["677", "0[01]", "[6-9]\\d{6}|[1-6]\\d{4}", [5, 7], [["(\\d{2})(\\d{5})", "$1 $2", ["6[89]|7|8[4-9]|9(?:[0-8]|9[0-8])"]]]], "SC": ["248", "010|0[0-2]", "(?:[2489]\\d|64)\\d{5}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "SD": ["249", "00", "[19]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], "0"], "SE": ["46", "00", "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", [6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44|9)"], "0$1", 0, "$1 $2"], ["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"], ["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"], ["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"]], "0"], "SG": ["65", "0[0-3]\\d", "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-9]|[1-9])"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]], "SH": ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]"], "SI": ["386", "00|10(?:22|66|88|99)", "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", [5, 6, 7, 8], [["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[013]|51|6"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, 0, "00"], "SJ": ["47", "00", "0\\d{4}|(?:[489]\\d|79)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79"], "SK": ["421", "00", "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", [6, 7, 9], [["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[3-5]"], "0$1"]], "0"], "SL": ["232", "00", "(?:[237-9]\\d|66)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], "0"], "SM": ["378", "00", "(?:0549|[5-7]\\d)\\d{6}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], ["(\\d{4})(\\d{6})", "$1 $2", ["0"]]], 0, 0, "([89]\\d{5})$", "0549$1"], "SN": ["221", "00", "(?:[378]\\d|93)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]]], "SO": ["252", "00", "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", [6, 7, 8, 9], [["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], ["(\\d{6})", "$1", ["[134]"]], ["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]], ["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|9[2-9]"]], ["(\\d)(\\d{7})", "$1 $2", ["[267]|904"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[346-9]"]]], "0"], "SR": ["597", "00", "(?:[2-5]|[6-9]\\d)\\d{5}", [6, 7], [["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], ["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]], ["(\\d{3})(\\d{4})", "$1-$2", ["[6-9]"]]]], "SS": ["211", "00", "[19]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], "0"], "ST": ["239", "00", "(?:22|9\\d)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]]], "SV": ["503", "00", "[25-7]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?", [7, 8, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[25-7]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]]], "SX": ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "(5\\d{6})$|1", "721$1", 0, "721"], "SY": ["963", "00", "[1-359]\\d{8}|[1-5]\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-4]|5[1-3]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[59]"], "0$1", 1]], "0"], "SZ": ["268", "00", "0800\\d{4}|(?:[237]\\d|900)\\d{6}", [8, 9], [["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], ["(\\d{5})(\\d{4})", "$1 $2", ["9"]]]], "TA": ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"], "TC": ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "([2-479]\\d{6})$|1", "649$1", 0, "649"], "TD": ["235", "00|16", "(?:22|[3689]\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[236-9]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "TG": ["228", "00", "[279]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]]], "TH": ["66", "00[1-9]", "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}", [8, 9, 10, 13], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], "TJ": ["992", "810", "(?:[0-57-9]\\d|66)\\d{7}", [9], [["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["44[02-479]|[34]7"]], ["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3(?:[1245]|3[12])"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["\\d"]]], 0, 0, 0, 0, 0, 0, 0, "8~10"], "TK": ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7]], "TL": ["670", "00", "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], ["(\\d{4})(\\d{4})", "$1 $2", ["7"]]]], "TM": ["993", "810", "[1-7]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[67]"], "8 $1"]], "8", 0, 0, 0, 0, 0, 0, "8~10"], "TN": ["216", "00", "[2-57-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]]], "TO": ["676", "00", "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}", [5, 7], [["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]], ["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]]]], "TR": ["90", "00", "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}", [7, 10, 12, 13], [["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1], ["(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", 1]], "0"], "TT": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-46-8]\\d{6})$|1", "868$1", 0, "868"], "TV": ["688", "00", "(?:2|7\\d\\d|90)\\d{4}", [5, 6, 7], [["(\\d{2})(\\d{3})", "$1 $2", ["2"]], ["(\\d{2})(\\d{4})", "$1 $2", ["90"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]], "TW": ["886", "0(?:0[25-79]|19)", "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", [7, 8, 9, 10, 11], [["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["826"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["83"], "0$1"], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["82"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[25]0|37|49|8[09]"], "0$1"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-478])|7[1-9]", "[23568]|4(?:0[2-48]|[1-478])|(?:400|7)[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, "#"], "TZ": ["255", "00[056]", "(?:[25-8]\\d|41|90)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["5"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]], "0"], "UA": ["380", "00", "[89]\\d{9}|[3-9]\\d{8}", [9, 10], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|89|9[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "0~0"], "UG": ["256", "00[057]", "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", [9], [["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024", "20240"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["20[0-35-7]|4(?:6[45]|[7-9])|[7-9]", "20(?:[0135-7]|2[5-9])|4(?:6[45]|[7-9])|[7-9]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[2-4]"], "0$1"]], "0"], "US": ["1", "011", "[2-9]\\d{9}|3\\d{6}", [10], [["(\\d{3})(\\d{4})", "$1-$2", ["310"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]], "1", 0, 0, 0, 0, 0, [["983[2-57-9]\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[02469]|8[13])|3(?:0[1-57-9]|1[02-9]|2[013-79]|3[0-24679]|4[167]|5[0-3]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[02589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-269])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-2478]|4[0378]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[0168]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}"], [""], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"], ["900[2-9]\\d{6}"], ["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|3[23]|44|66|77|88)[2-9]\\d{6}"]]], "UY": ["598", "0(?:0|1[3-9]\\d)", "0004\\d{2,9}|[1249]\\d{7}|2\\d{3,4}|(?:[49]\\d|80)\\d{5}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d{4,5})", "$1", ["21"]], ["(\\d{3})(\\d{3,4})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[49]0|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[124]"]], ["(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3 $4", ["0"]]], "0", 0, 0, 0, 0, 0, 0, "00", " int. "], "UZ": ["998", "00", "(?:20|33|[5-9]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-9]"]]]], "VA": ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11, 12], 0, 0, 0, 0, 0, 0, "06698"], "VC": ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "784$1", 0, "784"], "VE": ["58", "00", "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", [10], [["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]], "0"], "VG": ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-578]\\d{6})$|1", "284$1", 0, "284"], "VI": ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "340$1", 0, "340"], "VN": ["84", "00", "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{6,7}|7\\d{6}", [7, 8, 9, 10], [["(\\d{4})(\\d{4,6})", "$1 $2", ["1(?:2[02]|[89])"], 0, 1], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[26]|6"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1357-9]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1]], "0"], "VU": ["678", "00", "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", [5, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]]], "WF": ["681", "00", "(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[47-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]]], "WS": ["685", "0", "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", [5, 6, 7, 10], [["(\\d{5})", "$1", ["[2-5]|6[1-9]"]], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]], "XK": ["383", "00", "2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2|39"], "0$1"], ["(\\d{2})(\\d{7,10})", "$1 $2", ["3"], "0$1"]], "0"], "YE": ["967", "00", "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7(?:[24-6]|8[0-7])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], "0"], "YT": ["262", "00", "(?:639\\d|7093)\\d{5}|(?:26|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [["26(?:89\\d|9(?:0[0-467]|15|5[0-4]|6\\d|[78]0))\\d{4}"], ["(?:639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])|7093[5-7])\\d{4}"], ["80\\d{7}"], 0, 0, 0, 0, 0, ["9(?:(?:39|47)8[01]|769\\d)\\d{4}"]]], "ZA": ["27", "00", "[1-79]\\d{8}|8\\d{4,9}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"], "ZM": ["260", "00", "800\\d{6}|(?:21|[579]\\d|63)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[579]"], "0$1"]], "0"], "ZW": ["263", "00", "(?:13|8\\d{4})\\d{5}|[235-8]\\d{8}|[23568]\\d{6}", [7, 9, 10], [["(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|29|58)|67[0-46-9]|(?:55|68)[0-69]"], "0$1"], ["(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|[27]|48)|37|675|(?:55|68)[78]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"], ["(\\d{4})(\\d{3,5})", "$1 $2", ["548"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[256]|39|8[13-59]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["3"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"]], "0"] }, "nonGeographic": { "800": ["800", 0, "(?:00|[1-9]\\d)\\d{6}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]], 0, 0, 0, 0, 0, 0, [0, 0, ["(?:00|[1-9]\\d)\\d{6}"]]], "808": ["808", 0, "[1-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]]], "870": ["870", 0, "7\\d{11}|[235-7]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"], 0, 0, 0, 0, 0, 0, ["2\\d{8}", [9]]]], "878": ["878", 0, "10\\d{10}", [12], [["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]]], "881": ["881", 0, "6\\d{9}|[0-36-9]\\d{8}", [9, 10], [["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-37-9]"]], ["(\\d)(\\d{3})(\\d{5,6})", "$1 $2 $3", ["6"]]], 0, 0, 0, 0, 0, 0, [0, ["6\\d{9}|[0-36-9]\\d{8}"]]], "882": ["882", 0, "[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], ["(\\d{2})(\\d{6})", "$1 $2", ["49"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1[36]|9"]], ["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|23|3(?:[15]|4[57])|4|5[12]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]], ["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-35]"]]], 0, 0, 0, 0, 0, 0, [0, ["342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|5(?:0\\d{3}|2[0-2]))\\d{7}", [7, 8, 9, 10, 12]], 0, 0, 0, ["348[57]\\d{7}", [11]], 0, 0, ["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}"]]], "883": ["883", 0, "(?:[1-4]\\d|51)\\d{6,10}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,8})", "$1 $2 $3", ["[14]|2[24-689]|3[02-689]|51[24-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["21"]], ["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[235]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}"]]], "888": ["888", 0, "\\d{11}", [11], [["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, ["\\d{11}"]]], "979": ["979", 0, "[1359]\\d{8}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, ["[1359]\\d{8}"]]] } };

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/min/exports/withMetadataArgument.js
function withMetadataArgument(func, _arguments) {
  var args = Array.prototype.slice.call(_arguments);
  args.push(metadata_min_json_default);
  return func.apply(this, args);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/tools/semver-compare.js
function semver_compare_default(a, b) {
  a = a.split("-");
  b = b.split("-");
  var pa = a[0].split(".");
  var pb = b[0].split(".");
  for (var i = 0; i < 3; i++) {
    var na = Number(pa[i]);
    var nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  if (a[1] && b[1]) {
    return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
  }
  return !a[1] && b[1] ? 1 : a[1] && !b[1] ? -1 : 0;
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/isObject.js
var objectConstructor = {}.constructor;
function isObject(object) {
  return object !== void 0 && object !== null && object.constructor === objectConstructor;
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/isCallingCode.js
var CALLING_CODE_REG_EXP = /^\d+$/;
function isCallingCode(string) {
  return CALLING_CODE_REG_EXP.test(string);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/metadata.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var V3 = "1.2.0";
var V4 = "1.7.35";
var DEFAULT_EXT_PREFIX = " ext. ";
var Metadata = /* @__PURE__ */ (function() {
  function Metadata2(metadata) {
    _classCallCheck(this, Metadata2);
    validateMetadata(metadata);
    this.metadata = metadata;
    setVersion.call(this, metadata);
  }
  return _createClass(Metadata2, [{
    key: "getCountries",
    value: function getCountries3() {
      return Object.keys(this.metadata.countries).filter(function(_) {
        return _ !== "001";
      });
    }
  }, {
    key: "getCountryMetadata",
    value: function getCountryMetadata(countryCode) {
      return this.metadata.countries[countryCode];
    }
  }, {
    key: "nonGeographic",
    value: function nonGeographic() {
      if (this.v1 || this.v2 || this.v3) return;
      return this.metadata.nonGeographic || this.metadata.nonGeographical;
    }
  }, {
    key: "hasCountry",
    value: function hasCountry(country) {
      return this.getCountryMetadata(country) !== void 0;
    }
  }, {
    key: "hasCallingCode",
    value: function hasCallingCode(callingCode) {
      if (this.getCountryCodesForCallingCode(callingCode)) {
        return true;
      }
      if (this.nonGeographic()) {
        if (this.nonGeographic()[callingCode]) {
          return true;
        }
      } else {
        var countryCodes = this.countryCallingCodes()[callingCode];
        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") {
          return true;
        }
      }
    }
  }, {
    key: "isNonGeographicCallingCode",
    value: function isNonGeographicCallingCode(callingCode) {
      if (this.nonGeographic()) {
        return this.nonGeographic()[callingCode] ? true : false;
      } else {
        return this.getCountryCodesForCallingCode(callingCode) ? false : true;
      }
    }
    // Deprecated.
  }, {
    key: "country",
    value: function country(countryCode) {
      return this.selectNumberingPlan(countryCode);
    }
    /**
     * Selects a telephone numbering plan based on either a country code or a calling code.
     * @param {string} argument — Country code or calling code.
     * @param {string} legacyArgumentCallingCode — Legacy argument: calling code, if the first argument is not passed.
     */
  }, {
    key: "selectNumberingPlan",
    value: function selectNumberingPlan(argument, legacyArgumentCallingCode) {
      var countryCode;
      var callingCode;
      if (argument) {
        if (isCallingCode(argument)) {
          callingCode = argument;
        } else {
          countryCode = argument;
        }
      }
      if (legacyArgumentCallingCode) {
        callingCode = legacyArgumentCallingCode;
      }
      if (countryCode && countryCode !== "001") {
        var countryMetadata = this.getCountryMetadata(countryCode);
        if (!countryMetadata) {
          throw new Error("Unknown country: ".concat(countryCode));
        }
        this.numberingPlan = new NumberingPlan(countryMetadata, this);
      } else if (callingCode) {
        if (!this.hasCallingCode(callingCode)) {
          throw new Error("Unknown calling code: ".concat(callingCode));
        }
        this.numberingPlan = new NumberingPlan(this.getNumberingPlanMetadata(callingCode), this);
      } else {
        this.numberingPlan = void 0;
      }
      return this;
    }
  }, {
    key: "getCountryCodesForCallingCode",
    value: function getCountryCodesForCallingCode(callingCode) {
      var countryCodes = this.countryCallingCodes()[callingCode];
      if (countryCodes) {
        if (countryCodes.length === 1 && countryCodes[0].length === 3) {
          return;
        }
        return countryCodes;
      }
    }
  }, {
    key: "getCountryCodeForCallingCode",
    value: function getCountryCodeForCallingCode(callingCode) {
      var countryCodes = this.getCountryCodesForCallingCode(callingCode);
      if (countryCodes) {
        return countryCodes[0];
      }
    }
  }, {
    key: "getNumberingPlanMetadata",
    value: function getNumberingPlanMetadata(callingCode) {
      var countryCode = this.getCountryCodeForCallingCode(callingCode);
      if (countryCode) {
        return this.getCountryMetadata(countryCode);
      }
      if (this.nonGeographic()) {
        var metadata = this.nonGeographic()[callingCode];
        if (metadata) {
          return metadata;
        }
      } else {
        var countryCodes = this.countryCallingCodes()[callingCode];
        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") {
          return this.metadata.countries["001"];
        }
      }
    }
    // Deprecated.
  }, {
    key: "countryCallingCode",
    value: function countryCallingCode() {
      return this.numberingPlan.callingCode();
    }
    // Deprecated.
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      return this.numberingPlan.IDDPrefix();
    }
    // Deprecated.
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      return this.numberingPlan.defaultIDDPrefix();
    }
    // Deprecated.
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      return this.numberingPlan.nationalNumberPattern();
    }
    // Deprecated.
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      return this.numberingPlan.possibleLengths();
    }
    // Deprecated.
  }, {
    key: "formats",
    value: function formats() {
      return this.numberingPlan.formats();
    }
    // Deprecated.
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this.numberingPlan.nationalPrefixForParsing();
    }
    // Deprecated.
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.numberingPlan.nationalPrefixTransformRule();
    }
    // Deprecated.
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.numberingPlan.leadingDigits();
    }
    // Deprecated.
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      return this.numberingPlan.hasTypes();
    }
    // Deprecated.
  }, {
    key: "type",
    value: function type(_type) {
      return this.numberingPlan.type(_type);
    }
    // Deprecated.
  }, {
    key: "ext",
    value: function ext() {
      return this.numberingPlan.ext();
    }
  }, {
    key: "countryCallingCodes",
    value: function countryCallingCodes() {
      if (this.v1) return this.metadata.country_phone_code_to_countries;
      return this.metadata.country_calling_codes;
    }
    // Deprecated.
  }, {
    key: "chooseCountryByCountryCallingCode",
    value: function chooseCountryByCountryCallingCode(callingCode) {
      return this.selectNumberingPlan(callingCode);
    }
  }, {
    key: "hasSelectedNumberingPlan",
    value: function hasSelectedNumberingPlan() {
      return this.numberingPlan !== void 0;
    }
  }]);
})();
var NumberingPlan = /* @__PURE__ */ (function() {
  function NumberingPlan2(metadata, globalMetadataObject) {
    _classCallCheck(this, NumberingPlan2);
    this.globalMetadataObject = globalMetadataObject;
    this.metadata = metadata;
    setVersion.call(this, globalMetadataObject.metadata);
  }
  return _createClass(NumberingPlan2, [{
    key: "callingCode",
    value: function callingCode() {
      return this.metadata[0];
    }
    // When multiple countries share the same calling code,
    // all phone number formatting rules are included in the metadata
    // of the "default" country for that calling code.
    // Any other countries' metdata doesn't include any formatting rules.
    // Google developers said that such storage architecture was chosen for performance reasons.
    //
    // For example, for NANPA region ("North American Numbering Plan Administration",
    // which includes USA, Canada, Cayman Islands, Bahamas, etc) all formatting rules
    // are contained in the metadata of `US` country.
    //
    // This is not public API.
    //
  }, {
    key: "_getDefaultCountryMetadataForThisCallingCode",
    value: function _getDefaultCountryMetadataForThisCallingCode() {
      return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
    }
    // Deprecated.
  }, {
    key: "getDefaultCountryMetadataForRegion",
    value: function getDefaultCountryMetadataForRegion() {
      return this._getDefaultCountryMetadataForThisCallingCode();
    }
    // Is always present.
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[1];
    }
    // Is only present when a country supports multiple IDD prefixes.
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[12];
    }
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      if (this.v1 || this.v2) return this.metadata[1];
      return this.metadata[2];
    }
    // "possible length" data is always present in Google's metadata.
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.v1) return;
      return this.metadata[this.v2 ? 2 : 3];
    }
  }, {
    key: "_getFormats",
    value: function _getFormats(metadata) {
      return metadata[this.v1 ? 2 : this.v2 ? 3 : 4];
    }
    // For countries of the same region (e.g. NANPA)
    // formats are all stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "formats",
    value: function formats() {
      var _this = this;
      var formats2 = this._getFormats(this.metadata) || this._getFormats(this._getDefaultCountryMetadataForThisCallingCode()) || [];
      return formats2.map(function(_) {
        return new Format(_, _this);
      });
    }
  }, {
    key: "nationalPrefix",
    value: function nationalPrefix() {
      return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
    }
  }, {
    key: "_getNationalPrefixFormattingRule",
    value: function _getNationalPrefixFormattingRule(metadata) {
      return metadata[this.v1 ? 4 : this.v2 ? 5 : 6];
    }
    // For countries of the same region (e.g. NANPA)
    // national prefix formatting rule is stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this._getDefaultCountryMetadataForThisCallingCode());
    }
  }, {
    key: "_nationalPrefixForParsing",
    value: function _nationalPrefixForParsing() {
      return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this._nationalPrefixForParsing() || this.nationalPrefix();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
    }
  }, {
    key: "_getNationalPrefixIsOptionalWhenFormatting",
    value: function _getNationalPrefixIsOptionalWhenFormatting() {
      return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
    }
    // For countries of the same region (e.g. NANPA)
    // "national prefix is optional when formatting" flag is
    // stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this._getDefaultCountryMetadataForThisCallingCode());
    }
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
    }
  }, {
    key: "types",
    value: function types() {
      return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
    }
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      if (this.types() && this.types().length === 0) {
        return false;
      }
      return !!this.types();
    }
  }, {
    key: "type",
    value: function type(_type2) {
      if (this.hasTypes() && getType(this.types(), _type2)) {
        return new Type(getType(this.types(), _type2), this);
      }
    }
  }, {
    key: "ext",
    value: function ext() {
      if (this.v1 || this.v2) return DEFAULT_EXT_PREFIX;
      return this.metadata[13] || DEFAULT_EXT_PREFIX;
    }
  }]);
})();
var Format = /* @__PURE__ */ (function() {
  function Format2(format, metadata) {
    _classCallCheck(this, Format2);
    this._format = format;
    this.metadata = metadata;
  }
  return _createClass(Format2, [{
    key: "pattern",
    value: function pattern() {
      return this._format[0];
    }
  }, {
    key: "format",
    value: function format() {
      return this._format[1];
    }
  }, {
    key: "leadingDigitsPatterns",
    value: function leadingDigitsPatterns() {
      return this._format[2] || [];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._format[3] || this.metadata.nationalPrefixFormattingRule();
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
    value: function nationalPrefixIsMandatoryWhenFormattingInNationalFormat() {
      return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
    // Checks whether national prefix formatting rule contains national prefix.
  }, {
    key: "usesNationalPrefix",
    value: function usesNationalPrefix() {
      return this.nationalPrefixFormattingRule() && // Check that national prefix formatting rule is not a "dummy" one.
      !FIRST_GROUP_ONLY_PREFIX_PATTERN.test(this.nationalPrefixFormattingRule()) ? true : false;
    }
  }, {
    key: "internationalFormat",
    value: function internationalFormat() {
      return this._format[5] || this.format();
    }
  }]);
})();
var FIRST_GROUP_ONLY_PREFIX_PATTERN = /^\(?\$1\)?$/;
var Type = /* @__PURE__ */ (function() {
  function Type2(type, metadata) {
    _classCallCheck(this, Type2);
    this.type = type;
    this.metadata = metadata;
  }
  return _createClass(Type2, [{
    key: "pattern",
    value: function pattern() {
      if (this.metadata.v1) return this.type;
      return this.type[0];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.metadata.v1) return;
      return this.type[1] || this.metadata.possibleLengths();
    }
  }]);
})();
function getType(types, type) {
  switch (type) {
    case "FIXED_LINE":
      return types[0];
    case "MOBILE":
      return types[1];
    case "TOLL_FREE":
      return types[2];
    case "PREMIUM_RATE":
      return types[3];
    case "PERSONAL_NUMBER":
      return types[4];
    case "VOICEMAIL":
      return types[5];
    case "UAN":
      return types[6];
    case "PAGER":
      return types[7];
    case "VOIP":
      return types[8];
    case "SHARED_COST":
      return types[9];
  }
}
function validateMetadata(metadata) {
  if (!metadata) {
    throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
  }
  if (!isObject(metadata) || !isObject(metadata.countries)) {
    throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(isObject(metadata) ? "an object of shape: { " + Object.keys(metadata).join(", ") + " }" : "a " + typeOf(metadata) + ": " + metadata, "."));
  }
}
var typeOf = function typeOf2(_) {
  return _typeof(_);
};
function getCountryCallingCode(country, metadataJson) {
  var metadata = new Metadata(metadataJson);
  if (metadata.hasCountry(country)) {
    return metadata.selectNumberingPlan(country).countryCallingCode();
  }
  throw new Error("Unknown country: ".concat(country));
}
function isSupportedCountry(country, metadataJson) {
  return metadataJson.countries.hasOwnProperty(country);
}
function setVersion(metadata) {
  var version = metadata.version;
  if (typeof version === "number") {
    this.v1 = version === 1;
    this.v2 = version === 2;
    this.v3 = version === 3;
    this.v4 = version === 4;
  } else {
    if (!version) {
      this.v1 = true;
    } else if (semver_compare_default(version, V3) === -1) {
      this.v2 = true;
    } else if (semver_compare_default(version, V4) === -1) {
      this.v3 = true;
    } else {
      this.v4 = true;
    }
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/mergeArrays.js
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function() {
      return o >= r.length ? { done: true } : { done: false, value: r[o++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function mergeArrays(a, b) {
  var merged = a.slice();
  for (var _iterator = _createForOfIteratorHelperLoose(b), _step; !(_step = _iterator()).done; ) {
    var element = _step.value;
    if (a.indexOf(element) < 0) {
      merged.push(element);
    }
  }
  return merged.sort(function(a2, b2) {
    return a2 - b2;
  });
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js
function checkNumberLength(nationalNumber, country, metadata) {
  return checkNumberLengthForType(nationalNumber, void 0, country, metadata);
}
function checkNumberLengthForType(nationalNumber, type, country, metadata) {
  if (country) {
    metadata = new Metadata(metadata.metadata);
    metadata.selectNumberingPlan(country);
  }
  var type_info = metadata.type(type);
  var possible_lengths = type_info && type_info.possibleLengths() || metadata.possibleLengths();
  if (!possible_lengths) {
    return "IS_POSSIBLE";
  }
  if (type === "FIXED_LINE_OR_MOBILE") {
    if (!metadata.type("FIXED_LINE")) {
      return checkNumberLengthForType(nationalNumber, "MOBILE", country, metadata);
    }
    var mobile_type = metadata.type("MOBILE");
    if (mobile_type) {
      possible_lengths = mergeArrays(possible_lengths, mobile_type.possibleLengths());
    }
  } else if (type && !type_info) {
    return "INVALID_LENGTH";
  }
  var actual_length = nationalNumber.length;
  var minimum_length = possible_lengths[0];
  if (minimum_length === actual_length) {
    return "IS_POSSIBLE";
  }
  if (minimum_length > actual_length) {
    return "TOO_SHORT";
  }
  if (possible_lengths[possible_lengths.length - 1] < actual_length) {
    return "TOO_LONG";
  }
  return possible_lengths.indexOf(actual_length, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH";
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/isPossible.js
function isPossiblePhoneNumber(input, options, metadataJson) {
  if (options === void 0) {
    options = {};
  }
  var metadata = new Metadata(metadataJson);
  if (options.v2) {
    if (!input.countryCallingCode) {
      throw new Error("Invalid phone number object passed");
    }
    metadata.selectNumberingPlan(input.country || input.countryCallingCode);
  } else {
    if (!input.phone) {
      return false;
    }
    if (input.country) {
      if (!metadata.hasCountry(input.country)) {
        throw new Error("Unknown country: ".concat(input.country));
      }
      metadata.selectNumberingPlan(input.country);
    } else {
      if (!input.countryCallingCode) {
        throw new Error("Invalid phone number object passed");
      }
      metadata.selectNumberingPlan(input.countryCallingCode);
    }
  }
  if (metadata.possibleLengths()) {
    return isPossibleNumber(input.phone || input.nationalNumber, metadata);
  }
  if (input.countryCallingCode && metadata.isNonGeographicCallingCode(input.countryCallingCode)) {
    return true;
  }
  throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.');
}
function isPossibleNumber(nationalNumber, metadata) {
  switch (checkNumberLength(nationalNumber, void 0, metadata)) {
    case "IS_POSSIBLE":
      return true;
    // This library ignores "local-only" phone numbers (for simplicity).
    // See the readme for more info on what are "local-only" phone numbers.
    // case 'IS_POSSIBLE_LOCAL_ONLY':
    // 	return !isInternational
    default:
      return false;
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js
function matchesEntirely(text, regularExpressionText) {
  text = text || "";
  return new RegExp("^(?:" + regularExpressionText + ")$").test(text);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/getNumberType.js
function _createForOfIteratorHelperLoose2(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray2(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function() {
      return o >= r.length ? { done: true } : { done: false, value: r[o++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray2(r, a) : void 0;
  }
}
function _arrayLikeToArray2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var NON_FIXED_LINE_PHONE_TYPES = ["MOBILE", "PREMIUM_RATE", "TOLL_FREE", "SHARED_COST", "VOIP", "PERSONAL_NUMBER", "PAGER", "UAN", "VOICEMAIL"];
function getNumberType(input, options, metadataJson) {
  options = options || {};
  if (!input.country && !input.countryCallingCode) {
    return;
  }
  var metadata = new Metadata(metadataJson);
  metadata.selectNumberingPlan(input.country || input.countryCallingCode);
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
  if (!matchesEntirely(nationalNumber, metadata.nationalNumberPattern())) {
    return;
  }
  if (isNumberTypeEqualTo(nationalNumber, "FIXED_LINE", metadata)) {
    if (metadata.type("MOBILE") && metadata.type("MOBILE").pattern() === "") {
      return "FIXED_LINE_OR_MOBILE";
    }
    if (!metadata.type("MOBILE")) {
      return "FIXED_LINE_OR_MOBILE";
    }
    if (isNumberTypeEqualTo(nationalNumber, "MOBILE", metadata)) {
      return "FIXED_LINE_OR_MOBILE";
    }
    return "FIXED_LINE";
  }
  for (var _iterator = _createForOfIteratorHelperLoose2(NON_FIXED_LINE_PHONE_TYPES), _step; !(_step = _iterator()).done; ) {
    var type = _step.value;
    if (isNumberTypeEqualTo(nationalNumber, type, metadata)) {
      return type;
    }
  }
}
function isNumberTypeEqualTo(nationalNumber, type, metadata) {
  var typeDefinition = metadata.type(type);
  if (!typeDefinition || !typeDefinition.pattern()) {
    return false;
  }
  if (typeDefinition.possibleLengths() && typeDefinition.possibleLengths().indexOf(nationalNumber.length) < 0) {
    return false;
  }
  return matchesEntirely(nationalNumber, typeDefinition.pattern());
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/isValid.js
function isValidNumber(input, options, metadataJson) {
  options = options || {};
  var metadata = new Metadata(metadataJson);
  metadata.selectNumberingPlan(input.country || input.countryCallingCode);
  if (metadata.hasTypes()) {
    return getNumberType(input, options, metadata.metadata) !== void 0;
  }
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
  return matchesEntirely(nationalNumber, metadata.nationalNumberPattern());
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/isCountryCode.js
var COUNTRY_CODE_REG_EXP = /^[A-Z]{2}$/;
function isCountryCode(string) {
  return COUNTRY_CODE_REG_EXP.test(string);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/getCountryAndCallingCodeFromOneOfThem.js
var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;
function getCountryAndCallingCodeFromOneOfThem(countryOrCallingCode, metadataJson) {
  var country;
  var callingCode;
  var metadata = new Metadata(metadataJson);
  if (isCountryCode(countryOrCallingCode)) {
    country = countryOrCallingCode;
    metadata.selectNumberingPlan(country);
    callingCode = metadata.countryCallingCode();
  } else {
    callingCode = countryOrCallingCode;
    if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
      if (metadata.isNonGeographicCallingCode(callingCode)) {
        country = "001";
      }
    }
  }
  return {
    country,
    callingCode
  };
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/getPossibleCountriesForNumber.js
function getPossibleCountriesForNumber(callingCode, nationalNumber, metadata) {
  var _metadata = new Metadata(metadata);
  var possibleCountries = _metadata.getCountryCodesForCallingCode(callingCode);
  if (!possibleCountries) {
    return [];
  }
  return possibleCountries.filter(function(country) {
    return couldNationalNumberBelongToCountry(nationalNumber, country, metadata);
  });
}
function couldNationalNumberBelongToCountry(nationalNumber, country, metadataJson) {
  var metadata = new Metadata(metadataJson);
  metadata.selectNumberingPlan(country);
  return metadata.numberingPlan.possibleLengths().indexOf(nationalNumber.length) >= 0;
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/constants.js
var MIN_LENGTH_FOR_NSN = 2;
var MAX_LENGTH_FOR_NSN = 17;
var MAX_LENGTH_COUNTRY_CODE = 3;
var VALID_DIGITS = "0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9";
var DASHES = "-\u2010-\u2015\u2212\u30FC\uFF0D";
var SLASHES = "\uFF0F/";
var DOTS = "\uFF0E.";
var WHITESPACE = " \xA0\xAD\u200B\u2060\u3000";
var BRACKETS = "()\uFF08\uFF09\uFF3B\uFF3D\\[\\]";
var TILDES = "~\u2053\u223C\uFF5E";
var VALID_PUNCTUATION = "".concat(DASHES).concat(SLASHES).concat(DOTS).concat(WHITESPACE).concat(BRACKETS).concat(TILDES);
var PLUS_CHARS = "+\uFF0B";

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/stripIddPrefix.js
var CAPTURING_DIGIT_PATTERN = new RegExp("([" + VALID_DIGITS + "])");
function stripIddPrefix(number, country, callingCode, metadataJson) {
  if (!country) {
    return;
  }
  var metadata = new Metadata(metadataJson);
  metadata.selectNumberingPlan(country || callingCode);
  var IDDPrefixPattern = new RegExp(metadata.IDDPrefix());
  if (number.search(IDDPrefixPattern) !== 0) {
    return;
  }
  number = number.slice(number.match(IDDPrefixPattern)[0].length);
  var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);
  if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
    if (matchedGroups[1] === "0") {
      return;
    }
  }
  return number;
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/extractNationalNumberFromPossiblyIncompleteNumber.js
function extractNationalNumberFromPossiblyIncompleteNumber(number, metadata) {
  if (number && metadata.numberingPlan.nationalPrefixForParsing()) {
    var prefixPattern = new RegExp("^(?:" + metadata.numberingPlan.nationalPrefixForParsing() + ")");
    var prefixMatch = prefixPattern.exec(number);
    if (prefixMatch) {
      var nationalNumber;
      var carrierCode;
      var capturedGroupsCount = prefixMatch.length - 1;
      var hasCapturedGroups = capturedGroupsCount > 0 && prefixMatch[capturedGroupsCount];
      if (metadata.nationalPrefixTransformRule() && hasCapturedGroups) {
        nationalNumber = number.replace(prefixPattern, metadata.nationalPrefixTransformRule());
        if (capturedGroupsCount > 1) {
          carrierCode = prefixMatch[1];
        }
      } else {
        var prefixBeforeNationalNumber = prefixMatch[0];
        nationalNumber = number.slice(prefixBeforeNationalNumber.length);
        if (hasCapturedGroups) {
          carrierCode = prefixMatch[1];
        }
      }
      var nationalPrefix;
      if (hasCapturedGroups) {
        var possiblePositionOfTheFirstCapturedGroup = number.indexOf(prefixMatch[1]);
        var possibleNationalPrefix = number.slice(0, possiblePositionOfTheFirstCapturedGroup);
        if (possibleNationalPrefix === metadata.numberingPlan.nationalPrefix()) {
          nationalPrefix = metadata.numberingPlan.nationalPrefix();
        }
      } else {
        nationalPrefix = prefixMatch[0];
      }
      return {
        nationalNumber,
        nationalPrefix,
        carrierCode
      };
    }
  }
  return {
    nationalNumber: number
  };
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/getCountryByNationalNumber.js
function _createForOfIteratorHelperLoose3(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray3(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function() {
      return o >= r.length ? { done: true } : { done: false, value: r[o++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray3(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray3(r, a) : void 0;
  }
}
function _arrayLikeToArray3(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function getCountryByNationalNumber(nationalNumber, countries, metadataJson) {
  var metadata = new Metadata(metadataJson);
  for (var _iterator = _createForOfIteratorHelperLoose3(countries), _step; !(_step = _iterator()).done; ) {
    var country = _step.value;
    metadata.selectNumberingPlan(country);
    if (metadata.leadingDigits()) {
      if (nationalNumber && nationalNumber.search(metadata.leadingDigits()) === 0) {
        return country;
      }
    } else if (getNumberType({
      phone: nationalNumber,
      country
    }, void 0, metadata.metadata)) {
      return country;
    }
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/getCountryByCallingCode.js
var USE_NON_GEOGRAPHIC_COUNTRY_CODE2 = false;
function getCountryByCallingCode(callingCode, _ref) {
  var nationalNumber = _ref.nationalNumber, metadata = _ref.metadata;
  if (USE_NON_GEOGRAPHIC_COUNTRY_CODE2) {
    if (metadata.isNonGeographicCallingCode(callingCode)) {
      return "001";
    }
  }
  var possibleCountries = metadata.getCountryCodesForCallingCode(callingCode);
  if (!possibleCountries) {
    return;
  }
  if (possibleCountries.length === 1) {
    return possibleCountries[0];
  }
  return getCountryByNationalNumber(nationalNumber, possibleCountries, metadata.metadata);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/extractNationalNumber.js
function extractNationalNumber(number, country, metadata) {
  var _extractNationalNumbe = extractNationalNumberFromPossiblyIncompleteNumber(number, metadata), carrierCode = _extractNationalNumbe.carrierCode, nationalNumber = _extractNationalNumbe.nationalNumber;
  if (nationalNumber !== number) {
    if (!shouldHaveExtractedNationalPrefix(number, nationalNumber, metadata)) {
      return {
        nationalNumber: number
      };
    }
    if (metadata.numberingPlan.possibleLengths()) {
      if (!country) {
        country = getCountryByCallingCode(metadata.numberingPlan.callingCode(), {
          nationalNumber,
          metadata
        });
      }
      if (!isPossibleIncompleteNationalNumber(nationalNumber, country, metadata)) {
        return {
          nationalNumber: number
        };
      }
    }
  }
  return {
    nationalNumber,
    carrierCode
  };
}
function shouldHaveExtractedNationalPrefix(nationalNumberBefore, nationalNumberAfter, metadata) {
  if (matchesEntirely(nationalNumberBefore, metadata.nationalNumberPattern()) && !matchesEntirely(nationalNumberAfter, metadata.nationalNumberPattern())) {
    return false;
  }
  return true;
}
function isPossibleIncompleteNationalNumber(nationalNumber, country, metadata) {
  switch (checkNumberLength(nationalNumber, country, metadata)) {
    case "TOO_SHORT":
    case "INVALID_LENGTH":
      return false;
    default:
      return true;
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign.js
function extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, defaultCountry, defaultCallingCode, metadataJson) {
  if (!(country || defaultCountry || defaultCallingCode)) {
    return {
      number
    };
  }
  var countryCallingCode = country || defaultCountry ? getCountryCallingCode(country || defaultCountry, metadataJson) : defaultCallingCode;
  if (number.indexOf(countryCallingCode) === 0) {
    var metadata = new Metadata(metadataJson);
    metadata.selectNumberingPlan(country || defaultCountry || defaultCallingCode);
    var possibleShorterNumber = number.slice(countryCallingCode.length);
    var _extractNationalNumbe = extractNationalNumber(possibleShorterNumber, void 0, metadata), possibleShorterNationalNumber = _extractNationalNumbe.nationalNumber;
    var _extractNationalNumbe2 = extractNationalNumber(number, void 0, metadata), nationalNumber = _extractNationalNumbe2.nationalNumber;
    if (!matchesEntirely(nationalNumber, metadata.nationalNumberPattern()) && matchesEntirely(possibleShorterNationalNumber, metadata.nationalNumberPattern()) || checkNumberLength(nationalNumber, void 0, metadata) === "TOO_LONG") {
      return {
        countryCallingCode,
        number: possibleShorterNumber
      };
    }
  }
  return {
    number
  };
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCode.js
function extractCountryCallingCode(number, country, defaultCountry, defaultCallingCode, metadataJson) {
  if (!number) {
    return {};
  }
  var isNumberWithIddPrefix;
  if (number[0] !== "+") {
    var numberWithoutIDD = stripIddPrefix(number, country || defaultCountry, defaultCallingCode, metadataJson);
    if (numberWithoutIDD && numberWithoutIDD !== number) {
      isNumberWithIddPrefix = true;
      number = "+" + numberWithoutIDD;
    } else {
      if (country || defaultCountry || defaultCallingCode) {
        var _extractCountryCallin = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, defaultCountry, defaultCallingCode, metadataJson), countryCallingCode = _extractCountryCallin.countryCallingCode, shorterNumber = _extractCountryCallin.number;
        if (countryCallingCode) {
          return {
            countryCallingCodeSource: "FROM_NUMBER_WITHOUT_PLUS_SIGN",
            countryCallingCode,
            number: shorterNumber
          };
        }
      }
      return {
        // No need to set it to `UNSPECIFIED`. It can be just `undefined`.
        // countryCallingCodeSource: 'UNSPECIFIED',
        number
      };
    }
  }
  if (number[1] === "0") {
    return {};
  }
  var metadata = new Metadata(metadataJson);
  var i = 2;
  while (i - 1 <= MAX_LENGTH_COUNTRY_CODE && i <= number.length) {
    var _countryCallingCode = number.slice(1, i);
    if (metadata.hasCallingCode(_countryCallingCode)) {
      metadata.selectNumberingPlan(_countryCallingCode);
      return {
        countryCallingCodeSource: isNumberWithIddPrefix ? "FROM_NUMBER_WITH_IDD" : "FROM_NUMBER_WITH_PLUS_SIGN",
        countryCallingCode: _countryCallingCode,
        number: number.slice(i)
      };
    }
    i++;
  }
  return {};
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/applyInternationalSeparatorStyle.js
function applyInternationalSeparatorStyle(formattedNumber) {
  return formattedNumber.replace(new RegExp("[".concat(VALID_PUNCTUATION, "]+"), "g"), " ").trim();
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/formatNationalNumberUsingFormat.js
var FIRST_GROUP_PATTERN = /(\$\d)/;
function formatNationalNumberUsingFormat(number, format, _ref) {
  var useInternationalFormat = _ref.useInternationalFormat, withNationalPrefix = _ref.withNationalPrefix, carrierCode = _ref.carrierCode, metadata = _ref.metadata;
  var formattedNumber = number.replace(new RegExp(format.pattern()), useInternationalFormat ? format.internationalFormat() : (
    // This library doesn't use `domestic_carrier_code_formatting_rule`,
    // because that one is only used when formatting phone numbers
    // for dialing from a mobile phone, and this is not a dialing library.
    // carrierCode && format.domesticCarrierCodeFormattingRule()
    // 	// First, replace the $CC in the formatting rule with the desired carrier code.
    // 	// Then, replace the $FG in the formatting rule with the first group
    // 	// and the carrier code combined in the appropriate way.
    // 	? format.format().replace(FIRST_GROUP_PATTERN, format.domesticCarrierCodeFormattingRule().replace('$CC', carrierCode))
    // 	: (
    // 		withNationalPrefix && format.nationalPrefixFormattingRule()
    // 			? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule())
    // 			: format.format()
    // 	)
    withNationalPrefix && format.nationalPrefixFormattingRule() ? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule()) : format.format()
  ));
  if (useInternationalFormat) {
    return applyInternationalSeparatorStyle(formattedNumber);
  }
  return formattedNumber;
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/getIddPrefix.js
var SINGLE_IDD_PREFIX_REG_EXP = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;
function getIddPrefix(country, callingCode, metadata) {
  var countryMetadata = new Metadata(metadata);
  countryMetadata.selectNumberingPlan(country || callingCode);
  if (countryMetadata.defaultIDDPrefix()) {
    return countryMetadata.defaultIDDPrefix();
  }
  if (SINGLE_IDD_PREFIX_REG_EXP.test(countryMetadata.IDDPrefix())) {
    return countryMetadata.IDDPrefix();
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js
var RFC3966_EXTN_PREFIX = ";ext=";
var getExtensionDigitsPattern = function getExtensionDigitsPattern2(maxLength) {
  return "([".concat(VALID_DIGITS, "]{1,").concat(maxLength, "})");
};
function createExtensionPattern(purpose) {
  var extLimitAfterExplicitLabel = "20";
  var extLimitAfterLikelyLabel = "15";
  var extLimitAfterAmbiguousChar = "9";
  var extLimitWhenNotSure = "6";
  var possibleSeparatorsBetweenNumberAndExtLabel = "[ \xA0\\t,]*";
  var possibleCharsAfterExtLabel = "[:\\.\uFF0E]?[ \xA0\\t,-]*";
  var optionalExtnSuffix = "#?";
  var explicitExtLabels = "(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|\u0434\u043E\u0431|anexo)";
  var ambiguousExtLabels = "(?:[x\uFF58#\uFF03~\uFF5E]|int|\uFF49\uFF4E\uFF54)";
  var ambiguousSeparator = "[- ]+";
  var possibleSeparatorsNumberExtLabelNoComma = "[ \xA0\\t]*";
  var autoDiallingAndExtLabelsFound = "(?:,{2}|;)";
  var rfcExtn = RFC3966_EXTN_PREFIX + getExtensionDigitsPattern(extLimitAfterExplicitLabel);
  var explicitExtn = possibleSeparatorsBetweenNumberAndExtLabel + explicitExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterExplicitLabel) + optionalExtnSuffix;
  var ambiguousExtn = possibleSeparatorsBetweenNumberAndExtLabel + ambiguousExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
  var americanStyleExtnWithSuffix = ambiguousSeparator + getExtensionDigitsPattern(extLimitWhenNotSure) + "#";
  var autoDiallingExtn = possibleSeparatorsNumberExtLabelNoComma + autoDiallingAndExtLabelsFound + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterLikelyLabel) + optionalExtnSuffix;
  var onlyCommasExtn = possibleSeparatorsNumberExtLabelNoComma + "(?:,)+" + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
  return rfcExtn + "|" + explicitExtn + "|" + ambiguousExtn + "|" + americanStyleExtnWithSuffix + "|" + autoDiallingExtn + "|" + onlyCommasExtn;
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js
var MIN_LENGTH_PHONE_NUMBER_PATTERN = "[" + VALID_DIGITS + "]{" + MIN_LENGTH_FOR_NSN + "}";
var VALID_PHONE_NUMBER = "[" + PLUS_CHARS + "]{0,1}(?:[" + VALID_PUNCTUATION + "]*[" + VALID_DIGITS + "]){3,}[" + VALID_PUNCTUATION + VALID_DIGITS + "]*";
var VALID_PHONE_NUMBER_START_REG_EXP = new RegExp("^[" + PLUS_CHARS + "]{0,1}(?:[" + VALID_PUNCTUATION + "]*[" + VALID_DIGITS + "]){1,2}$", "i");
var VALID_PHONE_NUMBER_WITH_EXTENSION = VALID_PHONE_NUMBER + // Phone number extensions
"(?:" + createExtensionPattern() + ")?";
var VALID_PHONE_NUMBER_PATTERN = new RegExp(
  // Either a short two-digit-only phone number
  "^" + MIN_LENGTH_PHONE_NUMBER_PATTERN + "$|^" + VALID_PHONE_NUMBER_WITH_EXTENSION + "$",
  "i"
);
function isViablePhoneNumber(number) {
  return number.length >= MIN_LENGTH_FOR_NSN && VALID_PHONE_NUMBER_PATTERN.test(number);
}
function isViablePhoneNumberStart(number) {
  return VALID_PHONE_NUMBER_START_REG_EXP.test(number);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/RFC3966.js
function formatRFC3966(_ref) {
  var number = _ref.number, ext = _ref.ext;
  if (!number) {
    return "";
  }
  if (number[0] !== "+") {
    throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
  }
  return "tel:".concat(number).concat(ext ? ";ext=" + ext : "");
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/format.js
var DEFAULT_OPTIONS = {
  formatExtension: function formatExtension(formattedNumber, extension, metadata) {
    return "".concat(formattedNumber).concat(metadata.ext()).concat(extension);
  }
};
function formatNumber(input, format, options, metadataJson) {
  if (options) {
    options = merge({}, DEFAULT_OPTIONS, options);
  } else {
    options = DEFAULT_OPTIONS;
  }
  var metadata = new Metadata(metadataJson);
  if (input.country && input.country !== "001") {
    if (!metadata.hasCountry(input.country)) {
      throw new Error("Unknown country: ".concat(input.country));
    }
    metadata.selectNumberingPlan(input.country);
  } else if (input.countryCallingCode) {
    metadata.selectNumberingPlan(input.countryCallingCode);
  } else return input.phone || "";
  var countryCallingCode = metadata.countryCallingCode();
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
  var number;
  switch (format) {
    case "NATIONAL":
      if (!nationalNumber) {
        return "";
      }
      number = formatNationalNumber(nationalNumber, input.carrierCode, "NATIONAL", metadata, options);
      return addExtension(number, input.ext, metadata, options.formatExtension);
    case "INTERNATIONAL":
      if (!nationalNumber) {
        return "+".concat(countryCallingCode);
      }
      number = formatNationalNumber(nationalNumber, null, "INTERNATIONAL", metadata, options);
      number = "+".concat(countryCallingCode, " ").concat(number);
      return addExtension(number, input.ext, metadata, options.formatExtension);
    case "E.164":
      return "+".concat(countryCallingCode).concat(nationalNumber);
    case "RFC3966":
      return formatRFC3966({
        number: "+".concat(countryCallingCode).concat(nationalNumber),
        ext: input.ext
      });
    // For reference, here's Google's IDD formatter:
    // https://github.com/google/libphonenumber/blob/32719cf74e68796788d1ca45abc85dcdc63ba5b9/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L1546
    // Not saying that this IDD formatter replicates it 1:1, but it seems to work.
    // Who would even need to format phone numbers in IDD format anyway?
    case "IDD":
      if (!options.fromCountry) {
        return;
      }
      var formattedNumber = formatIDD(nationalNumber, input.carrierCode, countryCallingCode, options.fromCountry, metadata);
      if (!formattedNumber) {
        return;
      }
      return addExtension(formattedNumber, input.ext, metadata, options.formatExtension);
    default:
      throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(format, '"'));
  }
}
function formatNationalNumber(number, carrierCode, formatAs, metadata, options) {
  var format = chooseFormatForNumber(metadata.formats(), number);
  if (!format) {
    return number;
  }
  return formatNationalNumberUsingFormat(number, format, {
    useInternationalFormat: formatAs === "INTERNATIONAL",
    withNationalPrefix: format.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && options && options.nationalPrefix === false ? false : true,
    carrierCode,
    metadata
  });
}
function chooseFormatForNumber(availableFormats, nationalNumber) {
  return pickFirstMatchingElement(availableFormats, function(format) {
    if (format.leadingDigitsPatterns().length > 0) {
      var lastLeadingDigitsPattern = format.leadingDigitsPatterns()[format.leadingDigitsPatterns().length - 1];
      if (nationalNumber.search(lastLeadingDigitsPattern) !== 0) {
        return false;
      }
    }
    return matchesEntirely(nationalNumber, format.pattern());
  });
}
function addExtension(formattedNumber, ext, metadata, formatExtension2) {
  return ext ? formatExtension2(formattedNumber, ext, metadata) : formattedNumber;
}
function formatIDD(nationalNumber, carrierCode, countryCallingCode, fromCountry, metadata) {
  var fromCountryCallingCode = getCountryCallingCode(fromCountry, metadata.metadata);
  if (fromCountryCallingCode === countryCallingCode) {
    var formattedNumber = formatNationalNumber(nationalNumber, carrierCode, "NATIONAL", metadata);
    if (countryCallingCode === "1") {
      return countryCallingCode + " " + formattedNumber;
    }
    return formattedNumber;
  }
  var iddPrefix = getIddPrefix(fromCountry, void 0, metadata.metadata);
  if (iddPrefix) {
    return "".concat(iddPrefix, " ").concat(countryCallingCode, " ").concat(formatNationalNumber(nationalNumber, null, "INTERNATIONAL", metadata));
  }
}
function merge() {
  var i = 1;
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }
  while (i < objects.length) {
    if (objects[i]) {
      for (var key in objects[i]) {
        objects[0][key] = objects[i][key];
      }
    }
    i++;
  }
  return objects[0];
}
function pickFirstMatchingElement(elements, testFunction) {
  var i = 0;
  while (i < elements.length) {
    if (testFunction(elements[i])) {
      return elements[i];
    }
    i++;
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/PhoneNumber.js
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _classCallCheck2(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties2(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey2(o.key), o);
  }
}
function _createClass2(e, r, t) {
  return r && _defineProperties2(e.prototype, r), t && _defineProperties2(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey2(t) {
  var i = _toPrimitive2(t, "string");
  return "symbol" == _typeof2(i) ? i : i + "";
}
function _toPrimitive2(t, r) {
  if ("object" != _typeof2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var PhoneNumber = /* @__PURE__ */ (function() {
  function PhoneNumber2(countryOrCountryCallingCode, nationalNumber, metadata) {
    _classCallCheck2(this, PhoneNumber2);
    if (!countryOrCountryCallingCode) {
      throw new TypeError("First argument is required");
    }
    if (typeof countryOrCountryCallingCode !== "string") {
      throw new TypeError("First argument must be a string");
    }
    if (countryOrCountryCallingCode[0] === "+" && !nationalNumber) {
      throw new TypeError("`metadata` argument not passed");
    }
    if (isObject(nationalNumber) && isObject(nationalNumber.countries)) {
      metadata = nationalNumber;
      var e164Number = countryOrCountryCallingCode;
      if (!E164_NUMBER_REGEXP.test(e164Number)) {
        throw new Error('Invalid `number` argument passed: must consist of a "+" followed by digits');
      }
      var _extractCountryCallin = extractCountryCallingCode(e164Number, void 0, void 0, void 0, metadata), _countryCallingCode = _extractCountryCallin.countryCallingCode, number = _extractCountryCallin.number;
      nationalNumber = number;
      countryOrCountryCallingCode = _countryCallingCode;
      if (!nationalNumber) {
        throw new Error("Invalid `number` argument passed: too short");
      }
    }
    if (!nationalNumber) {
      throw new TypeError("`nationalNumber` argument is required");
    }
    if (typeof nationalNumber !== "string") {
      throw new TypeError("`nationalNumber` argument must be a string");
    }
    validateMetadata(metadata);
    var _getCountryAndCalling = getCountryAndCallingCodeFromOneOfThem(countryOrCountryCallingCode, metadata), country = _getCountryAndCalling.country, countryCallingCode = _getCountryAndCalling.callingCode;
    this.country = country;
    this.countryCallingCode = countryCallingCode;
    this.nationalNumber = nationalNumber;
    this.number = "+" + this.countryCallingCode + this.nationalNumber;
    this.getMetadata = function() {
      return metadata;
    };
  }
  return _createClass2(PhoneNumber2, [{
    key: "setExt",
    value: function setExt(ext) {
      this.ext = ext;
    }
  }, {
    key: "getPossibleCountries",
    value: function getPossibleCountries() {
      if (this.country) {
        return [this.country];
      }
      return getPossibleCountriesForNumber(this.countryCallingCode, this.nationalNumber, this.getMetadata());
    }
  }, {
    key: "isPossible",
    value: function isPossible() {
      return isPossiblePhoneNumber(this, {
        v2: true
      }, this.getMetadata());
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return isValidNumber(this, {
        v2: true
      }, this.getMetadata());
    }
  }, {
    key: "isNonGeographic",
    value: function isNonGeographic() {
      var metadata = new Metadata(this.getMetadata());
      return metadata.isNonGeographicCallingCode(this.countryCallingCode);
    }
  }, {
    key: "isEqual",
    value: function isEqual(phoneNumber) {
      return this.number === phoneNumber.number && this.ext === phoneNumber.ext;
    }
    // `validateLength()` method was originally meant to be an equivalent for `validatePhoneNumberLength()`.
    //
    // Later, it became apparent that it's not really a true equivalent.
    // The reason is that a `PhoneNumber` instance is not created
    // when the phone number string is too short for it to be considered a valid phone number:
    // * When there must be at least 2 national (significant) number digits: `"1"`.
    // * When the country calling code part of an international number is incomplete: `"+12"`.
    //
    // So leaving this `validateLength()` method here would suggest a hidden anti-pattern
    // of using it instead of `validatePhoneNumberLength()` while ignoring
    // the "too short to be even possible" case from phone number length validation.
    // And ignoring that case wouldn't make any sense in a real-world application
    // because it would still be a valid case that should be handled.
    //
    // Because of that, this method was eventually commented out in order to not introduce
    // that kind of an anti-pattern.
    //
    // validateLength() {
    // 	const result = checkNumberLength(
    // 		this.nationalNumber,
    // 		undefined,
    // 		this.getMetadata()
    // 	)
    // 	if (result !== 'IS_POSSIBLE') {
    // 		return result
    // 	}
    // }
  }, {
    key: "getType",
    value: function getType2() {
      return getNumberType(this, {
        v2: true
      }, this.getMetadata());
    }
  }, {
    key: "format",
    value: function format(_format, options) {
      return formatNumber(this, _format, options ? _objectSpread(_objectSpread({}, options), {}, {
        v2: true
      }) : {
        v2: true
      }, this.getMetadata());
    }
  }, {
    key: "formatNational",
    value: function formatNational(options) {
      return this.format("NATIONAL", options);
    }
  }, {
    key: "formatInternational",
    value: function formatInternational(options) {
      return this.format("INTERNATIONAL", options);
    }
  }, {
    key: "getURI",
    value: function getURI(options) {
      return this.format("RFC3966", options);
    }
  }]);
})();
var E164_NUMBER_REGEXP = /^\+\d+$/;

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/ParseError.js
function _typeof3(o) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof3(o);
}
function _defineProperties3(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey3(o.key), o);
  }
}
function _createClass3(e, r, t) {
  return r && _defineProperties3(e.prototype, r), t && _defineProperties3(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey3(t) {
  var i = _toPrimitive3(t, "string");
  return "symbol" == _typeof3(i) ? i : i + "";
}
function _toPrimitive3(t, r) {
  if ("object" != _typeof3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _classCallCheck3(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof3(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper2(t2) {
    if (null === t2 || !_isNativeFunction(t2)) return t2;
    if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t2)) return r.get(t2);
      r.set(t2, Wrapper);
    }
    function Wrapper() {
      return _construct(t2, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }), _setPrototypeOf(Wrapper, t2);
  }, _wrapNativeSuper(t);
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf(t);
}
var ParseError = /* @__PURE__ */ (function(_Error) {
  function ParseError2(code) {
    var _this;
    _classCallCheck3(this, ParseError2);
    _this = _callSuper(this, ParseError2, [code]);
    Object.setPrototypeOf(_this, ParseError2.prototype);
    _this.name = _this.constructor.name;
    return _this;
  }
  _inherits(ParseError2, _Error);
  return _createClass3(ParseError2);
})(/* @__PURE__ */ _wrapNativeSuper(Error));

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/extension/extractExtension.js
var EXTN_PATTERN = new RegExp("(?:" + createExtensionPattern() + ")$", "i");
function extractExtension(number) {
  var start = number.search(EXTN_PATTERN);
  if (start < 0) {
    return {};
  }
  var numberWithoutExtension = number.slice(0, start);
  var matches = number.match(EXTN_PATTERN);
  var i = 1;
  while (i < matches.length) {
    if (matches[i]) {
      return {
        number: numberWithoutExtension,
        ext: matches[i]
      };
    }
    i++;
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/parseDigits.js
function _createForOfIteratorHelperLoose4(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray4(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function() {
      return o >= r.length ? { done: true } : { done: false, value: r[o++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray4(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray4(r, a) : void 0;
  }
}
function _arrayLikeToArray4(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var DIGITS = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "\uFF10": "0",
  // Fullwidth digit 0
  "\uFF11": "1",
  // Fullwidth digit 1
  "\uFF12": "2",
  // Fullwidth digit 2
  "\uFF13": "3",
  // Fullwidth digit 3
  "\uFF14": "4",
  // Fullwidth digit 4
  "\uFF15": "5",
  // Fullwidth digit 5
  "\uFF16": "6",
  // Fullwidth digit 6
  "\uFF17": "7",
  // Fullwidth digit 7
  "\uFF18": "8",
  // Fullwidth digit 8
  "\uFF19": "9",
  // Fullwidth digit 9
  "\u0660": "0",
  // Arabic-indic digit 0
  "\u0661": "1",
  // Arabic-indic digit 1
  "\u0662": "2",
  // Arabic-indic digit 2
  "\u0663": "3",
  // Arabic-indic digit 3
  "\u0664": "4",
  // Arabic-indic digit 4
  "\u0665": "5",
  // Arabic-indic digit 5
  "\u0666": "6",
  // Arabic-indic digit 6
  "\u0667": "7",
  // Arabic-indic digit 7
  "\u0668": "8",
  // Arabic-indic digit 8
  "\u0669": "9",
  // Arabic-indic digit 9
  "\u06F0": "0",
  // Eastern-Arabic digit 0
  "\u06F1": "1",
  // Eastern-Arabic digit 1
  "\u06F2": "2",
  // Eastern-Arabic digit 2
  "\u06F3": "3",
  // Eastern-Arabic digit 3
  "\u06F4": "4",
  // Eastern-Arabic digit 4
  "\u06F5": "5",
  // Eastern-Arabic digit 5
  "\u06F6": "6",
  // Eastern-Arabic digit 6
  "\u06F7": "7",
  // Eastern-Arabic digit 7
  "\u06F8": "8",
  // Eastern-Arabic digit 8
  "\u06F9": "9"
  // Eastern-Arabic digit 9
};
function parseDigit(character) {
  return DIGITS[character];
}
function parseDigits(string) {
  var result2 = "";
  for (var _iterator = _createForOfIteratorHelperLoose4(string.split("")), _step; !(_step = _iterator()).done; ) {
    var character = _step.value;
    var digit = parseDigit(character);
    if (digit) {
      result2 += digit;
    }
  }
  return result2;
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js
function _createForOfIteratorHelperLoose5(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray5(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function() {
      return o >= r.length ? { done: true } : { done: false, value: r[o++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray5(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray5(r, a) : void 0;
  }
}
function _arrayLikeToArray5(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function parseIncompletePhoneNumber(string) {
  var result2 = "";
  for (var _iterator = _createForOfIteratorHelperLoose5(string.split("")), _step; !(_step = _iterator()).done; ) {
    var character = _step.value;
    result2 += parsePhoneNumberCharacter(character, result2) || "";
  }
  return result2;
}
function parsePhoneNumberCharacter(character, prevParsedCharacters, eventListener) {
  if (character === "+") {
    if (prevParsedCharacters) {
      if (typeof eventListener === "function") {
        eventListener("end");
      }
      return;
    }
    return "+";
  }
  return parseDigit(character);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/extractPhoneContext.js
var PLUS_SIGN = "+";
var RFC3966_VISUAL_SEPARATOR_ = "[\\-\\.\\(\\)]?";
var RFC3966_PHONE_DIGIT_ = "([" + VALID_DIGITS + "]|" + RFC3966_VISUAL_SEPARATOR_ + ")";
var RFC3966_GLOBAL_NUMBER_DIGITS_ = "^\\" + PLUS_SIGN + RFC3966_PHONE_DIGIT_ + "*[" + VALID_DIGITS + "]" + RFC3966_PHONE_DIGIT_ + "*$";
var RFC3966_GLOBAL_NUMBER_DIGITS_PATTERN_ = new RegExp(RFC3966_GLOBAL_NUMBER_DIGITS_, "g");
var ALPHANUM_ = VALID_DIGITS;
var RFC3966_DOMAINLABEL_ = "[" + ALPHANUM_ + "]+((\\-)*[" + ALPHANUM_ + "])*";
var VALID_ALPHA_ = "a-zA-Z";
var RFC3966_TOPLABEL_ = "[" + VALID_ALPHA_ + "]+((\\-)*[" + ALPHANUM_ + "])*";
var RFC3966_DOMAINNAME_ = "^(" + RFC3966_DOMAINLABEL_ + "\\.)*" + RFC3966_TOPLABEL_ + "\\.?$";
var RFC3966_DOMAINNAME_PATTERN_ = new RegExp(RFC3966_DOMAINNAME_, "g");
var RFC3966_PREFIX_ = "tel:";
var RFC3966_PHONE_CONTEXT_ = ";phone-context=";
var RFC3966_ISDN_SUBADDRESS_ = ";isub=";
function extractPhoneContext(numberToExtractFrom) {
  var indexOfPhoneContext = numberToExtractFrom.indexOf(RFC3966_PHONE_CONTEXT_);
  if (indexOfPhoneContext < 0) {
    return null;
  }
  var phoneContextStart = indexOfPhoneContext + RFC3966_PHONE_CONTEXT_.length;
  if (phoneContextStart >= numberToExtractFrom.length) {
    return "";
  }
  var phoneContextEnd = numberToExtractFrom.indexOf(";", phoneContextStart);
  if (phoneContextEnd >= 0) {
    return numberToExtractFrom.substring(phoneContextStart, phoneContextEnd);
  } else {
    return numberToExtractFrom.substring(phoneContextStart);
  }
}
function isPhoneContextValid(phoneContext) {
  if (phoneContext === null) {
    return true;
  }
  if (phoneContext.length === 0) {
    return false;
  }
  return RFC3966_GLOBAL_NUMBER_DIGITS_PATTERN_.test(phoneContext) || RFC3966_DOMAINNAME_PATTERN_.test(phoneContext);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/helpers/extractFormattedPhoneNumberFromPossibleRfc3966NumberUri.js
function extractFormattedPhoneNumberFromPossibleRfc3966NumberUri(numberToParse, _ref) {
  var extractFormattedPhoneNumber2 = _ref.extractFormattedPhoneNumber;
  var phoneContext = extractPhoneContext(numberToParse);
  if (!isPhoneContextValid(phoneContext)) {
    throw new ParseError("NOT_A_NUMBER");
  }
  var phoneNumberString;
  if (phoneContext === null) {
    phoneNumberString = extractFormattedPhoneNumber2(numberToParse) || "";
  } else {
    phoneNumberString = "";
    if (phoneContext.charAt(0) === PLUS_SIGN) {
      phoneNumberString += phoneContext;
    }
    var indexOfRfc3966Prefix = numberToParse.indexOf(RFC3966_PREFIX_);
    var indexOfNationalNumber;
    if (indexOfRfc3966Prefix >= 0) {
      indexOfNationalNumber = indexOfRfc3966Prefix + RFC3966_PREFIX_.length;
    } else {
      indexOfNationalNumber = 0;
    }
    var indexOfPhoneContext = numberToParse.indexOf(RFC3966_PHONE_CONTEXT_);
    phoneNumberString += numberToParse.substring(indexOfNationalNumber, indexOfPhoneContext);
  }
  var indexOfIsdn = phoneNumberString.indexOf(RFC3966_ISDN_SUBADDRESS_);
  if (indexOfIsdn > 0) {
    phoneNumberString = phoneNumberString.substring(0, indexOfIsdn);
  }
  if (phoneNumberString !== "") {
    return phoneNumberString;
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/parse.js
var MAX_INPUT_STRING_LENGTH = 250;
var PHONE_NUMBER_START_PATTERN = new RegExp("[" + PLUS_CHARS + VALID_DIGITS + "]");
var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp("[^" + VALID_DIGITS + "#]+$");
var USE_NON_GEOGRAPHIC_COUNTRY_CODE3 = false;
function parse(text, options, metadataJson) {
  options = options || {};
  var metadata = new Metadata(metadataJson);
  if (options.defaultCountry && !metadata.hasCountry(options.defaultCountry)) {
    if (options.v2) {
      throw new ParseError("INVALID_COUNTRY");
    }
    throw new Error("Unknown country: ".concat(options.defaultCountry));
  }
  var _parseInput = parseInput(text, options.v2, options.extract), formattedPhoneNumber = _parseInput.number, ext = _parseInput.ext, error = _parseInput.error;
  if (!formattedPhoneNumber) {
    if (options.v2) {
      if (error === "TOO_SHORT") {
        throw new ParseError("TOO_SHORT");
      }
      throw new ParseError("NOT_A_NUMBER");
    }
    return {};
  }
  var _parsePhoneNumber = parsePhoneNumber(
    formattedPhoneNumber,
    options.defaultCountry,
    options.defaultCallingCode,
    // If `country` is returned, its numbering plan will also be selected in `metadata`.
    // Otherwise, if `countryCallingCode` is returned, its numbering plan will also be selected in `metadata`.
    // Otherwise, if neither `country` nor `countryCallingCode` are returned, no numbering plan will be selected in `metadata`.
    metadata
  ), country = _parsePhoneNumber.country, nationalNumber = _parsePhoneNumber.nationalNumber, countryCallingCode = _parsePhoneNumber.countryCallingCode, countryCallingCodeSource = _parsePhoneNumber.countryCallingCodeSource, carrierCode = _parsePhoneNumber.carrierCode;
  if (!metadata.hasSelectedNumberingPlan()) {
    if (options.v2) {
      throw new ParseError("INVALID_COUNTRY");
    }
    return {};
  }
  if (!nationalNumber || nationalNumber.length < MIN_LENGTH_FOR_NSN) {
    if (options.v2) {
      throw new ParseError("TOO_SHORT");
    }
    return {};
  }
  if (nationalNumber.length > MAX_LENGTH_FOR_NSN) {
    if (options.v2) {
      throw new ParseError("TOO_LONG");
    }
    return {};
  }
  if (options.v2) {
    var phoneNumber = new PhoneNumber(countryCallingCode, nationalNumber, metadata.metadata);
    if (country) {
      phoneNumber.country = country;
    }
    if (carrierCode) {
      phoneNumber.carrierCode = carrierCode;
    }
    if (ext) {
      phoneNumber.ext = ext;
    }
    phoneNumber.__countryCallingCodeSource = countryCallingCodeSource;
    return phoneNumber;
  }
  var valid = (options.extended ? metadata.hasSelectedNumberingPlan() : country) ? matchesEntirely(nationalNumber, metadata.nationalNumberPattern()) : false;
  if (!options.extended) {
    return valid ? result(country, nationalNumber, ext) : {};
  }
  return {
    country,
    countryCallingCode,
    carrierCode,
    valid,
    possible: valid ? true : options.extended === true && metadata.possibleLengths() && isPossibleNumber(nationalNumber, metadata) ? true : false,
    phone: nationalNumber,
    ext
  };
}
function _extractFormattedPhoneNumber(text, extract, throwOnError) {
  if (!text) {
    return;
  }
  if (text.length > MAX_INPUT_STRING_LENGTH) {
    if (throwOnError) {
      throw new ParseError("TOO_LONG");
    }
    return;
  }
  if (extract === false) {
    return text;
  }
  var startsAt = text.search(PHONE_NUMBER_START_PATTERN);
  if (startsAt < 0) {
    return;
  }
  return text.slice(startsAt).replace(AFTER_PHONE_NUMBER_END_PATTERN, "");
}
function parseInput(text, v2, extract) {
  var number = extractFormattedPhoneNumberFromPossibleRfc3966NumberUri(text, {
    extractFormattedPhoneNumber: function extractFormattedPhoneNumber2(text2) {
      return _extractFormattedPhoneNumber(text2, extract, v2);
    }
  });
  if (!number) {
    return {};
  }
  if (!isViablePhoneNumber(number)) {
    if (isViablePhoneNumberStart(number)) {
      return {
        error: "TOO_SHORT"
      };
    }
    return {};
  }
  var withExtensionStripped = extractExtension(number);
  if (withExtensionStripped.ext) {
    return withExtensionStripped;
  }
  return {
    number
  };
}
function result(country, nationalNumber, ext) {
  var result2 = {
    country,
    phone: nationalNumber
  };
  if (ext) {
    result2.ext = ext;
  }
  return result2;
}
function parsePhoneNumber(formattedPhoneNumber, defaultCountry, defaultCallingCode, metadata) {
  var _extractCountryCallin = extractCountryCallingCode(
    parseIncompletePhoneNumber(formattedPhoneNumber),
    void 0,
    // `defaultCountry` and `defaultCallingCode` are only used to detect
    // if it's an "international" phone number or not. They won't be used
    // to derive the resulting `countryCallingCode` from them, or anything like that.
    defaultCountry,
    defaultCallingCode,
    metadata.metadata
  ), countryCallingCodeSource = _extractCountryCallin.countryCallingCodeSource, countryCallingCode = _extractCountryCallin.countryCallingCode, number = _extractCountryCallin.number;
  var country;
  if (countryCallingCode) {
    metadata.selectNumberingPlan(countryCallingCode);
  } else if (number && (defaultCountry || defaultCallingCode)) {
    if (defaultCountry) {
      country = defaultCountry;
      metadata.selectNumberingPlan(defaultCountry);
      countryCallingCode = metadata.numberingPlan.callingCode();
    } else {
      metadata.selectNumberingPlan(defaultCallingCode);
      countryCallingCode = defaultCallingCode;
      if (USE_NON_GEOGRAPHIC_COUNTRY_CODE3) {
        if (metadata.isNonGeographicCallingCode(countryCallingCode)) {
          country = "001";
        }
      }
    }
  } else return {};
  if (!number) {
    return {
      countryCallingCodeSource,
      countryCallingCode
    };
  }
  var _extractNationalNumbe = extractNationalNumber(parseIncompletePhoneNumber(number), void 0, metadata), nationalNumber = _extractNationalNumbe.nationalNumber, carrierCode = _extractNationalNumbe.carrierCode;
  var exactCountry = getCountryByCallingCode(countryCallingCode, {
    nationalNumber,
    metadata
  });
  if (exactCountry) {
    country = exactCountry;
    if (exactCountry === "001") {
    } else {
      metadata.selectNumberingPlan(country);
    }
  }
  return {
    country,
    countryCallingCode,
    countryCallingCodeSource,
    nationalNumber,
    carrierCode
  };
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/parsePhoneNumberWithError_.js
function _typeof4(o) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof4(o);
}
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty2(e, r, t) {
  return (r = _toPropertyKey4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey4(t) {
  var i = _toPrimitive4(t, "string");
  return "symbol" == _typeof4(i) ? i : i + "";
}
function _toPrimitive4(t, r) {
  if ("object" != _typeof4(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof4(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function parsePhoneNumberWithError(text, options, metadata) {
  return parse(text, _objectSpread2(_objectSpread2({}, options), {}, {
    v2: true
  }), metadata);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/normalizeArguments.js
function _typeof5(o) {
  "@babel/helpers - typeof";
  return _typeof5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof5(o);
}
function ownKeys3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys3(Object(t), true).forEach(function(r2) {
      _defineProperty3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty3(e, r, t) {
  return (r = _toPropertyKey5(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey5(t) {
  var i = _toPrimitive5(t, "string");
  return "symbol" == _typeof5(i) ? i : i + "";
}
function _toPrimitive5(t, r) {
  if ("object" != _typeof5(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof5(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray6(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray6(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray6(r, a) : void 0;
  }
}
function _arrayLikeToArray6(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args), _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4), arg_1 = _Array$prototype$slic2[0], arg_2 = _Array$prototype$slic2[1], arg_3 = _Array$prototype$slic2[2], arg_4 = _Array$prototype$slic2[3];
  var text;
  var options;
  var metadata;
  if (typeof arg_1 === "string") {
    text = arg_1;
  } else throw new TypeError("A text for parsing must be a string.");
  if (!arg_2 || typeof arg_2 === "string") {
    if (arg_4) {
      options = arg_3;
      metadata = arg_4;
    } else {
      options = void 0;
      metadata = arg_3;
    }
    if (arg_2) {
      options = _objectSpread3({
        defaultCountry: arg_2
      }, options);
    }
  } else if (isObject(arg_2)) {
    if (arg_3) {
      options = arg_2;
      metadata = arg_3;
    } else {
      metadata = arg_2;
    }
  } else throw new Error("Invalid second argument: ".concat(arg_2));
  return {
    text,
    options,
    metadata
  };
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/parsePhoneNumber_.js
function _typeof6(o) {
  "@babel/helpers - typeof";
  return _typeof6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof6(o);
}
function ownKeys4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys4(Object(t), true).forEach(function(r2) {
      _defineProperty4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty4(e, r, t) {
  return (r = _toPropertyKey6(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey6(t) {
  var i = _toPrimitive6(t, "string");
  return "symbol" == _typeof6(i) ? i : i + "";
}
function _toPrimitive6(t, r) {
  if ("object" != _typeof6(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof6(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function parsePhoneNumber2(text, options, metadata) {
  if (options && options.defaultCountry && !isSupportedCountry(options.defaultCountry, metadata)) {
    options = _objectSpread4(_objectSpread4({}, options), {}, {
      defaultCountry: void 0
    });
  }
  try {
    return parsePhoneNumberWithError(text, options, metadata);
  } catch (error) {
    if (error instanceof ParseError) {
    } else {
      throw error;
    }
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/parsePhoneNumber.js
function parsePhoneNumber3() {
  var _normalizeArguments = normalizeArguments(arguments), text = _normalizeArguments.text, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
  return parsePhoneNumber2(text, options, metadata);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/AsYouTypeState.js
function _typeof7(o) {
  "@babel/helpers - typeof";
  return _typeof7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof7(o);
}
function _classCallCheck4(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties4(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey7(o.key), o);
  }
}
function _createClass4(e, r, t) {
  return r && _defineProperties4(e.prototype, r), t && _defineProperties4(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey7(t) {
  var i = _toPrimitive7(t, "string");
  return "symbol" == _typeof7(i) ? i : i + "";
}
function _toPrimitive7(t, r) {
  if ("object" != _typeof7(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof7(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var AsYouTypeState = /* @__PURE__ */ (function() {
  function AsYouTypeState2(_ref) {
    var onCountryChange = _ref.onCountryChange, onCallingCodeChange = _ref.onCallingCodeChange;
    _classCallCheck4(this, AsYouTypeState2);
    this.onCountryChange = onCountryChange;
    this.onCallingCodeChange = onCallingCodeChange;
  }
  return _createClass4(AsYouTypeState2, [{
    key: "reset",
    value: function reset(_ref2) {
      var country = _ref2.country, callingCode = _ref2.callingCode;
      this.international = false;
      this.missingPlus = false;
      this.IDDPrefix = void 0;
      this.callingCode = void 0;
      this.digits = "";
      this.resetNationalSignificantNumber();
      this.initCountryAndCallingCode(country, callingCode);
    }
  }, {
    key: "resetNationalSignificantNumber",
    value: function resetNationalSignificantNumber() {
      this.nationalSignificantNumber = this.getNationalDigits();
      this.nationalSignificantNumberIsModified = false;
      this.nationalPrefix = void 0;
      this.carrierCode = void 0;
      this.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix = void 0;
    }
  }, {
    key: "update",
    value: function update(properties) {
      for (var _i = 0, _Object$keys = Object.keys(properties); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        this[key] = properties[key];
      }
    }
  }, {
    key: "initCountryAndCallingCode",
    value: function initCountryAndCallingCode(country, callingCode) {
      this.setCountry(country);
      this.setCallingCode(callingCode);
    }
  }, {
    key: "setCountry",
    value: function setCountry(country) {
      this.country = country;
      this.onCountryChange(country);
    }
  }, {
    key: "setCallingCode",
    value: function setCallingCode(callingCode) {
      this.callingCode = callingCode;
      this.onCallingCodeChange(callingCode, this.country);
    }
  }, {
    key: "startInternationalNumber",
    value: function startInternationalNumber(country, callingCode) {
      this.international = true;
      this.initCountryAndCallingCode(country, callingCode);
    }
  }, {
    key: "appendDigits",
    value: function appendDigits(nextDigits) {
      this.digits += nextDigits;
    }
  }, {
    key: "appendNationalSignificantNumberDigits",
    value: function appendNationalSignificantNumberDigits(nextDigits) {
      this.nationalSignificantNumber += nextDigits;
    }
    /**
     * Returns the part of `this.digits` that corresponds to the national number.
     * Basically, all digits that have been input by the user, except for the
     * international prefix and the country calling code part
     * (if the number is an international one).
     * @return {string}
     */
  }, {
    key: "getNationalDigits",
    value: function getNationalDigits() {
      if (this.international) {
        return this.digits.slice((this.IDDPrefix ? this.IDDPrefix.length : 0) + (this.callingCode ? this.callingCode.length : 0));
      }
      return this.digits;
    }
  }, {
    key: "getDigitsWithoutInternationalPrefix",
    value: function getDigitsWithoutInternationalPrefix() {
      if (this.international) {
        if (this.IDDPrefix) {
          return this.digits.slice(this.IDDPrefix.length);
        }
      }
      return this.digits;
    }
  }]);
})();

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/AsYouTypeFormatter.util.js
function _createForOfIteratorHelperLoose6(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray7(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function() {
      return o >= r.length ? { done: true } : { done: false, value: r[o++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray7(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray7(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray7(r, a) : void 0;
  }
}
function _arrayLikeToArray7(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var DIGIT_PLACEHOLDER = "x";
var DIGIT_PLACEHOLDER_MATCHER = new RegExp(DIGIT_PLACEHOLDER);
function repeat(string, times) {
  if (times < 1) {
    return "";
  }
  var result2 = "";
  while (times > 1) {
    if (times & 1) {
      result2 += string;
    }
    times >>= 1;
    string += string;
  }
  return result2 + string;
}
function cutAndStripNonPairedParens(string, cutBeforeIndex) {
  if (string[cutBeforeIndex] === ")") {
    cutBeforeIndex++;
  }
  return stripNonPairedParens(string.slice(0, cutBeforeIndex));
}
function stripNonPairedParens(string) {
  var dangling_braces = [];
  var i = 0;
  while (i < string.length) {
    if (string[i] === "(") {
      dangling_braces.push(i);
    } else if (string[i] === ")") {
      dangling_braces.pop();
    }
    i++;
  }
  var start = 0;
  var cleared_string = "";
  dangling_braces.push(string.length);
  for (var _i = 0, _dangling_braces = dangling_braces; _i < _dangling_braces.length; _i++) {
    var index = _dangling_braces[_i];
    cleared_string += string.slice(start, index);
    start = index + 1;
  }
  return cleared_string;
}
function populateTemplateWithDigits(template, position, digits) {
  for (var _iterator2 = _createForOfIteratorHelperLoose6(digits.split("")), _step2; !(_step2 = _iterator2()).done; ) {
    var digit = _step2.value;
    if (template.slice(position + 1).search(DIGIT_PLACEHOLDER_MATCHER) < 0) {
      return;
    }
    position = template.search(DIGIT_PLACEHOLDER_MATCHER);
    template = template.replace(DIGIT_PLACEHOLDER_MATCHER, digit);
  }
  return [template, position];
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/AsYouTypeFormatter.complete.js
function formatCompleteNumber(state, format, _ref) {
  var metadata = _ref.metadata, shouldTryNationalPrefixFormattingRule = _ref.shouldTryNationalPrefixFormattingRule, getSeparatorAfterNationalPrefix = _ref.getSeparatorAfterNationalPrefix;
  var matcher = new RegExp("^(?:".concat(format.pattern(), ")$"));
  if (matcher.test(state.nationalSignificantNumber)) {
    return formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(state, format, {
      metadata,
      shouldTryNationalPrefixFormattingRule,
      getSeparatorAfterNationalPrefix
    });
  }
}
function canFormatCompleteNumber(nationalSignificantNumber, metadata) {
  return checkNumberLength(nationalSignificantNumber, void 0, metadata) === "IS_POSSIBLE";
}
function formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(state, format, _ref2) {
  var metadata = _ref2.metadata, shouldTryNationalPrefixFormattingRule = _ref2.shouldTryNationalPrefixFormattingRule, getSeparatorAfterNationalPrefix = _ref2.getSeparatorAfterNationalPrefix;
  var nationalSignificantNumber = state.nationalSignificantNumber, international = state.international, nationalPrefix = state.nationalPrefix, carrierCode = state.carrierCode;
  if (shouldTryNationalPrefixFormattingRule(format)) {
    var formattedNumber = formatNationalNumber2(state, format, {
      useNationalPrefixFormattingRule: true,
      getSeparatorAfterNationalPrefix,
      metadata
    });
    if (formattedNumber) {
      return formattedNumber;
    }
  }
  return formatNationalNumber2(state, format, {
    useNationalPrefixFormattingRule: false,
    getSeparatorAfterNationalPrefix,
    metadata
  });
}
function formatNationalNumber2(state, format, _ref3) {
  var metadata = _ref3.metadata, useNationalPrefixFormattingRule = _ref3.useNationalPrefixFormattingRule, getSeparatorAfterNationalPrefix = _ref3.getSeparatorAfterNationalPrefix;
  var formattedNationalNumber = formatNationalNumberUsingFormat(state.nationalSignificantNumber, format, {
    carrierCode: state.carrierCode,
    useInternationalFormat: state.international,
    withNationalPrefix: useNationalPrefixFormattingRule,
    metadata
  });
  if (!useNationalPrefixFormattingRule) {
    if (state.nationalPrefix) {
      formattedNationalNumber = state.nationalPrefix + getSeparatorAfterNationalPrefix(format) + formattedNationalNumber;
    } else if (state.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix) {
      formattedNationalNumber = state.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix + " " + formattedNationalNumber;
    }
  }
  if (isValidFormattedNationalNumber(formattedNationalNumber, state)) {
    return formattedNationalNumber;
  }
}
function isValidFormattedNationalNumber(formattedNationalNumber, state) {
  return parseDigits(formattedNationalNumber) === state.getNationalDigits();
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/AsYouTypeFormatter.PatternParser.js
function _typeof8(o) {
  "@babel/helpers - typeof";
  return _typeof8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof8(o);
}
function _classCallCheck5(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties5(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey8(o.key), o);
  }
}
function _createClass5(e, r, t) {
  return r && _defineProperties5(e.prototype, r), t && _defineProperties5(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey8(t) {
  var i = _toPrimitive8(t, "string");
  return "symbol" == _typeof8(i) ? i : i + "";
}
function _toPrimitive8(t, r) {
  if ("object" != _typeof8(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof8(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var PatternParser = /* @__PURE__ */ (function() {
  function PatternParser2() {
    _classCallCheck5(this, PatternParser2);
  }
  return _createClass5(PatternParser2, [{
    key: "parse",
    value: function parse2(pattern) {
      this.context = [{
        or: true,
        instructions: []
      }];
      this.parsePattern(pattern);
      if (this.context.length !== 1) {
        throw new Error("Non-finalized contexts left when pattern parse ended");
      }
      var _this$context$ = this.context[0], branches = _this$context$.branches, instructions = _this$context$.instructions;
      if (branches) {
        return {
          op: "|",
          args: branches.concat([expandSingleElementArray(instructions)])
        };
      }
      if (instructions.length === 0) {
        throw new Error("Pattern is required");
      }
      if (instructions.length === 1) {
        return instructions[0];
      }
      return instructions;
    }
  }, {
    key: "startContext",
    value: function startContext(context) {
      this.context.push(context);
    }
  }, {
    key: "endContext",
    value: function endContext() {
      this.context.pop();
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.context[this.context.length - 1];
    }
  }, {
    key: "parsePattern",
    value: function parsePattern(pattern) {
      if (!pattern) {
        throw new Error("Pattern is required");
      }
      var match = pattern.match(OPERATOR);
      if (!match) {
        if (ILLEGAL_CHARACTER_REGEXP.test(pattern)) {
          throw new Error("Illegal characters found in a pattern: ".concat(pattern));
        }
        this.getContext().instructions = this.getContext().instructions.concat(pattern.split(""));
        return;
      }
      var operator = match[1];
      var before = pattern.slice(0, match.index);
      var rightPart = pattern.slice(match.index + operator.length);
      switch (operator) {
        case "(?:":
          if (before) {
            this.parsePattern(before);
          }
          this.startContext({
            or: true,
            instructions: [],
            branches: []
          });
          break;
        case ")":
          if (!this.getContext().or) {
            throw new Error('")" operator must be preceded by "(?:" operator');
          }
          if (before) {
            this.parsePattern(before);
          }
          if (this.getContext().instructions.length === 0) {
            throw new Error('No instructions found after "|" operator in an "or" group');
          }
          var _this$getContext = this.getContext(), branches = _this$getContext.branches;
          branches.push(expandSingleElementArray(this.getContext().instructions));
          this.endContext();
          this.getContext().instructions.push({
            op: "|",
            args: branches
          });
          break;
        case "|":
          if (!this.getContext().or) {
            throw new Error('"|" operator can only be used inside "or" groups');
          }
          if (before) {
            this.parsePattern(before);
          }
          if (!this.getContext().branches) {
            if (this.context.length === 1) {
              this.getContext().branches = [];
            } else {
              throw new Error('"branches" not found in an "or" group context');
            }
          }
          this.getContext().branches.push(expandSingleElementArray(this.getContext().instructions));
          this.getContext().instructions = [];
          break;
        case "[":
          if (before) {
            this.parsePattern(before);
          }
          this.startContext({
            oneOfSet: true
          });
          break;
        case "]":
          if (!this.getContext().oneOfSet) {
            throw new Error('"]" operator must be preceded by "[" operator');
          }
          this.endContext();
          this.getContext().instructions.push({
            op: "[]",
            args: parseOneOfSet(before)
          });
          break;
        /* istanbul ignore next */
        default:
          throw new Error("Unknown operator: ".concat(operator));
      }
      if (rightPart) {
        this.parsePattern(rightPart);
      }
    }
  }]);
})();
function parseOneOfSet(pattern) {
  var values = [];
  var i = 0;
  while (i < pattern.length) {
    if (pattern[i] === "-") {
      if (i === 0 || i === pattern.length - 1) {
        throw new Error("Couldn't parse a one-of set pattern: ".concat(pattern));
      }
      var prevValue = pattern[i - 1].charCodeAt(0) + 1;
      var nextValue = pattern[i + 1].charCodeAt(0) - 1;
      var value = prevValue;
      while (value <= nextValue) {
        values.push(String.fromCharCode(value));
        value++;
      }
    } else {
      values.push(pattern[i]);
    }
    i++;
  }
  return values;
}
var ILLEGAL_CHARACTER_REGEXP = /[\(\)\[\]\?\:\|]/;
var OPERATOR = new RegExp(
  // any of:
  "(\\||\\(\\?\\:|\\)|\\[|\\])"
);
function expandSingleElementArray(array) {
  if (array.length === 1) {
    return array[0];
  }
  return array;
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/AsYouTypeFormatter.PatternMatcher.js
function _createForOfIteratorHelperLoose7(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray8(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function() {
      return o >= r.length ? { done: true } : { done: false, value: r[o++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray8(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray8(r, a) : void 0;
  }
}
function _arrayLikeToArray8(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _typeof9(o) {
  "@babel/helpers - typeof";
  return _typeof9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof9(o);
}
function _classCallCheck6(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties6(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey9(o.key), o);
  }
}
function _createClass6(e, r, t) {
  return r && _defineProperties6(e.prototype, r), t && _defineProperties6(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey9(t) {
  var i = _toPrimitive9(t, "string");
  return "symbol" == _typeof9(i) ? i : i + "";
}
function _toPrimitive9(t, r) {
  if ("object" != _typeof9(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof9(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var PatternMatcher = /* @__PURE__ */ (function() {
  function PatternMatcher2(pattern) {
    _classCallCheck6(this, PatternMatcher2);
    this.matchTree = new PatternParser().parse(pattern);
  }
  return _createClass6(PatternMatcher2, [{
    key: "match",
    value: function match(string) {
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, allowOverflow = _ref.allowOverflow;
      if (!string) {
        throw new Error("String is required");
      }
      var result2 = _match(string.split(""), this.matchTree, true);
      if (result2 && result2.match) {
        delete result2.matchedChars;
      }
      if (result2 && result2.overflow) {
        if (!allowOverflow) {
          return;
        }
      }
      return result2;
    }
  }]);
})();
function _match(characters, tree, last) {
  if (typeof tree === "string") {
    var characterString = characters.join("");
    if (tree.indexOf(characterString) === 0) {
      if (characters.length === tree.length) {
        return {
          match: true,
          matchedChars: characters
        };
      }
      return {
        partialMatch: true
        // matchedChars: characters
      };
    }
    if (characterString.indexOf(tree) === 0) {
      if (last) {
        if (characters.length > tree.length) {
          return {
            overflow: true
          };
        }
      }
      return {
        match: true,
        matchedChars: characters.slice(0, tree.length)
      };
    }
    return;
  }
  if (Array.isArray(tree)) {
    var restCharacters = characters.slice();
    var i = 0;
    while (i < tree.length) {
      var subtree = tree[i];
      var result2 = _match(restCharacters, subtree, last && i === tree.length - 1);
      if (!result2) {
        return;
      } else if (result2.overflow) {
        return result2;
      } else if (result2.match) {
        restCharacters = restCharacters.slice(result2.matchedChars.length);
        if (restCharacters.length === 0) {
          if (i === tree.length - 1) {
            return {
              match: true,
              matchedChars: characters
            };
          } else {
            return {
              partialMatch: true
              // matchedChars: characters
            };
          }
        }
      } else {
        if (result2.partialMatch) {
          return {
            partialMatch: true
            // matchedChars: characters
          };
        } else {
          throw new Error("Unsupported match result:\n".concat(JSON.stringify(result2, null, 2)));
        }
      }
      i++;
    }
    if (last) {
      return {
        overflow: true
      };
    }
    return {
      match: true,
      matchedChars: characters.slice(0, characters.length - restCharacters.length)
    };
  }
  switch (tree.op) {
    case "|":
      var partialMatch;
      for (var _iterator = _createForOfIteratorHelperLoose7(tree.args), _step; !(_step = _iterator()).done; ) {
        var branch = _step.value;
        var _result = _match(characters, branch, last);
        if (_result) {
          if (_result.overflow) {
            return _result;
          } else if (_result.match) {
            return {
              match: true,
              matchedChars: _result.matchedChars
            };
          } else {
            if (_result.partialMatch) {
              partialMatch = true;
            } else {
              throw new Error("Unsupported match result:\n".concat(JSON.stringify(_result, null, 2)));
            }
          }
        }
      }
      if (partialMatch) {
        return {
          partialMatch: true
          // matchedChars: ...
        };
      }
      return;
    case "[]":
      for (var _iterator2 = _createForOfIteratorHelperLoose7(tree.args), _step2; !(_step2 = _iterator2()).done; ) {
        var _char = _step2.value;
        if (characters[0] === _char) {
          if (characters.length === 1) {
            return {
              match: true,
              matchedChars: characters
            };
          }
          if (last) {
            return {
              overflow: true
            };
          }
          return {
            match: true,
            matchedChars: [_char]
          };
        }
      }
      return;
    /* istanbul ignore next */
    default:
      throw new Error("Unsupported instruction tree: ".concat(tree));
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/AsYouTypeFormatter.js
function _typeof10(o) {
  "@babel/helpers - typeof";
  return _typeof10 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof10(o);
}
function _createForOfIteratorHelperLoose8(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray9(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function() {
      return o >= r.length ? { done: true } : { done: false, value: r[o++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray9(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray9(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray9(r, a) : void 0;
  }
}
function _arrayLikeToArray9(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _classCallCheck7(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties7(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey10(o.key), o);
  }
}
function _createClass7(e, r, t) {
  return r && _defineProperties7(e.prototype, r), t && _defineProperties7(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey10(t) {
  var i = _toPrimitive10(t, "string");
  return "symbol" == _typeof10(i) ? i : i + "";
}
function _toPrimitive10(t, r) {
  if ("object" != _typeof10(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof10(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var DUMMY_DIGIT = "9";
var LONGEST_NATIONAL_PHONE_NUMBER_LENGTH = 15;
var LONGEST_DUMMY_PHONE_NUMBER = repeat(DUMMY_DIGIT, LONGEST_NATIONAL_PHONE_NUMBER_LENGTH);
var NATIONAL_PREFIX_SEPARATORS_PATTERN = /[- ]/;
var SUPPORT_LEGACY_FORMATTING_PATTERNS = true;
var CREATE_CHARACTER_CLASS_PATTERN = SUPPORT_LEGACY_FORMATTING_PATTERNS && function() {
  return /\[([^\[\]])*\]/g;
};
var CREATE_STANDALONE_DIGIT_PATTERN = SUPPORT_LEGACY_FORMATTING_PATTERNS && function() {
  return /\d(?=[^,}][^,}])/g;
};
var NON_ALTERING_FORMAT_REG_EXP = new RegExp("[" + VALID_PUNCTUATION + "]*\\$1[" + VALID_PUNCTUATION + "]*(\\$\\d[" + VALID_PUNCTUATION + "]*)*$");
var MIN_LEADING_DIGITS_LENGTH = 3;
var AsYouTypeFormatter = /* @__PURE__ */ (function() {
  function AsYouTypeFormatter2(_ref) {
    var state = _ref.state, metadata = _ref.metadata;
    _classCallCheck7(this, AsYouTypeFormatter2);
    this.metadata = metadata;
    this.resetFormat();
  }
  return _createClass7(AsYouTypeFormatter2, [{
    key: "resetFormat",
    value: function resetFormat() {
      this.chosenFormat = void 0;
      this.template = void 0;
      this.nationalNumberTemplate = void 0;
      this.populatedNationalNumberTemplate = void 0;
      this.populatedNationalNumberTemplatePosition = -1;
    }
  }, {
    key: "reset",
    value: function reset(numberingPlan, state) {
      this.resetFormat();
      if (numberingPlan) {
        this.isNANP = numberingPlan.callingCode() === "1";
        this.matchingFormats = numberingPlan.formats();
        if (state.nationalSignificantNumber) {
          this.narrowDownMatchingFormats(state);
        }
      } else {
        this.isNANP = void 0;
        this.matchingFormats = [];
      }
    }
    /**
     * Formats an updated phone number.
     * @param  {string} nextDigits — Additional phone number digits.
     * @param  {object} state — `AsYouType` state.
     * @return {[string]} Returns undefined if the updated phone number can't be formatted using any of the available formats.
     */
  }, {
    key: "format",
    value: function format(nextDigits, state) {
      var _this = this;
      if (canFormatCompleteNumber(state.nationalSignificantNumber, this.metadata)) {
        for (var _iterator = _createForOfIteratorHelperLoose8(this.matchingFormats), _step; !(_step = _iterator()).done; ) {
          var _format = _step.value;
          var formattedCompleteNumber = formatCompleteNumber(state, _format, {
            metadata: this.metadata,
            shouldTryNationalPrefixFormattingRule: function shouldTryNationalPrefixFormattingRule(format2) {
              return _this.shouldTryNationalPrefixFormattingRule(format2, {
                international: state.international,
                nationalPrefix: state.nationalPrefix
              });
            },
            getSeparatorAfterNationalPrefix: function getSeparatorAfterNationalPrefix(format2) {
              return _this.getSeparatorAfterNationalPrefix(format2);
            }
          });
          if (formattedCompleteNumber) {
            this.resetFormat();
            this.chosenFormat = _format;
            this.setNationalNumberTemplate(formattedCompleteNumber.replace(/\d/g, DIGIT_PLACEHOLDER), state);
            this.populatedNationalNumberTemplate = formattedCompleteNumber;
            this.populatedNationalNumberTemplatePosition = this.template.lastIndexOf(DIGIT_PLACEHOLDER);
            return formattedCompleteNumber;
          }
        }
      }
      return this.formatNationalNumberWithNextDigits(nextDigits, state);
    }
    // Formats the next phone number digits.
  }, {
    key: "formatNationalNumberWithNextDigits",
    value: function formatNationalNumberWithNextDigits(nextDigits, state) {
      var previouslyChosenFormat = this.chosenFormat;
      var newlyChosenFormat = this.chooseFormat(state);
      if (newlyChosenFormat) {
        if (newlyChosenFormat === previouslyChosenFormat) {
          return this.formatNextNationalNumberDigits(nextDigits);
        } else {
          return this.formatNextNationalNumberDigits(state.getNationalDigits());
        }
      }
    }
  }, {
    key: "narrowDownMatchingFormats",
    value: function narrowDownMatchingFormats(_ref2) {
      var _this2 = this;
      var nationalSignificantNumber = _ref2.nationalSignificantNumber, nationalPrefix = _ref2.nationalPrefix, international = _ref2.international;
      var leadingDigits = nationalSignificantNumber;
      var leadingDigitsPatternIndex = leadingDigits.length - MIN_LEADING_DIGITS_LENGTH;
      if (leadingDigitsPatternIndex < 0) {
        leadingDigitsPatternIndex = 0;
      }
      this.matchingFormats = this.matchingFormats.filter(function(format) {
        return _this2.formatSuits(format, international, nationalPrefix) && _this2.formatMatches(format, leadingDigits, leadingDigitsPatternIndex);
      });
      if (this.chosenFormat && this.matchingFormats.indexOf(this.chosenFormat) === -1) {
        this.resetFormat();
      }
    }
  }, {
    key: "formatSuits",
    value: function formatSuits(format, international, nationalPrefix) {
      if (nationalPrefix && !format.usesNationalPrefix() && // !format.domesticCarrierCodeFormattingRule() &&
      !format.nationalPrefixIsOptionalWhenFormattingInNationalFormat()) {
        return false;
      }
      if (!international && !nationalPrefix && format.nationalPrefixIsMandatoryWhenFormattingInNationalFormat()) {
        return false;
      }
      return true;
    }
  }, {
    key: "formatMatches",
    value: function formatMatches(format, leadingDigits, leadingDigitsPatternIndex) {
      var leadingDigitsPatternsCount = format.leadingDigitsPatterns().length;
      if (leadingDigitsPatternsCount === 0) {
        return true;
      }
      leadingDigitsPatternIndex = Math.min(leadingDigitsPatternIndex, leadingDigitsPatternsCount - 1);
      var leadingDigitsPattern = format.leadingDigitsPatterns()[leadingDigitsPatternIndex];
      if (leadingDigits.length < MIN_LEADING_DIGITS_LENGTH) {
        try {
          return new PatternMatcher(leadingDigitsPattern).match(leadingDigits, {
            allowOverflow: true
          }) !== void 0;
        } catch (error) {
          console.error(error);
          return true;
        }
      }
      return new RegExp("^(".concat(leadingDigitsPattern, ")")).test(leadingDigits);
    }
  }, {
    key: "getFormatFormat",
    value: function getFormatFormat(format, international) {
      return international ? format.internationalFormat() : format.format();
    }
  }, {
    key: "chooseFormat",
    value: function chooseFormat(state) {
      var _this3 = this;
      var _loop = function _loop2() {
        var format = _step2.value;
        if (_this3.chosenFormat === format) {
          return 0;
        }
        if (!NON_ALTERING_FORMAT_REG_EXP.test(_this3.getFormatFormat(format, state.international))) {
          return 1;
        }
        if (!_this3.createTemplateForFormat(format, state)) {
          _this3.matchingFormats = _this3.matchingFormats.filter(function(_) {
            return _ !== format;
          });
          return 1;
        }
        _this3.chosenFormat = format;
        return 0;
      }, _ret;
      for (var _iterator2 = _createForOfIteratorHelperLoose8(this.matchingFormats.slice()), _step2; !(_step2 = _iterator2()).done; ) {
        _ret = _loop();
        if (_ret === 0) break;
        if (_ret === 1) continue;
      }
      if (!this.chosenFormat) {
        this.resetFormat();
      }
      return this.chosenFormat;
    }
  }, {
    key: "createTemplateForFormat",
    value: function createTemplateForFormat(format, state) {
      if (SUPPORT_LEGACY_FORMATTING_PATTERNS && format.pattern().indexOf("|") >= 0) {
        return;
      }
      var template = this.getTemplateForFormat(format, state);
      if (template) {
        this.setNationalNumberTemplate(template, state);
        return true;
      }
    }
  }, {
    key: "getSeparatorAfterNationalPrefix",
    value: function getSeparatorAfterNationalPrefix(format) {
      if (this.isNANP) {
        return " ";
      }
      if (format && format.nationalPrefixFormattingRule() && NATIONAL_PREFIX_SEPARATORS_PATTERN.test(format.nationalPrefixFormattingRule())) {
        return " ";
      }
      return "";
    }
  }, {
    key: "getInternationalPrefixBeforeCountryCallingCode",
    value: function getInternationalPrefixBeforeCountryCallingCode(_ref3, options) {
      var IDDPrefix = _ref3.IDDPrefix, missingPlus = _ref3.missingPlus;
      if (IDDPrefix) {
        return options && options.spacing === false ? IDDPrefix : IDDPrefix + " ";
      }
      if (missingPlus) {
        return "";
      }
      return "+";
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(state) {
      if (!this.template) {
        return;
      }
      var index = -1;
      var i = 0;
      var internationalPrefix = state.international ? this.getInternationalPrefixBeforeCountryCallingCode(state, {
        spacing: false
      }) : "";
      while (i < internationalPrefix.length + state.getDigitsWithoutInternationalPrefix().length) {
        index = this.template.indexOf(DIGIT_PLACEHOLDER, index + 1);
        i++;
      }
      return cutAndStripNonPairedParens(this.template, index + 1);
    }
  }, {
    key: "setNationalNumberTemplate",
    value: function setNationalNumberTemplate(template, state) {
      this.nationalNumberTemplate = template;
      this.populatedNationalNumberTemplate = template;
      this.populatedNationalNumberTemplatePosition = -1;
      if (state.international) {
        this.template = this.getInternationalPrefixBeforeCountryCallingCode(state).replace(/[\d\+]/g, DIGIT_PLACEHOLDER) + repeat(DIGIT_PLACEHOLDER, state.callingCode.length) + " " + template;
      } else {
        this.template = template;
      }
    }
    /**
     * Generates formatting template for a national phone number,
     * optionally containing a national prefix, for a format.
     * @param  {Format} format
     * @param  {string} nationalPrefix
     * @return {string}
     */
  }, {
    key: "getTemplateForFormat",
    value: function getTemplateForFormat(format, _ref4) {
      var nationalSignificantNumber = _ref4.nationalSignificantNumber, international = _ref4.international, nationalPrefix = _ref4.nationalPrefix, prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix = _ref4.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix;
      var pattern = format.pattern();
      if (SUPPORT_LEGACY_FORMATTING_PATTERNS) {
        pattern = pattern.replace(CREATE_CHARACTER_CLASS_PATTERN(), "\\d").replace(CREATE_STANDALONE_DIGIT_PATTERN(), "\\d");
      }
      var digits = LONGEST_DUMMY_PHONE_NUMBER.match(pattern)[0];
      if (nationalSignificantNumber.length > digits.length) {
        return;
      }
      var strictPattern = new RegExp("^" + pattern + "$");
      var nationalNumberDummyDigits = nationalSignificantNumber.replace(/\d/g, DUMMY_DIGIT);
      if (strictPattern.test(nationalNumberDummyDigits)) {
        digits = nationalNumberDummyDigits;
      }
      var numberFormat = this.getFormatFormat(format, international);
      var nationalPrefixIncludedInTemplate;
      if (this.shouldTryNationalPrefixFormattingRule(format, {
        international,
        nationalPrefix
      })) {
        var numberFormatWithNationalPrefix = numberFormat.replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule());
        if (parseDigits(format.nationalPrefixFormattingRule()) === (nationalPrefix || "") + parseDigits("$1")) {
          numberFormat = numberFormatWithNationalPrefix;
          nationalPrefixIncludedInTemplate = true;
          if (nationalPrefix) {
            var i = nationalPrefix.length;
            while (i > 0) {
              numberFormat = numberFormat.replace(/\d/, DIGIT_PLACEHOLDER);
              i--;
            }
          }
        }
      }
      var template = digits.replace(new RegExp(pattern), numberFormat).replace(new RegExp(DUMMY_DIGIT, "g"), DIGIT_PLACEHOLDER);
      if (!nationalPrefixIncludedInTemplate) {
        if (prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix) {
          template = repeat(DIGIT_PLACEHOLDER, prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix.length) + " " + template;
        } else if (nationalPrefix) {
          template = repeat(DIGIT_PLACEHOLDER, nationalPrefix.length) + this.getSeparatorAfterNationalPrefix(format) + template;
        }
      }
      if (international) {
        template = applyInternationalSeparatorStyle(template);
      }
      return template;
    }
  }, {
    key: "formatNextNationalNumberDigits",
    value: function formatNextNationalNumberDigits(digits) {
      var result2 = populateTemplateWithDigits(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition, digits);
      if (!result2) {
        this.resetFormat();
        return;
      }
      this.populatedNationalNumberTemplate = result2[0];
      this.populatedNationalNumberTemplatePosition = result2[1];
      return cutAndStripNonPairedParens(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1);
    }
  }, {
    key: "shouldTryNationalPrefixFormattingRule",
    value: function shouldTryNationalPrefixFormattingRule(format, _ref5) {
      var international = _ref5.international, nationalPrefix = _ref5.nationalPrefix;
      if (format.nationalPrefixFormattingRule()) {
        var usesNationalPrefix = format.usesNationalPrefix();
        if (usesNationalPrefix && nationalPrefix || !usesNationalPrefix && !international) {
          return true;
        }
      }
    }
  }]);
})();

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/AsYouTypeParser.js
function _typeof11(o) {
  "@babel/helpers - typeof";
  return _typeof11 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof11(o);
}
function _slicedToArray2(r, e) {
  return _arrayWithHoles2(r) || _iterableToArrayLimit2(r, e) || _unsupportedIterableToArray10(r, e) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray10(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray10(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray10(r, a) : void 0;
  }
}
function _arrayLikeToArray10(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles2(r) {
  if (Array.isArray(r)) return r;
}
function _classCallCheck8(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties8(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey11(o.key), o);
  }
}
function _createClass8(e, r, t) {
  return r && _defineProperties8(e.prototype, r), t && _defineProperties8(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey11(t) {
  var i = _toPrimitive11(t, "string");
  return "symbol" == _typeof11(i) ? i : i + "";
}
function _toPrimitive11(t, r) {
  if ("object" != _typeof11(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof11(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART = "[" + VALID_PUNCTUATION + VALID_DIGITS + "]+";
var VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART_PATTERN = new RegExp("^" + VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART + "$", "i");
var VALID_FORMATTED_PHONE_NUMBER_PART = "(?:[" + PLUS_CHARS + "][" + VALID_PUNCTUATION + VALID_DIGITS + "]*|[" + VALID_PUNCTUATION + VALID_DIGITS + "]+)";
var AFTER_PHONE_NUMBER_DIGITS_END_PATTERN = new RegExp("[^" + VALID_PUNCTUATION + VALID_DIGITS + "]+.*$");
var COMPLEX_NATIONAL_PREFIX = /[^\d\[\]]/;
var AsYouTypeParser = /* @__PURE__ */ (function() {
  function AsYouTypeParser2(_ref) {
    var defaultCountry = _ref.defaultCountry, defaultCallingCode = _ref.defaultCallingCode, metadata = _ref.metadata, onNationalSignificantNumberChange = _ref.onNationalSignificantNumberChange;
    _classCallCheck8(this, AsYouTypeParser2);
    this.defaultCountry = defaultCountry;
    this.defaultCallingCode = defaultCallingCode;
    this.metadata = metadata;
    this.onNationalSignificantNumberChange = onNationalSignificantNumberChange;
  }
  return _createClass8(AsYouTypeParser2, [{
    key: "input",
    value: function input(text, state) {
      var _extractFormattedDigi = extractFormattedDigitsAndPlus(text), _extractFormattedDigi2 = _slicedToArray2(_extractFormattedDigi, 2), formattedDigits = _extractFormattedDigi2[0], hasPlus = _extractFormattedDigi2[1];
      var digits = parseDigits(formattedDigits);
      var justLeadingPlus;
      if (hasPlus) {
        if (!state.digits) {
          state.startInternationalNumber(void 0, void 0);
          if (!digits) {
            justLeadingPlus = true;
          }
        }
      }
      if (digits) {
        this.inputDigits(digits, state);
      }
      return {
        digits,
        justLeadingPlus
      };
    }
    /**
     * Inputs "next" phone number digits.
     * @param  {string} digits
     * @return {string} [formattedNumber] Formatted national phone number (if it can be formatted at this stage). Returning `undefined` means "don't format the national phone number at this stage".
     */
  }, {
    key: "inputDigits",
    value: function inputDigits(nextDigits, state) {
      var digits = state.digits;
      var hasReceivedThreeLeadingDigits = digits.length < 3 && digits.length + nextDigits.length >= 3;
      state.appendDigits(nextDigits);
      if (hasReceivedThreeLeadingDigits) {
        this.extractIddPrefix(state);
      }
      if (this.isWaitingForCountryCallingCode(state)) {
        if (!this.extractCountryCallingCode(state)) {
          return;
        }
      } else {
        state.appendNationalSignificantNumberDigits(nextDigits);
      }
      if (!state.international) {
        if (!this.hasExtractedNationalSignificantNumber) {
          this.extractNationalSignificantNumber(state.getNationalDigits(), function(stateUpdate) {
            return state.update(stateUpdate);
          });
        }
      }
    }
  }, {
    key: "isWaitingForCountryCallingCode",
    value: function isWaitingForCountryCallingCode(_ref2) {
      var international = _ref2.international, callingCode = _ref2.callingCode;
      return international && !callingCode;
    }
    // Extracts a country calling code from a number
    // being entered in internatonal format.
  }, {
    key: "extractCountryCallingCode",
    value: function extractCountryCallingCode2(state) {
      var _extractCountryCallin = extractCountryCallingCode("+" + state.getDigitsWithoutInternationalPrefix(), state.country, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata), countryCallingCode = _extractCountryCallin.countryCallingCode, number = _extractCountryCallin.number;
      if (countryCallingCode) {
        state.setCallingCode(countryCallingCode);
        state.update({
          nationalSignificantNumber: number
        });
        return true;
      }
    }
  }, {
    key: "reset",
    value: function reset(numberingPlan) {
      if (numberingPlan) {
        this.hasSelectedNumberingPlan = true;
        var nationalPrefixForParsing = numberingPlan._nationalPrefixForParsing();
        this.couldPossiblyExtractAnotherNationalSignificantNumber = nationalPrefixForParsing && COMPLEX_NATIONAL_PREFIX.test(nationalPrefixForParsing);
      } else {
        this.hasSelectedNumberingPlan = void 0;
        this.couldPossiblyExtractAnotherNationalSignificantNumber = void 0;
      }
    }
    /**
     * Extracts a national (significant) number from user input.
     * Google's library is different in that it only applies `national_prefix_for_parsing`
     * and doesn't apply `national_prefix_transform_rule` after that.
     * https://github.com/google/libphonenumber/blob/a3d70b0487875475e6ad659af404943211d26456/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L539
     * @return {boolean} [extracted]
     */
  }, {
    key: "extractNationalSignificantNumber",
    value: function extractNationalSignificantNumber(nationalDigits, setState) {
      if (!this.hasSelectedNumberingPlan) {
        return;
      }
      var _extractNationalNumbe = extractNationalNumberFromPossiblyIncompleteNumber(nationalDigits, this.metadata), nationalPrefix = _extractNationalNumbe.nationalPrefix, nationalNumber = _extractNationalNumbe.nationalNumber, carrierCode = _extractNationalNumbe.carrierCode;
      if (nationalNumber === nationalDigits) {
        return;
      }
      this.onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber, nationalDigits, setState);
      return true;
    }
    /**
     * In Google's code this function is called "attempt to extract longer NDD".
     * "Some national prefixes are a substring of others", they say.
     * @return {boolean} [result] — Returns `true` if extracting a national prefix produced different results from what they were.
     */
  }, {
    key: "extractAnotherNationalSignificantNumber",
    value: function extractAnotherNationalSignificantNumber(nationalDigits, prevNationalSignificantNumber, setState) {
      if (!this.hasExtractedNationalSignificantNumber) {
        return this.extractNationalSignificantNumber(nationalDigits, setState);
      }
      if (!this.couldPossiblyExtractAnotherNationalSignificantNumber) {
        return;
      }
      var _extractNationalNumbe2 = extractNationalNumberFromPossiblyIncompleteNumber(nationalDigits, this.metadata), nationalPrefix = _extractNationalNumbe2.nationalPrefix, nationalNumber = _extractNationalNumbe2.nationalNumber, carrierCode = _extractNationalNumbe2.carrierCode;
      if (nationalNumber === prevNationalSignificantNumber) {
        return;
      }
      this.onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber, nationalDigits, setState);
      return true;
    }
  }, {
    key: "onExtractedNationalNumber",
    value: function onExtractedNationalNumber(nationalPrefix, carrierCode, nationalSignificantNumber, nationalDigits, setState) {
      var nationalSignificantNumberIsModified = false;
      var prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix;
      var nationalSignificantNumberIndex = nationalDigits.lastIndexOf(nationalSignificantNumber);
      if (nationalSignificantNumberIndex < 0 || nationalSignificantNumberIndex !== nationalDigits.length - nationalSignificantNumber.length) {
        nationalSignificantNumberIsModified = true;
      } else {
        var prefixBeforeNationalNumber = nationalDigits.slice(0, nationalSignificantNumberIndex);
        if (prefixBeforeNationalNumber) {
          if (prefixBeforeNationalNumber !== nationalPrefix) {
            prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix = prefixBeforeNationalNumber;
          }
        }
      }
      setState({
        nationalPrefix,
        carrierCode,
        nationalSignificantNumber,
        nationalSignificantNumberIsModified,
        prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix
      });
      this.hasExtractedNationalSignificantNumber = true;
      this.onNationalSignificantNumberChange();
    }
  }, {
    key: "reExtractNationalSignificantNumber",
    value: function reExtractNationalSignificantNumber(state) {
      if (this.extractAnotherNationalSignificantNumber(state.getNationalDigits(), state.nationalSignificantNumber, function(stateUpdate) {
        return state.update(stateUpdate);
      })) {
        return true;
      }
      if (this.extractIddPrefix(state)) {
        this.extractCallingCodeAndNationalSignificantNumber(state);
        return true;
      }
      if (this.fixMissingPlus(state)) {
        this.extractCallingCodeAndNationalSignificantNumber(state);
        return true;
      }
    }
  }, {
    key: "extractIddPrefix",
    value: function extractIddPrefix(state) {
      var international = state.international, IDDPrefix = state.IDDPrefix, digits = state.digits, nationalSignificantNumber = state.nationalSignificantNumber;
      if (international || IDDPrefix) {
        return;
      }
      var numberWithoutIDD = stripIddPrefix(digits, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata);
      if (numberWithoutIDD !== void 0 && numberWithoutIDD !== digits) {
        state.update({
          IDDPrefix: digits.slice(0, digits.length - numberWithoutIDD.length)
        });
        this.startInternationalNumber(state, {
          country: void 0,
          callingCode: void 0
        });
        return true;
      }
    }
  }, {
    key: "fixMissingPlus",
    value: function fixMissingPlus(state) {
      if (!state.international) {
        var _extractCountryCallin2 = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(state.digits, state.country, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata), newCallingCode = _extractCountryCallin2.countryCallingCode;
        if (newCallingCode) {
          state.update({
            missingPlus: true
          });
          this.startInternationalNumber(state, {
            country: state.country,
            callingCode: newCallingCode
          });
          return true;
        }
      }
    }
  }, {
    key: "startInternationalNumber",
    value: function startInternationalNumber(state, _ref3) {
      var country = _ref3.country, callingCode = _ref3.callingCode;
      state.startInternationalNumber(country, callingCode);
      if (state.nationalSignificantNumber) {
        state.resetNationalSignificantNumber();
        this.onNationalSignificantNumberChange();
        this.hasExtractedNationalSignificantNumber = void 0;
      }
    }
  }, {
    key: "extractCallingCodeAndNationalSignificantNumber",
    value: function extractCallingCodeAndNationalSignificantNumber(state) {
      if (this.extractCountryCallingCode(state)) {
        this.extractNationalSignificantNumber(state.getNationalDigits(), function(stateUpdate) {
          return state.update(stateUpdate);
        });
      }
    }
  }]);
})();
function extractFormattedPhoneNumber(text) {
  var startsAt = text.search(VALID_FORMATTED_PHONE_NUMBER_PART);
  if (startsAt < 0) {
    return;
  }
  text = text.slice(startsAt);
  var hasPlus;
  if (text[0] === "+") {
    hasPlus = true;
    text = text.slice("+".length);
  }
  text = text.replace(AFTER_PHONE_NUMBER_DIGITS_END_PATTERN, "");
  if (hasPlus) {
    text = "+" + text;
  }
  return text;
}
function _extractFormattedDigitsAndPlus(text) {
  var extractedNumber = extractFormattedPhoneNumber(text) || "";
  if (extractedNumber[0] === "+") {
    return [extractedNumber.slice("+".length), true];
  }
  return [extractedNumber];
}
function extractFormattedDigitsAndPlus(text) {
  var _extractFormattedDigi3 = _extractFormattedDigitsAndPlus(text), _extractFormattedDigi4 = _slicedToArray2(_extractFormattedDigi3, 2), formattedDigits = _extractFormattedDigi4[0], hasPlus = _extractFormattedDigi4[1];
  if (!VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART_PATTERN.test(formattedDigits)) {
    formattedDigits = "";
  }
  return [formattedDigits, hasPlus];
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/AsYouType.js
function _typeof12(o) {
  "@babel/helpers - typeof";
  return _typeof12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof12(o);
}
function _slicedToArray3(r, e) {
  return _arrayWithHoles3(r) || _iterableToArrayLimit3(r, e) || _unsupportedIterableToArray11(r, e) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray11(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray11(r, a) : void 0;
  }
}
function _arrayLikeToArray11(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles3(r) {
  if (Array.isArray(r)) return r;
}
function _classCallCheck9(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties9(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey12(o.key), o);
  }
}
function _createClass9(e, r, t) {
  return r && _defineProperties9(e.prototype, r), t && _defineProperties9(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey12(t) {
  var i = _toPrimitive12(t, "string");
  return "symbol" == _typeof12(i) ? i : i + "";
}
function _toPrimitive12(t, r) {
  if ("object" != _typeof12(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof12(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var USE_NON_GEOGRAPHIC_COUNTRY_CODE4 = false;
var AsYouType = /* @__PURE__ */ (function() {
  function AsYouType3(optionsOrDefaultCountry, metadata) {
    _classCallCheck9(this, AsYouType3);
    this.metadata = new Metadata(metadata);
    var _this$getCountryAndCa = this.getCountryAndCallingCode(optionsOrDefaultCountry), _this$getCountryAndCa2 = _slicedToArray3(_this$getCountryAndCa, 2), defaultCountry = _this$getCountryAndCa2[0], defaultCallingCode = _this$getCountryAndCa2[1];
    this.defaultCountry = defaultCountry;
    this.defaultCallingCode = defaultCallingCode;
    this.reset();
  }
  return _createClass9(AsYouType3, [{
    key: "getCountryAndCallingCode",
    value: function getCountryAndCallingCode(optionsOrDefaultCountry) {
      var defaultCountry;
      var defaultCallingCode;
      if (optionsOrDefaultCountry) {
        if (isObject(optionsOrDefaultCountry)) {
          defaultCountry = optionsOrDefaultCountry.defaultCountry;
          defaultCallingCode = optionsOrDefaultCountry.defaultCallingCode;
        } else {
          defaultCountry = optionsOrDefaultCountry;
        }
      }
      if (defaultCountry && !this.metadata.hasCountry(defaultCountry)) {
        defaultCountry = void 0;
      }
      if (defaultCallingCode) {
        if (USE_NON_GEOGRAPHIC_COUNTRY_CODE4) {
          if (this.metadata.isNonGeographicCallingCode(defaultCallingCode)) {
            defaultCountry = "001";
          }
        }
      }
      return [defaultCountry, defaultCallingCode];
    }
    /**
     * Inputs "next" phone number characters.
     * @param  {string} text
     * @return {string} Formatted phone number characters that have been input so far.
     */
  }, {
    key: "input",
    value: function input(text) {
      var _this$parser$input = this.parser.input(text, this.state), digits = _this$parser$input.digits, justLeadingPlus = _this$parser$input.justLeadingPlus;
      if (justLeadingPlus) {
        this.formattedOutput = "+";
      } else if (digits) {
        this.determineTheCountryIfNeeded();
        if (this.state.nationalSignificantNumber) {
          this.formatter.narrowDownMatchingFormats(this.state);
        }
        var formattedNationalNumber;
        if (this.metadata.hasSelectedNumberingPlan()) {
          formattedNationalNumber = this.formatter.format(digits, this.state);
        }
        if (formattedNationalNumber === void 0) {
          if (this.parser.reExtractNationalSignificantNumber(this.state)) {
            this.determineTheCountryIfNeeded();
            var nationalDigits = this.state.getNationalDigits();
            if (nationalDigits) {
              formattedNationalNumber = this.formatter.format(nationalDigits, this.state);
            }
          }
        }
        this.formattedOutput = formattedNationalNumber ? this.getFullNumber(formattedNationalNumber) : this.getNonFormattedNumber();
      }
      return this.formattedOutput;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this = this;
      this.state = new AsYouTypeState({
        onCountryChange: function onCountryChange(country) {
          _this.country = country;
        },
        onCallingCodeChange: function onCallingCodeChange(callingCode, country) {
          _this.metadata.selectNumberingPlan(country || callingCode);
          _this.formatter.reset(_this.metadata.numberingPlan, _this.state);
          _this.parser.reset(_this.metadata.numberingPlan);
        }
      });
      this.formatter = new AsYouTypeFormatter({
        state: this.state,
        metadata: this.metadata
      });
      this.parser = new AsYouTypeParser({
        defaultCountry: this.defaultCountry,
        defaultCallingCode: this.defaultCallingCode,
        metadata: this.metadata,
        state: this.state,
        onNationalSignificantNumberChange: function onNationalSignificantNumberChange() {
          _this.determineTheCountryIfNeeded();
          _this.formatter.reset(_this.metadata.numberingPlan, _this.state);
        }
      });
      this.state.reset({
        country: this.defaultCountry,
        callingCode: this.defaultCallingCode
      });
      this.formattedOutput = "";
      return this;
    }
    /**
     * Returns `true` if the phone number is being input in international format.
     * In other words, returns `true` if and only if the parsed phone number starts with a `"+"`.
     * @return {boolean}
     */
  }, {
    key: "isInternational",
    value: function isInternational() {
      return this.state.international;
    }
    /**
     * Returns the "calling code" part of the phone number when it's being input
     * in an international format.
     * If no valid calling code has been entered so far, returns `undefined`.
     * @return {string} [callingCode]
     */
  }, {
    key: "getCallingCode",
    value: function getCallingCode() {
      if (this.isInternational()) {
        return this.state.callingCode;
      }
    }
    // A legacy alias.
  }, {
    key: "getCountryCallingCode",
    value: function getCountryCallingCode3() {
      return this.getCallingCode();
    }
    /**
     * Returns a two-letter country code of the phone number.
     * Returns `undefined` for "non-geographic" phone numbering plans.
     * Returns `undefined` if no phone number has been input yet.
     * @return {string} [country]
     */
  }, {
    key: "getCountry",
    value: function getCountry() {
      var digits = this.state.digits;
      if (digits) {
        return this._getCountry();
      }
    }
    /**
     * Returns a two-letter country code of the phone number.
     * Returns `undefined` for "non-geographic" phone numbering plans.
     * @return {string} [country]
     */
  }, {
    key: "_getCountry",
    value: function _getCountry() {
      var country = this.state.country;
      if (USE_NON_GEOGRAPHIC_COUNTRY_CODE4) {
        if (country === "001") {
          return;
        }
      }
      return country;
    }
  }, {
    key: "determineTheCountryIfNeeded",
    value: function determineTheCountryIfNeeded() {
      if (!this.state.country || this.isCountryCallingCodeAmbiguous()) {
        this.determineTheCountry();
      }
    }
    // Prepends `+CountryCode ` in case of an international phone number
  }, {
    key: "getFullNumber",
    value: function getFullNumber(formattedNationalNumber) {
      var _this2 = this;
      if (this.isInternational()) {
        var prefix = function prefix2(text) {
          return _this2.formatter.getInternationalPrefixBeforeCountryCallingCode(_this2.state, {
            spacing: text ? true : false
          }) + text;
        };
        var callingCode = this.state.callingCode;
        if (!callingCode) {
          return prefix("".concat(this.state.getDigitsWithoutInternationalPrefix()));
        }
        if (!formattedNationalNumber) {
          return prefix(callingCode);
        }
        return prefix("".concat(callingCode, " ").concat(formattedNationalNumber));
      }
      return formattedNationalNumber;
    }
  }, {
    key: "getNonFormattedNationalNumberWithPrefix",
    value: function getNonFormattedNationalNumberWithPrefix() {
      var _this$state = this.state, nationalSignificantNumber = _this$state.nationalSignificantNumber, prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix = _this$state.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix, nationalPrefix = _this$state.nationalPrefix;
      var number = nationalSignificantNumber;
      var prefix = prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix || nationalPrefix;
      if (prefix) {
        number = prefix + number;
      }
      return number;
    }
  }, {
    key: "getNonFormattedNumber",
    value: function getNonFormattedNumber() {
      var nationalSignificantNumberIsModified = this.state.nationalSignificantNumberIsModified;
      return this.getFullNumber(nationalSignificantNumberIsModified ? this.state.getNationalDigits() : this.getNonFormattedNationalNumberWithPrefix());
    }
  }, {
    key: "getNonFormattedTemplate",
    value: function getNonFormattedTemplate() {
      var number = this.getNonFormattedNumber();
      if (number) {
        return number.replace(/[\+\d]/g, DIGIT_PLACEHOLDER);
      }
    }
  }, {
    key: "isCountryCallingCodeAmbiguous",
    value: function isCountryCallingCodeAmbiguous() {
      var callingCode = this.state.callingCode;
      var countryCodes = this.metadata.getCountryCodesForCallingCode(callingCode);
      return countryCodes && countryCodes.length > 1;
    }
    // Determines the exact country of the phone number
    // entered so far based on the country phone code
    // and the national phone number.
  }, {
    key: "determineTheCountry",
    value: function determineTheCountry() {
      var country = getCountryByCallingCode(this.isInternational() ? this.state.callingCode : this.defaultCallingCode, {
        nationalNumber: this.state.nationalSignificantNumber,
        metadata: this.metadata
      });
      if (country !== this.state.country) {
        this.state.setCountry(country);
        if (country) {
          this.metadata.selectNumberingPlan(country);
        }
      }
    }
    /**
     * Returns a E.164 phone number value for the user's input.
     *
     * For example, for country `"US"` and input `"(222) 333-4444"`
     * it will return `"+12223334444"`.
     *
     * For international phone number input, it will also auto-correct
     * some minor errors such as using a national prefix when writing
     * an international phone number. For example, if the user inputs
     * `"+44 0 7400 000000"` then it will return an auto-corrected
     * `"+447400000000"` phone number value.
     *
     * Will return `undefined` if no digits have been input,
     * or when inputting a phone number in national format and no
     * default country or default "country calling code" have been set.
     *
     * @return {string} [value]
     */
  }, {
    key: "getNumberValue",
    value: function getNumberValue() {
      var _this$state2 = this.state, digits = _this$state2.digits, callingCode = _this$state2.callingCode, country = _this$state2.country, nationalSignificantNumber = _this$state2.nationalSignificantNumber;
      if (!digits) {
        return;
      }
      if (this.isInternational()) {
        if (callingCode) {
          return "+" + callingCode + nationalSignificantNumber;
        } else {
          return "+" + digits;
        }
      } else {
        if (country || callingCode) {
          var callingCode_ = country ? this.metadata.countryCallingCode() : callingCode;
          return "+" + callingCode_ + nationalSignificantNumber;
        }
      }
    }
    /**
     * Returns an instance of `PhoneNumber` class.
     * Will return `undefined` if no national (significant) number
     * digits have been entered so far, or if no `defaultCountry` has been
     * set and the user enters a phone number not in international format.
     */
  }, {
    key: "getNumber",
    value: function getNumber() {
      var _this$state3 = this.state, nationalSignificantNumber = _this$state3.nationalSignificantNumber, carrierCode = _this$state3.carrierCode, callingCode = _this$state3.callingCode;
      if (!nationalSignificantNumber) {
        return;
      }
      var country = this._getCountry();
      if (!country && !callingCode) {
        return;
      }
      if (country) {
        if (country === this.defaultCountry) {
          var countryCallingCode = this.metadata.numberingPlan.callingCode();
          var exactCountry = getExactCountryForMultiCountryCallingCode(countryCallingCode, nationalSignificantNumber, this.metadata);
          if (exactCountry) {
            country = exactCountry;
          }
        }
      }
      var phoneNumber = new PhoneNumber(country || callingCode, nationalSignificantNumber, this.metadata.metadata);
      if (carrierCode) {
        phoneNumber.carrierCode = carrierCode;
      }
      return phoneNumber;
    }
    /**
     * Returns `true` if the phone number is "possible".
     * Is just a shortcut for `PhoneNumber.isPossible()`.
     * @return {boolean}
     */
  }, {
    key: "isPossible",
    value: function isPossible() {
      var phoneNumber = this.getNumber();
      if (!phoneNumber) {
        return false;
      }
      return phoneNumber.isPossible();
    }
    /**
     * Returns `true` if the phone number is "valid".
     * Is just a shortcut for `PhoneNumber.isValid()`.
     * @return {boolean}
     */
  }, {
    key: "isValid",
    value: function isValid() {
      var phoneNumber = this.getNumber();
      if (!phoneNumber) {
        return false;
      }
      return phoneNumber.isValid();
    }
    /**
     * Checks if the phone number length is valid.
     * If it is, nothing is returned.
     * Otherwise, a rejection reason is returned.
     * @return {string?}
     */
  }, {
    key: "validateLength",
    value: function validateLength() {
      var _this$state4 = this.state, digits = _this$state4.digits, nationalSignificantNumber = _this$state4.nationalSignificantNumber;
      if (!digits) {
        return "NOT_A_NUMBER";
      }
      if (!this.metadata.numberingPlan) {
        return "INVALID_COUNTRY";
      }
      if (!nationalSignificantNumber) {
        return "TOO_SHORT";
      }
      var result2 = checkNumberLength(nationalSignificantNumber, void 0, this.metadata);
      if (result2 !== "IS_POSSIBLE") {
        return result2;
      }
    }
    /**
     * @deprecated
     * This method is used in `react-phone-number-input/source/input-control.js`
     * in versions before `3.0.16`.
     */
  }, {
    key: "getNationalNumber",
    value: function getNationalNumber() {
      return this.state.nationalSignificantNumber;
    }
    /**
     * Returns the phone number characters entered by the user.
     * @return {string}
     */
  }, {
    key: "getChars",
    value: function getChars() {
      return (this.state.international ? "+" : "") + this.state.digits;
    }
    /**
     * Returns the template for the formatted phone number.
     * @return {string}
     */
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return this.formatter.getTemplate(this.state) || this.getNonFormattedTemplate() || "";
    }
  }]);
})();
function getExactCountryForMultiCountryCallingCode(callingCode, nationalSignificantNumber, metadata) {
  var ambiguousCountries = metadata.getCountryCodesForCallingCode(callingCode);
  if (ambiguousCountries.length > 1) {
    return getCountryByNationalNumber(nationalSignificantNumber, ambiguousCountries, metadata.metadata);
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/getCountries.js
function getCountries(metadata) {
  return new Metadata(metadata).getCountries();
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/es6/getExampleNumber.js
function getExampleNumber(country, examples, metadata) {
  if (examples[country]) {
    return new PhoneNumber(country, examples[country], metadata);
  }
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/min/exports/parsePhoneNumber.js
function parsePhoneNumber4() {
  return withMetadataArgument(parsePhoneNumber3, arguments);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/min/exports/AsYouType.js
function AsYouType2(country) {
  return AsYouType.call(this, country, metadata_min_json_default);
}
AsYouType2.prototype = Object.create(AsYouType.prototype, {});
AsYouType2.prototype.constructor = AsYouType2;

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/min/exports/getCountries.js
function getCountries2() {
  return withMetadataArgument(getCountries, arguments);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/min/exports/getCountryCallingCode.js
function getCountryCallingCode2() {
  return withMetadataArgument(getCountryCallingCode, arguments);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/min/exports/getExampleNumber.js
function getExampleNumber2() {
  return withMetadataArgument(getExampleNumber, arguments);
}

// node_modules/.pnpm/libphonenumber-js@1.13.15/node_modules/libphonenumber-js/examples.mobile.json.js
var examples_mobile_json_default = { "AC": "40123", "AD": "312345", "AE": "501234567", "AF": "701234567", "AG": "2684641234", "AI": "2642351234", "AL": "672123456", "AM": "77123456", "AO": "923123456", "AR": "91123456789", "AS": "6847331234", "AT": "664123456", "AU": "412345678", "AW": "5601234", "AX": "412345678", "AZ": "401234567", "BA": "61123456", "BB": "2462501234", "BD": "1812345678", "BE": "450001234", "BF": "70123456", "BG": "43012345", "BH": "36001234", "BI": "79561234", "BJ": "0195123456", "BL": "690001234", "BM": "4413701234", "BN": "7123456", "BO": "71234567", "BQ": "3181234", "BR": "11961234567", "BS": "2423591234", "BT": "17123456", "BW": "71123456", "BY": "294911911", "BZ": "6221234", "CA": "5062345678", "CC": "412345678", "CD": "991234567", "CF": "70012345", "CG": "061234567", "CH": "781234567", "CI": "0123456789", "CK": "71234", "CL": "221234567", "CM": "671234567", "CN": "13123456789", "CO": "3211234567", "CR": "83123456", "CU": "51234567", "CV": "9911234", "CW": "95181234", "CX": "412345678", "CY": "96123456", "CZ": "601123456", "DE": "15123456789", "DJ": "77831001", "DK": "34412345", "DM": "7672251234", "DO": "8092345678", "DZ": "551234567", "EC": "991234567", "EE": "51234567", "EG": "1001234567", "EH": "650123456", "ER": "7123456", "ES": "612345678", "ET": "911234567", "FI": "412345678", "FJ": "7012345", "FK": "51234", "FM": "3501234", "FO": "211234", "FR": "612345678", "GA": "06031234", "GB": "7400123456", "GD": "4734031234", "GE": "555123456", "GF": "694201234", "GG": "7781123456", "GH": "231234567", "GI": "57123456", "GL": "221234", "GM": "3012345", "GN": "601123456", "GP": "690001234", "GQ": "222123456", "GR": "6912345678", "GT": "51234567", "GU": "6713001234", "GW": "955012345", "GY": "6091234", "HK": "51234567", "HN": "91234567", "HR": "921234567", "HT": "34101234", "HU": "201234567", "ID": "812345678", "IE": "850123456", "IL": "502345678", "IM": "7924123456", "IN": "8123456789", "IO": "3801234", "IQ": "7912345678", "IR": "9123456789", "IS": "6111234", "IT": "3123456789", "JE": "7797712345", "JM": "8762101234", "JO": "790123456", "JP": "9012345678", "KE": "712123456", "KG": "700123456", "KH": "91234567", "KI": "72001234", "KM": "3212345", "KN": "8697652917", "KP": "1921234567", "KR": "1020000000", "KW": "50012345", "KY": "3453231234", "KZ": "7710009998", "LA": "2023123456", "LB": "71123456", "LC": "7582845678", "LI": "660234567", "LK": "712345678", "LR": "770123456", "LS": "50123456", "LT": "61234567", "LU": "628123456", "LV": "21234567", "LY": "912345678", "MA": "650123456", "MC": "612345678", "MD": "62112345", "ME": "60123456", "MF": "690001234", "MG": "321234567", "MH": "2351234", "MK": "72345678", "ML": "65012345", "MM": "92123456", "MN": "88123456", "MO": "66123456", "MP": "6702345678", "MQ": "696201234", "MR": "22123456", "MS": "6644923456", "MT": "96961234", "MU": "52512345", "MV": "7712345", "MW": "991234567", "MX": "2221234567", "MY": "123456789", "MZ": "821234567", "NA": "811234567", "NC": "751234", "NE": "93123456", "NF": "381234", "NG": "8021234567", "NI": "81234567", "NL": "612345678", "NO": "40612345", "NP": "9841234567", "NR": "5551234", "NU": "8884012", "NZ": "211234567", "OM": "92123456", "PA": "61234567", "PE": "912345678", "PF": "87123456", "PG": "70123456", "PH": "9051234567", "PK": "3012345678", "PL": "512345678", "PM": "551234", "PR": "7872345678", "PS": "599123456", "PT": "912345678", "PW": "6201234", "PY": "961456789", "QA": "33123456", "RE": "692123456", "RO": "712034567", "RS": "601234567", "RU": "9123456789", "RW": "720123456", "SA": "512345678", "SB": "7421234", "SC": "2510123", "SD": "911231234", "SE": "701234567", "SG": "81234567", "SH": "51234", "SI": "31234567", "SJ": "41234567", "SK": "912123456", "SL": "25123456", "SM": "66661212", "SN": "701234567", "SO": "71123456", "SR": "7412345", "SS": "977123456", "ST": "9812345", "SV": "70123456", "SX": "7215205678", "SY": "944567890", "SZ": "76123456", "TA": "8999", "TC": "6492311234", "TD": "63012345", "TG": "90112345", "TH": "812345678", "TJ": "917123456", "TK": "7290", "TL": "77212345", "TM": "66123456", "TN": "20123456", "TO": "7715123", "TR": "5012345678", "TT": "8682911234", "TV": "901234", "TW": "912345678", "TZ": "621234567", "UA": "501234567", "UG": "712345678", "US": "2015550123", "UY": "94231234", "UZ": "912345678", "VA": "3123456789", "VC": "7844301234", "VE": "4121234567", "VG": "2843001234", "VI": "3406421234", "VN": "912345678", "VU": "5912345", "WF": "821234", "WS": "7212345", "XK": "43201234", "YE": "712345678", "YT": "639012345", "ZA": "711234567", "ZM": "955123456", "ZW": "712345678" };

// design/design-system/adapters/react/src/phone.ts
function normalizePhoneInput(text, country) {
  const ascii = text.normalize("NFKC").replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 1776));
  const digits = ascii.replace(/\D/g, "");
  if (!digits) return ascii.trim().startsWith("+") ? "+" : "";
  if (ascii.trim().startsWith("+")) return "+" + digits;
  if (digits.startsWith("00")) return "+" + digits.slice(2);
  const formatter = new AsYouType2(country);
  formatter.input(digits);
  return formatter.getNumberValue() || "+" + getCountryCallingCode2(country) + digits;
}
function phoneDisplay(value) {
  return new AsYouType2().input(value);
}
function phoneMask(country) {
  return getExampleNumber2(country, examples_mobile_json_default)?.formatInternational().replace(/^(\+\d+) (.*)$/, (_, prefix, national) => prefix + " " + national.replace(/\d/g, "0")) || "+" + getCountryCallingCode2(country);
}
function phoneDetails(value, country, allowed) {
  const number = parsePhoneNumber4(value);
  const detected = number?.country;
  const fallback = number && number.countryCallingCode !== getCountryCallingCode2(country) ? getCountries2().find((code) => getCountryCallingCode2(code) === number.countryCallingCode && allowed.includes(code)) : country;
  const matches = detected ? allowed.includes(detected) : !!number && !!fallback && allowed.includes(fallback) && number.countryCallingCode === getCountryCallingCode2(fallback);
  return { country: detected || fallback || country, valid: !!number && number.isPossible() && matches, e164: number?.number || value };
}
function caretAfterDigits(text, count) {
  if (count <= 0) return text.startsWith("+") ? 1 : 0;
  for (let i = 0, n = 0; i < text.length; i++) if (/\d/.test(text[i]) && ++n === count) return i + 1;
  return text.length;
}
function phoneNationalDisplay(value, country) {
  const prefix = "+" + getCountryCallingCode2(country);
  const display = phoneDisplay(value);
  return display.startsWith(prefix) ? display.slice(prefix.length).trimStart() : display;
}

// design/design-system/adapters/react/src/PhoneField.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var allCountries = getCountries2();
var PhoneField = forwardRef(function PhoneField2({ value, onValueChange, label, countryLabel, clearLabel, invalidMessage, defaultCountry = "US", countries = allCountries, locale = "en", id, disabled, readOnly, required, ...props }, ref) {
  if (!countries.length || !countries.includes(defaultCountry)) throw new Error("PhoneField needs an allowed defaultCountry");
  const [focused, setFocused] = useState(false);
  const [within, setWithin] = useState(false);
  const countryInput = useRef(null);
  const [selected, setSelected] = useState(defaultCountry);
  const input = useRef(null), caret = useRef(null);
  useImperativeHandle(ref, () => input.current, []);
  const details = phoneDetails(value, selected, countries);
  const country = countries.includes(details.country) ? details.country : selected;
  const display = phoneNationalDisplay(value, country);
  const Flag = x1_exports[country];
  const nationalMask = phoneMask(country).replace(/^\+\d+\s*/, "");
  const names = new Intl.DisplayNames([locale], { type: "region" });
  useLayoutEffect(() => {
    const node = input.current;
    if (!node) return;
    node.setCustomValidity(value && !details.valid ? invalidMessage : "");
    if (caret.current !== null && document.activeElement === node) {
      const position = caretAfterDigits(display, caret.current);
      node.setSelectionRange(position, position);
      caret.current = null;
    }
  }, [display, details.valid, invalidMessage, value]);
  useLayoutEffect(() => {
    const node = countryInput.current;
    if (!node) return;
    const change = () => {
      const next = node.value;
      if (!countries.includes(next)) return;
      setSelected(next);
      caret.current = null;
      onValueChange("", phoneDetails("", next, countries));
      queueMicrotask(() => input.current?.focus());
    };
    node.addEventListener("change", change);
    return () => node.removeEventListener("change", change);
  }, [countries, onValueChange]);
  function update(text, position) {
    const before = text.slice(0, position).replace(/\D/g, "").length;
    const next = normalizePhoneInput(text, country);
    const nextDetails = phoneDetails(next, country, countries);
    const nextCountry = countries.includes(nextDetails.country) ? nextDetails.country : country;
    const nextDisplay = phoneNationalDisplay(next, nextCountry);
    const offset = nextDisplay.replace(/\D/g, "").length - text.replace(/\D/g, "").length;
    caret.current = Math.max(0, before + offset);
    if (countries.includes(nextDetails.country)) setSelected(nextDetails.country);
    onValueChange(next, nextDetails);
    if (next === value && input.current) {
      input.current.value = display;
      const pos = caretAfterDigits(display, caret.current);
      input.current.setSelectionRange(pos, pos);
      caret.current = null;
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "rf-text-field-group", children: /* @__PURE__ */ jsxs("div", { className: "rf-phone-field rf-text-field", onFocusCapture: () => setWithin(true), onBlurCapture: (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setWithin(false);
  }, "data-disabled": disabled || void 0, "data-invalid": props["aria-invalid"] || void 0, children: [
    /* @__PURE__ */ jsxs("div", { className: "rf-phone-field__country rf-dropdown rf-dropdown--anchored", "data-rf-dropdown": "", "data-rf-dropdown-mode": "selection", children: [
      /* @__PURE__ */ jsxs("button", { type: "button", className: "rf-dropdown__trigger rf-phone-field__country-trigger", "data-rf-dropdown-trigger": "", "aria-label": countryLabel + ": " + names.of(country) + " (+" + getCountryCallingCode2(country) + ")", disabled: disabled || readOnly || countries.length === 1, children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "rf-phone-field__flag", children: Flag && /* @__PURE__ */ jsx(Flag, {}) }),
        /* @__PURE__ */ jsxs("span", { className: "rf-phone-field__code", "aria-hidden": "true", children: [
          "+",
          getCountryCallingCode2(country)
        ] }),
        countries.length > 1 && /* @__PURE__ */ jsx("span", { className: "rf-icon rf-icon--sm", "data-rf-icon-glyph": "chevron-down", "data-rf-dropdown-chevron": "", "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ jsx("input", { ref: countryInput, type: "hidden", "data-rf-dropdown-input": "", value: country, readOnly: true }),
      /* @__PURE__ */ jsx("div", { className: "rf-dropdown__panel", "data-rf-dropdown-panel": "", role: "listbox", "aria-label": countryLabel, hidden: true, children: [...countries].sort((a, b) => (names.of(a) || a).localeCompare(names.of(b) || b, locale)).map((code) => {
        const OptionFlag = x1_exports[code];
        return /* @__PURE__ */ jsxs("div", { role: "option", className: "rf-dropdown__item rf-list-item", "data-value": code, "aria-selected": code === country, children: [
          /* @__PURE__ */ jsx("span", { className: "rf-phone-field__flag", "aria-hidden": "true", children: OptionFlag && /* @__PURE__ */ jsx(OptionFlag, {}) }),
          /* @__PURE__ */ jsxs("span", { "data-rf-dropdown-label": "", children: [
            names.of(code),
            " (+",
            getCountryCallingCode2(code),
            ")"
          ] })
        ] }, code);
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rf-phone-field__number rf-text-field__control", children: /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        id,
        ref: input,
        type: "tel",
        inputMode: "tel",
        autoComplete: "tel-national",
        dir: "ltr",
        className: clearLabel ? "rf-text-field rf-text-field--with-action" : "rf-text-field",
        placeholder: focused ? nationalMask : label,
        onFocus: (event) => {
          setFocused(true);
          props.onFocus?.(event);
        },
        onBlur: (event) => {
          setFocused(false);
          props.onBlur?.(event);
        },
        disabled,
        readOnly,
        required,
        value: display,
        "aria-label": label + " (+" + getCountryCallingCode2(country) + ")",
        "aria-describedby": props["aria-describedby"],
        onChange: (event) => update(event.target.value, event.target.selectionStart ?? event.target.value.length),
        onKeyDown: (event) => {
          props.onKeyDown?.(event);
          if (event.defaultPrevented || readOnly || disabled || event.altKey || event.ctrlKey || event.metaKey) return;
          const node = event.currentTarget, a = node.selectionStart ?? 0, b = node.selectionEnd ?? 0;
          if (a !== b) return;
          if (event.key === "Backspace" && a > 0 && /[ ()-]/.test(display[a - 1])) {
            event.preventDefault();
            let at = a - 1;
            while (at > 0 && !/\d/.test(display[at])) at--;
            update(display.slice(0, at) + display.slice(a), at);
          } else if (event.key === "Delete" && /[ ()-]/.test(display[a] || "")) {
            event.preventDefault();
            let at = a;
            while (at < display.length && !/\d/.test(display[at])) at++;
            update(display.slice(0, a) + display.slice(at + 1), a);
          }
        }
      }
    ) }),
    clearLabel && within && display && !disabled && !readOnly && /* @__PURE__ */ jsx("span", { className: "rf-text-field__action", children: /* @__PURE__ */ jsx("button", { type: "button", className: "rf-text-field__action-trigger", "aria-label": clearLabel, onClick: () => {
      caret.current = null;
      onValueChange("", phoneDetails("", country, countries));
      input.current?.focus();
    }, children: /* @__PURE__ */ jsx("span", { className: "rf-icon rf-icon--md", "data-rf-icon-glyph": "close", "aria-hidden": "true" }) }) })
  ] }) });
});
export {
  PhoneField
};

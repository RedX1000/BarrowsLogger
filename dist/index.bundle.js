(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["testpackage"] = factory();
	else
		root["TEST"] = factory();
})((typeof self!='undefined'?self:this), function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@alt1/base/dist/alt1api.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/alt1api.js ***!
  \**************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/declarations.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/declarations.js ***!
  \*******************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedata-extensions.js":
/*!***************************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedata-extensions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageData": () => (/* binding */ ImageData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");


//export this so node.js can also use it
var ImageData;
// //TODO revamp this madness a bit?
// (function () {
// 	var globalvar = (typeof self != "undefined" ? self : (typeof (global as any) != "undefined" ? (global as any) : null)) as any;
// 	//use the node-canvas version when on node
// 	if (typeof globalvar.ImageData == "undefined") {
// 		let nodecnv = requireNodeCanvas();
// 		globalvar.ImageData = nodecnv.ImageData;
// 	}
// 	var fill = typeof globalvar.ImageData == "undefined";
// 	//should never be reach anymore
// 	var constr = function (this: any) {
// 		var i = 0;
// 		var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
// 		var width = arguments[i++];
// 		var height = arguments[i++];
// 		if (fill) {
// 			if (!data) { data = new Uint8ClampedArray(width * height * 4); }
// 			this.width = width;
// 			this.height = height;
// 			this.data = data;
// 		}
// 		else if (oldconstr) {
// 			return (data ? new oldconstr(data, width, height) : new oldconstr(width, height));
// 		} else {
// 			var canvas = document.createElement('canvas');
// 			canvas.width = width;
// 			canvas.height = height;
// 			var ctx = canvas.getContext("2d")!;
// 			var imageData = ctx.createImageData(width, height);
// 			if (data) { imageData.data.set(data); }
// 			return imageData;
// 		}
// 	}
// 	var oldconstr = globalvar.ImageData;
// 	if (typeof document != "undefined") {
// 		try {
// 			new oldconstr(1, 1);
// 		} catch (e) {
// 			//direct constructor call not allowed in ie
// 			oldconstr = null;
// 		}
// 	}
// 	if (!fill) { constr.prototype = globalvar.ImageData.prototype; }
// 	globalvar.ImageData = constr;
// 	ImageData = constr as any;
// })();
(function () {
    var globalvar = (typeof self != "undefined" ? self : (typeof global != "undefined" ? global : null));
    var filltype = typeof globalvar.ImageData == "undefined" || typeof globalvar.document == "undefined";
    var fillconstr = filltype;
    if (!filltype) {
        var oldconstr = globalvar.ImageData;
        try {
            let data = new Uint8ClampedArray(4);
            data[0] = 1;
            let a = new globalvar.ImageData(data, 1, 1);
            fillconstr = a.data[0] != 1;
        }
        catch (e) {
            fillconstr = true;
        }
    }
    if (fillconstr) {
        var constr = function ImageDataShim() {
            var i = 0;
            var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
            var width = arguments[i++];
            var height = arguments[i++];
            if (filltype) {
                if (!data) {
                    data = new Uint8ClampedArray(width * height * 4);
                }
                this.width = width;
                this.height = height;
                this.data = data;
            }
            else if (fillconstr) {
                //WARNING This branch of code does not use the same pixel data backing store
                //(problem with wasm, however all wasm browser have a native constructor (unless asm.js is used))
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                if (data) {
                    imageData.data.set(data);
                }
                return imageData;
            }
            // else {
            // 	//oh no...
            // 	//we need this monstrocity in order to call the native constructor with variable number of args
            // 	//when es5 transpile is enable (that strips the spread operator)
            // 	return new (Function.prototype.bind.apply(oldconstr, [null,...arguments]));
            // }
        };
        if (!filltype) {
            constr.prototype = globalvar.ImageData.prototype;
        }
        globalvar.ImageData = constr;
        ImageData = constr;
    }
    else {
        ImageData = globalvar.ImageData;
    }
})();
//Recast into a drawable imagedata class on all platforms, into a normal browser ImageData on browsers or a node-canvas imagedata on nodejs
ImageData.prototype.toDrawableData = function () {
    if (typeof document == "undefined") {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToDrawable(this);
    }
    else {
        return this;
    }
};
ImageData.prototype.putImageData = function (buf, cx, cy) {
    for (var dx = 0; dx < buf.width; dx++) {
        for (var dy = 0; dy < buf.height; dy++) {
            var i1 = (dx + cx) * 4 + (dy + cy) * 4 * this.width;
            var i2 = dx * 4 + dy * 4 * buf.width;
            this.data[i1] = buf.data[i2];
            this.data[i1 + 1] = buf.data[i2 + 1];
            this.data[i1 + 2] = buf.data[i2 + 2];
            this.data[i1 + 3] = buf.data[i2 + 3];
        }
    }
};
ImageData.prototype.pixelOffset = function (x, y) {
    return x * 4 + y * this.width * 4;
};
//creates a hash of a portion of the buffer used to check for changes
ImageData.prototype.getPixelHash = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    var hash = 0;
    for (var x = rect.x; x < rect.x + rect.width; x++) {
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            var i = x * 4 + y * 4 * this.width;
            hash = (((hash << 5) - hash) + this.data[i]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 1]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 2]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 3]) | 0;
        }
    }
    return hash;
};
ImageData.prototype.clone = function (rect) {
    return this.toImage(rect).getContext("2d").getImageData(0, 0, rect.width, rect.height);
};
ImageData.prototype.show = function (x = 5, y = 5, zoom = 1) {
    if (typeof document == "undefined") {
        console.error("need a document to show an imagedata object");
        return;
    }
    var imgs = document.getElementsByClassName("debugimage");
    while (imgs.length > ImageData.prototype.show.maxImages) {
        imgs[0].remove();
    }
    var el = this.toImage();
    el.classList.add("debugimage");
    el.style.position = "absolute";
    el.style.zIndex = "1000";
    el.style.left = x / zoom + "px";
    el.style.top = y / zoom + "px";
    el.style.background = "purple";
    el.style.cursor = "pointer";
    el.style.imageRendering = "pixelated";
    el.style.outline = "1px solid #0f0";
    el.style.width = (this.width == 1 ? 100 : this.width) * zoom + "px";
    el.style.height = (this.height == 1 ? 100 : this.height) * zoom + "px";
    el.onclick = function () { el.remove(); };
    document.body.appendChild(el);
    return el;
};
ImageData.prototype.show.maxImages = 10;
ImageData.prototype.toImage = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    if (typeof document != "undefined") {
        var el = document.createElement("canvas");
        el.width = rect.width;
        el.height = rect.height;
    }
    else {
        el = _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.createCanvas(rect.width, rect.height);
    }
    var ctx = el.getContext("2d");
    ctx.putImageData(this.toDrawableData(), -rect.x, -rect.y);
    return el;
};
ImageData.prototype.getPixel = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return [this.data[i], this.data[i + 1], this.data[i + 2], this.data[i + 3]];
};
ImageData.prototype.getPixelValueSum = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return this.data[i] + this.data[i + 1] + this.data[i + 2];
};
ImageData.prototype.getPixelInt = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return (this.data[i + 3] << 24) + (this.data[i + 0] << 16) + (this.data[i + 1] << 8) + (this.data[i + 2] << 0);
};
ImageData.prototype.getColorDifference = function (x, y, r, g, b, a = 255) {
    var i = x * 4 + y * 4 * this.width;
    return Math.abs(this.data[i] - r) + Math.abs(this.data[i + 1] - g) + Math.abs(this.data[i + 2] - b) * a / 255;
};
ImageData.prototype.setPixel = function (x, y, ...color) {
    var r, g, b, a;
    var [r, g, b, a] = (Array.isArray(color[0]) ? color[0] : color);
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = r;
    this.data[i + 1] = g;
    this.data[i + 2] = b;
    this.data[i + 3] = a == undefined ? 255 : a;
};
ImageData.prototype.setPixelInt = function (x, y, color) {
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = (color >> 24) & 0xff;
    this.data[i + 1] = (color >> 16) & 0xff;
    this.data[i + 2] = (color >> 8) & 0xff;
    this.data[i + 3] = (color >> 0) & 0xff;
};
ImageData.prototype.toFileBytes = function (format, quality) {
    if (typeof HTMLCanvasElement != "undefined") {
        return new Promise(d => this.toImage().toBlob(b => {
            var r = new FileReader();
            r.readAsArrayBuffer(b);
            r.onload = () => d(new Uint8Array(r.result));
        }, format, quality));
    }
    else {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToFileBytes(this, format, quality);
    }
};
ImageData.prototype.toPngBase64 = function () {
    if (typeof HTMLCanvasElement != "undefined") {
        var str = this.toImage().toDataURL("image/png");
        return str.slice(str.indexOf(",") + 1);
    }
    else {
        throw new Error("synchronous image conversion not supported in nodejs, try using ImageData.prototype.toFileBytes");
    }
};
ImageData.prototype.pixelCompare = function (buf, x = 0, y = 0, max) {
    return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.simpleCompare(this, buf, x, y, max);
};
ImageData.prototype.copyTo = function (target, sourcex, sourcey, width, height, targetx, targety) {
    //convince v8 that these are 31bit uints
    const targetwidth = target.width | 0;
    const thiswidth = this.width | 0;
    const copywidth = width | 0;
    const fastwidth = Math.floor(width / 4) * 4;
    const thisdata = new Int32Array(this.data.buffer, this.data.byteOffset, this.data.byteLength / 4);
    const targetdata = new Int32Array(target.data.buffer, target.data.byteOffset, target.data.byteLength / 4);
    for (let cy = 0; cy < height; cy++) {
        let cx = 0;
        let it = (cx + targetx) + (cy + targety) * targetwidth;
        let is = (cx + sourcex) + (cy + sourcey) * thiswidth;
        //copy 4 pixels per iter (xmm)
        for (; cx < fastwidth; cx += 4) {
            targetdata[it] = thisdata[is];
            targetdata[it + 1] = thisdata[is + 1];
            targetdata[it + 2] = thisdata[is + 2];
            targetdata[it + 3] = thisdata[is + 3];
            it += 4;
            is += 4;
        }
        //copy remainder per pixel
        for (; cx < copywidth; cx++) {
            targetdata[it] = thisdata[is];
            it += 1;
            is += 1;
        }
    }
};
if (typeof HTMLImageElement != "undefined") {
    HTMLImageElement.prototype.toBuffer = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return ctx.getImageData(0, 0, w, h);
    };
    HTMLImageElement.prototype.toCanvas = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return cnv;
    };
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedetect.js":
/*!******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedetect.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageDataSet": () => (/* binding */ ImageDataSet),
/* harmony export */   "asyncMap": () => (/* binding */ asyncMap),
/* harmony export */   "clearPngColorspace": () => (/* binding */ clearPngColorspace),
/* harmony export */   "coldif": () => (/* binding */ coldif),
/* harmony export */   "findSubbuffer": () => (/* binding */ findSubbuffer),
/* harmony export */   "findSubimage": () => (/* binding */ findSubimage),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromFileBuffer": () => (/* binding */ imageDataFromFileBuffer),
/* harmony export */   "imageDataFromUrl": () => (/* binding */ imageDataFromUrl),
/* harmony export */   "isPngBuffer": () => (/* binding */ isPngBuffer),
/* harmony export */   "simpleCompare": () => (/* binding */ simpleCompare),
/* harmony export */   "simpleCompareRMSE": () => (/* binding */ simpleCompareRMSE),
/* harmony export */   "webpackImages": () => (/* binding */ webpackImages)
/* harmony export */ });
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
* Downloads an image and returns the ImageData
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param url http(s) or data url to the image
*/
function imageDataFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            var img = new Image();
            img.crossOrigin = "crossorigin";
            return yield new Promise((done, fail) => {
                img.onload = function () { done(img.toBuffer()); };
                img.onerror = fail;
                img.src = url;
            });
        }
        else {
            var hdr = "data:image/png;base64,";
            if (url.startsWith(hdr)) {
                return imageDataFromBase64(url.slice(hdr.length));
            }
            throw new Error("loading remote images in nodejs has been disabled, load the raw bytes and use imageDataFromNodeBuffer instead");
        }
    });
}
/**
* Loads an ImageData object from a base64 encoded png image
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param data a base64 encoded png image
*/
function imageDataFromBase64(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            return imageDataFromUrl("data:image/png;base64," + data);
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBase64(data);
        }
    });
}
/**
 * Loads an ImageData object directly from a png encoded file buffer
 * This method ensures that png color space headers are taken care off
 * @param data The bytes of a png file
 */
function imageDataFromFileBuffer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        clearPngColorspace(data);
        if (typeof Image != "undefined") {
            let blob = new Blob([data], { type: "image/png" });
            let url = URL.createObjectURL(blob);
            let r = yield imageDataFromUrl(url);
            URL.revokeObjectURL(url);
            return r;
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBuffer(data);
        }
    });
}
/**
* Checks if a given byte array is a png file (by checking for ?PNG as first 4 bytes)
* @param bytes Raw bytes of the png file
*/
function isPngBuffer(bytes) {
    return bytes[0] == 137 && bytes[1] == 80 && bytes[2] == 78 && bytes[3] == 71;
}
/**
* Resets the colorspace data in the png file.
* This makes sure the browser renders the exact colors in the file instead of filtering it in order to obtain the best real life representation of
* what it looked like on the authors screen. (this feature is often broken and not supported)
* For example a round trip printscreen -> open in browser results in different colors than the original
* @param data Raw bytes of the png file
*/
function clearPngColorspace(data) {
    if (!isPngBuffer(data)) {
        throw new Error("non-png image received");
    }
    var i = 8;
    while (i < data.length) {
        var length = data[i++] * 0x1000000 + data[i++] * 0x10000 + data[i++] * 0x100 + data[i++];
        var ancillary = !!((data[i] >> 5) & 1);
        var chunkname = String.fromCharCode(data[i], data[i + 1], data[i + 2], data[i + 3]);
        var chunkid = chunkname.toLowerCase();
        if (chunkid != "trns" && ancillary) {
            data[i + 0] = "n".charCodeAt(0);
            data[i + 1] = "o".charCodeAt(0);
            data[i + 2] = "P".charCodeAt(0);
            data[i + 3] = "E".charCodeAt(0);
            //calculate new chunk checksum
            //http://www.libpng.org/pub/png/spec/1.2/PNG-CRCAppendix.html
            var end = i + 4 + length;
            var crc = 0xffffffff;
            //should be fast enough like this
            var bitcrc = function (bit) {
                for (var k = 0; k < 8; k++) {
                    if (bit & 1) {
                        bit = 0xedb88320 ^ (bit >>> 1);
                    }
                    else {
                        bit = bit >>> 1;
                    }
                }
                return bit;
            };
            for (var a = i; a < end; a++) {
                if (a >= i + 4) {
                    data[a] = 0;
                }
                var bit = data[a];
                crc = bitcrc((crc ^ bit) & 0xff) ^ (crc >>> 8);
            }
            crc = crc ^ 0xffffffff;
            //new chunk checksum
            data[i + 4 + length + 0] = (crc >> 24) & 0xff;
            data[i + 4 + length + 1] = (crc >> 16) & 0xff;
            data[i + 4 + length + 2] = (crc >> 8) & 0xff;
            data[i + 4 + length + 3] = (crc >> 0) & 0xff;
        }
        if (chunkname == "IEND") {
            break;
        }
        i += 4; //type
        i += length; //data
        i += 4; //crc
    }
}
/**
* finds the given needle ImageBuffer in the given haystack ImgRef this function uses the best optimized available
* code depending on the type of the haystack. It will use fast c# searching if the haystack is an ImgRefBind, js searching
* is used otherwise.
* the checklist argument is no longer used and should ignored or null/undefined
* The optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search the needle. The rectangle should be bigger than the needle
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubimage(haystackImgref, needleBuffer, sx = 0, sy = 0, sw = haystackImgref.width, sh = haystackImgref.height) {
    if (!haystackImgref) {
        throw new TypeError();
    }
    if (!needleBuffer) {
        throw new TypeError();
    }
    var max = 30;
    //check if we can do this in alt1
    if (haystackImgref instanceof _imgref_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefBind && _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.hasAlt1 && alt1.bindFindSubImg) {
        var needlestr = _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.encodeImageString(needleBuffer);
        var r = alt1.bindFindSubImg(haystackImgref.handle, needlestr, needleBuffer.width, sx, sy, sw, sh);
        if (!r) {
            throw new _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.Alt1Error();
        }
        return JSON.parse(r);
    }
    return findSubbuffer(haystackImgref.read(), needleBuffer, sx, sy, sw, sh);
}
/**
* Uses js to find the given needle ImageBuffer in the given haystack ImageBuffer. It is better to use the alt1.bind- functions in
* combination with a1nxt.findsubimg.
* the optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search.
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubbuffer(haystack, needle, sx = 0, sy = 0, sw = haystack.width, sh = haystack.height) {
    var r = [];
    var maxdif = 30;
    var maxresults = 50;
    var needlestride = needle.width * 4;
    var heystackstride = haystack.width * 4;
    //built list of non trans pixel to check
    var checkList = [];
    for (var y = 0; y < needle.height; y++) {
        for (var x = 0; x < needle.width; x++) {
            var i = x * 4 + y * needlestride;
            if (needle.data[i + 3] == 255) {
                checkList.push({ x: x, y: y });
            }
            if (checkList.length == 10) {
                break;
            }
        }
        if (checkList.length == 10) {
            break;
        }
    }
    var cw = (sx + sw) - needle.width;
    var ch = (sy + sh) - needle.height;
    var checklength = checkList.length;
    for (var y = sy; y <= ch; y++) {
        outer: for (var x = sx; x <= cw; x++) {
            for (var a = 0; a < checklength; a++) {
                var i1 = (x + checkList[a].x) * 4 + (y + checkList[a].y) * heystackstride;
                var i2 = checkList[a].x * 4 + checkList[a].y * needlestride;
                var d = 0;
                d = d + Math.abs(haystack.data[i1 + 0] - needle.data[i2 + 0]) | 0;
                d = d + Math.abs(haystack.data[i1 + 1] - needle.data[i2 + 1]) | 0;
                d = d + Math.abs(haystack.data[i1 + 2] - needle.data[i2 + 2]) | 0;
                d *= 255 / needle.data[i2 + 3];
                if (d > maxdif) {
                    continue outer;
                }
            }
            if (simpleCompare(haystack, needle, x, y, maxdif) != Infinity) {
                r.push({ x, y });
                if (r.length > maxresults) {
                    return r;
                }
            }
        }
    }
    return r;
}
/**
* Compares two images and returns the average color difference per pixel between them
* @param max The max color difference at any point in the image before short circuiting the function and returning Infinity. set to -1 to always continue.
* @returns The average color difference per pixel or Infinity if the difference is more than max at any point in the image
*/
function simpleCompare(bigbuf, checkbuf, x, y, max = 30) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    if (max == -1) {
        max = 255 * 4;
    }
    var dif = 0;
    for (var step = 8; step >= 1; step /= 2) {
        for (var cx = 0; cx < checkbuf.width; cx += step) {
            for (var cy = 0; cy < checkbuf.height; cy += step) {
                var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
                var i2 = cx * 4 + cy * checkbuf.width * 4;
                var d = 0;
                d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
                d *= checkbuf.data[i2 + 3] / 255;
                if (step == 1) {
                    dif += d;
                }
                if (d > max) {
                    return Infinity;
                }
            }
        }
    }
    return dif / checkbuf.width / checkbuf.height;
}
/**
* Calculates the root mean square error between the two buffers at the given coordinate, this method can be used in situations with significant blur or
* transparency, it does not bail early on non-matching images like simpleCompare does so it can be expected to be much slower when called often.
* @returns The root mean square error beteen the images, high single pixel errors are penalized more than consisten low errors. return of 0 means perfect match.
*/
function simpleCompareRMSE(bigbuf, checkbuf, x, y) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    var dif = 0;
    var numpix = 0;
    for (var cx = 0; cx < checkbuf.width; cx++) {
        for (var cy = 0; cy < checkbuf.height; cy++) {
            var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
            var i2 = cx * 4 + cy * checkbuf.width * 4;
            var d = 0;
            d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
            d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
            d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
            var weight = checkbuf.data[i2 + 3] / 255;
            numpix += weight;
            dif += d * d * weight;
        }
    }
    return Math.sqrt(dif / numpix);
}
/**
* Returns the difference between two colors (scaled to the alpha of the second color)
*/
function coldif(r1, g1, b1, r2, g2, b2, a2) {
    return (Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)) * a2 / 255; //only applies alpha for 2nd buffer!
}
/**
 * Turns map of promises into a map that contains the resolved values after loading.
 * @param input
 */
function asyncMap(input) {
    var raw = {};
    var promises = [];
    for (var a in input) {
        if (input.hasOwnProperty(a)) {
            raw[a] = null;
            promises.push(input[a].then(function (a, i) { raw[a] = i; r[a] = i; }.bind(null, a)));
        }
    }
    var r = {};
    var promise = Promise.all(promises).then(() => { r.loaded = true; return r; });
    Object.defineProperty(r, "loaded", { enumerable: false, value: false, writable: true });
    Object.defineProperty(r, "promise", { enumerable: false, value: promise });
    Object.defineProperty(r, "raw", { enumerable: false, value: raw });
    return Object.assign(r, raw);
}
/**
* Same as asyncMap, but casts the properties to ImageData in typescript
*/
function webpackImages(input) {
    return asyncMap(input);
}
class ImageDataSet {
    constructor() {
        this.buffers = [];
    }
    matchBest(img, x, y, max) {
        let best = null;
        let bestscore = max;
        for (let a = 0; a < this.buffers.length; a++) {
            let score = img.pixelCompare(this.buffers[a], x, y, bestscore);
            if (isFinite(score) && (bestscore == undefined || score < bestscore)) {
                bestscore = score;
                best = a;
            }
        }
        if (best == null) {
            return null;
        }
        return { index: best, score: bestscore };
    }
    static fromFilmStrip(baseimg, width) {
        if ((baseimg.width % width) != 0) {
            throw new Error("slice size does not fit in base img");
        }
        let r = new ImageDataSet();
        for (let x = 0; x < baseimg.width; x += width) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, width, baseimg.height)));
        }
        return r;
    }
    static fromFilmStripUneven(baseimg, widths) {
        let r = new ImageDataSet();
        let x = 0;
        for (let w of widths) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, w, baseimg.height)));
            x += w;
            if (x > baseimg.width) {
                throw new Error("sampling filmstrip outside bounds");
            }
        }
        if (x != baseimg.width) {
            throw new Error("unconsumed pixels left in film strip imagedata");
        }
        return r;
    }
    static fromAtlas(baseimg, slices) {
        let r = new ImageDataSet();
        for (let slice of slices) {
            r.buffers.push(baseimg.clone(slice));
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imgref.js":
/*!*************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imgref.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImgRef": () => (/* binding */ ImgRef),
/* harmony export */   "ImgRefBind": () => (/* binding */ ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* binding */ ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* binding */ ImgRefData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");

/**
 * Represents an image that might be in different types of memory
 * This is mostly used to represent images still in Alt1 memory that have
 * not been transfered to js yet. Various a1lib api's use this type and
 * choose the most efficient approach based on the memory type
 */
class ImgRef {
    constructor(x, y, w, h) {
        this.t = "none";
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        throw new Error("This imgref (" + this.t + ") does not support toData");
    }
    findSubimage(needle, sx = 0, sy = 0, w = this.width, h = this.height) {
        return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.findSubimage(this, needle, sx, sy, w, h);
    }
    toData(x = this.x, y = this.y, w = this.width, h = this.height) {
        return this.read(x - this.x, y - this.y, w, h);
    }
    ;
    containsArea(rect) {
        return this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + rect.width && this.y + this.height >= rect.y + rect.height;
    }
}
/**
 * Represents an image in js render memory (canvas/image tag)
 */
class ImgRefCtx extends ImgRef {
    constructor(img, x = 0, y = 0) {
        if (img instanceof CanvasRenderingContext2D) {
            super(x, y, img.canvas.width, img.canvas.height);
            this.ctx = img;
        }
        else {
            super(x, y, img.width, img.height);
            var cnv = (img instanceof HTMLCanvasElement ? img : img.toCanvas());
            this.ctx = cnv.getContext("2d");
        }
        this.t = "ctx";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return this.ctx.getImageData(x, y, w, h);
    }
}
/**
 * Represents in image in Alt1 memory, This type of image can be searched for subimages
 * very efficiently and transfering the full image to js can be avoided this way
 */
class ImgRefBind extends ImgRef {
    constructor(handle, x = 0, y = 0, w = 0, h = 0) {
        super(x, y, w, h);
        this.handle = handle;
        this.t = "bind";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.transferImageData)(this.handle, x, y, w, h);
    }
}
/**
 * Represents an image in js memory
 */
class ImgRefData extends ImgRef {
    constructor(buf, x = 0, y = 0) {
        super(x, y, buf.width, buf.height);
        this.buf = buf;
        this.t = "data";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        if (x == 0 && y == 0 && w == this.width && h == this.height) {
            return this.buf;
        }
        var r = new ImageData(w, h);
        for (var b = y; b < y + h; b++) {
            for (var a = x; a < x + w; a++) {
                var i1 = (a - x) * 4 + (b - y) * w * 4;
                var i2 = a * 4 + b * 4 * this.buf.width;
                r.data[i1] = this.buf.data[i2];
                r.data[i1 + 1] = this.buf.data[i2 + 1];
                r.data[i1 + 2] = this.buf.data[i2 + 2];
                r.data[i1 + 3] = this.buf.data[i2 + 3];
            }
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/index.js":
/*!************************************************!*\
  !*** ../node_modules/@alt1/base/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.Alt1Error),
/* harmony export */   "ImageData": () => (/* reexport safe */ _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__.ImageData),
/* harmony export */   "ImageDetect": () => (/* reexport module object */ _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "ImageStreamReader": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.ImageStreamReader),
/* harmony export */   "ImgRef": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRef),
/* harmony export */   "ImgRefBind": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefData),
/* harmony export */   "NoAlt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.NoAlt1Error),
/* harmony export */   "NodePolyfill": () => (/* reexport module object */ _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "PasteInput": () => (/* reexport module object */ _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "Rect": () => (/* reexport safe */ _rect_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "addResizeElement": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.addResizeElement),
/* harmony export */   "capture": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.capture),
/* harmony export */   "captureAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureAsync),
/* harmony export */   "captureHold": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureMultiAsync),
/* harmony export */   "captureStream": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureStream),
/* harmony export */   "decodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.decodeImageString),
/* harmony export */   "encodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.encodeImageString),
/* harmony export */   "getMousePosition": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.identifyApp),
/* harmony export */   "mixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.mixColor),
/* harmony export */   "newestversion": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.newestversion),
/* harmony export */   "on": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.on),
/* harmony export */   "once": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.once),
/* harmony export */   "openbrowser": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.openbrowser),
/* harmony export */   "removeListener": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.removeListener),
/* harmony export */   "requireAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.resetEnvironment),
/* harmony export */   "skinName": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.skinName),
/* harmony export */   "transferImageData": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.transferImageData),
/* harmony export */   "unmixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.unmixColor)
/* harmony export */ });
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarations.js */ "../node_modules/@alt1/base/dist/declarations.js");
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_declarations_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pasteinput.js */ "../node_modules/@alt1/base/dist/pasteinput.js");
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");










/***/ }),

/***/ "../node_modules/@alt1/base/dist/nodepolyfill.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/nodepolyfill.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCanvas": () => (/* binding */ createCanvas),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromBuffer": () => (/* binding */ imageDataFromBuffer),
/* harmony export */   "imageDataToDrawable": () => (/* binding */ imageDataToDrawable),
/* harmony export */   "imageDataToFileBytes": () => (/* binding */ imageDataToFileBytes),
/* harmony export */   "polyfillRequire": () => (/* binding */ polyfillRequire),
/* harmony export */   "requireElectronCommon": () => (/* binding */ requireElectronCommon),
/* harmony export */   "requireNodeCanvas": () => (/* binding */ requireNodeCanvas),
/* harmony export */   "requireSharp": () => (/* binding */ requireSharp)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
//nodejs and electron polyfills for web api's
//commented out type info as that breaks webpack with optional dependencies
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var requirefunction = null;
/**
 * Call this function to let the libs require extra dependencies on nodejs in order
 * to polyfill some browser api's (mostly image compression/decompression)
 * `NodePolifill.polyfillRequire(require);` should solve most cases
 */
function polyfillRequire(requirefn) {
    requirefunction = requirefn;
}
function requireSharp() {
    try {
        if (requirefunction) {
            return requirefunction("sharp");
        }
        else {
            return require(/* webpackIgnore: true */ "sharp"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireNodeCanvas() {
    //attempt to require sharp first, after loading canvas the module sharp fails to load
    requireSharp();
    try {
        if (requirefunction) {
            return requirefunction("canvas");
        }
        else {
            return require(/* webpackIgnore: true */ "canvas"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireElectronCommon() {
    try {
        if (requirefunction) {
            return requirefunction("electron/common");
        }
        else {
            return require(/* webpackIgnore: true */ "electron/common");
        }
    }
    catch (e) { }
    return null;
}
function imageDataToDrawable(buf) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return new nodecnv.ImageData(buf.data, buf.width, buf.height);
}
function createCanvas(w, h) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return nodecnv.createCanvas(w, h);
}
function flipBGRAtoRGBA(data) {
    for (let i = 0; i < data.length; i += 4) {
        let tmp = data[i + 2];
        data[i + 2] = data[i + 0];
        data[i + 0] = tmp;
    }
}
function imageDataToFileBytes(buf, format, quality) {
    return __awaiter(this, void 0, void 0, function* () {
        //use the electron API if we're in electron
        var electronCommon;
        var sharp;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            //need to copy the buffer in order to flip it without destroying the original
            let bufcpy = Buffer.from(buf.data.slice(buf.data.byteOffset, buf.data.byteLength));
            flipBGRAtoRGBA(bufcpy);
            let nativeimg = nativeImage.createFromBitmap(bufcpy, { width: buf.width, height: buf.height });
            return nativeimg.toPNG();
        }
        else if (sharp = requireSharp()) {
            let img = sharp(Buffer.from(buf.data.buffer), { raw: { width: buf.width, height: buf.height, channels: 4 } });
            if (format == "image/png") {
                img.png();
            }
            else if (format == "image/webp") {
                var opts = { quality: 80 };
                if (typeof quality == "number") {
                    opts.quality = quality * 100;
                }
                img.webp(opts);
            }
            else {
                throw new Error("unknown image format: " + format);
            }
            return yield img.toBuffer({ resolveWithObject: false }).buffer;
        }
        throw new Error("coulnd't find build-in image compression methods or the module 'electron/common' or 'sharp'");
    });
}
function imageDataFromBase64(base64) {
    return imageDataFromBuffer(Buffer.from(base64, "base64"));
}
function imageDataFromBuffer(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace)(buffer);
        //use the electron API if we're in electron
        var electronCommon;
        var nodecnv;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            let img = nativeImage.createFromBuffer(buffer);
            let pixels = img.toBitmap();
            let size = img.getSize();
            let pixbuf = new Uint8ClampedArray(pixels.buffer, pixels.byteOffset, pixels.byteLength);
            flipBGRAtoRGBA(pixbuf);
            return new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(pixbuf, size.width, size.height);
        }
        else if (nodecnv = requireNodeCanvas()) {
            return new Promise((done, err) => {
                let img = new nodecnv.Image();
                img.onerror = err;
                img.onload = () => {
                    var cnv = nodecnv.createCanvas(img.naturalWidth, img.naturalHeight);
                    var ctx = cnv.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                    //use our own class
                    done(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(data.data, data.width, data.height));
                };
                img.src = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
            });
        }
        throw new Error("couldn't find built-in canvas, module 'electron/common' or the module 'canvas'");
    });
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/pasteinput.js":
/*!*****************************************************!*\
  !*** ../node_modules/@alt1/base/dist/pasteinput.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileDialog": () => (/* binding */ fileDialog),
/* harmony export */   "lastref": () => (/* binding */ lastref),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "startDragNDrop": () => (/* binding */ startDragNDrop),
/* harmony export */   "triggerPaste": () => (/* binding */ triggerPaste),
/* harmony export */   "unlisten": () => (/* binding */ unlisten)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");


var listeners = [];
var started = false;
var dndStarted = false;
var pasting = false;
var lastref = null;
function listen(func, errorfunc, dragndrop) {
    listeners.push({ cb: func, error: errorfunc });
    if (!started) {
        start();
    }
    if (dragndrop && !dndStarted) {
        startDragNDrop();
    }
}
function unlisten(func) {
    let i = listeners.findIndex(c => c.cb == func);
    if (i != -1) {
        listeners.splice(i, 1);
    }
}
/**
 * currently used in multiple document situations (iframe), might be removed in the future
 */
function triggerPaste(img) {
    lastref = img;
    for (var a in listeners) {
        listeners[a].cb(lastref);
    }
}
function pasted(img) {
    pasting = false;
    let cnv = img instanceof HTMLCanvasElement ? img : img.toCanvas();
    triggerPaste(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefCtx(cnv));
}
function error(error, mes) {
    var _a, _b;
    pasting = false;
    for (var a in listeners) {
        (_b = (_a = listeners[a]).error) === null || _b === void 0 ? void 0 : _b.call(_a, mes, error);
    }
}
function startDragNDrop() {
    var getitem = function (items) {
        var foundimage = "";
        for (var a = 0; a < items.length; a++) {
            var item = items[a];
            var m = item.type.match(/^image\/(\w+)$/);
            if (m) {
                if (m[1] == "png") {
                    return item;
                }
                else {
                    foundimage = m[1];
                }
            }
        }
        if (foundimage) {
            error("notpng", "The image you uploaded is not a .png image. Other image type have compression noise and can't be used for image detection.");
        }
        return null;
    };
    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    window.addEventListener("drop", function (e) {
        if (!e.dataTransfer) {
            return;
        }
        var item = getitem(e.dataTransfer.items);
        e.preventDefault();
        if (!item) {
            return;
        }
        fromFile(item.getAsFile());
    });
}
function start() {
    if (started) {
        return;
    }
    started = true;
    //determine if we have a clipboard api
    //try{a=new Event("clipboard"); a="clipboardData" in a;}
    //catch(e){a=false;}
    var ischrome = !!navigator.userAgent.match(/Chrome/) && !navigator.userAgent.match(/Edge/);
    //old method breaks after chrome 41, revert to good old user agent sniffing
    //nvm, internet explorer (edge) decided that it wants to be chrome, however fails at delivering
    //turns out this one is interesting, edge is a hybrid between the paste api's
    var apipasted = function (e) {
        if (!e.clipboardData) {
            return;
        }
        for (var a = 0; a < e.clipboardData.items.length; a++) { //loop all data types
            if (e.clipboardData.items[a].type.indexOf("image") != -1) {
                var file = e.clipboardData.items[a].getAsFile();
                var img = new Image();
                img.src = (window.URL || window.webkitURL).createObjectURL(file);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
            }
        }
    };
    if (ischrome) {
        document.addEventListener("paste", apipasted);
    }
    else {
        var catcher = document.createElement("div");
        catcher.setAttribute("contenteditable", "");
        catcher.className = "forcehidden"; //retarded ie safety/bug, cant apply styles using js//TODO i don't even know what's going on
        catcher.onpaste = function (e) {
            if (e.clipboardData && e.clipboardData.items) {
                apipasted(e);
                return;
            }
            setTimeout(function () {
                var b = catcher.children[0];
                if (!b || b.tagName != "IMG") {
                    return;
                }
                var img = new Image();
                img.src = b.src;
                var a = img.src.match(/^data:([\w\/]+);/);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
                catcher.innerHTML = "";
            }, 1);
        };
        document.body.appendChild(catcher);
    }
    //detect if ctrl-v is pressed and focus catcher if needed
    document.addEventListener("keydown", function (e) {
        if (e.target.tagName == "INPUT") {
            return;
        }
        if (e.keyCode != "V".charCodeAt(0) || !e.ctrlKey) {
            return;
        }
        pasting = true;
        setTimeout(function () {
            if (pasting) {
                error("noimg", "You pressed Ctrl+V, but no image was pasted by your browser, make sure your clipboard contains an image, and not a link to an image.");
            }
        }, 1000);
        if (catcher) {
            catcher.focus();
        }
    });
}
function fileDialog() {
    var fileinput = document.createElement("input");
    fileinput.type = "file";
    fileinput.accept = "image/png";
    fileinput.onchange = function () { if (fileinput.files && fileinput.files[0]) {
        fromFile(fileinput.files[0]);
    } };
    fileinput.click();
    return fileinput;
}
function fromFile(file) {
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        var bytearray = new Uint8Array(reader.result);
        if (_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.isPngBuffer(bytearray)) {
            _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace(bytearray);
        }
        var blob = new Blob([bytearray], { type: "image/png" });
        var img = new Image();
        img.onerror = () => error("invalidfile", "The file you uploaded could not be opened as an image.");
        var bloburl = URL.createObjectURL(blob);
        img.src = bloburl;
        if (img.width > 0) {
            pasted(img);
            URL.revokeObjectURL(bloburl);
        }
        else {
            img.onload = function () { pasted(img); URL.revokeObjectURL(bloburl); };
        }
    };
    reader.readAsArrayBuffer(file);
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/rect.js":
/*!***********************************************!*\
  !*** ../node_modules/@alt1/base/dist/rect.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rect)
/* harmony export */ });
//util class for rectangle maths
//TODO shit this sucks can we remove it again?
//more of a shorthand to get {x,y,width,height} than a class
//kinda starting to like it again
//TODO remove rant
;
/**
 * Simple rectangle class with some util functions
 */
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    static fromArgs(...args) {
        if (typeof args[0] == "object") {
            return new Rect(args[0].x, args[0].y, args[0].width, args[0].height);
        }
        else if (typeof args[0] == "number" && args.length >= 4) {
            return new Rect(args[0], args[1], args[2], args[3]);
        }
        else {
            throw new Error("invalid rect args");
        }
    }
    /**
     * Resizes this Rect to include the full size of a given second rectangle
     */
    union(r2) {
        var x = Math.min(this.x, r2.x);
        var y = Math.min(this.y, r2.y);
        this.width = Math.max(this.x + this.width, r2.x + r2.width) - x;
        this.height = Math.max(this.y + this.height, r2.y + r2.height) - y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Resizes this Rect to include a given point
     */
    includePoint(x, y) {
        this.union(new Rect(x, y, 0, 0));
    }
    /**
     * Grows the rectangle with the given dimensions
     */
    inflate(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += 2 * w;
        this.height += 2 * h;
    }
    /**
     * Resizes this Rect to the area that overlaps a given Rect
     * width and height will be set to 0 if the intersection does not exist
     */
    intersect(r2) {
        if (this.x < r2.x) {
            this.width -= r2.x - this.x;
            this.x = r2.x;
        }
        if (this.y < r2.y) {
            this.height -= r2.y - this.y;
            this.y = r2.y;
        }
        this.width = Math.min(this.x + this.width, r2.x + r2.width) - this.x;
        this.height = Math.min(this.y + this.height, r2.y + r2.height) - this.y;
        if (this.width <= 0 || this.height <= 0) {
            this.width = 0;
            this.height = 0;
        }
    }
    /**
     * Returns wether this Rect has at least one pixel overlap with a given Rect
     */
    overlaps(r2) {
        return this.x < r2.x + r2.width && this.x + this.width > r2.x && this.y < r2.y + r2.height && this.y + this.height > r2.y;
    }
    /**
     * Returns wether a given Rect fits completely inside this Rect
     * @param r2
     */
    contains(r2) {
        return this.x <= r2.x && this.x + this.width >= r2.x + r2.width && this.y <= r2.y && this.y + this.height >= r2.y + r2.height;
    }
    /**
     * Returns wether a given point lies inside this Rect
     */
    containsPoint(x, y) {
        return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/wrapper.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/wrapper.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt1Error": () => (/* binding */ Alt1Error),
/* harmony export */   "ImageStreamReader": () => (/* binding */ ImageStreamReader),
/* harmony export */   "NoAlt1Error": () => (/* binding */ NoAlt1Error),
/* harmony export */   "addResizeElement": () => (/* binding */ addResizeElement),
/* harmony export */   "capture": () => (/* binding */ capture),
/* harmony export */   "captureAsync": () => (/* binding */ captureAsync),
/* harmony export */   "captureHold": () => (/* binding */ captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* binding */ captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* binding */ captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* binding */ captureMultiAsync),
/* harmony export */   "captureStream": () => (/* binding */ captureStream),
/* harmony export */   "decodeImageString": () => (/* binding */ decodeImageString),
/* harmony export */   "encodeImageString": () => (/* binding */ encodeImageString),
/* harmony export */   "getMousePosition": () => (/* binding */ getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* binding */ getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* binding */ hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* binding */ hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* binding */ identifyApp),
/* harmony export */   "mixColor": () => (/* binding */ mixColor),
/* harmony export */   "newestversion": () => (/* binding */ newestversion),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "openbrowser": () => (/* binding */ openbrowser),
/* harmony export */   "removeListener": () => (/* binding */ removeListener),
/* harmony export */   "requireAlt1": () => (/* binding */ requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* binding */ resetEnvironment),
/* harmony export */   "skinName": () => (/* binding */ skinName),
/* harmony export */   "transferImageData": () => (/* binding */ transferImageData),
/* harmony export */   "unmixColor": () => (/* binding */ unmixColor)
/* harmony export */ });
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alt1api.js */ "../node_modules/@alt1/base/dist/alt1api.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_alt1api_js__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
 * Thrown when a method is called that can not be used outside of Alt1
 */
class NoAlt1Error extends Error {
    constructor() {
        super();
        this.message = "This method can not be ran outside of Alt1";
    }
}
;
/**
 * Thrown when the Alt1 API returns an invalid result
 * Errors of a different type are throw when internal Alt1 errors occur
 */
class Alt1Error extends Error {
}
/**
 * The latest Alt1 version
 */
var newestversion = "1.5.5";
/**
 * Whether the Alt1 API is available
 */
var hasAlt1 = (typeof alt1 != "undefined");
/**
 * The name of the Alt1 interface skin. (Always "default" if running in a browser)
 */
var skinName = hasAlt1 ? alt1.skinName : "default";
/**
 * Max number of bytes that can be sent by alt1 in one function
 * Not completely sure why this number is different than window.alt1.maxtranfer
 */
var maxtransfer = 4000000;
/**
 * Open a link in the default browser
 * @deprecated use window.open instead
 */
function openbrowser(url) {
    if (hasAlt1) {
        alt1.openBrowser(url);
    }
    else {
        window.open(url, '_blank');
    }
}
/**
 * Throw if Alt1 API is not available
 */
function requireAlt1() {
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
}
/**
 * Returns an object with a rectangle that spans all screens
 */
function getdisplaybounds() {
    if (!hasAlt1) {
        return false;
    }
    return new _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"](alt1.screenX, alt1.screenY, alt1.screenWidth, alt1.screenHeight);
}
/**
 * gets an imagebuffer with pixel data about the requested region
 */
function capture(...args) {
    //TODO change null return on error into throw instead (x3)
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
    var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
    if (alt1.capture) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.capture(rect.x, rect.y, rect.width, rect.height), rect.width, rect.height);
    }
    var buf = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(rect.width, rect.height);
    if (rect.width * rect.height * 4 <= maxtransfer) {
        var data = alt1.getRegion(rect.x, rect.y, rect.width, rect.height);
        if (!data) {
            return null;
        }
        decodeImageString(data, buf, 0, 0, rect.width, rect.height);
    }
    else {
        //split up the request to to exceed the single transfer limit (for now)
        var x1 = rect.x;
        var ref = alt1.bindRegion(rect.x, rect.y, rect.width, rect.height);
        if (ref <= 0) {
            return null;
        }
        while (x1 < rect.x + rect.width) {
            var x2 = Math.min(rect.x + rect.width, Math.floor(x1 + (maxtransfer / 4 / rect.height)));
            var data = alt1.bindGetRegion(ref, x1, rect.y, x2 - x1, rect.height);
            if (!data) {
                return null;
            }
            decodeImageString(data, buf, x1 - rect.x, 0, x2 - x1, rect.height);
            x1 = x2;
        }
    }
    return buf;
}
/**
 * Makes alt1 bind an area of the rs client in memory without sending it to the js client
 * returns an imgref object which can be used to get pixel data using the imgreftobuf function
 * currently only one bind can exist per app and the ref in (v) will always be 1
 */
function captureHold(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindRegion(x, y, w, h);
    if (r <= 0) {
        throw new Alt1Error("capturehold failed");
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * Same as captureHoldRegion, but captures the screen instead of the rs client. it also uses screen coordinates instead and can capture outside of the rs client
 */
function captureHoldScreen(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindScreenRegion(x, y, w, h);
    if (r <= 0) {
        return false;
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * bind the full rs window if the rs window can be detected by alt1, otherwise return the full screen
 */
function captureHoldFullRs() {
    return captureHold(0, 0, alt1.rsWidth, alt1.rsHeight);
}
/**
 * returns a subregion from a bound image
 * used internally in imgreftobuf if imgref is a bound image
 * @deprecated This should be handled internall by the imgrefbind.toData method
 */
function transferImageData(handle, x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    if (alt1.bindGetRegionBuffer) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.bindGetRegionBuffer(handle, x, y, w, h), w, h);
    }
    var r = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(w, h);
    var x1 = x;
    while (true) { //split up the request to to exceed the single transfer limit (for now)
        var x2 = Math.min(x + w, Math.floor(x1 + (maxtransfer / 4 / h)));
        var a = alt1.bindGetRegion(handle, x1, y, x2 - x1, h);
        if (!a) {
            throw new Alt1Error();
        }
        decodeImageString(a, r, x1 - x, 0, x2 - x1, h);
        x1 = x2;
        if (x1 == x + w) {
            break;
        }
        ;
    }
    return r;
}
/**
 * decodes a returned string from alt1 to an imagebuffer
 */
function decodeImageString(imagestring, target, x, y, w, h) {
    var bin = atob(imagestring);
    var bytes = target.data;
    w |= 0;
    h |= 0;
    var offset = 4 * x + 4 * y * target.width;
    var target_width = target.width | 0;
    for (var a = 0; a < w; a++) {
        for (var b = 0; b < h; b++) {
            var i1 = (offset + (a * 4 | 0) + (b * target_width * 4 | 0)) | 0;
            var i2 = ((a * 4 | 0) + (b * 4 * w | 0)) | 0;
            bytes[i1 + 0 | 0] = bin.charCodeAt(i2 + 2 | 0); //fix weird red/blue swap in c#
            bytes[i1 + 1 | 0] = bin.charCodeAt(i2 + 1 | 0);
            bytes[i1 + 2 | 0] = bin.charCodeAt(i2 + 0 | 0);
            bytes[i1 + 3 | 0] = bin.charCodeAt(i2 + 3 | 0);
        }
    }
    return target;
}
/**
 * encodes an imagebuffer to a string
 */
function encodeImageString(buf, sx = 0, sy = 0, sw = buf.width, sh = buf.height) {
    var raw = "";
    for (var y = sy; y < sy + sh; y++) {
        for (var x = sx; x < sx + sw; x++) {
            var i = 4 * x + 4 * buf.width * y | 0;
            raw += String.fromCharCode(buf.data[i + 2 | 0]);
            raw += String.fromCharCode(buf.data[i + 1 | 0]);
            raw += String.fromCharCode(buf.data[i + 0 | 0]);
            raw += String.fromCharCode(buf.data[i + 3 | 0]);
        }
    }
    return btoa(raw);
}
/**
 * mixes the given color into a single int. This format is used by alt1
 */
function mixColor(r, g, b, a = 255) {
    return (b << 0) + (g << 8) + (r << 16) + (a << 24);
}
function unmixColor(col) {
    var r = (col >> 16) & 0xff;
    var g = (col >> 8) & 0xff;
    var b = (col >> 0) & 0xff;
    return [r, g, b];
}
function identifyApp(url) {
    if (hasAlt1) {
        alt1.identifyAppUrl(url);
    }
}
function resetEnvironment() {
    hasAlt1 = (typeof alt1 != "undefined");
    skinName = hasAlt1 ? alt1.skinName : "default";
}
function convertAlt1Version(str) {
    var a = str.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!a) {
        throw new RangeError("Invalid version string");
    }
    return (+a[1]) * 1000 * 1000 + (+a[2]) * 1000 + (+a[3]) * 1;
}
var cachedVersionInt = -1;
/**
 * checks if alt1 is running and at least the given version. versionstr should be a string with the version eg: 1.3.2
 * @param versionstr
 */
function hasAlt1Version(versionstr) {
    if (!hasAlt1) {
        return false;
    }
    if (cachedVersionInt == -1) {
        cachedVersionInt = alt1.versionint;
    }
    return cachedVersionInt >= convertAlt1Version(versionstr);
}
/**
 * Gets the current cursor position in the game, returns null if the rs window is not active (alt1.rsActive)
 */
function getMousePosition() {
    var pos = alt1.mousePosition;
    if (pos == -1) {
        return null;
    }
    return { x: pos >>> 16, y: pos & 0xFFFF };
}
/**
 * Registers a given HTML element as a frame border, when this element is dragged by the user the Alt1 frame will resize accordingly
 * Use the direction arguements to make a given direction stick to the mouse. eg. Only set left to true to make the element behave as the left border
 * Or set all to true to move the whole window. Not all combinations are permitted
 */
function addResizeElement(el, left, top, right, bot) {
    if (!hasAlt1 || !alt1.userResize) {
        return;
    }
    el.addEventListener("mousedown", function (e) {
        alt1.userResize(left, top, right, bot);
        e.preventDefault();
    });
}
/**
 * Add an event listener
 */
function on(type, listener) {
    if (!hasAlt1) {
        return;
    }
    if (!alt1.events) {
        alt1.events = {};
    }
    if (!alt1.events[type]) {
        alt1.events[type] = [];
    }
    alt1.events[type].push(listener);
}
/**
 * Removes an event listener
 */
function removeListener(type, listener) {
    var elist = hasAlt1 && alt1.events && alt1.events[type];
    if (!elist) {
        return;
    }
    var i = elist.indexOf(listener);
    if (i == -1) {
        return;
    }
    elist.splice(i, 1);
}
/**
 * Listens for the event to fire once and then stops listening
 * @param event
 * @param cb
 */
function once(type, listener) {
    var fn = (e) => {
        removeListener(type, fn);
        listener(e);
    };
    on(type, fn);
}
;
/**
 * Used to read a set of images from a binary stream returned by the Alt1 API
 */
class ImageStreamReader {
    constructor(reader, ...args) {
        this.framebuffer = null;
        this.pos = 0;
        this.reading = false;
        this.closed = false;
        //paused state
        this.pausedindex = -1;
        this.pausedbuffer = null;
        this.streamreader = reader;
        if (args[0] instanceof _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData) {
            this.setFrameBuffer(args[0]);
        }
        else if (typeof args[0] == "number") {
            this.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(args[0], args[1]));
        }
    }
    /**
     *
     */
    setFrameBuffer(buffer) {
        if (this.reading) {
            throw new Error("can't change framebuffer while reading");
        }
        this.framebuffer = buffer;
    }
    /**
     * Closes the underlying stream and ends reading
     */
    close() {
        this.streamreader.cancel();
    }
    /**
     * Reads a single image from the stream
     */
    nextImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reading) {
                throw new Error("already reading from this stream");
            }
            if (!this.framebuffer) {
                throw new Error("framebuffer not set");
            }
            this.reading = true;
            var synctime = -Date.now();
            var starttime = Date.now();
            var r = false;
            while (!r) {
                if (this.pausedindex != -1 && this.pausedbuffer) {
                    r = this.readChunk(this.pausedindex, this.framebuffer.data, this.pausedbuffer);
                }
                else {
                    synctime += Date.now();
                    var res = yield this.streamreader.read();
                    synctime -= Date.now();
                    if (res.done) {
                        throw new Error("Stream closed while reading");
                    }
                    var data = res.value;
                    r = this.readChunk(0, this.framebuffer.data, data);
                }
            }
            synctime += Date.now();
            //console.log("Decoded async image, " + this.framebuffer.width + "x" + this.framebuffer.height + " time: " + (Date.now() - starttime) + "ms (" + synctime + "ms main thread)");
            this.reading = false;
            return this.framebuffer;
        });
    }
    readChunk(i, framedata, buffer) {
        //very hot code, explicit int32 casting with |0 speeds it up by ~ x2
        i = i | 0;
        var framesize = framedata.length | 0;
        var pos = this.pos;
        var datalen = buffer.length | 0;
        //var data32 = new Float64Array(buffer.buffer);
        //var framedata32 = new Float64Array(framedata.buffer);
        //fix possible buffer misalignment
        //align to 16 for extra loop unrolling
        while (i < datalen) {
            //slow loop, fix alignment and other issues
            while (i < datalen && pos < framesize && (pos % 16 != 0 || !((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize))) {
                var rel = pos;
                if (pos % 4 == 0) {
                    rel = rel + 2 | 0;
                }
                if (pos % 4 == 2) {
                    rel = rel - 2 | 0;
                }
                framedata[rel | 0] = buffer[i | 0];
                i = i + 1 | 0;
                pos = pos + 1 | 0;
            }
            //fast unrolled loop for large chunks i wish js had some sort of memcpy
            if (pos % 16 == 0) {
                while ((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize) {
                    framedata[pos + 0 | 0] = buffer[i + 2 | 0];
                    framedata[pos + 1 | 0] = buffer[i + 1 | 0];
                    framedata[pos + 2 | 0] = buffer[i + 0 | 0];
                    framedata[pos + 3 | 0] = buffer[i + 3 | 0];
                    framedata[pos + 4 | 0] = buffer[i + 6 | 0];
                    framedata[pos + 5 | 0] = buffer[i + 5 | 0];
                    framedata[pos + 6 | 0] = buffer[i + 4 | 0];
                    framedata[pos + 7 | 0] = buffer[i + 7 | 0];
                    framedata[pos + 8 | 0] = buffer[i + 10 | 0];
                    framedata[pos + 9 | 0] = buffer[i + 9 | 0];
                    framedata[pos + 10 | 0] = buffer[i + 8 | 0];
                    framedata[pos + 11 | 0] = buffer[i + 11 | 0];
                    framedata[pos + 12 | 0] = buffer[i + 14 | 0];
                    framedata[pos + 13 | 0] = buffer[i + 13 | 0];
                    framedata[pos + 14 | 0] = buffer[i + 12 | 0];
                    framedata[pos + 15 | 0] = buffer[i + 15 | 0];
                    //could speed it up another x2 but wouldn't be able to swap r/b swap and possible alignment issues
                    //framedata32[pos / 8 + 0 | 0] = data32[i / 8 + 0 | 0];
                    //framedata32[pos / 8 + 1 | 0] = data32[i / 8 + 1 | 0];
                    //framedata32[pos / 4 + 2 | 0] = data32[i / 4 + 2 | 0];
                    //framedata32[pos / 4 + 3 | 0] = data32[i / 4 + 3 | 0];
                    pos = pos + 16 | 0;
                    i = i + 16 | 0;
                }
            }
            if (pos >= framesize) {
                this.pausedbuffer = null;
                this.pausedindex = -1;
                this.pos = 0;
                if (i != buffer.length - 1) {
                    this.pausedbuffer = buffer;
                    this.pausedindex = i;
                }
                return true;
            }
        }
        this.pos = pos;
        this.pausedbuffer = null;
        this.pausedindex = -1;
        return false;
    }
}
/**
 * Asynchronously captures a section of the game screen
 */
function captureAsync(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
        if (alt1.captureAsync) {
            let img = yield alt1.captureAsync(rect.x, rect.y, rect.width, rect.height);
            return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(img, rect.width, rect.height);
        }
        if (!hasAlt1Version("1.4.6")) {
            return capture(rect.x, rect.y, rect.width, rect.height);
        }
        var url = "https://alt1api/pixel/getregion/" + encodeURIComponent(JSON.stringify(Object.assign(Object.assign({}, rect), { format: "raw", quality: 1 })));
        var res = yield fetch(url);
        var imgreader = new ImageStreamReader(res.body.getReader(), rect.width, rect.height);
        return imgreader.nextImage();
    });
}
/**
 * Asynchronously captures multple area's. This method captures the images in the same render frame if possible
 * @param areas
 */
function captureMultiAsync(areas) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var r = {};
        if (alt1.captureMultiAsync) {
            let bufs = yield alt1.captureMultiAsync(areas);
            for (let a in areas) {
                if (!bufs[a]) {
                    r[a] = null;
                }
                r[a] = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(bufs[a], areas[a].width, areas[a].height);
            }
            return r;
        }
        var capts = [];
        var captids = [];
        for (var id in areas) {
            if (areas[id]) {
                capts.push(areas[id]);
                captids.push(id);
            }
            else {
                r[id] = null;
            }
        }
        if (capts.length == 0) {
            return r;
        }
        if (!hasAlt1Version("1.5.1")) {
            var proms = [];
            for (var a = 0; a < capts.length; a++) {
                proms.push(captureAsync(capts[a]));
            }
            var results = yield Promise.all(proms);
            for (var a = 0; a < capts.length; a++) {
                r[captids[a]] = results[a];
            }
        }
        else {
            var res = yield fetch("https://alt1api/pixel/getregionmulti/" + encodeURIComponent(JSON.stringify({ areas: capts, format: "raw", quality: 1 })));
            var imgreader = new ImageStreamReader(res.body.getReader());
            for (var a = 0; a < capts.length; a++) {
                var capt = capts[a];
                imgreader.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(capt.width, capt.height));
                r[captids[a]] = yield imgreader.nextImage();
            }
        }
        return r;
    });
}
/**
 * Starts capturing a realtime stream of the game. Make sure you keep reading the stream and close it when you're done or Alt1 WILL crash
 * @param framecb Called whenever a new frame is decoded
 * @param errorcb Called whenever an error occurs, the error is rethrown if not defined
 * @param fps Maximum fps of the stream
 */
function captureStream(x, y, width, height, fps, framecb, errorcb) {
    requireAlt1();
    if (!hasAlt1Version("1.4.6")) {
        throw new Alt1Error("This function is not supported in this version of Alt1");
    }
    var url = "https://alt1api/pixel/streamregion/" + encodeURIComponent(JSON.stringify({ x, y, width, height, fps, format: "raw" }));
    var res = fetch(url).then((res) => __awaiter(this, void 0, void 0, function* () {
        var reader = new ImageStreamReader(res.body.getReader(), width, height);
        try {
            while (!reader.closed && !state.closed) {
                var img = yield reader.nextImage();
                if (!state.closed) {
                    framecb(img);
                    state.framenr++;
                }
            }
        }
        catch (e) {
            if (!state.closed) {
                reader.close();
                if (errorcb) {
                    errorcb(e);
                }
                else {
                    throw e;
                }
            }
        }
        if (!reader.closed && state.closed) {
            reader.close();
        }
    }));
    var state = {
        x, y, width, height,
        framenr: 0,
        close: () => { state.closed = true; },
        closed: false,
    };
    return state;
}


/***/ }),

/***/ "./images/barrowsChest.data.png":
/*!**************************************!*\
  !*** ./images/barrowsChest.data.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./images/barrowsChestLegacy.data.png":
/*!********************************************!*\
  !*** ./images/barrowsChestLegacy.data.png ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./images/eocbotleft.data.png":
/*!************************************!*\
  !*** ./images/eocbotleft.data.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAE4SURBVChTfZFNS8NAEIbfbrLpbto0ba0KWqTYQg89CMUKghf/mb/MkyB40IOIHxfRSimWSkNtkzTZrMlYbzUPzO7szs7wziy6g3PNnIY26/u60z/TKcgzZnIDGUIIqFiRnweLIwXGi3SwioL2PJglinCrLoIggFLR+vp/2CoIEab2x17vWK/djVAPKlqBGww68jEZDXOT2PJ7gUglZEnBAk/7mYzHaLR7G5NYtmTVsynZ5RJsx6HAcj7fmGQyvaLqYeCBGSY9zJIzatU6yeufnOLu6hLakmAFLiloOy4aO7s4aHXobKXfI0tlknd7c43u0QCfr88wtpvti0THWKS9eLMpmq1DyHTU3N3Cx/AdJVugUq7Am4ww+5r+TskSkmToKMTL4z2ElHh7ekBicpLl1mrwfR+tThc/Sc6HTgcfco4AAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/eoctopleft.data.png":
/*!************************************!*\
  !*** ./images/eoctopleft.data.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAABmUExURQwaIxMiKhsrNCItNSs6RCMyPCg1Px8KCRolLCsODTQRDzNDTREdJEQaFkIUEzsTEgkVHEoVFEsaFUwcGlIeGjwZFVEkI2mAjXOLl2B2g1pvey09SBMYHFRmcRMlMDlLVyM6RgQSG8bROHQAAAAJbm9QRQAAAAAAAAAAAKGKctUAAABzSURBVBhXNcnbFsIgDETRtI3FIKSQBPBe/f+fFHE5T2evAYBpXhDxsODae3X/wRGdI0/kPXk4hd6Rt8iRISTnOYuIqkFKVNiymKl+sbGJZYvj8cKqVcfjiGNW5fpDabWUer4MtPlaarthx/0xT8+9vd7hA+tIB9rzLA2SAAAAAElFTkSuQmCC")

/***/ }),

/***/ "./images/eocx.data.png":
/*!******************************!*\
  !*** ./images/eocx.data.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAFKUExURQAAABkqMxIdIxMiKgQSGwINFAIVIUFTXyQyPAkVHRIgKCYtNUAJBn4xGKUyKNBaSj4JBicuNhMlMAwaIxEcISEnLz8IBe/FY+mcV8ZPQj8JByAkKBwwPGEKBJYlHeGQSP7KXEAKBzlLVyEmKzYGBYgaFNWDOvy/SSEuOTE6Q0sKB2sKB811Kvy0NXIKBgwYHjNDTQMJDBsnL0BETGMLCX4PCcVpG/upI2IMCgMDBBgmLzU5QWIKCJYwCPqgEr9eDjU9Ris6RAYMDxYiKWUWDWQWDTM5QDpOWixBTRwoMDE0OlsMDVoMDSsxOQcVHl1xfS09SAYNEBgkKlsLDCsuNUBQWg8dJic1QRItOwYRGDExNlwLDDY9RjlIUlNmcQweKSYuNTQ+RkxeagEFC0daZSM6RgoiLhokKktgbAIbJwQQFgwRFRMdIwAAAMy8RMYAAABudFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AoAU8MwAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAa1JREFUKFMlkf9T00AQxe+ye/QWbdA8FdBr0GihWmgStYjWggWVICj1Wyl+i4opWvX//9VjfPNmduYzO/vezKq/OiDNZqZmZfbc+Xo4NxfWL1ycVRGTZXDN4tLlK/X5hcXFhfn61WuKyRkJ/uNGvHR9yTtu3FBwLJzYQG7eajTDcHllZTkMmw1lhdnUWmJu32k343h1bW01jpsdZVKBQYb87r37ne76g3XvbmdDsYAYyOTho97j/uZWt7u12d94ooRhWCgbpNs7vaf9jlf/2fNdZQFf05ItsL33Yr/tdfBy95WyTpPVdOh4iNdvem8b7YN370es7JCgB4dHGFMhx3sfPu5/+jyCVrnWMF9KcQxd4Hjn67fvIzitTiTTPyJUgWGKCuSScemQK2bKHFXMKYHLISWAx4ECs05kAi8GnSaYWOSoVIkJbJUlw2rA3KoxjoI8qCI1LlFGtUIDlOifAXwEKg3lyplfhSNMzFQnZ/l5WkWcqnFVFQ4li8lzgaVcrAafKn+FzjKn/jvsKP+dkoj1nCBIxQgk8k3EU9GBUX5Mp2yMYb9tTJoSt/6cmH+D5EJZGWljEQAAAABJRU5ErkJggg==")

/***/ }),

/***/ "./images/legacybotleft.data.png":
/*!***************************************!*\
  !*** ./images/legacybotleft.data.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAIAAACz0DtzAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAADVSURBVChTY5zQWSYsJLZl6xYWZtY/f39fuXaDgYGBjYX515+/fDy8P358AzJAip4/f6mjrbt3376PHz8AVfz99wdIQgAzEwuQywThXLl62dnJiY2NDSjEy80vJCgCJIGIn18AyAYpsnP2sbRxA6rz8fYBcoGWfv/+DUhCGEARxr72skuXrrx4eE/fzBzIB9q7eu0qIAMCINYxa6gp/fzxnUdA8OvXb0B0//797z9AuiEqgNYBuYwJkV6/f4FMhkgAgaiIMCc72+9/v//8/s/Cyvjn938ASgxr+1oDceAAAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/legacytopleft.data.png":
/*!***************************************!*\
  !*** ./images/legacytopleft.data.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAEmSURBVChTTZDJSgNBEIZ7melk9kFRRk0i+ALe9OojePMJvXnw7FkQvXkRNzwFFEVISDJLT3ePf9uDsSh+vir+ql7o5cX5zfUVIeT+7lakKYAzTwgB8LivdGs7s+lDsTeCI9sufM/vTKeNAkgpa1kp1SLZ4dExHJs7Y8whsyzHaBCEPQxDuylhTbF/kKXx1/enbBu0MAoty1XXGcf07PQkzzfeP6aT0Rj1/1iuqjgKANaE5fP57PHpRWnjceZUDKKyXLhybXp+fZvsbmFOGeIxMgyTulyAGaMMr/jdTYTHO8rR5dzqcmkdCGM6FgYRyKkYCDgAcZwAEHYNEt/VyhYqlZZNv7WqSgeUMiRzxV/g2T0RorWGomPv5Au/qtejDhA4DheglP0Aa2SQg761+aoAAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/legacyx.data.png":
/*!*********************************!*\
  !*** ./images/legacyx.data.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4T6WTsWvbUBDGP4MHZegf4S0uZLChQ7QlkKHOlECXGjzUY8dAps6dsmYqmYrJ1GQIOENAHgzq0GIPLWRUIIFnsOG9QaCDCBru7j3ZMZmaWyQ97n7f3XdPtdZm4x9eETUGnHw9wmxmYBYOeASiN5EiS5IHlSsKj/xNsHmB028XEMCX4z6yzMDmFkSEqB5JkkQ9qkABwznWWVxcTxXQ7x3CGLMs8ooMIQIi31AA8xmLDW884POnQ2QMIMLZeSJC3Q+7kOq66g4uUz0/iOXYLAyS8a120P3YgZ1bST77PqzmZgiLDy4VyrG/F8tIJrdIRh7Q73WQ3RstJMKPK1UL6lXxToyC5QE4BoQOGODmFianyrDhjYf46t3ttgAL7y3nJ79XOjDGwuVOXQeQjFJZX+Q9iN+1FVUSinKtg+CB4/ZKQjKeANio5taXAnHrrRRzzJxF+vOFDniuMH+81ZDX9E9WwVrNBlAWYLFnWzD3usb0lwLaLU5cGjmZKqTZbIBQwM0JafCA15U9GClgSPCBC9gDvlDBPNkUd2BXAJ3323ALpzexRDVnmF2LlpbIVbaE6d9MLxK3yz+HJMqa/K7WbCROqbZAyO6MAm7v9BL9TzwBIN4z8nZ7bgEAAAAASUVORK5CYII=")

/***/ }),

/***/ "../node_modules/@alt1/ocr/dist/index.js":
/*!***********************************************!*\
  !*** ../node_modules/@alt1/ocr/dist/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetChatColorMono": () => (/* binding */ GetChatColorMono),
/* harmony export */   "canblend": () => (/* binding */ canblend),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "debugFont": () => (/* binding */ debugFont),
/* harmony export */   "debugout": () => (/* binding */ debugout),
/* harmony export */   "decompose2col": () => (/* binding */ decompose2col),
/* harmony export */   "decompose3col": () => (/* binding */ decompose3col),
/* harmony export */   "decomposeblack": () => (/* binding */ decomposeblack),
/* harmony export */   "findChar": () => (/* binding */ findChar),
/* harmony export */   "findReadLine": () => (/* binding */ findReadLine),
/* harmony export */   "generatefont": () => (/* binding */ generatefont),
/* harmony export */   "getChatColor": () => (/* binding */ getChatColor),
/* harmony export */   "readChar": () => (/* binding */ readChar),
/* harmony export */   "readLine": () => (/* binding */ readLine),
/* harmony export */   "readSmallCapsBackwards": () => (/* binding */ readSmallCapsBackwards),
/* harmony export */   "unblendBlackBackground": () => (/* binding */ unblendBlackBackground),
/* harmony export */   "unblendKnownBg": () => (/* binding */ unblendKnownBg),
/* harmony export */   "unblendTrans": () => (/* binding */ unblendTrans)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");

var debug = {
    printcharscores: false,
    trackread: false
};
var debugout = {};
/**
 * draws the font definition to a buffer and displays it in the dom for debugging purposes
 * @param font
 */
function debugFont(font) {
    var spacing = font.width + 2;
    var buf = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(spacing * font.chars.length, font.height + 1);
    for (var a = 0; a < buf.data.length; a += 4) {
        buf.data[a] = buf.data[a + 1] = buf.data[a + 2] = 0;
        buf.data[a + 3] = 255;
    }
    for (var a = 0; a < font.chars.length; a++) {
        var bx = a * spacing;
        var chr = font.chars[a];
        for (var b = 0; b < chr.pixels.length; b += (font.shadow ? 4 : 3)) {
            buf.setPixel(bx + chr.pixels[b], chr.pixels[b + 1], [chr.pixels[b + 2], chr.pixels[b + 2], chr.pixels[b + 2], 255]);
            if (font.shadow) {
                buf.setPixel(bx + chr.pixels[b], chr.pixels[b + 1], [chr.pixels[b + 3], 0, 0, 255]);
            }
        }
    }
    buf.show();
}
function unblendBlackBackground(img, r, g, b) {
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    for (var i = 0; i < img.data.length; i += 4) {
        var col = decomposeblack(img.data[i], img.data[i + 1], img.data[i + 2], r, g, b);
        rimg.data[i + 0] = col[0] * 255;
        rimg.data[i + 1] = rimg.data[i + 0];
        rimg.data[i + 2] = rimg.data[i + 0];
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * unblends a imagebuffer into match strength with given color
 * the bgimg argument should contain a second image with pixel occluded by the font visible.
 * @param img
 * @param shadow detect black as second color
 * @param bgimg optional second image to
 */
function unblendKnownBg(img, bgimg, shadow, r, g, b) {
    if (bgimg && (img.width != bgimg.width || img.height != bgimg.height)) {
        throw "bgimg size doesn't match";
    }
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    var totalerror = 0;
    for (var i = 0; i < img.data.length; i += 4) {
        var col = decompose2col(img.data[i], img.data[i + 1], img.data[i + 2], r, g, b, bgimg.data[i + 0], bgimg.data[i + 1], bgimg.data[i + 2]);
        if (shadow) {
            if (col[2] > 0.01) {
                console.log("high error component: " + (col[2] * 100).toFixed(1) + "%");
            }
            totalerror += col[2];
            var m = 1 - col[1] - Math.abs(col[2]); //main color+black=100%-bg-error
            rimg.data[i + 0] = m * 255;
            rimg.data[i + 1] = col[0] / m * 255;
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        else {
            rimg.data[i + 0] = col[0] * 255;
            rimg.data[i + 1] = rimg.data[i + 0];
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * Unblends a font image that is already conpletely isolated to the raw image used ingame. This is the easiest mode for pixel fonts where alpha is 0 or 255, or for extracted font files.
 * @param img
 * @param r
 * @param g
 * @param b
 * @param shadow whether the font has a black shadow
 */
function unblendTrans(img, shadow, r, g, b) {
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    var pxlum = r + g + b;
    for (var i = 0; i < img.data.length; i += 4) {
        if (shadow) {
            var lum = img.data[i + 0] + img.data[i + 1] + img.data[i + 2];
            rimg.data[i + 0] = img.data[i + 3];
            rimg.data[i + 1] = lum / pxlum * 255;
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        else {
            rimg.data[i + 0] = img.data[i + 3];
            rimg.data[i + 1] = rimg.data[i + 0];
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * Determised wether color [rgb]m can be a result of a blend with color [rgb]1 that is p (0-1) of the mix
 * It returns the number that the second color has to lie outside of the possible color ranges
 * @param rm resulting color
 * @param r1 first color of the mix (the other color is unknown)
 * @param p the portion of the [rgb]1 in the mix (0-1)
 */
function canblend(rm, gm, bm, r1, g1, b1, p) {
    var m = Math.min(50, p / (1 - p));
    var r = rm + (rm - r1) * m;
    var g = gm + (gm - g1) * m;
    var b = bm + (bm - b1) * m;
    return Math.max(-r, -g, -b, r - 255, g - 255, b - 255);
}
/**
 * decomposes a color in 2 given component colors and returns the amount of each color present
 * also return a third (noise) component which is the the amount leftover orthagonal from the 2 given colors
 */
function decompose2col(rp, gp, bp, r1, g1, b1, r2, g2, b2) {
    //get the normal of the error (cross-product of both colors)
    var r3 = g1 * b2 - g2 * b1;
    var g3 = b1 * r2 - b2 * r1;
    var b3 = r1 * g2 - r2 * g1;
    //normalize to length 255
    var norm = 255 / Math.sqrt(r3 * r3 + g3 * g3 + b3 * b3);
    r3 *= norm;
    g3 *= norm;
    b3 *= norm;
    return decompose3col(rp, gp, bp, r1, g1, b1, r2, g2, b2, r3, g3, b3);
}
/**
 * decomposes a pixel in a given color component and black and returns what proportion of the second color it contains
 * this is not as formal as decompose 2/3 and only give a "good enough" number
 */
function decomposeblack(rp, gp, bp, r1, g1, b1) {
    var dr = Math.abs(rp - r1);
    var dg = Math.abs(gp - g1);
    var db = Math.abs(bp - b1);
    var maxdif = Math.max(dr, dg, db);
    return [1 - maxdif / 255];
}
/**
 * decomposes a color in 3 given component colors and returns the amount of each color present
 */
function decompose3col(rp, gp, bp, r1, g1, b1, r2, g2, b2, r3, g3, b3) {
    //P=x*C1+y*C2+z*C3
    //assemble as matrix 
    //M*w=p
    //get inverse of M
    //dirty written out version of cramer's rule
    var A = g2 * b3 - b2 * g3;
    var B = g3 * b1 - b3 * g1;
    var C = g1 * b2 - b1 * g2;
    var D = b2 * r3 - r2 * b3;
    var E = b3 * r1 - r3 * b1;
    var F = b1 * r2 - r1 * b2;
    var G = r2 * g3 - g2 * r3;
    var H = r3 * g1 - g3 * r1;
    var I = r1 * g2 - g1 * r2;
    var det = r1 * A + g1 * D + b1 * G;
    //M^-1*p=w
    var x = (A * rp + D * gp + G * bp) / det;
    var y = (B * rp + E * gp + H * bp) / det;
    var z = (C * rp + F * gp + I * bp) / det;
    return [x, y, z];
}
/**
 * brute force to the exact position of the text
 */
function findChar(buffer, font, col, x, y, w, h) {
    if (x < 0) {
        return null;
    }
    if (y - font.basey < 0) {
        return null;
    }
    if (x + w + font.width > buffer.width) {
        return null;
    }
    if (y + h - font.basey + font.height > buffer.height) {
        return null;
    }
    var best = 1000; //TODO finetune score constants
    var bestchar = null;
    for (var cx = x; cx < x + w; cx++) {
        for (var cy = y; cy < y + h; cy++) {
            var chr = readChar(buffer, font, col, cx, cy, false, false);
            if (chr != null && chr.sizescore < best) {
                best = chr.sizescore;
                bestchar = chr;
            }
        }
    }
    return bestchar;
}
/**
 * reads text with unknown exact coord or color. The given coord should be inside the text
 * color selection not implemented yet
 */
function findReadLine(buffer, font, cols, x, y, w = -1, h = -1) {
    if (w == -1) {
        w = font.width + font.spacewidth;
        x -= Math.ceil(w / 2);
    }
    if (h == -1) {
        h = 7;
        y -= 1;
    }
    var chr = null;
    if (cols.length > 1) {
        //TODO use getChatColor() instead for non-mono?
        var sorted = GetChatColorMono(buffer, new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y - font.basey, w, h), cols);
        //loop until we have a match (max 2 cols)
        for (var a = 0; a < 2 && a < sorted.length && chr == null; a++) {
            chr = findChar(buffer, font, sorted[a].col, x, y, w, h);
        }
    }
    else {
        chr = findChar(buffer, font, cols[0], x, y, w, h);
    }
    if (chr == null) {
        return { debugArea: { x, y, w, h }, text: "", fragments: [] };
    }
    return readLine(buffer, font, cols, chr.x, chr.y, true, true);
}
function GetChatColorMono(buf, rect, colors) {
    var colormap = colors.map(c => ({ col: c, score: 0 }));
    if (rect.x < 0 || rect.y < 0 || rect.x + rect.width > buf.width || rect.y + rect.height > buf.height) {
        return colormap;
    }
    var data = buf.data;
    var maxd = 50;
    for (var colobj of colormap) {
        var score = 0;
        var col = colobj.col;
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            for (var x = rect.x; x < rect.x + rect.width; x++) {
                var i = x * 4 + y * 4 * buf.width;
                var d = Math.abs(data[i] - col[0]) + Math.abs(data[i + 1] - col[1]) + Math.abs(data[i + 2] - col[2]);
                if (d < maxd) {
                    score += maxd - d;
                }
            }
        }
        colobj.score = score;
    }
    return colormap.sort((a, b) => b.score - a.score);
}
function unblend(r, g, b, R, G, B) {
    var m = Math.sqrt(r * r + g * g + b * b);
    var n = Math.sqrt(R * R + G * G + B * B);
    var x = (r * R + g * G + b * B) / n;
    var y = Math.sqrt(Math.max(0, m * m - x * x));
    var r1 = Math.max(0, (63.75 - y) * 4);
    var r2 = x / n * 255;
    if (r2 > 255) //brighter than refcol
     {
        r1 = Math.max(0, r1 - r2 + 255);
        r2 = 255;
    }
    return [r1, r2];
}
function getChatColor(buf, rect, colors) {
    var bestscore = -1.0;
    var best = null;
    var b2 = 0.0;
    var data = buf.data;
    for (let col of colors) {
        var score = 0.0;
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            for (var x = rect.x; x < rect.x + rect.width; x++) {
                if (x < 0 || x + 1 >= buf.width) {
                    continue;
                }
                if (y < 0 || y + 1 >= buf.width) {
                    continue;
                }
                let i1 = buf.pixelOffset(x, y);
                let i2 = buf.pixelOffset(x + 1, y + 1);
                var pixel1 = unblend(data[i1 + 0], data[i1 + 1], data[i1 + 2], col[0], col[1], col[2]);
                var pixel2 = unblend(data[i2 + 0], data[i2 + 1], data[i2 + 2], col[0], col[1], col[2]);
                //TODO this is from c# can simplify a bit
                var s = (pixel1[0] / 255 * pixel1[1] / 255) * (pixel2[0] / 255 * (255.0 - pixel2[1]) / 255);
                score += s;
            }
        }
        if (score > bestscore) {
            b2 = bestscore;
            bestscore = score;
            best = col;
        }
        else if (score > b2) {
            b2 = score;
        }
    }
    //Console.WriteLine("color: " + bestcol + " - " + (bestscore - b2));
    //bestscore /= rect.width * rect.height;
    return best;
}
/**
 * reads a line of text with exactly known position and color. y should be the y coord of the text base line, x should be the first pixel of a new character
 */
function readLine(buffer, font, colors, x, y, forward, backward = false) {
    if (typeof colors[0] != "number" && colors.length == 1) {
        colors = colors[0];
    }
    var multicol = typeof colors[0] != "number";
    var allcolors = multicol ? colors : [colors];
    var detectcolor = function (sx, sy, backward) {
        var w = Math.floor(font.width * 1.5);
        if (backward) {
            sx -= w;
        }
        sy -= font.basey;
        return getChatColor(buffer, { x: sx, y: sy, width: w, height: font.height }, allcolors);
    };
    var fragments = [];
    var x1 = x;
    var x2 = x;
    var maxspaces = (typeof font.maxspaces == "number" ? font.maxspaces : 1);
    let fragtext = "";
    let fraghadprimary = false;
    var lastcol = null;
    let addfrag = (forward) => {
        if (!fragtext) {
            return;
        }
        let frag = {
            text: fragtext,
            color: lastcol,
            index: 0,
            xstart: x + (forward ? fragstartdx : fragenddx),
            xend: x + (forward ? fragenddx : fragstartdx)
        };
        if (forward) {
            fragments.push(frag);
        }
        else {
            fragments.unshift(frag);
        }
        fragtext = "";
        fragstartdx = dx;
        fraghadprimary = false;
    };
    for (var dirforward of [true, false]) {
        //init vars
        if (dirforward && !forward) {
            continue;
        }
        if (!dirforward && !backward) {
            continue;
        }
        var dx = 0;
        var fragstartdx = dx;
        var fragenddx = dx;
        var triedspaces = 0;
        var triedrecol = false;
        var col = multicol ? null : colors;
        while (true) {
            col = col || detectcolor(x + dx, y, !dirforward);
            var chr = (col ? readChar(buffer, font, col, x + dx, y, !dirforward, true) : null);
            if (col == null || chr == null) {
                if (triedspaces < maxspaces) {
                    dx += (dirforward ? 1 : -1) * font.spacewidth;
                    triedspaces++;
                    continue;
                }
                if (multicol && !triedrecol && fraghadprimary) {
                    dx -= (dirforward ? 1 : -1) * triedspaces * font.spacewidth;
                    triedspaces = 0;
                    col = null;
                    triedrecol = true;
                    continue;
                }
                if (dirforward) {
                    x2 = x + dx - font.spacewidth;
                }
                else {
                    x1 = x + dx + font.spacewidth;
                }
                break;
            }
            else {
                if (lastcol && (col[0] != lastcol[0] || col[1] != lastcol[1] || col[2] != lastcol[2])) {
                    addfrag(dirforward);
                }
                var spaces = "";
                for (var a = 0; a < triedspaces; a++) {
                    spaces += " ";
                }
                if (dirforward) {
                    fragtext += spaces + chr.chr;
                }
                else {
                    fragtext = chr.chr + spaces + fragtext;
                }
                if (!chr.basechar.secondary) {
                    fraghadprimary = true;
                }
                triedspaces = 0;
                triedrecol = false;
                dx += (dirforward ? 1 : -1) * chr.basechar.width;
                fragenddx = dx;
                lastcol = col;
            }
        }
        if (lastcol && fraghadprimary) {
            addfrag(dirforward);
        }
    }
    fragments.forEach((f, i) => f.index = i);
    return {
        debugArea: { x: x1, y: y - 9, w: x2 - x1, h: 10 },
        text: fragments.map(f => f.text).join(""),
        fragments
    };
}
/**
 * Reads a line of text that uses a smallcaps font, these fonts can have duplicate chars that only have a different amount of
 * empty space after the char before the next char starts.
 * The coordinates should be near the end of the string, or a rectangle with high 1 containing all points where the string can end.
 */
function readSmallCapsBackwards(buffer, font, cols, x, y, w = -1, h = -1) {
    if (w == -1) {
        w = font.width + font.spacewidth;
        x -= Math.ceil(w / 2);
    }
    if (h == -1) {
        h = 7;
        y -= 1;
    }
    var matchedchar = null;
    var sorted = (cols.length == 1 ? [{ col: cols[0], score: 1 }] : GetChatColorMono(buffer, new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y - font.basey, w, h), cols));
    //loop until we have a match (max 2 cols)
    for (var a = 0; a < 2 && a < sorted.length && matchedchar == null; a++) {
        for (var cx = x + w - 1; cx >= x; cx--) {
            var best = 1000; //TODO finetune score constants
            var bestchar = null;
            for (var cy = y; cy < y + h; cy++) {
                var chr = readChar(buffer, font, sorted[a].col, cx, cy, true, false);
                if (chr != null && chr.sizescore < best) {
                    best = chr.sizescore;
                    bestchar = chr;
                }
            }
            if (bestchar) {
                matchedchar = bestchar;
                break;
            }
        }
    }
    if (matchedchar == null) {
        return { text: "", debugArea: { x, y, w, h } };
    }
    return readLine(buffer, font, cols, matchedchar.x, matchedchar.y, false, true);
}
/**
 * Reads a single character at the exact given location
 * @param x exact x location of the start of the character domain (includes part of the spacing between characters)
 * @param y exact y location of the baseline pixel of the character
 * @param backwards read in backwards direction, the x location should be the first pixel after the character domain in that case
 */
function readChar(buffer, font, col, x, y, backwards, allowSecondary) {
    y -= font.basey;
    var shiftx = 0;
    var shifty = font.basey;
    var shadow = font.shadow;
    var debugobj = null;
    var debugimg = null;
    if (debug.trackread) {
        var name = x + ";" + y + " " + JSON.stringify(col);
        if (!debugout[name]) {
            debugout[name] = [];
        }
        debugobj = debugout[name];
    }
    //===== make sure the full domain is inside the bitmap/buffer ======
    if (y < 0 || y + font.height >= buffer.height) {
        return null;
    }
    if (!backwards) {
        if (x < 0 || x + font.width > buffer.width) {
            return null;
        }
    }
    else {
        if (x - font.width < 0 || x > buffer.width) {
            return null;
        }
    }
    //====== start reading the char ======
    var scores = [];
    for (var chr = 0; chr < font.chars.length; chr++) {
        var chrobj = font.chars[chr];
        if (chrobj.secondary && !allowSecondary) {
            continue;
        }
        scores[chr] = { score: 0, sizescore: 0, chr: chrobj };
        var chrx = (backwards ? x - chrobj.width : x);
        if (debug.trackread) {
            debugimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(font.width, font.height);
        }
        for (var a = 0; a < chrobj.pixels.length;) {
            var i = (chrx + chrobj.pixels[a]) * 4 + (y + chrobj.pixels[a + 1]) * buffer.width * 4;
            var penalty = 0;
            if (!shadow) {
                penalty = canblend(buffer.data[i], buffer.data[i + 1], buffer.data[i + 2], col[0], col[1], col[2], chrobj.pixels[a + 2] / 255);
                a += 3;
            }
            else {
                var lum = chrobj.pixels[a + 3] / 255;
                penalty = canblend(buffer.data[i], buffer.data[i + 1], buffer.data[i + 2], col[0] * lum, col[1] * lum, col[2] * lum, chrobj.pixels[a + 2] / 255);
                a += 4;
            }
            scores[chr].score += Math.max(0, penalty);
            //TODO add compiler flag to this to remove it for performance
            if (debugimg) {
                debugimg.setPixel(chrobj.pixels[a], chrobj.pixels[a + 1], [penalty, penalty, penalty, 255]);
            }
        }
        scores[chr].sizescore = scores[chr].score - chrobj.bonus;
        if (debugobj) {
            debugobj.push({ chr: chrobj.chr, score: scores[chr].sizescore, rawscore: scores[chr].score, img: debugimg });
        }
    }
    scores.sort((a, b) => a.sizescore - b.sizescore);
    if (debug.printcharscores) {
        scores.slice(0, 5).forEach(q => console.log(q.chr.chr, q.score.toFixed(3), q.sizescore.toFixed(3)));
    }
    var winchr = scores[0];
    if (!winchr || winchr.score > 400) {
        return null;
    }
    return { chr: winchr.chr.chr, basechar: winchr.chr, x: x + shiftx, y: y + shifty, score: winchr.score, sizescore: winchr.sizescore };
}
/**
 * Generates a font json description to use in reader functions
 * @param unblended A source image with all characters lined up. The image should be unblended into components using the unblend functions
 * The lowest pixel line of this image is used to mark the location and size of the charecters if the red component is 255 it means there is a character on that pixel column
 * @param chars A string containing all the characters of the image in the same order
 * @param seconds A string with characters that are considered unlikely and should only be detected if no other character is possible.
 * For example the period (.) character matches positive inside many other characters and should be marked as secondary
 * @param bonusses An object that contains bonus scores for certain difficult characters to make the more likely to be red.
 * @param basey The y position of the baseline pixel of the font
 * @param spacewidth the number of pixels a space takes
 * @param treshold minimal color match proportion (0-1) before a pixel is used for the font
 * @param shadow whether this font also uses the black shadow some fonts have. The "unblended" image should be unblended correspondingly
 * @returns a javascript object describing the font which is used as input for the different read functions
 */
function generatefont(unblended, chars, seconds, bonusses, basey, spacewidth, treshold, shadow) {
    //settings vars
    treshold *= 255;
    //initial vars
    var miny = unblended.height - 1;
    var maxy = 0;
    var font = { chars: [], width: 0, spacewidth: spacewidth, shadow: shadow, height: 0, basey: 0 };
    var ds = false;
    var chardata = [];
    //index all chars
    for (var dx = 0; dx < unblended.width; dx++) {
        var i = 4 * dx + 4 * unblended.width * (unblended.height - 1);
        if (unblended.data[i] == 255 && unblended.data[i + 3] == 255) {
            if (ds === false) {
                ds = dx;
            }
        }
        else {
            if (ds !== false) {
                //char found, start detection
                var de = dx;
                var char = chars[chardata.length];
                var chr = {
                    ds: ds,
                    de: de,
                    width: de - ds,
                    chr: char,
                    bonus: (bonusses && bonusses[char]) || 0,
                    secondary: seconds.indexOf(chars[chardata.length]) != -1,
                    pixels: []
                };
                chardata.push(chr);
                font.width = Math.max(font.width, chr.width);
                for (x = 0; x < de - ds; x++) {
                    for (y = 0; y < unblended.height - 1; y++) {
                        var i = (x + ds) * 4 + y * unblended.width * 4;
                        if (unblended.data[i] >= treshold) {
                            miny = Math.min(miny, y);
                            maxy = Math.max(maxy, y);
                        }
                    }
                }
                ds = false;
            }
        }
    }
    font.height = maxy + 1 - miny;
    font.basey = basey - miny;
    //detect all pixels
    for (var a in chardata) {
        var chr = chardata[a];
        for (var x = 0; x < chr.width; x++) {
            for (var y = 0; y < maxy + 1 - miny; y++) {
                var i = (x + chr.ds) * 4 + (y + miny) * unblended.width * 4;
                if (unblended.data[i] >= treshold) {
                    chr.pixels.push(x, y);
                    chr.pixels.push(unblended.data[i]);
                    if (shadow) {
                        chr.pixels.push(unblended.data[i + 1]);
                    }
                    chr.bonus += 5;
                }
            }
        }
        //prevent js from doing the thing with unnecessary output precision
        chr.bonus = +chr.bonus.toFixed(3);
        font.chars.push({ width: chr.width, bonus: chr.bonus, chr: chr.chr, pixels: chr.pixels, secondary: chr.secondary });
    }
    return font;
}


/***/ }),

/***/ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js":
/*!**************************************************************!*\
  !*** ../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js ***!
  \**************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0
}("undefined"!=typeof self?self:this,(function(){return s=[s=>{s.exports={chars:[{width:3,bonus:55,chr:"!",pixels:[0,4,221,0,5,170,0,6,153,0,12,153,1,3,221,1,4,255,1,5,221,1,6,204,1,7,170,1,8,153,1,12,204],secondary:!1},{width:6,bonus:30,chr:'"',
pixels:[1,2,221,1,3,255,1,4,170,3,2,221,3,3,255,3,4,170],secondary:!0},{width:9,bonus:160,chr:"#",
pixels:[1,5,221,1,8,255,2,5,255,2,7,153,2,8,255,2,9,204,2,10,238,2,11,238,3,2,187,3,3,238,3,4,255,3,5,255,3,6,170,3,7,170,3,8,255,4,5,255,4,8,255,5,4,153,5,5,255,5,6,170,5,7,204,5,8,255,5,9,238,5,10,204,5,11,170,6,2,238,6,3,204,6,4,204,6,5,255,6,8,255,7,5,255,7,8,153],
secondary:!1},{width:7,bonus:145,chr:"$",
pixels:[1,3,204,1,4,255,1,5,187,1,10,153,1,11,204,2,2,187,2,5,221,2,6,255,2,10,170,2,11,255,2,12,221,3,1,153,3,2,238,3,3,221,3,4,238,3,5,204,3,6,238,3,7,255,3,8,153,3,11,221,4,2,221,4,7,255,4,8,221,4,10,187,5,2,170,5,3,187,5,8,221,5,9,255,5,10,153],
secondary:!1},{width:12,bonus:175,chr:"%",
pixels:[1,4,255,1,5,255,1,6,255,2,3,153,2,7,204,3,3,170,3,7,204,3,12,187,4,3,187,4,4,255,4,5,255,4,6,255,4,10,238,4,11,204,5,7,170,5,8,238,5,9,153,6,5,204,6,6,221,6,9,187,6,10,255,6,11,204,7,3,238,7,4,170,7,8,187,7,11,153,7,12,204,8,8,187,8,12,187,9,8,204,9,9,153,9,12,187,10,9,187,10,10,255,10,11,187],
secondary:!1},{width:12,bonus:175,chr:"&",
pixels:[0,9,221,0,10,255,0,11,153,1,5,153,1,8,238,1,9,187,1,10,238,1,11,255,2,4,255,2,5,255,2,6,255,2,7,255,2,11,170,2,12,221,3,3,204,3,7,255,3,8,221,3,12,255,4,3,221,4,8,238,4,9,221,4,12,238,5,3,238,5,9,238,5,10,187,5,12,170,6,4,153,6,10,255,6,11,238,7,10,221,7,11,255,8,8,238,8,9,170,8,12,238,9,12,221],
secondary:!1},{width:3,bonus:15,chr:"'",pixels:[0,2,153,1,2,187,1,3,204],secondary:!0},{width:5,bonus:60,chr:"(",pixels:[0,6,204,0,7,255,0,8,238,0,9,187,1,4,238,1,5,204,1,6,153,1,9,170,1,10,238,1,11,204,2,3,153,2,12,187],secondary:!1},{width:5,
bonus:50,chr:")",pixels:[1,3,204,1,4,153,1,11,221,2,4,153,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,204],secondary:!1},{width:5,bonus:40,chr:"*",pixels:[0,3,170,0,5,153,1,2,187,1,3,187,1,4,221,2,4,170,2,5,221,3,3,153],secondary:!0},{width:8,
bonus:65,chr:"+",pixels:[0,8,153,1,8,255,2,8,255,3,5,153,3,6,255,3,7,255,3,8,255,3,9,255,3,10,255,3,11,153,4,8,255,5,8,255,6,8,187],secondary:!1},{width:3,bonus:10,chr:",",pixels:[1,10,187,1,11,221],secondary:!0},{width:6,bonus:20,chr:"-",
pixels:[0,9,204,1,9,255,2,9,255,3,9,204],secondary:!0},{width:3,bonus:10,chr:".",pixels:[1,11,170,1,12,204],secondary:!0},{width:8,bonus:50,chr:"/",pixels:[0,11,187,1,10,238,2,8,221,2,9,153,3,6,170,3,7,204,4,5,238,5,3,221,5,4,170,6,2,153],
secondary:!1},{width:8,bonus:145,chr:"0",
pixels:[0,7,153,0,8,187,0,9,170,1,5,221,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,238,2,4,187,2,11,170,2,12,204,3,4,187,3,12,204,4,4,221,4,12,187,5,5,255,5,6,255,5,7,204,5,8,187,5,9,187,5,10,238,5,11,238,6,6,187,6,7,238,6,8,255,6,9,221,6,10,170],
secondary:!1},{width:7,bonus:95,chr:"1",pixels:[1,5,153,2,5,255,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,3,5,255,3,6,255,3,7,255,3,8,255,3,9,255,3,10,255,3,11,255,3,12,255,4,12,153],secondary:!1},{width:9,bonus:115,chr:"2",
pixels:[1,4,170,1,5,204,1,12,255,2,4,204,2,11,221,2,12,255,3,4,204,3,10,204,3,12,255,4,4,221,4,9,238,4,12,255,5,4,153,5,5,255,5,6,255,5,7,255,5,8,255,5,12,255,6,5,153,6,6,221,6,7,170,6,11,187,6,12,204],secondary:!1},{width:7,bonus:105,chr:"3",
pixels:[0,11,187,0,12,187,1,4,204,1,12,238,2,4,221,2,12,221,3,4,238,3,7,187,3,8,221,3,12,204,4,4,170,4,5,255,4,6,255,4,7,153,4,8,238,4,9,255,4,10,221,4,11,255,5,5,170,5,9,221,5,10,238],secondary:!1},{width:9,bonus:120,chr:"4",
pixels:[1,9,204,1,10,255,2,8,204,2,10,255,3,7,187,3,10,255,4,5,170,4,6,238,4,7,153,4,8,153,4,9,170,4,10,255,4,11,153,4,12,221,5,4,204,5,5,255,5,6,255,5,7,255,5,8,255,5,9,255,5,10,255,5,11,255,5,12,255,6,10,255],secondary:!1},{width:7,bonus:110,
chr:"5",pixels:[0,11,170,0,12,221,1,4,255,1,5,204,1,6,221,1,7,187,1,12,238,2,4,255,2,7,255,2,12,204,3,4,255,3,7,255,3,8,204,3,12,170,4,4,255,4,8,255,4,9,255,4,10,255,4,11,238,5,4,153,5,9,187,5,10,153],secondary:!1},{width:7,bonus:105,chr:"6",
pixels:[0,8,187,0,9,255,0,10,238,1,6,170,1,7,255,1,8,221,1,9,187,1,10,204,1,11,255,2,5,187,2,6,153,2,12,221,3,8,221,3,12,204,4,8,204,4,9,238,4,10,187,4,11,221,5,9,221,5,10,255,5,11,153],secondary:!1},{width:7,bonus:90,chr:"7",
pixels:[0,4,204,0,5,187,1,4,255,1,12,170,2,4,255,2,10,221,2,11,255,2,12,187,3,4,255,3,8,221,3,9,238,3,10,153,4,4,255,4,5,153,4,6,204,4,7,187,5,4,255,5,5,187],secondary:!1},{width:8,bonus:170,chr:"8",
pixels:[0,10,153,1,5,204,1,6,238,1,9,238,1,10,255,1,11,255,2,4,170,2,5,153,2,6,170,2,7,255,2,8,204,2,12,221,3,4,187,3,7,204,3,8,187,3,12,204,4,4,204,4,7,153,4,8,255,4,12,204,5,4,204,5,5,187,5,6,187,5,7,187,5,8,187,5,9,255,5,10,170,5,11,204,5,12,153,6,5,238,6,6,204,6,9,187,6,10,255,6,11,170],
secondary:!1},{width:7,bonus:105,chr:"9",pixels:[0,6,238,0,7,238,0,8,153,1,5,204,1,6,153,1,7,187,1,8,255,2,4,204,2,9,187,3,4,221,3,11,187,4,5,255,4,6,238,4,7,187,4,8,187,4,9,238,4,10,255,5,6,221,5,7,255,5,8,238,5,9,170],secondary:!1},{width:3,
bonus:20,chr:":",pixels:[0,5,170,0,6,204,0,10,204,0,11,170],secondary:!0},{width:3,bonus:25,chr:";",pixels:[0,4,170,0,5,204,0,9,221,0,11,153,1,9,170],secondary:!0},{width:8,bonus:55,chr:"<",
pixels:[1,8,255,1,9,187,2,8,170,2,9,238,3,7,238,4,7,187,4,10,238,5,6,204,5,10,187,6,6,221,6,11,204],secondary:!1},{width:8,bonus:60,chr:"=",pixels:[1,7,255,1,9,255,2,7,255,2,9,255,3,7,255,3,9,255,4,7,255,4,9,255,5,7,255,5,9,255,6,7,255,6,9,255],
secondary:!1},{width:8,bonus:55,chr:">",pixels:[1,6,238,1,11,170,2,6,170,2,10,221,3,7,238,3,10,204,4,7,204,4,9,187,5,8,221,5,9,238,6,8,221],secondary:!1},{width:7,bonus:80,chr:"?",
pixels:[1,3,170,1,4,153,2,3,221,2,9,238,2,12,153,3,3,238,3,7,170,3,8,221,3,12,204,4,3,204,4,4,238,4,5,221,4,6,255,4,7,187,5,4,221,5,5,238],secondary:!1},{width:11,bonus:185,chr:"@",
pixels:[0,7,187,0,8,238,0,9,255,0,10,187,1,5,153,1,6,170,1,11,238,2,12,170,3,7,221,3,8,255,3,9,255,3,10,238,3,12,204,4,3,153,4,6,170,4,12,187,5,3,153,5,5,170,5,8,170,5,9,204,5,12,170,6,3,170,6,5,187,6,6,238,6,7,255,6,8,255,6,9,255,6,10,238,6,12,153,7,3,170,7,10,204,8,4,187,8,9,170,9,5,204,9,6,221,9,7,221,9,8,170],
secondary:!1},{width:10,bonus:125,chr:"A",
pixels:[1,12,238,2,9,187,2,10,238,2,11,170,2,12,187,3,7,221,3,8,204,3,9,238,4,5,238,4,6,238,4,9,221,5,5,187,5,6,255,5,7,255,5,8,187,5,9,238,6,7,153,6,8,255,6,9,255,6,10,238,6,11,153,7,10,221,7,11,255,7,12,255,8,12,221],secondary:!1},{width:8,
bonus:160,chr:"B",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,238,2,9,187,2,10,187,2,11,187,2,12,255,3,4,204,3,8,204,3,12,204,4,4,221,4,5,187,4,7,187,4,8,255,4,12,204,5,5,238,5,6,238,5,9,255,5,10,255,5,11,255,6,10,187],
secondary:!1},{width:9,bonus:120,chr:"C",
pixels:[0,7,221,0,8,255,0,9,221,1,5,221,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,204,2,5,187,2,11,255,3,4,204,3,12,204,4,4,221,4,12,238,5,4,221,5,12,221,6,4,221,6,12,238,7,4,187,7,5,204,7,11,187,7,12,170],secondary:!1},{width:11,bonus:200,
chr:"D",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,12,238,4,4,238,4,12,221,5,4,238,5,12,221,6,4,204,6,5,153,6,12,187,7,5,255,7,6,153,7,11,238,8,5,204,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,170,9,7,204,9,8,221,9,9,187],
secondary:!1},{width:7,bonus:135,chr:"E",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,8,221,3,12,238,4,4,238,4,8,221,4,12,221,5,4,187,5,8,153,5,12,238],secondary:!1},{
width:7,bonus:115,chr:"F",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,4,221,3,8,221,4,4,238,4,8,221,5,4,221],secondary:!1},{width:10,
bonus:150,chr:"G",
pixels:[0,7,204,0,8,255,0,9,255,0,10,187,1,5,187,1,6,255,1,7,238,1,8,221,1,9,238,1,10,255,1,11,221,2,5,204,2,11,238,3,4,204,3,12,204,4,4,221,4,12,238,5,4,238,5,12,221,6,4,221,6,9,238,6,10,187,6,11,187,6,12,221,7,4,170,7,5,221,7,9,255,7,10,255,7,11,255,7,12,153],
secondary:!1},{width:11,bonus:200,chr:"H",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,8,221,4,8,221,5,8,221,6,8,221,7,4,255,7,5,255,7,6,255,7,7,255,7,8,255,7,9,255,7,10,255,7,11,255,7,12,255,8,4,238,8,5,187,8,6,187,8,7,187,8,8,187,8,9,187,8,10,187,8,11,187,8,12,238],
secondary:!1},{width:5,bonus:90,chr:"I",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238],secondary:!1},{width:6,bonus:100,chr:"J",
pixels:[2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187,3,4,238,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,187],secondary:!1},{width:10,bonus:170,chr:"K",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,204,2,10,187,2,11,187,2,12,238,3,7,170,3,8,255,3,9,221,4,6,204,4,9,238,4,10,238,5,4,153,5,5,238,5,10,238,5,11,238,6,4,255,6,11,238,6,12,187,7,4,153,7,12,255,8,12,153],
secondary:!1},{width:8,bonus:105,chr:"L",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,12,238,4,12,221,5,12,255],secondary:!1},{
width:13,bonus:190,chr:"M",
pixels:[1,9,170,1,10,204,1,11,238,1,12,255,2,4,187,2,5,255,2,6,255,2,7,238,2,8,153,2,12,153,3,6,238,3,7,255,3,8,238,4,8,238,4,9,255,4,10,238,5,10,238,5,11,255,5,12,187,6,9,153,6,10,238,7,7,153,7,8,238,8,5,170,8,6,255,8,7,238,9,4,153,9,5,204,9,6,255,9,7,255,9,8,255,9,9,255,9,10,255,9,11,255,9,12,238,10,10,153,10,11,187,10,12,255],
secondary:!1},{width:11,bonus:170,chr:"N",
pixels:[0,12,170,1,4,187,1,5,255,1,6,255,1,7,238,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,5,204,2,6,255,2,12,153,3,6,221,3,7,255,4,7,238,4,8,255,5,8,238,5,9,255,6,9,238,6,10,238,7,4,153,7,10,255,7,11,238,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,255,8,12,204,9,4,153],
secondary:!1},{width:10,bonus:160,chr:"O",
pixels:[0,7,221,0,8,255,0,9,221,1,5,204,1,6,255,1,7,221,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,3,4,221,3,12,221,4,4,221,4,12,221,5,4,238,5,12,204,6,4,153,6,5,238,6,11,170,7,5,238,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,187,8,6,153,8,7,238,8,8,255,8,9,204],
secondary:!1},{width:8,bonus:130,chr:"P",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,4,4,238,5,4,170,5,5,255,5,6,255,5,7,255,5,8,204,6,6,187],secondary:!1},{width:10,
bonus:200,chr:"Q",
pixels:[0,7,221,0,8,255,0,9,221,1,5,187,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,2,12,153,3,4,221,3,12,221,4,4,221,4,12,238,5,4,238,5,12,204,6,4,153,6,5,238,6,11,153,6,12,238,7,5,221,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,170,7,12,204,7,13,221,8,6,153,8,7,238,8,8,255,8,9,221,8,13,255,8,14,170,9,13,170,9,14,255],
secondary:!1},{width:10,bonus:175,chr:"R",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,255,2,10,187,2,11,187,2,12,238,3,4,221,3,9,221,4,4,238,4,9,255,4,10,170,5,4,153,5,5,255,5,6,255,5,7,255,5,8,187,5,10,255,5,11,187,6,6,187,6,11,238,6,12,170,7,12,255,8,12,153],
secondary:!1},{width:7,bonus:95,chr:"S",pixels:[0,11,221,0,12,187,1,5,255,1,6,255,1,7,255,1,12,238,2,4,187,2,7,255,2,8,238,2,12,221,3,4,187,3,8,255,3,9,187,3,12,221,4,4,221,4,8,187,4,9,255,4,10,255,4,11,255],secondary:!1},{width:10,bonus:125,chr:"T",
pixels:[0,4,187,1,4,221,2,4,221,3,4,255,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,238,4,4,255,4,5,255,4,6,255,4,7,255,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,4,221,5,12,153,6,4,221,7,4,255],secondary:!1},{width:11,bonus:145,
chr:"U",
pixels:[1,4,238,1,5,187,1,6,187,1,7,187,1,8,187,1,9,187,1,10,153,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,3,11,170,3,12,204,4,12,238,5,12,221,6,12,204,7,4,187,7,11,221,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,238,8,10,204],
secondary:!1},{width:11,bonus:120,chr:"V",pixels:[1,4,204,2,4,255,2,5,255,2,6,204,3,4,187,3,5,170,3,6,255,3,7,255,3,8,238,3,9,153,4,8,204,4,9,255,4,10,255,4,11,187,5,10,238,5,11,255,6,8,204,6,9,221,7,4,170,7,5,153,7,6,238,7,7,187,8,4,255,8,5,170],
secondary:!1},{width:14,bonus:200,chr:"W",
pixels:[1,4,255,1,5,221,2,4,238,2,5,255,2,6,255,2,7,255,2,8,221,3,7,153,3,8,221,3,9,255,3,10,255,3,11,221,4,9,153,4,10,255,4,11,204,5,7,170,5,8,238,5,9,153,6,5,238,6,6,255,6,7,153,7,5,187,7,6,255,7,7,255,7,8,204,8,8,238,8,9,255,8,10,238,8,11,153,9,9,153,9,10,255,9,11,255,9,12,170,10,7,170,10,8,238,10,9,187,11,4,238,11,5,255,11,6,187,12,4,170],
secondary:!1},{width:10,bonus:135,chr:"X",
pixels:[1,4,221,1,12,238,2,4,255,2,5,255,2,10,170,2,11,221,2,12,187,3,4,153,3,5,187,3,6,255,3,7,238,3,9,221,4,7,255,4,8,255,4,9,204,5,6,204,5,7,153,5,9,255,5,10,255,5,11,153,6,4,221,6,5,238,6,10,204,6,11,255,6,12,255,7,4,204,7,12,238],secondary:!1},{
width:9,bonus:115,chr:"Y",pixels:[0,5,187,1,5,255,1,6,221,2,5,170,2,6,238,2,7,255,2,8,170,3,8,255,3,9,255,3,10,187,3,11,187,3,12,187,3,13,238,4,9,255,4,10,255,4,11,255,4,12,255,4,13,255,5,7,187,5,8,204,6,5,238,6,6,238,7,5,204],secondary:!1},{width:9,
bonus:145,chr:"Z",
pixels:[1,5,187,1,6,153,1,13,255,2,5,238,2,11,221,2,12,255,2,13,255,3,5,221,3,9,153,3,10,255,3,11,238,3,13,255,4,5,221,4,8,238,4,9,255,4,10,187,4,13,255,5,5,238,5,6,187,5,7,255,5,8,238,5,13,255,6,5,255,6,6,255,6,7,153,6,13,255,7,5,204,7,12,187,7,13,187],
secondary:!1},{width:5,bonus:70,chr:"[",pixels:[1,3,187,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,1,13,255,1,14,187,2,3,153,2,14,153],secondary:!1},{width:8,bonus:50,chr:"\\",
pixels:[0,4,170,1,5,204,1,6,170,2,7,238,3,8,170,3,9,204,4,10,221,4,11,153,5,12,238,6,13,187],secondary:!1},{width:4,bonus:70,chr:"]",
pixels:[1,3,170,1,14,170,2,3,187,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187],secondary:!1},{width:7,bonus:55,chr:"^",
pixels:[0,9,238,1,6,170,1,7,238,1,8,153,2,4,204,2,5,221,3,4,187,3,5,238,4,7,238,4,8,187,5,9,204],secondary:!1},{width:8,bonus:35,chr:"_",pixels:[0,12,221,1,12,221,2,12,221,3,12,221,4,12,221,5,12,221,6,12,153],secondary:!1},{width:10,bonus:125,
chr:"a",pixels:[1,12,238,2,9,187,2,10,238,2,11,170,2,12,187,3,7,221,3,8,204,3,9,238,4,5,238,4,6,238,4,9,221,5,5,187,5,6,255,5,7,255,5,8,187,5,9,238,6,7,153,6,8,255,6,9,255,6,10,238,6,11,153,7,10,221,7,11,255,7,12,255,8,12,221],secondary:!1},{width:8,
bonus:160,chr:"b",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,238,2,9,187,2,10,187,2,11,187,2,12,255,3,4,204,3,8,204,3,12,204,4,4,221,4,5,187,4,7,187,4,8,255,4,12,204,5,5,238,5,6,238,5,9,255,5,10,255,5,11,255,6,10,187],
secondary:!1},{width:9,bonus:120,chr:"c",
pixels:[0,7,221,0,8,255,0,9,221,1,5,221,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,204,2,5,187,2,11,255,3,4,204,3,12,204,4,4,221,4,12,238,5,4,221,5,12,221,6,4,221,6,12,238,7,4,187,7,5,204,7,11,187,7,12,170],secondary:!1},{width:11,bonus:200,
chr:"d",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,12,238,4,4,238,4,12,221,5,4,238,5,12,221,6,4,204,6,5,153,6,12,187,7,5,255,7,6,153,7,11,238,8,5,204,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,170,9,7,204,9,8,221,9,9,187],
secondary:!1},{width:7,bonus:135,chr:"e",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,8,221,3,12,238,4,4,238,4,8,221,4,12,221,5,4,187,5,8,153,5,12,238],secondary:!1},{
width:7,bonus:115,chr:"f",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,4,221,3,8,221,4,4,238,4,8,221,5,4,221],secondary:!1},{width:10,
bonus:150,chr:"g",
pixels:[0,7,204,0,8,255,0,9,255,0,10,187,1,5,187,1,6,255,1,7,238,1,8,221,1,9,238,1,10,255,1,11,221,2,5,204,2,11,238,3,4,204,3,12,204,4,4,221,4,12,238,5,4,238,5,12,221,6,4,221,6,9,238,6,10,187,6,11,187,6,12,221,7,4,170,7,5,221,7,9,255,7,10,255,7,11,255,7,12,153],
secondary:!1},{width:11,bonus:200,chr:"h",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,8,221,4,8,221,5,8,221,6,8,221,7,4,255,7,5,255,7,6,255,7,7,255,7,8,255,7,9,255,7,10,255,7,11,255,7,12,255,8,4,238,8,5,187,8,6,187,8,7,187,8,8,187,8,9,187,8,10,187,8,11,187,8,12,238],
secondary:!1},{width:5,bonus:90,chr:"i",pixels:[1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,1,13,255,2,5,238,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,187,2,13,238],secondary:!1},{width:6,bonus:100,chr:"j",
pixels:[2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187,3,4,238,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,187],secondary:!1},{width:10,bonus:170,chr:"k",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,204,2,10,187,2,11,187,2,12,238,3,7,170,3,8,255,3,9,221,4,6,204,4,9,238,4,10,238,5,4,153,5,5,238,5,10,238,5,11,238,6,4,255,6,11,238,6,12,187,7,4,153,7,12,255,8,12,153],
secondary:!1},{width:8,bonus:105,chr:"l",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,12,238,4,12,221,5,12,255],secondary:!1},{
width:13,bonus:190,chr:"m",
pixels:[1,9,170,1,10,204,1,11,238,1,12,255,2,4,187,2,5,255,2,6,255,2,7,238,2,8,153,2,12,153,3,6,238,3,7,255,3,8,238,4,8,238,4,9,255,4,10,238,5,10,238,5,11,255,5,12,187,6,9,153,6,10,238,7,7,153,7,8,238,8,5,170,8,6,255,8,7,238,9,4,153,9,5,204,9,6,255,9,7,255,9,8,255,9,9,255,9,10,255,9,11,255,9,12,238,10,10,153,10,11,187,10,12,255],
secondary:!1},{width:11,bonus:170,chr:"n",
pixels:[0,12,170,1,4,187,1,5,255,1,6,255,1,7,238,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,5,204,2,6,255,2,12,153,3,6,221,3,7,255,4,7,238,4,8,255,5,8,238,5,9,255,6,9,238,6,10,238,7,4,153,7,10,255,7,11,238,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,255,8,12,204,9,4,153],
secondary:!1},{width:10,bonus:160,chr:"o",
pixels:[0,7,221,0,8,255,0,9,221,1,5,204,1,6,255,1,7,221,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,3,4,221,3,12,221,4,4,221,4,12,221,5,4,238,5,12,204,6,4,153,6,5,238,6,11,170,7,5,238,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,187,8,6,153,8,7,238,8,8,255,8,9,204],
secondary:!1},{width:8,bonus:130,chr:"p",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,4,4,238,5,4,170,5,5,255,5,6,255,5,7,255,5,8,204,6,6,187],secondary:!1},{width:10,
bonus:200,chr:"q",
pixels:[0,7,221,0,8,255,0,9,221,1,5,187,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,2,12,153,3,4,221,3,12,221,4,4,221,4,12,238,5,4,238,5,12,204,6,4,153,6,5,238,6,11,153,6,12,238,7,5,221,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,170,7,12,204,7,13,221,8,6,153,8,7,238,8,8,255,8,9,221,8,13,255,8,14,170,9,13,170,9,14,255],
secondary:!1},{width:10,bonus:175,chr:"r",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,255,2,10,187,2,11,187,2,12,238,3,4,221,3,9,221,4,4,238,4,9,255,4,10,170,5,4,153,5,5,255,5,6,255,5,7,255,5,8,187,5,10,255,5,11,187,6,6,187,6,11,238,6,12,170,7,12,255,8,12,153],
secondary:!1},{width:7,bonus:95,chr:"s",pixels:[0,11,221,0,12,187,1,5,255,1,6,255,1,7,255,1,12,238,2,4,187,2,7,255,2,8,238,2,12,221,3,4,187,3,8,255,3,9,187,3,12,221,4,4,221,4,8,187,4,9,255,4,10,255,4,11,255],secondary:!1},{width:10,bonus:125,chr:"t",
pixels:[0,4,187,1,4,221,2,4,221,3,4,255,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,238,4,4,255,4,5,255,4,6,255,4,7,255,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,4,221,5,12,153,6,4,221,7,4,255],secondary:!1},{width:11,bonus:145,
chr:"u",
pixels:[1,4,238,1,5,187,1,6,187,1,7,187,1,8,187,1,9,187,1,10,153,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,3,11,170,3,12,204,4,12,238,5,12,221,6,12,204,7,4,187,7,11,221,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,238,8,10,204],
secondary:!1},{width:11,bonus:120,chr:"v",pixels:[1,4,204,2,4,255,2,5,255,2,6,204,3,4,187,3,5,170,3,6,255,3,7,255,3,8,238,3,9,153,4,8,204,4,9,255,4,10,255,4,11,187,5,10,238,5,11,255,6,8,204,6,9,221,7,4,170,7,5,153,7,6,238,7,7,187,8,4,255,8,5,170],
secondary:!1},{width:14,bonus:200,chr:"w",
pixels:[1,4,255,1,5,221,2,4,238,2,5,255,2,6,255,2,7,255,2,8,221,3,7,153,3,8,221,3,9,255,3,10,255,3,11,221,4,9,153,4,10,255,4,11,204,5,7,170,5,8,238,5,9,153,6,5,238,6,6,255,6,7,153,7,5,187,7,6,255,7,7,255,7,8,204,8,8,238,8,9,255,8,10,238,8,11,153,9,9,153,9,10,255,9,11,255,9,12,170,10,7,170,10,8,238,10,9,187,11,4,238,11,5,255,11,6,187,12,4,170],
secondary:!1},{width:10,bonus:135,chr:"x",
pixels:[1,4,221,1,12,238,2,4,255,2,5,255,2,10,170,2,11,221,2,12,187,3,4,153,3,5,187,3,6,255,3,7,238,3,9,221,4,7,255,4,8,255,4,9,204,5,6,204,5,7,153,5,9,255,5,10,255,5,11,153,6,4,221,6,5,238,6,10,204,6,11,255,6,12,255,7,4,204,7,12,238],secondary:!1},{
width:9,bonus:115,chr:"y",pixels:[0,4,187,1,4,255,1,5,221,2,4,170,2,5,238,2,6,255,2,7,170,3,7,255,3,8,255,3,9,187,3,10,187,3,11,187,3,12,238,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,6,187,5,7,204,6,4,238,6,5,238,7,4,204],secondary:!1},{width:9,
bonus:145,chr:"z",
pixels:[1,4,187,1,5,153,1,12,255,2,4,238,2,10,221,2,11,255,2,12,255,3,4,221,3,8,153,3,9,255,3,10,238,3,12,255,4,4,221,4,7,238,4,8,255,4,9,187,4,12,255,5,4,238,5,5,187,5,6,255,5,7,238,5,12,255,6,4,255,6,5,255,6,6,153,6,12,255,7,4,204,7,11,187,7,12,187],
secondary:!1},{width:5,bonus:55,chr:"{",pixels:[1,8,204,2,4,255,2,5,255,2,6,255,2,7,187,2,9,238,2,10,255,2,11,255,2,12,255,2,13,187,3,3,170],secondary:!1},{width:3,bonus:65,chr:"|",
pixels:[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255],secondary:!0},{width:6,bonus:55,chr:"}",
pixels:[1,3,170,2,4,255,2,5,255,2,6,255,2,7,187,2,9,238,2,10,255,2,11,255,2,12,255,2,13,187,3,8,204],secondary:!1},{width:7,bonus:35,chr:"~",pixels:[0,9,255,1,8,255,2,8,187,3,9,238,4,10,255,5,8,255,5,9,221],secondary:!1}],width:14,spacewidth:5,
shadow:!1,height:15,basey:12}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json":
/*!**********************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "appconfig.json");

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html":
/*!******************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "index.html");

/***/ }),

/***/ "./JSONs/ItemsAndImagesBarrows.json":
/*!******************************************!*\
  !*** ./JSONs/ItemsAndImagesBarrows.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = {"items":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAM0lEQVRYR+3QMQ0AAAjAMHgxwY1/gSCDp1OwNKtn47E0QIAAAQIECBAgQIAAAQIECHwLHNXiKkGmss7lAAAAAElFTkSuQmCC"},{"name":"Linza's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE/klEQVRIDbXBa2yTVRwH4N/pZe/238aqoH4xHmM07SsRDWqCiAQDhBAEuRoCaAioqARFEFFuQeQSRWEGIYENQ4QYISCXyYcBgYFjYgaj0gA7MErP7Dq7jdLLdt7e3lVYXNzCpmDS52HEdWQTI64jmxhxHdnEiOvIJkZcxz1SUhB3KinQgbgTvWPEddwLJcXqzxcvW/5FacnX56rK/IFQWfkF4k70ghHXcdeUFL+7jxevWzHljXfLfj7ivXzW0Yd2H6oGMsRd6AkjruOuKSnOny59Z95Xiz+aPnHaUsACYPKYZ/cePkfciZ4w4jrumpLi7KltYLh+zT1l5hYgg9sYkCHuQk8YcR13UFIQd+IOSgr36VIjkRCXa2bO3Q5kiLsAKFlL3IWeMOI6ulBSAJgxafCufVXEnehOSVFTWRKOtJ46eaJ424Fw2ELcCUBJQdyJnjDiOjopKVYtfDUUUcWlR4EMcRe6U1LUVJaEI61nfv2lotIN5BypqAWwatGrK9YfJO7EHRhxHR2UFKsXTQiFW731zQfK3UCGuAvdKSl+KJkTiRrX6oKey/68fLthpMqPXwSw4K2RG0qOAiDuRBeMuA5ASbFpzfRAIByKtm3dWQFkiLvQnZJiy9oZRf3yolEjHFUXPQF7nu381WBLY9jvbwbwwawRpr3w2637iTvRiRHXASgpNn42NRYzgi2xzTuOARbiTnSnpJgzf7KZMhOJpFIJm5VFI22hUKTB3+T3NQMoXjn1en1L2pa/edtB4k50YMR1AEqKL5dPaWtNhCPKW99UduwCkCHuQiclxZKPpzUb8bRpJuLJRDyhafZIuK3RH2xrS5hmuk4EABSvnFrfeCPeTltKDhJ3AmDEdQBKirWfTjRUMhRR9f6WK74WURdAF/PnTqYCLZ02bzGMRDJpxuOJfg52uuaPovz8YOimaeKSxwtg3ZKJ9f7QjRj27K8g7mTEdXRQUiyb/0rzjdZYa1yp+JVAKMeujRv+Qt++RftPHh/4+JMbNu1e8PYo0RB76IH7UrGbJ3679tJzj9Y1xu4vLLRYYLFa+/axfL+76ptV025GWq/5mnbuOwNkGHEdnZQUAOa8Pswjm812tKfM8SNfzM/P/amiolCzHz5UA8DhAOCABs2u2YFHHiwMI221wmqxjR06xGphzAwrI6mM1HmPrKy+yojr6ELJWoABGDJsAIBU2kQ77DnW/EKUl7kBOBwAHNCg2bXxL/evdnuRS3Z7Mo9yJgwfabVayiqrn364SMVTNR5vVbWXEddxByVrATZk2IB2wEyaKdNsiylxyedwOAoKNJsNNpt99pRBh4+5I21x5ORaLWkiLSfXCuTmaPZkqr2fFcLb6BEBRlxHL5QUo4b2D0QNj9t7ZN/C12avBxwFBZrNhls+eX/0nvLLDb4GwJZIGD5fM4CnnnmsyFFgsVmK2tt9DS0eEWDEdfROSYEOe3e89+b8XZqGvDwNgM/XPHbS0MjNaKChKW3CiLUGg2HAgk6jhvaPRY0qt5cR1/GvlKwF2PZNs2bP+w5djB432H/9TyMZTydSRjgRDEeBDP7BcFuGEdfxX5QUG9dM/XDpj0AGf2MjxgwK1jcZRryuLoDbMsRd6ELJWuIuRlzHXVBSABniLnRQUgx8/oma6qu4LQOAuAs9YcR1/C9KCiADgLgLvWPEdWQTI64jmxhxHdnEiOvIJkZcRzb9BVdUZ03lU2K9AAAAAElFTkSuQmCC"},{"name":"Linza's cuirass","base64":"data:image/png;base64,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"},{"name":"Linza's greaves","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAKAB8AKeY73/8AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQIFOw52EfgRAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAz1JREFUWMPFl8uP21QUhz/f6+vnOON2SiPQVBlpVIXuqqpdIHVRIUQXiEWXSPybiB0qIHWJBJRC1C6SdtKpp5MqkzixY/t6WOTFgBDxKKZ344d8zvl8fveco2t4rVvnvMcleM/LrGow7XX+8xuv1a4HYNrr8PDhPSxLkYynhNf3efMm4uhlhO3BbFqQJDFRr7MxRGUJrgYBpmli2w7KlHiuT7N5FdcysT2Tvb2QMCw3ytSlAI5PT8kmGSfRkFdHEaUu6Pf7JHFBGHhoDcNVxv7Y/h4oyzl1nmWk0QnvKPAdxWScANBo2DTtkIjRdjMw7XX4+qvPoLTpHw9o+DsEvoVj2bjSwQ8UlgVpLnFdu54y7PbOAEnjyh5xmpDnmlJrtFwnVGsNhaqrD5QLGTSj8YwcjQbkX9TMMk2S5/UA7O7uYlmC0bsB0jZJkgJ0wfHrUyZpQpalWJbEdd16AIQQnI1jwnAH35LM0oRMF+xdC3FMBZhIKbFtsx6AsiwRCG7caCKlJGwEuJaDXO4BOZdDrl5sEcBrtfnm2++QAkwpUAKElAgpkdJcxgcpefbsOXCO1/p4+43oZdSfA+047HgWSi0gzDlEt/uq/mk4GJdIU2EqhZISCfiNALAr+zIvA+BYNvnMh3TedFXQwBWCsuT/ATCM+VV5DShLsjQBJAKwKyahugSFAiHAEGsHQiDEfD6sG5ax/Vnw6YPb5HmOWDpfBBaLHnEyigA4OGhuPA0rZSArFDcPr2MYi6BLF0IihODDK9c4PPioPgk8z+VsOEYIccHD6knCcDzF81z29z/YSIZKAHE8wPHttaWxEEMIhBDorMCyTKQ0OTp6C5xvtxM+efIbWsPT33/G9725sSEWLALHtxFIdFbUV4aOYzEYjPn+xx+IouHqH+7cuUkJKAVZXNRXhpYlV8MnDNfv81xDrplMZrx48bqeWeC12jx+/AtB4OG6NsOhWOusJEmWklVI/6VnwSzXJMnsAtivPz0HTNI0rx8gHk0W+v8NbJYQx7P6AKa9Do++uM+twwM+f3CPg0WtT3sdHn15n273LZ/cbVcCMKqejv954lmaG4t7Y+MNeKky9FrtCz1+00D/tv4EowIpZEVgvzQAAAAASUVORK5CYII="},{"name":"Linza's hammer","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAKAB8AKeY73/8AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQIGBAW7W7X8AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAolJREFUWMPdl99Lk1EYgJ/tmxt+aiKhc0Yu6EK7iYqiiAgRTWQqiWVRFijY/9FV/0ZgCMbMSHaRgUVFJYYYQnlCYkensbaxNvtOm7atC+dKyh/pNwa994fnOe/78r7nWHT3kQwFDCsFjrwKKCkKJ6CkoLvn+rYSec2ArpdlZWYLI+DQHXReuQxYNs1EXgVWkgkMpWhoOEPjhea/Stjy2XSryR9YVgysVitGLMSJ06eYmphEd9eZL6Ck4Oz5c7hctQQW/JRXVGAYBjablVTKiqZpJBNpnM5KglLkJEwtQVWli1g8glLfCIcXCQXnoaictLUYlUjh0IupPXR4Q2OaKvBweAgAp8tFaVkplVUHWI7HGB97zPTUNM6aaqoP1tDT2wdYzBVYS6mV/XoSAHtRCSWl+xAfZ7OYDI/uexn1PuD7aoImTytKCnN7ACAU+con/yLHTjYQj0YJBgK5e+ruOpScZfjeYPZUxhwBJQW3envQtDgTbz/g94c4ejxFOBL+S6bqcz2gu+ux7HUbKinov3kNixbj9cQMM+/ngUy2xulc+tfBps4BJQV9N66SIcrTF++Ym1vaAFsry+bwPQkoKejuaiNNlLHxKQKB0B+w3weOqQJKCi51tuFwJLk78CTXUFvd1DQBJQVdFz3Y7YqBwfFsvdkV/J8FlBR0drRisxkMDj3b9a13JaCkoKO9BU0zGPI+NwW+YwElBe2eZjQMvCMvTYPvSEBJgae1CdLLjPjemArfUmB9tLa2NJJOxfCNTZoO31RAScGd2/0sBL6wsBRk1Jcf+Jbb0G4v4nMwwqjvVWH+BUZCEQpHt53le41Nl9Gv913+4FtmYG2O5xe+7Yso3/D//3O6k/gJR2wT6Tq0juwAAAAASUVORK5CYII="},{"name":"Linza's shield","base64":"data:image/png;base64,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"},{"name":"Ahrim's hood","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADZklEQVRIDbXBQWvjRhiA4XcUbb3+8MEHQ6As+YKxkcaH0kv//78oEb2swARE5zCsHdnTGaHKXty1SdyND3keI2r5SEbUcru2rgDRgp8xopZbtHUFfPnyK7BeP3MiWvAWI2p5n7augMfHh0TKyROJQSISiTTN34BowSUjanmHtq4eFw8kEolBgpyDxCASiYQQvP8GiBacGFHLz7R19bh4AHab3Xg8TiQgJ08kBolIJBIIBLz3kIkWHBlRy/9q62qxmCfSbr8b52MgkfguMYhEInyCSAjBew8Z9KIlYEQt17V1tSjmdGz2G47G+RhIJAaJQSQyiIQQAO89B5loARhRyxVtXRXFsqOjY7PfcDT+PCaRSAwS30Vi2IbRaBRCALz3kEEvWhpRyxVtXS2KOYOOzX7DyTgfJxKDxHeRGLZhNBqFEADvPWTQi5ZG1PKWtq6KYvny8rLebhf3s83LhpNxPk4kEjFGIBA4GjEKBN94yKAXLQEjanlLW1eLxdw55zko7u/9iwfG+TiR4i5yJhBGn0ZEAsE3HjLoRUvAiFpeaeuqWC2b54Yzk+kkz3MSu92OS4Ew+TSJMTZNw0EGvWgJGFHLK21dLRZz5xyvTCaT/HNOIpEYJP4TY2yahoMMetESMKKWS21dFatl+Cd453mH0WTEUYjBN56DDHrREjCilkttXS2KuWsct5hOp/6Igwx60RIwopYzbV0Vq2XXda5x3GIynay/rjnIoBctOTKiljNtXRWrZdd1rnHcyHvPQQa9aMmREbWctHVVrJZ0NE3DLaazqXd+ABn0oiUnRtRy0tbV73/8tv22dY3jFpPpZOu33nvIoBctOTGilpO2rorVsus61zjebXY/27/s1+s1ZNCLlpwxopYzbV0VqyWDjo7ONY6fmd3PXOO895BBL1pyxohaLrV1BRSrJdB1HeAaxxWz+xkdzjnvv0EvWnLJiFpeaesnMMVqSUdHB7jG8ZbZ/SyF9NV/xWfQi5ZcMqKWK9q6AhbFnEHHD3e4xnE0m832+/16/Qy9aMkrRtRyXVs/gVkUcwYdicRRTs4dg9SltE/r9TP0oiWvGFHLz7R1xZnHxQNHOfndL3fVn39BL1ryFiNqeYe2fuIHw4VetOQKI2q5XVs/cSJacp0RtXwkI2r5SEbU8pH+BWI0t3DJlFOAAAAAAElFTkSuQmCC"},{"name":"Ahrim's robe top","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFh0lEQVRIDbXBz2sb2QHA8e/TDFb8bKfTxF01rq2nGqmaEbiEXdKFUMrSS+ilp0Kh9LAu9N4/pfc99D8ohZZClz3kVlrTELIg8hrX1SSD0onkeGJZz5LnvZkq46hs2B+wBX8+QqqIqySkirhKQqqIqySkirhKQqqIr2RizVeSqsuXE1JFfAkTa14rfvGrX/7593/ibRnZnd6dJ/0nWXYKSNXliwipIj7DxJqlH31wd/j8P+N0/O777wJH/zrCkmXZerAO3Nq6NTOzF89fAN9p3npw8IglqbosCakilkysP/jxD2s1KrVajUGcHOrDIAhu/+B2cpRYLEs3bt548LcHQRDU1+ud3VZRQFE454qCg4OHUnWpCKkiKibWQK/X4ZLHwvFJliZpo9EANoINLjksNhtnLDW2NnFcyrJxmp4CUnUBIVUEmFjv7YV4eHi1GkXBpefjF+SkadpoNIIgcDiWxtmYhTkLOztbXPI4P7uwWKwdDIZSdYVUERUTayja7dY773zL4QoHRfH8+TgnT5M0WNgMuGRZGGQDICAAdjstD6jVapCmL621STKEUqpQSBVRMbFut3cBz2NB60MgCAIgy7JgYTMAfrP/69/+7iMsg2zAQsb/7N3uffqwv729DSTJEEqpQiFVBJhYd7u7LDmYTWdJkgRBwFKwGbBUX63rZ5qFDALIaGw3Vv1VsIDltWQwlKorpIqomFgD7d6uhzc1UywLSZIEQUBlq7VlzgyV+mpdP9Ncytje3gZy8lV/1WKTwZDXSqlCIVVExcS62+vg4eGdTk5ZsJydnVHJsqx3u2fODBW5KvvP+lQCgvVgnQWLf83HYrHJYAilVKGQKmLJxBqKVruFxWJzm8/P5lSyLNu7vTc5m1CRq7L/rA8EBEAQBIDFYkmSBGpQShUCQqqIJRPrO3e+D7WDgwfbre3c5vOzOUtbO1vm3FCRq7L/rB8QZGRAa7MFDA4He3s951y//wRKqUJASBVRMbHu9TrXrq14njcaZYPBUypBcJ3K1s7WxcWFdRaor9T1UHMpqwHtdtNaNjakc+70dJokQ6m6gJAqomJi3et1VlZWsuzEWpJkCPzk3p2bN75R8zxzPi+LoiiLWzvf+/c/Px2Psjx3eJ5z7uTFOElPgVaraa1dW7s2nc6SZAilVKGQKqJiYn337nvHxyfT6SzP8zQdQQlif//e2qqcns2++e3vOudyW8ntg7//tdG4OZ/P799/BCWIdrs5m1nf9+t1X+sjKKUKhVQRFRPr9+++d3x8Yuf2/Pw8TUdQgtjfv1eWzOf52vWttfV166zN7cnJq1fHT4H5PL9//xGUINrtpuf5c2frK77uH0EpVSikiqiYWHd7HXfhrJ2dn+dpOoISxIcf3iuKYu36jnV2bU1aZ1+Os7IsnHMvRzHwyScPoQTRajXrdd85O7M2GQyhlCoUUkVUTKy73V3n7GRyDqTpCEoQ+/v3nCvyYsM5t76xvrYmT06yk+PMWle6V8DHH/8DShCtVhOs7/vW2sFgCKVUoZAqomJi3e113MV8MjkH0nQEpVShiTVvFLylxhslr4lWqwnW969ZOxsMhlBKFQqpIiom1r1e58K52XSS56TpCEqpQsDEj3lN/OznP3WusDb/4x/+AiUVqULAxLrdblqLX/ft3A4GT6GUKhRSRVRMrHu9jnNuOp0kyQhKqULeZmLNG6VUIW8zsW61mvW675w9PHwKpVShkCqiYmLd2+s4x/Q0S5IRlFKFfI6JHwNShXyOiXW73fQ838GhPoJSqlBIFVExsd7bCyeTU2tJkiGUUoV8HSbW7XbTWup1X+sjKKUKhVQRSybWvFFKFfL1mVjzRilVCAipIj7DxI8BqUL+XyZ+DEgVUhFSRVwlIVXEVfovtf7jf3TNDt8AAAAASUVORK5CYII="},{"name":"Ahrim's robe skirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEIklEQVRIDbXBz0scZxjA8e9rWIyPicylFLZLXg+GnZEoYliEQTyJl5KQQPt/loQeepEQJJBuWRaEJUOKOGErkfQwsfqqu/M803SpRPFHNod8Pk58wrfkxCd8vZBnnCO+yTWc+ISvEfIM+L7x3X5/n88mGBHf5CInPmFsIc821h9aqX90dzhTFAWfTYhvco4TnzC2kGcb6w/LUjdfdKIoevrzI1V9/9f73193iqLgfxPim5xx4hPGE/Lsp6drg7J89nxrZWXZjLdvd4CCgjMRUVEUMCG+yYgTnzCekGdPHq/+8uxlmrZUFTBD1UCBTmd7aWlud/fvoihgAirxMeDEJ4wh5NnTJ6vlsHz+66s0bakqYAaYKqCdzvbSwtxgUPayd1CJjxlx4hPGEPLs8aP02fOtNG0BqgqYGaBKp9Odn5+9BQMly95BJT5mxIlP+JKQZ41G/d4PM69e99K0pQqoGWCAKp1Od6U1PxzqcHC63XsHlfiYESc+4UYhzxqzdUr6/X6atgBVQM0AA9rt7vz87PTtyeFQu9s7UImPOePEJ9wo5FmjUT88PCyKIk1bgKoCZoABJ0eF3JXhqQ4Hut3bgUp8zBknPuF6Ic8ajTrQ7/fTtAWoAgqYAdZudxfmZ2VaToeDbncHKvEx5zjxCdcLedZo1A8PDx88aJoZoKqAGWDtdpeIaDLilE+K4gAq8THnOPEJ1wh51mjU+/0+kKYtQBVQwAywdrtLREQEFMUBVOJjLnLiE64S8gwM2PhxI3z8aGaAqjJiRrvdISIiYqQoDqASH3ORE59wlZBna+trVtrWi5dp2mJEVQEzwNrtLhERESNFcQCV+JiLnPiES0Kera2vmdnW5svV1RUzA1SVETPa7Q4jURQBRXEAlfiYS5z4hEtCni0tL6ppbbIWRdHmb5vAysoyYEa73WmlraNw0utuR1EEFMUBVOJjLnHiEy4KebbUWkSp3a6pKmBmKHdm7my92GJkeWX5JJz0tnv8ZwIq8TFXceITLgp5trS8WLtdA1TVzABVxVB0WqZV9SScqAKa9TKYgEp8zFWc+IRzQp4tLS8Ctds1VQXMDEVRDP0EReHWLfQT/szeQiU+5hpOfMKZkGezc/eAyalJFFWdiWbMDEVRNUVR1dPBKSUlZX93DyrxMddz4hPOhDybnbsHyJQoiqIoSqnl3Tt3FUVR1dPBaVmWQH93DyrxMddz4hPOCXnGOc2F+yiqWmoJyJSE40BJSdnf3YNKfMyNnPiEi0L+hs8c0Jy/r6pAqeXxP8dTU1MlZX93DyrxMTdy4hNuFPI34JoL91GOwtHweAjs73+ASnzMlzjxCWMIeQY0ZuvDcsiQ/f0PUImP+RInPmE8IX8DrtGo9/t7UImPGYMTn/A1Qp5BJT5mPE58wrfkxCd8S/8Cr7BNfyc9TEgAAAAASUVORK5CYII="},{"name":"Ahrim's staff","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACx0lEQVRIDbXBwWvbZRgH8O87Nt0eGIgehDF9YGz83pexERJCyo9QQhiW/Q3eNoaHCV7Ei2fRsxcPgyGDwWAMdhNhlFJraAj7ETsqfdpQ8pTQo3jxsVqaVxI2MNhsbyL9fBxxwElyxAH/g6kQZ5hkKsQZxhxxwFxMBUAtL7VbXeIMY6YC4FrJv+huEWcAHHHA7EylWruOsaMhis4Gxmp5xeyP9955dzgcrq6uE2eOOGAupoKR4Tc/Z4/uvnXm7TMLn/z207fnu91NvBSJvSMOmJepND+qb/8qZ8+e6/X2ANTySrv1HIgAiD0ARxwwL1NZWmr0+3siu0DEiAMisccrjjhgXqbSvFFffrYGRGKP4zjigHmZCkYisccUjjhgLqaydLPx4w8rQCT2mMIRB8zFVK6VP3xR7AGR2GMKRxwwO1PJG1daKztAJPaYzhEHzM5USrVL3fYuEIk9pnPEATMylSxflNYqEIk9XssRB8zIVC6XF3rFOhCJPV7LEQfMwlTqTb+2vAVEYo83ccQBszCVav1KZ20HiMQeb+KIA5KZyuINv/psC4jEHgkccUAyU2k085XlFhCJPRI44oA0pnLrzsf37z0EIrFHGkcckMZUytXrRWcDiMQeaRxxQBpTwUgk9kjmiAOmMBXiDGOmcvHihcFgH4jEHskcccBxTKVUvtotNokzU2k08952fzDYByKxRzJHHHAcU/nq6y+fPH5aFJuLiwunTp/qbfcHg30gEnskc8QBk0wFY7W8dHg4BLC707/wwftHfx+J7GKMOEMaRxzwL6by+Rd3i+KXg4M/zQ66xSbGPv3sdnu9A6B6+3dbz7+//4g4QwJHHDDJVPJ65fCvw05nA4h4yZXKV6u1yr3vHmAkEnskcMQBk0ylllfaredAJPZ4xVQwEgEQe6RxxAH/YSpAJPaYZLpF7DELRxxwkhxxwEn6B3pbJnDITG3MAAAAAElFTkSuQmCC"},{"name":"Ahrim's wand","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtElEQVRIDbXBwWtcVRTA4d8ZdXMWgrpwoz0lTLnvRgYGQbIREekgpcxDN7qRitsuBddF3PsviODGbdBKMQtRFELBDm94YW47DPeGMuAuKNxAm+bZBgZTEjXzknyfqHmOk1NQc5yaqHmOyCl8euPjLz//Ws1xOqLmOU5Oodu9MJ1uqzlOQdQ8x8kpdN3KNMygUStoS9Q8R+QUrl0v7/x2dzyaQKNW0JaoeZ6WUwCuXS/v/HJ3PJ5Ao1bQlqh5FnIKwPCDt4G9vzqzFMPWDBq1grZEzXMgp/De+1cePdp78PAh0KHz7HPPjKs6xrmaoy1R8yzkFDhkWA6AcVXHOFdztCJqnkNymvAPGZYDgaqqY5yrOZYnap5/l1MYlgOBqqpjnKs5liRqnv+UUxiWA4GqqmOcqzmWIWqe/5NTGJYDgaqqY5wDao6TETXPCeQUhuVAoKpqIMa5muMERM1zMjmFYTkQqKoaiHGu5ljIKag5jhA1z4nlFIblQKCqaiDGuZoDcgr9118b/V6rOZ4map5l5BSAshxUVQ3EOFdzQE7BuZUQZmqOQ0TNs6ScJiBlOVhfv7W66ra27gG9XvHCSy9ux/sxbqs5FkTN00pO4crVd374fgPo9VbH48mNLz67+d2PtzdH0KgVHBA1T1s5hcuX39rY+Ak60IDwRKNWsCBqnrZyCr1+sbv7YPXlvfWft9VcThO1gkNEzdNKTqHXL8ajCY+5/Q9f7X67MQPUHIeImmd5OYWL3Qtxug0NTwiPXdx/ZZf7f3TUHAui5mklpwCNWsGBnCYgH7278s2tKXTUHAdEzXN2cgqfXL301a+BnY6aA0TNc3ZyCv03L+n+81tb93Z2/lRzouY5UzkF4I21/u3NETSi5jlrOU1A1tb6m5sjUfOcj5wCNKLmOU+i5jlPouY5T38D1DQjfn2+5XgAAAAASUVORK5CYII="},{"name":"Ahrim's book of magic","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFJUlEQVRIDbXB3U9b5wHA4d+LHbd9E8cxMaRJiN5lgdgHimmJNCsfq5QqSiuRIhjSWmn3+UOmXexmk3a3q91sWqVpWtWNbMqKsixdpjJS8sFwfQYrPqnB2CbGnAMvtonPGT2SNUfFDb3I8wipDF4kIZXBiySkMtgfbZlSxfmWhFQG+6AtMzWcnJ59BEgVZ9+EVAbPoy0zNZykaXr2ESBVnH0QUhl8I22ZqeEkz4q9fvLGr/6CT6o47QmpDNrTlpkaTtJifKybFn9bEDd//TEgVZy9CKkM2tCWOT4xgu9pJxdP1djLrQyu5059cAufVHFaCKkM2tCWOT4xgi81VMssxRKn12jjz/erbsMNhoK3f38HkCqOT0hl0Ia2zNHr1y70VPFllmL51dXL54PAw0y4/GT98sUgvk9n8tkiBw6+vFWxAwcCgycCv/1wXqo4IKQy2Iu2zNHr1y70VGnKLMXyq6vbW9Wu7tims1kulyfe7cb38FGxp+fItOUCK4sr/ccDm7p26x+PpYoLqQy+Rlvm6PVrR58ejn+niK+wcQbYsB3gxh8//tHPXrn9iyM/fLcb319vV6OH7ZI4jMfjB49PdD7V1Z0H6RJ4QiqDZ2nLBH764yv4zGx3sVSMRA4DXV1Hnc2t8tr6dyfmb/08HI/3Am8YW8And3NLpcZBalvVYCAQctZXsjkbPCGVQQttmeMTI087uXiqhu/ujAD63jMbn70NBM7dXL5xrlatPraWXRrvjx2naXJWR7fLjqOfOHJuLgOeVAkhlUGTtszxiRF8qaEavrszAuh7z2x89vZHH974wU+CwOcfnC3kiy6N98eO45uc1a82yvZGPV9w6oEjZnoBPKkSQiqDJm2Z4xMj+FJDNWBp9cSTtcr2tgZ6e08Hzt3E969fHgOG3hi8f39u9GoEeDibtzfr+UKlvF7L5mzwpEoAQioDn7bM1HASiA2d/P7pHVp8MsOu3t7T8/MmUNXbwLWrEZom7+lYrVSu1FYKlcWsDZ5UCXxCKgOftszUcBLfkdeOXe71aDF1p04Hu5LJ/k//OTP6TpQWv/tT8UBHh1NZTpsl8KRK0CSkMgBtmanhJC3Gx7ppKtp9jx7MX3kzhK+wceZY5L/4Ju/pkx0btr1trQZsu5DL2eBJlaBJSGUA2jJTw0lajI910zR1p37lzRBN0w8PRA8Wz/ZGJ+9poLNaKq/XylsvpdML4EmVoIWQygC0ZfbH+4DwwVeAcF9s6ubUW1ffuvpakGdNzxa7Y4ci4eBHf8+HZOhspLG+oZdXtwmETfML8KRK0EJIZQDaMvvjfcO9odnFOhDoChWzxYELA67rvpMM0eQ23N/84cvOM124uJ6rsyvd0WB+zVl/UssVbPCkSvAsIZUBaMvsj/fhe703hG9ug11HXz2Kh+u67PJYL64FOkKHood2ajuF/yx3hrGdzcWsDZ5UCb5GSGXg05bZH+/DpwO18ypM078ddkVjURcXl1KuxA6Nei0UCKbTi9ABnlQJ9iKkMmjSlgn0x/vS5sLgpQHAKTvnVRhwXaCR3gpEOiN4nKC8tl5fLQeAdHoBPKkS7EVIZdBCWxkQ4IHAN3hpwCk7qVMSnwefbwV6QvV8qVJxatmsDZ5UCdoQUhm0oa0MXxHA4KUBwCk73zsl8XDcxhfZirlYAk+qBO0JqQyeR1sZEPgGLw0APS/X5zKFXM4GT6oE7QmpDPZHWxm+Ivg/T6oE30hIZfAtaSuDT6oEzyOkMniRhFQGL9L/AKlsQt0JqzFVAAAAAElFTkSuQmCC"},{"name":"Dharok's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEs0lEQVRIDbXB/2uVVRwH8PfRK81j5nLpTIbH9Np9nl8iAhkMGUPSYRMhWBJRgZKBYIo/lJj9JRH1W0UUgSHDi4whIYzBmBPRo9e6zxjidQ7v7pdzn3M+50tTsK7po7cfer0YFzH+C5VILgroGOMiRsdUIt898OavZ2e4KKAzjIsYHVOJ/PTw4NffXgQCFxE6wLiI0TGVyKNHhuTNO+MT17kooAOMixidUYk8+dmeZlOX5xaLF64CgYsIz8O4iNEZlciTx/Ys1VqVhdq5sVkgcBHheRgXMTqgEvn5yeFGQ1fvN6s1NVa8CoCLAp6HcRGjAyqRx46+TWTv32/eW6y/3LM9NfrcbxcAcFFANsZFjOdRifzw49HuNVWjbXWpWa/rXFevJjLaNOuNqalZLgrIwLiI8UwqkR8deq9nTdW6oFPTUqahUp/rJUNaG2P0/O1KuTTHRQFPw7iI8UwqkYc+eX9d16KlYMimxqimtis2krFkKNWm0WxMT80CgYsIT2BcxMimEnn4yAflP+feKKwm64h8mppU092FenfPazdKJTh0r+++e6dSKs1xUcATGBcxMqhEnjpzfAVjtaVGbfGatZ6ItHFa00s92511wXvnrCGnW+nExCUgcBHhcYyLGBlUIk+dOb6CsaVqPQS/dO+61pRqWteTd85ZcuQcWSJtrLG1WmN6epaLAh7HuIiRQSUyn98G2DRtjRx4p74oW5rSFvVsfN0598P3v/T19eEBajT0tm1bp6dngcBFhDaMixgZVCLz+S2lUhlAb28vgEql0t3dDaBareKRvr6+XA7rN7wyPTULBC4itGFcxMigEpnPb7EWuRyAnLVpuTyfz2+11gKwFn/L5XIbetdPTc4AgYsIbRgXMTKoRA6P7A7eY5n3N2SpXJ7P57du2tzrvXce3jnnPZFxxq1du2ZycgYIXERow7iIkUElcnhkKHjA+z9ulUulMh4a3D3grSPrvSMi58gZ4yqVSrVaAwIXEdowLmJkUIkcHhkKHsWxcbQZHBq4OHGpf+AtIu+dM2SMcfVqvVJZAAIXEdowLmJkUIkc3jcUAHgUz4+jzcCunUTOeU9knHHLqs16ZX4BCFxEaMO4iJFBJXJ4ZCh4LCuOjeORXYP9v1+c3Nn/liMi71auWNlqtprNdH7+NhC4iNCGcREjg0rk6MH99Xrj/Nj43uGh4vkJPNI/sNM7InKrVq0iTcYYpZrl8m0gcBGhDeMiRgaVyNGD+wHU6g14FM+P46GBwX5n6YVcl7VEzpEmY4xSulyeAwIXEdowLmJkUIkcPbgfwM8/nd27b3dxbBxtBgcHrCciR5rMA7pUmgMCFxHaMC5iZFCJHD24Hw8FHy7PXAGwfcc257y3y7z1RNoRkTGmq2v19PQsELiI0IZxESODSuTpMydu3rwFILhw+fIVADt25J2z1nrrrbVE2q1d92K93pianAECFxEex7iIkUEl8vRXJxhj8tpNH3zw3jlvnXPWbtr8qtZpS6VKtS4UL+KBwEWEJzAuYmRTiQTwxZfHvbXOe7uMbKrT7775Ef8IALiI8DSMixjPpJLrAMO/BTzCRYRsjIsYHVDJdbThIkJnGBcx/k9/Afjr6X+5YTwJAAAAAElFTkSuQmCC"},{"name":"Dharok's platebody","base64":"data:image/png;base64,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"},{"name":"Dharok's platelegs","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEkUlEQVRIDbXBwYtbxwHA4d9ItmUmrvNMvH3gbDxi0fLeW+KwOCxLFhGo00MP+QsKLbRQCv1regiBXHroIeccSgM+52YQgnUWD4iiMY+FZ8XpIMsjKW9mXrvbmK7Y3Vg+5PuEVAU/JyFVwZtzRnOGVBmXEFIVvAlnNJCmN3/5zp3Do6MkSQBrp4BUGecIqQrW5ozev79bx/hyNgP0aHQvy4BDrZMksXYKSJVxhpCqYG3O6DTdYLmsrM16vQCf/ObjLz77G7DT600Xi7IsoSVVxitCqoL1OKMhpmlaVdXBwd7zZ//+9acPvn38pBw99YD3Huq6rqoKWlJlnBJSFazHGQ0R6Pf3Y4whAOH58yneA6PxuNfrLV68KKsKWtBIlQNCqoI1OKMhcqrf348xhhBiBGIIIUaGw8MkSQBrp9BIlXNKSFWwBmc0RKDf348xAiGEGIEYQhgMDoEkSQBrp9BIlXNKSFXwOs7oNN0AsqwbIzHGEIAQYwyBGMNweMj/taCRKueUkKrgdZzRabpRVVW/vw/EGEMIMQIxhDAYHLKiBY1UOaeEVAU/yRn9h9/1//lQb293gRhjCECIMYbAYDBkRQsaqXJeEVIVXM4ZDfz+twd///Kbfn8fYoyEEGIEYggMBsMkSQBrLSda0EiV84qQquASzuide9vv3Xn3nbcXT49DjBEIAQgxRuDRoyGQJAlgrYUWNFLlnCGkKriIMxrYP/jwo91bf/38IacODvZCCECMMQQGg2GSJIC1FlrQSJWzSkhVcI4z+t5uDvxCvrX7/tvGfDcaz6x9UVUTiMDe3u6jR8M///HBdPby64faWgstaKTKWSWkKjjHGX1vNwcOh0fdXtd7j6euZ1U1BbKdbX2k//KnB27+w1f/eGythRY0UuWcI6QqOMcZne1sX2u3QwhHRxpI07SqJtCA2Nv7YP/+bed++Jepxk9fjsfH0EiVcxEhVcEqZ3S2s03g2rX2fO78CWazmbVTIElu3r59+1f9zWoyPdLfL7y/AuPxsVQZFxFSFaxyRmfZVvtam4BzS+891GU5gQZEL9sa6VG3u9npXA/Bj0ZPOdFIlXMRIVXBKmd0L9tqt2nTdu6l98zqma2mQJZthQBtCN57wAMeyvGxVBkXEVIVrHJGZ9lWgMVyAdTzWVVNgc3uneud6wQPeO8BD/i6LCfQSJVzESFVwRnO6G73bkd2lm7p/RyuAmV5DGTZ1ls3b0ynM4JfLOacKssJNFLlXEJIVXCGM7rbveu9v3Xr5rNnz5fLpbVToJdtEQBP+4pfeu/nNVBTVRNopMq5hJCq4AxndLd7F7y1M2sttKAB0ettefwVTnjv576uygknGqlyLiekKjjDGd3t3p3P58vl0loLLWBz885sNkuSG4AHPGV5DA0gVc5PElIVnOGMhggkSWLtFBoQabqxXC5v3OjUNf9TVRNopMp5HSFVwSpnND9qOCHSdOPqVf6rrqmqCScaqXLWIKQqOMeZJ4BUOeCMhpgkSafTqaoJNIBUOesRUhW8jjOaHzVS5bwJIVXBGpx5AkiV84aEVAU/p/8AO/puf/PVzIUAAAAASUVORK5CYII="},{"name":"Dharok's greataxe","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADeklEQVRIDbXBYWjUZRzA8e8zTeFn2b0wdUT+BinP/xncmMIxidGLXmQihbZI0vWisHzXO+lFL3xjL3pbECgSCBYsjGQr0ZReBjKaYxd6Dy7ZM27F3Kpj3p621t2Vfzqc5M2b08/HiDoeJSPqaCAGL2pZGSPqqIvBi1pSMfj3P3jvow8/ZhFRyzIZUUcqBn/ocO/J46dFLakY/NvvHsxfyZPKbs9+duJzQNTSNCPqqIvBHzrce/L4aUDUAjF4INfVUanyr87t2dWrV5/49JSopTlG1FEXg891dcyUyuszjw9eHmGRXFcHddrWdqavX9TSBCPqWCQGv3XrlndOrf3k4OzGpzYAq1r4P21rO9PXL2q5HyPquFsMPtuZAH9M/7Zhw8bH1q7iXrbolq++/EbUsiQj6kjF4KnLdXUszFdOX3nypWeuF4tTpHbteeH36WnqNre2Dpy9ADXRhMaMqANi8EePHTl/7vtqpQJVUgvzFWB6+maxOAU1MLmuDlKbW1uBgbMXoCaa0JgRdUAM/uixI+fPXQQu/zAELdxW7ezMDg/ns9n2fL7Qnk3WyRpSmzdtGui/CDXRhCUZUReD35HroG5ocARq3GaAF3c9/9fC38Xx4ujoeHs2WSdrgEqVp1s3DfRfFLUsyYg6IAbPHTXRBIjB7+3ZXa1UJ29Oz8/NVRYq+XyB26rAjlzntm3P9n3xtailMSPqSMVQICWaUBeDB/bu2z0R14z/fHVy9DrUwHBHTTShMSPqWFIMBTDdPb1PVH/KX5kojk2J2hgKpEQTlmREHU2Iwfe8ubN8a+7C2WGoiSY0x4g6mhOD33dg52x57rv+YVFLc4yoo2kx+L1v7CyX46WBEVFLE4yoYzli8K/sz8Xy/KVvR0Qt92NEHcsUg3/59dy1UUaHBkUtSzKijuWLwef2vDo1fmMsPyxqacyIOpYvBt/9Wu/87OyvN64VfUHU0oARdTyQGHx3z8FYLk/4/OTYDVHLvRhRx4OKwe9/qzve+nPgzI+kRC13M6KOFYjBP7fvwMIvV8fHJoDJySlRyyJG1LEyMfhcV+fg5SH+0yJqqTOijpWJwUOVVCaTAUqlGVFLyog6ViYGD9VMJlMqzQCZzHqgVJoRtYARdaxYDB6qmUyGVKlUghaoiSZG1PEwxOC5S000AYyo4yGJoUCdaELKiDoepX8AROlmcFH44nMAAAAASUVORK5CYII="},{"name":"Torag's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAET0lEQVRIDbXBX2tcRRwG4Hcmm7ROta5QCXgzWpA90z9x2TamWC+iFw0hNVYsLZV+PEEQwd5Jb0pBqQZpKUVKDq1tTq2BNbVOzNk5M/ObmePuNkFDjW6UPA8TUmEvMSEV9hITUmEvMSEV/h9T5EK2sAMmpMJ/YoocQ3Pzs1e/ug5AyBaew4RU2D1T5Bcvfei9Dz54T855792NGzcBCNnCXzAhFXbDFDmATy5/5H0MRBSInLfe/643qqqKMdy//0jIFrYwIRVGZor8/IWzNTDRGKdAgYh8XF9fd0TkqKoq52xVUbe7JmQLQ0xIhZGZIj9/YbFGmmiM6Y0eee+dDyFSn6OqqpyzVUXd7hpQC5kBYEIqjMYU+cfnzzLOA5HzRORT6EshEFHs9XreR2ttWZZaa4AL2QLAhFQYjSnyxXPznKHPmCqQTwkhkSkdpRh9X7TWlmWptQY4UAuZMSEVRmCKfG7h/ToEIV5AjapyFIO1jogiJUo++uh9tNaWZam1BjhQC5kxIRVGYIp8bmG2DinVKYQUUmpwHjwNJUo++uh9tNaWZam1BjhQC5kxIRVGYIp8bmG2TkgxWe+RYkqJKBJRTDH66GMMzlYVdbtdDHCgFjJjQioApsiFbGFnpsibzYMn326nlHq2QgIQU0xEMaYYffQxWmepKrtdjQEO1EJmTEhlivzypVOffvYdtgjZwnamyJvNgwDanWO/rK3d/Sk//vqR8fGJFGNMMfrovbM2lGWptcYAB2ohMyakAmCK/PKlU96T97HRGPviy5t4zszMiTy/d2yq9cOdJQw0sWXytUPOh2CrsnRaawxwoBYyY0IqDJkiB7AwP1X1fKOBscZY86CgmDgHY5xz3C/olWZzfUPndx8AaB15E0B+9x6AyclDzlldlXDQWmOAA7WQGRNSYYsplgE2PzcFgHOMN3gMCRwMHEDpXuScr6/re/nK7Hunf3z4MPo4FPqqQK50gNYaQxyohcyYkArbmSJf/KA9xhAjnuEcfVe+vjXbeff6tW+aTRw+3CbyccjF0EcVOee01tjEgVrIjAmp8BxT5ADmzxyNIR44sB8Mq10s5beg8Uyn0z75VvPpb72JfeOPf/71wUqPiJxzWmts4kAtZMaEVPg7plgGGID5M0dTwtON8e/zW9B4pt05PtN5tTJ+ZWVtdVXbME5EzjmtNTZxoBYyY0Iq7MwUywCbeedE8+WXrn57DRpDvN05enp6svtk48mavn2nq7WenJx0zmmtMcCBWsgMABNS4R+ZIr9wcfHzq1egAXAA09NtIvIxtt7Yv/akt/KoC+wjgnMOgNYa4EAtZAaACanwb0yRY1MNsM70VKLo+2IMLgSEA/v2xxisDY8fr2KgFjLDEBNSYQSmWMYmtnhujvpcsLYioqWl2/hTDUDIDFuYkAq7ZIoc29TYImSG7ZiQCrtnimVsETLDzpiQCnuJCamwl5iQCnuJCamwl/4AxMnVfxs80W4AAAAASUVORK5CYII="},{"name":"Torag's platebody","base64":"data:image/png;base64,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"},{"name":"Torag's platelegs","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD/UlEQVRIDbXB4WvbRhjA4d+5bl2uNNPadYF88Imh4pM3j1AohXwoYX/6GIWxj4NQQTokc81Q3YBxm4vle09aHAg0NG6dQZ9HaZPzLSltcv4XXxVc0WbEBkqbnNvzVZGmT0S4EEJT1wsuaTPiOqVNzi35qkjTJ3u7P07fvuNSCA3QNMznC21GfEJpk3MbvioODqz/sBrcv9cCMUZ4+7bmUtMwny+0GXFFaZOzNV8VL17Yxq/u3r9DJAItLZELkX/fvW8aLsznC21GXFLa5GzHV8Xh4a+r89i/e6dtYxuJxLo+PT9vHj9OYpQYWS7Dx4/1fN6DThsLKG1ytuCr4rfD/ZWEe7270oa2pY3x9HSRfL8TQjw7b4hytgyAczPotLFcUtrkbMFXxWTyU4xCJEaJwvv5R2D0dC+EGGKMK1mcnYfQ1PUCOm0sl5Q2OVvwVZFmQ0BEgoT6Yw28/GW/aVYhxBBjXMni7DyEpq4X0GljuaS0yfkaXxVpNgREJEggUDc1kAyS0XAvhBhiPD9fLpfBuRl02liuKG1yvsZXRZoNZSmBQKCua9Z6ye5O8jARkft9LoiEspxBp43litIm54t8VRweHgAt7T/l1JWOtV6S7CQ/JCKCcCU4N4NOG8sVpU3OF/mq2N//OXn0XbsW//j9T+gBSbKTJImIBAKXajeDThvLJ5Q2OZv5qoD22fP9sFzFGI+OCuhBB2o8sau4+rD4QOBCXc+g08ZyndImZwNfFdCORqMmNrIU5xxrPdbal4cHtIiEN2+mDc28XkCnjeU6pU3OBr4qRuOnj5OdV6/+AnZ3d+t6xlr77Nl+aFfxwirOzz7UbgadNpbPKG1yNvBVMZ7Y5OGD5drq5KSezxestVmWiojWD46OCuhBp43lJkqbnJv4qphMbIzR+wZEBOdOWGtfHDw/fTdbirjSJUkyny+g08ZyE6VNzk18VYwnlhi9bwRBcO4ESLPhk8ePYgjLsDr6u4AedNpYNlDa5NzEV8V4/NT7BkQE5xz0smwoAki/318uxbkT6LSxbKa0yfmMr4rxxBKj92ciOOegB6TZEKE/6BNFhLKcQqeNZTOlTc5nfFWMx0+9bwRBcO4EyLKhCINBP0YRoSyn0Glj+SKlTc51viomExtj9P5MBOdOoAOVZkOE/qBPlOPjEnrQaWP5IqVNznW+KtJsiCCIKx30gCwbijAY9GMUEcpyCp02lq9R2uR8xldFmu5Bvyyn0IFKsyEi/f59QcrjKXTaWLagtMm5ia8K1jpQWTYUoT/oE+X4eAqdNpbtKG1yNvDVa20s4KsiTffK0kEPOm0sW1Pa5GzBVwVrnTaW21Da5GzHV6+1sdyS0ibnW1La5HxL/wHE5WB/dzHAsAAAAABJRU5ErkJggg=="},{"name":"Torag's hammer","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAECklEQVRIDbXB/2vUdRwH8Of7c1+8e52fz52bm9zUvca48fm8B6abTmUcS2RNRiUOIzBSLOz/qX4rIsWiKBwbw2N8LM4hq18qsYL0HdPdW+bcl1Zz03f7dvuEQ2kyc3czHw9BLFEmoxWxi9IIYolyGK2OHjvS1+sTuyiBIJYoh9EKjwTEHtYjiCVKZrQ6/sar3RdydXU1hcIoAGIXaxitiF2sEMQS5TBavX70levqZgiIxqO/XruBNTo6Dl26NEDsAhDEEiUzWu3a4y38vVBZVRmNRRbmFoHl4mIxtbUi0zV0+YNNsUi8ltOAFQqFui9cJHYFsUTJjFauWx8KhaKxKIBIJLLrxATZ4XAU332Ympm5X5+pSySIKA5Y5899BQSCWKIERis8tNzY6CKEWCy+XCwuLC4AsG1nfm7u/sys49g7anckiOIUv3N3zM/lgUAQS6zHaHWsq7O3p7/jSNtCcWmkMFJZXbW8WFwsLlaktoyNjSOEqYnp/fv32LYdjobGxieFZfm5PBAIYokSGK3aO9pu/Ha9uaW5r8fHirZDrYlE7NZwAUU8eDDb1LzHdmzb3jxcuC0sy8/lgUAQS5TGaNXY2FCxNVXzcmHkcq2dTFI8PjxU2L6zJhIO//jDz837diUd27Y3D90qCMvyc3kgEMQSJTBauW59PBEHsCkW239mcml+6Zv3Yw2ZulQyaduJS36+qWl3MuWMjN61LEtYlp/LA4EglliP0QqA29gQj0UBOE7yj6nJEEKzszNNe3cnHefuxLifG+jsPOyk7EQiMXJnVFiWn8sDgSCWeCaj1fE3X+v++mIq5UxPTwNoOdBcXV019PvNYnHp4MF9E5N/ijD83EB7ezaZTHZ35/BIQOwJYon1GK2AABAATr/Xdu2nqYqKLflvBzNufeuBvWPjkyJs+bk8HgmwgtgDIIglSmD0DUCcOtN2/pMreKy9PVtZVfnX9D1hWX4uDwQAiD2sIoglSmC0Ovlu9rNPB4EA/xJdXZ09Pf14KCD2sIYglliP0ertd7Kfnx0EAmIPqxitgAAAsYenEcQSz2S0eut09otzg0BA7KFMgljivxmtTpxq/fL890BA7KF8gljiaYxWAE6cbI1R9OxHA0BA7KF8glhiDaNVc8tLDS7FKXru4ytAQOxhQwSxxJOMVqltzs7qmkgkevXqL0BA7GGjBLHEKkYrAIfbs9P3ZiKWla7Z3tuTI3axUYJY4jGjlevWJxKbt6WrI5FIX28/HgqIPWyUIJZYYbQClusydUtzS+nt1el0uq+3HwiIPTwHQSzxmNGqNdsyNTk1Pz9XKIwCAbGH5yOIJVYxWmUytUNDt4GA2MNzE8QSTzJaAQGxh/+DIJZ4kQSxxIskiCVepH8Axet5OXxMAa4AAAAASUVORK5CYII="},{"name":"Verac's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEsElEQVRIDbXBT4hVVRwH8O95YyI/SmahXJhu/l6GvHs3LgRpNyvLRW1EghYtgsRWkSgKEVIhFaFYEIVUhJGgtUmsiFqImAiGyJAZHJzynTd3/tx3543XN89z/71zTzOPBpzmPR0XfT6C2MdD0koCIK5hFQSxj4ehlXz70IFgavKLU2eIa3gQQexj1bSSH7//bhg1G5OTYTT78/kLxDXclyD2sTpayRPHPkjSdCZqNhpB6/btXy5cBCyxh8EEsY9V0Eqe+fxEkiSzc3MzzWZ9Imi1WvVGox5MEdcwmCD2sQpayXOnvmrNzc1E0UwY3lKNMIrCZrMeTAGW2MMAgtjHg2glL35/9k67PdtqzTSjicngL9WI5ubmZmfrwRRgiT0MIIh9PIhW8tIPZ+N2e7bVmm5GE0Hw583xPMsa040giABL7GEAQexjOa0kcQ3LaSV/PP11NNsau359uhnF7ThJk4uXrwAVwBJ7GEAQ+7iHVvLIwV2Hj35HXEOPVhLAtu1bj+w/9PuNGzNhOH/3brvT+fXKb2EWIq4AltjDAILYxz20kp++99LV6/UvT19Cz+7dz926NXHt2thnx48lWfb6G2+ix3GcLMviOAYqxDUMIIh9LKeVPLzv+bVrhtasfeTshfErl8e2bd+6/rFHL5y/hCXVqpskRZZlcRwDFQDENfRoJYlrWCKIfSynlTz9yatZ3s2y4pvzf2963E3SJAyjsixvt+J169amRT4ft7vdotPJqpuf6LST8fFxoIKe0ae3XLxyk7iGHkHsYwWtJICTH75y6qebWiemLMqifHJzNc+KJFuQdrtlWRpTllmaTk9OhGEMVPbvfeZuUmRZfvLby4Al9gAIYh/9aCV37BwFcHVsrPbUltKYoihMYRbkuRkaggFgumna7RSdowd2Fca0O2mS5O8cPwdYYg89gthHP1rJHTtHAaRJUnbLYpFZkJscGIIxYTi+YUM1TZNOJ/vorRdKa0tT7jl4ErDEHpYIYh/9aCWf3TkKQCfJH1Ju3lQtC5Ob3OQGQ0MwJgzHN2yopmnS6WRxHAMVLLLEHu4hiH0MoJV8ec+LpbFSyiItizI3ucEQjAGMMeh2DZL5JMuyOI6BCmCJPSwniH30o5V0qyNBPQDw2r6983fmp6am86Kb58UCU5ZlYRYkiR6frSOuAJbYwwqC2Ec/Wkm3OhLUA9zX8PAwgDhuA5bYwwqC2Ec/Wkm3OhLUAyyq4L9K9AwPDwOI4zZgiT2sIIh99KOVdKsjQT0AKoDFMgIoAQw7w8iwII7bgCX2sIIg9tGPVtKtjgT1AKgAltjDEq0kUDqOA2QZgAxx3AYssYcVBLGPfrSSrjsSBAFQASyxhx6tJFA6joN/ZRkQh23AEntYQRD76Ecr6bobgyAEKoAl9tCjlQRKx3GwJAwjwBJ76EcQ++hHK+m4G8MgAiyxhyVaSaB0XafAojCIAEvsYQBB7KMfraTjbAzDCLDEHpZoJYHSdV0sKoIgAiyxhwEEsY9+tJKOsz4M24Al9nAPraRbHUEXQTAFWGIPgwliHwNoJQFL7GE5rWS1OlKvTwGW2MN9CWIfD08rCVhiDw8iiH38nwSxj//TP880vX9+FnWnAAAAAElFTkSuQmCC"},{"name":"Verac's brassard","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAErklEQVRIDbXBb2jcdx3A8fe32W30U9IQy1HIXD+3o+vv98sIxkHtkC6UkGWMNZ0Pspa6TQSf+WCiT90TQUSf+sxnig9ks9C5rgZtFCkxOEJH50HWbyzl9z3TO69HR7M239yf391X7vAgZURHE18vI5qwF7yzohGfY0QTds07+8rczOVLi6IRDzOiCbvmnZ078+Kl969AACMaMWBEE3bNO3vmGy9Vb1dXVv4+f+70hXc+EI3oM6IJu+CdpW9mdur+g80vjY4+8XjuvYsLEERjwIgmPCrv7OREHnj62Nc2NjZarebIyEjusdx7FxcgiMaAEU14VN7ZyYk85J4+9tX18u1q9fbRY8+Mjo5ubGz8eXFJNAKMaMIj8c4+NzHWheulyqnpk5v3H1Srd44eKxwcGX7/4h8giMaAEU14JN7Z5ybGPipVXpmb2dz06a314tEj3W53/35ZuLwIQTQGjGjCNt5Z0Yj/xTs7HuWBVVsHTp36epqup2l6avrk/v2ycHkRgmgMGNGEAe/s/PzpCxc+EI3YgXcWmIjyHVi1dQhgovFnmr5JTwakaQWCaAwY0YQB7+zM7NTNtTRNy6IRn+OdnZ0qDo88vrZ2t2TrEOgxhcIRYGtrq1arvfntc7/+5W8hiMaAEU3o887OnXlxq9EsffxJrVaHIBrzMO/sy9PFbpdP7zVWrlcgiMaAdxa6hUJha2sLqNXqEERjwIgm9HlnZ2anSh9/UqvV6QmiMdt4ZyfG88DwgdzySgWCaMyAdzaKivfu3QdqtToE0Rgwogl93tmZ2ambazeB7/3gu99/623RiAHv7MR4Hiit1ukJojHbeGePRsWs2chgPa1AEI0BI5rQ5509fDgP1Gr1QmEMSNOKaAR4Z3/8s7ff+dUvSqt1CPSJxmzjnYUu7KMniMb0GdEE8M4WCkfStExPAENPAEPf5Hj+1de/86Mf/pSHiUYMeGchAKIxA0Y0oc87CwEQjQHvboB5+aXjnU632yXLOlnW7nY6d+5+lmXt4eHhVqvRbLbTtC4asTMjmrAD7+z09GSWdbOs1W7z/AsvHDx40KXlViurVKr1arnTYWjoMWvLohE7MKIJO/DOTk9PdrtkWfvZrxzPHz6Uyz3x4MFm/U697Nb/tZ4CnU5mbQWCaMw23lnRCDCiCTvwzs7MTC4ufgScf2P+yaeebDYbxWKh0Wj+6cpfhtis1z9rt5ulUhmCaMyAdzaKitbeEo2MaMLOvLP0nX9z/qkjY+1Wu9lqNbYa6/+s/nFhkZ59EOgxDERREbD2FgQjmvBfeXcDzDe/9Vony76sY/9Yu9VuZQuXrvAfgR5z9uzpbpdSafXQoVFgefkaBNHYiCZ8Ad5Z4Oz5V9/9ze/oCfSJxoB3dn4uBip3DwD79rG0dA2CaGxEE74Y726AgQCIxjzMO3v8xGRuaMj7TZEDy8vXIIjGRjRh17yz5848C6S1XK32KZCmZQiisRFN2Ave2RMnJoeGhjqdzocfXocgGgNGNGEveGd//pO33v39X4GlpWsQRGPAiCbsEe/s1NTzwNWrf4MgGgNGNGHveGdPTh1furoCQTQGjGjCnvLOQhCN6TOiCf9P/wYeDTUulC3BsAAAAABJRU5ErkJggg=="},{"name":"Verac's plateskirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEwUlEQVRIDbXB8UscVwLA8e/bnc3qawQhyla7zRs2hpmJGESQlCChlNI/tX/E/VCO4zgOroggyeVRLTu69Zjstp3q+GZm5828ZrcnKDlbk6Ofj5Aq4s8kpIr4P5hYc0WqgHcIqSI+lIm17696XgewthoOx4BUAdcIqSI+iIk1Mw0QBH5dW2uxthqNxlIFXBFSRbw/E2vfX3369DFz+/vfjUZJEPTLsrKW0WgMSBUAQqqI92FiDTx/Hj569OmbNynw8uWwqtjc/AT45pt93+9ZW2YZaXouVSCkirgzE+u9vc3BYN056rp+/foU+OGHJIr8puEtrYdJkvp+b2lp6fDwCFpCqoi7MbHe29v0/TWgaZrXr0+BpqkfPvzYuebHHy+A4+NT4NGjT4+PT8uSND0XUkXcgYn13t6m+YVwa+3rr/+ysxMwt7b2oGnqum6ahm+//Y65waC3v6+hBU5IFfFHTKy3tzYPDg+Z290NgLpmdXXZuaZpgPr09Ke6tpNJtr6+DLTb3uHh9+CEVBG3M7GWKjCxhoZ3fPnlDnOnp2+AuqYo+OgjwNP6BJxUoZAq4hYm1s/3dv/x93999dWLYjr921//CQ03ffHFzsnJm3abty4vWVlZALKsODo6AydVKKSKuIWJ9e6zbZpmael+UZSmKA72XzLTcFMQ9Ouadtu7d88DDg+/BydVCAipIm5hYv18b7coy6LI62ldlsVwOIIWMw039Xq95eXFe/eoa169OgEnVQgIqSLeYWINbG9v5nlelrYrvXJq84s0SVJogQPBTMMV3+91u4vtNq9enYCTKmROSBVxk4l18OQxNb21B/rfx4uLHc9buLi4KMsyTc/BgXj2bHtxUabpLwcHL6FhLgh8rU/ASRVyRUgVcZOJdRAMaLd7Kw/ysihMkedmMknfghawtRV2Ou2FhQVjioODQ2gx0wSBr/UJOKlCrgipIm4ysd4IBtS2KOza2srlZX52lqRpCi1gayvM86m1tiu9cmo9ODoaQov/clKFXCOkirjGxHojGADF5UUFHciyEkjTc3Ager3VpaXFwtqF7oIti9xWySiBFjhAqpCbhFQR15hY+/46kOcVc0mSQAsciBcvPtP6GMpO5/7CgmdnKs/rDIdn4KQKeYeQKuKKiXUQDC7LosqrkrJLF0iSMTgQwZPHpblcXV0pquk0n6bpBZAkY2acVCH/i5AqYs7Eent7M8suJpOUufv3u57HcDgGgiePqWvalFNrC1tVFZAkY3CAVCG3EFJFzJlYb29vTiY/Z1mWpmmvv9yhOxqNgRefPz37TwYUZYGtgKriN0kylirgdkKqCDCx3tl52jT1ZPJzlmXdbhfKJDkHB2JjY2BncqACKn6TJGNwUoXcTkgVASbW0AD9fi/LSrqkyTk4EL6/ntuqw0xVMVcmyTkzTqqQ3yWkipgzsQb6/dUsK9P0HByIjY2HgAUsFlvlVUmZJufgAKlC/oiQKuKKiTU00AIHIggGZVl4nmcBay1gq9FoDE6qkLsRUkVcY2INjhkBzcbGBlhrsVhsNRqNwUkVcmdCqohbmFhD4/t9axmNzphxUoW8DyFVxO1MrPv99dHoDBwgVch7ElJF/C4Ta3BShXwQIVXEn+lXMqeEPdWHxSgAAAAASUVORK5CYII="},{"name":"Verac's flail","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADSklEQVRIDbXB/0scRxjA4c9stJd7MTI/eNnGLL4SEnanXyBURDj859vKwSEWIUEyWMoNLIZthA42TnOc3rYeCVXU1ovkeYyo40syoo4vyYg6bpKC5yrRkvkZUcc1Kfjt7c2dnSHwvFwHjptRjJloyZyMqOOaFDxMraXTsd1u55F9/Mfx72vra4OdPdGSeRhRxyUpeD6a5nnefdTljNXV3uT8/ND/FuMJtKIVd2ZEHZ+k4ItiFajrI2uX7YoFRr+O1teLXm/l7dvjuj4CREvuzIg6PknBrz9fA84+/DWZ0DQNljJ/3jTHKyv2wVcLzdExEOMJl4iW3M6IOi5JwW9vbwKvXw/BAjHGoigePlx4/HUPOHh92FnqNHXDvzI+ES1T8IBoyYwRdVyVgoepzS1jYoxAnltrV05P/5xMaJoGKIp8YaE7Go2APLcsdhZZrOsaMphyIRMtASPquCYFX6z33scxM9bas7Ozuq4hgylkzFg7Bbu0tDSZvIdOt9sdjUZAXuRN/Q5a0cqIOq5KwX//snq1f5DndjzGrtjVx73BYBcyaMFAy0eGma3+xgNYLZ78/ONwPB6/KJ/tDvehFa2MqOOqFHx/e2Ows2ut/ea7F0f129Go7vc3B4M9aEUrLknBb/U3gAdwcHBYls+A4XAfWtEKMKKOa1LwzPS3NwY7e3zUilZck4Lf6m8A/uBwaWnp6doTzs+Hw33REjCijpuk8IYLBlpmRCuuScGX5TPg9PQDUNf1Vn8TWFzIdn7aFS2NqON+UvDAyx++3f/lFVAU+dO1NWA42IPWiDruLQVv7TTGjJmi6NV1Axm0RtRxPyl4a5chxphBywXDhVa0MqKOe0jBwxQLMYNWtGImhTeiFWBEHfeQgsdO+UfMoBWtuMqIOj5XCh6mWIgZtKIV1xhRx2dJwcOUCxm0ohU3MaKOz5KChykWYgataMVNjKhjfil4a5djjJBBK1pxCyPqmFMK3ubLjIkxQgataMUtjKhjTil4my8zJsYTaEUrbmdEHfNIwedFb/x+TIfYnEArWnE7I+qYRwo+L3pAU7+DVrTiPxlRx52l4POiBzT1O2hFK/6PEXXMIwXPhVa04g6MqGNOKbwRrbgbI+r4kv4GJltZzpeMO50AAAAASUVORK5CYII="},{"name":"Guthan's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD/UlEQVRIDbXB34tUZRgH8O97ZmanfdQlUklw7TELZl6CuljCGCYYBhEWoWbJksJgA2sxb6Iu+hu6EAoCL7xQRJIi0RtZlGURkSUIYSEXPCThq1M4ru6M5+x5z3t+524sue3ObBfO5yOIJfpJEEv0kyCWWKaVTVzCsyaIJQCt7K+/Gv3m+CRxCc+UIJZYppV9cGzk5ws3iEt4dgSxxDKt7PHDldNnZ4CMuIyNaGUTl7ARQSyxTCv72ERde+bU2RkAxCV0oZUNoL6vOj11HQBxCd0JYokVWtkTR2qea+7ce3R95ncAxCU8RSsbwMfj73cWOp72XXfR6Ti2/QdxCV0IYokVWtnHJuphGAPYvKnYXvBO/zCDpxz68N2h57e0Fxzf971F33MX2+2F27fvAhlxGesRxBJP0cqeOFKz8K+BYj6O0ziJHzlDuVxuaGhLu+34vn7cfqy1djz/Yethp+MQl7AeQSyxmlY2gPHDFaywLAuwHDMUR0kulwuDJcaEvq8dz+886rRa80BGXMYaglhiDa1uAQLAe42RfN4aKBSEgI63JUkSR2EQRGEUhibQxviev3vX4OWpOQDEJaymlS2IJbrQ6hYgsKwxNpok6cBAPnwiiIIoDE1gjCm9Sps3Dxo/fDDvXp6awwriklb2R4feEsQSPWl1CxCNsdE0S5MkieM0CkITBkhTY6I9LxUGB4sQKOTzW18Y9P1I+6HnBT+e//XopzXPCwWxRE9a2Y2x0YsXLjXGDgRhFEVhugSh8Y2JXtyO4oBVLBYsCzmRA2AVrLyVz7LUBPG5n34RxBI9aWU3xka379h68sSZ0QP7Jy9dwYpqde+mLZvmfptrNufH3hnJ5fBEluEf5y/eADJBLNGTVvYXX07ESfz9dydHD+yfvHQFwGdHx69MTg0P77x/v+W6fqs1j3VkxGVBLNGTVnZ9X/X1N1779vgJLJv4/JPZ2ZsAtOu5ru4scYAMqxGXAQhiiZ60suv7qsO7dp45dQ7Ldu8ertXfnp29GZrQcbxmswlYQEZcxhqCWKInrex6vQoL01PXDn7QuKfuFoqFIIiiwPh+2Om4rVYLsICMuIw1BLFEd1rZleqbzw0UAGt6+lqlujdJ05wFE0SRCduuE/mLrVYHsICMuIw1BLFEd1rZlcrInldebv75VxqnaZqkaZoAkTGO4xtjomix1eoAFpARl7GGIJboSSsbQK1WSZGmKXbs2KZU03G9IAxi4zeb81iSEZexHkEssRGt7FqtkiJFijhN3MduGIZBEN+5cxfIABCX0YUgltiIVnatVrl6dQb/lRGX0ZMglvgftLKBDKsRl7ERQSzRT4JYop8EsUQ/CWKJfhLEEv0kiCX66W9GExXJ6c3t3QAAAABJRU5ErkJggg=="},{"name":"Guthan's platebody","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEa0lEQVRIDbXB0Wtb1x3A8e+1nBD/jFo/NAiK8M+oMvdcDZWQYlqMCYWNjT2N7mGlXdlDYf/cXvY4mkJbSghN05YMJ6IHq0PHaAo3juFOio6se3V8F2sIUmp5y6g/n0g04TJFogmXKRJNuEyRaMJ/450VjTmPd1Y0ZrlINOFC3tndvZ27d+4DojEL3lnOnMKKaMwSkWjCct7Z3b2dFXjm/eMnT9L+EQu12isbG69Z293Y2MiyoWjMeSLRhOW8s3u3dqAC4c6X9+r1er/fB+r12q9+/cuvv/p2MEiBLBtCKWr4iUg0YTnv7O7uW6PRuPpq9e6de/xYu92aTPxoNEnTIyhFDT8RiSZcyDvbam/nk9B4Y/P2J5+xcOvd3Vle/PDDYZoeQSlqOE8kmnAh72z7hgl5yPPQ7XZrtVqapsBWc4vZc0W/fwSlqOE8kWjChbyzN27+IhQhz/MQZqPR5MoVrq1XCbPnpLre2T+AUtRwnkg04ULe2Q8/+n3noc3PhLW1q5Urlcl4EsJsNqPXO4RS1LBEJJpwIe/sBx++9/cHDyuVyv5+h4Vms3lyctLvD6AUNSwRiSZcyDv7/ge/23/YuVq5muf5enUdGI7GIQ8nJyf9/gBKUcMSkWjCct7Zj//8x9uffg68IuudjmVha6ueTZ4xJcuGojFLRKIJy3ln4RSob9WZ0e/3d96+uVKp3Lt7v1arAWmawgqUoobzRKIJL/DOisa8wDsbx400fbodN1aAClA5LZ7LHz8+BtL0CEpRw4J3VjRmLhJNWPDO7rx94/69B6IxC97ZZnPz6dMsbjWK4rTCmZMiD3k4Pk6nU7JsCKWoYc47W6tfT/tHojEQiSYseGf3br3zr+Fo/8Ej0Zg57+zW1ma1KtVX14sihKIoTkPIw2CQAlmWwQqUogbwzt7cefOfh700HUIpaiLRBPDOisbe2bjVCIGu/QeUosY7W69fLwrW1tZWV3l9sz7LpyfToijyJ4+Pp9Mpc1k2FI0B72yrvX38JEvTIyhFTSSaeGf/8N5bf/nrt1vNTeZ63UMoRQ3gna3Xr1+7tjabAbPZrACKgv+YTqdZNoSSMxEQx40sGwFpeiQaR6IJ4J396P13vuscE3hu6Mf93kA0Zs47W6tdB6rVtdkZVlfJsmdZNuRMyZmo1TYhhLEfX1tdfaNR/eT2Iygj0YQ57+zHf9r76psUGPpxvzeAUtQw553lHCUgagDvbKtt8olnrts9hFLURKIJc97Z3/7mTTeYEBj6cb83gFLUsODd9/yYqGHBO9tqmxDykM+A7Ub1b7cficaRaMKCd7bV3ibg/bjXG0ApavifeWfjuBHCDOh2D6EUNZFowpx3Fk5b7ZhAp3MApajhJXlnm81NoNvtwYpoHIkmLHhnW61toNM5gFLU8JK8s63WNtDpHEApaiLRhAXv7K13d7/84i6UooaX552NW9uA7RxAKWoi0YQXeGehFDX8v7yznClFDRCJJvzcvPte1DAXiSZcpkg04TL9G4YMUS5AzhOmAAAAAElFTkSuQmCC"},{"name":"Guthan's chainskirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE60lEQVRIDbXBwYscWR3A8e/rTmdmXsTtg7FxGOYVaw9d1TGhmWUcGGKQvYgsXjzuUdGLtxVcBPEgnvwHBAXxIHj05kUIsiwLEhxaS1oLsjClzUDZQ1Kp9FR39Xu/V/a0NEzIjklW8vkobSJeJ6VNxP+nTBNWtOnxHKVNxKdSpgkr3WB3e2f7gw8/ggagTY9LlDYRr6hME2Bw+9Ywjg8O9s+L82azGY9GP/rJD376459BA9Cmx4rSJuJVlGmyP7hzPBwCh4f7gPdeBO9lMVuMkqTf7Y4ePoSGNj1AaRPx0so0ORjcEZHjOD46OhABxHsvgvcCMpsuzudzrB1nE6i1CZU2ES+nTJODwR0ROY7ju3cPvfci4j3gRcR7QER4+rgAZtNplhfa9JQ2ES+hTJOD/YFYexzHd+8eeu8BEfHei+C9ACISx6MgCHBuZm2WZdBQ2kS8SJkmB/sDsfY4ju/dO/Qe770I3gt4EfEekOFw1A0CB845O51meQG10ibiRco0AQ/cu3foPUveexHx3ovgvQDDYcwl7XY7zwuolTYR/1OZJuB/+P1v5MV5/PdzwHsPiIj3XkSOj2OgGwQOnHPWWqoqy3NoQK20ibhCmSbA177+9le+3P74439vbl37+S/vHx0dACLiPSL++HgIdIPAAc45ay1UVZXnBdTahEqbiOeUaQIcHb1lRd5447Nf3GkkJ4s/3v+QtcPDfe/9gwdDoBsEDnDOWWuhqqo8L6DWJgSUNhHPKtNkMLh1cvKv/pd686p695v93//hn5NHj+LhiLXvfOurisYvfnWflWBnx1lrgarK8gJqbUJWlDYRzyrTZDC4JSKLxaIS9+133/rt7/5WPD0fn4yhAXzvu29fazWfPJn9+jcfsLLT6VigqirI8wJqbUJWlDYRl5Rp0uvvbV2/vhAZxSOg1++eF0+tJcsmUIN6/713Hj9++pfk/E8fPWCt0+lUVZXnBdTahKwpbSIuKdOk19+7fr05my7cEu7GxmaSPORCA3j/vXf+/Ncn84Wz1byq7HAYs9Jut/O8gFqbkEuUNhFrZZr0+nvNZhOknFW4JabTMbTzvABu3w5ns3LrM1oWshBx1fzk5JQLHhpQaxPyLKVNxFqZJv3be7K0cM7hnAM7nVZ5XgC9/l4ySoJu4Jy7sbEp4pZmzrZYao3Hp1BrE/IspU3ESpkm/f6eiFSVA5xzUzsF8qwAev09EWmCAOKcAxzgHOPxKRdqbUKeo7SJgDJNgmBX641yUbm5Y2Vqp3lWADvB9o2NTRFo4sThHCsOxienUAPahHwSpU0ElGnS7e7O5zMLWGjRgvF4AuwE2zc2NkWgiROHc441h8Vm44k2Pa6gtInKNAmC3WvXODvLWcvzAmpQ3d6bCM0mIm5p5mwLLBey8YQLtTYhV1DaRGWadLu7wNlZzkqeF1CD6vbeRBwrDtzcWWtZapGNJ1AD2oRcTWkTAWWagG+320CeF1CD2tnZ/vwXPvdocsbabGaBLJtwodYm5EWUNhErZZqAhwbUoDqdm1C1WhvWsrS1teWcG49PuVAD2oS8BKVNxFqZJlBzQXU6N1st/stalrJsAjWgTchLU9pEPKdME/DtdntjY4OVLJtArU3IK1LaRHySMk2ATudmlk24UGsT8uqUNhFXKNN/gIIa0CbkU1HaRLxOSpuI1+k/p8bePFP0kUIAAAAASUVORK5CYII="},{"name":"Guthan's warspear","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACcUlEQVRIDbXBz0vTYRwH8PcnosPnVnSr+ECX5/soDFlIIEOGDCUUL0Z0KuoQJEUHocAKOknRsf8i8mKKuWTJGJKsxpj4bQ9K+pDskIFS+JjOsWAUGDrdj6+vF7FoAM6aR8P3X4y8YlEIFLFoAM6a4ScPksnZVDLNohAcYtGocNZEuzp2d4upZJpFISDEolHhrBm8d/vj7KdMJgeUWTwEgVg0Kpw1Qw8HJycThW+FjY2fqGBRaA6xaPzjrAHw9NnQxNi7YrE0P+8DJ1gUmkAsGns4mwdo5Pnj9fUN3zcTb6eBMouHRhGLxj7OGgDtl9vSc1mgzOKhUcSicRBn8wCFw6FMJgeARaEhxKJRnbMm2hXZ2dmaTX1mUagfsWhU56y50h8rbe/GpxLACRaFOhGLxqGcNQBivaHpiRxQZvFQD2LROIqzeYCi3a0z8QUWhXoQi0ZtnDUtnTE/Oc2iUDNi0aiZs6Yl0uWnEiwKtSEWjXo4a6I9rTNTCywKNSAWjTo5azq7vWQ8z6JwFGLRqJ+zZuBa3+jrcRaFQxGLRv2cNdFYx/fCmu8vsihURywaDXHWAFDqojFfWRSqIBaNRjmbB2jgat/om3EWhYMQi0YTnDVt4dYzZ08n4ikWhX2IRaM5zppYb2hl+ceSX2BR+B+xaDTNWdPTH5oaywFgUdiDWDSC4Ky5cev6Fz+fnsuigkUBIBaNgDhr7ty9eerSh/cvT25u/lpdXWNRxKIRBGdNJNK+XSyev3BueWklm10AyiwesWgExFkTDod+F7dKJRh/ESizeMSiERxnDf4qs3gAiEUjUM7mAbB4qCAWjeNELBrH6Q++v/phvXhySwAAAABJRU5ErkJggg=="},{"name":"Karil's coif","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD4ElEQVRIDbXB0WvbRgDA4d9JzdxcGtcd7dhcp2dMgnQOLqYQtqf97XsaK4Vg8hB6EIJVGYMa2h12ImNLJ81W6jVlaeMO8n1CKs19ElJp7pOQSnOfhFSa75dGhttIFfAlIZXme6SRAfaDDmu5y4EH/oPc5cOzd4BUAWtCKs3G0sgEvYOr6RU5O/Udh8OBIycH8jwnJyNLRhdSBVSEVJrNpJHp9kJgMp1Q2ZE7zjkgdzmV2XS2tbWVZVmSXEgVAEIqzQbSyPReHe7Wd+0HO5lOWMp5WH+IY3o1ZSnj2tb2VpZnySgBT6pASKXZQBqZVrt5aS+ttUB7vy235WKxmF5N+VfG9u42ObN8lowS8KAUUmnukkam9+owPo+ttXxFq90i58lPT6Yfp7YCHpRCKs1d0sh0e+E4HltruUvQDZJxYq0FD0ohleYuaWQajToVay3fFHQDc2pY8aAUUmm+KY1Mr38YD2NuY63lhsbS08bwbMiKB6WQSvOlNDJSBWlkWOv1D+NhzIZq2MSy4kEppNLckEam0ahbO4GCpQb9Tt8VLh7GbKDZbo6HY2steFBKFQqpNGtpZBqNOmDthE+K/lHfZS4exmygudccx2NrLXiAVIGQSrOWRqbRqAOdoHP8egAliP7Ry0W2GA/HbKC51zyNT7EeKwV4QipNJY1Mtx+Oh2OgE3SOXw+o9I9e4nA4lgqW4mHMbfbaewu3MLHBelCAB6WQSlNJI9PtheN43Ak6D7clK8Wff/xFpX/0EofDUbAUD+PmXpMln/FwTKXZbi5mizNzDgUrHpRCKk0ljcyvv/9mTk4PugdbP9RYKVzBfJZSGbw5AXqvDinA45rv+7OrGT6+7+P48PcHKsnoAkqpQiGVBtLIBN2DxtOGOTGPHj16sd+GwhWAm8/mXHM4HDf4vg8M3gyAVquVkbGWjC6glCoUUmkgjUzQPWj82PAf+O/O3lF53nkxn6VcczgcSwUrHu/fv6eSjBKg1WoBGRmQjC6glCoEhFQaSCMTdA+e/fzMw8Pj/O05kJHNL+dA+6DtnGOpIB7GtVqNLa4lo4RKq9UCMrJkdAGlVCEVIZUG0sh0+6Hv+Y/rj1ny8PBOjk+4Ta1W+6X93IPj1wNuUUoVsiak0kAamW4/9PGB3fqu53nzxRxwrDlXAEXBJ97gzQBK/kOqkBuEVJpKGpluP/TxgcVisbO7ww0FULB0OZmcmXNWSqlC7iKk0qylkdkPOnzTmTmHEpAqZANCKs0NaWSo7Acd1s7MOZ+VUoVsTEil+VIavWVF8FnJmlQh30NIpfmKNHpLRaqQ/0tIpblPQirNffoH1FbKmMUuTy0AAAAASUVORK5CYII="},{"name":"Karil's top","base64":"data:image/png;base64,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"},{"name":"Karil's skirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD4ElEQVRIDbXB0WsUVxTA4d8dU9sc4nYKglACN4SVmVmIiBAKQXzw/38oFYIX9mGmDMFNantJdeLunDPT3dFoQty4aen3OfEF/0FTBfEZ6znxBf9KUwVgvPfztDxhID7jBie+4I6aKgAHk33ATAEzff+Buj4BxGdc4cQXbKypAvDs4HGHYSwZYPxtuqWqtHpBPTsTn3HJiS/YTFOFZ4dPgNGPO/XJG4zP1PR7MF1qL9r5bHYuPmPgxBdspqnCs8MnwPv3FwzMjCVDUZQtVGn1gnY+n8Vz8RngxBdsoKlCNnnMPTCuMjM1BVQV2AK0vWjn8zkxnovPnPiCDTRVyLJ97t9jyfjIMAw1BVQVpaX9Dmh5N5/HeA69E1/wLU0VJgc5A8NYMpbMDFBTQFVRfno4WlwsYvxjNjuHXnzuxBfcqqnC5GnOkvGRYRhLZgaoKaCqKFs/bKlqe9HOZmfQi8+d+IJbNVWYPM1ZMj4zDMPMADUFymm5N95Dl1qgrs+gF5878QXrNVV4lI7mrMQYJwcTBmYGmBmgpiiKttrSsjSbzSCBXnzuxBes0VThUTqa80WMEZgcTMwMMDNATVEURWnbd7PZOSu9+Bxw4gvWaKqQpiOuizEyyCaZmQFqiqIoSl2fQA+Izxk48QVrNFVI0xFfE2NkMM7GaoqiKEpdn0AvPueSE19wQ1MFIE1H3BDjeZqOuCJ9mKIoWpcn0IvPucKJL7iuqcLLl0fadb/9eswnkUGMSZqOuGEn3anLE+jF51znxBdc11Th+YvDTrvTt39NwzRNiRFIGKTpiBtiPIdefM4NTnzBFU0Vnr84bLV9e/qnAqplWbOSQA8uTUdcE2NMoBef8zVOfMEVTRWgY7C3t6tKXdeQMEjTEV9EIMYEevE5azjxBZeaKjx/cdh13embM4VyWu7uPnpXzyJJlu0b6FwfPJBXr47TFCKRBHrxOes58QWDpgrQHR0dnpyeoUvUdc1KkmX7Bpju7MjCzBY2n38oyxoS6MXnrOfEFwyaKkDHYHdvty5rVhJWOi5NJpmZzedalr9DLz7nVk58waCpwi9HT2enf5bTEkghkgBZtm+ws729WCyOjwOfJNCLz/kWJ74AmipAB+zu7aJtXc9SiCTQjbMxptvbsrCFmU5DCQn04nM24MQXDJoqQMcXCSsdg8lBtljYNEwhgV58zmac+IJLTRVY6SBhpRtn4+3791+9OuaTBHrxORtz4guuaKrX4KAHBx2D8XhvOi1ZSaAXn7MxJ75gjaYK0PFFAr34nLtw4gvWa6rASgcJ9OJz7siJL7hVU70GB734nLtz4gv+T/8A3zArLnBDArAAAAAASUVORK5CYII="},{"name":"Karil's crossbow","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFUElEQVRIDbXB309b5xkH8O9r42P7cQDTOlhlDo9DjXwOGcyCsmgZiiJkJUKonfrjH+hF1YtedNIq9WYX0zqpf8WudjFpqybtArExxFCE0Bir5cQN4y0J9QuU1IS0Z4a89onNeVdQoxHxIyPTPh9B7OC5aCUBEGdxKkHs4Iy0kgAGBwciFJ6fWyTO4mSC2MF/TSsJYCw/Ojk909dvt1JkYaEIGGJbK4kDxFkcIogdnEwriUPy1642m03LsqZmZjOZ7o4XX1hcKAIGEPnrV3d2HzXqjULhNnEWTwhiByfQSo5eHXnsea+80v7w691PCw8j0WgoFHrjJxc//PknqVRX50uJeHt8ZvomgCsjwzv/2imVlgEDgNjGAUHs4DhaydGRK3XPu7e21v29aLVak3crAH72/li8nX77yWdaPyqXN9586zXLCj3Yfli5v7WzUy2XNwEDCOIsDghiB0doJQEMD+bWVlc9IJEIb29XXBffeufta/fu+WjB56uraCISaQHQ1hbf2tre2NjEgRuj1/48M0ucBSCIHQBaSRzy8S/fWFv/+g+/L3iA61ZxyGD/pRc6OsLtUcDAx8TEVCqV6uhoK5WWAdzIjzbq9UBLy/TsTcAQ24LY0UqODA95jQYCgQD2lb/88gf9nX//x7rrVgGD/xDJ5PlL2Wy0PQIfPg74/uTkzMcfvfX4ceMvU5uNRiNGNDM3DxhiWxA7Wsnh3ED98T4Ale1tAAPfT96cWwEMsY0ntJKp1PlYrDWT6ZmYmBobvw7fX1kpd3V2ZjItjUZzauae53nZnp6FQhEwxLYgdgBoJTPp7nqzubuxgXjcdavYZ4htPE0rGY+3/ejHP1y5u9rbky6VljsTidVyGUBfNrEkt13XfXUsNzR08Re/+iNxVhA7OKCVBHzsCwAGALGNp2klx8fzPr7lqy/Wq/pRw9318J30hXPF0iaA/v6u1shLLaHQzfm/CWIHT2glsc8Q2zhCK/n6m+P1ujc5MTU2lt/z/VsLBQ/7XLeK7xhApFNtyc6eKNHs3LwgdnCIVsvENo6jlRwbzwM+fOz5/q3iHc/zXLeKfQYHiG0AWskrw0O6Xi+W7ghiB8+ilQQwMjLc2t4KH3u+f2uh0JqI3727BhgAxDae0EoO5gYoHN7Vuli6I4gdnEor+cFPb1y48OKfpr+anJy+fmP0VvHOy73ppc+k61YBQ2zjEK3ke++O/nV2fUmuAEYQOziVVvL113JWKGRZwYvpRHtb7Ne/KSwtSSAAGGIbT9NKDucGYufOzc7NA0YQO3gWreT1UTsctqxw6J+fVyNBIIhCcQUwxDaeppXM9V8KRyILi58CRhA7eBat5OXLQ9FYtFi4faErEQyiWFoFDLGNI7SSfdley7JCweBi8bYgdnAqreRgbqBeq21WKl3JeDCI0mYZbgAwxDaO0Epm0t1WOByxLB8QxA5OpZW8PJjzfb8R2NvzsXV/q1J5ABhiG8fRSgJ+MpmMt7bGolFB7OAEWkkA+WtXm81mtD1Sub9dKNyOw3cRAAyxjRNoJXGgv88WxA6Oo5UcfzUfo9hX65WWen0niMXFImAAARhiG6fSahn7hCB2cBytZDbbY1nWN99Ur7zd+N1HDwBDbOOMBLGD42glM5nuJtDcqXW/nJ6fXwQMsY0zEsQOjqOV7OvrrVZdNLBReQAYYhtnJ4gdHKGV7Ovr1dqr1Wqe57luFTDENs5OEDs4QiuZTnfVag3P81y3ChhiG89FEDs4QiuZTJ73PM91q4AhtvG8BLGD42glU6mujY1NwBDbeF6C2MEJtJKAIbbxPxDEDv6f/g3eDW5NVyLpQQAAAABJRU5ErkJggg=="},{"name":"Karil's pistol crossbow","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEwUlEQVRIDbXBf2jUZRwH8PfzfHc/9tlud87Nyzn7TN34fp+NnV9OrtVYJFIbYymW0F8VBRERSKSRBAXZH0VE//ZHf5r9ERRKdVxb47rWODaGY5soPkHlEyLkL1DzWXM/vuHRUNlum4avlyBWWI41GiXELv4HQaywhDU6kaxp3dYSj8dzuTyxi/sliBWWsEYnk/WPP/HYpfOXCsNFICD2cF8EscJyrNHJZL1qaSkMF4GA2MN9EcQKZVijmxobXj/46ttvvk/s4r4IYoUyrNE7fV9WU8+zTx06cJjYxb2wRhO7glihPGt0Y2ND06ZNw6NjKCF2sSJrNEo60v7o+IQgVliRNTrtpxbm55WiLbzhw0+yxC7KsEa7zVsrKysjodDo+AQQCGKFFVmj9+3dsaWpbv362LoEvbb/CBAQe1iONbq91aNoNBKNDhVHgEAQK6zIGv3eoafjiaofhy725/J79vZ8e7yf2MVyrNF+e1tNLDZUHAECYk8QK6zGGp1M1m/32xwpc7k8bgmIPSxhjc74qXhNzeDQMBAQe4JYYQ2s0d3dOx1HQiIarTz2TZbYxRLW6N29qY5Htr17+BgQEHuCWGE11ui+vicnJ0+3tXtSApC57CAQEHtYwhrdmdlRHDsBBMSeIFZYA2t0e+vWhs0P9/fne/u6c9lBAMQulrBGd6T90fEJICD2BLHCGlijn9nXd+PvG46UkBJAJBQ6fjxH7OJu1uiMn6qqri4MF4ldQaywNtboTNqrTTZICUBKYHLy9Llz54ld3MEanW5vq47FhoojQCCIFdbGGp3J+LW1CSklpAQWpJTZ7wYBELtYZI1udVs21NdHwuH+fEEQK6yNNbqp+eHp69PbtysnFJYAJK5euGpnZsYnpgAQuwCs0S+/2JX2ef+BL4FAECusmTUaQE/vLimRyw727e4GxPTV6X+mp5vdyJGjRZQcOtj78ac5ICD2BLHCIms0SohdlGGNbmxsaN/uAVICkJAQc9Pz7anIQrDwy89/OY5TXVU1UBgCAmJPECuUWKNb3Zaw40jHGT95itjFcqzRnZkd8bo4pMxlB/p2d586+Wtzc9Oj6RqqCv/Qf35hfp6qqgbyBSAg9gSxAmCN9tvbpOOEpHQcR0o5PDoGgNjF3azRnZkd8bo4pJRANjvw/AvP/f7bH8XiCQBpP1WbSDhS9ucLQEDsCWKFEmu027zVWbR3z7YLF6999nmB2MUdrNGdHZn1icTl61fC0Ug4FA6FK+Zuzp09+2e4MhwKhZ1Z1NXV5QbzQEDsCWKFRdZo3KGzIzM7MzM2MUXsYpE1+uAbPRsfSrz1zle9vbtCkZDjVEghLl+6UigUcVtA7AEQxAp3sOYMbhNdHZmZmZmxiSkseuWlroaNiQ8++h5AZ1emoWFjNBI++sXXuCXAImIPJYJYoQxrtN/qVcdiC8Dmzbh23ZqzN6PhcE0sViiOAEhnUuNjU7glAEDsYQlBrFCeNXpXV2dFRUV3T9Lam/mfLs7NzlY4TqE4AgSAAAIAxB7KEMQK5Vmj035qfGIKJRk/ta62dmFubnBoGAiIPaxGECusyBoNBPiPANCR9kfHJ4CA2MNqBLHCvbDmDCCAgNjDGghihQdJECs8SP8CrDe8jFzgDocAAAAASUVORK5CYII="},{"name":"Karil's off-hand pistol crossbow","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEkUlEQVRIDbXBb0jcdRwH8Pe3zdSPf/ZbYMKmfo5w3Pe3sebcTLsOERFtHIxJPVks6FEPet6DCoqI2JOCHhVERETPahFrEprI4Q6ZyOSa6PxujvmVtXZoU7zu6+887/ttEySPO6OUvV6C2Md/YLTCJuKw0aq7J/rw4XJychpAT2d0eDRBHEYpgtjHvzJaAWhpPVa2r6ympnpkJAEgGm178CA1N7fQ192VzmQqyspGEmPYQhzGFkHsY2dGq97urqGROIBw+DnPq23kJsCurQXTN2/Nzy1c/OjV7y/dQj7f3lF3+NDBq1eX89YOx0eJw9gkiH3szGjVHY08tX//cHwUQGdnxwGvZiPvrLWLqaXJyRvvvh27/8fyN9+NhUJ1TYe8jVzt0+Xl8cQY4IglAEHsYwdGq77urkwmAyAWa3zn/R9DzU0A5ufmPc978aUX7NrG4YaNr79NAA4QAOrr646EQonxCcARSwCC2EcpRisA7W2n1O3bF86frqwov349XXWg0gKwzuIRm02vP0ilZtRtwBFLo2cB0dbaMjGZBByxBCCIfRQxWsV6e06erLgyeCOZXADw+muRu3dyVVVV+6vKYJ3FIza9lE6MTwCOWGKT0aq+vu7C+dZPPxskDgMQxD6KGK06Ix3ZIBifTAIOj4l6r/ZIOHzgWQ/WWTxil35fmkjeAByxxBaj1Vtvdn/+5Qg2CWIfRYxWnZGO1XQ6OTUNOGIJwGjlebXVXvWJY0cHBobO9cfu3L07lZwFHLHENkarttaWsn37AAhiH0WMVp2RDjUzk1pZBRyxxCajlefVlpeXt54+AWtv3pydn78POGKJbYxWnlcbamwEIIh9FDFadUY6RseuAY5YYhujVSzWYwFYm7d2aDAOOGKJQkYrD9ZraBDEPooYrT547+yHH18GHLHENkar/ldiQZCFtXlrf0tOp1KLxGEUMVoBEMQ+ihituqKReGIMcMQS2xitzvWfya7nfhkY6u3rrqmpvvTDFcARSxQxelYQ+yhktOqKdKwFwfhkEnDEEoWMVmdiPbCPlZeXXb78K+CIJUoRxD62MVpF29uyuVwQBFMzs4AjlihktIq2H6t5pt5aOzgYBxyxxA4EsY8tRqv21pZcLhesr5tsdn5+AXDEEoWMVv39Z4Iga60dHIwDIA5jB4LYxzZGK/zDEUuUYrT66os3Mpn1TCZIp7MXPxkgDqMUQeyjkNGz2EQsUYrRKtTc1P9yePHPdBDkNjbyP/2cBByxRBFB7OP/M1r1dsvldEVlZcXo6DXAEUuUIoh97IrRqrXleZvPJ6emAUcsUYog9rErRqv29lNleCoxPgE4YolSBLGP3TJa9XRGh0cTgCOWKEUQ+9gto1Wo4VAoFIonxojDKEUQ+9gto9Xx4/JgjTc6dg1wxBJFBLGP3TJanT3bl83lstkgPjJGHEYRQexjt4xW4aNHsia7sbF2794i4IglCgliH3tgtGpublpKr6ykVgFHLFFIEPvYA6NVfUNd9q/sysoq4IglCgliH3tjtMJjjliiiCD2sWdGzxJLlCKIfTxJgtjHk/Q3NYokHlo4y2gAAAAASUVORK5CYII="},{"name":"Akrisae's hood","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEiklEQVRIDbXBz2tURwAH8O/oJo1jBatp9TapJOybUEEskhLCEpYQkUIpxFPIxdCT/Yt6k148eczBIhJEBAmE0EDwadSdsKw+lpKXt7vz5vdrsrKSkB9uKP18CGUc/4EUMQ6irIx9CGUcpydFjK7J6Z9KpZJzzjrvbQjBrq38TVkZPYQyjtOQIgZQqU654EqlwdDlnQ0heO+ttd76jfVXlJXRRSjj6I8UMYDp2QqA0DU4MBQK54zTRnvvQwjGepPnm/E7oKAsAkAo4+iDFPFUdRIBpcESgNDjnT975qzSKoTgvc9VDg+lVb3WoKwMgFDGcSIpYgCV6lRAGBwYDEXYBeC7q1eHhr568/q11dZq6+H3GA8PpVS93gAKyiJCGcfxpIjHb0TDw8MICAgj1773XUPnzv35x4PF33/b2U63akIpBcBbb7xxxuWtPEmaQEFZRCjjOIYUcWWmAgQEXBq+FEI4//X5hw8eYp/5xYW3r99oreFhgjG5UVrZ3CZJEygoiwhlHMeQIh6/HpV/KHvrfeGXHi3hkHv3F7M0e//2XQgh7+TeeOWUzW2SNIGCsohQxnEUKeJKderylcvGmKVHSzje/OLCzvb21vstY4w22ilnrU2SJlBQFhHKOA6RIq7MVEoDJWfNsyfPcKJ79xfF+9rHDx+98dpop5y1NkmaQEFZRCjjOEiKeHp2ujRQctYs/7WML7m7cDf9J218aHjjtdG5ynVbp2kGFJRFhDKOfaSIq7erpcGzxtjlx0/Rh7mFuZ3tncZWw3uvpU7TFECaZkBBWUQo49hHivj2L7ettk8fP0F/5ubnWjut+lbdGNNKW1prAGmaAQVlEaGMo0eK+M6vd6zWMlcvlp+jP3Pzc61Wa2N9Y6g0pJSy1iZJEygoiwAQyjh6pIhnfp5RuXr+9Bn6Nj1b7bRbWZppo3OVa6vTJAMKyiIAhDKOHiniK1e+TZIEpzFVrbRb7XaWKa1sbgEkSRMoKIsAEMo4eqSIb038uPJyBacxWZlstWUrazulrLVJ0gQKyiJ0Eco4eqSIb07cWH25ir5Nz1Y77U6WptrovJUnSRMoKIvQQyjj6JEiBgJOo1KttDt5lmZKd+q1BlBQFmEfQhlHlxQxEEbLo/BwcLXNGvowOT0lO+121lYdVa83gIKyCPsQyji6pIjL42Pee3g4OAC1zRq+ZGJqUspWK8trm++AgrIIBxHKOHqkiG9O3lh9sToyOoJdDrVaDce7ePHi2Hg5S9N44w1QUBbhEEIZR48U8cTULWttCGFtZQ0nGhkdcc7Vaw3sKSiLcBRCGUePFPH49ejCNxess8EG7z0C1tfWcdBoedR5B4dabQsoAFAW4RiEMo59pIjL42Pee3g4OHzi8JmDq9fq2HMGKCiLcCJCGcdBUsTl8piHh4eDw2cOuxyczW2SNIGCsghfQijjOEiKuDw+5r3HJx4ODrscHBwc6vUGUFAWoQ+EMo5DpIjRNVq+Bg8Hh10ODg4O9XoDKCiL0AdCGcdRpHiFPQRHKCiL0B9CGceJpHiFgyiL0DdCGcf/6V94jeZ/68QaxgAAAABJRU5ErkJggg=="},{"name":"Akrisae's robe top","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEzUlEQVRIDbXB0WscxwHA4d+uJRdNdGGCnSyExXMNG/ZWYAhWlDRCHEKoNnlo6VP/0JZSZIwwekryYAyhRlMfYVcdn1klmIllj+60u7OVtndIriO3bvH3BUJlvEuBUBnvUiBUxrsUCJXx33GF5jVCpbxRIFTGG7lC05HyfWst/y6kI1TKLwmEyvglrtB0oujD6XTKBdZaKSUz1lo6IR2hUi4IhMp4jSt0HH/MTPXixZQLrLVSSl5hQXLGWhsKlTIXCJXxKldo8HRu3rrZVM34H2M61lpASmmtBaSUdOR1CeSjnJlQqJROIFTGa1yh+8kNOvkoZ05KyQXWWubiOAYqqtL8CK1QAzqBUBmvcoW+/bvf3v3zTpIkXOHUSI+klLzCMiOttXE/pmNyE/f7Jj8QKqUTCJVxgSv05p3NMAwXFxd3/vTXJE0mLyfGGCklc599cevhd7v8i8VCFEVLvSXgV0uiOWkm05cmHwuVAoFQGRe4Qm/e3gR/dfHq3b/cjeMYMMZIKZm79eWtB98+AMspi4UoioCyLG9+drMB9+IoHx1AK9QgECrjAlfozdubz3+2z8pnLFBPasAYI6Wk8/lXn3vw3j/89gGnrLUQxRGnKk7Ja7JpGOnH0Ao1CITKuMAVem199en4KbCwsJCP8jiOjTFSyi+HX7Wtx7cevPd471sefrdrLVEclaaM4miRxaqqlnpLdV2bfCxUGgiVMecKvba+2jTN4ZNDFlg4xcLR5Kg0JZ2tr7fx3rfeA97v3dujE0XRlOny4jILVHXVe683eTkxZgxtIFTGnCv02vpq0zSHTw4BY0ySJEeTI6A0JZ2tr7d948Hfv3ufuSiKpkxtafv9fl3XVVUtLS3l+QG0gVAZHVfotfVV4On4aVVXpSkhTJJPRqNRFEelKZnbvLN1f2eXuSiKyrKUkbTlc/BxP66Oq16vN5lMjBkHQmV0XKHX1lebpjl8clhRlaaEEHySJEeTo9KUzG3e2bq/s8tcFEVlWXImBB/346queu/16mmd5weBUBkdV+jh1ob3Ph/lVVWVZQnhH/74+2c/PdN/16Upmdu6s7W7s8tcFEW9Xo8rjPQP4ON+TM31j64fT471o8eBUBkdV+jh1ob33hhTT2pjDITAcHtj794el4uiqCd7wEj/AD5dSZumWX5/+WRycioQKgNcoYfbG74zzsc1tckNhMBwe2Pv3h5vlK6k+tFjzvh0JW2apm7q3nLv5OQkECoDXKGH2xs3fn3jm71v6qY+ZXIDITDc3gD27u1xiXQlBfSjx5zx6UraNE3d1MmniTt2gVAZ4AoNfrg1HD8Zxyo+mZyMx+N8dAAkySdXrl7RjzSXiOPYGAMhsD78zbUPrx1Pjvf/tv+B/OD7h98HQmV0XKHBA0ma1E2dj3IIoYUgTT/VWnMJGUlbPocWAvDpSto0zUiPOBMGQmV0XKHBcy6EVqgB4ArNf9AKNQBcocFzLgyEyui4QoPnXAitUAM6rtjnckIN6LhCg+dcGAiV0XGFBs+5EFqhBrwNV2jwnAsDoTI6rtDgmQmhFWrA23OFBs9MGAiV0XGFBs9MCK1QA96eKzR4ZsJAqIw5V2hmWqEG/K9coZlpA6EyLnDFPiDUgP+PK/YBoQaBUBnv0j8Bxs91D41pTeAAAAAASUVORK5CYII="},{"name":"Akrisae's robe skirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD7UlEQVRIDbXB32scRQDA8e8cCUvGq6y/GCpHZhDq7USieRFKkVLEF/9nEalS0PgiBenAPdziEhku4BDSievO7JrbNpLYnE0Kfj5CassbibXjEqnnXEdIbbm9WDulPmjblgshnDCSes4lQmrLLcXazecfeX/MKISglIK2bTkXwgkg9ZyRkNpyG7F28/lHQM6klJbLJReUUm3bAiEEmEg9B4TUlhuLtZvP70EGck7Hx+EcI2NmsJVI3dlp23IuhBOp50Jqy43F2kHPSKkS8D4wMma2XDZ7B/tHy6dQAiEEmAipLTcWa/fl11/2OfWpf/zt44ODfXLOrOWcT06ed123s7P98f4nP33/YwgnMAipLTcTa/fg0f2cct/3h08ODw72IZPJrD19+itgzMwefPb051+apoEJDEJqyw3E2j14dD+n3MPhDz8CxhjWEnBHvvVHfE5ia2sLUkp0Xef9CgYhteV1Yu2M2VW7qu+h7w+fHBpjeCkBy2UDlCNIKXGuaY5gEFJbXifWzpjdRLr74d3DJ4fGGF5KjBJbb5d3cs7+tyNgOp02zREMUldCast/irUzZreQRc4ZWLgFI2MMJGC5bIC9g7187q987BcEAhMYpK6E1JbNYu0efvWFP/JAznnhFkqVQNsSQmA0M+add+/kLr9w7I+LaeGbFQxSV0Jqy2axdvO9e0DOeeEWgFIl4H0AyrIMIQDGmLOzs/K90h/5Ylr4ZgWD1BUgpLZsEGs3379HJpPJLNxCqRJoW14o3y/P/kw7W1uJBJyendJSTAvfrGCQugKE1JYNYu3me/eAnPPCLQClyrblHyEEYGZmnEucdqe0hHACg9QVIyG15TqxdjPzIYmODvCNZ1SWJRdCCMaYROJc4vT0tCgK71cwSF0xElJbXhFrBz0wm806Ot94NpiZGdClDthmu6PzzQoGqStGQmrLK2LtoGekZso3nusopbZ3tkl0dHSwjW9WMEhdcUFIbbkq1g56bqBUJedaiqLY3tnuzjrvVzBIXXFBSG25KtYO+tls1tH5xrOBUqqlpeWF6XTaNEcwSF1xiZDackms3cHnnx7/ftw0DZsppbz3/NsEBqkrLhFSWy6JtYOeG3v41aPH33zH2gQGqSuuElJbLsTaQc8VE9Z6Xm8Cg9QVVwmpLZfE2nHFwJrgpZ4LZVkCIQTWJjBIXfEKIbXlqlg/44LUFaNYP2NNsNYzKsuymBa+8TCBQeqKVwipLbcR62cgoAfKsiyKwvsVDFJXXEdIbbm9WDvoAaWU9ysYpK64jpDa8kZi7aCHCQxSV2wgpLa8kVg76GECg9QVGwipLW8q1g4GqSs2E1Jb/k9/A3X5+Nzr5IvIAAAAAElFTkSuQmCC"},{"name":"Akrisae's war mace","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADkklEQVRIDbXB/0tbVxjA4c9JjKlvhwRWJ5Otr5TIuScjQ4SQUi4yCmPsl/67pWWISJBJmbilCzm0iIc6IRNZluqpTsndEiZNWOuX1j2PEXVcTQweELVchxF1jIvBA6IWiMEDojYGv/zN/ZM3pxsbPzEkarkCI+oYEYOvVBbu3Pl0be1H4NGjb4+PT58+XQWWl+8fHsbNzV/StAY0Gs9ELZcxoo4RMfiyvTf/5RxD+cIE8OTxCuRq9cVCPp/L5YBGYwNykIkmXMiIOsbF4L/7/uGTxz9wztpyfjJ/W24XCwXg+XPf7fYgE024jBF1jIvBQx+oVivNZosRaVoHnr/w3U4PMtGEyxhRx4gYvLX3Zj//bG11nbdyDD1Ia0AOGo0NyIlaLmNEHeNi8NBnqLpYebWzNz8/t7XVBh6ktfXGBgM5yEQTLmNEHeNi8NC3tuz9NvSri5VXO3tLS1+/PjosFArrjWcMZKIJV2BEHSNi8AxVqsnB7wedzj70GapUbZ58s9lmIBNNuAIj6jgXg19evg+8OTk+isetZpuhcvnu3NwcMDExsbKyxkBO1HIFRtQxIgZfqy9OTcnZ2el641ma1k5OT49eH7VanrdykIkmXIERdYyIwafLNaB/1ieXY6j7Z7fV9MDs7CzQ6ewDopYrMKKOczH4NK0BfaDfPzj4o9N52e3mKtWFVtOXSqV6fSmDn7c2gU6nJ2q5jBF1nIvBp2mt0diAHGDtPe+3gUp1odX0QJrWX7zwDBQ7nX3IRBMuZEQdI2LwDGQMGMgYMPyrD1hbBrzfhkw04UJG1DEuhrZowrgY2mCgD8zPf1Es3vJ+GzLRhAsZUceVxeAZStPa5GRxZaUBiFrez4g6riOGNgPm4cMUODs7W1v7UdTyHkbUcX0x+MXFr7qHr4v5iampqa2tX0Ut72JEHdcXg69UFuJfJxPH3Ze7PchEE97FiDquLwZfLt8F8sfdqVtsveyJWt7FiDo+SAyeocXydHGyuNHaF7X8hxF1fKgY2mCW7EwhT3GSta19Ucs4I+r4ODH4emUmn2eyUFjd3BO1jDCijo8Wg69XZwp5JnKF1c09Ucs5I+r4aDH4emUG+K3HP3Z390UtQ0bUcRNi8KXZ6SIUCsXd3X3IRBPAiDpuQgy+NDsNlKY+2dnZg0w0AYyo44bE4Bkqlaa73Z6oBYyo4+bE0GbAlErT3W5P1BpRx/8gBg+ZaPI3WctocJ3Va4sAAAAASUVORK5CYII="},{"name":"Corruption sigil","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQMFGQJgqZV/AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAh9JREFUWMPtls9rE0EUxz+7mxS6kOKPWy/x1ggayopVQlOKrSKU9BSoSAji0YM3DxIQRYT+EZ6kFAr1okhrD0WkBkJx0UpLFipktSi09Qe0bCGm1sO6m252N80KNiL7hYGZ2TdvPm/m7fAEOX5yjzZL5B9QCBFC/N8Qhq61D8LQNQxdQ1GSfwwiHuS8mWND15h6/BBFSe6bKzvWt6KIn/ORzDDPns41Peq792/5wg0MpgB4+aKIHO8JDmFpJHMJgK2tbcf8haG03b9543bDKsEGABgYTB0IInpF8Wpxxh7Xaj/p7JQdrbhQorhQ4t3bFfrTfY71mdGLPqdTbg3CCyCo3q9W2Fzf4NTYGpvrG3z7/jV4YnZEowAM31tzzF9+8Kl+4GKEWCxmjxtPw5LUIQFwujcBCMFyIiJJjs1nC93MFrp5PjPvss2OjbK3u0t/uo9qtUrlw0cAvnyusbNtuK5EjieCJaYFUN/cXXpMTz2x+7l8lp0VjTNXay47RUmiqkue+wiNRY2ha5TUOe4UxgF+A5gmXlE4k04gl8/y40QRgNeT9Ri7uo4AoKpLrj+l6YtpAcjxhC+ABWe2HiYeTROtpHxtvV5WsRWAINoPcj5lJuzR48eQoqIviOBVY5oGwQEafeTyWQA0bdXxbbH0xuFf+JuFrhXttetXWF4utweinrTmG3H2XK8L4FAg3DDua44cVvXULL/CGjOECCH89Au78eaTvQqwXAAAAABJRU5ErkJggg=="},{"name":"Barrows totem","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEdElEQVRIDbXBTWgc5xnA8f/z6qOzjy6ydEscHjc97LzefgQ21ubQY4gwcUh7qSn04IILPRhkg7HRJWqjEhAFUVhEKtL6VJ0NBlN6jU3kejG0Ba80yUWDve3J+tjNjqUd0Uk8ZGCEJMc5+PcTNc/LJGoe6G+sjZ3yHC+JI0Ctynckar6/sQaIiFrIIUkcAWenz/V63buffUpBrcoLEDUP9DfWREQtpCSJI+Ds9Dly/88yoP9lj9zdzz4F1Ko8l6h5oL+xJiJqIYUkjs5OnwP+/o9bP//ZLygkyVOg/2XvxIkTgrt1+6ZaleOJmgf6G2siohaSS+Lonben7bXXh0dGOMbjTgwI7tbtm4BalaOImgf6G2siohYCSRy98/b0D16v7qcpBw2PjFDyuBMLjtyt2zfVqhwiah7ob6yJiFoIJHH03rvvn3zV9tOU4w2PjACPO7Hg7NT3m0uLkKmFHCRqvr+xRm7slE/i6L133z/5qu2nKYU3/v1Tcv/6yd3R4Ht+tQ6Ic+1GC3DOkWsuLapVOUjUPJDE63xDrsxcD0aDne62OCF3+p9nyLUbLcCv1gFxrt1okXPOAc2lRcjUQkpEzVOSxNGVmevBaADsdLfJ1VpT5NqNFuBX6+Ic0G60yDnngObSImRqISWi5ilJ4ujKzPVgNAB2utvkaq0pcu1GC/CrdXEOaDdaFJxzzaVFyNRCSkTNU5LE0eVLVyuVMWCnu02u1poi9/DMfXHiV+viHNButCg45waDdPmTplqVElHzlCRxdPnS1UplDNjc3hxyDqi1psg9PHMfqLWmyLUbLUqcc82lRcjUQgqi5ilJ4ujypauVytjo6Ojm1hNgkKY/fvAW8J/6PWDIuVprCnh45r44ocQ511xahEwtpCBqnpIkjv7wuwUgTfeBza0nwI/uvcVRHtTvkBseHiK39PGfIFMLKYiapySJo/m5BRF29wZDzm1uPQFO33uTwhDDFB7U7wCT4xNBJSDX+d9/lz9pqlUpiJrnoCSO5ucWREjT/c2tJ8Dpe29yyBDDD+p3gMnxiaASkPvgw1nI1EIKouY5KImj+bkFEXb3Bjs7WxxlkKYUJscngkoABBW9NjsDmVpIQdQ8ByVxND+3AIiwuzfY3d0lt7f3lJJBmpKbHJ8IKgEQVPTa7AxkaiEFUfMcksTR/NwCkGUZ0O31OMre3tNBmk6OTwSVAPjgw1nI1EJKRM1zSBJH83MLwCuvnAQ6nUdAt9fjkNrpH37x+TowPjFxbXYGMrWQElHzHCWJo78ur1DodB4B3V6PQs3XECH3xefrH/3x95CphRwkap5jJHF0Y3kFyPhGp/Oo2+sBNV/jayIUfv2bX0KmFnKQqHmOl8TRjeUVDhIRviZCTsRduHgeMrWQQ0TN81xJHAE3llcoiAgigIi7cPE8z2RqIUcRNc+3SeJ1EODG8gogzom4CxfP80wGqIUcQ9Q8LyaJ10H+8ue/Xfztr3gmA9RCnkvUPN9FEkeQAWohL0DUPC+TqHleJlHzvExfAVXOlXDxqJucAAAAAElFTkSuQmCC"},{"name":"Amulet of the forsaken","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADf0lEQVRIDbXBP08jRxgH4N8gHM5vwNoInNVZG16KQzsDsnVaZK0UnZTmlO6KSPkSqa5Jm/sEKC112qRKkSJ9GsvCQbZMMsFCHg4ZbVDCyqAxznJM/nSWvYYUfh5BrLBIglhhkQSxwiIJYoVFEsQKiySIFfJZozEXcYi5BLFCDms0cL8Thn+kabFQGGVZsVAYZRn+MR4XV1dHWZYkl8Qh8glihSnWaACBX14uFvv9M8wS+OXlQqF/PgAcsUQOQawwyRrteaUNz7sd3Z0nA8BhBuF7pXXfP9YaWCIOkUMQK0yyRgd+OQOS5BJwxBKzWKOfbW1ep2mSDgFHLDGLIFaYZI32vdLa6mrvfAA4YolZrNGeV1pZWQGQJJfEIWYRxAqTrNFBUFkG+ucDwBFL5LBGe15pBUjSIeCIJaYIYoVJ1ujAL2+srx8d/wo4Yokc1ujAL2dAklwCjlhiiiBWmGSN9v1yAXhSLPT6A+IQs1ijPa/0UaXydjBI0yHgiCWmCGKFKdbowC+X1rzj3gngiCWmWKO3tjZHaZqkQ8ARS8wiiBWmWKODoPLhBxunb/tpOiQOMckaDdw/r1Zvrq97/TPAEUvMIogVZrFG74Tbf43fra4VjzpdAMQh/mON9rzS6srK+2ue7mlgCXDEErMIYoUc1mjfLxcLuMtwMx6n6ZA4tEbH9b3k4uIuyzIgSS4BRyyRQxAr5LNGe15pq1JJh0P/6dNG8xC4j+v15OLiLsvOk0vAEUvkE8QKc1mjg6CS3WRb25uN5iGAuL7XPzsbj8dpOgQcsUQ+QazwEGt0XN8D0GgePv/iy6OD/Vefvvz96gpAo3lIHCKfIFaYyxod1/cazcMXrz5bij9J2j8X18sAjg7246jWaLUBRyyRQxArzGWNjqNao9X++M3X78a3uHfjmysARwf7cVRrtNqAI5bIIYgV5rJGx1Gt0WrH9T28/Bx39+Obq/T0pP/j93FUa7TagCOWyCGIFR5ijY6jWqPVjl5/VXjvSWp+099+E1V3AbQ6XcARS+QQxAoPsUZH1V0ArU43ev3mz94v/R++i6q7rU4XcMQS+QSxwiNYo6PqLoBWp/tsa7O0tnY7Gh33TgFHLJFPECs8jjU6qu62Ol0AO+H2sT4BHLHEXIJY4dGs0S/i+k+NJv7liCUeIogV/g9rNOAAEEs8giBWWCRBrLBIfwOPSIVwHhDNkAAAAABJRU5ErkJggg=="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQMEMRjBVKiYAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAPxJREFUWMPtljEOgkAQRf8YEhNM7KyhQyoTezsPQeMJvAEH8CxewLPodm5hYUKBBDZakLUQCCBEC9a12Kk22dnMS/bPnyHb8SU0x6g8ZOejXogSQPCTPoiJ6//HdxgIA9HVHVJKvd1BRCAiLW1qlQfbmRtNGIiPEIIzCM5+J8x2cQDY76YAgCBkhXg9JRBU3yfaxdsRhIkSkApCcNZbXDVIQxO++92joQ2tAZHnwGox7k2+Rsod08Nyw3A5zCqQ7P7ALQXiFIhidd1B7UVX8BcIAIgaxHqbFBlycIunrm272xukshnT6RO2472JT+WAs/oufjlVzQAzEAaiL56Eeli+RxiIfgAAAABJRU5ErkJggg=="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQMEMSTuO9QfAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAalJREFUWMPtl01OwlAURs8rNU0gcWYcGAEHBlAMjowOcAEmjkwMOzHi3C24BRfgDtyAcUJrYmLViQENNGkRweBA2rSVIgVpHXCTJs3rzz299/veexXJTKFPzCHbJ+ZDzRlMZQuRQkg2QCpbQAiBEMIDFBlEKlvA0lWSmTzJTB4AS1ejhQCc5HZVIq+EWxfuqkQOERfAD2HGARBg0VrkNnXcYdvTPqJ0h+x3Rxwh8Q9iDjEWhKVrWLoWnTD9yQEuzxcBqFS1gXhzM4EQ7v2EP7k/KlVjJiAOhKVrgcmHgQS1aRJITztyadAef39oFHClqoUG8QhzQYa9LSXw5vobI9tlXwsrZsldxmLFQE7A/rZCuaSws6GwuQaryyAJMMzxXhoWRPL3c+WgTu+TwdGh8wHtdzg+NTi7MADYLQZXq9uF27tmqN2ZPExY6cNhX2GbSCAnoFxSQMD1TYfSOphtaDTh/hkarSks6hWf6oPLe4T5dLVEH+j1wGx3aJnw8gpHJ4YDPe6iKCb97wjueT/0qixPOsF8zxXqkPH8dPNEeJC/2YPMl/I5hD++AHw3plFoqu0jAAAAAElFTkSuQmCC"},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQMEMS4O7j0BAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAfhJREFUWMPtl89rE0EUxz8TRwIp5JZTIelFaqBSj3rQP0DpSZD8Af0fij1Lzv4X5q74D+jBo4KQ7KGYreagqZpu3U22SRgP6aS7cSbu2prx0AcLwwzz3nfe9/1aUarVFY6loBdht03YbbsDEXbbrG3UEUI4AVIAWNuoE/kdSrWbAER+Z6UgpF4opYCZR2C1IEQyMCO/g1LqDIiDwASc0TEPTJcidWBqIP9FTCRpWXl2uDBuDEznZdt5YF62RL5n3C/VNvOD0Mpsl213Ws2y8ayxb9YnTK1cG9fKGvtBJjDLAKTBBCldcplxLedgvFxeWQ74vGHKPK9oNctzIDbe72wVefshturwuoPf8iHlic0qeIcX411eg3vbRRCAgnAUEw5hcAIHPfhx8ocUvS7h7q2i1Xj/O0a6kvLmfcz6wz7TKUzOvtEp/BzB7tOAZ88LgEoVRplMn62GR+9Vhfu3iygF8RjCYUwQQe8rBGE2vlvNMtWdvuFEGSuzXMzj9Qcehy8qKAWTaUx8CsMRPH4SZOJ9PIb2R827IktbkKaCUt3xrK8AkeL99buY7RsQDuFoAAef4eg4Xz8StpF/cbBJKot8j08vKyhgMplRdhzCl2/waC+Yg87aEMXf/nfYUtTG+z/pHbNa0THs5x8HLtTALmv+uJonrkAsyi8Q+N5z1MmTqwAAAABJRU5ErkJggg=="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQMEMTdqhZXBAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAixJREFUWMPtl09r02Acxz9PGwl0UEToadjuoNRipR4n/nkBjp0EycmTB1+BYs8yr74Ld1bxDUzBowVlCzhtpz24bq5Nl6RZWx4PM93SJl0aRtKDD4QkPOR5Ps/3+/x+vyciUyhJEm4pALO+mTwEgNXYSh5iLpRI0pYJJZKwZQQhpfTcY4dYWCohhABACBG7GiMlMoVr+D3HvicWlkrzsTHjVgFAifKR1dCZhC/GA+FOvr6WnejTqnpkEBG2gFkN3XdyL4hBplD0VWqaWkqYlYdd4fpaFq0aDKtV/cfzVWJcdq1qAFB/k+PTFycQ4uu3NtevXDwT1lXMV4kgz933dBruVFQEsFE7gbmUhe9N2Ddm2V9bo0hUZvH8Y83hdkVFSlguqxzaDp0u7B7Ak5cGkOLpI3WqWnq9PZEZPEoU86DvTF/B5ZXWVLWUNNytqCAACWbPwbSh3YXtJhx0z0hWFxS4dUMNBGj9ITBE3fah5rC40mI4hMG/q3cEhz14/MLg1esUID1JUTkdPmVNp/k+x72bx5I7fTBtB8OC5i4YJqGjJL/a8umRvllZGY/jxfs6O29zSAmDoYNzBHYPHj4/2XXL5WDf+33Y/OH6LkOVBMUvoeRX9cBVgPD4vvHZoXIVTBv22rD9C/Y6s9WiwIw5fqY4PZjV0Pn5LocEBoNjyzom/N6HB8+MEXTYYiii/ncEpeYg38+9irq2+Z3AohwFIkOc59lj/v47/kMk3f4CIYXoLM24zoMAAAAASUVORK5CYII="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQMEMgYQdsY4AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAldJREFUWMPtlkFr02AYx3+JkWgDVQb1oGztQTuLOvWmwvA+1JPI/AAeBD+A7m5BPPolisehfgEP8yqKM4LaOifYslpjkybr4ushS2iXpE02l3rwgReSPOR9/+////6f55VyxYpgwqEAmPXVoY9aqZIpCNl/kCQpGFbjffZM+JErnp6IHAETQoiQLJmC0EqVQIpJAJEHpfDlyPpMyFHumIhFtVIlAOLZM1smpMFi5cuQtUv+LYvuR1gNPT0Te5k8V5wN5WrVPItL+lB+7JlIunitmg/lFpeM2JyfjwOSGITV0GMXSBpxQORRi/ojSZRndi9liIkoyn2q68sFXr11IiefOwnaYZWVN9H5ZhuOTUUzsqNOjKd8/rwKwMvXDhfL0O3BRgc+foUbV1UkQAhw+mD2HLoWrDVBr3c4VTw6sCkRlAQ5rea/BbgCLp1R6W+B7XhA7j4yOLHQYstlezgeENv7xwew+rkz2qLlafiwNhrE9LVWpAv89wMyIMFBRUU7BHnNYeoIdH55bLV/jilWigJXzqmxAJptRtrQl2mYkW22LLjz0ODJU3lIiiEmcsVZ5m7rfHtRYP6CCgLsPlg9B8OE9RYYZidRka1V88xcb0VkRGR7UHZWveMLnjsaywVc18HeBMuGWw+MAMDlsyorMS5xNuHdJx+sIElviixWXjeVIncBEuvPC/4jruu5wLSh9cPT/d5jI0R54lYeDSa8C6uh8+VZAYSnudlz6HTh+wbcvJ8OQOrekaxDitRXgl23cq/iidDYzZ1E2UtD+luXoH291PwHkTb+AH6yGhIiwHjEAAAAAElFTkSuQmCC"},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQMEMhIKrBJFAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAw9JREFUWMPNl01PE1EUhp9baiYUJU1MYyIJrYkB6geoMSZKUNdEE90oK1cmJi7cyw9gYfwNLlyxVAKJW+MXRjcgAk0QqEAUGnQsnekMbRkX06nT6W07hRI5yU1m7knmvPe89z3njAhF4xb/2YLOg7Y8V9psi8WR7Xt9zbKAE6gtFkcIgRCiIrCzL4RAT87vTybaYnH05DyhaE9xe87zTtnzvmTCHcTJitssy6rIzr6AcANwZ6EWTc0y4ahDBsBr2vIcQogKv55MlL2Hot2N34laAGT0eIOPjrSX7Q8NJxoCI0LRuCVLs0ymDlAQ0uBeGxpO+wJSokMmPXdW/vlF3eBuEGDVVVbQvwT9B9+TOqqZnkxIAfT3KvT3KRK4MP5abS4IgAsSagPCDtjfp3DplMLpE2BZ8Oylyo1r4cYlWi8Tiy8iHCqS927aLOc0AN1R+DgLo69U7t8Oe+5FbaUIv11UTyZYm4hgARZgGCaaAeoWLP2Aq+cVPs2au1JKoJEL9GbK5O2USaEAuQJohr1aFWoCcOTsLWp1QejJRGl5bXLGZHoBVtZhS7f3ejrrH6IakAo6ZFXQ4XV5LMLkjPzEvSfhcKvC+y9y//omHDsqp6YMRDUpum2gTwEBOzugZU0yWdhU4dsq3LquYGFfGjNn+9MarKYgsaTSFQtLi1igEQAAOxYUCpAvLmMbfmfg4ZM0xwdT5POOz8TYBt2wZdsVC2PtwNdFtVbZTvD5eTsLq35Kce2+MXBOQRQBa4aJloVfaTtbD0YqS3nA3X4v3ktz5awi/fCRVptXP42rYzBVylQuD1kDMrocQFnvcKylpcg7YORAz5r80WBtA9IZ1ZeqR0fa6byZknjkzSzoHUY6Bm11JMciFAomhgl6Fu4Op0sALp9R+FBFJYYJs4sOWKtqV65bMd0zg/sUTntam4hAsW/kC7YKtCxsqLCwAo+e+mvhvsq2e8Yony0SfB+PgGWDyGRN1C34uQl3HjcGoKHeUW2088t7U1p55dTVXaSofO3m/yS4l4moWT9EAQ6AHQgQfwGCe5dcLvZOIQAAAABJRU5ErkJggg=="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mikVaHCwi4hCkOlkQFXGUKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfE0clJ0UVK/C4ptIjxjuMe3vvel7vvAKFRYarZNQGommWk4jExm1sVe14RwADNEEYkZuqJ9GIGnuPrHj6+30V5lnfdnyOk5E0G+ETiOaYbFvEG8cympXPeJw6zkqQQnxOPG3RB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWvfkLwzmtZU012kNI44lJJCECBk1lFGBhSjtGikmUnQe8/APOf4kuWRylcHIsYAqVEiOH/wPfvfWLExNuknBGND9Ytsfo0DPLtCs2/b3sW03TwD/M3Cltf3VBjD7SXq9rUWOgL5t4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd83tW+scpw9Ahnq1fAMcHAJjRcpe93h3oLNv/9a0+vcDhstyrzKfY5sAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmCQMEMiWyEbdKAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAu9JREFUWMPNl01v0nAYwH9tpkwwcweJZpiwqMngtHjxovNqzGLiSTka42En7+OoCfsSfoDtbBY/gMazRs1AF5U52EthtGyrdIX9PbBCS19omYl7EhLKQ//P73lvpXg6K/jPIltfDn+tuZRev4XRjQRhHaiXiw4jiemsL5yfbhQZA1wHWkb0crGnS0xnXTpJkhFiDUmSfQ3E0zPhILxELxeJpzOe13q5yHLh0olGBYTt2im5fGkoiBwlbHq5FDnUy4WJoffJUQ8cVez1FgoiMZ1FCOGoAYBMGlaWJnu6J4sqK0uTgcY3diJ2h3W4vVitIgQJBNy7FWPjzZUeQC6v+daDLAHHwyEka1jZwzVYkCB5piMIwIJ4vNgEhONMX4igAhy1FnL54QCuFrWM243m8k1SSago7pvnZmMAvPtkuCKwVQsPa0tHKbLHFgRAywTtwEDdh5pqpYFQkZDi6azQyyXev55gc9f/j3dnYwgBZhvMtsGRCUdtqGtQVWDuVqwHsdsYTEnw5Oy1qDjFLh2PwY1HCt82nABWaocNrNDp0FsQHz/dosrlm54RcUBU3ybpdLphNk0Dsw1GG+oNqNSCIbJpWCuPBiLbt93Ug34LfPwOX3/C+m+4/6LJs5dNRyG63SFQv13zH+GOORGmQyxD7Q5oh91C3NNguwEP7/Qh/hgG6gGo+6CosFOHq5e9oyFHAfCTlgkLhSZbdcM1MwAkqQ/wZV11RcMxrK5PwY9qsMHUvOI5RZcLE6xvdr93jkGSYyQuGJw/BzUNJi/CpuLdhWP2mrj9tERlNenpjRCwuzfaGL95DZQGPH/VPAm+c4CNBeVdbxloh9281rTwRj98NnpDasAV14J0QcTTM6Tmu0Olspq0lqdj8lmQXtGCLnBVUXseO8/PRNmi/fU96AVIXcATMdv9Lqlr3Ym5sBRuewamw/5A6+VFar7kALFLVADfSJzuoTcaQOQHXff7hHB9ogIEvneEA8nwL0TmDMiZgPgL17SVwPVWO6AAAAAASUVORK5CYII="},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Mind rune","base64":"data:image/png;base64,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"},{"name":"Chaos rune","base64":"data:image/png;base64,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"},{"name":"Death rune","base64":"data:image/png;base64,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"},{"name":"Blood rune","base64":"data:image/png;base64,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"},{"name":"Bolt rack","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFfUlEQVRIDbXB0Ysbxx0H8O9vZmdmNeodSyQTOIzmaI5bjRz5IS+BQqH0tc/GNG3xNTQv9l3UPgTq0rQ2fSsEDCEpoaWvhf4ZIQSEQPTtvNgct3o6WedyON2VutqZzWVb5XRNoG2wPx/SxuJFIm1sdnyIlea2xXNF2tjs+JCIsKJNF88PaWOz40Mi0qaLbyRPE1ymTYwV0sZmx4eoNbct/gd5mmDNyy9vNhpKBYLLQPKACT4eP9ImRo20sQDy9CGAqqqa2xZfJ08TrFy9eiUIoJTgPJAyYIwLwQXH0hX4F4/h6EibGABpY7GSHR8SkTZdAHmaYM3OzhbnkDzgMhCMM8EF5yxA+c85vsIBw+ERUGnTJW1sdnzY3LYAsuNDIgIIwM7OlpQB54Hg4IIzxgXnLOC+/Ae+wuMS5zAcHgGVNl3SxgLIjg8BEDGgeu21Xc4hGGeCB4wzhrKcY8XjMg/A4bKlw3B4BFTadEkbi1qePgTQ778ShlwJGUjuyznWeKx4AA4rs6enWOEczqEVtZe+HI0m2sSkjUUtT5M43mrIUIVcKCkDXpZzj5oH4LAye3qKmnPgHOfeuX2PEX3058FnReQcWlF76cvRaAJUpI1FLU+TOO40GoESUikeSFEUGbwDMHt6ippz+NLdg3tExIhA9N6DAyEhOD5zkXNoRe2lL0ejCVCRNha1PE16vU4oA6GkElxKsSiyk5Mp1tw9uMeoxujWnQFqP/vxG/2ebTabf/zTz4XALItaUXvpy9FoAlSkjUUtT5NerxPKIFQyUFwGYlFkJyfTuwf3GYEYnbt1Z4DawVtv9uJdISSjcyBiDz48EBxC4GwRRRvtpS9HowlQkTYWtTxN+r2OCFUouFTSY+5Ld/Lk9PHjZ6i9s3873nmFaowIRHv7AwDbV/33vnvzeu/aX/76GyFwtoiijfbSl6PRBKhIG4tanib9ficUSoRcSunLuffu5MnpL/d/SzVGBEZ7dwaovfWTH73a6zZ1k4GIgYh98NGBEDhbRFHUdksMR0dARdpY1PI06fe/HQquQiklL8u59+7kyem7v/jdrTsD1G6/eetavKvCBqNzIGJ7+wMAO9u+oRBKCI6zIoqitltiODoCKtLGAsjTJI63GjIUIVdKykCUZTadTZ3DD75/o7u7K4RgRIwAYnv7A9T2bt64/uq1zc0NBkYM7/9hEEqcFVEUtd0SS1eOxxPSxgLI0ySOtxqNUAmulJRSFEU2nU2dw68H90Fsb3+A2t4Pb1zvXdvc3GBgxEDEHnx4IDgYh2D4+yIC8FLUXi6xdOV4PCFtLIA8TXpxRzYCpaRSXAaiKLLpbOocHj9+9tM3bl7v9TY2vsXAiIGI3nv/bcHBOQTHWREBcA5farXabomlK8fjCWljAeRp0ut1QhmESkolpWSLRTadTZ3Drw7uEwMR/f7B25KDcQiOsyLCZVdabQ/AwQHwOLd05Xg8IW0sgDxNer1OGKow5DKQHnPvMZtNnUODn3EOwfGsiHDZlVbbA3BwADzOeZRwcKh5jP82IW0sgDxN+r1OGCoVSil56efeYzabOgfO8R9arTYcHACPcx4lHM45fGE8nuBCRdpYAHma9PudMFRKSCl5Wc69x+zpFCutVhsODjWPdR4lgNFogn+rsKJNl7SxeZrEO1uNRqhCrpSUUhRF5r0D4LHisM7hC8PhES5UqGnTxRrSxuZpEsdbjUaolFSCSymKIvMAPACHNR749NMjXKiwok0XX4e0sXmaxHGn0Qi0klLJQLJikWHFA5988ggXKqxo08V/Q9pYAHmaAPjO612pJDD3wMcfP8KFCivadPH/IG0sann6ECBcqLCiTRffFGljsSZPH6KmTRfPA2lj8SKRNhYv0uev5BRnAoz+PgAAAABJRU5ErkJggg=="},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtklEQVRIDbXBwWtURxwH8O9v3tvF/bEN2U3P/ig9ZOaPyaE9eJAeqictLIsBWULBXrZIPdSIB8FCDyKK0EuxOQj+FYLgHOdUCFVI0p23b3bfTH2hEkub+NbyPh9iMWgTsRj8P95ZvIdlE+8hFoOP5Z0FsLX1BVG2sfHpUe3g2bPfWDbxDrEYfBTv7IULX+V5N8+zfv+TwWA4m83evPnj9ev9vb1fWTZxjFgMVuedvXz5GyCFEObz4vz5z9bW1kII+/u/z2Z/Pn78AEgsGgCxGKzOO3vp0pWj2kG323369BdAXbz4NY49evQzoFg2ARCLwYq8s1tbX66vD4uiCKH0/ijLOsPhRq/HWaYODw+ePHkAKCCxaGIxWIV3djS6vlwuF4tQlvOynBdF0e/3z53jXq+3XFb37++ipoDEoonFYBXe2WvXdmKMVVUtFouynBdF4f2RyOcxxsPDg4cPfwIUkFg0AGIxWIV3djyeEFFVVTFGAHmev3z54vnzPZxQQGLRAIjFoDHv7Hg8ybI8xuqtGONgMAwh3Lr1HaBwIrFoHCMWg2a8s+PxJMtyIMUYF4swGGxMpztXr27fu/cjoICEYywa7xCLQQPe2fF4kmW5UirGKoSwvj6YTndQU6glFo1/IRaDD/HOjkaTTid/K8ZYlvO7d3/A3xSQALBo/BdiMTiTd3Y0ut7pdPM8TwkhzO/cuYmaQi2xaJyOWAxO553d3v6WiJTKlFJlOd/d/R41BSQALBpnIhaD03lnb9y4WVXVcrkMIdy+PUVNAYlFowFiMTiddxaI+AcFJBaNZojF4EzeWSDihAISi0YzxGLwId5Z1CJqCkgsGs0Qi0ED3r0CCLXEotEYsRg05t0rFo1VEItBm4jFoE3EYtAmYjFoE7EYtIlYDNpELAZtIhaDNhGLQZuIxaBNfwEdciNwEyTOBQAAAABJRU5ErkJggg=="},{"name":"Tooth half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACoklEQVRIDbXBv2sTYRgH8O/zxkZ5cBCROgg+IEjuRQqKi3+Mg1ZR1CL4a9BiBUVcxEXpYofi1kE7FBHEoZQqLoKYwRwI+opIMSVNL7nnktTLq1csClq9Cvf5EItFkYjFokjEYlEkYrEoErFYFIlYLIpELBZFIhaLIhGLRZGIxaJIxGLxV+pCrGGpYIOIxWJ96sKRkQuqGkXLCwuf5ufnWCrYCGKxWJ+68OLFq52Opmlar39ZXPwyO/uMpYLciMXiT9SFAI4ePUUEY6hUGjCGGo3G0lL96dMnLBXkQywWv1EXHj58LE2/9vveGPpu06aBcnlgyxaOouUHD+4DniVADsRi8Qt1IYAjR04C/WazWS6Xe70egHJ587Zt2wcHdy4sfJ6YuAsYlgpyIBaLNerC4eHTyHgAjUadeWua9r1PiUpTU5MAjh8fmZi4h4xhqeBfiMVilbrwxImzgPce36Xp18XF+p49e5NEV1Z6/b6fnBxHxgB9wACeJcC/EIsFoC4cHj5lDAFEZIjIe58kcbvdajaXDh481O12VONarfrixTwyniVADsRiAagLz5270uloksTtdtxqRUNDBzqdRFXb7WjXrt2lUsmY0tu3b2ZmHgGeJUA+xGIBqAvHxm51V6nGSRK3WtG+ffuTRN+/fzc9PQXgzJkL1eqrublZwLMEyIdYLFapC0dHbxqDbreXJJokcRRFO3YMjo/fRsYg00fGsFSQD7FYrFEXArh8+boxptvtxnH748cPjx8/RMYAHiBkPEuAfIjF4hfqagBdunTNGGo06i9fPq9WXyPjWQIA6mosAXIjFovfqAvPnx+9c+cGfjCAZwmwccRi8SfqQvzkWQL8F2KxWIe6GlaxBPhfxGJRJGKxKBKxWBSJWCyKRCwWRfoG6cQmcNCk6Q4AAAAASUVORK5CYII="},{"name":"Dragon helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEt0lEQVRIDbXB7YtcVx3A8e85k2m6pzvDqaSMtEtPAgtzb/8BQbAV3wgiCkF8IQj1GSpFKFqLb3wEa+ubIKWIqZZarItIRSlq0FXyIoGKRbAPOVbaHndRNk/9JTM5O2fvveea2Tpkh+y0IOTzUcaV3EjKuJJ3EoM3bsj/RRlX8rZi8B8k/x5t3JBdMXjjhszE4I0bsoAyruRtxeDvJp9EQ2tcEYP/5iB/fUsbNwRi8Pfb/APRxg3ZjzKuZLEY/BdsfkH4C5pdjw/6FZxN8h3Rxg1j8F+2eRseE23ckOso40oWi8Hfb7MXTqCPD/q3dLmqgnMVZ5N8T/TXbK5gB46Jhta4gnnKuJIFYvD32WzhddiBe5ethgYqkIqzyLlEFxq4CD8WDa1xBfOUcSULxOA/b/OtMIIaPr5sE1RMNfBmxYkkDjK8Cr8WDa1xBfOUcSWLxeAfsPlmqCHDPcu2ZaqBDKfHAmR4QfgzGlrjCuYp40oWi8F/xeZ3HaSGCt7TtUCGDDWcGksLl+Fl4RQaWuMK5injShaIwf9hpf/HsWimlg7y3iWbajLUsAOnxyJwBbrwtGhojSuYp4wrWSAG/6eV/srNnKt5TgT4kLUJUk2CBL8dyxgOw3l4UjS0xhXMU8aVLBCDP3m4f/sBGmjgfM1VGVJNgksVAgoZwYXE90VDa1zBPGVcyQIx+FdW+13I0EADTc35mgyX4SaIcKVijFyA01ucQBs3ZJ4yrmSBGPwrq/3fjORozzbQQFOTYRsmkGq2YRuuVKwnaWBNNLTGFeyhjCtZIAb/4mr/FjjyT3l0wNGebaABC6cmbMOk4mSSp4RHBvxui3U0tMYV7KGMK9lPDH5tpb9RydGeXR/x2S0BHhnwsZ5dgq+el6eEtzy5Yl+r5KXEL0VDa1zBHsq4kv3E4NdW+huVfLRnO3DkpoPHL6QP9Fgf8eEepyY8P5Z7D9mnR3IY+9MtsZaJcAJt3JA9lHEl14nBP7PS17BZyb8SXzpk10e8v0eGFvrw1wk1NLADb1Y8n2SbqTXR0BpXMKOMK7lODP6ZlX4HNirpwEd6NkMDGVq4Ff4+oYEEl+Dnm3KnJUEX/g3PiTZuyIwyrmReDD7fddva5dSBjUoOwOuJBu47ZDPkmkMH8DWp5hI8O5YK7oAJGDgHS/Aj0cYN2aWMK9kjBt/edRu7fnE5bVbSgdcSx4S3/O2wTTCBe94Qdn3S8m7YgR4Uy3azkoe2NLTGFYAyrmQmBv/wIH+iZzUo+NlIjnRtBx7aFM/+Vpl6cGAnyGrXXoSzFf9J8qho44aAMq5kJgb/8CB/umcVKHhiJHd27Tc2hRnPnFX+51srdgKvjuV9y/YiPDuWFwWPNm6ojCuZicF/d5CX4FN28IRsJbi9a7+9Kcx0wDO1ylSHaz4zYALbibuX7Q/H8g/hZTS0yriSPWLwxwa5Awl2wCeuUkwp0HBcNPA5mzVoUKBAQwt3HCQmBDbgV6KhNa5QxpXMi8E/NsgvJSJTCn4immtaphR7fNFmBQ1YEHhcNLTGFYAyruQ6MXjmtMwYV7ArhjNco5jTGlewSxlXsp8YzjBjXME7ieEMM8YVzCjjSm4kZVzJjaSMK7mR/gvEwSYuNGTJ0wAAAABJRU5ErkJggg=="},{"name":"Shark","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAGoUlEQVRIDbXB72tX1x0H8Pfn3K97cP6AjW2wM101966rs2xjLsjY+qDigz1SamlFrVPcs4FWZcW1dOoGYwVlc+Kwde3sRKpYOmS4SQkipVLahmb+OEtIPdFFY6JJvj/Ovff8+ix+IZDgbDvGXi+SqsB9rNGPLVv0dv8wAKl68D8gqQrcxxq98juLokeIoW9gBF1S9eC/R1IVuI81+kffXexSjBEhheDgY7ioRzGfVD34NCRVgfms0au/n8eAGGNIMUZ84YufRwIDKQGILqapVmfsTnNgaBRzSNWD+5BUBeazRq/9wcMxxZgQUvzKl77MADNmJCROmMEMRkoJTVtOtTpjd5oDQzcAIVUP5iOpCsxnjV732FKfYkxx0VcXMicGwGAkBpDAAM8AkCAEWmU1drd5bXRiYOgGIKTqwRwkVYH5rNHrH1/60MKFzGAwGAwwp5SQeEYSJERGgoQg+JDaZXXzzvS/bk9d6NeAAFiqHLNIqgJzWKO3rFq2eMlDKYFTYubESCmJe4gIgoQQJEgIAWbYyrXKauzO9Nid6cGR20M3xgGWKscskqrAHNboA88+VdaOOTGD78EMQRAiyzLKhMgEZVnWaGQhRFs7W9ZtW388OjFya/y9y9cAIVUPZpFUBeawRu/f9mTpHDP4HjBwWf8Tsx595Oufy7IFjayxIAOjqp2tXKd0125O3JqYGhgcHZtqAixVji6SqsAc1uj925+0lWPmxOCUCLg8OIT7/PB73xYC3sXSeVu5yVZ7cGRsZHSif2gUYKlydJFUBWZZow/tWudjatkyMTglAFcGhzBf77e+uaDRyASRoJiSd9E6Z8v6yrWbN29Pne8fBFiqHF0kVYFZ1ujf7Xw6xti0NafEzABdHRrCHMsffSTLsgWNTAgSRAz4EJwLtnK3J5tXR24O37itr41L1YMukqrALGv0wZ1PuxBanSoxoyvLqCGyTIiskTUEZSLLGiSEyIhIkCDhQ3A+Oh9s5fr1yPXxyYsDwwBLlQMgqQrMskYf+tm6svKtTpWYCcgEZY0sE6KRZZkgIoDET3/zZwBHfr5REIQQISYfgvOp9v76rckr126cu3gVYKlyACRVgS5r9OHn1gNo27plS2ZkghqZICIARIIIBJCgHQfeABigoy9sIiIwuxC9Dy6EqvYXLw2/2dcPsFQ5AJKqQJc1+vBz64Wg6bZtd+oYEwkQCQKIQDMAEmL3odMA4x46snvDgkaDBHkfXAjOJx/8xzfuXBq+3vfBoFQ9AEiqAl3W6CO7NyTGdNt2bF17H1MiCCFAJAggwt5XzgAsVY4ua/SrL/44IwopeR+dD5UP0+3O+1dGzlz4CGCpcpKqQJc1+uXnN/qQqspNtmxV+5BCjEwzABJ46djfAZYqxxzW6GN7NjPDhVDXoXJ+ql2O3W0ePtUHsFQ5SVUAsEa//PzGjMTGF4/s3/bUZMvauo4h+RhDTAQQxMGTbwMsVY75rNGv793ifKycq2o/1SrHJ5tD18f/dvGSVD0kVQHAGv3HFzZlmahq3y7rqZbtVHUM0cfkY/I+vPLWBYClynEfa/T2Nb3feDivnKvqMNWy45PN0YmpN/v6ASapCgDW6Nd+sVkQtWxZVn66XbbLMkQOPvkY/nD6PMBS5fhPrNHb1/SGmIpiSVW7yaYdn2z+Qw+fHxgBmKQqAFijj+3ZElPq2NrWdatTtzqljzHEdOhkH8BS5XgAa/S21ctjQlEsqWt3t2k/vHTFVvHcB8MAk1QFAGv08X1bK+c7ZW3LulO5Ztv6mHxMh0/1ASxVjgewRm9bvTzG6BN6Fn/t4ocDtYu2jn99bxBgkqqwRh/ftzWm5Lxvl86WrlNVzU4VfDp48m2ApcrxANboHU/0hphCnJF8Qu197WLp3FvvDAJMUhXW6BO/+okPwYfUsXXLlm1bN2392xPnAJYqx4NZo3c80RtiCjG2S3/0bP+mVcucT6Vzp85fBZikKgBYo1/fu8WHZMuqaetWu9x39AzAUuX4RNboZ9f0Rk6187//y/sAA7Tx8aW1i8f7LgFMUhUArNHH9231IXaqqmXrnQfeAFiqHJ/IGr1r7YoYU4hp/+l3AcY9tHnVstqnP537CGCSqkCXNfrYns2d0m395WsAS5Xj01ijd61dEWJ66eQ7AEuVo8sa/czKZUfP9gNMUhXoskYf2b1h895XAZYqx2dgjd65dsWvT1wAWKocc1ijcQ+TVAVmWaMBlirHZ2aNBliqHPNZo59Zuezo2X6SqsD/hzUa4H8DHhZ40rwlDbAAAAAASUVORK5CYII="},{"name":"Prayer potion (2)","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEi0lEQVRIDbXB225VRRgH8P+39t4FhmC0CSReTS9I9lrx8AgkPoK+A1xIMLEUISDYxHi6McEDF2rQWEEtkpJK07SQXnnjCxhWmpiM4bQ5dJ/WzDrMNzMiwaS1Xbu98fcjIRPsgFEp1hGyjZ0hIRNsx6j0zLFXi8oVpctLV+Tu8rU/hWxjB0jIBNsxKp05fwiAZZic13rm9n391Q+rQraxHRIywXaMSmfOHwpAWXqd81qvuHtff/PjKhCEjDESCZlgJKNSADPnD1lGWbHJ7Vq3vNvJv51dBYKQMUYiIRPUMyqdnDyza/eu9v6b1vqiYpO7Xq9c7bw8NjZ2+fJ3QrYxEgmZoJ5R6cmT041GFEWNKCIQ5SY3RhujtR7Ozl4CgpAx6pGQCeoZlZ4+8z4AIgIQQsjzfDjsG637w/7Cr3NAEDJGPRIywUhGpdPTn/jgg/fOe62z4WCQZYPZ2UtAEDLGSCRkgpGMSt85Ob13794oipxjo023t9Z5cG/+2i9AEDLGSCRkgpGMSs9NfxRFEUDesTam211be/zw2twVIAgZYyQSMsFIRqVn3/uQCAB577XOet1ur9+du/ozEISMMRIJmaCeUenRo5PPvzAOAoG8d1rrYTbo97rdtccrKzeEbGMkEjJBPaPSqamzUaNBEQDyzmk9rMqyN+j3ems3lxeBIGSMeiRkgnpGpcePv4uniIjZaq2d4ywb9vu9paXrQBAyRj0SMkENo9Jjx060WmMgEJ6gsirKonSOi8L0+4M8z1ZWbgjZRj0SMkENo9KpqbMgBB+eIEJR5NZaZra2yrJBUZSLi/NAEDJGDRIywVaMSo8ceWv/gQPhKR9C8CEvtGfH3nnmLBsWRalNtry0IGQbNUjIBFsxKj18+Oj4ay81PCJQFCiwK/LcVdYVzNYOez09GAzVw+XlBSAIGWMrJGSCrRiVvnn1swYazYAoUBQIztuqYsuurLiyudFZluVDvfTF90AQMsZWSMgEmxiVTsy8/fqLrwQfgnPeBbDzzrO13lpnmSvmqqrKsirK3++tdi4sCtnGVkjIBBsZlU5cOo49Y81Wi71HCHD+jfHYs3PM3lq2zjM7y8t3/oDObZZ3Pp0HgpAxNiEhE2xkVDoxd7q5T8AHwMMFBCAEdh7swA6W2TpYC11imNu8xLDofH5dyDY2ISETrGNUOvHTieb4PuxuAgQfEAIC4AO8h3VsHdihslwxTIlhDpPbrMDAdL6+IWQbG5GQCdYxKj24cA7P7WngHw5AwDM+gB2s44pRMcqKsxy6hC5sViDLOxcWgSBkjHVIyAQbGZW2f/sY6wUAwYUA61ExV4yKUVZsCpgKprCPBp1P54EgZIyNSMgEmxiVHlz5AAQQIaJGRACcD7AOFXPFqBhVxbrAo4G90+18uQAEIWNsQkIm2IpR6cSVU2g1mq0mWk20IhCBPSxzaWEdP+qj07V/PepcvAkEIWNshYRMUMOoFP+auHIKrWaz1WBrkRX8oHd78iKeCULGqEFCJqhn1C08Q/ivgKeEjFGPhEywM0bdwjpCxtgBEjLB/+lvDOv3f3AhSToAAAAASUVORK5CYII="},{"name":"Restore potion (2)","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEiElEQVRIDbXB3YuVRRwH8O8855xVRwoTVrqIHTDiPLNkRH+AdBn9CdGt3piBuiVk1kJQdCNI1kVFBb5Um7JiLbKr7E3d9Q/0YAQTh83t6Hl7npnnZX4zk4rBbnues3vT58O4kNgBoxJswEUbO8O4kNiOUcmZ4y8UlStKl5euyN2V639w0cYOMC4ktmNUcvH8YQCWYHLqDUznrv780h0u2tgO40JiO0YlF88fDkBZep1Tb1Cs3dVffnsHCFzEmIhxITGRUQmAi+cPW0JZkcltr1+uredfL9wBAhcxJmJcSNQzKjl58syu3bva07et9UVFJneDQXln/fmpqakrV77hoo2JGBcS9YxKTp+ebzSiKGpEEQNjucmN0cZordOFhctA4CJGPcaFRD2jknfOfACAMQYghJDneZoOjdbDdLj04yIQuIhRj3EhMZFRyfz8xz744L3zXussHY2ybLSwcBkIXMSYiHEhMZFRydun5/fu3RtFkXNktOkPeut//3Xj+lUgcBFjIsaFxERGJe/NfxRFEcC8I21Mv9/r3e9eX/wBCFzEmIhxITGRUcnZ9z9kDADz3mudDfr9wbC/eO17IHARYyLGhUQ9o5Jjx07ue2o/GBiY905rnWaj4aDf791fXb3FRRsTMS4k6hmVzM2djRoNFgFg3jmt06osB6PhYNC7vXITCFzEqMe4kKhnVHLq1Lt4hDFGZLXWzlGWpcPhYHn5JyBwEaMe40KihlHJ8eNvtVpTYGB4gJVVURalc1QUZjgc5Xm2unqLizbqMS4kahiVzM2dBUPw4QHGUBS5tZaIrK2ybFQU5c2bN4DARYwajAuJcYxKjh59c/rAgfCIDyH4kBfakyPvPFGWpUVRapOtLC9x0UYNxoXEOEYlR44ce3l6OkRRiBohiij4vCgrRyW5ytEwHY6yTI3SlZUlIHARYxzGhcQ4RiXX3jiBVjNEDR81EDUcUNrKOqqIKrI6z9M01cZcWF4CAhcxxmFcSGxhVHJpdubpV1/zAS4ECt6F4Jy3zlki613lqCIqqqqsiru//vxpp8tFG+MwLiQ2Myq5PDuzp4EpND3IAx7Y98rrznvyzhJZ74nIerd264YGUrLnOl0gcBFjC8aFxGZGJYuHZp5oND0e8kAAvIMDOcA6EFA5soBxSAmGbAp80uly0cYWjAuJDYxKvpud2T/V3B3hAQ8EjwB4wAPWgUDWwQKlI+OQEgyQkR0BX3S6XLSxGeNCYgOjkqVDB59sAWjgIRfwmAfIwwKVo8qhBDJH2kETMrIZ8FmnCwQuYmzAuJDYzKjkl5eewwYBDwU461EBlaPKoQSMI+NgCPfInut0gcBFjM0YFxJbGJWsvniQASxCBERoAPBw1qMCKkeVQwVoR/dKrJG90OkCgYsYWzAuJMYxKrk6O9NsoIVmq4EWwCKQhwVKR9bhnqP1En+S/arTBQIXMcZhXEjUMCrBv67OzrQaaKJpQZlDt6ITv6/hscBFjBqMC4l6Rv2Gxxj+K+ARLmLUY1xI7Ex5f90XmjWnAARb7nnmWewA40Li//QPSdLcf+H8bLsAAAAASUVORK5CYII="},{"name":"Super defence (2)","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEj0lEQVRIDbXBXWsdRRwH4N/sOSetE9RaaPFCMlCQswvihR+g+DnE2/amVGgbLVirgaKlIIVgfcHXQtvUxpSUaChNS270Q3QJKCMSE096Xndmd2f+M2NaKyTm7ElufB7GRYI90DLFFlw0sTeMiwS70TI9d/LVwriidHnpitzN3PmViyb2gHGRYDdaptemjwKwBJ1Tu6v/WFNfXl/hoondMC4S7EbL9Nr00QCUpVc5tbvF6pr6+uYKELiIMRLjIsFIWqYArk0ftYTSkM5tu1Ouruffza4AgYsYIzEuElTTMj19+ty+/fuahx5Y6wtDOnfdbrmy/srY2NjMzFUumhiJcZGgmpbp2bNTtVoURbUoYmAs17nWSmul1GB29gYQuIhRjXGRoJqW6bvnLgBgjAEIIeR5Phj0tFK9QW/xx3kgcBGjGuMiwUhaplNTl3zwwXvnvVLZoN/Psv7s7A0gcBFjJMZFgpG0TN85OzU+Ph5FkXOkle502+t//blwZw4IXMQYiXGRYCQt0/enLkZRBDDvSGnd6bTbj1p35n8AAhcxRmJcJBhJy/T8Bx8xBoB575XKup1Ot9eZv30LCFzEGIlxkaCalumJE6cPvHAQDAzMe6eUGmT9XrfTaT9aXr7PRRMjMS4SVNMynZw8H9VqLALAvHNKDUxZdvu9brf9YOkuELiIUY1xkaCalumZM+/hCcYYkVVKOUdZNuj1uvfu/QQELmJUY1wkqKBlevLk243GGBgYNrHSFGVROkdFoXu9fp5ny8v3uWiiGuMiQQUt08nJ82AIPmxiDEWRW2uJyFqTZf2iKO/eXQACFzEqMC4SDKNlevz4W4cOHw5P+BCCD3mhPDnyzhNl2aAoSqWzpXuLXDRRgXGRYBgt02PHTrz+2qGAKKAWEBH5vCiNpdI4Y6nX6/X7mVwbLC0tAoGLGMMwLhIMo2V6+/NTiOoBNR9qYDXnURpjLRlLxlil80E2UEpfuboIBC5iDMO4SLCDlun1CxMvHnnDezgXyHvngnPekrOWLDlDZAwVxpRFsSZ//nSuxUUTwzAuEmynZXrjw4ln9mGsXveBvIf3OPDSm855ImeJLHmyZJ1b/W1BaQxye/l6CwhcxNiBcZFgOy3T+Y8nnh2v+wAE+IDg4QOcJ+dgCeRgHFkDnWOQQxd2kOOTmy0umtiBcZFgCy3T7y9OHHy+vn8Mm3xACAgePsB7WAJ5shaWUBLpHAMNnSPTtq/w1XyLiya2Y1wk2ELLdHH6yHPjAGp4zAU85QOIYAmGyBiUFllOKofKkeU2y/DZXAsIXMTYgnGRYDst01++eRmbAv4R8FgIzhIMwRAZg9JC56QL6AIbHXt5pgUELmJsx7hIsIOW6fIXR1gExhAxRKwGwAdnLQzBEBkDQ1CaNrpY3bBXbrWAwEWMHRgXCYbRMp27NFFvoFGrNxpo1MAiEMESSiJbYqNP6xv4fc1+u9ACAhcxhmFcJKigZYp/zV2aaDRQr9UtUZaj1aZTl1fxVOAiRgXGRYJqWj7EUwz/FfAEFzGqMS4S7I2WD7EFFzH2gHGR4P/0N6rM+n+b54EwAAAAAElFTkSuQmCC"},{"name":"Sealed clue scroll (elite)","base64":"data:image/png;base64,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"},{"name":"Crystal triskelion fragment 1","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABb0lEQVRYR+2XsY7CMAyG3bUTb1DdBDzBLfdISCfBg9wh9ZFYEGKHAZ14AyZWkBPcOqnjliYF6SBbC7G//PZvQpYX0ws8cWVvgLcC/16B83EPeTEO+mxQF2Dy0bKE0/csCPEwAIAL5MWkocRrAOCxQ2VIogDWmi/edLwPpDJEA5gEq7UDcPr6rJpucADMTApwEIJ4CICF2AFAZpQgEIQwzzcrJi+BVHsCQYhBAbTaO59tN0YFdEFSBSgJndJ2Id1tsroxt5tgctzR2wUuQH2pwmnnKxA6fRIAI++t2ciLlRta5I8CIPv5M8AZCC3yRwNoM0CzHofs3QM8iDMDlqXa9f7PoQjA/a1dJihYNQnvTC6WgEanaa6/A8DvTwVNMP4AgvkCRsXHXSenoKoCWEe+rJ3saJWWZjdxgzYHeF2lpATjBpZvPaHknVxgQcxXvTjNf3TSlUtL3gmg2e32TZ9kEkwSG7adMqoEMcG77H26Alfq/QVQiZVN9AAAAABJRU5ErkJggg=="},{"name":"Crystal triskelion fragment 1","base64":"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABaUlEQVRYR+2XMY7CQAxFf9pUe4OICvYINFwJxEHQSisutM0KiQNAQcENqGhBnuDBM3EMySQgAdMmGT//bxuT5cX3CU882Qfgo8DLK3Dcb5EXw9o+67ULKDgWP8B8VgvxMADghLwYVZR4EwDKu8aGThRwXosji07WgWZDMgAF+Pr7DwAOk7Evut4BKDIrIEEY4iEAJcQGQOaUYBCCcOfSip1boHnPIATRK4DlvXx2WK9KFeYzdKoAB/FZuii822RXGwigJjh90boLQoDrUkXTrqJAnwCURaiCKMIb8icpwO0XzwA5EJz/RvbJANYMsFpPQrauAXmJnAEusFH18c+hCiD721om+DL/fsPgqgV+dNLT3Q5Y/npohokHEKZToBg0ypwvtRXgjPhtV1CX0Rpr2UD2u2og8FULyjABiL71aKymAtUCc25F91T/0WkrlxW8cRuWqpSnTTANppM2vJVlkgUpl9/z7dMVOANA9/RBTQ+moQAAAABJRU5ErkJggg=="},{"name":"Crystal triskelion fragment 2","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABVklEQVRYR+2WPQ7CMAyFXcZO3KAjcAIWToSQehakLtyHBbEjGLkBEyvICY+YpDQOpYIhnfqjxl+e7ecUZTW70Q+vIgNkBbICf6nA9XwyzlBWk8EdIvABDj5eNybwpV4NDtFqRIBgAKIbldVUrUSqer0AOJhMkwHf7qx6i7lKvW6ATUN0OAYLYZccjAOhXnwAjXqdAKgDuZAMIvOCHaeq8HYYtdVBuEOLIGUPn7trqCcAT/LCANhUuGfUQSwNUQDZjlDABeOvAwHw0r4nQF4AoD1tUeJc8woUa+HogcSH8PONNpSdoZXf6KeZBe8gXCBXiCnB1QBhOpY03u5b3dFPT8xCVQpgEakE3l1qCwNDilW9D5QEACVMMT4G1osZ1UsiGqksGP8lA1iIo2k/eUmglCn6EYBLCYM89yLu9RO0F4CfT6sMH2T04/urALGKb/ueAbICP1fgDlOWClDHc4C1AAAAAElFTkSuQmCC"},{"name":"Crystal triskelion fragment 3","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABb0lEQVRYR+2UPY7CMBCFx22q3CAlUCOEhPYWIK3EGZA4CwJuwd5im73BQscNUtGymkkmOPb4LyCxhd0lcfy+eW88qqgmd3jjUhngWQdu1zMU1WhwiFERoIhzLVcAXyf6PAQkCEDiiwWUn+tglfV2kwziBUDxcnegQ/Hw8vunB1F/zLtn3sd7Yx0RAdjy7tDprBNiUYZpnvEmKwsGoUOxWABm1XiqLYZvFb1ngKIaw+3620KonnM+CK8Dsriiqgi0jQQhTBEupL6cAY57pxPOHmiqaaqkXNu8H1XbzqAL+uogqDnvYH4nH31zwKySHUEYMxbpcDNOKYqoa6hnbbsiV8ZOhCCiATgGzr8R8IvrEK79QQD8UWo47njJemli4f7kHrAaymjI2GHjG6FRDvTyFKZhaNi8DMCM43E943pBAklyQOqH2EZ0uZAMoEPoY9hn80sj+BcADPGs/cFRPNTWlP8G9UCKQGhvBsgOZAeyA39vIvhBxbL+2wAAAABJRU5ErkJggg=="}]}

/***/ }),

/***/ "./JSONs/ItemsAndImagesBarrowsLegacy.json":
/*!************************************************!*\
  !*** ./JSONs/ItemsAndImagesBarrowsLegacy.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = {"items":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAcElEQVRIDbXBQQEAAAABMdoocF/9Y0lhc4meXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklehrY9xOB0WoOowAAAABJRU5ErkJggg=="},{"name":"Linza's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFAklEQVRIDbXBa2xTVQAH8P/pY3dPVgX1izHGaHsjEQ16EkQ8wQAhBAF5zCyAhoCKStAJIsoriDyiKMwgJLBhiBAjBOQx+TAgMI5jYg6MSgOzl62U2XV2HaXv29v2trLFxS3bdJj09yOMysglwqiMXCKMysglwqiMXCKMyrhHXCiMWrlQ0I1RKwZHGJVxL7hQNn62cs3az6urvrrcUOPxBmpqrzJqxSAIozKGjAvlN/vZyi3ryl5/p+anU66mS5ZhhQdPCCDLqA0DIYzKGDIulCsXqt9e+uXKD+fNmrsaMACYM/XZwycvM2rFQAijMoaMC+US3wOCmy32sgW7gCy6ECDLqA0DIYzK6IcLhVEr+uFCsV+oVjXN2dS4YMleIMuoDQAXTkZtGAhhVEYvXCgA5s8ee+BIA6NW9MWF0lhfFQxF+flzlXuOBYMGRq0AuFAYtWIghFEZPbhQNiyfEQjFK6tPA1lGbeiLC6WxvioYil785ee6ejuQd6rudwAbVsxYt/U4o1b0QxiV0Y0LZeOKmYFg1NXqP1ZrB7KM2tAXF8r3VYtDYbWl2edo8hQUmVU1VXv2GoBlb07aVnUaAKNW9EIYlQFwoezYNM/rDQbCsd3764Asozb0xYWya/P80hEF4bAaDMevObzmAtOVG77O9qDH4wfw/sKJurnkm91HGbWiB2FUBsCFsv3T8khE9XVGdu47AxgYtaIvLpTFFXP0lK5pyXhcMxlJOBQLBEJtng6P2w+gcn35zdbOtKlo557jjFrRjTAqA+BC+WJtWSyqBUNxV2tHzZmrQJZRG3pwoaz6aK5fTaR1XUsktYQmSeZQMNbu8cVimq6nm51eAJXry1vbbycyhbuqjjNqBUAYlQFwoWz+ZJYaTwZC8VZPp+LudDZ70UvFkjmFxVI6rd+lqloyqScS2ggLudD4R2lRkS9wR9dx3eECsGXVrFZP4HYEh47WMWoljMroxoWypuJl/+1oJJqIxxOKN5BnlqZPeH748NKj58+OfvzJbTsOLntrsrMt8tAD96Uid8792vLic482t0fuLykxGGAwGocPM3x3sOHrDXPvhKIt7o79Ry4CWcKojB5cKAAWvzbeccuvZ5BJ6a9MeqGoKP/HuroSyXzyRCMAiwWABRIks2QGHnmwJIi00QijwTSNjTMaCNGDcTUZV1NXHLfqxQ3CqIxeuHACBMC48aMApNI6MjDnGYtKUFtjB2CxALBAgmSWXnlppLC7kF9oNicLCvNmTphkNBpq6sXTD5fGE6lGh6tBuAijMvrhwgmQceNHZQA9qad0PRaJO6+7LRZLcbFkMsFkMi8qG3PyjD0USyAv32hIFxZKeflGID9PMidTmRFGOF3tDqeXMCpjEFwok9lIb1h12F2njix/ddFWwFJcLJlMuOvj96Ycqm1qc7cBJk1T3W4/gKeeeazUUmwwGUozGXdbp8PpJYzKGBwXCrod3vfuGxUHJAkFBRIAt9s/bTYL3Ql72zrSOtRI1OcLAgb0mMxGRsJqg91FGJXxr7hwAmTvjoWLln6LXqZMH+u5+aeaTKS1lBrUfMEwkMU/CLpkCaMy/gsXyvZN5R+s/gHI4m9k4tQxvtYOVU00N3vRJcuoDb1w4WTURhiVMQRcKECWURu6caGMpk80ihvokgXAqA0DIYzK+F+4UIAsAEZtGBxhVEYuEUZl5BJhVEYuEUZl5BJhVEYu/QXBPG5uEu/EuAAAAABJRU5ErkJggg=="},{"name":"Linza's cuirass","base64":"data:image/png;base64,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"},{"name":"Linza's greaves","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEeUlEQVRIDbXBz2/cZBoH8O9re5xk0nYroSwSCihi0/gV0FKlPIo0RA9R1AVVFQckLkj8jxw4cNmTxe29IEFDYyLkTSbTeCaTvOP56dd+/a52L3sZT+DA5yOYJP5KgknirySYJO4SqwQNmPawkmCSWClWyRdfUBi25uPZw79vX11l3fNsrY1iVs3nkyzLmfbQTDBJrBSr5Juvjxe2MjPz4K23h8PRSOuiyOem8oFeL9XaY9pDA8EksVKskqOjJ5thu9/Xaw8erofB69enm+sbD99qaz07zVJoD3BMEZYRTBIrxSphfvK39fZFt28tLCprq+m43Ly/8eDB2vlllmU54JgiLCOYJJrFKvn2m+fnF6PJSN9b36isWZS2NnZuF2EYwG+Px8M0HQCOKcIygkmiWaySww55nu95yG+HPlBaawFjFmG4buHP8mna7QGOKcIygkmiWaySw84zz2sBttfN7t0PrIUPzE0VhsHcYDweZ9kAcEwRlhFMEs1ilbx8cVwUi+urq7kFbBX66Ge6dW9tc73lh5uzWZGm54BjirCMYJJoFqvky5fPr/r9zRby8fzmVq+tt3wEpqr8IAg32saY09PfAccUYRnBJNEsVsnLF8fX1zd772+9Pr0ojQFgbTUvKn8t2AjbxtqTk98AxxRhGcEksVKsks7B0+gfb5++/veitABqayezRbgWhBv3f/rpFeCYIjQQTBIrxSrZ3tn6Z2f/opuZoixKW5Z2Oi98H71Ma50DjilCA8EksVKsku2drf3HT4upLk1pirJYGNsKF1PTyzKtc8AxRWggmCRWilWyvbPVeXYwHk+KiTZlWbfWA8/LJ7M0vdA6BxxThAaCSWKlWCXbO1uffnKQ55O6rsu6Nou557Umk/Hlm4ssywHHFKGBYJJYKVbJ9vY7n3Y+yUeT2la2rhemCDx/eD3sD7Ms04DHtIcGgkmiWayS46Onr369PP6so0fj2tWurhaLIghar85+QYmNjbU0HQCOKcIygkmiWaySw0NCPXvv3d2RHteutnW9MCYMgutBr90Oe9kwTQeAY4qwjGCSaBar5PPP+U03/fjjZ7c3o9rVFrVZmCAIrm96xlQA8nze7Q6Y9rCMYJJoFquk0/mwLE20+9GtHtU1alcVpgqD4E0v9cPAWvz88++AY4qwjGCSWClWyf7+o7q2e7sfTMezCnVZmFYY3txe2hKLeXFyeg44pgjLCCaJlWKVdDofDodjrXWWacADsL//qAZaPm5vp2dnPcAxRVhGMEmsFKvk6OhJv6+HQ10UWmsPwOPH7/uAsdXJyTngmCI0EEwSd4lVcnAgs2yYpgPAAeLx/iMznVqLs7Me4JgiNBBMEneJVfJ0/9GbyyzLcsAxRbFKoui96XTe7Q4AxxShgWCSuEuskt3dd87OuoAHOKYoVsnOzpbWhdY54JgiNBBMEivFKvnq5WFV1UVRJGfnaXcA4KsvD7/7/scXz+mHfynAMUVoIJgk7hKrBP/n8F8CcIAAHFOEZoJJ4g+I1Sn+hynCn/EfatqNn0vAvOQAAAAASUVORK5CYII="},{"name":"Linza's hammer","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC+UlEQVRIDbXB0UvdZRgH8O/zc/PgaeJWFyVEl+d9L3fRcxPxIGMxDm4yO8tiWWyLbdVN/QdRN7vqPrqooDWwhAOTIaiYvIhTnpBqVPi2YsyjctTTcNNz8px23nAwUNza+fnrfD4kbNFMJGzRTCRskZhTL5zBo5CwRTJOfV//m99e/kY4g11I2CIZp/7MhXe/+vwzIAgb7ETCFsk49Rc//GB5aTE/8B0A4Qy2IWGLZJz6s+9dXCgUqvdKUWv7+MiocAYPkbDFnjj1eKj/3DsrC3/UatWNjXIN+2dnVDiDB0jYIj6n/iV5ubPzhcL8rY5Dh5460F5dX97crJbLlfLfWFq4XSyuCGcAkLBFfE79ydxr6+W7xaWl/ako3ZbuOPhspbz+1+pKKn2gXvtHZ6aBIGxI2CI+px6oH81mAVRrG8883VlaLbnxMSDq6TsV6vWO9oOXv/xCOEPCFnvi1L+e6yqVUwCe63x+dGS4WFgEAkAAcv2n1+7cGbs2TMIW8Tn1AI50Hf7z1sLhF7vq9+9fzQ8CERCEjdM5gLAlkLBFTE79hbP9LS13Z374bfbH33t6X10trU65CSACgrDBA07nhA0JW8Th1J9/+zS1rF2fuXHj19tAAAioAxEQhA12ImGLhjn15956I6K1iamfbt5cBIKwAeDUA0HYYBcStmiMU9+XO55O18a+ny0UVoAgbPAkJGzRAKf+VO/xtrbNr6+MYksQNmgACVs8iVOfO9mdSlWuDIwDAYCwQWNI2OI/OfW9PdnW1srA4AQQhA3iIGGLx3Pqe04ca91XGcw7IAgbxETCFo/h1J/ofmVfVMkPTQJB2CA+ErZ4FKe+O3s0wvrQ8DQQhA32hIQtdnLqAWSPHUG4NzyiQBA22CsSttjGqb/08fn5wvL8YnHo2jQQhA0SIGGLbZz6Ty+9P3n95/xVB0RAEDZIgIQttnHqP/nozMioTk79AgRhg2RI2GInpx5bgrBBYiRssYvTOWGD/wMJWzQTCVs0EwlbNNO/sVlGXY7AYVcAAAAASUVORK5CYII="},{"name":"Linza's shield","base64":"data:image/png;base64,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"},{"name":"Ahrim's hood","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADZElEQVRIDbXBMWsjRxiA4XfWe9EJVKgQGMJhjJA8g4qQ5mu/H7/t9gFvmiuEYckUw0lGmswsm5UOJRa2Yqvw8xgVx2cyKo7rVXUDqDzwHqPiuEZVN8C3b78C6/UTJyoPvMWoOD6mqhvg/v4uk0vKTGaQSSQSbfsXoPLAOaPi+ICqbu4Xd2QymUGGkoPMIJFIxBhD+AGoPHBiVBzvqermfnEH7Da78XicyUBJmckMMolEIhKJhBCgUHngyKg4/ldVN4vFPJN3+924HAOZzE+ZQSKR4AskYowhBCigV7GAUXFcVtXNws7p2Ow3HI3LMZDJDDKDRGKQiDECIQQOCpUHwKg4LqjqxtplR0fHZr/haPx1TCaTGWR+SqS4jaPRKMYIhBCggF7FGhXHBVXdLOycQcdmv+FkXI4zmUHmp0SK2zgajWKMQAgBCuhVrFFxvKWqG2uXz8/P6+12cTvbPG84GZfjTCaTUgIikaMRo0gMbYACehULGBXHW6q6WSzm3vvAgb29Dc8BGJfjTE67xAuROPoyIhGJoQ1QQK9iAaPieKWqG7tatk8tL0ymk7Isyex2O85F4uTLJKXUti0HBfQqFjAqjlequlks5t57XplMJuXXkkwmM8j8K6XUti0HBfQqFjAqjnNV3djVMv4dgw98wGgy4iimGNrAQQG9igWMiuNcVTcLO/et5xrT6TQccVBAr2IBo+J4oaobu1p2XedbzzUm08n6+5qDAnoVy5FRcbxQ1Y1dLbuu863nSiEEDgroVSxHRsVxUtWNXS3paNuWa0xn0+DDAAroVSwnRsVxUtXN7/Lb9sfWt55rTKaTbdiGEKCAXsVyYlQcJ1Xd2NWy6zrfej5sdjvbP+/X6zUU0KtYXjAqjhequrGrJYOOjs63nvfMbme+9SEEKKBXsbxgVBznqroB7GoJdF0H+NZzwex2Rof3PoQf0KtYzhkVxytV/QjGrpZ0dHSAbz1vmd3Ocszfw3dCAb2K5ZxRcVxQ1Q2wsHMGHf+5wbeeo9lstt/v1+sn6FUsrxgVx2VV/QhmYecMOjKZo5KSGwa5y3mf1+sn6FUsrxgVx3uquuGF+8UdRyXlzS83j3/8Cb2K5S1GxfEBVf3IfwxnehXLBUbFcb2qfuRExXKZUXF8JqPi+ExGxfGZ/gGwXcCQ6/TGcQAAAABJRU5ErkJggg=="},{"name":"Ahrim's robe top","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFjUlEQVRIDbXBz2sb2QHA8e/TDFb8K31N0lXj2kI1kmcQuJhdXhdCeSy9hF56KhRKD+tC7/un9N5D/4Oy0FLosocwl9IONSELAk1cdzYZlE4kxxPLsiXPezOVx1HZsN2FXfDnI7TyuUlCK5+bJLTyuUlCK5+bJLTy+VpBGPG1tNrhqwmtfL5CEEZcKX71m1//5Y9/5m0Zmeqqp72nWXYKaLXD/yO08vmCIIxY0B88GLz4zygdvfv+u8DRv44wZFm2JteA+xv3p+fTly9eAj9o3j8In7Cg1Q4LQiufhSCMPvjpT2o1KrVajfjz5LB/KKXc+/FecpQYDAt37t45+PuBlLK+Vu9st4oCisJaWxSE4WOtdqgIrXwqQRgB3W6Haw5zxydZmqSNRgNYl+tcsxhMNspYaGzcw3Ity0ZpegpotQMIrXwgCKPdXR8HB6dWoyi49mL0kpw0TRuNhpTSYlkYZSPmZsxtbW1wzeHi7NJgMCaOB1rtCK18KkEYQdFut95553sWW1goihcvRjl5mqRy7p7kmmEuzmJAIoHtTssBarUapOkrY0ySDKDUyhNa+VSCMGq3twHHYa7fPwSklECWZXLungQ+2v/t7/7wewxxFjOX8T+7e93PHvc2NzeBJBlAqZUntPKBIIw8b5sFC9PJNEkSKSUL8p5kob5c7z/vM5eBhIzGZmPZXQYDGK4k8UCrHaGVTyUII6Dd3XZwJucTDHNJkkgpqWy0Ns7PzqnUl+v9532uZWxubgI5+bK7bDBJPOBKqZUntPKpBGHkdTs4ODin41PmDGdnZ1SyLOvudc/PzqmsLK/0nveoSOSaXGPO4N5yMRhMEg+g1MoTWvksBGEERavdwmAwuclnZzMqWZbt7u2Oz8ZUVpZXes97gEQCUkrAYDAkSQI1KLXyAKGVz0IQRkr9CGpheLDZ2sxNPjubsbCxtXF+cU5lZXml97wnkRkZ0LrXAuLDeHe3a63t9Z5CqZUHCK18KkEYdbudW7eWHMcZDrM4fkZFyttUNrY2Li8vjTVAfaneH/S5ltWAdrtpDOvrK9ba09NJkgy02gGEVj6VIIy63c7S0lKWnRhDkgyAnz1Ud+98p+Y45xezsiiKsri/tfPv6LPRMMtzi+NYa09ejpL0FGi1msaY1dVbk8k0SQZQauUJrXwqQRg9ePDe8fHJZDLN8zxNh1CC2N9/uLq8Mjmbfvf7P7TW5qaSm4N//K3RuDubzR49egIliHa7OZ0a13XrdbffP4JSK09o5VMJwuj9B+8dH5+Ymbm4uEjTIZQg9vcfliWzWb56e2N1bc1YY3JzcvL69fEzYDbLHz16AiWIdrvpOO7MmvqS2+8dQamVJ7TyqQRh5HU79tIaM724yNN0CCWIDz98WBTF6u0tY83q6oqx5tUoK8vCWvtq+Dnw6aePoQTRajXrdddaMzUmiQdQauUJrXwqQRh53ra1Zjy+ANJ0CCWI/f2H1hZ5sW6tXVtfW11dOTnJTo4zY2xpXwOffPJPKEG0Wk0wrusaY+J4AKVWntDKpxKEkdft2MvZeHwBpOkQSq28IIx4o+AtNd4ouSJarSYY171lzDSOB1Bq5QmtfCpBGHW7nUtrp5NxnpOmQyi18oAg7HNF/OKXP7e2MCb/08d/hZKKVh4QhFG73TQGt+6amYnjZ1Bq5QmtfCpBGHW7HWvtZDJOkiGUWnm8LQgj3ii18nhbEEatVrNed601h4fPoNTKE1r5VIIw6u52rGVymiXJEEqtPL4kCPuAVh5fEoRRu910HNfCYf8ISq08oZVPJQij3V1/PD41hiQZQKmVxzcRhFG73TSGet3t94+g1MoTWvksBGHEG6VWHt9cEEa8UWrlAUIrny8Iwj6glce3FYR9QCuPitDK5yYJrXxu0n8BvSbsn7p9RMUAAAAASUVORK5CYII="},{"name":"Ahrim's robe skirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEGUlEQVRIDbXB3UscZxTA4d9rEOPmg7kpBbsEL4wzSBQxHIRBzpXkpiQk0P6fJaEXvQlhkED6lmVBEHZSRMJWIunFxBqju3PONF0qUfzI5iLPE1QyvqWgkvH1ilhyiso8lwgqGV+jiCXwffu7vf4en00wojLPWUElY2xFLB+s3/fa/uhuc6KqKj6bUJnnlKCSMbYilg/W79e1PX/RSZLkyc8PzeztX29/f9Wpqor/TajMcyKoZIyniOVPT3RQ10+fbayurrjz+vU2UFFxIiGpqgomVOYZCSoZ4yli+fjR2i9PizwXMwPcMXMwoNPZXF6e29n5u6oqmIBGJQWCSsYYilg+ebxWD+tnv77MczEzwB1wM8A6nc3lxbnBoN7qvYFGJWUkqGSMoYjlo4f502cbeS6AmQHuDpjR6XQXFmavwcDo9d5Ao5IyElQyvqSIZbs9c+eH2y9fbeW5mAHmDjhgRqfTXZWF4dCGg+PNrTfQqKSMBJWMKxWxbM/OUNPv9/NcADPA3AEHYuwuLMzeuD41HFp3cxsalZQTQSXjSkUs2+2Zg4ODqqryXAAzA9wBB44+VK1breGxDQe2ubUNjUrKiaCScbkilu32DNDv9/NcADPAAHfAY+wuLsy2brSOh4NudxsalZRTgkrG5YpYttszBwcH9+6l7g6YGeAOeIxdEpKphGM+qap9aFRSTgkqGZcoYtluz/T7fSDPBTADDHAHPMYuCQkJUFX70KiknBVUMi5SxBIcePDjg8P3790dMDNG3ImxQ0JCwkhV7UOjknJWUMm4SBFLXVevfeNFkefCiJkB7oDH2CUhIWGkqvahUUk5K6hknFPEUtfV3TeeF2trq+4OmBkj7sTYYSRJEqCq9qFRSTknqGScU8RyeWXJ3CanJpMkef7bc2B1dQVwJ8aO5PLh8Giru5kkCVBV+9CopJwTVDLOKmK5LEsYk9cnzQxwd4ybt29uvNhgZGV15ejwaGtzi/9MQKOScpGgknFWEcvllaXJ65OAmbk7YGY4ht1o3TCzo8MjM8B6Wz2YgEYl5SJBJeOUIpbLK0vA5PVJMwPcHcMwHPsEw+DaNewT/uy9hkYl5RJBJeNEEcvZuTvA1PQUhpndTm67O4Zh5oZhZseDY2pq6v7OLjQqKZcLKhkniljOzt0BWtMtwzAMw6itvnXzlmEYZnY8OK7rGujv7EKjknK5oJJxShFLTkkX72KYWW010JpuHX48pKam7u/sQqOScqWgknFWEXt8FoB04a6ZAbXVH//5OD09XVP3d3ahUUm5UlDJuFIRexDSxbsYHw4/DD8Ogb29d9CopHxJUMkYQxFLoD07M6yHDNnbeweNSsqXBJWM8RSxB6Hdnun3d6FRSRlDUMn4GkUsoVFJGU9QyfiWgkrGt/QvS8FWn88FgrAAAAAASUVORK5CYII="},{"name":"Ahrim's staff","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACv0lEQVRIDbXBwWubdRgH8O9vuDkPguhhMKYHce/vgbEREh5SXsJDCMPi3+DNIR4meBEvnsWdvewwGGMgDIbgTYRRymMNDQ97iR2V5mkooYQexYuxWpqfJGxgWLO9yejnE4QJpykIE16BmgtnmKXmwhmmgjBhKWoOoJ5XOu2ucIYpNQdwtUJPujvCGYAgTFicmnP9GqaOxyhsC1P1vDYa/fXOW2+Px2PVTeEsCBOWouaYGN/6NT64ee7s62dXPvvjl+/e7Ha38VQSjkGYsCw1b33Y8N9758+/0e/vA6jntU77MZAACEcAQZiwLDVfXW0OBvu93h6QMBGAJBzxTBAmLEvNW9cba482gCQccZIgTFiWmmMiCUfMEYQJS1Hz1Y+aP/+0DiThiDmCMGEpan61+t6TYh9IwhFzBGHC4tQ8b15ur+8CSThiviBMWJyaV+rvdzt7QBKOmC8IExak5jGXXluBJBzxQkGYsCA1/6C60i82gSQc8UJBmLAINW+0aGNtB0jCES8ThAmLUHNuXLaNXSAJR7xMECaUpuZynfTRDpCEI0oIwoTS1LzZytfX2kASjighCBPKUfNPPv347p3vgSQcUU4QJpSj5lW+VtgWkIQjygnChHLUHBNJOKK0IEyYQ82FM0yp+aVLF4fDAyAJR5QWhAknUfNK9Uq32BbO1LzZyvs+GA4PgCQcUVoQJpxEzb/59usfHv5YFNsiK2deO9P3wXB4ACThiNKCMGGWmmOqnleOjsYA9nYHF9+9cPzvca+3hynhDOUEYcL/qPmXX90sit8OD/8ejQ67xTamPv/iRmfTAPCNP0eb+b27D4QzlBCECbPUPG/Ujv45MtsCEp4KleoVrtfu3L6PiSQcUUIQJsxS83pe67QfA0k44hk1x0QCIBxRThAmPEfNgSQcMUutJxyxiCBMOE1BmHCa/gPiBi+QU2czPQAAAABJRU5ErkJggg=="},{"name":"Ahrim's wand","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtElEQVRIDbXBzWtcVRjA4d876sZFQV240VLC9NxDZGAQXrKRF5EOUspcdKMbqbjtUnBdxL3/gghu3AY/KGYhRyqEA3a4ww2Z0yEcQxlwF3QRaNNc28BgSqLO3CTPI6ae04SYTB1nJqaeE0JMn97++MvPvzZ1nI2Yek4TYup2L0+nu6aOMxBTz2lCTN1iZTrZgca0oC0x9ZwQYrp5q7z3axqPtqExLWhLTD3PCjEBN2+V935J4/E2NKYFbYmpZy7EBAw/eBs4+Kuz83uebO1AY1rQlph6joSY3nv/+uPHBw8fPQI6dJ5/4blxVec8M3W0JaaeuRATxwzLATCu6pxnpo5WxNRzTIgT/iHDciBQVXXOM1PH8sTU8+9CTMNyIFBVdc4zU8eSxNTzn0JMw3IgUFV1zjNTxzLE1PN/QkzDciBQVXXOM8DUsRgx9SwgxDQsBwJVVQM5z0wdCxBTz2JCTMNyIFBVNZDzzNQxF2IydZwgpp6FhZiG5UCgqmog55mpA0JM/TffGP1WmzqeJaaeZYSYgLIcVFUN5DwzdUCIqShWJpMdU8cxYupZUogTkLIcrK/fWV0ttrbuA72ef+mVl3fzg5x3TR1zYuppJcR0/cY7P36/AfR6q+Px9u0vPvvhu5/i5gga04IjYuppK8R07ZptbPwMHWhAeKoxLZgTU09bIaZe3+/vP1x99WA97Jq6ECemBceIqaeVEFOv78ejbZ4oDj98vfvtxg5g6jhGTD3LCzFd6V7O011oeEp44srha/s8+KNj6pgTU08rISZoTAuOhDgB+ejdlW/uTKFj6jgipp7zE2L65MbVr+5O2OuYOkBMPecnxNR/6+qLh5e2tu7v7f1p6sTUc65CTICu9ePmCBox9Zy3ECcga2v9zc2RmHouRogJGjH1XCQx9VwkMfVcpL8B70Urwyt1HVYAAAAASUVORK5CYII="},{"name":"Ahrim's book of magic","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFKklEQVRIDbXB708b5wHA8e+DHbdNQhwT4zQJUZcFfDcopiV6ZuXHHilVlFYiRTCktdLe5w+Z9mJvNmnv9mpvNq3SNK3qRjZlRVl2XaayS8kPhosPVpwUMLaJbe7A2Ca+Gz3JmqPihr7I5yOU1HmRhJI6L5JQUmd/DNNSMs63JJTU2QfDtJLDiemZh4CScfZNKKnzPIZpJYcTNE3PPASUjLMPQkmdb2SYVnI4wbOib5y68eu/4lMyTntCSZ32DNNKDidoMT4Wo8XfF8TN33wMKBlnL0JJnTYM0xqfGMH3tIuLp2vs5dY8rudOfXALn5JxWgglddowTGt8YgRfcqg2vxTVz6zTxl/uVd2GGwwFb//BAJSM4xNK6rRhmNbo9WsXeqr45pei2bW1y+eDwIP5zuKT0uWLQXyfmtlMngOHXt4q24EDgcGTgd99OKdkHBBK6uzFMK3R69cu9FRpml+KZtfWtreq3bHoprNZLBYn3o3he/Aw39NzdPqRC6wurvafCGxWarf++VjJuFBS52sM0xq9fu3Y0yPad/L4chtngQ3bAW786eMf//yV2788+qN3Y/j+drsaOWIXxBE8Ht9/fLLraaW6cz9VAE8oqfMsw7SAn/3kCr50JpYv5MPhI0B39zFnc6u4XvruxNytX3RqWi/w5ve2gE/uLC8VGoeobVWDgUDIKa1mlm3whJI6LQzTGp8YedrFxdM1fHdMAfS9l2589jYQOHdz5ca5WrX6+NGKS+P9sRM0Tc5UIttFx6k8cQ7Ozs6Dp6QmlNRpMkxrfGIEX3Kohu+OKYC+99KNz97+6MMbP/xpEPj8g3gum3dpvD92At/kTOXVRtHeqGdzTj1wNJ1aAE9JTSip02SY1vjECL7kUA1YWjv5ZL28vV0BenvPBM7dxPfvXx0Hht4cvHdvdvRqGHgwk7U369lcuViqZZZt8JTUAKGkjs8wreRwAogOnfrBmR1afGKyq7f3zNxcGqhWtoFrV8M0Td6tRGuFYrm2misvZmzwlNTwCSV1fIZpJYcT+I6+fvxyr0eLKaNOB7sSif5P/2WOvhOhxe//nD/Q0eGUV1LpAnhKajQJJXXAMK3kcIIW42MxmvJ238P7c1dUCF9u4+zx8H/xTd6tnOrYsO3tR2sB284tL9vgKanRJJTUAcO0ksMJWoyPxWiaMupXVIim6QcHIofy8d7I5N0K0FUtFEu14tZLqdQCeEpqtBBK6oBhWv1aH9B56BWgsy86dXPqratvXX09yLOmZ/Kx6OFwZ/Cjf2RDB0PxcKO0UVlZ2ybQmU5/AZ6SGi2EkjpgmFa/1jfcG5pZrAOB7lA+kx+4MOC67juJEE1uw/3tH7/sOtuNi+u5lcxqLBLMrjulJ7XlnA2ekhrPEkrqgGFa/Vofvjd6Q/hmN9h17NVjeLiuyy6PUn490BE6HDm8U9vJWStdndjO5mLGBk9Jja8RSur4DNPq1/rwVQK186910vQfh12RaMTFxaWwXGCHRr0WCgRTqUXoAE9Jjb0IJXWaDNMC+rW+VHph8NIA4BSd8691Aq4LNFJbgXBXGI+TFNdL9bViAEilFsBTUmMvQkmdFoaZBgEeCHyDlwacopM8fRCfB59vBXpC9WyhXHZqmYwNnpIabQglddowzDRfEcDgpQHAKTrfP30QD8dtfJEppxcL4Cmp0Z5QUud5DDMNAt/gpQGg5+X67HxuedkGT0mN9oSSOvtjmGm+Ivg/T0mNbySU1PmWDDONT0mN5xFK6rxIQkmdF+l/vjFLayjmQxsAAAAASUVORK5CYII="},{"name":"Dharok's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEs0lEQVRIDbXB/2udVx0H8PfpbjGj1sbGLXOEUdvb+zw/iQw+BML4EIpbmCkDIRYRFTacMJgd/UHHrH+JiP6mIoowGaGXEsJBBuFASDPGlqd3egmh7K4Lvcn99pzzOV9MC9Vbu6e9/uDrpZhy/C+0KZgamJhiyjExbYrvvvKtv767xdTAZBRTjolpU/z0Nf71bzWQmDJMQDHlmJg2xRuvL+7c/HRt/WOmBiagmHJMRpviys9eHAxse3e/ef1DIDFleBzFlGMy2hRX3nzx4HDUuX343uo2kJgyPI5iyjEBbYqfX1nq9233zqB7OFxtfgiAqYHHUUw5JqBN8eYb3xbxd+4MPt/vfXXmXOnse3+7DoCpgWqKKcfjaFP88Mcr0ye6zvruwaDXs7WpWSvirBv0+sZsMzVQQTHleCRtih+9+r2ZE10fki3daOj6wzLWZsWJtc45u3er027tMjXwRRRTjkfSpnj1J98/NbXvJTnxpXPDgfXHnhbnxUlpXX/Q3zTbQGLK8BDFlKOaNsVrr/+g/c/db2ZPig8isSxdaeWz273pmW8UrRYCpk9Pf/Zpp9XaZWrgIYopRwVtirevXj6m1OFB/3D/I++jiFgXrJWvzJwLPqQYQ/BOgh2V6+vvA4kpw4MUU44K2hRvX718TKmDbi+lePD5x9ZKaeXUTD2E4CVICOJFrPPOHx72Nze3mRp4kGLKUUGbol4/C/iyHC2/8p3e/s7ISjmSmacbIYQ//P4vc3NzuEv6fXv27JnNzW0gMWUYo5hyVNCmqNefa7XaAGZnZwF0Op3p6WkA3W4X983NzdVqOP3U1zbNNpCYMoxRTDkqaFPU6895j1oNQM37st3eq9fPeO8BeI9/q9VqT82eNhtbQGLKMEYx5aigTbG0fCHFiCMxFjutdnuvXj/zzLOzMcYQEUMIMYq44MLJkyc2NraAxJRhjGLKUUGbYml5MUUgxn980m612riHLyxEH8THGEQkBAnOhU6n0+0eAokpwxjFlKOCNsXS8mKKaK6uYQwvLuj19+cXnheJMQQnzrnQ6/Y6ndtAYsowRjHlqKBNsfTyYgIQ0by2hjELL5BICDGKuODCke6g19m7DSSmDGMUU44K2hRLy4sp4khzdQ33vcDzf9cbNP98EJEYnjj2xGgwGgzKvb1bQGLKMEYx5aigTbFy6WKv17+2uvbS0mLz2jrum1+gGEQkHD9+XKw454bDQbt9C0hMGcYophwVtClWLl0EcNjrI6J5bQ33LPB88PKl2pT3IiGIFefccGjb7V0gMWUYo5hyVNCmWLl0EcCf//TuSy9faK6uYQzzgo8iEsSKu8u2WrtAYsowRjHlqKBNsXLpIu5JMd3Y+gDAufNnQ4jRH4k+itggIs65qaknNze3gcSUYYxiylFBm+Kdq2/dvPkJgBTSjRsfADh/vh6C9z766L0XseHkqS/3en2zsQUkpgwPUkw5KmhTvPOrt5RSOx/djCmmGEOIPoTg/TPPft3acjQsh8PR9abGXYkpw0MUU45q2hQAfvHLy9H7EKM/Ir605e9+80f8RwLAlOGLKKYcj6TNDqDw3xLuY8pQTTHlmIA2OxjDlGEyiinH/9O/AKHR8p8QlAjMAAAAAElFTkSuQmCC"},{"name":"Dharok's platebody","base64":"data:image/png;base64,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"},{"name":"Dharok's platelegs","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAElElEQVRIDbXBz2ucxx3A4c/s2l6TuM5rYuUFVzWLWGleRF1EyhdRsQzUyaGH/gWFFloohf41PZRALz300HMOIQEfX3obWBaUiu7LEtbmRfB663ZYr/dHdmbeVmpMtUiK14c8jzKS8V1SRjLeXm4LLjCyxzWUkYy3kdsCSNO7H7z/4PjkJEkSwLkJYGSPS5SRjI3ltjj88GAV46vpFBgMh4+0Bo4HgyRJnJsARva4QBnJ2FhuizTdYrmsnNOdToCPfmb+9Mc/A/udzmSxKMsSGkb2eE0ZydhMbguIaZpWVXV0JC+e//vjnz/++5f/KIfPPOC9h9VqVVUVNIzscU4ZydhMbguIQLd7GGMMAQgvXkzwHhiORp1OZ/HyZVlV0IDaiAaUkYwN5LaAyLlu9zDGGEKIEYghhBjp94+TJAGcm0BtRHNOGcnYQG4LiEC3exhjBEIIMQIxhNDrHQNJkgDOTaA2ojmnjGS8SW6LNN0CtG7HSIwxBCDEGEMgxtDvH/N/DaiNaM4pIxlvktsiTbeqqup2D4EYYwghRiCGEHq9Y9Y0oDaiOaeMZHyr3Ba//mX38yeD3d02EGMMAQgxxhDo9fqsaUBtRPOaMpJxvdwWwK9+cfSXv/6t2z2EGCMhhBiBGAK9Xj9JEsA5x5kG1EY0rykjGdfIbbH/aPcHD77//nuLZ6chxgiEAIQYI2BtH0iSBHDOQQNqI5oLlJGMq+S2AA6PfvyTg3t/+OQJ546OJIQAxBhDoNfrJ0kCOOegAbURzTplJOOS3BaPDjLge++8e/DD954+/edwNHXuZVWNIQIiB9b2f/ebx5Ppqy+eDJxz0IDaiGadMpJxSW6LRwcZcNw/aXfa3ns8q9W0qiaA3t8dnAx+/9vHs/nXn372pXMOGlAb0VyijGRckttC7+/eajZDCCcnAyBN06oaQw1K5EeHH96fzb7+6mk1evZqNDqF2ojmKspIxrrcFnp/l8CtW835fObPMJ1OnZsASXL3/v37P+1uV+PJyeBfC+9vwGh0amSPqygjGetyW2i907zVJDCbLb33sCrLMdSgOnpnOBi229ut1u0Q/HD4jDO1Ec1VlJGMdbktOnqn2aRJczZ75T3T1dRVE0DrnRCgCcF7D3jAQzk6NbLHVZSRjHW5LbTeCbBYLoDVfFpVE2C7/eB26zbBA957wAN+VZZjqI1orqKMZFyQ26Ldfth6p7WcLb2fw02gLE8BrXfevXtnMpkS/GIx51xZjqE2ormGMpJxQW6Ldvuh9/7evbvPn79YLpfOTYCO3iEAnuYNv/Tez1fAiqoaQ21Ecw1lJOOC3Bbt9kPwzk2dc9CAGlSns+PxNzjjvZ/7VVWOOVMb0VxPGcm4ILdFu/1wPp8vl0vnHDSA7e0H0+k0Se4AHvCU5SnUgBHNt1JGMi7IbQERSJLEuQnUoNJ0a7lc3rnTWq34n6oaQ21E8ybKSMa63BZ8o+aMStOtmzf5r9WKqhpzpjai2YAyknFJbgeAEQ3ktoCYJEmr1aqqMdSAEc1mlJGMN8ltwTdqI5q3oYxkbCC3A8CI5i0pIxnfpf8Aw3R3n97A6KcAAAAASUVORK5CYII="},{"name":"Dharok's greataxe","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADeklEQVRIDbXBQWjWZRzA8e8zbYKWvYeljmgO0ud9GLxjCj8mMX6HDplIoS2S3DwUlrdu0qGDFzt0LQgUCQQLDKOxlWhKh+cQyEPb2Bu6PS4Z410xt+plvltb633f2p9enOQ73zn9fIyK43EyKo4qfIgqlrUxKo4KH6KKJeFDfP+D9z768GOWUbGsklFxJHyIR491nzl1TsWS8CG+/W5XdiBLIrMr89npzwEVS82MiqPCh3j0WPeZU+cAFQv4EAFpby2W+Ffbrsz69etPf3pWxVIbo+Ko8CFKe+tMvrA59WS4NsQy0t5Kxfbm5gvne1UsNTAqjmV8iDt2NL1zdsMnXbNbnmkA1tXxf9ubmy+c71WxPIhRcdzLh5hpc8Af0781NGx5YsM67qdpe9NXX36jYlmRUXEkfIhUSHvr4kLx3MDTLz93M5ebIrF3/4u/T09Tsa2xsa/nMpRV0lRnVBzgQzxx8vili9+XikUokVhcKALT07dzuSkog5H2VhLbGhuBvp7LUFZJU51RcYAP8cTJ45cuXgGu/dAPdSwptbVlBgezmUxLNjvcknGbNtaT2LZ1a1/vFSirpFmRUXE+xN3SSkV/GIIySwzw0l79a/Hv3HhudHS8JeM2bawHiiWebdza13tFxbIio+IAHyJ3lVXSgA/xQOe+UrE0eXt6YX6+uFjMZodZUgJ2S9vOnc+f/+JrFUt1RsWR8GGEhEqaCh8icODgvom5+vGfr0+O3oQyGO4qq6Spzqg4VuTDCJiOzu6nSj9lByZyY1Mq1ocREippVmRUHDXwIXYe2VO4M3+5ZxDKKmlqY1QctfEhHjy8Z7Yw/13voIqlNkbFUTMf4oE39xQKc1f7hlQsNTAqjtXwIb56SOYKC1e/HVKxPIhRcaySD/GVN+TGKKP9QcWyIqPiWD0foux/bWr81lh2UMVSnVFxrJ4PseP17oXZ2V9v3ciNDKtYqjAqjofiQ+zo7JorFCZGspNjt1Qs92NUHA/Lh3jorY65O3/2XfiRhIrlXkbFsQY+xBcOHl785fr42AQwOTmlYlnGqDjWxoco7W3hWj//qVOxVBgVx9r4EKFEIpVKAfn8jIolYVQca+NDhFIqlcrnZ4BUajOQz8+oWMCoONbMhwilVCpFIp/PQx2UVdJGxfEo+BC5R1klDRgVxyPiwwgVKmkSRsXxOP0DVwhvkLcptaAAAAAASUVORK5CYII="},{"name":"Torag's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEUUlEQVRIDbXB/2uVVRwH8Pc5u1PTshsYg34qoT0Hv6zL1U+TjMPqB8eYLSNRDP+8IIggfwt/EXkKazwoIiHcR9NlNrjN7Kw9d89zzuec83TvdaOGre6KvV5Ck8JuEpoUdpPQpLCbhCaF/yfNck2T2IbQpPCfpFmOodm5matfXQegaRLPEZoUdi7N8ouXPnTOeeedY2udc/bGjZsANE3iL4QmhZ1IsxzAJ5c/ci54ZvbM1lXO/W7WyrIMwd+//0jTJDYJTQojS7P8/IWzNbCnMc6ePTO7sLq6apnZclmW1lZlyd3uiqZJDAlNCiNLs/z8hYUacU9jzKz12DlnnfeB+yyXZWltVZbc7a4AtaYEgNCkMJo0yz8+f1ZI6ZmtY2YXfV/0nplDr9dzLlRVVRSFMQaQmiYBCE0Ko0mzfOHcnBToW18vPbsY4SOvF5ZjCK4vVFVVFIUxBpBArSkRmhRGkGb57Pz7tff797+AGmVpOfiqsswcOHJ0wQXnQlVVRVEYYwAJ1JoSoUlhBGmWz87P1D7GOnoffYwNKb3jocjRBRecC1VVFUVhjAEkUGtKhCaFEaRZPjs/U0fEECvnEEOMkTkwc4ghuOBC8LYqS+52uxiQQK0pEZoUgDTLNU1ie2mWN5sHT77dijH2qhIRQIghMocQQ3DBhVDZisui2zUYkECtKRGaVJrlly+d+vSz77BJ0yS2SrO82TwIoNU+9svKyt2fOsdfPzI+vieGEGIILjhnq8oXRWGMwYAEak2J0KQApFl++dIp59i50GiMffHlTTxnevpEp3Pv2FTy/Z1FDDSxaeK1Q9Z5X5VFYY0xGJBArSkRmhSG0iwHMD83VfZco4Gxxljz4H4OUUoIIaXE/R/5lWZzdc107j4AkBx5E0Dn7j0AExOHrK1MWcDCGIMBCdSaEqFJYVOadQAxNzsFQEqMN2TwERICEkBhX5RSrq6ae52lmfdO//DwYXBhyPeVnm1hAWMMhiRQa0qEJoWt0ixf+KA1JhACnpESfVe+vjXTfvf6tW+aTRw+3GJ2YcgG38clW2uNMdgggVpTIjQpPCfNcgBzZ44GHw4c2AeB5S4WO7dg8Ey73Tr5VvPpb709e8cf//zrg6UeM1trjTHYIIFaUyI0KfydNOsAAsDcmaMx4unaeNa5BYNnWu3j0+1Xy3W3tLSyvGwqP87M1lpjDDZIoNaUCE0K20uzDiCm3znRfPmlq99eg8GQbLWPnqaJ7pO1Jyvm9p2uMWZiYsJaa4zBgARqTQkAoUnhH6VZfuHiwudXr8AAkACIWszsQkje2LfypLf0qAvsZYa1FoAxBpBArSkBIDQp/Js0y7GhBkSbpiIH1xeCt97DH9i7LwRfVf7x42UM1JoSDAlNCiNIsw42iIVzs9xnfVWVzLy4eBt/qgFoSrBJaFLYoTTLsUWNTZoSbCU0KexcmnWwSVOC7QlNCrtJaFLYTUKTwm4SmhR20x9buN6fUIBDLQAAAABJRU5ErkJggg=="},{"name":"Torag's platebody","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFwklEQVRIDbXB/2uU9wHA8feT3KmdNrspejOL12fp7Z5nruky46ehIX6QEiwbzFWUCYP+vL+t24qlhUFLB+XTTsg+mp07jeaT4B6y65UzCT69y317Ps+XNYdHI5qBA18vRwqfl8mRwudlcqTwOZjSRooK/5PSRooKB3Ck8DmA0mZm1q9VHwBSVHiG0oY9KYxJUWFEaSNFhSFHCp8DKG2WLsnPP1NuuRRsbPIcKYwtLM7d/Oo2ZFJ4Shvg91fm/nTjthQVwJHC53mUNpfevXinutJsts6e/VkCSZJsrG0w5JbduN/b3R2EYatQmADCsAVcfW8uNz72wYcaMik8wJHC5xlKm6VLsr3bIUlSyOfzSWrDndZgEAdBUC67hw4dTqDT7Yjzv6pVa/1+bO3u4tvTQJLy0cdVyKTwAEcKn6cpbd5ZWmx/u5uQtlq7p06egNTaxFpbXamVy+72djg9fabfj7rdzvm3zt36x0oul+v34/nzp4EPP7oNmRQeQ44UPvsobZaW5Lft1uOwBfy4eGpre+fE8Qn7nUESfPOfY/ljR47kJn5U6Hd63W6n17MLF97St/5JbMnlbc82m1uQSeEx5Ejhs4/SZn5hbmfnMVA6M/l1owmcOD5hB7ZvI3oRQ0cKE512p9Xt2F49/8rU+blf3rp9x8Y2T75eb0AmhceQI4XPiNJmYVHsbO0A7rTb3N7u9XvjjL/6w6N2YK2NHm+3cns4cepkt9tph63jBfsozOdyuTdnfr6ia9Za8jTrW1JUGHKk8BlR2ixKsbW9U6m8HgSN/OF8v9tfra3OnptJbJJPEvaxh8bz7Nho0O4WcodzcRJ7XvnenVoulw+CBmRSeIAjhc+I0qZYPLl4Yf6rL5dPl04nNqlVa8Ds7EwURaura+zz60tT29tWrzQB76w3Pj7ebbdc161W74ZhCzIpPMCRwmdIaXPxnYX799bfXjwfbH4NBOtBGIbFYhEGzWbI0/74/tk0Sf7817UwpFAoTLqTUS964w3vi7/9vVA4FgQNKSqAI4XPiNLm2vXLGw+DxCaMQUqteq9YPAk0m02eduW37o1PgkKhEIatc/Oz/UE/iRKgUna/VMth2IJMCs+Rwmcfpc3ixYVup5smaWSj1doDSNmnOFVs1ptXL7tpxo1PAvaMnZufTW0apRGwWn3AnkwKD3Ck8Hma0gYQC3PW2qr+F6SMFItFwC3xnWXd5Imx+UVhrV1ZrrInA6TwGHKk8HmG0mvg8ETKSLFYfL1EAsu6yffGeCIDpPDYx5HC5wBKr4Fz5b3FeBDHSTKILBDH6dp6cKJQSGDi6OG+TWq1h5ABUng8w5HC52BKm6WlOaDw6tEoik9NTQ8iG9no4epdxsetjXq9eG1tEzIpPJ7HkcJnRGkjRYWnKW1mZqbnFxbTLHntp691djudTnf9/nqapQ9W79frW5BJ4bGP0kaKCkOOFD5DShtIYYwRKSqA0ubdS79o7/a63fg3v7uazx96tLW1XruZzx/6wSv5O3e/2dhoSFFR2vC9FMakqACOFD4jShtIgUKhAIRhS4oKoLS5fk10ewPvzQuDQRxFg0eb1W7ffvrZPfZk4ExNTQL1eh2YcqfqQQMyKTxHCp8RpY1bLgG9dm8wGIRhCzIpPEBp84f3ryVJ8pMzpzfMv20c28h+/ukXkEnhAUob1y3FcQzU6w3IpPAARwqfEaWNWy4BvXav2dyCTAqPEaUNcO365b988DFPZFJ4DCltym6pH8dAvd6ATAoPcKTwGVHauOUSELd79eYWZFJ47KP0GjiQMSSFx4jSpuyW+nFMjnrQgEwKD3Ck8BlR2rjlEhBsbEImhceLUNoAU+5kPWhAJoUHOFL4jCht3HIp2NiETAqPF6e0mXIn60EDMik8wJHCZ0RpM78wt3zzNmRSeLw4pc3MrF+rPoBMCg9wpPDZR2kDmRQe/y+lDWRSeAw5Uvi8TI4UPi/TfwF8nA6uaG5ZtQAAAABJRU5ErkJggg=="},{"name":"Torag's platelegs","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD/klEQVRIDbXB4WvbRhjA4d+5bh1ammnNukA+GDGU6PDmEQpHIR+OsD9djMLQx0EgIh3CXDNUN2CcxLF870mLA4GGxKkz6PMoazTfk7JG879kecEta/ZYQVmjebosL+L4rQjXvK+rasoNa/a4S1mjeaIsL+L47c72z6NPn7nhfQ3UNZPJ1Jo9vqKs0TxFlhcHB3p2vuhtvGiAEAJ8+lRxo66ZTKbW7HFLWaNZW5YX79/rerZ4vvGMQAAaGgLXAv9+/lLXXJtMptbscUNZo1lPlheHh78vrkL3+bOmCU0gEKrq7Oqq3tqKQpAQmM/9xUU1mXSgtSYFlDWaNWR58cfh/kL8i85zaXzT0IRwdjaNftz0Plxe1QS5nHvAuTG01qTcUNZo1pDlxXD4SwhCIAQJwpfJBZDu7ngffAhhIdPLK+/rqppCa03KDWWNZg1ZXsRJHxARL766qAD7235dL7wPPoSwkOnllfd1VU2htSblhrJG8y1ZXsRJHxARLx5PVVdA1IvS/o73wYdwdTWfz71zY2itSbmlrNF8S5YXcdKXuXg8nqqqWOpE25vR60hENrpcE/FlOYbWmpRbyhrNo7K8ODw8ABqaf8qRKx1LnSjajH6KRAThlnduDK01KbeUNZpHZXmxv/9r9OaHZin8mf0FHSCKNqMoEhGP50blxtBak/IVZY1mtSwvoHln9v18EUI4OjqGDrSgBkO9CIvz6Tmea1U1htaalLuUNZoVsryAJk3TOtQyF+ccSx2WGnt4QIOI//hxVFNPqim01qTcpazRrJDlRTrY3Yo2P3zIge3t7aoas9S8e7fvm0W4tgiTy/PKjaG1JuUeZY1mhSwvBkMdvX41X1qcnlaTyZSlJkliEXn58tXR0TF0oLUm5SHKGs1DsrwYDnUIYTarQURw7pSl5v2BOfs8nou40kVRNJlMobUm5SHKGs1DsrwYDDUhzGa1IAjOnQJx0n+79SZ4P/eLo7+PoQOtNSkrKGs0D8nyYjDYnc1qEBGcc9BJkr4IIN1udz4X506htSZlNWWN5p4sLwZDTQiz2aUIzjnoAHHSR+j2ugQRoSxH0FqTspqyRnNPlheDwe5sVguC4NwpkCR9EXq9bggiQlmOoLUm5VHKGs1dWV4MhzqEMJtdiuDcKbSg4qSP0O11CXJyUkIHWmtSHqWs0dyV5UWc9BEEcaWDDpAkfRF6vW4IIkJZjqC1JuVblDWae7K8iOMd6JblCFpQcdJHpNvdEKQ8GUFrTcoalDWah2R5wVILKkn6InR7XYKcnIygtSZlPcoazQpZfmxNCmR5Ecc7ZemgA601KWtT1mjWkOUFS601KU+hrNGsJ8uPrUl5ImWN5ntS1mi+p/8Ah3Vpn52Pt1AAAAAASUVORK5CYII="},{"name":"Torag's hammer","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEBklEQVRIDbXB/2vUdRwH8Of7c1+8L37uzs1Nbuoa43bvNwPTTV8q43glsiYjE4cRGCkW9v9UvxWRYlEUjo3hh3EW53iz+uVdYgWpb6Y7ZM59aTU3pX27fcKhNJm5u5mPh2BSqJA2limL8ggmhUpoY48dP9LXm2fKogyCSaES2lg85jNJrEcwKZRNG3virTe6L3oNDXXF4igApizW0MYyZbFCMClUQhv75rHXr9+8FQDC0fBv125gjY6OQ5cvDzBlAQgmhbJpY3ftUQt/L1TXVIcjoYW5RWC5tFhKba3KdA1d+WhTJBStfyUNOIFAoPviJaasYFIomzZWysZAIBCOhAGEQqFdJydibjAYxg8fp2ZmHjRmGuLxWCwWBZwL578BfMGkUAZtLB5Zbm6WCCASiS6XSguLCwBcNzE/N/dgZjaRcHfU74jHYtFY9O69sbxXAHzBpLAebezxrs7env6OI7xQWhopjlTX1iwvlhZLi1WpLWNj4whgamJ6//49rusGw4Gx8UnhOHmvAPiCSaEM2tj2Dr7x+/VWau3ryWMFH2qLxyO3h4so4eHD2ZbWPW7Cdd3Nw8U7wnHyXgHwBZNCebSxzc1NVVtTda8VR67Uu8lkLBodHipu31kXCgZ/Mr+07tuVTLiuu3nodlE4Tt4rAL5gUiiDNlbKxmg8CmBTJLL/7OTS/NJ3H0aaMg2pZNJ145fzhZaW3clUYmT0nuM4wnHyXgHwBZPCerSxAGRzUzQSBpBIJP+YmgwgMDs707J3dzKRuDcxnvcGOjsPJ1JuPB4fuTsqHCfvFQBfMCk8lzb2xNtHu7+9lEolpqenAdCB1tramiF7q1RaOnhw38TknyKIvDfQ3p5LJpPd3R4e85mkYFJYjzYW8AEB4MwHfO3nqaqqLYXvBzOyse3A3rHxSRF08l4Bj/lYwSQBCCaFMmhzExCnz/KFzzSeaG/PVddU/zV9XzhO3isAPgAmiVUEk0IZtLGn3s998fkg4ONfoqurs6enH4/4TBJrCCaF9Whj330v9+W5QcBnklhFGwv4AJgknkUwKTyXNvadM7mvzg8CPpNEhQSTwn/Txp483fb1hR8Bn0micoJJ4Vm0sQBOnmqLxMLnPhkAfCaJygkmhTW0sa30apOMRWPh859qwGeS2BDBpPA0bWxqW2JnbV0oFL569VfAZ5LYKMGksIo2FsDh9tz0/ZmQ46Trtvf2eExZbJRgUnhCGytlYzy+eVu6NhQK9fX24xGfSWKjBJPCCm0ssNyQaViaW0pvr02n0329/YDPJPECBJPCE9rYthxNTU7Nz88Vi6OAzyTxYgSTwira2EymfmjoDuAzSbwwwaTwNG0s4DNJ/B8Ek8LLJJgUXibBpPAy/QMdvoBahLcdFwAAAABJRU5ErkJggg=="},{"name":"Verac's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEsElEQVRIDbXBT4hVVRwH8O95Y+KiZBbKhekmL8N378qF8KPdb2W5qI1I0KJFkNgqEkUhQiqiIhQLopCKMBK0NokVUQuRkwh2RIbMYI5TPt/c+XPfnTde3zy9/965p5lHA07zno4LPx/B5OMBSaUBMNWwCoLJx4OQSr99cH8wNfnliVNMNdyPYPKxalLpTz54L4yajcnJMJr95ew5phruSTD5WB2p9LEjHyZpOhM1G42gdfPmr+ckYJk8DCaYfKyCVPrUF8eSJJmdm5tpNusTQavVqjca9WCKqYbBBJOPVZBKnznxdWtubiaKZsLw+o1GGEVhs1kPpgDL5GEAweTjfqTS8ofTt9rt2VZrphlNTAZ/32hEc3Nzs7P1YAqwTB4GEEw+7kcqff7H03G7PdtqTTejiSD469p4nmWN6UYQRIBl8jCAYPKxnFSaqYblpNI/nfwmmm2NXrky3YzidpykibxwEagAlsnDAILJx12k0u8e2Hno8PdMNfRIpQFso63v7jv4x9WrM2E4f/t2u9P57eLvYRYirgCWycMAgsnHXaTSn73/0qUr9a9OnkfPrl3PXb8+cfny6OdHjyRZ9vobb6LHcZwsy+I4BipMNQwgmHwsJ5U+tPf5tWuG1qx95PS58YsXRrfR1vWPPXru7HksqVbdJCmyLIvjGKgAYKqhRyrNVMMSweRjOan0yU9fzfJulhXfnv1n0+NukiZhGJVlebMVr1u3Ni3y+bjd7RadTlbd/ESnnYyPjwMV9PDTW+TFa0w19AgmHytIpQEc/+iVEz9fu3MnMWVRFuWTm6t5ViTZgrTbLcvSmLLM0nR6ciIMY6Cyb88zt5Miy/Lj310ALJMHQDD56EcqvX0HA7g0Ouo9taU0pigKU5gFeW6GhmAAmG6adjtF5/D+nYUx7U6aJPk7R88AlslDj2Dy0Y9UevsOBpAmSdkti0VmQW5yYAjGhOH4hg3VNE06nezjt14orS1NufvAccAyeVgimHz0I5V+dgcDuJMkf46Nbd5ULQuTm9zkBkNDMCYMxzdsqKZp0ulkcRwDFSyyTB7uIph8DCCVfnn3i6WxY2NjRVoWZW5ygyEYAxhj0O0aJPNJlmVxHAMVwDJ5WE4w+ehHKu1WR4J6AOC1vXvmb81PTU3nRTfPiwWmLMvCLEiSO+OzdcQVwDJ5WEEw+ehHKu1WR4J6gHsaHh4GEMdtwDJ5WEEw+ehHKu1WR4J6gEUV/F+JnuHhYQBx3AYsk4cVBJOPfqTSbnUkqAdABbBYRgAlgGFnGBkWxHEbsEweVhBMPvqRSrvVkaAeABXAMnlYIpUGSsdxgCwDkCGO24Bl8rCCYPLRj1TadUeCIAAqgGXy0COVBkrHcfCfLAPisA1YJg8rCCYf/UilXXdjEIRABbBMHnqk0kDpOA6WhGEEWCYP/QgmH/1IpR13YxhEgGXysEQqDZSu6xRYFAYRYJk8DCCYfPQjlXacjWEYAZbJwxKpNFC6rotFRRBEgGXyMIBg8tGPVNpx1odhG7BMHu4ilXarI+giCKYAy+RhMMHkYwCpNGCZPCwnla5WR+r1KcAyebgnweTjwUmlAcvk4X4Ek4+HSTD5eJj+BYJexp95SUXNAAAAAElFTkSuQmCC"},{"name":"Verac's brassard","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEpUlEQVRIDbXBX2idZx3A8e/T7Gy0JQ2xhELm6tmhe5+XjGAc/OyQ7kcJWcZY03kRW6pOBO+8mOituxFE9NY77xQvZLPQua4GbRR5iMHx0NF5IOM8lvLumJ54euho1qY5f95zHjkHD6SM6Gji52NUUvaD80El4VOMSsqeOR9eWZi7cnlZJeFhRiVlz5wPC2dfvPzOVYhgVBKGjErKnjkfzn71pY1bG97/ffH8mYtvvquSMGBUUvbA+cDA3Lzeu7/1ufHxJx4vvH1pCaKKBYxKyqNyPsxMTwBPJ1/e3Nxst1tjY2OFxwpvX1qCqGIBo5LyqJwPM9MTUHg6+dJ69dbGxq0TyTPj4+Obm5t/Xl5RSQCjkvJInA/PTU/24Hq5dnr21Na9+xsbt08kxSNjo+9c+gNEFQsYlZRH4nx4bnry/XLtlYW5ra0H2c310onjvV7v4MFDS1eWIapYwKik7OB8UEn4X5wPU3YCWKs0gNOnv5Jl61mWnZ49dfDgoaUryxBVLGBUUoacD4uLZy5efFclYRfOB2DaTnRhrdKACMZOPdN60KIvB7KsBlHFAkYlZcj5MDevN0KWZVWVhE9xPsxraXTs8RDulCsNiPSZYvE4sL29Xa/XX/v2+V//8rcQVSxgVFIGnA8LZ1/cbrbKH3xYrzcgqlge5nx4ebbU6/Hx3aa/XoOoYgHnA/SKxeL29jZQrzcgqljAqKQMOB/m5rX8wYf1eoO+qGLZwfkwPTUBjB4urPoaRBXLkPPB2tLdu/eAer0BUcUCRiVlwPkwN683wg3gez/47vdff0MlYcj5MD01AZTXGvRFFcsOzocTtpS3mjmsZzWIKhYwKikDzodjxyaAer1RLE4CWVZTSQDnw49/9sabv/pFea0BkQEVyw7OB+jBAfqiimXAqKSA86FYPJ5lVfoiGPoiGAZmpiZe/cZ3fvTDn/IwlYQh5wNEQMUyZFRSBpwPEAEVCzhfAfPyS9Lt9no98ryb551et3v7zid53hkdHW23m61WJ8saKgm7Myopu3A+zM7O5Hkvz9udDs+/8MKRI0c+yqrtdl6rbTQ2qt0uIyOPVSpVlYRdGJWUXTgfZmdnej3yvPPsF2Xi2NFC4Yn797catxvVj9b/tZ4B3W5eqdQgqlh2cD6oJIBRSdmF82FubmZ5+X3gwjcXn3zqyVarWSoVm83Wn67+ZYStRuOTTqdVLlchqliGnA/WliqVmyqJUUnZnfOBgQuvLT51fLLT7rTa7eZ2c/2fG39cWqbvAET6DEPWloBK5SZEo5LyXzlfAfP1b32tm+ef/8LkP8LNTjtfunyV/4j0mXPnzvR6lMtrR4+OA6ur1yCqWKOS8hk4H4BzF1596ze/oy8yoGIB58PiQgrU7hwGDhxgZeUaRBVrVFI+G+crYCACKpaHOR/k5ExhZOTBg61Dhw6vrl6DqGKNSsqeOR/On30WyOqFev1jIMuqEFWsUUnZD86HkydnRkZGut3ue+9dh6hiAaOSsh+cDz//yetv/f6vwMrKNYgqFjAqKfvE+aD6PODc3yCqWMCopOwf58MplRXnIapYwKik7CvnA0QVy4BRSfl/+jfL+T4FhI2EuwAAAABJRU5ErkJggg=="},{"name":"Verac's plateskirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEw0lEQVRIDbXB8WvbVgLA8e+z5TrpGgg0wUvmFeGmeVpNSgg8Okp4jDH2p+6PuB/GIY7jQCMETHu1lgyTaDlUe5uWKJFkPemt9i6Q0POW9tjnI7Ty+CsJrTz+D34Qck2rbd4htPL4UH4Quu6647QAY8rRaAxotc0NQiuPD+IHITM1IKVbVcYYjCmjaKzVNteEVh7vzw9C111/9uwJcwcH30dRLGW3KEpjiKIxoNU2ILTyeB9+EAIvXniPH3/65k0CvHw5Kkv6/U+Ab789cN2OMUWakiTnWm0LrTzuzA/C/f1+r7dpLVVVvX59Cvz4Y/zZZ25d89ZwOIrjxHU7Kysrg8ERNIRWHnfjB+H+ft91N4C6rl+/PgXqunr06GNr659+ugCOj0+Bx48/PT4+LQqS5Fxo5XEHfhDu7/evfsXb2fjmm7/t7UnmNjYe1nVVVXVd89133zPX63UODobQACu08vgzfhDu7vQPBwPmlJJAVbG+vmptXddAdXr6c1WZySTd3FwFmk1nMPgBrNDKYzE/CLXa9oMQat7x1Vd7zJ2evgGqijzno48AZzg8AauVFFp5LOAH4Yt99c9/BF9/rfPp1P/7v6Dmti+/3Ds5edNs8tblJWtrS0Ca5kdHZ2C1kkIrjwX8IFTPd6nrlZUHeV5c5fnhwUtmam6TsltVNJvOvXsOMBj8AFYrCQitPBbwg/DFvsqLIs+zaloVRT4aRdBgpua2Tqezurp87x5VxatXJ2C1koDQyuMdfhACu7v9LMuKwrTvO8XUZBdJHCfQAAuCmZprrttpt5ebTV69OgGrlWROaOVxmx+E8ukTKjobD4f/Pl5ebjnO0sXFRVEUSXIOFsTz57vLy/eT5NfDw5dQMyelOxyegNVKck1o5XGbH4RS9mg2O2sPsyLPr/Isu5pMkregAezseK1Wc2lp6eoqPzwcQIOZWkp3ODwBq5XkmtDK4zY/CLdkj8rkudnYWLu8zM7O4iRJoAHs7HhZNjXGtO87xdQ4cHQ0ggb/ZbWS3CC08rjBD8It2QPyy4sSWpCmBZAk52BBdDrrKyvLuTFL7SVT5Jkp4yiGBlhAK8ltQiuPG/wgdN1NIMtK5uI4hgZYEFp/PhweQ9FqPVhacsxM6Tit0egMrFaSdwitPK75QShl77LIy6wsKNq0gTgegwUhnz4pri7X19fycjrNpklyAcTxmBmrleR/EVp5zPlBuLvbT9OLySRh7sGDtuMwGo0B+fQJVUWTYmpMbsqyBOJ4DBbQSrKA0Mpjzg/C3d3+ZPJLmqZJknS6qy3aUTQG9BfPzv6TAnmRY0qgLPldHI+12mYxoZUH+EG4t/esrqvJ5Jc0TdvtNhRxfA4WxNZWz8xkQAmU/C6Ox2C1kiwmtPIAPwihBrrdTpoWtEnic7AgXHczM2WLmbJkrojjc2asVpI/JLTymPODEOh219O0SJJzsCC2th4BBjAYTJmVBUUSn4MFtJL8GaGVxzU/CKGGBlgQUvaKInccxwDGGMCUUTQGq5XkboRWHjf4QQiWGQH11tYWGGMwGEwZRWOwWknuTGjlsYAfhFC7btcYouiMGauV5H0IrTwW84Ow292MojOwgFaS9yS08vhDfhCC1UryQYRWHn+l3wBtBIw58WZxKwAAAABJRU5ErkJggg=="},{"name":"Verac's flail","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADRUlEQVRIDbXB/0scRxjA4c9stJeDi8wPXrYxi0hIb4Z+gVB5EQ55//dO5eAYLEKC4FjK/bAYthE62EhzqLetR0IVtfUieR6j4vmSjIrnSzIqntuEmLhOZcDijIrnhhDT9rbs7IyBl24DOG4mORcqAxZkVDw3hJhgZi2dju12O0/s0z+Of1/fWB/t7KoMWIRR8VwRYuKjWVmW3Sddzllb659dXBwe/JbzCbQqjnszKp5PQkxVtQbU9ZG1K3bVApNfJxsbVb+/+vbtcV0fASoD7s2oeD4JMW28XAfOP/x1dkbTNFhc+bJpjldX7aOvlpqjYyDnE65QGXA3o+K5IsS0vS3AmzdjsEDOuaqqx4+Xnn7dB/bfHHZ6naZu+FfBJyqDEBOgMmDOqHiuCzHBzJaWKTlnoCyttaunp3+endE0DVBV5dJSdzKZAGVpWe4ss1zXNRQw41KhMgCMiueGEFO10X+fp8xZa8/Pz+u6hgJmUDBn7Qxsr9c7O3sPnW63O5lMgLIqm/odtCrOqHiuCzH98Mq/3tsvSzudYlft2tP+aBShgBYMtHxkmNsabj6CterZzz+Np9PpN+5FHO9Bq+KMiue6ENNwe3O0E621337/zVH9djKph0MZjXahVXFcEWLaGm4Cj2B//9C5F8B4vAetigOMiueGEBNzw+3N0c4uH7UqjhtCTFvDTeBg/7DX6z1ff8bFxXi8pzIAjIrnNiEecMlAy5yK44YQk3MvgNPTD0Bd11tDAZaXip0QVQZGxfMwISbg1Y/f7f3yGqiq8vn6OjAe7UJrVDwPFmKydpZzwVxV9eu6gQJao+J5mBCTtSuQcy6g5ZLhUqvijIrnAUJMMMNCLqBVccyFeKDiAKPieYAQE3bGP3IBrYrjOqPi+VwhJphhIRfQqjhuMCqezxJighmXCmhVHLcxKp7PEmKCGRZyAa2K4zZGxbO4EJO1KzlnKKBVcdzBqHgWFGKy5QpTcs5QQKviuINR8SwoxGTLFabkfAKtiuNuRsWziBBTWfWn76d0yM0JtCqOuxkVzyJCTGXVB5r6HbQqjv9kVDz3FmIqqz7Q1O+gVXH8H6PiWUSIiUutiuMejIpnQSEeqDjux6h4vqS/Ac3TYlzCaKQpAAAAAElFTkSuQmCC"},{"name":"Guthan's helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEA0lEQVRIDbXB34tUZRgH8O97Zma3TV0ilQTXMIuZF4K6WB6MYXoYBhEWoXbJksJgA2sxb6Iu+hu6EAoCL7xQRJIi0RtZlGWRF1mCF2Eh92JPEv6Ywml1Zzxnz5z3/M7dWHLbndkunM9HMEn0kmCS6CXBJLFCaZupiGdNMEkASttffzXyzclJpiKeKcEksUJp+/DY8M+XbjIV8ewIJokVStvjR8tnz88AGVMJm1HaZipiM4JJYoXS9omJWtszZ87PAGAqogOlbQC1A5XpqRsAmIroTDBJrFLanjhW9Vxz5/6jGzO/AWAq4ilK2wA+Hn+/tdjy2r7rLjktZ37+d6YiOhBMEquUtk9M1MIwBrB1S39z0Tv7wwyecuTDdwdf2NZcdHzf95Z8z11qNhdv374HZEwlbEQwSTxFaXviWNXCv/r683Gcxkn8yBnM5XKDg9uaTcf324+bj9vttuP5DxsPWy2HqYiNCCaJtZS2AYwfLWOVZVmA5ZjBOEpyuVwYLDMm9P224/mtR61GYwHImEpYRzBJrKP0PCAAvDc6nM9bfYWCEGjHO5IkiaMwCKIwCkMTtI3xPX/vnoGrU3MAmIpYS2lbMEl0oPQ8ILBidGwkSdK+vnz4RBAFURiawBhTeu35rVsHjB/+teBenZrDKqai0vZHR94STBJdKT0PiNGxkTRLkySJ4zQKQhMGSFNjon0vFwYG+iFQyOe3vzjg+1HbDz0v+PGiPv5p1fNCwSTRldL26NjI5UtXRscOBWEURWG6DKHxjYle2on+Pqu/v2BZyIkcAKtg5a18lqUmiC/89ItgkuhKaXt0bGTnru2nT50bOXRw8so1rKpU9m/ZtmXu17l6fWHsneFcDk9kGf5x8fJNIBNMEl0pbX/x5UScxN9/d3rk0MHJK9cAfHZ8/Nrk1NDQ7gcPGq7rNxoL2EDGVBJMEl0pbdcOVN548/VvT57CionPP5mdvQWg7Xqu224tc4AMazGVAAgmia6UtmsHKkN7dp87cwEr9u4dqtbenp29FZrQcbx6vQ5YQMZUwjqCSaIrpe1arQIL01Pq8Aej9+/eK/QXgiCKAuP7YavlNhoNwAIyphLWEUwSnSltlyv0XF8BsKanVbmyP0nTnAUTRJEJm64T+UuNRguwgIyphHUEk0RnStvl8vC+V1+p//FnGqdpmqRpmgCRMY7jG2OiaKnRaAEWkDGVsI5gkuhKaRtAtVpOkaYpdu3acfdu3XG9IAxi49frC1iWMZWwEcEksRml7Wq1nCJFijhN3MduGIZBEN+5cw/IADCV0IFgktiM0na1Wr5+fQb/lTGV0JVgkvgflLaBDGsxlbAZwSTRS4JJopcEk0QvCSaJXhJMEr0kmCR66W9yGh18rzQAZQAAAABJRU5ErkJggg=="},{"name":"Guthan's platebody","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEaUlEQVRIDbXB0Wtb1x3A8e+1nBDHqPXDgmAIY1xb56ChElJ+tBjzo7CxsafRPay0K3so7J/byx5HU9jGIYRmZx0ZTgQ+VodmNIUbx3AnRZJ1r47vYg1BSi1vGfPnk6hYrlOiYrlOiYrlOiUqlv/E+aDS4DLOB5UGyyUqlis5H/b25eEDD6g0WHA+cOEcVlQaLJGoWJZzPuztywq8HI+fPX+e9k5YqNXe2tj43uFhZ2NjI8sGKg0uk6hYlnM+7KtABeID96her/d6PaBer/3oxz/801df9/spkGUDKFUM35GoWJZzPuztvTccjqpvVx8+eMS3tVrNyWQ8HE7S9ARKFcN3JCqWKzkfmq3dfBK339m8/8XvWdAP92Z58c03x2l6AqWK4TKJiuVKzofWXRvzmOex0+nUarU0TYGtnS1mrxS93gmUKobLJCqWKzkf7t77QSxinucxzobDyY0b3FqvEmev3K6utw+OoFQxXCZRsVzJ+fDpZz9vPznML8S1tZuVG5XJaBLjbDaj2z2GUsWwRKJiuZLz4ZNPP/rr4yeVSuXgoM3Czs7O2dlZr9eHUsWwRKJiuZLz4eNPfnbwpH2zcjPP8/XqOjAYjmIez87Oer0+lCqGJRIVy3LOh89//cv7X/4BeOv2ert9yMLWVj2bvGRKlg1UGiyRqFiWcz7AOVDfqjOj1+vJ+/dWKpVHD32tVgPSNIUVKFUMl0lULK9xPqg0eI3zwZjtNH2xa7ZXgApQOS9eyZ89OwXS9ARKFcOC80GlwVyiYllwPsj7d/2jxyoNFpwPOzubL15kprldFOcVLpwVeczj6Wk6nZJlAyhVDHPOh1r9Tto7UWkAiYplwfmwrx/8czA8ePxUpcGc82Fra7NavV19e70oYiyK4jzGPPb7KZBlGaxAqWIA58M9efcfx900HUCpYhIVCzgfVBrOB9PcjpHO4d+gVDHOh3r9TlGwtra2usr3N+uzfHo2LYoif/7sdDqdMpdlA5UG4HxotnZPn2dpegKliklUrPPhFx+995vffr21s8lct3MMpYoBnA/1+p1bt9ZmM2A2mxVAUfBv0+k0ywZQciEBjNnOsiGQpicqjUTFAs6Hzz7+4C/tUyKvDMajXrev0mDO+VCr3QGq1bXZBVZXybKXWTbgQsmFpNmyMcbReHRrdfWd7eoX959CmahY5pwPn/9q/6s/p8BgPOp1+1CqGOacD1yiBFQM4Hxotmw+GTPX6RxDqWISFcuc8+GnP3n37/0JkcF41Ov2oVQxLDh/yLepGBacD82WjTGP+QzY3a7+7v5TlUaiYllwPjRbu0TG41G324dSxfBfcz4Ysx3jDOh0jqFUMYmKZc75AOfNliHSbh9BqWJ4Q86HnZ1NoNPpwopKI1GxLDgfms1doN0+glLF8IacD83mLtBuH0GpYhIVy4LzQT/cc398CKWK4c05H0xzFzhsH0GpYhIVy2ucD1CqGP5XzgculCoGSFQs/2/OH6oY5hIVy3VKVCzX6V8uCloFvyxaWAAAAABJRU5ErkJggg=="},{"name":"Guthan's chainskirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE6ElEQVRIDbXBwYscWR3A8e/rTmdmEnH7YGwchqFYe6aKjgnNLM+BIT5kLyKLF497VPTibQUXYdnD4sl/QFAQD8Ie9+ZFCFIsC1I4tJa0TJGFQZuBsoekUulJd/V7v1fb09IwITubyUo+H2V0xKukjI74/8RJxpLRuzxHGR3xpcRJxlI32N7c2ow//gQagNG7XKCMjnhJcZIB/Tu3B2mq9d5ZedZsNtPh8L0PfvGr938NDcDoXZaU0REvI06yvf7dw8EA2N/fA7z3Ingv8+l8eHTU63aHDx5Aw+hdQBkdcWVxkun+XRE5TNODAy0CiPdeBO8FZDqZn81mWDvKx1AbHSqjI64mTjLdvysih2l6796+915EvAe8iHgPiAhPHpXAdDLJi9LoXWV0xBXESab3+mLtYZreu7fvvQdExHsvgvcCiEiaDoMgwLmptXmeQ0MZHfEicZLpvb5Ye5imxux7j/deBO8FvIh4D8hgMOwGgQPnnJ1M8qKEWhkd8SJxkoEHjNn3ngXvvYh470XwXoDBIOWCdrtdFCXUyuiILxQnGfhf/vwHRXmW/usM8N4DIuK9F5HDwxToBoED55y1lqrKiwIaUCujIy4RJxnwve+/+Z1vtz/99L/rG9d+87v7BwcaEBHvEfGHhwOgGwQOcM5Za6GqqqIooTY6VEZHPCdOMuDg4A0r8tprX/3mVuPoeP6X+x+zsr+/571PkgHQDQIHOOestVBVVVGUUBsdAsroiGfFSdbv3z4+/k/vW+Gsqt7+Ye9Pf/73+OHDdDBk5Sc/+q6i8dvf32cp2Npy1lqgqvKihNrokCVldMSz4iTr92+LyHw+r8T9+O03Pvzon+WTs9HxCBrAz3765rVW8/Hj6R/+GLO01elYoKoqKIoSaqNDlpTRERfESRb2djauX5+LDNMhEPa6Z+UTa8nzMdSg3n3nrUePnvz96OyvnySsdDqdqqqKooTa6JAVZXTEBXGShb2d69eb08ncLeBurq0fHT3gXAN49523/vaPx7O5s9WsquxgkLLUbreLooTa6JALlNERK3GShb2dZrMJ8nRa4RaYTEbQLooSuHMnmk6fbnzlhsxlLuKq2fHxCec8NKA2OuRZyuiIlTjJend2ZGHunMM5B3YyqYqiBMLeztHwKOgGzrmba+sibmHqbIuF1mh0ArXRIc9SRkcsxUnW6+2ISFU5wDk3sROgyEsg7O2ISBMEEOcc4ADnGI1OOFcbHfIcZXQExEkWBNs3bqw9nVdu5lia2EmRl8BWsHlzbV0EmjhxOMeSg9HxCdSA0SGfRxkdAXGSdbvbs9nUAhZatGA0GgNbwebNtXURaOLE4ZxjxWGx+Whs9C6XUEZHcZIFwfa1a5yeFqwURQk1qG74OkKziYhbmDrbAsu5fDTmXG10yCWU0VGcZN3uNnB6WrBUFCXUoLrh64hjyYGbOWstCy3y0RhqwOiQyymjIyBOMvDtdhsoihJqUFtbm1//xtcejk9ZmU4tkOdjztVGh7yIMjpiKU4y8NCAGlSncwuqVmvNWhY2Njacc6PRCedqwOiQK1BGR6zESQY151Snc6vV4n+sZSHPx1ADRodcmTI64jlxkoFvt9tra2ss5fkYaqNDXpIyOuLzxEkGdDq38nzMudrokJenjI64RJwcgYIaMDrkS1FGR7xKyuiIV+kzRAHmOLvpE/AAAAAASUVORK5CYII="},{"name":"Guthan's warspear","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACZ0lEQVRIDbXB32vNcRgH8PcjuSd3uHHx+T5tdVpHT0rr6bROpMkNyRVxoSxysaKGciVy6b8QN2yxWbOeTose1pr2te9nixXtArVFy4+zddSJIsb58fV6kQoDMI8XBs5ev3pTJSBXpMIAzOPApXNmExVzlYD8kAqjzjyWevasrlYr5ioBOSEVRp157Dtz8vHE08nJaaCmkiAPpMKoM4/95/vu3x9bfL24vPwBdSoB7SEVxg/mEcDlK/1Ddx9Uq2vPn6fABpWANpAK4yfmGUBXr11cWlpO02zo3ihQU0nQKlJh/MY8ApDdXf5kCqipJGgVqTD+xDwDqFgsTE5OA1AJaAmpMNZnHks93V+/fpqoPFMJaB6pMNZnHvcfLK99WR0ZHgM2qAQ0iVQYf2UeAZR7C6ND00BNJUEzSIXxL+YZQKW9neMjMyoBzSAVRmPMY4eWUxtVCWgYqTAaZh47unvSyphKQGNIhdEM81ja1zk+PKMS0ABSYTTJPOpetpFZlYB/IRVG88zjoSMH7twaVAn4K1JhNM88lsp73i6+S9M5lYD1kQqjJeYRQJLszLKXKgHrIBVGq8wzgA4dPnDn9qBKwJ+QCqMN5rGr2Lll6+axkYpKwG9IhdEe81juLSy8ej+fLqoE/IpUGG0zj/sOFobvTgNQCfgJqTDyYB6PnTj6Ip31J1OoUwkASIWRE/N46vTxTbsePbyxcWXl45s371QCqTDyYB67u+VLtbp9x7ZX8wtTUzNATSUhFUZOzGOxWPhc/bS2hiydA2oqCakw8mMe8V1NJQFAKoxcmWcAVBLUkQrjfyIVxv/0DU+JA5CtR9BHAAAAAElFTkSuQmCC"},{"name":"Karil's coif","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD4UlEQVRIDbXB0WvbRgDA4d9JzdwkjauOdmyuM4xJosPBxRSO7en+9qGHsXIQTB7CLEIwlTGoodthJzW2dNJspV5TljbuIN8ntJI8JKGV5CEJrSQPSWgl+XaRibmLVkd8Tmgl+RaRiYGDsM1a7nLgkf8od/nw/C2g1RFrQivJxiITh93D6+k1Obv1XYfDgSMnB/I8JycjS0eXWh1REVpJNhOZuNOVwGQ6obK7s+ucA3KXU5lNZ1tbW1mWpemlVkeA0EqygcjE3dfHe/U9+95OphOWch7XH+OYXk9Zyrixtb2V5Vk6SsHT6khoJdlAZOJmq3Flr6y1QOugtbO9s1gsptdT/pWxvbdNziyfpaMUPCiFVpL7RCbuvj5OLhJrLV/QbDXJefbDs+lfU1sBD0qhleQ+kYk7XTlOxtZa7hN2wnScWmvBg1JoJblPZOIgqFOx1vJVYSccnA1Y8aAUWkm+KjJxt3ecDBPuYq3llmDpeTA8H7LiQSm0knwuMrFWR5GJWev2jpNhwoZq2NSy4kEptJLcEpk4COrWTqBgKaDX7rnCJcOEDTRajfFwbK0FD0qtQqGVZC0ycRDUAWsnfFT0VM9lLhkmbKCx3xgnY2steIBWR0IryVpk4iCoA+2wffKmDyWInnq1yBbj4ZgNNPYbZ8kZ1mOlAE9oJalEJu705Hg4Btph++RNn0pPvcLhcCwVLCXDhLvst/YXbjFIBlgPCvCgFFpJKpGJO105TsbtsP14e4eV4vff/qDSU69wOBwFS8kwaew3WPIZD8dUGq3GYrY4H1xAwYoHpdBKUolM/Iv+dXB6dtg53PquxkrhCuazD1T65hTovj6mAI8bvu/Prmf4+L6P4/3f76mko0sotQqFVhKITBx2DoPnweB08OTJk58PWlC4AnDz2ZwbDofjFt/3gb7pA81mMyNjLR1dQqlVKLSSQGTisHMYfB/4j/y352+pvGz/PJ994IbD4VgqWPF49+4dlXSUAs1mE8jIgHR0CaVWISC0kkBk4rBz+OLHFx4eHhd/XgAZ2fxqDrQOW845lgqSYVKr1djiRjpKqTSbTSAjS0eXUGoVUhFaSSAycacnfc9/Wn/KkoeHd3pyyl1qtdpPrZcenLzpc4dSq5A1oZUEIhN3etLHB/bqe57nzRdzwLHmXAEUBR95fdOHkv/QKuQWoZWkEpm405M+PrBYLHb3drmlAAqWriaT88EFK6VWIfcRWknWIhMfhG2+6nxwASWgVcgGhFaSWyITUzkI26ydDy74pNQqZGNCK8nnIjNgRfBJyZpWId9CaCX5gsgMqGgV8n8JrSQPSWgleUj/ACwP0SeDOd8NAAAAAElFTkSuQmCC"},{"name":"Karil's top","base64":"data:image/png;base64,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"},{"name":"Karil's skirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD3UlEQVRIDbXB0WsUVxTA4d8dU9tI3E5BEEoeQlhzLwspIhwKIvfBP31e56U0EMiwD0MZgptUe0mVuDvnzHR3NCYhrq4t/T4XJfAfFGUV5YD1XJTAv1KUFTDe+3lanzKIcsAdLkrgGxVlBRxO9gEzBcz03Xua5hSIcsANLkpgY0VZAc8On3QYxpIBxt+mW6pKq5c0s/MoB1xxUQKbKcrqmfwCjH7caU5fYXyipt+D6VJ72c5ns4soBwxclMBmirJ6Jr8A795dMjAzlgxFUbZQpdVL2vl8li6iHAAuSmADRVn5yRPugXGTmakpoKrAFqDtZTufz0npIsqBixLYQFFW3u9z/x5LxgeGYagpoKooLe13QMvb+TylC+hdlMDXFGU1OQwMDGPJWDIzQE0BVUX56dFocblI6c/Z7AL6KN5FCXxRUVaTp4El4wPDMJbMDFBTQFVRtn7YUtX2sp3NzqGP4l2UwBcVZTV5GlgyPjEMw8wANQXqab033kOXWqBpzqGP4l2UwHpFWT3OR3NWUkqTwwkDMwPMDFBTFEVbbWlZms1mkEEfxbsogTWKsnqcj+ZcSykBk8OJmQFmBqgpiqIobft2NrtgpY/iARclsEZRVnk+4raUEgM/8WYGqCmKoihNcwo9EMUzcFECaxRllecjPielxGDsx2qKoihK05xCH8VzxUUJ3FGUFZDnI+5I6SLPR9yQP8pRFG3qU+ijeG5wUQK3FWX18uVz7brffzvmo8QgpSzPR9yxk+809Sn0UTy3uSiB24qyehGl0+7s9V/Tk2mekxKQMcjzEXekdAF9FM8dLkrghqKsXkRptX199kYB1bpuWMmgB5fnI25JKWXQR/F8josSuKEoK+gY7O3tqtI0DWQM8nzEtQSklEEfxbOGixK4UpTViyhd1529Oleop/Xu7uO3zSyReb9voHN9+PDB0dFxnkMikUEfxbOeixIYFGUF3fPncnp2ji7RNA0rmff7Bpju7DxYmNnC5vP3dd1ABn0Uz3ouSmBQlBV0DHb3dpu6YSVjpePKZOLNbD7Xuv4D+iieL3JRAoOirH59/nR29qae1kAOiQzwft9gZ3t7sVgcH5/wUQZ9FM/XuCgBKMoKOmB3bxdtm2aWQyKDbuzHmG5vP1jYwkynJzVk0EfxbMBFCQyKsoKOaxkrHYPJoV8sbHoyhQz6KJ7NuCiBK0VZsdJBxko39uPt+/ePjo75KIM+imdjLkrghqI8AQc9OOgYjMd702nNSgZ9FM/GXJTAGkVZQce1DPoonm/hogTWK8qKlQ4y6KN4vpGLEviiojwBB30Uz7dzUQL/p38Aso00BR6FZ58AAAAASUVORK5CYII="},{"name":"Karil's crossbow","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFTElEQVRIDbXB3U9b5x0H8O9j4+O3AKZ1sMoc5FDDOSKFWtDfomXopwhZiRBqp778A72YdrGLTdqk3exiWiv1r+hVLyqtVaVeIFqGGHqE0NizWk7csPCQMA8oqQlpzwzBPrE5zwpqVCJeMjLt8xFMDp6JVBoAUx9OJZgcnJFUGsDQ0GAkFp6fU0x9OJlgcvBfk0oDGMuPTk7P9A84rbHIwkIRMEy2VBoHmPpwiGBycDKpNA7JX+Vms2lZ1tTMbDbb3fH8c2qhCBhA5K/x9s7DRr1RKNxk6sNjgsnBCaTSozzyyPNeeaX9wTc7XxQeRKLRUCj0xs8u/u73H6fTXZ0vJBPtiZlpCeDKCG3/e7tUug0YAEw2DggmB8eRSo+OXKl73t3V1e4fRavV2tKdCoDf/Gos0R778OMvd3cflsvrb771mmWF7m89qNzb3N6ulssbgAEEUx8OCCYHR0ilAdBQbnVlxQOSyfDWVsV18Z2fv3317l0fLdArK2giEmkB0NaW2NzcWl/fwIHro1c/n5ll6gMgmBwAUmkc8t4f31hd++aTjwoe4LpVHDI0cOm5jo5wexQw8DExMZVOpzs62kql2wCu50cb9XqgpWV6VgKGyRZMjlR6hIa9RgOBQAD7yl999fJA59/+vua6VcDgByKVOn/JtqPtEfjwccD3Jydn3nvnrUePGn+e2mg0GvFYbGZuHjBMtmBypNKUG6w/2gegsrUFYPCllJxbBgyTjcek0un0+Xi8NZvtmZiYGhu/Bt9fXi53dXZmsy2NRnNq5q7neXZPz0KhCBgmWzA5AKTS2Ux3vdncWV9HIuG6VewzTDaeJJVOJNp+8tMfL99Z6e3JlEq3O5PJlXIZQL+dXFzacl331bHc8PDFP7z7KVOfYHJwQCoN+NgXAAwAJhtPkkqPj+d9fMf/1z/XqrsPG+6Oh+9lLpwrljYADAx0tUZeaAmF5PxfBZODx6TS2GeYbBwhlX79zfF63ZucmBoby+/5/o2Fgod9rlvF9wwgMum2VGdPNBabnZsXTA4OkWqJycZxpNJj43nAh489379RvOV5nutWsc/gAJMNQCp9hYZ36/Vi6ZZgcvA0UmkAIyPU2t4KH3u+f2Oh0JpM3LmzChgATDYek0oP5QZj4fDO7m6xdEswOTiVVPq3v75+4cLzn01/PTk5fe366I3irRd7M4tfLrluFTBMNg6RSv/yF6N/mV1bXFoGjGBycCqp9Ouv5axQyLKCFzPJ9rb4+x8UFheXgABgmGw8SSpNucH4uXOzc/OAEUwOnkYqfW3UCYctKxz6h65GgkAQheIyYJhsPEkqnRu4FI5EFtQXgBFMDp5GKn358nA0Hi0Wbl7oSgaDKJZWAMNk4wipdL/da1lWKBhUxZuCycGppNJDucF6rbZRqXSlEsEgShtluAHAMNk4QiqdzXRb4XDEsnxAMDk4lVT68lDO9/1GYG/Px+a9zUrlPmCYbBxHKg34qVQq0doaj0YFk4MTSKUB5K9ys9mMtkcq97YKhZsJ+C4CgGGycQKpNA4M9DuCycFxpNLjr+bjsfjXa5WWen07CKWKgAEEYJhsnEqqJewTgsnBcaTStt1jWda331avvN340zv3AcNk44wEk4PjSKWz2e4m0Nyudb+YmZ9XgGGycUaCycFxpNL9/b3VqosG1iv3AcNk4+wEk4MjpNL9/b27u16tVvM8z3WrgGGycXaCycERUulMpqtWa3ie57pVwDDZeCaCycERUulU6rznea5bBQyTjWclmBwcRyqdTnetr28AhsnGsxJMDk4glQYMk43/gWBy8P/0H5v3dAEe2AitAAAAAElFTkSuQmCC"},{"name":"Karil's pistol crossbow","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEvElEQVRIDbXBb2iVVRwH8O85z+6f/bm717l5c86cuj3PcWN3D3f8Wo31S6Q2xlIsoVcVBRERSKSRBAXZiyKit73opdmLoFCqy202brfTuGwcHNtEwQOVhQj5D9Tcmm57wkvDyXa3ufDzEUwKS9HGoojJxf8gmBQW0cYmktUt25vj8Xg2m2NysVaCSWERbWwyWff4E49dvnA5P1QAAiYPayKYFJaijU0m63Y0N+eHCkDA5GFNBJNCCdrYxob61w+++vab7zO5WBPBpFCCNnan78uqit5nnzp04DCTi/uhjWVyBZNCadrYhob6xk2bhkYMiphcLEsbi6LOtD8yOiaYFJaljU37qbnZ2R07KrZu2fDhJxkmFyVoY72mbeXl5ZFQaGR0DAgEk8KytLH79nZsbaxdvz62LlHx2v4jQMDkYSna2LYWVRGNRqJRXRgGAsGksCxt7HuHno4nKn/UlwayuT17e789PsDkYinaWL+ttToW04VhIGDyBJPCSrSxyWRdu9/qSJnN5nBHwORhEW0s+al4dfWgHgICJk8wKayCNranZ6fjSEhEo+XHvskwuVhEG7u7L9X5yPZ3Dx8DAiZPMCmsRBvb3//k+PiZ1jYlJQCZzQwCAZOHRbSxXdRRMCeBgMkTTAqroI1ta9lWv/nhgYFcX39PNjMIgMnFItrYzrQ/MjoGBEyeYFJYBW3sM/v6b/5905ESUgKIhELHj2eZXNxLG0t+qrKqKj9UYHIFk8LqaGMprWqS9VICkBIYHz9z/vwFJhcLaGPTba1VsZguDAOBYFJYHW0skV9Tk5BSQkpgTkqZ+W4QAJOLedrYFq95Q11dJBweyOUFk8LqaGMbmx6eujHV3r7DCYUlAIlrF69NTk+Pjk0AYHIBaGNffrE77W/Zf+BLIBBMCqumjQXQ27dLSmQzg/27ewAxdW3qn6mpJi9y5GgBRYcO9n38aRYImDzBpDBPG4siJhclaGMbGurb2hUgJQAJCTEzNduWiswFc7/8/JfjOFWVlSfyGgiYPMGkUKSNbfGaw44jHWf01GkmF0vRxnZRR7w2DimzmRP9u3tOn7JNTY2PpqsrKsM/DFyYm52tqKw8kcsDAZMnmBQAbazf1iodJySl4zhSyqERA4DJxb20sV3UEa+NQ0oJZDInnn/hud9+/b1QOAkg7adqEglHyoFcHgiYPMGkUKSN9Zq2OfP27tl+8dL1zz7PM7lYQBvb1UnrE4krN66Go5FwKBwKl83cmjl37s9weTgUCju3UVtbmx3MAQGTJ5gU5mljsUBXJ92enjZjE0wu5mljD77Ru/GhxFvvfNXXtysUCTlOmRTiyuWr+XwBdwVMHgDBpLCANmdxl+jupOnpaTM2gXmvvNRdvzHxwUffA+jqpvr6jdFI+OgXX+OOAPOYPBQJJoUStLF+i6qKxeaAzZtx/cbkH+duRcPh6lgsXxgGkKbUqJnAHQEAJg+LCCaF0rSxu7q7ysrKenqTk5O3cj9dmrl9u8xx8oVhIAAEEABg8lCCYFIoTRub9lOjYxMoIj+1rqZmbmZmUA8BAZOHlQgmhWVpY4EA/xEAOtP+yOgYEDB5WIlgUrgf2pwFBBAweVgFwaTwIAkmhQfpX8saw/Y4D5VIAAAAAElFTkSuQmCC"},{"name":"Karil's off-hand pistol crossbow","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEg0lEQVRIDbXBb0jdVRgH8O/ZdlPxz34LTNjULuHuOWysObcnzS4PIqKNC2NSbxYLetWL3veigiIi9qagVwUREdG7WsSahCZyObvI5DC5TXTzzDGRtSbaFG93/q7Xe06bIHm51yhln49gUvgPtLHYwBTTxnb3xB88WEqPTwLo4fiwTjHFUI5gUvhX2lgArW1HI3sjtbU1IyMpAPE43b8/PzMz19fdlclmKyORkdQoNjHFsEkwKWxPG9vb3TU0kgQg5XNBUNf0bDPgVlfDyRt2dmbuwkevfn/RolBo76g/dPDAlStLBeeGk5ophg2CSWF72tjueOeeffuGkxoAc8f+oHa94J1zC/OL4+PX3307ce+PpW++G41G65sPBuv5uqcqKpKpUcAzSQCCSWEb2ti+7q5sNgsgkWh65/0foy3NAGZnZoMgePGlF9zq+qHG9a+/TQEeEAAaGuoPR6OpMQN4JglAMCmUo40F0E4np2/dOn/uVFVlxbVrmer9VQ6A8w6PuFxm7f78/NT0LcAzSW2mAUFtrWY8DXgmCUAwKZTQxiZ6e06cqLw8eD2dngPw+mudd27nq6ur91VH4LzDIy6zmEmNGcAzSWzQxjY01J8/1/bpZ4NMMQCCSaGENpY7O3JhODaeBjweEw1B3WEp9z8TwHmHR9zi74smfR3wTBKbtLFvvdn9+Zcj2CCYFEpoY7mzYyWTSU9MAp5JAtDGBkFdTVBz/OiRgYGhs/2J23fuTKRvAp5JYgttLLW1RvbuBSCYFEpoY7mzY3pqan55BfBMEhu0sUFQV1FR0XbqOJy7cePm7Ow9wDNJbKGNDYK6aFMTAMGkUEIby50devQq4JkkttDGJhI9DoBzBeeGBpOAZ5Iopo0N4ILGRsGkUEIb+8F7Zz78+BLgmSS20Mb2v5IIwxycKzj3W3pyfn6BKYYS2lgAgkmhhDa2K96ZTI0CnkliC23s2f7TubX8LwNDvX3dtbU1F3+4DHgmiRLaTAsmhWLa2K7OjtUwHBtPA55Jopg29nSiB+6xiorIpUu/Ap5JohzBpLCFNjbeTrl8PgzDiambgGeSKKaNjbcfrX26wTk3OJgEPJPENgSTwiZtbHtbaz6fD9fWHuZys7NzgGeSKKaN7e8/HYY559zgYBIAUwzbEEwKW2hj8Q/PJFGONvarL97IZtey2TCTyV34ZIAphnIEk0IxbaaxgUmiHG1stKW5/2W58GcmDPPr64Wffk4DnkmihGBS+P+0sb3dailTWVVVqfVVwDNJlCOYFHZEG9vW+rwrFNITk4BnkihHMCnsiDa2vf1kBHtSYwbwTBLlCCaFndLG9nB8WKcAzyRRjmBS2CltbLTxYDQaTaZGmWIoRzAp7JQ29tgxdaA20KNXAc8kUUIwKeyUNvbMmb5cPp/LhcmRUaYYSggmhZ3Sxsojh3MPc+vrq3fvLgCeSaKYYFLYBW1sS0vzYmZ5eX4F8EwSxQSTwi5oYxsa63N/5ZaXVwDPJFFMMCnsjjYWj3kmiRKCSWHXtJlmkihHMCk8SYJJ4Un6Gyj0K4gYXOi2AAAAAElFTkSuQmCC"},{"name":"Akrisae's hood","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEf0lEQVRIDbXBzWtcVRgH4N9ppzGiQtVou4wl6TkEhaK8VEJ4CUNpKYIIcRWyMbjSv8hdcdOVyy4UKeEgghwoxUKxt1/TMEy9DNKbO5Pcez6v6ZQpCWnSCeLzCCaF/0CbDPsxnccegknh+LTJMLK4/Hmr1Qoh+BCjTyn52+ZPpvMYE0wKx6FNBoDbSyGFVmsqjcTgU0oxRu999PHunb+YzmNEMClMRpsMwPJlBpBGpk5NpyYEF6yzMcaUkvPRVdWDe4+AhkkCEEwKE9AmW2ovIqE11QKQxmKIJ0+crG2dUooxVnWFiNrW3U6P6TwAwaRwJG0yANxeSkhTp6ZSk3YB+PDs2enpN+5nmbfeWx8Rn3MREXVdd7s9oGGSgknhcNpkCxfUzMwMEhLS7LmP4sj0m2/++MO19e+/3XpWbHae1HUNIProogsuVIMqz/tAwyQFk8IhtMn4EgMJCe/NvJdSeuvtt65fu449VtfXHmb3rbWIcMm5ytW29pXP8z7QMEnBpHAIbbKFT5T8WEYfYxNv/HQDB3zz3XpZlI8fPkopVdtVdLEOta98nveBhkkKJoVX0Sbj9tL7Z953zt346QYOt7q+tvXs2ebjTeecdTbUwXuf532gYZKCSeEAbTK+xK1TreCd/lXjSN98t/7kcefvp39HF62zoQ7e+zzvAw2TFEwK+2mTLV9ebp1qBe82ftnA63y99nXxT9F72osuWmerurJDWxQl0DBJwaSwhzZZ+0q7NXXSOb/x801MYGVtZevZVm+zF2O0O7YoCgBFUQINkxRMCntok1358oq3/ubPv2IyK6srg61Bd7PrnBsUA2stgKIogYZJCiaFMW2yq19d9dbuVPXvG79hMiurK4PB4O6du9Ot6bquvfd53gcaJglAMCmMaZNd+uJSXdW/3dSY2PLl9vZwUBaldbaqK+ttkZdAwyQBCCaFMW2yM2c+yPMcx7HU5uFgOCzL2ta+8gDyvA80TBKAYFIY0yaji5+ZPwyOY5EXB8OdQTkMde29z/M+0DBJjAgmhTFtsk8vXrj1xy1MbPlye3u4XRaFdbYaVHneBxomiTHBpDCmTQYkHAe3ebhdlUVZ2+1upwc0TBJ7CCaFEW0yIM3JOUQEhM6DDiawuLy0sz0clsN6u+52e0DDJLGHYFIY0SaTC/MxRkQEBACdBx28zsWlxZ2dwaCsOg8eAQ2TxH6CSWFMm+zTxQu3fr81OzeLXQGdTgeHO3369PyCLIvi3t37QMMkcYBgUhjTJru4RN77lNJtcxtHmp2bDSF0Oz081zBJvIpgUhjTJlv4RL3z7js++ORTjBEJd27fwX5zci7EgIBOZxNoADBJHEIwKeyhTSYX5mOMiAgIeCHgpYDQ7XTx3AmgYZI4kmBS2E+bTMr5iIiIgICXAnYFBF/5PO8DDZPE6wgmhf20yeTCfIwRL0QEBOwKCAgI6HZ7QMMkMQHBpHCANhlG5uQ5RAQE7AoICAjodntAwyQxAcGk8Cra3MNzAq/QMElMRjApHEmbe9iPSWJigknh//QvfEnvn5b7+VgAAAAASUVORK5CYII="},{"name":"Akrisae's robe top","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEx0lEQVRIDbXB7WscxwHA4d+uJRc1ujDBThbK4l7DRrsIDMHK5EWIQQjVJh9a+ql/aEspMkaY+ZRkwBhCTXZ9hEUZn1klmKllW3fa3dlK2zt0riM3bvHzBEpmvE2BkhlvU6BkxtsUKJnxy2hT8Aol13itQMmM19KmoCfEu845/lNIT8k1fk6gZMbP0aagF0XvT6dTFjjnhBDMOOfohfSUXGNBoGTGK7Qp4vg3zNTPnk1Z4JwTQvASB4IzzrlQyTXmAiUzXqZNAZ7e9RvX27od/zCm55wDhBDOOUAIQU9cFUA5KpkJlVyjFyiZ8QptimFyjV45KpkTQrDAOcdcHMdATV3ZH6FTMqUXKJnxMm2Km3/4/e2/7iVJwiVOjfKREIKXOGaEcy4exvRsaePh0JYHSq7RC5TMWKBNsX1rOwzD5eXlvb/8PUmTyfOJtVYIwdzHn964/80+/+ZwEEXRymAF+NXKr9uTdjJ9bsuxkmtAoGTGAm2K7Zvb4C8vX779t9txHAPWWiEEczc+u3Hv63vgOOVwEEURUFXV9Y+vt/Di2VE5OoBOyTRQMmOBNsX2ze2n/3RPqics0UwawForhKD3yRefePDe3//6HqeccxDFEadqTokrom0Z5Q+hUzINlMxYoE0hNzcejx8DS0tL5aiM49haK4T4TH3RdR7fefDe473vuP/NvnNEcVTZKoqjZZbrul4ZrDRNY8uxkmuBkhlz2hRyc6Nt28NHhyyxdIqlo8lRZSt6O1/u4r3vvAe813c0vSiKpkxXl1dZom7qwTuDyfOJtWPoAiUz5rQp5OZG27aHjw4Ba22SJEeTI6CyFb2dL3d968HfvX2XuSiKpkxd5YbDYdM0dV2vrKyU5QF0gZIZPW0KubkBPB4/rpu6shWESfLhaDSK4qiyFXPbt3bu7u0zF0VRVVUiEq56Cj4exvVxPRgMJpOJteNAyYyeNoXc3Gjb9vDRYU1d2QpC8EmSHE2OKlsxt31r5+7ePnNRFFVVxZkQfDyM66YevDNopk1ZHgRKZvS0KdTOlve+HJV1XVdVBeGf/vzHJz89yYu8shVzO7d29vf2mYuiaDAYcIlR/j34eBjTcPWDq8eT4/zBw0DJjJ42hdrZ8t5ba5tJY62FEFC7W/qO5mJRFA3EABjl34NP19O2bVffXT2ZnJwKlMwAbQq1u+V743Lc0NjSQgio3S19R/Na6XqaP3jIGZ+up23bNm0zWB2cnJwESmaANoXa3br2u2tf6a+atjllSwshoHa3AH1Hc4F0PQXyBw8549P1tG3bpm2Sj5IXxy8CJTNAmwK82lHjR+P4t/HJ5GQ8HpejAyBJPrx0+VL+IOcCcRxbayEENtXnV96/cjw5/u4f370n3vv2/reBkhk9bQrwQJImTduUoxJC6CBI04/yPOcCIhKuegodBODT9bRt21E+4kwYKJnR06YAz7kQOiVTQJuC/6JTMgW0KcBzLgyUzOhpU4DnXAidkik9bXIupmRKT5sCPOfCQMmMnjYFeM6F0CmZ8ia0KcBzLgyUzOhpU4BnJoROyZQ3p00BnpkwUDKjp00BnpkQOiVT3pw2BXhmwkDJjDltCmY6JVP+V9oUzHSBkhkLtMkBJVP+P9rkgJJpoGTG2/QvTx15nwJgNpsAAAAASUVORK5CYII="},{"name":"Akrisae's robe skirt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD6ElEQVRIDbXB32scRQDA8e8cCUvqVdZfDC1HGArJrpFoXgZKkaGUvvg/i8goBR1fJCBkuYcDl8hwBw4hNa47s+vdtieJydkk4OcjjC65F+sqLjF6n5sIo0vuzrpKyk+apmEthDMGRu9ziTC65I6sq4riifcLBiEEKSU0TcNSCGeA0fsMhNEld2FdVRRPgJSIMc5mM9aklE3TACEEGBm9DwijS27Nuqoo9iABKcXFIiwxUGoCW5HYXpw3DUshnBm9L4wuuTXrKugYSJkD3gcGSk1ms/rg6PB0dgw5EEKAkTC65Nasq1589aJLsYud/cYeHR2SUmIlpXR29rpt252d7f3Dz3787ocQzqAXRpfcjnXVs+dPU0xd17lX7ujoEBKJxMrx8S+AUpNPj744/unnuq5hBL0wuuQWrKuePX+aYurAff8DoJRiJQIPH7z3+x+viWxtbUGMkbZtvZ9DL4wueRfrKqV25a7sOug698oppXgrArNZDeQDiDGyVNen0AujS97Fukqp3Uh89PiRe+WUUrwVGUS23s8fppT8r6fAeDyu61PojS6E0SX/ybpKqd3sQZZSAqYnUwZKKYjAbFYDB0cHaemvtPBTAoER9EYXwuiSzayrzMsv/akHUkrTk6mUOdA0hBAYTJT64MOHqU1vLPwiG2e+nkNvdCGMLtnMuqo42ANSStOTKSBlDngfgDzPQwiAUuri4iL/KPenPhtnvp5Db3QBCKNLNrCuKg73SCQSienJVMocaBreyD/OL/6MO1tbkQicX5zTkI0zX8+hN7oAhNElG1hXFQd7QEppejIFpMybhn+EEICJmrAUOW/PaQjhDHqjCwbC6JKbWFdN1GMiLS3ga88gz3PWQghKqUhkKXJ+fp5lmfdz6I0uGAijS66xroIOmEwmLa2vPRtM1ARoYwtss93S+noOvdEFA2F0yTXWVdAxkBPpa89NpJTbO9tEWlpa2MbXc+iNLlgTRpdcZV0FHbeQy5ylhizLtne224vW+zn0RhesCaNLrrKugm4ymbS0vvZsIKVsaGh4Yzwe1/Up9EYXXCKMLrnEuupIf774bVHXNZtJKb33/NsIeqMLLhFGl1xiXQUdt2ZePrdff8vKCHqjC64SRpesWVdBxxUjVjrebQS90QVXCaNLLrGu4oqeFcFbHWt5ngMhBFZG0BtdcI0wuuQq605YM7pgYN0JK4KVjkGe59k487WHEfRGF1wjjC65C+tOQEAH5HmeZZn3c+iNLriJMLrk7qyroAOklN7PoTe64CbC6JJ7sa6CDkbQG12wgTC65F6sq6CDEfRGF2wgjC65L+sq6I0u2EwYXfJ/+hvWzwCefWfsewAAAABJRU5ErkJggg=="},{"name":"Akrisae's war mace","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADjElEQVRIDbXB4UtbVxjA4d+5Maa2QwKrk8lWpMR7DxkZQXhJKZeXURhjX/rvlpYhcggyOUyypQu9p0WEOiETWZZqq1Nyt4RJE9ZqbN3zGBXLdJwPgErMVRgVyyTnA6ASA84HQCV2Pug3907enG5u/sSISswUjIpljPOhWl25fftT534EHj789vj49MmTdUD13uHh662tX9JUgGbTq8RcxqhYxjgfKsnd5S+XGCkUZ4DHj9Ygkka9WChEUQQ0m5sQQa6ScCGjYpnkfPju+wePH/3AuSSpFGYLt27eKhWLwNOnWa/Xh1wl4TJGxTLJ+QADoFarttsdxqRpA3j6POt1+5CrJFzGqFjGOB+S5O7i55+59Q3eihi5nwoQQbO5CZFKzGWMimWS8wEGjNTq1Zc7e8vLS63WM+B+KhvNTYYiyFUSLmNULJOcDzBIkkqWbcOgVq++3NlbXf361dFhsVjcaHqGcpWEKRgVyxjnAyPVmj34/aDb3YcBI9VaUqDQbj9jKFdJmIJRsZxzPqjeA96cHB+9Pu60nzFSqdxZWloCZmZm1tYcQ5FKzBSMimWM80Ea9bm5m2dnpxtNn6Zycnp69Oqo08l4K4JcJWEKRsUyxvmQqgCDswFRxEjvz16nnQGLi4tAt7sPqMRMwahYzjkf0lSAATAYHBz80e2+6PWiam2l087K5XKjsZrDz60toNvtq8RcxqhYzjkf0lSazU2IgCS5m2XbQLW20mlnQJo2nj/PGCp1u/uQqyRcyKhYxjgfGMoZMpAzZPjXAEiSCpBl25CrJFzIqFgmOZ+pJExyPgMDA2B5+YtS6UaWbUOuknAho2KZmvOBkTSV2dnS2loTUIl5P6NiuQrnM4bMgwcpcHZ25tyPKjHvYVQsV+d8qNe/6h2+KhVm5ubmWq1fVWLexahYrs75UK2uvP7rZOa492K3D7lKwrsYFcvVOR8qlTtA4bg3d4PWi75KzLsYFcsHcT4wUq/Ml2ZLm519lZj/MCqWD+V8BmY1WSgWKM3iWvsqMZOMiuXjOB8a1YVCgdlicX1rTyVmjFGxfDTnQ6O2UCwwExXXt/ZUYs4ZFctHcz40qgvAb33+sbu7rxIzYlQs18H5UF6cL0GxWNrd3YdcJQGMiuU6OB/Ki/NAee6TnZ09yFUSwKhYronzgZFyeb7X66vEgFGxXB/nM4ZMuTzf6/VVYqNi+R84HyBXSf4GUxtxkMaF0z0AAAAASUVORK5CYII="},{"name":"Corruption sigil","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAIAAADm9jPlAAAC30lEQVRIDbXBT2gcVRzA8e8zQfHPLlFvOfXSmeceRCI/CgV/BK1SKMlpQZGwiPcWPHhaKFJJaQ+9VEEED54CHjyJ7CaEEF7SpbuPDMuWQjLkIBUKS062emiymZE8GNilKil2Ph+jYimZUbGUzKhYSmZULCUzKpaSGRVLyYyKpWRGxfLsnE9VIk7HqFiehfMpMDf3dpIMVCJOwahYJjmfEqhETHI+/ennH24u3waSZAC5Sux8CqhE/AujYhnjfHpp4cKvv6xx4gUmffX1l2/V4pvLt4EkGUAORufPA26zoxLxT4yKZYzz6aWFCwSPH/9J4f0P3iP47tsfCYbDA0Dnz1Nwmx2ViKcYFUvB+fSOb12/dgsYjTLG5NkIqFQqwPZWDxgODxYWP/zj0V8U3GYHcpWYSUbFEjif3vEt4Pq1W6NRxqQ8GwGVSgXY3uoBw+FBrXYWmL/8ZPObl6ZenLrX34VcJWaSUbEEzqe+v354dNSb+qLdnCW4uPyw3ZwleO3Vlylsb/WGw4Na7Swwf/nJ1vevENzr76pETDIqlsD51PfXsyzrcKXdnL24/LDdnAVWWxuMqX+8mB8fA4eHh789+B2oLT7aWZkm2N9/ALlKzBijYgmcT31/PcuyDleAdnN2tbXBiZwJhmCpUb/b6b376QjYWZkmqFZnkmSgEjHGqFgKzqfdZO1q8waw2tqAHFCJmeT8HifMUqN+dKYD7KxME1SrM0CSDFQiCkbFUnA+7SZrV5s3VlsbkKvE/Cfn06VG/ehMZ2dlmqBanSFIkoFKRGBULAXn026ydm7uI8hVYk7B+XSpUQfudnqvv/kGcHyUESTJQCUCjIpljPMp5Coxp+Z8utSoA3t7+xR8tw+5SgwYFcv/5nwKfPb5J/fv7xL4bh9ylRgwKpbnwfk9MICce8d3+5CrxARGxfL8OL8HBnKVmIJRsZTMqFhKZlQsJTMqlpIZFUvJjIqlZEbFUrK/AVFvKvSO8GgwAAAAAElFTkSuQmCC"},{"name":"Barrows totem","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEcElEQVRIDbXBTWhc5RrA8f/z5uOesZs02WmlfsCcNx29VxifjAt53YihWFE3FsFFhQouCmmhtGRj1IgQhCAMQYPalVkXCkVc5rSYOi8FFTpMj6vSjq6ajxm1yZxwj/bggTMkqXXR30+cWh4kcWqB5UbrhQnL3iIfA07L/Evi1C43WoCIOA3ZIfIxcHjySLfbufxdRM5pmfsgTi2w3GiJiNOQgsjHwOHJI2T+n6bA7791yVz+LgKclrkncWqB5UZLRJyG5CIfH548Anzz7YXXX3uD3B9/3AF+/627f/9+wVy4eN5pmb2JUwssN1oi4jQkE/n4pRcnDz76xODQEHu41b4BCObCxfOA0zK7EacWWG60RMRpCEQ+funFySefCLeThH6DQ0MU3GrfEAyZCxfPOy2zgzi1wHKjJSJOQyDy8Ssvv3rgkYPbScLeBoeGgFvtG4I5+Njj9YV5SJ2G9BOndrnRIvPChI18/MrLrx545OB2kpB75sfnyfzwv8vDwX/GV6qAGNOsecAYQ6a+MO+0TD9xaoHIX+dvcmrqbDAcbHTWxQiZQ98rmWbNA+MrVUCMadY8GWMMUF+Yh9RpSIE4tRREPj41dTYYDoCNzjqZip8g06x5YHylKsYAzZonY4wB6gvzkDoNKRCnloLIx6emzgbDAbDRWSdT8RNkmjUPjK9UxRigWfPkjDH1hXlInYYUiFNLQeTjkydOl0r7gI3OOpmKnyBzTRtiZHylKsYAzZonZ4zp9ZLFL+pOyxSIU0tB5OOTJ06XSvuA1fXVAWOAip8gc00bQMVPkGnWPAXGmPrCPKROQ3Li1FIQ+fjkidOl0r7h4eHVtdtAL0n+e/U54KfqFWDAmIqfAK5pQ4xQYIypL8xD6jQkJ04tBZGPP3p/DkiSbWB17Tbw9JXn2M3V6iUyg4MDZBY++xRSpyE5cWopiHw8OzMnwuZWb8CY1bXbwKErz5IbYJDc1eolYGxkNCgFZNq//rL4Rd1pmZw4tfSLfDw7MydCkmyvrt0GDl15lh0GGLxavQSMjYwGpYDMex9OQ+o0JCdOLf0iH8/OzImwudXb2FhjN70kITc2MhqUAiAoPXRmegpSpyE5cWrpF/l4dmYOEGFzq7e5uUlma+sOBb0kITM2MhqUAiAoPXRmegpSpyE5cWrZIfLx7MwckKYp0Ol22c3W1p1ekoyNjAalAHjvw2lInYYUiFPLDpGPZ2fmgIcfPgC02zeBTrfLDpVDT/0ct4CR0dEz01OQOg0pEKeW3UQ+/mpxiVy7fRPodLvkKuMVRMj8HLc+/uQDSJ2G9BOnlj1EPj63uASk/K3dvtnpdoHKeIW/iJB7+503IXUa0k+cWvYW+fjc4hL9RIS/iJARMceOH4XUacgO4tRyT5GPgXOLS+REBBFAxBw7fpS7UqchuxGnln8S+esgwLnFJUCMETHHjh/lrhRwGrIHcWq5P5G/DvLl518ff/ct7koBpyH3JE4t/0bkY0gBpyH3QZxaHiRxanmQxKnlQfoTq6qekGq8YDEAAAAASUVORK5CYII="},{"name":"Amulet of the forsaken","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADeklEQVRIDbXBP2sjRxgH4N8YKz4RSWywleWEYlScNYONxLHmZSEcb5oj3RWBfIlU16TNfQKT1nXapEqRIu2QZhmsGAk50VgYxWdkNiLxIhtkZX2e/OmEtLJT6HkEk8IqCSaFVRJMCqskmBRWSTAprJJgUsimjcVSTHUsJZgUMmhjgftdKf9IknwuN0nTfC43SVP8YzrNFwqTNI3jEVMd2QSTwhxtLICqX17P5weDcyxS9cvrudzgYgg4JokMgklhljbW80pbnnc7ubuIh4DDAsL3Spu+f9LrAWtMdWQQTAqztLFVv5wCcTwCHJPEItrYZ7Xt6ySJkzHgmCQWEUwKs7SxvlcqFgr9iyHgmCQW0cZ6XmljYwNAHI+Y6lhEMCnM0sZWq5V1YHAxBByTRAZtrOeVNoA4GQOOSWKOYFKYpY2t+uWtzc3jk18BxySRQRtb9cspEMcjwDFJzBFMCrO0sb5fzgFP8rn+YMhUxyLaWM8rfVSpvB0Ok2QMOCaJOYJJYY42tuqXS0XvpH8KOCaJOdrYWm17kiRxMgYck8Qigklhjja2Wq18+MHW2dtBkoyZ6piljQXunzcaN9fX/cE54JgkFhFMCotoY3flzl/Td4Vi/rjTBcBUx3+0sZ5XKmxsvF/0ev0esAY4JolFBJNCBm2s75fzOdyluJlOk2TMVNfGhrQfX17epWkKxPEIcEwSGQSTQjZtrOeVapVKMh77T59G5gi4D4niy8u7NL2IR4BjksgmmBSW0sZWq5X0Jq3tbEfmCEBI+4Pz8+l0miRjwDFJZBNMCg/Rxoa0DyAyR8+/+PL48ODVpy9/v7oCEJkjpjqyCSaFpbSxIe1H5ujFq8/Wwk/i9s/5zTKA48ODMGhGrTbgmCQyCCaFpbSxYdCMWu2P33z9bnqLeze9uQJwfHgQBs2o1QYck0QGwaSwlDY2DJpRqx3SPl5+jrv76c1VcnY6+PH7MGhGrTbgmCQyCCaFh2hjw6AZtdrB669y7z1JfrO9b78JGnsAWp0u4JgkMggmhYdoY4PGHoBWpxu8fvNn/5fBD98Fjb1Wpws4JolsgknhEbSxQWMPQKvTfVbbLhWLt5PJSf8McEwS2QSTwuNoY4PGXqvTBbArd056p4BjklhKMCk8mjb2RUg/RQb/ckwSDxFMCv+HNhZwAJgkHkEwKaySYFJYpb8BrWGOkC1i4RIAAAAASUVORK5CYII="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAIAAADm9jPlAAABcUlEQVRIDbXBMWobYRSF0e9W6VQETHag/23gunxusgjtIYV7LcClNxEI2oAXMJNuBgKuPJ4qjYsEB+xBCValEIHBIkkj+T9H6aAypQNouuHsNKhD6Wi6AZCULlSgdABNN0hKFypQOoCmGySlCxUoHUDTDZLShQqUDqDpBknpQgVKB9B0g6R0oQKlo+kGds5OgwqUDqDtb9lJF16b0kFlSgeVKR1UpnRQmdLBX9p+BNJzXoPSwQttPwKrixmwWE5Aes5xlA522n4EVhcz9i2WU3rOEZQOoO3H1cWM/1gsp/ScQykdQNuP159mN1/5p8Vygm26cBClA2j78cvH2bu3bz5fb9j37Z7zywm26cJBlA522n68uzph5+fT5nHNw5r7B77/4Pxygm26cBClg2dtP95dnQC/njaPax7WvP8w8cc2XTiU0sELbT+yZwukC0dQOtjX9rc8SxeOpnRQmdJBZUoHlSkdVKZ0UJnSQWVKB5X9BqyFfuWV1P7pAAAAAElFTkSuQmCC"},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAIAAADm9jPlAAACA0lEQVRIDbXBP2sTcRjA8e/TxUG8LS/Bu2dzejI+WXwHLnkP4izEPZO74OTgkE3w356fg5LfoGLBuyui1HbwL/FoLCGFkwYKiTa10LvPR9yUlombAuNJzlKvqzRN3HQ8yXtdDbEA6rrudZVGiZsCIRZuGTCe5CLiltEccVNOjCd5r6shFm4ZzRE3ZWk8yXtdDbFwy2iUuCkwnuS9roZYuGU0Tdx0PMl7XQ2xcMtogbjpeJKzotdVGiVuCoRYsMItozniprRM3JSWiZvSMnFTWiZuyj9CLAG3lCaIm7IixBIYDROgP6gAt5SLETdlKcQSGA0T1vUHlVvKBYibAiGWo2HCBv1B5ZaGWLLOLeUcxE2BEMvXD5Nil1P1BxUwGias6w8qt5T/ETcFQiy3R8mVy5devpuz7ttPbt2tRsOE0/QHlVvKmcRNWQqx3H/eEahr5gtmh/PqN/tf2dnlzr1qNEzYoD+o3FI2EzflRIjl7pNOXTNfzKsDpgdcv1mx9Olx59X2nHWLBe8/TocPtqB2y9hA3JQVIZasqTkme886Aggv3syvXWV2yPcpH/Z4uzO9/2gLareMDcRNWRdiwQm3jKUQy89POzUcHTE7nP+a8eUHN25XHKvdMjYTN+V8Qiz5Ww24ZZxJ3JRzC7FghVvGOYib0jJxU1ombkrLxE1pmbgpLfsDSJzR5Q7xclYAAAAASUVORK5CYII="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAIAAADm9jPlAAACbElEQVRIDbXBsWskZRjA4d+b5gpxuv0T3Hm7q96t5N3G1spm/wexsBLGwm4qCzvhqisEpxPu1H4/C4/9ChUD7swRDPFS6J2yGbPmhhx8koWFjMkeAXeeR9yUgYmbAvPFEphOlAGIm84Xy+lEQ6xTStOJsm/ipkCItVs+XyxFxC1nr8RNgfliCUwnGmLtlrNX4qZshFinlKYTZd/ETdmaL5Yi4pazV+Km88VyOlFgvliKiFvOXombAvPFEphONMTaLWevxE3ZCLEG3HL2TdyUgYmbMjBxUwYmbsr/EGJDn9uYPnFTbgixAdzGvFaITVVm9M2KFnAbsyVuyjUhNkBVZsCsaAG3MbcJsanKjB1mRes2ZkPclI0QG6AqM/pmRes25oYQm6rM2GFWtJDcckDcFAixqcqMHWZF6zYOsaHv+NHoyWHHDfXx6pMHB5DcckDcFAix+eGLrD7hVrOiBaoyo+/t+/cEEEisX3brC1Z/c3TK4dHqsy8PILnlgLgpEGJzWGVvvnHv+587+p7/xQeftlWZcZtZ0Z48HqXE+mV3ds6LM979sOVKcsvZEDdlI8Tm9NuRQEp0l6wvuvYfTv/g6Qkff95WZcYOs6KlJwFuOVvipmyF2Jw8HqVEd9m156zOeef9lo3jR6Mnhx19l5f88uuqfHgAiS23nD5xU64JsaEncUWefTMSQPjux+7+W6wveLHi6Bk/PV09+OoAklvODuKm9IVYs+WWsxFi89vXowSvXrG+6M7W/P4n733UciW55ewmbsrdhNjwXwlwy3ktcVPuLMSaa9xy7kDclIGJmzIwcVMGJm7KwMRNGdi/Z6sL9EqgOKIAAAAASUVORK5CYII="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAIAAADm9jPlAAACnElEQVRIDbXBsWskZRjA4d+bJoU4HML+B7rzgUVAeNOcvGlsLcRm/gexsBBhLOymsrATrrIQnE7Iqf1+Vxj2K/R0xd2J0RAvheepm7mse0NOP8nCwo7JHltknkdMHR0TUzcYjvd2HZ0RUzcYjkXENKUbYuoGw7GImKZ0Q0zdYDgWkRjj3q6jA2LqBsOxiMQYRcQ05aaJqRsMxyzt7Tpumpg6wIdJjFFEANOUGyWmjoXBcCwipik3TUwdSz5MTFNumpg6Oiamjg34ULHCtM/GxNTxTD5UQFkkrMjy2rTPZsTUsZ4PVVkkXCfLa9O+DxVtpn3axNRxhQ8VYNr3oSqLhDWyvC6LhLYsrwHTPkti6ljhQwWURQJkeQ0c7/cORg1X/PDT9OUXb7FGltemfRbE1LHgQwWURULb7Z1tAYF79xsWXkj4+ZTvDqf2yi3WyPIaomkKiKkDfKjKImGN2zvbRP75l/N5c/aYh3/xxrs1cLzfOxg1XDE5nn5wZwuiaQqIqQN8qL75NJmccK0sr4GySGh7dWdbAIHI7EkzmzN9zNEpo6PpR59tQTRNATF1gA/VqEyef2776+8b2n7/k7c/rMsi4TpZXp/c7cXI7Elzds6jM15/p+ZSNE1ZEFPHgg/V6Vc9gRhpLpjNm/pvTh9yeML7H9dlkbBGlte0RMA0ZUlMHUs+VCd3ezHSXDT1OdNzXnurZuF4v3cwami7uODHX6bFJ1sQWTJNaRNTxwofKloil+TBlz0BhHvfNjsvMZvzaMrRA+4fTu98vgXRNGUNMXW0+TBhyTRlwYfq1y96EZ4+ZTZvzmb89gdvvldzKZqmrCemjs34UPF/ETBNeSYxdWzMhwkrTFM2IKaOjompo2Ni6uiYmDo6JqaOjv0HU1Id9N2xa08AAAAASUVORK5CYII="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAIAAADm9jPlAAAC2UlEQVRIDbXBsW8bZRjA4d+bxUKgU4VkRljA902tGN4sqK8n1g6I4f6IqgsSQicWFksINgYGNhg4MabA7g+JVj4JibYq9qFAm6ZITdtwudh1jhA+2kMWMUlKEPbziKljycTU9QdDZrqrjkUTU9cfDEWEGdOYhRJT1x8MRcQ0ZjnE1PUHQxrdVccSiKkDfD4CQgjdVceiialjpj8YiohpzEKJqesPht1VB/QHQxExjVkoMXVAfzAEuqvO5yPTmIUSU0fD5yPANGbRxNSxZGLq+N98Xph2OIGYOk7B5wWHmHYAnxc0sl6UpBVg2uEIMXU8lc8LIOtFHJKkFZD1IuYlaWXaYZ6YOk7m8yLrRfwXSVqZdjhETB3zfF7QMO34vMh6EUd0XqTY4FhJWgGmHWbE1DHj8wLIehGNJK2AW2vtqzdq5p19mWefaV25XjNva5sXnuexJK1MOzTE1NHweZH1Io5z/lwL+Ob7+tUO4ykPS9Y3udBtCYRAvc9kWo8fcWeL0a3ylZfOAElaQTCNATF1gM+LrBdxgtfOtgL8ccB4Wu+MubfNG29XwMbldgjU+3U1odzlwQ5/+eHn8r1PViCYxoCYOsDnxXefRcUdjpWkFZD1IuadP9dCEAiByV49nlLusr7JtR/Lj75YgWAaA2LqAJ8X1z6PzjzX+vZ6zbytbS59WGW9iOMkabVxuR0Ck7263OVByYW3Kp4IpjENMXU0fF788nU7AIG9fR5N62rC3fsUG+W7H69kvYgTJGnFnACYxsyIqWPG5wVwe61d79c7Y8pdXr9Y0bi91r5yo2Ze/Rs3fyrf/3QFAjOmMfPE1HGIz0cg/C3whNz9qs1jwsEBk2k92eP+r6xvcvGDCoJpzMnE1HGEz0c0TGMaPi82vmwT+P2AybQux9x7yJvvVBBMY55KTB2n4/OCfwqmMf9GTB2n5vMRh5jGnIKYOpZMTB1LJqaOJRNTx5L9Ccl4PfSRQaM1AAAAAElFTkSuQmCC"},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAIAAADm9jPlAAADu0lEQVRIDbXBz4sbZRjA8e+7VEJBQ0GCN/UgmfcgrR6eIJQ+8eTVepFcBcGTevHigCchB9E/QPAg6iEXQbZW9DgvtOq8ImjLMhn6a9dd1Ja12cmm2WHbfd0ORBM3aYtLPx+jYnnIjIoFkjSj0m5ZKkmaMdFuWQ7BqNgkzdot63wfCCG0WxZI0swYw4RKxP9lVCzgfF8lApI0M8aoREmaGWNUIg7NqFgmkjRrt6zzfZUoSTMq7ZblcIyKpZKkWbtlne+rRFSc7wMhhHbLcghGxQJJmrVb1vm+SsSsJM2MMSoRE87nTKg0uR+jYpM0a7es832ViIkkzdotCyRpZoxRiQDnc6DXrTPRiQtApcliRsUmacaUdstSSdIMaLes830wQK9bZ55OXKg0WcCoWMD5PlNUIirO97nL9Lp1FuvEBQSViHmMimUx5/Net879dOICgkrEPEbFsoDzea9bZ8rJ4zUM534pmTBwJhl88d0SBJWIeYyKZQHn8/zL+s99/nHqRC1AgN1dRuPy4hU+XR689vKxTlxAUImYx6hYFnA+v/JV45Ej7Dv3a8nEkSWip/hxhd63g9dfOUalExeASpMDjIplMefzjbONAAF2dsrRDoMhV39Hn6/5lZIDOnGh0mSWUbEs5nze69aBF56t3dopbw4ZDBne4h46caHSZIpRscxyPqei0nQ+73XrHGCfJFtjkU5cqDSZMCqWCedzoNetU+nEBXBtufHDxZJZx5/h0aO18xdKZv25yROPs68TFypNKkbFUnE+73XrzHPqRA3D3h6jcbk9ZnPA5XVOv1gLQKDcZTQuixHrN+hfHTSfPgZ04gKCSgQYFQs4n/e6dRY4ebwWAnf2GI3LwTbr1+nEBbC63ADK3XJrm8GQzYJ9YY+Va4P3P1mCoBIBRsUCzuc/fVa/tM5cnbgAet06B5x6rmZgLzDaKUdj/iq4vM4b3QKCSkTFqFgqzudrZxrnL5RMeewol9Z5+6Oi160zTycu1s409gLb43JryI0Bp98pIKhETBgVS8X5fOObBoF9O7vcGpdbIzauk68O3vt4qdets0AnLpgRVCKmGBXLhPM5sLrcKHfLrSE3h7z0ZkFldbnx/cWSWTslK1cGH3y+BIEJlYhZRsUyxfk+GP4VuMtsnG1gMHD7DqNxORpzfcCl33jrwwKCSsRiRsVygPN9KioRFefzta8bBG7fYXtcDob8scmr7xYQVCLuyahYHozzOf8VVCLux6hYHpjzfaaoRDwAo2J5yIyK5SEzKpaH7G/ofrv0readFgAAAABJRU5ErkJggg=="},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAIAAADm9jPlAAAEXUlEQVRIDbXBsW8kZxnA4d/rZqMI7Z7ELUpFqDxfisiieLcI8bsNTYo0FPH8CUgU153kKRHMVVcgykSAEEhzPRb1jKlmKGIJhdlVRAjcmtzZPs/M2pcbzzoDN9EKL2uTu+KeR0wdr5iYOiBO8/HIsRSn+XjkWBWn+XjkeHli6uI0B0TE1APiNB+PXJzm45FjKU7z8cjFaT4eOV6SmDogTnMRMfXiNB+PXJJNTL04zccjB8RpPh65JJuAtO1XIhusMd3kBmLqgDjNRcTUi9NcREw9IE5zETH14jQXkSgcADu7hYhE4YBVflCZbnIdMXVAnOYiYurFaS4iph4Qp7mIgLTtVyIShQNgZ7cQkSgcsMYPKtNN1oipA+I0FxFTL05zETH1gDjNRSQKBzu7hYhE4QDY2S1EJAoHrPGDClpTj1Vi6oA4zUXE1APiNB+PXJzm45FLssnHvx/kn7OzWzy4d2tnt3hw75YflFE4YNU/HnH3FxW0ph6rxNTFaU5nPHJ04jQfj1ySTUA+/l3/O9/uNQ3fff/Rg3u3/KCMwgGrNoS/H3L3lxW0ph6rxNQBSTahY+rRSbIJCBCFfZb8oIzCAWs2hA92K2hNPdaIqeOKJJuyFIV9XowfVNCaelxHTB2dJJsCUdin4wfV/of92RFXbW/1gP2DmqUN4V/H3LlfQWvqcR0xdUCSTaOwzzfZ3urRedZQntXFnOOCD3YrnmtNPa4jpi7Jpn/6qP/wMeve3eq1Lc2CZlFfNFwsOCk5PGL7+73yrC7mPD7la35QAaabrBFTl2TT/Q/7syPWvbvVa1uaBc2ivmi4WHBS8qTCD6oo7LPGDyrTTVaJqQOSbBqFfdY8fcbrr/FS/KAy3eQKMXVAkk0P/zi8vORiQdPUzYJ6wckps2Nef411b73JXz/nJn5QmW6yJKaOTpJN//mH4cWC7JOajh9UwGxvuH9Qs+qt73F70Ns/qFn1xTFv3MYPKmhNPTpi6ugk2TQK+1xne6sHLC4pz+tizpOSL055/wc9Ol/WdXFGMeeo4NEJb9zmP/ygMt2kI6YOSLJpFPa5wfZWD1hcUp7XxZzDY/yg+vNv+58+ZHur92VdF2cUc45LvvaXT4uf/WoDWlMPEFMHJNk0/U3/b4dcyw8qIAr7rHnn7V5zyUVTNws++Yxb3+LhEZ89LH7+6w1oTT1ATB2dJJvO9ob7BzVXtC2Pn3DnfhWFfa7zztu95pKLpm4WXDQcnfLenYrnWlOPjpg6Okk2ne0N6Tx9VpfnFHOOSx6dcOd+FYV9buAHFStawNRjSUwdS0k2BWZ7w6d1XZ5RzPnhTyo6s73h/kHNqmLO4VHx0482oGXJ1GOVmDquSLIJCP/V8pzM9oZ0mgXleV3MOSl5fMqP71XQmnrcTEwda5JsQsfUo5Nk09neEGgWlOd1Meek5Ed3K2hNPf4vMXW8mCSb8r9aU49vIqaOF5ZkE64w9XgBYup4xcTU8YqJqeMV+zchUhkDQEQ8kAAAAABJRU5ErkJggg=="},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Mind rune","base64":"data:image/png;base64,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"},{"name":"Chaos rune","base64":"data:image/png;base64,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"},{"name":"Death rune","base64":"data:image/png;base64,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"},{"name":"Blood rune","base64":"data:image/png;base64,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"},{"name":"Bolt rack","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFe0lEQVRIDbXBz4ubxx0H4M935p2ZV9nu8hLJBBYjQrPoncqRD4FxodBx6bVnY5q2eBuai72K2kMgLv1h01shYAhNCS29Fvpf7EsIaAdEj+vXZg86rax1WZwKqa/embebt1VW2wTaBvt5yBqNF4ms0fsHh1i5fk3juSJr9P7BIRFhxZoUzw9Zo/cPDonImhRfSeZyXGRNBytkjd4/OETt+jWN/0Hmcqx55ZWtRkOpSHAZSR4xwUejR9Z0UCNrNIDMPQRQVdX1axpfJnM5Vi5fvhRFUEpwHkkZMcaF4IJj6Qv8S8DQHVnTAUDWaKzsHxwSkTUpgMzlWLOzs805JI+4jATjTHDBOYtQ/mOOL/DAcHgEVNakZI3ePzi8fk0D2D84JCKAAOzsbEsZcR4JDi44Y1xwziIeyr/jCwIu8B7D4RFQWZOSNRrA/sEhACIGVG+80eEcgnEmeMQ4YyjLOVYCLgoAPC5aegyHR0BlTUrWaNQy9xBAr/daHHMlZCR5KOdYE7ASAHisTJ+eYIVzeI9m0lqG0rmxNR2yRqOWuTxNtxsyVjEXSsqIl+U8oBYAeKxMn56g5j04x5l3b99jRB/9afBpkXiPZtJahtK5MVCRNRq1zOVp2m40IiWkUjySoihmCB7A9OkJat7jc3f794iIEYHo/Qd9ISE4PvWJ92gmrWUonRsDFVmjUctc3u22YxkJJZXgUopFMTs+nmDN3f49RjVGt+4MUPvJD9/sdb+xsbHxhz/+VAhMZ0kzaS1D6dwYqMgajVrm8m63HcsoVjJSXEZiUcyOjyd3+/cZgRiduXVngFr/7be6aUcIyegMiNiDD/uCQwicLpJks7UMpXNjoCJrNGqZy3vdtohVLLhUMmAeSn/85OTx42eovbt3O915jWqMCES7ewMAr14O3/n2zavdK3/+y6+EwOkiSTZby1A6NwYqskajlrm812vHQomYSylDOQ/BHz85eW/v11RjRGC0e2eA2ts/+sHrXb3x0gYDEQMR+91HfSFwukiSpOWXGLojoCJrNGqZy3u9r8eCq1hKyctyHoI/fnLyy5/95tadAWq337p1Je2ouMHoDIjY7t4AwM6roaEQSwiO0yJJkpZfYuiOgIqs0QAyl6fpdkPGIuZKSRmJspxNphPv8b3v3tCdjhCCETECiO3uDVDbvXnj6utXtrY2GRgxfPD7QSxxWiRJ0vJLLH05Go3JGg0gc3mabjcasRJcKSmlKIrZZDrxHr8Y3Aex3b0Barvfv3G1e2Vra5OBEQMRe/BhX3AwDsHwt0UC4OWktVxi6cvRaEzWaACZy7tpWzYipaRSXEaiKGaT6cR7PH787Mdv3rza7W5ufo2BEQMRvf/BO4KDcwiO0yIB4D0+12y2/BJLX45GY7JGA8hc3u22YxnFSkolpWSLxWwynXiPn/fvEwMR/fbBO5KDcQiO0yLBRZearQDAwwMIOLP05Wg0Jms0gMzl3W47jlUccxnJgHkImE4n3qPBTzmH4HhWJLjoUrMVAHh4AAFnAkp4eNQCRn8dkzUaQObyXrcdx0rFUkpehnkImE4n3oNz/IdmswUPDyDgTEAJjzMenxmNxjhXkTUaQObyXq8dx0oJKSUvy3kImD6dYKXZbMHDoxawLqAE4NwY/1ZhxZqUrNGZy9Od7UYjVjFXSkopimIWggcQsOKxzuMzw+ERzlWoWZNiDVmjM5en6XajESslleBSiqKYBQABgMeaAHzyyRHOVVixJsWXIWt05vI0bTca0UtKSiUjyYrFDCsB+PjjRzhXYcWaFP8NWaMBZC4H8K1vaqkkMA9Alj3CuQor1qT4f5A1GrXMPQQI5yqsWJPiqyJrNNZk7iFq1qR4HsgajReJrNF4kf4JZqcZ0gxADMYAAAAASUVORK5CYII="},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACvklEQVRIDbXBQWtUVxgG4Pc7987gyBgyE9dKKeSeP/Btv3+QRbtwIV1UVyoMgwEZQsFupoguasSFYKELEUXopmgWgquzPTvBhecPCKEKSTq5c8/MPafeoERpE+9Y7vOQsEaTSFjj/zHW4RPCq/gECWt8LWMdgLW174iSlZXTe5Wd58+fCa/iIxLW+CrGunPnfkjTdpom3e6pXq8/mUzevfvr7dvtra0/hVdxgIQ1Fmesu3jxChC999NpfubMN0tLS9777e03k8nfjx8/AKJwBoCENRZnrLtw4dJeZafdbj99+gegzp//EQcePfodUMKrAEhYY0HGurW175eX+3mee1/s7+8lSavfX+l0TiaJ2t3defLkAaCAKJyRsMYijHWDwbX5fD6b+aKYFsU0z/Nut3vixMlOpzOfl/fvb6KigCickbDGIox1V69uhBDKspzNZkUxzfN8f3/v7NlvQwi7uzsPH/4GKCAKZwBIWGMRxrrhcEREZVmGEACkafrq1csXL7ZwSAFROANAwhq1GeuGw1GSpCGU74UQer2+9/7WrZ8BhUNROMMBEtaox1g3HI6SJAViCGE2873eyni8cfny+r17vwIKiDggnOEjEtaowVg3HI6SJFVKhVB675eXe+PxBioKlSic4V9IWONLjHWDwajVSt8LIRTF9O7dm/hAARGAcIb/QsIaxzLWDQbXWq12mqYxwvvpnTs3UFGoROEMRyNhjaMZ69bXfyIipRKlVFFMNzd/QUUBEYBwhmORsMbRjHXXr98oy3I+n3vvb98eo6KAKJyhBhLWOJqxDgj4jAKicIZ6SFjjWMY6IOCQAqJwhnpIWONLjHWoBFQUEIUz1EPCGjUY+xogVKJwhtpIWKM2Y18LZ1gECWs0iYQ1mkTCGk0iYY0mkbBGk0hYo0kkrNEkEtZoEglrNImENZr0D2tzLJBupACDAAAAAElFTkSuQmCC"},{"name":"Tooth half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACqUlEQVRIDbXBwUsUURwH8O/vbW4iHSLCDkKHoJ0HERTxg06/v6RDmRiVBGkdSioookt0KbzkQbp5KA8igXSQh4nwCKI9lENQSIS0sm6zOzO7W7OvRpIEs8ZgPh8S1sgTCWvkiYQ18kTCGnkiYY08kbBGnkhYI08krJEnEtbIEwlr5ImENf7KWB8bhEvYIRLW2J6x/tDQSBRFQfB1ZeXT/LwRLmEnSFhje8b6V67caDajJEkqlS+rq1/m5l4Il5AZCWv8ibE+gDNnzhNBKSoUupSiarW6tlaZnX0uXEI2JKyxhbH+qVNnk+R7p+OUop927eoqFru6u3uC4OuTJ48BJ+whAxLW2MRYH8Dp0+eATq1WKxaL7XYbQLG4e+/efb29B1ZWPo+PPwSUcAkZkLDGBmP9/v4LSDkA1Wqlp2dPknScS4gKk5MTAAYGhsbHHyGlhEv4FxLWWGesPzh4CXDO4ack+b66Wjl06HAcR9++tTsdNzExhpQCOoACnLCHfyFhDcBYv7//vFIEEJEiIudcHIeNRr1WWztx4mSr1Yyi8N278sLCPFJO2EMGJKwBGOtfvny92YziOGw0wno9OHr0eLMZR1HUaAR9fQcLhYJShbdv30xPPwOcsIdsSFgDMNa/efNea10UhXEc1uvBkSPH4jj68OH91NQkgIsXR8rlV8bMAU7YQzYkrLHOWH909K5SaLXacRzFcRgEwf79vWNj95FSSHWQUsIlZEPCGhuM9QFcu3ZbKdVqtcKwsbz8cWbmKVIKcAAh5YQ9ZEPCGpsYuwTQ1au3lKJqtbK4+LJcfo2UE/YAGLsk7CEzEtbYwlh/eHj0wYM7+EUBTtjDzpGwxp8Y6+M3J+zhv5CwxjaMXcI6YQ//i4Q18kTCGnkiYY08kbBGnkhYI08/AExcL5Dnf15pAAAAAElFTkSuQmCC"},{"name":"Dragon helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEuUlEQVRIDbXBb6ikVR3A8e85s+N6885wjJURHWwXLvM8+P4QBB2jN0GIwhK9CAL7D4YIYiW+MS3IP71ZQiRa/2CSXUSMQqqlbnFe7IKHJMg/zGNodC/F3X/+dmd275z7PM953Lk27B32jkKwn49yNudqUs7mfBwfCmcH/F+UszkfyYfiC6Q/op0dsMOHwtkBMz4Uzg5YQDmb85F8KBzJo6FxNvOheLiXHtrUzg4AH4p7TPqZaGcH7EU5m7OYD8V3THpdCGh2PNXrlnAyyo9FOzvwobjfpC14UrSzA66gnM1ZzIfiHpOGwjH00V73ujaXlHCq5GSUx0Q/aFIJ23BENDTOZsxTzuYs4ENxt0kG3oNtuGvZaKihBCk5iZyKtKGGs/CMaGiczZinnM1ZwIfi2yZdDyOo4MvLJkLJVA3vlxyL8ilI8A78VjQ0zmbMU87mLOZDcZ9J10IFCW5bNg1TNSQ4MRYgwevCX9HQOJsxTzmbs5gPxfdM+uR+Kijh020DJEhQwfGxNHAe3hKOo6FxNmOecjZnAR+KP/W7fx6LZmppP59ZMrEiQQXbcGIsAhegDS+IhsbZjHnK2ZwFfCj+0u/2r+VUxasiwBeNiRArIkT4/VjGcBBOw3OioXE2Y55yNmcBHwp/sHvTPmqo4XTFJQliRYRzJQIKGcGZyE9FQ+NsxjzlbM4CPhRvr3TbkKCGGuqK0xUJzsM1cBEulIyRM3Bik2NoZwfMU87mLOBD8fZK93cjOdwxNdRQVyTYggnEii3Yggsla1FqWBUNjbMZuyhncxbwoXhjpXsdHPqnPNHjcMfUUIOB4xO2YFLiozwvPN7jD5usoaFxNmMX5WzOXnwoVvvd9VIOd8zaiG9uCvB4jy91zBL84LQ8L3zoub55t5Q3Iy+LhsbZjF2Uszl78aFY7XfXS7mzY1pw6Jr9R8/Ez3dYG3F7h+MTXhvLXQfMCyM5iPnlphjDRDiGdnbALsrZnCv4ULzY72rYKOXfkXsPmLURn+uQoIEu/G1CBTVsw/slr0XZYmpVNDTOZswoZ3Ou4EPxYr/bgvVSWnBHxySoIUED18M/JtQQ4Rz8ekNuMURow3/gVdHODphRzubM86FIt96wej62YL2UffBepIa7D5gEqeLAPoYVseIcvDKWEm6GCXwCTsES/EK0swN2KGdzdvGhaG69gR0vnY8bpbTg3cgR4UN/P2giTOC2fwk7vmq4EbahA/my2SjlgU0NjbMZoJzNmfGheLSXvtIxGhT8aiSH2qYFD2zIkL2tMPX9npkgK21zFk6W/DfKE6KdHQDK2ZwZH4pHe+nrHaNAwdMjuaVtfrghzAyZs8L/PNI3E3hnLJ9dNmfhlbG8IQzRzg6UszkzPhQ/6aUl+JrpPS2bEW5qmx9tCDMtGDK1wlSLy77RYwJbEbdsfj6WQngLDY1yNmcXH4ojvdSCCNswjFyimFKg4aho4FsmadCgQIGGBm7ez8WIwDr8RjQ0zmbK2Zx5PhRP9tKbkYtMKXhWNJc1TCl2+a5JCmowIPCUaGiczQDlbM4VfCiY0zDjbMYOH4ZcppjTOJuxQzmbsxcfhsw4m/FxfBgy42zGjHI252pSzuZcTcrZnKvpA1ntLwUAIRpaAAAAAElFTkSuQmCC"},{"name":"Shark","base64":"data:image/png;base64,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"},{"name":"Prayer potion (2)","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEkElEQVRIDbXB3YtVVRgH4N+7zzmTJkYJCt3NRZy9oI+7dftCf0L9D3WRGKSWkWkD0ddNYB9eVFRkWo2JYg2Do8zFppvY90F7IChKO2VzvvbaX+tda2ViMNPMPs5Nz0OsFXYgSTNswLqPnSHWCneTpNnxQ49VjatqV9auKt25Sz+x7mMHiLXC3SRpduYUA7CCopT1UfHr7+aDz9dY93E3xFrhbpI0O3OKA1DX3pSyPqqu/24++mINCKxjzESsFWZK0gzAmVNsBXUjRWnXh/X1QfnJ4hoQWMeYiVgrtEvS7PDh4/fsuifef81aXzVSlG40qtcGj8zNzZ079ynrPmYi1grtkjQ7dmyh04miqBNFBKKyKIvCFIUxZrq4eBYIrGO0I9YK7ZI0e+n4qwCICEAIoSzL6XRcGDOejpe+uQgE1jHaEWuFmZI0W1h4ywcfvHfeG5NPJ5M8nywungUC6xgzEWuFmZI0e+HYwp49e6Iock4KUwxH64M/bly+9DUQWMeYiVgrzJSk2cmFN6IoAsg7MUUxHK6v//XnpYvngcA6xkzEWmGmJM1OvPI6EQDy3huTj4bD0Xh48cJXQGAdYyZirdAuSbODBw/f/8A+EAjkvTPGTPPJeDQcrv+1unqVdR8zEWuFdkmaHT16Iup0KAJA3jljpk1djybj0Wj92soyEFjHaEesFdolaXbkyMu4jYhErDHGOcnz6Xg8unLlWyCwjtGOWCu0SNLs0KHne705EAi3UN1UdVU7J1VVjMeTssxXV6+y7qMdsVZokaTZ0aMnQAg+3EKEqiqttSJibZPnk6qql5cvA4F1jBbEWmE7SZo9/fSz+w8cCLf5EIIPZWW8OPHOi+T5tKpqU+QrV5ZY99GCWCtsJ0mzp546uO/xhzseESgKFMRVZeka6yoRa6ejkZlMpj//ubKyBATWMbZDrBW2k6TZMxfe6aDTDYgCRYHgvG0aseLqRhpbFibP83Jqrrz3GRBYx9gOsVbYIkmz+TPPPfHgo8GH4Jx3AeK882Ktt9ZZkUakaZq6bqr6+xtrg9PLrPvYDrFW2CxJs/mzR7B7rtvrifcIAc4/uU95cU7EWyvWeRFnZeW3H2BKm5eDty8DgXWMLYi1wmZJms1ffKm79174AHi4gACEIM5DHMTBilgHa2FqTEtb1phWg3e/Zd3HFsRaYYMkzea/fL67by92dQGCDwgBAfAB3sM6sQ7i0FhpBEWNaYmitHmFSTH48CrrPjYj1gobJGn20NJJ3Le7g384AAF3+ABxsE4aQSOoG8lLmBqmsnmFvBycXgYC6xgbEGuFzZI0i797ExsFAMGFAOvRiDSCRlA3UlQoGhSVvTkZvH0ZCKxjbEasFbZI0uyh1ddAABEi6kQEwPkA69CINIJG0DRiKtyc2N+Gg/eXgMA6xhbEWmE7SZrNn38RvU6310Wvi14EIoiHFaktrJObYwyG9pebg4+vAYF1jO0Qa4UWSZrhX/PnX0Sv2+11xFrklfwx+vXwx7gjsI7RglgrtEvSH3EH4b8CbmMdox2xVtiZJP0RG7COsQPEWuH/9De1wgCuvUfTrAAAAABJRU5ErkJggg=="},{"name":"Restore potion (2)","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEjUlEQVRIDbXBzYtVZRwH8O9z7r2jIYUJI61mIXTPw5ARwrPsR8voT4i2ujEDdUrIrIGgaCNI1qKiAl+qSRmxBplRZnGq1fkDojMRFJdJvXrfzvt5fs/zpGIw09xzZzZ9PoKUxA4EYYQNSLWxM4KUxHaCMDp97PmiMkVp8tIUubl87Q9SbeyAICWxnSCMLpwjAJqR5dwbZJ3b6WcX10i1sR1BSmI7QRhdOEcOKEub5twbFOu30y++WQMcKR8TCVISEwVhBODCOdKMsuIs171+uX4n/2phDXCkfEwkSEnUC8LoxInTu3bv8qdvaW2LirPcDAbl2p3npqamLl/+mlQbEwlSEvWCMDp1ar7R8Dyv4XkCQuRZnmVplqVpGi8sXAIcKR/1BCmJekEYvX36fQBCCADOuTzP43iYpekwHi79sAg4Uj7qCVISEwVhND//kXXWWWusTdMkHo2SZLSwcAlwpHxMJEhJTBSE0Vun5vfs2eN5njGcpVl/0Ltz9+/r164AjpSPiQQpiYmCMHp3/kPP8wBhDadZ1u/3eve71xa/BxwpHxMJUhITBWF05r0PhAAgrLVpmgz6/cGwv3j1O8CR8jGRICVRLwijo0dP7H16HwQEhLUmTdM4GQ0H/X7v/urqTVJtTCRISdQLwmhu7ozXaAgPgLDGpGlcleVgNBwMerdWbgCOlI96gpREvSCMTp58B48IIZh1mqbGcJLEw+FgeflHwJHyUU+QkqgRhNGxY2+2WlMQEHhAlFVRFqUxXBTZcDjK82R19SapNuoJUhI1gjCamzsDAWfdA0KgKHKtNTNrXSXJqCjKGzeuA46UjxqClMQ4QRgdOfLG9P797hHrnLMuL1LLhq2xzEkSF0WZZsnK8hKpNmoIUhLjBGF0+PDRl6annec5r+E8j53Ni7IyXLKpDA/j4ShJ/hzFKytLgCPlYxxBSmKcIIyuvn4crabzGtZrwGsYoNSVNlwxV6zTPI/jOM2y88tLgCPlYxxBSmKLIIwuzs4888qr1sE4x84a54yx2hjNrK2pDFfMRVWVVXE7/OmTTpdUG+MIUhKbBWF0aXbmiQam0LRgC1hg78uvGWvZGs2srWVmbc36zespELM+2+kCjpSPLQQpic2CMFo8OPNko2nxkAUcYA0M2ADagIHKsAYyg5iRsY6BjztdUm1sIUhJbBCE0bezM/ummrs9PGABZ+EAC1hAGzBYG2igNJwZxIwMSFiPgM87XVJtbCZISWwQhNHSwQNPtQA08JBxeMwCbKGBynBlUAKJ4dQgZSSsE+DTThdwpHxsIEhJbBaE0c+HnsUGDg85GG1RAZXhyqAEMsOZQca4x/pspws4Uj42E6QktgjCaPWFAwIQHjzAQwOAhdEWFVAZrgwqIDV8r8Q66/OdLuBI+dhCkJIYJwijK7MzzQZaaLYaaAHCA1tooDSsDe4ZvlPiL9ZfdrqAI+VjHEFKokYQRvjXldmZVgNNNDU4MehWfPz3dTzmSPmoIUhJ1AvC3/CYwH85PELKRz1BSmJnfvn1ri1S0ZwC4HT54qED2AFBSuL/9A/yqeWf+DMIegAAAABJRU5ErkJggg=="},{"name":"Super defence (2)","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEl0lEQVRIDbXB24tVVRwH8O/a55zRGCoTlB5iHoTO3g/RQ7Bef/R3RK/6IgZeSsisASkRQpDsQldBHXMaGbEG8cI87Hrbf4F7oDBiGjvjue61L2v91lqpGcw0s8/MS5+PIBlhG+IkxRok29geQTLCVuIkPXHo1VLbsrJFZcvCzlz/lWQb2yBIRthKnKQXzxEAw8gL7vbzP1bUl5eWSLaxFUEywlbiJL14jjxQVU4V3O2Xyyvq6ytLgCcZYixBMsJYcZICuHiODKPSnBem26uWHxTfzS4BnmSIsQTJCPXiJD1y5MSOnTvCPXeNcaXmvLD9frX04JWJiYmZmQsk2xhLkIxQL07S48enG40gCBpBICBEkRd5rvJcKTWanb0MeJIh6gmSEerFSfruiVMAhBAAvPdFUYxGg1ypwWiw8OM84EmGqCdIRhgrTtLp6TPOO++cdU6pbDQcZtlwdvYy4EmGGEuQjDBWnKTvHJ+enJwMgsBazlXe63cf/PXnjetzgCcZYixBMsJYcZK+P306CAJAOMsqz3u9bvdh5/r8D4AnGWIsQTLCWHGSnvzgIyEACOecUlm/1+sPevPXrgKeZIixBMkI9eIkPXjwyK4XdkNAQDhnlVKjbDjo93rdh4uLd0i2MZYgGaFenKTHjp0MGg0RABDOWqVGuqr6w0G/3717+ybgSYaoJ0hGqBcn6dGj7+EJIQSzUUpZy1k2Ggz6t279BHiSIeoJkhFqxEl66NDbrdYEBAQeEZUuq7KylssyHwyGRZEtLt4h2UY9QTJCjThJjx07CQHv/CNCoCwLYwwzG6OzbFiW1c2bNwBPMkQNQTLCZuIkPXDgrT179/onnPfe+aJUji0765izbFSWlcqz27cWSLZRQ5CMsJk4SffvP/j6a3s8Ao+GR8DsirLShittteHBYDAcZvdXRrdvLwCeZIjNCJIRNhMn6bXPDyNoejScb0A0rEOltTGsDWttVF6MspFS+fkLC4AnGWIzgmSEDeIkvXRq6sV9bzgHaz07Z6231hm2xrBhq5m15lLrqixX7v/86VyHZBubESQjrBcn6eUPp57ZgYlm03l2Ds5h10tvWuuYrWE27NiwsXb5txsqx6gwZy91AE8yxAaCZIT14iSd/3jq2cmm84CH8/AOzsM6thaGwRbastHIC4wK5KUZFfjkSodkGxsIkhHWiJP0+9NTu59v7pzAI87De3gH5+EcDIMdGwPDqJjzAqMceYEsN0OFr+Y7JNtYT5CMsEacpAvn9j03CaCBx6zHU86DGYahmbVGZZAVrAqoAllhsgyfzXUATzLEGoJkhPXiJP3lm5fxiMc/PB7z3hqGZmhmrVEZ5AXnJfISqz1zdqYDeJIh1hMkI2wQJ+niF/tEACEQCASiAcB5aww0QzNrDc1QOa/2sbxqzl/tAJ5kiA0EyQibiZN07sxUs4VWo9lqodWACMAMw6iYTYXVIT9Yxe8r5tsbHcCTDLEZQTJCjThJ8a+5M1OtFpqNpmHOCnS6fPjsMp7yJEPUECQj1IuTe3hK4L88niAZop4gGWF74uQe1iAZYhsEyQj/p78BU7IDrnCZXWgAAAAASUVORK5CYII="},{"name":"Sealed clue scroll (elite)","base64":"data:image/png;base64,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"},{"name":"Crystal triskelion fragment 1","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACH0lEQVRIDbXB0akjNxSA4f90oA5CXkZq4OCX4VQkEGQLSQamIjEvw8EFWLCkBXWgvWsyic3du7G56+8T08QriWnilcQ08UpimnglMU28kpgmXklME79C9WY68Y6YJj6tegvL2ks2nbgnpolPq97CsvaSYZhGbohp4tOqt7CsvWQYppEbYpr4tOotLCvQSzaduCGmiSdVbxxMJ66qt7CsvWQYppGDmCaeUb2FbefQ55PpBFRvYVl7yTBMIwcxTTypegPCtnPV55PpVL2FZe0lwzCNHMQ08bzqFxAgbDvQ5xMQlrWXDMM0chDTxMOqNw6mU/ULSNj2Pp+AsKy9ZBimkYOYJh5TvYVt59Dnk+lUvYVt583ZgV4yDNPIQUwTj6newrb3+cQ/Bt9J2HbenL2XDMM0ckNME4+p3sK29/kEgyvTWL2FbefN2XvJMEwjN8Q08ZjqLWw70OcTh7DtvDk70EuGYRq5IaaJh1VvYdt57+y9ZBimkXtimnhG9QaEbeeqz6ewrL1kGKaRd8Q08aTqFxAgLCvQS4ZhGvkRMU3cqN64Mp34QPUGhGUFeskwTCMfENPEoXoLywr0v7/y159cmU5A9ca//vgSfvsd6CXDMI18TEwTN6o3ICwrh14yEJaVe71kGKaRnxLTxL3qFxCuwrJy6CVzZ5hG/o+YJn6k+oXvhP8MbphGHiCmiZ+qfuHKNPI8MU28kpgmXklME6/0Da527oG0TeX5AAAAAElFTkSuQmCC"},{"name":"Crystal triskelion fragment 1","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACCUlEQVRIDbXBzY3bMBCA0W86UAdBLiIbmIMu09ISLEQQEKShuQgG3YAJbA/qgFGcaCNnf2Jjo/fENHIkMY0cSUwjRxLTyJHENHIkMY0cSUwj/4OXatrziphGPs1LZZzIybTnlphGPs1LZZzICZppYEdMI5/mpTJO5ATNNLAjppFP81IZJ1Y5mfbsiGnkQV4qG9OeKy+VcSInaKaBjZhGHuGldj6zWWww7QEvlXEiJ2imgY2YRh7kpQKdz1wtNpj2XirjRE7QTAMbMY08zssFBOh8BhYbWI0TOUEzDWzENHI3L5WNae/lAtL5vNjAapzICZppYCOmkft4qZ3PbBYbTHsvtfMZWM4nVjlBMw1sxDRyHy+183mxgd8aP0nnM7CcT+QEzTSwI6aR+3ipnc+LDdC4Mg1eauczsJxP5ATNNLAjppH7eKmdz8BiA5vOZ2A5n1jlBM00sCOmkbt5qZ3PvLKcT+QEzTRwS0wjj/BSgc5nrhYbGCdygmYaeEVMIw/ycgFhNU6scoJmGniLmEZ2vFSuTHve4aWyGidWOUEzDbxDTCMbL5VxYvX8zPdvXJn2gJfKi6cnvnxllRM008D7xDSy46WyGide5MRqnPhLTtBMAx8S08gtLxcQfhknXuTEjWYa+BcxjbzFy4WfhD8aO6aBO4hp5ENeLlyZBh4nppEjiWnkSGIaOdIPc2rdgTw2AdIAAAAASUVORK5CYII="},{"name":"Crystal triskelion fragment 2","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACGElEQVRIDbXBwYkkORBA0R9rgazIlAOBLiIMahLSloS8jDtCF6H7MC0rwgMt3UxDFV1VOyyT74lp5EpiGrmSmEauJKaRK4lp5EpiGrmSmEauJKaRK4lp5EbpAzBd+EvENPKl9BGOE/B9M134G8Q0cqP0EY7T9w2m6cpLpQ/AdOE5MY3cKH2E4/R9g2m6cq/0YbrwqfQRagM8J9OFJ8Q0cqP0EY7Tf5z8/GW68KX0AYTaPCfAdCl9hNoAzwmm6cojYhq5UfoIxwn4vsE0XYHSR6iNG56T6VL6CLUBnpPpwiNiGrlX+gjH6fsG03QtfYTaAM+JT6E2wHMCQm2A5wTTdOUbMY3cK32E4/R9g2m6lj5CbYDnBBMk1OY5wQQJtQGeE0zTlW/ENHKv9BGOE/B9M11KH6E2zwkmHyTU5jnBBAm1AZ4TTNOVb8Q08k3pIxwn4PsGhNo8J5imK1D6gMkHCbV5TjBNVx4R08gjpY9wnIDvW6gN8JwA0wUofQChNsBzgmm68oiYRp4ofYTjBHzfQm188pyAUBufPCeYpitPiGnkudJHOE7A97dQO/c8J5imK8+JaeSl0kc4Tr74/hZq95z4ME1XXhLTyH8pfQDhOLnh+xv8Y7rwkphG/kDp7yB8CcfJJ98304XnxDTyx0p/5zfht2m68pyYRv6X0t8B05WXxDRyJTGNXElMI1cS08iVxDRyJTGNXOlf8JXzgVs6S6cAAAAASUVORK5CYII="},{"name":"Crystal triskelion fragment 3","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACDklEQVRIDbXB0ankNhSA4f90cKqw9R4OgkWcJhIIpAaDazFxukiaEHoRqmBUhTrw5g4MzDJ3dn0f/H3iFriSuAWuJG6BK4lb4Cty624Tp4lb4I3cOq9+/4P//gXcJk4Qt8Bncut8+6Z//sUbY10At4mfErfAi9y6bjsw1kVL5WGkyJ1uO3djXQC3iTfELfAktw7otvO/34y7kSKgpQIjRThAuNNtB8a6uE18RtwCD7l13XZgrAugpQIjRTj4IFrqSBEOtzm3Gx9Etx0Y6+I28ULcAk9y69xpqcBIEQ4Qtym3rqUCI0W3iYfcum776Df++dtt4kfiFvhRbjcQLRUYKQJa6kgR0FKBkSIcbjMPuXXd9rEucLjNPBG3wIvcupYKjBQBLXWkqKUCI0U43Gae5NZ124GxLm4TT8Qt8JncupY6UoQDREsFRopwuM28yK3rtgNjXdwmHsQt8JncupYKjBTdptw6Hw63mTdy63w43GYexC3wRm5dSwVGim5TbjfAbea93G5uM0/ELfBebl1LBUaK3LlNfIW4BX4qt66l8jBSdJs4TdwCv5Jb11K5GynC4TZzjrgFfiW3rqUCI0U43GZOE7fACbl1LXWkCIfbzGniFjght66ljhThcJs5TdwC5+TW4XCb+QpxC1xJ3AJXErfAlcQtcCVxC1xJ3AJXErfAlcQtcCVxC1xJ3AJX+g6piuGBBExF2gAAAABJRU5ErkJggg=="}]}

/***/ }),

/***/ "./JSONs/LocalStorageBarrowsInit.json":
/*!********************************************!*\
  !*** ./JSONs/LocalStorageBarrowsInit.json ***!
  \********************************************/
/***/ ((module) => {

module.exports = {"Linza's helm":{"tab":"equipment","quantity":0,"order":1},"Linza's cuirass":{"tab":"equipment","quantity":0,"order":2},"Linza's greaves":{"tab":"equipment","quantity":0,"order":3},"Linza's hammer":{"tab":"equipment","quantity":0,"order":4},"Linza's shield":{"tab":"equipment","quantity":0,"order":5},"Ahrim's hood":{"tab":"equipment","quantity":0,"order":6},"Ahrim's robe top":{"tab":"equipment","quantity":0,"order":7},"Ahrim's robe skirt":{"tab":"equipment","quantity":0,"order":8},"Ahrim's staff":{"tab":"equipment","quantity":0,"order":9},"Ahrim's wand":{"tab":"equipment","quantity":0,"order":10},"Ahrim's book of magic":{"tab":"equipment","quantity":0,"order":11},"Dharok's helm":{"tab":"equipment","quantity":0,"order":12},"Dharok's platebody":{"tab":"equipment","quantity":0,"order":13},"Dharok's platelegs":{"tab":"equipment","quantity":0,"order":14},"Dharok's greataxe":{"tab":"equipment","quantity":0,"order":15},"Torag's helm":{"tab":"equipment","quantity":0,"order":16},"Torag's platebody":{"tab":"equipment","quantity":0,"order":17},"Torag's platelegs":{"tab":"equipment","quantity":0,"order":18},"Torag's hammer":{"tab":"equipment","quantity":0,"order":19},"Verac's helm":{"tab":"equipment","quantity":0,"order":20},"Verac's brassard":{"tab":"equipment","quantity":0,"order":21},"Verac's plateskirt":{"tab":"equipment","quantity":0,"order":22},"Verac's flail":{"tab":"equipment","quantity":0,"order":23},"Guthan's helm":{"tab":"equipment","quantity":0,"order":24},"Guthan's platebody":{"tab":"equipment","quantity":0,"order":25},"Guthan's chainskirt":{"tab":"equipment","quantity":0,"order":26},"Guthan's warspear":{"tab":"equipment","quantity":0,"order":27},"Karil's coif":{"tab":"equipment","quantity":0,"order":28},"Karil's top":{"tab":"equipment","quantity":0,"order":29},"Karil's skirt":{"tab":"equipment","quantity":0,"order":30},"Karil's crossbow":{"tab":"equipment","quantity":0,"order":31},"Karil's pistol crossbow":{"tab":"equipment","quantity":0,"order":32},"Karil's off-hand pistol crossbow":{"tab":"equipment","quantity":0,"order":33},"Akrisae's hood":{"tab":"equipment","quantity":0,"order":34},"Akrisae's robe top":{"tab":"equipment","quantity":0,"order":35},"Akrisae's robe skirt":{"tab":"equipment","quantity":0,"order":36},"Akrisae's war mace":{"tab":"equipment","quantity":0,"order":37},"Corruption sigil":{"tab":"equipment","quantity":0,"order":38},"Barrows totem":{"tab":"general","quantity":0,"order":39},"Amulet of the forsaken":{"tab":"equipment","quantity":0,"order":40},"Coins":{"tab":"general","quantity":0,"order":41},"Mind rune":{"tab":"general","quantity":0,"order":42},"Chaos rune":{"tab":"general","quantity":0,"order":43},"Death rune":{"tab":"general","quantity":0,"order":44},"Blood rune":{"tab":"general","quantity":0,"order":45},"Bolt rack":{"tab":"general","quantity":0,"order":46},"Loop half of a key":{"tab":"general","quantity":0,"order":47},"Tooth half of a key":{"tab":"general","quantity":0,"order":48},"Dragon helm":{"tab":"general","quantity":0,"order":49},"Shark":{"tab":"general","quantity":0,"order":50},"Prayer potion (2)":{"tab":"general","quantity":0,"order":51},"Restore potion (2)":{"tab":"general","quantity":0,"order":52},"Super defence (2)":{"tab":"general","quantity":0,"order":53},"Barrows icon":{"tab":"general","quantity":0,"order":54},"Sealed clue scroll (elite)":{"tab":"general","quantity":0,"order":55},"Crystal triskelion fragment 1":{"tab":"general","quantity":0,"order":56},"Crystal triskelion fragment 2":{"tab":"general","quantity":0,"order":57},"Crystal triskelion fragment 3":{"tab":"general","quantity":0,"order":58}}

/***/ }),

/***/ "../node_modules/pixelmatch/index.js":
/*!*******************************************!*\
  !*** ../node_modules/pixelmatch/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


module.exports = pixelmatch;

const defaultOptions = {
    threshold: 0.1,         // matching threshold (0 to 1); smaller is more sensitive
    includeAA: false,       // whether to skip anti-aliasing detection
    alpha: 0.1,             // opacity of original image in diff ouput
    aaColor: [255, 255, 0], // color of anti-aliased pixels in diff output
    diffColor: [255, 0, 0], // color of different pixels in diff output
    diffColorAlt: null,     // whether to detect dark on light differences between img1 and img2 and set an alternative color to differentiate between the two
    diffMask: false         // draw the diff over a transparent background (a mask)
};

function pixelmatch(img1, img2, output, width, height, options) {

    if (!isPixelData(img1) || !isPixelData(img2) || (output && !isPixelData(output)))
        throw new Error('Image data: Uint8Array, Uint8ClampedArray or Buffer expected.');

    if (img1.length !== img2.length || (output && output.length !== img1.length))
        throw new Error('Image sizes do not match.');

    if (img1.length !== width * height * 4) throw new Error('Image data size does not match width/height.');

    options = Object.assign({}, defaultOptions, options);

    // check if images are identical
    const len = width * height;
    const a32 = new Uint32Array(img1.buffer, img1.byteOffset, len);
    const b32 = new Uint32Array(img2.buffer, img2.byteOffset, len);
    let identical = true;

    for (let i = 0; i < len; i++) {
        if (a32[i] !== b32[i]) { identical = false; break; }
    }
    if (identical) { // fast path if identical
        if (output && !options.diffMask) {
            for (let i = 0; i < len; i++) drawGrayPixel(img1, 4 * i, options.alpha, output);
        }
        return 0;
    }

    // maximum acceptable square distance between two colors;
    // 35215 is the maximum possible value for the YIQ difference metric
    const maxDelta = 35215 * options.threshold * options.threshold;
    let diff = 0;

    // compare each pixel of one image against the other one
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            const pos = (y * width + x) * 4;

            // squared YUV distance between colors at this pixel position, negative if the img2 pixel is darker
            const delta = colorDelta(img1, img2, pos, pos);

            // the color difference is above the threshold
            if (Math.abs(delta) > maxDelta) {
                // check it's a real rendering difference or just anti-aliasing
                if (!options.includeAA && (antialiased(img1, x, y, width, height, img2) ||
                                           antialiased(img2, x, y, width, height, img1))) {
                    // one of the pixels is anti-aliasing; draw as yellow and do not count as difference
                    // note that we do not include such pixels in a mask
                    if (output && !options.diffMask) drawPixel(output, pos, ...options.aaColor);

                } else {
                    // found substantial difference not caused by anti-aliasing; draw it as such
                    if (output) {
                        drawPixel(output, pos, ...(delta < 0 && options.diffColorAlt || options.diffColor));
                    }
                    diff++;
                }

            } else if (output) {
                // pixels are similar; draw background as grayscale image blended with white
                if (!options.diffMask) drawGrayPixel(img1, pos, options.alpha, output);
            }
        }
    }

    // return the number of different pixels
    return diff;
}

function isPixelData(arr) {
    // work around instanceof Uint8Array not working properly in some Jest environments
    return ArrayBuffer.isView(arr) && arr.constructor.BYTES_PER_ELEMENT === 1;
}

// check if a pixel is likely a part of anti-aliasing;
// based on "Anti-aliased Pixel and Intensity Slope Detector" paper by V. Vysniauskas, 2009

function antialiased(img, x1, y1, width, height, img2) {
    const x0 = Math.max(x1 - 1, 0);
    const y0 = Math.max(y1 - 1, 0);
    const x2 = Math.min(x1 + 1, width - 1);
    const y2 = Math.min(y1 + 1, height - 1);
    const pos = (y1 * width + x1) * 4;
    let zeroes = x1 === x0 || x1 === x2 || y1 === y0 || y1 === y2 ? 1 : 0;
    let min = 0;
    let max = 0;
    let minX, minY, maxX, maxY;

    // go through 8 adjacent pixels
    for (let x = x0; x <= x2; x++) {
        for (let y = y0; y <= y2; y++) {
            if (x === x1 && y === y1) continue;

            // brightness delta between the center pixel and adjacent one
            const delta = colorDelta(img, img, pos, (y * width + x) * 4, true);

            // count the number of equal, darker and brighter adjacent pixels
            if (delta === 0) {
                zeroes++;
                // if found more than 2 equal siblings, it's definitely not anti-aliasing
                if (zeroes > 2) return false;

            // remember the darkest pixel
            } else if (delta < min) {
                min = delta;
                minX = x;
                minY = y;

            // remember the brightest pixel
            } else if (delta > max) {
                max = delta;
                maxX = x;
                maxY = y;
            }
        }
    }

    // if there are no both darker and brighter pixels among siblings, it's not anti-aliasing
    if (min === 0 || max === 0) return false;

    // if either the darkest or the brightest pixel has 3+ equal siblings in both images
    // (definitely not anti-aliased), this pixel is anti-aliased
    return (hasManySiblings(img, minX, minY, width, height) && hasManySiblings(img2, minX, minY, width, height)) ||
           (hasManySiblings(img, maxX, maxY, width, height) && hasManySiblings(img2, maxX, maxY, width, height));
}

// check if a pixel has 3+ adjacent pixels of the same color.
function hasManySiblings(img, x1, y1, width, height) {
    const x0 = Math.max(x1 - 1, 0);
    const y0 = Math.max(y1 - 1, 0);
    const x2 = Math.min(x1 + 1, width - 1);
    const y2 = Math.min(y1 + 1, height - 1);
    const pos = (y1 * width + x1) * 4;
    let zeroes = x1 === x0 || x1 === x2 || y1 === y0 || y1 === y2 ? 1 : 0;

    // go through 8 adjacent pixels
    for (let x = x0; x <= x2; x++) {
        for (let y = y0; y <= y2; y++) {
            if (x === x1 && y === y1) continue;

            const pos2 = (y * width + x) * 4;
            if (img[pos] === img[pos2] &&
                img[pos + 1] === img[pos2 + 1] &&
                img[pos + 2] === img[pos2 + 2] &&
                img[pos + 3] === img[pos2 + 3]) zeroes++;

            if (zeroes > 2) return true;
        }
    }

    return false;
}

// calculate color difference according to the paper "Measuring perceived color difference
// using YIQ NTSC transmission color space in mobile applications" by Y. Kotsarenko and F. Ramos

function colorDelta(img1, img2, k, m, yOnly) {
    let r1 = img1[k + 0];
    let g1 = img1[k + 1];
    let b1 = img1[k + 2];
    let a1 = img1[k + 3];

    let r2 = img2[m + 0];
    let g2 = img2[m + 1];
    let b2 = img2[m + 2];
    let a2 = img2[m + 3];

    if (a1 === a2 && r1 === r2 && g1 === g2 && b1 === b2) return 0;

    if (a1 < 255) {
        a1 /= 255;
        r1 = blend(r1, a1);
        g1 = blend(g1, a1);
        b1 = blend(b1, a1);
    }

    if (a2 < 255) {
        a2 /= 255;
        r2 = blend(r2, a2);
        g2 = blend(g2, a2);
        b2 = blend(b2, a2);
    }

    const y1 = rgb2y(r1, g1, b1);
    const y2 = rgb2y(r2, g2, b2);
    const y = y1 - y2;

    if (yOnly) return y; // brightness difference only

    const i = rgb2i(r1, g1, b1) - rgb2i(r2, g2, b2);
    const q = rgb2q(r1, g1, b1) - rgb2q(r2, g2, b2);

    const delta = 0.5053 * y * y + 0.299 * i * i + 0.1957 * q * q;

    // encode whether the pixel lightens or darkens in the sign
    return y1 > y2 ? -delta : delta;
}

function rgb2y(r, g, b) { return r * 0.29889531 + g * 0.58662247 + b * 0.11448223; }
function rgb2i(r, g, b) { return r * 0.59597799 - g * 0.27417610 - b * 0.32180189; }
function rgb2q(r, g, b) { return r * 0.21147017 - g * 0.52261711 + b * 0.31114694; }

// blend semi-transparent color with white
function blend(c, a) {
    return 255 + (c - 255) * a;
}

function drawPixel(output, pos, r, g, b) {
    output[pos + 0] = r;
    output[pos + 1] = g;
    output[pos + 2] = b;
    output[pos + 3] = 255;
}

function drawGrayPixel(img, i, alpha, output) {
    const r = img[i + 0];
    const g = img[i + 1];
    const b = img[i + 2];
    const val = blend(rgb2y(r, g, b), alpha * img[i + 3] / 255);
    drawPixel(output, i, val, val, val);
}


/***/ }),

/***/ "../node_modules/resemblejs/compareImages.js":
/*!***************************************************!*\
  !*** ../node_modules/resemblejs/compareImages.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const resemble = __webpack_require__(/*! ./resemble */ "../node_modules/resemblejs/resemble.js");

module.exports = function compareImages(image1, image2, options) {
    return new Promise((resolve, reject) => {
        resemble.compare(image1, image2, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};


/***/ }),

/***/ "../node_modules/resemblejs/node_modules/canvas/browser.js":
/*!*****************************************************************!*\
  !*** ../node_modules/resemblejs/node_modules/canvas/browser.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* globals document, ImageData */

const parseFont = __webpack_require__(/*! ./lib/parse-font */ "../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js")

exports.parseFont = parseFont

exports.createCanvas = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width: width, height: height })
}

exports.createImageData = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
}

exports.loadImage = function (src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement('img'), options)

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = function () { cleanup(); resolve(image) }
    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image "' + src + '"')) }

    image.src = src
  })
}


/***/ }),

/***/ "../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js":
/*!************************************************************************!*\
  !*** ../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
const styles = 'italic|oblique'
const variants = 'small-caps'
const stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
const units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
const string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+'

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp(`(${weights}) +`, 'i')
const styleRe = new RegExp(`(${styles}) +`, 'i')
const variantRe = new RegExp(`(${variants}) +`, 'i')
const stretchRe = new RegExp(`(${stretches}) +`, 'i')
const sizeFamilyRe = new RegExp(
  `([\\d\\.]+)(${units}) *((?:${string})( *, *(?:${string}))*)`)

/**
 * Cache font parsing.
 */

const cache = {}

const defaultHeight = 16 // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = str => {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str)
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  }

  // Optional, unordered properties.
  let weight, style, variant, stretch
  // Stop search at `sizeFamily.index`
  const substr = str.substring(0, sizeFamily.index)
  if ((weight = weightRe.exec(substr))) font.weight = weight[1]
  if ((style = styleRe.exec(substr))) font.style = style[1]
  if ((variant = variantRe.exec(substr))) font.variant = variant[1]
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75
      break
    case 'pc':
      font.size *= 16
      break
    case 'in':
      font.size *= 96
      break
    case 'cm':
      font.size *= 96.0 / 2.54
      break
    case 'mm':
      font.size *= 96.0 / 25.4
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75
      break
    case 'q':
      font.size *= 96 / 25.4 / 4
      break
  }

  return (cache[str] = font)
}


/***/ }),

/***/ "../node_modules/resemblejs/resemble.js":
/*!**********************************************!*\
  !*** ../node_modules/resemblejs/resemble.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
James Cryer / Huddle
URL: https://github.com/Huddle/Resemble.js
*/

var naiveFallback = function () {
    // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
    if (typeof self === "object" && self) {
        return self;
    }
    if (typeof window === "object" && window) {
        return window;
    }
    throw new Error("Unable to resolve global `this`");
};

var getGlobalThis = function () {
    // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
    // Fallback to standard globalThis if available
    if (typeof globalThis === "object" && globalThis) {
        return globalThis;
    }

    try {
        Object.defineProperty(Object.prototype, "__global__", {
            get: function () {
                return this;
            },
            configurable: true
        });
    } catch (error) {
        return naiveFallback();
    }
    try {
        // eslint-disable-next-line no-undef
        if (!__global__) {
            return naiveFallback();
        }
        return __global__; // eslint-disable-line no-undef
    } finally {
        delete Object.prototype.__global__;
    }
};

var isNode = function () {
    const globalPolyfill = getGlobalThis();
    return typeof globalPolyfill.process !== "undefined" && globalPolyfill.process.versions && globalPolyfill.process.versions.node;
};

(function (root, factory) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this /* eslint-disable-line no-invalid-this*/, function () {
    "use strict";

    var Img;
    var Canvas;
    var loadNodeCanvasImage;

    if (isNode()) {
        Canvas = __webpack_require__(/*! canvas */ "../node_modules/resemblejs/node_modules/canvas/browser.js"); // eslint-disable-line global-require
        Img = Canvas.Image;
        loadNodeCanvasImage = Canvas.loadImage;
    } else {
        Img = Image;
    }

    function createCanvas(width, height) {
        if (isNode()) {
            return Canvas.createCanvas(width, height);
        }

        var cnvs = document.createElement("canvas");
        cnvs.width = width;
        cnvs.height = height;
        return cnvs;
    }

    var oldGlobalSettings = {};
    var globalOutputSettings = oldGlobalSettings;

    var resemble = function (fileData) {
        var pixelTransparency = 1;

        var errorPixelColor = {
            // Color for Error Pixels. Between 0 and 255.
            red: 255,
            green: 0,
            blue: 255,
            alpha: 255
        };

        var targetPix = { r: 0, g: 0, b: 0, a: 0 }; // isAntialiased

        var errorPixelTransform = {
            flat: function (px, offset) {
                px[offset] = errorPixelColor.red;
                px[offset + 1] = errorPixelColor.green;
                px[offset + 2] = errorPixelColor.blue;
                px[offset + 3] = errorPixelColor.alpha;
            },
            movement: function (px, offset, d1, d2) {
                px[offset] = (d2.r * (errorPixelColor.red / 255) + errorPixelColor.red) / 2;
                px[offset + 1] = (d2.g * (errorPixelColor.green / 255) + errorPixelColor.green) / 2;
                px[offset + 2] = (d2.b * (errorPixelColor.blue / 255) + errorPixelColor.blue) / 2;
                px[offset + 3] = d2.a;
            },
            flatDifferenceIntensity: function (px, offset, d1, d2) {
                px[offset] = errorPixelColor.red;
                px[offset + 1] = errorPixelColor.green;
                px[offset + 2] = errorPixelColor.blue;
                px[offset + 3] = colorsDistance(d1, d2);
            },
            movementDifferenceIntensity: function (px, offset, d1, d2) {
                var ratio = (colorsDistance(d1, d2) / 255) * 0.8;

                px[offset] = (1 - ratio) * (d2.r * (errorPixelColor.red / 255)) + ratio * errorPixelColor.red;
                px[offset + 1] = (1 - ratio) * (d2.g * (errorPixelColor.green / 255)) + ratio * errorPixelColor.green;
                px[offset + 2] = (1 - ratio) * (d2.b * (errorPixelColor.blue / 255)) + ratio * errorPixelColor.blue;
                px[offset + 3] = d2.a;
            },
            diffOnly: function (px, offset, d1, d2) {
                px[offset] = d2.r;
                px[offset + 1] = d2.g;
                px[offset + 2] = d2.b;
                px[offset + 3] = d2.a;
            }
        };

        var errorPixel = errorPixelTransform.flat;
        var errorType;
        var boundingBoxes;
        var ignoredBoxes;
        var ignoreAreasColoredWith;
        var largeImageThreshold = 1200;
        var useCrossOrigin = true;
        var data = {};
        var images = [];
        var updateCallbackArray = [];

        var tolerance = {
            // between 0 and 255
            red: 16,
            green: 16,
            blue: 16,
            alpha: 16,
            minBrightness: 16,
            maxBrightness: 240
        };

        var ignoreAntialiasing = false;
        var ignoreColors = false;
        var scaleToSameSize = false;
        var compareOnly = false;
        var returnEarlyThreshold;

        function colorsDistance(c1, c2) {
            return (Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b)) / 3;
        }

        function withinBoundingBox(x, y, width, height, box) {
            return x > (box.left || 0) && x < (box.right || width) && y > (box.top || 0) && y < (box.bottom || height);
        }

        function withinComparedArea(x, y, width, height, pixel2) {
            var isIncluded = true;
            var i;
            var boundingBox;
            var ignoredBox;
            var selected;
            var ignored;

            if (boundingBoxes instanceof Array) {
                selected = false;
                for (i = 0; i < boundingBoxes.length; i++) {
                    boundingBox = boundingBoxes[i];
                    if (withinBoundingBox(x, y, width, height, boundingBox)) {
                        selected = true;
                        break;
                    }
                }
            }
            if (ignoredBoxes instanceof Array) {
                ignored = true;
                for (i = 0; i < ignoredBoxes.length; i++) {
                    ignoredBox = ignoredBoxes[i];
                    if (withinBoundingBox(x, y, width, height, ignoredBox)) {
                        ignored = false;
                        break;
                    }
                }
            }

            if (ignoreAreasColoredWith) {
                return colorsDistance(pixel2, ignoreAreasColoredWith) !== 0;
            }

            if (selected === undefined && ignored === undefined) {
                return true;
            }
            if (selected === false && ignored === true) {
                return false;
            }
            if (selected === true || ignored === true) {
                isIncluded = true;
            }
            if (selected === false || ignored === false) {
                isIncluded = false;
            }
            return isIncluded;
        }

        function triggerDataUpdate() {
            var len = updateCallbackArray.length;
            var i;
            for (i = 0; i < len; i++) {
                if (typeof updateCallbackArray[i] === "function") {
                    updateCallbackArray[i](data);
                }
            }
        }

        function loop(w, h, callback) {
            var x;
            var y;

            for (x = 0; x < w; x++) {
                for (y = 0; y < h; y++) {
                    callback(x, y);
                }
            }
        }

        function parseImage(sourceImageData, width, height) {
            var pixelCount = 0;
            var redTotal = 0;
            var greenTotal = 0;
            var blueTotal = 0;
            var alphaTotal = 0;
            var brightnessTotal = 0;
            var whiteTotal = 0;
            var blackTotal = 0;

            loop(width, height, function (horizontalPos, verticalPos) {
                var offset = (verticalPos * width + horizontalPos) * 4;
                var red = sourceImageData[offset];
                var green = sourceImageData[offset + 1];
                var blue = sourceImageData[offset + 2];
                var alpha = sourceImageData[offset + 3];
                var brightness = getBrightness(red, green, blue);

                if (red === green && red === blue && alpha) {
                    if (red === 0) {
                        blackTotal++;
                    } else if (red === 255) {
                        whiteTotal++;
                    }
                }

                pixelCount++;

                redTotal += (red / 255) * 100;
                greenTotal += (green / 255) * 100;
                blueTotal += (blue / 255) * 100;
                alphaTotal += ((255 - alpha) / 255) * 100;
                brightnessTotal += (brightness / 255) * 100;
            });

            data.red = Math.floor(redTotal / pixelCount);
            data.green = Math.floor(greenTotal / pixelCount);
            data.blue = Math.floor(blueTotal / pixelCount);
            data.alpha = Math.floor(alphaTotal / pixelCount);
            data.brightness = Math.floor(brightnessTotal / pixelCount);
            data.white = Math.floor((whiteTotal / pixelCount) * 100);
            data.black = Math.floor((blackTotal / pixelCount) * 100);

            triggerDataUpdate();
        }

        function onLoadImage(hiddenImage, callback) {
            // don't assign to hiddenImage, see https://github.com/Huddle/Resemble.js/pull/87/commits/300d43352a2845aad289b254bfbdc7cd6a37e2d7
            var width = hiddenImage.width;
            var height = hiddenImage.height;

            if (scaleToSameSize && images.length === 1) {
                width = images[0].width;
                height = images[0].height;
            }

            var hiddenCanvas = createCanvas(width, height);
            var imageData;

            hiddenCanvas.getContext("2d").drawImage(hiddenImage, 0, 0, width, height);
            imageData = hiddenCanvas.getContext("2d").getImageData(0, 0, width, height);

            images.push(imageData);

            callback(imageData, width, height);
        }

        function loadImageData(fileDataForImage, callback) {
            var fileReader;
            var hiddenImage = new Img();

            if (!hiddenImage.setAttribute) {
                hiddenImage.setAttribute = function setAttribute() {};
            }

            if (useCrossOrigin) {
                hiddenImage.setAttribute("crossorigin", "anonymous");
            }

            hiddenImage.onerror = function (event) {
                hiddenImage.onload = null;
                hiddenImage.onerror = null; // fixes pollution between calls
                const error = event ? event + "" : "Unknown error";
                images.push({ error: `Failed to load image '${fileDataForImage}'. ${error}` });
                callback();
            };

            hiddenImage.onload = function () {
                hiddenImage.onload = null; // fixes pollution between calls
                hiddenImage.onerror = null;
                onLoadImage(hiddenImage, callback);
            };

            if (typeof fileDataForImage === "string") {
                hiddenImage.src = fileDataForImage;
                if (!isNode() && hiddenImage.complete && hiddenImage.naturalWidth > 0) {
                    hiddenImage.onload();
                }
            } else if (
                typeof fileDataForImage.data !== "undefined" &&
                typeof fileDataForImage.width === "number" &&
                typeof fileDataForImage.height === "number"
            ) {
                images.push(fileDataForImage);

                callback(fileDataForImage, fileDataForImage.width, fileDataForImage.height);
            } else if (typeof Buffer !== "undefined" && fileDataForImage instanceof Buffer) {
                // If we have Buffer, assume we're on Node+Canvas and its supported
                // hiddenImage.src = fileDataForImage;

                loadNodeCanvasImage(fileDataForImage)
                    .then(function (image) {
                        hiddenImage.onload = null; // fixes pollution between calls
                        hiddenImage.onerror = null;
                        onLoadImage(image, callback);
                    })
                    .catch(function (err) {
                        images.push({
                            error: err ? err + "" : "Image load error."
                        });
                        callback();
                    });
            } else {
                fileReader = new FileReader();
                fileReader.onload = function (event) {
                    hiddenImage.src = event.target.result;
                };
                fileReader.readAsDataURL(fileDataForImage);
            }
        }

        function isColorSimilar(a, b, color) {
            var absDiff = Math.abs(a - b);

            if (typeof a === "undefined") {
                return false;
            }
            if (typeof b === "undefined") {
                return false;
            }

            if (a === b) {
                return true;
            } else if (absDiff < tolerance[color]) {
                return true;
            }
            return false;
        }

        function isPixelBrightnessSimilar(d1, d2) {
            var alpha = isColorSimilar(d1.a, d2.a, "alpha");
            var brightness = isColorSimilar(d1.brightness, d2.brightness, "minBrightness");
            return brightness && alpha;
        }

        function getBrightness(r, g, b) {
            return 0.3 * r + 0.59 * g + 0.11 * b;
        }

        function isRGBSame(d1, d2) {
            var red = d1.r === d2.r;
            var green = d1.g === d2.g;
            var blue = d1.b === d2.b;
            return red && green && blue;
        }

        function isRGBSimilar(d1, d2) {
            var red = isColorSimilar(d1.r, d2.r, "red");
            var green = isColorSimilar(d1.g, d2.g, "green");
            var blue = isColorSimilar(d1.b, d2.b, "blue");
            var alpha = isColorSimilar(d1.a, d2.a, "alpha");

            return red && green && blue && alpha;
        }

        function isContrasting(d1, d2) {
            return Math.abs(d1.brightness - d2.brightness) > tolerance.maxBrightness;
        }

        function getHue(red, green, blue) {
            var r = red / 255;
            var g = green / 255;
            var b = blue / 255;
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var h;
            var d;

            if (max === min) {
                h = 0; // achromatic
            } else {
                d = max - min;
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                    default:
                        h /= 6;
                }
            }

            return h;
        }

        function isAntialiased(sourcePix, pix, cacheSet, verticalPos, horizontalPos, width) {
            var offset;
            var distance = 1;
            var i;
            var j;
            var hasHighContrastSibling = 0;
            var hasSiblingWithDifferentHue = 0;
            var hasEquivalentSibling = 0;

            addHueInfo(sourcePix);

            for (i = distance * -1; i <= distance; i++) {
                for (j = distance * -1; j <= distance; j++) {
                    if (i === 0 && j === 0) {
                        // ignore source pixel
                    } else {
                        offset = ((verticalPos + j) * width + (horizontalPos + i)) * 4;

                        if (!getPixelInfo(targetPix, pix, offset, cacheSet)) {
                            continue;
                        }

                        addBrightnessInfo(targetPix);
                        addHueInfo(targetPix);

                        if (isContrasting(sourcePix, targetPix)) {
                            hasHighContrastSibling++;
                        }

                        if (isRGBSame(sourcePix, targetPix)) {
                            hasEquivalentSibling++;
                        }

                        if (Math.abs(targetPix.h - sourcePix.h) > 0.3) {
                            hasSiblingWithDifferentHue++;
                        }

                        if (hasSiblingWithDifferentHue > 1 || hasHighContrastSibling > 1) {
                            return true;
                        }
                    }
                }
            }

            if (hasEquivalentSibling < 2) {
                return true;
            }

            return false;
        }

        function copyPixel(px, offset, pix) {
            if (errorType === "diffOnly") {
                return;
            }

            px[offset] = pix.r; // r
            px[offset + 1] = pix.g; // g
            px[offset + 2] = pix.b; // b
            px[offset + 3] = pix.a * pixelTransparency; // a
        }

        function copyGrayScalePixel(px, offset, pix) {
            if (errorType === "diffOnly") {
                return;
            }

            px[offset] = pix.brightness; // r
            px[offset + 1] = pix.brightness; // g
            px[offset + 2] = pix.brightness; // b
            px[offset + 3] = pix.a * pixelTransparency; // a
        }

        function getPixelInfo(dst, pix, offset) {
            if (pix.length > offset) {
                dst.r = pix[offset];
                dst.g = pix[offset + 1];
                dst.b = pix[offset + 2];
                dst.a = pix[offset + 3];

                return true;
            }

            return false;
        }

        function addBrightnessInfo(pix) {
            pix.brightness = getBrightness(pix.r, pix.g, pix.b); // 'corrected' lightness
        }

        function addHueInfo(pix) {
            pix.h = getHue(pix.r, pix.g, pix.b);
        }

        function analyseImages(img1, img2, width, height) {
            var data1 = img1.data;
            var data2 = img2.data;
            var hiddenCanvas;
            var context;
            var imgd;
            var pix;

            if (!compareOnly) {
                hiddenCanvas = createCanvas(width, height);

                context = hiddenCanvas.getContext("2d");
                imgd = context.createImageData(width, height);
                pix = imgd.data;
            }

            var mismatchCount = 0;
            var diffBounds = {
                top: height,
                left: width,
                bottom: 0,
                right: 0
            };
            var updateBounds = function (x, y) {
                diffBounds.left = Math.min(x, diffBounds.left);
                diffBounds.right = Math.max(x, diffBounds.right);
                diffBounds.top = Math.min(y, diffBounds.top);
                diffBounds.bottom = Math.max(y, diffBounds.bottom);
            };

            var time = Date.now();

            var skip;

            if (!!largeImageThreshold && ignoreAntialiasing && (width > largeImageThreshold || height > largeImageThreshold)) {
                skip = 6;
            }

            var pixel1 = { r: 0, g: 0, b: 0, a: 0 };
            var pixel2 = { r: 0, g: 0, b: 0, a: 0 };

            var skipTheRest = false;

            loop(width, height, function (horizontalPos, verticalPos) {
                if (skipTheRest) {
                    return;
                }

                if (skip) {
                    // only skip if the image isn't small
                    if (verticalPos % skip === 0 || horizontalPos % skip === 0) {
                        return;
                    }
                }

                var offset = (verticalPos * width + horizontalPos) * 4;
                if (!getPixelInfo(pixel1, data1, offset, 1) || !getPixelInfo(pixel2, data2, offset, 2)) {
                    return;
                }

                var isWithinComparedArea = withinComparedArea(horizontalPos, verticalPos, width, height, pixel2);

                if (ignoreColors) {
                    addBrightnessInfo(pixel1);
                    addBrightnessInfo(pixel2);

                    if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                        if (!compareOnly) {
                            copyGrayScalePixel(pix, offset, pixel2);
                        }
                    } else {
                        if (!compareOnly) {
                            errorPixel(pix, offset, pixel1, pixel2);
                        }

                        mismatchCount++;
                        updateBounds(horizontalPos, verticalPos);
                    }
                    return;
                }

                if (isRGBSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                    if (!compareOnly) {
                        copyPixel(pix, offset, pixel1);
                    }
                } else if (
                    ignoreAntialiasing &&
                    (addBrightnessInfo(pixel1), // jit pixel info augmentation looks a little weird, sorry.
                    addBrightnessInfo(pixel2),
                    isAntialiased(pixel1, data1, 1, verticalPos, horizontalPos, width) || isAntialiased(pixel2, data2, 2, verticalPos, horizontalPos, width))
                ) {
                    if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                        if (!compareOnly) {
                            copyGrayScalePixel(pix, offset, pixel2);
                        }
                    } else {
                        if (!compareOnly) {
                            errorPixel(pix, offset, pixel1, pixel2);
                        }

                        mismatchCount++;
                        updateBounds(horizontalPos, verticalPos);
                    }
                } else {
                    if (!compareOnly) {
                        errorPixel(pix, offset, pixel1, pixel2);
                    }

                    mismatchCount++;
                    updateBounds(horizontalPos, verticalPos);
                }

                if (compareOnly) {
                    var currentMisMatchPercent = (mismatchCount / (height * width)) * 100;

                    if (currentMisMatchPercent > returnEarlyThreshold) {
                        skipTheRest = true;
                    }
                }
            });

            data.rawMisMatchPercentage = (mismatchCount / (height * width)) * 100;
            data.misMatchPercentage = data.rawMisMatchPercentage.toFixed(2);
            data.diffBounds = diffBounds;
            data.analysisTime = Date.now() - time;

            data.getImageDataUrl = function (text) {
                if (compareOnly) {
                    throw Error("No diff image available - ran in compareOnly mode");
                }

                var barHeight = 0;

                if (text) {
                    barHeight = addLabel(text, context, hiddenCanvas);
                }

                context.putImageData(imgd, 0, barHeight);

                return hiddenCanvas.toDataURL("image/png");
            };

            if (!compareOnly && hiddenCanvas.toBuffer) {
                data.getBuffer = function (includeOriginal) {
                    if (includeOriginal) {
                        var imageWidth = hiddenCanvas.width + 2;
                        hiddenCanvas.width = imageWidth * 3;
                        context.putImageData(img1, 0, 0);
                        context.putImageData(img2, imageWidth, 0);
                        context.putImageData(imgd, imageWidth * 2, 0);
                    } else {
                        context.putImageData(imgd, 0, 0);
                    }
                    return hiddenCanvas.toBuffer();
                };
            }
        }

        function addLabel(text, context, hiddenCanvas) {
            var textPadding = 2;

            context.font = "12px sans-serif";

            var textWidth = context.measureText(text).width + textPadding * 2;
            var barHeight = 22;

            if (textWidth > hiddenCanvas.width) {
                hiddenCanvas.width = textWidth;
            }

            hiddenCanvas.height += barHeight;

            context.fillStyle = "#666";
            context.fillRect(0, 0, hiddenCanvas.width, barHeight - 4);
            context.fillStyle = "#fff";
            context.fillRect(0, barHeight - 4, hiddenCanvas.width, 4);

            context.fillStyle = "#fff";
            context.textBaseline = "top";
            context.font = "12px sans-serif";
            context.fillText(text, textPadding, 1);

            return barHeight;
        }

        function normalise(img, w, h) {
            var c;
            var context;

            if (img.height < h || img.width < w) {
                c = createCanvas(w, h);
                context = c.getContext("2d");
                context.putImageData(img, 0, 0);
                return context.getImageData(0, 0, w, h);
            }

            return img;
        }

        function outputSettings(options) {
            var key;

            if (options.errorColor) {
                for (key in options.errorColor) {
                    if (options.errorColor.hasOwnProperty(key)) {
                        errorPixelColor[key] = options.errorColor[key] === void 0 ? errorPixelColor[key] : options.errorColor[key];
                    }
                }
            }

            if (options.errorType && errorPixelTransform[options.errorType]) {
                errorPixel = errorPixelTransform[options.errorType];
                errorType = options.errorType;
            }

            if (options.errorPixel && typeof options.errorPixel === "function") {
                errorPixel = options.errorPixel;
            }

            pixelTransparency = isNaN(Number(options.transparency)) ? pixelTransparency : options.transparency;

            if (options.largeImageThreshold !== undefined) {
                largeImageThreshold = options.largeImageThreshold;
            }

            if (options.useCrossOrigin !== undefined) {
                useCrossOrigin = options.useCrossOrigin;
            }

            if (options.boundingBox !== undefined) {
                boundingBoxes = [options.boundingBox];
            }

            if (options.ignoredBox !== undefined) {
                ignoredBoxes = [options.ignoredBox];
            }

            if (options.boundingBoxes !== undefined) {
                boundingBoxes = options.boundingBoxes;
            }

            if (options.ignoredBoxes !== undefined) {
                ignoredBoxes = options.ignoredBoxes;
            }

            if (options.ignoreAreasColoredWith !== undefined) {
                ignoreAreasColoredWith = options.ignoreAreasColoredWith;
            }
        }

        function compare(one, two) {
            if (globalOutputSettings !== oldGlobalSettings) {
                outputSettings(globalOutputSettings);
            }

            function onceWeHaveBoth() {
                var width;
                var height;
                if (images.length === 2) {
                    if (images[0].error || images[1].error) {
                        data = {};
                        data.error = images[0].error ? images[0].error : images[1].error;
                        triggerDataUpdate();
                        return;
                    }
                    width = images[0].width > images[1].width ? images[0].width : images[1].width;
                    height = images[0].height > images[1].height ? images[0].height : images[1].height;

                    if (images[0].width === images[1].width && images[0].height === images[1].height) {
                        data.isSameDimensions = true;
                    } else {
                        data.isSameDimensions = false;
                    }

                    data.dimensionDifference = {
                        width: images[0].width - images[1].width,
                        height: images[0].height - images[1].height
                    };

                    analyseImages(normalise(images[0], width, height), normalise(images[1], width, height), width, height);

                    triggerDataUpdate();
                }
            }

            images = [];
            loadImageData(one, onceWeHaveBoth);
            loadImageData(two, onceWeHaveBoth);
        }

        function getCompareApi(param) {
            var secondFileData;
            var hasMethod = typeof param === "function";

            if (!hasMethod) {
                // assume it's file data
                secondFileData = param;
            }

            var self = {
                setReturnEarlyThreshold: function (threshold) {
                    if (threshold) {
                        compareOnly = true;
                        returnEarlyThreshold = threshold;
                    }
                    return self;
                },
                scaleToSameSize: function () {
                    scaleToSameSize = true;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                useOriginalSize: function () {
                    scaleToSameSize = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreNothing: function () {
                    tolerance.red = 0;
                    tolerance.green = 0;
                    tolerance.blue = 0;
                    tolerance.alpha = 0;
                    tolerance.minBrightness = 0;
                    tolerance.maxBrightness = 255;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreLess: function () {
                    tolerance.red = 16;
                    tolerance.green = 16;
                    tolerance.blue = 16;
                    tolerance.alpha = 16;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreAntialiasing: function () {
                    tolerance.red = 32;
                    tolerance.green = 32;
                    tolerance.blue = 32;
                    tolerance.alpha = 32;
                    tolerance.minBrightness = 64;
                    tolerance.maxBrightness = 96;

                    ignoreAntialiasing = true;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreColors: function () {
                    tolerance.alpha = 16;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = true;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreAlpha: function () {
                    tolerance.red = 16;
                    tolerance.green = 16;
                    tolerance.blue = 16;
                    tolerance.alpha = 255;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                repaint: function () {
                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                outputSettings: function (options) {
                    outputSettings(options);
                    return self;
                },
                onComplete: function (callback) {
                    updateCallbackArray.push(callback);

                    var wrapper = function () {
                        compare(fileData, secondFileData);
                    };

                    wrapper();

                    return getCompareApi(wrapper);
                },
                setupCustomTolerance: function (customSettings) {
                    for (var property in tolerance) {
                        if (!customSettings.hasOwnProperty(property)) {
                            continue;
                        }

                        tolerance[property] = customSettings[property];
                    }
                }
            };

            return self;
        }

        var rootSelf = {
            onComplete: function (callback) {
                updateCallbackArray.push(callback);
                loadImageData(fileData, function (imageData, width, height) {
                    parseImage(imageData.data, width, height);
                });
            },
            compareTo: function (secondFileData) {
                return getCompareApi(secondFileData);
            },
            outputSettings: function (options) {
                outputSettings(options);
                return rootSelf;
            }
        };

        return rootSelf;
    };

    function setGlobalOutputSettings(settings) {
        globalOutputSettings = settings;
        return resemble;
    }

    function applyIgnore(api, ignore, customTolerance) {
        switch (ignore) {
            case "nothing":
                api.ignoreNothing();
                break;
            case "less":
                api.ignoreLess();
                break;
            case "antialiasing":
                api.ignoreAntialiasing();
                break;
            case "colors":
                api.ignoreColors();
                break;
            case "alpha":
                api.ignoreAlpha();
                break;
            default:
                throw new Error("Invalid ignore: " + ignore);
        }

        api.setupCustomTolerance(customTolerance);
    }

    resemble.compare = function (image1, image2, options, cb) {
        var callback;
        var opt;

        if (typeof options === "function") {
            callback = options;
            opt = {};
        } else {
            callback = cb;
            opt = options || {};
        }

        var res = resemble(image1);
        var compare;

        if (opt.output) {
            res.outputSettings(opt.output);
        }

        compare = res.compareTo(image2);

        if (opt.returnEarlyThreshold) {
            compare.setReturnEarlyThreshold(opt.returnEarlyThreshold);
        }

        if (opt.scaleToSameSize) {
            compare.scaleToSameSize();
        }

        var toleranceSettings = opt.tolerance || {};
        if (typeof opt.ignore === "string") {
            applyIgnore(compare, opt.ignore, toleranceSettings);
        } else if (opt.ignore && opt.ignore.forEach) {
            opt.ignore.forEach(function (v) {
                applyIgnore(compare, v, toleranceSettings);
            });
        }

        compare.onComplete(function (data) {
            if (data.error) {
                callback(data.error);
            } else {
                callback(null, data);
            }
        });
    };

    resemble.outputSettings = setGlobalOutputSettings;
    return resemble;
});


/***/ }),

/***/ "./scripts/modeluireader.ts":
/*!**********************************!*\
  !*** ./scripts/modeluireader.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalUIReader": () => (/* binding */ ModalUIReader)
/* harmony export */ });
/* harmony import */ var _alt1_base_dist_imagedetect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base/dist/imagedetect */ "../node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @alt1/ocr */ "../node_modules/@alt1/ocr/dist/index.js");



var capsfont = __webpack_require__(/*! @alt1/ocr/fonts/aa_9px_mono_allcaps.js */ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js");
let imgs = (0,_alt1_base_dist_imagedetect__WEBPACK_IMPORTED_MODULE_0__.webpackImages)({
    exitbutton: __webpack_require__(/*! ../images/eocx.data.png */ "./images/eocx.data.png"),
    exitbutton_leg: __webpack_require__(/*! ../images/legacyx.data.png */ "./images/legacyx.data.png"),
    topleft: __webpack_require__(/*! ../images/eoctopleft.data.png */ "./images/eoctopleft.data.png"),
    topleft_leg: __webpack_require__(/*! ../images/legacytopleft.data.png */ "./images/legacytopleft.data.png"),
    botleft: __webpack_require__(/*! ../images/eocbotleft.data.png */ "./images/eocbotleft.data.png"),
    botleft_leg: __webpack_require__(/*! ../images/legacybotleft.data.png */ "./images/legacybotleft.data.png"),
});
var ModalUIReader;
(function (ModalUIReader) {
    function find(img) {
        if (!img) {
            img = (0,_alt1_base__WEBPACK_IMPORTED_MODULE_1__.captureHoldFullRs)();
        }
        let treoc = img.findSubimage(imgs.exitbutton);
        let trleg = img.findSubimage(imgs.exitbutton_leg);
        let eocboxes = treoc.map(p => detectEoc(img, p));
        let legacyboxes = trleg.map(p => detectLegacy(img, p));
        return [...eocboxes, ...legacyboxes].filter(m => m);
    }
    ModalUIReader.find = find;
    function detectEoc(img, pos) {
        let left = img.findSubimage(imgs.topleft, img.x, pos.y - 5, pos.x, imgs.topleft.height).sort((a, b) => a.x - b.x)[0];
        if (!left) {
            return null;
        }
        let bot = img.findSubimage(imgs.botleft, left.x, pos.y, imgs.botleft.width, img.y + img.height - pos.y).sort((a, b) => a.y - b.y)[0];
        if (!bot) {
            return null;
        }
        let buf = img.toData(left.x, pos.y, 250, 20);
        let title = _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__.readSmallCapsBackwards(buf, capsfont, [[255, 203, 5]], 0, 13, buf.width, 1);
        return {
            rect: new _alt1_base__WEBPACK_IMPORTED_MODULE_1__.Rect(left.x + 4, pos.y + 24, (pos.x + 21) - (left.x + 4), (bot.y + 8) - (pos.y + 24)),
            legacy: false,
            title: title ? title.text.toLowerCase() : "",
            img: img
        };
    }
    ModalUIReader.detectEoc = detectEoc;
    function detectLegacy(img, pos) {
        let left = img.findSubimage(imgs.topleft_leg, img.x, pos.y - 9, pos.x, imgs.topleft_leg.height).sort((a, b) => a.x - b.x)[0];
        if (!left) {
            return null;
        }
        let bot = img.findSubimage(imgs.botleft_leg, left.x - 2, pos.y, imgs.botleft_leg.width, img.y + img.height - pos.y).sort((a, b) => a.y - b.y)[0];
        if (!bot) {
            return null;
        }
        let buf = img.toData(Math.round(left.x + pos.x - 250) / 2, pos.y - 4, 250, 20);
        let title = _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__.readSmallCapsBackwards(buf, capsfont, [[255, 152, 31]], 0, 13, buf.width, 1);
        return {
            rect: new _alt1_base__WEBPACK_IMPORTED_MODULE_1__.Rect(left.x + 4, pos.y + 20, (pos.x + 20) - (left.x + 4), (bot.y) - (pos.y + 20)),
            legacy: true,
            title: title ? title.text.toLowerCase() : "",
            img: img
        };
    }
    ModalUIReader.detectLegacy = detectLegacy;
})(ModalUIReader || (ModalUIReader = {}));


/***/ }),

/***/ "./scripts/rewardreader.ts":
/*!*********************************!*\
  !*** ./scripts/rewardreader.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClueRewardReader)
/* harmony export */ });
/* harmony import */ var _alt1_ocr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/ocr */ "../node_modules/@alt1/ocr/dist/index.js");

var font = __webpack_require__(/*! @alt1/ocr/fonts/aa_9px_mono_allcaps.js */ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js");
class ClueRewardReader {
    constructor() {
        this.pos = null;
    }
    read(img) {
        if (!this.pos) {
            throw new Error("ui not found yet");
            ;
        }
        var buf = img.toData(this.pos.rect.x, this.pos.rect.y, this.pos.rect.width, this.pos.rect.height);
        var hash = 0;
        const xcomp = 20 - 28;
        const ycomp = -19 - 13;
        for (var y = 50 + ycomp; y < 85 + ycomp; y++) {
            for (var x = 25 + xcomp; x < 375 + xcomp; x++) {
                if (this.pos.legacy && buf.getColorDifference(x, y, 62, 53, 40) < 10) {
                    continue;
                }
                if (!this.pos.legacy && buf.getColorDifference(x, y, 10, 31, 41) < 10) {
                    continue;
                }
                hash = (((hash << 5) - hash) + buf.getPixelInt(x, y)) | 0;
            }
        }
        // These tweaks allow for this to read Barrows clue windows.
        let xtweak = 0;
        let ytweak = 125;
        var str = _alt1_ocr__WEBPACK_IMPORTED_MODULE_0__.findReadLine(buf, font, [[255, 255, 255]], 134 + xcomp + xtweak, 113 + ycomp + ytweak);
        // alt1.overLayText("value", a1lib.mixColor(255,255,255), 12, this.pos.rect.x + 134 + xcomp + xtweak, this.pos.rect.y + 113 + ycomp + ytweak, 1000)
        if (!str.text) {
            console.log("Str is not txt");
            return null;
        }
        var text = str.text.toLowerCase();
        var m = text.match(/(value|atual)[: ]+([\d,\.]+)\b/);
        if (!m) {
            console.log("m is a no go");
            return null;
        }
        var value = +m[2].replace(/[,\.]/g, "");
        return { hash, value, text };
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autoDisableCheckAuto": () => (/* binding */ autoDisableCheckAuto),
/* harmony export */   "capture": () => (/* binding */ capture),
/* harmony export */   "cleardb": () => (/* binding */ cleardb),
/* harmony export */   "exporttocsv": () => (/* binding */ exporttocsv),
/* harmony export */   "fetchFromGE": () => (/* binding */ fetchFromGE),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "initOnLoad": () => (/* binding */ initOnLoad),
/* harmony export */   "insertInitEx": () => (/* binding */ insertInitEx),
/* harmony export */   "insertToDB": () => (/* binding */ insertToDB),
/* harmony export */   "rollbackNo": () => (/* binding */ rollbackNo),
/* harmony export */   "rollbackVeri": () => (/* binding */ rollbackVeri),
/* harmony export */   "rollbackYes": () => (/* binding */ rollbackYes),
/* harmony export */   "saveSettings": () => (/* binding */ saveSettings),
/* harmony export */   "settingsInit": () => (/* binding */ settingsInit),
/* harmony export */   "toggleCapture": () => (/* binding */ toggleCapture),
/* harmony export */   "toggleLootDisplay": () => (/* binding */ toggleLootDisplay),
/* harmony export */   "verifyInsert": () => (/* binding */ verifyInsert)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resemblejs/compareImages */ "../node_modules/resemblejs/compareImages.js");
/* harmony import */ var resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pixelmatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pixelmatch */ "../node_modules/pixelmatch/index.js");
/* harmony import */ var pixelmatch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pixelmatch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/rewardreader */ "./scripts/rewardreader.ts");
/* harmony import */ var _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/modeluireader */ "./scripts/modeluireader.ts");
/* harmony import */ var _JSONs_LocalStorageBarrowsInit_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./JSONs/LocalStorageBarrowsInit.json */ "./JSONs/LocalStorageBarrowsInit.json");
/* harmony import */ var _JSONs_LocalStorageBarrowsInit_json__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_JSONs_LocalStorageBarrowsInit_json__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _JSONs_ItemsAndImagesBarrows_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./JSONs/ItemsAndImagesBarrows.json */ "./JSONs/ItemsAndImagesBarrows.json");
/* harmony import */ var _JSONs_ItemsAndImagesBarrows_json__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_JSONs_ItemsAndImagesBarrows_json__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _JSONs_ItemsAndImagesBarrowsLegacy_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./JSONs/ItemsAndImagesBarrowsLegacy.json */ "./JSONs/ItemsAndImagesBarrowsLegacy.json");
/* harmony import */ var _JSONs_ItemsAndImagesBarrowsLegacy_json__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_JSONs_ItemsAndImagesBarrowsLegacy_json__WEBPACK_IMPORTED_MODULE_7__);
//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api








/*
A couple of notes for development
- In order to adjust this plugin for other loot adjust two key things:
    * The JSONs, the initializer and the image lists
    * The Image or images that allow Alt1 to find the window
- One would need to tweak various settings around to accomdate the loot window
- Value reader is also from the Clue Solver, so I'm not sure how it works, it may break.
*/
//tell webpack to add index.html and appconfig.json to output
__webpack_require__(/*! !file-loader?name=[name].[ext]!./index.html */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./appconfig.json */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json");
// TODO: FOR THE PROGRAMMERS AND DEBUGGERS
// Set this value to true or false to enable console log messages
var seeConsoleLogs = true;
var settingslist = ["BarrowsLogger/Checked button", "BarrowsLogger/Algorithm", "BarrowsLogger/lagDetect",
    "BarrowsLogger/multiButtonPressDetect", "BarrowsLogger/hybridPrecision",
    "BarrowsLogger/noMenu", "BarrowsLogger/RollbackDisplayLimit"];
var valuesAndCounts = ["BarrowsLogger/Value", "BarrowsLogger/Count"];
var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item",
    "sixth_item", "seventh_item", "eigth_item", "ninth_item", "tenth_item",
    "eleventh_item", "twelfth_item"];
var listOfItemsAll = [];
var listOfItemsAllArray = [];
var listOfItemsLegacyAll = [];
var listOfItemsLegacyAllArray = [];
var items = JSON;
var legacy = false;
var displaybox = true;
var lastItems = [];
var lastQuants = [];
var lastValue = 0;
var autoCaptureInterval;
var noMenuInterval;
var opentabs = [true, true];
var lagDetected = false;
var buttonDisabletoggle = true;
var lagCounter = 0;
var insertVerif = [];
// Adjust this for larger windows. I want 12 cause barrows.
var cap = 12;
var imgs = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    barrowsChest: __webpack_require__(/*! ./images/barrowsChest.data.png */ "./images/barrowsChest.data.png"),
    barrowsChestLegacy: __webpack_require__(/*! ./images/barrowsChestLegacy.data.png */ "./images/barrowsChestLegacy.data.png")
});
// TODO: Consider adding an update price for all clues within history, current tier value
// TODO: Consider changing the coin icon depending on its quantity
// Maybe extend this with purple sweets, holy biscuits, and various seeds.
// TODO: Consider putting some functions in its own TS files for organization.
async function initOnLoad() {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLayClearGroup("icon");
        alt1.overLayClearGroup("lag");
        alt1.overLayClearGroup("nomenu");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Initializing BarrowsLogger...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
    }
    if (seeConsoleLogs)
        console.log("Initializing plugin...");
    toggleLootDisplay("equipment_rewards");
    toggleLootDisplay("general_rewards");
    await init();
    if (seeConsoleLogs)
        console.log("\nInitialization complete!");
}
async function init() {
    buttonDisabler();
    // TODO: This is a fix for when the buttons are clicked once.
    // When clicked once, it does nothing but when clicked a second
    // time, it closes and works properly.
    // Figure out in toggleLootDisplay how to fix it. Might worry
    // about it in the next logger project...
    // Initializing LocalStorage items
    if (seeConsoleLogs)
        console.log("Initializing LocalStorage items...");
    if (localStorage.getItem("BarrowsLogger/items") == null) {
        localStorage.setItem("BarrowsLogger/items", JSON.stringify(_JSONs_LocalStorageBarrowsInit_json__WEBPACK_IMPORTED_MODULE_5__));
    }
    for (let i = 0; i < valuesAndCounts.length; i++) {
        if (localStorage.getItem(valuesAndCounts[i]) == null) {
            localStorage.setItem(valuesAndCounts[i], "0");
        }
    }
    items = JSON.parse(localStorage.getItem("BarrowsLogger/items"));
    if (seeConsoleLogs)
        console.log("LocalStorage items initialized.");
    if (localStorage.getItem("BarrowsLogger/Algorithm") == null) { // Algorithim init check
        if (seeConsoleLogs)
            console.log("Defaulting Algorithm button to Hybrid...");
        localStorage.setItem("BarrowsLogger/Algorithm", "hybrid");
    }
    if (localStorage.getItem("BarrowsLogger/ItemList") == null) { // Item Referense list init check
        if (seeConsoleLogs)
            console.log("Defaulting ItemList to Organized List...");
        localStorage.setItem("BarrowsLogger/ItemList", "orglist");
    }
    if (localStorage.getItem("BarrowsLogger/autoCapture") == null) { // Autocapture check
        if (seeConsoleLogs)
            console.log("Defaulting autocapture to off...");
        localStorage.setItem("BarrowsLogger/autoCapture", "false");
    }
    if (localStorage.getItem("BarrowsLogger/lagDetect") == null) { // Lag Detection toggle check
        if (seeConsoleLogs)
            console.log("Defaulting lag detect to true...");
        localStorage.setItem("BarrowsLogger/lagDetect", "true");
    }
    if (localStorage.getItem("BarrowsLogger/multiButtonPressDetect") == null) { // Button double press detection
        if (seeConsoleLogs)
            console.log("Defaulting multi button press detect to true...");
        localStorage.setItem("BarrowsLogger/multiButtonPressDetect", "true");
    }
    if (localStorage.getItem("BarrowsLogger/noMenu") == null) { // No hover display box
        if (seeConsoleLogs)
            console.log("Defaulting no menu box to true");
        localStorage.setItem("BarrowsLogger/noMenu", "false");
    }
    else if (localStorage.getItem("BarrowsLogger/noMenu") == "true") {
        if (seeConsoleLogs)
            console.log("Enabling no menu box");
        noMenuCheck();
    }
    if (localStorage.getItem("BarrowsLogger/hybridPrecision") == null) { // Hybrid precision value
        if (seeConsoleLogs)
            console.log("Defaulting hybridPrecision to 0.7...");
        localStorage.setItem("BarrowsLogger/hybridPrecision", "0.7");
    }
    if (localStorage.getItem("BarrowsLogger/History") == null) { // History initializer
        if (seeConsoleLogs)
            console.log("Creating history");
        localStorage.setItem("BarrowsLogger/History", JSON.stringify([]));
    }
    if (localStorage.getItem("BarrowsLogger/PrimaryKeyHistory") == null) { // Initialize primary key for history
        if (seeConsoleLogs)
            console.log("Defaulting PrimaryKeyHistory to 1");
        localStorage.setItem("BarrowsLogger/PrimaryKeyHistory", "1");
    }
    if (localStorage.getItem("BarrowsLogger/HistoryDisplayLimit") == null) { // Initialize history display limit
        if (seeConsoleLogs)
            console.log("Defaulting history display limit to 25");
        localStorage.setItem("BarrowsLogger/HistoryDisplayLimit", "25");
    }
    updateItems();
    if (seeConsoleLogs)
        console.log("\n");
    // Set up image libraries
    await arraySetup();
    //Set display
    lootDisplay();
    //Set up settings
    settingsInit();
    //Set up history window
    historyInit();
    //Set up insert window
    insertInit();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("BarrowsLogger ready!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    buttonEnabler();
}
async function cleardb(choice) {
    let keys = Object.keys(items);
    if (choice == 1) { // Nuclear reset all
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Resetting BarrowsLogger...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        let ls = Object.keys(localStorage);
        for (const i of ls) {
            if (i.includes("BarrowsLogger")) {
                console.log("Removing all Barrows Logger stuff...");
                localStorage.removeItem(i);
            }
        }
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("BarrowsLogger successfully reset! Restarting...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        location.reload();
    }
    else if (choice == 2) { // Full item db clear
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Clearing all items from reward database...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        localStorage.removeItem("BarrowsLogger/items");
        localStorage.removeItem("BarrowsLogger/History");
        for (let i = 0; i < valuesAndCounts.length; i++) {
            localStorage.removeItem(valuesAndCounts[i]);
        }
        await init();
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("All items cleared successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
    }
    else if (choice == 3) { // Reset settings
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Reseting settings to default...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        if (localStorage.getItem("BarrowsLogger/noMenu") === "true") {
            localStorage.setItem("BarrowsLogger/noMenu", "false");
            noMenuCheck();
        }
        for (let i = 0; i < settingslist.length; i++) {
            localStorage.removeItem(settingslist[i]);
        }
        await init();
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Settings reset successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
    }
    let ele = document.getElementById("history_body");
    let container = document.createElement("div");
    container.textContent = "There's nothing here to display. Start scanning!";
    container.setAttribute('class', 'nothingToDisplayContainer');
    ele.append(container);
    await historyClear();
    historyInit();
    document.getElementById("number_of_rewards").textContent = "0";
    document.getElementById("value_of_rewards").textContent = "0";
    document.getElementById("average_of_rewards").textContent = "0";
    let divs = document.getElementsByClassName("loot_display");
    for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = "";
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            if (rewardSlots[(i * 8) + j] == undefined) {
                break;
            }
            document.getElementById(rewardSlots[(i * 8) + j]).textContent = "";
        }
    }
    document.getElementById("rewards_value").textContent = "0";
    lastItems = [];
    lastQuants = [];
    lastValue = 0;
}
async function arraySetup() {
    listOfItemsAll = _JSONs_ItemsAndImagesBarrows_json__WEBPACK_IMPORTED_MODULE_6__.items;
    listOfItemsLegacyAll = _JSONs_ItemsAndImagesBarrowsLegacy_json__WEBPACK_IMPORTED_MODULE_7__.items;
    listOfItemsAllArray = [];
    listOfItemsLegacyAllArray = [];
    let promises = [];
    for (let i = 0; i < listOfItemsAll.length; i++) {
        listOfItemsAllArray.push([listOfItemsAll[i].name, listOfItemsAll[i].base64, 0.0]);
        listOfItemsLegacyAllArray.push([listOfItemsLegacyAll[i].name, listOfItemsLegacyAll[i].base64, 0.0]);
        promises.push(await _base64ToImageData(listOfItemsAllArray[i][1], 32, 32).then(data => {
            listOfItemsAllArray[i].push(data);
        }));
        promises.push(await _base64ToImageData(listOfItemsLegacyAllArray[i][1], 32, 32).then(data => {
            listOfItemsLegacyAllArray[i].push(data);
        }));
    }
    await Promise.all(promises);
}
_alt1_base__WEBPACK_IMPORTED_MODULE_0__.on("alt1pressed", alt1pressedcapture);
function alt1pressedcapture() {
    if (buttonDisabletoggle == true) {
        if (document.getElementById("docapturebutton").getAttribute("title") === ("Disabled while scanning. Please wait...")) {
            return;
        }
        else if (document.getElementById("docapturebutton").getAttribute("title") === ("Disable autocapture to use this button")) {
            return;
        }
        else {
            capture(false);
        }
    }
}
async function capture(autobool) {
    if (!window.alt1) {
        return;
    }
    if (!alt1.permissionPixel) {
        return;
    }
    if (localStorage.getItem("BarrowsLogger/multiButtonPressDetect") === "true") {
        if (!autobool) {
            document.getElementById("docapturebutton").setAttribute("onclick", "");
            document.getElementById("docapturebutton").setAttribute("title", "Disabled while scanning. Please wait...");
            document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
    let img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
    const promises = [];
    promises.push(await findtrailComplete(img, autobool));
    await Promise.all(promises);
    if (seeConsoleLogs)
        console.log("Finished checking clue scroll");
    if (localStorage.getItem("BarrowsLogger/multiButtonPressDetect") === "true") {
        if (!autobool) {
            await new Promise(resolve => setTimeout(function () {
                document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
                document.getElementById("docapturebutton").setAttribute("title", "");
                document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
            }, 400));
        }
    }
}
async function findtrailComplete(img, autobool) {
    // If 3 rerolls..., default
    // Adjust this if you want to add more rerolls.
    if (lagCounter == 5) {
        autoDisableCheckAuto(event);
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLayClearGroup("lag");
            alt1.overLayClearGroup("rect");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Too much lag or back to back loot detected.\n\n        Autocapture has been automatically\nturned off. Manually capture this clue or turn\n         autocapture back on and try again", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
        }
        lagCounter = 0;
        return;
    }
    try {
        let loc;
        const imgCaptures = [img.findSubimage(imgs.barrowsChest),
            img.findSubimage(imgs.barrowsChestLegacy)
        ];
        if (imgCaptures[0][0] !== undefined) {
            loc = imgCaptures[0];
            if (seeConsoleLogs)
                console.log("Non-legacy window");
            legacy = false;
        }
        else if (imgCaptures[1][0] !== undefined) {
            loc = imgCaptures[1];
            if (seeConsoleLogs)
                console.log("legacy window");
            legacy = true;
        }
        else {
            return;
        }
        // TODO: Tweak these two values below if jagex adjusts the pixel placement of the items
        // Values to tweak in case jagex borks the item placement on the screen
        // x1, +1 = right, -1 = left
        // y1, +1 = up, -1 = down
        // Adjust top crops as well, for the x1 and y1 values for it
        // Consider making this an option in the settings.
        let xdefault;
        let ydefault;
        let xRect;
        let yRect;
        if (!legacy) {
            xdefault = loc[0].x - 10;
            ydefault = loc[0].y + 30;
            xRect = loc[0].x - 27;
            yRect = loc[0].y - 13;
        }
        else {
            xdefault = loc[0].x - 154;
            ydefault = loc[0].y + 30;
            xRect = loc[0].x - 172;
            yRect = loc[0].y - 13;
        }
        //FIXME: Recrop images and compile new JSON.
        // I think I know why it's borked.
        // Crop it like you did with Tetracompasses.
        let x1 = xdefault;
        let y1 = ydefault;
        let crops = [];
        let topCrops = [];
        for (let i = 0; i < 4; i++) {
            let croptemp = new Array(8);
            let toptemp = new Array(8);
            for (let j = 0; j < 8; j++) {
                croptemp[j] = (img.toData(x1, y1, 32, 32));
                toptemp[j] = (img.toData(x1, y1, 32, 8));
                x1 += 32 + 23;
            }
            crops.push(croptemp);
            topCrops.push(toptemp);
            x1 = xdefault;
            y1 += 32 + 14;
        }
        // Give me the total value!
        // If this breaks, value is obfuscated. Second way to scan it for validity.
        // FIXME: Try to rework this try/catch to an if/else block.
        let value = 0;
        let lastValueList = [];
        try {
            let rewardreader = new _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_3__["default"](); // Thanks Skillbert
            rewardreader.pos = _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_4__.ModalUIReader.find()[0]; // For these two functions
            value = rewardreader.read(img).value;
            let valueStr = value.toString();
            let valueList = [];
            for (let i = valueStr.length - 1; i > 0; i--) {
                valueList.push(valueStr);
                valueStr = valueStr.slice(0, -1);
            }
            let lastValueStr = lastValue.toString();
            for (let i = lastValueStr.length - 1; i > 0; i--) {
                lastValueList.push(lastValueStr);
                lastValueStr = lastValueStr.slice(0, -1);
            }
        }
        catch (e) {
            return;
        }
        if (autobool == true) {
            if (lastValue == 0) {
                if (seeConsoleLogs)
                    console.log("value is zero");
            }
            else if (value == lastValue) {
                return;
            }
            else if ( /*valueList.includes(lastValue.toString()) ||*/lastValueList.includes(value.toString())) {
                return;
            }
        }
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("rect");
        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), xRect, yRect, imgs.barrowsChest.width + 345, imgs.barrowsChest.height + 291, 60000, 2);
        let prevValue = lastValue;
        lastValue = value;
        if (!lagDetected) {
            alt1.overLayClearGroup("overlays");
            alt1.overLayClearGroup("lag");
            alt1.overLaySetGroup("lag");
            alt1.overLayTextEx("Capturing rewards...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
        }
        let itemResults = [];
        let promises = [];
        x1 = xdefault;
        y1 = ydefault;
        let notBlank = false;
        for (let i = 0; i < 4; i++) {
            let itemtemp = [];
            for (let j = 0; j < 8; j++) {
                if (window.alt1) {
                    alt1.overLayClearGroup("icon");
                    alt1.overLaySetGroup("icon");
                }
                if (displaybox) {
                    // Keep an eye on this in case it incorrectly gives numbers...
                    if (window.alt1) {
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), x1, y1, 32, 32, 1000, 1);
                        if (((i * 8) + j + 1) >= 20)
                            alt1.overLayText(((i * 8) + j + 1).toString(), _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0, 255), 18, x1 - 1, y1, 1000);
                        else if (((i * 8) + j + 1) >= 10)
                            alt1.overLayText(((i * 8) + j + 1).toString(), _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0, 255), 18, x1 - 3, y1, 1000);
                        else if (((i * 8) + j + 1) < 10)
                            alt1.overLayText(((i * 8) + j + 1).toString(), _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0, 255), 18, x1 + 5, y1, 1000);
                    }
                }
                x1 += 32 + 23;
                promises.push(itemtemp.push(await compareItems(crops[i][j])));
                console.log(itemtemp[j]);
                if (localStorage.getItem("BarrowsLogger/lagDetect") == "true") {
                    if (itemtemp[j] == "Blank") {
                        notBlank = true;
                    }
                    else if (itemtemp[j] !== "Blank" && notBlank) {
                        //Do a thing. This detects whether there was a break or not.
                        if (window.alt1) {
                            alt1.overLayClearGroup("overlays");
                            alt1.overLayClearGroup("lag");
                            alt1.overLaySetGroup("lag");
                            alt1.overLayTextEx("Lag detected, rescanning...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 1500, "", true, true);
                        }
                        lagDetected = true;
                        lastValue = 0;
                        lagCounter++;
                        capture(autobool);
                        return;
                    }
                }
            }
            itemResults.push(itemtemp);
            x1 = xdefault;
            y1 += 32 + 14;
        }
        if (localStorage.getItem("BarrowsLogger/lagDetect") == "true") {
            for (let i = 0; i < itemResults.length; i++) {
                if (itemResults[itemResults.length - 1] !== "Blank") {
                    break;
                }
                else if (itemResults[i] !== "Blank") {
                    continue;
                }
                else {
                    if (seeConsoleLogs)
                        console.log(itemResults[i]);
                    let newImg = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
                    let loc2;
                    let x = 0;
                    let y = 0;
                    if (!legacy) {
                        loc2 = newImg.findSubimage(imgs.barrowsChest);
                    }
                    else {
                        loc2 = newImg.findSubimage(imgs.barrowsChestLegacy);
                    }
                    x = xdefault;
                    y = ydefault;
                    let row = i / 4;
                    let col = i % 8;
                    x += (32 + 23) * col;
                    y += (32 + 14) * row;
                    if (window.alt1) {
                        alt1.overLayClearGroup("overlays");
                        alt1.overLaySetGroup("overlays");
                        alt1.overLayTextEx("Checking last item for lag...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 170, 1000, "", true, true);
                        alt1.overLayClearGroup("icon");
                        alt1.overLaySetGroup("icon");
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(125, 194, 33), x, y, 32, 32, 2000, 1);
                    }
                    let lastcrop = newImg.toData(x - 1, loc2[0].y + 39, 32, 32);
                    let lastresult = "";
                    let promises2 = [];
                    promises2.push(lastresult = await compareItems(lastcrop));
                    await Promise.all(promises2);
                    if (seeConsoleLogs)
                        console.log(itemResults, i);
                    if (seeConsoleLogs)
                        console.log("Comparing", lastresult, "to", itemResults[i]);
                    // Consider doing a value check in here...
                    // TODO: If capture issues with lag checking happen look here...
                    // I think this might be fixed, but idk
                    let comparison = true;
                    if (autobool) {
                        try {
                            let itemResultsNoBlanks = [];
                            for (let i = 0; i < itemResults.length; i++) {
                                if (itemResults[i] !== "Blank") {
                                    itemResultsNoBlanks.push(itemResults[i]);
                                }
                                else {
                                    break;
                                }
                            }
                            let lsHistory = JSON.parse(localStorage.getItem("BarrowsLogger/History"))[JSON.parse(localStorage.getItem("BarrowsLogger/History")).length - 1][0];
                            if (seeConsoleLogs)
                                console.log("Checking arrays for equivalence:", JSON.parse(localStorage.getItem("BarrowsLogger/History"))[JSON.parse(localStorage.getItem("BarrowsLogger/History")).length - 1][0], itemResultsNoBlanks);
                            if (lsHistory.join(',') === itemResultsNoBlanks.join(',')) { // https://stackoverflow.com/a/6230314
                                if (seeConsoleLogs)
                                    console.log(lsHistory.join(','), "and", itemResultsNoBlanks.join(','), "are the same...");
                                if (seeConsoleLogs)
                                    console.log("They're the same. make it false.");
                                comparison = false;
                            }
                        }
                        catch (e) {
                            console.log("Something broke.", e);
                        }
                    }
                    let lagDetectValue = new _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_3__["default"]();
                    lagDetectValue.pos = _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_4__.ModalUIReader.find()[0];
                    if (!comparison) {
                        if (window.alt1) {
                            alt1.overLayClearGroup("overlays");
                            alt1.overLayClearGroup("lag");
                            alt1.overLaySetGroup("lag");
                            alt1.overLayTextEx("Lag detected, rescanning...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
                        }
                        lagDetected = true;
                        lastValue = 0;
                        lagCounter++;
                        capture(autobool);
                        return;
                    } // TODO: Put some console log test statements in here...
                    else if (lastresult === itemResults[i]) {
                        break;
                    }
                    else if (parseInt(lastValueList[0]) === parseInt("lagDetectValue")) {
                        break;
                    }
                    else {
                        if (window.alt1) {
                            alt1.overLayClearGroup("overlays");
                            alt1.overLayClearGroup("lag");
                            alt1.overLaySetGroup("lag");
                            alt1.overLayTextEx("Lag detected, rescanning...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
                        }
                        lagDetected = true;
                        lastValue = 0;
                        lagCounter++;
                        capture(autobool);
                        return;
                    }
                }
            }
        }
        await Promise.all(promises);
        lagCounter = 0;
        // TODO: See if this even does anything
        //Maybe comment this out later idk
        let equalArrays = true;
        if (autobool) {
            if (lastItems.length == 0) {
                if (seeConsoleLogs)
                    console.log("last item length is 0. Pass...");
            }
            else {
                for (let i = 0; i < itemResults.length; i++) {
                    if (itemResults[i] !== lastItems[i]) {
                        equalArrays = false;
                        if (seeConsoleLogs)
                            console.log("Equal arrays false");
                    }
                }
                if (prevValue == value && !equalArrays) {
                    if (window.alt1) {
                        alt1.overLayClearGroup("overlays");
                        alt1.overLaySetGroup("overlays");
                        alt1.overLayTextEx("                 Casket misread.\nPause Autocapture (if on) and restart\n  plugin or rollback, and try again.", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
                    }
                    lastValue = prevValue;
                    if (seeConsoleLogs)
                        console.log("equal arrays is false, setting last value to previous value");
                    return;
                }
            }
        }
        // Give me the quantity of the items!
        let quantResults = [];
        promises = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                if (itemResults[i][j] == "Blank") {
                    break;
                }
                promises.push(quantResults.push(await readQuantities(topCrops[i][j])));
            }
        }
        await Promise.all(promises);
        if (seeConsoleLogs)
            (quantResults);
        // Send it to the LS!
        promises = [];
        console.log(itemResults, quantResults, value);
        promises.push(await submitToLS(itemResults, quantResults, value));
        await Promise.all(promises);
        // Record data for last casket
        lastItems = itemResults.slice();
        lastQuants = quantResults.slice();
        addHistoryToLs(lastValue, lastItems, lastQuants, "reward");
        // Put the items and quantites on the display!
        document.getElementById("rewards_value").textContent = value.toLocaleString("en-US");
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                if (rewardSlots[(i * 8) + j] == undefined) {
                    break;
                }
                document.getElementById(rewardSlots[(i * 8) + j]).textContent = "";
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                // Displaying in Rewards Capture
                if (itemResults[i][j] == "Blank") {
                    break;
                }
                let nodevar = document.createElement("itembox");
                let imgvar = document.createElement("img");
                let quantvar = document.createElement("span");
                nodevar = nodeMaker(parseInt(quantResults[(i * 8) + j]), itemResults[i][j], "recent");
                imgvar = imgMaker(itemResults[i][j]);
                quantvar = quantMaker(parseInt(quantResults[(i * 8) + j]));
                nodevar.append(quantvar);
                nodevar.append(imgvar);
                document.getElementById(rewardSlots[(i * 8) + j]).appendChild(nodevar);
            }
        }
        //Show it on the screen!
        lootDisplay();
        //Display the victory screen!!!
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLayClearGroup("rect");
            alt1.overLayClearGroup("lag");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Barrows rewards captured successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), xRect, yRect, imgs.barrowsChest.width + 345, imgs.barrowsChest.height + 291, 1000, 2);
        }
        lagDetected = false;
    }
    catch (e) {
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLayClearGroup("lag");
            alt1.overLayClearGroup("rect");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("        A crash occured.\n\n     Remove any obstructions, \n check tier, open a reward casket, \nreload plugin or clear database and try again", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
        }
        buttonEnabler();
        console.log(e);
        throw (e);
        return;
    }
}
async function compareItems(item) {
    //TODO: Try to get Legacy to work better
    //Legacy works, but I don't have a lot of testing materials
    // Can't use all at once. Can only do one color at a time.
    // const yellow = { r: 255, g: 0, b: 0, a: 255};
    // const black1 = { r: 0, g: 0, b: 0, a: 255};
    // const black2 = { r: 0, g: 0, b: 1, a: 255};
    // const black3 = { r: 0, g: 0, b: 2, a: 255};
    // const legacytan = { r: 62, g: 53, b: 40, a: 255};
    // const rs3blue = { r: 10, g: 31, b: 41, a: 255};
    // let colors = [yellow, black1, black2, black3]
    // Just hold this for now just in case...
    // Remove blank if not blank
    //	{output: {ignoreAreasColoredWith: colors}}
    // 	Choices are: yellow, black1, black2, black3, legacytan, rs3blue
    // all, twoplus, orglist, orgminus
    let matches = [];
    if (!legacy) {
        matches = listOfItemsAllArray.slice();
    }
    else { // Legacy works. But I don't test with it often. I think its okay...
        matches = listOfItemsLegacyAllArray.slice();
    }
    //Check if the item is blank first
    let imgdata = await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[0][1], { output: {}, ignore: "less" });
    matches[0][2] = imgdata.rawMisMatchPercentage;
    if (matches[0][2] == 0.00) {
        return "Blank";
    }
    matches.shift(); // Remove blank from the list
    let found = [];
    if (localStorage.getItem("BarrowsLogger/Algorithm") == "resemblejs") {
        found = matches[0];
        const promises = [];
        for (let i = 0; i < matches.length; i++) {
            promises.push(await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
                matches[i][2] = data.rawMisMatchPercentage;
            }));
            if (found[2] > matches[i][2]) {
                found = matches[i];
            }
        }
        await Promise.all(promises);
    }
    else if (localStorage.getItem("BarrowsLogger/Algorithm") == "pixelmatch") {
        /* List of items that do not identify in pure PixelMatch
            - Huge Plated Adamant Salvage identifies as Huge Plated Rune Salvage when using TwoPlus or All
        */
        found = matches[0];
        const promises = [];
        for (let i = 0; i < matches.length; i++) {
            promises.push(matches[i][2] = pixelmatch__WEBPACK_IMPORTED_MODULE_2___default()(item.data, matches[i][3].data, null, item.width, item.height, { includeAA: true, threshold: 0.1 }));
            if (found[2] > matches[i][2]) {
                found = matches[i];
            }
        }
        await Promise.all(promises);
    }
    else if (localStorage.getItem("BarrowsLogger/Algorithm") == "hybrid") {
        // First we check with Pixelmatch and get the comparison of everything to the item
        let promises = [];
        let total = 0;
        for (let i = 0; i < matches.length; i++) {
            promises.push(matches[i][2] = pixelmatch__WEBPACK_IMPORTED_MODULE_2___default()(item.data, matches[i][3].data, null, item.width, item.height, { includeAA: true, threshold: 0.1 }));
            total += matches[i][2];
        }
        // Then we get the average so we can remove half of the items that don't match
        let average = total / matches.length;
        let precision = parseFloat(localStorage.getItem("BarrowsLogger/hybridPrecision")); //1 does nothing
        await Promise.all(promises);
        for (let i = matches.length - 1; i >= 0; i--) {
            if (matches[i][2] > (average * precision)) {
                matches.splice(i, 1);
            }
        }
        //Now we find the correct item with ResembleJS!
        promises = [];
        found = matches[0];
        for (let i = 0; i < matches.length; i++) {
            promises.push(await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
                matches[i][2] = data.rawMisMatchPercentage;
            }));
            if (found[2] > matches[i][2]) {
                found = matches[i];
            }
        }
        await Promise.all(promises);
    }
    return found[0];
}
async function readQuantities(item) {
    // Instead of reading top to bottom individulally, 
    // Read from left to right Read left to right with all columns together
    // And since the height is always the same I dont have to worry about changing
    // the value of the width of the number.
    // Maybe consider this for optimizations :^?
    let itemCan = document.createElement("canvas");
    let itemCon = itemCan.getContext('2d');
    itemCan.width = item.width;
    itemCan.height = item.height;
    itemCon.putImageData(item, 0, 0);
    let itemImg = new Image();
    itemImg.src = itemCan.toDataURL("image/png");
    itemCon.drawImage(itemImg, 0, 0);
    let pixels = itemCon.getImageData(0, 0, item.width, item.height);
    let pixarr = [];
    let pixeldata = 0;
    for (let i = 0; i < 8; i++) {
        let arr2 = [];
        for (let j = 0; j < 32; j++) {
            let vals = { r: pixels.data[pixeldata], g: pixels.data[pixeldata + 1], b: pixels.data[pixeldata + 2], a: pixels.data[pixeldata + 3] };
            pixeldata += 4;
            arr2.push(vals);
        }
        pixarr.push(arr2);
    }
    let pixelCount = 0;
    let streak = 0;
    let longestStreak = 0;
    let yellowInCol = false;
    let noYellowStreak = 0;
    let numbers = "";
    for (let i = 0; i < pixarr[0].length; i++) {
        if (noYellowStreak == 3) {
            break;
        }
        for (let j = 0; j < pixarr.length; j++) {
            if (pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 0 || // Yellow, Every screen has this
                pixarr[j][i].r == 255 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 || // Very slightly darker yellow, a screenie had this...
                pixarr[j][i].r == 254 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 || // Very slightly darker yellow, a screenie had this...
                pixarr[j][i].r == 253 && pixarr[j][i].g == 253 && pixarr[j][i].b == 0 || // Slightly darker yellow, for safety
                pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 255) { // White, elites and masters only
                pixelCount++;
                streak++;
                noYellowStreak = 0;
                yellowInCol = true;
                if (streak > longestStreak) {
                    longestStreak = streak;
                }
            }
            else {
                streak = 0;
            }
        }
        if (pixelCount == 0) {
            noYellowStreak++;
        }
        else if (yellowInCol == false) {
            if (pixelCount == 11) {
                if (longestStreak == 3) {
                    numbers += "7";
                }
                else { // 9
                    numbers += "1";
                }
            }
            else if (pixelCount == 13) {
                if (longestStreak == 3) {
                    numbers += "3";
                }
                else { //if 6
                    numbers += "4";
                }
            }
            else if (pixelCount == 14) {
                numbers += "0";
            }
            else if (pixelCount == 15) {
                if (longestStreak == 3) {
                    numbers += "2";
                }
                else if (longestStreak == 4) {
                    numbers += "5";
                }
                else if (longestStreak == 7) {
                    numbers += "9";
                }
                else { //if 8
                    numbers += "000";
                    pixelCount = 0;
                    break;
                }
            }
            else if (pixelCount == 18) {
                numbers += "6";
            }
            else { // if pixelCount == 19
                numbers += "8";
            }
            longestStreak = 0;
            pixelCount = 0;
            noYellowStreak++;
        }
        yellowInCol = false;
    }
    if (pixelCount > 5) {
        numbers += "0";
    }
    if (numbers != "") {
        return numbers;
    }
    else {
        return "1";
    }
}
async function submitToLS(item, quant, value) {
    //Add items to database
    if (seeConsoleLogs)
        console.log("Adding to database...");
    console.log(quant);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            // If you get null or undefined here, check if one of your rewards doesn't exist in LocalStorage or LocalStorageInit
            // Or maybe the name might be incorrectly written in, idk
            // console.log("checking if in array", item[i]);
            if (item[i][j] == "Blank" || item[i][j] == undefined) {
                break;
            }
            let tempQuant = quant[(i * 8) + j].slice();
            console.log(tempQuant);
            if (quant[(i * 8) + j].includes('k')) {
                tempQuant = tempQuant.slice(0, -1);
                tempQuant += "000";
            }
            console.log(item[i][j], items[item[i][j]].quantity, tempQuant);
            items[item[i][j]].quantity = parseInt(items[item[i][j]].quantity) + parseInt(tempQuant);
            updateItems();
            console.log(items[item[i][j]].quantity);
        }
    }
    // Increase value and count
    localStorage.setItem("BarrowsLogger/Value", JSON.stringify((JSON.parse(localStorage.getItem("BarrowsLogger/Value")) + value)));
    localStorage.setItem("BarrowsLogger/Count", JSON.stringify((JSON.parse(localStorage.getItem("BarrowsLogger/Count")) + 1)));
    return true;
}
async function addHistoryToLs(value, items, quants, reward) {
    // The order of how History items are logged
    // Index 1: Items (Array)
    // Index 2: Quantities (Array)
    // Index 3: Value
    // Index 4: "Reward" or "Reward [C] "
    // Index 5: reward count
    // Index 6: History Primary Key
    let itemsArr = [];
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items[i].length; j++) {
            console.log("Checking if", items[i][j], "is equal to", "Blank");
            if (items[i][j] !== "Blank" || items[i][j] != undefined) {
                itemsArr.push(items[i][j]);
            }
        }
    }
    for (let i = 0; i < quants.length; i++) {
        if (quants[i].includes('k')) {
            quants[i] = quants[i].slice(0, -1);
            quants[i] += "000";
        }
    }
    let previous = [itemsArr, quants, value, reward, localStorage.getItem("BarrowsLogger/Count"), localStorage.getItem("BarrowsLogger/PrimaryKeyHistory")];
    let temp = JSON.parse(localStorage.getItem("BarrowsLogger/History"));
    temp.push(previous);
    localStorage.setItem("BarrowsLogger/History", JSON.stringify(temp));
    localStorage.setItem("BarrowsLogger/PrimaryKeyHistory", JSON.stringify(parseInt(localStorage.getItem("BarrowsLogger/PrimaryKeyHistory")) + 1));
    await historyClear();
    historyInit();
}
function lootDisplay() {
    //Set Number of clues and Current and Average values
    document.getElementById("number_of_rewards").textContent = parseInt(JSON.parse(localStorage.getItem("BarrowsLogger/Count"))).toLocaleString("en-US");
    document.getElementById("value_of_rewards").textContent = parseInt(JSON.parse(localStorage.getItem("BarrowsLogger/Value"))).toLocaleString("en-US");
    if (parseInt(JSON.parse(localStorage.getItem("BarrowsLogger/Value"))) != 0) {
        document.getElementById("average_of_rewards").textContent = Math.round(parseInt(JSON.parse(localStorage.getItem("BarrowsLogger/Value"))) / parseInt(JSON.parse(localStorage.getItem("BarrowsLogger/Count")))).toLocaleString("en-US");
    }
    else {
        document.getElementById("average_of_rewards").textContent = "0";
    }
    //Set the icons in the tabs
    tabDisplay();
}
function tabDisplay() {
    let keys = Object.keys(items);
    let divs = document.getElementsByClassName("loot_display");
    for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = "";
    }
    for (let i = 0; i < keys.length; i++) {
        // Interesting tidbit: Comment out this if block to display every item, 
        // but quantities will be undefined for the given tier if it doesn't exist in it.
        if (items[keys[i]].quantity == undefined || items[keys[i]].quantity == 0) {
            continue;
        }
        console.log(keys[i]);
        let ele = document.getElementById(items[keys[i]].tab + "_loot");
        let nodevar = document.createElement("itembox");
        let imgvar = document.createElement("img");
        let quantvar = document.createElement("span");
        nodevar = nodeMaker(parseInt(items[keys[i]].quantity), keys[i], "tab");
        nodevar.style.order = orderChecker(parseInt(items[keys[i]].order), keys[i]).toString();
        imgvar = imgMaker(keys[i]);
        // This if else only exists for when I comment out the above if block.
        // Nice for viewing all of the loot.
        if (items[keys[i]].quantity == undefined) {
            quantvar = quantMaker(0);
        }
        else {
            quantvar = quantMaker(items[keys[i]].quantity);
        }
        nodevar.append(quantvar);
        nodevar.append(imgvar);
        ele.append(nodevar);
    }
}
async function historyClear() {
    removeChildNodes(document.getElementById("history_body"));
}
function historyInit() {
    let lsHistory = JSON.parse(localStorage.getItem("BarrowsLogger/History"));
    let quantity = document.getElementById("history_quantity");
    quantity.textContent = localStorage.getItem("BarrowsLogger/HistoryDisplayLimit");
    if (lsHistory.length == 0) {
        let ele = document.getElementById("history_body");
        let container = document.createElement("div");
        container.textContent = "There's nothing to display. Start scanning!";
        container.setAttribute('class', 'nothingToDisplayContainer');
        ele.append(container);
    }
    else {
        let index = parseInt(localStorage.getItem("BarrowsLogger/Count"));
        let limit = 0;
        for (let i = lsHistory.length - 1; i >= 0; i--) { //Navigating lsHistory
            if (limit < parseInt(localStorage.getItem("BarrowsLogger/HistoryDisplayLimit"))) {
                let temp = lsHistory[i];
                let ele = document.getElementById("history_body");
                let container = document.createElement("div");
                container.setAttribute("class", "historyDisplayContainer");
                container.setAttribute('id', 'container' + temp[5]);
                if (temp[3].includes(" [C] ")) {
                    let customSpan = document.createElement("span");
                    customSpan.setAttribute("class", "customSpan");
                    customSpan.setAttribute("title", "Custom clue manually inserted.");
                    customSpan.textContent = " [C] ";
                    let countText = "Barrows reward: " + index;
                    let count = document.createElement("div");
                    count.innerHTML = countText;
                    count.setAttribute('class', 'historyCount');
                    count.append(customSpan);
                    container.append(count);
                }
                else {
                    let count = document.createElement("div");
                    count.textContent = "Barrows reward: " + index;
                    count.setAttribute('class', 'historyCount');
                    container.append(count);
                }
                let value = document.createElement("div");
                value.textContent = "Reward Value: " + temp[2].toLocaleString("en-US");
                value.setAttribute('class', 'historyValue');
                container.append(value);
                let TPcheck = false;
                for (let j = 0; j < 4; j++) { // Navigating temp
                    for (let k = 0; k < 8; k++) {
                        if (temp[0][(j * 8) + k] == "Blank" || temp[0][(j * 8) + k] == undefined) {
                            if (TPcheck) {
                                break;
                            }
                            for (let l = (j * 8) + k; l < cap; l++) {
                                let nodevar = document.createElement("itembox");
                                let imgvar = document.createElement("img");
                                let quantvar = document.createElement("span");
                                imgvar = imgMaker("Transparent");
                                nodevar.setAttribute("class", "node_history");
                                nodevar.removeAttribute("title");
                                quantvar.textContent = "";
                                nodevar.append(imgvar);
                                nodevar.append(quantvar);
                                container.append(nodevar);
                            }
                            TPcheck = true;
                            break;
                        }
                        let nodevar = document.createElement("itembox");
                        let imgvar = document.createElement("img");
                        let quantvar = document.createElement("span");
                        // Note for later. Figure out why insert isnt displaying properly...
                        if (temp[1][(j * 8) + k] === undefined) {
                            imgvar = imgMaker("Transparent");
                            nodevar.setAttribute("class", "node_history");
                            nodevar.removeAttribute("title");
                            quantvar.textContent = "";
                        }
                        else {
                            imgvar = imgMaker(temp[0][(j * 8) + k]);
                            nodevar = nodeMaker(parseInt(temp[1][(j * 8) + k]), temp[0][(j * 8) + k], "history");
                            quantvar = quantMaker(temp[1][(j * 8) + k]);
                        }
                        nodevar.append(imgvar);
                        nodevar.append(quantvar);
                        container.append(nodevar);
                    }
                }
                let buttonbox = document.createElement("div");
                let button = document.createElement("div");
                buttonbox.setAttribute('class', 'buttonboxHistory');
                buttonbox.setAttribute('id', 'container' + temp[5] + 'buttonbox');
                button.setAttribute('class', 'nisbutton historyButtonStyle');
                button.setAttribute('id', 'container' + temp[5] + 'button');
                button.setAttribute('onClick', 'TEST.rollbackVeri("container' + temp[5] + 'button")');
                button.textContent = "Delete";
                buttonbox.append(button);
                container.append(buttonbox);
                ele.append(container);
                index--;
                limit++;
            }
            else {
                break;
            }
        }
        if (index == parseInt(localStorage.getItem("BarrowsLogger/Count"))) {
            let ele = document.getElementById("history_body");
            let container = document.createElement("div");
            container.textContent = "There's nothing to display. Start scanning!";
            container.setAttribute('class', 'nothingToDisplayContainer');
            ele.append(container);
        }
    }
}
function rollbackVeri(id) {
    let buttonbox = document.getElementById(id + "box");
    let button = document.getElementById(id);
    buttonbox.removeChild(button);
    let buttonYes = document.createElement("div");
    let buttonNo = document.createElement("div");
    buttonbox.setAttribute('class', 'buttonBoxHistoryVerify');
    buttonYes.setAttribute('class', 'nisbutton buttonVerif');
    buttonYes.setAttribute('onclick', 'TEST.rollbackYes("' + id + '")');
    buttonYes.textContent = "Yes";
    buttonNo.setAttribute('class', 'nisbuttonblue buttonVerif');
    buttonNo.setAttribute('onclick', 'TEST.rollbackNo("' + id + '")');
    buttonNo.textContent = "No";
    buttonbox.append(buttonYes, buttonNo);
}
function rollbackYes(id) {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Rolling back reward...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    if (seeConsoleLogs)
        console.log("Rolling back reward from history...");
    let container = document.getElementById(id.replace('button', ''));
    container.remove();
    let pKey = parseInt(id.replace('container', '').replace('button', ''));
    let lsHistory = JSON.parse(localStorage.getItem("BarrowsLogger/History"));
    let temp = [];
    for (let i = 0; i < lsHistory.length; i++) {
        if (lsHistory[i][5] == pKey) {
            temp = lsHistory[i];
            lsHistory.splice(i, 1);
            localStorage.setItem("BarrowsLogger/History", JSON.stringify(lsHistory));
            break;
        }
    }
    for (let i = 0; i < temp[0].length; i++) {
        console.log(temp[0][i]);
        if (temp[0][i] == "Blank") {
            break;
        }
        items[temp[0][i]].quantity = items[temp[0][i]].quantity - parseInt(temp[1][i]);
        updateItems();
    }
    // Decrease value and count
    localStorage.setItem("BarrowsLogger/Value", JSON.stringify(JSON.parse(localStorage.getItem("BarrowsLogger/Value")) - temp[2]));
    localStorage.setItem("BarrowsLogger/Count", JSON.stringify(JSON.parse(localStorage.getItem("BarrowsLogger/Count")) - 1));
    if (seeConsoleLogs)
        console.log("Removed", temp, ":", pKey, "from LS");
    if (pKey == ((parseInt(localStorage.getItem("BarrowsLogger/PrimaryKeyHistory"))) - 1)) {
        document.getElementById("rewards_value").textContent = "0";
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                if (rewardSlots[(i * 8) + j] == undefined) {
                    break;
                }
                document.getElementById(rewardSlots[(i * 8) + j]).textContent = "";
            }
        }
    }
    let historyCount = document.getElementsByClassName('historyCount');
    let index = parseInt(localStorage.getItem("BarrowsLogger/Count"));
    for (let i = 0; i < parseInt(localStorage.getItem("BarrowsLogger/Count")); i++) {
        if (i >= parseInt(localStorage.getItem("BarrowsLogger/RollbackDisplayLimit"))) {
            break;
        }
        if (historyCount[i] == undefined) {
            continue;
        }
        historyCount[i].textContent = "Barrows reward: " + index;
        index--;
    }
    historyClear();
    historyInit();
    lootDisplay();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Previous rewards rolled back successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
}
function rollbackNo(id) {
    let buttonbox = document.getElementById(id + "box");
    removeChildNodes(buttonbox);
    buttonbox.setAttribute('class', 'buttonboxHistory');
    let button = document.createElement("div");
    button.setAttribute('class', 'nisbutton historyButtonStyle');
    button.setAttribute('id', id);
    button.setAttribute('onClick', 'TEST.rollbackVeri("' + id + '")');
    button.textContent = "Delete";
    buttonbox.append(button);
}
function insertInitEx() {
    insertInit();
}
async function insertInit() {
    let keys = Object.keys(items);
    let list = [["Blank", "~Nothing~", 0]];
    for (let i = 0; i < keys.length; i++) {
        list.push([keys[i], keys[i], items[keys[i]].order]);
    }
    list.sort(function (a, b) {
        if (a[2] === b[2])
            return 0;
        else
            return (a[2] < b[2]) ? -1 : 1;
    });
    let itemBoxes = document.getElementsByClassName("items");
    let quantBoxes = document.getElementsByClassName("item_quants");
    let valueBox = document.getElementById("value_input");
    valueBox.value = "0";
    for (let i = 0; i < itemBoxes.length; i++) {
        removeChildNodes(itemBoxes[i]);
        quantBoxes[i].value = "0";
        for (let j = 0; j < list.length; j++) {
            let option = document.createElement('option');
            option.value = list[j][0].toString();
            option.textContent = list[j][1].toString();
            option.setAttribute('class', "insert_options");
            itemBoxes[i].append(option);
        }
    }
}
async function fetchFromGE() {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Fetching prices from GE...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 40000, "", true, true);
    }
    let items = [];
    let quants = [];
    let itemDivs = document.getElementsByClassName("items");
    let quantDivs = document.getElementsByClassName("item_quants");
    for (let i = 0; i < itemDivs.length; i++) {
        if (itemDivs[i].options[itemDivs[i].selectedIndex].value == "Blank") {
            continue;
        }
        // OpenLogger relics.
        if (["Saradomin page", "Guthix page", "Zamorak page", "Armadyl page", "Bandos page", "Ancient page"].includes(itemDivs[i].options[itemDivs[i].selectedIndex].value)) {
            items.push((itemDivs[i].options[itemDivs[i].selectedIndex].value) + " 1");
        }
        else if (["Dragon platelegs-skirt ornament kit (or)", "Dragon platelegs-skirt ornament kit (sp)"].includes(itemDivs[i].options[itemDivs[i].selectedIndex].value)) {
            items.push((itemDivs[i].options[itemDivs[i].selectedIndex].value).replace("-", "/"));
        }
        else {
            items.push((itemDivs[i].options[itemDivs[i].selectedIndex].value));
        }
        quants.push(parseInt(quantDivs[i].value));
    }
    if (seeConsoleLogs)
        console.log("Fetched items from GE are", items, "quants are", quants);
    if (items.length == 0) {
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Nothing selected to fetch.\nTry selecting some items.", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        if (seeConsoleLogs)
            console.log("No items...");
        return;
    }
    let prices = [];
    for (let i = 0; i < items.length; i++) {
        try {
            await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=" + items[i].replace("+", "%2B").replace("+", "%2B"))
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                prices.push(data[items[i]].price);
            });
        }
        catch (e) {
            if (seeConsoleLogs)
                console.log("It failed... setting to 0...", items[i], items[i].replace("+", "%2B").replace("+", "%2B"));
            prices.push(0);
        }
    }
    let grandTotal = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i] == "Coins") {
            grandTotal += quants[i];
        }
        else {
            grandTotal += (quants[i] * prices[i]);
        }
    }
    let ele = document.getElementById("value_input");
    ele.value = grandTotal + "";
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Prices fetched successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
    }
}
function verifyInsert(event) {
    if (seeConsoleLogs)
        console.log("Collecting info from insert...");
    let items = [];
    let quants = [];
    let totalPrice = parseInt(document.getElementById("value_input").value);
    let itemDivs = document.getElementsByClassName("items");
    let quantDivs = document.getElementsByClassName("item_quants");
    removeChildNodes(document.getElementById("value_input"));
    for (let i = 0; i < 4; i++) {
        let tempitems = [];
        for (let j = 0; j < 8; j++) {
            console.log(i, j);
            if (itemDivs[(i * 8) + j] == undefined) {
                break;
            }
            if (itemDivs[(i * 8) + j].options[itemDivs[(i * 8) + j].selectedIndex].value == "Blank") {
                continue;
            }
            tempitems.push(itemDivs[(i * 8) + j].options[itemDivs[(i * 8) + j].selectedIndex].value);
        }
        items.push(tempitems);
    }
    for (let i = 0; i < itemDivs.length; i++) {
        quants.push(parseInt(quantDivs[i].value));
    }
    if (seeConsoleLogs)
        console.log("items verifying are", items, "quants are", quants);
    if (items.length == 0) {
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Nothing selected to insert.\n\u200a\u200aTry selecting some items.", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        if (seeConsoleLogs)
            console.log("No items...");
        event.stopPropagation();
        return;
    }
    let curr = (parseInt(localStorage.getItem("BarrowsLogger/Count")) + 1).toString();
    let ele = document.getElementById("insertVerif_body");
    let container = document.createElement("div");
    container.setAttribute("class", 'historyDisplayContainer');
    container.setAttribute('id', 'container' + curr);
    let customSpan = document.createElement("span");
    customSpan.setAttribute("class", "customSpan");
    customSpan.setAttribute("title", "Custom clue manually inserted.");
    customSpan.textContent = " [C] ";
    let countText = "barrows chest" + ": " + curr;
    let count = document.createElement("div");
    count.innerHTML = countText;
    count.setAttribute('class', 'historyCount');
    count.append(customSpan);
    container.append(count);
    let value = document.createElement("div");
    value.textContent = "Reward Value: " + totalPrice.toLocaleString("en-US");
    value.setAttribute('class', 'historyValue');
    container.append(value);
    // Adjust this for larger windows. I want 12 cause barrows.
    let cap = 12;
    let TPcheck = false;
    for (let j = 0; j < 4; j++) { // Navigating temp
        for (let k = 0; k < 8; k++) {
            if (items[j][k] == "Blank" || items[j][k] == undefined) {
                if (TPcheck) {
                    break;
                }
                for (let l = (j * 8) + k; l < cap; l++) {
                    let nodevar = document.createElement("itembox");
                    let imgvar = document.createElement("img");
                    let quantvar = document.createElement("span");
                    imgvar = imgMaker("Transparent");
                    nodevar.setAttribute("class", "node_history");
                    nodevar.removeAttribute("title");
                    quantvar.textContent = "";
                    nodevar.append(imgvar);
                    nodevar.append(quantvar);
                    container.append(nodevar);
                }
                TPcheck = true;
                break;
            }
            let nodevar = document.createElement("itembox");
            let imgvar = document.createElement("img");
            let quantvar = document.createElement("span");
            // Note for later. Figure out why insert isnt displaying properly...
            if (quants[(j * 8) + k] === undefined) {
                imgvar = imgMaker("Transparent");
                nodevar.setAttribute("class", "node_history");
                nodevar.removeAttribute("title");
                quantvar.textContent = "";
            }
            else {
                imgvar = imgMaker(items[j][k]);
                nodevar = nodeMaker(parseInt(quants[(j * 8) + k]), items[j][k], "history");
                quantvar = quantMaker(quants[(j * 8) + k]);
            }
            nodevar.append(imgvar);
            nodevar.append(quantvar);
            container.append(nodevar);
        }
    }
    let buttonbox = document.createElement("div");
    let button = document.createElement("div");
    buttonbox.setAttribute('class', 'buttonboxHistory');
    buttonbox.setAttribute('id', 'container' + curr + 'buttonbox');
    button.setAttribute('class', 'nisbutton historyButtonStyle');
    button.setAttribute('id', 'container' + curr + 'button');
    button.textContent = "Sample";
    insertVerif = [items, quants, totalPrice, "reward: [C] "];
    buttonbox.append(button);
    container.append(buttonbox);
    ele.append(container);
    if (seeConsoleLogs)
        console.log("Insert collected");
}
function insertToDB() {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Submitting custom clue to Database...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 40000, "", true, true);
    }
    let items = insertVerif[0];
    for (let i = 0; i < 4; i++) {
        for (let j = items[i].length; j < 8; j++) {
            items[i].push("Blank");
        }
    }
    console.log(items);
    let quants = [];
    for (let i = 0; i < insertVerif[1].length; i++) {
        quants.push(insertVerif[1][i].toString());
    }
    for (let i = quants.length; i < cap; i++) {
        quants.push("0");
    }
    let value = insertVerif[2];
    let tier = insertVerif[3];
    insertInit();
    submitToLS(items, quants, parseInt(value));
    addHistoryToLs(parseInt(value), items, quants, tier);
    lootDisplay();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Custom Barrows chest submitted successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
    }
}
function settingsInit() {
    if (seeConsoleLogs)
        console.log("Initializing settings...");
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for Algorithm: " + localStorage.getItem("BarrowsLogger/Algorithm") + "...");
    let temp = localStorage.getItem("BarrowsLogger/Algorithm");
    let ele = document.getElementById(temp);
    ele.checked = true;
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for lagDetect: " + localStorage.getItem("BarrowsLogger/lagDetect") + "...");
    if (localStorage.getItem("BarrowsLogger/lagDetect") == "true") {
        ele = document.getElementById("lagon");
        ele.checked = true;
    }
    else if (localStorage.getItem("BarrowsLogger/lagDetect") == "false") {
        ele = document.getElementById("lagoff");
        ele.checked = true;
    }
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for MultiButtonPressDetect: " + localStorage.getItem("BarrowsLogger/multiButtonPressDetect") + "...");
    if (localStorage.getItem("BarrowsLogger/multiButtonPressDetect") == "true") {
        ele = document.getElementById("multion");
        ele.checked = true;
    }
    else if (localStorage.getItem("BarrowsLogger/multiButtonPressDetect") == "false") {
        ele = document.getElementById("multioff");
        ele.checked = true;
    }
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for noMenu: " + localStorage.getItem("BarrowsLogger/noMenu") + "...");
    if (localStorage.getItem("BarrowsLogger/noMenu") == "true") {
        ele = document.getElementById("menuon");
        ele.checked = true;
    }
    else if (localStorage.getItem("BarrowsLogger/noMenu") == "false") {
        ele = document.getElementById("menuoff");
        ele.checked = true;
    }
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for hybridPrecision: " + localStorage.getItem("BarrowsLogger/hybridPrecision") + "...");
    ele = document.getElementById("hybrid_precision");
    ele.value = localStorage.getItem("BarrowsLogger/hybridPrecision");
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for HistoryDisplayLimit: " + localStorage.getItem("BarrowsLogger/HistoryDisplayLimit") + "...");
    ele = document.getElementById("history_display_limit");
    ele.value = localStorage.getItem("BarrowsLogger/HistoryDisplayLimit");
    if (seeConsoleLogs)
        console.log("Settings initialized!");
}
async function saveSettings(alg, lag, multi, menu, precision, limit) {
    buttonDisabler();
    if (seeConsoleLogs)
        console.log("Saving settings...");
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Saving settings...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
    }
    localStorage.setItem("BarrowsLogger/Algorithm", alg);
    localStorage.setItem("BarrowsLogger/lagDetect", lag);
    localStorage.setItem("BarrowsLogger/hybridPrecision", precision);
    localStorage.setItem("BarrowsLogger/HistoryDisplayLimit", limit);
    if (localStorage.getItem("BarrowsLogger/multiButtonPressDetect") !== multi) {
        localStorage.setItem("BarrowsLogger/multiButtonPressDetect", multi);
        if (seeConsoleLogs)
            console.log("Adjusting saved values");
        if (multi === "true") {
            if (localStorage.getItem("BarrowsLogger/autoCapture") === "true") {
                document.getElementById("docapturebutton").setAttribute("onclick", "");
                document.getElementById("docapturebutton").setAttribute("title", "Disable autocapture to use this button");
                document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
            }
        }
        else if (multi === "false") {
            if (localStorage.getItem("BarrowsLogger/autoCapture") === "true") {
                document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
                document.getElementById("docapturebutton").setAttribute("title", "");
                document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
            }
            else {
                document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
                document.getElementById("docapturebutton").setAttribute("title", "");
                document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
            }
        }
    }
    if (localStorage.getItem("BarrowsLogger/noMenu") !== menu) {
        localStorage.setItem("BarrowsLogger/noMenu", menu);
        noMenuCheck();
    }
    historyClear();
    historyInit();
    settingsInit();
    await arraySetup();
    buttonEnabler();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Settings saved!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    if (seeConsoleLogs)
        console.log("Settings saved!");
}
function autoDisableCheckAuto(event) {
    if (document.getElementById("toggleunlocktrack").classList.contains("enabled")) {
        toggleCapture(event);
    }
}
function toggleCapture(event) {
    if (document.getElementById("toggleunlocktrack").classList.contains("enabled")) {
        document.getElementById("toggleunlocktrack").classList.remove("enabled");
        localStorage.setItem("BarrowsLogger/autoCapture", "false");
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Autocapture disabled!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
        }
    }
    else {
        document.getElementById("toggleunlocktrack").classList.add("enabled");
        localStorage.setItem("BarrowsLogger/autoCapture", "true");
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Autocapture enabled!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
        }
    }
    autoCheck();
    if (event != undefined) {
        event.stopPropagation();
    }
}
function autoCheck() {
    if (localStorage.getItem("BarrowsLogger/autoCapture") === "true") {
        if (localStorage.getItem("BarrowsLogger/multiButtonPressDetect") === "true") {
            document.getElementById("docapturebutton").setAttribute("onclick", "");
            document.getElementById("docapturebutton").setAttribute("title", "Disable autocapture to use this button");
            document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
        }
        autoCaptureInterval = window.setInterval(async function () {
            let promises = [];
            promises.push(await autoCallCapture());
            await Promise.all(promises);
        }, 1000);
    }
    else {
        if (localStorage.getItem("BarrowsLogger/multiButtonPressDetect") === "true") {
            document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
            document.getElementById("docapturebutton").setAttribute("title", "");
            document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
        }
        window.clearInterval(autoCaptureInterval);
        autoCaptureInterval = null;
    }
}
function autoCallCapture() {
    capture(true);
}
function noMenuCheck() {
    if (localStorage.getItem("BarrowsLogger/noMenu") === "true") {
        noMenuInterval = window.setInterval(async function () {
            let img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
            let loc = img.findSubimage(imgs.barrowsChest);
            let rewardreader = new _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_3__["default"]();
            rewardreader.pos = _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_4__.ModalUIReader.find()[0];
            let value = rewardreader.read(img).value;
            let length = value.toString().length;
            let comma = Math.floor(length / 3);
            if (seeConsoleLogs)
                console.log("Highlighting value...");
            if (window.alt1) {
                alt1.overLayClearGroup("nomenu");
                alt1.overLaySetGroup("nomenu");
                alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 50, 50), loc[0].x + 301 - (5 * length) + (1 * comma), loc[0].y + 218, 2 + (8 * length) + (4 * comma), imgs.barrowsChest.height + 6, 60000, 2);
                alt1.overLayTextEx("NO MENUS HERE", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 50, 50), 10, loc[0].x + 301, loc[0].y + 242, 50000, "", true, true);
            }
        }, 1000);
    }
    else {
        if (window.alt1) {
            alt1.overLayClearGroup("nomenu");
        }
        window.clearInterval(noMenuInterval);
        noMenuInterval = null;
    }
}
function exporttocsv() {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Generating CSV...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    let csvinfo = [];
    csvinfo.push(["Item", "Quantities"]);
    let lsHistory = JSON.parse(localStorage.getItem("BarrowsLogger/History"));
    let keys = Object.keys(items);
    let currOrder = 1;
    if (seeConsoleLogs)
        console.log("Generating CSV...");
    if (seeConsoleLogs)
        console.log("Getting values and counts...");
    let count = localStorage.getItem("BarrowsLogger/Count");
    let value = localStorage.getItem("BarrowsLogger/Value");
    csvinfo.push(["Total Count", "\"" + count + "\""]);
    csvinfo.push(["Total Value", "\"" + value + "\""]);
    if (seeConsoleLogs)
        console.log("Getting item quantities...");
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            if (items[keys[j]].order == currOrder.toString()) {
                let val = items[keys[j]];
                let quant = val.quantity;
                if (quant == undefined || quant == "0") { // .toLocaleString("en-US")
                    quant = "";
                }
                else {
                    quant = "\"" + quant.toLocaleString("en-US") + "\"";
                }
                csvinfo.push([keys[j], quant]);
                currOrder++;
                break;
            }
        }
    }
    csvinfo.push([]);
    csvinfo.push([]);
    csvinfo.push(["Captured Rewards History", 'Parse tier at " : " and " [C] "', 'Parse items at " x "']);
    csvinfo.push(["Rewards Tier & Count", "Reward Value", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10", "Item 11", "Item 12"]);
    console.log(lsHistory);
    if (seeConsoleLogs)
        console.log("Setting history in csv...");
    for (let i = 0; i < lsHistory.length; i++) {
        let temp = [lsHistory[i][3] + " : " + lsHistory[i][4], lsHistory[i][2]];
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 8; k++) {
                if (lsHistory[i][0][(j * 8) + k] == undefined || lsHistory[i][0][(j * 8) + k] === "Blank") {
                    temp.push("");
                }
                else {
                    temp.push(lsHistory[i][1][(j * 8) + k] + " x " + lsHistory[i][0][(j * 8) + k]);
                }
            }
        }
        csvinfo.push(temp);
    }
    const d = new Date();
    let csvContent = "";
    csvinfo.forEach(function (i) {
        let row = i.join(",");
        csvContent += row + "\r\n";
    });
    let filename = "BarrowsLogger CSV " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "_" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds() + ".csv";
    let encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Required for FF
    link.click();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("CSV Generated!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
}
function nodeMaker(quant, item, attribute) {
    let nodevar = document.createElement("itembox");
    if (attribute === "tab") {
        nodevar.setAttribute("class", "node_tab");
        nodevar.setAttribute('style', 'order: ' + orderChecker(parseInt(items[item].order), item) + ';');
    }
    else if (attribute === "history") {
        nodevar.setAttribute("class", "node_history");
    }
    else if (attribute === "recent") {
        nodevar.setAttribute("class", "node_recent");
    }
    nodevar.setAttribute('title', quant.toLocaleString("en-US") + " x " + item);
    return nodevar;
}
function imgMaker(item) {
    let imgvar = document.createElement("img");
    imgvar.src = encodeURI("./images/items/" + item + ".png");
    imgvar.setAttribute('style', 'margin:auto;');
    imgvar.ondragstart = function () { return false; };
    return imgvar;
}
function quantMaker(quant) {
    let quantvar = document.createElement("span");
    if (quant > 9999999 || quant < -9999999) {
        quantvar.setAttribute('class', 'quant_green_text');
        quantvar.textContent = Math.trunc(quant / 1000000).toString() + "M";
    }
    else if (quant > 99999 || quant > 9999 || quant < -9999 || quant < -99999) {
        quantvar.setAttribute('class', 'quant_white_text');
        quantvar.textContent = Math.trunc(quant / 1000).toString() + "k";
    }
    else {
        quantvar.setAttribute('class', 'quant_yellow_text');
        quantvar.textContent = quant + "";
    }
    return quantvar;
}
function removeChildNodes(div) {
    while (div.firstChild) {
        div.firstChild.remove();
    }
}
function _base64ToImageData(buffer, width, height) {
    return new Promise(resolve => {
        let image = new Image();
        image.addEventListener('load', function (e) {
            let canvasElement = document.createElement('canvas');
            canvasElement.width = width;
            canvasElement.height = height;
            let context = canvasElement.getContext('2d');
            context.drawImage(e.target, 0, 0, width, height);
            resolve(context.getImageData(0, 0, width, height));
        });
        image.src = buffer;
    });
}
function toggleLootDisplay(id) {
    let lootdisplay = Array.from(document.getElementsByClassName('loot_display'));
    let tab = document.getElementById(id);
    if (id == "equipment_rewards") {
        lootdisplay[0].style.display = (lootdisplay[0].style.display == 'flex') ? 'none' : 'flex';
        tab.style.textDecoration = (lootdisplay[0].style.display == 'flex') ? 'none' : 'line-through';
        tab.title = (lootdisplay[0].style.display == 'flex') ? 'Click here to hide broadcast rewards' : 'Click here to show broadcast rewards';
        opentabs[0] = (lootdisplay[0].style.display == 'flex') ? true : false;
    }
    else if (id == "general_rewards") {
        lootdisplay[1].style.display = (lootdisplay[1].style.display == 'flex') ? 'none' : 'flex';
        tab.style.textDecoration = (lootdisplay[1].style.display == 'flex') ? 'none' : 'line-through';
        tab.title = (lootdisplay[1].style.display == 'flex') ? 'Click here to hide general rewards' : 'Click here to show general rewards';
        opentabs[1] = (lootdisplay[1].style.display == 'flex') ? true : false;
    }
    if (seeConsoleLogs)
        console.log(opentabs);
    let truecount = 0;
    for (let i = 0; i < opentabs.length; i++) {
        if (opentabs[i] == true) {
            truecount++;
        }
    }
    if (seeConsoleLogs)
        console.log(truecount);
    let minH = 0;
    if (truecount == 2) {
        minH = 50;
    }
    // Tinker with this. 
    // If you want to change the min heights for each thing, 
    // change variables starting below here
    if (truecount == 1) {
        minH = 75;
    }
    if (opentabs[0]) {
        Array.from(document.getElementsByClassName('equipment'))[0].style.minHeight = minH + "%";
    }
    else {
        Array.from(document.getElementsByClassName('equipment'))[0].style.minHeight = "8%";
    }
    if (opentabs[1]) {
        Array.from(document.getElementsByClassName('general'))[0].style.minHeight = minH + "%";
    }
    else {
        Array.from(document.getElementsByClassName('general'))[0].style.minHeight = "8%";
    }
}
function updateItems() {
    localStorage.setItem("BarrowsLogger/items", JSON.stringify(items));
}
function orderChecker(order, item) {
    if (item == "Coins") {
        order = 1;
    }
    // Relics of OpenLogger
    else if (item == "Guido's bonfire in a bottle") {
        order = 989;
    }
    else if (item == "Bonus XP star (small)") {
        order = 990;
    }
    else if (item == "Bonus XP star (medium)") {
        order = 991;
    }
    else if (item == "Bonus XP star (large)") {
        order = 992;
    }
    else if (item == "Bonus XP star (huge)") {
        order = 993;
    }
    else if (item == "Re-roll token (easy)") {
        order = 994;
    }
    else if (item == "Re-roll token (medium)") {
        order = 995;
    }
    else if (item == "Re-roll token (hard)") {
        order = 996;
    }
    else if (item == "Re-roll token (elite)") {
        order = 997;
    }
    else if (item == "Re-roll token (master)") {
        order = 998;
    }
    else if (item == "Sealed clue scroll (master)") {
        order = 999;
    }
    else if (item == "Reward casket (easy)") {
        order = 1000;
    }
    else if (item == "Reward casket (medium)") {
        order = 1001;
    }
    else if (item == "Reward casket (hard)") {
        order = 1002;
    }
    else if (item == "Reward casket (elite)") {
        order = 1003;
    }
    else if (item == "Golden compass") {
        order = 1004;
    }
    return order;
}
function buttonDisabler() {
    if (localStorage.getItem("BarrowsLogger/autoCapture") !== "true") {
        document.getElementById("docapturebutton").setAttribute("title", "Currently disabled to due initialization, settings being saved, or autocapture");
        document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
        document.getElementById("docapturebutton").setAttribute("onclick", "");
    }
    document.getElementById("toggleunlocktrack").setAttribute("onclick", "");
    buttonDisabletoggle = false;
}
function buttonEnabler() {
    if (localStorage.getItem("BarrowsLogger/autoCapture") !== "true") {
        document.getElementById("docapturebutton").setAttribute("title", "");
        document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
        document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
    }
    document.getElementById("toggleunlocktrack").setAttribute("onclick", "TEST.toggleCapture(event)");
    buttonDisabletoggle = true;
}
//print text world
//also the worst possible example of how to use global exposed exports as described in webpack.config.json
//output.insertAdjacentHTML("beforeend", `
//	<div>paste an image of rs with homeport button (or not)</div>
//	<div onclick='TEST.capture()'>Click to capture if on alt1</div>`
//);
//check if we are running inside alt1 by checking if the alt1 global exists
if (window.alt1) {
    //tell alt1 about the app
    //this makes alt1 show the add app button when running inside the embedded browser
    //also updates app settings if they are changed
    alt1.identifyAppUrl("./appconfig.json");
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
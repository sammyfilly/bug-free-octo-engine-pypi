(()=>{var e={237:(e,n)=>{class ArraySet{constructor(){this._array=[];this._set=new Map}static fromArray(e,n){const t=new ArraySet;for(let r=0,o=e.length;r<o;r++){t.add(e[r],n)}return t}size(){return this._set.size}add(e,n){const t=this.has(e);const r=this._array.length;if(!t||n){this._array.push(e)}if(!t){this._set.set(e,r)}}has(e){return this._set.has(e)}indexOf(e){const n=this._set.get(e);if(n>=0){return n}throw new Error('"'+e+'" is not in the set.')}at(e){if(e>=0&&e<this._array.length){return this._array[e]}throw new Error("No element indexed by "+e)}toArray(){return this._array.slice()}}n.I=ArraySet},717:(e,n,t)=>{const r=t(244);const o=5;const s=1<<o;const i=s-1;const l=s;function toVLQSigned(e){return e<0?(-e<<1)+1:(e<<1)+0}function fromVLQSigned(e){const n=(e&1)===1;const t=e>>1;return n?-t:t}n.encode=function base64VLQ_encode(e){let n="";let t;let s=toVLQSigned(e);do{t=s&i;s>>>=o;if(s>0){t|=l}n+=r.encode(t)}while(s>0);return n}},244:(e,n)=>{const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");n.encode=function(e){if(0<=e&&e<t.length){return t[e]}throw new TypeError("Must be between 0 and 63: "+e)}},797:(e,n)=>{n.GREATEST_LOWER_BOUND=1;n.LEAST_UPPER_BOUND=2;function recursiveSearch(e,t,r,o,s,i){const l=Math.floor((t-e)/2)+e;const a=s(r,o[l],true);if(a===0){return l}else if(a>0){if(t-l>1){return recursiveSearch(l,t,r,o,s,i)}if(i==n.LEAST_UPPER_BOUND){return t<o.length?t:-1}return l}if(l-e>1){return recursiveSearch(e,l,r,o,s,i)}if(i==n.LEAST_UPPER_BOUND){return l}return e<0?-1:e}n.search=function search(e,t,r,o){if(t.length===0){return-1}let s=recursiveSearch(-1,t.length,e,t,r,o||n.GREATEST_LOWER_BOUND);if(s<0){return-1}while(s-1>=0){if(r(t[s],t[s-1],true)!==0){break}--s}return s}},167:(e,n,t)=>{const r=t(521);function generatedPositionAfter(e,n){const t=e.generatedLine;const o=n.generatedLine;const s=e.generatedColumn;const i=n.generatedColumn;return o>t||o==t&&i>=s||r.compareByGeneratedPositionsInflated(e,n)<=0}class MappingList{constructor(){this._array=[];this._sorted=true;this._last={generatedLine:-1,generatedColumn:0}}unsortedForEach(e,n){this._array.forEach(e,n)}add(e){if(generatedPositionAfter(this._last,e)){this._last=e;this._array.push(e)}else{this._sorted=false;this._array.push(e)}}toArray(){if(!this._sorted){this._array.sort(r.compareByGeneratedPositionsInflated);this._sorted=true}return this._array}}n.H=MappingList},520:(e,n,t)=>{"use strict";const r=t(147);const o=t(17);e.exports=function readWasm(){return new Promise(((e,n)=>{const o=t.ab+"mappings.wasm";r.readFile(t.ab+"mappings.wasm",null,((t,r)=>{if(t){n(t);return}e(r.buffer)}))}))};e.exports.initialize=e=>{console.debug("SourceMapConsumer.initialize is a no-op when running in node.js")}},494:(e,n,t)=>{var r;const o=t(521);const s=t(797);const i=t(237).I;const l=t(717);const a=t(520);const u=t(734);const c=Symbol("smcInternal");class SourceMapConsumer{constructor(e,n){if(e==c){return Promise.resolve(this)}return _factory(e,n)}static initialize(e){a.initialize(e["lib/mappings.wasm"])}static fromSourceMap(e,n){return _factoryBSM(e,n)}static async with(e,n,t){const r=await new SourceMapConsumer(e,n);try{return await t(r)}finally{r.destroy()}}eachMapping(e,n,t){throw new Error("Subclasses must implement eachMapping")}allGeneratedPositionsFor(e){throw new Error("Subclasses must implement allGeneratedPositionsFor")}destroy(){throw new Error("Subclasses must implement destroy")}}SourceMapConsumer.prototype._version=3;SourceMapConsumer.GENERATED_ORDER=1;SourceMapConsumer.ORIGINAL_ORDER=2;SourceMapConsumer.GREATEST_LOWER_BOUND=1;SourceMapConsumer.LEAST_UPPER_BOUND=2;n.SourceMapConsumer=SourceMapConsumer;class BasicSourceMapConsumer extends SourceMapConsumer{constructor(e,n){return super(c).then((t=>{let r=e;if(typeof e==="string"){r=o.parseSourceMapInput(e)}const s=o.getArg(r,"version");const l=o.getArg(r,"sources").map(String);const a=o.getArg(r,"names",[]);const c=o.getArg(r,"sourceRoot",null);const g=o.getArg(r,"sourcesContent",null);const f=o.getArg(r,"mappings");const h=o.getArg(r,"file",null);if(s!=t._version){throw new Error("Unsupported version: "+s)}t._sourceLookupCache=new Map;t._names=i.fromArray(a.map(String),true);t._sources=i.fromArray(l,true);t._absoluteSources=i.fromArray(t._sources.toArray().map((function(e){return o.computeSourceURL(c,e,n)})),true);t.sourceRoot=c;t.sourcesContent=g;t._mappings=f;t._sourceMapURL=n;t.file=h;t._computedColumnSpans=false;t._mappingsPtr=0;t._wasm=null;return u().then((e=>{t._wasm=e;return t}))}))}_findSourceIndex(e){const n=this._sourceLookupCache.get(e);if(typeof n==="number"){return n}const t=o.computeSourceURL(null,e,this._sourceMapURL);if(this._absoluteSources.has(t)){const n=this._absoluteSources.indexOf(t);this._sourceLookupCache.set(e,n);return n}const r=o.computeSourceURL(this.sourceRoot,e,this._sourceMapURL);if(this._absoluteSources.has(r)){const n=this._absoluteSources.indexOf(r);this._sourceLookupCache.set(e,n);return n}return-1}static fromSourceMap(e,n){return new BasicSourceMapConsumer(e.toString())}get sources(){return this._absoluteSources.toArray()}_getMappingsPtr(){if(this._mappingsPtr===0){this._parseMappings()}return this._mappingsPtr}_parseMappings(){const e=this._mappings;const n=e.length;const t=this._wasm.exports.allocate_mappings(n);const r=new Uint8Array(this._wasm.exports.memory.buffer,t,n);for(let t=0;t<n;t++){r[t]=e.charCodeAt(t)}const o=this._wasm.exports.parse_mappings(t);if(!o){const e=this._wasm.exports.get_last_error();let n=`Error parsing mappings (code ${e}): `;switch(e){case 1:n+="the mappings contained a negative line, column, source index, or name index";break;case 2:n+="the mappings contained a number larger than 2**32";break;case 3:n+="reached EOF while in the middle of parsing a VLQ";break;case 4:n+="invalid base 64 character while parsing a VLQ";break;default:n+="unknown error code";break}throw new Error(n)}this._mappingsPtr=o}eachMapping(e,n,t){const r=n||null;const o=t||SourceMapConsumer.GENERATED_ORDER;this._wasm.withMappingCallback((n=>{if(n.source!==null){n.source=this._absoluteSources.at(n.source);if(n.name!==null){n.name=this._names.at(n.name)}}if(this._computedColumnSpans&&n.lastGeneratedColumn===null){n.lastGeneratedColumn=Infinity}e.call(r,n)}),(()=>{switch(o){case SourceMapConsumer.GENERATED_ORDER:this._wasm.exports.by_generated_location(this._getMappingsPtr());break;case SourceMapConsumer.ORIGINAL_ORDER:this._wasm.exports.by_original_location(this._getMappingsPtr());break;default:throw new Error("Unknown order of iteration.")}}))}allGeneratedPositionsFor(e){let n=o.getArg(e,"source");const t=o.getArg(e,"line");const r=e.column||0;n=this._findSourceIndex(n);if(n<0){return[]}if(t<1){throw new Error("Line numbers must be >= 1")}if(r<0){throw new Error("Column numbers must be >= 0")}const s=[];this._wasm.withMappingCallback((e=>{let n=e.lastGeneratedColumn;if(this._computedColumnSpans&&n===null){n=Infinity}s.push({line:e.generatedLine,column:e.generatedColumn,lastColumn:n})}),(()=>{this._wasm.exports.all_generated_locations_for(this._getMappingsPtr(),n,t-1,"column"in e,r)}));return s}destroy(){if(this._mappingsPtr!==0){this._wasm.exports.free_mappings(this._mappingsPtr);this._mappingsPtr=0}}computeColumnSpans(){if(this._computedColumnSpans){return}this._wasm.exports.compute_column_spans(this._getMappingsPtr());this._computedColumnSpans=true}originalPositionFor(e){const n={generatedLine:o.getArg(e,"line"),generatedColumn:o.getArg(e,"column")};if(n.generatedLine<1){throw new Error("Line numbers must be >= 1")}if(n.generatedColumn<0){throw new Error("Column numbers must be >= 0")}let t=o.getArg(e,"bias",SourceMapConsumer.GREATEST_LOWER_BOUND);if(t==null){t=SourceMapConsumer.GREATEST_LOWER_BOUND}let r;this._wasm.withMappingCallback((e=>r=e),(()=>{this._wasm.exports.original_location_for(this._getMappingsPtr(),n.generatedLine-1,n.generatedColumn,t)}));if(r){if(r.generatedLine===n.generatedLine){let e=o.getArg(r,"source",null);if(e!==null){e=this._absoluteSources.at(e)}let n=o.getArg(r,"name",null);if(n!==null){n=this._names.at(n)}return{source:e,line:o.getArg(r,"originalLine",null),column:o.getArg(r,"originalColumn",null),name:n}}}return{source:null,line:null,column:null,name:null}}hasContentsOfAllSources(){if(!this.sourcesContent){return false}return this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some((function(e){return e==null}))}sourceContentFor(e,n){if(!this.sourcesContent){return null}const t=this._findSourceIndex(e);if(t>=0){return this.sourcesContent[t]}if(n){return null}throw new Error('"'+e+'" is not in the SourceMap.')}generatedPositionFor(e){let n=o.getArg(e,"source");n=this._findSourceIndex(n);if(n<0){return{line:null,column:null,lastColumn:null}}const t={source:n,originalLine:o.getArg(e,"line"),originalColumn:o.getArg(e,"column")};if(t.originalLine<1){throw new Error("Line numbers must be >= 1")}if(t.originalColumn<0){throw new Error("Column numbers must be >= 0")}let r=o.getArg(e,"bias",SourceMapConsumer.GREATEST_LOWER_BOUND);if(r==null){r=SourceMapConsumer.GREATEST_LOWER_BOUND}let s;this._wasm.withMappingCallback((e=>s=e),(()=>{this._wasm.exports.generated_location_for(this._getMappingsPtr(),t.source,t.originalLine-1,t.originalColumn,r)}));if(s){if(s.source===t.source){let e=s.lastGeneratedColumn;if(this._computedColumnSpans&&e===null){e=Infinity}return{line:o.getArg(s,"generatedLine",null),column:o.getArg(s,"generatedColumn",null),lastColumn:e}}}return{line:null,column:null,lastColumn:null}}}BasicSourceMapConsumer.prototype.consumer=SourceMapConsumer;r=BasicSourceMapConsumer;class IndexedSourceMapConsumer extends SourceMapConsumer{constructor(e,n){return super(c).then((t=>{let r=e;if(typeof e==="string"){r=o.parseSourceMapInput(e)}const s=o.getArg(r,"version");const i=o.getArg(r,"sections");if(s!=t._version){throw new Error("Unsupported version: "+s)}let l={line:-1,column:0};return Promise.all(i.map((e=>{if(e.url){throw new Error("Support for url field in sections not implemented.")}const t=o.getArg(e,"offset");const r=o.getArg(t,"line");const s=o.getArg(t,"column");if(r<l.line||r===l.line&&s<l.column){throw new Error("Section offsets must be ordered and non-overlapping.")}l=t;const i=new SourceMapConsumer(o.getArg(e,"map"),n);return i.then((e=>({generatedOffset:{generatedLine:r+1,generatedColumn:s+1},consumer:e})))}))).then((e=>{t._sections=e;return t}))}))}get sources(){const e=[];for(let n=0;n<this._sections.length;n++){for(let t=0;t<this._sections[n].consumer.sources.length;t++){e.push(this._sections[n].consumer.sources[t])}}return e}originalPositionFor(e){const n={generatedLine:o.getArg(e,"line"),generatedColumn:o.getArg(e,"column")};const t=s.search(n,this._sections,(function(e,n){const t=e.generatedLine-n.generatedOffset.generatedLine;if(t){return t}return e.generatedColumn-n.generatedOffset.generatedColumn}));const r=this._sections[t];if(!r){return{source:null,line:null,column:null,name:null}}return r.consumer.originalPositionFor({line:n.generatedLine-(r.generatedOffset.generatedLine-1),column:n.generatedColumn-(r.generatedOffset.generatedLine===n.generatedLine?r.generatedOffset.generatedColumn-1:0),bias:e.bias})}hasContentsOfAllSources(){return this._sections.every((function(e){return e.consumer.hasContentsOfAllSources()}))}sourceContentFor(e,n){for(let n=0;n<this._sections.length;n++){const t=this._sections[n];const r=t.consumer.sourceContentFor(e,true);if(r){return r}}if(n){return null}throw new Error('"'+e+'" is not in the SourceMap.')}_findSectionIndex(e){for(let n=0;n<this._sections.length;n++){const{consumer:t}=this._sections[n];if(t._findSourceIndex(e)!==-1){return n}}return-1}generatedPositionFor(e){const n=this._findSectionIndex(o.getArg(e,"source"));const t=n>=0?this._sections[n]:null;const r=n>=0&&n+1<this._sections.length?this._sections[n+1]:null;const s=t&&t.consumer.generatedPositionFor(e);if(s&&s.line!==null){const e=t.generatedOffset.generatedLine-1;const n=t.generatedOffset.generatedColumn-1;if(s.line===1){s.column+=n;if(typeof s.lastColumn==="number"){s.lastColumn+=n}}if(s.lastColumn===Infinity&&r&&s.line===r.generatedOffset.generatedLine){s.lastColumn=r.generatedOffset.generatedColumn-2}s.line+=e;return s}return{line:null,column:null,lastColumn:null}}allGeneratedPositionsFor(e){const n=this._findSectionIndex(o.getArg(e,"source"));const t=n>=0?this._sections[n]:null;const r=n>=0&&n+1<this._sections.length?this._sections[n+1]:null;if(!t)return[];return t.consumer.allGeneratedPositionsFor(e).map((e=>{const n=t.generatedOffset.generatedLine-1;const o=t.generatedOffset.generatedColumn-1;if(e.line===1){e.column+=o;if(typeof e.lastColumn==="number"){e.lastColumn+=o}}if(e.lastColumn===Infinity&&r&&e.line===r.generatedOffset.generatedLine){e.lastColumn=r.generatedOffset.generatedColumn-2}e.line+=n;return e}))}eachMapping(e,n,t){this._sections.forEach(((r,o)=>{const s=o+1<this._sections.length?this._sections[o+1]:null;const{generatedOffset:i}=r;const l=i.generatedLine-1;const a=i.generatedColumn-1;r.consumer.eachMapping((function(n){if(n.generatedLine===1){n.generatedColumn+=a;if(typeof n.lastGeneratedColumn==="number"){n.lastGeneratedColumn+=a}}if(n.lastGeneratedColumn===Infinity&&s&&n.generatedLine===s.generatedOffset.generatedLine){n.lastGeneratedColumn=s.generatedOffset.generatedColumn-2}n.generatedLine+=l;e.call(this,n)}),n,t)}))}computeColumnSpans(){for(let e=0;e<this._sections.length;e++){this._sections[e].consumer.computeColumnSpans()}}destroy(){for(let e=0;e<this._sections.length;e++){this._sections[e].consumer.destroy()}}}r=IndexedSourceMapConsumer;function _factory(e,n){let t=e;if(typeof e==="string"){t=o.parseSourceMapInput(e)}const r=t.sections!=null?new IndexedSourceMapConsumer(t,n):new BasicSourceMapConsumer(t,n);return Promise.resolve(r)}function _factoryBSM(e,n){return BasicSourceMapConsumer.fromSourceMap(e,n)}},491:(e,n,t)=>{const r=t(717);const o=t(521);const s=t(237).I;const i=t(167).H;class SourceMapGenerator{constructor(e){if(!e){e={}}this._file=o.getArg(e,"file",null);this._sourceRoot=o.getArg(e,"sourceRoot",null);this._skipValidation=o.getArg(e,"skipValidation",false);this._sources=new s;this._names=new s;this._mappings=new i;this._sourcesContents=null}static fromSourceMap(e){const n=e.sourceRoot;const t=new SourceMapGenerator({file:e.file,sourceRoot:n});e.eachMapping((function(e){const r={generated:{line:e.generatedLine,column:e.generatedColumn}};if(e.source!=null){r.source=e.source;if(n!=null){r.source=o.relative(n,r.source)}r.original={line:e.originalLine,column:e.originalColumn};if(e.name!=null){r.name=e.name}}t.addMapping(r)}));e.sources.forEach((function(r){let s=r;if(n!==null){s=o.relative(n,r)}if(!t._sources.has(s)){t._sources.add(s)}const i=e.sourceContentFor(r);if(i!=null){t.setSourceContent(r,i)}}));return t}addMapping(e){const n=o.getArg(e,"generated");const t=o.getArg(e,"original",null);let r=o.getArg(e,"source",null);let s=o.getArg(e,"name",null);if(!this._skipValidation){this._validateMapping(n,t,r,s)}if(r!=null){r=String(r);if(!this._sources.has(r)){this._sources.add(r)}}if(s!=null){s=String(s);if(!this._names.has(s)){this._names.add(s)}}this._mappings.add({generatedLine:n.line,generatedColumn:n.column,originalLine:t!=null&&t.line,originalColumn:t!=null&&t.column,source:r,name:s})}setSourceContent(e,n){let t=e;if(this._sourceRoot!=null){t=o.relative(this._sourceRoot,t)}if(n!=null){if(!this._sourcesContents){this._sourcesContents=Object.create(null)}this._sourcesContents[o.toSetString(t)]=n}else if(this._sourcesContents){delete this._sourcesContents[o.toSetString(t)];if(Object.keys(this._sourcesContents).length===0){this._sourcesContents=null}}}applySourceMap(e,n,t){let r=n;if(n==null){if(e.file==null){throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, "+'or the source map\'s "file" property. Both were omitted.')}r=e.file}const i=this._sourceRoot;if(i!=null){r=o.relative(i,r)}const l=this._mappings.toArray().length>0?new s:this._sources;const a=new s;this._mappings.unsortedForEach((function(n){if(n.source===r&&n.originalLine!=null){const r=e.originalPositionFor({line:n.originalLine,column:n.originalColumn});if(r.source!=null){n.source=r.source;if(t!=null){n.source=o.join(t,n.source)}if(i!=null){n.source=o.relative(i,n.source)}n.originalLine=r.line;n.originalColumn=r.column;if(r.name!=null){n.name=r.name}}}const s=n.source;if(s!=null&&!l.has(s)){l.add(s)}const u=n.name;if(u!=null&&!a.has(u)){a.add(u)}}),this);this._sources=l;this._names=a;e.sources.forEach((function(n){const r=e.sourceContentFor(n);if(r!=null){if(t!=null){n=o.join(t,n)}if(i!=null){n=o.relative(i,n)}this.setSourceContent(n,r)}}),this)}_validateMapping(e,n,t,r){if(n&&typeof n.line!=="number"&&typeof n.column!=="number"){throw new Error("original.line and original.column are not numbers -- you probably meant to omit "+"the original mapping entirely and only map the generated position. If so, pass "+"null for the original mapping instead of an object with empty or null values.")}if(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0&&!n&&!t&&!r){}else if(e&&"line"in e&&"column"in e&&n&&"line"in n&&"column"in n&&e.line>0&&e.column>=0&&n.line>0&&n.column>=0&&t){}else{throw new Error("Invalid mapping: "+JSON.stringify({generated:e,source:t,original:n,name:r}))}}_serializeMappings(){let e=0;let n=1;let t=0;let s=0;let i=0;let l=0;let a="";let u;let c;let g;let f;const h=this._mappings.toArray();for(let p=0,m=h.length;p<m;p++){c=h[p];u="";if(c.generatedLine!==n){e=0;while(c.generatedLine!==n){u+=";";n++}}else if(p>0){if(!o.compareByGeneratedPositionsInflated(c,h[p-1])){continue}u+=","}u+=r.encode(c.generatedColumn-e);e=c.generatedColumn;if(c.source!=null){f=this._sources.indexOf(c.source);u+=r.encode(f-l);l=f;u+=r.encode(c.originalLine-1-s);s=c.originalLine-1;u+=r.encode(c.originalColumn-t);t=c.originalColumn;if(c.name!=null){g=this._names.indexOf(c.name);u+=r.encode(g-i);i=g}}a+=u}return a}_generateSourcesContent(e,n){return e.map((function(e){if(!this._sourcesContents){return null}if(n!=null){e=o.relative(n,e)}const t=o.toSetString(e);return Object.prototype.hasOwnProperty.call(this._sourcesContents,t)?this._sourcesContents[t]:null}),this)}toJSON(){const e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};if(this._file!=null){e.file=this._file}if(this._sourceRoot!=null){e.sourceRoot=this._sourceRoot}if(this._sourcesContents){e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)}return e}toString(){return JSON.stringify(this.toJSON())}}SourceMapGenerator.prototype._version=3;n.SourceMapGenerator=SourceMapGenerator},664:(e,n,t)=>{const r=t(491).SourceMapGenerator;const o=t(521);const s=/(\r?\n)/;const i=10;const l="$$$isSourceNode$$$";class SourceNode{constructor(e,n,t,r,o){this.children=[];this.sourceContents={};this.line=e==null?null:e;this.column=n==null?null:n;this.source=t==null?null:t;this.name=o==null?null:o;this[l]=true;if(r!=null)this.add(r)}static fromStringWithSourceMap(e,n,t){const r=new SourceNode;const i=e.split(s);let l=0;const shiftNextLine=function(){const e=getNextLine();const n=getNextLine()||"";return e+n;function getNextLine(){return l<i.length?i[l++]:undefined}};let a=1,u=0;let c=null;let g;n.eachMapping((function(e){if(c!==null){if(a<e.generatedLine){addMappingWithCode(c,shiftNextLine());a++;u=0}else{g=i[l]||"";const n=g.substr(0,e.generatedColumn-u);i[l]=g.substr(e.generatedColumn-u);u=e.generatedColumn;addMappingWithCode(c,n);c=e;return}}while(a<e.generatedLine){r.add(shiftNextLine());a++}if(u<e.generatedColumn){g=i[l]||"";r.add(g.substr(0,e.generatedColumn));i[l]=g.substr(e.generatedColumn);u=e.generatedColumn}c=e}),this);if(l<i.length){if(c){addMappingWithCode(c,shiftNextLine())}r.add(i.splice(l).join(""))}n.sources.forEach((function(e){const s=n.sourceContentFor(e);if(s!=null){if(t!=null){e=o.join(t,e)}r.setSourceContent(e,s)}}));return r;function addMappingWithCode(e,n){if(e===null||e.source===undefined){r.add(n)}else{const s=t?o.join(t,e.source):e.source;r.add(new SourceNode(e.originalLine,e.originalColumn,s,n,e.name))}}}add(e){if(Array.isArray(e)){e.forEach((function(e){this.add(e)}),this)}else if(e[l]||typeof e==="string"){if(e){this.children.push(e)}}else{throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e)}return this}prepend(e){if(Array.isArray(e)){for(let n=e.length-1;n>=0;n--){this.prepend(e[n])}}else if(e[l]||typeof e==="string"){this.children.unshift(e)}else{throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e)}return this}walk(e){let n;for(let t=0,r=this.children.length;t<r;t++){n=this.children[t];if(n[l]){n.walk(e)}else if(n!==""){e(n,{source:this.source,line:this.line,column:this.column,name:this.name})}}}join(e){let n;let t;const r=this.children.length;if(r>0){n=[];for(t=0;t<r-1;t++){n.push(this.children[t]);n.push(e)}n.push(this.children[t]);this.children=n}return this}replaceRight(e,n){const t=this.children[this.children.length-1];if(t[l]){t.replaceRight(e,n)}else if(typeof t==="string"){this.children[this.children.length-1]=t.replace(e,n)}else{this.children.push("".replace(e,n))}return this}setSourceContent(e,n){this.sourceContents[o.toSetString(e)]=n}walkSourceContents(e){for(let n=0,t=this.children.length;n<t;n++){if(this.children[n][l]){this.children[n].walkSourceContents(e)}}const n=Object.keys(this.sourceContents);for(let t=0,r=n.length;t<r;t++){e(o.fromSetString(n[t]),this.sourceContents[n[t]])}}toString(){let e="";this.walk((function(n){e+=n}));return e}toStringWithSourceMap(e){const n={code:"",line:1,column:0};const t=new r(e);let o=false;let s=null;let l=null;let a=null;let u=null;this.walk((function(e,r){n.code+=e;if(r.source!==null&&r.line!==null&&r.column!==null){if(s!==r.source||l!==r.line||a!==r.column||u!==r.name){t.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:n.line,column:n.column},name:r.name})}s=r.source;l=r.line;a=r.column;u=r.name;o=true}else if(o){t.addMapping({generated:{line:n.line,column:n.column}});s=null;o=false}for(let l=0,a=e.length;l<a;l++){if(e.charCodeAt(l)===i){n.line++;n.column=0;if(l+1===a){s=null;o=false}else if(o){t.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:n.line,column:n.column},name:r.name})}}else{n.column++}}}));this.walkSourceContents((function(e,n){t.setSourceContent(e,n)}));return{code:n.code,map:t}}}n.SourceNode=SourceNode},834:(e,n,t)=>{"use strict";e.exports=typeof URL==="function"?URL:t(310).URL},521:(e,n,t)=>{const r=t(834);function getArg(e,n,t){if(n in e){return e[n]}else if(arguments.length===3){return t}throw new Error('"'+n+'" is a required argument.')}n.getArg=getArg;const o=function(){const e=Object.create(null);return!("__proto__"in e)}();function identity(e){return e}function toSetString(e){if(isProtoString(e)){return"$"+e}return e}n.toSetString=o?identity:toSetString;function fromSetString(e){if(isProtoString(e)){return e.slice(1)}return e}n.fromSetString=o?identity:fromSetString;function isProtoString(e){if(!e){return false}const n=e.length;if(n<9){return false}if(e.charCodeAt(n-1)!==95||e.charCodeAt(n-2)!==95||e.charCodeAt(n-3)!==111||e.charCodeAt(n-4)!==116||e.charCodeAt(n-5)!==111||e.charCodeAt(n-6)!==114||e.charCodeAt(n-7)!==112||e.charCodeAt(n-8)!==95||e.charCodeAt(n-9)!==95){return false}for(let t=n-10;t>=0;t--){if(e.charCodeAt(t)!==36){return false}}return true}function strcmp(e,n){if(e===n){return 0}if(e===null){return 1}if(n===null){return-1}if(e>n){return 1}return-1}function compareByGeneratedPositionsInflated(e,n){let t=e.generatedLine-n.generatedLine;if(t!==0){return t}t=e.generatedColumn-n.generatedColumn;if(t!==0){return t}t=strcmp(e.source,n.source);if(t!==0){return t}t=e.originalLine-n.originalLine;if(t!==0){return t}t=e.originalColumn-n.originalColumn;if(t!==0){return t}return strcmp(e.name,n.name)}n.compareByGeneratedPositionsInflated=compareByGeneratedPositionsInflated;function parseSourceMapInput(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}n.parseSourceMapInput=parseSourceMapInput;const s="http:";const i=`${s}//host`;function createSafeHandler(e){return n=>{const t=getURLType(n);const o=buildSafeBase(n);const l=new r(n,o);e(l);const a=l.toString();if(t==="absolute"){return a}else if(t==="scheme-relative"){return a.slice(s.length)}else if(t==="path-absolute"){return a.slice(i.length)}return computeRelativeURL(o,a)}}function withBase(e,n){return new r(e,n).toString()}function buildUniqueSegment(e,n){let t=0;do{const r=e+t++;if(n.indexOf(r)===-1)return r}while(true)}function buildSafeBase(e){const n=e.split("..").length-1;const t=buildUniqueSegment("p",e);let r=`${i}/`;for(let e=0;e<n;e++){r+=`${t}/`}return r}const l=/^[A-Za-z0-9\+\-\.]+:/;function getURLType(e){if(e[0]==="/"){if(e[1]==="/")return"scheme-relative";return"path-absolute"}return l.test(e)?"absolute":"path-relative"}function computeRelativeURL(e,n){if(typeof e==="string")e=new r(e);if(typeof n==="string")n=new r(n);const t=n.pathname.split("/");const o=e.pathname.split("/");if(o.length>0&&!o[o.length-1]){o.pop()}while(t.length>0&&o.length>0&&t[0]===o[0]){t.shift();o.shift()}const s=o.map((()=>"..")).concat(t).join("/");return s+n.search+n.hash}const a=createSafeHandler((e=>{e.pathname=e.pathname.replace(/\/?$/,"/")}));const u=createSafeHandler((e=>{e.href=new r(".",e.toString()).toString()}));const c=createSafeHandler((e=>{}));n.normalize=c;function join(e,n){const t=getURLType(n);const r=getURLType(e);e=a(e);if(t==="absolute"){return withBase(n,undefined)}if(r==="absolute"){return withBase(n,e)}if(t==="scheme-relative"){return c(n)}if(r==="scheme-relative"){return withBase(n,withBase(e,i)).slice(s.length)}if(t==="path-absolute"){return c(n)}if(r==="path-absolute"){return withBase(n,withBase(e,i)).slice(i.length)}const o=buildSafeBase(n+e);const l=withBase(n,withBase(e,o));return computeRelativeURL(o,l)}n.join=join;function relative(e,n){const t=relativeIfPossible(e,n);return typeof t==="string"?t:c(n)}n.relative=relative;function relativeIfPossible(e,n){const t=getURLType(e);if(t!==getURLType(n)){return null}const o=buildSafeBase(e+n);const s=new r(e,o);const i=new r(n,o);try{new r("",i.toString())}catch(e){return null}if(i.protocol!==s.protocol||i.user!==s.user||i.password!==s.password||i.hostname!==s.hostname||i.port!==s.port){return null}return computeRelativeURL(s,i)}function computeSourceURL(e,n,t){if(e&&getURLType(n)==="path-absolute"){n=n.replace(/^\//,"")}let r=c(n||"");if(e)r=join(e,r);if(t)r=join(u(t),r);return r}n.computeSourceURL=computeSourceURL},734:(e,n,t)=>{const r=t(520);function Mapping(){this.generatedLine=0;this.generatedColumn=0;this.lastGeneratedColumn=null;this.source=null;this.originalLine=null;this.originalColumn=null;this.name=null}let o=null;e.exports=function wasm(){if(o){return o}const e=[];o=r().then((n=>WebAssembly.instantiate(n,{env:{mapping_callback(n,t,r,o,s,i,l,a,u,c){const g=new Mapping;g.generatedLine=n+1;g.generatedColumn=t;if(r){g.lastGeneratedColumn=o-1}if(s){g.source=i;g.originalLine=l+1;g.originalColumn=a;if(u){g.name=c}}e[e.length-1](g)},start_all_generated_locations_for(){console.time("all_generated_locations_for")},end_all_generated_locations_for(){console.timeEnd("all_generated_locations_for")},start_compute_column_spans(){console.time("compute_column_spans")},end_compute_column_spans(){console.timeEnd("compute_column_spans")},start_generated_location_for(){console.time("generated_location_for")},end_generated_location_for(){console.timeEnd("generated_location_for")},start_original_location_for(){console.time("original_location_for")},end_original_location_for(){console.timeEnd("original_location_for")},start_parse_mappings(){console.time("parse_mappings")},end_parse_mappings(){console.timeEnd("parse_mappings")},start_sort_by_generated_location(){console.time("sort_by_generated_location")},end_sort_by_generated_location(){console.timeEnd("sort_by_generated_location")},start_sort_by_original_location(){console.time("sort_by_original_location")},end_sort_by_original_location(){console.timeEnd("sort_by_original_location")}}}))).then((n=>({exports:n.instance.exports,withMappingCallback:(n,t)=>{e.push(n);try{t()}finally{e.pop()}}}))).then(null,(e=>{o=null;throw e}));return o}},147:e=>{"use strict";e.exports=require("fs")},17:e=>{"use strict";e.exports=require("path")},310:e=>{"use strict";e.exports=require("url")}};var n={};function __nccwpck_require__(t){var r=n[t];if(r!==undefined){return r.exports}var o=n[t]={exports:{}};var s=true;try{e[t](o,o.exports,__nccwpck_require__);s=false}finally{if(s)delete n[t]}return o.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var t={};(()=>{var e=t;e.SourceMapGenerator=__nccwpck_require__(491).SourceMapGenerator;e.SourceMapConsumer=__nccwpck_require__(494).SourceMapConsumer;e.SourceNode=__nccwpck_require__(664).SourceNode})();module.exports=t})();
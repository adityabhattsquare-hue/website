(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/scroll-reveal.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intersection-observer/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ScrollReveal({ children, delay = 0 }) {
    _s();
    const { ref, inView } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])({
        threshold: 0.1,
        triggerOnce: true
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        initial: {
            opacity: 0,
            y: 20
        },
        animate: inView ? {
            opacity: 1,
            y: 0
        } : {
            opacity: 0,
            y: 20
        },
        transition: {
            delay,
            duration: 0.6
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/scroll-reveal.jsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(ScrollReveal, "oyd/E8SD7Fx4uOp6P7gVV2pVlaE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = ScrollReveal;
var _c;
__turbopack_context__.k.register(_c, "ScrollReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/scroll-reveal.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/scroll-reveal.jsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/react-intersection-observer/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InView",
    ()=>InView,
    "defaultFallbackInView",
    ()=>defaultFallbackInView,
    "observe",
    ()=>observe,
    "useInView",
    ()=>useInView,
    "useOnInView",
    ()=>useOnInView
]);
// src/InView.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
// src/observe.ts
var observerMap = /* @__PURE__ */ new Map();
var RootIds = /* @__PURE__ */ new WeakMap();
var rootId = 0;
var unsupportedValue;
function defaultFallbackInView(inView) {
    unsupportedValue = inView;
}
function getRootId(root) {
    if (!root) return "0";
    if (RootIds.has(root)) return RootIds.get(root);
    rootId += 1;
    RootIds.set(root, rootId.toString());
    return RootIds.get(root);
}
function optionsToId(options) {
    return Object.keys(options).sort().filter((key)=>options[key] !== void 0).map((key)=>{
        return `${key}_${key === "root" ? getRootId(options.root) : options[key]}`;
    }).toString();
}
function createObserver(options) {
    const id = optionsToId(options);
    let instance = observerMap.get(id);
    if (!instance) {
        const elements = /* @__PURE__ */ new Map();
        let thresholds;
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                var _a2;
                const inView = entry.isIntersecting && thresholds.some((threshold)=>entry.intersectionRatio >= threshold);
                if (options.trackVisibility && typeof entry.isVisible === "undefined") {
                    entry.isVisible = inView;
                }
                (_a2 = elements.get(entry.target)) == null ? void 0 : _a2.forEach((callback)=>{
                    callback(inView, entry);
                });
            });
        }, options);
        thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [
            options.threshold || 0
        ]);
        instance = {
            id,
            observer,
            elements
        };
        observerMap.set(id, instance);
    }
    return instance;
}
function observe(element, callback, options = {}, fallbackInView = unsupportedValue) {
    if (typeof window.IntersectionObserver === "undefined" && fallbackInView !== void 0) {
        const bounds = element.getBoundingClientRect();
        callback(fallbackInView, {
            isIntersecting: fallbackInView,
            target: element,
            intersectionRatio: typeof options.threshold === "number" ? options.threshold : 0,
            time: 0,
            boundingClientRect: bounds,
            intersectionRect: bounds,
            rootBounds: bounds
        });
        return ()=>{};
    }
    const { id, observer, elements } = createObserver(options);
    const callbacks = elements.get(element) || [];
    if (!elements.has(element)) {
        elements.set(element, callbacks);
    }
    callbacks.push(callback);
    observer.observe(element);
    return function unobserve() {
        callbacks.splice(callbacks.indexOf(callback), 1);
        if (callbacks.length === 0) {
            elements.delete(element);
            observer.unobserve(element);
        }
        if (elements.size === 0) {
            observer.disconnect();
            observerMap.delete(id);
        }
    };
}
// src/InView.tsx
function isPlainChildren(props) {
    return typeof props.children !== "function";
}
var InView = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        __publicField(this, "node", null);
        __publicField(this, "_unobserveCb", null);
        __publicField(this, "lastInView");
        __publicField(this, "handleNode", (node)=>{
            if (this.node) {
                this.unobserve();
                if (!node && !this.props.triggerOnce && !this.props.skip) {
                    this.setState({
                        inView: !!this.props.initialInView,
                        entry: void 0
                    });
                    this.lastInView = this.props.initialInView;
                }
            }
            this.node = node ? node : null;
            this.observeNode();
        });
        __publicField(this, "handleChange", (inView, entry)=>{
            const previousInView = this.lastInView;
            this.lastInView = inView;
            if (previousInView === void 0 && !inView) {
                return;
            }
            if (inView && this.props.triggerOnce) {
                this.unobserve();
            }
            if (!isPlainChildren(this.props)) {
                this.setState({
                    inView,
                    entry
                });
            }
            if (this.props.onChange) {
                this.props.onChange(inView, entry);
            }
        });
        this.state = {
            inView: !!props.initialInView,
            entry: void 0
        };
        this.lastInView = props.initialInView;
    }
    componentDidMount() {
        this.unobserve();
        this.observeNode();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold || prevProps.skip !== this.props.skip || prevProps.trackVisibility !== this.props.trackVisibility || prevProps.delay !== this.props.delay) {
            this.unobserve();
            this.observeNode();
        }
    }
    componentWillUnmount() {
        this.unobserve();
    }
    observeNode() {
        if (!this.node || this.props.skip) return;
        const { threshold, root, rootMargin, trackVisibility, delay, fallbackInView } = this.props;
        if (this.lastInView === void 0) {
            this.lastInView = this.props.initialInView;
        }
        this._unobserveCb = observe(this.node, this.handleChange, {
            threshold,
            root,
            rootMargin,
            // @ts-expect-error
            trackVisibility,
            delay
        }, fallbackInView);
    }
    unobserve() {
        if (this._unobserveCb) {
            this._unobserveCb();
            this._unobserveCb = null;
        }
    }
    render() {
        const { children } = this.props;
        if (typeof children === "function") {
            const { inView, entry } = this.state;
            return children({
                inView,
                entry,
                ref: this.handleNode
            });
        }
        const { as, triggerOnce, threshold, root, rootMargin, onChange, skip, trackVisibility, delay, initialInView, fallbackInView, ...props } = this.props;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](as || "div", {
            ref: this.handleNode,
            ...props
        }, children);
    }
};
;
function useInView({ threshold, delay, trackVisibility, rootMargin, root, triggerOnce, skip, initialInView, fallbackInView, onChange } = {}) {
    var _a2;
    const [ref, setRef] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const callback = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](onChange);
    const lastInViewRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](initialInView);
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        inView: !!initialInView,
        entry: void 0
    });
    callback.current = onChange;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useInView.useEffect": ()=>{
            if (lastInViewRef.current === void 0) {
                lastInViewRef.current = initialInView;
            }
            if (skip || !ref) return;
            let unobserve;
            unobserve = observe(ref, {
                "useInView.useEffect": (inView, entry)=>{
                    const previousInView = lastInViewRef.current;
                    lastInViewRef.current = inView;
                    if (previousInView === void 0 && !inView) {
                        return;
                    }
                    setState({
                        inView,
                        entry
                    });
                    if (callback.current) callback.current(inView, entry);
                    if (entry.isIntersecting && triggerOnce && unobserve) {
                        unobserve();
                        unobserve = void 0;
                    }
                }
            }["useInView.useEffect"], {
                root,
                rootMargin,
                threshold,
                // @ts-expect-error
                trackVisibility,
                delay
            }, fallbackInView);
            return ({
                "useInView.useEffect": ()=>{
                    if (unobserve) {
                        unobserve();
                    }
                }
            })["useInView.useEffect"];
        }
    }["useInView.useEffect"], // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        // If the threshold is an array, convert it to a string, so it won't change between renders.
        Array.isArray(threshold) ? threshold.toString() : threshold,
        ref,
        root,
        rootMargin,
        triggerOnce,
        skip,
        trackVisibility,
        fallbackInView,
        delay
    ]);
    const entryTarget = (_a2 = state.entry) == null ? void 0 : _a2.target;
    const previousEntryTarget = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](void 0);
    if (!ref && entryTarget && !triggerOnce && !skip && previousEntryTarget.current !== entryTarget) {
        previousEntryTarget.current = entryTarget;
        setState({
            inView: !!initialInView,
            entry: void 0
        });
        lastInViewRef.current = initialInView;
    }
    const result = [
        setRef,
        state.inView,
        state.entry
    ];
    result.ref = result[0];
    result.inView = result[1];
    result.entry = result[2];
    return result;
}
;
var _a, _b;
var useSyncEffect = (_b = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInsertionEffect"]) != null ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"]) != null ? _b : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
var useOnInView = (onIntersectionChange, { threshold, root, rootMargin, trackVisibility, delay, triggerOnce, skip } = {})=>{
    const onIntersectionChangeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](onIntersectionChange);
    const observedElementRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const observerCleanupRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](void 0);
    const lastInViewRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](void 0);
    useSyncEffect({
        "useOnInView.useSyncEffect": ()=>{
            onIntersectionChangeRef.current = onIntersectionChange;
        }
    }["useOnInView.useSyncEffect"], [
        onIntersectionChange
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useOnInView.useCallback": (element)=>{
            const cleanupExisting = {
                "useOnInView.useCallback.cleanupExisting": ()=>{
                    if (observerCleanupRef.current) {
                        const cleanup = observerCleanupRef.current;
                        observerCleanupRef.current = void 0;
                        cleanup();
                    }
                }
            }["useOnInView.useCallback.cleanupExisting"];
            if (element === observedElementRef.current) {
                return observerCleanupRef.current;
            }
            if (!element || skip) {
                cleanupExisting();
                observedElementRef.current = null;
                lastInViewRef.current = void 0;
                return;
            }
            cleanupExisting();
            observedElementRef.current = element;
            let destroyed = false;
            const destroyObserver = observe(element, {
                "useOnInView.useCallback.destroyObserver": (inView, entry)=>{
                    const previousInView = lastInViewRef.current;
                    lastInViewRef.current = inView;
                    if (previousInView === void 0 && !inView) {
                        return;
                    }
                    onIntersectionChangeRef.current(inView, entry);
                    if (triggerOnce && inView) {
                        stopObserving();
                    }
                }
            }["useOnInView.useCallback.destroyObserver"], {
                threshold,
                root,
                rootMargin,
                trackVisibility,
                delay
            });
            function stopObserving() {
                if (destroyed) return;
                destroyed = true;
                destroyObserver();
                observedElementRef.current = null;
                observerCleanupRef.current = void 0;
                lastInViewRef.current = void 0;
            }
            observerCleanupRef.current = stopObserving;
            return observerCleanupRef.current;
        }
    }["useOnInView.useCallback"], [
        Array.isArray(threshold) ? threshold.toString() : threshold,
        root,
        rootMargin,
        trackVisibility,
        delay,
        triggerOnce,
        skip
    ]);
};
;
 //# sourceMappingURL=index.mjs.map
}),
]);

//# sourceMappingURL=_c35957ab._.js.map
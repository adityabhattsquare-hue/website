module.exports = [
"[project]/services/auth.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7f43956f80f22007ff39ce5489e37e9566468ec6de":"logout","7fc7b3a8fdc9ac31bc531f7ba8c4e591de136ed3ec":"register","7ff3759432512ce7d609f56e54777ecdaf362cb808":"login"},"",""] */ __turbopack_context__.s([
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "register",
    ()=>register
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const API_BASE = ("TURBOPACK compile-time value", "https://royaloakempire.alwaysdata.net/api");
const login = async (email, password)=>{
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
const register = async (name, email, password, phone = '')=>{
    try {
        const requestBody = {
            full_name: name,
            email,
            password
        };
        // Only add phone to request if it's provided and valid
        if (phone && phone.startsWith('+91') && phone.length === 13) {
            requestBody.phone = phone;
        }
        console.log('Sending registration data:', requestBody);
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        console.log('Registration response status:', response.status);
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.log('Registration error details:', errorData);
                // Extract specific error message
                let errorMessage = 'Registration failed';
                if (errorData.errors && errorData.errors.length > 0) {
                    errorMessage = errorData.errors[0].msg || errorMessage;
                } else if (errorData.message) {
                    errorMessage = errorData.message;
                }
                throw new Error(errorMessage);
            } catch (parseError) {
                console.log('Could not parse error response');
                throw new Error(`Registration failed with status: ${response.status}`);
            }
        }
        const data = await response.json();
        console.log('Registration successful:', data);
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};
const logout = async ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    login,
    register,
    logout
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "7ff3759432512ce7d609f56e54777ecdaf362cb808", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(register, "7fc7b3a8fdc9ac31bc531f7ba8c4e591de136ed3ec", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "7f43956f80f22007ff39ce5489e37e9566468ec6de", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/services/auth.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.js [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/services/auth.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "7f43956f80f22007ff39ce5489e37e9566468ec6de",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "7fc7b3a8fdc9ac31bc531f7ba8c4e591de136ed3ec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["register"],
    "7ff3759432512ce7d609f56e54777ecdaf362cb808",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/services/auth.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_72733c39._.js.map
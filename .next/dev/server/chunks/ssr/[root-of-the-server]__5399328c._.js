module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/services/auth.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "register",
    ()=>register
]);
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:5000/api");
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
}),
"[project]/redux/slices/authSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// redux/slices/authSlice.js
__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "logoutUserAsync",
    ()=>logoutUserAsync,
    "registerUser",
    ()=>registerUser,
    "setError",
    ()=>setError,
    "setLoading",
    ()=>setLoading,
    "setUser",
    ()=>setUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.js [app-ssr] (ecmascript)");
;
;
// Helper function to safely access localStorage
const getStoredUser = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
};
const getStoredToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
};
const initialState = {
    user: getStoredUser(),
    isAuthenticated: !!getStoredToken(),
    loading: false,
    error: null
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        setUser (state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            // Only update localStorage on client side
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        logoutUser (state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            // Only remove from localStorage on client side
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        setLoading (state, action) {
            state.loading = action.payload;
        },
        setError (state, action) {
            state.error = action.payload;
        },
        clearError (state) {
            state.error = null;
        }
    }
});
const loginUser = (email, password)=>async (dispatch)=>{
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["login"])(email, password);
            // Store token and user data only on client side
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            dispatch(setUser(userData));
            dispatch(setLoading(false));
            return userData;
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            throw error;
        }
    };
const registerUser = (name, email, password, phone = '')=>async (dispatch)=>{
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["register"])(name, email, password, phone);
            // Store token and user data only on client side
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            dispatch(setUser(userData));
            dispatch(setLoading(false));
            return userData;
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            throw error;
        }
    };
const logoutUserAsync = ()=>async (dispatch)=>{
        try {
            // Call logout API if needed
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logout"])();
        } catch (error) {
            console.error('Logout API error:', error);
        // Continue with local logout even if API fails
        } finally{
            dispatch(logoutUser());
        }
    };
const { setUser, logoutUser, setLoading, setError, clearError } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}),
"[project]/redux/slices/cartSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// redux/slices/cartSlice.js
__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "addToCartAPI",
    ()=>addToCartAPI,
    "clearCart",
    ()=>clearCart,
    "clearCartAPI",
    ()=>clearCartAPI,
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchCart",
    ()=>fetchCart,
    "loadLocalCart",
    ()=>loadLocalCart,
    "removeFromCart",
    ()=>removeFromCart,
    "removeFromCartAPI",
    ()=>removeFromCartAPI,
    "setAuthentication",
    ()=>setAuthentication,
    "updateCartItemAPI",
    ()=>updateCartItemAPI,
    "updateQuantity",
    ()=>updateQuantity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:5000/api");
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
};
const getHeaders = ()=>{
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...token && {
            'Authorization': `Bearer ${token}`
        }
    };
};
const fetchCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/fetchCart', async (_, { rejectWithValue })=>{
    try {
        const response = await fetch(`${API_BASE}/cart`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const addToCartAPI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/addToCartAPI', async ({ product_id, quantity = 1 }, { rejectWithValue })=>{
    try {
        const response = await fetch(`${API_BASE}/cart/add`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                product_id,
                quantity
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add to cart');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const updateCartItemAPI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/updateCartItemAPI', async ({ itemId, quantity }, { rejectWithValue })=>{
    try {
        const response = await fetch(`${API_BASE}/cart/item/${itemId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({
                quantity
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update cart item');
        }
        const data = await response.json();
        return {
            itemId,
            quantity,
            ...data.data
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const removeFromCartAPI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/removeFromCartAPI', async (itemId, { rejectWithValue })=>{
    try {
        const response = await fetch(`${API_BASE}/cart/item/${itemId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to remove from cart');
        }
        const data = await response.json();
        return {
            itemId,
            ...data.data
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const clearCartAPI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/clearCartAPI', async (_, { rejectWithValue })=>{
    try {
        const response = await fetch(`${API_BASE}/cart/clear`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to clear cart');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
// Helper functions for localStorage
const getStoredCart = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return {
        items: [],
        totalPrice: 0,
        totalQuantity: 0
    };
};
const saveCartToStorage = (cart)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    loading: false,
    error: null,
    isAuthenticated: false
};
const cartSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'cart',
    initialState,
    reducers: {
        // Local cart actions (for non-authenticated users)
        addToCart: (state, action)=>{
            const { id, name, price, image, quantity = 1 } = action.payload;
            const existingItem = state.items.find((item)=>item.id === id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    id,
                    name,
                    price,
                    image,
                    quantity,
                    cart_item_id: `local_${id}` // Create a local ID
                });
            }
            state.totalQuantity = state.items.reduce((sum, item)=>sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item)=>sum + item.price * item.quantity, 0);
            // Save to localStorage for non-authenticated users
            if (!state.isAuthenticated) {
                saveCartToStorage({
                    items: state.items,
                    totalPrice: state.totalPrice,
                    totalQuantity: state.totalQuantity
                });
            }
        },
        removeFromCart: (state, action)=>{
            state.items = state.items.filter((item)=>item.id !== action.payload);
            state.totalQuantity = state.items.reduce((sum, item)=>sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item)=>sum + item.price * item.quantity, 0);
            if (!state.isAuthenticated) {
                saveCartToStorage({
                    items: state.items,
                    totalPrice: state.totalPrice,
                    totalQuantity: state.totalQuantity
                });
            }
        },
        updateQuantity: (state, action)=>{
            const { id, quantity } = action.payload;
            const item = state.items.find((item)=>item.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
            state.totalQuantity = state.items.reduce((sum, item)=>sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item)=>sum + item.price * item.quantity, 0);
            if (!state.isAuthenticated) {
                saveCartToStorage({
                    items: state.items,
                    totalPrice: state.totalPrice,
                    totalQuantity: state.totalQuantity
                });
            }
        },
        clearCart: (state)=>{
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            if (!state.isAuthenticated) {
                localStorage.removeItem('localCart');
            }
        },
        setAuthentication: (state, action)=>{
            state.isAuthenticated = action.payload;
            if (!action.payload) {
                // When logging out, load local cart
                const localCart = getStoredCart();
                state.items = localCart.items;
                state.totalPrice = localCart.totalPrice;
                state.totalQuantity = localCart.totalQuantity;
            }
        },
        loadLocalCart: (state)=>{
            if (!state.isAuthenticated) {
                const localCart = getStoredCart();
                state.items = localCart.items;
                state.totalPrice = localCart.totalPrice;
                state.totalQuantity = localCart.totalQuantity;
            }
        },
        clearError: (state)=>{
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder// Fetch Cart
        .addCase(fetchCart.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchCart.fulfilled, (state, action)=>{
            state.loading = false;
            // Make sure we're properly setting items from API response
            state.items = action.payload.items || action.payload.data?.items || [];
            state.totalPrice = action.payload.total || action.payload.data?.total || 0;
            state.totalQuantity = action.payload.totalItems || action.payload.data?.totalItems || 0;
        }).addCase(fetchCart.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            // If API fails, fall back to local cart for authenticated users
            if (state.isAuthenticated) {
                const localCart = getStoredCart();
                state.items = localCart.items;
                state.totalPrice = localCart.totalPrice;
                state.totalQuantity = localCart.totalQuantity;
            }
        })// Add to Cart API
        .addCase(addToCartAPI.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(addToCartAPI.fulfilled, (state, action)=>{
            state.loading = false;
            // Update state with API response data
            state.items = action.payload.items || action.payload.data?.items || [];
            state.totalPrice = action.payload.total || action.payload.data?.total || 0;
            state.totalQuantity = action.payload.totalItems || action.payload.data?.totalItems || 0;
        }).addCase(addToCartAPI.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update Cart Item API
        .addCase(updateCartItemAPI.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(updateCartItemAPI.fulfilled, (state, action)=>{
            state.loading = false;
            state.totalPrice = action.payload.total || 0;
            state.totalQuantity = action.payload.totalItems || 0;
            // Update the specific item quantity
            const item = state.items.find((item)=>item.cart_item_id === action.payload.itemId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        }).addCase(updateCartItemAPI.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Remove from Cart API
        .addCase(removeFromCartAPI.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(removeFromCartAPI.fulfilled, (state, action)=>{
            state.loading = false;
            state.totalPrice = action.payload.total || 0;
            state.totalQuantity = action.payload.totalItems || 0;
            // Remove item from local state
            state.items = state.items.filter((item)=>item.cart_item_id !== action.payload.itemId);
        }).addCase(removeFromCartAPI.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Clear Cart API
        .addCase(clearCartAPI.fulfilled, (state)=>{
            state.items = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        });
    }
});
const { addToCart, removeFromCart, updateQuantity, clearCart, setAuthentication, loadLocalCart, clearError } = cartSlice.actions;
const __TURBOPACK__default__export__ = cartSlice.reducer;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/redux/slices/wishlistSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToWishlist",
    ()=>addToWishlist,
    "checkWishlistStatus",
    ()=>checkWishlistStatus,
    "clearWishlist",
    ()=>clearWishlist,
    "clearWishlistError",
    ()=>clearWishlistError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchWishlist",
    ()=>fetchWishlist,
    "removeFromWishlist",
    ()=>removeFromWishlist,
    "updateWishlistStatus",
    ()=>updateWishlistStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
;
// Create axios instance with base config
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:5000/api")
});
// Add token to requests
const getAuthConfig = ()=>{
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};
// Helper function to extract product ID
const extractProductId = (input)=>{
    console.log('🔄 extractProductId input:', input);
    // If it's already a number or string number, return it
    if (typeof input === 'number') return input;
    if (typeof input === 'string' && !isNaN(parseInt(input))) return parseInt(input);
    // If it's an object with product_id
    if (typeof input === 'object' && input.product_id) {
        return input.product_id;
    }
    // If it's an object with id
    if (typeof input === 'object' && input.id) {
        return input.id;
    }
    throw new Error('Invalid product ID format');
};
const fetchWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('wishlist/fetchWishlist', async (_, { rejectWithValue })=>{
    try {
        const response = await api.get('/wishlist', getAuthConfig());
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
    }
});
const addToWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('wishlist/addToWishlist', async (input, { rejectWithValue })=>{
    try {
        // Extract product ID from whatever is passed
        const productId = extractProductId(input);
        console.log('✅ Final product ID to send to API:', productId);
        console.log('✅ Type of product ID:', typeof productId);
        const response = await api.post('/wishlist', {
            productId
        }, getAuthConfig());
        return {
            productId,
            message: response.data.message
        };
    } catch (error) {
        console.error('❌ Add to wishlist error:', error.response?.data);
        return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
    }
});
const removeFromWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('wishlist/removeFromWishlist', async (input, { rejectWithValue })=>{
    try {
        // Extract product ID from whatever is passed
        const productId = extractProductId(input);
        console.log('✅ Final product ID to remove:', productId);
        await api.delete(`/wishlist/${productId}`, getAuthConfig());
        return productId;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
    }
});
const checkWishlistStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('wishlist/checkWishlistStatus', async (input, { rejectWithValue })=>{
    try {
        // Extract product ID from whatever is passed
        const productId = extractProductId(input);
        const response = await api.get(`/wishlist/check/${productId}`, getAuthConfig());
        return {
            productId,
            inWishlist: response.data.inWishlist
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to check wishlist status');
    }
});
const wishlistSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'wishlist',
    initialState: {
        items: [],
        loading: false,
        error: null,
        wishlistStatus: {} // Track wishlist status for individual products
    },
    reducers: {
        clearWishlist: (state)=>{
            state.items = [];
            state.error = null;
        },
        clearWishlistError: (state)=>{
            state.error = null;
        },
        updateWishlistStatus: (state, action)=>{
            state.wishlistStatus[action.payload.productId] = action.payload.status;
        }
    },
    extraReducers: (builder)=>{
        builder// Fetch wishlist
        .addCase(fetchWishlist.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchWishlist.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
            // Update wishlist status for all fetched items
            action.payload.forEach((item)=>{
                state.wishlistStatus[item.product_id] = true;
            });
        }).addCase(fetchWishlist.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Add to wishlist
        .addCase(addToWishlist.fulfilled, (state, action)=>{
            state.wishlistStatus[action.payload.productId] = true;
            state.error = null;
        }).addCase(addToWishlist.rejected, (state, action)=>{
            state.error = action.payload;
        })// Remove from wishlist
        .addCase(removeFromWishlist.fulfilled, (state, action)=>{
            state.items = state.items.filter((item)=>item.product_id !== action.payload);
            state.wishlistStatus[action.payload] = false;
            state.error = null;
        }).addCase(removeFromWishlist.rejected, (state, action)=>{
            state.error = action.payload;
        })// Check wishlist status
        .addCase(checkWishlistStatus.fulfilled, (state, action)=>{
            state.wishlistStatus[action.payload.productId] = action.payload.inWishlist;
        }).addCase(checkWishlistStatus.rejected, (state, action)=>{
            // If check fails, assume not in wishlist
            const productId = extractProductId(action.meta.arg);
            state.wishlistStatus[productId] = false;
        });
    }
});
const { clearWishlist, clearWishlistError, updateWishlistStatus } = wishlistSlice.actions;
const __TURBOPACK__default__export__ = wishlistSlice.reducer;
}),
"[project]/redux/slices/themeSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "setTheme",
    ()=>setTheme,
    "toggleTheme",
    ()=>toggleTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    mode: 'light'
};
const themeSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'theme',
    initialState,
    reducers: {
        setTheme (state, action) {
            state.mode = action.payload;
        },
        toggleTheme (state) {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
});
const { setTheme, toggleTheme } = themeSlice.actions;
const __TURBOPACK__default__export__ = themeSlice.reducer;
}),
"[project]/services/product.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchProductById",
    ()=>fetchProductById,
    "fetchProducts",
    ()=>fetchProducts
]);
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:5000/api");
const SHOP_ORG_ID = ("TURBOPACK compile-time value", "1");
const fetchProducts = async (filters = {})=>{
    try {
        const { category_id, min_price, max_price, search, page = 1, limit = 100 } = filters;
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...category_id && {
                category_id
            },
            ...min_price && {
                min_price: min_price.toString()
            },
            ...max_price && {
                max_price: max_price.toString()
            },
            ...search && {
                search
            }
        });
        const response = await fetch(`${API_BASE}/products?${params}`, {
            headers: {
                'x-org-id': SHOP_ORG_ID
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
const fetchProductById = async (id)=>{
    try {
        const response = await fetch(`${API_BASE}/products/${id}`, {
            headers: {
                'x-org-id': SHOP_ORG_ID
            }
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
}),
"[project]/redux/slices/productSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// redux/slices/productSlice.js
__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "clearSelectedProduct",
    ()=>clearSelectedProduct,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getProductById",
    ()=>getProductById,
    "getProducts",
    ()=>getProducts,
    "setError",
    ()=>setError,
    "setLoading",
    ()=>setLoading,
    "setProducts",
    ()=>setProducts,
    "setSelectedProduct",
    ()=>setSelectedProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$product$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/product.js [app-ssr] (ecmascript)");
;
;
const initialState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    pagination: null
};
const productSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'products',
    initialState,
    reducers: {
        setProducts (state, action) {
            state.products = action.payload.products;
            state.pagination = action.payload.pagination;
        },
        setSelectedProduct (state, action) {
            state.selectedProduct = action.payload;
        },
        setLoading (state, action) {
            state.loading = action.payload;
        },
        setError (state, action) {
            state.error = action.payload;
        },
        clearError (state) {
            state.error = null;
        },
        clearSelectedProduct (state) {
            state.selectedProduct = null;
        }
    }
});
const getProducts = (filters = {})=>async (dispatch)=>{
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$product$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchProducts"])(filters);
            // Extract data from API response
            if (response.success) {
                dispatch(setProducts({
                    products: response.data,
                    pagination: response.pagination
                }));
            } else {
                throw new Error(response.message || 'Failed to fetch products');
            }
            dispatch(setLoading(false));
            return response;
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            throw error;
        }
    };
const getProductById = (id)=>async (dispatch)=>{
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            dispatch(clearSelectedProduct()); // Clear previous product
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$product$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchProductById"])(id);
            // Extract data from API response
            if (response.success) {
                dispatch(setSelectedProduct(response.data));
            } else {
                throw new Error(response.message || 'Failed to fetch product');
            }
            dispatch(setLoading(false));
            return response.data;
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            throw error;
        }
    };
const { setProducts, setSelectedProduct, setLoading, setError, clearError, clearSelectedProduct } = productSlice.actions;
const __TURBOPACK__default__export__ = productSlice.reducer;
}),
"[project]/services/category.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchCategories",
    ()=>fetchCategories
]);
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:5000/api");
const SHOP_ORG_ID = ("TURBOPACK compile-time value", "1");
const fetchCategories = async ()=>{
    try {
        const response = await fetch(`${API_BASE}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-org-id': SHOP_ORG_ID
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
}),
"[project]/redux/slices/categorySlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// redux/slices/categorySlice.js
__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCategories",
    ()=>getCategories,
    "setCategories",
    ()=>setCategories,
    "setError",
    ()=>setError,
    "setLoading",
    ()=>setLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$category$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/category.js [app-ssr] (ecmascript)");
;
;
const initialState = {
    categories: [],
    loading: false,
    error: null
};
const categorySlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'categories',
    initialState,
    reducers: {
        setCategories (state, action) {
            state.categories = action.payload;
        },
        setLoading (state, action) {
            state.loading = action.payload;
        },
        setError (state, action) {
            state.error = action.payload;
        },
        clearError (state) {
            state.error = null;
        }
    }
});
const getCategories = ()=>async (dispatch)=>{
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const categories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$category$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchCategories"])();
            dispatch(setCategories(categories));
            dispatch(setLoading(false));
            return categories;
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            throw error;
        }
    };
const { setCategories, setLoading, setError, clearError } = categorySlice.actions;
const __TURBOPACK__default__export__ = categorySlice.reducer;
}),
"[project]/services/address.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// services/address.js
__turbopack_context__.s([
    "addAddress",
    ()=>addAddress,
    "deleteAddress",
    ()=>deleteAddress,
    "getAddresses",
    ()=>getAddresses,
    "setDefaultAddress",
    ()=>setDefaultAddress,
    "updateAddress",
    ()=>updateAddress
]);
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:5000/api");
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
};
const getHeaders = ()=>{
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...token && {
            'Authorization': `Bearer ${token}`
        }
    };
};
const getAddresses = async ()=>{
    try {
        const response = await fetch(`${API_BASE}/addresses`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {}
        const data = await response.json();
        return data.addresses || [];
    } catch (error) {
        console.error('Get addresses error:', error);
        throw error;
    }
};
const addAddress = async (addressData)=>{
    try {
        const response = await fetch(`${API_BASE}/addresses`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(addressData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add address');
        }
        const data = await response.json();
        return data.address;
    } catch (error) {
        console.error('Add address error:', error);
        throw error;
    }
};
const updateAddress = async (addressId, addressData)=>{
    try {
        const response = await fetch(`${API_BASE}/addresses/${addressId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(addressData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update address');
        }
        const data = await response.json();
        return data.address;
    } catch (error) {
        console.error('Update address error:', error);
        throw error;
    }
};
const deleteAddress = async (addressId)=>{
    try {
        const response = await fetch(`${API_BASE}/addresses/${addressId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete address');
        }
        return addressId;
    } catch (error) {
        console.error('Delete address error:', error);
        throw error;
    }
};
const setDefaultAddress = async (addressId)=>{
    try {
        const response = await fetch(`${API_BASE}/addresses/${addressId}/set-default`, {
            method: 'PATCH',
            headers: getHeaders()
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to set default address');
        }
        const data = await response.json();
        return data.address;
    } catch (error) {
        console.error('Set default address error:', error);
        throw error;
    }
};
}),
"[project]/redux/slices/addressSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// redux/slices/addressSlice.js
__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "createAddress",
    ()=>createAddress,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteAddressAsync",
    ()=>deleteAddressAsync,
    "fetchAddresses",
    ()=>fetchAddresses,
    "setDefaultAddressAsync",
    ()=>setDefaultAddressAsync,
    "setSelectedAddress",
    ()=>setSelectedAddress,
    "updateAddressAsync",
    ()=>updateAddressAsync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/address.js [app-ssr] (ecmascript)");
;
;
const initialState = {
    addresses: [],
    loading: false,
    error: null,
    selectedAddress: null
};
const fetchAddresses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('address/fetchAddresses', async (_, { rejectWithValue })=>{
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddresses"])();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const createAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('address/createAddress', async (addressData, { rejectWithValue })=>{
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAddress"])(addressData);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const updateAddressAsync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('address/updateAddress', async ({ addressId, addressData }, { rejectWithValue })=>{
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateAddress"])(addressId, addressData);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const deleteAddressAsync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('address/deleteAddress', async (addressId, { rejectWithValue })=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteAddress"])(addressId);
        return addressId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const setDefaultAddressAsync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('address/setDefaultAddress', async (addressId, { rejectWithValue })=>{
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDefaultAddress"])(addressId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const addressSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'address',
    initialState,
    reducers: {
        clearError: (state)=>{
            state.error = null;
        },
        setSelectedAddress: (state, action)=>{
            state.selectedAddress = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder// Fetch addresses
        .addCase(fetchAddresses.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchAddresses.fulfilled, (state, action)=>{
            state.loading = false;
            state.addresses = action.payload;
        }).addCase(fetchAddresses.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Create address
        .addCase(createAddress.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(createAddress.fulfilled, (state, action)=>{
            state.loading = false;
            state.addresses.push(action.payload);
        }).addCase(createAddress.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update address
        .addCase(updateAddressAsync.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(updateAddressAsync.fulfilled, (state, action)=>{
            state.loading = false;
            const index = state.addresses.findIndex((addr)=>addr.address_id === action.payload.address_id);
            if (index !== -1) {
                state.addresses[index] = action.payload;
            }
        }).addCase(updateAddressAsync.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Delete address
        .addCase(deleteAddressAsync.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(deleteAddressAsync.fulfilled, (state, action)=>{
            state.loading = false;
            state.addresses = state.addresses.filter((addr)=>addr.address_id !== action.payload);
        }).addCase(deleteAddressAsync.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Set default address
        .addCase(setDefaultAddressAsync.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(setDefaultAddressAsync.fulfilled, (state, action)=>{
            state.loading = false;
            // Update all addresses - set is_default to true for the target, false for others
            state.addresses.forEach((addr)=>{
                addr.is_default = addr.address_id === action.payload.address_id;
            });
        }).addCase(setDefaultAddressAsync.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearError, setSelectedAddress } = addressSlice.actions;
const __TURBOPACK__default__export__ = addressSlice.reducer;
}),
"[project]/services/user.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// services/user.js
__turbopack_context__.s([
    "changePassword",
    ()=>changePassword,
    "getUserProfile",
    ()=>getUserProfile,
    "updateUserProfile",
    ()=>updateUserProfile,
    "uploadProfileImage",
    ()=>uploadProfileImage
]);
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:5000/api");
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
};
const getHeaders = ()=>{
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...token && {
            'Authorization': `Bearer ${token}`
        }
    };
};
// For form data (file uploads)
const getFormDataHeaders = ()=>{
    const token = getAuthToken();
    return {
        ...token && {
            'Authorization': `Bearer ${token}`
        }
    };
};
const getUserProfile = async ()=>{
    try {
        const response = await fetch(`${API_BASE}/users/profile`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {}
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Get user profile error:', error);
        throw error;
    }
};
const updateUserProfile = async (userData)=>{
    try {
        const response = await fetch(`${API_BASE}/users/profile`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile');
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Update user profile error:', error);
        throw error;
    }
};
const uploadProfileImage = async (imageFile)=>{
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        const token = getAuthToken();
        const response = await fetch(`${API_BASE}/users/upload-profile-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to upload profile image');
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Upload profile image error:', error);
        throw error;
    }
};
const changePassword = async (passwordData)=>{
    try {
        const response = await fetch(`${API_BASE}/users/change-password`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(passwordData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to change password');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Change password error:', error);
        throw error;
    }
};
}),
"[project]/redux/slices/userSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// redux/slices/userSlice.js
__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchUserProfile",
    ()=>fetchUserProfile,
    "logoutUser",
    ()=>logoutUser,
    "setError",
    ()=>setError,
    "setLoading",
    ()=>setLoading,
    "setUser",
    ()=>setUser,
    "updateUserProfileAsync",
    ()=>updateUserProfileAsync,
    "uploadProfileImageAsync",
    ()=>uploadProfileImageAsync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/user.js [app-ssr] (ecmascript)");
;
;
// Helper function to safely access localStorage
const getStoredUser = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
};
const getStoredToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
};
const initialState = {
    user: getStoredUser(),
    isAuthenticated: !!getStoredToken(),
    loading: false,
    error: null
};
const fetchUserProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('user/fetchUserProfile', async (_, { rejectWithValue })=>{
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserProfile"])();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const updateUserProfileAsync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('user/updateUserProfile', async (userData, { rejectWithValue })=>{
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateUserProfile"])(userData);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const uploadProfileImageAsync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('user/uploadProfileImage', async (imageFile, { rejectWithValue })=>{
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadProfileImage"])(imageFile);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const userSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        logoutUser: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        setLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setError: (state, action)=>{
            state.error = action.payload;
        },
        clearError: (state)=>{
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder// Fetch user profile
        .addCase(fetchUserProfile.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchUserProfile.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            // Update localStorage
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }).addCase(fetchUserProfile.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            state.isAuthenticated = false;
            // Clear localStorage on auth failure
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        })// Update user profile
        .addCase(updateUserProfileAsync.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(updateUserProfileAsync.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            // Update localStorage
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }).addCase(updateUserProfileAsync.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Upload profile image
        .addCase(uploadProfileImageAsync.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(uploadProfileImageAsync.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            // Update localStorage
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }).addCase(uploadProfileImageAsync.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { setUser, logoutUser, setLoading, setError, clearError } = userSlice.actions;
const __TURBOPACK__default__export__ = userSlice.reducer;
}),
"[project]/redux/slices/orderSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// redux/slices/orderSlice.js
__turbopack_context__.s([
    "clearCurrentOrder",
    ()=>clearCurrentOrder,
    "clearError",
    ()=>clearError,
    "createOrder",
    ()=>createOrder,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getMyOrders",
    ()=>getMyOrders,
    "getOrder",
    ()=>getOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:5000/api");
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
};
const getHeaders = ()=>{
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...token && {
            'Authorization': `Bearer ${token}`
        }
    };
};
const createOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('order/createOrder', async (orderData, { rejectWithValue })=>{
    try {
        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create order');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const getMyOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('order/getMyOrders', async (_, { rejectWithValue })=>{
    try {
        const response = await fetch(`${API_BASE}/orders/my-orders`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const getOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('order/getOrder', async (orderId, { rejectWithValue })=>{
    try {
        const response = await fetch(`${API_BASE}/orders/${orderId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
};
const orderSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'order',
    initialState,
    reducers: {
        clearError: (state)=>{
            state.error = null;
        },
        clearCurrentOrder: (state)=>{
            state.currentOrder = null;
        }
    },
    extraReducers: (builder)=>{
        builder// Create Order
        .addCase(createOrder.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(createOrder.fulfilled, (state, action)=>{
            state.loading = false;
            state.currentOrder = action.payload;
            state.orders.unshift(action.payload);
        }).addCase(createOrder.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get My Orders
        .addCase(getMyOrders.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getMyOrders.fulfilled, (state, action)=>{
            state.loading = false;
            state.orders = action.payload;
        }).addCase(getMyOrders.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get Order
        .addCase(getOrder.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getOrder.fulfilled, (state, action)=>{
            state.loading = false;
            state.currentOrder = action.payload;
        }).addCase(getOrder.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearError, clearCurrentOrder } = orderSlice.actions;
const __TURBOPACK__default__export__ = orderSlice.reducer;
}),
"[project]/redux/store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// store.js
__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/authSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/cartSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$wishlistSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/wishlistSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$themeSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/themeSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$productSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/productSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$categorySlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/categorySlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$addressSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/addressSlice.js [app-ssr] (ecmascript)"); // Add this import
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$userSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/userSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$orderSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/orderSlice.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        cart: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        wishlist: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$wishlistSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$themeSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        products: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$productSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        categories: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$categorySlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        address: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$addressSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        user: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$userSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        order: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$orderSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    }
});
}),
"[project]/redux/provider.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReduxProvider",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/store.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function ReduxProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/redux/provider.jsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[project]/redux/hooks.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppDispatch",
    ()=>useAppDispatch,
    "useAppSelector",
    ()=>useAppSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
;
const useAppDispatch = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
const useAppSelector = (selector)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])(selector);
}),
"[project]/components/navbar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$hooks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/hooks.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/authSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-ssr] (ecmascript) <export default as UserCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
'use client';
;
;
;
;
;
;
;
function Navbar() {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasMounted, setHasMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$hooks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$hooks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.auth);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$hooks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.user);
    const { totalQuantity, items } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$hooks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.cart);
    const profileDropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setHasMounted(true);
        const handleClickOutside = (event)=>{
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleLogout = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logoutUserAsync"])());
        setShowLogoutConfirm(false);
        setIsProfileDropdownOpen(false);
    };
    const navItems = [
        {
            label: 'Home',
            href: '/'
        },
        {
            label: 'Shop',
            href: '/shop'
        },
        {
            label: 'Blog',
            href: '/blog'
        },
        {
            label: 'About',
            href: '/about'
        },
        {
            label: 'Contact',
            href: '/contact'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/40 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "font-bold text-2xl text-blue-600 tracking-wide",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-900",
                                    children: " OakEmpire"
                                }, void 0, false, {
                                    fileName: "[project]/components/navbar.jsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/navbar.jsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex gap-8",
                                children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "text-gray-700 hover:text-blue-600 font-medium transition relative group",
                                        children: [
                                            item.label,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"
                                            }, void 0, false, {
                                                fileName: "[project]/components/navbar.jsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, item.href, true, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/navbar.jsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/checkout",
                                        className: "relative p-2 rounded-lg hover:bg-gray-100 transition",
                                        title: "View Cart",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                size: 22,
                                                className: "text-gray-700"
                                            }, void 0, false, {
                                                fileName: "[project]/components/navbar.jsx",
                                                lineNumber: 85,
                                                columnNumber: 15
                                            }, this),
                                            items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
                                                children: totalQuantity > 99 ? '99+' : totalQuantity
                                            }, void 0, false, {
                                                fileName: "[project]/components/navbar.jsx",
                                                lineNumber: 87,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this),
                                    !hasMounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 bg-gray-200 rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this) : isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 relative",
                                        ref: profileDropdownRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsProfileDropdownOpen((prev)=>!prev),
                                                className: "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        user?.profile_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: user.profile_image,
                                                            alt: "Profile",
                                                            className: "w-8 h-8 rounded-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/navbar.jsx",
                                                            lineNumber: 104,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                size: 16,
                                                                className: "text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/navbar.jsx",
                                                                lineNumber: 111,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/navbar.jsx",
                                                            lineNumber: 110,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "hidden sm:block text-sm text-gray-600 max-w-24 truncate",
                                                            children: user?.full_name || user?.name || "User"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/navbar.jsx",
                                                            lineNumber: 114,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/navbar.jsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/navbar.jsx",
                                                lineNumber: 98,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: isProfileDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 10,
                                                        scale: 0.95
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        y: 10,
                                                        scale: 0.95
                                                    },
                                                    transition: {
                                                        duration: 0.2
                                                    },
                                                    className: "absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-4 border-b border-gray-200",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    user?.profile_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: user.profile_image,
                                                                        alt: "Profile",
                                                                        className: "w-10 h-10 rounded-full object-cover"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/navbar.jsx",
                                                                        lineNumber: 134,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                            size: 18,
                                                                            className: "text-blue-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/navbar.jsx",
                                                                            lineNumber: 141,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/navbar.jsx",
                                                                        lineNumber: 140,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-medium text-gray-900 text-sm truncate",
                                                                                children: user?.full_name || user?.name || "User"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/navbar.jsx",
                                                                                lineNumber: 145,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-gray-500 truncate",
                                                                                children: user?.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/navbar.jsx",
                                                                                lineNumber: 148,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/navbar.jsx",
                                                                        lineNumber: 144,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/navbar.jsx",
                                                                lineNumber: 132,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/navbar.jsx",
                                                            lineNumber: 131,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/profile",
                                                                    onClick: ()=>setIsProfileDropdownOpen(false),
                                                                    className: "flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__["UserCircle"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/navbar.jsx",
                                                                            lineNumber: 162,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        "My Profile"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/navbar.jsx",
                                                                    lineNumber: 157,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/orders",
                                                                    onClick: ()=>setIsProfileDropdownOpen(false),
                                                                    className: "flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/navbar.jsx",
                                                                            lineNumber: 171,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        "My Orders"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/navbar.jsx",
                                                                    lineNumber: 166,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/blog",
                                                                    onClick: ()=>setIsProfileDropdownOpen(false),
                                                                    className: "flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/navbar.jsx",
                                                                            lineNumber: 181,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        "Blog"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/navbar.jsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/navbar.jsx",
                                                            lineNumber: 156,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2 border-t border-gray-200",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setShowLogoutConfirm(true),
                                                                className: "flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/navbar.jsx",
                                                                        lineNumber: 192,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Logout"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/navbar.jsx",
                                                                lineNumber: 188,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/navbar.jsx",
                                                            lineNumber: 187,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/navbar.jsx",
                                                    lineNumber: 123,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/navbar.jsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-sm hover:bg-blue-50 transition",
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsOpen((prev)=>!prev),
                                        className: "md:hidden p-2 rounded-lg hover:bg-gray-100 transition",
                                        children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/components/navbar.jsx",
                                            lineNumber: 214,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/components/navbar.jsx",
                                            lineNumber: 214,
                                            columnNumber: 43
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/navbar.jsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/navbar.jsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -8
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -6
                            },
                            transition: {
                                duration: 0.25
                            },
                            className: "md:hidden pb-4 border-t border-gray-200 mt-2",
                            children: [
                                navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        onClick: ()=>setIsOpen(false),
                                        className: "flex items-center gap-3 py-3 text-gray-700 hover:text-blue-600 font-medium transition",
                                        children: [
                                            item.label === 'Blog' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/components/navbar.jsx",
                                                lineNumber: 236,
                                                columnNumber: 45
                                            }, this),
                                            item.label
                                        ]
                                    }, item.href, true, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 230,
                                        columnNumber: 17
                                    }, this)),
                                !isAuthenticated && hasMounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-4 border-t border-gray-200 mt-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        onClick: ()=>setIsOpen(false),
                                        className: "block py-3 text-blue-600 font-medium transition",
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 243,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/navbar.jsx",
                                    lineNumber: 242,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/navbar.jsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/navbar.jsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/navbar.jsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showLogoutConfirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.9
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        exit: {
                            opacity: 0,
                            scale: 0.9
                        },
                        className: "bg-white rounded-xl shadow-lg p-6 m-4 max-w-sm w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                        size: 24,
                                        className: "text-red-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/navbar.jsx",
                                        lineNumber: 269,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/navbar.jsx",
                                    lineNumber: 268,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-gray-900 mb-2",
                                    children: "Confirm Logout"
                                }, void 0, false, {
                                    fileName: "[project]/components/navbar.jsx",
                                    lineNumber: 271,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-6",
                                    children: "Are you sure you want to logout?"
                                }, void 0, false, {
                                    fileName: "[project]/components/navbar.jsx",
                                    lineNumber: 274,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowLogoutConfirm(false),
                                            className: "flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/components/navbar.jsx",
                                            lineNumber: 278,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleLogout,
                                            className: "flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium",
                                            children: "Logout"
                                        }, void 0, false, {
                                            fileName: "[project]/components/navbar.jsx",
                                            lineNumber: 284,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/navbar.jsx",
                                    lineNumber: 277,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/navbar.jsx",
                            lineNumber: 267,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/navbar.jsx",
                        lineNumber: 261,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/navbar.jsx",
                    lineNumber: 260,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/navbar.jsx",
                lineNumber: 258,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/navbar.jsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout-client.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LayoutClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$navbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/navbar.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function LayoutClient({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAuthPage = pathname === '/login' || pathname === '/register';
    // Save org_id in localStorage once when layout loads
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('org_id', '1');
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.3
            },
            children: [
                !isAuthPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$navbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/components/layout-client.jsx",
                    lineNumber: 26,
                    columnNumber: 25
                }, this),
                children
            ]
        }, pathname, true, {
            fileName: "[project]/components/layout-client.jsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout-client.jsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/cart-hydration.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/cart-hydration.jsx
__turbopack_context__.s([
    "default",
    ()=>CartHydration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$hooks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/hooks.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/cartSlice.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function CartHydration() {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$hooks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load cart from localStorage when component mounts
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchCart"])());
    }, [
        dispatch
    ]);
    return null; // This component doesn't render anything
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5399328c._.js.map
const cookie = {}
cookie.getItem = e
function e(i) {
    let n = i + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(";")
    for (let j = 0; j < ca.length; j++) {
        let c = ca[j]
        while (c.charAt(0) == " ") {
            c = c.substring(1)
        }
        if (c.indexOf(n) == 0) {
            return c.substring(n.length, c.length)
        }
    }
    return ""
}
cookie.setItem = t
function t(n, i, r) {
    let d = new Date()
    if (r) {
        d.setTime(d.getTime() + r)
    } else {
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    }
    let e = "expires=" + d.toGMTString()
    document.cookie = n + "=" + i + ";" + e + ";path=/"
}

export function useCookie(key, init) {
    const c = function() {
        return cookie.getItem(key)
    }
    const i = function(data) {
        cookie.setItem(key, data)
    }
    if (init) i(init)
    return [c, i]
}

export function useStore(key, init) {
    const c = function() {
        return localStorage.getItem(key)
    }
    const i = function(data) {
        localStorage.setItem(key, data)
    }
    if (init) i(init)
    return [c, i]
}

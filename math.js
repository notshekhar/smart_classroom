function Num(s) {
    this.n = s.split("").map((e) => parseInt(e))
    this.n.unshift(0)
    this.length = () => this.n.length
    this.get = (i) => this.n[i]
    this.set = (i, e) => (this.n[i] = e)

    this.print = () => {
        let str = ""
        for (let i = 0; i < this.length(); i++) {
            str += `${this.get(i)} -> `
        }
        console.log(str)
    }

    this.add = function (n2) {
        let carry = false
        let len = Math.min(this.length(), n2.length())
        let [minString, maxString] =
            this.length() < n2.length() ? [this, n2] : [n2, this]
        let offset = maxString.length() - len

        for (let i = 0; i < len; i++) {
            let sum = minString.get(i) + maxString.get(i + offset)
            if (sum >= 10) {
                carry = true
                sum = sum % 10
            }
            maxString.set(i + offset, sum)
            let n = 1
            while (carry) {
                let sum = maxString.get(i + offset - n) + 1
                if (sum >= 10) {
                    sum = sum % 10
                } else {
                    carry = false
                }
                maxString.set(i + offset - n, sum)
                n++
            }
        }
        return maxString
    }
    this.m = (n) => {
        let prev = 0
        let carry = 0
        for (let i = 0; i < this.length(); i++) {
            let mul = this.get(i) * n
            if (mul > 9) {
                carry = Math.floor(mul / 10)
                mul = mul % 10
            }
            this.set(i, mul)
            let e = 1
            while (carry) {
                let sum = this.get(i - e) + carry
                if (sum > 9) {
                    carry = Math.floor(sum / 10)
                    sum = sum % 10
                } else {
                    carry = 0
                }
                this.set(i - e, sum)
                e++
            }
        }
        return this
    }
    this.mul = (n) => {
        let smallerNumber = this.length() > n.length() ? this : n
        let len = smallerNumber.length()
        for (let i = 0; i < len; i++) {}
    }
}

let n1 = new Num(
    "99999999999999999999999999999999999999999999999999999999999999999999"
)
let n2 = new Num(
    "99999999999999999999999999999999999999999999999999999999999999999999"
)
let d = Date.now()
// console.log(n1.add(n2))
console.log(n1.mul(9))
// console.log(Date.now() - d)

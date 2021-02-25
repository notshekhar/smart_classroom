export function handleRouterTransisitions(router) {
    router.afterEach((to, from) => {
        function sendTransition(out, int) {
            to.meta.transitionOut = "animate__animated " + out
            to.meta.transitionIn = "animate__animated " + int
        }
        function backINOUT(name, backName, forwardName) {
            if (from.name == name) {
                if (to.name == backName) {
                    sendTransition(
                        "animate__backOutRight",
                        "animate__backInLeft"
                    )
                }
                if (to.name == forwardName) {
                    sendTransition("animate__backOutUp", "animate__backInUp")
                }
            }
        }
        if (from.name == "getStarted") {
            sendTransition("animate__backOutLeft", "animate__backInRight")
        }
        backINOUT("getStarted2", "getStarted", "login")

        //home page active tabs
        function select_tab(tab) {
            to.meta.selected = tab
        }
        //handeling which tab to select in navigation bar
        select_tab(to.name)
    })
}

const PROXY_CONFIG = [
    {
        context: [
            "/usuario",
            "/desperfecto",

        ],
        target: "http://localhost:8080",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
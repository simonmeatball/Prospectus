import React from "react"
import { Link } from "react-router-dom"


function LoginButton() {
    return ( <Link to = "/login" className="btn btn-primary w-50 h-10 text-white ml-9 bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 "> Login to an account</Link>)
}

export default LoginButton
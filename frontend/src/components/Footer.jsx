import React from 'react'

const Footer = () => {
    return (
        <div className="bg-slate-900 text-white flex justify-between items-center px-4 h-16">
            <div className="font-bold text-xl p-2">
                <span className="text-green-700">&lt;</span>
                <span className="text-white">
                    Pass<span className="text-green-700">OP</span>
                </span>
                <span className="text-green-700">&gt;</span>
            </div>
            <div>
                Created with ❤️ by <a href="https://github.com/aadityaraj912739" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-700">
                    Aaditya Raj
                </a>

            </div>
        </div>

    )
}

export default Footer

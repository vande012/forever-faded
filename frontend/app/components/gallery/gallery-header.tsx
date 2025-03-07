"use client"

import { motion } from "framer-motion"
import { Scissors } from "lucide-react"

export function GalleryHeader() {
  return (
    <div className="relative overflow-hidden py-20 bg-black">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Scissors className="w-8 h-8 gold-gradient-bg rounded-lg mr-4" />
            <h1 className="font-urbanist text-4xl md:text-6xl font-bold gold-gradient-text">Our Work</h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-roboto text-gray-300 max-w-2xl mx-auto"
          >
            Browse through our gallery of premium cuts and styles. Each photo showcases our commitment to excellence and
            attention to detail.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}


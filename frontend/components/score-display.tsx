'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ScoreDisplayProps {
  score: number
  summary: string
}

export function ScoreDisplay({ score, summary }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    // Animate score count-up
    const duration = 1500
    const steps = 60
    const increment = score / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(interval)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [score])

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-500'
    if (score >= 51) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 75) return 'from-green-500 to-green-400'
    if (score >= 51) return 'from-yellow-500 to-yellow-400'
    return 'from-red-500 to-red-400'
  }

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl">Match Score</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center pt-4">
          {/* Circular Progress */}
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className={cn(getScoreColor(score))}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            {/* Score text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className={cn('text-4xl font-bold', getScoreColor(score))}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {displayScore}%
              </motion.span>
            </div>
          </div>

          {/* Score label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium mb-4',
              score >= 75 ? 'bg-green-500/10 text-green-600' :
              score >= 51 ? 'bg-yellow-500/10 text-yellow-600' :
              'bg-red-500/10 text-red-600'
            )}
          >
            {score >= 75 ? 'Excellent Match' : score >= 51 ? 'Good Match' : 'Needs Improvement'}
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-sm text-muted-foreground text-center max-w-sm"
          >
            {summary}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Section {
  name: string
  score: number
  feedback: string
  suggestions: string[]
}

interface StructureFeedbackProps {
  overallScore: number
  sections: Section[]
}

function getScoreColor(score: number) {
  if (score >= 75) return 'bg-green-500'
  if (score >= 51) return 'bg-yellow-500'
  return 'bg-red-500'
}

function getScoreTextColor(score: number) {
  if (score >= 75) return 'text-green-600'
  if (score >= 51) return 'text-yellow-600'
  return 'text-red-600'
}

function SectionItem({ section, index }: { section: Section; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border-b last:border-b-0 pb-4 last:pb-0"
    >
      <div
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{section.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={cn('font-semibold', getScoreTextColor(section.score))}>
            {section.score}%
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 mb-3">
        <Progress value={section.score} className="h-2" />
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-3">
              {/* Feedback */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-1">Feedback</h4>
                <p className="text-sm text-muted-foreground">{section.feedback}</p>
              </div>

              {/* Suggestions */}
              {section.suggestions.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">Suggestions</h4>
                  <ul className="space-y-1">
                    {section.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className={cn(getScoreTextColor(section.score))}>•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function StructureFeedback({ overallScore, sections }: StructureFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Structure Feedback</span>
            </CardTitle>
            <div className={cn('text-lg font-bold', getScoreTextColor(overallScore))}>
              Overall: {overallScore}%
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map((section, index) => (
              <SectionItem key={section.name} section={section} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
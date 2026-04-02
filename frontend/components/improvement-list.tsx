'use client'

import { motion } from 'framer-motion'
import { ArrowUp, ArrowRight, ArrowDown, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ImprovementSuggestion {
  priority: string
  section: string
  suggestion: string
}

interface ImprovementListProps {
  suggestions: ImprovementSuggestion[]
}

function getPriorityIcon(priority: string) {
  switch (priority.toLowerCase()) {
    case 'high':
      return <ArrowUp className="h-4 w-4" />
    case 'medium':
      return <ArrowRight className="h-4 w-4" />
    case 'low':
      return <ArrowDown className="h-4 w-4" />
    default:
      return <ArrowRight className="h-4 w-4" />
  }
}

function getPriorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-500/10 text-red-600 border-red-500/20'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
    case 'low':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

export function ImprovementList({ suggestions }: ImprovementListProps) {
  // Sort suggestions by priority
  const sortedSuggestions = [...suggestions].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority.toLowerCase() as keyof typeof priorityOrder] -
           priorityOrder[b.priority.toLowerCase() as keyof typeof priorityOrder]
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <span>Improvement Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedSuggestions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start space-x-3"
              >
                {/* Priority Badge */}
                <div className={cn(
                  'flex items-center space-x-1 px-2 py-1 rounded border text-xs font-semibold shrink-0',
                  getPriorityColor(item.priority)
                )}>
                  {getPriorityIcon(item.priority)}
                  <span className="capitalize">{item.priority}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {item.section}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.suggestion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
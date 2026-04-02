'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SkillAnalysisProps {
  matchedSkills: string[]
  missingSkills: string[]
  recommendations: string[]
}

export function SkillAnalysis({ matchedSkills, missingSkills, recommendations }: SkillAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>Skill Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Matched Skills</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-600">Missing Skills</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 pt-6 border-t"
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <span>Skill Recommendations</span>
              </h3>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-2 text-sm text-muted-foreground"
                  >
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>{rec}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
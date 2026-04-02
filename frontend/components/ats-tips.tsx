'use client'

import { motion } from 'framer-motion'
import { Info, FileSearch } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ATSTipsProps {
  tips: string[]
}

export function ATSTips({ tips }: ATSTipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <TooltipProvider>
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileSearch className="h-5 w-5 text-primary" />
                <span>ATS Optimization Tips</span>
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 rounded hover:bg-muted transition-colors">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    ATS (Applicant Tracking System) is software used by employers to
                    automatically scan and filter resumes. Optimizing your CV for ATS
                    increases your chances of passing this initial screening.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start space-x-2"
                >
                  <span className="text-primary mt-1">•</span>
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </motion.div>
              ))}
            </div>

            {/* ATS Info Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 p-4 bg-muted/50 rounded-lg"
            >
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> Following these tips helps ensure your resume
                passes through automated screening systems used by many companies.
                Always tailor your CV to the specific job requirements while maintaining
                a clean, parseable format.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </TooltipProvider>
    </motion.div>
  )
}
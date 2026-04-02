'use client'

import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { ScoreDisplay } from './score-display'
import { SkillAnalysis } from './skill-analysis'
import { StructureFeedback } from './structure-feedback'
import { ImprovementList } from './improvement-list'
import { ATSTips } from './ats-tips'
import { Button } from '@/components/ui/button'
import { AnalysisResponse } from '@/lib/api'

interface ResultsDisplayProps {
  result: AnalysisResponse
  onReset: () => void
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <Button onClick={onReset} variant="outline" className="flex items-center space-x-2">
          <RotateCcw className="h-4 w-4" />
          <span>Analyze Another CV</span>
        </Button>
      </motion.div>

      {/* Score Display */}
      <ScoreDisplay score={result.match_score} summary={result.match_summary} />

      {/* Skill Analysis */}
      <SkillAnalysis
        matchedSkills={result.skill_analysis.matched_skills}
        missingSkills={result.skill_analysis.missing_skills}
        recommendations={result.skill_analysis.recommendations}
      />

      {/* Structure Feedback */}
      <StructureFeedback
        overallScore={result.structure_feedback.overall_score}
        sections={result.structure_feedback.sections}
      />

      {/* Improvement Suggestions */}
      <ImprovementList suggestions={result.improvement_suggestions} />

      {/* ATS Tips */}
      <ATSTips tips={result.ats_tips} />
    </motion.div>
  )
}
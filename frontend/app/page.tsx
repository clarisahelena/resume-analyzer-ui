'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import { UploadSection } from '@/components/upload-section'
import { ResultsDisplay } from '@/components/results-display'
import { analyzeCV, AnalysisResponse } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResponse | null>(null)

  const handleAnalyze = useCallback(async (file: File, jobTitle: string, jobDescription: string) => {
    setIsLoading(true)
    try {
      const response = await analyzeCV(file, jobTitle, jobDescription)
      setResult(response)
      toast.success('CV analysis completed successfully!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to analyze CV'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleReset = useCallback(() => {
    setResult(null)
  }, [])

  return (
    <>
      <Toaster position="top-right" />
      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <LoadingSkeleton />
          </motion.div>
        ) : result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultsDisplay result={result} onReset={handleReset} />
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Resume Analyzer
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your CV and job description to get an AI-powered analysis
                including match score, skill gaps, and personalized improvement suggestions.
              </p>
            </motion.div>

            {/* Upload Section */}
            <UploadSection onAnalyze={handleAnalyze} isLoading={isLoading} />

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  title="Match Score"
                  description="Get an instant score showing how well your CV matches the job requirements."
                />
                <FeatureCard
                  title="Skill Analysis"
                  description="Identify matched and missing skills with specific recommendations."
                />
                <FeatureCard
                  title="ATS Tips"
                  description="Optimize your CV for Applicant Tracking Systems used by employers."
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </main>
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      <div className="flex justify-center">
        <div className="w-32 h-32">
          <Skeleton className="w-full h-full rounded-full" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}
'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface UploadSectionProps {
  onAnalyze: (file: File, jobTitle: string, jobDescription: string) => void
  isLoading: boolean
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function UploadSection({ onAnalyze, isLoading }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null)
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf') {
      return 'Only PDF files are allowed'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 5MB'
    }
    return null
  }

  const handleFileSelect = useCallback((selectedFile: File) => {
    const validationError = validateFile(selectedFile)
    if (validationError) {
      setError(validationError)
      setFile(null)
      return
    }
    setError(null)
    setFile(selectedFile)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }, [handleFileSelect])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }, [handleFileSelect])

  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleSubmit = useCallback(() => {
    if (!file || !jobTitle || !jobDescription) {
      setError('Please fill in all fields and upload a PDF')
      return
    }
    setError(null)
    onAnalyze(file, jobTitle, jobDescription)
  }, [file, jobTitle, jobDescription, onAnalyze])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label htmlFor="cv_file">Upload Your CV (PDF)</Label>
            <motion.div
              className={cn(
                'relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer',
                isDragging ? 'border-primary bg-primary/5' : 'border-border',
                file ? 'border-green-500 bg-green-500/5' : '',
                error ? 'border-red-500 bg-red-500/5' : ''
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                ref={fileInputRef}
                id="cv_file"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleInputChange}
              />

              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-2"
                  >
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your PDF here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Maximum file size: 5MB
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-8 w-8 text-green-500" />
                    <div className="flex flex-col">
                      <span className="font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFile()
                      }}
                      className="ml-4 p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 text-red-500 text-sm"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Job Title Input */}
          <div className="space-y-2">
            <Label htmlFor="job_title">Job Title</Label>
            <input
              id="job_title"
              type="text"
              placeholder="e.g., Backend Engineer, Software Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Job Description Input */}
          <div className="space-y-2">
            <Label htmlFor="job_description">Job Description / Requirements</Label>
            <textarea
              id="job_description"
              placeholder="Paste the full job description or list the key requirements..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !file || !jobTitle || !jobDescription}
            className="w-full h-12 text-base"
          >
            {isLoading ? (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <span>Analyzing your CV...</span>
              </motion.div>
            ) : (
              <span className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Analyze My CV</span>
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { CloudUpload, Bolt, FileText, Delete, Verified, Inbox } from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"
import AppLayout from "../../layouts/AppLayout"
import { cn } from "../../lib/utils"

export default function CandidateUploadPage() {
  const navigate = useNavigate()
  const { uploadedFiles, addUploadedFile, removeUploadedFile, clearAll, loadMockFiles, executeRanking } = useRecruitment()
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

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
    const files = Array.from(e.dataTransfer.files)
    files.forEach((file) => addUploadedFile(file))
  }, [addUploadedFile])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      files.forEach((file) => addUploadedFile(file))
    }
  }

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return
    setIsProcessing(true)
    try {
      await executeRanking()
      navigate("/processing")
    } catch (error) {
      setIsProcessing(false)
      // Error is handled in context and could be shown via toast
    }
  }

  const totalSize = uploadedFiles.reduce((acc, f) => acc + f.size / 1024 / 1024, 0).toFixed(2)
  const estTime = uploadedFiles.length > 0 ? Math.ceil(uploadedFiles.length * 0.4) : "--"

  return (
    <AppLayout>
      <div className="flex-1 max-w-container-max mx-auto w-full p-lg md:p-3xl flex flex-col">
        {/* Page Header */}
        <div className="mb-2xl flex flex-col md:flex-row md:items-end justify-between gap-lg">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface mb-xs">Resume Upload</h2>
            <p className="text-body-lg text-on-surface-variant">Batch process and rank candidates using autonomous intelligence.</p>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={uploadedFiles.length === 0 || isProcessing}
            className={cn(
              "px-xl py-md font-bold rounded-xl flex items-center gap-sm transition-all duration-300",
              uploadedFiles.length > 0
                ? "bg-primary-container text-on-primary-container hover:shadow-lg active:scale-95"
                : "bg-outline-variant text-on-surface-variant cursor-not-allowed"
            )}
          >
            {isProcessing ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Bolt className="w-5 h-5" />
            )}
            Analyze Resumes
          </button>
        </div>

        {/* Bento Layout Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-xl items-start">
          {/* Upload Zone (Bento Primary) */}
          <div className="xl:col-span-5 flex flex-col gap-xl">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative group bg-surface border-2 border-dashed rounded-3xl p-3xl flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[400px]",
                isDragging
                  ? "border-primary bg-surface-container-low scale-[1.01]"
                  : "border-outline-variant hover:border-primary-container hover:bg-surface-container-low"
              )}
            >
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept=".pdf,.docx,.txt"
              />
              
              <div className="mb-xl relative">
                <div className="absolute inset-0 bg-primary-container/10 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-32 h-32 bg-surface-container-high rounded-3xl flex items-center justify-center border border-outline-variant shadow-sm rotate-3 group-hover:rotate-0 transition-transform">
                  <CloudUpload className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <h3 className="text-headline-sm font-bold text-on-surface mb-sm">Drag and drop resumes</h3>
              <p className="text-body-md text-on-surface-variant max-w-xs mx-auto">
                Support for PDF, DOCX, and TXT files. Max 50 files per batch.
              </p>
              
              <div className="mt-2xl flex items-center gap-md">
                <span className="h-px w-8 bg-outline-variant" />
                <span className="text-label-md font-bold text-on-surface-variant">OR</span>
                <span className="h-px w-8 bg-outline-variant" />
              </div>
              
              <button className="mt-lg px-xl py-sm bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:bg-primary-container active:scale-95 transition-all relative z-20" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
                Browse Files
              </button>

              <button className="mt-md text-label-sm font-bold text-secondary hover:text-primary transition-colors underline relative z-20" onClick={(e) => { e.preventDefault(); e.stopPropagation(); loadMockFiles(); }}>
                Load Demo Resumes
              </button>
            </div>

            {/* Usage Stats Card */}
            <div className="bg-surface border border-outline-variant rounded-2xl p-lg flex items-center justify-between">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 bg-tertiary-fixed rounded-xl flex items-center justify-center">
                  <Verified className="w-6 h-6 text-on-tertiary-fixed" />
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Quality Score</p>
                  <p className="text-headline-sm font-bold text-on-surface">98.4% Accuracy</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-body-sm text-on-surface-variant">OCR Engine v4.2</p>
                <p className="text-label-md font-bold text-tertiary">Active</p>
              </div>
            </div>
          </div>

          {/* Queue Manager (Bento Secondary) */}
          <div className="xl:col-span-7 h-[540px]">
            <div className="bg-surface border border-outline-variant rounded-3xl overflow-hidden shadow-sm flex flex-col h-full">
              <div className="px-xl py-lg border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
                <div className="flex items-center gap-md">
                  <h3 className="text-headline-sm font-bold text-on-surface">Queue Manager</h3>
                  <span className="px-base py-[2px] bg-secondary-container text-on-secondary-container text-[11px] font-bold rounded-full">
                    {uploadedFiles.length} FILES
                  </span>
                </div>
                {uploadedFiles.length > 0 && (
                  <button onClick={clearAll} className="text-error font-label-md hover:underline transition-all">
                    Clear All
                  </button>
                )}
              </div>

              {/* Queue List */}
              <div className="flex-grow overflow-y-auto p-md space-y-md custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {uploadedFiles.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center py-3xl text-on-surface-variant/40"
                    >
                      <Inbox className="w-16 h-16 mb-md" />
                      <p className="text-body-md font-medium">Your upload queue is empty</p>
                    </motion.div>
                  ) : (
                    uploadedFiles.map((file) => (
                      <motion.div
                        key={file.name}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group flex items-center gap-md p-md bg-white border border-outline-variant rounded-2xl hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-10 h-10 bg-surface-container-high rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <div className="flex items-center justify-between mb-xs">
                            <h4 className="text-label-md font-bold text-on-surface truncate pr-md">{file.name}</h4>
                            <span className="text-label-sm font-bold text-primary">Ready</span>
                          </div>
                          <div className="flex items-center gap-md">
                            <span className="text-body-sm text-on-surface-variant whitespace-nowrap">
                              DOCX • {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                            <div className="h-1 flex-grow bg-outline-variant rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary-container"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeUploadedFile(file.name)}
                          className="p-sm text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Delete className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Summary Footer */}
              <div className="p-xl bg-surface-container-low border-t border-outline-variant mt-auto">
                <div className="flex items-center justify-between mb-md">
                  <span className="text-body-md text-on-surface-variant">Total Size</span>
                  <span className="text-label-md font-bold text-on-surface">{totalSize} MB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-md text-on-surface-variant">Processing Time (Est.)</span>
                  <span className="text-label-md font-bold text-on-surface">{estTime} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

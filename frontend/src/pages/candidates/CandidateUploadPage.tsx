import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecruitment } from "../../context/RecruitmentContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"

export default function CandidateUploadPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const { uploadedFiles, addUploadedFile, removeUploadedFile, loadMockFiles, clearAll } = useRecruitment()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      for (const file of files) {
        await addUploadedFile(file)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files)
      for (const file of files) {
        await addUploadedFile(file)
      }
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-[#030014] text-gray-200 antialiased font-sans relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14),transparent_55%)] pointer-events-none z-0" />

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-3xl space-y-8">
          
          {/* Breadcrumb / Back button */}
          <button 
            onClick={() => navigate("/job")}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Job Requirements
          </button>

          {/* Upload Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Upload Zone (Left Column) */}
            <div className="md:col-span-5 space-y-4">
              <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md p-0 overflow-hidden">
                <CardHeader className="p-5">
                  <CardTitle className="text-lg text-white">Upload Resumes</CardTitle>
                  <CardDescription>Drag and drop PDF, DOCX, or TXT candidate profiles to begin analysis.</CardDescription>
                </CardHeader>
                <CardContent className="px-5 pb-5 pt-0">
                  
                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple 
                    accept=".txt,.pdf,.docx" 
                    className="hidden" 
                  />

                  {/* Drop zone */}
                  <div 
                    onClick={triggerFileSelect}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group hover:scale-[1.01] ${
                      isDragActive 
                        ? "border-violet-500 bg-violet-950/20 shadow-lg shadow-violet-500/10" 
                        : "border-violet-500/25 hover:border-violet-500/50 bg-black/40"
                    }`}
                  >
                    <svg className="w-10 h-10 text-violet-400/60 group-hover:text-violet-400 mx-auto mb-3 transition-colors animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm font-semibold text-white block">
                      {isDragActive ? "Drop files now" : "Drop profiles here"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 block">Supports TXT, PDF, DOCX (max 10MB)</span>
                  </div>

                  {/* Mock actions block */}
                  <div className="mt-4 space-y-3">
                    <div className="relative text-center">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/5"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-[#0c0924] px-2 text-gray-500 font-mono">OR USE DEMO DATA</span>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={loadMockFiles}
                      className="w-full py-2.5 text-xs font-mono border-violet-500/30 text-violet-400 hover:bg-violet-950/20"
                    >
                      Load 4 Mock Profiles
                    </Button>
                  </div>

                </CardContent>
              </Card>
            </div>

            {/* Candidate List (Right Column) */}
            <div className="md:col-span-7 space-y-4">
              <Card className="border border-white/5 bg-[#0a0720]/60 backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                  <div>
                    <CardTitle className="text-lg text-white">Candidate Queue</CardTitle>
                    <CardDescription>
                      Uploaded Count: <span className="text-violet-400 font-mono font-semibold">{uploadedFiles.length}</span>
                    </CardDescription>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <button 
                      onClick={clearAll}
                      className="text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </CardHeader>
                <CardContent className="divide-y divide-white/5 max-h-[350px] overflow-y-auto px-6 py-0">
                  
                  {uploadedFiles.length > 0 ? (
                    uploadedFiles.map((file) => (
                      <div key={file.name} className="py-3.5 flex items-center justify-between gap-4 group">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm truncate max-w-[200px]">{file.name}</span>
                            <Badge variant="primary" className="text-[10px] py-0 px-1.5 font-mono">
                              {formatSize(file.size)}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            {file.name.endsWith(".txt") ? "Raw Text Content" : "Simulated Profile Format"}
                          </div>
                        </div>
                        <button
                          onClick={() => removeUploadedFile(file.name)}
                          className="p-1 rounded-md text-gray-500 hover:text-rose-400 hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 text-gray-500 space-y-2">
                      <svg className="w-10 h-10 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-sm">Queue is empty</p>
                      <p className="text-xs text-gray-600">Select files or drag them into the upload box</p>
                    </div>
                  )}

                </CardContent>

                <CardFooter className="border-t border-white/5 pt-4">
                  <Button 
                    variant="primary" 
                    className="w-full text-sm shadow-md"
                    disabled={uploadedFiles.length === 0}
                    onClick={() => navigate("/processing")}
                  >
                    Start AI Match & Rank ({uploadedFiles.length} Profiles)
                  </Button>
                </CardFooter>
              </Card>
            </div>

          </div>

        </div>
      </main>

      {/* Mini Footer */}
      <footer className="w-full border-t border-white/5 py-4 text-center text-xs text-gray-500 font-mono relative z-10">
        AI Candidate Ranking Engine. Phase C Backend Integration.
      </footer>

    </div>
  )
}

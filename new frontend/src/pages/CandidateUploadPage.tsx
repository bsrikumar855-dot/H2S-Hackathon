import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecruitmentContext } from "../context/RecruitmentContext"
import { rankingService } from "../services/apiClient"
import type { UploadedFile } from "../types/api"

export default function CandidateUploadPage() {
  const navigate = useNavigate()
  const { setUploadedFiles } = useRecruitmentContext()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const arr = Array.from(newFiles)
    
    // Convert to mock file array for UI and simple API call
    Promise.all(arr.map(file => {
      return new Promise<UploadedFile>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve({
            id: Math.random().toString(36).substring(7),
            name: file.name,
            size: parseFloat((file.size / 1024 / 1024).toFixed(2)),
            type: file.name.split('.').pop()?.toUpperCase() || "DOC",
            content: file.name.replace(/\.[^/.]+$/, "") + "\n\n" + (reader.result as string)
          })
        }
        reader.readAsText(file) // Simplification for mock ranking run which accepts text strings
      })
    })).then(mappedFiles => {
      setFiles(prev => [...prev, ...mappedFiles])
    })
  }

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id))
  }

  const handleAnalyze = async () => {
    if (files.length === 0) return
    setLoading(true)
    
    // Simulate real file upload to /candidates for proper architectural mapping
    // We send a dummy blob just to satisfy the /candidates API for the demo
    try {
      for (const file of files) {
        const dummyBlob = new Blob([file.content], { type: 'text/plain' })
        const dummyFile = new File([dummyBlob], file.name, { type: 'text/plain' })
        await rankingService.uploadCandidate(dummyFile)
      }
      
      // Pass to context for next step
      setUploadedFiles(files)
      navigate("/processing")
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-container-max mx-auto px-lg pt-xl pb-3xl flex flex-col animate-in-view visible">
      {/* Page Header */}
      <div className="mb-2xl flex flex-col md:flex-row md:items-end justify-between gap-lg">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Resume Upload</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Batch process and rank candidates using autonomous intelligence.</p>
        </div>
        <button 
          className={`px-xl py-md font-bold rounded-xl transition-all duration-300 flex items-center gap-sm ${files.length > 0 && !loading ? 'bg-primary-container text-on-primary-container hover:shadow-lg active:scale-95' : 'bg-outline-variant text-on-surface-variant cursor-not-allowed'}`} 
          disabled={files.length === 0 || loading} 
          onClick={handleAnalyze}
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined">bolt</span>
          )}
          {loading ? "Processing..." : "Analyze Resumes"}
        </button>
      </div>
      
      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        {/* Upload Zone */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-xl">
          <div 
            className={`relative group bg-surface border-2 border-dashed rounded-3xl p-3xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer min-h-[400px] ${isDragging ? 'border-primary bg-surface-container-low scale-[1.01]' : 'border-outline-variant hover:border-primary-container hover:bg-surface-container-low'}`}
            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false) }}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files) }}
          >
            <input 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              multiple type="file" 
              onChange={(e) => handleFiles(e.target.files)} 
            />
            {/* Empty State Illustration */}
            <div className="mb-xl relative">
              <div className="absolute inset-0 bg-primary-container/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-32 h-32 bg-surface-container-high rounded-3xl flex items-center justify-center border border-outline-variant shadow-sm rotate-3 group-hover:rotate-0 transition-transform">
                <span className="material-symbols-outlined text-primary text-5xl">cloud_upload</span>
              </div>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm font-bold">Drag and drop PDF resumes here</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">Support for PDF, DOCX, and TXT files. Max 50 files per batch.</p>
          </div>
          
          {/* Usage Stats Card */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-lg flex items-center justify-between">
            <div className="flex items-center gap-md">
              <div className="w-12 h-12 bg-tertiary-fixed rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-on-tertiary-fixed">verified</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Quality Score</p>
                <p className="font-headline-sm text-headline-sm text-on-surface font-bold">98.4% Accuracy <span className="text-on-surface-variant text-[14px] font-normal ml-xs">based on neural matching</span></p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Queue Manager */}
        <div className="lg:col-span-12 xl:col-span-7">
          <div className="bg-surface border border-outline-variant rounded-3xl overflow-hidden shadow-sm flex flex-col h-full min-h-[540px]">
            <div className="px-xl py-lg border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-md">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Queue Manager</h3>
                <span className="px-base py-[2px] bg-secondary-container text-on-secondary-container text-[11px] font-bold rounded-full">{files.length} FILES</span>
              </div>
              {files.length > 0 && (
                <button className="text-error font-label-md text-label-md hover:underline transition-all" onClick={() => setFiles([])}>Clear All</button>
              )}
            </div>
            
            {/* Queue List */}
            <div className="flex-grow overflow-y-auto p-md space-y-md">
              {files.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-3xl text-on-surface-variant/40">
                  <span className="material-symbols-outlined text-6xl mb-md">inventory_2</span>
                  <p className="font-body-md text-body-md">Your upload queue is empty</p>
                </div>
              ) : (
                files.map((file) => (
                  <div key={file.id} className="group flex items-center gap-md p-md bg-white border border-outline-variant rounded-2xl hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-surface-container-high rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary">description</span>
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <div className="flex items-center justify-between mb-xs">
                        <h4 className="font-label-md text-label-md text-on-surface truncate pr-md">{file.name}</h4>
                        <span className="font-label-sm text-label-sm text-primary font-bold">Ready</span>
                      </div>
                      <div className="flex items-center gap-md">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{file.type} • {file.size} MB</span>
                      </div>
                    </div>
                    <button onClick={() => removeFile(file.id)} className="p-sm text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

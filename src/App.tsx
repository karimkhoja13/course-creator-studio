import { useState } from 'react'
import { Icons } from './components/icons/Icons'
import { CourseCanvas } from './components/course/CourseCanvas'

// Unused - keeping for reference
const IconsOld = {
  Grid: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Filter: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M6 12h12M8 18h8" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Folder: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  File: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  ),
  Code: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
    </svg>
  ),
  FileText: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Undo: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
  ),
  Redo: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 7v6h-6" />
      <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
    </svg>
  ),
  Save: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17,21 17,13 7,13 7,21" />
      <polyline points="7,3 7,8 15,8" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
  Upload: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17,8 12,3 7,8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Target: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Lightbulb: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  Refresh: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Send: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  ),
  Pdf: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14,2 14,8 20,8" />
      <path d="M10 12H8v5h2v-2h1a2 2 0 0 0 0-4h-1z" />
    </svg>
  ),
  Bot: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Terminal: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4,17 10,11 4,5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
}

// Header Component
function Header() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')

  return (
    <header className="h-14 bg-fluid-bg-surface flex items-center justify-between px-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-fluid-bg-elevated flex items-center justify-center">
          <Icons.Grid />
        </div>
        <span className="font-semibold text-fluid-text-primary">Course Creator Studio</span>
        <span className="text-xs text-fluid-text-muted bg-fluid-bg-elevated px-2 py-0.5 rounded">
          v2.4.1
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-fluid-bg-elevated rounded-full p-1">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'editor'
                ? 'bg-fluid-bg-surface text-fluid-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.2)]'
                : 'text-fluid-text-muted hover:text-fluid-text-primary'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'preview'
                ? 'bg-fluid-bg-surface text-fluid-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.2)]'
                : 'text-fluid-text-muted hover:text-fluid-text-primary'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(45,212,191,0.15)] text-fluid-cyan font-medium text-sm transition-all duration-200 hover:bg-[rgba(45,212,191,0.2)] shadow-[inset_0_1px_0_rgba(45,212,191,0.3),0_2px_8px_rgba(45,212,191,0.2),0_0_0_1px_rgba(45,212,191,0.2)]">
          <Icons.Upload />
          Export
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-semibold text-white">
          K
        </div>
      </div>
    </header>
  )
}

// File Tree Item
function FileTreeItem({
  name,
  type,
  indent = 0,
  isSelected = false,
  isExpanded = false,
  hasIndicator = false,
}: {
  name: string
  type: 'folder' | 'file' | 'python' | 'reference' | 'pdf'
  indent?: number
  isSelected?: boolean
  isExpanded?: boolean
  hasIndicator?: boolean
}) {
  const getIcon = () => {
    switch (type) {
      case 'folder':
        return <Icons.Folder />
      case 'python':
        return <Icons.Code />
      case 'reference':
        return <Icons.Globe />
      case 'pdf':
        return <Icons.Pdf />
      default:
        return <Icons.File />
    }
  }

  const getColor = () => {
    switch (type) {
      case 'folder':
        return 'text-amber-400'
      case 'python':
        return 'text-fluid-purple'
      case 'reference':
        return 'text-fluid-cyan'
      case 'pdf':
        return 'text-red-400'
      default:
        return 'text-fluid-text-muted'
    }
  }

  return (
    <div
      className={`flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-[rgba(45,212,191,0.1)] shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.15)]'
          : 'hover:bg-[rgba(255,255,255,0.03)]'
      }`}
      style={{ paddingLeft: `${indent * 16 + 8}px` }}
    >
      {type === 'folder' && (
        <span className="text-fluid-text-muted">
          {isExpanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
        </span>
      )}
      <span className={getColor()}>{getIcon()}</span>
      <span className={`text-sm ${isSelected ? 'text-fluid-text-primary' : 'text-fluid-text-muted'}`}>
        {name}
      </span>
      {hasIndicator && <span className="w-1.5 h-1.5 rounded-full bg-fluid-cyan ml-auto" />}
    </div>
  )
}

// Knowledge Base Sidebar
function KnowledgeBaseSidebar() {
  return (
    <aside className="w-64 bg-fluid-bg-surface flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.3)]">
      <div className="p-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-fluid-text-muted uppercase tracking-wider">
          Knowledge Base
        </span>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-[rgba(255,255,255,0.05)] text-fluid-text-muted transition-colors">
            <Icons.Filter />
          </button>
          <button className="p-1.5 rounded hover:bg-[rgba(255,255,255,0.05)] text-fluid-text-muted transition-colors">
            <Icons.Search />
          </button>
        </div>
      </div>

      <div className="px-3 mb-3">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[rgba(45,212,191,0.1)] text-fluid-cyan text-sm font-medium transition-all duration-200 hover:bg-[rgba(45,212,191,0.15)] shadow-[inset_0_1px_0_rgba(45,212,191,0.2),0_2px_8px_rgba(45,212,191,0.1)]">
          <Icons.Plus />
          Add Source
          <Icons.ChevronDown />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <FileTreeItem name="course-platform-v1" type="folder" isExpanded hasIndicator />
        <FileTreeItem name="core/" type="folder" indent={1} />
        <FileTreeItem name="models.py" type="python" indent={1} hasIndicator />
        <FileTreeItem name="views.py" type="python" indent={1} isSelected hasIndicator />
        <div className="my-2" />
        <FileTreeItem name="react.dev/reference" type="reference" hasIndicator />
        <FileTreeItem name="System_Design.pdf" type="pdf" />
        <FileTreeItem name="Legacy_Codebase.pdf" type="pdf" />
      </div>

      <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-fluid-text-muted uppercase tracking-wider">Storage</span>
          <span className="text-fluid-cyan">Syncing...</span>
        </div>
        <div className="h-1.5 bg-fluid-bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fluid-cyan to-fluid-purple rounded-full"
            style={{ width: '24%' }}
          />
        </div>
        <div className="flex justify-between text-xs text-fluid-text-muted mt-1">
          <span>1.2 GB</span>
          <span>5 GB</span>
        </div>
      </div>
    </aside>
  )
}

// CourseCanvas is now imported from components

// AI Co-Pilot Sidebar
function AICoPilotSidebar() {
  const [inputValue, setInputValue] = useState('')

  return (
    <aside className="w-80 bg-fluid-bg-surface flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.3)]">
      {/* Co-Pilot Header */}
      <div className="p-4 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
          <Icons.Bot />
        </div>
        <div className="flex-1">
          <div className="font-medium">AI Co-Pilot</div>
          <div className="text-xs text-fluid-cyan">Assistant Active</div>
        </div>
        <button className="p-1.5 rounded hover:bg-[rgba(255,255,255,0.05)] text-fluid-text-muted">
          <Icons.Clock />
        </button>
        <button className="p-1.5 rounded hover:bg-[rgba(255,255,255,0.05)] text-fluid-text-muted">
          <Icons.Settings />
        </button>
      </div>

      {/* Linked Context */}
      <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2 text-xs text-fluid-text-muted mb-2">
          LINKED TO:
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded text-xs bg-[rgba(45,212,191,0.15)] text-fluid-cyan flex items-center gap-1">
            <Icons.BookOpen />
            Chapter 2
          </span>
          <span className="px-2 py-1 rounded text-xs bg-[rgba(255,255,255,0.08)] text-fluid-text-muted flex items-center gap-1">
            <Icons.Code />
            agent.py
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Timestamp */}
        <div className="text-center text-xs text-fluid-text-muted">TODAY, 2:41 PM</div>

        {/* User Message */}
        <div className="flex gap-3">
          <div className="flex-1" />
          <div className="max-w-[85%]">
            <div className="bg-fluid-bg-elevated rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
              I need to add a quick quiz about memory initialization. Can you generate one based on
              the current code context?
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-semibold">
            JD
          </div>
        </div>

        {/* AI Response */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0">
            <Icons.Bot />
          </div>
          <div className="max-w-[85%] space-y-3">
            <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
              Certainly! I see you're working on the{' '}
              <code className="px-1.5 py-0.5 rounded bg-fluid-bg-elevated font-mono text-fluid-purple text-xs">
                __init__
              </code>{' '}
              method in agent.py. A 3-question Deep Grill would be perfect here to reinforce the
              concept of state management.
            </div>

            {/* Suggested Deep Grill Card */}
            <div className="rounded-xl bg-[rgba(255,255,255,0.03)] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.2)]">
              <div className="p-3 flex items-center gap-2">
                <span className="text-fluid-purple">
                  <Icons.Lightbulb />
                </span>
                <span className="font-medium text-sm">Suggested Deep Grill</span>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-[rgba(167,139,250,0.15)] text-fluid-purple text-xs">
                  3 Questions
                </span>
              </div>
              <div className="px-3 pb-3 space-y-2">
                <div className="flex items-start gap-2 text-sm text-fluid-text-muted">
                  <span className="text-fluid-text-muted text-xs">01</span>
                  <span>What is the default memory size?</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-fluid-text-muted">
                  <span className="text-fluid-text-muted text-xs">02</span>
                  <span>Which variable tracks the agent status?</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-fluid-text-muted">
                  <span className="text-fluid-text-muted text-xs">03</span>
                  <span>How is the memory buffer initialized?</span>
                </div>
              </div>
              <div className="p-3 flex items-center gap-2 border-t border-[rgba(255,255,255,0.05)]">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[rgba(45,212,191,0.15)] text-fluid-cyan text-sm font-medium transition-all duration-200 hover:bg-[rgba(45,212,191,0.2)] shadow-[inset_0_1px_0_rgba(45,212,191,0.3),0_2px_8px_rgba(45,212,191,0.2)]">
                  <Icons.Plus />
                  Insert into Chapter 2
                </button>
                <button className="p-2.5 rounded-lg bg-[rgba(255,255,255,0.05)] text-fluid-text-muted hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                  <Icons.Refresh />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Another AI Response */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0">
            <Icons.Bot />
          </div>
          <div className="max-w-[85%] space-y-3">
            <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
              I also noticed the{' '}
              <code className="px-1.5 py-0.5 rounded bg-fluid-bg-elevated font-mono text-fluid-purple text-xs">
                process_request
              </code>{' '}
              function could use a coding challenge.
            </div>

            {/* Coding Challenge Card */}
            <div className="rounded-xl bg-[rgba(255,255,255,0.03)] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.2)]">
              <div className="p-3 flex items-center gap-2">
                <span className="text-fluid-amber">
                  <Icons.Terminal />
                </span>
                <span className="font-medium text-sm">Coding Challenge Card</span>
              </div>
              <div className="px-3 pb-3">
                <div className="font-medium text-sm mb-1">Implement Request Processing</div>
                <div className="text-xs text-fluid-text-muted">
                  Create a challenge where students must implement the if/else logic for status
                  checks.
                </div>
              </div>
              <div className="p-3 space-y-2 border-t border-[rgba(255,255,255,0.05)]">
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-fluid-text-primary text-sm font-medium transition-all duration-200 hover:bg-[rgba(255,255,255,0.08)]">
                  <Icons.Eye />
                  Preview Challenge
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[rgba(45,212,191,0.15)] text-fluid-cyan text-sm font-medium transition-all duration-200 hover:bg-[rgba(45,212,191,0.2)]">
                  <Icons.Plus />
                  Insert into Chapter 2
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-fluid-text-muted hover:bg-[rgba(255,255,255,0.08)] transition-colors">
            <Icons.Plus />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Co-Pilot to generate content..."
              className="w-full bg-[rgba(255,255,255,0.04)] rounded-xl px-4 py-3 pr-12 text-sm placeholder:text-fluid-text-muted/50 focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] transition-all"
            />
          </div>
          <button className="p-3 rounded-full bg-fluid-cyan text-fluid-bg-deep hover:bg-[#3de0cc] transition-colors shadow-[0_4px_16px_rgba(45,212,191,0.3)]">
            <Icons.Send />
          </button>
        </div>
        <div className="text-xs text-fluid-text-muted/50 text-center mt-2">
          AI can make mistakes. Please review generated content.
        </div>
      </div>
    </aside>
  )
}

// Main App Component
function App() {
  return (
    <div className="h-screen flex flex-col bg-fluid-bg-deep">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <KnowledgeBaseSidebar />
        <CourseCanvas />
        <AICoPilotSidebar />
      </div>
    </div>
  )
}

export default App

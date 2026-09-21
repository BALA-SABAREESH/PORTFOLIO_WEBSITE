import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/portfolioData';
import { BlogArticle } from '../types';
import { BookOpen, Calendar, Clock, ArrowLeft, ArrowRight, Tag, Code2 } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  if (selectedArticle) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
            data-cursor="Back"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Technical Articles</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 pb-8 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,210,255,0.15)]">
                {selectedArticle.category}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {selectedArticle.date}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              {selectedArticle.excerpt}
            </p>
          </div>

          {/* Article Content */}
          <div className="py-8 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
            {selectedArticle.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {section.heading}
                </h3>
                <p className="text-slate-300">{section.text}</p>

                {section.codeSnippet && (
                  <div className="rounded-2xl bg-[#090b10] border border-slate-800 overflow-hidden my-4 shadow-2xl">
                    <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300">Snippet: {section.codeSnippet.language}</span>
                      </span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {section.bullets && (
                  <ul className="space-y-2 pl-2">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="text-cyan-400 mt-1.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-cyan-400" />
            {selectedArticle.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-400/40 transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider">Engineering Insights</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technical Articles &{' '}
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ff5e7e] bg-clip-text text-transparent">
              Case Studies
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Architectural case studies, engineering trade-offs, and technical breakdowns from production full-stack, mobile, and Agentic AI projects.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => {
                setSelectedArticle(article);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0e121a] to-[#090b10] border border-slate-800/80 hover:border-cyan-400/50 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between relative overflow-hidden"
              data-cursor="Read"
            >
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-cyan-500/5 group-hover:bg-cyan-500/10 blur-2xl transition-all pointer-events-none" />
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 font-semibold">
                    {article.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2.5 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span className="text-slate-500 font-mono text-[11px]">{article.date}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

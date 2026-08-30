import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sparkles, Clock, User, ArrowRight, BookOpen, Crown, ChevronRight, Share2, Check } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '@/services/mehndiData';
import { BlogPost } from '@/types/mehndi';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Care & Staining', 'Styles & Culture', 'Bridal Trends', 'Artist Tips'];

  const filteredPosts = selectedCategory === 'All'
    ? MOCK_BLOG_POSTS
    : MOCK_BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Bridal Henna Lookbook & Journal</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
          The Bridal Henna Gazette
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6763] dark:text-[#B2C2BC]">
          Master artisan guides on achieving the darkest stains, matching motifs to your bridal gown, and wedding timeline planning.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white dark:bg-[#0E1A16] text-[#5C6763] dark:text-[#B2C2BC] border border-[#EFE7DA] dark:border-[#1F362E] hover:border-[#C59B27]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group rounded-[2rem] p-1.5 bg-gradient-to-b from-[#EFE7DA] to-[#F8F4EB] dark:from-[#1F362E] dark:to-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="rounded-[calc(2rem-0.375rem)] bg-white dark:bg-[#07100D] overflow-hidden flex flex-col h-full">
              
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{post.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#1A2421] dark:text-[#F8F5EE] group-hover:text-[#064E3B] dark:group-hover:text-[#E5C07B] transition-colors leading-tight">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author Info & Read Link */}
                <div className="pt-4 border-t border-[#EFE7DA] dark:border-[#1F362E] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-7 h-7 rounded-full object-cover border border-[#C59B27]"
                    />
                    <span className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                      {post.authorName}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[#064E3B] dark:text-[#E5C07B] hover:underline flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>
          </article>
        ))}
      </div>

    </div>
  );
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug) || MOCK_BLOG_POSTS[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5C6763] dark:text-[#B2C2BC]">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to="/blog" className="hover:underline">Henna Gazette</Link>
        <span>/</span>
        <span className="truncate max-w-xs text-[#1A2421] dark:text-[#F8F5EE] font-semibold">{post.title}</span>
      </div>

      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <span className="px-3.5 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-wider">
          {post.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A2421] dark:text-[#F8F5EE] leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-[#EFE7DA] dark:border-[#1F362E] pb-6">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover border border-[#C59B27]"
            />
            <div>
              <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">{post.authorName}</p>
              <p className="text-[10px] text-[#5C6763] dark:text-[#B2C2BC]">{post.authorRole} • {post.publishedDate}</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-full border border-[#EFE7DA] text-xs font-semibold flex items-center gap-1.5 hover:bg-black/5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied' : 'Share Guide'}</span>
          </button>
        </div>
      </div>

      {/* Featured Banner Image */}
      <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-xl border border-[#EFE7DA] dark:border-[#1F362E]">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content Body */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm space-y-6 text-sm text-[#1A2421] dark:text-[#F8F5EE] leading-relaxed whitespace-pre-line font-sans">
        {post.content}
      </div>

      {/* Bottom CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#064E3B] to-[#022C22] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-2xl font-bold">Ready to Book Your Bridal Artist?</h3>
          <p className="text-xs text-gray-200">Browse verified artisans and reserve your wedding date today.</p>
        </div>
        <Link
          to="/artists"
          className="px-6 py-3 rounded-full bg-[#C59B27] text-black font-bold text-xs hover:bg-[#E5C07B] transition-colors whitespace-nowrap"
        >
          Explore Master Artists →
        </Link>
      </div>

    </article>
  );
};

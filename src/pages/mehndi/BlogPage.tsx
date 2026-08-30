import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowRight, ArrowLeft, Share2, Tag } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '@/services/mehndiData';
import { BlogPost } from '@/types/mehndi';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Care & Staining', 'Styles & Culture', 'Bridal Trends'];

  const filteredBlogs = selectedCategory === 'All'
    ? MOCK_BLOG_POSTS
    : MOCK_BLOG_POSTS.filter((b: BlogPost) => b.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] block">
          Editorial Journal & Guides
        </span>
        <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
          The Bridal Henna Gazette
        </h1>
        <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298]">
          Curated botanical aftercare rituals, design history archives, and master artisan profiles.
        </p>
      </div>

      {/* Categories */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
              selectedCategory === cat
                ? 'bg-[#1C1A18] text-white dark:bg-[#F7F5F0] dark:text-[#141312]'
                : 'border border-[#E8E2D9] text-[#6B665F] hover:border-[#1C1A18]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Lead Story */}
      {filteredBlogs[0] && (
        <div className="editorial-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#F4EFEB]">
            <img
              src={filteredBlogs[0].coverImage}
              alt={filteredBlogs[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E5A3C]">
                {filteredBlogs[0].category} · {filteredBlogs[0].readTimeMinutes} min read
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0] leading-snug">
                <Link to={`/blog/${filteredBlogs[0].slug}`} className="hover:text-[#8E5A3C] transition-colors">
                  {filteredBlogs[0].title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
                {filteredBlogs[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
              <span className="text-xs text-[#9E988F]">{filteredBlogs[0].publishedDate} · By {filteredBlogs[0].authorName}</span>
              <Link to={`/blog/${filteredBlogs[0].slug}`} className="btn-primary !py-2 !px-4 !text-xs">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.slice(1).map((post: BlogPost) => (
          <div key={post.id} className="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#F4EFEB]">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E5A3C]">
                  {post.category} · {post.readTimeMinutes} min read
                </span>
                <h3 className="font-serif-editorial text-lg font-bold text-[#1C1A18] dark:text-[#F7F5F0] hover:text-[#8E5A3C] transition-colors leading-tight">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#6B665F] dark:text-[#A8A298] line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#9E988F]">
              <span>{post.publishedDate}</span>
              <Link to={`/blog/${post.slug}`} className="font-bold text-[#1C1A18] dark:text-[#F7F5F0] hover:underline">
                Read Article →
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_BLOG_POSTS.find((b: BlogPost) => b.slug === slug) || MOCK_BLOG_POSTS[0];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 pb-24">
      <Link to="/blog" className="text-xs font-semibold text-[#6B665F] hover:text-[#1C1A18] flex items-center gap-1.5">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Gazette</span>
      </Link>

      <div className="space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#8E5A3C]">
          {post.category} · {post.readTimeMinutes} Min Read
        </span>
        <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#1C1A18] dark:text-[#F7F5F0] leading-tight">
          {post.title}
        </h1>
        <p className="text-xs text-[#6B665F]">
          Published on {post.publishedDate} · Written by <strong className="text-[#1C1A18] dark:text-[#F7F5F0]">{post.authorName}</strong> ({post.authorRole})
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-[#F4EFEB] border border-[#E8E2D9]">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Body */}
      <div className="prose max-w-none text-xs sm:text-sm text-[#1C1A18] dark:text-[#F7F5F0] leading-relaxed space-y-4 pt-4 font-serif-editorial">
        <p className="text-base sm:text-lg font-medium italic text-[#6B665F] dark:text-[#A8A298]">
          "{post.excerpt}"
        </p>
        <p>
          The ritual of bridal henna is among the oldest continuous cosmetic ceremonies in human history. To understand how to achieve a deep, rich burgundy-to-mahogany hue on your wedding day, one must first understand the botanical chemistry of Lawsonia inermis.
        </p>
        <h3 className="font-serif-editorial text-2xl font-bold pt-4 text-[#1C1A18] dark:text-[#F7F5F0]">
          1. The 48-Hour Oxidation Timeline
        </h3>
        <p>
          When organic henna paste is first removed from the skin, the resulting stain is a vibrant, bright pumpkin orange. This is natural and expected. Over the subsequent 24 to 48 hours, the lawsone molecules bind with the keratin proteins in your outer epidermal layers and oxidize upon exposure to atmospheric oxygen.
        </p>
        <h3 className="font-serif-editorial text-2xl font-bold pt-4 text-[#1C1A18] dark:text-[#F7F5F0]">
          2. Heat & Botanical Essential Oils
        </h3>
        <p>
          Natural body heat accelerates the molecular oxidation rate. Artisans at Zari & Henna utilize pure terpene-rich essential oils (cajeput, tea tree, and eucalyptus) to enhance stain depth without exposing your skin to dangerous industrial chemical accelerators.
        </p>
      </div>

      {/* Tags */}
      <div className="pt-8 border-t border-[#E8E2D9] dark:border-[#2A2724] flex flex-wrap gap-2">
        {post.tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#F4EFEB] dark:bg-[#23211E] text-[#6B665F]">
            #{tag}
          </span>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-[#F4EFEB] dark:bg-[#1C1A18] border border-[#E8E2D9] text-center space-y-4">
        <h3 className="font-serif-editorial text-2xl font-bold">Ready to Commission Your Bridal Artist?</h3>
        <p className="text-xs text-[#6B665F]">Explore vetted master artisans across Dubai, London, New York, and Delhi.</p>
        <Link to="/artists" className="btn-primary">Browse Master Artisans</Link>
      </div>

    </article>
  );
};

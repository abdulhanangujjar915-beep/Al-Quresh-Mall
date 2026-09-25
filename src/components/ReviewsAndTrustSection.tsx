import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ThumbsUp, 
  UserCheck, 
  MessageSquare, 
  MapPin, 
  Plus, 
  Sparkles 
} from 'lucide-react';
import { ReviewItem } from '../types/mall';

interface ReviewsAndTrustSectionProps {
  reviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewsAndTrustSection: React.FC<ReviewsAndTrustSectionProps> = ({
  reviews,
  onAddReview
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [cityArea, setCityArea] = useState('Millat Town, Faisalabad');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [categoryMentioned, setCategoryMentioned] = useState("Cosmetics & Lifts");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      cityArea: cityArea.trim(),
      rating: rating,
      date: 'Today',
      comment: comment.trim(),
      verifiedVisit: true,
      categoryMentioned: categoryMentioned
    };

    onAddReview(newRev);
    setAuthor('');
    setComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Community Trust & Verified Visitor Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900">
            Customer Reviews & Mall Trust
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Read what Faisalabad families, shoppers, and business clients say about our high-speed lifts, round-the-clock security, original cosmetics, and munasib pricing.
          </p>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Mall Review</span>
        </button>
      </div>

      {/* Trust Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 tabular-nums">4.9 / 5.0</div>
            <div className="text-xs text-slate-500">Over 500+ Verified Ratings</div>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">Family Safe</div>
            <div className="text-xs text-slate-500">24/7 CCTV & Security On Duty</div>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">Elevators Active</div>
            <div className="text-xs text-slate-500">Smooth Multi-Floor Access</div>
          </div>
        </div>
      </div>

      {/* Review Form Drawer/Card */}
      {showReviewForm && (
        <form onSubmit={handleSubmit} className="p-6 bg-white border border-emerald-300 rounded-2xl space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>Share Your Al Quresh Mall Experience</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-600 block mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mian Tariq"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 block mb-1">Area / City *</label>
              <input
                type="text"
                required
                value={cityArea}
                onChange={(e) => setCityArea(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 block mb-1">Rating (1 to 5 Stars)</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              >
                <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                <option value={3}>★★★☆☆ (3 Stars - Good)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-600 block mb-1">Category / Stores Visited</label>
            <input
              type="text"
              value={categoryMentioned}
              onChange={(e) => setCategoryMentioned(e.target.value)}
              placeholder="e.g. Cosmetics, Whitening Cream, Suits, Perfumes, Lifts"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 block mb-1">Review Comments *</label>
            <textarea
              rows={3}
              required
              placeholder="Aap ka Al Quresh Mall ka tajurba kaisa raha? Lifts, security, mahol, aur cosmetics/suits ki quality par raye dein..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2 text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Publish Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviews.map(rev => (
          <div
            key={rev.id}
            className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 hover:border-emerald-300 transition-colors shadow-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900">{rev.author}</h4>
                  {rev.verifiedVisit && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      <UserCheck className="w-3 h-3" />
                      <span>Verified Shopper</span>
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-700" />
                  <span>{rev.cityArea}</span>
                  <span>·</span>
                  <span>{rev.date}</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center text-amber-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{rev.comment}"
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Mentioned: <strong className="text-slate-800">{rev.categoryMentioned}</strong></span>
              <span className="text-emerald-700 font-semibold">✓ Recommended Mall</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { Calendar, ExternalLink, Clock } from 'lucide-react';

const NewsCardComponent = ({ title, desc, image, source, time }) => {
    return (
        <article className="group relative w-full max-w-[420px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300"/>
                
                {/* Image */}
                <img 
                    src={image} 
                    loading="lazy" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    alt={title}
                />

                {/* Source Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/95 text-gray-900 shadow-sm backdrop-blur-sm border border-white/20">
                        {source}
                    </span>
                </div>

                {/* Time Badge */}
                <div className="absolute bottom-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/90">
                        <Clock size={14} className="stroke-white/90" />
                        {new Date(time).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {desc}
                </p>

                {/* Footer */}
                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                    {/* Date */}
                    <time className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-2 stroke-gray-400" />
                        {new Date(time).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </time>

                    {/* Read More Button */}
                    <button className="group/btn inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 rounded-lg hover:bg-blue-50/50">
                        Read More
                        <ExternalLink size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default NewsCardComponent;

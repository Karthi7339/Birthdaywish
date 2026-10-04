import React, { useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export default function SmartImage({
  src,
  alt = 'Memory photograph',
  className = '',
  aspectRatio = '4/3',
  caption = '',
  onClick = null,
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        overflow: 'hidden',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(247, 200, 216, 0.2)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      className={`group ${className}`}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(250,217,193,0.3) 0%, rgba(247,200,216,0.5) 50%, rgba(250,217,193,0.3) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.8s infinite linear',
            zIndex: 1,
          }}
        />
      )}

      {/* Image if no error */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      ) : (
        /* Graceful artistic fallback */
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(247,200,216,0.6) 0%, rgba(250,217,193,0.7) 50%, rgba(217,184,232,0.6) 100%)',
            padding: '1.5rem',
            textAlign: 'center',
            color: '#3B3035',
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
              boxShadow: '0 4px 12px rgba(59,48,53,0.08)',
            }}
          >
            <Camera size={24} color="#D6A85F" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontWeight: 600,
              marginBottom: '0.25rem',
            }}
          >
            {caption || 'Cherished Memory'}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'rgba(59,48,53,0.7)',
              letterSpacing: '0.5px',
            }}
          >
            Photo Moment
          </span>
        </div>
      )}
    </div>
  );
}

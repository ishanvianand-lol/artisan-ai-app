import { NextResponse } from 'next/server';

// For demo purposes - replace with your actual AI API
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Valid prompt is required' },
        { status: 400 }
      );
    }

    // Validate prompt length
    if (prompt.length > 250) {
      return NextResponse.json(
        { error: 'Prompt too long. Maximum 250 characters.' },
        { status: 400 }
      );
    }

    // For development - return mock data
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockImage = {
        id: Date.now(),
        url: `https://picsum.photos/512/512?random=${Date.now()}`,
        prompt: prompt,
        rating: (4.0 + Math.random()).toFixed(1),
        downloads: Math.floor(Math.random() * 100),
        category: 'generated',
        isNew: true,
        createdAt: new Date().toISOString()
      };

      return NextResponse.json(mockImage);
    }

    // Production implementation with OpenAI DALL-E
    if (OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "url"
          }),
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        
        const generatedImage = {
          id: Date.now(),
          url: data.data[0].url,
          prompt: prompt,
          rating: (4.0 + Math.random()).toFixed(1),
          downloads: 0,
          category: 'generated',
          isNew: true,
          createdAt: new Date().toISOString()
        };

        return NextResponse.json(generatedImage);

      } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json(
          { error: 'Failed to generate image with OpenAI' },
          { status: 500 }
        );
      }
    }

    // Alternative: Gemini API implementation
    if (GEMINI_API_KEY) {
      try {
        // Note: Gemini doesn't have image generation API yet
        // This is a placeholder for when it becomes available
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Create an image generation prompt for: ${prompt}`
              }]
            }]
          }),
        });

        // For now, return mock data
        const mockImage = {
          id: Date.now(),
          url: `https://picsum.photos/512/512?random=${Date.now()}`,
          prompt: prompt,
          rating: (4.0 + Math.random()).toFixed(1),
          downloads: 0,
          category: 'generated',
          isNew: true,
          createdAt: new Date().toISOString()
        };

        return NextResponse.json(mockImage);

      } catch (error) {
        console.error('Gemini API error:', error);
        return NextResponse.json(
          { error: 'Failed to generate image with Gemini' },
          { status: 500 }
        );
      }
    }

    // Fallback if no API keys are configured
    return NextResponse.json(
      { error: 'No AI API configured. Please set OPENAI_API_KEY or GEMINI_API_KEY in environment variables.' },
      { status: 500 }
    );

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Rate limiting helper (optional)
const rateLimiter = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5; // Max 5 requests per minute

  if (!rateLimiter.has(ip)) {
    rateLimiter.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const limit = rateLimiter.get(ip);
  
  if (now > limit.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (limit.count >= maxRequests) {
    return false;
  }

  limit.count++;
  return true;
}
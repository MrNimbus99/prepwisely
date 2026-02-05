import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

export const useSEO = ({
  title = 'NestedCerts - AWS Certification Exam Prep | Practice Tests & Study Platform',
  description = 'Ace your AWS certification exams with NestedCerts. Get daily practice tests, detailed analytics, 30-day study plans, and expert-crafted questions for all AWS certifications.',
  keywords = 'AWS certification, AWS exam prep, AWS practice tests, AWS Solutions Architect, AWS Developer Associate, AWS SysOps Administrator',
  canonical = 'https://nestedcerts.com/',
  ogImage = 'https://nestedcerts.com/og-image.jpg',
  noindex = false
}: SEOProps = {}) => {
  useEffect(() => {
    // Update title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Primary meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow')
    } else {
      updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    }

    // Open Graph
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:url', canonical, true)
    updateMetaTag('og:image', ogImage, true)

    // Twitter
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', ogImage)

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonical
  }, [title, description, keywords, canonical, ogImage, noindex])
}

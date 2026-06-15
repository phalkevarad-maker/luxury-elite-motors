'use client'

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Badge } from "@/components/ui/Badge"
import Image from "next/image"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

const blogPosts: Record<string, any> = {
  "future-of-luxury-automotive": {
    title: "The Future of Luxury Automotive: 2025 Trends",
    excerpt: "Discover the cutting-edge trends shaping the future of luxury automobiles.",
    content: "The luxury automotive landscape is evolving at an unprecedented pace. From electrification to autonomous driving, the next generation of luxury vehicles will redefine what's possible. In this comprehensive analysis, we explore the key trends that will shape the industry in 2025 and beyond.\n\nElectric Revolution: Every major luxury manufacturer has committed to an electric future. Rolls Royce's Spectre, the brand's first EV, proves that silent propulsion can be the ultimate expression of luxury.\n\nBespoke Digitalization: Customization is moving beyond physical options. Digital interfaces now allow clients to visualize every aspect of their vehicle before production.\n\nSustainable Luxury: Eco-conscious materials and sustainable production methods are becoming hallmarks of true luxury.",
    author: "James Harrington",
    date: "2024-12-10",
    category: "Industry Trends",
    image: "/images/blog/luxury-future.jpg",
    tags: ["Luxury", "Trends", "2025", "Electric"]
  },
  "rolls-royce-spectre-review": {
    title: "Rolls Royce Spectre: The Electric Era Begins",
    excerpt: "Our exclusive first drive of the most anticipated luxury EV.",
    content: "The Rolls Royce Spectre marks a historic moment in automotive history. As the brand's first fully electric vehicle, it carries the weight of tradition while embracing the future. We spent a week with the Spectre to understand what makes it truly special.\n\nThe Silence: Without an engine, the Spectre is the quietest Rolls Royce ever. The famous 'waftability' is enhanced by instant torque and seamless acceleration.\n\nThe Design: The Spectre's fastback silhouette is both modern and unmistakably Rolls Royce. The Spirit of Ecstasy now sits lower and more aerodynamic.\n\nThe Experience: From the starlight headliner to the gallery dashboard, every element is designed to create an unparalleled experience.",
    author: "Sarah Chen",
    date: "2024-11-28",
    category: "Reviews",
    image: "/images/blog/spectre.jpg",
    tags: ["Rolls Royce", "Electric", "Review"]
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const post = blogPosts[params.slug as string]

  if (!post) return (
    <div className="pt-20 text-center">
      <Container><p className="text-white/50">Post not found</p></Container>
    </div>
  )

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container className="max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-gold transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gold">{post.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-white/40"><Calendar className="w-3 h-3" /> {post.date}</span>
              <span className="flex items-center gap-1 text-xs text-white/40"><User className="w-3 h-3" /> {post.author}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{post.title}</h1>
            <p className="text-lg text-white/50 mb-8">{post.excerpt}</p>

            <div className="aspect-video rounded-2xl overflow-hidden glass mb-8">
              <Image src={post.image} alt={post.title} width={1200} height={675} className="object-cover w-full h-full" />
            </div>

            <div className="prose prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="text-white/70 leading-relaxed mb-4">{paragraph.trim()}</p>
              ))}
            </div>

            <div className="flex gap-2 mt-8 pt-6 border-t border-white/5">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/40">{tag}</span>
              ))}
            </div>
          </motion.article>
        </Container>
      </Section>
    </div>
  )
}

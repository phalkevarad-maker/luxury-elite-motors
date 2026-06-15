'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Calendar, User, ArrowRight } from "lucide-react"

const posts = [
  {
    slug: "future-of-luxury-automotive",
    title: "The Future of Luxury Automotive: 2025 Trends",
    excerpt: "Discover the cutting-edge trends shaping the future of luxury automobiles.",
    author: "James Harrington", date: "2024-12-10", category: "Industry Trends",
    tags: ["Luxury", "Trends", "2025"]
  },
  {
    slug: "rolls-royce-spectre-review",
    title: "Rolls Royce Spectre: The Electric Era Begins",
    excerpt: "Our exclusive first drive of the most anticipated luxury EV.",
    author: "Sarah Chen", date: "2024-11-28", category: "Reviews",
    tags: ["Rolls Royce", "Electric", "Review"]
  },
  {
    slug: "bespoke-customization-guide",
    title: "The Art of Bespoke: Personalizing Your Rolls Royce",
    excerpt: "A deep dive into the world of unlimited customization possibilities.",
    author: "Marcus Webb", date: "2024-11-15", category: "Guide",
    tags: ["Bespoke", "Customization", "Rolls Royce"]
  }
]

export default function BlogPage() {
  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <SectionTitle title="The Luxury Journal" subtitle="Insights, reviews, and stories from the world of luxury automobiles" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full">
                    <div className="aspect-video bg-gradient-to-br from-gold/10 to-luxury-dark flex items-center justify-center">
                      <span className="text-gold/30 text-4xl font-display">LE</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="gold">{post.category}</Badge>
                        <span className="text-xs text-white/40 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      </div>
                      <h3 className="font-display font-bold text-white mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
                      <p className="text-sm text-white/50 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40 flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                        <span className="text-gold text-sm flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}

'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Heart, Menu, X, Car, User, LogOut, ChevronDown, Search, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Inventory" },
  { href: "/brands", label: "Brands" },
  { href: "/offers", label: "Offers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-luxury-black/95 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <Car className="w-6 h-6 md:w-8 md:h-8 text-gold" />
              <span className="font-display text-lg md:text-xl font-bold">
                <span className="text-white">Luxury</span>
                <span className="text-gold"> Elite</span>
                <span className="text-white"> Motors</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-white/70 hover:text-gold transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-white/60 hover:text-gold transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link href="/wishlist" className="p-2 text-white/60 hover:text-gold transition-colors hidden md:block">
                <Heart className="w-5 h-5" />
              </Link>

              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <User className="w-4 h-4 text-gold" />
                    <span className="text-sm text-white/80 hidden md:block">
                      {session.user?.name || "Account"}
                    </span>
                    <ChevronDown className="w-3 h-3 text-white/40" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 glass rounded-xl overflow-hidden border border-white/10 shadow-xl"
                      >
                        <div className="p-3 border-b border-white/5">
                          <p className="text-sm font-medium text-white">{session.user?.name}</p>
                          <p className="text-xs text-white/50">{session.user?.email}</p>
                        </div>
                        <div className="p-1">
                          {(session.user as any)?.role === "DEALER" ? (
                            <Link href="/dealer-dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg" onClick={() => setUserMenuOpen(false)}>
                              <Car className="w-4 h-4" /> Dealer Dashboard
                            </Link>
                          ) : (
                            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg" onClick={() => setUserMenuOpen(false)}>
                              <User className="w-4 h-4" /> Dashboard
                            </Link>
                          )}
                          <button
                            onClick={() => signOut()}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg w-full"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="gold" size="sm">Register</Button>
                  </Link>
                </div>
              )}

              <button
                className="lg:hidden p-2 text-white/60 hover:text-gold"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/5 bg-luxury-black/95 backdrop-blur-xl"
            >
              <div className="container px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-white/70 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-white/5 pt-3 mt-3">
                  {session ? (
                    <>
                      <Link href="/dashboard" className="block px-4 py-3 text-white/70 hover:text-gold rounded-lg" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                      <button onClick={() => signOut()} className="block w-full text-left px-4 py-3 text-red-400 rounded-lg">Sign Out</button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" size="md" className="w-full">Sign In</Button>
                      </Link>
                      <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button variant="gold" size="md" className="w-full">Register</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-start justify-center pt-24"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <Search className="w-5 h-5 text-gold" />
                  <input
                    type="text"
                    placeholder="Search luxury cars, brands, models..."
                    className="flex-1 bg-transparent text-white placeholder:text-white/30 text-lg focus:outline-none"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-white/30 uppercase tracking-wider">Quick Links</p>
                  {["Rolls Royce Phantom", "Lamborghini Revuelto", "Ferrari SF90", "Porsche 911 Turbo S"].map((item) => (
                    <Link
                      key={item}
                      href={`/cars/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-3 py-2 text-white/70 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                      onClick={() => setSearchOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

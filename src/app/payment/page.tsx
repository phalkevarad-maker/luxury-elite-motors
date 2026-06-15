'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { CreditCard, CheckCircle, XCircle, Download, ArrowLeft } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export default function PaymentPage() {
  const [status, setStatus] = useState<"pending" | "success" | "failed">("pending")

  return (
    <div className="pt-20 min-h-screen flex items-center">
      <Container className="max-w-md">
        {status === "pending" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 text-center">
            <CreditCard className="w-12 h-12 text-gold mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-white mb-2">Complete Payment</h2>
            <p className="text-white/50 mb-6">Advance payment of {formatPrice(46000)}</p>
            <div className="space-y-3">
              <Button variant="gold" size="lg" className="w-full" onClick={() => setStatus("success")}>
                Pay with Stripe
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={() => setStatus("success")}>
                Pay with PayPal
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={() => setStatus("success")}>
                Pay with Razorpay
              </Button>
              <Button variant="ghost" size="sm" className="w-full text-red-400" onClick={() => setStatus("failed")}>
                Cancel Payment
              </Button>
            </div>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-white/50 mb-2">Transaction ID: TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            <p className="text-sm text-white/30 mb-6">A receipt has been sent to your email.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="gold" onClick={() => window.print()}>
                <Download className="w-4 h-4" /> Download Receipt
              </Button>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </motion.div>
        )}

        {status === "failed" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Payment Failed</h2>
            <p className="text-white/50 mb-6">Your payment was not processed. Please try again.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="gold" onClick={() => setStatus("pending")}>Try Again</Button>
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  )
}

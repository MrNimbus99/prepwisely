import React from 'react'
import { X, ShieldCheck } from 'lucide-react'
import { EmbeddedCheckout } from './EmbeddedCheckout'

interface CheckoutModalProps {
  priceId: string
  userId: string
  planName: string
  onClose: () => void
  onSuccess: () => void
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ priceId, userId, planName, onClose, onSuccess }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold mb-1">Complete Your Purchase</h2>
            <p className="text-blue-100 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              {planName} Plan
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <EmbeddedCheckout
            priceId={priceId}
            userId={userId}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  )
}

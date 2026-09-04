import { Link, useSearchParams } from "react-router";
import {
  FaArrowRight,
  FaCircleXmark,
  FaTriangleExclamation,
  FaRotateRight,
  FaBoxOpen,
  FaReceipt,
  FaTruckFast,
  FaCopy,
  FaCheck,
} from "react-icons/fa6";
import { useState } from "react";

const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-red-500/60">
              Payment
            </span>
            <span className="hidden h-px w-20 bg-red-500/60 sm:block" />
          </div>

          <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
                Payment cancelled.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
                Your payment session was cancelled or interrupted. No charges
                were made to your account. You can retry the payment whenever
                you are ready.
              </p>
            </div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
              SF / PAYMENT / CANCELLED
            </p>
          </div>
        </div>

        {/* ================= CANCEL BANNER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-secondary p-7 text-white md:p-9">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-500/10" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg">
                <FaCircleXmark size={30} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-red-400">
                  Transaction interrupted
                </p>
                <h2 className="mt-2 text-2xl font-bold">Checkout aborted</h2>
                <p className="mt-1 text-sm text-white/45">
                  The payment process was stopped before completion.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 md:self-auto">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                Cancelled
              </span>
            </div>
          </div>
        </div>

        {/* ================= PAYMENT DETAILS & STATUS ================= */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {/* REFERENCE INFO */}
          <div className="rounded-3xl border border-secondary/10 bg-white p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Reference
                </p>
                <h2 className="mt-2 text-2xl font-bold text-secondary">
                  Order details
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
                <FaReceipt size={17} />
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <div className="rounded-2xl border border-secondary/10 bg-[#f8faf8] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-secondary/35">
                      Order ID Reference
                    </p>
                    <p className="mt-2 truncate font-mono text-sm font-semibold text-secondary">
                      {orderId || "No order reference found"}
                    </p>
                  </div>

                  {orderId && (
                    <button
                      onClick={() => handleCopy(orderId)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-secondary/40 transition hover:bg-primary hover:text-secondary"
                      title="Copy Order ID"
                    >
                      {copied ? (
                        <FaCheck className="text-green-600" size={13} />
                      ) : (
                        <FaCopy size={13} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-amber-600">
                    <FaTriangleExclamation size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary">
                      What happens to your order?
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-secondary/55">
                      Your order is saved in your dashboard with a pending
                      payment status. You can safely return to complete payment
                      whenever you're ready to proceed with production.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATUS FLOW */}
          <div className="rounded-3xl border border-secondary/10 bg-white p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
              Workflow state
            </p>
            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Status flow
            </h2>

            <div className="mt-7 space-y-4">
              <StatusItem
                icon={FaCircleXmark}
                title="Payment"
                description="Cancelled by user"
                active={false}
                error={true}
              />
              <StatusItem
                icon={FaBoxOpen}
                title="Order"
                description="Saved in system"
                active={true}
              />
              <StatusItem
                icon={FaTruckFast}
                title="Production"
                description="Waiting for payment"
              />
            </div>
          </div>
        </div>

        {/* ================= NEXT STEP ================= */}
        <div className="mt-5 rounded-3xl border border-secondary/10 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                Next steps
              </p>
              <h2 className="mt-2 text-2xl font-bold text-secondary">
                Ready to try again?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-secondary/45">
                You can review your pending orders or navigate back to the
                checkout portal to retry your payment securely.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard/my-orders"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-xs font-bold text-white transition hover:bg-primary hover:text-secondary"
              >
                View My Orders
                <FaArrowRight size={11} />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/10 bg-white px-5 py-3 text-xs font-bold text-secondary transition hover:border-primary hover:bg-primary/10"
              >
                Return Home
                <FaRotateRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================= */
/* STATUS ITEM */
/* ========================================================= */

const StatusItem = ({
  icon: Icon,
  title,
  description,
  active = false,
  error = false,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          error
            ? "bg-red-50 text-red-500"
            : active
              ? "bg-primary text-secondary"
              : "bg-secondary/5 text-secondary/30"
        }`}
      >
        <Icon size={14} />
      </div>

      <div>
        <p
          className={`text-sm font-bold ${
            error
              ? "text-red-500"
              : active
                ? "text-secondary"
                : "text-secondary/40"
          }`}
        >
          {title}
        </p>
        <p className="text-xs text-secondary/30">{description}</p>
      </div>
    </div>
  );
};

export default PaymentCancelled;

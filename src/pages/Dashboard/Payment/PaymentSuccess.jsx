import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  FaCheck,
  FaCopy,
  FaArrowRight,
  FaBoxOpen,
  FaReceipt,
  FaTruckFast,
  FaCircleCheck,
  FaEye,
} from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { FaCheckCircle } from "react-icons/fa";
import TrackingModal from "../../../components/TrackingModal/TrackingModal";
// Make sure to import your TrackingModal if it's in another file:
// import TrackingModal from "../../../components/TrackingModal/TrackingModal";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [copiedField, setCopiedField] = useState(null);
  const [viewTrackingId, setViewTrackingId] = useState(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!sessionId || hasFetched.current) return;

    hasFetched.current = true;

    const verifyPayment = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await axiosSecure.patch(
          `/payment-success?session_id=${sessionId}`,
        );

        setPaymentInfo(res.data);
      } catch (error) {
        console.error("Payment verification error:", error);

        setError(
          error?.response?.data?.message || "We could not verify your payment.",
        );

        hasFetched.current = false;
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, axiosSecure]);

  const handleCopy = async (text, field) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);

      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8faf8] px-5 py-10 md:px-10 lg:px-12">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FaCircleCheck size={28} />
            </div>

            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.25em] text-red-400">
              Payment verification
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-secondary">
              Verification failed.
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-secondary/45">
              {error}
            </p>

            <Link
              to="/dashboard/my-orders"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-xs font-bold text-white transition hover:bg-primary hover:text-secondary"
            >
              Go to My Orders
              <FaArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
              Payment
            </span>
            <span className="hidden h-px w-20 bg-primary/60 sm:block" />
          </div>

          <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
                Payment complete.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
                Your payment has been successfully processed. Your order is now
                ready for the next stage of production.
              </p>
            </div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
              SF / PAYMENT / SUCCESS
            </p>
          </div>
        </div>

        {/* ================= SUCCESS BANNER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-secondary p-7 text-white md:p-9">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-secondary shadow-lg">
                <FaCheckCircle size={30} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                  Transaction verified
                </p>
                <h2 className="mt-2 text-2xl font-bold">Payment successful</h2>
                <p className="mt-1 text-sm text-white/45">
                  Your transaction has been confirmed by Stripe.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/10 px-4 py-2 md:self-auto">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                Paid
              </span>
            </div>
          </div>
        </div>

        {/* ================= PAYMENT DETAILS ================= */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {/* TRANSACTION */}
          <div className="rounded-3xl border border-secondary/10 bg-white p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Transaction
                </p>
                <h2 className="mt-2 text-2xl font-bold text-secondary">
                  Payment details
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
                <FaReceipt size={17} />
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {/* TRACKING ID with View Button */}
              <DetailRow
                label="Tracking ID"
                value={paymentInfo?.trackingId}
                copied={copiedField === "tracking"}
                onCopy={() => handleCopy(paymentInfo?.trackingId, "tracking")}
                extraAction={
                  paymentInfo?.trackingId && (
                    <button
                      type="button"
                      onClick={() => setViewTrackingId(paymentInfo.trackingId)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition hover:bg-secondary hover:text-white"
                      title="View tracking"
                    >
                      <FaEye size={13} />
                    </button>
                  )
                }
              />

              {/* TRANSACTION ID */}
              <DetailRow
                label="Transaction ID"
                value={paymentInfo?.transactionId}
                copied={copiedField === "transaction"}
                onCopy={() =>
                  handleCopy(paymentInfo?.transactionId, "transaction")
                }
              />

              {/* ORDER ID */}
              <DetailRow
                label="Order ID"
                value={paymentInfo?.orderId}
                copied={copiedField === "order"}
                onCopy={() => handleCopy(paymentInfo?.orderId, "order")}
              />
            </div>
          </div>

          {/* ORDER STATUS */}
          <div className="rounded-3xl border border-secondary/10 bg-white p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
              Order status
            </p>
            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Production
            </h2>

            <div className="mt-7 space-y-4">
              <StatusItem
                icon={FaCheck}
                title="Payment"
                description="Payment received"
                active
              />
              <StatusItem
                icon={FaBoxOpen}
                title="Order"
                description="Order confirmed"
                active
              />
              <StatusItem
                icon={FaTruckFast}
                title="Production"
                description="Ready for processing"
              />
            </div>
          </div>
        </div>

        {/* ================= NEXT STEP ================= */}
        <div className="mt-5 rounded-3xl border border-secondary/10 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                What's next
              </p>
              <h2 className="mt-2 text-2xl font-bold text-secondary">
                Track your production order.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-secondary/45">
                Keep your tracking ID safe. You can use it to follow your order
                as it moves through cutting, sewing, finishing, quality control
                and shipping.
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
                to="/dashboard/track-order"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/10 bg-white px-5 py-3 text-xs font-bold text-secondary transition hover:border-primary hover:bg-primary/10"
              >
                Track Order
                <FaTruckFast size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TRACKING MODAL ================= */}
      {viewTrackingId && (
        <TrackingModal
          trackingId={viewTrackingId}
          onClose={() => setViewTrackingId(null)}
        />
      )}
    </div>
  );
};

/* ========================================================= */
/* DETAIL ROW */
/* ========================================================= */

const DetailRow = ({ label, value, copied, onCopy, extraAction }) => {
  return (
    <div className="rounded-2xl border border-secondary/10 bg-[#f8faf8] p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-secondary/35">
            {label}
          </p>
          <p className="mt-2 truncate font-mono text-sm font-semibold text-secondary">
            {value || "Not available"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Optional Extra Action Button (e.g. View Tracking) */}
          {extraAction}

          {value && (
            <button
              onClick={onCopy}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-secondary/40 transition hover:bg-primary hover:text-secondary"
              title={`Copy ${label}`}
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
    </div>
  );
};

/* ========================================================= */
/* STATUS ITEM */
/* ========================================================= */

const StatusItem = ({ icon: Icon, title, description, active = false }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active
            ? "bg-primary text-secondary"
            : "bg-secondary/5 text-secondary/30"
        }`}
      >
        <Icon size={14} />
      </div>

      <div>
        <p
          className={`text-sm font-bold ${
            active ? "text-secondary" : "text-secondary/40"
          }`}
        >
          {title}
        </p>
        <p className="text-xs text-secondary/30">{description}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
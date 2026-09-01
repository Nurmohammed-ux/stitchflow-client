import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaMagnifyingGlass,
  FaLocationDot,
  FaCircleCheck,
  FaClock,
  FaBoxOpen,
  FaTruck,
  FaScissors,
  FaShirt,
  FaClipboardCheck,
  FaBox,
  FaXmark,
} from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackOrder = () => {
  const axiosSecure = useAxiosSecure();
  const [trackingInput, setTrackingInput] = useState("");
  const [trackingId, setTrackingId] = useState("");

  const {
    data: trackingLogs = [],
    isLoading,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["public-tracking", trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${trackingId}`);
      return res.data;
    },
    enabled: !!trackingId,
  });

  const handleSearch = (e) => {
    e.preventDefault();

    const value = trackingInput.trim();

    if (!value) return;

    setTrackingId(value);
  };

  const getStatusIcon = (status) => {
    const icons = {
      "cutting-completed": FaScissors,
      "sewing-started": FaShirt,
      finishing: FaBoxOpen,
      "qc-checked": FaClipboardCheck,
      packed: FaBox,
      shipped: FaTruck,
      "out-for-delivery": FaTruck,
      delivered: FaCircleCheck,
    };

    return icons[status?.toLowerCase()] || FaClock;
  };

  const formatStatus = (status) => {
    if (!status) return "Tracking Update";

    return status
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      {/* ================= HEADER ================= */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Production Tracking
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              Track your order.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Enter your StitchFlow tracking ID to see the latest production and
              delivery updates for your order.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / TRACK / ORDER
          </p>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="rounded-3xl border border-secondary/10 bg-secondary p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-secondary">
            <FaMagnifyingGlass size={16} />
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
              Tracking ID
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              Find your order
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="Example: TRK-20260827-43C029"
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 px-5 pr-12 font-mono text-sm text-white outline-none placeholder:text-white/30 focus:border-primary"
            />

            {trackingInput && (
              <button
                type="button"
                onClick={() => {
                  setTrackingInput("");
                  setTrackingId("");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white"
              >
                <FaXmark />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!trackingInput.trim()}
            className="h-14 rounded-2xl bg-primary px-7 text-sm font-bold text-secondary transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Track Order
          </button>
        </form>

        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
          No account required
        </p>
      </div>

      {/* ================= RESULTS ================= */}

      {trackingId && (
        <div className="mt-8">
          {/* LOADING */}

          {isLoading && (
            <div className="rounded-3xl border border-secondary/10 bg-white p-10 text-center">
              <span className="loading loading-spinner loading-lg text-primary" />

              <p className="mt-4 text-sm text-secondary/40">
                Loading tracking information...
              </p>
            </div>
          )}

          {/* ERROR */}

          {isError && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
                <FaXmark />
              </div>

              <h2 className="mt-4 text-lg font-bold text-red-600">
                Unable to load tracking
              </h2>

              <p className="mt-2 text-sm text-red-500/70">
                Please try again later.
              </p>
            </div>
          )}

          {/* NO RESULT */}

          {isFetched && !isLoading && !isError && trackingLogs.length === 0 && (
            <div className="rounded-3xl border border-secondary/10 bg-white p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
                <FaMagnifyingGlass />
              </div>

              <h2 className="mt-5 text-xl font-bold text-secondary">
                Tracking ID not found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-secondary/40">
                We couldn't find any tracking updates for{" "}
                <span className="font-mono font-semibold text-secondary/60">
                  {trackingId}
                </span>
                .
              </p>
            </div>
          )}

          {/* TRACKING RESULT */}

          {trackingLogs.length > 0 && (
            <>
              {/* TRACKING HEADER */}

              <div className="rounded-3xl border border-secondary/10 bg-white p-6 md:p-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                      Tracking ID
                    </p>

                    <h2 className="mt-2 font-mono text-xl font-bold text-secondary md:text-2xl">
                      {trackingId}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />

                    <span className="text-xs font-bold capitalize text-secondary">
                      {formatStatus(
                        trackingLogs[trackingLogs.length - 1]?.status,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* TIMELINE */}

              <div className="mt-5 rounded-3xl border border-secondary/10 bg-white p-6 md:p-8">
                <div className="mb-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                    Production history
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-secondary">
                    Order timeline
                  </h2>
                </div>

                <div>
                  {trackingLogs.map((tracking, index) => {
                    const Icon = getStatusIcon(tracking.status);
                    const isLast = index === trackingLogs.length - 1;

                    return (
                      <div
                        key={tracking._id || `${tracking.status}-${index}`}
                        className="relative flex gap-5"
                      >
                        {/* LINE */}

                        {!isLast && (
                          <div className="absolute left-4.75 top-10 h-[calc(100%-10px)] w-px bg-secondary/10" />
                        )}

                        {/* ICON */}

                        <div
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            isLast
                              ? "bg-primary text-secondary shadow-lg shadow-primary/20"
                              : "bg-secondary text-white"
                          }`}
                        >
                          <Icon size={14} />
                        </div>

                        {/* CONTENT */}

                        <div
                          className={`min-w-0 flex-1 ${
                            isLast ? "pb-10" : "pb-10"
                          }`}
                        >
                          <div className="flex flex-col justify-between gap-2 sm:flex-row">
                            <div>
                              <h3 className="text-base font-bold text-secondary">
                                {formatStatus(tracking.status)}
                              </h3>

                              {tracking.location && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-secondary/40">
                                  <FaLocationDot size={10} />

                                  <span>{tracking.location}</span>
                                </div>
                              )}
                            </div>

                            <div className="shrink-0">
                              <p className="font-mono text-[10px] font-semibold text-secondary/40">
                                {formatDate(tracking.createdAt)}
                              </p>

                              <p className="mt-1 text-right font-mono text-[9px] text-secondary/25">
                                {formatTime(tracking.createdAt)}
                              </p>
                            </div>
                          </div>

                          {tracking.details && (
                            <div className="mt-4 rounded-2xl bg-[#f8faf8] p-4">
                              <p className="text-sm leading-relaxed text-secondary/55">
                                {tracking.details}
                              </p>
                            </div>
                          )}

                          {tracking.note && (
                            <div className="mt-4 rounded-2xl bg-[#f8faf8] p-4">
                              <p className="text-sm leading-relaxed text-secondary/55">
                                {tracking.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;

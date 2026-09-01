import { useQuery } from "@tanstack/react-query";
import {
  FaXmark,
  FaLocationDot,
  FaClock,
  FaTruck,
  FaCircleCheck,
  FaScissors,
  FaShirt,
  FaBox,
  FaClipboardCheck,
} from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrackingModal = ({ trackingId, onClose }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: trackings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracking-history", trackingId],

    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${trackingId}`);
      return res.data;
    },

    enabled: !!trackingId,
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 px-5 py-8 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        {/* ================= HEADER ================= */}

        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-secondary/10 bg-white px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
                Production Tracking
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-secondary">
              Tracking Timeline
            </h2>

            <p className="mt-2 font-mono text-[10px] tracking-[0.15em] text-secondary/35">
              {trackingId}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 text-secondary/40 transition-all hover:bg-secondary hover:text-white"
            aria-label="Close tracking modal"
          >
            <FaXmark size={15} />
          </button>
        </div>

        {/* ================= TRACKING SUMMARY ================= */}

        <div className="px-6 pt-6">
          <div className="relative overflow-hidden rounded-3xl bg-secondary p-6 text-white">
            {/* Blueprint grid */}

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                `,
                backgroundSize: "45px 45px",
              }}
            />

            <div className="relative flex items-center justify-between gap-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                  Tracking ID
                </p>

                <h3 className="mt-2 font-mono text-sm font-bold text-white">
                  {trackingId}
                </h3>

                <p className="mt-3 text-xs text-white/40">
                  {trackings.length
                    ? `${trackings.length} production update${
                        trackings.length > 1 ? "s" : ""
                      } recorded`
                    : "Waiting for production updates"}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-secondary">
                <FaTruck size={20} />
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full border border-primary/10" />
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="p-6">
          {/* LOADING */}

          {isLoading && (
            <div className="flex min-h-72 items-center justify-center">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          )}

          {/* ERROR */}

          {isError && (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center">
              <h3 className="font-bold text-red-500">
                Failed to load tracking
              </h3>

              <p className="mt-2 text-sm text-red-400">
                Tracking information could not be loaded.
              </p>
            </div>
          )}

          {/* EMPTY */}

          {!isLoading && !isError && trackings.length === 0 && (
            <div className="rounded-3xl bg-[#f8faf8] px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/5 text-secondary/25">
                <FaTruck size={21} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-secondary">
                No Tracking Updates
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-secondary/40">
                Production tracking has not started for this order yet. New
                updates will appear here.
              </p>
            </div>
          )}

          {/* ================= TIMELINE ================= */}

          {!isLoading && !isError && trackings.length > 0 && (
            <div>
              <div className="mb-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Production Journey
                </p>

                <h3 className="mt-2 text-xl font-bold text-secondary">
                  Order Progress
                </h3>
              </div>

              <div>
                {trackings.map((tracking, index) => {
                  const isLatest = index === trackings.length - 1;

                  let Icon = FaCircleCheck;

                  if (tracking.status === "cutting-completed") {
                    Icon = FaScissors;
                  }

                  if (tracking.status === "sewing-started") {
                    Icon = FaShirt;
                  }

                  if (tracking.status === "finishing") {
                    Icon = FaShirt;
                  }

                  if (tracking.status === "qc-checked") {
                    Icon = FaClipboardCheck;
                  }

                  if (tracking.status === "packed") {
                    Icon = FaBox;
                  }

                  if (
                    tracking.status === "shipped" ||
                    tracking.status === "out-for-delivery"
                  ) {
                    Icon = FaTruck;
                  }

                  return (
                    <div
                      key={tracking._id}
                      className="relative flex gap-5 pb-10 last:pb-0"
                    >
                      {/* CONNECTOR */}

                      {index !== trackings.length - 1 && (
                        <div className="absolute left-5 top-10 h-full w-px bg-secondary/10" />
                      )}

                      {/* TIMELINE ICON */}

                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          isLatest
                            ? "bg-primary text-secondary ring-8 ring-primary/10"
                            : "bg-secondary text-white"
                        }`}
                      >
                        <Icon size={14} />
                      </div>

                      {/* TRACKING CARD */}

                      <div
                        className={`min-w-0 flex-1 rounded-2xl border p-5 ${
                          isLatest
                            ? "border-primary/30 bg-primary/5"
                            : "border-secondary/10 bg-[#f8faf8]"
                        }`}
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            {isLatest && (
                              <span className="mb-2 inline-flex rounded-full bg-primary px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-secondary">
                                Latest
                              </span>
                            )}

                            <h4 className="text-base font-bold capitalize text-secondary">
                              {tracking.statusLabel ||
                                tracking.status?.replaceAll("-", " ")}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 font-mono text-[9px] text-secondary/30">
                            <FaClock size={9} />

                            {tracking.dateTime
                              ? new Date(tracking.dateTime).toLocaleString()
                              : tracking.createdAt
                                ? new Date(tracking.createdAt).toLocaleString()
                                : "—"}
                          </div>
                        </div>

                        {/* LOCATION */}

                        {tracking.location && (
                          <div className="mt-4 flex items-start gap-2">
                            <FaLocationDot
                              size={11}
                              className="mt-0.5 shrink-0 text-primary"
                            />

                            <p className="text-xs font-semibold text-secondary/50">
                              {tracking.location}
                            </p>
                          </div>
                        )}

                        {/* DETAILS */}

                        {tracking.details && (
                          <p className="mt-4 border-t border-secondary/10 pt-4 text-sm leading-relaxed text-secondary/45">
                            {tracking.details}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;

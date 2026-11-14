"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The signature illustration: an order lands on one channel and stock
 * updates everywhere else. Sample data only, clearly labelled as such.
 */

const channels = [
  { label: "Shopify", wideOnly: false },
  { label: "Etsy", wideOnly: false },
  { label: "Walmart", wideOnly: false },
  { label: "TikTok", wideOnly: false },
  { label: "eBay", wideOnly: true },
  { label: "Faire", wideOnly: true },
];

const products = [
  { sku: "TOTE-NAT-01", name: "Canvas tote", stock: 48 },
  { sku: "MUG-SPK-12", name: "Speckled mug", stock: 31 },
  { sku: "CNDL-FIG-08", name: "Fig candle", stock: 17 },
];

const orders = [
  { row: 0, channel: 1, qty: 1 },
  { row: 2, channel: 3, qty: 2 },
  { row: 1, channel: 2, qty: 1 },
  { row: 0, channel: 4, qty: 3 },
  { row: 2, channel: 0, qty: 1 },
  { row: 1, channel: 5, qty: 6 },
  { row: 0, channel: 3, qty: 2 },
  { row: 2, channel: 1, qty: 1 },
];

type LogEntry = { id: number; text: string; synced: boolean };

const initialGrid = () => products.map((p) => channels.map(() => p.stock));
const initialTicks = () => products.map(() => channels.map(() => 0));

const initialLog: LogEntry[] = [
  { id: -1, text: "Order #4126 · Shopify · 1 × Speckled mug", synced: true },
  { id: -2, text: "Price update · Fig candle · 6 channels", synced: true },
];

export function SyncBoard({ className }: { className?: string }) {
  const [grid, setGrid] = useState(initialGrid);
  const [ticks, setTicks] = useState(initialTicks);
  const [syncing, setSyncing] = useState(false);
  const [log, setLog] = useState<LogEntry[]>(initialLog);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stock = products.map((p) => p.stock);
    const timers: number[] = [];
    let step = 0;
    let orderNo = 4127;
    let visible = false;
    let running = false;

    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const bump = (row: number, cols: number[]) =>
      setTicks((prev) =>
        prev.map((r, ri) =>
          ri === row ? r.map((t, ci) => (cols.includes(ci) ? t + 1 : t)) : r,
        ),
      );

    const setCells = (row: number, cols: number[], value: number) =>
      setGrid((prev) =>
        prev.map((r, ri) =>
          ri === row ? r.map((v, ci) => (cols.includes(ci) ? value : v)) : r,
        ),
      );

    const allCols = channels.map((_, i) => i);

    const run = () => {
      if (!visible) {
        running = false;
        return;
      }
      running = true;

      const order = orders[step % orders.length];
      step += 1;
      const product = products[order.row];
      const id = orderNo;
      const shortName = product.name;

      if (stock[order.row] - order.qty < 4) {
        // Running low: a restock arrives and every channel is topped up.
        stock[order.row] = product.stock;
        setSyncing(true);
        setLog((prev) =>
          [
            { id, text: "Restock received · " + shortName + " · " + product.sku, synced: false },
            ...prev,
          ].slice(0, 3),
        );
        later(() => {
          setCells(order.row, allCols, product.stock);
          bump(order.row, allCols);
        }, 600);
      } else {
        stock[order.row] -= order.qty;
        const next = stock[order.row];
        const others = allCols.filter((c) => c !== order.channel);
        setSyncing(true);
        setCells(order.row, [order.channel], next);
        bump(order.row, [order.channel]);
        setLog((prev) =>
          [
            {
              id,
              text:
                "Order #" +
                id +
                " · " +
                channels[order.channel].label +
                " · " +
                order.qty +
                " × " +
                shortName,
              synced: false,
            },
            ...prev,
          ].slice(0, 3),
        );
        later(() => {
          setCells(order.row, others, next);
          bump(order.row, others);
        }, 800);
      }
      orderNo += 1;

      later(() => {
        setSyncing(false);
        setLog((prev) => prev.map((e) => (e.id === id ? { ...e, synced: true } : e)));
      }, 2100);
      later(run, 3900);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !running) {
          running = true;
          later(run, 1400);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("panel", className)}>
      <div className="panel-bar">
        <span className="t-mono font-medium text-ink">Inventory sync</span>
        <span className={cn("pill", syncing ? "pill-warn" : "pill-ok")} aria-live="off">
          {syncing ? "Syncing channels" : "All channels in sync"}
        </span>
      </div>

      <div
        role="table"
        aria-label="Sample stock levels by sales channel"
        className="px-3 pb-2 pt-3 sm:px-4"
      >
        <div
          role="row"
          className="grid grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,1fr))] items-end gap-1 pb-2 sm:grid-cols-[minmax(0,1.8fr)_repeat(6,minmax(0,1fr))]"
        >
          <span role="columnheader" className="t-eyebrow !text-[0.625rem]">
            Product
          </span>
          {channels.map((channel) => (
            <span
              key={channel.label}
              role="columnheader"
              className={cn(
                "t-eyebrow text-center !text-[0.625rem] !tracking-[0.04em]",
                channel.wideOnly && "hidden sm:block",
              )}
            >
              {channel.label}
            </span>
          ))}
        </div>

        {products.map((product, row) => (
          <div
            key={product.sku}
            role="row"
            className="grid grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,1fr))] items-center gap-1 border-t border-line py-2.5 sm:grid-cols-[minmax(0,1.8fr)_repeat(6,minmax(0,1fr))]"
          >
            <span role="cell" className="min-w-0">
              <span className="block text-[0.875rem] font-semibold leading-tight">
                {product.name}
              </span>
              <span className="t-mono block truncate !text-[0.6875rem] text-ink-mute">
                {product.sku}
              </span>
            </span>
            {channels.map((channel, col) => {
              const tick = ticks[row][col];
              return (
                <span
                  key={channel.label}
                  role="cell"
                  className={cn(
                    "flex justify-center",
                    channel.wideOnly && "hidden sm:flex",
                  )}
                >
                  <span
                    key={tick}
                    className={cn(
                      "t-mono inline-flex h-8 w-full max-w-[3.25rem] items-center justify-center rounded-md font-medium",
                      tick > 0 && "cell-flash",
                    )}
                    style={tick > 0 ? { animationDelay: col * 70 + "ms" } : undefined}
                  >
                    {grid[row][col]}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-mist px-3 py-3 sm:px-4">
        <p className="t-eyebrow !text-[0.625rem]">Activity</p>
        <ul className="mt-2 space-y-1.5">
          {log.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                "flex items-center justify-between gap-3",
                entry.id > 0 && "log-in",
              )}
            >
              <span className="t-mono min-w-0 truncate !text-[0.75rem] text-ink-soft">
                {entry.text}
              </span>
              <span className={cn("pill shrink-0", entry.synced ? "pill-ok" : "pill-warn")}>
                {entry.synced ? "Synced" : "Syncing"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

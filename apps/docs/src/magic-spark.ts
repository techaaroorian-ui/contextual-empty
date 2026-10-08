/**
 * Magic-Art Animation System: Star Sparkles & Micro-interactions
 *
 * Provides subtle, delightful star bursts upon button click or custom events.
 * Fully optional, respects prefers-reduced-motion, and cleans up DOM elements automatically.
 */

export interface SparkOptions {
  count?: number;
  color?: string;
  colors?: string[];
  symbols?: string[];
  spread?: number;
  minSize?: number;
  maxSize?: number;
}

const DEFAULT_SYMBOLS = ["✦", "✧", "⋆", "★", "·"];

export function sparkMagicStars(
  target: MouseEvent | React.MouseEvent | HTMLElement,
  options: SparkOptions = {},
) {
  // Respect accessibility preferences
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  let originX = 0;
  let originY = 0;

  if ("clientX" in target && typeof target.clientX === "number") {
    originX = target.clientX;
    originY = target.clientY;
  } else if (target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect();
    originX = rect.left + rect.width / 2;
    originY = rect.top + rect.height / 2;
  }

  const count = options.count ?? 8;
  const symbols = options.symbols ?? DEFAULT_SYMBOLS;
  const spread = options.spread ?? 55;
  const minSize = options.minSize ?? 10;
  const maxSize = options.maxSize ?? 18;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = "aar-magic-star";
    star.setAttribute("aria-hidden", "true");

    // Pick random symbol
    star.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Calculate trajectory angle and distance
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.7;
    const distance = spread * (0.6 + Math.random() * 0.8);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    const size = Math.floor(minSize + Math.random() * (maxSize - minSize));
    const rotation = (Math.random() - 0.5) * 180;
    const duration = Math.floor(450 + Math.random() * 200);

    // Position
    star.style.left = `${originX}px`;
    star.style.top = `${originY}px`;
    star.style.setProperty("--aar-star-dx", `${dx}px`);
    star.style.setProperty("--aar-star-dy", `${dy}px`);
    star.style.setProperty("--aar-star-rot", `${rotation}deg`);
    star.style.setProperty("--aar-star-size", `${size}px`);
    star.style.setProperty("--aar-star-duration", `${duration}ms`);

    if (options.color) {
      star.style.setProperty("--aar-star-color", options.color);
    } else if (options.colors && options.colors.length > 0) {
      star.style.setProperty(
        "--aar-star-color",
        options.colors[i % options.colors.length],
      );
    }

    document.body.appendChild(star);

    window.setTimeout(() => {
      star.remove();
    }, duration + 50);
  }
}

/**
 * Global listener to automatically spark stars on elements matching:
 * - [data-magic-spark="true"]
 * - .aar-magic-spark
 * - [data-magic-art="true"] button, [data-magic-art="true"] .aar-button
 */
export function initMagicSparkAutoListener() {
  if (typeof window === "undefined") return () => {};

  function handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const btn = target.closest<HTMLElement>(
      '[data-magic-spark="true"], .aar-magic-spark, [data-magic-art="true"] .aar-button, [data-magic-art="true"] button',
    );

    if (btn && !btn.hasAttribute("disabled")) {
      sparkMagicStars(e);
    }
  }

  window.addEventListener("click", handleClick, { passive: true });
  return () => window.removeEventListener("click", handleClick);
}

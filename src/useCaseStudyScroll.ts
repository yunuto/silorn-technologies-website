import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Short desktop windows need room for the full card and normal page scrolling.
const motion = "(prefers-reduced-motion: no-preference) and (max-width: 63.999rem), (prefers-reduced-motion: no-preference) and (min-width: 64rem) and (min-height: 720px)";
const introHold = .15;
const morphDuration = .45;
const cardDuration = 1;
const endHold = .35;
const trackStart = introHold + morphDuration;
const timelineDuration = trackStart + cardDuration + endHold;

export function useCaseStudyScroll(count: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reveal = useRef<((index: number, align: boolean) => void) | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const revealCard = useCallback((index: number, align = false) => reveal.current?.(index, align), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    let trigger: ScrollTrigger | undefined;
    let morph: gsap.core.Timeline | undefined;
    let nativeFrame = 0;

    const publish = (scrolled: number) => {
      if (morph && morph.time() <= trackStart) {
        setActiveIndex(0);
        return;
      }
      const progress = Math.round(100 * gsap.utils.clamp(0, 1, scrolled));
      let nextIndex = 0;

      if (progress === 100) {
        nextIndex = Math.max(0, count - 1);
      } else if (progress > 0) {
        const bounds = viewport.getBoundingClientRect();
        const center = bounds.left + bounds.width / 2;
        let closestDistance = Infinity;

        Array.from(track.children).forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(center - (rect.left + rect.width / 2));
          if (distance < closestDistance) {
            closestDistance = distance;
            nextIndex = index;
          }
        });
      }

      setActiveIndex(nextIndex);
    };

    const scheduleNativeUpdate = () => {
      if (trigger || nativeFrame) return;

      nativeFrame = window.requestAnimationFrame(() => {
        nativeFrame = 0;
        if (trigger) return;
        const distance = travel();
        publish(distance > 0 ? viewport.scrollLeft / distance : 0);
      });
    };

    reveal.current = (index, align) => {
      const card = track.children.item(index);
      const firstCard = track.firstElementChild;
      const distance = travel();
      if (!card || !firstCard || !distance) return;

      const viewportBounds = viewport.getBoundingClientRect();
      const cardBounds = card.getBoundingClientRect();
      if (!align && cardBounds.left >= viewportBounds.left - 1 && cardBounds.right <= viewportBounds.right + 1) return;

      const offset = cardBounds.left - firstCard.getBoundingClientRect().left;
      const target = gsap.utils.clamp(0, distance, offset);
      if (trigger) {
        const progress = index === 0 ? 0 : (trackStart + target / distance * cardDuration) / timelineDuration;
        trigger.scroll(trigger.start + (trigger.end - trigger.start) * progress);
        trigger.update();
        // Catch up immediately so a keyboard-focused card is visible before the next Tab.
        trigger.getTween()?.progress(1);
      } else {
        viewport.scrollTo({ left: target, behavior: "instant" });
      }
    };

    const revealFocusedCard = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const card = event.target.closest(".silorn-case-card");
      if (card) reveal.current?.(Array.from(track.children).indexOf(card), false);
    };

    viewport.addEventListener("scroll", scheduleNativeUpdate, { passive: true });
    track.addEventListener("focusin", revealFocusedCard);
    const observer = new ResizeObserver(scheduleNativeUpdate);
    observer.observe(viewport);
    observer.observe(track);

    const media = gsap.matchMedia();
    const first = track.children.item(0) as HTMLElement | null;
    const website = first?.querySelector<HTMLElement>(".silorn-roft-website");
    const appCopy = first?.querySelector<HTMLElement>(":scope > .silorn-case-card-copy");
    const appImage = first?.querySelector<HTMLElement>(":scope > .silorn-case-image");

    let websiteVisible: boolean | undefined;
    function setWebsiteVisible(visible: boolean) {
      if (!website || !appCopy || !appImage || websiteVisible === visible) return;
      websiteVisible = visible;
      website.inert = !visible;
      website.setAttribute("aria-hidden", String(!visible));
      appCopy.inert = visible;
      appCopy.setAttribute("aria-hidden", String(visible));
      appImage.setAttribute("aria-hidden", String(visible));
    }

    media.add(motion, () => {
      if (!travel() || !first || !website || !appCopy || !appImage) return;

      section.dataset.scrollPinned = "true";
      viewport.scrollLeft = 0;
      setWebsiteVisible(false);
      const animation = gsap.timeline({
        onUpdate(this: gsap.core.Tween) {
          setWebsiteVisible(this.time() >= introHold + morphDuration / 2);
          publish(this.progress());
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(1, travel() * 1.2 + 850)}`,
          pin: true,
          scrub: 0.85,
          invalidateOnRefresh: true,
          onRefresh: (instance) => publish(instance.progress),
        },
      });
      animation.to([appCopy, appImage], { autoAlpha: 0, y: -12, scale: .985, duration: morphDuration / 2, ease: "power2.in" }, introHold);
      animation.fromTo(website, { autoAlpha: 0, y: 16, scale: .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: morphDuration / 2, ease: "power2.out" }, introHold + morphDuration / 2);
      animation.to(track, { x: () => -travel(), duration: cardDuration, ease: "none" }, trackStart);
      animation.to({}, { duration: endHold });
      morph = animation;
      trigger = animation.scrollTrigger;

      return () => {
        delete section.dataset.scrollPinned;
        trigger = undefined;
        morph = undefined;
        setWebsiteVisible(false);
        scheduleNativeUpdate();
      };
    });

    void document.fonts.ready.then(() => trigger?.refresh());
    scheduleNativeUpdate();

    return () => {
      reveal.current = null;
      media.revert();
      viewport.removeEventListener("scroll", scheduleNativeUpdate);
      track.removeEventListener("focusin", revealFocusedCard);
      observer.disconnect();
      window.cancelAnimationFrame(nativeFrame);
    };
  }, [count]);

  return { sectionRef, viewportRef, trackRef, revealCard, activeIndex };
}

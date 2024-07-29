'use client';
import { useEffect, useRef, useState,} from "react";
import Link from "next/link";

export const CSSTabs = ({tabs, selectedTabIndex, setSelectedTab,}) => {
  const [buttonRefs, setButtonRefs] = useState([]);

  useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const [hoveredTabIndex, setHoveredTabIndex] = useState(null);
  const [hoveredRect, setHoveredRect] = useState(null);

  const navRef = useRef(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

  const [isInitialHoveredElement, setIsInitialHoveredElement] = useState(true);
  const isInitialRender = useRef(true);

  const onLeaveTabs = () => {
    setIsInitialHoveredElement(true);
    setHoveredTabIndex(null);
  };

  const onEnterTab = (e, i) => {
    if (!e.target || !(e.target instanceof HTMLAnchorElement)) return;

    setHoveredTabIndex((prev) => {
      if (prev != null && prev !== i) {
        setIsInitialHoveredElement(false);
      }

      return i;
    });
    setHoveredRect(e.target.getBoundingClientRect());
  };

  const onSelectTab = (i) => {
    setSelectedTab(i);
  };

  let hoverStyles = { opacity: 0 };
  if (navRect && hoveredRect) {
    hoverStyles.transform = `translate3d(${hoveredRect.left - navRect.left}px,${
      hoveredRect.top - navRect.top
    }px,0px)`;
    hoverStyles.width = hoveredRect.width;
    hoverStyles.height = hoveredRect.height;
    hoverStyles.opacity = hoveredTabIndex != null ? 1 : 0;
    hoverStyles.transition = isInitialHoveredElement
      ? `opacity 150ms`
      : `transform 150ms 0ms, opacity 150ms 0ms, width 150ms`;
  }

  let selectStyles = { opacity: 0 };
  if (navRect && selectedRect) {
    selectStyles.width = selectedRect.width * 0.8;
    selectStyles.transform = `translateX(calc(${
      selectedRect.left - navRect.left
    }px + 10%))`;
    selectStyles.opacity = 1;
    selectStyles.transition = isInitialRender.current
      ? `opacity 150ms 150ms`
      : `transform 150ms 0ms, opacity 150ms 150ms, width 150ms`;

    isInitialRender.current = false;
  }
  

  return (
    <div
      ref={navRef}
      className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
      onPointerLeave={onLeaveTabs}
    >
      {tabs.map((item, i) => {
        return (
          <Link
            key={i}
            className={`relative flex items-center h-8 px-4 p-5 z-20 bg-transparent text-base cursor-pointer select-none transition-colors ${(hoveredTabIndex === i || selectedTabIndex === i) ? 'text-light' : 'text-silverGray'}`}
            ref={(el) => (buttonRefs[i] = el)}
            onPointerEnter={(e) => onEnterTab(e, i)}
            onClick={() => onSelectTab(i)}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
      <div
        className="absolute z-10 top-0 left-0 rounded-xl bg-backgroundGray/60 transition-[width]"
        style={hoverStyles}
      />
      <div
        className={"absolute z-10 bottom-0 left-0 h-0.5 bg-slate-500 hidden"}
        style={selectStyles}
      />
    </div>
  );
};


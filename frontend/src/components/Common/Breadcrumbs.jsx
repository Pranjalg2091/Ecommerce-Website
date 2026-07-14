import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoArrowForward } from "react-icons/io5";

const Breadcrumbs = ({
  items = [],
  showHome = true,
  homeItem = { label: "Home", href: "/" },
  variant = "light",
  className = "",
}) => {
  const breadcrumbs = showHome ? [homeItem, ...items] : items;

  const isDark = variant === "dark";

  const linkClass = isDark
    ? "text-neutral-200 hover:text-white"
    : "text-body hover:text-primary-500";

  const textClass = isDark ? "text-white" : "text-heading";

  const arrowClass = isDark ? "text-neutral-300" : "text-neutral-400";

  return (
    <nav
      aria-label="breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-sm ${className}`}
    >
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={index}>
            {isLast || !item.href ? (
              <span className={`font-medium ${textClass}`}>{item.label}</span>
            ) : (
              <Link
                to={item.href}
                className={`flex items-center gap-1 transition-colors ${linkClass}`}
              >
                {index === 0 && (
                  <AiOutlineHome size={15} className="shrink-0" />
                )}
                {item.label}
              </Link>
            )}

            {!isLast && <IoArrowForward size={16} className={arrowClass} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

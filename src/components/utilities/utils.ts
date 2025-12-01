import { toast } from "react-toastify";

// --------------------------------------------------------- [  ]
export const response_message = ({
  message,
  option,
  duration = 5000,
}: {
  message: string;
  option: "wrn" | "inf" | "err" | "scc";
  duration?: number;
}) => {
  switch (option) {
    case "wrn":
      toast.warn(`${message}`, { autoClose: duration });
      break;
    case "inf":
      toast.info(`${message}`, { autoClose: duration });
      break;
    case "err":
      toast.error(`${message}`, { autoClose: duration });
      break;
    case "scc":
      toast.success(`${message}`, { autoClose: duration });
      break;

    default:
      break;
  }
};

// --------------------------------------------------------- [  ]
export const format_date = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// --------------------------------------------------------- [  ]
export function get_time_ago(date: Date | string | number): string {
  const now = new Date();
  const past = date === 0 ? new Date() : new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  const date_str = format_date(new Date(date));

  if (seconds < 60) {
    return seconds <= 1 ? `just now` : `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1
      ? `1 minute ago ( ${date_str} )`
      : `${minutes} minutes ago ( ${date_str} )`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1
      ? `an hour ago ( ${date_str} )`
      : `${hours} hours ago ( ${date_str} )`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1
      ? `yesterday ( ${date_str} )`
      : `${days} days ago ( ${date_str} )`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1
      ? `a month ago ( ${date_str} )`
      : `${months} months ago ( ${date_str} )`;
  }

  const years = Math.floor(months / 12);
  return years === 1
    ? `a year ago ( ${date_str} )`
    : `${years} years ago ( ${date_str} )`;
}

// --------------------------------------------------------- [  ]
export function get_time_expiry(expiryDate: string | Date): string {
  const now = new Date();
  const end = new Date(expiryDate);
  const diffMs = end.getTime() - now.getTime();

  // Already expired
  if (diffMs <= 0) return "0";

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30.44 * day; // average month
  const year = 365.25 * day;

  if (diffMs >= year) {
    const years = Math.floor(diffMs / year);
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (diffMs >= month) {
    const months = Math.floor(diffMs / month);
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (diffMs >= week) {
    const weeks = Math.floor(diffMs / week);
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  } else if (diffMs >= day) {
    const days = Math.floor(diffMs / day);
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (diffMs >= hour) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    const minutes = Math.floor(diffMs / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
}

// --------------------------------------------------------- [  ]
export const post_jwt = ({
  type,
  jwt,
}: {
  type: "access-token" | "refresh-token";
  jwt: string;
}) => {
  return localStorage.setItem(type, jwt);
};

// --------------------------------------------------------- [  ]
export const get_jwt = (
  type: "access-token" | "refresh-token"
): string | null => {
  return localStorage.getItem(type);
};

import { toast } from "react-toastify";
import { Area } from "react-easy-crop";

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
    month: "short",
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

  // Already ended
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
export const get_percentage_in_total = (
  num: number,
  total: number,
  decimals = 2,
) => {
  if (total === 0) return 0; // Prevent division by zero

  const percentage = (num / total) * 100;

  // Round to specified decimal places and convert back to a number
  return parseFloat(percentage.toFixed(decimals));
};

// --------------------------------------------------------- [  ]
export const get_percentage = (percent: number, total: number) => {
  const result = (percent / 100) * total;
  return Math.round(result * 100) / 100; // two decimals only
};

// --------------------------------------------------------- [  ]
export const get_percentage_of_second = (part: number, total: number) => {
  if (total === 0) return 0; // Prevent division by zero

  const percentage = (part / total) * 100;

  // Round to 2 decimal places for accuracy (e.g., 20.00)
  return Math.round(percentage * 100) / 100;
};

// --------------------------------------------------------- [  ]
export const format_currency = (num: number) => {
  // 1. Force round to 2 decimals
  const rounded = Math.round(num * 100) / 100;

  // 2. Return as string with 2 decimals (e.g., 15 -> "15.00")
  return rounded.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

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
  type: "access-token" | "refresh-token",
): string | null => {
  return localStorage.getItem(type);
};

// --------------------------------------------------------- [  ]
export function get_random_int(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --------------------------------------------------------- [  ]
export const getCroppedImageFile = async (
  imageSrc: string,
  pixelCrop: Area,
  originalFileName: string = "profile-image.jpg",
): Promise<File | null> => {
  const image = new Image();
  image.src = imageSrc;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Failed to load image"));
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(null);
        return;
      }

      // Create a File object from the Blob
      // This is the object that contains .name, .size, .type, etc.
      const croppedFile = new File([blob], originalFileName, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      resolve(croppedFile);
    }, "image/jpeg");
  });
};

// --------------------------------------------------------- [  ]
export const capitalize = (text: string) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// --------------------------------------------------------- [  ]
export const truncate_balance = (
  value: string | number,
  decimals: number = 4,
) => {
  const s = value.toString();
  const index = s.indexOf(".");
  if (index === -1) return s;
  // This slices the string exactly at the decimal limit without rounding
  return s.slice(0, index + decimals + 1);
};

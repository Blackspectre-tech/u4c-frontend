import { FaHandHoldingHeart, FaMosque } from "react-icons/fa";
import { MdOutlineVolunteerActivism } from "react-icons/md";

// Shared building blocks for the create / edit campaign forms.

// UI-only preview fields for Sadaqah / Zakat campaigns. These are intentionally
// not part of formData and are not sent on submit.
export type previewFieldType = {
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox";
  options?: string[];
};

export const sadaqahFields: previewFieldType[] = [
  {
    label: "Sadaqah Purpose",
    type: "select",
    options: ["Education", "Food & Water", "Healthcare", "Shelter", "General"],
  },
  { label: "Beneficiaries", type: "text" },
  { label: "Number of Beneficiaries", type: "number" },
  {
    label: "Selection Method",
    type: "select",
    options: ["Community referral", "Partner organization", "Application"],
  },
  {
    label: "Distribution Method",
    type: "select",
    options: ["Direct payment", "In-kind goods", "Through partner"],
  },
];

export const zakatFields: previewFieldType[] = [
  {
    label: "Beneficiary Category",
    type: "select",
    options: [
      "The poor (Fuqara)",
      "The needy (Masakin)",
      "Zakat administrators",
      "Those whose hearts are to be reconciled",
      "Those in bondage",
      "Those in debt",
      "In the cause of Allah",
      "The wayfarer",
    ],
  },
  { label: "Eligibility", type: "textarea" },
  {
    label: "Eligibility Verification",
    type: "select",
    options: ["Documents reviewed", "Home visit", "Third-party verified"],
  },
  { label: "Number of Beneficiaries", type: "number" },
  { label: "Distribution Amount", type: "number" },
  {
    label: "Distribution Method",
    type: "select",
    options: ["Direct payment", "In-kind goods", "Through partner"],
  },
  { label: "Shariah Review", type: "checkbox" },
];

export const impactFields: previewFieldType[] = [
  { label: "Who Will Benefit?", type: "textarea" },
  { label: "Expected Impact", type: "textarea" },
  { label: "Target Community / Region", type: "text" },
  {
    label: "How Will Impact Be Measured?",
    type: "select",
    options: [
      "Number of beneficiaries reached",
      "Photos & videos",
      "Third-party report",
      "Community feedback",
    ],
  },
];

export const campaignTypes = [
  {
    value: "General",
    Icon: MdOutlineVolunteerActivism,
    description: "A standard fundraising campaign for any cause.",
  },
  {
    value: "Sadaqah",
    Icon: FaHandHoldingHeart,
    description: "Voluntary charity given for the sake of Allah.",
  },
  {
    value: "Zakat",
    Icon: FaMosque,
    description: "Obligatory almsgiving to eligible recipients.",
  },
] as const;

export type campaignTypeValue = (typeof campaignTypes)[number]["value"];

export const previewBadgeClass =
  "text-xs font-semibold rounded-full px-3 py-1 bg-[#f4901e]/10 text-[#b96a0f] border border-[#f4901e]/30";

export function SectionHeader({
  icon,
  title,
  subtitle,
  preview = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  preview?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="gradient-cto-two w-11 h-11 min-w-11 rounded-xl flex items-center justify-center">
        <span className="text-[1.3rem] text-white flex">{icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold leading-tight">{title}</h2>
          {preview && (
            <span className={previewBadgeClass}>Preview · not saved yet</span>
          )}
        </div>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

export function FormSection({
  icon,
  title,
  subtitle,
  preview = false,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  preview?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="gradient-cto-border rounded-3xl border-2 border-transparent p-5 lg:p-8">
      <SectionHeader
        icon={icon}
        title={title}
        subtitle={subtitle}
        preview={preview}
      />
      <div className="mt-6">{children}</div>
    </div>
  );
}

// UI-only section: nothing entered here is stored in formData or submitted.
export function PreviewSection({
  icon,
  title,
  subtitle,
  fields,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  fields: previewFieldType[];
}) {
  const inputClass =
    "w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3 bg-white";

  const label = (text: string) => (
    <div className="flex items-center gap-3 pl-3">
      <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
      <p className="text-sm font-semibold text-gray-500">{text}</p>
    </div>
  );

  return (
    <FormSection icon={icon} title={title} subtitle={subtitle} preview>
      <div className="flex flex-col md:grid grid-cols-2 gap-5">
        {fields.map((field) =>
          field.type === "checkbox" ? (
            <label
              key={field.label}
              className="col-span-2 flex items-center gap-3 pl-3 cursor-pointer w-fit"
            >
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#f4901e] cursor-pointer"
              />
              <p className="text-sm font-semibold text-gray-500">
                {field.label}
              </p>
            </label>
          ) : (
            <label
              key={field.label}
              className={field.type === "textarea" ? "col-span-2" : ""}
            >
              {label(field.label)}

              {field.type === "select" ? (
                <select defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea className={`${inputClass} h-28 resize-none`} />
              ) : (
                <input type={field.type} className={inputClass} />
              )}
            </label>
          ),
        )}
      </div>
    </FormSection>
  );
}

import React, { FC, useMemo } from "react";
import zxcvbn from "zxcvbn";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: FC<PasswordStrengthMeterProps> = ({ password }) => {
  // Memoize calculation so it doesn't run on every render unnecessarily
  const testResult = useMemo(() => zxcvbn(password), [password]);

  const score = testResult.score; // 0-4

  const strengthLabel = (): string => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const progressColor = (): string => {
    switch (score) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-400";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "";
    }
  };

  const progressPercent = (score * 100) / 4; // convert 0-4 to 0-100%

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-300 h-2 rounded">
        <div
          className={`${progressColor()} h-2 rounded`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-sm mt-1 font-medium">{strengthLabel()}</p>
      {testResult.feedback.warning && (
        <p className="text-xs text-red-600 mt-1">
          Warning: {testResult.feedback.warning}
        </p>
      )}
      {testResult.feedback.suggestions.length > 0 && (
        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
          {testResult.feedback.suggestions.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;

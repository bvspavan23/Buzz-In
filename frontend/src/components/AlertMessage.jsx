import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const AlertMessage = ({ type, message }) => {
  let icon;
  let bgColor;
  let textColor;
  let borderColor;
  let iconColor;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="text-2xl" />;
      bgColor = "bg-rose-900 bg-opacity-30";
      textColor = "text-rose-100";
      borderColor = "border-l-4 border-rose-500";
      iconColor = "text-rose-400";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="text-2xl" />;
      bgColor = "bg-emerald-900 bg-opacity-30";
      textColor = "text-emerald-100";
      borderColor = "border-l-4 border-emerald-500";
      iconColor = "text-emerald-400";
      break;
    case "loading":
      icon = <AiOutlineLoading3Quarters className="animate-spin text-2xl" />;
      bgColor = "bg-cyan-900 bg-opacity-30";
      textColor = "text-cyan-100";
      borderColor = "border-l-4 border-cyan-500";
      iconColor = "text-cyan-400";
      break;
    default:
      icon = null;
      bgColor = "";
      textColor = "";
      borderColor = "";
      iconColor = "";
  }

  return (
    <div
      className={`flex items-center p-4 rounded-lg ${bgColor} ${textColor} ${borderColor} space-x-3 backdrop-blur-sm`}
      style={{ fontFamily: "'Baloo 2', sans-serif" }}
    >
      <div className={iconColor}>{icon}</div>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default AlertMessage;
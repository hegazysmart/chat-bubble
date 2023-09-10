import React, { useState } from "react";
import "./settings.css";

type ChatSettingsProps = {
  settings: ChatProps;
  onChange: (settings: ChatProps) => void;
};

const ChatSettingsComponent: React.FC<ChatSettingsProps> = ({
  settings,
  onChange,
}) => {
  const [localSettings, setLocalSettings] = useState<ChatProps>(settings);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedSettings = { ...localSettings, [name]: value };
    setLocalSettings(updatedSettings);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(localSettings);
  };

  return (
    <>
      <h4>Settings</h4>
      <form onSubmit={handleSubmit} className="settings-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={localSettings.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatar"
            value={localSettings.avatar}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Accent Color:
          <input
            type="color"
            name="accentColor"
            value={localSettings.accentColor}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Direction:
          <select
            name="direction"
            value={localSettings.direction}
            onChange={handleInputChange}
          >
            <option value="ltr">LTR</option>
            <option value="rtl">RTL</option>
          </select>
        </label>
        <button type="submit" className="save-settings">
          Save
        </button>
      </form>
    </>
  );
};

export default ChatSettingsComponent;

import React, { useState } from "react";
import ClayButton from "@clayui/button";
import ClayDropDown from "@clayui/drop-down";
import "./dropDown.css";

export default function LanguageDropdown() {
  const [active, setActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const toggleDropdown = () => setActive(!active);

  const handleLanguageSelect = (language: React.SetStateAction<string>) => {
    setSelectedLanguage(language);
    setActive(false);
  };

  return (
    <div className="language-dropdown">
      <div className="language-button-container">
        <ClayButton
          displayType="primary"
          onClick={toggleDropdown}
          className="sidebarbtn"
        >
          LANGUAGE
        </ClayButton>
      </div>

      {active && (
        <div className="language-dropdown-content">
          <ClayDropDown
            trigger={
              <span style={{ display: "hideen" }} aria-hidden="true"></span>
            }
            active={active}
            onActiveChange={(newActive: boolean) => setActive(newActive)}
          >
            <ClayDropDown.ItemList>
              <ClayDropDown.Item
                onClick={() => handleLanguageSelect("English")}
                active={selectedLanguage === "English"}
              >
                ENGLISH (EN)
              </ClayDropDown.Item>
              <ClayDropDown.Item
                onClick={() => handleLanguageSelect("Spanish")}
                active={selectedLanguage === "Spanish"}
              >
                HINDI (HN)
              </ClayDropDown.Item>
              <ClayDropDown.Item
                onClick={() => handleLanguageSelect("RUSSIAN")}
                active={selectedLanguage === "RUSSIAN"}
              >
                RUSSIAN (RU)
              </ClayDropDown.Item>
            </ClayDropDown.ItemList>
          </ClayDropDown>
        </div>
      )}
    </div>
  );
}

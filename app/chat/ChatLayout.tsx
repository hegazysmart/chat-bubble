"use client";
import "./chatLayout.css";
import React, { useState } from "react";
import Header from "./header/Header";
import ChatContainer from "./container/ContainerLayout";
import ChatSettingsComponent from "./settings/Settings";

const ChatLayout = () => {
  const [expanded, setExpanded] = useState(true);

  const open = () => {
    !expanded && setExpanded(true);
  };

  const close = () => {
    expanded && setExpanded(false);
  };

  const [chatSettings, setChatSettings] = useState<ChatProps>({
    title: "Chat Title Default",
    avatar:
      "https://png.pngitem.com/pimgs/s/437-4371983_multiple-messages-icon-circle-discussion-icon-png-transparent.png",
    accentColor: "#3aebb0",
    direction: "ltr",
  });

  return (
    <div
      className={`chat-bubble ${expanded ? "expanded" : "collapsed"}`}
      onClick={open}
    >
      {expanded ? (
        <>
          <Header handleClick={close}></Header>
          <ChatSettingsComponent
            settings={chatSettings}
            onChange={setChatSettings}
          />
          <ChatContainer
            title={chatSettings.title}
            avatar={chatSettings.avatar}
            accentColor={chatSettings.accentColor}
            direction={chatSettings.direction}
          />
        </>
      ) : (
        "Open!"
      )}
    </div>
  );
};

export default ChatLayout;

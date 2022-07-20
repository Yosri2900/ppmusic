import React from "react";
import { AiFillHome } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { AiFillQuestionCircle } from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/tutorial",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Discover",
    path: "/",
    icon: <BsFillGrid3X2GapFill />,
    cName: "nav-text",
  },
  {
    title: "Favorites",
    path: "/favorites",
    icon: <AiFillHeart />,
    cName: "nav-text",
  },
  {
    title: "Help",
    path: "/questions",
    icon: <AiFillQuestionCircle />,
    cName: "nav-text",
  },
];

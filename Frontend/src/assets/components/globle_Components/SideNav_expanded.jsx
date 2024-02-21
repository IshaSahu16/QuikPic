import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { Home } from "../../icons/Navbar/Home";
import { Message } from "../../icons/Navbar/Message";
import { CreatPost } from "../../icons/Navbar/creatPost";
import { Explore } from "../../icons/Navbar/Explore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Bookmark from "../../icons/Navbar/Bookmark";
const SideNav_expanded = () => {
  return (
    <div style={{ width: "250px", top: "0", height: "fit-content" }}>
      <Card
        style={{ height: "100vh", position: "fixed" }}
        className=" py-4 flex-col justify-between items-center w-auto  "
      >
        <CardHeader className="flex-col justify-center items-center w-auto">
          <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description="@tonyreichert"
                  name="Tony Reichert"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody className="flex-col justify-center items-start w-auto gap-4">
          <button className="flex flex-row  gap-4 ">
            <Home />
            <span className="text-xl">Home</span>
          </button>{" "}
          <button className="flex flex-row  gap-4 ">
            <Message /> <span className="text-xl">Messages</span>
          </button>{" "}
          <button className="flex flex-row  gap-4 ">
            <CreatPost /> <span className="text-xl">Create Post</span>
          </button>{" "}
          <button className="flex flex-row  gap-4 ">
            <Explore /> <span className="text-xl">Explore</span>
          </button>
          <button className="flex flex-row  gap-4 ">
            <Bookmark /> <span className="text-xl">Bookmark</span>
          </button>
        </CardBody>
        <CardFooter className="flex-col justify-center items-center w-auto">
          <button className="flex flex-row  gap-4 ">
            <FontAwesomeIcon icon={faGear} size="xl" />
            <span className="text-xl">Setting</span>
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SideNav_expanded;

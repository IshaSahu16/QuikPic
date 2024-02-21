import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faBookmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  AvatarGroup,
  Avatar,
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  User,
  Spacer,
  Divider,
  button,
} from "@nextui-org/react";
import { ThreeDot } from "../../icons/Navbar/ThreeDot";
import Popupcard from "../globle_Components/Popupcard";
const ViewPostCard = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBokmarked] = useState(false);
  return (
    <div>
      <Card style={{ width: "325px" }} className="py-4 max-w-[340px] ">
        <CardHeader
          // style={{ width: "310px" }}
          className="pb-0 pt-1 px-4 flex-row justify-between align-middle items-center"
        >
          <Popover showArrow placement="bottom">
            <PopoverTrigger>
              <User
                as="button"
                name="Zoe Lang"
                description="Product Designer"
                className="transition-transform"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Popupcard />
            </PopoverContent>
          </Popover>

          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <button>
                <ThreeDot />
              </button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
              <DropdownItem key="copy">Copy link</DropdownItem>
              <DropdownItem key="edit">Edit file</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody
          style={{ width: "fit-content " }}
          className="flex justify-center"
        >
          <button
            style={{ width: "fit-content ", height: "fit-content" }}
            className=""
          >
            <Image
              width={300}
              height={200}
              alt="NextUI hero Image with delay"
              src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            />
          </button>
        </CardBody>
        <CardFooter className="flex-col items-start pb-0 pt-2 px-2 w-16 space-y-2 gap-4">
          <CardBody className="flex-row justify-between">
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  liked === true ? setLiked(false) : setLiked(true);
                }}
              >
                {liked === true ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#e32400", fontSize: "20px" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#818181", fontSize: "20px" }}
                  />
                )}
              </button>
              <button>
                <FontAwesomeIcon
                  onMouseOver={(e) => {
                    e.target.style.color = "#C0C0C0";
                  }}
                  //25CED1
                  onMouseOut={(e) => {
                    e.target.style.color = "#818181";
                  }}
                  icon={faComment}
                  style={{
                    color: "#818181",
                    fontSize: "20px",
                    hover: { color: "#ff0000" },
                  }}
                />
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  onMouseOver={(e) => {
                    e.target.style.color = "#CBF3F0";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#818181";
                  }}
                  style={{
                    color: "#818181",
                    fontSize: "20px",
                    hover: { color: "#ff0000" },
                  }}
                />
              </button>
            </div>

            <button
              onClick={(e) => {
                bookmarked === true ? setBokmarked(false) : setBokmarked(true);
              }}
            >
              {bookmarked === true ? (
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ color: "#FFD43B", fontSize: "20px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ color: "#818181", fontSize: "20px" }}
                />
              )}
            </button>
          </CardBody>

          <CardBody className="flex-row justify-between ">
            <CardBody className="truncate p-0 ">
              <div className="truncate w-[15px]">
                Liked by kartik and many others
              </div>
            </CardBody>

            <AvatarGroup isBordered max={3} size="sm">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
          </CardBody>
          <CardBody
            // style={{ width: "300px" }}
            className="text-default-400 py-0"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
            blanditiis et atque, autem sapiente corrupti a aut aspernatur iusto
            minima neque quo eaque sint rerum laborum ullam voluptate magnam
            cumque.
          </CardBody>
          <CardBody className="font-semibold text-default-400 text-small w-fit py-0">
            3-months ago
          </CardBody>
          <Divider />
          <Card className="max-w-[340px]">
            <CardHeader className="flex gap-4 justify-between align-top items-start">
              <div className="flex ">
                <Avatar
                  isBordered
                  radius="full"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
              </div>
              <span style={{ width: "200px" }} className="text-default-500  ">
                Frontend developer and UI/UX enthusiast. Join me on this coding
                adventure!
              </span>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
          </Card>
          <div className="w-[340px] h-[240px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
            <Input
              placeholder="Add a comment"
              radius="lg"
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              endContent={
                <button>
                  <div>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{
                        color: "#25CED1",
                        fontSize: "20px",
                      }}
                    />{" "}
                  </div>
                </button>
              }
              startContent={
                <Popover showArrow placement="bottom">
                  <PopoverTrigger>
                    <User
                      as="button"
                      className="transition-transform"
                      avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="p-1">
                    <Popupcard />
                  </PopoverContent>
                </Popover>
              }
            />
          </div>
        </CardFooter>
      </Card>

      <Spacer y={2} />
    </div>
  );
};

export default ViewPostCard;

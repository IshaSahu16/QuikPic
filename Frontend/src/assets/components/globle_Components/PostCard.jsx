import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faBookmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  AvatarGroup,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  User,
  Spacer,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { ThreeDot } from "../../icons/Navbar/ThreeDot";
import Popupcard from "./Popupcard";
import { useDispatch, useSelector } from "react-redux";
import { bookmark, delPost, like } from "../../redux/reducers/PostCardReducer";
import { useNavigate } from "react-router-dom";
import { me } from "../../redux/reducers/MeReducer";
import { fetchExplore } from "../../redux/reducers/ExploreReducer";
import { fetchFeed } from "../../redux/reducers/UserFeedReducers";
import { getUserPost } from "../../redux/reducers/getSavedPostsReducer";
const PostCard = ({ data }) => {
  const dispatch = useDispatch();
  const notify = () => toast("URL copied to clipboard");
  const navigate = useNavigate();
  const location = useLocation();
  // const [bookmarked, setBokmarked] = useState(false);
  // const [liked, setLiked] = useState(false);
  //in complete
  //! to add functionality to change the value of liked and bookmarked
  // const data = useSelector((state) => state.postcard.liked);
  const userId = useSelector((state) => state.me.data._id);
  const bookmarkedPosts = useSelector((state) => state.me.data.savedPosts);
  // console.log(userId);
  // console.log(bookmarkedPosts);
  const shareUrl = () => {
    let url = window.location.href + `postview/${data._id}`;
    navigator.clipboard.writeText(url);
    notify();
  };
  const liking = async () => {
    await dispatch(like({ id: data._id }));
    // dispatch(me());
    if (location.pathname === '/Home') {
      dispatch(fetchFeed());
    } else if (location.pathname === '/Explore') {
      dispatch(fetchExplore());
    }
    else if (location.pathname === '/UserProfile') {
      dispatch(getUserPost());
    }
  }; 
  const bookmarking = async () => {
    await dispatch(bookmark({ id: data._id }));
    dispatch(me());
    if (location.pathname === '/Home') {
      dispatch(fetchFeed());
    } else if (location.pathname === '/Explore') {
      dispatch(fetchExplore());
    }
    else if (location.pathname === '/UserProfile') {
      dispatch(getUserPost());
    }
  };
  const postviewPage = () => {
    navigate(`/postview/${data._id}`);
  };
const delpost = async () => {
  await dispatch(delPost({ id: data._id }));
  if (location.pathname === '/Home') {
    dispatch(fetchFeed());
  } else if (location.pathname === '/Explore') {
    dispatch(fetchExplore());
  }
  else if (location.pathname === '/UserProfile') {
    dispatch(getUserPost());
  }
}
  const [isCreated, setIsCreator] = useState(false);
  useEffect(() => {
    if (data.createdBy._id === userId) {
      setIsCreator(true);
    } else {
      setIsCreator(false);
    }
  }, [data.createdBy._id, userId]);

  const getProfile = () => {
    if (data.createdBy.profileImage == "") {
      return "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png";
    } else {
      return data.createdBy.profileImage;
    }
  };

  return (
    <div className="h-fit">
       <ToastContainer />
      <Card style={{ width: "325px" }} className="py-4 max-w-[340px] ">
        <CardHeader
          // style={{ width: "310px" }}
          className="pb-0 pt-1 px-4 flex-row justify-between align-middle items-center"
        >
          <Popover showArrow placement="bottom">
            <PopoverTrigger>
              <User style={{position:"static"}}
                as="button"
                name={data.createdBy.username}
                className="transition-transform"
                avatarProps={{
                  src: getProfile(),
                }}
              />
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Popupcard data={data.createdBy} />
            </PopoverContent>
          </Popover>

          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <button>
                <ThreeDot />
              </button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">
              <DropdownItem key="new">
                <Link to="/CreatePost">Create Post</Link>
              </DropdownItem>

              <DropdownItem key="copy">Repost</DropdownItem>
              {isCreated ? (
                <DropdownItem key="edit">
                  <Link to={`/EditPost/${data._id}`}>

                  Edit Post
                  </Link>
                  </DropdownItem>
              ) : null}
              {isCreated ? (
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={delpost}
                >
                  Delete Post
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Report Post
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody
          style={{ width: "fit-content " }}
          className="overflow-visible py-2 w-fit"
        >
          <button 
            style={{ width: "300px ", height: "300px" }}
            className=""
            onClick={postviewPage}
          >
            
            <Image 
            style={{ width: "300px ", height: "300px", position: "static"}}
              loading="false"
            
             
              alt="NextUI hero Image with delay"
              src={data.image}
            />
          </button>
        </CardBody>
        <CardFooter className="flex-col items-start pb-0 pt-2 px-2 w-16 space-y-2">
          <CardBody className="flex-row justify-between">
            <div className="flex gap-3">
              <button onClick={liking}>
                {data.likes.includes(userId) ? (
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
              <button onClick={postviewPage}>
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
              <button onClick={shareUrl}>
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
              onClick={bookmarking}
            >
              {bookmarkedPosts.includes(data._id) ? (
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

          <CardBody className="flex-row justify-between py-1">
            <CardBody className="truncate px-0 py-1 ">
              <div className="truncate w-[15px]">
                Liked by {data.likes.length} people
              </div>
            </CardBody>

            <AvatarGroup   max={2} size="sm">
             {[...Array(data.likes.length)].map((e, i) => <span className="busterCards" key={i}><Avatar style={{height:"28px", width:"28px"}} src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /></span>)}
              
              </AvatarGroup>
          </CardBody>
          <CardBody
            // style={{ width: "300px" }}
            className="truncate text-default-400 "
          >
            <div className="truncate w-[300px]">{data.caption}</div>
          </CardBody>
          <CardBody className="font-semibold text-default-400 text-small w-fit">
            3-months ago
          </CardBody>
        </CardFooter>
      </Card>

      <Spacer y={2} />
    </div>
    //   <Card className="max-w-[340px]">
    //   <CardHeader className="justify-between">
    //     <div className="flex gap-5">
    //       <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
    //       <div className="flex flex-col gap-1 items-start justify-center">
    //         <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
    //         <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
    //       </div>
    //     </div>
    //     {/* <Button
    //       className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
    //       color="primary"
    //       radius="full"
    //       size="sm"
    //       variant={isFollowed ? "bordered" : "solid"}
    //       onPress={() => setIsFollowed(!isFollowed)}
    //     >
    //       {isFollowed ? "Unfollow" : "Follow"}
    //     </Button> */}
    //   </CardHeader>
    //   <CardBody className="px-3 py-0 text-small text-default-400">
    //     <p>
    //       Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
    //       Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
    //     </p>
    //     <span className="pt-2">
    //       #FrontendWithZoey
    //       <span className="py-2" aria-label="computer" role="img">
    //         💻
    //       </span>
    //     </span>
    //   </CardBody>
    //   <CardFooter className="gap-3">
    //     <div className="flex gap-1">
    //       <p className="font-semibold text-default-400 text-small">4</p>
    //       <p className=" text-default-400 text-small">Following</p>
    //     </div>
    //     <div className="flex gap-1">
    //       <p className="font-semibold text-default-400 text-small">97.1K</p>
    //       <p className="text-default-400 text-small">Followers</p>
    //     </div>
    //   </CardFooter>
    // </Card>
  );
};

export default PostCard;
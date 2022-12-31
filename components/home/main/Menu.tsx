import Link from "next/link";
import { menuArray } from "../../../data/home";
import styles from "./styles.module.scss";
//------- ICONS -------
import {
  GiLargeDress,
  GiClothes,
  Gi3DHammer,
  GiWatch,
  GiBallerinaShoes,
  GiHeadphones,
  GiHealthCapsule,
  GiSportMedal,
  GiBigDiamondRing,
} from "react-icons/gi";
import { MdOutlineSportsEsports, MdOutlineSmartToy } from "react-icons/md";
import { BiCameraMovie, BiGift, BiCategory } from "react-icons/bi";
import { FaBaby } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";
//------- ICONS -------
const ALL_ICONS = [
  <GiLargeDress key={"GiLargeDress"}/>,
  <GiClothes key={"GiClothes"}/>,
  <Gi3DHammer key={"Gi3DHammer"}/>,
  <GiWatch key={"GiWatch"}/>,
  <GiBallerinaShoes key={"GiBallerinaShoes"}/>,
  <GiHeadphones key={"GiHeadphones"}/>,
  <GiHealthCapsule key={"GiHealthCapsule"}/>,
  <GiSportMedal key={"GiSportMedal"}/>,
  <GiBigDiamondRing key={"GiBigDiamondRing"}/>,
  <MdOutlineSportsEsports key={"MdOutlineSportsEsports"}/>,
  <MdOutlineSmartToy key={"MdOutlineSmartToy"}/>,
  <BiCameraMovie key={"BiCameraMovie"}/>,
  <BiGift key={"BiGift"}/>,
  <FaBaby key={"FaBaby"}/>,
  <AiOutlineSecurityScan key={"AiOutlineSecurityScan"}/>,
  <BsPhoneVibrate key={"BsPhoneVibrate"}/>,
];
export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list}>
          {menuArray.map((item, idx) => (
            <li key={item.link + idx}>
              <Link
                href={item.link}
                className={styles.menu__item}
              >
                {ALL_ICONS[idx]}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

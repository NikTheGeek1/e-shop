import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { hideDialog } from "../../../store/dialog-slice";
import DialogModal from "../../dialog-modal";
import Sidebar from "./sidebar";
import styles from "./styles.module.scss";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout({ children }: LayoutProps) {
  const { expandSidebar } = useSelector((state: IRootState) => ({ ...state }));
  const showSidebar = expandSidebar.expandSidebar;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideDialog({}));
  }, []);

  return (
    <div className={styles.layout}>
      <DialogModal />
      <Sidebar />
      <div
        style={{ marginLeft: `${showSidebar ? "280px" : "80px"}` }}
        className={styles.layout__main}
      >
        {children}
      </div>
    </div>
  );
}

import classNames from "classnames";
import styles from "./footer.module.scss";

export default function Footer() {
  return <div className={classNames("text-center", styles.footer)}>Footer</div>;
}

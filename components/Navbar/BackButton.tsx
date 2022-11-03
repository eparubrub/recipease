import Link from "next/link";
import theme from "../../styles/theme";

export function BackButton({}) {
  return (
    <>
      <Link href="javascript:history.back()">
        <img src={"/images/back-arrow.png"} alt="back icon" />
      </Link>
      <style jsx>{`
        img {
          height: 40%;
          top: 0;
          bottom: 0;
          margin: auto;
          left: 1.25rem;
          position: absolute;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

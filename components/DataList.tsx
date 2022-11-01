import theme from "../styles/theme";

interface DataListProps {
  children: React.ReactNode;
  gapSmall?: string;
  gapLarge?: string;
  grid?: boolean;
  gridWidth?: string;
  gridHeight?: string;
}

export function DataList({
  children,
  gapSmall,
  gapLarge,
  grid,
  gridWidth,
  gridHeight,
}: DataListProps) {
  return (
    <div className={grid ? "grid" : "data-list"}>
      {children}
      <style jsx>{`
        .data-list {
          display: flex;
          flex-wrap: wrap;
          grid-auto-flow: column;
          grid-auto-rows: 1fr;
          gap: ${gapSmall};
          margin: "1.5rem auto 0";
          padding: 0;
          max-width: 80rem;
        }
        .grid {
          --n: 2; /* number of columns */
          display: grid;
          grid-gap: ${gapSmall};
          grid-template-columns: repeat(
            auto-fit,
            minmax(calc(100% / var(--n) - 20px), 1fr)
          );
          width: ${gridWidth ? gridWidth : "20rem"};
          height: ${gridHeight ? gridHeight : "20rem"};
        }
        @media screen and (min-width: ${theme.layout.breakPoints.small}) {
          .data-list {
            padding: 0;
            margin: 0;
          }
          .grid {
            grid-gap: ${gapLarge};
          }
        }
      `}</style>
    </div>
  );
}

// interface DataListItemProps {
//   heading?: string;
//   headingSizeLarge?: string;
//   customWidth?: string;
//   subHeading?: string;
//   subHeadingLight?: boolean;
//   children?: React.ReactNode;
//   textItem?: boolean;
//   translation?: string;
// }

// export function DataListItem({
//   heading,
//   headingSizeLarge,
//   customWidth,
//   children,
//   subHeading,
//   subHeadingLight,
//   textItem,
//   translation,
// }: DataListItemProps) {
//   return (
//     <div className="data-list-item">
//       <>{textItem ? null : children}</>
//       <h3>{heading}</h3>
//       <h4>{translation}</h4>
//       <h5>{subHeading}</h5>
//       <p>{textItem ? children : null}</p>
//       <style jsx>{`
//         .data-list-item {
//           width: ${customWidth ? customWidth : "12rem"};
//         }
//         h3,
//         h4,
//         h5,
//         p {
//           margin: 0;
//         }
//         h3 {
//           font-weight: 600;
//           font-size: 1.25rem;
//         }
//         h4 {
//           font-size: 1rem;
//           font-style: italic;
//           font-weight: 400;
//           color: ${theme.color.brand.faded};
//           margin-bottom: 0.25rem;
//         }
//         h5 {
//           font-size: 0.8rem;
//           color: ${theme.color.text.alt2};
//           font-weight: ${subHeadingLight ? "400" : "600"};
//         }
//         p {
//           color: ${theme.color.text.alt2};
//           font-weight: 500;
//           font-size: 1rem;
//         }
//         @media screen and (min-width: ${theme.layout.breakPoints.small}) {
//           .data-list-item {
//             max-width: ${customWidth ? customWidth : "16rem"};
//           }
//           h3 {
//             font-size: ${headingSizeLarge ? headingSizeLarge : "1.25rem"};
//           }
//           h4 {
//             font-size: 1.125rem;
//           }
//           h5 {
//             font-size: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

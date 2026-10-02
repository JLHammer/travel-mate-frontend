type PageTitleProps = {
  title: string;
};

export const PageTitle = ({ title }: PageTitleProps) => {
  return <title>{`TravelMate | ${title}`}</title>;
};

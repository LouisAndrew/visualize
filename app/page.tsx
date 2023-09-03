import { List } from "@/components/list/list";
import { GradientHeading } from "@/components/ui/gradient-heading";

const IndexPage = () => (
  <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
    <div className="flex max-w-[980px] flex-col items-start gap-2">
      <GradientHeading>Bubble Sort</GradientHeading>

      <List length={10} />
    </div>
  </section>
);

export default IndexPage;

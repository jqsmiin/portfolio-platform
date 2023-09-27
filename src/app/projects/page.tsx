import Filter from "@/components/Filter";
import Projects from "@/components/Projects";

const page = () => {
  return (
    <section
      id="projects"
      className="container mx-auto px-6 mt-2 lg:mt-10 mb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 projects-item-container">
        <div className="hidden md:block col-span-1 lg:col-span-1">
          <Filter />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <Projects />
        </div>
      </div>
    </section>
  );
};

export default page;

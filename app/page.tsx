import {StyledLink} from "@/app/components/Link";

export default async function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <main className="max-w-3xl">
        <h1 className="text-xl lg:text-3xl font-semibold mb-2">CIT-1063 - Python FastAPI Training Project</h1>
        <p className="text-md lg:text-xl mb-3">
          This is the frontend for several APIs that have been created to learn FastAPI and Python API development more specifically;
          primarily to reinforced my learning from a previous Python training project.
        </p>
        <p className="text-md lg:text-xl mb-3">
          You can find the code the APIs that have been written at this <StyledLink href="https://github.com/codal-matthew-fung/python-fastapi-training">repository</StyledLink>.
        </p>
        <p className="text-md lg:text-xl mb-3">
          The API was built based on this <StyledLink href="https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks">Book dataset</StyledLink> that was sourced from Kaggle. It was chosen as it is simplified, cleaned dataset of books from Goodreads that has several useful data points as well as rating and review counts.
        </p>
      </main>
    </div>
  );
}

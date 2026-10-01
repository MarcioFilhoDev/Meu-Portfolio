import { useEffect, useState } from "react";
import Header from "./components/ Header";
import RepositoryCard from "./components/RepositoryCard";
import { api } from "./services/gitapi";
import type { UserData } from "./types/userData";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  url: string;
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#e6c229",
  Java: "#b07219",
  Python: "#3b7ea1",
  "C#": "#8a5cc7",
};

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Todos");
  const languages = [
    "Todos",
    ...new Set(
      repositories
        .map(({ language }) => language)
        .filter((language): language is string => language !== null),
    ),
  ];
  const filteredRepositories =
    selectedLanguage === "Todos"
      ? repositories
      : repositories.filter(({ language }) => language === selectedLanguage);

  useEffect(() => {
    async function getGitHubData() {
      try {
        const [userResponse, repositoryResponses] = await Promise.all([
          api.get<UserData>(""),
          getAllPublicRepositories(),
        ]);

        setUser(userResponse.data);
        setRepositories(repositoryResponses);
      } catch {
        setError(
          "Não foi possível carregar os dados do GitHub. Tente novamente mais tarde.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    async function getAllPublicRepositories() {
      const allRepositories: Repository[] = [];
      let page = 1;

      while (true) {
        const response = await api.get<
          {
            id: number;
            name: string;
            description: string | null;
            language: string | null;
            html_url: string;
          }[]
        >("/repos", {
          params: { per_page: 100, page, sort: "updated" },
        });

        allRepositories.push(
          ...response.data.map((repository) => ({
            id: repository.id,
            name: repository.name,
            description: repository.description,
            language: repository.language,
            url: repository.html_url,
          })),
        );

        if (response.data.length < 100) {
          return allRepositories;
        }

        page += 1;
      }
    }

    getGitHubData();
  }, []);

  return (
    <div className="page-shell">
      <Header userData={user} />

      <main>
        <div className="section-heading">
          <h2>Projetos</h2>
          <span>
            {selectedLanguage === "Todos"
              ? `${repositories.length} repositórios públicos`
              : `${filteredRepositories.length} projeto${filteredRepositories.length === 1 ? "" : "s"} em ${selectedLanguage}`}
          </span>
        </div>

        <div className="filters" aria-label="Filtrar projetos por linguagem">
          {languages.map((language) => (
            <button
              className={
                selectedLanguage === language
                  ? "filter-button active"
                  : "filter-button"
              }
              key={language}
              type="button"
              onClick={() => setSelectedLanguage(language)}
            >
              {language}
            </button>
          ))}
        </div>

        <div className="repository-grid">
          {isLoading ? (
            <p role="status">Carregando dados do GitHub...</p>
          ) : error ? (
            <p role="alert">{error}</p>
          ) : filteredRepositories.length > 0 ? (
            filteredRepositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                {...repository}
                language={repository.language ?? "Não informada"}
                description={repository.description ?? "Sem descrição."}
                languageColor={
                  languageColors[repository.language ?? ""] ?? "#78838d"
                }
              />
            ))
          ) : (
            <p>Nenhum repositório encontrado para esta linguagem.</p>
          )}
        </div>

        <p className="repository-note">
          Repositórios públicos carregados diretamente do GitHub. Acesse o
          perfil para ver detalhes e atividade de cada projeto em{" "}
          <a href={user?.html_url} target="_blank" rel="noreferrer">
            github.com/MarcioFilhoDev
          </a>
        </p>
      </main>
    </div>
  );
}
